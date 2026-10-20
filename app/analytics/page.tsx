// Path: app/analytics/page.tsx
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateReadinessIndex } from "@/lib/sm2";
import { computeStreak } from "@/lib/utils";
import { AnalyticsView, AnalyticsViewLoading } from "@/components/tutor/AnalyticsView";
import type { TimeMode } from "@/types/tutor";
import taxonomy from "@/lib/taxonomies.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | AceThePrep",
  description: "Track your mastery, readiness, and progress over time",
};

interface ConceptRow {
  id: string;
  skill_domain: string;
  mastery_score: number;
  total_attempted: number;
  total_correct: number;
  next_review_at: string;
}

export interface SessionRow {
  id: string;
  status: string;
  created_at: string;
  completed_at: string | null;
  target_domains: string[];
  session_intent?: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  accuracy: number;
}

export interface AnalyticsPageData {
  readinessIndex: number;
  totalQuestions: number;
  sessionsCompleted: number;
  streak: number;
  domainBreakdown: { domain: string; score: number; totalAttempted: number }[];
  recentSessions: SessionRow[];
  examName: string;
}


export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsViewLoading />}>
      <AnalyticsPageContent />
    </Suspense>
  );
}

async function AnalyticsPageContent() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/");

  const profileRes = await supabase
    .from("exam_profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (profileRes.error || !profileRes.data) redirect("/setup");
  const profileId = profileRes.data.profile_id;

  const [
    conceptsRes,
    recentSessionsRes,
    questionResultsRes,
    completedSessionsRes,
  ] = await Promise.all([
    supabase
      .from("concept_mastery")
      .select("id, skill_domain, mastery_score, total_attempted, total_correct, next_review_at")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profileId),
    supabase
      .from("sessions")
      .select("id, status, created_at, completed_at, target_domains, session_intent, questions_json")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("session_answers")
      .select("answered_at")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profileId)
      .order("answered_at", { ascending: false })
      .limit(500),
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("exam_profile_id", profileId)
      .eq("status", "completed"),
  ]);

  const concepts = (conceptsRes.data || []) as ConceptRow[];
  const recentSessionsRaw = (recentSessionsRes.data || []) as {
    id: string;
    status: string;
    created_at: string;
    completed_at: string | null;
    target_domains: string[] | null;
    session_intent?: string;
    questions_json?: unknown;
  }[];

  const sessionIds = recentSessionsRaw.map((s) => s.id);
  const sessionStatsMap: Record<string, { answered: number; correct: number }> = {};

  if (sessionIds.length > 0) {
    const { data: answersData } = await supabase
      .from("session_answers")
      .select("session_id, is_correct")
      .in("session_id", sessionIds);

    for (const a of answersData || []) {
      if (!sessionStatsMap[a.session_id]) {
        sessionStatsMap[a.session_id] = { answered: 0, correct: 0 };
      }
      sessionStatsMap[a.session_id].answered += 1;
      if (a.is_correct) {
        sessionStatsMap[a.session_id].correct += 1;
      }
    }
  }

  const recentSessions: SessionRow[] = recentSessionsRaw.map((s) => {
    const totalQ = Array.isArray(s.questions_json) ? s.questions_json.length : 0;
    const stats = sessionStatsMap[s.id] || { answered: 0, correct: 0 };
    const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
    return {
      id: s.id,
      status: s.status,
      created_at: s.created_at,
      completed_at: s.completed_at,
      target_domains: s.target_domains || [],
      session_intent: s.session_intent,
      totalQuestions: totalQ,
      answeredCount: stats.answered,
      correctCount: stats.correct,
      accuracy,
    };
  });

  const questionResults = (questionResultsRes.data || []) as { answered_at: string }[];

  const examTaxonomy = taxonomy as unknown as Record<string, Record<string, string[]>>;
  const examSubjects = examTaxonomy[profileRes.data.exam_name];
  const allDomains: string[] = examSubjects
    ? [...new Set(Object.values(examSubjects).flat())]
    : [];

  const masteryMap: Record<string, number> = {};
  const domainAttempted: Record<string, number> = {};
  for (const c of concepts) {
    masteryMap[c.skill_domain] = c.mastery_score;
    domainAttempted[c.skill_domain] = c.total_attempted;
  }

  const readinessMasteryMap: Record<string, number> = {};
  for (const domain of allDomains) {
    const score = masteryMap[domain] ?? 0;
    const attempted = domainAttempted[domain] ?? 0;
    readinessMasteryMap[domain] = attempted === 0 ? 0 : score;
  }

  const readinessIndex = Math.round(
    allDomains.length > 0 ? calculateReadinessIndex(readinessMasteryMap, allDomains) : 0
  );

  const domainBreakdown = allDomains.map((domain) => ({
    domain,
    score: masteryMap[domain] ?? 0,
    totalAttempted: domainAttempted[domain] ?? 0,
  }));

  const streak = computeStreak(questionResults);

  const data: AnalyticsPageData = {
    readinessIndex,
    totalQuestions: questionResults.length,
    sessionsCompleted: completedSessionsRes.count ?? 0,
    streak,
    domainBreakdown,
    recentSessions,
    examName: profileRes.data.exam_name,
  };

  return <AnalyticsView data={data} />;
}
