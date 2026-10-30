// Path: app/api/cron/comeback-dispatch/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { resend, SENDER_EMAIL } from "@/lib/email/resend";
import { generateComebackEmailHtml } from "@/lib/email/templates/comeback-notification";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleDispatch(req);
}

export async function POST(req: NextRequest) {
  return handleDispatch(req);
}

async function handleDispatch(req: NextRequest) {
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
    const now = new Date().toISOString();

    // 2. Query all uncleared comeback items whose stage deadline has passed
    const { data: dueItems, error: fetchErr } = await supabaseAdmin
      .from("comeback_queue_items")
      .select("user_id, skill_domain, stage, stage_deadline")
      .eq("cleared", false)
      .lte("stage_deadline", now)
      .order("stage_deadline", { ascending: true });

    if (fetchErr) {
      console.error("[ComebackDispatch] DB query error:", fetchErr);
      return NextResponse.json({ error: "Failed to query queue items" }, { status: 500 });
    }

    if (!dueItems || dueItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No users have decaying comeback items due.",
        dispatched: 0,
      });
    }

    // 3. Aggregate due items by user_id
    const userMap = new Map<
      string,
      { count: number; domains: Set<string> }
    >();

    for (const item of dueItems) {
      if (!item.user_id) continue;
      const existing = userMap.get(item.user_id) || {
        count: 0,
        domains: new Set<string>(),
      };
      existing.count += 1;
      if (item.skill_domain) {
        existing.domains.add(item.skill_domain);
      }
      userMap.set(item.user_id, existing);
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";

    const results = {
      totalEligibleUsers: userMap.size,
      sent: 0,
      failed: 0,
      skipped: 0,
    };

    // 4. Dispatch emails with rate-limiting safety
    for (const [userId, stats] of userMap.entries()) {
      try {
        const { data: userData, error: userErr } =
          await supabaseAdmin.auth.admin.getUserById(userId);

        if (userErr || !userData?.user?.email) {
          results.skipped += 1;
          continue;
        }

        const email = userData.user.email;
        const fullName =
          userData.user.user_metadata?.full_name ||
          userData.user.user_metadata?.name ||
          "Student";

        const decayingDomainsList = Array.from(stats.domains);
        const actionUrl = `${baseUrl}/home?source=comeback_email`;

        const html = generateComebackEmailHtml({
          userName: fullName,
          dueCount: stats.count,
          decayingDomains: decayingDomainsList,
          actionUrl,
        });

        const subject = `⚠️ ${stats.count} Concept ${stats.count === 1 ? "Trap" : "Traps"
          } Decaying in Memory — Quick Review Due`;

        const sendResult = await resend.emails.send({
          from: SENDER_EMAIL,
          to: email,
          subject,
          html,
        });

        if (sendResult.error) {
          console.error(`[ComebackDispatch] Resend error for ${email}:`, sendResult.error);
          results.failed += 1;
        } else {
          results.sent += 1;
        }
      } catch (sendErr) {
        console.error(`[ComebackDispatch] Exception sending to user ${userId}:`, sendErr);
        results.failed += 1;
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (err: unknown) {
    console.error("[ComebackDispatch] Unhandled error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}

