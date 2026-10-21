// Path: lib/actions/tutor.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
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

  // Check if a profile for this exam already exists for this user (active or inactive)
  const { data: existingProfile } = await supabase
    .from("exam_profiles")
    .select("profile_id, is_active")
    .eq("user_id", user.id)
    .eq("exam_name", exam_name)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let profileId: string;

  if (existingProfile) {
    profileId = existingProfile.profile_id;
    const { error: updateError } = await supabase
      .from("exam_profiles")
      .update({
        target_date,
        time_mode,
        active_targets,
        is_active: true,
      })
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

  // Fetch existing concept mastery rows for this profile to prevent wiping user progress
  const { data: existingMasteryRows } = await supabase
    .from("concept_mastery")
    .select("skill_domain, total_attempted, mastery_score")
    .eq("user_id", user.id)
    .eq("exam_profile_id", profileId);

  const existingMasteryMap = new Map(
    (existingMasteryRows ?? []).map((r) => [r.skill_domain, r])
  );

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

  const rowsToInsert: Array<{
    user_id: string;
    exam_profile_id: string;
    skill_domain: string;
    mastery_score: number;
    total_attempted: number;
    total_correct: number;
    streak: number;
    review_interval_days: number;
    review_ease_factor: number;
    next_review_at: string;
    last_seen_at: string;
  }> = [];

  const domainsToUpdatePrior: Array<{
    domain: string;
    prior: number;
  }> = [];

  for (const [domain, prior] of masteryMap.entries()) {
    const existing = existingMasteryMap.get(domain);
    if (!existing) {
      rowsToInsert.push({
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
      });
    } else if (existing.total_attempted === 0) {
      // Untested domain: allow updating initial baseline prior
      domainsToUpdatePrior.push({ domain, prior });
    }
    // Existing domains with total_attempted > 0 are left untouched to preserve user practice data
  }

  if (rowsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("concept_mastery")
      .insert(rowsToInsert);

    if (insertError) {
      console.error("[createExamProfile] Mastery insert error:", insertError);
      return { error: "Failed to initialize syllabus topics. Please try again." };
    }
  }

  if (domainsToUpdatePrior.length > 0) {
    for (const item of domainsToUpdatePrior) {
      await supabase
        .from("concept_mastery")
        .update({ mastery_score: item.prior })
        .eq("user_id", user.id)
        .eq("exam_profile_id", profileId)
        .eq("skill_domain", item.domain)
        .eq("total_attempted", 0);
    }
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

  // Use privileged client for cascading deletions if configured, falling back to authenticated client
  const db = isSupabaseConfigured ? supabaseAdmin : supabase;

  // Clean up dependent child records to ensure no foreign key lockups or dangling data
  await Promise.allSettled([
    db
      .from("comeback_queue_items")
      .delete()
      .eq("original_session_id", session_id)
      .eq("user_id", user.id),
    db
      .from("completion_time_logs")
      .delete()
      .eq("session_id", session_id)
      .eq("user_id", user.id),
    db
      .from("session_answers")
      .delete()
      .eq("session_id", session_id)
      .eq("user_id", user.id),
  ]);

  const { error: deleteErr } = await db
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

export async function discardAllActiveSessionsAction(): Promise<{
  success: boolean;
  discardedCount: number;
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, discardedCount: 0, error: "Unauthorized" };
  }

  const db = isSupabaseConfigured ? supabaseAdmin : supabase;

  // Find all active sessions for this user
  const { data: activeSessions, error: fetchErr } = await db
    .from("sessions")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (fetchErr || !activeSessions || activeSessions.length === 0) {
    return { success: true, discardedCount: 0 };
  }

  const sessionIds = activeSessions.map((s) => s.id);

  // Clean up all related child records
  await Promise.allSettled([
    db
      .from("comeback_queue_items")
      .delete()
      .in("original_session_id", sessionIds)
      .eq("user_id", user.id),
    db
      .from("completion_time_logs")
      .delete()
      .in("session_id", sessionIds)
      .eq("user_id", user.id),
    db
      .from("session_answers")
      .delete()
      .in("session_id", sessionIds)
      .eq("user_id", user.id),
  ]);

  const { error: deleteErr } = await db
    .from("sessions")
    .delete()
    .in("id", sessionIds)
    .eq("user_id", user.id);

  if (deleteErr) {
    console.error("[discardAllActiveSessionsAction] Delete error:", deleteErr);
    return { success: false, discardedCount: 0, error: "Failed to discard all sessions." };
  }

  revalidatePath("/analytics");
  revalidatePath("/history");
  revalidatePath("/home");
  revalidatePath("/dashboard");

  return { success: true, discardedCount: sessionIds.length };
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

  const db = isSupabaseConfigured ? supabaseAdmin : supabase;

  // Fetch all active sessions for the user
  const { data: activeSessions, error: fetchErr } = await db
    .from("sessions")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (fetchErr || !activeSessions || activeSessions.length === 0) {
    return { success: true, deletedCount: 0 };
  }

  const sessionIds = activeSessions.map((s) => s.id);

  // Check which sessions have answers
  const { data: answers } = await db
    .from("session_answers")
    .select("session_id")
    .in("session_id", sessionIds);

  const answeredIds = new Set((answers || []).map((a) => a.session_id));
  const ghostIds = sessionIds.filter((id) => !answeredIds.has(id));

  if (ghostIds.length > 0) {
    await db
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

