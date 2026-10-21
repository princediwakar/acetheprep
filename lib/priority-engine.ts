// Path: lib/priority-engine.ts
// Tiered Priority Engine - core algorithm for topic selection
// Priority Score = (Exam Weight × Knowledge Gap × Forgetting Risk) / min(Estimated Minutes to Mastery, C_tier)

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDomainsForExam } from "@/lib/services/taxonomy";

export type DifficultyTier = "foundation" | "application" | "advanced" | "expert";

export interface ExamTopicWeight {
  id: string;
  exam_name: string;
  subject: string;
  topic: string;
  skill_domain: string;
  difficulty_tier: DifficultyTier;
  exam_weight: number;           // From JEE past-10-year question frequency
  question_frequency_10yr: number; // Raw question count
  c_tier_cap: number | null;     // 75th percentile completion time (minutes)
  estimated_minutes_to_mastery: number | null;
}

export interface PriorityInput {
  userId: string;
  examProfileId: string;
  examName: string;
  masteryScores: Record<string, number>;
  nextReviewDates: Record<string, Date>;
  lastSeenDates: Record<string, Date | null>;
  totalAttempted: Record<string, number>;
  timeMode: "foundation" | "acceleration" | "triage";
  daysRemaining: number;
}

export interface PriorityOutput {
  skillDomain: string;
  priorityScore: number;
  components: {
    examWeight: number;
    knowledgeGap: number;
    forgettingRisk: number;
    estimatedMinutes: number;
    cTierCap: number;
    denominator: number;
  };
  difficultyTier: DifficultyTier;
  subject: string;
}

// Default C_tier caps (minutes) - will be overridden by empirical data
// Values synced with seed-exam-weights.ts
const DEFAULT_C_TIER: Record<DifficultyTier, number> = {
  foundation: 30,
  application: 45,
  advanced: 60,
  expert: 75,
};

// Subject mapping for JEE Main domains
const DOMAIN_TO_SUBJECT: Record<string, string> = {
  // Physics
  Kinematics: "Physics",
  "Laws of Motion": "Physics",
  "Work, Energy and Power": "Physics",
  "Rotational Motion": "Physics",
  Thermodynamics: "Physics",
  Electrostatics: "Physics",
  "Current Electricity": "Physics",
  Optics: "Physics",
  "Modern Physics": "Physics",
  // Chemistry
  "Atomic Structure": "Chemistry",
  "Chemical Bonding": "Chemistry",
  "Chemical Equilibrium": "Chemistry",
  "Coordination Compounds": "Chemistry",
  "Organic Chemistry Basics": "Chemistry",
  Hydrocarbons: "Chemistry",
  // Mathematics
  "Complex Numbers": "Mathematics",
  "Matrices and Determinants": "Mathematics",
  Calculus: "Mathematics",
  "Coordinate Geometry": "Mathematics",
  "Vector Algebra": "Mathematics",
  "Probability and Statistics": "Mathematics",
};

// Default difficulty tier per domain (will be overridden by DB)
const DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  Kinematics: "application",
  "Laws of Motion": "application",
  "Work, Energy and Power": "application",
  "Rotational Motion": "advanced",
  Thermodynamics: "advanced",
  Electrostatics: "application",
  "Current Electricity": "application",
  Optics: "advanced",
  "Modern Physics": "advanced",
  "Atomic Structure": "application",
  "Chemical Bonding": "application",
  "Chemical Equilibrium": "advanced",
  "Coordination Compounds": "advanced",
  "Organic Chemistry Basics": "advanced",
  Hydrocarbons: "advanced",
  "Complex Numbers": "application",
  "Matrices and Determinants": "application",
  Calculus: "advanced",
  "Coordinate Geometry": "application",
  "Vector Algebra": "advanced",
  "Probability and Statistics": "application",
};

// JEE Main past-10-year question frequency weights (normalized to sum = 1 per subject)
// These are approximate - in production, load from exam_topic_weights table
const JEE_EXAM_WEIGHTS: Record<string, number> = {
  // Physics
  Kinematics: 0.05,
  "Laws of Motion": 0.07,
  "Work, Energy and Power": 0.06,
  "Rotational Motion": 0.08,
  Thermodynamics: 0.05,
  Electrostatics: 0.08,
  "Current Electricity": 0.07,
  Optics: 0.06,
  "Modern Physics": 0.08,
  // Chemistry
  "Atomic Structure": 0.06,
  "Chemical Bonding": 0.08,
  "Chemical Equilibrium": 0.05,
  "Coordination Compounds": 0.06,
  "Organic Chemistry Basics": 0.10,
  Hydrocarbons: 0.07,
  // Mathematics
  "Complex Numbers": 0.04,
  "Matrices and Determinants": 0.05,
  Calculus: 0.15,
  "Coordinate Geometry": 0.08,
  "Vector Algebra": 0.05,
  "Probability and Statistics": 0.06,
};

// GMAT Focus exam section question weights (calibrated to official GMAC question distributions)
const GMAT_EXAM_WEIGHTS: Record<string, number> = {
  // Quantitative Reasoning (21 Qs)
  Arithmetic: 0.13,
  Algebra: 0.10,
  "Number Properties": 0.12,
  "Word Problems (Rates & Work)": 0.08,
  "Word Problems (Overlapping Sets)": 0.08,
  "Counting & Probability": 0.07,
  "Applied Statistics": 0.06,

  // Verbal Reasoning (23 Qs)
  "Reading Comprehension": 0.14,
  "Critical Reasoning": 0.12,
  "CR: Assumption & Flaw": 0.08,
  "CR: Strengthen & Weaken": 0.08,
  "CR: Inference & Conclusion": 0.07,
  "CR: Boldface & Method of Reasoning": 0.05,
  "RC: Main Idea & Primary Purpose": 0.08,
  "RC: Inference & Specific Detail": 0.09,
  "RC: Structure, Tone & Organization": 0.06,

  // Data Insights (20 Qs)
  "Data Sufficiency": 0.16,
  "DS: Value Questions (Unique Solution)": 0.08,
  "DS: Yes/No Questions (Invariant Answer)": 0.08,
  "DS: Number Properties & Inequalities": 0.07,
  "Two-Part Analysis": 0.12,
  "Two-Part Analysis: Quantitative": 0.07,
  "Two-Part Analysis: Logical": 0.06,
  "Table Analysis": 0.10,
  "Graphics Interpretation": 0.09,
  "Multi-Source Reasoning": 0.07,
};

const GMAT_DOMAIN_TO_SUBJECT: Record<string, string> = {
  Arithmetic: "Quantitative Reasoning",
  Algebra: "Quantitative Reasoning",
  "Number Properties": "Quantitative Reasoning",
  "Word Problems (Rates & Work)": "Quantitative Reasoning",
  "Word Problems (Overlapping Sets)": "Quantitative Reasoning",
  "Counting & Probability": "Quantitative Reasoning",
  "Applied Statistics": "Quantitative Reasoning",

  "Reading Comprehension": "Verbal Reasoning",
  "Critical Reasoning": "Verbal Reasoning",
  "CR: Assumption & Flaw": "Verbal Reasoning",
  "CR: Strengthen & Weaken": "Verbal Reasoning",
  "CR: Inference & Conclusion": "Verbal Reasoning",
  "CR: Boldface & Method of Reasoning": "Verbal Reasoning",
  "RC: Main Idea & Primary Purpose": "Verbal Reasoning",
  "RC: Inference & Specific Detail": "Verbal Reasoning",
  "RC: Structure, Tone & Organization": "Verbal Reasoning",

  "Data Sufficiency": "Data Insights",
  "DS: Value Questions (Unique Solution)": "Data Insights",
  "DS: Yes/No Questions (Invariant Answer)": "Data Insights",
  "DS: Number Properties & Inequalities": "Data Insights",
  "Two-Part Analysis": "Data Insights",
  "Two-Part Analysis: Quantitative": "Data Insights",
  "Two-Part Analysis: Logical": "Data Insights",
  "Table Analysis": "Data Insights",
  "Graphics Interpretation": "Data Insights",
  "Multi-Source Reasoning": "Data Insights",
};

const GMAT_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  Arithmetic: "application",
  Algebra: "advanced",
  "Number Properties": "advanced",
  "Word Problems (Rates & Work)": "application",
  "Word Problems (Overlapping Sets)": "application",
  "Counting & Probability": "advanced",
  "Applied Statistics": "application",

  "Reading Comprehension": "advanced",
  "Critical Reasoning": "advanced",
  "CR: Assumption & Flaw": "advanced",
  "CR: Strengthen & Weaken": "advanced",
  "CR: Inference & Conclusion": "advanced",
  "CR: Boldface & Method of Reasoning": "expert",
  "RC: Main Idea & Primary Purpose": "application",
  "RC: Inference & Specific Detail": "advanced",
  "RC: Structure, Tone & Organization": "advanced",

  "Data Sufficiency": "advanced",
  "DS: Value Questions (Unique Solution)": "advanced",
  "DS: Yes/No Questions (Invariant Answer)": "advanced",
  "DS: Number Properties & Inequalities": "expert",
  "Two-Part Analysis": "advanced",
  "Two-Part Analysis: Quantitative": "advanced",
  "Two-Part Analysis: Logical": "advanced",
  "Table Analysis": "application",
  "Graphics Interpretation": "application",
  "Multi-Source Reasoning": "expert",
};

// GRE General Exam section topic weights (calibrated to ETS 2024–2026 Shorter GRE)
const GRE_EXAM_WEIGHTS: Record<string, number> = {
  // Quantitative Reasoning (~27 Qs total across 2 sections)
  Arithmetic: 0.08,
  Algebra: 0.09,
  Geometry: 0.08,
  "Data Analysis": 0.08,
  "Quantitative Comparison": 0.14,
  "QC: Arithmetic & Number Properties": 0.08,
  "QC: Algebra & Inequalities": 0.09,
  "QC: Geometry & Coordinate Traps": 0.07,
  "Number Properties & Divisibility": 0.09,
  "Word Problems & Applied Math": 0.08,
  "Counting Methods & Probability": 0.07,
  "Statistics & Data Interpretation": 0.08,

  // Verbal Reasoning (~27 Qs total across 2 sections)
  "Text Completion": 0.14,
  "Sentence Equivalence": 0.12,
  "Reading Comprehension": 0.16,
  "TC: Single-Blank Vocabulary": 0.07,
  "TC: Two-Blank Contrast & Shift": 0.08,
  "TC: Three-Blank Complex Logic": 0.08,
  "SE: Synonym Pairs & Secondary Meanings": 0.08,
  "SE: Context Clues & Tone": 0.07,
  "RC: Main Idea & Primary Purpose": 0.08,
  "RC: Inference & Specific Detail": 0.09,
  "RC: Argument Analysis & Paradox": 0.08,
  "RC: Structure, Tone & Author Stance": 0.07,

  // Analytical Writing
  "Analyze an Issue": 0.06,
  "Issue: Thesis & Supporting Evidence": 0.05,
  "Issue: Counterargument & Rebuttal": 0.05,
};

const GRE_DOMAIN_TO_SUBJECT: Record<string, string> = {
  Arithmetic: "Quantitative Reasoning",
  Algebra: "Quantitative Reasoning",
  Geometry: "Quantitative Reasoning",
  "Data Analysis": "Quantitative Reasoning",
  "Quantitative Comparison": "Quantitative Reasoning",
  "QC: Arithmetic & Number Properties": "Quantitative Reasoning",
  "QC: Algebra & Inequalities": "Quantitative Reasoning",
  "QC: Geometry & Coordinate Traps": "Quantitative Reasoning",
  "Number Properties & Divisibility": "Quantitative Reasoning",
  "Word Problems & Applied Math": "Quantitative Reasoning",
  "Counting Methods & Probability": "Quantitative Reasoning",
  "Statistics & Data Interpretation": "Quantitative Reasoning",

  "Text Completion": "Verbal Reasoning",
  "Sentence Equivalence": "Verbal Reasoning",
  "Reading Comprehension": "Verbal Reasoning",
  "TC: Single-Blank Vocabulary": "Verbal Reasoning",
  "TC: Two-Blank Contrast & Shift": "Verbal Reasoning",
  "TC: Three-Blank Complex Logic": "Verbal Reasoning",
  "SE: Synonym Pairs & Secondary Meanings": "Verbal Reasoning",
  "SE: Context Clues & Tone": "Verbal Reasoning",
  "RC: Main Idea & Primary Purpose": "Verbal Reasoning",
  "RC: Inference & Specific Detail": "Verbal Reasoning",
  "RC: Argument Analysis & Paradox": "Verbal Reasoning",
  "RC: Structure, Tone & Author Stance": "Verbal Reasoning",

  "Analyze an Issue": "Analytical Writing",
  "Issue: Thesis & Supporting Evidence": "Analytical Writing",
  "Issue: Counterargument & Rebuttal": "Analytical Writing",
};

const GRE_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  Arithmetic: "foundation",
  Algebra: "application",
  Geometry: "application",
  "Data Analysis": "application",
  "Quantitative Comparison": "advanced",
  "QC: Arithmetic & Number Properties": "application",
  "QC: Algebra & Inequalities": "advanced",
  "QC: Geometry & Coordinate Traps": "advanced",
  "Number Properties & Divisibility": "advanced",
  "Word Problems & Applied Math": "application",
  "Counting Methods & Probability": "advanced",
  "Statistics & Data Interpretation": "application",

  "Text Completion": "advanced",
  "Sentence Equivalence": "advanced",
  "Reading Comprehension": "advanced",
  "TC: Single-Blank Vocabulary": "application",
  "TC: Two-Blank Contrast & Shift": "advanced",
  "TC: Three-Blank Complex Logic": "expert",
  "SE: Synonym Pairs & Secondary Meanings": "advanced",
  "SE: Context Clues & Tone": "application",
  "RC: Main Idea & Primary Purpose": "application",
  "RC: Inference & Specific Detail": "advanced",
  "RC: Argument Analysis & Paradox": "advanced",
  "RC: Structure, Tone & Author Stance": "application",

  "Analyze an Issue": "application",
  "Issue: Thesis & Supporting Evidence": "application",
  "Issue: Counterargument & Rebuttal": "advanced",
};

// IELTS Academic section weights (calibrated to Cambridge Assessment specifications)
const IELTS_EXAM_WEIGHTS: Record<string, number> = {
  // Reading (40 Qs, Band 1.0–9.0)
  "True-False-Not Given": 0.16,
  "TFNG: Modal Qualification": 0.10,
  "TFNG: Factual Contradiction": 0.08,
  "TFNG: Unstated & Not Given": 0.08,
  "Headings and Main Idea Matching": 0.15,
  "Heading: Overly Specific Distractors": 0.08,
  "Summary Completion": 0.12,
  "Sentence Completion": 0.09,
  "Inference and Implication": 0.11,
  "Academic Vocabulary in Context": 0.10,
  "Matching Information to Paragraphs": 0.11,

  // Listening (40 Qs, Band 1.0–9.0)
  "Multiple Choice Traps": 0.15,
  "Conversational Self-Correction Traps": 0.12,
  "Form and Note Completion": 0.15,
  "Map and Diagram Labelling": 0.12,
  "Classification of Features": 0.10,
  "Short Answer Comprehension": 0.10,
  "Academic Lecture Gist": 0.12,

  // Writing (Task 1 & Task 2)
  "Task 1: Data Synthesis": 0.12,
  "Task 1: Process & Map": 0.10,
  "Task 2: Task Response (TR)": 0.18,
  "Task 2: Coherence & Cohesion (CC)": 0.16,
  "Task 2: Lexical Resource (LR)": 0.14,
  "Task 2: Grammatical Range & Accuracy (GRA)": 0.14,

  // Speaking
  "Part 1: Personal Interview": 0.08,
  "Part 2: Long Turn (Cue Card)": 0.14,
  "Part 3: Discussion & Discourse": 0.16,
  "Pronunciation & Intonation": 0.12,
};

const IELTS_DOMAIN_TO_SUBJECT: Record<string, string> = {
  "True-False-Not Given": "Reading",
  "TFNG: Modal Qualification": "Reading",
  "TFNG: Factual Contradiction": "Reading",
  "TFNG: Unstated & Not Given": "Reading",
  "Headings and Main Idea Matching": "Reading",
  "Heading: Overly Specific Distractors": "Reading",
  "Summary Completion": "Reading",
  "Sentence Completion": "Reading",
  "Inference and Implication": "Reading",
  "Academic Vocabulary in Context": "Reading",
  "Matching Information to Paragraphs": "Reading",

  "Multiple Choice Traps": "Listening",
  "Conversational Self-Correction Traps": "Listening",
  "Form and Note Completion": "Listening",
  "Map and Diagram Labelling": "Listening",
  "Classification of Features": "Listening",
  "Short Answer Comprehension": "Listening",
  "Academic Lecture Gist": "Listening",

  "Task 1: Data Synthesis": "Writing",
  "Task 1: Process & Map": "Writing",
  "Task 2: Task Response (TR)": "Writing",
  "Task 2: Coherence & Cohesion (CC)": "Writing",
  "Task 2: Lexical Resource (LR)": "Writing",
  "Task 2: Grammatical Range & Accuracy (GRA)": "Writing",

  "Part 1: Personal Interview": "Speaking",
  "Part 2: Long Turn (Cue Card)": "Speaking",
  "Part 3: Discussion & Discourse": "Speaking",
  "Pronunciation & Intonation": "Speaking",
};

const IELTS_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  "True-False-Not Given": "advanced",
  "TFNG: Modal Qualification": "expert",
  "TFNG: Factual Contradiction": "application",
  "TFNG: Unstated & Not Given": "advanced",
  "Headings and Main Idea Matching": "advanced",
  "Heading: Overly Specific Distractors": "advanced",
  "Summary Completion": "application",
  "Sentence Completion": "application",
  "Inference and Implication": "advanced",
  "Academic Vocabulary in Context": "application",
  "Matching Information to Paragraphs": "advanced",

  "Multiple Choice Traps": "advanced",
  "Conversational Self-Correction Traps": "advanced",
  "Form and Note Completion": "foundation",
  "Map and Diagram Labelling": "application",
  "Classification of Features": "application",
  "Short Answer Comprehension": "application",
  "Academic Lecture Gist": "advanced",

  "Task 1: Data Synthesis": "advanced",
  "Task 1: Process & Map": "application",
  "Task 2: Task Response (TR)": "expert",
  "Task 2: Coherence & Cohesion (CC)": "advanced",
  "Task 2: Lexical Resource (LR)": "advanced",
  "Task 2: Grammatical Range & Accuracy (GRA)": "advanced",

  "Part 1: Personal Interview": "foundation",
  "Part 2: Long Turn (Cue Card)": "application",
  "Part 3: Discussion & Discourse": "advanced",
  "Pronunciation & Intonation": "advanced",
};

// TOEFL iBT section weights (calibrated to ETS 2023–2026 format)
const TOEFL_EXAM_WEIGHTS: Record<string, number> = {
  // Reading (20 Qs, 0–30 scaled)
  "Factual Information": 0.16,
  "Negative Factual Information": 0.14,
  "Inference and Rhetorical Purpose": 0.15,
  "Vocabulary in Context": 0.14,
  "Sentence Simplification": 0.15,
  "Insert Text": 0.13,
  "Prose Summary": 0.18,
  "Insert Text [■] Placement": 0.11,
  "Prose Summary Traps": 0.12,
  "Purpose and Method": 0.10,

  // Listening (28 Qs, 0–30 scaled)
  "Gist-Content and Purpose": 0.14,
  "Detail Identification": 0.15,
  "Function and Speaker Stance": 0.15,
  "Organization and Categorization": 0.12,
  "Connecting Content": 0.13,
  "Lecture Topic Structure": 0.12,
  "Conversational Register": 0.10,

  // Speaking (0–30 scaled)
  "Independent Speaking (Q1)": 0.12,
  "Integrated Campus Speech (Q2)": 0.14,
  "Integrated Academic Concept (Q3)": 0.15,
  "Integrated Lecture (Q4)": 0.15,

  // Writing (0–30 scaled)
  "Integrated Writing: Lecture Refutation": 0.22,
  "Academic Discussion: Contribution": 0.20,
  "Syntactic Variety & Cohesion": 0.12,
  "Grammatical Precision": 0.12,
};

const TOEFL_DOMAIN_TO_SUBJECT: Record<string, string> = {
  "Factual Information": "Reading",
  "Negative Factual Information": "Reading",
  "Inference and Rhetorical Purpose": "Reading",
  "Vocabulary in Context": "Reading",
  "Sentence Simplification": "Reading",
  "Insert Text": "Reading",
  "Prose Summary": "Reading",
  "Insert Text [■] Placement": "Reading",
  "Prose Summary Traps": "Reading",
  "Purpose and Method": "Reading",

  "Gist-Content and Purpose": "Listening",
  "Detail Identification": "Listening",
  "Function and Speaker Stance": "Listening",
  "Organization and Categorization": "Listening",
  "Connecting Content": "Listening",
  "Lecture Topic Structure": "Listening",
  "Conversational Register": "Listening",

  "Independent Speaking (Q1)": "Speaking",
  "Integrated Campus Speech (Q2)": "Speaking",
  "Integrated Academic Concept (Q3)": "Speaking",
  "Integrated Lecture (Q4)": "Speaking",

  "Integrated Writing: Lecture Refutation": "Writing",
  "Academic Discussion: Contribution": "Writing",
  "Syntactic Variety & Cohesion": "Writing",
  "Grammatical Precision": "Writing",
};

const TOEFL_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  "Factual Information": "application",
  "Negative Factual Information": "advanced",
  "Inference and Rhetorical Purpose": "advanced",
  "Vocabulary in Context": "foundation",
  "Sentence Simplification": "advanced",
  "Insert Text": "application",
  "Prose Summary": "expert",
  "Insert Text [■] Placement": "application",
  "Prose Summary Traps": "advanced",
  "Purpose and Method": "application",

  "Gist-Content and Purpose": "foundation",
  "Detail Identification": "application",
  "Function and Speaker Stance": "advanced",
  "Organization and Categorization": "advanced",
  "Connecting Content": "advanced",
  "Lecture Topic Structure": "application",
  "Conversational Register": "application",

  "Independent Speaking (Q1)": "application",
  "Integrated Campus Speech (Q2)": "application",
  "Integrated Academic Concept (Q3)": "advanced",
  "Integrated Lecture (Q4)": "advanced",

  "Integrated Writing: Lecture Refutation": "advanced",
  "Academic Discussion: Contribution": "advanced",
  "Syntactic Variety & Cohesion": "application",
  "Grammatical Precision": "application",
};

// Forgetting curve parameters by time mode
const FORGETTING_PARAMS = {
  foundation: { halfLifeDays: 30, steepness: 0.8 },
  acceleration: { halfLifeDays: 14, steepness: 1.0 },
  triage: { halfLifeDays: 7, steepness: 1.2 },
};

/**
 * Compute forgetting risk based on time since last review
 * Risk = 1 - exp(-ln(2) * daysSinceReview / halfLife)
 * Higher risk = more urgent to review
 */
function computeForgettingRisk(
  lastSeenAt: Date | null,
  timeMode: "foundation" | "acceleration" | "triage",
  daysRemaining: number
): number {
  if (!lastSeenAt) return 1.0; // Never seen = max risk

  const daysSinceReview = (Date.now() - lastSeenAt.getTime()) / (1000 * 60 * 60 * 24);
  const params = FORGETTING_PARAMS[timeMode];
  
  // Scale by exam proximity - more urgent as exam approaches
  const proximityFactor = Math.min(1.5, Math.max(0.5, 30 / Math.max(1, daysRemaining)));
  
  const risk = 1 - Math.exp(-Math.log(2) * daysSinceReview / params.halfLifeDays);
  return Math.min(1, risk * proximityFactor);
}

/**
 * Compute knowledge gap: 1 - mastery_score
 * Simple: lower mastery = higher gap = higher priority
 */
function computeKnowledgeGap(masteryScore: number): number {
  return 1 - Math.max(0, Math.min(1, masteryScore));
}

/**
 * Get empirical C_tier caps from completion_time_logs
 * Returns 75th percentile of time_to_mastery_minutes per difficulty tier
 */
async function getEmpiricalCTierCaps(examName: string): Promise<Record<DifficultyTier, number>> {
  const caps = { ...DEFAULT_C_TIER };

  try {
    // Get profiles for this exam, then sessions for those profiles, then filter logs
    const { data: profiles } = await supabaseAdmin
      .from("exam_profiles")
      .select("profile_id")
      .eq("exam_name", examName);

    const profileIds = (profiles ?? []).map((p: { profile_id: string }) => p.profile_id);

    let query = supabaseAdmin
      .from("completion_time_logs")
      .select("difficulty_tier, time_to_mastery_minutes")
      .not("time_to_mastery_minutes", "is", null)
      .gt("time_to_mastery_minutes", 0);

    if (profileIds.length > 0) {
      const { data: examSessions } = await supabaseAdmin
        .from("sessions")
        .select("id")
        .in("exam_profile_id", profileIds);

      const sessionIds = (examSessions ?? []).map((s: { id: string }) => s.id);
      if (sessionIds.length > 0) {
        query = query.in("session_id", sessionIds);
      }
    }

    const { data: logs } = await query;

    if (logs && logs.length > 10) {
      // Group by difficulty tier
      const byTier: Record<DifficultyTier, number[]> = {
        foundation: [],
        application: [],
        advanced: [],
        expert: [],
      };

      for (const log of logs) {
        const tier = log.difficulty_tier as DifficultyTier;
        if (byTier[tier] && log.time_to_mastery_minutes) {
          byTier[tier].push(log.time_to_mastery_minutes);
        }
      }

      // Compute 75th percentile for each tier
      for (const tier of Object.keys(byTier) as DifficultyTier[]) {
        const times = byTier[tier].sort((a, b) => a - b);
        if (times.length >= 5) {
          const idx = Math.floor(times.length * 0.75);
          caps[tier] = Math.max(DEFAULT_C_TIER[tier], times[idx]);
        }
      }
    }
  } catch (error) {
    console.warn("[PriorityEngine] Failed to load empirical C_tier caps:", error);
  }

  return caps;
}

/**
 * Get exam topic weights from database
 * Falls back to defaults if not available
 */
async function getExamTopicWeights(examName: string): Promise<ExamTopicWeight[]> {
  try {
    const { data } = await supabaseAdmin
      .from("exam_topic_weights")
      .select("*")
      .eq("exam_name", examName);

    if (data && data.length > 0) {
      return data as ExamTopicWeight[];
    }
  } catch (error) {
    console.warn("[PriorityEngine] Failed to load exam_topic_weights:", error);
  }

  // Build defaults from taxonomy + exam-specific weights
  const isGMAT = /gmat/i.test(examName);
  const isGRE = /gre/i.test(examName);
  const isIELTS = /ielts/i.test(examName);
  const isTOEFL = /toefl/i.test(examName);
  const domains = getDomainsForExam(examName);
  return domains.map((domain) => {
    let subject = "General";
    let difficultyTier: DifficultyTier = "application";
    let examWeight = 0.08;

    if (isIELTS) {
      subject = IELTS_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = IELTS_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = IELTS_EXAM_WEIGHTS[domain] || 0.10;
    } else if (isTOEFL) {
      subject = TOEFL_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = TOEFL_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = TOEFL_EXAM_WEIGHTS[domain] || 0.10;
    } else if (isGRE) {
      subject = GRE_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = GRE_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = GRE_EXAM_WEIGHTS[domain] || 0.08;
    } else if (isGMAT) {
      subject = GMAT_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = GMAT_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = GMAT_EXAM_WEIGHTS[domain] || 0.08;
    } else {
      subject = DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = JEE_EXAM_WEIGHTS[domain] || 0.08;
    }

    return {
      id: crypto.randomUUID(),
      exam_name: examName,
      subject,
      topic: domain,
      skill_domain: domain,
      difficulty_tier: difficultyTier,
      exam_weight: examWeight,
      question_frequency_10yr: 0,
      c_tier_cap: null,
      estimated_minutes_to_mastery: null,
    };
  });
}

/**
 * Main priority engine function
 * Returns topics sorted by priority score (highest first)
 */
export async function computePriorityScores(input: PriorityInput): Promise<PriorityOutput[]> {
  const isGMAT = /gmat/i.test(input.examName);
  const domains = getDomainsForExam(input.examName);

  // Load empirical C_tier caps
  const cTierCaps = await getEmpiricalCTierCaps(input.examName);

  // Load exam weights
  const examWeights = await getExamTopicWeights(input.examName);
  const weightMap = new Map(examWeights.map((w) => [w.skill_domain, w]));
  const tierMap = new Map(examWeights.map((w) => [w.skill_domain, w.difficulty_tier]));

  const results: PriorityOutput[] = [];

  for (const domain of domains) {
    const masteryScore = input.masteryScores[domain] ?? 0;
    const nextReviewAt = input.nextReviewDates[domain];
    const lastSeenAt = input.lastSeenDates[domain] ?? null;
    const weightInfo = weightMap.get(domain);

    // Skip if no weight info (shouldn't happen with defaults)
    if (!weightInfo) continue;

    const examWeight = weightInfo.exam_weight;
    const difficultyTier = weightInfo.difficulty_tier || (isGMAT ? GMAT_DEFAULT_DIFFICULTY_TIER[domain] : DEFAULT_DIFFICULTY_TIER[domain]) || "application";
    const cTierCap = weightInfo.c_tier_cap ?? cTierCaps[difficultyTier] ?? DEFAULT_C_TIER[difficultyTier];

    // Component 1: Knowledge Gap (0-1)
    const knowledgeGap = computeKnowledgeGap(masteryScore);

    // Component 2: Forgetting Risk (0-1)
    const forgettingRisk = computeForgettingRisk(lastSeenAt, input.timeMode, input.daysRemaining);

    // Component 3: Estimated minutes to mastery
    // Base estimate from difficulty tier, adjusted by mastery gap
    const baseMinutes = {
      foundation: 10,
      application: 20,
      advanced: 40,
      expert: 60,
    }[difficultyTier];
    
    // More gap = more time needed
    const estimatedMinutes = Math.round(baseMinutes * (1 + knowledgeGap));

    // Denominator: min(estimated_minutes, C_tier)
    // This is the key cap that prevents cheap topics from always winning
    const denominator = Math.min(estimatedMinutes, cTierCap);

    // Priority Score = (Exam Weight × Knowledge Gap × Forgetting Risk) / min(Estimated Minutes, C_tier)
    const priorityScore = (examWeight * knowledgeGap * forgettingRisk) / denominator;

    results.push({
      skillDomain: domain,
      priorityScore,
      components: {
        examWeight,
        knowledgeGap,
        forgettingRisk,
        estimatedMinutes,
        cTierCap,
        denominator,
      },
      difficultyTier,
      subject: (isGMAT ? GMAT_DOMAIN_TO_SUBJECT[domain] : DOMAIN_TO_SUBJECT[domain]) || "General",
    });
  }

  // Sort by priority score descending
  results.sort((a, b) => b.priorityScore - a.priorityScore);

  return results;
}

/**
 * Get top N domains for a practice session
 */
export async function selectTopDomains(
  input: PriorityInput,
  count: number
): Promise<string[]> {
  const priorities = await computePriorityScores(input);
  return priorities.slice(0, count).map((p) => p.skillDomain);
}

/**
 * Recompute and store C_tier caps from completion_time_logs
 * Call this periodically (e.g., quarterly via cron)
 */
export async function recomputeCTierCaps(examName: string): Promise<void> {
  const caps = await getEmpiricalCTierCaps(examName);

  // Update exam_topic_weights with new caps
  for (const [tier, cap] of Object.entries(caps)) {
    await supabaseAdmin
      .from("exam_topic_weights")
      .update({ c_tier_cap: cap })
      .eq("exam_name", examName)
      .eq("difficulty_tier", tier);
  }
}