// Path: components/tutor/setup/ExamGoalSetup.tsx

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelfAssessment, TimeMode } from "@/types/tutor";
import { SegmentedControl } from "./SegmentedControl";
import { TimeModeBadge } from "./TimeModeBadge";
import { EXAM_CATEGORIES } from "@/lib/constants/exam-groups";

function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface ExamGoalSetupProps {
  exam: string;
  examNames: string[];
  targetDate: string;
  subjects: string[];
  assessments: Record<string, SelfAssessment>;
  timeMode: TimeMode | null;
  onExamChange: (value: string) => void;
  onTargetDateChange: (value: string) => void;
  onAssessmentChange: (subject: string, level: SelfAssessment) => void;
  selectRef: React.RefObject<HTMLButtonElement | null>;
}

export function ExamGoalSetup({
  exam,
  examNames,
  targetDate,
  subjects,
  assessments,
  timeMode,
  onExamChange,
  onTargetDateChange,
  onAssessmentChange,
  selectRef,
}: ExamGoalSetupProps) {
  // Pre-calculate categorized exams and any leftovers
  const categorizedExams = new Set(EXAM_CATEGORIES.flatMap((c) => c.exams));
  const uncategorized = examNames.filter((e) => !categorizedExams.has(e));

  return (
    <Card className="w-full">
      <CardContent className="space-y-5 pt-6">
        {/* Exam Selection */}
        <div className="space-y-2">
          <Label htmlFor="exam-select">Exam</Label>
          <Select value={exam} onValueChange={onExamChange}>
            <SelectTrigger ref={selectRef} id="exam-select">
              <SelectValue placeholder="Select your exam..." />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {EXAM_CATEGORIES.map((category) => {
                const categoryExams = category.exams.filter((e) => examNames.includes(e));
                if (categoryExams.length === 0) return null;
                return (
                  <SelectGroup key={category.id} className="py-1">
                    <SelectLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-2 py-1 bg-muted/40 rounded-sm mb-1">
                      {category.name}
                    </SelectLabel>
                    {categoryExams.map((name) => (
                      <SelectItem key={name} value={name} className="cursor-pointer pl-4">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
              {uncategorized.length > 0 && (
                <SelectGroup className="py-1 border-t">
                  <SelectLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-2 py-1">
                    Other Exams
                  </SelectLabel>
                  {uncategorized.map((name) => (
                    <SelectItem key={name} value={name} className="cursor-pointer pl-4">
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Date Selection with Instant Horizon Chips */}
        {exam && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <Label htmlFor="target-date">Test Date</Label>
              {timeMode && <TimeModeBadge mode={timeMode} />}
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "1 Month", days: 30 },
                { label: "3 Months", days: 90 },
                { label: "6 Months", days: 180 },
              ].map((preset) => {
                const targetISO = (() => {
                  const d = new Date();
                  d.setDate(d.getDate() + preset.days);
                  return d.toISOString().split("T")[0];
                })();
                const isSelected = targetDate === targetISO;

                return (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => onTargetDateChange(targetISO)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border p-2.5 text-center text-xs transition-all cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/10 font-semibold text-primary shadow-sm"
                        : "border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Date Input */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Or pick a date:</span>
                <input
                  id="target-date"
                  type="date"
                  min={getTodayISO()}
                  value={targetDate}
                  onChange={(e) => onTargetDateChange(e.target.value)}
                  className={cn(
                    "flex h-8 max-w-[180px] rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs shadow-sm",
                    "transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Optional Self-Assessment (Collapsible) */}
        {exam && subjects.length > 0 && (
          <details className="pt-2 border-t border-border/50 group text-xs">
            <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground py-1 select-none flex items-center justify-between">
              <span>Customize starting levels (optional &bull; balanced by default)</span>
              <span className="text-[10px] text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="space-y-2.5 pt-3">
              <p className="text-[11px] text-muted-foreground">
                All subjects start balanced. Adjust any topic where you need extra practice or already feel strong:
              </p>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border/60 px-3 py-2"
                  >
                    <span className="text-xs font-medium truncate">
                      {subject}
                    </span>
                    <SegmentedControl
                      value={assessments[subject] ?? null}
                      onChange={(level) => onAssessmentChange(subject, level)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

// Backward compatibility alias
export const Step1RealityAnchor = ExamGoalSetup;
export type { ExamGoalSetupProps as Step1RealityAnchorProps };

