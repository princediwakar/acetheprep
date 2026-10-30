"use client";

import { Target, Lock, Flame } from "lucide-react";

interface PredictionBand {
  overallPercentile: number;
  overallBandLower: number;
  overallBandUpper: number;
  overallBandWidth: number;
  calibrationSource: string;
  disclaimer: string;
  isFrozen: boolean;
  totalTrackedSessions: number;
  metricLabel?: string;
  displayValue?: string;
  secondaryLabel?: string;
}

export interface ProjectionHeroProps {
  prediction: PredictionBand | null;
  examName?: string;
  readinessIndex?: number;
  streak?: number;
  daysRemaining?: number;
}

function formatSecondaryLabel(label?: string) {
  if (!label) return "";
  return label.replace(/\b(\d+)(st|nd|rd|th)\b/gi, (_, num) => {
    const n = parseInt(num, 10);
    const mod100 = n % 100;
    let suffix = "th";
    if (mod100 < 11 || mod100 > 13) {
      const lastDigit = n % 10;
      if (lastDigit === 1) suffix = "st";
      else if (lastDigit === 2) suffix = "nd";
      else if (lastDigit === 3) suffix = "rd";
    }
    return `${n}${suffix}`;
  });
}

export function ProjectionHero({
  prediction,
  examName,
  readinessIndex,
  streak,
  daysRemaining,
}: ProjectionHeroProps) {
  if (!prediction) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-border/80 dark:border-white/10 text-xs text-muted-foreground">
        <Target className="w-4 h-4 text-primary shrink-0" />
        <span>
          No projection yet — complete your first session to calibrate your {examName || "exam"} score band.
        </span>
      </div>
    );
  }

  const bandWidth = prediction.overallBandWidth;
  const halfBand = Math.round(bandWidth / 2);

  return (
    <div className="relative py-1 sm:py-2 px-0.5 sm:px-0 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Projected Score & Tolerance */}
        <div className="space-y-1 min-w-0">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            {prediction.metricLabel || `Projected ${examName ? `${examName} ` : ""}Score`}
          </span>

          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-foreground tabular-nums leading-none">
              {prediction.displayValue || `${prediction.overallBandLower}–${prediction.overallBandUpper}`}
            </span>
            <span className="text-xs font-semibold text-muted-foreground font-mono">
              ±{halfBand} pts
            </span>
            {prediction.secondaryLabel && (
              <span className="text-xs text-muted-foreground font-mono">
                &middot; {formatSecondaryLabel(prediction.secondaryLabel)}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground/75 font-mono">
              ({prediction.calibrationSource === "proprietary" || prediction.calibrationSource === "fully_calibrated" ? "Calibrated" : "Blended"})
            </span>
            {prediction.isFrozen && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-500 font-mono">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            )}
          </div>
        </div>

        {/* Right: Unified Telemetry Cluster (Readiness, Streak, Tracked Sessions) */}
        <div className="flex items-center gap-5 sm:gap-8 pt-2 md:pt-0 shrink-0">
          {readinessIndex !== undefined && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Readiness
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums leading-none">
                  {readinessIndex}
                </span>
                <span className="text-xs text-muted-foreground font-medium">/100</span>
              </div>
            </div>
          )}

          {Boolean(streak && streak > 0) && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Streak
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums leading-none">
                  {streak}d
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Sessions
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums leading-none">
                {prediction.totalTrackedSessions}
              </span>
              <span className="text-xs text-muted-foreground font-medium">done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
