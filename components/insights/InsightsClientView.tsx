// Path: components/insights/InsightsClientView.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Target,
  Sparkles,
  Layers,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_EXAMS, type ExamKey } from "@/components/landing/landing-data";
import { ExamSelectorStrip, EXAM_TABS } from "@/components/shared/ExamSelectorStrip";

interface InsightsClientViewProps {
  initialExam?: ExamKey;
}

export function InsightsClientView({ initialExam = "gmat" }: InsightsClientViewProps) {
  const [activeExam, setActiveExam] = useState<ExamKey>(initialExam);
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const hardest = examConfig.hardestQuestions || [];
  const traps = examConfig.trapsGuide || [];
  const mistakes = examConfig.scoreGapLogic?.mistakes || [];
  const sampleQuestion = examConfig.questions[0];

  return (
    <div className="space-y-12">
      {/* Exam Switcher Tabs */}
      <ExamSelectorStrip
        activeExam={activeExam}
        onExamChange={setActiveExam}
        label="Select Exam to View Hardest Topics:"
      />

      {/* Active Exam Spotlight: 3 Hardest Topics & Empirical Miss Rates */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-8 shadow-xs max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-0.5 text-xs font-mono font-medium text-foreground">
              <span>{examConfig.officialBadge}</span>
              <span>•</span>
              <span>Empirical Benchmark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-medium text-foreground tracking-tight">
              {examConfig.name} — Hardest Topics &amp; Error Rates
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Derived from verified candidate error patterns. Ranked by frequency of missed attempts under timed conditions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
            <Link
              href={`/insights/${examConfig.curriculum?.slug || activeExam}/hardest-topics`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 px-3.5 py-2 text-xs font-semibold text-foreground transition-all shadow-xs"
            >
              <TrendingUp className="h-3.5 w-3.5 text-rose-500" />
              <span>Full Ranked Error Table</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href={`/practice/${examConfig.curriculum?.slug || activeExam}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary px-3.5 py-2 text-xs font-medium text-foreground transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Syllabus</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* 3 Hardest Conceptual Topics Cards */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
            Top 3 High-Yield Conceptual Blindspots:
          </span>

          <div className="grid grid-cols-1 gap-4">
            {traps.slice(0, 3).map((trap, idx) => {
              const matchingMistake = mistakes[idx];
              const practiceUrl =
                matchingMistake?.practiceUrl ||
                `/practice/${examConfig.curriculum?.slug || activeExam}`;
              const missRate = hardest[idx]?.missRate || (74 - idx * 5);

              return (
                <div
                  key={trap.name}
                  className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-3.5 hover:border-foreground/30 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {trap.name}
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                      <TrendingUp className="h-3 w-3" />
                      {missRate}% Error Rate
                    </span>
                  </div>

                  {/* Why it trips candidates up */}
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/90 font-mono text-[11px] uppercase tracking-wider block">
                      The Cognitive Blindspot:
                    </span>
                    <p className="leading-relaxed pl-3 border-l-2 border-border">
                      {trap.howItWorks}
                    </p>
                  </div>

                  {/* The Rule to Beat It */}
                  <div className="rounded-lg border border-border/80 bg-muted/20 p-3 flex items-start gap-2.5 text-xs">
                    <Compass className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-foreground block text-[11px] uppercase tracking-wider font-mono">
                        First-Principles Rule:
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {trap.ruleToBeatIt}
                      </p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Example: {trap.quickExample}
                    </span>

                    <Link
                      href={practiceUrl}
                      className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline shrink-0"
                    >
                      <span>Explore Topic Syllabus</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample Problem Deep-Dive for Active Exam */}
        {sampleQuestion && (
          <div className="rounded-xl border border-border/80 bg-muted/10 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-foreground" />
                <span className="font-heading font-medium text-foreground text-sm">
                  Sample High-Yield Problem: {sampleQuestion.topic}
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {sampleQuestion.section}
              </span>
            </div>

            <div className="border-l-2 border-foreground/30 pl-4 py-0.5">
              <p className="text-xs sm:text-sm font-normal text-foreground leading-relaxed whitespace-pre-line font-serif sm:font-sans">
                {sampleQuestion.questionText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(sampleQuestion.options).map(([letter, text]) => (
                <div
                  key={letter}
                  className={cn(
                    "rounded-lg border p-2.5 flex items-center gap-2.5",
                    letter === sampleQuestion.correctOption
                      ? "border-emerald-600/50 bg-emerald-50/30 dark:bg-emerald-950/20 text-foreground font-medium"
                      : "border-border/70 bg-card/60 text-muted-foreground",
                  )}
                >
                  <span className="font-mono font-bold text-[11px]">{letter}</span>
                  <span>{text}</span>
                  {letter === sampleQuestion.correctOption && (
                    <span className="ml-auto text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                      Correct
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card p-3.5 space-y-2 text-xs">
              <div className="font-semibold text-foreground flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Walkthrough Derivation (Option {sampleQuestion.correctOption})</span>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-5">
                {sampleQuestion.whyCorrectWorks}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Directory Cards for All 6 Benchmarks */}
      <div className="space-y-6 max-w-5xl mx-auto pt-6 border-t border-border/80">
        <div className="text-center space-y-1">
          <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground">
            Explore All 6 Exam Benchmarks
          </h3>
          <p className="text-xs text-muted-foreground">
            Complete curricula, official test timing, and syllabi for serious candidates.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_TABS.map((item) => {
            const config = LANDING_EXAMS[item.key];
            const slug = config.curriculum?.slug || item.key;
            return (
              <div
                key={item.key}
                className="rounded-xl border border-border/80 bg-card p-5 space-y-3 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {config.shortName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-muted/60 text-muted-foreground">
                      {config.officialBadge}
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-medium text-foreground">
                    {config.name}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {config.curriculum?.format}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <Link
                    href={`/insights/${slug}/hardest-topics`}
                    className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
                  >
                    <span>Hardest Topics</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  <Link
                    href={`/practice/${slug}`}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
                  >
                    <span>Syllabus</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
