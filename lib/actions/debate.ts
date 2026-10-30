"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { enqueueComeback } from "@/lib/comeback-queue";

const SaveErrorLogSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  examName: z.string().optional(),
  skillDomain: z.string().optional(),
  difficultyTier: z.union([z.number(), z.string()]).optional(),
});

/**
 * Save question directly to student's automated Error Log (Comeback Queue)
 */
export async function saveQuestionToErrorLogAction(
  rawInput: z.infer<typeof SaveErrorLogSchema>
): Promise<{
  success: boolean;
  unauthenticated?: boolean;
  message?: string;
  error?: string;
}> {
  const parsed = SaveErrorLogSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Invalid request payload" };
  }

  const { questionId, examName, skillDomain, difficultyTier } = parsed.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      unauthenticated: true,
      error: "Authentication required to save to your personal Error Log.",
    };
  }

  try {
    // 1. Get or create active profile
    let { data: profile } = await supabase
      .from("exam_profiles")
      .select("profile_id, exam_name")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle();

    if (!profile) {
      const targetExam = examName || "GMAT Focus";
      const { data: newProfile, error: profileErr } = await supabase
        .from("exam_profiles")
        .insert({
          user_id: user.id,
          exam_name: targetExam,
          target_score: 700,
          current_stage: "diagnostic",
          is_active: true,
        })
        .select("profile_id, exam_name")
        .single();

      if (profileErr) throw profileErr;
      profile = newProfile;
    }

    const domain = skillDomain || "General Critical Traps";
    const tier = String(difficultyTier || 2);

    // 2. Enqueue into comeback queue
    await enqueueComeback(supabase, {
      userId: user.id,
      examProfileId: profile.profile_id,
      skillDomain: domain,
      questionId,
      difficultyTier: tier,
      originalSessionId: "question_inbound",
    });

    return {
      success: true,
      message: "Successfully added to your Error Log! It will mount on your morning review.",
    };
  } catch (err: any) {
    console.error("[saveQuestionToErrorLogAction] Error:", err);
    return {
      success: false,
      error: err?.message || "Failed to save to Error Log. Please try again.",
    };
  }
}
