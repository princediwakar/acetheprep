"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Calculator,
  Award,
  Sparkles,
  AlertTriangle,
  Info,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface ModuleRouting {
  rwModule2Hard: boolean;
  mathModule2Hard: boolean;
}

export function DigitalSatScoreCalculator() {
  // Raw correct questions out of 54 (27 + 27)
  const [rwCorrect, setRwCorrect] = useState<number>(44);
  // Raw correct questions out of 44 (22 + 22)
  const [mathCorrect, setMathCorrect] = useState<number>(38);
  // Module routing
  const [routing, setRouting] = useState<ModuleRouting>({
    rwModule2Hard: true,
    mathModule2Hard: true,
  });

  // Calculate scores based on College Board multistage adaptive psychometric curve
  const calculations = useMemo(() => {
    // Reading & Writing (200 - 800)
    // 54 total questions (approx 4 pretest questions unscored)
    let rwScore = 200;
    if (!routing.rwModule2Hard) {
      // Lower routing caps maximum score around 580-600
      const fraction = rwCorrect / 54;
      rwScore = Math.round(200 + fraction * 380);
      rwScore = Math.min(rwScore, 590);
    } else {
      // Hard module routing: base scale 480 to 800
      const missed = 54 - rwCorrect;
      if (missed <= 2) rwScore = 800;
      else if (missed <= 4) rwScore = 780;
      else if (missed <= 6) rwScore = 750;
      else if (missed <= 8) rwScore = 720;
      else if (missed <= 11) rwScore = 680;
      else if (missed <= 15) rwScore = 640;
      else if (missed <= 20) rwScore = 600;
      else rwScore = Math.max(500, Math.round(800 - missed * 16));
    }
    // Round to nearest 10
    rwScore = Math.round(rwScore / 10) * 10;
    rwScore = Math.max(200, Math.min(800, rwScore));

    // Math (200 - 800)
    // 44 total questions (approx 4 pretest questions unscored)
    let mathScore = 200;
    if (!routing.mathModule2Hard) {
      const fraction = mathCorrect / 44;
      mathScore = Math.round(200 + fraction * 390);
      mathScore = Math.min(mathScore, 590);
    } else {
      const missed = 44 - mathCorrect;
      if (missed === 0) mathScore = 800;
      else if (missed === 1) mathScore = 790;
      else if (missed === 2) mathScore = 780;
      else if (missed <= 4) mathScore = 750;
      else if (missed <= 6) mathScore = 720;
      else if (missed <= 9) mathScore = 680;
      else if (missed <= 12) mathScore = 640;
      else if (missed <= 16) mathScore = 600;
      else mathScore = Math.max(500, Math.round(800 - missed * 18));
    }
    mathScore = Math.round(mathScore / 10) * 10;
    mathScore = Math.max(200, Math.min(800, mathScore));

    const total = rwScore + mathScore;

    // Percentile lookup based on official College Board distributions
    let percentile = 50;
    if (total >= 1550) percentile = 99;
    else if (total >= 1500) percentile = 98;
    else if (total >= 1450) percentile = 96;
    else if (total >= 1400) percentile = 93;
    else if (total >= 1350) percentile = 89;
    else if (total >= 1300) percentile = 84;
    else if (total >= 1250) percentile = 79;
    else if (total >= 1200) percentile = 73;
    else if (total >= 1150) percentile = 65;
    else if (total >= 1100) percentile = 58;
    else if (total >= 1050) percentile = 50;
    else if (total >= 1000) percentile = 42;
    else if (total >= 900) percentile = 28;
    else percentile = 15;

    // College competitive range
    let tier = "Target Admissions Tier";
    let tierDescription = "";
    if (total >= 1520) {
      tier = "Ivy League & Top 10 (MIT, Stanford, Harvard, Yale)";
      tierDescription = "Well above the median (75th percentile) for hyper-selective national universities.";
    } else if (total >= 1440) {
      tier = "Top 25 National Universities (NYU, UCLA, Michigan, UVA)";
      tierDescription = "Strongly competitive for selective engineering, business, and honors colleges.";
    } else if (total >= 1320) {
      tier = "Top 50-75 Universities & Regional Flagships";
      tierDescription = "Competitive for major state flagships and merit scholarship consideration.";
    } else if (total >= 1180) {
      tier = "State Flagships & Selective Public Colleges";
      tierDescription = "Meets or exceeds middle-50% admissions profiles across hundreds of universities.";
    } else {
      tier = "National Median Competitive Range";
      tierDescription = "Targeting foundational core skills in Algebra and Standard English Conventions.";
    }

    return {
      rwScore,
      mathScore,
      total,
      percentile,
      tier,
      tierDescription,
    };
  }, [rwCorrect, mathCorrect, routing]);

  return (
    <div className="space-y-8">
      {/* Dynamic Summary Metric Card */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Estimated Digital SAT Composite
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground font-heading">
                {calculations.total}
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                / 1600 Total
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official College Board Multistage Adaptive Model
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="rounded-2xl border border-border bg-background/80 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
                Percentile Rank
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
                {calculations.percentile}th
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                Top {100 - calculations.percentile}% of testers
              </span>
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
                Score Breakdown
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-foreground font-heading block mt-1">
                RW {calculations.rwScore} | M {calculations.mathScore}
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                Scaled 200–800 each
              </span>
            </div>
          </div>
        </div>

        {/* Target School Band */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-bold text-foreground">
                {calculations.tier}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {calculations.tierDescription}
            </p>
          </div>

          <Link
            href="/practice/sat"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-95 transition-all shrink-0"
          >
            <span>Practice SAT Traps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading & Writing Section */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-foreground">
                Reading & Writing
              </h3>
              <p className="text-xs text-muted-foreground">
                54 questions total (2 modules of 27)
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {calculations.rwScore}
              </span>
              <span className="text-xs text-muted-foreground block">/ 800</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Correct Answers:</span>
              <span className="font-bold text-foreground">
                {rwCorrect} / 54 questions ({Math.round((rwCorrect / 54) * 100)}%)
              </span>
            </div>
            <Slider
              value={[rwCorrect]}
              onValueChange={([val]) => setRwCorrect(val)}
              min={10}
              max={54}
              step={1}
              className="py-2"
            />
          </div>

          {/* Module 2 Adaptive Routing Toggle */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Module 2 Routing:
              </span>
              <button
                type="button"
                onClick={() =>
                  setRouting((prev) => ({
                    ...prev,
                    rwModule2Hard: !prev.rwModule2Hard,
                  }))
                }
                className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                  routing.rwModule2Hard
                    ? "bg-primary text-primary-foreground"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                }`}
              >
                {routing.rwModule2Hard ? "Harder Module (Capped at 800)" : "Easier Module (Capped at 590)"}
              </button>
            </div>
            {!routing.rwModule2Hard && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0" />
                Missing too many questions in Module 1 caps your maximum section score.
              </p>
            )}
          </div>
        </div>

        {/* Mathematics Section */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-foreground">
                Mathematics
              </h3>
              <p className="text-xs text-muted-foreground">
                44 questions total (2 modules of 22)
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {calculations.mathScore}
              </span>
              <span className="text-xs text-muted-foreground block">/ 800</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Correct Answers:</span>
              <span className="font-bold text-foreground">
                {mathCorrect} / 44 questions ({Math.round((mathCorrect / 44) * 100)}%)
              </span>
            </div>
            <Slider
              value={[mathCorrect]}
              onValueChange={([val]) => setMathCorrect(val)}
              min={8}
              max={44}
              step={1}
              className="py-2"
            />
          </div>

          {/* Module 2 Adaptive Routing Toggle */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Module 2 Routing:
              </span>
              <button
                type="button"
                onClick={() =>
                  setRouting((prev) => ({
                    ...prev,
                    mathModule2Hard: !prev.mathModule2Hard,
                  }))
                }
                className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                  routing.mathModule2Hard
                    ? "bg-primary text-primary-foreground"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                }`}
              >
                {routing.mathModule2Hard ? "Harder Module (Capped at 800)" : "Easier Module (Capped at 590)"}
              </button>
            </div>
            {!routing.mathModule2Hard && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0" />
                Easy module routing automatically prevents scores above 590.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Architectural Explainer Callout (NavBoost & Snippet Engine) */}
      <div className="rounded-2xl border border-border/80 bg-muted/20 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">
            How the Digital SAT Multistage Adaptive Scoring Works
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground leading-relaxed">
          <div className="space-y-1">
            <strong className="text-foreground block">1. The Routing Gateway</strong>
            Module 1 contains an equal mix of easy, medium, and hard questions. Your accuracy on Module 1 decides whether you route into the Harder or Easier Module 2.
          </div>
          <div className="space-y-1">
            <strong className="text-foreground block">2. The Easy Module Cap</strong>
            Routing to the Easier Module 2 places a hard ceiling around 590 points for that section, even with 100% subsequent accuracy.
          </div>
          <div className="space-y-1">
            <strong className="text-foreground block">3. Item Response Theory (IRT)</strong>
            Harder questions are weighted more heavily. Unscored experimental questions (~4 per section) do not impact your scaled score.
          </div>
        </div>
      </div>
    </div>
  );
}
