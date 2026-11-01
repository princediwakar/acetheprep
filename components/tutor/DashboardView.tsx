// Path: components/tutor/DashboardView.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DashboardPageData, SyllabusDomain } from "@/app/home/page";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { toast } from "sonner";
import { DashboardViewLoading, DashboardViewError } from "@/components/tutor/dashboard/DashboardLoading";
import { SmartStartStrip } from "@/components/tutor/dashboard/SmartStartStrip";
import { ActiveSessionsBanner } from "@/components/tutor/dashboard/ActiveSessionsBanner";
import { SyllabusMap } from "@/components/tutor/dashboard/SyllabusMap";
import { LaunchSessionDialog, type SessionConfig } from "@/components/tutor/dashboard/LaunchSessionDialog";
import { ProjectionHero } from "@/components/tutor/ProjectionHero";
import { useSyncSidebarData } from "@/components/shared/SidebarContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export { DashboardViewLoading, DashboardViewError };

export function DashboardView({ data }: { data: DashboardPageData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autostartTriggeredRef = useRef(false);

  const isNewStudent = (data.quickStats?.sessionsCompleted ?? 0) === 0;

  useSyncSidebarData({
    examName: data.examName,
    daysRemaining: data.daysRemaining,
    streak: data.quickStats.streak,
    dueMistakesCount: data.dueMistakesCount,
    isPro: data.isPro,
  });

  const [activeConfig, setActiveConfig] = useState<SessionConfig | null>(null);
  const [modalMode, setModalMode] = useState<"exam" | "tutor">("exam");
  const [modalQuestionCount, setModalQuestionCount] = useState<number>(10);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);

  useEffect(() => {
    if (!isLaunching) {
      setLaunchStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLaunchStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 5500);
    return () => clearInterval(interval);
  }, [isLaunching]);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<string | undefined>(undefined);

  async function startSession(intent: string, focusDomains?: string[], count: number = modalQuestionCount) {
    const body: Record<string, unknown> = {
      exam_profile_id: data.profileId,
      session_intent: intent,
      question_count: count,
    };
    if (focusDomains && focusDomains.length > 0) {
      body.focus_domains = focusDomains;
    }

    const res = await fetch(`${TUTOR_ROUTES.API_SESSION_START}?stream=false`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({ error: "Failed to start session" }));
      throw new Error(errBody.error || "Failed to start session");
    }

    const json = await res.json();
    return json.session_id as string;
  }

  // Direct 1-click test launcher (bypasses modal for 0ms activation)
  const handleDirectLaunch = useCallback(
    async (intent: string = "diagnostic", domain?: string) => {
      if (isLaunching) return;
      setIsLaunching(true);
      try {
        const sessionId = await startSession(intent, domain ? [domain] : undefined, 5);
        router.push(`${TUTOR_ROUTES.SESSION(sessionId)}?mode=exam&autostart=true`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to start test";
        toast.error(msg);
        setIsLaunching(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLaunching, data.profileId, router]
  );

  // Auto-launch first test if arriving with autostart flag
  useEffect(() => {
    const autostart = searchParams?.get("autostart");
    if (
      (autostart === "first_test" || autostart === "diagnostic") &&
      !autostartTriggeredRef.current &&
      isNewStudent
    ) {
      autostartTriggeredRef.current = true;
      handleDirectLaunch("diagnostic");
    }
  }, [searchParams, isNewStudent, handleDirectLaunch]);

  function handleAlgorithmicReview() {
    const focusDomains = (data.topWeakSpots || []).map((w) => w.domain);
    setActiveConfig({
      title: "Today's Weak-Spot Fix",
      subtitle:
        focusDomains.length > 0
          ? `10 timed questions targeted at repairing ${focusDomains.join(" and ")}`
          : "Adaptive 10-question set calibrated to locate your score leaks and boost readiness",
      intent: "spaced_review",
      focusDomains: focusDomains.length > 0 ? focusDomains : undefined,
    });
    setModalQuestionCount(10);
    setModalMode("exam");
  }

  function handleDomainPractice(domain: string, subjectName?: string) {
    if (isNewStudent) {
      handleDirectLaunch("custom_mock", domain);
      return;
    }
    setActiveConfig({
      title: domain,
      subtitle: subjectName ? `Targeted practice in ${subjectName}` : `Targeted topic practice`,
      intent: "custom_mock",
      domain,
      subjectName,
    });
    setModalQuestionCount(10);
    setModalMode("exam");
  }

  // Find next topic in linear sequence
  let nextLinearDomain: SyllabusDomain | null = null;
  for (const subject of data.syllabus) {
    for (const domain of subject.domains) {
      if (domain.masteryScore < 0.7) {
        nextLinearDomain = domain;
        break;
      }
    }
    if (nextLinearDomain) break;
  }

  function handleLinearNext() {
    if (!nextLinearDomain) {
      toast.success("You have mastered all topics!");
      return;
    }
    setActiveConfig({
      title: nextLinearDomain.name,
      subtitle: "Next up in curriculum sequence",
      intent: "custom_mock",
      domain: nextLinearDomain.name,
    });
    setModalQuestionCount(10);
    setModalMode("exam");
  }

  async function handleConfirmLaunch() {
    if (!activeConfig) return;
    setIsLaunching(true);
    try {
      const focusDomainsToPass =
        activeConfig.focusDomains ?? (activeConfig.domain ? [activeConfig.domain] : undefined);
      const sessionId = await startSession(
        activeConfig.intent,
        focusDomainsToPass,
        modalQuestionCount,
      );
      router.push(`${TUTOR_ROUTES.SESSION(sessionId)}?mode=${modalMode}&autostart=true`);
    } catch (err: any) {
      toast.error(err.message || "Failed to start session");
      setIsLaunching(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-4 sm:py-6">
      {/* Active In-Progress Sessions Banner */}
      {data.activeSessions && data.activeSessions.length > 0 && (
        <ActiveSessionsBanner initialSessions={data.activeSessions} />
      )}

      {/* Brand New Student: Dominant Single-Action Activation Hero */}
      {isNewStudent ? (
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-card to-background p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 &bull; 5-Minute Baseline Test</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
              Take your first test
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              5 quick questions to locate your score leaks, unlock your starting score prediction, and calibrate your daily error log.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              size="lg"
              onClick={() => handleDirectLaunch("diagnostic")}
              disabled={isLaunching}
              className="h-14 px-10 text-base sm:text-lg font-bold shadow-lg shadow-primary/25 rounded-2xl cursor-pointer"
            >
              {isLaunching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Preparing Question #1...
                </>
              ) : (
                <>
                  Start Test Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>5 quick questions</span>
            </span>
            <span>&bull;</span>
            <span>Step-by-step trap explanations</span>
            <span>&bull;</span>
            <span>100% Free</span>
          </div>
        </div>
      ) : (
        <>
          {/* Score Prediction Hero */}
          {data.prediction && (
            <ProjectionHero
              prediction={data.prediction}
              examName={data.examName}
              readinessIndex={data.readinessIndex}
              streak={data.quickStats?.streak}
              daysRemaining={data.daysRemaining}
            />
          )}

          {/* Section 2: Smart Start Strip */}
          <SmartStartStrip
            nextLinearDomain={nextLinearDomain}
            topWeakSpots={data.topWeakSpots}
            examName={data.examName}
            onAlgorithmicReview={handleAlgorithmicReview}
            onLinearNext={handleLinearNext}
          />
        </>
      )}

      {/* Section 3: Syllabus Grid */}
      <SyllabusMap
        syllabus={data.syllabus}
        onDomainPractice={handleDomainPractice}
      />

      {/* Quiz / Test Overview Dialog */}
      <LaunchSessionDialog
        activeConfig={activeConfig}
        examName={data.examName}
        isPro={Boolean(data.isPro)}
        isLaunching={isLaunching}
        launchStep={launchStep}
        modalMode={modalMode}
        modalQuestionCount={modalQuestionCount}
        onSetModalMode={setModalMode}
        onSetModalQuestionCount={setModalQuestionCount}
        onClose={() => setActiveConfig(null)}
        onConfirmLaunch={handleConfirmLaunch}
        onPromptUpgrade={(reason) => {
          setUpgradeReason(reason);
          setShowUpgradeModal(true);
        }}
      />

      {/* Dodo Payments Pro Upgrade Modal */}
      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        reason={upgradeReason}
        examName={data.examName}
      />
    </div>
  );
}

export default DashboardView;
