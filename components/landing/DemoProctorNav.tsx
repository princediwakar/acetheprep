// Path: components/landing/DemoProctorNav.tsx
"use client";

import { Clock, Calculator, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXAM_MODULE_NAMES, EXAM_TOOLS_CONFIG } from "./demo-data";

interface DemoProctorNavProps {
  exam: string;
  showTimer: boolean;
  timerSeconds: number;
  isPaused?: boolean;
  strikethroughMode: boolean;
  isMarkedForReview: boolean;
  onToggleTimer: () => void;
  onOpenDesmos: () => void;
  onOpenFormulaSheet: () => void;
  onToggleStrikethrough: () => void;
  onToggleMarkForReview: (checked: boolean) => void;
  formatTimer: (secs: number) => string;
}

export function DemoProctorNav({
  exam,
  showTimer,
  timerSeconds,
  isPaused,
  strikethroughMode,
  isMarkedForReview,
  onToggleTimer,
  onOpenDesmos,
  onOpenFormulaSheet,
  onToggleStrikethrough,
  onToggleMarkForReview,
  formatTimer,
}: DemoProctorNavProps) {
  const tools = EXAM_TOOLS_CONFIG[exam] ?? {
    hasCalculator: true,
    calculatorLabel: "Calculator",
    hasReferenceSheet: false,
  };

  return (
    <div className="bg-secondary/40 border-b border-border px-4 py-2.5 sm:px-6 sm:py-3 flex flex-wrap items-center justify-between gap-3 transition-colors">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">
          {EXAM_MODULE_NAMES[exam] || `${exam} • Official Section Simulator`}
        </span>
      </div>

      <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1 rounded-md border border-border">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        {showTimer ? (
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-foreground">
            {formatTimer(timerSeconds)}
          </span>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">Timer Hidden</span>
        )}
        {isPaused && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded font-semibold">
            Paused
          </span>
        )}
        <button
          type="button"
          onClick={onToggleTimer}
          className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline ml-1 cursor-pointer"
        >
          {showTimer ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {tools.hasCalculator && (
          <button
            type="button"
            onClick={onOpenDesmos}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-card hover:bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors cursor-pointer"
            title={`Open ${tools.calculatorLabel || "Calculator"}`}
          >
            <Calculator className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">{tools.calculatorLabel || "Calculator"}</span>
          </button>
        )}

        {tools.hasReferenceSheet && (
          <button
            type="button"
            onClick={onOpenFormulaSheet}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-card hover:bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors cursor-pointer"
            title="Open Geometry & Math Formula Sheet"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Reference</span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleStrikethrough}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
            strikethroughMode
              ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 font-bold shadow-xs"
              : "border-border/80 bg-card hover:bg-secondary text-foreground",
          )}
          title="Eliminate Answers (Alt+X) - Click options to cross them out"
        >
          <span className="font-mono font-bold line-through text-rose-600 dark:text-rose-400">ABC</span>
          <span className="hidden sm:inline">
            {strikethroughMode ? "Eliminating" : "Eliminate"}
          </span>
        </button>

        <label className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer pl-1 select-none">
          <input
            type="checkbox"
            checked={isMarkedForReview}
            onChange={(e) => onToggleMarkForReview(e.target.checked)}
            className="rounded border-zinc-400 text-primary focus:ring-0 cursor-pointer h-3.5 w-3.5"
          />
          <span className="hidden md:inline">Mark for Review</span>
        </label>
      </div>
    </div>
  );
}
