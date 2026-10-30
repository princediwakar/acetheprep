import { supabaseAdmin } from "@/lib/supabase/admin";
import { ALL_BANKS } from "@/lib/data/banks";
import type { ComebackItem } from "@/lib/comeback-queue";
import type { HydratedDueTrap } from "@/components/error-log/ZeroClickDrillView";

/**
 * Hydrates overdue comeback items from:
 * 1. Pre-materialized question_bank (UUID lookup)
 * 2. Original session questions_json (100% authentic exact session question)
 * 3. Strictly scoped in-memory bank for the active exam profile
 */
export async function hydrateDueComebacks(
  dueItems: ComebackItem[],
  defaultExamName: string
): Promise<HydratedDueTrap[]> {
  if (dueItems.length === 0) return [];

  const uuidIds = dueItems
    .map((d) => d.questionId)
    .filter((id) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    );

  const sessionIds = [
    ...new Set(dueItems.map((d) => d.originalSessionId).filter(Boolean)),
  ] as string[];

  // Parallel fetch from question_bank and original sessions
  const [bankRes, sessionRowsRes] = await Promise.all([
    uuidIds.length > 0
      ? supabaseAdmin.from("question_bank").select("*").in("id", uuidIds)
      : Promise.resolve({ data: [] }),
    sessionIds.length > 0
      ? supabaseAdmin.from("sessions").select("id, questions_json").in("id", sessionIds)
      : Promise.resolve({ data: [] }),
  ]);

  const dbQuestionsMap: Record<string, any> = {};
  if (bankRes.data) {
    for (const row of bankRes.data) {
      dbQuestionsMap[row.id] = row;
    }
  }

  const sessionQuestionsMap: Record<string, any> = {};
  if (sessionRowsRes.data) {
    for (const s of sessionRowsRes.data) {
      if (Array.isArray(s.questions_json)) {
        for (const q of s.questions_json) {
          if (q && q.question_id) {
            sessionQuestionsMap[q.question_id] = q;
          }
        }
      }
    }
  }

  const hydrated: HydratedDueTrap[] = [];

  for (const item of dueItems) {
    // Priority 1: Exact row in question_bank
    const dbRow = dbQuestionsMap[item.questionId];
    if (dbRow) {
      hydrated.push({
        queueItemId: item.id,
        stage: item.stage,
        stageDeadline: item.stageDeadline ? item.stageDeadline.toISOString() : null,
        skillDomain: item.skillDomain,
        difficultyTier: item.difficultyTier,
        lostProjectedPoints: item.lostProjectedPoints,
        createdAt: item.createdAt ? item.createdAt.toISOString() : null,
        question: {
          id: dbRow.id,
          question_text: dbRow.question_text,
          passage: (dbRow.metadata_json as any)?.passage || undefined,
          options: dbRow.options as Record<string, string>,
          correct_option: dbRow.correct_option,
          explanation: dbRow.explanation,
          distractor_analysis: (dbRow.distractor_analysis as Record<string, string>) || {},
          misconception: dbRow.misconception,
          exam_name: dbRow.exam_name || defaultExamName,
          subject: dbRow.subject,
        },
      });
      continue;
    }

    // Priority 2: Original question from user's completed session
    const sessionQ = sessionQuestionsMap[item.questionId];
    if (sessionQ) {
      hydrated.push({
        queueItemId: item.id,
        stage: item.stage,
        stageDeadline: item.stageDeadline ? item.stageDeadline.toISOString() : null,
        skillDomain: item.skillDomain,
        difficultyTier: item.difficultyTier,
        lostProjectedPoints: item.lostProjectedPoints,
        createdAt: item.createdAt ? item.createdAt.toISOString() : null,
        question: {
          id: sessionQ.question_id,
          question_text: sessionQ.question_text,
          passage: sessionQ.passage,
          options: (sessionQ.options as Record<string, string>) || {},
          correct_option: sessionQ.correct_option,
          explanation: sessionQ.explanation || "",
          distractor_analysis: (sessionQ.distractor_analysis as Record<string, string>) || {},
          misconception: sessionQ.misconception || null,
          exam_name: defaultExamName,
          subject: sessionQ.subject,
        },
      });
      continue;
    }

    // Priority 3: Strictly filter within this active exam track
    const examQuestions = ALL_BANKS.filter(
      (q) => q.exam_name.toLowerCase() === defaultExamName.toLowerCase()
    );

    const staticMatch =
      examQuestions.find(
        (q) => q.skill_domain.toLowerCase() === item.skillDomain.toLowerCase()
      ) ||
      examQuestions[0] ||
      ALL_BANKS[0];

    if (staticMatch) {
      hydrated.push({
        queueItemId: item.id,
        stage: item.stage,
        stageDeadline: item.stageDeadline ? item.stageDeadline.toISOString() : null,
        skillDomain: item.skillDomain,
        difficultyTier: item.difficultyTier,
        lostProjectedPoints: item.lostProjectedPoints,
        createdAt: item.createdAt ? item.createdAt.toISOString() : null,
        question: {
          id: item.questionId,
          question_text: staticMatch.question_text,
          passage: staticMatch.passage,
          options: staticMatch.options as Record<string, string>,
          correct_option: staticMatch.correct_option,
          explanation: staticMatch.explanation,
          distractor_analysis: (staticMatch.distractor_analysis as Record<string, string>) || {},
          misconception: staticMatch.misconception,
          exam_name: defaultExamName,
          subject: staticMatch.subject,
        },
      });
    }
  }

  return hydrated;
}
