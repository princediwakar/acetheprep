// Path: lib/services/question-bank-service.ts
import { SupabaseClient } from "@supabase/supabase-js";
import type { SessionQuestion, DifficultyTier } from "@/types/tutor";
import { getSubjectForDomain } from "@/lib/services/taxonomy";
import { ALL_BANKS } from "@/lib/data/banks";

export interface QuestionBankRow {
  id: string;
  exam_name: string;
  subject: string;
  skill_domain: string;
  difficulty_tier: number;
  question_text: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  distractor_analysis: Record<string, string>;
  misconception: string | null;
  time_estimate_seconds: number;
  created_at?: string;
  metadata_json?: Record<string, unknown>;
}

export interface BankTargetRequest {
  skillDomain: string;
  difficultyTier?: DifficultyTier;
}

export interface BankFetchResult {
  questions: SessionQuestion[];
  missingCount: number;
  unmetTargets: BankTargetRequest[];
}

/**
 * Fetch questions from pre-materialized question bank with 0% duplication.
 * Filters out any question the user has already answered in session_answers.
 */
export async function fetchQuestionsFromBank(
  supabase: SupabaseClient,
  params: {
    examName: string;
    targetDomains: BankTargetRequest[];
    userId: string;
    totalNeeded: number;
  }
): Promise<BankFetchResult> {
  const { examName, targetDomains, userId, totalNeeded } = params;

  if (targetDomains.length === 0 || totalNeeded <= 0) {
    return { questions: [], missingCount: totalNeeded, unmetTargets: targetDomains };
  }

  const domainNames = [...new Set(targetDomains.map((t) => t.skillDomain))];

  // Parallel fetch:
  // 1. All question_ids answered by this user (O(1) in-memory deduplication set)
  // 2. Candidate questions from question_bank for these target domains
  const [answeredRes, candidatesRes] = await Promise.all([
    supabase
      .from("session_answers")
      .select("question_id")
      .eq("user_id", userId),
    supabase
      .from("question_bank")
      .select("*")
      .eq("exam_name", examName)
      .in("skill_domain", domainNames)
      .limit(totalNeeded * 4), // pull ample candidates to cover past attempts
  ]);

  const answeredSet = new Set<string>();
  if (answeredRes.data) {
    for (const a of answeredRes.data) {
      if (a.question_id) answeredSet.add(a.question_id);
    }
  }

  const rawCandidates: QuestionBankRow[] = (candidatesRes.data as QuestionBankRow[]) || [];

  // Group candidate questions by domain and tier
  const poolByDomain = new Map<string, QuestionBankRow[]>();
  for (const row of rawCandidates) {
    // Exact deduplication check
    if (answeredSet.has(row.id)) continue;

    const list = poolByDomain.get(row.skill_domain) || [];
    list.push(row);
    poolByDomain.set(row.skill_domain, list);
  }

  const selectedQuestions: SessionQuestion[] = [];
  const unmetTargets: BankTargetRequest[] = [];
  const selectedIds = new Set<string>();

  // Match target domains in order of Priority Engine output
  for (const target of targetDomains) {
    if (selectedQuestions.length >= totalNeeded) break;

    const domainPool = poolByDomain.get(target.skillDomain) || [];
    // Filter out already selected in this session
    const available = domainPool.filter((q) => !selectedIds.has(q.id));

    if (available.length === 0) {
      unmetTargets.push(target);
      continue;
    }

    // Prefer exact difficulty tier match if available, otherwise any tier in domain
    const preferredTier = target.difficultyTier;
    let chosen = preferredTier
      ? available.find((q) => q.difficulty_tier === preferredTier)
      : null;

    if (!chosen) {
      // Pick random from available in this domain
      const randomIndex = Math.floor(Math.random() * available.length);
      chosen = available[randomIndex];
    }

    selectedIds.add(chosen.id);
    selectedQuestions.push(mapRowToSessionQuestion(chosen));
  }

  // If we still need more questions and have remaining unchosen candidates in any target domain:
  if (selectedQuestions.length < totalNeeded) {
    for (const domain of domainNames) {
      if (selectedQuestions.length >= totalNeeded) break;
      const domainPool = poolByDomain.get(domain) || [];
      const remaining = domainPool.filter((q) => !selectedIds.has(q.id));

      for (const q of remaining) {
        if (selectedQuestions.length >= totalNeeded) break;
        selectedIds.add(q.id);
        selectedQuestions.push(mapRowToSessionQuestion(q));
      }
    }
  }

  // Safety Fallback: Supplement from compiled in-memory ALL_BANKS if database has fewer rows
  if (selectedQuestions.length < totalNeeded) {
    const staticCandidates = ALL_BANKS.filter((q) => q.exam_name === examName);
    for (const q of staticCandidates) {
      if (selectedQuestions.length >= totalNeeded) break;
      const qTextPrefix = q.question_text.slice(0, 50);
      const isAlreadyPicked = selectedQuestions.some(
        (sq) => sq.question_text.slice(0, 50) === qTextPrefix
      );
      if (isAlreadyPicked) continue;

      const fallbackId = `seed_${examName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${q.skill_domain.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${selectedQuestions.length + 1}`;
      if (answeredSet.has(fallbackId) || selectedIds.has(fallbackId)) continue;

      selectedIds.add(fallbackId);
      selectedQuestions.push({
        question_id: fallbackId,
        question_text: q.question_text,
        passage: q.passage,
        passage_id: q.passage_id,
        options: q.options,
        correct_option: q.correct_option,
        explanation: q.explanation,
        distractor_analysis: q.distractor_analysis || {},
        skill_domain: q.skill_domain,
        difficulty_tier: q.difficulty_tier,
        time_estimate_seconds: q.time_estimate_seconds || 60,
        misconception: q.misconception || "",
      });
    }
  }

  const missingCount = Math.max(0, totalNeeded - selectedQuestions.length);

  return {
    questions: selectedQuestions,
    missingCount,
    unmetTargets: unmetTargets.slice(0, missingCount),
  };
}

/**
 * Save newly generated or seeded questions into the question_bank table asynchronously.
 */
export async function saveQuestionsToBank(
  supabase: SupabaseClient,
  questions: SessionQuestion[],
  examName: string,
  subject?: string
): Promise<number> {
  if (!questions || questions.length === 0) return 0;

  const rows = questions.map((q) => ({
    id: q.question_id,
    exam_name: examName,
    subject: subject || getSubjectForDomain(examName, q.skill_domain),
    skill_domain: q.skill_domain,
    difficulty_tier: typeof q.difficulty_tier === "number" ? q.difficulty_tier : 2,
    question_text: q.question_text,
    options: q.options,
    correct_option: q.correct_option,
    explanation: q.explanation || "",
    distractor_analysis: q.distractor_analysis || {},
    misconception: q.misconception || null,
    time_estimate_seconds: q.time_estimate_seconds || 60,
    metadata_json: {
      ...(q.passage ? { passage: q.passage, passage_id: q.passage_id } : {}),
    },
  }));

  try {
    const { error } = await supabase
      .from("question_bank")
      .upsert(rows, { onConflict: "id", ignoreDuplicates: true });

    if (error) {
      console.warn("[QuestionBank] Warning: Failed to upsert questions into question_bank:", error.message);
      return 0;
    }
    return rows.length;
  } catch (err) {
    console.warn("[QuestionBank] Error saving to question_bank:", err);
    return 0;
  }
}

function mapRowToSessionQuestion(row: QuestionBankRow): SessionQuestion {
  const metadata = (row.metadata_json && typeof row.metadata_json === "object") ? (row.metadata_json as Record<string, any>) : {};
  return {
    question_id: row.id,
    question_text: row.question_text,
    passage: metadata.passage || undefined,
    passage_id: metadata.passage_id || undefined,
    options: row.options,
    correct_option: row.correct_option,
    explanation: row.explanation,
    distractor_analysis: row.distractor_analysis || {},
    skill_domain: row.skill_domain,
    difficulty_tier: (row.difficulty_tier === 1 || row.difficulty_tier === 2 || row.difficulty_tier === 3)
      ? (row.difficulty_tier as DifficultyTier)
      : 2,
    time_estimate_seconds: row.time_estimate_seconds || 60,
    misconception: row.misconception || "",
  };
}
