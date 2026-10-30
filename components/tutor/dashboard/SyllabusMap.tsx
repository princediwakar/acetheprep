// Path: components/tutor/dashboard/SyllabusMap.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen } from "lucide-react";
import type { SyllabusSubject } from "@/app/home/page";
import { cn } from "@/lib/utils";

interface SyllabusMapProps {
  syllabus: SyllabusSubject[];
  onDomainPractice: (domain: string, subjectName?: string) => void;
}

export function SyllabusMap({
  syllabus,
  onDomainPractice,
}: SyllabusMapProps) {
  const now = new Date();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-bold tracking-tight">Syllabus Topics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {syllabus.map((subject) => {
          return (
            <Card key={subject.name} className="flex flex-col border border-border/60 bg-card rounded-2xl h-fit">
              <CardHeader className="pt-4 pb-2 px-4 sm:px-5">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <div className="space-y-0.5">
                  {subject.domains.map((domain) => {
                    const pct = Math.round(domain.masteryScore * 100);
                    const notStarted = domain.totalAttempted === 0;
                    const isOverdue = !notStarted && domain.nextReviewAt ? new Date(domain.nextReviewAt) < now : false;
                    const isWeak = !notStarted && domain.masteryScore < 0.5;
                    const isStrong = !notStarted && domain.masteryScore >= 0.75;

                    const barColor = isWeak ? "bg-rose-500" : isStrong ? "bg-emerald-500" : "bg-amber-500";

                    return (
                      <div
                        key={domain.name}
                        className="px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-all duration-200 flex flex-col justify-center min-h-[66px] group opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1 space-y-1.5">
                            {/* Topic Title & Question Count Row */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-sm leading-snug text-foreground truncate">
                                {domain.name}
                              </span>
                              <span className="text-[11px] tabular-nums text-muted-foreground whitespace-nowrap shrink-0">
                                {notStarted ? "0 Qs" : `${domain.totalAttempted} Qs`}
                              </span>
                            </div>

                            {/* Metrics & Status Row */}
                            <TooltipProvider delayDuration={200}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2 cursor-help group/metric">
                                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden max-w-[100px] shrink-0">
                                      <div
                                        className={cn(
                                          "h-full rounded-full transition-all duration-500",
                                          notStarted ? "bg-transparent" : barColor
                                        )}
                                        style={{ width: `${notStarted ? 0 : Math.max(pct, 6)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs tabular-nums font-semibold text-foreground/80 shrink-0">
                                      {notStarted ? "Not started" : `${pct}%`}
                                    </span>
                                    {isOverdue && (
                                      <span className="text-[11px] font-medium text-amber-500 dark:text-amber-400 shrink-0">
                                        &middot; Due
                                      </span>
                                    )}
                                    {isStrong && !isOverdue && (
                                      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                                        &middot; Mastered
                                      </span>
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-popover text-popover-foreground border border-border shadow-lg max-w-xs text-xs space-y-1 p-2.5">
                                  <p className="font-bold text-foreground">
                                    {domain.name}: {notStarted ? "Not Started" : `${pct}% Mastery`}
                                  </p>
                                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                                    {notStarted
                                      ? "No questions answered yet. Practice this topic to start tracking your score."
                                      : `Based on your accuracy and speed across ${domain.totalAttempted} questions.`}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <Button
                            size="sm"
                            variant="default"
                            className="h-7 px-2.5 text-xs font-medium shrink-0 self-center transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                            onClick={() => onDomainPractice(domain.name, subject.name)}
                          >
                            Practice
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
