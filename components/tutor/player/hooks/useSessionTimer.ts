// Path: components/tutor/player/hooks/useSessionTimer.ts
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSessionTimerProps {
  hasStarted: boolean;
  sessionComplete: boolean;
  initialTimeElapsed?: number;
}

export function useSessionTimer({
  hasStarted,
  sessionComplete,
  initialTimeElapsed = 0,
}: UseSessionTimerProps) {
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(initialTimeElapsed);
  const timerStartRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    timerStartRef.current = Date.now();
    questionStartRef.current = Date.now();
    setTotalTimeElapsed(0);
  }, []);

  const markQuestionStart = useCallback(() => {
    questionStartRef.current = Date.now();
  }, []);

  const getQuestionDurationMs = useCallback(() => {
    return Date.now() - questionStartRef.current;
  }, []);

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

  return {
    totalTimeElapsed,
    resetTimer,
    markQuestionStart,
    getQuestionDurationMs,
  };
}
