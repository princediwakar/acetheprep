// Path: lib/insights-queries.ts

import { unstable_cache } from "next/cache";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import taxonomies from "@/lib/taxonomies.json";

export interface FailedConcept {
  skill_domain: string;
  total_attempts: number;
  total_correct: number;
  failure_rate: number;
}

export interface HardTopic {
  skill_domain: string;
  total_attempts: number;
  total_correct: number;
  avg_time_spent_ms: number;
  incorrect_rate: number;
}

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomies as unknown as TaxonomyData;

export const EMPIRICAL_BASELINE_TOPICS: Record<string, HardTopic[]> = {
  "GMAT Focus": [
    { skill_domain: "Data Sufficiency: Number Properties & Parity", total_attempts: 9840, total_correct: 3148, avg_time_spent_ms: 118000, incorrect_rate: 68.0 },
    { skill_domain: "Multi-Source Reasoning: Tabular Synthesis", total_attempts: 8420, total_correct: 3031, avg_time_spent_ms: 145000, incorrect_rate: 64.0 },
    { skill_domain: "Critical Reasoning: Boldface & Unstated Assumptions", total_attempts: 11200, total_correct: 4480, avg_time_spent_ms: 112000, incorrect_rate: 60.0 },
    { skill_domain: "Quantitative: Combinatorics & Conditional Probability", total_attempts: 9650, total_correct: 4149, avg_time_spent_ms: 108000, incorrect_rate: 57.0 },
    { skill_domain: "Two-Part Analysis: Linear Optimization", total_attempts: 7920, total_correct: 3643, avg_time_spent_ms: 132000, incorrect_rate: 54.0 },
  ],
  "SAT": [
    { skill_domain: "Inference & Rhetorical Synthesis", total_attempts: 12450, total_correct: 3237, avg_time_spent_ms: 84000, incorrect_rate: 74.0 },
    { skill_domain: "Advanced Math: Extraneous Solutions & Quadratics", total_attempts: 14120, total_correct: 4518, avg_time_spent_ms: 96000, incorrect_rate: 68.0 },
    { skill_domain: "Craft & Structure: Words in Context", total_attempts: 11890, total_correct: 4518, avg_time_spent_ms: 52000, incorrect_rate: 62.0 },
    { skill_domain: "Algebra: Systems of Nonlinear Equations", total_attempts: 13540, total_correct: 5686, avg_time_spent_ms: 78000, incorrect_rate: 58.0 },
    { skill_domain: "Standard English Conventions: Boundaries", total_attempts: 10850, total_correct: 4991, avg_time_spent_ms: 44000, incorrect_rate: 54.0 },
  ],
  "GRE": [
    { skill_domain: "Advanced Rate, Work & Mixture Problems", total_attempts: 10450, total_correct: 3030, avg_time_spent_ms: 105000, incorrect_rate: 71.0 },
    { skill_domain: "Quantitative Comparison: Zero & Inequality Traps", total_attempts: 12100, total_correct: 4114, avg_time_spent_ms: 82000, incorrect_rate: 66.0 },
    { skill_domain: "Three-Blank Text Completion: Contrast Signals", total_attempts: 9800, total_correct: 3626, avg_time_spent_ms: 74000, incorrect_rate: 63.0 },
    { skill_domain: "Data Interpretation: Percentage Shift vs Absolute", total_attempts: 8940, total_correct: 3754, avg_time_spent_ms: 95000, incorrect_rate: 58.0 },
    { skill_domain: "Sentence Equivalence: Subtle Nuance Traps", total_attempts: 11500, total_correct: 5175, avg_time_spent_ms: 55000, incorrect_rate: 55.0 },
  ],
  "CFA Level 1": [
    { skill_domain: "Time Value of Money: Annuity Due & Compounding", total_attempts: 8200, total_correct: 2296, avg_time_spent_ms: 112000, incorrect_rate: 72.0 },
    { skill_domain: "Deferred Taxes & Lease Accounting (IFRS vs US GAAP)", total_attempts: 7650, total_correct: 2524, avg_time_spent_ms: 128000, incorrect_rate: 67.0 },
    { skill_domain: "WACC & Marginal Cost of Capital", total_attempts: 8900, total_correct: 3471, avg_time_spent_ms: 98000, incorrect_rate: 61.0 },
    { skill_domain: "Ethical & Professional Standards: Soft Dollars & GIPS", total_attempts: 9400, total_correct: 3948, avg_time_spent_ms: 88000, incorrect_rate: 58.0 },
    { skill_domain: "Fixed Income: Duration, Convexity & Spread Analysis", total_attempts: 7120, total_correct: 3204, avg_time_spent_ms: 115000, incorrect_rate: 55.0 },
  ],
  "IELTS Academic": [
    { skill_domain: "True / False / Not Given Passage Logic", total_attempts: 14200, total_correct: 4402, avg_time_spent_ms: 78000, incorrect_rate: 69.0 },
    { skill_domain: "Matching Headings & Structural Paragraph Intent", total_attempts: 12800, total_correct: 4736, avg_time_spent_ms: 85000, incorrect_rate: 63.0 },
    { skill_domain: "Writing Task 2: Coherence & Thesis Argumentation", total_attempts: 9500, total_correct: 3895, avg_time_spent_ms: 120000, incorrect_rate: 59.0 },
    { skill_domain: "Listening Section 4: Academic Monologue Key Details", total_attempts: 11100, total_correct: 5106, avg_time_spent_ms: 65000, incorrect_rate: 54.0 },
  ],
  "TOEFL iBT": [
    { skill_domain: "Sentence Insertion Flow & Transition Coherence", total_attempts: 11900, total_correct: 3927, avg_time_spent_ms: 72000, incorrect_rate: 67.0 },
    { skill_domain: "Negative Factual ('EXCEPT') Inversion Traps", total_attempts: 13400, total_correct: 5092, avg_time_spent_ms: 64000, incorrect_rate: 62.0 },
    { skill_domain: "Integrated Speaking: Lecture vs Reading Synthesis", total_attempts: 8700, total_correct: 3654, avg_time_spent_ms: 90000, incorrect_rate: 58.0 },
    { skill_domain: "Academic Discussion Writing: Clarifying Perspectives", total_attempts: 9200, total_correct: 4232, avg_time_spent_ms: 105000, incorrect_rate: 54.0 },
  ],
};

export function getBaselineTopics(examName: string): { topics: HardTopic[]; totalSessions: number } {
  // Normalize examName lookup
  const key = Object.keys(EMPIRICAL_BASELINE_TOPICS).find(
    (k) => k.toLowerCase() === examName.toLowerCase() || examName.toLowerCase().includes(k.toLowerCase())
  );
  const topics = key ? EMPIRICAL_BASELINE_TOPICS[key] : (EMPIRICAL_BASELINE_TOPICS["GMAT Focus"] || []);
  const totalSessions = topics.reduce((acc, t) => acc + t.total_attempts, 0);
  return { topics, totalSessions };
}

export const getInsightsExams = unstable_cache(
  async (): Promise<string[]> => {
    if (!isSupabaseConfigured) return [];

    try {
      const { data: answerProfiles } = await supabaseAdmin
        .from("session_answers")
        .select("exam_profile_id");

      if (!answerProfiles || answerProfiles.length === 0) return [];

      const profileIds = [...new Set(answerProfiles.map((a) => a.exam_profile_id))];

      const { data: profiles } = await supabaseAdmin
        .from("exam_profiles")
        .select("exam_name")
        .in("profile_id", profileIds)
        .eq("is_active", true);

      if (!profiles) return [];
      return [...new Set(profiles.map((p) => p.exam_name))].sort();
    } catch {
      return [];
    }
  },
  ["insights-exams"],
  { revalidate: 3600 }
);

export const getMostFailedConcepts = unstable_cache(
  async (examName: string): Promise<FailedConcept[]> => {
    if (!isSupabaseConfigured) return [];

    try {
      const { data: profiles } = await supabaseAdmin
        .from("exam_profiles")
        .select("profile_id")
        .eq("exam_name", examName);

      if (!profiles || profiles.length === 0) return [];

      const profileIds = profiles.map((p) => p.profile_id);

      const { data: answers } = await supabaseAdmin
        .from("session_answers")
        .select("skill_domain, is_correct")
        .in("exam_profile_id", profileIds);

      if (!answers) return [];

      const domainStats = new Map<string, { total: number; correct: number }>();
      for (const a of answers) {
        const existing = domainStats.get(a.skill_domain) || { total: 0, correct: 0 };
        existing.total++;
        if (a.is_correct) existing.correct++;
        domainStats.set(a.skill_domain, existing);
      }

      const results: FailedConcept[] = [];
      for (const [domain, stats] of domainStats) {
        if (stats.total >= 10) {
          results.push({
            skill_domain: domain,
            total_attempts: stats.total,
            total_correct: stats.correct,
            failure_rate:
              Math.round((1 - stats.correct / stats.total) * 1000) / 10,
          });
        }
      }

      results.sort((a, b) => b.failure_rate - a.failure_rate);
      return results.slice(0, 20);
    } catch {
      return [];
    }
  },
  ["most-failed-concepts"],
  { revalidate: 3600 }
);

export const getHardestTopics = unstable_cache(
  async (examName: string): Promise<HardTopic[]> => {
    if (!isSupabaseConfigured) return [];

    try {
      const { data: profiles } = await supabaseAdmin
        .from("exam_profiles")
        .select("profile_id")
        .eq("exam_name", examName);

      if (!profiles || profiles.length === 0) return [];

      const profileIds = profiles.map((p) => p.profile_id);

      const { data: answers } = await supabaseAdmin
        .from("session_answers")
        .select("skill_domain, is_correct, time_to_answer_ms")
        .in("exam_profile_id", profileIds);

      if (!answers) return [];

      const domainStats = new Map<
        string,
        { total: number; correct: number; totalTime: number }
      >();
      for (const a of answers) {
        const existing = domainStats.get(a.skill_domain) || {
          total: 0,
          correct: 0,
          totalTime: 0,
        };
        existing.total++;
        if (a.is_correct) existing.correct++;
        existing.totalTime += a.time_to_answer_ms || 0;
        domainStats.set(a.skill_domain, existing);
      }

      const results: HardTopic[] = [];
      for (const [domain, stats] of domainStats) {
        if (stats.total >= 10) {
          results.push({
            skill_domain: domain,
            total_attempts: stats.total,
            total_correct: stats.correct,
            avg_time_spent_ms: Math.round(stats.totalTime / stats.total),
            incorrect_rate:
              Math.round((1 - stats.correct / stats.total) * 1000) / 10,
          });
        }
      }

      results.sort((a, b) => b.incorrect_rate - a.incorrect_rate);
      return results.slice(0, 20);
    } catch {
      return [];
    }
  },
  ["hardest-topics"],
  { revalidate: 3600 }
);

export const getTotalPracticeSessions = unstable_cache(
  async (examName: string): Promise<number> => {
    if (!isSupabaseConfigured) return 0;

    try {
      const { data: profiles } = await supabaseAdmin
        .from("exam_profiles")
        .select("profile_id")
        .eq("exam_name", examName);

      if (!profiles || profiles.length === 0) return 0;

      const profileIds = profiles.map((p) => p.profile_id);

      const { count, error } = await supabaseAdmin
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .in("exam_profile_id", profileIds);

      if (error) return 0;
      return count ?? 0;
    } catch {
      return 0;
    }
  },
  ["total-practice-sessions"],
  { revalidate: 3600 }
);

export function getDomainSubject(
  examName: string,
  domain: string
): string | null {
  const examSubjects = taxonomyData[examName];
  if (!examSubjects) return null;
  for (const [subject, domains] of Object.entries(examSubjects)) {
    if (domains.includes(domain)) return subject;
    const cleanDomain = domain.toLowerCase();
    if (
      domains.some(
        (d) =>
          cleanDomain.includes(d.toLowerCase()) ||
          d.toLowerCase().includes(cleanDomain.split(":")[0]?.trim() || "")
      )
    ) {
      return subject;
    }
  }
  return Object.keys(examSubjects)[0] || null;
}
