// Path: components/landing/ScorePlannerSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Clock, Target, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

export interface ScorePlannerSectionProps {
  activeExam: ExamKey;
}

export function ScorePlannerSection({ activeExam }: ScorePlannerSectionProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const scale = examConfig.scoreScale;
  const gapLogic = examConfig.scoreGapLogic;
  const curr = examConfig.curriculum;

  const [currentScore, setCurrentScore] = useState<number>(scale.defaultCurrent);
  const [targetScore, setTargetScore] = useState<number>(scale.defaultTarget);

  // Sync defaults when exam changes
  useEffect(() => {
    setCurrentScore(scale.defaultCurrent);
    setTargetScore(scale.defaultTarget);
  }, [activeExam, scale.defaultCurrent, scale.defaultTarget]);

  const scoreDiff = Math.max(0, targetScore - currentScore);
  const questionsCount = gapLogic.getQuestionsCount(currentScore, targetScore);

  // Realistic hours calculation: ~0.5 to 2.5 hours per score unit diff
  const multiplier = curr?.studyHoursMultiplier || 0.5;
  const estimatedHours = Math.max(10, Math.round(scoreDiff * multiplier));

  const handlePreset = (preset: { current: number; target: number }) => {
    setCurrentScore(preset.current);
    setTargetScore(preset.target);
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Diagnostic Planner
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            {examConfig.name} Score Estimator &amp; Study Planner
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Determine the realistic preparation time and high-yield focus topics required to close your score gap.
          </p>
        </div>

        {/* Inputs Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-8">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/60">
            <span className="text-xs font-mono text-muted-foreground">
              Select Preset for {examConfig.shortName}:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {scale.presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className="rounded-lg border border-border/80 bg-secondary/30 px-3 py-1 text-xs text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Current Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Current Baseline</span>
                <span className="font-mono text-base font-bold text-foreground">
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
                    setTargetScore(Math.min(scale.max, val + scale.step * 4));
                  }
                }}
                className="w-full accent-foreground cursor-pointer h-1.5 bg-secondary rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{scale.min}</span>
                <span>{scale.max}</span>
              </div>
            </div>

            {/* Target Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Target Goal</span>
                <span className="font-mono text-base font-bold text-foreground">
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
                    setCurrentScore(Math.max(scale.min, val - scale.step * 4));
                  }
                }}
                className="w-full accent-foreground cursor-pointer h-1.5 bg-secondary rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{scale.min}</span>
                <span>{scale.max}</span>
              </div>
            </div>
          </div>

          {/* 3 Real-World Metrics Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                Score Differential
              </span>
              <div className="font-mono text-2xl font-bold text-foreground">
                +{scoreDiff} {scale.unit}
              </div>
              <p className="text-[11px] text-muted-foreground">
                From {currentScore} to {targetScore}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                Estimated Deliberate Study
              </span>
              <div className="font-mono text-2xl font-bold text-foreground">
                ~{estimatedHours} Hours
              </div>
              <p className="text-[11px] text-muted-foreground">
                Focused concept practice & review
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                Targeted Questions to Master
              </span>
              <div className="font-mono text-2xl font-bold text-foreground">
                ~{questionsCount} Questions
              </div>
              <p className="text-[11px] text-muted-foreground">
                Eliminating recurring error patterns
              </p>
            </div>
          </div>

          {/* High-Yield Focus Areas */}
          <div className="space-y-3 pt-4 border-t border-border/60">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider block">
              High-Yield Topics to Close This Gap:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {gapLogic.mistakes.map((m, idx) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-border/70 bg-card p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase px-1.5 py-0.5 rounded bg-muted">
                        Priority {idx + 1}
                      </span>
                      <span className="font-semibold text-foreground">{m.title}</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] sm:text-xs leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <Link
                    href={m.practiceUrl}
                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground shrink-0 underline underline-offset-4"
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
    </section>
  );
}

// Backward compatibility alias
export const ScoreGapCalculator = ScorePlannerSection;
export type { ScorePlannerSectionProps as ScoreGapCalculatorProps };
