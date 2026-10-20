// Path: components/tutor/dashboard/SyllabusMap.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import type { SyllabusSubject } from "@/app/home/page";

interface SyllabusMapProps {
  syllabus: SyllabusSubject[];
  isLinearMode: boolean;
  onToggleLinear: (checked: boolean) => void;
  onDomainPractice: (domain: string, subjectName?: string) => void;
}

export function SyllabusMap({
  syllabus,
  isLinearMode,
  onToggleLinear,
  onDomainPractice,
}: SyllabusMapProps) {
  const now = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Syllabus Map</h2>
          <p className="text-muted-foreground text-sm">Practice topics individually based on mastery.</p>
        </div>
        <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg">
          <Label htmlFor="linear-mode" className="text-sm font-medium cursor-pointer">
            Linear Mode
          </Label>
          <input
            type="checkbox"
            id="linear-mode"
            checked={isLinearMode}
            onChange={(e) => onToggleLinear(e.target.checked)}
            className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {syllabus.map((subject) => {
          let hasWeakPrerequisite = false;

          return (
            <Card key={subject.name} className="flex flex-col border shadow-sm h-fit">
              <CardHeader className="py-4 px-5 border-b bg-muted/20">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {subject.domains.map((domain) => {
                    const pct = Math.round(domain.masteryScore * 100);
                    const notStarted = domain.totalAttempted === 0;
                    const isOverdue = !notStarted && domain.nextReviewAt ? new Date(domain.nextReviewAt) < now : false;
                    const isWeak = domain.masteryScore < 0.3 && !notStarted;
                    const isStrong = domain.masteryScore >= 0.7 && !notStarted;

                    let isFutureTopic = false;
                    if (isLinearMode) {
                      if (hasWeakPrerequisite) {
                        isFutureTopic = true;
                      }
                      if (isWeak || notStarted) {
                        hasWeakPrerequisite = true;
                      }
                    }

                    const barColor = isWeak ? "bg-red-500" : isStrong ? "bg-green-500" : "bg-yellow-500";

                    return (
                      <div
                        key={domain.name}
                        className={`p-4 hover:bg-muted/30 transition-all flex flex-col gap-3 group ${
                          isFutureTopic ? "opacity-50 hover:opacity-100 grayscale hover:grayscale-0" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                              <span className="font-medium text-sm leading-snug mr-1">{domain.name}</span>
                              {isOverdue && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] whitespace-nowrap uppercase px-1.5 h-4 border-orange-500/30 text-orange-600 bg-orange-500/10 shrink-0"
                                >
                                  <Clock className="w-3 h-3 mr-1" /> Due
                                </Badge>
                              )}
                              {isStrong && !isOverdue && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] whitespace-nowrap uppercase px-1.5 h-4 border-green-500/30 text-green-600 bg-green-500/10 shrink-0"
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Strong
                                </Badge>
                              )}
                            </div>
                            <TooltipProvider delayDuration={200}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-2.5 cursor-help group/metric">
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden w-24 shrink-0">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${notStarted ? "bg-transparent" : barColor}`}
                                        style={{ width: `${notStarted ? 0 : Math.max(pct, 4)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap group-hover/metric:text-foreground transition-colors">
                                      {notStarted ? "Not started · 0 Qs" : `${pct}% Mastery · ${domain.totalAttempted} Q${domain.totalAttempted !== 1 ? "s" : ""}`}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-popover text-popover-foreground border border-border shadow-lg max-w-xs text-xs space-y-1 p-2.5">
                                  <p className="font-bold text-foreground">
                                    {domain.name}: {notStarted ? "Not Started" : `${pct}% Mastery`}
                                  </p>
                                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                                    {notStarted
                                      ? "No questions attempted yet. Practice to establish your baseline calibration and spaced repetition curve."
                                      : `Calibrated via SM-2 spaced repetition based on accuracy and solving speed across ${domain.totalAttempted} questions.`}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <Button
                            size="sm"
                            variant={isOverdue ? "default" : "outline"}
                            className="shrink-0 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 cursor-pointer"
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
