// Path: lib/actions/duel.ts
"use server";

import { z } from "zod";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { resend, SENDER_EMAIL } from "@/lib/email/resend";
import { generateDuelResultEmailHtml } from "@/lib/email/templates/duel-result-notification";

export interface DuelAttempt {
  id: string;
  peer_name: string;
  score: number;
  total: number;
  pct: number;
  created_at: string;
}

const SubmitDuelAttemptSchema = z.object({
  shareToken: z.string().min(1, "Share token is required"),
  peerName: z.string().trim().min(1, "Name is required").max(40, "Name is too long"),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
});

export async function submitDuelAttemptAction(rawInput: {
  shareToken: string;
  peerName: string;
  score: number;
  total: number;
}): Promise<{
  success: boolean;
  attempts?: DuelAttempt[];
  error?: string;
}> {
  const parsed = SubmitDuelAttemptSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid input payload",
    };
  }

  if (!isSupabaseConfigured) {
    return { success: false, error: "Database service unconfigured" };
  }

  const { shareToken, peerName, score, total } = parsed.data;

  try {
    // 1. Fetch current result card
    const { data: card, error: fetchError } = await supabaseAdmin
      .from("result_cards")
      .select("id, user_id, card_data")
      .eq("share_token", shareToken)
      .maybeSingle();

    if (fetchError || !card) {
      return { success: false, error: "Duel session not found or link expired" };
    }

    const cardData = (card.card_data as Record<string, any>) || {};
    const existingAttempts: DuelAttempt[] = Array.isArray(cardData.attempts)
      ? cardData.attempts
      : [];

    // Deduplicate or append new attempt
    const newAttempt: DuelAttempt = {
      id: crypto.randomUUID(),
      peer_name: peerName,
      score,
      total,
      pct: total > 0 ? Math.round((score / total) * 100) : 0,
      created_at: new Date().toISOString(),
    };

    const updatedAttempts = [newAttempt, ...existingAttempts].slice(0, 50); // Keep latest 50

    // 2. Persist updated card data
    const { error: updateError } = await supabaseAdmin
      .from("result_cards")
      .update({
        card_data: {
          ...cardData,
          attempts: updatedAttempts,
        },
      })
      .eq("id", card.id);

    if (updateError) {
      console.error("[SubmitDuel] Update error:", updateError);
      return { success: false, error: "Failed to persist duel attempt" };
    }

    // 3. Dispatch Async Notification Email to Challenger (Non-blocking)
    if (card.user_id && resend) {
      (async () => {
        try {
          const { data: userData, error: userError } =
            await supabaseAdmin.auth.admin.getUserById(card.user_id);

          if (!userError && userData?.user?.email) {
            const creatorEmail = userData.user.email;
            const creatorName =
              userData.user.user_metadata?.full_name ||
              userData.user.user_metadata?.name ||
              "Test-Taker";

            const examName = cardData.exam_name || "Standardized Exam";
            const challengerScore = cardData.correct_count ?? cardData.score ?? 0;
            const challengerTotal = cardData.total_questions ?? total;
            const baseUrl =
              process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";
            const duelUrl = `${baseUrl}/s/${shareToken}`;

            await resend.emails.send({
              from: SENDER_EMAIL,
              to: creatorEmail,
              subject: `⚔️ Quiz Duel: ${peerName} scored ${score}/${total} on your ${examName} challenge!`,
              html: generateDuelResultEmailHtml({
                challengerName: creatorName,
                peerName,
                examName,
                challengerScore,
                peerScore: score,
                total: challengerTotal,
                duelUrl,
              }),
            });
          }
        } catch (emailErr) {
          console.warn("[SubmitDuel] Non-blocking email dispatch failed:", emailErr);
        }
      })();
    }

    return {
      success: true,
      attempts: updatedAttempts,
    };
  } catch (err: unknown) {
    console.error("[SubmitDuel] Unexpected error:", err);
    return { success: false, error: "Unexpected error recording score" };
  }
}
