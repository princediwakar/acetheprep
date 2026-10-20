// Path: components/tutor/player/SessionPaletteModal.tsx
"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionQuestion } from "@/types/tutor";
import type { QuestionAttemptRecord } from "../SessionPlayer";

interface SessionPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  currentIndex: number;
  questions: SessionQuestion[];
  userAttempts: Record<string, QuestionAttemptRecord>;
  flaggedQuestions: Set<number>;
  onJumpToQuestion: (index: number) => void;
  onOpenSectionReview: () => void;
}

export function SessionPaletteModal({
  isOpen,
  onClose,
  total,
  currentIndex,
  questions,
  userAttempts,
  flaggedQuestions,
  onJumpToQuestion,
  onOpenSectionReview,
}: SessionPaletteModalProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
            onClose();
            onOpenSectionReview();
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
                onClick={() => onJumpToQuestion(idx)}
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
  );
}
