"use client";

import { Target, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

function getBandColor(width: number) {
  if (width <= 4 || width <= 30) return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (width <= 8 || width <= 70) return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";
  return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400";
}

function getCalibrationBadge(source: string) {
  switch (source) {
    case "fully_calibrated":
    case "proprietary": return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
    case "blended": return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
    case "gmac_focus_tables": return "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30";
    case "ets_gre_tables": return "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export function ProjectionHero({ prediction, examName }: ProjectionHeroProps) {
  if (!prediction) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-border/80 bg-card/60 dark:border-white/10 dark:bg-slate-900/50 text-xs">
        <Target className="w-4 h-4 text-primary shrink-0" />
        <span className="text-muted-foreground">
          No projection yet — complete your first session to calibrate your {examName || "exam"} score band.
        </span>
      </div>
    );
  }

  const bandWidth = prediction.overallBandWidth;
  const halfBand = Math.round(bandWidth / 2);

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border/80 bg-card/80 backdrop-blur-xs px-4 py-3 sm:px-5 shadow-2xs transition-all",
        "dark:border-white/10 dark:bg-slate-900/80",
        prediction.isFrozen && "ring-1 ring-amber-500/30"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Score & Spread */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                {prediction.metricLabel || `Projected ${examName ? `${examName} ` : ""}Score`}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground tabular-nums">
                  {prediction.displayValue || `${prediction.overallBandLower}–${prediction.overallBandUpper}`}
                </span>
                <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", getBandColor(bandWidth))}>
                  ±{halfBand} pts
                </span>
                {prediction.secondaryLabel && (
                  <span className="text-xs font-medium text-muted-foreground font-mono">
                    {prediction.secondaryLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calibration Status & Sessions */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground self-start sm:self-center shrink-0">
          <span className="tabular-nums font-medium">
            {prediction.totalTrackedSessions} session{prediction.totalTrackedSessions !== 1 ? "s" : ""}
          </span>
          <span className="text-border dark:text-slate-700">•</span>
          {prediction.calibrationSource !== "proprietary" && prediction.calibrationSource !== "fully_calibrated" ? (
            <span
              className={cn(
                "px-2 py-0.5 rounded-md border text-[11px] font-medium",
                getCalibrationBadge(prediction.calibrationSource)
              )}
            >
              {prediction.calibrationSource === "public_nta"
                ? "NTA Prior"
                : prediction.calibrationSource === "gmac_focus_tables"
                ? "GMAC Norms"
                : prediction.calibrationSource === "ets_gre_tables"
                ? "ETS Norms"
                : "Blended"}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium">
              Calibrated
            </span>
          )}
          {prediction.isFrozen && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-700 border border-amber-500/25 dark:text-amber-400">
              <Lock className="w-3 h-3" />
              Locked
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
