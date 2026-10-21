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
  const domains = getDomainsForExam(examName);
  return domains.map((domain) => ({
    id: crypto.randomUUID(),
    exam_name: examName,
    subject: (isGMAT ? GMAT_DOMAIN_TO_SUBJECT[domain] : DOMAIN_TO_SUBJECT[domain]) || "General",
    topic: domain,
    skill_domain: domain,
    difficulty_tier: (isGMAT ? GMAT_DEFAULT_DIFFICULTY_TIER[domain] : DEFAULT_DIFFICULTY_TIER[domain]) || "application",
    exam_weight: (isGMAT ? GMAT_EXAM_WEIGHTS[domain] : JEE_EXAM_WEIGHTS[domain]) || 0.08,
    question_frequency_10yr: 0,
    c_tier_cap: null,
    estimated_minutes_to_mastery: null,
  }));
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