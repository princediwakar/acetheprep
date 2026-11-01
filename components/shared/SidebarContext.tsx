"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export interface SidebarTelemetry {
  examName: string;
  daysRemaining: number;
  streak: number;
  dueMistakesCount?: number;
  isPro?: boolean;
}

interface SidebarContextValue {
  sidebarData: SidebarTelemetry | null;
  setSidebarData: (
    data:
      | SidebarTelemetry
      | null
      | ((prev: SidebarTelemetry | null) => SidebarTelemetry | null)
  ) => void;
  updateMistakesCount: (delta: number) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({
  children,
  initialData = null,
}: {
  children: React.ReactNode;
  initialData?: SidebarTelemetry | null;
}) {
  const [sidebarData, setSidebarDataInternal] = useState<SidebarTelemetry | null>(initialData);

  const setSidebarData = useCallback(
    (
      nextOrUpdater:
        | SidebarTelemetry
        | null
        | ((prev: SidebarTelemetry | null) => SidebarTelemetry | null)
    ) => {
      setSidebarDataInternal((prev) => {
        const next = typeof nextOrUpdater === "function" ? nextOrUpdater(prev) : nextOrUpdater;
        if (!prev && !next) return null;
        if (
          prev &&
          next &&
          prev.examName === next.examName &&
          prev.daysRemaining === next.daysRemaining &&
          prev.streak === next.streak &&
          (prev.dueMistakesCount || 0) === (next.dueMistakesCount || 0) &&
          Boolean(prev.isPro) === Boolean(next.isPro)
        ) {
          return prev; // Bail out: identical fields, no re-render
        }
        return next;
      });
    },
    []
  );

  const updateMistakesCount = useCallback((delta: number) => {
    setSidebarDataInternal((prev) => {
      if (!prev) return prev;
      const current = prev.dueMistakesCount || 0;
      const nextCount = Math.max(0, current + delta);
      if (nextCount === current) return prev;
      return {
        ...prev,
        dueMistakesCount: nextCount,
      };
    });
  }, []);

  const value = useMemo(
    () => ({ sidebarData, setSidebarData, updateMistakesCount }),
    [sidebarData, setSidebarData, updateMistakesCount]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarTelemetry() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    return {
      sidebarData: null,
      setSidebarData: () => {},
      updateMistakesCount: () => {},
    };
  }
  return ctx;
}

/**
 * Hook for pages to sync their server-fetched telemetry into the shell without client network calls.
 * Uses primitive dependencies and shallow equality bailout to prevent infinite re-render loops.
 */
export function useSyncSidebarData(data?: SidebarTelemetry | null) {
  const ctx = useContext(SidebarContext);

  const examName = data?.examName;
  const daysRemaining = data?.daysRemaining;
  const streak = data?.streak;
  const dueMistakesCount = data?.dueMistakesCount;
  const isPro = data?.isPro;

  useEffect(() => {
    if (!ctx || !data) return;
    ctx.setSidebarData({
      examName: examName || "",
      daysRemaining: daysRemaining ?? 0,
      streak: streak ?? 0,
      dueMistakesCount,
      isPro,
    });
  }, [ctx, examName, daysRemaining, streak, dueMistakesCount, isPro]);
}
