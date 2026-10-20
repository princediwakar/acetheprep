// Path: components/tutor/DashboardView.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { DashboardPageData, SyllabusSubject, SyllabusDomain } from "@/app/dashboard/page";
import { TUTOR_ROUTES, TUTOR_CONFIG } from "@/lib/constants/tutor";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CalendarDays,
  Play,
  ArrowRight,
  Clock,
  Lock,
  BookOpen,
  SlidersHorizontal,
  Timer,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export function DashboardViewLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
      {/* Status Strip Skeleton */}
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border/70 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1.5">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>

      {/* Session Size Selector Strip Skeleton */}
      <div className="flex items-center justify-between bg-card p-3 px-4 rounded-xl border border-border/70 shadow-sm">
        <Skeleton className="h-4 w-28 rounded-md" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-7 w-12 rounded-md" />
          <Skeleton className="h-7 w-12 rounded-md" />
          <Skeleton className="h-7 w-12 rounded-md" />
        </div>
      </div>

      {/* Smart Start Strip Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-primary/20 bg-card p-5 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>

      {/* Projection / Readiness Hero Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>

      {/* Syllabus Topics Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40 rounded-md" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-card p-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardViewError({ message }: { message: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
      <p className="text-destructive font-medium">{message}</p>
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
}

interface SessionConfig {
  title: string;
  subtitle: string;
  intent: "spaced_review" | "custom_mock";
  domain?: string;
  subjectName?: string;
}

export function DashboardView({ data }: { data: DashboardPageData }) {
  const router = useRouter();

  const [activeConfig, setActiveConfig] = useState<SessionConfig | null>(null);
  const [modalMode, setModalMode] = useState<"exam" | "tutor">("exam"); // Default to Exam Mode
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
  const [sessionQuestionCount, setSessionQuestionCount] = useState<number>(10);

  const SESSION_SIZE_PRESETS = [
    { count: 10, label: "10 Sprint" },
    { count: 25, label: "25 Practice" },
    { count: 50, label: "50 Mock" },
  ] as const;

  useEffect(() => {
    const savedLinear = localStorage.getItem("acetheprep_linear_mode") ?? localStorage.getItem("gibbi_linear_mode");
    if (savedLinear) {
      setIsLinearMode(savedLinear === "true");
    }
    const savedCount = localStorage.getItem("acetheprep_session_count");
    if (savedCount) {
      const parsed = parseInt(savedCount, 10);
      if ([10, 25, 50].includes(parsed)) {
        setSessionQuestionCount(parsed);
        setModalQuestionCount(parsed);
      }
    }
  }, []);

  const handleToggleLinear = useCallback((checked: boolean) => {
    setIsLinearMode(checked);
    localStorage.setItem("acetheprep_linear_mode", String(checked));
  }, []);

  const handleSelectSessionSize = useCallback((count: number) => {
    setSessionQuestionCount(count);
    setModalQuestionCount(count);
    localStorage.setItem("acetheprep_session_count", String(count));
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
    setActiveConfig({
      title: "AI Spaced Review",
      subtitle: "Targeting your weakest and overdue topics across all subjects",
      intent: "spaced_review",
    });
    setModalQuestionCount(sessionQuestionCount);
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
    setModalQuestionCount(sessionQuestionCount);
    setModalMode("exam");
  }

  // Find next topic in linear sequence
  let nextLinearDomain: SyllabusDomain | null = null;
  for (const subject of data.syllabus) {
    for (const domain of subject.domains) {
      if (domain.masteryScore < 0.7) { // Define "not mastered" as < 70%
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
    setModalQuestionCount(sessionQuestionCount);
    setModalMode("exam");
  }

  async function handleConfirmLaunch() {
    if (!activeConfig) return;
    setIsLaunching(true);
    try {
      const sessionId = await startSession(
        activeConfig.intent,
        activeConfig.domain ? [activeConfig.domain] : undefined,
        modalQuestionCount
      );
      router.push(`${TUTOR_ROUTES.SESSION(sessionId)}?mode=${modalMode}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to start session");
      setIsLaunching(false);
    }
  }

  const now = new Date();

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
      {/* Section 1: Status Strip */}
      <div className="flex items-center justify-between text-sm bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CalendarDays className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-base">{data.examName}</div>
            <div className="text-muted-foreground text-xs">
              {data.daysRemaining} day{data.daysRemaining !== 1 ? "s" : ""} left
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Readiness</div>
          <div className="font-black text-2xl tabular-nums leading-none">
            {data.readinessIndex}<span className="text-muted-foreground text-base font-medium">/100</span>
          </div>
        </div>
      </div>

      {/* Session Size Selector Strip */}
      <div className="flex items-center justify-between bg-card p-3 px-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Session Size</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg">
          {SESSION_SIZE_PRESETS.map((preset) => {
            const isActive = sessionQuestionCount === preset.count;
            return (
              <button
                key={preset.count}
                type="button"
                onClick={() => handleSelectSessionSize(preset.count)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Smart Start Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/40 transition-colors">
          <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-lg">AI Pick</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Spaced repetition algorithm. Targets your weakest and overdue topics across all subjects.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={handleAlgorithmicReview}
            >
              <Play className="mr-2 h-4 w-4" /> Start Spaced Review ({sessionQuestionCount}Q)
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:border-border/80 transition-colors">
          <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-lg">Linear: Next Topic</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {nextLinearDomain 
                  ? `Next up in curriculum sequence: ${nextLinearDomain.name}.`
                  : "You've mastered all topics! Keep up the spaced reviews."}
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="w-full"
              onClick={handleLinearNext}
              disabled={!nextLinearDomain}
            >
              <Play className="mr-2 h-4 w-4" /> Practice {nextLinearDomain?.name || "Next"} ({sessionQuestionCount}Q)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Syllabus Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Syllabus Map</h2>
            <p className="text-muted-foreground text-sm">Practice topics individually based on mastery.</p>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg">
            <Label htmlFor="linear-mode" className="text-sm font-medium cursor-pointer">
              Linear Mode
            </Label>
            <input
              type="checkbox"
              id="linear-mode"
              checked={isLinearMode}
              onChange={(e) => handleToggleLinear(e.target.checked)}
              className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.syllabus.map((subject) => {
            let hasWeakPrerequisite = false;

            return (
              <Card key={subject.name} className="flex flex-col border shadow-sm h-fit">
                <CardHeader className="py-4 px-5 border-b bg-muted/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {subject.domains.map((domain) => {
                      const pct = Math.round(domain.masteryScore * 100);
                      const notStarted = domain.totalAttempted === 0;
                      const isOverdue = !notStarted && domain.nextReviewAt ? new Date(domain.nextReviewAt) < now : false;
                      const isWeak = domain.masteryScore < 0.3 && !notStarted;
                      const isStrong = domain.masteryScore >= 0.7 && !notStarted;

                      // Linear Mode Logic
                      let isFutureTopic = false;
                      if (isLinearMode) {
                        if (hasWeakPrerequisite) {
                          isFutureTopic = true;
                        }
                        if (isWeak || notStarted) {
                          hasWeakPrerequisite = true;
                        }
                      }

                      const barColor = isWeak ? "bg-red-500" : isStrong ? "bg-green-500" : "bg-yellow-500";

                      return (
                        <div key={domain.name} className={`p-4 hover:bg-muted/30 transition-all flex flex-col gap-3 group ${isFutureTopic ? "opacity-50 hover:opacity-100 grayscale hover:grayscale-0" : ""}`}>
                          <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                <span className="font-medium text-sm leading-snug mr-1">{domain.name}</span>
                                {isOverdue && (
                                  <Badge variant="outline" className="text-[10px] whitespace-nowrap uppercase px-1.5 h-4 border-orange-500/30 text-orange-600 bg-orange-500/10 shrink-0">
                                    <Clock className="w-3 h-3 mr-1" /> Due
                                  </Badge>
                                )}
                                {isStrong && !isOverdue && (
                                  <Badge variant="outline" className="text-[10px] whitespace-nowrap uppercase px-1.5 h-4 border-green-500/30 text-green-600 bg-green-500/10 shrink-0">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Strong
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden w-24 shrink-0">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${notStarted ? "bg-transparent" : barColor}`}
                                    style={{ width: `${notStarted ? 0 : Math.max(pct, 4)}%` }}
                                  />
                                </div>
                                <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">
                                  {notStarted ? "Not started · 0 Qs" : `${pct}% · ${domain.totalAttempted} Q${domain.totalAttempted !== 1 ? "s" : ""}`}
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant={isOverdue ? "default" : "outline"}
                              className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                              onClick={() => handleDomainPractice(domain.name, subject.name)}
                            >
                              Practice
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quiz / Test Overview Dialog */}
      <Dialog open={Boolean(activeConfig)} onOpenChange={(open) => !isLaunching && !open && setActiveConfig(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0 border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b bg-muted/20 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold text-primary border-primary/30 bg-primary/10">
                {data.examName}
              </Badge>
              {activeConfig?.subjectName && (
                <Badge variant="secondary" className="text-xs font-medium">
                  {activeConfig.subjectName}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {activeConfig?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {activeConfig?.subtitle}
            </DialogDescription>
          </div>

          {isLaunching ? (
            <div className="p-8 py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in-50 duration-300">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold text-primary border-primary/30 bg-primary/10">
                    {data.examName}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {modalMode === "exam" ? "Exam Simulation" : "Tutor Drill"}
                  </Badge>
                </div>
                <h3 className="font-extrabold text-xl text-foreground">
                  Synthesizing {activeConfig?.title}
                </h3>
                <p className="text-sm text-muted-foreground min-h-[44px] flex items-center justify-center transition-all leading-relaxed">
                  {launchStep === 0 && "🧠 Analyzing recent performance & syllabus mastery curve..."}
                  {launchStep === 1 && `🎯 Generating ${modalQuestionCount} high-distractor questions for ${data.examName}...`}
                  {launchStep === 2 && "🔬 Calibrating cognitive autopsy matrix & trap rationale..."}
                  {launchStep >= 3 && "⚡ Finalizing test payload and pre-flight cockpit..."}
                </p>
              </div>
              <div className="w-full max-w-xs bg-muted/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(96, (launchStep + 1) * 25 + 5)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground/80 font-mono">
                {modalQuestionCount} Questions · Preparing briefing screen
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 space-y-6">
                {/* Section 1: Number of Questions */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Number of Questions
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      ~{modalQuestionCount === 10 ? "15" : modalQuestionCount === 25 ? "35" : "75"} mins
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {SESSION_SIZE_PRESETS.map((preset) => {
                      const isSelected = modalQuestionCount === preset.count;
                      return (
                        <button
                          key={preset.count}
                          type="button"
                          disabled={isLaunching}
                          onClick={() => {
                            setModalQuestionCount(preset.count);
                            handleSelectSessionSize(preset.count);
                          }}
                          className={cn(
                            "p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1",
                            isSelected
                              ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground font-semibold shadow-sm"
                              : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                          )}
                        >
                          <span className="text-sm">{preset.label}</span>
                          <span className="text-[11px] text-muted-foreground font-normal">
                            {preset.count === 10 ? "Quick Drill" : preset.count === 25 ? "Standard" : "Full Simulation"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Feedback Mode Selection */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Feedback Mode
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Exam Mode (Default) */}
                    <button
                      type="button"
                      disabled={isLaunching}
                      onClick={() => setModalMode("exam")}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative",
                        modalMode === "exam"
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground shadow-sm"
                          : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Timer className={cn("w-4 h-4", modalMode === "exam" ? "text-primary" : "text-muted-foreground")} />
                            <span className="font-bold text-sm text-foreground">Exam Mode</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/30 bg-primary/10 h-4 px-1.5">
                            Default
                          </Badge>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Real exam conditions. Zero spoilers or explanations mid-test with instant question flow. Full cognitive autopsy matrix & trap deconstruction revealed upon completion.
                        </p>
                      </div>
                    </button>

                    {/* Tutor Mode */}
                    <button
                      type="button"
                      disabled={isLaunching}
                      onClick={() => setModalMode("tutor")}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative",
                        modalMode === "tutor"
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground shadow-sm"
                          : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className={cn("w-4 h-4", modalMode === "tutor" ? "text-primary" : "text-muted-foreground")} />
                            <span className="font-bold text-sm text-foreground">Tutor Drill</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] uppercase font-medium text-muted-foreground border-border h-4 px-1.5">
                            Learning
                          </Badge>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Immediate feedback after every question. Explains why distractors are traps, pinpoints misconceptions, and repairs mental models on the spot.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 pt-3 bg-muted/20 border-t flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isLaunching}
                  onClick={() => setActiveConfig(null)}
                  className="text-muted-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="lg"
                  disabled={isLaunching}
                  onClick={handleConfirmLaunch}
                  className="font-semibold px-6 min-w-[210px]"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start {modalMode === "exam" ? "Exam Simulation" : "Tutor Drill"} ({modalQuestionCount}Q)
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardView;
