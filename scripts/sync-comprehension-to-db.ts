// Path: scripts/sync-comprehension-to-db.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { ALL_BANKS } from "../lib/data/banks";
import type { SeedQuestion } from "../lib/data/question-bank-seed";

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

function getSubjectForQuestion(q: SeedQuestion): string {
  if (q.subject) return q.subject;
  const exam = q.exam_name;
  if (exam === "GMAT Focus") return "Verbal Reasoning";
  if (exam === "GRE") return "Verbal Reasoning";
  if (exam === "SAT") return "Reading and Writing";
  if (exam === "IELTS Academic") return "Reading";
  if (exam === "TOEFL iBT") return "Reading";
  if (exam === "CFA Level 1") return "Financial Statement Analysis";
  return "General";
}

async function syncComprehensionToDb() {
  console.log("=== COMPREHENSION PASSAGES & QUESTIONS DB SYNC ===");
  const admin = getAdminClient();

  // 1. Initial State Check
  const { count: initialCount } = await admin
    .from("question_bank")
    .select("*", { count: "exact", head: true });
  console.log(`Initial total questions in question_bank table: ${initialCount}`);

  // 2. Filter Questions with Passages or All Questions
  const questionsWithPassages = ALL_BANKS.filter((q) => Boolean(q.passage));
  console.log(`Found ${questionsWithPassages.length} questions with explicit passages in compiled ALL_BANKS.`);

  // 3. Prepare DB Records
  const records = ALL_BANKS.map((q) => ({
    exam_name: q.exam_name,
    subject: getSubjectForQuestion(q),
    skill_domain: q.skill_domain,
    difficulty_tier: q.difficulty_tier || 2,
    question_text: q.question_text,
    options: q.options,
    correct_option: q.correct_option,
    explanation: q.explanation,
    distractor_analysis: q.distractor_analysis || {},
    misconception: q.misconception || null,
    time_estimate_seconds: q.time_estimate_seconds || 60,
    metadata_json: q.passage
      ? { passage: q.passage, passage_id: q.passage_id || null }
      : {},
  }));

  console.log(`Total records to insert/sync: ${records.length}`);

  // 4. Ingest in batches of 50
  const BATCH_SIZE = 50;
  let inserted = 0;
  let skippedDuplicates = 0;
  let errors = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const chunk = records.slice(i, i + BATCH_SIZE);
    const { data, error } = await admin.from("question_bank").insert(chunk);

    if (error) {
      // If batch fails (e.g. unique constraint collision on legacy row), fall back to item-by-item
      for (const rec of chunk) {
        const { error: singleErr } = await admin.from("question_bank").insert([rec]);
        if (singleErr) {
          if (singleErr.code === "23505" || singleErr.message.includes("unique")) {
            // Already exists in DB - update its metadata_json and passage if needed
            skippedDuplicates++;
            if (rec.metadata_json && Object.keys(rec.metadata_json).length > 0) {
              await admin
                .from("question_bank")
                .update({ metadata_json: rec.metadata_json })
                .eq("exam_name", rec.exam_name)
                .eq("skill_domain", rec.skill_domain)
                .eq("question_text", rec.question_text);
            }
          } else {
            console.warn(`    Error on question: ${rec.question_text.slice(0, 50)}... -> ${singleErr.message}`);
            errors++;
          }
        } else {
          inserted++;
        }
      }
    } else {
      inserted += chunk.length;
    }

    process.stdout.write(`  Processed ${Math.min(i + BATCH_SIZE, records.length)}/${records.length} (Inserted: ${inserted}, Existing/Updated: ${skippedDuplicates})...\r`);
  }

  console.log(`\n\nSync Complete:`);
  console.log(`- Newly inserted: ${inserted}`);
  console.log(`- Existing/Preserved (metadata updated): ${skippedDuplicates}`);
  console.log(`- Errors: ${errors}`);

  // 5. Final Audit
  const { count: finalCount } = await admin
    .from("question_bank")
    .select("*", { count: "exact", head: true });
  console.log(`Final total questions in question_bank table: ${finalCount}`);

  const { data: passageRows } = await admin
    .from("question_bank")
    .select("exam_name, metadata_json")
    .not("metadata_json->passage", "is", null);

  const byExam: Record<string, number> = {};
  if (passageRows) {
    for (const r of passageRows) {
      byExam[r.exam_name] = (byExam[r.exam_name] || 0) + 1;
    }
  }

  console.log(`\nVerified questions in DB with explicit passages: ${passageRows?.length || 0}`);
  console.log("Breakdown by Exam:", byExam);
}

syncComprehensionToDb().catch((err) => {
  console.error("Sync script failed:", err);
  process.exit(1);
});
