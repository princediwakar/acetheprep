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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const optionBadgeStyles: Record<string, string> = {
  A: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  B: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  C: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  D: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
};

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
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "traps" | "correct">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

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

  useEffect(() => {
    return () => {
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    };
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
        // Non-blocking: telemetry failure does not interrupt the UX
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

  const handleReveal = useCallback(() => {
    if (answerState === "answered") return;
    setSelectedOption(null);
    lockInAnswer(null, false, true);
  }, [answerState, lockInAnswer]);

  const handleNext = useCallback(() => {
    if (mode === "exam") {
      if (!selectedOption) return;
      const correct = selectedOption === current.correct_option;
      lockInAnswer(selectedOption, correct, false);
    } else {
      if (!nextEnabled) return;
    }

    const next = currentIndex + 1;
    if (next < total) {
      setCurrentIndex(next);
      setSelectedOption(null);
      setAnswerState("pending");
      setIsCorrect(null);
      setIsRevealed(false);
      setNextEnabled(false);
      questionStartRef.current = Date.now();
    } else {
      setSessionComplete(true);
    }
  }, [mode, selectedOption, nextEnabled, currentIndex, total, current, lockInAnswer]);

  const handleSkipQuestion = useCallback(() => {
    if (mode !== "exam") return;
    lockInAnswer(null, false, false);
    const next = currentIndex + 1;
    if (next < total) {
      setCurrentIndex(next);
      setSelectedOption(null);
      setAnswerState("pending");
      setIsCorrect(null);
      setIsRevealed(false);
      setNextEnabled(false);
      questionStartRef.current = Date.now();
    } else {
      setSessionComplete(true);
    }
  }, [mode, currentIndex, total, lockInAnswer]);

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

  // Automated persistence: save session mastery immediately when test completes
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
        const errBody = await res.json().catch(() => ({ error: "Failed to start session" }));
        throw new Error(errBody.error || "Failed to start session");
      }

      const json = await res.json();
      router.push(TUTOR_ROUTES.SESSION(json.session_id));
    } catch (err: any) {
      toast.error(err.message || "Failed to start next topic");
      setStartingNext(false);
    }
  }, [nextDomain, examProfileId, router]);

  const toggleQuestionExpand = useCallback((qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  }, []);

  const trapsCaughtCount = useMemo(() => {
    let count = 0;
    for (const q of questions) {
      const attempt = userAttempts[q.question_id];
      if (attempt?.selected && !attempt.isCorrect && q.distractor_analysis?.[attempt.selected]) {
        count++;
      }
    }
    return count;
  }, [questions, userAttempts]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const attempt = userAttempts[q.question_id];
      if (reviewFilter === "all") return true;
      if (reviewFilter === "correct") return attempt?.isCorrect;
      if (reviewFilter === "incorrect") return attempt ? !attempt.isCorrect : true;
      if (reviewFilter === "traps") {
        return attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
      }
      return true;
    });
  }, [questions, userAttempts, reviewFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStartTest();
        }
        return;
      }
      if (mode === "tutor") {
        if (answerState === "answered") {
          if (e.key === "Enter" && nextEnabled) {
            e.preventDefault();
            handleNext();
          }
          return;
        }
        const key = e.key.toUpperCase();
        if (OPTION_LETTERS.includes(key as SelectedOption)) {
          e.preventDefault();
          handleOptionClick(key as SelectedOption);
        }
      } else {
        // Exam Mode
        const key = e.key.toUpperCase();
        if (OPTION_LETTERS.includes(key as SelectedOption)) {
          e.preventDefault();
          handleOptionClick(key as SelectedOption);
        } else if (e.key === "Enter" && selectedOption) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, mode, answerState, nextEnabled, selectedOption, handleNext, handleOptionClick, handleStartTest]);

  if (!questions.length) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">No Questions Available</h2>
        <p className="text-muted-foreground mb-4">
          This session has no questions. It may not have been generated correctly.
        </p>
        <Button onClick={handleBackToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Pre-Test Briefing Cockpit (Simplified, Interactive Mode Switcher)
  if (!hasStarted) {
    const primaryDomain = questions[0]?.skill_domain || "Practice Session";
    const estimatedMinutes = Math.max(10, Math.round(questions.length * 1.5));

    return (
      <div className="max-w-lg mx-auto px-4 py-16 sm:py-24 animate-in fade-in-50 duration-300">
        <div className="border rounded-2xl bg-card p-6 sm:p-8 text-center space-y-6 shadow-sm">
          {/* Metadata Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {examName && (
              <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold text-primary border-primary/30 bg-primary/10">
                {examName}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs font-medium">
              {primaryDomain}
            </Badge>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {primaryDomain}
            </h1>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="space-y-3">
            <div className="inline-flex items-center p-1 bg-muted/80 rounded-xl border border-border/60 mx-auto shadow-inner">
              <button
                type="button"
                onClick={() => setMode("exam")}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                  mode === "exam"
                    ? "bg-card text-foreground shadow-sm ring-1 ring-border/50"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Timer className={cn("w-3.5 h-3.5", mode === "exam" ? "text-primary" : "text-muted-foreground")} />
                Exam Mode
              </button>
              <button
                type="button"
                onClick={() => setMode("tutor")}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                  mode === "tutor"
                    ? "bg-card text-foreground shadow-sm ring-1 ring-border/50"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <GraduationCap className={cn("w-3.5 h-3.5", mode === "tutor" ? "text-primary" : "text-muted-foreground")} />
                Tutor Drill
              </button>
            </div>

            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {questions.length} Questions · ~{estimatedMinutes} mins ·{" "}
              {mode === "exam"
                ? "Timed simulation. Zero spoilers mid-test; full question breakdown & solutions at the end."
                : "Learning drill. Immediate feedback and step-by-step explanations after each question."}
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-1 space-y-3">
            <Button
              size="lg"
              onClick={handleStartTest}
              className="w-full h-12 text-base font-bold shadow-sm hover:shadow transition-all"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Begin {mode === "exam" ? "Exam Simulation" : "Tutor Drill"}
            </Button>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono font-bold text-foreground">Enter ↵</kbd> to begin</span>
              <span>·</span>
              <button
                type="button"
                onClick={handleBackToDashboard}
                className="hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Session Complete (Post-Exam Review Screen) ---
  if (sessionComplete) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const incorrectCount = total - score;

    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-300">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isReviewMode ? "Session Review" : "Session Complete"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isReviewMode
              ? "Review your questions, cognitive traps, and detailed solution derivations."
              : `${mode === "exam" ? "Exam Simulation submitted." : "Tutor Drill finished."} Review your cognitive performance below.`}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold">{score}/{total}</div>
            <div className="text-xs text-muted-foreground mt-1">Score</div>
          </div>
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold">{pct}%</div>
            <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
          </div>
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold">
              {totalTimeElapsed < 60
                ? `${totalTimeElapsed}s`
                : `${Math.floor(totalTimeElapsed / 60)}m ${totalTimeElapsed % 60}s`}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total Time</div>
          </div>
          <div className="bg-card border rounded-xl p-4 shadow-sm border-amber-500/20 bg-amber-500/5">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{trapsCaughtCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Traps Caught</div>
          </div>
        </div>

        {/* Top Completion & Action Bar */}
        {completing && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm animate-pulse">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-semibold text-primary">Calibrating SuperMemo-2 mastery and updating readiness...</span>
          </div>
        )}

        {!completing && !completeResult && !isReviewMode && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <span className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300">
              Session completed. Finalizing calibration...
            </span>
            <Button size="sm" onClick={handleComplete} disabled={completing} className="font-bold">
              Save & Calibrate Mastery
            </Button>
          </div>
        )}

        {/* Readiness updates */}
        {completeResult && (
          <div className="space-y-3 border rounded-xl p-4 bg-muted/20">
            {typeof completeResult.readiness_index === "number" && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Readiness Index</span>
                <span className="font-bold text-primary">{completeResult.readiness_index}%</span>
              </div>
            )}
            {completeResult.mastery_updates && completeResult.mastery_updates.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-border/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mastery Updates</span>
                {completeResult.mastery_updates.map((m) => (
                  <div key={m.skill_domain} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{m.skill_domain}</span>
                    <span className="font-semibold">{Math.round(m.mastery_score * 100)}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Top Primary Actions */}
        {(completeResult || isReviewMode) && (
          <div className="grid gap-3 sm:grid-cols-2 pt-1">
            {nextDomain ? (
              <Button
                className="w-full text-base py-5 font-bold shadow-sm"
                size="lg"
                onClick={handleStartNextTopic}
                disabled={startingNext}
              >
                {startingNext ? "Starting..." : `Practice Next Topic: ${nextDomain}`}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            ) : isReviewMode ? (
              <Button
                className="w-full text-base py-5 font-bold shadow-sm"
                size="lg"
                onClick={() => router.push("/analytics")}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Analytics
              </Button>
            ) : null}
            <Button
              className="w-full text-base py-5 font-semibold"
              size="lg"
              variant={nextDomain || isReviewMode ? "outline" : "default"}
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
          </div>
        )}

        {/* Interactive Post-Exam Deconstruction Matrix */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Question Breakdown & Solutions
              </h2>
              <p className="text-xs text-muted-foreground">Review your mistakes and step-by-step explanations.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-muted/70 p-1 rounded-lg text-xs self-start">
              <button
                type="button"
                onClick={() => setReviewFilter("all")}
                className={cn("px-2.5 py-1 rounded-md font-semibold transition-all", reviewFilter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                All ({total})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("incorrect")}
                className={cn("px-2.5 py-1 rounded-md font-semibold transition-all", reviewFilter === "incorrect" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                Mistakes ({incorrectCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("traps")}
                className={cn("px-2.5 py-1 rounded-md font-semibold transition-all", reviewFilter === "traps" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                Traps ({trapsCaughtCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("correct")}
                className={cn("px-2.5 py-1 rounded-md font-semibold transition-all", reviewFilter === "correct" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                Correct ({score})
              </button>
            </div>
          </div>

          {/* Quick Jump Question Matrix */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Question Navigation Grid</span>
              <span className="text-[11px] font-normal lowercase text-muted-foreground">Jump directly to question autopsy</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((q, idx) => {
                const attempt = userAttempts[q.question_id];
                const isTrap = attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
                const isCorrect = attempt?.isCorrect;
                return (
                  <button
                    key={q.question_id}
                    type="button"
                    onClick={() => {
                      setExpandedQuestions((prev) => ({ ...prev, [q.question_id]: true }));
                      const el = document.getElementById(`question-card-${q.question_id}`);
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={cn(
                      "w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center border",
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
                        : isTrap
                        ? "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 ring-1 ring-amber-500/30"
                        : attempt
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    )}
                    title={`Question ${idx + 1}: ${isCorrect ? "Correct" : isTrap ? "Trap Triggered" : "Incorrect"}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const attempt = userAttempts[q.question_id];
              const isTrap = attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
              const isExpanded = expandedQuestions[q.question_id] ?? true;

              return (
                <div
                  key={q.question_id}
                  id={`question-card-${q.question_id}`}
                  className="border rounded-xl bg-card p-4 sm:p-5 space-y-4 shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleQuestionExpand(q.question_id)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground">Question {questions.indexOf(q) + 1}</span>
                      <Badge variant="outline" className="text-xs">{q.skill_domain}</Badge>
                      {attempt?.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : isTrap ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" /> Trap Triggered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <button type="button" className="text-muted-foreground hover:text-foreground">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t">
                      <div className="text-sm font-medium leading-relaxed text-foreground">
                        {renderMathContent(q.question_text)}
                      </div>

                      {/* Options Grid */}
                      <div className="grid gap-2">
                        {OPTION_LETTERS.filter((k) => k in q.options).map((key) => {
                          const isUserChoice = attempt?.selected === key;
                          const isCorrectChoice = key === q.correct_option;

                          let optionClass = "border-border bg-background/50 text-muted-foreground";
                          if (isCorrectChoice) {
                            optionClass = "border-emerald-500 bg-emerald-500/10 text-foreground font-medium";
                          } else if (isUserChoice && !isCorrectChoice) {
                            optionClass = "border-rose-500 bg-rose-500/10 text-foreground font-medium";
                          }

                          return (
                            <div key={key} className={cn("p-3 rounded-lg border text-sm flex items-start gap-3", optionClass)}>
                              <span className={cn(
                                "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold",
                                isCorrectChoice ? "bg-emerald-500 text-white border-emerald-500" : isUserChoice ? "bg-rose-500 text-white border-rose-500" : optionBadgeStyles[key]
                              )}>
                                {key}
                              </span>
                              <div className="flex-1 break-words pt-0.5">{renderMathContent(q.options[key])}</div>
                              {isCorrectChoice && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 self-center">Correct Answer</span>}
                              {isUserChoice && !isCorrectChoice && <span className="text-xs font-bold text-rose-600 dark:text-rose-400 self-center">Your Answer</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Deconstruction Box */}
                      {attempt?.selected && !attempt.isCorrect && q.distractor_analysis?.[attempt.selected] && (
                        <div className="rounded-lg p-3.5 bg-amber-500/10 border border-amber-500/25 space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" /> Deconstruction of Your Choice (Option {attempt.selected})
                          </h4>
                          <p className="text-xs text-foreground/90 leading-relaxed">
                            {renderMathContent(q.distractor_analysis[attempt.selected])}
                          </p>
                        </div>
                      )}

                      {q.explanation && (
                        <div className="rounded-lg p-3.5 bg-muted/40 border space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Solution Derivation</h4>
                          <div className="text-xs text-foreground/90 leading-relaxed">{renderMathContent(q.explanation)}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Complete / Actions Bar */}
        <div className="pt-4 border-t space-y-3">
          {isReviewMode ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                className="w-full text-base py-5"
                size="lg"
                onClick={() => router.push("/analytics")}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Analytics
              </Button>
              <Button
                className="w-full text-base py-5"
                size="lg"
                variant="outline"
                onClick={handleBackToDashboard}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : !completeResult ? (
            <Button className="w-full text-base py-6 font-bold" size="lg" onClick={handleComplete} disabled={completing}>
              {completing ? "Recording mastery..." : "Complete & Save Session"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {nextDomain && (
                <Button className="w-full text-base py-5" size="lg" onClick={handleStartNextTopic} disabled={startingNext}>
                  {startingNext ? "Starting..." : `Practice Next Topic: ${nextDomain}`}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button
                className="w-full text-base py-5"
                size="lg"
                variant={nextDomain ? "outline" : "default"}
                onClick={handleBackToDashboard}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Active Question Screen ---
  const optionEntries = OPTION_LETTERS.filter((key) => key in current.options).map((key) => ({
    key,
    value: current.options[key],
  }));

  const correctLetter = current.correct_option;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header: Progress & Mode Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              Question {currentIndex + 1} <span className="text-muted-foreground font-normal">of {total}</span>
            </span>
            <Badge variant="outline" className="text-xs">{current.skill_domain}</Badge>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Ambient Mode Status Chip */}
            <span
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 shadow-sm",
                mode === "exam"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted/80 text-foreground border-border"
              )}
            >
              {mode === "exam" ? (
                <>
                  <Timer className="w-3.5 h-3.5 text-primary" />
                  Exam Mode
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  Tutor Drill
                </>
              )}
            </span>

            {/* Session Elapsed Stopwatch */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground tabular-nums bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
              <Clock className="w-3.5 h-3.5" />
              {totalTimeElapsed < 60
                ? `${totalTimeElapsed}s`
                : `${Math.floor(totalTimeElapsed / 60)}m ${totalTimeElapsed % 60}s`}
            </div>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <div className="text-lg font-medium leading-relaxed text-foreground">
        {renderMathContent(current.question_text)}
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {optionEntries.map(({ key, value }) => {
          const isSelected = selectedOption === key;
          const isCorrectOption = key === correctLetter;

          let borderClass = "border-border";
          let bgClass = "";

          if (mode === "tutor") {
            if (answerState === "answered") {
              if (isCorrectOption) {
                borderClass = "border-green-500";
                bgClass = "bg-green-500/10";
              } else if (isSelected && !isCorrectOption) {
                borderClass = "border-red-500";
                bgClass = "bg-red-500/10";
              } else {
                bgClass = "opacity-50";
              }
            }
          } else {
            // Exam Mode: Neutral clean highlight, ZERO green/red spoilers
            if (isSelected) {
              borderClass = "border-primary ring-2 ring-primary/20 bg-primary/10";
            }
          }

          return (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              disabled={mode === "tutor" && answerState === "answered"}
              className={cn(
                "w-full flex items-start gap-3 rounded-lg border p-4 text-left transition-all duration-150 text-foreground",
                borderClass,
                bgClass,
                (mode === "exam" || answerState === "pending") &&
                  "hover:border-primary/50 hover:bg-accent/50 active:scale-[0.99]",
                mode === "tutor" && answerState === "answered" && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm font-semibold",
                  optionBadgeStyles[key],
                  mode === "tutor" && answerState === "answered" && isCorrectOption && "bg-green-500 text-white border-green-500",
                  mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption && "bg-red-500 text-white border-red-500",
                  mode === "exam" && isSelected && "bg-primary text-primary-foreground border-primary"
                )}
              >
                {key}
              </span>
              <span className="break-words pt-0.5">{renderMathContent(value)}</span>
              {mode === "tutor" && answerState === "answered" && isCorrectOption && (
                <CheckCircle className="flex-shrink-0 ml-auto h-5 w-5 text-green-600 dark:text-green-400" />
              )}
              {mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption && (
                <XCircle className="flex-shrink-0 ml-auto h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Exam Mode Bottom Controls */}
      {mode === "exam" && (
        <div className="flex items-center justify-between gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSkipQuestion}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Skip Question
          </Button>
          <div className="flex items-center gap-3">
            {selectedOption && (
              <span className="hidden sm:inline text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono font-bold text-foreground">Enter ↵</kbd>
              </span>
            )}
            <Button
              type="button"
              size="lg"
              disabled={!selectedOption}
              onClick={handleNext}
              className="font-semibold px-6 h-11"
            >
              {currentIndex + 1 < total ? "Next Question" : "Submit Exam"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Tutor Reveal Helper */}
      {answerState === "pending" && mode === "tutor" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReveal}
          className="text-muted-foreground"
        >
          <Eye className="mr-1.5 h-4 w-4" />
          Reveal Answer
        </Button>
      )}

      {/* Tutor Answer Feedback Card */}
      {mode === "tutor" && answerState === "answered" && (
        <div className="space-y-4 border rounded-xl p-5 bg-card shadow-sm animate-in fade-in duration-200">
          <div>
            {isRevealed ? (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                <Eye className="h-4 w-4" />
                Answer Revealed
              </div>
            ) : isCorrect ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm">
                <CheckCircle className="h-4 w-4" />
                Correct
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
                <XCircle className="h-4 w-4" />
                Incorrect
              </div>
            )}
          </div>

          {selectedOption && current.distractor_analysis?.[selectedOption] && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Explanation
              </h4>
              <div className="text-sm text-foreground/90 leading-relaxed">
                {renderMathContent(current.distractor_analysis[selectedOption])}
              </div>
            </div>
          )}

          {isCorrect && !isRevealed && current.misconception && (
            <div className="border-t pt-3 mt-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">
                Common Trap
              </h4>
              <div className="text-sm text-foreground/90 leading-relaxed">
                {current.misconception}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={handleNext}
              size="lg"
            >
              {currentIndex + 1 < total
                ? "Next Question"
                : "Submit & View Solutions"}
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
