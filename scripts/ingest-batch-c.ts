// Path: scripts/ingest-batch-c.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { UPSC_BANK } from "../lib/data/banks/upsc";
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

async function ingestBatchC() {
  console.log("=== Starting Ingestion for Batch C (UPSC CSE) ===");

  const { data: existingRows, error: fetchErr } = await supabase
    .from("question_bank")
    .select("exam_name, question_text")
    .eq("exam_name", "UPSC CSE");

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    process.exit(1);
  }

  const existingSet = new Set(
    (existingRows || []).map((r) => `${r.exam_name}::${r.question_text.trim()}`)
  );
  console.log(`Existing DB records for UPSC CSE: ${existingSet.size}`);
  console.log(`Curated questions ready to seed: ${UPSC_BANK.length}`);

  let inserted = 0;
  let skipped = 0;

  for (const q of UPSC_BANK) {
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
      console.error(`Insert error for [${q.skill_domain}]:`, insertErr.message);
    } else {
      inserted++;
      existingSet.add(key);
    }
  }

  console.log(`\n=== Batch C Ingestion Complete ===`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (already in DB): ${skipped}`);

  console.log(`\n=== Verifying Canonical Domain Counts in Remote DB for UPSC CSE ===`);
  const { data: allUPSC, error: verifyErr } = await supabase
    .from("question_bank")
    .select("exam_name, skill_domain")
    .eq("exam_name", "UPSC CSE");

  if (verifyErr) {
    console.error("Verification query error:", verifyErr);
    return;
  }

  const counts: Record<string, number> = {};
  for (const r of allUPSC || []) {
    counts[r.skill_domain] = (counts[r.skill_domain] || 0) + 1;
  }

  const expectedDomains = [
    ...(taxonomy as any)["UPSC CSE"]["General Studies I"],
    ...(taxonomy as any)["UPSC CSE"]["General Studies II"],
    ...(taxonomy as any)["UPSC CSE"]["General Studies III"],
    ...(taxonomy as any)["UPSC CSE"]["CSAT"],
  ];

  console.log(`Total UPSC questions in DB: ${(allUPSC || []).length}`);
  for (const domain of expectedDomains) {
    const count = counts[domain] || 0;
    const status = count >= 11 ? "PASS" : "FAIL";
    console.log(`  [${status}] ${domain}: ${count} questions`);
  }
}

ingestBatchC().catch(console.error);
