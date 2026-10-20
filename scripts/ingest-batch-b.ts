// Path: scripts/ingest-batch-b.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { IELTS_BANK } from "../lib/data/banks/ielts";
import { TOEFL_BANK } from "../lib/data/banks/toefl";
import taxonomy from "../lib/taxonomies.json";

dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.local", override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(url, key);

async function ingestBatchB() {
  console.log("=== Starting Ingestion for Batch B (IELTS Academic & TOEFL iBT) ===");

  // 1. Fetch existing question texts for IELTS Academic and TOEFL iBT
  const { data: existingRows, error: fetchErr } = await supabase
    .from("question_bank")
    .select("exam_name, question_text")
    .in("exam_name", ["IELTS Academic", "TOEFL iBT"]);

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    process.exit(1);
  }

  const existingSet = new Set(
    (existingRows || []).map((r) => `${r.exam_name}::${r.question_text.trim()}`)
  );
  console.log(`Existing DB records for Batch B: ${existingSet.size}`);

  const allToSeed = [...IELTS_BANK, ...TOEFL_BANK];
  console.log(`Curated questions ready to seed: ${allToSeed.length} (IELTS: ${IELTS_BANK.length}, TOEFL: ${TOEFL_BANK.length})`);

  let inserted = 0;
  let skipped = 0;

  for (const q of allToSeed) {
    const key = `${q.exam_name}::${q.question_text.trim()}`;
    if (existingSet.has(key)) {
      skipped++;
      continue;
    }

    const record = {
      exam_name: q.exam_name,
      subject: q.subject,
      skill_domain: q.skill_domain,
      difficulty_tier: q.difficulty_tier,
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation || "",
      distractor_analysis: q.distractor_analysis || {},
      misconception: q.misconception || null,
      time_estimate_seconds: q.time_estimate_seconds || 60,
    };

    const { error: insertErr } = await supabase.from("question_bank").insert(record);
    if (insertErr) {
      console.error(`Insert error for [${q.exam_name} / ${q.skill_domain}]:`, insertErr.message);
    } else {
      inserted++;
      existingSet.add(key);
    }
  }

  console.log(`\n=== Batch B Ingestion Complete ===`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (already in DB): ${skipped}`);

  // 2. Verification query per domain
  console.log(`\n=== Verifying Canonical Domain Counts in Remote DB ===`);
  const { data: allBatchB, error: verifyErr } = await supabase
    .from("question_bank")
    .select("exam_name, skill_domain")
    .in("exam_name", ["IELTS Academic", "TOEFL iBT"]);

  if (verifyErr) {
    console.error("Verification query error:", verifyErr);
    return;
  }

  const counts: Record<string, Record<string, number>> = {
    "IELTS Academic": {},
    "TOEFL iBT": {},
  };

  for (const r of allBatchB || []) {
    if (!counts[r.exam_name]) counts[r.exam_name] = {};
    counts[r.exam_name][r.skill_domain] = (counts[r.exam_name][r.skill_domain] || 0) + 1;
  }

  console.log(`\n--- IELTS Academic (Total in DB: ${(allBatchB || []).filter(r => r.exam_name === "IELTS Academic").length}) ---`);
  const ieltsExpected = [
    ...(taxonomy as any)["IELTS Academic"].Reading,
    ...(taxonomy as any)["IELTS Academic"].Listening,
  ];
  for (const domain of ieltsExpected) {
    const count = counts["IELTS Academic"][domain] || 0;
    const status = count >= 11 ? "PASS" : "FAIL";
    console.log(`  [${status}] ${domain}: ${count} questions`);
  }

  console.log(`\n--- TOEFL iBT (Total in DB: ${(allBatchB || []).filter(r => r.exam_name === "TOEFL iBT").length}) ---`);
  const toeflExpected = [
    ...(taxonomy as any)["TOEFL iBT"].Reading,
    ...(taxonomy as any)["TOEFL iBT"].Listening,
  ];
  for (const domain of toeflExpected) {
    const count = counts["TOEFL iBT"][domain] || 0;
    const status = count >= 11 ? "PASS" : "FAIL";
    console.log(`  [${status}] ${domain}: ${count} questions`);
  }
}

ingestBatchB().catch(console.error);
