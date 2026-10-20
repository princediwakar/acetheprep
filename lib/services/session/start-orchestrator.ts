// Path: lib/services/session/start-orchestrator.ts
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  selectTargetDomains,
  buildTutorUserMessage,
  buildDiagnosticUserMessage,
  getTutorSystemPrompt,
  computeDifficultyDistribution,
  type ConceptMasteryRow,
  type TargetDomain,
} from "@/lib/tutor-prompt";
import { getTimeMode } from "@/lib/sm2";
import { TUTOR_CONFIG, TUTOR_ERRORS } from "@/lib/constants/tutor";
import { normalizeSkillDomain } from "@/lib/services/skill-normalizer";
import { openai, MODEL, IS_DEEPSEEK } from "@/lib/ai";
import { QuestionSchema } from "@/lib/schemas/quiz";
import { parseWithRecovery } from "@/lib/parse/quiz";
import { getDiagnosticStrata } from "@/lib/diagnostic-seed";
import { getDomainsForExam } from "@/lib/services/taxonomy";
import type { SessionQuestion, DifficultyTier, TimeMode } from "@/types/tutor";
import { computePriorityScores } from "@/lib/priority-engine";
import { fetchQuestionsFromBank, saveQuestionsToBank } from "@/lib/services/question-bank-service";

const DIFFICULTY_TIER_MAP: Record<string, DifficultyTier> = {
  foundation: 1,
  application: 2,
  advanced: 3,
  expert: 3,
};

function normalizeDifficultyTier(tier: string | undefined): DifficultyTier {
  return DIFFICULTY_TIER_MAP[tier ?? ""] ?? 2;
}

function buildTargetDomainsFromFocus(
  focusDomains: string[],
  concepts: ConceptMasteryRow[],
): TargetDomain[] {
  const conceptByDomain = new Map(concepts.map((c) => [c.skill_domain, c]));
  const now = new Date().toISOString();

  return focusDomains.map((domain) => {
    const row = conceptByDomain.get(domain);
    return {
      skillDomain: domain,
      masteryScore: row?.mastery_score ?? 0,
      recentErrors: [],
      isOverdue: row ? row.next_review_at <= now : true,
      lastSeenAt: row?.last_seen_at ?? null,
    };
  });
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
}

function calculateSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeText(a).split(/\s+/).filter((w) => w.length > 3));
  const wordsB = new Set(normalizeText(b).split(/\s+/).filter((w) => w.length > 3));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }
  const union = new Set([...wordsA, ...wordsB]).size;
  return union === 0 ? 0 : intersection / union;
}

export interface SessionGenerationResult {
  session_id: string;
  questions: SessionQuestion[];
  target_domains: string[];
}

export async function generateAndCreateSession(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  examProfileId: string,
  questionCount: number,
  focusDomains: string[] | undefined,
  sessionIntent: string,
  profile: { exam_name: string; target_date: string; time_mode: string },
): Promise<{ result?: SessionGenerationResult; error?: string; details?: string; status?: number }> {
  // ----- Housekeeping: Clean up any empty/ghost active sessions with 0 answers -----
  const { data: userActiveSessions } = await supabase
    .from("sessions")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active");

  if (userActiveSessions && userActiveSessions.length > 0) {
    const actIds = userActiveSessions.map((s) => s.id);
    const { data: answeredRows } = await supabase
      .from("session_answers")
      .select("session_id")
      .in("session_id", actIds);
    const answeredSet = new Set((answeredRows || []).map((a) => a.session_id));
    const emptyGhostIds = actIds.filter((id) => !answeredSet.has(id));
    if (emptyGhostIds.length > 0) {
      const db = isSupabaseConfigured ? supabaseAdmin : supabase;
      await db.from("sessions").delete().in("id", emptyGhostIds).eq("user_id", userId);
    }
  }

  // ----- Daily Session Rate Limiting -----
  const { count: dailyCount } = await supabase
    .from("sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", new Date().toISOString().slice(0, 10));

  if ((dailyCount ?? 0) >= TUTOR_CONFIG.MAX_DAILY_SESSIONS) {
    return { error: TUTOR_ERRORS.RATE_LIMIT_EXCEEDED, status: 429 };
  }

  // ----- Profile & Time Mode -----
  const targetDate = new Date(profile.target_date);
  const now = new Date();
  const daysRemaining = Math.max(
    1,
    Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const timeMode: TimeMode = (profile.time_mode as TimeMode) || getTimeMode(daysRemaining);
  const examYear = targetDate.getFullYear().toString();

  // ----- Parallel Initial Fetch: Concepts, Recent Wrong Answers, and Recent Sessions -----
  const [
    { data: conceptRows },
    { data: recentWrongAnswers },
    { data: recentUserSessions },
  ] = await Promise.all([
    supabase
      .from("concept_mastery")
      .select("*")
      .eq("user_id", userId)
      .eq("exam_profile_id", examProfileId),
    supabase
      .from("session_answers")
      .select("question_id, skill_domain, session_id")
      .eq("user_id", userId)
      .eq("is_correct", false)
      .eq("was_revealed", false)
      .order("answered_at", { ascending: false })
      .limit(30),
    supabase
      .from("sessions")
      .select("questions_json")
      .eq("user_id", userId)
      .eq("exam_profile_id", examProfileId)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const previousQuestionStems: string[] = [];
  if (recentUserSessions) {
    for (const s of recentUserSessions) {
      const qs = s.questions_json as any[];
      if (Array.isArray(qs)) {
        for (const q of qs) {
          if (q?.question_text && typeof q.question_text === "string") {
            const cleanStem = q.question_text.trim();
            if (cleanStem && !previousQuestionStems.includes(cleanStem)) {
              previousQuestionStems.push(cleanStem);
            }
          }
        }
      }
    }
  }

  const entropySeed = `${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;

  const concepts: ConceptMasteryRow[] = (conceptRows ?? []).map((row) => ({
    skill_domain: row.skill_domain,
    mastery_score: row.mastery_score,
    review_interval_days: row.review_interval_days,
    next_review_at: row.next_review_at,
    last_seen_at: row.last_seen_at,
    total_attempted: row.total_attempted,
    total_correct: row.total_correct,
  }));

  // ----- Domain Selection (Intent-Aware) -----
  let targetDomains: TargetDomain[];
  const isActiveTarget = sessionIntent === "active_target";
  const isCustomMock = sessionIntent === "custom_mock";
  const isDiagnostic = sessionIntent === "diagnostic";

  if (isActiveTarget || isCustomMock) {
    if (!focusDomains || focusDomains.length === 0) {
      return {
        error: `focus_domains is required for ${sessionIntent} sessions.`,
        status: 400,
      };
    }
    targetDomains = buildTargetDomainsFromFocus(focusDomains, concepts);
  } else if (isDiagnostic) {
    const taxonomyDomains = getDomainsForExam(profile.exam_name);
    targetDomains = selectTargetDomains(concepts, taxonomyDomains, questionCount);
  } else {
    const masteryScores: Record<string, number> = {};
    const nextReviewDates: Record<string, Date> = {};
    const lastSeenDates: Record<string, Date | null> = {};
    const totalAttempted: Record<string, number> = {};

    for (const c of concepts) {
      masteryScores[c.skill_domain] = c.mastery_score;
      nextReviewDates[c.skill_domain] = new Date(c.next_review_at);
      lastSeenDates[c.skill_domain] = c.last_seen_at ? new Date(c.last_seen_at) : null;
      totalAttempted[c.skill_domain] = c.total_attempted;
    }

    const priorities = await computePriorityScores({
      userId,
      examProfileId,
      examName: profile.exam_name,
      masteryScores,
      nextReviewDates,
      lastSeenDates,
      totalAttempted,
      timeMode,
      daysRemaining,
    });

    const topDomains = priorities.slice(0, questionCount).map((p) => p.skillDomain);
    const conceptByDomain = new Map(concepts.map((c) => [c.skill_domain, c]));
    const nowIso = new Date().toISOString();

    targetDomains = topDomains.map((domain) => {
      const row = conceptByDomain.get(domain);
      const priority = priorities.find((p) => p.skillDomain === domain);
      return {
        skillDomain: domain,
        masteryScore: row?.mastery_score ?? 0,
        recentErrors: [],
        isOverdue: row ? row.next_review_at <= nowIso : true,
        lastSeenAt: row?.last_seen_at ?? null,
        priorityScore: priority?.priorityScore ?? 0,
        difficultyTier: priority?.difficultyTier,
      };
    });
  }

  // ----- Recent Wrong Answers Enrichment -----
  if (recentWrongAnswers && recentWrongAnswers.length > 0) {
    const sessionIds = [...new Set(recentWrongAnswers.map((a) => a.session_id))];
    const { data: wrongSessions } = await supabase
      .from("sessions")
      .select("id, questions_json")
      .in("id", sessionIds);

    if (wrongSessions) {
      const questionMisconceptionMap = new Map<string, string>();
      for (const ws of wrongSessions) {
        const qs = ws.questions_json as any[];
        if (!qs) continue;
        for (const q of qs) {
          if (q.question_id && q.misconception) {
            questionMisconceptionMap.set(q.question_id, q.misconception as string);
          }
        }
      }

      const errorsByDomain = new Map<string, string[]>();
      for (const a of recentWrongAnswers) {
        const misconception = questionMisconceptionMap.get(a.question_id);
        if (misconception && a.skill_domain) {
          const existing = errorsByDomain.get(a.skill_domain) || [];
          if (!existing.includes(misconception)) {
            existing.push(misconception);
          }
          errorsByDomain.set(a.skill_domain, existing);
        }
      }

      for (const td of targetDomains) {
        const errors = errorsByDomain.get(td.skillDomain);
        if (errors && errors.length > 0) {
          td.recentErrors = errors.slice(0, 3);
        }
      }
    }
  }

  const targetDomainNames = targetDomains.map((d) => d.skillDomain);

  // ----- Question Bank Lookup -----
  let bankQuestions: SessionQuestion[] = [];
  let neededFromAI = questionCount;
  let aiTargetDomains = targetDomains;

  try {
    const bankResult = await fetchQuestionsFromBank(supabase, {
      examName: profile.exam_name,
      targetDomains: targetDomains.map((t) => ({
        skillDomain: t.skillDomain,
        difficultyTier: normalizeDifficultyTier(t.difficultyTier),
      })),
      userId,
      totalNeeded: questionCount,
    });

    bankQuestions = bankResult.questions;
    neededFromAI = bankResult.missingCount;

    if (bankResult.unmetTargets.length > 0) {
      aiTargetDomains = targetDomains.filter((t) =>
        bankResult.unmetTargets.some((u) => u.skillDomain === t.skillDomain)
      );
      if (aiTargetDomains.length === 0) aiTargetDomains = targetDomains;
    }
  } catch (err) {
    console.warn("[SessionStart] Question bank lookup failed, falling back to full AI generation:", err);
    neededFromAI = questionCount;
  }

  // FAST PATH: Full Bank Hit
  if (bankQuestions.length >= questionCount) {
    const validatedQuestions = bankQuestions.slice(0, questionCount);
    const { data: session, error: insertError } = await supabase
      .from("sessions")
      .insert({
        user_id: userId,
        exam_profile_id: examProfileId,
        questions_json: validatedQuestions as any,
        target_domains: targetDomainNames,
        session_intent: sessionIntent,
        status: "active",
      })
      .select("id")
      .single();

    if (insertError || !session) {
      return { error: "Failed to create session. Try again.", status: 500 };
    }

    return {
      result: {
        session_id: session.id,
        questions: validatedQuestions,
        target_domains: targetDomainNames,
      },
    };
  }

  // ----- Fallback AI Generation -----
  const systemPrompt = getTutorSystemPrompt();
  let questionsArray: unknown[] = [];
  const BATCH_SIZE = 10;

  if (neededFromAI <= BATCH_SIZE) {
    const difficultyDistribution = isDiagnostic
      ? { easy: 0, medium: 1, hard: 4 }
      : computeDifficultyDistribution(neededFromAI, timeMode);

    const userMessage = isDiagnostic
      ? buildDiagnosticUserMessage({
          examName: profile.exam_name,
          examYear,
          strata: getDiagnosticStrata(),
        })
      : buildTutorUserMessage({
          examName: profile.exam_name,
          examYear,
          timeMode,
          daysRemaining,
          targetDomains: aiTargetDomains,
          questionCount: neededFromAI,
          difficultyDistribution,
          previousQuestionStems: [
            ...previousQuestionStems,
            ...bankQuestions.map((bq) => bq.question_text),
          ],
          entropySeed,
        });

    const maxTokens = Math.max(neededFromAI * 1200 + 2000, 4096);

    async function callAI(temp: number, promptOverride?: string): Promise<string> {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system" as const, content: systemPrompt },
          { role: "user" as const, content: promptOverride ?? userMessage },
        ],
        temperature: temp,
        max_tokens: maxTokens,
        response_format: { type: "json_object" as const },
        ...(IS_DEEPSEEK || MODEL.includes("deepseek") ? { thinking: { type: "disabled" } } : {}),
      } as any);
      return completion.choices[0]?.message?.content || "";
    }

    try {
      const firstResponse = await callAI(0.7);
      const recoveryResult = await parseWithRecovery(
        firstResponse,
        QuestionSchema,
        neededFromAI,
        () => callAI(0.7),
        () => callAI(0.95),
      );
      questionsArray = recoveryResult.questions;
    } catch (err) {
      console.warn("[SessionStart] Primary AI call failed, attempting emergency fallback:", err);
      try {
        const fallbackPrompt = `Generate ${neededFromAI} multiple choice questions about ${aiTargetDomains.map((d) => d.skillDomain).join(", ")} for ${profile.exam_name} exam preparation. Each question must have: question_text (string), options (object with keys A, B, C, D mapping to answer strings), correct_option (the letter key of the correct answer), and explanation (string). Return valid JSON: {"questions": [...]}`;
        const emergencyRaw = await callAI(1.0, fallbackPrompt);
        const emergencyResult = await parseWithRecovery(
          emergencyRaw,
          QuestionSchema,
          neededFromAI,
          () => callAI(1.0, fallbackPrompt),
        );
        questionsArray = emergencyResult.questions;
      } catch (innerErr) {
        console.error("[SessionStart] AI Generation Error:", err, innerErr);
        if (bankQuestions.length === 0) {
          const details = err instanceof Error ? err.message : "Unknown parse/recovery error";
          return {
            error: TUTOR_ERRORS.AI_GENERATION_FAILED,
            details,
            status: 500,
          };
        }
      }
    }
  } else {
    // Multi-batch parallel generation
    const batchSizes: number[] = [];
    let remaining = neededFromAI;
    while (remaining > 0) {
      const size = Math.min(remaining, BATCH_SIZE);
      batchSizes.push(size);
      remaining -= size;
    }

    let domainOffset = 0;
    const batchPromises = batchSizes.map(async (batchCount, batchIdx) => {
      const batchDomains = aiTargetDomains.length > 0
        ? Array.from({ length: batchCount }, (_, idx) => {
            const domainIndex = (domainOffset + idx) % aiTargetDomains.length;
            return aiTargetDomains[domainIndex];
          })
        : aiTargetDomains;
      domainOffset += batchCount;

      const difficultyDistribution = computeDifficultyDistribution(batchCount, timeMode);
      const batchUserMessage = buildTutorUserMessage({
        examName: profile.exam_name,
        examYear,
        timeMode,
        daysRemaining,
        targetDomains: batchDomains,
        questionCount: batchCount,
        difficultyDistribution,
        previousQuestionStems,
        entropySeed: `${entropySeed}_b${batchIdx}`,
      });

      const maxTokens = Math.max(batchCount * 1200 + 2000, 4096);

      async function callBatchAI(temp: number, promptOverride?: string): Promise<string> {
        const completion = await openai.chat.completions.create({
          model: MODEL,
          messages: [
            { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: promptOverride ?? batchUserMessage },
          ],
          temperature: temp,
          max_tokens: maxTokens,
          response_format: { type: "json_object" as const },
          ...(IS_DEEPSEEK || MODEL.includes("deepseek") ? { thinking: { type: "disabled" } } : {}),
        } as any);
        return completion.choices[0]?.message?.content || "";
      }

      try {
        const firstResponse = await callBatchAI(0.7);
        const recoveryResult = await parseWithRecovery(
          firstResponse,
          QuestionSchema,
          batchCount,
          () => callBatchAI(0.7),
          () => callBatchAI(0.95),
        );
        return recoveryResult.questions;
      } catch (err) {
        console.warn(`[SessionStart] Batch ${batchIdx + 1} fallback triggered:`, err);
        const batchDomainNames = batchDomains.map((d) => d.skillDomain);
        const fallbackPrompt = `Generate ${batchCount} multiple choice questions about ${batchDomainNames.join(", ")} for ${profile.exam_name} exam preparation. Each question must have: question_text (string), options (object with keys A, B, C, D mapping to answer strings), correct_option (the letter key of the correct answer), and explanation (string). Return valid JSON: {"questions": [...]}`;
        try {
          const emergencyRaw = await callBatchAI(1.0, fallbackPrompt);
          const emergencyResult = await parseWithRecovery(
            emergencyRaw,
            QuestionSchema,
            batchCount,
            () => callBatchAI(1.0, fallbackPrompt),
          );
          return emergencyResult.questions;
        } catch (e) {
          console.error(`[SessionStart] Batch ${batchIdx + 1} failed:`, e);
          return [];
        }
      }
    });

    const results = await Promise.all(batchPromises);
    questionsArray = results.flat();
  }

  if (questionsArray.length === 0 && bankQuestions.length === 0) {
    return {
      error: TUTOR_ERRORS.AI_GENERATION_FAILED,
      details: `AI generated 0 valid questions. Target domains: ${targetDomainNames.join(", ") || "none"}`,
      status: 500,
    };
  }

  // Deduplication & Validation
  const validatedQuestions: SessionQuestion[] = [];
  const validDomainNames = new Set(targetDomainNames.map((d) => d.toLowerCase().trim()));
  const bankQuestionStems = bankQuestions.map((q) => q.question_text);

  for (const q of questionsArray) {
    if (
      !q ||
      typeof q !== "object" ||
      !(q as any).question_text ||
      !(q as any).options ||
      !(q as any).correct_option
    ) {
      continue;
    }

    const currentText = (q as any).question_text as string;

    const isDuplicateOfBank = bankQuestionStems.some(
      (stem) => calculateSimilarity(stem, currentText) > 0.82
    );
    if (isDuplicateOfBank) continue;

    const isDuplicateWithinSession = validatedQuestions.some(
      (vq) => calculateSimilarity(vq.question_text, currentText) > 0.82
    );
    if (isDuplicateWithinSession) continue;

    const isDuplicateFromHistory = previousQuestionStems.some(
      (stem) => calculateSimilarity(stem, currentText) > 0.85
    );
    if (isDuplicateFromHistory && questionsArray.length > neededFromAI) continue;

    const rawDomain: string = (q as any).skill_domain || targetDomainNames[0] || "General";
    const normalizedDomain = validDomainNames.has(rawDomain.toLowerCase().trim())
      ? targetDomainNames.find(
          (d) => d.toLowerCase().trim() === rawDomain.toLowerCase().trim(),
        ) || normalizeSkillDomain(rawDomain)
      : normalizeSkillDomain(rawDomain);

    validatedQuestions.push({
      question_id: crypto.randomUUID(),
      question_text: (q as any).question_text,
      passage: (q as any).passage || undefined,
      passage_id: (q as any).passage_id || undefined,
      options: (q as any).options,
      correct_option: (q as any).correct_option,
      explanation: (q as any).explanation || "",
      distractor_analysis: (q as any).distractor_analysis || {},
      skill_domain: normalizedDomain,
      difficulty_tier: normalizeDifficultyTier((q as any).difficulty_tier),
      time_estimate_seconds: (q as any).time_estimate_seconds || 60,
      misconception: (q as any).misconception || "",
    });
  }

  const finalQuestions = [...bankQuestions, ...validatedQuestions].slice(0, questionCount);

  if (finalQuestions.length === 0) {
    return {
      error: TUTOR_ERRORS.AI_GENERATION_FAILED,
      details: `Generated 0 valid questions. Target domains: ${targetDomainNames.join(", ") || "none"}`,
      status: 500,
    };
  }

  if (validatedQuestions.length > 0) {
    saveQuestionsToBank(supabase, validatedQuestions, profile.exam_name).catch((err) => {
      console.warn("[SessionStart] Background save to question_bank failed:", err);
    });
  }

  const { data: session, error: insertError } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      exam_profile_id: examProfileId,
      questions_json: finalQuestions as any,
      target_domains: targetDomainNames,
      session_intent: sessionIntent,
      status: "active",
    })
    .select("id")
    .single();

  if (insertError || !session) {
    return { error: "Failed to create session. Try again.", status: 500 };
  }

  return {
    result: {
      session_id: session.id,
      questions: finalQuestions,
      target_domains: targetDomainNames,
    },
  };
}
