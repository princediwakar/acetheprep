// Path: components/tutor/player/QuestionCard.tsx
"use client";

import { renderMathContent } from "@/lib/quiz-utils";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

interface QuestionCardProps {
  current: SessionQuestion;
  mode: "tutor" | "exam";
  selectedOption: SelectedOption | null;
  answerState: "pending" | "answered";
  isCorrect: boolean | null;
  onOptionClick: (option: SelectedOption) => void;
}

export function QuestionCard({
  current,
  mode,
  selectedOption,
  answerState,
  isCorrect,
  onOptionClick,
}: QuestionCardProps) {
  const optionEntries = OPTION_LETTERS.filter((key) => key in current.options).map((key) => ({
    key,
    value: current.options[key],
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Question Stem Header: Domain & Difficulty */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border/80 pb-2.5">
          <span className="font-semibold text-foreground/80 tracking-wide">
            {current.skill_domain || "Problem Solving"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/70 border border-border px-2 py-0.5 rounded">
            Tier {current.difficulty_tier || 2}
          </span>
        </div>

        <div className="font-heading text-lg sm:text-xl font-normal leading-relaxed text-foreground tracking-normal">
          {renderMathContent(current.question_text)}
        </div>
      </div>

      {/* Option Cards */}
      <div className="space-y-3">
        {optionEntries.map(({ key, value }) => {
          const isSelected = selectedOption === key;
          const isCorrectOption = key === current.correct_option;

          let borderClasses = "border-border/80 bg-card hover:border-primary/50 hover:bg-secondary/20";

          if (mode === "tutor") {
            if (answerState === "answered") {
              if (isCorrectOption) {
                borderClasses = "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-600";
              } else if (isSelected && !isCorrectOption) {
                borderClasses = "border-rose-600 bg-rose-50/40 dark:bg-rose-950/30 ring-1 ring-rose-600";
              }
            } else if (isSelected) {
              borderClasses = "border-primary bg-primary/5 ring-1 ring-primary";
            }
          } else {
            if (isSelected) {
              borderClasses = "border-primary bg-primary/10 ring-2 ring-primary/30";
            }
          }

          return (
            <div
              key={key}
              onClick={() => onOptionClick(key as SelectedOption)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOptionClick(key as SelectedOption);
                }
              }}
              className={cn(
                "w-full flex items-center justify-between gap-3.5 rounded-xl border p-4 text-left transition-all relative overflow-hidden select-none",
                borderClasses,
                !answerState || answerState === "pending" || mode === "exam"
                  ? "cursor-pointer active:scale-[0.995]"
                  : "cursor-default",
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={cn(
                    "h-7 w-7 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono font-semibold transition-colors",
                    mode === "tutor" && answerState === "answered" && isCorrectOption
                      ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                      : mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption
                        ? "bg-rose-600 text-white border-rose-600 font-bold"
                        : isSelected
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "border-border text-foreground/80",
                  )}
                >
                  {key}
                </span>

                <span className="text-sm font-medium text-foreground leading-snug break-words">
                  {renderMathContent(value)}
                </span>
              </div>

              {mode === "tutor" && answerState === "answered" && isCorrectOption && (
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              )}
              {mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption && (
                <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Tutor Mode Examiner Diagnostic Breakdown (Post-Answer) */}
      {mode === "tutor" && answerState === "answered" && (
        <div className="mt-6 rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Correct Deduction
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Cognitive Distractor Trap Triggered
              </span>
            )}
          </div>

          {selectedOption &&
            selectedOption !== current.correct_option &&
            current.distractor_analysis?.[selectedOption] && (
              <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground/90 leading-relaxed">
                <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                  Examiner Trap Breakdown (Option {selectedOption}):
                </span>
                {renderMathContent(current.distractor_analysis[selectedOption])}
              </div>
            )}

          {current.explanation && (
            <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed">
              <span className="font-semibold text-foreground block mb-1">
                Solution Derivation:
              </span>
              {renderMathContent(current.explanation)}
            </div>
          )}

          {current.misconception && (
            <div className="text-xs text-muted-foreground border-t border-border pt-3">
              <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                Common Exam-Setter Trap:
              </span>
              {current.misconception}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
