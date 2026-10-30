// Path: components/practice/ExamCTABanner.tsx

import Link from "next/link";
import { getDaysUntilExam, getExamDateDisplay } from "@/lib/constants/practice";
import { ArrowRight, Sparkles, Target, Calendar } from "lucide-react";

interface ExamCTABannerProps {
  examName: string;
}

export default function ExamCTABanner({ examName }: ExamCTABannerProps) {
  const daysRemaining = getDaysUntilExam(examName);
  const dateDisplay = getExamDateDisplay(examName);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-6 sm:p-10 shadow-sm text-foreground">
      {/* Subtle warm glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Target Exam Study Plan</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-normal text-foreground tracking-tight">
            Ready to master {examName}?
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {daysRemaining !== null && daysRemaining > 0 ? (
              <>
                Only <strong className="text-foreground">{daysRemaining} days</strong> remaining until {examName}{dateDisplay ? ` (${dateDisplay})` : ""}. Set up your study timeline to schedule daily practice drills and prevent memory decay.
              </>
            ) : (
              `Configure your target exam date, calibrate your weak areas, and receive daily spaced repetition drills to eliminate common traps.`
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
          <Link
            href={`/setup?exam=${encodeURIComponent(examName)}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <span>Set Up Free Study Plan</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background/80 hover:bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-all"
          >
            <span>Pro Mock Exams</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
