"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { recordRetryResult } from "@/lib/comeback-queue";
import { revalidatePath } from "next/cache";

const SubmitReviewSchema = z.object({
  queueItemId: z.string().uuid("Invalid queue item ID"),
  selectedOption: z.string().min(1).max(2),
  correctOption: z.string().min(1).max(2),
});

const PostponeReviewSchema = z.object({
  queueItemId: z.string().uuid("Invalid queue item ID"),
});

export async function submitTrapReviewAction(
  rawInput: z.infer<typeof SubmitReviewSchema>
): Promise<{
  success: boolean;
  isCorrect: boolean;
  cleared: boolean;
  advanced: boolean;
  error?: string;
}> {
  const parsed = SubmitReviewSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      isCorrect: false,
      cleared: false,
      advanced: false,
      error: parsed.error.issues[0]?.message || "Invalid payload",
    };
  }

  const { queueItemId, selectedOption, correctOption } = parsed.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      isCorrect: false,
      cleared: false,
      advanced: false,
      error: "Unauthorized",
    };
  }

  const isCorrect = selectedOption.trim().toUpperCase() === correctOption.trim().toUpperCase();

  try {
    const result = await recordRetryResult(supabase, queueItemId, isCorrect);
    revalidatePath("/mistakes");
    revalidatePath("/home");
    revalidatePath("/dashboard");

    return {
      success: true,
      isCorrect,
      cleared: result.cleared,
      advanced: result.advanced,
    };
  } catch (err: any) {
    console.error("[submitTrapReviewAction] Error:", err);
    return {
      success: false,
      isCorrect,
      cleared: false,
      advanced: false,
      error: err?.message || "Failed to record review response",
    };
  }
}

export async function postponeTrapReviewAction(
  rawInput: z.infer<typeof PostponeReviewSchema>
): Promise<{
  success: boolean;
  error?: string;
}> {
  const parsed = PostponeReviewSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Invalid payload" };
  }

  const { queueItemId } = parsed.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase
      .from("comeback_queue_items")
      .update({ stage_deadline: twoHoursFromNow })
      .eq("id", queueItemId)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/mistakes");
    revalidatePath("/home");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("[postponeTrapReviewAction] Error:", err);
    return {
      success: false,
      error: err?.message || "Failed to postpone review",
    };
  }
}

