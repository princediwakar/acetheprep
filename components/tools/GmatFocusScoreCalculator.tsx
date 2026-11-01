// Path: components/tools/GmatFocusScoreCalculator.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Award, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Official GMAC GMAT Focus Edition Percentiles (2024-2026 data)
const FOCUS_PERCENTILES: [number, number][] = [
  [805, 100],
  [795, 100],
  [785, 100],
  [775, 99.9],
  [765, 99.9],
  [755, 99.8],
  [745, 99.7],
  [735, 99.4],
  [725, 99.1],
  [715, 98.7],
  [705, 98.6],
  [695, 97.9],
  [685, 96.8],
  [675, 95.3],
  [665, 93.6],
  [655, 91.3],
  [645, 88.5],
  [635, 85.3],
  [625, 81.3],
  [615, 77.2],
  [605, 72.8],
  [595, 68.1],
  [585, 62.7],
  [575, 57.3],
  [565, 52.0],
  [555, 47.9],
  [545, 43.1],
  [535, 38.3],
  [525, 33.6],
  [515, 29.1],
  [505, 24.8],
  [495, 20.9],
  [485, 17.3],
  [475, 14.1],
  [465, 11.2],
  [455, 8.8],
  [445, 6.7],
  [435, 5.0],
  [425, 3.6],
  [415, 2.5],
  [405, 1.7],
  [395, 1.1],
  [385, 0.7],
  [375, 0.4],
  [365, 0.2],
  [355, 0.1],
  [205, 0.1],
];

function getPercentile(score: number): number {
  for (const [s, p] of FOCUS_PERCENTILES) {
    if (score >= s) return p;
  }
  return 0.1;
}

export function GmatFocusScoreCalculator() {
  const [quant, setQuant] = useState<number>(80);
  const [verbal, setVerbal] = useState<number>(80);
  const [dataInsights, setDataInsights] = useState<number>(80);

  // GMAT Focus scoring formula:
  // Each section is 60 to 90.
  // Sum ranges from 180 (60*3) to 270 (90*3).
  // Total score ranges from 205 to 805 in increments of 10, ending in 5.
  // Formula: 205 + round(((sum - 180) / 90) * 60) * 10
  const totalScore = useMemo(() => {
    const sum = quant + verbal + dataInsights;
    const normalizedUnits = Math.round(((sum - 180) / 90) * 60);
    return Math.min(805, Math.max(205, 205 + normalizedUnits * 10));
  }, [quant, verbal, dataInsights]);

  const percentile = useMemo(() => getPercentile(totalScore), [totalScore]);

  // Legacy GMAT equivalent estimate (approximate for MBA admissions guidance)
  const legacyEquivalent = useMemo(() => {
    if (totalScore >= 755) return "800";
    if (totalScore >= 735) return "780 - 790";
    if (totalScore >= 705) return "760 - 770";
    if (totalScore >= 685) return "740 - 750";
    if (totalScore >= 665) return "720 - 730";
    if (totalScore >= 645) return "700 - 710";
    if (totalScore >= 615) return "670 - 690";
    if (totalScore >= 585) return "640 - 660";
    if (totalScore >= 555) return "600 - 630";
    return "< 600";
  }, [totalScore]);

  const tier = useMemo(() => {
    if (totalScore >= 695) {
      return {
        label: "M7 Ultra-Competitive (Harvard, Stanford, Wharton)",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        note: "Top 2% globally. Outstanding score for every elite business school worldwide.",
      };
    }
    if (totalScore >= 645) {
      return {
        label: "Top 15–25 Global Business Schools",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
        note: "Top ~10% globally. Meets or exceeds median scores for Kellogg, Columbia, MIT Sloan, and INSEAD.",
      };
    }
    if (totalScore >= 595) {
      return {
        label: "Top 50 Global Business Schools",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        note: "Above global median. Highly viable for top-ranked regional and European MBA programs.",
      };
    }
    return {
      label: "Diagnostic Range / Foundation Needed",
      color: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      note: "Requires focused drill work on distractor traps to break past the 600+ threshold.",
    };
  }, [totalScore]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Official GMAC Focus Edition Algorithm
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Interactive Section Calibrator
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Adjust your raw section scores (60–90) to compute your composite score, global percentile, and MBA tier.
          </p>
        </div>

        {/* Live Score Display */}
        <div className="flex items-center gap-6 rounded-2xl bg-secondary/60 border border-border/80 px-6 py-4">
          <div className="text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
              Total Score
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary font-heading">
              {totalScore}
            </span>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
              Percentile
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
              {percentile}th
            </span>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quantitative Section */}
        <div className="rounded-2xl border border-border/70 bg-background/50 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">Quantitative</label>
            <span className="text-lg font-mono font-bold text-primary">{quant}</span>
          </div>
          <input
            type="range"
            min={60}
            max={90}
            step={1}
            value={quant}
            onChange={(e) => setQuant(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-lg bg-muted cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>Min (60)</span>
            <span>Target 80+</span>
            <span>Max (90)</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            21 questions, 45 mins. Problem Solving. No calculator allowed.
          </p>
        </div>

        {/* Verbal Section */}
        <div className="rounded-2xl border border-border/70 bg-background/50 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">Verbal Reasoning</label>
            <span className="text-lg font-mono font-bold text-primary">{verbal}</span>
          </div>
          <input
            type="range"
            min={60}
            max={90}
            step={1}
            value={verbal}
            onChange={(e) => setVerbal(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-lg bg-muted cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>Min (60)</span>
            <span>Target 80+</span>
            <span>Max (90)</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            23 questions, 45 mins. Critical Reasoning & Reading Comprehension.
          </p>
        </div>

        {/* Data Insights Section */}
        <div className="rounded-2xl border border-border/70 bg-background/50 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">Data Insights</label>
            <span className="text-lg font-mono font-bold text-primary">{dataInsights}</span>
          </div>
          <input
            type="range"
            min={60}
            max={90}
            step={1}
            value={dataInsights}
            onChange={(e) => setDataInsights(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-lg bg-muted cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>Min (60)</span>
            <span>Target 80+</span>
            <span>Max (90)</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            20 questions, 45 mins. Data Sufficiency, Multi-Source & Graphics. On-screen calculator.
          </p>
        </div>
      </div>

      {/* Target MBA Admissions Evaluation */}
      <div className="rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">MBA Admissions Target Benchmark</h3>
          </div>
          <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border", tier.color)}>
            {tier.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tier.note}
        </p>
        <div className="mt-4 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="text-muted-foreground">
            Legacy GMAT (200–800) Equivalent:{" "}
            <strong className="text-foreground font-semibold">{legacyEquivalent}</strong>
          </span>
          <span className="text-muted-foreground">
            Equal Weighting: <strong className="text-foreground font-semibold">33.3% per section</strong>
          </span>
        </div>
      </div>

      {/* High-Yield Practice CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl bg-primary/10 border border-primary/20 p-5">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Stuck below your target score?
          </h4>
          <p className="text-xs text-muted-foreground">
            Most students lose 30–50 points due to engineered test traps. Train your recognition on authentic syllabus problems.
          </p>
        </div>
        <Link
          href="/home?autostart=first_test&exam=GMAT%20Focus"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs hover:opacity-95 active:scale-[0.98] transition-all shrink-0 cursor-pointer"
        >
          <span>Take your first test</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
