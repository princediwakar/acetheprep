// Path: components/practice/PracticeQuestion.tsx

"use client";

import { useState, useCallback } from "react";
import { renderMathContent } from "@/lib/quiz-utils";
import { Badge } from "@/components/ui/badge";

interface QuestionData {
  question_text: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  distractor_analysis?: Record<string, string>;
  difficulty_tier?: string;
  misconception?: string;
  topics?: string[];
}

interface PracticeQuestionProps {
  question: QuestionData;
  index: number;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const DIFFICULTY_COLORS: Record<string, string> = {
  foundation: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  application: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  advanced: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function PracticeQuestion({ question, index }: PracticeQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = useCallback(
    (label: string) => {
      if (revealed) return;
      setSelectedOption(label);
      setRevealed(true);
    },
    [revealed],
  );

  const isCorrect = selectedOption === question.correct_option;
  const difficultyKey = question.difficulty_tier ?? "foundation";
  const difficultyColor = DIFFICULTY_COLORS[difficultyKey] ?? DIFFICULTY_COLORS.foundation;

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm text-card-foreground">
      {/* Header: question number, difficulty, topics */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-primary">
          Q{index + 1}
        </span>
        <Badge variant="secondary" className={`text-xs font-medium ${difficultyColor}`}>
          {question.difficulty_tier}
        </Badge>
        {question.topics?.map((topic) => (
          <Badge key={topic} variant="outline" className="text-xs">
            {topic}
          </Badge>
        ))}
      </div>

      {/* Question text */}
      <div className="mb-5 text-base leading-relaxed text-foreground font-normal">
        {renderMathContent(question.question_text)}
      </div>

      {/* Options */}
      <div className="grid gap-2.5">
        {OPTION_LABELS.map((label) => {
          const optionText = question.options[label];
          if (!optionText) return null;

          let borderClass = "border-border/70";
          let bgClass = "bg-card hover:bg-muted/50";
          let ringClass = "";

          if (revealed) {
            if (label === question.correct_option) {
              borderClass = "border-emerald-500/80";
              bgClass = "bg-emerald-500/10";
              ringClass = "ring-1 ring-emerald-500/30";
            } else if (label === selectedOption && !isCorrect) {
              borderClass = "border-red-500/80";
              bgClass = "bg-red-500/10";
              ringClass = "ring-1 ring-red-500/30";
            }
          }

          return (
            <button
              key={label}
              type="button"
              disabled={revealed}
              onClick={() => handleSelect(label)}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${borderClass} ${bgClass} ${ringClass} ${
                !revealed ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                  revealed && label === question.correct_option
                    ? "bg-emerald-500 text-white"
                    : revealed && label === selectedOption && !isCorrect
                      ? "bg-red-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </span>
              <span className="text-sm font-medium text-foreground">
                {renderMathContent(optionText)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Common Trap Misconception (Shown after answer is selected) */}
      {revealed && question.misconception && (
        <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs text-foreground/90">
          <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-1">
            Common Exam Trap:
          </span>
          <p className="text-muted-foreground leading-relaxed">
            {question.misconception}
          </p>
        </div>
      )}

      {/* Step-by-Step Solution (Revealed) */}
      {revealed && question.explanation && (
        <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-4 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Step-by-Step Solution
          </p>
          <div className="text-xs text-muted-foreground leading-relaxed">
            {renderMathContent(question.explanation)}
          </div>
        </div>
      )}

      {/* Option Breakdown (Visible after reveal) */}
      {revealed && question.distractor_analysis && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Why Other Options Are Traps
          </p>
          {OPTION_LABELS.map((label) => {
            const da = question.distractor_analysis!;
            const analysis = da[label];
            if (!analysis) return null;
            if (label === question.correct_option) {
              return (
                <div key={label} className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    Option {label}:
                  </span>
                  <span className="text-emerald-800 dark:text-emerald-300">
                    CORRECT — {analysis}
                  </span>
                </div>
              );
            }
            return (
              <div key={label} className="flex items-start gap-2.5 rounded-lg border border-red-500/15 bg-red-500/5 p-2.5 text-xs">
                <span className="font-bold text-red-500 dark:text-red-400 shrink-0">
                  Option {label}:
                </span>
                <span className="text-muted-foreground">
                  TRAP — {analysis}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Feedback after selection */}
      {revealed && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
            isCorrect
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
              : "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30"
          }`}
        >
          {isCorrect ? "Correct! Well done." : `Incorrect. The correct answer is Option ${question.correct_option}.`}
        </div>
      )}
    </div>
  );
}
