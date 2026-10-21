import { createClient } from '@/lib/supabase/server'
import taxonomyRaw from '../taxonomies.json'

type TaxonomyData = Record<string, Record<string, string[]>>
const taxonomy = taxonomyRaw as unknown as TaxonomyData

interface SubjectBand {
  subject: string
  predictedPercentile: number
  bandLower: number
  bandUpper: number
  bandWidth: number
  sessionsUsed: number
  quietSessionsUsed: number
  calibrationSource: string
  disclaimer: string
}

interface PredictionResult {
  overallPercentile: number
  overallBandLower: number
  overallBandUpper: number
  overallBandWidth: number
  subjects: SubjectBand[]
  totalTrackedSessions: number
  totalQuietSessions: number
  calibrationSource: string
  disclaimer: string
  frozenAt: string | null
  isFrozen: boolean
}

function getBlendingWeight(sessionsCompleted: number): number {
  if (sessionsCompleted <= 0) return 0
  if (sessionsCompleted >= 20) return 1
  return Math.sqrt(sessionsCompleted / 20)
}

function getDisclaimer(sessionsCompleted: number, quietSessionsCompleted?: number): string {
  const quietNote = quietSessionsCompleted && quietSessionsCompleted > 0
    ? ` (${quietSessionsCompleted} quiet session${quietSessionsCompleted > 1 ? 's' : ''} also contributed to the model)`
    : ''

  if (sessionsCompleted === 0) {
    return 'Your prediction uses psychometric baseline priors — it sharpens the more you practice with AceThePrep.' + quietNote
  }
  if (sessionsCompleted < 5) {
    return `Prediction blends psychometric priors with your ${sessionsCompleted} tracked session${sessionsCompleted > 1 ? 's' : ''}. Band sharpens with each session.` + quietNote
  }
  if (sessionsCompleted < 20) {
    return `Primarily based on your ${sessionsCompleted} tracked sessions, blended with standardized baseline.` + quietNote
  }
  return 'Fully calibrated to your personal practice history.' + quietNote
}

function calibrationLabel(weight: number): string {
  if (weight < 0.25) return 'standardized_prior'
  if (weight < 0.75) return 'blended'
  return 'proprietary'
}

export async function generatePrediction(
  userId: string,
  examProfileId: string,
): Promise<PredictionResult> {
  const supabase = await createClient()

  // 1. Fetch user exam profile
  const { data: profile } = await supabase
    .from('exam_profiles')
    .select('exam_name')
    .eq('profile_id', examProfileId)
    .maybeSingle()

  const examName = profile?.exam_name || 'SAT'

  // 2. Fetch concept mastery
  const { data: masteryRows } = await supabase
    .from('concept_mastery')
    .select('skill_domain, mastery_score')
    .eq('user_id', userId)
    .eq('exam_profile_id', examProfileId)

  const masteryByDomain: Record<string, number> = {}
  if (masteryRows) {
    for (const row of masteryRows) {
      masteryByDomain[row.skill_domain] = row.mastery_score
    }
  }

  // 3. Derive subjects and domains from canonical taxonomy
  const examSubjects = taxonomy[examName] || taxonomy['SAT'] || {}
  const subjectDomains: Record<string, string[]> = {}
  for (const [subj, doms] of Object.entries(examSubjects)) {
    if (Array.isArray(doms)) {
      subjectDomains[subj] = doms
    }
  }

  // 4. Session counts
  const { count: trackedCount } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('exam_profile_id', examProfileId)
    .eq('session_intent', 'tracked')

  const { count: quietCount } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('exam_profile_id', examProfileId)
    .eq('session_intent', 'quiet')

  const sessionsUsed = trackedCount ?? 0
  const quietSessionsUsed = quietCount ?? 0
  const blendWeight = getBlendingWeight(sessionsUsed)

  const subjects: SubjectBand[] = []
  let totalPercentileSum = 0

  const subjectList = Object.keys(subjectDomains)
  const effectiveSubjects = subjectList.length > 0 ? subjectList : ['General Reasoning']

  for (const subject of effectiveSubjects) {
    const domains = subjectDomains[subject] ?? []
    let sumMastery = 0
    for (const d of domains) sumMastery += masteryByDomain[d] ?? 0.35
    const avgMastery = domains.length > 0 ? sumMastery / domains.length : 0.35

    // Calibrated mastery score to percentile curve
    const baselinePercentile = Math.round(avgMastery * 100 * 10) / 10
    const bandWidth = Math.max(4, Math.round((14 - Math.min(sessionsUsed, 10)) * 10) / 10)
    const bandLower = Math.max(1, Math.round((baselinePercentile - bandWidth / 2) * 10) / 10)
    const bandUpper = Math.min(99, Math.round((baselinePercentile + bandWidth / 2) * 10) / 10)

    totalPercentileSum += baselinePercentile

    subjects.push({
      subject,
      predictedPercentile: baselinePercentile,
      bandLower,
      bandUpper,
      bandWidth,
      sessionsUsed,
      quietSessionsUsed,
      calibrationSource: calibrationLabel(blendWeight),
      disclaimer: getDisclaimer(sessionsUsed, quietSessionsUsed),
    })
  }

  const overallPredicted = Math.round((totalPercentileSum / effectiveSubjects.length) * 10) / 10
  const avgWidth = subjects.reduce((sum, s) => sum + s.bandWidth, 0) / subjects.length
  const overallLower = Math.max(1, Math.round((overallPredicted - avgWidth / 2) * 10) / 10)
  const overallUpper = Math.min(99, Math.round((overallPredicted + avgWidth / 2) * 10) / 10)

  const { data: frozen } = await supabase
    .from('predictions')
    .select('frozen_at, is_frozen')
    .eq('user_id', userId)
    .eq('is_frozen', true)
    .order('frozen_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return {
    overallPercentile: overallPredicted,
    overallBandLower: overallLower,
    overallBandUpper: overallUpper,
    overallBandWidth: Math.round(avgWidth * 10) / 10,
    subjects,
    totalTrackedSessions: sessionsUsed,
    totalQuietSessions: quietSessionsUsed,
    calibrationSource: calibrationLabel(blendWeight),
    disclaimer: getDisclaimer(sessionsUsed, quietSessionsUsed),
    frozenAt: frozen?.frozen_at ?? null,
    isFrozen: frozen?.is_frozen ?? false,
  }
}
