// Path: components/tutor/DashboardView.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { DashboardPageData, SyllabusDomain } from "@/app/home/page";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { HeaderPortal } from "@/components/shared/HeaderPortal";
import { toast } from "sonner";
import { Zap } from "lucide-react";
import { DashboardViewLoading, DashboardViewError } from "@/components/tutor/dashboard/DashboardLoading";
import { SmartStartStrip } from "@/components/tutor/dashboard/SmartStartStrip";
import { ActiveSessionsBanner } from "@/components/tutor/dashboard/ActiveSessionsBanner";
import { SyllabusMap } from "@/components/tutor/dashboard/SyllabusMap";
import { LaunchSessionDialog, type SessionConfig } from "@/components/tutor/dashboard/LaunchSessionDialog";
import { ProjectionHero } from "@/components/tutor/ProjectionHero";

export { DashboardViewLoading, DashboardViewError };

export function DashboardView({ data }: { data: DashboardPageData }) {
  const router = useRouter();

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

  const [isLinearMode, setIsLinearMode] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedLinear = localStorage.getItem("acetheprep_linear_mode") ?? localStorage.getItem("gibbi_linear_mode");
    if (savedLinear) {
      setIsLinearMode(savedLinear === "true");
    }
  }, []);

  const handleToggleLinear = useCallback((checked: boolean) => {
    setIsLinearMode(checked);
    localStorage.setItem("acetheprep_linear_mode", String(checked));
  }, []);

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
      {/* Header Slot: Status Strip Collapsed into Top Header */}
      <HeaderPortal>
        <div className="flex items-center gap-2">
          {!data.isPro && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setUpgradeReason("Upgrade to AceThePrep Pro for unlimited daily sessions, full 50Q mock tests, and detailed step-by-step solutions.");
                setShowUpgradeModal(true);
              }}
              className="h-8 px-2.5 text-xs font-bold border-primary/30 text-primary hover:bg-primary/10 gap-1 rounded-lg shadow-2xs cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-primary" />
              <span className="hidden sm:inline">Upgrade to Pro</span>
              <span className="sm:hidden">Pro</span>
            </Button>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/80 shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Readiness
            </span>
            <span className="font-extrabold text-foreground tabular-nums text-xs sm:text-sm">
              {data.readinessIndex}
              <span className="text-muted-foreground text-[10px] font-normal">/100</span>
            </span>
          </div>
        </div>
      </HeaderPortal>

      {/* Active In-Progress Sessions Banner */}
      {data.activeSessions && data.activeSessions.length > 0 && (
        <ActiveSessionsBanner initialSessions={data.activeSessions} />
      )}

      {/* Score Prediction Hero */}
      {data.prediction && (
        <ProjectionHero prediction={data.prediction} examName={data.examName} />
      )}

      {/* Section 2: Smart Start Strip */}
      <SmartStartStrip
        nextLinearDomain={nextLinearDomain}
        topWeakSpots={data.topWeakSpots}
        examName={data.examName}
        onAlgorithmicReview={handleAlgorithmicReview}
        onLinearNext={handleLinearNext}
      />

      {/* Section 3: Syllabus Grid */}
      <SyllabusMap
        syllabus={data.syllabus}
        isLinearMode={isLinearMode}
        onToggleLinear={handleToggleLinear}
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
