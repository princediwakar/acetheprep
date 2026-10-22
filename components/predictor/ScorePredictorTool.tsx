// Path: components/predictor/ScorePredictorTool.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calculator,
  Clock,
  Target,
  Calendar,
  Share2,
  Check,
  Sparkles,
  TrendingUp,
  Layers,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LANDING_EXAMS, type ExamKey } from "@/components/landing/landing-data";
import { ExamSelectorStrip } from "@/components/shared/ExamSelectorStrip";

export function ScorePredictorTool() {
  const searchParams = useSearchParams();
  const rawExam = searchParams.get("exam")?.toLowerCase() as ExamKey | undefined;
  const initialExamKey: ExamKey = rawExam && LANDING_EXAMS[rawExam] ? rawExam : "gmat";

  const [activeExam, setActiveExam] = useState<ExamKey>(initialExamKey);
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const scale = examConfig.scoreScale;
  const gapLogic = examConfig.scoreGapLogic;
  const curr = examConfig.curriculum;

  // Initialize scores from URL or defaults
  const rawCurrent = searchParams.get("current");
  const rawTarget = searchParams.get("target");

  const [currentScore, setCurrentScore] = useState<number>(() => {
    if (rawCurrent) {
      const parsed = Number(rawCurrent);
      if (!isNaN(parsed) && parsed >= scale.min && parsed <= scale.max) return parsed;
    }
    return scale.defaultCurrent;
  });

  const [targetScore, setTargetScore] = useState<number>(() => {
    if (rawTarget) {
      const parsed = Number(rawTarget);
      if (!isNaN(parsed) && parsed >= scale.min && parsed <= scale.max) return parsed;
    }
    return scale.defaultTarget;
  });

  const [copied, setCopied] = useState(false);

  // Synchronize when activeExam changes
  const handleExamChange = (newExam: ExamKey) => {
    setActiveExam(newExam);
    const newConfig = LANDING_EXAMS[newExam];
    setCurrentScore(newConfig.scoreScale.defaultCurrent);
    setTargetScore(newConfig.scoreScale.defaultTarget);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("exam", newExam);
      url.searchParams.set("current", String(newConfig.scoreScale.defaultCurrent));
      url.searchParams.set("target", String(newConfig.scoreScale.defaultTarget));
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Sync URL when slider changes
  const syncUrl = (cScore: number, tScore: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("exam", activeExam);
      url.searchParams.set("current", String(cScore));
      url.searchParams.set("target", String(tScore));
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleCurrentScoreChange = (val: number) => {
    setCurrentScore(val);
    let newTarget = targetScore;
    if (val >= targetScore) {
      newTarget = Math.min(scale.max, val + scale.step * 4);
      setTargetScore(newTarget);
    }
    syncUrl(val, newTarget);
  };

  const handleTargetScoreChange = (val: number) => {
    setTargetScore(val);
    let newCurrent = currentScore;
    if (val <= currentScore) {
      newCurrent = Math.max(scale.min, val - scale.step * 4);
      setCurrentScore(newCurrent);
    }
    syncUrl(newCurrent, val);
  };

  const handlePreset = (preset: { current: number; target: number }) => {
    setCurrentScore(preset.current);
    setTargetScore(preset.target);
    syncUrl(preset.current, preset.target);
  };

  const scoreDiff = Math.max(0, targetScore - currentScore);
  const questionsCount = gapLogic.getQuestionsCount(currentScore, targetScore);
  const multiplier = curr?.studyHoursMultiplier || 0.5;
  const estimatedHours = Math.max(10, Math.round(scoreDiff * multiplier));

  // Study timelines
  const weeks4Hours = Math.round((estimatedHours / 4) * 10) / 10;
  const weeks8Hours = Math.round((estimatedHours / 8) * 10) / 10;
  const weeks12Hours = Math.round((estimatedHours / 12) * 10) / 10;

  const handleCopyShareLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Sharable plan link copied to clipboard!");
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Could not copy link to clipboard.");
      }
    }
  };

  return (
    <div className="space-y-8" suppressHydrationWarning>
      {/* Exam Selector Tabs */}
      <ExamSelectorStrip
        activeExam={activeExam}
        onExamChange={handleExamChange}
      />

      {/* Main Tool Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-8">
        {/* Preset Header & Share Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div className="space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Quick Target Presets:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
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

          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Share This Study Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Current Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Target className="h-4 w-4 text-muted-foreground" />
                Current Baseline Score
              </span>
              <span className="font-mono text-xl font-bold text-foreground">
                {currentScore} {scale.unit}
              </span>
            </div>
            <input
              type="range"
              min={scale.min}
              max={scale.max - scale.step}
              step={scale.step}
              value={currentScore}
              onChange={(e) => handleCurrentScoreChange(Number(e.target.value))}
              className="w-full accent-foreground cursor-pointer h-2 bg-secondary rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>Min: {scale.min}</span>
              <span>Max: {scale.max}</span>
            </div>
          </div>

          {/* Target Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                Target Goal Score
              </span>
              <span className="font-mono text-xl font-bold text-primary">
                {targetScore} {scale.unit}
              </span>
            </div>
            <input
              type="range"
              min={scale.min + scale.step}
              max={scale.max}
              step={scale.step}
              value={targetScore}
              onChange={(e) => handleTargetScoreChange(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-secondary rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>Min: {scale.min}</span>
              <span>Max: {scale.max}</span>
            </div>
          </div>
        </div>

        {/* 3 Real-World Metrics Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-border/70 bg-muted/20 p-5 space-y-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">
              Score Differential
            </span>
            <div className="font-mono text-3xl font-extrabold text-foreground">
              +{scoreDiff} {scale.unit}
            </div>
            <p className="text-xs text-muted-foreground">
              From {currentScore} to {targetScore} {scale.unit}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 p-5 space-y-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">
              Estimated Study Time
            </span>
            <div className="font-mono text-3xl font-extrabold text-foreground">
              ~{estimatedHours} Hours
            </div>
            <p className="text-xs text-muted-foreground">
              Deliberate practice &amp; spaced review
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 p-5 space-y-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">
              Targeted Questions to Master
            </span>
            <div className="font-mono text-3xl font-extrabold text-foreground">
              ~{questionsCount} Questions
            </div>
            <p className="text-xs text-muted-foreground">
              Eliminating high-frequency misconceptions
            </p>
          </div>
        </div>

        {/* Study Plan Timeline Pace Breakdown */}
        <div className="space-y-4 pt-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider block">
            Pacing Options to Hit Your Target:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/80 bg-background p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-500" />
                  4-Week Sprint
                </span>
                <span className="text-[11px] text-muted-foreground">Fast Pace</span>
              </div>
              <div className="text-xl font-bold text-foreground font-mono">
                {weeks4Hours} hrs / week
              </div>
              <p className="text-[11px] text-muted-foreground">
                ~{Math.round(weeks4Hours / 7 * 60)} mins daily practice
              </p>
            </div>

            <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-primary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  8-Week Balanced
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  Recommended
                </span>
              </div>
              <div className="text-xl font-bold text-foreground font-mono">
                {weeks8Hours} hrs / week
              </div>
              <p className="text-[11px] text-muted-foreground">
                ~{Math.round(weeks8Hours / 7 * 60)} mins daily practice
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                  12-Week Steady
                </span>
                <span className="text-[11px] text-muted-foreground">Long-Term</span>
              </div>
              <div className="text-xl font-bold text-foreground font-mono">
                {weeks12Hours} hrs / week
              </div>
              <p className="text-[11px] text-muted-foreground">
                ~{Math.round(weeks12Hours / 7 * 60)} mins daily practice
              </p>
            </div>
          </div>
        </div>

        {/* High-Yield Topics to Close This Gap */}
        <div className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider block">
              High-Yield Topics to Close This Gap for {examConfig.shortName}:
            </span>
            <Link
              href={`/practice/${examConfig.curriculum?.blueprintUrl.split("/").pop() || "gmat-focus"}`}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <span>View full syllabus</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {gapLogic.mistakes.map((m, idx) => (
              <div
                key={m.title}
                className="rounded-xl border border-border/70 bg-background p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-primary/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase px-2 py-0.5 rounded bg-muted">
                      Priority {idx + 1}
                    </span>
                    <span className="text-sm font-bold text-foreground">{m.title}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </div>

                <Link
                  href={m.practiceUrl}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
                >
                  <span>Practice Questions</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
