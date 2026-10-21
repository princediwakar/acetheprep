// Path: components/landing/ScoreGapCalculator.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

interface ScoreGapCalculatorProps {
  activeExam: ExamKey;
}

const EXAM_SLUGS: Record<ExamKey, string> = {
  gmat: "gmat-focus",
  sat: "sat",
  gre: "gre",
  cfa: "cfa-level-1",
  ielts: "ielts-academic",
  toefl: "toefl-ibt",
};

export function ScoreGapCalculator({ activeExam }: ScoreGapCalculatorProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const scale = examConfig.scoreScale;
  const gapLogic = examConfig.scoreGapLogic;

  const [currentScore, setCurrentScore] = useState<number>(scale.defaultCurrent);
  const [targetScore, setTargetScore] = useState<number>(scale.defaultTarget);

  // Sync defaults when exam changes
  useEffect(() => {
    setCurrentScore(scale.defaultCurrent);
    setTargetScore(scale.defaultTarget);
  }, [activeExam, scale.defaultCurrent, scale.defaultTarget]);

  const questionsCount = gapLogic.getQuestionsCount(currentScore, targetScore);
  const summaryText = gapLogic.getSummary(currentScore, targetScore, questionsCount);

  const handlePreset = (preset: { current: number; target: number }) => {
    setCurrentScore(preset.current);
    setTargetScore(preset.target);
  };

  return (
    <section className="relative py-12 sm:py-16 border-t border-border/70 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Target className="h-3.5 w-3.5" />
            Score Gap Breakdown
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            {examConfig.name} Score Gap Calculator & Penalty Breakdown
          </h2>
          <p className="text-sm text-muted-foreground">
            You don&apos;t need to read 300 pages of notes. Standardized exam scores come down to eliminating a few recurring question traps.
          </p>
        </div>

        {/* Inputs Card */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-xs space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border/70">
            <span className="text-xs font-medium text-muted-foreground">
              Quick presets for {examConfig.shortName}:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {scale.presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className="rounded-md border border-border/80 bg-secondary/40 px-2.5 py-1 text-xs text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders / Number Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Current Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Current Baseline</span>
                <span className="font-mono text-base font-bold text-primary">
                  {currentScore} {scale.unit}
                </span>
              </div>
              <input
                type="range"
                min={scale.min}
                max={scale.max - scale.step}
                step={scale.step}
                value={currentScore}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCurrentScore(val);
                  if (val >= targetScore) {
                    setTargetScore(Math.min(scale.max, val + scale.step * 2));
                  }
                }}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{scale.min} {scale.unit}</span>
                <span>{scale.max} {scale.unit}</span>
              </div>
            </div>

            {/* Target Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Target Goal</span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                  {targetScore} {scale.unit}
                </span>
              </div>
              <input
                type="range"
                min={scale.min + scale.step}
                max={scale.max}
                step={scale.step}
                value={targetScore}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetScore(val);
                  if (val <= currentScore) {
                    setCurrentScore(Math.max(scale.min, val - scale.step * 2));
                  }
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{scale.min} {scale.unit}</span>
                <span>{scale.max} {scale.unit}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Result Callout */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider block">
                The Exact Math
              </span>
              <p className="text-sm sm:text-base font-medium text-foreground">
                {summaryText}
              </p>
            </div>

            {/* 3 Mistake Patterns */}
            <div className="space-y-3 pt-2 border-t border-border/70">
              <span className="text-xs font-semibold text-foreground block">
                Top 3 mistake patterns costing you these points:
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {gapLogic.mistakes.map((item, idx) => (
                  <div
                    key={item.title}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/80 bg-background/80 p-3.5 shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[11px] font-mono font-semibold text-foreground">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-7">
                        {item.description}
                      </p>
                    </div>

                    <Link
                      href={item.practiceUrl || `/practice/${EXAM_SLUGS[activeExam]}`}
                      className="inline-flex items-center gap-1.5 self-start sm:self-center text-xs font-semibold text-primary hover:underline transition-colors shrink-0 pl-7 sm:pl-0 cursor-pointer"
                    >
                      <span>Practice topic</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward compatibility alias
export const ScoreGapTool = ScoreGapCalculator;
export type { ScoreGapCalculatorProps as ScoreGapToolProps };

