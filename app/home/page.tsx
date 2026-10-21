// Path: app/home/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { calculateWeightedReadinessIndex, getTimeMode } from "@/lib/sm2";
import { computeStreak } from "@/lib/utils";
import { DashboardView, DashboardViewLoading } from "@/components/tutor/DashboardView";
import type { ExamProfile, TimeMode, SessionRow } from "@/types/tutor";
import type { ProjectionHeroProps } from "@/components/tutor/ProjectionHero";
import { marksToPercentile, getColdStartBand, computeCompositePercentile } from "@/lib/predictor/nta-priors";
import { computeGMATPrediction } from "@/lib/predictor/gmat-score-engine";
import { getUserSubscriptionStatus, syncCheckoutSession } from "@/lib/billing";
import taxonomy from "@/lib/taxonomies.json";

export const metadata: Metadata = {
  title: "Home",
  robots: {
    index: false,
    follow: false,
  },
};

interface ConceptRow {
  id: string;
  skill_domain: string;
  mastery_score: number;
  total_attempted: number;
  total_correct: number;
  next_review_at: string;
}

export interface SyllabusDomain {
  name: string;
  masteryScore: number;
  nextReviewAt: string | null;
  totalAttempted: number;
}

export interface SyllabusSubject {
  name: string;
  domains: SyllabusDomain[];
}

export interface DashboardPageData {
  readinessIndex: number;
  daysRemaining: number;
  timeMode: TimeMode;
  domainBreakdown: { domain: string; score: number; totalAttempted: number }[];
  syllabus: SyllabusSubject[];
  quickStats: {
    totalQuestions: number;
    streak: number;
    sessionsCompleted: number;
  };
  examName: string;
  profileId: string;
  activeTargets: string[];
  overdueDomainCount: number;
  weakestOverdueDomain: string | null;
  prediction: ProjectionHeroProps["prediction"];
  isPro?: boolean;
  activeSessions: SessionRow[];
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  return (
    <Suspense fallback={<DashboardViewLoading />}>
      <HomePageContent searchParams={resolvedParams} />
    </Suspense>
  );
}

async function HomePageContent({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  // --- Diagnostic Gatekeeper ---
  const { data: diagnosticSession } = await supabase
    .from("sessions")
    .select("id, status, session_intent")
    .eq("user_id", user.id)
    .eq("session_intent", "diagnostic")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { count: conceptCount } = await supabase
    .from("concept_mastery")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (diagnosticSession) {
    redirect(TUTOR_ROUTES.SESSION(diagnosticSession.id));
  }

  if ((conceptCount ?? 0) === 0) {
    redirect(TUTOR_ROUTES.SETUP);
  }

  // --- Fetch active profile first ---
  const profileRes = await supabase
    .from("exam_profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (profileRes.error || !profileRes.data) {
    redirect(TUTOR_ROUTES.SETUP);
  }

  const profile = profileRes.data as ExamProfile;

  // --- Fetch profile-specific dashboard data in parallel ---
  const [
    conceptsRes,
    questionResultsRes,
    completedSessionsRes,
    activeSessionsRes,
    overdueCountRes,
    predictionRes,
    subscriptionStatus,
  ] = await Promise.all([
    supabase
      .from("concept_mastery")
      .select("id, skill_domain, mastery_score, total_attempted, total_correct, next_review_at")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id),
    supabase
      .from("session_answers")
      .select("answered_at")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .order("answered_at", { ascending: false })
      .limit(500),
    supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .eq("status", "completed"),
    supabase
      .from("sessions")
      .select("id, status, created_at, completed_at, target_domains, session_intent, questions_json")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("concept_mastery")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .lt("next_review_at", new Date().toISOString()),
    supabase
      .from("predictions")
      .select("predicted_percentile, band_lower, band_upper, calibration_source, sessions_used, is_frozen")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .eq("is_frozen", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    searchParams?.upgrade === "success"
      ? syncCheckoutSession(user.id, {
          subscriptionId: typeof searchParams.subscription_id === "string" ? searchParams.subscription_id : undefined,
          paymentId: typeof searchParams.payment_id === "string" ? searchParams.payment_id : undefined,
        })
      : getUserSubscriptionStatus(user.id),
  ]);
  const concepts = (conceptsRes.data || []) as ConceptRow[];
  const questionResults = (questionResultsRes.data || []) as { answered_at: string }[];

  const activeSessionsRaw = (activeSessionsRes.data || []) as {
    id: string;
    status: string;
    created_at: string;
    completed_at: string | null;
    target_domains: string[] | null;
    session_intent?: string;
    questions_json?: unknown;
  }[];

  const activeSessionIds = activeSessionsRaw.map((s) => s.id);
  const activeSessionStatsMap: Record<string, { answered: number; correct: number }> = {};

  if (activeSessionIds.length > 0) {
    const { data: answersData } = await supabase
      .from("session_answers")
      .select("session_id, is_correct")
      .in("session_id", activeSessionIds);

    for (const a of answersData || []) {
      if (!activeSessionStatsMap[a.session_id]) {
        activeSessionStatsMap[a.session_id] = { answered: 0, correct: 0 };
      }
      activeSessionStatsMap[a.session_id].answered += 1;
      if (a.is_correct) {
        activeSessionStatsMap[a.session_id].correct += 1;
      }
    }
  }

  const activeSessions: SessionRow[] = activeSessionsRaw.map((s) => {
    const totalQ = Array.isArray(s.questions_json) ? s.questions_json.length : 0;
    const stats = activeSessionStatsMap[s.id] || { answered: 0, correct: 0 };
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

  const overdueDomainCount = overdueCountRes.count ?? 0;

  const examTaxonomy = taxonomy as unknown as Record<string, Record<string, string[]>>;
  const examSubjects = examTaxonomy[profile.exam_name];
  const allDomains: string[] = examSubjects
    ? [...new Set(Object.values(examSubjects).flat())]
    : [];

  const masteryMap: Record<string, number> = {};
  const domainAttempted: Record<string, number> = {};
  const domainNextReview: Record<string, string | null> = {};
  for (const c of concepts) {
    masteryMap[c.skill_domain] = c.mastery_score;
    domainAttempted[c.skill_domain] = c.total_attempted;
    domainNextReview[c.skill_domain] = c.next_review_at;
  }

  const now = new Date();
  const targetDate = new Date(profile.target_date);
  const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / 86400000));

  // For readiness calculation, unattempted domains should be treated as 0 instead of the 0.5 prior
  const readinessMasteryMap: Record<string, number> = {};
  for (const domain of allDomains) {
    const score = masteryMap[domain] ?? 0;
    const attempted = domainAttempted[domain] ?? 0;
    readinessMasteryMap[domain] = attempted === 0 ? 0 : score;
  }

  const readinessIndex = Math.round(
    allDomains.length > 0
      ? calculateWeightedReadinessIndex(readinessMasteryMap, allDomains)
      : 0
  );

  const timeMode: TimeMode = getTimeMode(daysRemaining);

  const domainBreakdown = allDomains.map((domain) => ({
    domain,
    score: masteryMap[domain] ?? 0,
    totalAttempted: domainAttempted[domain] ?? 0,
  }));

  const syllabus: SyllabusSubject[] = examSubjects
    ? Object.entries(examSubjects).map(([subjectName, domainNames]) => ({
        name: subjectName,
        domains: domainNames.map((domain) => ({
          name: domain,
          masteryScore: masteryMap[domain] ?? 0,
          nextReviewAt: domainNextReview[domain] ?? null,
          totalAttempted: domainAttempted[domain] ?? 0,
        })),
      }))
    : [];

  const overdueConcepts = concepts.filter(
    (c) => new Date(c.next_review_at) < now
  );
  const weakestOverdueDomain =
    overdueConcepts.length > 0
      ? [...overdueConcepts].sort((a, b) => a.mastery_score - b.mastery_score)[0].skill_domain
      : null;

  const streak = computeStreak(questionResults);
  const sessionsCompleted = completedSessionsRes.count ?? 0;

  const isGMAT = /gmat/i.test(profile.exam_name);

  let prediction: ProjectionHeroProps["prediction"] = null;

  if (isGMAT) {
    const quantDomains = examSubjects?.["Quantitative Reasoning"] ?? [];
    const verbalDomains = examSubjects?.["Verbal Reasoning"] ?? [];
    const diDomains = examSubjects?.["Data Insights"] ?? [];

    const getSectionMastery = (domains: string[]) => {
      let sum = 0;
      let count = 0;
      for (const d of domains) {
        if (domainAttempted[d] && domainAttempted[d] > 0) {
          sum += masteryMap[d] ?? 0;
          count++;
        }
      }
      return count > 0 ? sum / count : 0.4;
    };

    const gmatPred = computeGMATPrediction({
      quantMastery: getSectionMastery(quantDomains),
      verbalMastery: getSectionMastery(verbalDomains),
      diMastery: getSectionMastery(diDomains),
      totalTrackedSessions: sessionsCompleted,
      quantDomainsTracked: quantDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      verbalDomainsTracked: verbalDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      diDomainsTracked: diDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
    });

    prediction = {
      overallPercentile: gmatPred.overallPercentile,
      overallBandLower: gmatPred.scoreBandLower,
      overallBandUpper: gmatPred.scoreBandUpper,
      overallBandWidth: gmatPred.scoreBandWidth,
      calibrationSource: gmatPred.calibrationSource,
      disclaimer: gmatPred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: gmatPred.totalTrackedSessions,
      metricLabel: "Projected GMAT Focus Score (205–805)",
      displayValue: `${gmatPred.scoreBandLower}–${gmatPred.scoreBandUpper}`,
      secondaryLabel: `~${gmatPred.overallPercentile}th %ile`,
    };
  } else if (predictionRes.data) {
    const lower = predictionRes.data.band_lower;
    const upper = predictionRes.data.band_upper;
    const sessions = predictionRes.data.sessions_used ?? 0;
    prediction = {
      overallPercentile: predictionRes.data.predicted_percentile ?? 0,
      overallBandLower: lower,
      overallBandUpper: upper,
      overallBandWidth: Math.round((upper - lower) * 100) / 100,
      calibrationSource: predictionRes.data.calibration_source ?? "public_nta",
      disclaimer: sessions >= 20
        ? "Fully calibrated to your personal practice history."
        : sessions > 0
          ? `Prediction blends public NTA data with your ${sessions} tracked session${sessions > 1 ? "s" : ""}. Band sharpens with each session.`
          : "Based on public NTA normalization tables (2025–2026 cycles). Your band sharpens with every tracked session.",
      isFrozen: predictionRes.data.is_frozen ?? false,
      totalTrackedSessions: sessions,
    };
  } else {
    // Cold-start: generate band from public NTA priors (zero tracked sessions)
    const p = marksToPercentile("Physics", 50);
    const c = marksToPercentile("Chemistry", 50);
    const m = marksToPercentile("Mathematics", 50);
    const overall = computeCompositePercentile({ Physics: p, Chemistry: c, Mathematics: m });
    const band = getColdStartBand("Physics", overall);
    prediction = {
      overallPercentile: overall,
      overallBandLower: band.lower,
      overallBandUpper: band.upper,
      overallBandWidth: band.width,
      calibrationSource: "public_nta",
      disclaimer: "Based on public NTA normalization tables (2025–2026 cycles). Your band sharpens with every tracked session.",
      isFrozen: false,
      totalTrackedSessions: 0,
    };
  }

  const data: DashboardPageData = {
    readinessIndex,
    daysRemaining,
    timeMode,
    domainBreakdown,
    syllabus,
    quickStats: {
      totalQuestions: questionResults.length,
      streak,
      sessionsCompleted,
    },
    examName: profile.exam_name,
    profileId: profile.profile_id,
    activeTargets: profile.active_targets ?? [],
    overdueDomainCount,
    weakestOverdueDomain,
    prediction,
    isPro: subscriptionStatus.isPro,
    activeSessions,
  };

  return <DashboardView data={data} />;
}
