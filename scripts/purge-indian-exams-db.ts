// Path: scripts/purge-indian-exams-db.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { supabaseAdmin } from "../lib/supabase/admin";

const DECOMMISSIONED_EXAMS = [
  "JEE Main",
  "NEET",
  "CAT",
  "GATE",
  "UPSC CSE",
  "UPSC Civil Services",
  "CLAT",
  "CA Foundation",
  "JEE Advanced",
];

async function purgeIndianExams() {
  console.log("=== Purging Indian Exams from Supabase ===");
  console.log("Target exams:", DECOMMISSIONED_EXAMS);

  // 1. Identify target profile IDs
  const { data: targetProfiles, error: profileErr } = await supabaseAdmin
    .from("exam_profiles")
    .select("profile_id, exam_name")
    .in("exam_name", DECOMMISSIONED_EXAMS);

  if (profileErr) {
    console.error("Failed to query exam_profiles:", profileErr);
    process.exit(1);
  }

  const profileIds = (targetProfiles || []).map((p) => p.profile_id);
  console.log(`Found ${profileIds.length} exam_profiles to purge:`, targetProfiles);

  if (profileIds.length > 0) {
    // 2. Identify sessions
    const { data: targetSessions, error: sessionErr } = await supabaseAdmin
      .from("sessions")
      .select("id")
      .in("exam_profile_id", profileIds);

    if (sessionErr) console.warn("Failed to query sessions:", sessionErr);
    const sessionIds = (targetSessions || []).map((s) => s.id);
    console.log(`Found ${sessionIds.length} sessions to purge.`);

    if (sessionIds.length > 0) {
      // 3. Delete session_answers
      const { error: ansErr } = await supabaseAdmin
        .from("session_answers")
        .delete()
        .in("session_id", sessionIds);
      if (ansErr) console.warn("Failed to delete session_answers:", ansErr);
      else console.log("Deleted matching session_answers.");

      // 4. Delete completion_time_logs
      const { error: ctlErr } = await supabaseAdmin
        .from("completion_time_logs")
        .delete()
        .in("session_id", sessionIds);
      if (ctlErr) console.warn("Failed to delete completion_time_logs:", ctlErr);
      else console.log("Deleted matching completion_time_logs.");
    }

    // 5. Delete sessions
    const { error: delSessErr } = await supabaseAdmin
      .from("sessions")
      .delete()
      .in("exam_profile_id", profileIds);
    if (delSessErr) console.warn("Failed to delete sessions:", delSessErr);
    else console.log("Deleted matching sessions.");

    // 6. Delete concept_mastery
    const { error: cmErr } = await supabaseAdmin
      .from("concept_mastery")
      .delete()
      .in("exam_profile_id", profileIds);
    if (cmErr) console.warn("Failed to delete concept_mastery:", cmErr);
    else console.log("Deleted matching concept_mastery.");

    // 7. Delete predictions
    const { error: predErr } = await supabaseAdmin
      .from("predictions")
      .delete()
      .in("exam_profile_id", profileIds);
    if (predErr) console.warn("Failed to delete predictions:", predErr);
    else console.log("Deleted matching predictions.");

    // 7b. Delete mastery_history
    const { error: mhErr } = await supabaseAdmin
      .from("mastery_history")
      .delete()
      .in("exam_profile_id", profileIds);
    if (mhErr) console.warn("Failed to delete mastery_history:", mhErr);
    else console.log("Deleted matching mastery_history.");

    // 8. Delete comeback_queue
    const { error: cqErr } = await supabaseAdmin
      .from("comeback_queue")
      .delete()
      .in("exam_profile_id", profileIds);
    if (cqErr) console.warn("Failed to delete comeback_queue:", cqErr);
    else console.log("Deleted matching comeback_queue.");

    // 9. Delete predictor_sessions
    const { error: psErr } = await supabaseAdmin
      .from("predictor_sessions")
      .delete()
      .in("exam_profile_id", profileIds);
    if (psErr) console.warn("Failed to delete predictor_sessions:", psErr);
    else console.log("Deleted matching predictor_sessions.");

    // 10. Delete exam_profiles
    const { error: delProfErr } = await supabaseAdmin
      .from("exam_profiles")
      .delete()
      .in("profile_id", profileIds);
    if (delProfErr) console.warn("Failed to delete exam_profiles:", delProfErr);
    else console.log("Deleted matching exam_profiles.");
  }

  // Also purge any predictor_sessions by exam_name
  const { error: psNameErr } = await supabaseAdmin
    .from("predictor_sessions")
    .delete()
    .in("exam_name", DECOMMISSIONED_EXAMS);
  if (psNameErr) console.warn("Failed to delete predictor_sessions by exam_name:", psNameErr);

  // 11. Delete question_bank rows
  console.log("Purging question_bank for decommissioned exams...");
  const { data: delQb, error: qbErr } = await supabaseAdmin
    .from("question_bank")
    .delete()
    .in("exam_name", DECOMMISSIONED_EXAMS)
    .select("id");

  if (qbErr) console.error("Failed to delete from question_bank:", qbErr);
  else console.log(`Deleted ${delQb?.length ?? 0} rows from question_bank.`);

  // 12. Delete exam_topic_weights rows
  console.log("Purging exam_topic_weights for decommissioned exams...");
  const { data: delEtw, error: etwErr } = await supabaseAdmin
    .from("exam_topic_weights")
    .delete()
    .in("exam_name", DECOMMISSIONED_EXAMS)
    .select("id");

  if (etwErr) console.error("Failed to delete from exam_topic_weights:", etwErr);
  else console.log(`Deleted ${delEtw?.length ?? 0} rows from exam_topic_weights.`);

  // Verify remaining exams in question_bank
  const { data: remainingQb } = await supabaseAdmin
    .from("question_bank")
    .select("exam_name");

  const counts: Record<string, number> = {};
  for (const row of remainingQb || []) {
    counts[row.exam_name] = (counts[row.exam_name] || 0) + 1;
  }
  console.log("\n=== Remaining question_bank counts ===");
  console.table(counts);

  console.log("\nPurge completed successfully!");
}

purgeIndianExams().catch((err) => {
  console.error("Purge script failed:", err);
  process.exit(1);
});
