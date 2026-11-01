"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { renderMathContent } from "@/lib/quiz-utils";
import { RichContentRenderer } from "@/components/ui/rich-content/RichContentRenderer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  LayoutDashboard,
  ShieldAlert,
  Flame,
} from "lucide-react";
import {
  submitTrapReviewAction,
  postponeTrapReviewAction,
} from "@/lib/actions/error-log";
import { TrapTaxonomyRadar } from "./TrapTaxonomyRadar";
import { useSidebarTelemetry, useSyncSidebarData } from "@/components/shared/SidebarContext";

export interface HydratedDueTrap {
  queueItemId: string;
  stage: string;
  stageDeadline: string | null;
  skillDomain: string;
  difficultyTier: string;
  lostProjectedPoints: number;
  createdAt?: string | null;
  question: {
    id: string;
    question_text: string;
    passage?: string;
    options: Record<string, string>;
    correct_option: string;
    explanation: string;
    distractor_analysis: Record<string, string>;
    misconception?: string | null;
    exam_name?: string;
    subject?: string;
  };
}

interface ZeroClickDrillViewProps {
  initialTraps: HydratedDueTrap[];
  examName: string;
}

function formatMissedTime(createdAt?: string | null): string {
  if (!createdAt) return "in earlier practice";
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs) || diffMs < 0) return "in earlier practice";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 5) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

export function ZeroClickDrillView({
  initialTraps,
  examName,
}: ZeroClickDrillViewProps) {
  const router = useRouter();
  const [traps, setTraps] = useState<HydratedDueTrap[]>(initialTraps);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const [timeLeft, setTimeLeft] = useState(45);
  const [timerActive, setTimerActive] = useState(true);
  const [clearedTrapsCount, setClearedTrapsCount] = useState(0);
  const [salvagedPointsTotal, setSalvagedPointsTotal] = useState(0);
  const { updateMistakesCount, setSidebarData } = useSidebarTelemetry();

  useEffect(() => {
    setSidebarData((prev) => {
      const nextName = examName || prev?.examName || "";
      if (
        prev &&
        prev.examName === nextName &&
        (prev.dueMistakesCount || 0) === initialTraps.length
      ) {
        return prev;
      }
      return {
        examName: nextName,
        daysRemaining: prev?.daysRemaining || 0,
        streak: prev?.streak || 0,
        dueMistakesCount: initialTraps.length,
        isPro: prev?.isPro,
      };
    });
  }, [examName, initialTraps.length, setSidebarData]);

  const currentTrap = traps[currentIndex];
  const totalRemaining = traps.length - currentIndex;

  // 45-Second countdown timer per active recall trap
  useEffect(() => {
    if (!timerActive || hasSubmitted || !currentTrap) return;

    if (timeLeft <= 0) {
      toast.warning("Time limit reached! Make your best strategic guess.");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, timerActive, hasSubmitted, currentTrap]);

  // Reset per question
  useEffect(() => {
    setTimeLeft(45);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(null);
    setTimerActive(true);
  }, [currentIndex]);

  const handleSelectOption = (letter: string) => {
    if (hasSubmitted) return;
    setSelectedOption(letter);
  };

  const handleSolveTrap = () => {
    if (!selectedOption || !currentTrap || hasSubmitted) return;

    const correct =
      selectedOption.toUpperCase() ===
      currentTrap.question.correct_option.toUpperCase();

    setHasSubmitted(true);
    setIsCorrect(correct);
    setTimerActive(false);

    if (correct) {
      setClearedTrapsCount((c) => c + 1);
      setSalvagedPointsTotal((pts) => pts + (currentTrap.lostProjectedPoints || 5));
      toast.success("Mastered! Removed from your daily review queue.", {
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      });
    } else {
      toast.error("Not quite. We will review this again tomorrow.", {
        icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      });
    }

    startTransition(async () => {
      const res = await submitTrapReviewAction({
        queueItemId: currentTrap.queueItemId,
        selectedOption,
        correctOption: currentTrap.question.correct_option,
      });
      if (res?.success) {
        updateMistakesCount(-1);
      }
    });
  };

  const handleNextTrap = () => {
    if (currentIndex + 1 < traps.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All done!
      setCurrentIndex(traps.length);
    }
  };

  const handlePostpone = () => {
    if (!currentTrap) return;
    toast.info("Reminding you in 2 hours. Moving to next overdue trap.");

    startTransition(async () => {
      const res = await postponeTrapReviewAction({
        queueItemId: currentTrap.queueItemId,
      });
      if (res?.success) {
        updateMistakesCount(-1);
      }
    });

    handleNextTrap();
  };

  // State: All Traps Calibrated (Inbox Zero Achieved)
  if (!currentTrap || currentIndex >= traps.length) {
    const allMisconceptions = initialTraps
      .map((t) => t.question.misconception)
      .filter(Boolean) as string[];

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center space-y-4 p-8 rounded-3xl bg-card border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                Retention Loop Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                All Caught Up! Zero Mistakes Due
              </h2>
            </div>

            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You reviewed all{" "}
              <span className="font-bold text-foreground">{initialTraps.length}</span> missed questions
              today. You're all caught up!
            </p>

            {/* Compounding Payoff Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm mx-auto">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-center">
                <span className="block text-2xl font-black font-mono text-emerald-500">
                  +{salvagedPointsTotal > 0 ? salvagedPointsTotal : Math.max(5, clearedTrapsCount * 5)} pts
                </span>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Points Recovered
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-3.5 text-center">
                <span className="block text-2xl font-black font-mono text-foreground">
                  {clearedTrapsCount}/{initialTraps.length}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Questions Cleared
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              We'll remind you automatically when it's time to review these again.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                <Link href="/home">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <TrapTaxonomyRadar rawMisconceptions={allMisconceptions} />
        </div>
      </div>
    );
  }

  const missedTimeText = formatMissedTime(currentTrap.createdAt);

  return (
    <div className="bg-background text-foreground flex flex-col">
      {/* In-Page Navigation Bar (replaces overlapping sticky header) */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-3 sm:pt-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Mistake Vault
            </span>
            <span className="text-border dark:text-slate-700">&bull;</span>
            <span className="text-xs text-muted-foreground font-medium">
              {examName} &middot; {totalRemaining} due
            </span>
          </div>

          <Link
            href="/home"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-medium"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Focus Arena */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-5 sm:py-7 space-y-4">
        {/* Memory Trigger Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-card border border-rose-500/25 dark:border-rose-500/30 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-foreground">
                Missed {missedTimeText}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {currentTrap.question.exam_name || examName} &bull; {currentTrap.skillDomain}
              </div>
            </div>
          </div>

          {/* 45-Second Countdown Timer */}
          <div className="flex items-center gap-1.5 font-mono text-xs bg-muted/60 px-2.5 py-1 rounded-lg border border-border/80 shrink-0">
            <Clock className={cn("w-3.5 h-3.5", timeLeft <= 10 ? "text-rose-500 animate-pulse" : "text-muted-foreground")} />
            <span className={cn("font-bold tabular-nums", timeLeft <= 10 ? "text-rose-500" : "text-foreground")}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Passage (if any) */}
        {currentTrap.question.passage && (
          <div className="p-4 rounded-xl bg-muted/30 border border-border/80 text-xs sm:text-sm text-foreground/90 leading-relaxed max-h-64 overflow-y-auto">
            <RichContentRenderer content={currentTrap.question.passage} />
          </div>
        )}

        {/* Question Prompt */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-2xs space-y-5">
          <div className="text-base sm:text-lg font-medium leading-relaxed text-foreground">
            <RichContentRenderer content={currentTrap.question.question_text} />
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {Object.entries(currentTrap.question.options)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, text]) => {
                const isSelected = selectedOption === letter;
                const isCorrectOption = letter === currentTrap.question.correct_option;

                let optStyle =
                  "border-border/80 bg-card hover:bg-muted/40 hover:border-border cursor-pointer text-foreground";

                if (isSelected && !hasSubmitted) {
                  optStyle = "border-primary bg-primary/5 text-foreground shadow-2xs";
                }

                if (hasSubmitted) {
                  if (isCorrectOption) {
                    optStyle =
                      "border-emerald-500/70 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-medium";
                  } else if (isSelected && !isCorrectOption) {
                    optStyle =
                      "border-rose-500/70 bg-rose-500/10 text-rose-950 dark:text-rose-200 font-medium";
                  } else {
                    optStyle = "border-border/40 bg-card/40 text-muted-foreground opacity-50";
                  }
                }

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleSelectOption(letter)}
                    disabled={hasSubmitted}
                    className={cn(
                      "w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3",
                      optStyle
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "h-5 w-5 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border transition-colors",
                          hasSubmitted && isCorrectOption
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : hasSubmitted && isSelected && !isCorrectOption
                            ? "bg-rose-600 text-white border-rose-600"
                            : isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        {letter}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">
                        {renderMathContent(text)}
                      </span>
                    </div>

                    {hasSubmitted && isCorrectOption && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                    )}
                    {hasSubmitted && isSelected && !isCorrectOption && (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
          </div>

          {/* Action Row */}
          {!hasSubmitted ? (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
              <Button
                type="button"
                onClick={handleSolveTrap}
                disabled={!selectedOption || isPending}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                <span>Check Answer ({timeLeft}s)</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handlePostpone}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Remind Me in 2 Hours</span>
              </Button>
            </div>
          ) : (
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-border/60">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Concept Reinforced
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                    <XCircle className="w-3.5 h-3.5" /> Scheduled for Review Again Soon
                  </span>
                )}
              </div>

              <Button
                type="button"
                onClick={handleNextTrap}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs cursor-pointer"
              >
                <span>Next Question ({totalRemaining - 1} left) &rarr;</span>
              </Button>
            </div>
          )}
        </div>

        {/* Forensic Socratic Breakdown upon Submission */}
        {hasSubmitted && (
          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-2xs animate-in fade-in duration-300">
            {selectedOption &&
              selectedOption !== currentTrap.question.correct_option &&
              currentTrap.question.distractor_analysis?.[selectedOption] && (
                <div className="p-3.5 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/25 text-xs text-foreground space-y-1">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block uppercase tracking-wider text-[11px]">
                    Why Option ({selectedOption}) is incorrect:
                  </span>
                  <div className="text-foreground leading-relaxed">
                    {renderMathContent(
                      currentTrap.question.distractor_analysis[selectedOption]
                    )}
                  </div>
                </div>
              )}

            {currentTrap.question.misconception && (
              <div className="text-xs text-foreground bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/25 p-3 rounded-xl space-y-0.5">
                <span className="font-bold text-amber-700 dark:text-amber-400 block">Key Takeaway:</span>
                <div className="text-foreground leading-relaxed">
                  {currentTrap.question.misconception}
                </div>
              </div>
            )}

            <div className="text-xs space-y-1 pt-2 border-t border-border/60">
              <span className="font-semibold text-muted-foreground block text-xs">
                Step-by-Step Solution:
              </span>
              <div className="text-foreground leading-relaxed">
                <RichContentRenderer content={currentTrap.question.explanation} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

