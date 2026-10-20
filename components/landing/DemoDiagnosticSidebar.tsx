// Path: components/landing/DemoDiagnosticSidebar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Brain, Zap, ShieldAlert, ArrowRight, RotateCcw, ChevronRight } from "lucide-react";
import type { DemoQuestion } from "./demo-data";

interface DemoDiagnosticSidebarProps {
  isRevealed: boolean;
  isCorrect: boolean;
  question: DemoQuestion | null;
  correctOption: string;
  selectedOption: string | null;
  trapKey: string;
  remainingLabel: string;
  exam: string;
  examSlug: string;
  user: any;
  onGoogleSignIn: () => void;
  onReset: () => void;
}

export function DemoDiagnosticSidebar({
  isRevealed,
  isCorrect,
  question,
  correctOption,
  selectedOption,
  trapKey,
  remainingLabel,
  exam,
  examSlug,
  user,
  onGoogleSignIn,
  onReset,
}: DemoDiagnosticSidebarProps) {
  return (
    <div className="lg:col-span-5 rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 flex flex-col justify-between min-h-[380px]">
      {!isRevealed ? (
        /* Idle State: Test-Day Pacing & Trap Telemetry */
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              Examiner Trap Radar
            </span>
            <span className="text-[11px] font-mono text-primary font-semibold">
              74% Fall for Distractor
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standardized test committees do not write random wrong answers. Each distractor is engineered to target a specific cognitive blindspot.
            </p>

            {/* Mock Student Response Frequency Bar */}
            <div className="space-y-2 pt-1 font-mono text-[10px]">
              <span className="text-[11px] font-medium text-foreground block font-sans">
                Historical Test-Taker Distribution:
              </span>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span>Option {correctOption || "A"} (Correct Answer)</span>
                  <span>21%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-emerald-500/80 w-[21%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-rose-600 dark:text-rose-400 font-semibold mb-1">
                  <span>Option {trapKey} (The Engineered Trap)</span>
                  <span>74% Fell for this</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-rose-500 w-[74%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span>{remainingLabel}</span>
                  <span>5%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-muted-foreground/30 w-[5%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs text-muted-foreground flex items-start gap-2.5 mt-4">
            <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              Use the <strong>Eliminate Answers</strong> tool in the top bar to cross out trap options before locking in your choice.
            </span>
          </div>
        </div>
      ) : (
        /* Revealed State: The Ivy & Oxbridge Examiner Monograph */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-3.5"
        >
          <div
            className={cn(
              "rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm border",
              isCorrect
                ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-900 dark:text-rose-200 border-rose-500/30",
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Brain className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              )}
            </div>
            <div className="space-y-1">
              <span className="font-heading font-semibold text-xs sm:text-sm tracking-tight block">
                {isCorrect ? "Correctly Deduced!" : "Distractor Trap Triggered"}
              </span>
              <p className="text-xs opacity-90 leading-relaxed font-sans">
                {isCorrect
                  ? question?.distractor_analysis?.[correctOption]
                  : question?.distractor_analysis?.[selectedOption!] ||
                    question?.misconception}
              </p>
            </div>
          </div>

          {/* Step-by-Step Derivation */}
          <div className="rounded-xl border border-border bg-background p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <div className="flex items-center gap-1.5 font-heading">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>The Examiner&apos;s Solution:</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {isCorrect ? "Interval: +7 Days" : "Interval: +3 Days"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-normal">
              {question?.explanation}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 space-y-2.5">
            {!user ? (
              <button
                type="button"
                onClick={onGoogleSignIn}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Activate Full {exam} Question Bank Free</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            ) : (
              <Link
                href="/home"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Continue {exam} Practice</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            )}

            <div className="flex items-center justify-between text-xs px-1">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Next Simulation Question</span>
              </button>

              <Link
                href={`/practice/${examSlug}`}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs"
              >
                <span>Browse Syllabus</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer Micro-telemetry */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
        <span>Standard: Bluebook v2.4</span>
        <span>Telemetry: Active</span>
      </div>
    </div>
  );
}
