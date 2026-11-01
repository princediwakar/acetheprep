// Path: components/tutor/dashboard/SmartStartStrip.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { SyllabusDomain, WeakSpotItem } from "@/app/home/page";

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
      {/* Card 1: Today's Focus */}
      <Card className="border border-border/60 bg-card rounded-2xl flex flex-col justify-between transition-all">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-5">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground tracking-tight">
                Daily Review
              </h3>
              <span className="text-xs text-muted-foreground font-mono">10 Questions</span>
            </div>

            {/* Targeted Weak Topics List */}
            {hasWeakSpots ? (
              <div className="divide-y divide-border/30 text-xs">
                {topWeakSpots!.map((spot) => (
                  <div
                    key={spot.domain}
                    className="flex items-center justify-between py-2 first:pt-0 last:pb-0 gap-3"
                  >
                    <span className="font-medium text-foreground truncate">
                      {spot.domain}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                      {spot.badgeText}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-2">
                Calibrated to your {examName || "exam"} profile. Start your first session to uncover personal score leaks.
              </p>
            )}
          </div>

          <Button
            size="default"
            className="w-full cursor-pointer font-bold mt-auto h-9"
            onClick={onAlgorithmicReview}
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-current" /> Start Today's Practice
          </Button>
        </CardContent>
      </Card>

      {/* Card 2: Curriculum Pace */}
      <Card className="border border-border/60 bg-card rounded-2xl flex flex-col justify-between transition-all">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-5">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground tracking-tight">
                Current Topic
              </h3>
              {nextLinearDomain && (
                <span className="text-xs text-muted-foreground font-mono tabular-nums">
                  {Math.round(nextLinearDomain.masteryScore * 100)}% mastery
                </span>
              )}
            </div>

            {nextLinearDomain ? (
              <div className="space-y-2.5 py-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground truncate">
                    {nextLinearDomain.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono tabular-nums">
                    {nextLinearDomain.totalAttempted > 0
                      ? `${nextLinearDomain.totalAttempted} Qs attempted`
                      : "Not started"}
                  </span>
                </div>

                {/* Minimal Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        4,
                        Math.min(100, Math.round(nextLinearDomain.masteryScore * 100))
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-2">
                All curriculum topics complete!
              </p>
            )}
          </div>

          <Button
            size="default"
            variant="outline"
            className="w-full cursor-pointer font-semibold border-border/80 hover:bg-muted text-foreground transition-all mt-auto h-9"
            onClick={onLinearNext}
            disabled={!nextLinearDomain}
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-current text-muted-foreground" /> Practice {nextLinearDomain?.name || "Next Topic"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
