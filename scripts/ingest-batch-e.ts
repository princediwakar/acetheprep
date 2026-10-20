// Path: scripts/ingest-batch-e.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { CFA_BANK } from "../lib/data/banks/cfa";
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

async function ingestBatchE() {
  console.log("=== Starting Ingestion for Batch E (CFA Level 1) ===");
  console.log(`Total questions in CFA local bank: ${CFA_BANK.length}`);

  // Fetch existing rows for CFA Level 1
  const { data: existingRows, error: fetchErr } = await supabase
    .from("question_bank")
    .select("exam_name, question_text")
    .eq("exam_name", "CFA Level 1");

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    process.exit(1);
  }

  const existingSet = new Set(
    (existingRows || []).map((r) => `${r.exam_name}::${r.question_text.trim()}`)
  );
  console.log(`Existing DB records for CFA Level 1: ${existingSet.size}`);

  let inserted = 0;
  let skipped = 0;
  const toInsert: any[] = [];

  for (const q of CFA_BANK) {
    const key = `${q.exam_name}::${q.question_text.trim()}`;
    if (existingSet.has(key)) {
      skipped++;
      continue;
    }

    toInsert.push({
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
    });
  }

  console.log(`Inserting ${toInsert.length} new questions (Skipping ${skipped} existing)...`);

  // Insert in batches of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE);
    const { error: insErr } = await supabase.from("question_bank").insert(batch);
    if (insErr) {
      console.error(`Error inserting batch at ${i}:`, insErr);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`Inserted ${inserted} / ${toInsert.length} questions...`);
  }

  console.log(`\nBatch E Ingestion complete! Total inserted: ${inserted}, Skipped: ${skipped}`);

  // Verification step against taxonomy
  console.log("\n=== Verifying Canonical Domain Counts in Remote DB ===");
  const cfaTax = (taxonomy as any)["CFA Level 1"];

  const { data: rows, error: qErr } = await supabase
    .from("question_bank")
    .select("skill_domain")
    .eq("exam_name", "CFA Level 1");

  if (qErr) {
    console.error("Error querying CFA Level 1 rows:", qErr);
    process.exit(1);
  }

  const counts: Record<string, number> = {};
  for (const r of rows || []) {
    counts[r.skill_domain] = (counts[r.skill_domain] || 0) + 1;
  }

  console.log(`\nResults for CFA Level 1 (Total rows in DB: ${rows?.length}):`);
  const allDomains: string[] = [];
  for (const sub of Object.keys(cfaTax)) {
    allDomains.push(...cfaTax[sub]);
  }

  let allPassed = true;
  for (const domain of allDomains) {
    const c = counts[domain] || 0;
    const status = c >= 11 ? "PASS" : "FAIL (SHORT)";
    if (c < 11) allPassed = false;
    console.log(`  [${status}] ${domain}: ${c} questions`);
  }

  if (allPassed) {
    console.log("\n>>> ALL 42 CFA LEVEL 1 DOMAINS MEET OR EXCEED THRESHOLD (>= 11)! <<<");
  } else {
    console.error("\n>>> SOME CFA DOMAINS FAILED VERIFICATION! <<<");
    process.exit(1);
  }
}

ingestBatchE().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
