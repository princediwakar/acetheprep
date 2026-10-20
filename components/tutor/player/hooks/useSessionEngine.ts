// Path: components/tutor/player/hooks/useSessionEngine.ts
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { toast } from "sonner";
import { discardSessionAction } from "@/lib/actions/tutor";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";
import type { QuestionAttemptRecord } from "@/components/tutor/SessionPlayer";
import { useSessionTimer } from "./useSessionTimer";

interface UseSessionEngineProps {
  sessionId: string;
  questions: SessionQuestion[];
  examProfileId: string;
  taxonomyDomains?: string[];
  initialMastery?: Record<string, number>;
  initialMode?: "tutor" | "exam";
  isReviewMode?: boolean;
  initialUserAttempts?: Record<string, QuestionAttemptRecord>;
  initialScore?: number;
  initialTimeElapsed?: number;
  initialIndex?: number;
  autoStart?: boolean;
}

export function useSessionEngine({
  sessionId,
  questions,
  examProfileId,
  taxonomyDomains,
  initialMastery,
  initialMode = "tutor",
  isReviewMode = false,
  initialUserAttempts,
  initialScore,
  initialTimeElapsed,
  initialIndex = 0,
  autoStart = false,
}: UseSessionEngineProps) {
  const router = useRouter();

  const [mode] = useState<"tutor" | "exam">(initialMode);
  const [hasStarted, setHasStarted] = useState(isReviewMode || initialIndex > 0 || Boolean(autoStart));
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);
  const [answerState, setAnswerState] = useState<"pending" | "answered">("pending");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [, setIsRevealed] = useState(false);
  const [score, setScore] = useState(initialScore ?? 0);
  const [, setNextEnabled] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(isReviewMode);
  const [completing, setCompleting] = useState(false);
  const [startingNext, setStartingNext] = useState(false);
  const [completeResult, setCompleteResult] = useState<{
    readiness_index?: number;
    mastery_updates?: { skill_domain: string; mastery_score: number }[];
    share_token?: string;
  } | null>(null);

  const [userAttempts, setUserAttempts] = useState<Record<string, QuestionAttemptRecord>>(
    initialUserAttempts || {},
  );
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [showSectionReview, setShowSectionReview] = useState(false);

  // Test-day tools
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showTimer, setShowTimer] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const answeredCount = useMemo(() => Object.keys(userAttempts).length, [userAttempts]);
  const submittingRef = useRef(false);

  const total = questions.length;
  const current = questions[currentIndex];

  const {
    totalTimeElapsed,
    resetTimer,
    markQuestionStart,
    getQuestionDurationMs,
  } = useSessionTimer({
    hasStarted,
    sessionComplete,
    initialTimeElapsed,
  });

  const handleStartTest = useCallback(() => {
    resetTimer();
    setHasStarted(true);
  }, [resetTimer]);

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

  // Esc keyboard shortcut to close modals
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
    [sessionId, current?.question_id],
  );

  const lockInAnswer = useCallback(
    (option: SelectedOption | null, correct: boolean, revealed: boolean) => {
      setAnswerState("answered");
      setIsCorrect(correct);
      setIsRevealed(revealed);
      const timeMs = getQuestionDurationMs();
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
    [recordAnswer, current?.question_id, getQuestionDurationMs],
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
    [mode, answerState, current, lockInAnswer],
  );

  // Single helper to hydrate question state when navigating
  const loadQuestionAt = useCallback(
    (targetIndex: number) => {
      setCurrentIndex(targetIndex);
      const attempt = userAttempts[questions[targetIndex].question_id];
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
      markQuestionStart();
    },
    [userAttempts, questions, markQuestionStart],
  );

  const handleSkipQuestion = useCallback(() => {
    const next = currentIndex + 1;
    if (next < total) {
      loadQuestionAt(next);
    } else {
      setShowSectionReview(true);
    }
  }, [currentIndex, total, loadQuestionAt]);

  const handleNext = useCallback(() => {
    if (mode === "exam" && selectedOption) {
      const correct = selectedOption === current.correct_option;
      lockInAnswer(selectedOption, correct, false);
    }

    const next = currentIndex + 1;
    if (next < total) {
      loadQuestionAt(next);
    } else {
      setShowSectionReview(true);
    }
  }, [mode, selectedOption, current, lockInAnswer, currentIndex, total, loadQuestionAt]);

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) return;
    loadQuestionAt(currentIndex - 1);
  }, [currentIndex, loadQuestionAt]);

  const handleJumpToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setShowPalette(false);
      setShowSectionReview(false);
      loadQuestionAt(index);
    },
    [total, loadQuestionAt],
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

  return {
    mode,
    hasStarted,
    currentIndex,
    current,
    total,
    selectedOption,
    answerState,
    isCorrect,
    score,
    sessionComplete,
    setSessionComplete,
    completing,
    startingNext,
    completeResult,
    userAttempts,
    answeredCount,
    totalTimeElapsed,
    showExitDialog,
    setShowExitDialog,
    isDiscarding,
    showSectionReview,
    setShowSectionReview,
    flaggedQuestions,
    showTimer,
    setShowTimer,
    showCalculator,
    setShowCalculator,
    showPalette,
    setShowPalette,
    nextDomain,
    handleStartTest,
    handleDiscardSession,
    handleFinishEarly,
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSkipQuestion,
    handleJumpToQuestion,
    handleToggleFlag,
    handleBackToDashboard,
    handleStartNextTopic,
  };
}
