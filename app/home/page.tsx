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
import { computeSATPrediction } from "@/lib/predictor/sat-score-engine";
import { computeCFAPrediction } from "@/lib/predictor/cfa-score-engine";
import { computeGMATPrediction } from "@/lib/predictor/gmat-score-engine";
import { computeGREPrediction } from "@/lib/predictor/gre-score-engine";
import { computeIELTSPrediction } from "@/lib/predictor/ielts-score-engine";
import { computeTOEFLPrediction } from "@/lib/predictor/toefl-score-engine";
import { getUserSubscriptionStatus, syncCheckoutSession } from "@/lib/billing";
import { getSubjectForDomain } from "@/lib/services/taxonomy";
import taxonomy from "@/lib/taxonomies.json";
import { getDueComebacks, type ComebackItem } from "@/lib/comeback-queue";

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

export interface WeakSpotItem {
  domain: string;
  subjectName?: string;
  masteryScore: number;
  reason: "recent_errors" | "low_accuracy" | "due_for_review" | "untested";
  badgeText: string;
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
  topWeakSpots: WeakSpotItem[];
  dueMistakesCount?: number;
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
    dueComebacksRes,
  ] = await Promise.all([
    supabase
      .from("concept_mastery")
      .select("id, skill_domain, mastery_score, total_attempted, total_correct, next_review_at")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id),
    supabase
      .from("session_answers")
      .select("answered_at, is_correct, skill_domain")
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
    getDueComebacks(supabase, user.id, profile.profile_id).catch(() => [] as ComebackItem[]),
  ]);

  const dueComebacks = Array.isArray(dueComebacksRes) ? dueComebacksRes : [];
  const concepts = (conceptsRes.data || []) as ConceptRow[];
  const questionResults = (questionResultsRes.data || []) as {
    answered_at: string;
    is_correct?: boolean;
    skill_domain?: string;
  }[];

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

  // --- Top Weak Spots for Transparent Daily Weak-Spot Fix ---
  const recentErrorsByDomain: Record<string, number> = {};
  for (const ans of questionResults.slice(0, 50)) {
    if (ans.is_correct === false && ans.skill_domain) {
      recentErrorsByDomain[ans.skill_domain] = (recentErrorsByDomain[ans.skill_domain] || 0) + 1;
    }
  }

  const domainWeaknessList = concepts.map((c) => {
    const errorCount = recentErrorsByDomain[c.skill_domain] || 0;
    const isOverdue = new Date(c.next_review_at) < now;
    const mastery = c.mastery_score;

    let priorityScore = 0;
    let reason: WeakSpotItem["reason"] = "untested";
    let badgeText = "Topic practice";

    if (errorCount > 0) {
      priorityScore += 100 + errorCount * 25 + (1 - mastery) * 50;
      reason = "recent_errors";
      badgeText = `${errorCount} recent mistake${errorCount > 1 ? "s" : ""} • ${Math.round(mastery * 100)}% accuracy`;
    } else if (isOverdue && c.total_attempted > 0) {
      priorityScore += 70 + (1 - mastery) * 30;
      reason = "due_for_review";
      badgeText = `Review due • ${Math.round(mastery * 100)}% accuracy`;
    } else if (mastery < 0.70 && c.total_attempted > 0) {
      priorityScore += 40 + (1 - mastery) * 20;
      reason = "low_accuracy";
      badgeText = `Low accuracy (${Math.round(mastery * 100)}%)`;
    } else if (c.total_attempted === 0) {
      priorityScore += 10;
      reason = "untested";
      badgeText = "Unpracticed";
    }

    return {
      domain: c.skill_domain,
      subjectName: getSubjectForDomain(profile.exam_name, c.skill_domain),
      masteryScore: c.mastery_score,
      reason,
      badgeText,
      priorityScore,
    };
  });

  domainWeaknessList.sort((a, b) => b.priorityScore - a.priorityScore);
  const topWeakSpots: WeakSpotItem[] = domainWeaknessList.slice(0, 2).map((item) => ({
    domain: item.domain,
    subjectName: item.subjectName,
    masteryScore: item.masteryScore,
    reason: item.reason,
    badgeText: item.badgeText,
  }));

  const streak = computeStreak(questionResults);
  const sessionsCompleted = completedSessionsRes.count ?? 0;

  const isGMAT = /gmat/i.test(profile.exam_name);
  const isGRE = /gre/i.test(profile.exam_name);
  const isIELTS = /ielts/i.test(profile.exam_name);
  const isTOEFL = /toefl/i.test(profile.exam_name);
  const isSAT = /sat/i.test(profile.exam_name);
  const isCFA = /cfa/i.test(profile.exam_name);

  const formatPercentileLabel = (percentile: number) => {
    const mod100 = percentile % 100;
    let suffix = "th";
    if (mod100 < 11 || mod100 > 13) {
      const lastDigit = percentile % 10;
      if (lastDigit === 1) suffix = "st";
      else if (lastDigit === 2) suffix = "nd";
      else if (lastDigit === 3) suffix = "rd";
    }
    return `~${percentile}${suffix} %ile`;
  };

  let prediction: ProjectionHeroProps["prediction"] = null;

  const getSectionMastery = (domains: string[], defaultMastery = 0.5) => {
    let sum = 0;
    let count = 0;
    for (const d of domains) {
      if (domainAttempted[d] && domainAttempted[d] > 0) {
        sum += masteryMap[d] ?? 0;
        count++;
      }
    }
    return count > 0 ? sum / count : defaultMastery;
  };

  if (isIELTS) {
    const readingDomains = examSubjects?.["Reading"] ?? [];
    const listeningDomains = examSubjects?.["Listening"] ?? [];
    const writingDomains = examSubjects?.["Writing"] ?? [];
    const speakingDomains = examSubjects?.["Speaking"] ?? [];

    const ieltsPred = computeIELTSPrediction({
      readingMastery: getSectionMastery(readingDomains, 0.55),
      listeningMastery: getSectionMastery(listeningDomains, 0.55),
      writingMastery: getSectionMastery(writingDomains, 0.55),
      speakingMastery: getSectionMastery(speakingDomains, 0.55),
      totalTrackedSessions: sessionsCompleted,
      readingDomainsTracked: readingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      listeningDomainsTracked: listeningDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      writingDomainsTracked: writingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      speakingDomainsTracked: speakingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
    });

    prediction = {
      overallPercentile: ieltsPred.overallPercentile,
      overallBandLower: ieltsPred.bandLower,
      overallBandUpper: ieltsPred.bandUpper,
      overallBandWidth: ieltsPred.bandWidth,
      calibrationSource: ieltsPred.calibrationSource,
      disclaimer: ieltsPred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: ieltsPred.totalTrackedSessions,
      metricLabel: "Projected IELTS Band (1.0–9.0)",
      displayValue: `${ieltsPred.overallBand.toFixed(1)} (${ieltsPred.bandLower.toFixed(1)}–${ieltsPred.bandUpper.toFixed(1)})`,
      secondaryLabel: formatPercentileLabel(ieltsPred.overallPercentile),
    };
  } else if (isTOEFL) {
    const readingDomains = examSubjects?.["Reading"] ?? [];
    const listeningDomains = examSubjects?.["Listening"] ?? [];
    const speakingDomains = examSubjects?.["Speaking"] ?? [];
    const writingDomains = examSubjects?.["Writing"] ?? [];

    const toeflPred = computeTOEFLPrediction({
      readingMastery: getSectionMastery(readingDomains, 0.60),
      listeningMastery: getSectionMastery(listeningDomains, 0.60),
      speakingMastery: getSectionMastery(speakingDomains, 0.60),
      writingMastery: getSectionMastery(writingDomains, 0.60),
      totalTrackedSessions: sessionsCompleted,
      readingDomainsTracked: readingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      listeningDomainsTracked: listeningDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      speakingDomainsTracked: speakingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      writingDomainsTracked: writingDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
    });

    prediction = {
      overallPercentile: toeflPred.overallPercentile,
      overallBandLower: toeflPred.scoreBandLower,
      overallBandUpper: toeflPred.scoreBandUpper,
      overallBandWidth: toeflPred.scoreBandWidth,
      calibrationSource: toeflPred.calibrationSource,
      disclaimer: toeflPred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: toeflPred.totalTrackedSessions,
      metricLabel: "Projected TOEFL iBT Score (0–120)",
      displayValue: `${toeflPred.compositeScore} (${toeflPred.scoreBandLower}–${toeflPred.scoreBandUpper})`,
      secondaryLabel: formatPercentileLabel(toeflPred.overallPercentile),
    };
  } else if (isGRE) {
    const quantDomains = examSubjects?.["Quantitative Reasoning"] ?? [];
    const verbalDomains = examSubjects?.["Verbal Reasoning"] ?? [];
    const writingDomains = examSubjects?.["Analytical Writing"] ?? [];

    const grePred = computeGREPrediction({
      quantMastery: getSectionMastery(quantDomains, 0.45),
      verbalMastery: getSectionMastery(verbalDomains, 0.45),
      writingMastery: getSectionMastery(writingDomains, 0.50),
      totalTrackedSessions: sessionsCompleted,
      quantDomainsTracked: quantDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      verbalDomainsTracked: verbalDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
    });

    prediction = {
      overallPercentile: grePred.overallPercentile,
      overallBandLower: grePred.scoreBandLower,
      overallBandUpper: grePred.scoreBandUpper,
      overallBandWidth: grePred.scoreBandWidth,
      calibrationSource: grePred.calibrationSource,
      disclaimer: grePred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: grePred.totalTrackedSessions,
      metricLabel: "Projected GRE General Score (260–340)",
      displayValue: `${grePred.scoreBandLower}–${grePred.scoreBandUpper}`,
      secondaryLabel: formatPercentileLabel(grePred.overallPercentile),
    };
  } else if (isGMAT) {
    const quantDomains = examSubjects?.["Quantitative Reasoning"] ?? [];
    const verbalDomains = examSubjects?.["Verbal Reasoning"] ?? [];
    const diDomains = examSubjects?.["Data Insights"] ?? [];

    const gmatPred = computeGMATPrediction({
      quantMastery: getSectionMastery(quantDomains, 0.40),
      verbalMastery: getSectionMastery(verbalDomains, 0.40),
      diMastery: getSectionMastery(diDomains, 0.40),
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
      secondaryLabel: formatPercentileLabel(gmatPred.overallPercentile),
    };
  } else if (isSAT) {
    const rwDomains = examSubjects?.["Reading and Writing"] ?? [];
    const mathDomains = examSubjects?.["Mathematics"] ?? [];

    const satPred = computeSATPrediction({
      rwMastery: getSectionMastery(rwDomains, 0.50),
      mathMastery: getSectionMastery(mathDomains, 0.50),
      totalTrackedSessions: sessionsCompleted,
      rwDomainsTracked: rwDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
      mathDomainsTracked: mathDomains.filter((d) => (domainAttempted[d] ?? 0) > 0).length,
    });

    prediction = {
      overallPercentile: satPred.overallPercentile,
      overallBandLower: satPred.scoreBandLower,
      overallBandUpper: satPred.scoreBandUpper,
      overallBandWidth: satPred.scoreBandWidth,
      calibrationSource: satPred.calibrationSource,
      disclaimer: satPred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: satPred.totalTrackedSessions,
      metricLabel: "Projected Digital SAT Score (400–1600)",
      displayValue: `${satPred.scoreBandLower}–${satPred.scoreBandUpper}`,
      secondaryLabel: formatPercentileLabel(satPred.overallPercentile),
    };
  } else if (isCFA) {
    const allDomains = Object.values(examSubjects ?? {}).flat();
    const ethicsDomains = examSubjects?.["Ethical & Professional Standards"] ?? [];

    const cfaPred = computeCFAPrediction({
      overallMastery: getSectionMastery(allDomains, 0.50),
      ethicsMastery: getSectionMastery(ethicsDomains, 0.50),
      totalTrackedSessions: sessionsCompleted,
    });

    prediction = {
      overallPercentile: cfaPred.overallPercentile,
      overallBandLower: cfaPred.bandLower,
      overallBandUpper: cfaPred.bandUpper,
      overallBandWidth: cfaPred.bandWidth,
      calibrationSource: cfaPred.calibrationSource,
      disclaimer: cfaPred.disclaimer,
      isFrozen: false,
      totalTrackedSessions: cfaPred.totalTrackedSessions,
      metricLabel: "CFA Level 1 Exam Readiness",
      displayValue: `${cfaPred.readinessPercentage}% (${cfaPred.statusLabel})`,
      secondaryLabel: `${cfaPred.mpsConfidence}% MPS Confidence`,
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
      calibrationSource: predictionRes.data.calibration_source ?? "standardized_prior",
      disclaimer: sessions >= 20
        ? "Fully calibrated to your personal practice history."
        : sessions > 0
          ? `Prediction blends standardized baseline with your ${sessions} tracked session${sessions > 1 ? "s" : ""}. Band sharpens with each session.`
          : "Based on standardized psychometric baseline models. Your band sharpens with every tracked session.",
      isFrozen: predictionRes.data.is_frozen ?? false,
      totalTrackedSessions: sessions,
    };
  } else {
    // Psychometric baseline fallback
    prediction = {
      overallPercentile: 50,
      overallBandLower: 40,
      overallBandUpper: 60,
      overallBandWidth: 20,
      calibrationSource: "standardized_prior",
      disclaimer: "Based on standardized psychometric baseline models. Your band sharpens with every tracked session.",
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
    topWeakSpots,
    dueMistakesCount: dueComebacks.length,
  };

  return <DashboardView data={data} />;
}
