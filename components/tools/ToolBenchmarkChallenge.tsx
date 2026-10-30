"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ToolBenchmarkQuestion {
  questionText: string;
  passage?: string;
  options: Record<string, string>;
  correctOption: string;
  distractorAnalysis: Record<string, string>;
  explanation: string;
  trapType: string;
  skillDomain: string;
}

interface ToolBenchmarkChallengeProps {
  examName: string;
  targetBenchmarkText: string;
  question: ToolBenchmarkQuestion;
  diagnosticHref: string;
}

export function ToolBenchmarkChallenge({
  examName,
  targetBenchmarkText,
  question,
  diagnosticHref,
}: ToolBenchmarkChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const isCorrect = selectedOption === question.correctOption;

  const handleSelect = (letter: string) => {
    if (hasAnswered) return;
    setSelectedOption(letter);
    setHasAnswered(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <section className="rounded-3xl border border-primary/25 bg-card/90 p-6 sm:p-8 shadow-sm backdrop-blur-xs relative overflow-hidden my-8">
      {/* Decorative subtle header badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-border/70">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Zap className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            Live {examName} Benchmark Drill
          </span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
          Calibrated for {targetBenchmarkText}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Can your baseline survive this trap question?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Topic: <span className="font-semibold text-foreground">{question.skillDomain}</span> &middot; Trap Type: <span className="font-semibold text-rose-500 dark:text-rose-400">{question.trapType}</span>
          </p>
        </div>

        {question.passage && (
          <div className="rounded-xl bg-muted/40 p-3.5 sm:p-4 text-xs sm:text-sm text-muted-foreground border border-border/60 leading-relaxed font-sans">
            {question.passage}
          </div>
        )}

        <div className="rounded-2xl bg-secondary/30 border border-border/70 p-4 sm:p-5">
          <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed whitespace-pre-line">
            {question.questionText}
          </p>
        </div>

        {/* Options grid */}
        <div className="space-y-2.5 pt-1">
          {Object.entries(question.options).map(([letter, text]) => {
            const isSelected = selectedOption === letter;
            const isOptionCorrect = letter === question.correctOption;

            let optionClasses =
              "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/30 cursor-pointer text-foreground";

            if (hasAnswered) {
              if (isOptionCorrect) {
                optionClasses =
                  "border-emerald-500/60 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-medium";
              } else if (isSelected && !isOptionCorrect) {
                optionClasses =
                  "border-rose-500/60 bg-rose-500/10 text-rose-950 dark:text-rose-200 font-medium";
              } else {
                optionClasses = "border-border/40 opacity-50 bg-card text-muted-foreground";
              }
            }

            return (
              <button
                key={letter}
                type="button"
                onClick={() => handleSelect(letter)}
                disabled={hasAnswered}
                className={cn(
                  "w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3",
                  optionClasses
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold border",
                    isSelected
                      ? isCorrect
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-rose-500 text-white border-rose-500"
                      : isOptionCorrect && hasAnswered
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {letter}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed pt-0.5">{text}</span>
              </button>
            );
          })}
        </div>

        {/* 0ms Feedback Reveal */}
        {hasAnswered && (
          <div
            className={cn(
              "rounded-2xl p-4 sm:p-5 border transition-all animate-in fade-in-50 duration-200 space-y-3",
              isCorrect
                ? "bg-emerald-500/5 border-emerald-500/30"
                : "bg-rose-500/5 border-rose-500/30"
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
                    Trap Avoided! Correct Answer: ({question.correctOption})
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-rose-600 dark:text-rose-400">
                    Examiner Trap Triggered!
                  </span>
                </>
              )}
            </div>

            {selectedOption && question.distractorAnalysis[selectedOption] && !isCorrect && (
              <div className="p-3 rounded-xl bg-card border border-rose-500/20 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-1">
                  Why you picked ({selectedOption}):
                </strong>
                {question.distractorAnalysis[selectedOption]}
              </div>
            )}

            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground block mb-1">Psychometric Breakdown:</strong>
              {question.explanation}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-foreground font-medium underline underline-offset-4"
              >
                Try Again
              </button>

              <Button
                asChild
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-xl shadow-xs"
              >
                <Link href={diagnosticHref}>
                  <span>Calibrate Your Full Score Baseline (Free)</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
