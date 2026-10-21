// Path: components/tutor/player/SessionResultsView.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import { renderMathContent } from "@/lib/quiz-utils";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flag,
} from "lucide-react";
import type { SessionQuestion } from "@/types/tutor";
import type { QuestionAttemptRecord } from "../SessionPlayer";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

interface SessionResultsViewProps {
  examName?: string;
  total: number;
  score: number;
  totalTimeElapsed: number;
  questions: SessionQuestion[];
  userAttempts: Record<string, QuestionAttemptRecord>;
  flaggedQuestions: Set<number>;
  nextDomain: string | null;
  startingNext: boolean;
  onBackToDashboard: () => void;
  onStartNextTopic: () => void;
  formatTime: (sec: number) => string;
}

export function SessionResultsView({
  examName,
  total,
  score,
  totalTimeElapsed,
  questions,
  userAttempts,
  flaggedQuestions,
  nextDomain,
  startingNext,
  onBackToDashboard,
  onStartNextTopic,
  formatTime,
}: SessionResultsViewProps) {
  const [reviewFilter, setReviewFilter] = useState<"all" | "flagged" | "incorrect" | "traps" | "correct">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

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

  const toggleQuestionExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !(prev[qId] ?? true),
    }));
  };

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
            variant="default"
            onClick={onBackToDashboard}
          >
            Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto space-y-6">
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
                reviewFilter === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              All ({total})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter("flagged")}
              className={cn(
                "px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer",
                reviewFilter === "flagged" ? "bg-card text-foreground shadow-xs font-bold text-amber-600 dark:text-amber-400" : "text-muted-foreground hover:text-foreground",
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
                reviewFilter === "incorrect" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Mistakes ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter("traps")}
              className={cn(
                "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                reviewFilter === "traps" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Traps ({trapsCaughtCount})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter("correct")}
              className={cn(
                "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                reviewFilter === "correct" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
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
                              <span
                                className={cn(
                                  "h-5 w-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border",
                                  isCorrectOption
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : isSelected
                                      ? "bg-rose-600 text-white border-rose-600"
                                      : "border-border text-muted-foreground",
                                )}
                              >
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

                    {attempt?.selected && attempt.selected !== q.correct_option && q.distractor_analysis?.[attempt.selected] && (
                      <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground leading-relaxed">
                        <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                          Trap Breakdown (Option {attempt.selected}):
                        </span>
                        {renderMathContent(q.distractor_analysis[attempt.selected])}
                      </div>
                    )}

                    {q.explanation && (
                      <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground leading-relaxed">
                        <span className="font-semibold text-foreground block mb-1">
                          Solution Derivation:
                        </span>
                        {renderMathContent(q.explanation)}
                      </div>
                    )}

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
              onClick={onStartNextTopic}
              disabled={startingNext}
            >
              Practice Next Topic: {nextDomain}
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1 h-11 text-sm font-semibold cursor-pointer"
            onClick={onBackToDashboard}
          >
            Back to Dashboard
          </Button>
        </div>
        </div>
      </main>
    </div>
  );
}
