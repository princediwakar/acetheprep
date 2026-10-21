// Path: scripts/reseed-gmat-bank-clean.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { GMAT_BANK } from "../lib/data/banks/gmat";

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function main() {
  console.log("Starting GMAT Focus reseed operation...");
  const supabase = getAdminClient();

  // 1. Check existing questions in DB
  const { data: beforeCount, error: countErr } = await supabase
    .from("question_bank")
    .select("id, subject, difficulty_tier")
    .eq("exam_name", "GMAT Focus");

  if (countErr) {
    throw new Error(`Failed to query existing GMAT questions: ${countErr.message}`);
  }
  console.log(`Found ${beforeCount?.length || 0} existing GMAT Focus questions in DB.`);

  // 2. Delete all existing GMAT Focus questions
  console.log("Purging all existing GMAT Focus questions from database...");
  const { error: delErr } = await supabase
    .from("question_bank")
    .delete()
    .eq("exam_name", "GMAT Focus");

  if (delErr) {
    throw new Error(`Failed to delete existing GMAT questions: ${delErr.message}`);
  }
  console.log("Successfully purged stale GMAT Focus records.");

  // 3. Prepare fresh verified questions
  console.log(`Preparing ${GMAT_BANK.length} verified 700+ GMAT Focus questions...`);
  const insertRows = GMAT_BANK.map((q) => {
    const metadata: Record<string, any> = {};
    if (q.passage) metadata.passage = q.passage;
    if (q.passage_id) metadata.passage_id = q.passage_id;
    if ((q as any).sub_skill) metadata.sub_skill = (q as any).sub_skill;

    return {
      exam_name: q.exam_name,
      subject: q.subject,
      skill_domain: q.skill_domain,
      difficulty_tier: q.difficulty_tier,
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation,
      distractor_analysis: q.distractor_analysis || null,
      misconception: q.misconception || null,
      time_estimate_seconds: q.time_estimate_seconds || 60,
      metadata_json: Object.keys(metadata).length > 0 ? metadata : null,
    };
  });

  // 4. Batch insert in chunks of 50
  const CHUNK_SIZE = 50;
  for (let i = 0; i < insertRows.length; i += CHUNK_SIZE) {
    const chunk = insertRows.slice(i, i + CHUNK_SIZE);
    const { error: insErr } = await supabase.from("question_bank").insert(chunk);
    if (insErr) {
      throw new Error(`Insert failed on chunk ${i} - ${i + chunk.length}: ${insErr.message}`);
    }
    console.log(`Inserted questions ${i + 1} to ${Math.min(i + CHUNK_SIZE, insertRows.length)}...`);
  }

  // 5. Query verification
  const { data: verifyData, error: verifyErr } = await supabase
    .from("question_bank")
    .select("id, subject, difficulty_tier")
    .eq("exam_name", "GMAT Focus");

  if (verifyErr) {
    throw new Error(`Verification query failed: ${verifyErr.message}`);
  }

  const subjectCounts: Record<string, number> = {};
  const tierCounts: Record<number, number> = {};

  for (const row of verifyData || []) {
    subjectCounts[row.subject] = (subjectCounts[row.subject] || 0) + 1;
    tierCounts[row.difficulty_tier] = (tierCounts[row.difficulty_tier] || 0) + 1;
  }

  console.log("\n=== GMAT FOCUS RESEED VERIFICATION SUCCESS ===");
  console.log(`Total questions in DB: ${verifyData?.length}`);
  console.log("Subject breakdown:", subjectCounts);
  console.log("Tier breakdown:", tierCounts);
  console.log("Tier 1 count:", tierCounts[1] || 0);

  if (tierCounts[1] && tierCounts[1] > 0) {
    console.error("FATAL: Tier 1 questions still exist!");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Reseed failed:", err);
  process.exit(1);
});
