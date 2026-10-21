// Path: lib/diagnostic-seed.ts
import { supabaseAdmin } from "@/lib/supabase/admin";
import { calculateReadinessIndex } from "@/lib/sm2";
import { TUTOR_CONFIG } from "@/lib/constants/tutor";
import taxonomy from "@/lib/taxonomies.json";

// ----- Types -----

interface QuestionResult {
  skill_domain: string;
  is_correct: boolean;
  time_to_answer_ms: number;
  time_estimate_seconds: number;
}

export interface SeedDiagnosticParams {
  userId: string;
  examProfileId: string;
  sessionId: string;
  examName: string;
  questionResults: QuestionResult[];
}

export interface DiagnosticStrata {
  name: string;
  domains: string[];
}

interface MasteryUpsertRow {
  user_id: string;
  exam_profile_id: string;
  skill_domain: string;
  mastery_score: number;
  total_attempted: number;
  total_correct: number;
  streak: number;
  review_interval_days: number;
  review_ease_factor: number;
  next_review_at: string;
  last_seen_at: string;
}

// ----- Diagnostic Strata -----

const SAT_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Reading & Writing: Rhetoric & Structure",
    domains: [
      "Craft and Structure",
      "Information and Ideas",
      "Words in Context",
      "Text Structure and Purpose",
      "Cross-Text Connections",
      "Central Ideas and Details",
      "Inferences",
      "Command of Evidence (Textual)",
      "Command of Evidence (Quantitative)",
    ],
  },
  {
    name: "Reading & Writing: Conventions & Expression",
    domains: [
      "Standard English Conventions",
      "Expression of Ideas",
      "Boundaries (Punctuation & Splices)",
      "Form, Structure, and Sense",
      "Transitions and Logical Flow",
      "Rhetorical Synthesis",
    ],
  },
  {
    name: "Math: Algebra & Equations",
    domains: [
      "Algebra",
      "Advanced Math",
      "Linear Equations in 1 & 2 Variables",
      "Linear Functions & Graphs",
      "Systems of Linear Equations",
      "Linear Inequalities",
      "Nonlinear Functions & Modeling",
      "Quadratic Equations & Discriminant",
      "Exponential Growth & Decay",
      "Polynomial Operations & Factors",
    ],
  },
  {
    name: "Math: Problem Solving & Data Analysis",
    domains: [
      "Problem-Solving and Data Analysis",
      "Ratios, Rates & Proportions",
      "Percentages & Unit Conversions",
      "One- & Two-Variable Statistics",
      "Probability & Data Interpretation",
    ],
  },
  {
    name: "Math: Geometry & Trigonometry",
    domains: [
      "Geometry and Trigonometry",
      "Lines, Angles & Triangles",
      "Right Triangles & Trigonometry",
      "Circles & Theorems",
    ],
  },
];

const CFA_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Ethical & Professional Standards",
    domains: [
      "Code of Ethics",
      "Standards of Professional Conduct",
      "Global Investment Performance Standards (GIPS)",
    ],
  },
  {
    name: "Quantitative Methods & Economics",
    domains: [
      "Time Value of Money",
      "Statistical Concepts & Market Returns",
      "Probability Distributions",
      "Hypothesis Testing",
      "Simple Linear Regression",
      "Microeconomic Analysis",
      "Monetary and Fiscal Policy",
      "International Trade & Capital Flows",
      "Currency Exchange Rates",
    ],
  },
  {
    name: "Financial Statement Analysis",
    domains: [
      "Financial Reporting Standards",
      "Income Statements",
      "Balance Sheets",
      "Cash Flow Statements",
      "Inventories & Long-Lived Assets",
      "Financial Analysis Techniques",
    ],
  },
  {
    name: "Corporate Issuers & Equity",
    domains: [
      "Corporate Governance",
      "Working Capital & Liquidity",
      "Capital Structure",
      "Capital Investments",
      "Market Organization & Structure",
      "Security Market Indexes",
      "Market Efficiency",
      "Equity Valuation",
    ],
  },
  {
    name: "Fixed Income, Derivatives & Alternatives",
    domains: [
      "Fixed-Income Securities",
      "Fixed-Income Valuation",
      "Asset-Backed Securities",
      "Yield & Spread Analysis",
      "Credit Analysis",
      "Derivative Markets & Instruments",
      "Forward & Futures Contracts",
      "Option Basics",
      "Swaps",
      "Real Estate",
      "Private Equity",
      "Hedge Funds",
      "Commodities",
      "Portfolio Risk & Return",
      "Portfolio Planning & Construction",
      "Behavioral Biases",
    ],
  },
];

const GMAT_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Quantitative Reasoning",
    domains: [
      "Arithmetic",
      "Algebra",
      "Number Properties",
      "Word Problems (Rates & Work)",
      "Word Problems (Overlapping Sets)",
      "Counting & Probability",
      "Applied Statistics",
    ],
  },
  {
    name: "Verbal: Critical Reasoning",
    domains: [
      "Critical Reasoning",
      "CR: Assumption & Flaw",
      "CR: Strengthen & Weaken",
      "CR: Inference & Conclusion",
      "CR: Boldface & Method of Reasoning",
    ],
  },
  {
    name: "Verbal: Reading Comprehension",
    domains: [
      "Reading Comprehension",
      "RC: Main Idea & Primary Purpose",
      "RC: Inference & Specific Detail",
      "RC: Structure, Tone & Organization",
    ],
  },
  {
    name: "Data Sufficiency Logic",
    domains: [
      "Data Sufficiency",
      "DS: Value Questions (Unique Solution)",
      "DS: Yes/No Questions (Invariant Answer)",
      "DS: Number Properties & Inequalities",
    ],
  },
  {
    name: "Integrated Data Reasoning",
    domains: [
      "Two-Part Analysis",
      "Two-Part Analysis: Quantitative",
      "Two-Part Analysis: Logical",
      "Table Analysis",
      "Graphics Interpretation",
      "Multi-Source Reasoning",
    ],
  },
];

const GRE_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Quantitative Comparison & Algebra",
    domains: [
      "Algebra",
      "Arithmetic",
      "Quantitative Comparison",
      "QC: Arithmetic & Number Properties",
      "QC: Algebra & Inequalities",
      "QC: Geometry & Coordinate Traps",
      "Number Properties & Divisibility",
      "Word Problems & Applied Math",
    ],
  },
  {
    name: "Geometry & Data Interpretation",
    domains: [
      "Geometry",
      "Data Analysis",
      "Statistics & Data Interpretation",
      "Counting Methods & Probability",
    ],
  },
  {
    name: "Text Completion Logic",
    domains: [
      "Text Completion",
      "TC: Single-Blank Vocabulary",
      "TC: Two-Blank Contrast & Shift",
      "TC: Three-Blank Complex Logic",
    ],
  },
  {
    name: "Sentence Equivalence & Vocab",
    domains: [
      "Sentence Equivalence",
      "SE: Synonym Pairs & Secondary Meanings",
      "SE: Context Clues & Tone",
    ],
  },
  {
    name: "Reading Comprehension & Critical Analysis",
    domains: [
      "Reading Comprehension",
      "RC: Main Idea & Primary Purpose",
      "RC: Inference & Specific Detail",
      "RC: Argument Analysis & Paradox",
      "RC: Structure, Tone & Author Stance",
      "Analyze an Issue",
      "Issue: Thesis & Supporting Evidence",
      "Issue: Counterargument & Rebuttal",
    ],
  },
];

const IELTS_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Reading: Factual & Ternary Logic",
    domains: [
      "True-False-Not Given",
      "Inference and Implication",
      "TFNG: Modal Qualification",
      "TFNG: Factual Contradiction",
      "TFNG: Unstated & Not Given",
    ],
  },
  {
    name: "Reading: Cohesion & Macro Structure",
    domains: [
      "Headings and Main Idea Matching",
      "Summary Completion",
      "Sentence Completion",
      "Academic Vocabulary in Context",
      "Heading: Overly Specific Distractors",
      "Matching Information to Paragraphs",
    ],
  },
  {
    name: "Listening: Conversational Detail & Trap Elimination",
    domains: [
      "Multiple Choice Traps",
      "Form and Note Completion",
      "Short Answer Comprehension",
      "Conversational Self-Correction Traps",
    ],
  },
  {
    name: "Listening: Spatial & Feature Categorization",
    domains: [
      "Map and Diagram Labelling",
      "Classification of Features",
      "Academic Lecture Gist",
    ],
  },
  {
    name: "Academic Writing & Lexical Precision",
    domains: [
      "Task 1: Data Synthesis",
      "Task 1: Process & Map",
      "Task 2: Task Response (TR)",
      "Task 2: Coherence & Cohesion (CC)",
      "Task 2: Lexical Resource (LR)",
      "Task 2: Grammatical Range & Accuracy (GRA)",
      "Part 1: Personal Interview",
      "Part 2: Long Turn (Cue Card)",
      "Part 3: Discussion & Discourse",
      "Pronunciation & Intonation",
    ],
  },
];

const TOEFL_DIAGNOSTIC_STRATA: DiagnosticStrata[] = [
  {
    name: "Reading: Factual & Lexical Analysis",
    domains: [
      "Factual Information",
      "Negative Factual Information",
      "Vocabulary in Context",
      "Inference and Rhetorical Purpose",
      "Purpose and Method",
    ],
  },
  {
    name: "Reading: Syntactic Cohesion & Synthesis",
    domains: [
      "Sentence Simplification",
      "Insert Text",
      "Prose Summary",
      "Insert Text [■] Placement",
      "Prose Summary Traps",
    ],
  },
  {
    name: "Listening: Pragmatic & Communicative Intent",
    domains: [
      "Gist-Content and Purpose",
      "Function and Speaker Stance",
      "Conversational Register",
    ],
  },
  {
    name: "Listening: Structural & Connecting Content",
    domains: [
      "Detail Identification",
      "Organization and Categorization",
      "Connecting Content",
      "Lecture Topic Structure",
    ],
  },
  {
    name: "Academic Writing & Integrated Speaking",
    domains: [
      "Integrated Writing: Lecture Refutation",
      "Academic Discussion: Contribution",
      "Syntactic Variety & Cohesion",
      "Grammatical Precision",
      "Independent Speaking (Q1)",
      "Integrated Campus Speech (Q2)",
      "Integrated Academic Concept (Q3)",
      "Integrated Lecture (Q4)",
    ],
  },
];

const SAT_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of SAT_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

const CFA_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of CFA_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

const GMAT_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of GMAT_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

const GRE_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of GRE_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

const IELTS_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of IELTS_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

const TOEFL_DOMAIN_TO_STRATUM: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const stratum of TOEFL_DIAGNOSTIC_STRATA) {
    for (const domain of stratum.domains) {
      map[domain.toLowerCase()] = stratum.name;
    }
  }
  return map;
})();

// ----- Exported Accessors -----

export function getDiagnosticStrata(examName?: string): DiagnosticStrata[] {
  if (examName && /sat/i.test(examName)) {
    return SAT_DIAGNOSTIC_STRATA;
  }
  if (examName && /gre/i.test(examName)) {
    return GRE_DIAGNOSTIC_STRATA;
  }
  if (examName && /gmat/i.test(examName)) {
    return GMAT_DIAGNOSTIC_STRATA;
  }
  if (examName && /cfa/i.test(examName)) {
    return CFA_DIAGNOSTIC_STRATA;
  }
  if (examName && /ielts/i.test(examName)) {
    return IELTS_DIAGNOSTIC_STRATA;
  }
  if (examName && /toefl/i.test(examName)) {
    return TOEFL_DIAGNOSTIC_STRATA;
  }
  return SAT_DIAGNOSTIC_STRATA;
}

export function getStratumForDomain(domain: string, examName?: string): string | null {
  const norm = domain.trim().toLowerCase();
  const isGRE = examName && /gre/i.test(examName);
  const isGMAT = examName && /gmat/i.test(examName);
  const isIELTS = examName && /ielts/i.test(examName);
  const isTOEFL = examName && /toefl/i.test(examName);

  if (isIELTS) {
    if (IELTS_DOMAIN_TO_STRATUM[norm]) return IELTS_DOMAIN_TO_STRATUM[norm];
    if (norm.includes("tfng") || norm.includes("true-false") || norm.includes("yes-no") || norm.includes("not given")) {
      return "Reading: Factual & Ternary Logic";
    }
    if (norm.includes("heading") || norm.includes("summary") || norm.includes("sentence") || norm.includes("vocabulary") || norm.includes("matching")) {
      return "Reading: Cohesion & Macro Structure";
    }
    if (norm.includes("trap") || norm.includes("form") || norm.includes("note") || norm.includes("short answer")) {
      return "Listening: Conversational Detail & Trap Elimination";
    }
    if (norm.includes("map") || norm.includes("diagram") || norm.includes("feature") || norm.includes("lecture")) {
      return "Listening: Spatial & Feature Categorization";
    }
    if (norm.includes("task") || norm.includes("writing") || norm.includes("speaking") || norm.includes("pronunciation")) {
      return "Academic Writing & Lexical Precision";
    }
    return "Reading: Cohesion & Macro Structure";
  }

  if (isTOEFL) {
    if (TOEFL_DOMAIN_TO_STRATUM[norm]) return TOEFL_DOMAIN_TO_STRATUM[norm];
    if (norm.includes("factual") || norm.includes("vocabulary") || norm.includes("purpose") || norm.includes("inference")) {
      return "Reading: Factual & Lexical Analysis";
    }
    if (norm.includes("simplification") || norm.includes("insert") || norm.includes("prose summary")) {
      return "Reading: Syntactic Cohesion & Synthesis";
    }
    if (norm.includes("gist") || norm.includes("stance") || norm.includes("attitude")) {
      return "Listening: Pragmatic & Communicative Intent";
    }
    if (norm.includes("detail") || norm.includes("organization") || norm.includes("connecting")) {
      return "Listening: Structural & Connecting Content";
    }
    if (norm.includes("writing") || norm.includes("speaking") || norm.includes("discussion")) {
      return "Academic Writing & Integrated Speaking";
    }
    return "Reading: Factual & Lexical Analysis";
  }

  if (isGRE) {
    if (GRE_DOMAIN_TO_STRATUM[norm]) return GRE_DOMAIN_TO_STRATUM[norm];
    if (norm.startsWith("tc:") || norm.includes("text completion")) return "Text Completion Logic";
    if (norm.startsWith("se:") || norm.includes("sentence equivalence")) return "Sentence Equivalence & Vocab";
    if (norm.startsWith("rc:") || norm.includes("reading comprehension")) return "Reading Comprehension & Critical Analysis";
    if (norm.startsWith("qc:") || norm.includes("quantitative comparison")) return "Quantitative Comparison & Algebra";
    if (norm.includes("geometry") || norm.includes("data analysis") || norm.includes("statistics") || norm.includes("probability")) {
      return "Geometry & Data Interpretation";
    }
    if (norm.includes("arithmetic") || norm.includes("algebra") || norm.includes("number properties") || norm.includes("word problem")) {
      return "Quantitative Comparison & Algebra";
    }
    return "Reading Comprehension & Critical Analysis";
  }

  if (isGMAT) {
    if (GMAT_DOMAIN_TO_STRATUM[norm]) return GMAT_DOMAIN_TO_STRATUM[norm];
    // Heuristic fallbacks for GMAT
    if (norm.startsWith("cr:") || norm.includes("critical reasoning")) return "Verbal: Critical Reasoning";
    if (norm.startsWith("rc:") || norm.includes("reading comprehension")) return "Verbal: Reading Comprehension";
    if (norm.startsWith("ds:") || norm.includes("data sufficiency")) return "Data Sufficiency Logic";
    if (norm.includes("table") || norm.includes("graphics") || norm.includes("multi-source") || norm.includes("two-part")) {
      return "Integrated Data Reasoning";
    }
    if (norm.includes("arithmetic") || norm.includes("algebra") || norm.includes("number") || norm.includes("probability") || norm.includes("statistics") || norm.includes("word problem")) {
      return "Quantitative Reasoning";
    }
    return null;
  }

  const isSAT = examName && /sat/i.test(examName);
  if (isSAT) {
    if (SAT_DOMAIN_TO_STRATUM[norm]) return SAT_DOMAIN_TO_STRATUM[norm];
    if (
      norm.includes("craft") ||
      norm.includes("information") ||
      norm.includes("reading") ||
      norm.includes("words in context") ||
      norm.includes("evidence") ||
      norm.includes("inference") ||
      norm.includes("central idea") ||
      norm.includes("text structure") ||
      norm.includes("cross-text")
    ) {
      return "Reading & Writing: Rhetoric & Structure";
    }
    if (
      norm.includes("convention") ||
      norm.includes("expression") ||
      norm.includes("grammar") ||
      norm.includes("writing") ||
      norm.includes("boundary") ||
      norm.includes("transition") ||
      norm.includes("rhetorical") ||
      norm.includes("punctuation") ||
      norm.includes("form, structure")
    ) {
      return "Reading & Writing: Conventions & Expression";
    }
    if (
      norm.includes("algebra") ||
      norm.includes("advanced math") ||
      norm.includes("linear") ||
      norm.includes("quadratic") ||
      norm.includes("polynomial") ||
      norm.includes("exponential") ||
      norm.includes("systems")
    ) {
      return "Math: Algebra & Equations";
    }
    if (
      norm.includes("problem-solving") ||
      norm.includes("data analysis") ||
      norm.includes("statistics") ||
      norm.includes("ratio") ||
      norm.includes("percentage") ||
      norm.includes("probability")
    ) {
      return "Math: Problem Solving & Data Analysis";
    }
    if (
      norm.includes("geometry") ||
      norm.includes("trigonometry") ||
      norm.includes("circle") ||
      norm.includes("triangle") ||
      norm.includes("angle") ||
      norm.includes("lines")
    ) {
      return "Math: Geometry & Trigonometry";
    }
    return "Math: Algebra & Equations";
  }

  const isCFA = examName && /cfa/i.test(examName);
  if (isCFA) {
    if (CFA_DOMAIN_TO_STRATUM[norm]) return CFA_DOMAIN_TO_STRATUM[norm];
    if (norm.includes("ethic") || norm.includes("conduct") || norm.includes("gips")) return "Ethical & Professional Standards";
    if (norm.includes("quant") || norm.includes("time value") || norm.includes("stat") || norm.includes("econ")) return "Quantitative Methods & Economics";
    if (norm.includes("statement") || norm.includes("reporting") || norm.includes("financial analysis") || norm.includes("balance") || norm.includes("income")) return "Financial Statement Analysis";
    if (norm.includes("equity") || norm.includes("corporate") || norm.includes("governance") || norm.includes("capital")) return "Corporate Issuers & Equity";
    return "Fixed Income, Derivatives & Alternatives";
  }

  // Fallback to checking all global domain maps
  return SAT_DOMAIN_TO_STRATUM[norm] ?? GMAT_DOMAIN_TO_STRATUM[norm] ?? GRE_DOMAIN_TO_STRATUM[norm] ?? CFA_DOMAIN_TO_STRATUM[norm] ?? IELTS_DOMAIN_TO_STRATUM[norm] ?? TOEFL_DOMAIN_TO_STRATUM[norm] ?? null;
}

// ----- Scoring Constants -----

const SCORE_WRONG = 0.3;
const SCORE_SLOW_CORRECT = 0.45;
const SCORE_FAST_CORRECT = 0.6;
const SCORE_UNTESTED = 0.5;
const JITTER_RANGE = 0.03;

// ----- Taxonomy Helpers -----

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomy as unknown as TaxonomyData;

function getTaxonomyDomains(examName: string): string[] {
  const examSubjects = taxonomyData[examName] ?? {};
  const domains: string[] = [];
  const seen = new Set<string>();

  for (const subjects of Object.values(examSubjects)) {
    for (const domain of subjects) {
      // Normalize: skip generic subject-level entries that aren't real domains
      const normalized = domain.trim();
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      domains.push(normalized);
    }
  }

  return domains;
}

// ----- Jitter -----

function applyJitter(score: number): number {
  const jitter = (Math.random() - 0.5) * 2 * JITTER_RANGE;
  const raw = score + jitter;
  return Math.round(Math.max(0, Math.min(1, raw)) * 10000) / 10000;
}

// ----- Core Seed Logic -----

export async function seedDiagnosticPriors(
  params: SeedDiagnosticParams,
): Promise<{ masteryRows: MasteryUpsertRow[]; readinessIndex: number }> {
  const { userId, examProfileId, sessionId, examName, questionResults } =
    params;

  // 1. Fetch existing mastery rows for this profile
  const { data: existingMastery } = await supabaseAdmin
    .from("concept_mastery")
    .select("skill_domain, mastery_score")
    .eq("user_id", userId)
    .eq("exam_profile_id", examProfileId);

  const existingScoreByDomain = new Map<string, number>();
  if (existingMastery) {
    for (const row of existingMastery) {
      existingScoreByDomain.set(row.skill_domain, row.mastery_score);
    }
  }

  // 2. Determine per-stratum score from question results
  //    If multiple questions land in the same stratum, take the best outcome.
  const stratumScore = new Map<string, number>();

  for (const qr of questionResults) {
    const stratumName = getStratumForDomain(qr.skill_domain, examName);
    if (!stratumName) continue;

    let score: number;
    if (!qr.is_correct) {
      score = SCORE_WRONG;
    } else if (qr.time_to_answer_ms > qr.time_estimate_seconds * 1000) {
      score = SCORE_SLOW_CORRECT;
    } else {
      score = SCORE_FAST_CORRECT;
    }

    const current = stratumScore.get(stratumName);
    if (current === undefined || score > current) {
      stratumScore.set(stratumName, score);
    }
  }

  // 3. Build mastery upsert rows for all domains in the exam's taxonomy
  const taxonomyDomains = getTaxonomyDomains(examName);
  const now = new Date().toISOString();
  const masteryRows: MasteryUpsertRow[] = [];
  const finalScores: Record<string, number> = {};

  for (const domain of taxonomyDomains) {
    const stratumName = getStratumForDomain(domain, examName);
    const stratumScoreValue = stratumName
      ? stratumScore.get(stratumName) ?? null
      : null;

    let baseScore: number;
    if (stratumScoreValue !== null) {
      baseScore = stratumScoreValue;
    } else if (existingScoreByDomain.has(domain)) {
      // Preserve existing score for domains outside the diagnostic strata
      baseScore = existingScoreByDomain.get(domain)!;
    } else {
      // Untested: neutral prior
      baseScore = SCORE_UNTESTED;
    }

    const finalScore = applyJitter(baseScore);
    finalScores[domain] = finalScore;

    const domainQRs = questionResults.filter((qr) => qr.skill_domain === domain);
    const domainAttempted = domainQRs.length;
    const domainCorrect = domainQRs.filter((qr) => qr.is_correct).length;

    masteryRows.push({
      user_id: userId,
      exam_profile_id: examProfileId,
      skill_domain: domain,
      mastery_score: finalScore,
      total_attempted: domainAttempted,
      total_correct: domainCorrect,
      streak: domainCorrect > 0 ? domainCorrect : 0,
      review_interval_days: TUTOR_CONFIG.SM2_DEFAULTS.initial_interval_days,
      review_ease_factor: TUTOR_CONFIG.SM2_DEFAULTS.initial_ease_factor,
      next_review_at: now,
      last_seen_at: now,
    });
  }

  // 4. Upsert concept_mastery rows
  const { error: upsertError } = await supabaseAdmin
    .from("concept_mastery")
    .upsert(masteryRows, {
      onConflict: "user_id, exam_profile_id, skill_domain",
    });

  if (upsertError) {
    console.error(
      "[seedDiagnosticPriors] Mastery upsert error:",
      upsertError,
    );
    throw new Error("Failed to seed diagnostic mastery priors.");
  }

  // 5. Insert mastery_history rows for tracked domains only
  const historyRows = masteryRows.map((row) => ({
    user_id: row.user_id,
    exam_profile_id: row.exam_profile_id,
    skill_domain: row.skill_domain,
    mastery_score: row.mastery_score,
    recorded_at: now,
  }));

  const { error: historyError } = await supabaseAdmin
    .from("mastery_history")
    .insert(historyRows);

  if (historyError) {
    console.error(
      "[seedDiagnosticPriors] History insert error:",
      historyError,
    );
    // Non-fatal: mastery rows are already persisted
  }

  // 6. Compute readiness index
  const readinessIndex = calculateReadinessIndex(finalScores, taxonomyDomains);

  return { masteryRows, readinessIndex };
}
