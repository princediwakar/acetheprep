// Path: app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Maps URL exam slugs to canonical exam names used in exam_profiles
const SLUG_TO_EXAM: Record<string, string> = {
  'gmat-focus': 'GMAT Focus',
  'sat': 'Digital SAT',
  'digital-sat': 'Digital SAT',
  'gre': 'GRE',
  'cfa-level-1': 'CFA Level 1',
  'ielts-academic': 'IELTS Academic',
  'toefl-ibt': 'TOEFL iBT',
}

/**
 * Extracts the exam name from a practice URL like /practice/cfa-level-1/...
 * Returns null if the URL doesn't match or the exam slug is unknown.
 */
function extractExamFromPracticeUrl(url: string): string | null {
  const m = url.match(/^\/practice\/([^/?#]+)/)
  if (!m) return null
  const slug = m[1]
  return SLUG_TO_EXAM[slug] ?? null
}

/**
 * Auto-provision an exam_profile + concept_mastery rows for a new user who
 * arrived directly from a practice drill page, bypassing /setup entirely.
 * Uses all-medium priors — the SM-2 engine will calibrate after the first
 * actual session answers are submitted.
 */
async function autoProvisionProfile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  examName: string,
): Promise<string | null> {
  try {
    // 1. Check for existing active profile for this exam
    const { data: existing } = await supabase
      .from('exam_profiles')
      .select('profile_id, is_active')
      .eq('user_id', userId)
      .eq('exam_name', examName)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing) {
      // Profile already exists — activate it and return
      await supabase
        .from('exam_profiles')
        .update({ is_active: true })
        .eq('profile_id', existing.profile_id)

      // Deactivate any other profiles
      await supabase
        .from('exam_profiles')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('is_active', true)
        .neq('profile_id', existing.profile_id)

      return existing.profile_id
    }

    // 2. Provision target date 90 days out (default — user can adjust later)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 90)
    const targetDateISO = targetDate.toISOString().split('T')[0]

    // 3. Deactivate any currently active profiles before creating a new one
    await supabase
      .from('exam_profiles')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true)

    // 4. Insert the new profile
    const { data: profile, error: profileError } = await supabase
      .from('exam_profiles')
      .insert({
        user_id: userId,
        exam_name: examName,
        target_date: targetDateISO,
        time_mode: 'acceleration',
        is_active: true,
        active_targets: [],
      })
      .select('profile_id')
      .single()

    if (profileError || !profile) {
      console.error('[autoProvisionProfile] insert error:', profileError)
      return null
    }

    const profileId = profile.profile_id

    // 5. Seed concept_mastery rows with medium priors (0.5) for all domains
    //    in this exam. We import taxonomies inline to avoid a circular dep.
    let taxonomyData: Record<string, Record<string, string[]>> = {}
    try {
      // Dynamic import so this server route doesn't balloon the cold-start
      const taxonomyModule = await import('@/lib/taxonomies.json', {
        with: { type: 'json' },
      })
      taxonomyData = taxonomyModule.default as unknown as Record<string, Record<string, string[]>>
    } catch {
      // taxonomy import failed — skip seeding (SM-2 will seed lazily on first answer)
    }

    const examSubjects = taxonomyData[examName] ?? {}
    const allDomains = Object.values(examSubjects).flat()

    if (allDomains.length > 0) {
      const now = new Date().toISOString()
      const masteryRows = allDomains.map((domain) => ({
        user_id: userId,
        exam_profile_id: profileId,
        skill_domain: domain,
        mastery_score: 0.5, // all-medium prior
        total_attempted: 0,
        total_correct: 0,
        streak: 0,
        review_interval_days: 1,
        review_ease_factor: 2.5,
        next_review_at: now,
        last_seen_at: now,
      }))

      // upsert to avoid duplicates if called twice
      await supabase.from('concept_mastery').upsert(masteryRows, {
        onConflict: 'user_id,exam_profile_id,skill_domain',
        ignoreDuplicates: true,
      })
    }

    return profileId
  } catch (err) {
    console.error('[autoProvisionProfile] unexpected error:', err)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next') ?? '/'
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      let destination = next

      if (user) {
        // 1. Check for existing active profile first
        const { data: existingActiveProfile } = await supabase
          .from('exam_profiles')
          .select('profile_id, exam_name')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .maybeSingle()

        if (existingActiveProfile) {
          // Returning student with an established mission:
          // NEVER hijack or deactivate their active study plan!
          // Send them straight to /home with zero disruption.
          destination = '/home'
        } else {
          // 2. Brand new student or user without an active profile:
          const examFromUrl = extractExamFromPracticeUrl(next)

          if (examFromUrl && next.startsWith('/practice/')) {
            const profileId = await autoProvisionProfile(supabase, user.id, examFromUrl)

            if (profileId) {
              // Route to /home dashboard — they are fully onboarded
              destination = '/home?onboarded=1'
            } else {
              // Provisioning failed gracefully — fall back to setup
              destination = `/setup?exam=${encodeURIComponent(examFromUrl)}`
            }
          } else {
            // Came from non-practice page without active profile -> send to setup
            destination =
              destination === '/' || destination === '/setup' || destination.startsWith('/setup?')
                ? '/setup'
                : destination
          }
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const isLocalOrigin = origin.includes('localhost') || origin.includes('127.0.0.1')

      if (isLocalEnv || isLocalOrigin) {
        return NextResponse.redirect(`${origin}${destination}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${destination}`)
      } else {
        return NextResponse.redirect(`${origin}${destination}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}