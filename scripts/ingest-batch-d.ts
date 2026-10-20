// Path: scripts/ingest-batch-d.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { JEE_MAIN_BANK } from "../lib/data/banks/jee-main";
import { NEET_BANK } from "../lib/data/banks/neet";
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

async function ingestBatchD() {
  console.log("=== Starting Ingestion for Batch D (JEE Main & NEET) ===");

  const combinedBank = [...JEE_MAIN_BANK, ...NEET_BANK];
  console.log(`Total questions in Batch D local bank: ${combinedBank.length}`);

  // Fetch existing rows for both exams
  const { data: existingRows, error: fetchErr } = await supabase
    .from("question_bank")
    .select("exam_name, question_text")
    .in("exam_name", ["JEE Main", "NEET"]);

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    process.exit(1);
  }

  const existingSet = new Set(
    (existingRows || []).map((r) => `${r.exam_name}::${r.question_text.trim()}`)
  );
  console.log(`Existing DB records for JEE Main & NEET: ${existingSet.size}`);

  let inserted = 0;
  let skipped = 0;
  const toInsert: any[] = [];

  for (const q of combinedBank) {
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

  console.log(`\nBatch D Ingestion complete! Total inserted: ${inserted}, Skipped: ${skipped}`);

  // Verification step against taxonomy
  console.log("\n=== Verifying Canonical Domain Counts in Remote DB ===");
  const examsToCheck = [
    { name: "JEE Main", tax: (taxonomy as any)["JEE Main"] },
    { name: "NEET", tax: (taxonomy as any)["NEET"] },
  ];

  let allPassed = true;

  for (const { name, tax } of examsToCheck) {
    const { data: rows, error: qErr } = await supabase
      .from("question_bank")
      .select("skill_domain")
      .eq("exam_name", name);

    if (qErr) {
      console.error(`Error querying ${name}:`, qErr);
      allPassed = false;
      continue;
    }

    const counts: Record<string, number> = {};
    for (const r of rows || []) {
      counts[r.skill_domain] = (counts[r.skill_domain] || 0) + 1;
    }

    console.log(`\nResults for ${name} (Total rows in DB: ${rows?.length}):`);
    const allDomains: string[] = [];
    for (const sub of Object.keys(tax)) {
      allDomains.push(...tax[sub]);
    }

    for (const domain of allDomains) {
      const c = counts[domain] || 0;
      const status = c >= 11 ? "PASS" : "FAIL (SHORT)";
      if (c < 11) allPassed = false;
      console.log(`  [${status}] ${domain}: ${c} questions`);
    }
  }

  if (allPassed) {
    console.log("\n>>> ALL JEE MAIN AND NEET DOMAINS MEET OR EXCEED THRESHOLD (>= 11)! <<<");
  } else {
    console.error("\n>>> SOME DOMAINS FAILED VERIFICATION! <<<");
    process.exit(1);
  }
}

ingestBatchD().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
