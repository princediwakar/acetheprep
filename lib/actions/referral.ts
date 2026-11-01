// Path: lib/actions/referral.ts
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { resend, SENDER_EMAIL } from "@/lib/email/resend";
import { generateReferralRewardEmailHtml } from "@/lib/email/templates/referral-reward-notification";
import { revalidatePath } from "next/cache";

const ClaimReferralSchema = z.object({
  referrerId: z.string().uuid("Invalid referrer ID format"),
});

export async function getUserReferralInfoAction(): Promise<{
  success: boolean;
  referralUrl?: string;
  referralCode?: string;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Authentication required" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";
  const referralUrl = `${baseUrl}/setup?ref=${user.id}`;

  return {
    success: true,
    referralUrl,
    referralCode: user.id,
  };
}

export async function claimReferralPassAction(rawInput: {
  referrerId: string;
}): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const parsed = ClaimReferralSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Invalid referral code" };
  }

  const { referrerId } = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Please sign in to claim your Pro pass" };
  }

  if (user.id === referrerId) {
    return { success: false, error: "You cannot redeem your own referral link" };
  }

  if (!isSupabaseConfigured) {
    return { success: false, error: "Database service unconfigured" };
  }

  try {
    // 1. Check if the referrer exists
    const { data: referrerUser, error: refUserErr } =
      await supabaseAdmin.auth.admin.getUserById(referrerId);

    if (refUserErr || !referrerUser?.user) {
      return { success: false, error: "Referral code not found" };
    }

    // 2. Prevent duplicate claims: check if this user already has an active or past referral pass
    const { data: existingSub } = await supabaseAdmin
      .from("subscriptions")
      .select("id, plan_type, status, current_period_end")
      .eq("user_id", user.id)
      .eq("plan_type", "referral_pass")
      .maybeSingle();

    if (existingSub) {
      return {
        success: false,
        error: "You have already redeemed a Study Partner referral pass.",
      };
    }

    const now = Date.now();
    const PASS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
    const refereeExpiry = new Date(now + PASS_DURATION_MS).toISOString();

    // 3. Grant 7 Days Pro to New User (Referee)
    const { error: refereeSubErr } = await supabaseAdmin.from("subscriptions").insert({
      user_id: user.id,
      dodo_subscription_id: `ref_pass_${user.id.slice(0, 8)}_${Date.now().toString(36)}`,
      status: "active",
      plan_type: "referral_pass",
      product_id: "referral_reward",
      current_period_end: refereeExpiry,
      updated_at: new Date().toISOString(),
    });

    if (refereeSubErr) {
      console.error("[Referral] Referee insert error:", refereeSubErr);
      return { success: false, error: "Failed to activate your Pro pass" };
    }

    // 4. Grant / Extend 7 Days Pro for the Referrer
    const { data: existingRefSub } = await supabaseAdmin
      .from("subscriptions")
      .select("id, current_period_end, status")
      .eq("user_id", referrerId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let referrerExpiry: string;
    if (existingRefSub?.current_period_end && new Date(existingRefSub.current_period_end).getTime() > now) {
      // Extend existing subscription by 7 days
      referrerExpiry = new Date(
        new Date(existingRefSub.current_period_end).getTime() + PASS_DURATION_MS
      ).toISOString();
      await supabaseAdmin
        .from("subscriptions")
        .update({
          current_period_end: referrerExpiry,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRefSub.id);
    } else {
      referrerExpiry = new Date(now + PASS_DURATION_MS).toISOString();
      await supabaseAdmin.from("subscriptions").insert({
        user_id: referrerId,
        dodo_subscription_id: `ref_reward_${referrerId.slice(0, 8)}_${Date.now().toString(36)}`,
        status: "active",
        plan_type: "referral_pass",
        product_id: "referral_reward",
        current_period_end: referrerExpiry,
        updated_at: new Date().toISOString(),
      });
    }

    // 5. Send notification email to the referrer (Non-blocking)
    if (resend && referrerUser.user.email) {
      (async () => {
        try {
          const inviterName =
            referrerUser.user.user_metadata?.full_name ||
            referrerUser.user.user_metadata?.name ||
            "Test-Taker";
          const friendName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "A study partner";
          const expiryStr = new Date(referrerExpiry).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          await resend.emails.send({
            from: SENDER_EMAIL,
            to: referrerUser.user.email!,
            subject: `🎉 Study Partner Joined: You both unlocked 7 Days of Pro!`,
            html: generateReferralRewardEmailHtml({
              inviterName,
              friendName,
              daysGranted: 7,
              expiryDateStr: expiryStr,
            }),
          });
        } catch (emailErr) {
          console.warn("[Referral] Email notification failed:", emailErr);
        }
      })();
    }

    revalidatePath("/home");
    revalidatePath("/pricing");
    revalidatePath("/setup");

    return {
      success: true,
      message: "7-Day Pro Pass unlocked! Unlimited daily questions and full mocks activated.",
    };
  } catch (err: unknown) {
    console.error("[Referral] Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred while redeeming pass." };
  }
}
