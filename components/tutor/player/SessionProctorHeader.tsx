// Path: components/tutor/player/SessionProctorHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import { cn } from "@/lib/utils";
import { Clock, Calculator, LogOut } from "lucide-react";

interface SessionProctorHeaderProps {
  examName?: string;
  skillDomain: string;
  mode: "tutor" | "exam";
  showTimer: boolean;
  totalTimeElapsed: number;
  showCalculator: boolean;
  onToggleTimer: () => void;
  onToggleCalculator: () => void;
  onEndTest: () => void;
  formatTime: (seconds: number) => string;
}

export function SessionProctorHeader({
  examName,
  skillDomain,
  mode,
  showTimer,
  totalTimeElapsed,
  showCalculator,
  onToggleTimer,
  onToggleCalculator,
  onEndTest,
  formatTime,
}: SessionProctorHeaderProps) {
  return (
    <header className="h-14 shrink-0 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between z-30 transition-colors">
      {/* Left: Module Designation & Mode */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-xs sm:text-sm tracking-wide text-foreground">
          {examName || "Exam Practice"} &middot; {skillDomain}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
          {mode === "exam" ? "Test Mode" : "Study Mode"}
        </span>
      </div>

      {/* Center: Countdown / Stopwatch */}
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
          onClick={onToggleTimer}
          className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline ml-1 cursor-pointer"
        >
          {showTimer ? "Hide" : "Show"}
        </button>
      </div>

      {/* Right: Essential Tools & Exit */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleCalculator}
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
          onClick={onEndTest}
          className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5 mr-1" />
          <span className="hidden sm:inline">End Test</span>
        </Button>
      </div>
    </header>
  );
}
