// Path: components/tutor/SessionPlayer.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { renderMathContent } from "@/lib/quiz-utils";
import { TUTOR_CONFIG, TUTOR_ROUTES } from "@/lib/constants/tutor";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  GraduationCap,
  Timer,
  Clock,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  Zap,
  LogOut,
  Trash2,
  Calculator,
  Flag,
  Grid,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { discardSessionAction } from "@/lib/actions/tutor";
import { Badge } from "@/components/ui/badge";
import { ExamCalculator } from "@/components/tutor/ExamCalculator";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";

export interface QuestionAttemptRecord {
  selected: SelectedOption | null;
  isCorrect: boolean;
  wasRevealed: boolean;
  timeMs: number;
}

export interface SessionPlayerProps {
  sessionId: string;
  questions: SessionQuestion[];
  examProfileId: string;
  taxonomyDomains?: string[];
  initialMastery?: Record<string, number>;
  initialMode?: "tutor" | "exam";
  examName?: string;
  isReviewMode?: boolean;
  initialUserAttempts?: Record<string, QuestionAttemptRecord>;
  initialScore?: number;
  initialTimeElapsed?: number;
  initialIndex?: number;
  autoStart?: boolean;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

// ---------------------------------------------------------------------------
// Main SessionPlayer Component
// ---------------------------------------------------------------------------

export function SessionPlayer({
  sessionId,
  questions,
  examProfileId,
  taxonomyDomains,
  initialMastery,
  initialMode = "tutor",
  examName,
  isReviewMode = false,
  initialUserAttempts,
  initialScore,
  initialTimeElapsed,
  initialIndex = 0,
  autoStart = false,
}: SessionPlayerProps) {
  const router = useRouter();

  const [mode, setMode] = useState<"tutor" | "exam">(initialMode);
  const [hasStarted, setHasStarted] = useState(isReviewMode || initialIndex > 0 || Boolean(autoStart));
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);
  const [answerState, setAnswerState] = useState<"pending" | "answered">("pending");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(initialScore ?? 0);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(isReviewMode);
  const [completing, setCompleting] = useState(false);
  const [startingNext, setStartingNext] = useState(false);
  const [completeResult, setCompleteResult] = useState<{
    readiness_index?: number;
    mastery_updates?: { skill_domain: string; mastery_score: number }[];
    share_token?: string;
  } | null>(null);

  const [userAttempts, setUserAttempts] = useState<Record<string, QuestionAttemptRecord>>(
    initialUserAttempts || {}
  );
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "flagged" | "incorrect" | "traps" | "correct">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [showSectionReview, setShowSectionReview] = useState(false);

  // Official Test-Day Tools State
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showTimer, setShowTimer] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const answeredCount = useMemo(() => Object.keys(userAttempts).length, [userAttempts]);

  const handleDiscardSession = useCallback(async () => {
    setIsDiscarding(true);
    try {
      const res = await discardSessionAction({ session_id: sessionId });
      if (!res.success) throw new Error(res.error || "Failed to discard session");
      toast.info("Session discarded.");
      router.push(TUTOR_ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to discard session";
      toast.error(msg);
      setIsDiscarding(false);
    }
  }, [sessionId, router]);

  const handleFinishEarly = useCallback(() => {
    setShowExitDialog(false);
    setShowSectionReview(true);
  }, []);

  const timerStartRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(initialTimeElapsed ?? 0);
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submittingRef = useRef(false);

  const total = questions.length;
  const current = questions[currentIndex];

  const handleStartTest = useCallback(() => {
    timerStartRef.current = Date.now();
    questionStartRef.current = Date.now();
    setTotalTimeElapsed(0);
    setHasStarted(true);
  }, []);

  const nextDomain = useMemo(() => {
    if (!completeResult || !taxonomyDomains || !initialMastery) return null;
    
    const currentMastery = { ...initialMastery };
    if (completeResult.mastery_updates) {
      for (const update of completeResult.mastery_updates) {
        currentMastery[update.skill_domain] = update.mastery_score;
      }
    }
    
    for (const domain of taxonomyDomains) {
      if ((currentMastery[domain] ?? 0) < 0.7) {
        return domain;
      }
    }
    
    return null;
  }, [completeResult, taxonomyDomains, initialMastery]);

  useEffect(() => {
    if (!hasStarted || sessionComplete) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTotalTimeElapsed(Math.floor((Date.now() - timerStartRef.current) / 1000));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasStarted, sessionComplete]);

  // Keyboard shortcut listener: Esc to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCalculator(false);
        setShowPalette(false);
        setShowSectionReview(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const recordAnswer = useCallback(
    async (option: SelectedOption | null, correct: boolean, revealed: boolean, timeMs: number) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      try {
        await fetch(TUTOR_ROUTES.API_SESSION_ANSWER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            question_id: current.question_id,
            selected_option: option,
            time_to_answer_ms: timeMs,
            was_revealed: revealed,
          }),
        });
      } catch {
        // Non-blocking telemetry
      } finally {
        submittingRef.current = false;
      }
    },
    [sessionId, current?.question_id]
  );

  const lockInAnswer = useCallback(
    (option: SelectedOption | null, correct: boolean, revealed: boolean) => {
      setAnswerState("answered");
      setIsCorrect(correct);
      setIsRevealed(revealed);
      const timeMs = Date.now() - questionStartRef.current;
      if (correct) setScore((prev) => prev + 1);

      setUserAttempts((prev) => ({
        ...prev,
        [current.question_id]: {
          selected: option,
          isCorrect: correct,
          wasRevealed: revealed,
          timeMs,
        },
      }));

      recordAnswer(option, correct, revealed, timeMs);
      setNextEnabled(true);
    },
    [recordAnswer, current?.question_id]
  );

  const handleOptionClick = useCallback(
    (option: SelectedOption) => {
      if (mode === "exam") {
        setSelectedOption(option);
        setNextEnabled(true);
        return;
      }

      if (answerState === "answered") return;
      const correct = option === current.correct_option;
      setSelectedOption(option);
      lockInAnswer(option, correct, false);
    },
    [mode, answerState, current, lockInAnswer]
  );

  const handleSkipQuestion = useCallback(() => {
    const next = currentIndex + 1;
    if (next < total) {
      setCurrentIndex(next);
      const nextAttempt = userAttempts[questions[next].question_id];
      if (nextAttempt) {
        setSelectedOption(nextAttempt.selected);
        setAnswerState("answered");
        setIsCorrect(nextAttempt.isCorrect);
        setIsRevealed(nextAttempt.wasRevealed);
        setNextEnabled(true);
      } else {
        setSelectedOption(null);
        setAnswerState("pending");
        setIsCorrect(null);
        setIsRevealed(false);
        setNextEnabled(false);
      }
      questionStartRef.current = Date.now();
    } else {
      setShowSectionReview(true);
    }
  }, [currentIndex, total, userAttempts, questions]);

  const handleNext = useCallback(() => {
    if (mode === "exam" && selectedOption) {
      const correct = selectedOption === current.correct_option;
      lockInAnswer(selectedOption, correct, false);
    }

    const next = currentIndex + 1;
    if (next < total) {
      setCurrentIndex(next);
      const nextAttempt = userAttempts[questions[next].question_id];
      if (nextAttempt) {
        setSelectedOption(nextAttempt.selected);
        setAnswerState("answered");
        setIsCorrect(nextAttempt.isCorrect);
        setIsRevealed(nextAttempt.wasRevealed);
        setNextEnabled(true);
      } else {
        setSelectedOption(null);
        setAnswerState("pending");
        setIsCorrect(null);
        setIsRevealed(false);
        setNextEnabled(false);
      }
      questionStartRef.current = Date.now();
    } else {
      setShowSectionReview(true);
    }
  }, [mode, selectedOption, current, lockInAnswer, currentIndex, total, userAttempts, questions]);

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) return;
    const prev = currentIndex - 1;
    setCurrentIndex(prev);
    const prevAttempt = userAttempts[questions[prev].question_id];
    if (prevAttempt) {
      setSelectedOption(prevAttempt.selected);
      setAnswerState("answered");
      setIsCorrect(prevAttempt.isCorrect);
      setIsRevealed(prevAttempt.wasRevealed);
      setNextEnabled(true);
    } else {
      setSelectedOption(null);
      setAnswerState("pending");
      setIsCorrect(null);
      setIsRevealed(false);
      setNextEnabled(false);
    }
    questionStartRef.current = Date.now();
  }, [currentIndex, userAttempts, questions]);

  const handleJumpToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setCurrentIndex(index);
      setShowPalette(false);
      setShowSectionReview(false);
      const attempt = userAttempts[questions[index].question_id];
      if (attempt) {
        setSelectedOption(attempt.selected);
        setAnswerState("answered");
        setIsCorrect(attempt.isCorrect);
        setIsRevealed(attempt.wasRevealed);
        setNextEnabled(true);
      } else {
        setSelectedOption(null);
        setAnswerState("pending");
        setIsCorrect(null);
        setIsRevealed(false);
        setNextEnabled(false);
      }
      questionStartRef.current = Date.now();
    },
    [total, userAttempts, questions]
  );

  const handleToggleFlag = useCallback(() => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  }, [currentIndex]);

  const handleComplete = useCallback(async () => {
    if (completing || completeResult) return;
    setCompleting(true);
    try {
      const res = await fetch(TUTOR_ROUTES.API_SESSION_COMPLETE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, exam_profile_id: examProfileId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Failed to complete session");
      }
      const data = await res.json();
      setCompleteResult(data);
      toast.success("Session completed! SuperMemo-2 mastery calibrated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to complete session. Try again.");
    } finally {
      setCompleting(false);
    }
  }, [sessionId, examProfileId, completing, completeResult]);

  useEffect(() => {
    if (sessionComplete && !isReviewMode && !completeResult && !completing) {
      handleComplete();
    }
  }, [sessionComplete, isReviewMode, completeResult, completing, handleComplete]);

  const handleBackToDashboard = useCallback(() => {
    router.refresh();
    router.push(TUTOR_ROUTES.DASHBOARD);
  }, [router]);

  const handleStartNextTopic = useCallback(async () => {
    if (!nextDomain) return;
    setStartingNext(true);
    try {
      const res = await fetch(`${TUTOR_ROUTES.API_SESSION_START}?stream=false`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam_profile_id: examProfileId,
          session_intent: "custom_mock",
          focus_domains: [nextDomain],
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Failed to start next session");
      }
      const data = await res.json();
      router.push(`/session/${data.session_id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to launch next drill");
      setStartingNext(false);
    }
  }, [nextDomain, examProfileId, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const estimatedMinutes = Math.max(1, Math.round(questions.length * 1.5));

  // --- Start Screen ---
  if (!hasStarted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background p-4 select-none">
        <div className="max-w-md w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {examName || "Standardized"} Practice Session
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {questions.length} Questions &middot; ~{estimatedMinutes} mins target
            </p>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Primary Domain:</span>
              <span className="font-semibold text-foreground">{current?.skill_domain || "General"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Simulation Standard:</span>
              <span className="font-mono text-primary font-semibold">Official Bluebook & ETS Toolset</span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              size="lg"
              onClick={handleStartTest}
              className="w-full h-12 text-sm font-semibold shadow-md active:scale-[0.99] cursor-pointer"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Begin {mode === "exam" ? "Exam Simulation" : "Tutor Drill"}
            </Button>

            <button
              type="button"
              onClick={handleDiscardSession}
              disabled={isDiscarding}
              className="text-xs text-muted-foreground hover:text-destructive underline cursor-pointer"
            >
              {isDiscarding ? "Discarding..." : "Exit to Dashboard"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const toggleQuestionExpand = useCallback((qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !(prev[qId] ?? true),
    }));
  }, []);

  // --- Official Section Review Screen (Pre-Submission Review) ---
  if (showSectionReview && !sessionComplete) {
    const unAnsweredCount = total - answeredCount;
    const flaggedCount = flaggedQuestions.size;

    return (
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background select-none">
        {/* Sticky Top Proctor Bar */}
        <header className="h-14 shrink-0 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between z-30 transition-colors">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-xs sm:text-sm tracking-wide text-foreground">
              {examName || "Standardized Exam"} &middot; Section Review
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
              Pre-Submission
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showTimer && (
              <div className="flex items-center gap-2 bg-secondary/60 px-3 py-1 rounded-md border border-border">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground">
                  {formatTime(totalTimeElapsed)}
                </span>
              </div>
            )}
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSectionReview(false)}
              className="h-8 px-3 text-xs"
            >
              Return to Item {currentIndex + 1}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 bg-background">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-1.5 text-left border-b border-border/80 pb-4">
              <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Section Review: Check Your Work
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Review your responses before finalizing. Questions marked for review or left unanswered are highlighted below. Click any question card to jump directly to it and update your answer.
              </p>
            </div>

            {/* Metric Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-xs">
                <div className="font-mono text-2xl font-bold text-foreground">{total}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Total Questions</div>
              </div>

              <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-xs">
                <div className="font-mono text-2xl font-bold text-primary">{answeredCount}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Answered</div>
              </div>

              <div className={cn(
                "rounded-xl border p-3.5 text-center shadow-xs transition-colors",
                unAnsweredCount > 0 ? "border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900/50" : "border-border bg-card"
              )}>
                <div className={cn("font-mono text-2xl font-bold", unAnsweredCount > 0 ? "text-rose-600 dark:text-rose-400" : "text-foreground")}>
                  {unAnsweredCount}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Unanswered</div>
              </div>

              <div className={cn(
                "rounded-xl border p-3.5 text-center shadow-xs transition-colors",
                flaggedCount > 0 ? "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/50" : "border-border bg-card"
              )}>
                <div className={cn("font-mono text-2xl font-bold flex items-center justify-center gap-1.5", flaggedCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
                  <Flag className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span>{flaggedCount}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Marked for Review</div>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {flaggedCount > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const firstFlagged = Array.from(flaggedQuestions).sort((a, b) => a - b)[0];
                    if (firstFlagged !== undefined) {
                      setShowSectionReview(false);
                      handleJumpToQuestion(firstFlagged);
                    }
                  }}
                  className="h-8 text-xs border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                >
                  <Flag className="h-3.5 w-3.5 mr-1.5 fill-amber-500 text-amber-500" />
                  Review First Flagged (Item {Array.from(flaggedQuestions).sort((a, b) => a - b)[0] + 1})
                </Button>
              )}

              {unAnsweredCount > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const firstUnanswered = questions.findIndex((q) => !userAttempts[q.question_id]);
                    if (firstUnanswered !== -1) {
                      setShowSectionReview(false);
                      handleJumpToQuestion(firstUnanswered);
                    }
                  }}
                  className="h-8 text-xs border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                >
                  <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                  Complete First Unanswered (Item {questions.findIndex((q) => !userAttempts[q.question_id]) + 1})
                </Button>
              )}
            </div>

            {/* Question Review Grid */}
            <div className="space-y-3">
              <span className="font-heading text-sm font-semibold text-foreground block">
                All Section Questions (Click any to inspect or change)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {questions.map((q, idx) => {
                  const attempt = userAttempts[q.question_id];
                  const isAnswered = Boolean(attempt);
                  const isFlagged = flaggedQuestions.has(idx);

                  return (
                    <div
                      key={q.question_id}
                      onClick={() => {
                        setShowSectionReview(false);
                        handleJumpToQuestion(idx);
                      }}
                      className={cn(
                        "group p-3.5 rounded-xl border bg-card hover:border-primary/60 transition-all cursor-pointer flex items-center justify-between shadow-xs",
                        isFlagged && "ring-1 ring-amber-500/50 bg-amber-50/20 dark:bg-amber-950/10",
                        !isAnswered && "border-dashed border-border/90"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-7 w-7 rounded-lg border border-border bg-secondary/50 font-mono text-xs font-bold text-foreground flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 text-left">
                          <span className="text-xs font-semibold text-foreground block truncate">
                            {q.skill_domain || "General"}
                          </span>
                          <span className="text-[11px] text-muted-foreground block truncate">
                            {isAnswered ? `Answered: Option ${attempt?.selected || "None"}` : "Not Answered Yet"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isFlagged && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                            <Flag className="h-3 w-3 fill-amber-500 text-amber-500" />
                            Flagged
                          </span>
                        )}
                        {isAnswered ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-mono font-semibold">
                            <Check className="h-3 w-3" />
                            Done
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] font-mono">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* Sticky Bottom Dock */}
        <footer className="h-16 shrink-0 border-t border-border bg-card/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-30">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowSectionReview(false)}
            className="h-9 px-4 text-xs font-semibold cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5 mr-1.5" />
            Return to Questions
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => {
              setShowSectionReview(false);
              setSessionComplete(true);
            }}
            className="h-9 px-6 text-xs font-semibold shadow-sm cursor-pointer"
          >
            <span>Submit & Finalize Session</span>
            <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </footer>
      </div>
    );
  }

  // --- Session Complete Screen (Post-Exam Diagnostic Review) ---
  if (sessionComplete) {
    const attemptedCount = Object.keys(userAttempts).length;
    const effectiveTotal = attemptedCount > 0 ? attemptedCount : total;
    const pct = effectiveTotal > 0 ? Math.round((score / effectiveTotal) * 100) : 0;
    const incorrectCount = Object.values(userAttempts).filter((a) => !a.isCorrect).length;
    const trapsCaughtCount = Object.values(userAttempts).filter((a) => !a.isCorrect && !a.wasRevealed).length;
    const flaggedCount = flaggedQuestions.size;

    const filteredQuestions = questions.filter((q, idx) => {
      const attempt = userAttempts[q.question_id];
      if (reviewFilter === "all") return true;
      if (reviewFilter === "flagged") return flaggedQuestions.has(idx);
      if (reviewFilter === "incorrect") return attempt ? !attempt.isCorrect : true;
      if (reviewFilter === "traps") {
        return attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
      }
      if (reviewFilter === "correct") return attempt?.isCorrect;
      return true;
    });

    return (
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
        <header className="h-14 shrink-0 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between z-30 transition-colors">
          <span className="font-semibold text-sm text-foreground">
            {examName || "Standardized Exam"} &middot; Results & Diagnostic Review
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleBackToDashboard}
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="text-center space-y-2 pt-4">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
              Session Performance Breakdown
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              SuperMemo-2 spaced recall calibrated. Review flagged items, examiner traps, and derivations below.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="text-2xl font-bold font-mono text-foreground">{score}/{effectiveTotal}</div>
              <div className="text-xs text-muted-foreground mt-1">Raw Score</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="text-2xl font-bold font-mono text-foreground">{pct}%</div>
              <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="text-2xl font-bold font-mono text-foreground">{formatTime(totalTimeElapsed)}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Pacing</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
              <div className="text-2xl font-bold font-mono text-primary">
                {trapsCaughtCount}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Distractor Traps</div>
            </div>
          </div>

          {/* Post-Exam Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-border/80">
            <span className="font-heading text-sm font-semibold text-foreground">
              Question Breakdown
            </span>
            <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-lg border border-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setReviewFilter("all")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                All ({total})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("flagged")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer",
                  reviewFilter === "flagged" ? "bg-card text-foreground shadow-xs font-bold text-amber-600 dark:text-amber-400" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Flag className="h-3 w-3 fill-amber-500 text-amber-500" />
                Flagged ({flaggedCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("incorrect")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "incorrect" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Mistakes ({incorrectCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("traps")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "traps" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Traps ({trapsCaughtCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("correct")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "correct" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Correct ({score})
              </button>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const originalIndex = questions.indexOf(q);
              const attempt = userAttempts[q.question_id];
              const isTrap = attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
              const isFlagged = flaggedQuestions.has(originalIndex);
              const isExpanded = expandedQuestions[q.question_id] ?? true;

              return (
                <div key={q.question_id} className="border border-border rounded-xl bg-card p-4 sm:p-5 space-y-4 shadow-xs transition-all">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleQuestionExpand(q.question_id)}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground font-mono">Item {originalIndex + 1}</span>
                      <Badge variant="outline" className="text-xs">{q.skill_domain}</Badge>
                      {isFlagged && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          <Flag className="h-3 w-3 fill-amber-500 text-amber-500" />
                          Marked for Review
                        </span>
                      )}
                      {attempt?.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : isTrap ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" /> Distractor Trap
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <button type="button" className="text-muted-foreground hover:text-foreground cursor-pointer">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t border-border">
                      <div className="text-sm font-medium leading-relaxed text-foreground">
                        {renderMathContent(q.question_text)}
                      </div>

                      <div className="space-y-2">
                        {OPTION_LETTERS.filter((key) => key in q.options).map((key) => {
                          const isSelected = attempt?.selected === key;
                          const isCorrectOption = key === q.correct_option;

                          let optBorder = "border-border/60 bg-secondary/30";
                          if (isCorrectOption) {
                            optBorder = "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 font-medium";
                          } else if (isSelected && !isCorrectOption) {
                            optBorder = "border-rose-600 bg-rose-50/50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100";
                          }

                          return (
                            <div
                              key={key}
                              className={cn("flex items-center justify-between p-3 rounded-lg border text-xs text-foreground", optBorder)}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={cn(
                                  "h-5 w-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border",
                                  isCorrectOption ? "bg-emerald-600 text-white border-emerald-600" : isSelected ? "bg-rose-600 text-white border-rose-600" : "border-border text-muted-foreground"
                                )}>
                                  {key}
                                </span>
                                <span>{renderMathContent(q.options[key])}</span>
                              </div>
                              {isCorrectOption && <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />}
                              {isSelected && !isCorrectOption && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Distractor Trap Analysis */}
                      {attempt?.selected && attempt.selected !== q.correct_option && q.distractor_analysis?.[attempt.selected] && (
                        <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground leading-relaxed">
                          <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                            Trap Breakdown (Option {attempt.selected}):
                          </span>
                          {renderMathContent(q.distractor_analysis[attempt.selected])}
                        </div>
                      )}

                      {/* Solution Derivation */}
                      {q.explanation && (
                        <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground leading-relaxed">
                          <span className="font-semibold text-foreground block mb-1">
                            Solution Derivation:
                          </span>
                          {renderMathContent(q.explanation)}
                        </div>
                      )}

                      {/* Misconception */}
                      {q.misconception && (
                        <div className="text-xs text-muted-foreground border-t border-border pt-2.5">
                          <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                            Exam-Setter Trap:
                          </span>
                          {q.misconception}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {nextDomain && (
              <Button
                className="flex-1 h-11 text-sm font-semibold cursor-pointer"
                onClick={handleStartNextTopic}
                disabled={startingNext}
              >
                Practice Next Topic: {nextDomain}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 h-11 text-sm font-semibold cursor-pointer"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // --- Active Test Runner Screen (100% Full Screen Viewport) ---
  const optionEntries = OPTION_LETTERS.filter((key) => key in current.options).map((key) => ({
    key,
    value: current.options[key],
  }));

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background select-none">
      {/* Official Modals */}
      <ExamCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        examName={examName}
      />

      {/* Question Palette Drawer Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="font-heading text-base font-semibold text-foreground">
                  Question Navigator ({total} Questions)
                </span>
                {flaggedQuestions.size > 0 && (
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    {flaggedQuestions.size} flagged
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPalette(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-secondary cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowPalette(false);
                setShowSectionReview(true);
              }}
              className="w-full text-xs font-semibold h-8 cursor-pointer"
            >
              Open Full Section Review Grid
            </Button>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5 max-h-[300px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const attempt = userAttempts[q.question_id];
                const isAnswered = Boolean(attempt);
                const isFlagged = flaggedQuestions.has(idx);

                return (
                  <button
                    key={q.question_id}
                    type="button"
                    onClick={() => handleJumpToQuestion(idx)}
                    className={cn(
                      "relative h-11 rounded-lg border font-mono text-xs font-semibold flex items-center justify-center transition-all cursor-pointer",
                      isCurrent && "border-primary ring-2 ring-primary/40 font-bold",
                      isAnswered && !isCurrent && "bg-primary/10 border-primary/30 text-primary",
                      !isAnswered && !isCurrent && "bg-secondary/40 border-border text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
                    )}
                    {isAnswered && (
                      <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Marked for Review
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30" /> Unanswered
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* 1. Official Sticky Top Proctor Bar                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="h-14 shrink-0 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between z-30 transition-colors">
        {/* Left: Module Designation & Mode */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-xs sm:text-sm tracking-wide text-foreground">
            {examName || "Exam Practice"} &middot; {current.skill_domain}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
            {mode === "exam" ? "Exam Simulation" : "Tutor Drill"}
          </span>
        </div>

        {/* Center: Official Countdown / Stopwatch */}
        <div className="flex items-center gap-2 bg-secondary/60 px-3 py-1 rounded-md border border-border">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          {showTimer ? (
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-foreground">
              {formatTime(totalTimeElapsed)}
            </span>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">Time Hidden</span>
          )}
          <button
            type="button"
            onClick={() => setShowTimer((prev) => !prev)}
            className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline ml-1 cursor-pointer"
          >
            {showTimer ? "Hide" : "Show"}
          </button>
        </div>

        {/* Right: Essential Tools & Exit */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCalculator((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
              showCalculator
                ? "bg-primary text-primary-foreground border-primary shadow-xs font-semibold"
                : "border-border/80 bg-secondary/50 hover:bg-secondary text-foreground",
            )}
            title="Open Exam Calculator"
          >
            <Calculator className={cn("h-3.5 w-3.5", showCalculator ? "text-primary-foreground" : "text-primary")} />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          <div className="h-4 w-px bg-border/80 mx-0.5" />
          <ThemeToggle />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowExitDialog(true)}
            className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">End Test</span>
          </Button>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Main Question Workspace (Full Height Scrollable)             */}
      {/* ---------------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 bg-background">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Question Stem Header: Domain & Difficulty */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border/80 pb-2.5">
              <span className="font-semibold text-foreground/80 tracking-wide">
                {current.skill_domain || "Problem Solving"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/70 border border-border px-2 py-0.5 rounded">
                Tier {current.difficulty_tier || 2}
              </span>
            </div>

            <div className="font-heading text-lg sm:text-xl font-normal leading-relaxed text-foreground tracking-normal">
              {renderMathContent(current.question_text)}
            </div>
          </div>

          {/* Option Cards */}
          <div className="space-y-3">
            {optionEntries.map(({ key, value }) => {
              const isSelected = selectedOption === key;
              const isCorrectOption = key === current.correct_option;

              let borderClasses = "border-border/80 bg-card hover:border-primary/50 hover:bg-secondary/20";

              if (mode === "tutor") {
                if (answerState === "answered") {
                  if (isCorrectOption) {
                    borderClasses = "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-600";
                  } else if (isSelected && !isCorrectOption) {
                    borderClasses = "border-rose-600 bg-rose-50/40 dark:bg-rose-950/30 ring-1 ring-rose-600";
                  }
                } else if (isSelected) {
                  borderClasses = "border-primary bg-primary/5 ring-1 ring-primary";
                }
              } else {
                if (isSelected) {
                  borderClasses = "border-primary bg-primary/10 ring-2 ring-primary/30";
                }
              }

              return (
                <div
                  key={key}
                  onClick={() => handleOptionClick(key as SelectedOption)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOptionClick(key as SelectedOption);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-3.5 rounded-xl border p-4 text-left transition-all relative overflow-hidden select-none",
                    borderClasses,
                    !answerState || answerState === "pending" || mode === "exam" ? "cursor-pointer active:scale-[0.995]" : "cursor-default"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={cn(
                        "h-7 w-7 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono font-semibold transition-colors",
                        mode === "tutor" && answerState === "answered" && isCorrectOption
                          ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                          : mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption
                            ? "bg-rose-600 text-white border-rose-600 font-bold"
                            : isSelected
                              ? "bg-primary text-primary-foreground border-primary font-bold"
                              : "border-border text-foreground/80"
                      )}
                    >
                      {key}
                    </span>

                    <span className="text-sm font-medium text-foreground leading-snug break-words">
                      {renderMathContent(value)}
                    </span>
                  </div>

                  {mode === "tutor" && answerState === "answered" && isCorrectOption && (
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                  )}
                  {mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Tutor Mode Examiner Diagnostic Breakdown (Post-Answer) */}
          {mode === "tutor" && answerState === "answered" && (
            <div className="mt-6 rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                {isCorrect ? (
                  <span className="text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" /> Correct Deduction
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> Cognitive Distractor Trap Triggered
                  </span>
                )}
              </div>

              {selectedOption && selectedOption !== current.correct_option && current.distractor_analysis?.[selectedOption] && (
                <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                    Examiner Trap Breakdown (Option {selectedOption}):
                  </span>
                  {renderMathContent(current.distractor_analysis[selectedOption])}
                </div>
              )}

              {current.explanation && (
                <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-foreground block mb-1">
                    Solution Derivation:
                  </span>
                  {renderMathContent(current.explanation)}
                </div>
              )}

              {current.misconception && (
                <div className="text-xs text-muted-foreground border-t border-border pt-3">
                  <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                    Common Exam-Setter Trap:
                  </span>
                  {current.misconception}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Official Sticky Bottom Action Dock                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="h-16 shrink-0 border-t border-border bg-card/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-30">
        {/* Left: Question Palette Button */}
        <button
          type="button"
          onClick={() => setShowPalette((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
        >
          <Grid className="h-3.5 w-3.5" />
          <span>Question {currentIndex + 1} of {total}</span>
        </button>

        {/* Center: Mark for Review Checkbox */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={flaggedQuestions.has(currentIndex)}
              onChange={handleToggleFlag}
              className="rounded border-border text-primary focus:ring-0 cursor-pointer h-3.5 w-3.5"
            />
            <Flag className={cn("h-3.5 w-3.5", flaggedQuestions.has(currentIndex) && "text-amber-500 fill-amber-500")} />
            <span className="hidden sm:inline">Mark for Review</span>
          </label>

          {flaggedQuestions.size > 0 && (
            <button
              type="button"
              onClick={() => setShowSectionReview(true)}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded cursor-pointer hover:bg-amber-500/20 transition-colors"
              title="Review Flagged Questions in Section Review"
            >
              <Flag className="h-2.5 w-2.5 fill-amber-500" />
              <span>{flaggedQuestions.size} flagged</span>
            </button>
          )}
        </div>

        {/* Right: Previous & Next Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-9 px-3 text-xs cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5 mr-1" />
            Previous
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={answerState === "answered" || (mode === "exam" && selectedOption) ? handleNext : handleSkipQuestion}
            className="h-9 px-5 text-xs font-semibold cursor-pointer shadow-xs"
          >
            <span>{currentIndex + 1 < total ? "Next Question" : "Review Section"}</span>
            <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      </footer>

      {/* Leave Session Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Practice Session?</DialogTitle>
            <DialogDescription>
              {answeredCount > 0
                ? `You've answered ${answeredCount} of ${total} questions. You can submit now to record your mastery, or discard this session.`
                : "You haven't answered any questions yet. Exiting will discard this session."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col gap-2 pt-2">
            {answeredCount > 0 && (
              <Button type="button" className="w-full" onClick={handleFinishEarly}>
                Submit & Review ({answeredCount} answered)
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              disabled={isDiscarding}
              className="w-full text-destructive hover:bg-destructive/10"
              onClick={handleDiscardSession}
            >
              {isDiscarding ? "Discarding..." : "Discard & Exit"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowExitDialog(false)}>
              Keep Practicing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
