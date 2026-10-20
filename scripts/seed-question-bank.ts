// Path: scripts/seed-question-bank.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.local", override: true });



import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { getPracticeSystemPrompt, buildPracticeUserMessage } from "../lib/geo-prompts";
import { QuestionSchema } from "../lib/schemas/quiz";
import taxonomyRaw from "../lib/taxonomies.json";
import demoQuestionsRaw from "../lib/demo-questions.json";
import { ALL_BANKS } from "../lib/data/banks";
import { z } from "zod";




function getAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase URL or Service Key in environment.");
  }
  return createClient(url, key);
}

function getAI(): { client: OpenAI; model: string } {
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (deepseekKey && !deepseekKey.startsWith("[")) {
    return {
      client: new OpenAI({
        baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com",
        apiKey: deepseekKey,
      }),
      model: process.env.OPENAI_MODEL || "deepseek-flash",
    };
  }

  if (openaiKey && !openaiKey.startsWith("[")) {
    return {
      client: new OpenAI({
        baseURL: "https://api.openai.com/v1",
        apiKey: openaiKey,
      }),
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }

  throw new Error("No valid AI API key found (DEEPSEEK_API_KEY or OPENAI_API_KEY).");
}

const PracticeQuestionsOnlySchema = z.object({
  questions: z.array(QuestionSchema),
});



const DELAY_MS = 600;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeDifficultyTier(tier: string | number | undefined): number {
  if (typeof tier === "number" && (tier === 1 || tier === 2 || tier === 3)) return tier;
  if (tier === "foundation") return 1;
  if (tier === "application") return 2;
  if (tier === "advanced" || tier === "expert") return 3;
  return 2;
}

/**
 * Ingest existing questions from `practice_questions` table into `question_bank`.
 */
async function importFromPracticeQuestions(dryRun: boolean = false) {
  console.log("\n[Seed] Ingesting existing practice_questions into question_bank...");
  const admin = getAdmin();
  const { data: rows, error } = await admin
    .from("practice_questions")
    .select("*");


  if (error) {
    console.error("[Seed] Failed to fetch practice_questions:", error);
    return;
  }

  if (!rows || rows.length === 0) {
    console.log("[Seed] No practice_questions found to import.");
    return;
  }

  console.log(`[Seed] Found ${rows.length} domain practice question sets.`);
  let totalImported = 0;

  for (const row of rows) {
    const questions = row.questions_json as any[];
    if (!Array.isArray(questions) || questions.length === 0) continue;

    const bankRecords = questions.map((q) => ({
      exam_name: row.exam_name,
      subject: row.subject,
      skill_domain: row.domain,
      difficulty_tier: normalizeDifficultyTier(q.difficulty_tier),
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation || "",
      distractor_analysis: q.distractor_analysis || {},
      misconception: q.misconception || null,
      time_estimate_seconds: q.time_estimate_seconds || 60,
    }));

    if (dryRun) {
      console.log(`[DRY-RUN] Would insert ${bankRecords.length} questions for [${row.exam_name} / ${row.domain}]`);
    } else {
      const { error: insertError } = await admin
        .from("question_bank")
        .upsert(bankRecords, { ignoreDuplicates: true });


      if (insertError) {
        console.warn(`[Seed] Failed to insert questions for ${row.domain}:`, insertError.message);
      } else {
        totalImported += bankRecords.length;
      }
    }
  }

  console.log(`[Seed] Finished importing. Total questions added to question_bank: ${totalImported}`);
}

/**
 * Ingest verified questions from lib/demo-questions.json into question_bank.
 */
async function importFromDemoQuestions(dryRun: boolean = false) {
  console.log("\n[Seed] Ingesting verified questions from lib/demo-questions.json into question_bank...");
  const demoData = demoQuestionsRaw as any;
  if (!demoData?.exams) {
    console.log("[Seed] No exams found in demo-questions.json.");
    return;
  }

  const admin = dryRun ? null : getAdmin();
  let imported = 0;

  for (const [examKey, item] of Object.entries(demoData.exams)) {
    const q = (item as any).question;
    const exam_name = (item as any).exam_name || examKey;
    const subject = (item as any).subject || "General";
    const domain = (item as any).domain || q.skill_domain || "General";

    const record = {
      exam_name,
      subject,
      skill_domain: domain,
      difficulty_tier: normalizeDifficultyTier(q.difficulty_tier),
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation || "",
      distractor_analysis: q.distractor_analysis || {},
      misconception: q.misconception || null,
      time_estimate_seconds: q.time_estimate_seconds || 60,
    };

    if (dryRun) {
      console.log(`[DRY-RUN] Would insert demo question for [${exam_name} / ${domain}]`);
    } else {
      const { error } = await admin!
        .from("question_bank")
        .upsert([record], { ignoreDuplicates: true });

      if (error) {
        console.warn(`[Seed] Failed inserting demo question for ${exam_name}:`, error.message);
      } else {
        imported++;
        console.log(`  [Seed] Successfully inserted demo question for [${exam_name} / ${domain}]`);
      }
    }
  }

  console.log(`[Seed] Finished importing demo questions. Total: ${imported}`);
}

/**
 * Ingest curated institutional questions from lib/data/question-bank-seed.ts.
 */
async function importCuratedSeed(dryRun: boolean = false) {
  console.log("\n[Seed] Ingesting curated institutional questions from lib/data/banks/...");
  const admin = dryRun ? null : getAdmin();
  let imported = 0;

  for (const q of ALL_BANKS) {

    const metadata_json = (q.passage || q.passage_id)
      ? { passage: q.passage, passage_id: q.passage_id }
      : {};

    const record = {
      exam_name: q.exam_name,
      subject: q.subject,
      skill_domain: q.skill_domain,
      difficulty_tier: q.difficulty_tier,
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      explanation: q.explanation,
      distractor_analysis: q.distractor_analysis,
      misconception: q.misconception,
      time_estimate_seconds: q.time_estimate_seconds,
      metadata_json,
    };

    if (dryRun) {
      console.log(`[DRY-RUN] Would insert curated question for [${q.exam_name} / ${q.skill_domain}]`);
    } else {
      const { error } = await admin!
        .from("question_bank")
        .upsert([record], { ignoreDuplicates: true });

      if (error) {
        console.warn(`[Seed] Error inserting curated question for ${q.exam_name}:`, error.message);
      } else {
        imported++;
        console.log(`  [Seed] Successfully inserted [${q.exam_name} / ${q.skill_domain}] (Tier ${q.difficulty_tier})`);
      }
    }
  }

  console.log(`[Seed] Finished importing curated questions. Total: ${imported}`);
}



/**
 * Batch generate questions for an exam or all exams.
 */
async function generateForExam(targetExam?: string, questionsPerDomain: number = 3, dryRun: boolean = false) {
  const taxonomy = taxonomyRaw as unknown as Record<string, Record<string, string[]>>;
  const exams = targetExam ? [targetExam] : Object.keys(taxonomy).filter((k) => !k.startsWith("_"));

  const ai = dryRun ? null : getAI();
  console.log(`\n[Seed] Generating question bank for: ${exams.join(", ")}`);
  console.log(`[Seed] Questions per domain: ${questionsPerDomain}`);
  if (ai) console.log(`[Seed] Using model: ${ai.model}\n`);

  const admin = dryRun ? null : getAdmin();
  let grandTotal = 0;

  for (const examName of exams) {
    const subjects = taxonomy[examName];
    if (!subjects) {
      console.warn(`[Seed] Exam "${examName}" not found in taxonomies.json`);
      continue;
    }

    for (const [subject, domains] of Object.entries(subjects)) {
      for (const domain of domains) {
        console.log(`[Seed] Processing: [${examName}] -> [${subject}] -> [${domain}]...`);

        if (dryRun) {
          console.log(`  [DRY-RUN] Skipped API call.`);
          continue;
        }

        try {
          const isDeepSeek = ai!.model.includes("deepseek");
          const isPassage = /reading|comprehension|rc|passage|caselet|dilr/i.test(domain);
          const perQTokens = isPassage ? 2500 : 1000;
          const maxTokens = isDeepSeek
            ? Math.max(questionsPerDomain * perQTokens + (isPassage ? 4000 : 2000), 16384)
            : Math.max(questionsPerDomain * 1000 + 2000, 4096);

          const completion = await ai!.client.chat.completions.create({
            model: ai!.model,
            messages: [
              { role: "system", content: getPracticeSystemPrompt() },
              { role: "user", content: buildPracticeUserMessage(examName, subject, domain, questionsPerDomain) },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
            max_tokens: maxTokens,
            ...(isDeepSeek ? { thinking: { type: "disabled" } } : {}),
          } as any);


          const raw = completion.choices[0]?.message?.content || "";
          let parsed: any;
          try {
            parsed = JSON.parse(raw);
          } catch {
            const match = raw.match(/\{[\s\S]*\}/);
            if (!match) throw new Error("No JSON in response");
            parsed = JSON.parse(match[0]);
          }

          const validated = PracticeQuestionsOnlySchema.parse(parsed);

          const records = validated.questions.map((q) => ({
            exam_name: examName,
            subject,
            skill_domain: domain,
            difficulty_tier: normalizeDifficultyTier(q.difficulty_tier),
            question_text: q.question_text,
            options: q.options,
            correct_option: q.correct_option,
            explanation: q.explanation || "",
            distractor_analysis: q.distractor_analysis || {},
            misconception: q.misconception || null,
            time_estimate_seconds: q.time_estimate_seconds || 60,
            metadata_json: (q.passage || q.passage_id)
              ? { passage: q.passage, passage_id: q.passage_id }
              : {},
          }));

          const { error: upsertError } = await admin!
            .from("question_bank")
            .upsert(records, { ignoreDuplicates: true });


          if (upsertError) {
            console.error(`  [Seed] Error inserting questions for ${domain}:`, upsertError.message);
          } else {
            grandTotal += records.length;
            console.log(`  [Seed] Successfully saved ${records.length} questions for ${domain}`);
          }
        } catch (err: any) {
          console.error(`  [Seed] Failed generating questions for ${domain}:`, err.message);
        }

        await sleep(DELAY_MS);
      }
    }
  }

  console.log(`\n[Seed] Complete! Total questions added: ${grandTotal}`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const importPractice = args.includes("--import-practice");
  const importDemo = args.includes("--demo");
  const importCurated = args.includes("--curated") || args.includes("--seed") || args.length === 0;
  const examArgIdx = args.indexOf("--exam");
  const exam = examArgIdx !== -1 ? args[examArgIdx + 1] : undefined;
  const countArgIdx = args.indexOf("--count");
  const count = countArgIdx !== -1 ? parseInt(args[countArgIdx + 1], 10) : 3;

  if (importCurated) {
    await importCuratedSeed(dryRun);
    await importFromDemoQuestions(dryRun);
  } else if (importDemo) {
    await importFromDemoQuestions(dryRun);
  }

  if (importPractice) {
    await importFromPracticeQuestions(dryRun);
  }

  if (exam || args.includes("--generate-all")) {
    await generateForExam(exam, count, dryRun);
  }

  if (!importCurated && !importDemo && !importPractice && !exam && !args.includes("--generate-all")) {
    console.log("Usage:");
    console.log("  npx tsx scripts/seed-question-bank.ts --curated");
    console.log("  npx tsx scripts/seed-question-bank.ts --demo");
    console.log("  npx tsx scripts/seed-question-bank.ts --import-practice");
    console.log("  npx tsx scripts/seed-question-bank.ts --exam \"JEE Main\" --count 5");
    console.log("  npx tsx scripts/seed-question-bank.ts --generate-all --count 3");
    console.log("  Add --dry-run to preview actions without database writes.");
  }


}

main().catch(console.error);
