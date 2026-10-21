// Path: components/tutor/player/SessionSectionReview.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import { cn } from "@/lib/utils";
import { Clock, Flag, AlertTriangle, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { SessionQuestion } from "@/types/tutor";
import type { QuestionAttemptRecord } from "../SessionPlayer";

interface SessionSectionReviewProps {
  examName?: string;
  currentIndex: number;
  total: number;
  questions: SessionQuestion[];
  userAttempts: Record<string, QuestionAttemptRecord>;
  flaggedQuestions: Set<number>;
  totalTimeElapsed: number;
  showTimer: boolean;
  reviewedEditedQuestionIds?: Set<string>;
  reviewedEditedCount?: number;
  onReturnToCurrent: () => void;
  onJumpToQuestion: (index: number) => void;
  onSubmitFinal: () => void;
  formatTime: (sec: number) => string;
}

export function SessionSectionReview({
  examName,
  currentIndex,
  total,
  questions,
  userAttempts,
  flaggedQuestions,
  totalTimeElapsed,
  showTimer,
  reviewedEditedQuestionIds,
  reviewedEditedCount = 0,
  onReturnToCurrent,
  onJumpToQuestion,
  onSubmitFinal,
  formatTime,
}: SessionSectionReviewProps) {
  const isGMAT = Boolean(examName && /gmat/i.test(examName));
  const answeredCount = Object.keys(userAttempts).length;
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
            onClick={onReturnToCurrent}
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

          {/* GMAT Focus Official Review Edit Limit Notice */}
          {isGMAT && (
            <div
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 py-3 rounded-xl border text-xs shadow-xs transition-colors",
                reviewedEditedCount >= 3
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200"
                  : "bg-primary/5 border-primary/20 text-foreground",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-semibold uppercase tracking-wider text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-mono shrink-0">
                  Official GMAT Focus Rule
                </span>
                <span>
                  You may review all items. You may change answers for up to <strong>3 questions</strong> per section.
                </span>
              </div>
              <div className="font-mono font-bold shrink-0 self-end sm:self-auto text-xs bg-card px-2.5 py-1 rounded-md border border-border">
                {reviewedEditedCount} / 3 Edits Used
              </div>
            </div>
          )}

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

            <div
              className={cn(
                "rounded-xl border p-3.5 text-center shadow-xs transition-colors",
                unAnsweredCount > 0
                  ? "border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900/50"
                  : "border-border bg-card",
              )}
            >
              <div
                className={cn(
                  "font-mono text-2xl font-bold",
                  unAnsweredCount > 0 ? "text-rose-600 dark:text-rose-400" : "text-foreground",
                )}
              >
                {unAnsweredCount}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Unanswered</div>
            </div>

            <div
              className={cn(
                "rounded-xl border p-3.5 text-center shadow-xs transition-colors",
                flaggedCount > 0
                  ? "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/50"
                  : "border-border bg-card",
              )}
            >
              <div
                className={cn(
                  "font-mono text-2xl font-bold flex items-center justify-center gap-1.5",
                  flaggedCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground",
                )}
              >
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
                    onJumpToQuestion(firstFlagged);
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
                    onJumpToQuestion(firstUnanswered);
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
                    onClick={() => onJumpToQuestion(idx)}
                    className={cn(
                      "group p-3.5 rounded-xl border bg-card hover:border-primary/60 transition-all cursor-pointer flex items-center justify-between shadow-xs",
                      isFlagged && "ring-1 ring-amber-500/50 bg-amber-50/20 dark:bg-amber-950/10",
                      !isAnswered && "border-dashed border-border/90",
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
                          {isAnswered
                            ? `Answered: Option ${attempt?.selected || "None"}`
                            : "Not Answered Yet"}
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
                      {reviewedEditedQuestionIds?.has(q.question_id) && (
                        <span className="inline-flex items-center rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-sky-600 dark:text-sky-400">
                          Edited
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
          onClick={onReturnToCurrent}
          className="h-9 px-4 text-xs font-semibold cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-1.5" />
          Return to Questions
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={onSubmitFinal}
          className="h-9 px-6 text-xs font-semibold shadow-sm cursor-pointer"
        >
          <span>Submit & Finalize Session</span>
          <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </footer>
    </div>
  );
}
