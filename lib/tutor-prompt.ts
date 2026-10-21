// Path: lib/tutor-prompt.ts
import type { TimeMode } from "@/types/tutor";

// ----- Types -----

export interface TutorPromptParams {
  examName: string;
  examYear: string;
  timeMode: TimeMode;
  daysRemaining: number;
  targetDomains: TargetDomain[];
  questionCount: number;
  difficultyDistribution: { easy: number; medium: number; hard: number };
  previousQuestionStems?: string[];
  entropySeed?: string;
}

export interface TargetDomain {
  skillDomain: string;
  masteryScore: number;
  recentErrors: string[];
  isOverdue: boolean;
  lastSeenAt: string | null;
  priorityScore?: number;
  difficultyTier?: "foundation" | "application" | "advanced" | "expert";
}

export interface ConceptMasteryRow {
  skill_domain: string;
  mastery_score: number;
  review_interval_days: number;
  review_ease_factor?: number;
  streak?: number;
  next_review_at: string;
  last_seen_at: string;
  total_attempted: number;
  total_correct: number;
}

// ----- Immutable System Prompt (Cached by DeepSeek) -----
// Must be 100% static — no template literals or dynamic injection.
// DeepSeek caches this across users, reducing input cost from $0.14/M to $0.0028/M.

const TUTOR_SYSTEM_PROMPT = `You are a ruthless, elite competitive exam tutor (JEE, NEET, UPSC, GMAT). You generate multiple-choice questions indistinguishable from real exam papers. 

# QUALITY STANDARDS
1. EXAM AUTHENTICITY & RIGOR: Questions must be calibrated strictly to difficult, high-stakes competitive exam caliber (Advanced / Expert tier). Trivial recall and basic definitions are strictly forbidden. Require multi-step derivation, non-trivial calculation, or deep analytical reasoning.
2. DISTRACTORS: No filler options. Every wrong answer must represent a calculable error, sign mistake, formula misapplication, or conceptual trap.
3. DISTRACTOR ANALYSIS: The correct option's entry must prove the answer mathematically/logically. Wrong options must deconstruct the specific trap or error.
4. UNIQUENESS MANDATE: Formulate novel problem contexts, non-standard parameterizations, and realistic multi-variable scenarios. Never recycle standard textbook question tropes.
5. READING COMPREHENSION & PASSAGES: When generating questions for "Reading Comprehension" or passage-based domains:
- Provide an authentic, academic multi-paragraph passage (300 to 500 words for CAT/GMAT/GRE/CLAT; 150 to 300 words for UPSC) in the "passage" field.
- If multiple questions in the batch test the same passage, assign them the exact same "passage_id" and identical "passage" content so they form a cohesive passage set.
- Provide ONLY the specific question stem in "question_text" (e.g. "What is the primary rhetorical purpose of paragraph 2?"). NEVER duplicate the passage text inside "question_text".

# OUTPUT INTERFACE
Output ONLY raw JSON matching this schema. No markdown, no preambles.

interface Response {
  questions: Array<{
    passage?: string; // Authentic multi-paragraph reading passage (300-500 words) for RC
    passage_id?: string; // Unique shared identifier if multiple questions reference the same passage
    question_text: string; // The question stem alone
    options: { A: string; B: string; C: string; D: string; E?: string };
    correct_option: "A" | "B" | "C" | "D" | "E";
    distractor_analysis: { A: string; B: string; C: string; D: string; E?: string };
    skill_domain: string; // MUST perfectly match a provided Target Domain
    difficulty_tier: "foundation" | "application" | "advanced" | "expert";
    time_estimate_seconds: number;
    misconception: string; // Exact name of the specific error
    topics: string[]; // 1-2 precise sub-topics
  }>
}

Constraint Checklist & Confidence Score:
1. Is every distractor plausible? Yes.
2. Is the JSON completely bare (no \`\`\`json)? Yes.
3. Do skill domains match the prompt exactly? Yes.`;
const CACHED_PROMPT_LENGTH = TUTOR_SYSTEM_PROMPT.length;

export function getTutorSystemPrompt(): string {
  return TUTOR_SYSTEM_PROMPT;
}

export function getTutorSystemPromptStats(): { length: number } {
  return { length: CACHED_PROMPT_LENGTH };
}

// ----- Dynamic User Message Builder -----

export function buildTutorUserMessage(params: TutorPromptParams): string {
  const {
    examName,
    examYear,
    timeMode,
    daysRemaining,
    targetDomains,
    questionCount,
    difficultyDistribution,
    previousQuestionStems = [],
    entropySeed = "",
  } = params;

  const domainLines = targetDomains
    .map((d) => formatDomainMasteryLine(d))
    .join("\n");

  const exclusions = previousQuestionStems.length > 0
    ? `\n\nPREVIOUS QUESTIONS TO EXCLUDE (DO NOT REPEAT OR GENERATE SIMILAR SETUPS TO ANY OF THESE):\n${previousQuestionStems
        .slice(0, 25)
        .map((s, idx) => `${idx + 1}. ${s.length > 140 ? s.slice(0, 140) + "..." : s}`)
        .join("\n")}`
    : "";

  const seedDirective = entropySeed
    ? `\nVARIATION FINGERPRINT: [${entropySeed}] — Formulate distinct problem contexts, non-standard parameterizations, or experimental setups. Avoid textbook clichés.`
    : "";

  const hasReadingComprehension = targetDomains.some((d) =>
    /reading comprehension|verbal ability|comprehension/i.test(d.skillDomain)
  );
  const rcDirective = hasReadingComprehension
    ? `\n\nREADING COMPREHENSION DIRECTIVE:\nFor Reading Comprehension items, provide a full authentic passage (350–500 words) in the "passage" field. Group multiple questions under the same passage by assigning them the identical "passage_id" and identical "passage" text. In "question_text", provide ONLY the specific question prompt.`
    : "";

  const isGMAT = /gmat/i.test(examName);
  const gmatDirective = isGMAT
    ? `\n\nGMAT FOCUS 2026 SPECIFICATION MANDATE:
1. 5-CHOICE REQUIREMENT: Every single question MUST provide exactly 5 answer options (A, B, C, D, E) and corresponding distractor_analysis for all 5 choices (A through E).
2. DATA SUFFICIENCY STEM FORMAT: For any "Data Sufficiency" questions, the options MUST adhere strictly to official GMAC canonical text:
   - A: Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.
   - B: Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.
   - C: BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.
   - D: EACH statement ALONE is sufficient.
   - E: Statements (1) and (2) TOGETHER are NOT sufficient.
3. CRITICAL REASONING & TRAP LABELS: Formulate authentic GMAT reasoning structures (Premise, Unstated Assumption, Conclusion). In "misconception", classify the specific trap (e.g., "C-Trap in DS", "Reverse Causality", "Out of Scope", "Extreme Quantifier").`
    : "";

  return `CONTEXT: ${examName} ${examYear} | Mode: ${timeMode} | ${daysRemaining} days remaining.

TARGET DOMAINS & MASTERY:
${domainLines}

EXECUTION DIRECTIVE:
Generate exactly ${questionCount} questions strictly at exam-grade difficulty:
- ${difficultyDistribution.easy} "foundation" tier (Trivial recall forbidden)
- ${difficultyDistribution.medium} "application" tier (Rigorous multi-step problem solving)
- ${difficultyDistribution.hard} "advanced" / "expert" tier (Deceptive distractors, analytical synthesis, calculus/derivation)${exclusions}${seedDirective}${rcDirective}${gmatDirective}

CRITICAL: Every question MUST BE COMPLETELY NOVEL and distinct from previous sessions. Strictly use the exact TARGET DOMAIN names provided above for the \`skill_domain\` field.`;
}

// ----- Domain Selection (SM-2 Queue) -----

export function selectTargetDomains(
  concepts: ConceptMasteryRow[],
  taxonomyDomains: string[],
  count: number,
): TargetDomain[] {
  const conceptByDomain = new Map<string, ConceptMasteryRow>();
  for (const c of concepts) {
    conceptByDomain.set(c.skill_domain, c);
  }

  const now = new Date().toISOString();

  const candidates: TargetDomain[] = taxonomyDomains.map((domain) => {
    const row = conceptByDomain.get(domain);

    if (row) {
      return {
        skillDomain: domain,
        masteryScore: row.mastery_score,
        recentErrors: [],
        isOverdue: row.next_review_at <= now,
        lastSeenAt: row.last_seen_at,
      };
    }

    return {
      skillDomain: domain,
      masteryScore: 0,
      recentErrors: [],
      isOverdue: true,
      lastSeenAt: null,
    };
  });

  candidates.sort((a, b) => {
    if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
    if (a.masteryScore !== b.masteryScore) return a.masteryScore - b.masteryScore;
    const aTs = a.lastSeenAt ? new Date(a.lastSeenAt).getTime() : 0;
    const bTs = b.lastSeenAt ? new Date(b.lastSeenAt).getTime() : 0;
    return aTs - bTs;
  });

  return candidates.slice(0, count);
}

// ----- Domain Mastery Line Formatter -----

export function formatDomainMasteryLine(domain: TargetDomain): string {
  const base = `${domain.skillDomain}: ${Number(domain.masteryScore).toFixed(2)}`;
  if (domain.recentErrors.length === 0) {
    return `- ${base} (no recent errors)`;
  }
  const errors = domain.recentErrors.join(", ");
  return `- ${base} (recent errors: ${errors})`;
}

// ----- Difficulty Distribution Calculator -----

// ----- Diagnostic User Message Builder -----

export interface DiagnosticStrata {
  name: string;
  domains: string[];
}

export interface DiagnosticUserMessageParams {
  examName: string;
  examYear: string;
  strata: DiagnosticStrata[];
}

export function buildDiagnosticUserMessage(
  params: DiagnosticUserMessageParams,
): string {
  const { examName, examYear, strata } = params;

  const strataLines = strata
    .map((s) => `- ${s.name}: ${s.domains.join(", ")}`)
    .join("\n");

  const isGMAT = /gmat/i.test(examName);
  const conventionLine = isGMAT
    ? "3. Provide exactly 5 options (A, B, C, D, E) and distractor_analysis for each, adhering to GMAC question standards."
    : "3. Use the standard conventions for the exam (SI, IUPAC where applicable).";

  return `CONTEXT: ${examName} ${examYear} | Mode: Diagnostic (5 questions)

DIAGNOSTIC STRATA:
${strataLines}

EXECUTION DIRECTIVE:
Generate exactly 5 questions — one per stratum listed above. Each question must:
1. Test fundamental, cross-cutting understanding of the stratum's domain cluster. Do NOT target a single topic within the cluster.
2. Require connecting concepts across at least two domains in the cluster to reach the correct answer.
${conventionLine}
4. Include plausible distractors derived from common errors within that stratum.

CRITICAL: One question per stratum. Output raw JSON matching the schema. Do not repeat questions.`;
}

export function computeDifficultyDistribution(
  questionCount: number,
  _timeMode?: TimeMode,
): { easy: number; medium: number; hard: number } {
  // Calibrated strictly to Difficult / Competitive Exam standard.
  // 0 easy/foundation questions (trivial recall forbidden).
  // Advanced & Expert dominate (~75%), remainder is multi-step Application (~25%).
  const easy = 0;
  const medium = Math.floor(questionCount * 0.25);
  const hard = Math.max(1, questionCount - medium);
  return { easy, medium, hard };
}
