// Path: components/landing/SupportedExamsBar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { examToSlug } from "@/lib/slugs";
import { ExamMark } from "./ExamMark";
import {
  ALL_SUPPORTED_EXAMS,
  type ExamCategoryFilter,
  type ExamMeta,
} from "./supported-exams-data";

export { ExamMark, ALL_SUPPORTED_EXAMS, type ExamCategoryFilter, type ExamMeta };

interface SupportedExamsBarProps {
  activeExam: string;
  onSelectExam: (examId: string) => void;
}

export default function SupportedExamsBar({
  activeExam,
  onSelectExam,
}: SupportedExamsBarProps) {
  const [filter, setFilter] = useState<ExamCategoryFilter>("all");

  const filteredExams =
    filter === "all"
      ? ALL_SUPPORTED_EXAMS
      : ALL_SUPPORTED_EXAMS.filter((e) => e.category === filter);

  return (
    <div className="w-full">
      {/* Header kicker & authority stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              All 13 Supported Standardized Exam Curricula
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-foreground/80 font-normal">
            Select any curriculum to test live diagnostic questions and distractor breakdowns:
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: "all", label: "All 13 Tracks" },
              { id: "study-abroad", label: "Study Abroad" },
              { id: "global-grad-pro", label: "Grad & Finance" },
              { id: "national-competitive", label: "National" },
            ] as const
          ).map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upfront Exam Badges Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {filteredExams.map((exam) => {
          const isActive = activeExam === exam.id;
          const slug = examToSlug(exam.id);

          return (
            <div
              key={exam.id}
              onClick={() => onSelectExam(exam.id)}
              className={cn(
                "group relative flex flex-col justify-between rounded-xl border p-3 transition-all cursor-pointer select-none text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm ring-1 ring-primary/30"
                  : "border-border/80 bg-card hover:border-primary/40 hover:bg-secondary/40 hover:shadow-xs",
              )}
            >
              <div>
                {/* Top Row: SVG Monogram & Active Dot or Syllabus Link */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10",
                    )}
                  >
                    <ExamMark id={exam.id} className="h-4 w-4" />
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <Link
                      href={`/practice/${slug}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Open ${exam.shortName} practice syllabus`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                {/* Exam Name */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold tracking-tight transition-colors truncate",
                        isActive
                          ? "text-blue-950 dark:text-blue-100 font-bold"
                          : "text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300",
                      )}
                    >
                      {exam.shortName}
                    </span>
                  </div>

                  {/* Authority / Board */}
                  <span className="block text-[10px] font-mono text-muted-foreground truncate leading-tight mt-0.5">
                    {exam.authority}
                  </span>
                </div>
              </div>

              {/* Bottom Tagline / Micro Focus */}
              <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground/80 truncate">
                  {exam.tagline}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Syllabus Jump & Trust Affirmation */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Click any exam to instantly load its authentic question & distractor breakdown in the simulator below.</span>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span>Explore All 13 Syllabi Portals</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
