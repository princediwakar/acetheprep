// Path: components/tutor/dashboard/SmartStartStrip.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Play, AlertCircle, Clock, Sparkles } from "lucide-react";
import type { SyllabusDomain, WeakSpotItem } from "@/app/home/page";
import { cn } from "@/lib/utils";

interface SmartStartStripProps {
  nextLinearDomain: SyllabusDomain | null;
  topWeakSpots?: WeakSpotItem[];
  examName?: string;
  onAlgorithmicReview: () => void;
  onLinearNext: () => void;
}

export function SmartStartStrip({
  nextLinearDomain,
  topWeakSpots,
  examName,
  onAlgorithmicReview,
  onLinearNext,
}: SmartStartStripProps) {
  const hasWeakSpots = Boolean(topWeakSpots && topWeakSpots.length > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card 1: Today's Weak-Spot Fix (Score Booster) */}
      <Card className="border-primary/25 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/50 transition-all shadow-xs flex flex-col justify-between">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                    Today&apos;s Weak-Spot Fix
                  </h3>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10"
              >
                Score Booster
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              10 timed questions targeted at your biggest score leaks to build real test instinct.
            </p>

            {/* Targeted Weak Topics List */}
            {hasWeakSpots ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Targeting Today</span>
                  <span className="text-[10px] font-normal lowercase">calibrated from your errors</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {topWeakSpots!.map((spot) => {
                    const isError = spot.reason === "recent_errors";
                    const isOverdue = spot.reason === "due_for_review";
                    return (
                      <div
                        key={spot.domain}
                        className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-background/70 border border-border/70 hover:border-border transition-colors gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isError ? (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          ) : isOverdue ? (
                            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                          )}
                          <span className="font-semibold text-foreground truncate">
                            {spot.domain}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "text-[11px] font-medium shrink-0 px-2 py-0.5 rounded-md border",
                            isError
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                              : isOverdue
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                : "bg-primary/10 text-primary border-primary/20",
                          )}
                        >
                          {spot.badgeText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-background/50 border border-border/60 text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>Calibrating to your exam profile. Start your first session to uncover personal score leaks.</span>
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="w-full cursor-pointer font-bold shadow-xs mt-2"
            onClick={onAlgorithmicReview}
          >
            <Play className="mr-2 h-4 w-4 fill-current" /> Start Weak-Spot Fix (10Q)
          </Button>
        </CardContent>
      </Card>

      {/* Card 2: Next in Curriculum */}
      <Card className="border-border bg-card hover:border-border/80 transition-all shadow-xs flex flex-col justify-between">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                    Next in Curriculum
                  </h3>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10"
              >
                Syllabus
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {nextLinearDomain ? (
                <>
                  Next topic in official sequence:{" "}
                  <strong className="text-foreground font-semibold">{nextLinearDomain.name}</strong>.
                  Master all syllabus topics systematically.
                </>
              ) : (
                "You have completed all curriculum topics! Focus on daily weak-spot drills to protect your score."
              )}
            </p>

            {nextLinearDomain && (
              <div className="p-3 rounded-lg bg-background/50 border border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Topic Mastery:</span>
                <span className="font-bold text-foreground">
                  {Math.round(nextLinearDomain.masteryScore * 100)}%
                </span>
              </div>
            )}
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="w-full cursor-pointer font-semibold mt-2"
            onClick={onLinearNext}
            disabled={!nextLinearDomain}
          >
            <Play className="mr-2 h-4 w-4 fill-current" /> Practice {nextLinearDomain?.name || "Next Topic"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

