// Path: app/api/cron/daily-question/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { resend, SENDER_EMAIL } from "@/lib/email/resend";
import { generateDailyQuestionEmailHtml } from "@/lib/email/templates/daily-question";
import { ALL_BANKS } from "@/lib/data/banks";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleDailyQuestionDispatch(req);
}

export async function POST(req: NextRequest) {
  return handleDailyQuestionDispatch(req);
}

async function handleDailyQuestionDispatch(req: NextRequest) {
  // 1. Verify Authorization (Bearer token or CRON_SECRET header)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    const customHeader = req.headers.get("x-cron-secret");
    const isAuthorized =
      authHeader === `Bearer ${cronSecret}` || customHeader === cronSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
    }
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { error: "Supabase Admin is not configured" },
      { status: 503 }
    );
  }

  if (!resend) {
    return NextResponse.json(
      { error: "Resend API key is not configured" },
      { status: 503 }
    );
  }

  try {
    // 2. Fetch all active exam profiles
    const { data: profiles, error: profileErr } = await supabaseAdmin
      .from("exam_profiles")
      .select("user_id, exam_name")
      .eq("is_active", true);

    if (profileErr) {
      console.error("[DailyQuestionCron] DB query error:", profileErr);
      return NextResponse.json({ error: "Failed to query exam profiles" }, { status: 500 });
    }

    if (!profiles || profiles.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No active users found for daily question dispatch.",
        dispatched: 0,
      });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

    // Day of the year for rotating questions daily
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    const results = {
      totalActiveUsers: profiles.length,
      sent: 0,
      failed: 0,
      skipped: 0,
    };

    // 3. Dispatch 1 question per user
    for (const profile of profiles) {
      try {
        const { data: userData, error: userErr } =
          await supabaseAdmin.auth.admin.getUserById(profile.user_id);

        if (userErr || !userData?.user?.email) {
          results.skipped += 1;
          continue;
        }

        const email = userData.user.email;
        const fullName =
          userData.user.user_metadata?.full_name ||
          userData.user.user_metadata?.name ||
          "Student";

        const examName = profile.exam_name || "GMAT Focus";

        // Find candidate questions for this exam
        const candidates = ALL_BANKS.filter(
          (q) => q.exam_name.toLowerCase() === examName.toLowerCase()
        );

        if (candidates.length === 0) {
          results.skipped += 1;
          continue;
        }

        // Deterministically pick a question for this user and this day
        const userCharSum = profile.user_id
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const questionIdx = (dayOfYear + userCharSum) % candidates.length;
        const question = candidates[questionIdx];

        // Generate the slug that matches findQuestion() in app/q/[id]/page.tsx
        const globalIdx = ALL_BANKS.indexOf(question);
        const examSlug = question.exam_name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const domainSlug = question.skill_domain.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const questionId = `${examSlug}-${domainSlug}-${globalIdx + 1}`;

        const html = generateDailyQuestionEmailHtml({
          userName: fullName,
          examName: question.exam_name,
          questionId,
          skillDomain: question.skill_domain,
          difficultyTier: question.difficulty_tier,
          questionText: question.question_text,
          options: question.options as Record<string, string>,
          baseUrl,
        });

        const subject = `⚡ Daily Drill: Can you solve this ${question.exam_name} trap?`;

        const sendResult = await resend.emails.send({
          from: SENDER_EMAIL,
          to: email,
          subject,
          html,
        });

        if (sendResult.error) {
          console.error(`[DailyQuestionCron] Resend error for ${email}:`, sendResult.error);
          results.failed += 1;
        } else {
          results.sent += 1;
        }
      } catch (err) {
        console.error(`[DailyQuestionCron] Failed for user ${profile.user_id}:`, err);
        results.failed += 1;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Dispatched daily question to ${results.sent} active users`,
      results,
    });
  } catch (error: any) {
    console.error("[DailyQuestionCron] Fatal handler error:", error);
    return NextResponse.json(
      { error: "Internal server error during dispatch" },
      { status: 500 }
    );
  }
}

