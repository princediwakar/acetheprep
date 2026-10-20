// Path: components/tutor/player/SessionActionDock.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import type { SelectedOption } from "@/types/tutor";

interface SessionActionDockProps {
  currentIndex: number;
  total: number;
  flaggedQuestions: Set<number>;
  answerState: "pending" | "answered";
  selectedOption: SelectedOption | null;
  mode: "tutor" | "exam";
  onTogglePalette: () => void;
  onToggleFlag: () => void;
  onOpenSectionReview: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function SessionActionDock({
  currentIndex,
  total,
  flaggedQuestions,
  answerState,
  selectedOption,
  mode,
  onTogglePalette,
  onToggleFlag,
  onOpenSectionReview,
  onPrev,
  onNext,
  onSkip,
}: SessionActionDockProps) {
  const isFlagged = flaggedQuestions.has(currentIndex);

  return (
    <footer className="h-16 shrink-0 border-t border-border bg-card/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-30">
      {/* Left: Question Palette Button */}
      <button
        type="button"
        onClick={onTogglePalette}
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
            checked={isFlagged}
            onChange={onToggleFlag}
            className="rounded border-border text-primary focus:ring-0 cursor-pointer h-3.5 w-3.5"
          />
          <Flag className={cn("h-3.5 w-3.5", isFlagged && "text-amber-500 fill-amber-500")} />
          <span className="hidden sm:inline">Mark for Review</span>
        </label>

        {flaggedQuestions.size > 0 && (
          <button
            type="button"
            onClick={onOpenSectionReview}
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
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-9 px-3 text-xs cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-1" />
          Previous
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={answerState === "answered" || (mode === "exam" && selectedOption) ? onNext : onSkip}
          className="h-9 px-5 text-xs font-semibold cursor-pointer shadow-xs"
        >
          <span>{currentIndex + 1 < total ? "Next Question" : "Review Section"}</span>
          <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </div>
    </footer>
  );
}
