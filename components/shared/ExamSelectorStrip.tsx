"use client";

import { cn } from "@/lib/utils";
import type { ExamKey } from "@/components/landing/landing-data";

export interface ExamTabItem {
  key: ExamKey;
  title: string;
  subtitle: string;
  slug: string;
}

export const EXAM_TABS: ExamTabItem[] = [
  { key: "gmat", title: "GMAT Focus", subtitle: "GMAC", slug: "gmat-focus" },
  { key: "sat", title: "Digital SAT", subtitle: "College Board", slug: "sat" },
  { key: "gre", title: "GRE General", subtitle: "ETS", slug: "gre" },
  { key: "cfa", title: "CFA Level 1", subtitle: "CFA Institute", slug: "cfa-level-1" },
  { key: "ielts", title: "IELTS", subtitle: "British Council", slug: "ielts-academic" },
  { key: "toefl", title: "TOEFL", subtitle: "ETS iBT", slug: "toefl-ibt" },
];

interface ExamSelectorStripProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
  className?: string;
  label?: string;
}

export function ExamSelectorStrip({
  activeExam,
  onExamChange,
  className,
  label,
}: ExamSelectorStripProps) {
  return (
    <div className={cn("space-y-2.5 max-w-3xl mx-auto w-full", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
          <span>{label}</span>
          <span className="text-foreground font-semibold">
            {EXAM_TABS.find((t) => t.key === activeExam)?.title}
          </span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {EXAM_TABS.map((item) => {
          const isSelected = activeExam === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onExamChange(item.key)}
              className={cn(
                "flex flex-col items-center text-center p-2.5 rounded-xl border text-xs transition-all cursor-pointer relative",
                isSelected
                  ? "border-foreground bg-foreground text-background shadow-xs font-semibold ring-1 ring-foreground/20"
                  : "border-border/80 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
              <span className="font-semibold text-xs">{item.title}</span>
              <span
                className={cn(
                  "text-[10px] mt-0.5 font-mono",
                  isSelected ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
