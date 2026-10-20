// Path: lib/actions/tutor.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ExamProfileSchema,
  type ExamProfileInput,
  SessionDiscardSchema,
  type SessionDiscardInput,
} from "@/lib/validations/tutor";
import { getTimeMode } from "@/lib/sm2";
import { TUTOR_CONFIG } from "@/lib/constants/tutor";
import { revalidatePath } from "next/cache";
import taxonomy from "@/lib/taxonomies.json";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomy as unknown as TaxonomyData;

export async function createExamProfile(
  input: ExamProfileInput
): Promise<{ profile_id: string } | { error: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Sign in to create your exam profile." };
  }

  const parsed = ExamProfileSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid input.";
    return { error: firstError };
  }

  const { exam_name, target_date, self_assessments, active_targets } = parsed.data;

  const daysRemaining = Math.ceil(
    (new Date(target_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const time_mode = getTimeMode(daysRemaining);

  const { data: existingProfile } = await supabase
    .from("exam_profiles")
    .select("profile_id")
    .eq("user_id", user.id)
    .eq("exam_name", exam_name)
    .eq("is_active", true)
    .maybeSingle();

  let profileId: string;

  if (existingProfile) {
    profileId = existingProfile.profile_id;
    const { error: updateError } = await supabase
      .from("exam_profiles")
      .update({ target_date, time_mode, active_targets })
      .eq("profile_id", profileId);

    if (updateError) {
      console.error("[createExamProfile] Profile update error:", updateError);
      return { error: "Failed to update your exam profile. Please try again." };
    }
  } else {
    const { data: profile, error: profileError } = await supabase
      .from("exam_profiles")
      .insert({
        user_id: user.id,
        exam_name,
        target_date,
        time_mode,
        is_active: true,
        active_targets,
      })
      .select("profile_id")
      .single();

    if (profileError || !profile) {
      console.error("[createExamProfile] Profile insert error:", profileError);
      return { error: "Failed to create your exam profile. Please try again." };
    }

    profileId = profile.profile_id;
  }

  // Deactivate any other active profiles
  await supabase
    .from("exam_profiles")
    .update({ is_active: false })
    .eq("user_id", user.id)
    .eq("is_active", true)
    .neq("profile_id", profileId);

  const now = new Date().toISOString();
  const masteryMap = new Map<string, number>();
  const examSubjects = taxonomyData[exam_name] ?? {};

  for (const [subject, assessment] of Object.entries(self_assessments)) {
    const domains = examSubjects[subject] ?? [subject];
    const prior = TUTOR_CONFIG.MASTERY_PRIORS[assessment];
    for (const domain of domains) {
      const existing = masteryMap.get(domain);
      if (existing === undefined || prior < existing) {
        masteryMap.set(domain, prior);
      }
    }
  }

  const masteryRows = [...masteryMap.entries()].map(([domain, prior]) => ({
    user_id: user.id,
    exam_profile_id: profileId,
    skill_domain: domain,
    mastery_score: prior,
    total_attempted: 0,
    total_correct: 0,
    streak: 0,
    review_interval_days: TUTOR_CONFIG.SM2_DEFAULTS.initial_interval_days,
    review_ease_factor: TUTOR_CONFIG.SM2_DEFAULTS.initial_ease_factor,
    next_review_at: now,
    last_seen_at: now,
  }));

  const { error: masteryError } = await supabase
    .from("concept_mastery")
    .upsert(masteryRows, {
      onConflict: "user_id, exam_profile_id, skill_domain",
    });

  if (masteryError) {
    console.error("[createExamProfile] Mastery upsert error:", masteryError);
    return { error: "Failed to save your self-assessments. Please try again." };
  }

  revalidatePath("/home");
  revalidatePath("/dashboard");
  revalidatePath("/setup");

  return { profile_id: profileId };
}

export async function discardSessionAction(
  input: SessionDiscardInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Sign in to manage your sessions." };
  }

  const parsed = SessionDiscardSchema.safeParse(input);
  if (!parsed.success) {
    const firstErr = Object.values(parsed.error.flatten().fieldErrors).flat()[0] ?? "Invalid session ID.";
    return { success: false, error: firstErr };
  }

  const { session_id } = parsed.data;

  // Verify ownership
  const { data: session, error: sessionErr } = await supabase
    .from("sessions")
    .select("id, user_id, status")
    .eq("id", session_id)
    .single();

  if (sessionErr || !session || session.user_id !== user.id) {
    return { success: false, error: "Session not found." };
  }

  // Delete answers first, then session (guarantees clean cascade even without DB cascade rule)
  await supabase
    .from("session_answers")
    .delete()
    .eq("session_id", session_id)
    .eq("user_id", user.id);

  const { error: deleteErr } = await supabase
    .from("sessions")
    .delete()
    .eq("id", session_id)
    .eq("user_id", user.id);

  if (deleteErr) {
    console.error("[discardSessionAction] Delete error:", deleteErr);
    return { success: false, error: "Failed to discard session." };
  }

  revalidatePath("/analytics");
  revalidatePath("/history");
  revalidatePath("/home");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function cleanupGhostSessionsAction(): Promise<{ success: boolean; deletedCount: number; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, deletedCount: 0, error: "Unauthorized" };
  }

  // Fetch all active sessions for the user
  const { data: activeSessions, error: fetchErr } = await supabase
    .from("sessions")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (fetchErr || !activeSessions || activeSessions.length === 0) {
    return { success: true, deletedCount: 0 };
  }

  const sessionIds = activeSessions.map((s) => s.id);

  // Check which sessions have answers
  const { data: answers } = await supabase
    .from("session_answers")
    .select("session_id")
    .in("session_id", sessionIds);

  const answeredIds = new Set((answers || []).map((a) => a.session_id));
  const ghostIds = sessionIds.filter((id) => !answeredIds.has(id));

  if (ghostIds.length > 0) {
    await supabase
      .from("sessions")
      .delete()
      .in("id", ghostIds)
      .eq("user_id", user.id);

    revalidatePath("/analytics");
    revalidatePath("/history");
    revalidatePath("/home");
    revalidatePath("/dashboard");
  }

  return { success: true, deletedCount: ghostIds.length };
}
