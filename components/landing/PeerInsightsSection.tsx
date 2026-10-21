// Path: components/landing/PeerInsightsSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";

const CIRCUMFERENCE = 2 * Math.PI * 40; // ~251.33

interface GaugeData {
  exam: string;
  topic: string;
  detail: string;
  value: number;
  colorClass: string;
  strokeColor: string;
}

const gaugeData: GaugeData[] = [
  {
    exam: "Digital SAT",
    topic: "Extraneous Roots & Signs",
    detail: "74% of students forget to check candidate solutions in the original equation.",
    value: 26,
    colorClass: "text-primary",
    strokeColor: "hsl(var(--primary))",
  },
  {
    exam: "GMAT Focus",
    topic: "Absolute Values & Zero Boundary",
    detail: "68% of students miss the zero boundary condition |x| = x when testing values.",
    value: 32,
    colorClass: "text-amber-600 dark:text-amber-400",
    strokeColor: "#d97706",
  },
  {
    exam: "CFA Level 1",
    topic: "Modified Duration & Convexity",
    detail: "72% of candidates miss price error approximation for large yield shocks.",
    value: 28,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    strokeColor: "#059669",
  },
];

function GaugeCard({ exam, topic, detail, value, colorClass, strokeColor }: GaugeData) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * value) / 100;

  return (
    <div
      ref={ref}
      className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-mono font-medium text-foreground">
            {exam}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            Student Data
          </span>
        </div>

        <div className="relative my-6 flex items-center justify-center">
          <svg
            width="128"
            height="128"
            viewBox="0 0 100 100"
            className="-rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              className="text-muted/70"
            />
            {/* Foreground animated circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={strokeColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={
                inView ? { strokeDashoffset: dashOffset } : { strokeDashoffset: CIRCUMFERENCE }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          {/* Centered percentage */}
          <div className="absolute flex flex-col items-center">
            <span className={`font-mono text-2xl font-bold tracking-tight ${colorClass}`}>
              {value}%
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
              Average Accuracy
            </span>
          </div>
        </div>

        <h3 className="font-heading text-lg font-medium text-foreground text-center">
          {topic}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground text-center">
          {detail}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 text-center">
        <Link
          href={`/practice/${exam.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <span>Practice this topic free</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default function PeerInsightsSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70 bg-muted/20">
      <MaxWidthWrapper>
        <div className="space-y-4 text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <BarChart3 className="h-3.5 w-3.5" />
            Common Pitfalls by Exam
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15] text-balance">
            Where most students lose marks on exam day.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            Real performance data across thousands of practice sessions reveals the concepts that trip students up most. Learn where others stumble so you can avoid the same mistakes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {gaugeData.map((gauge) => (
            <GaugeCard key={gauge.topic} {...gauge} />
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/setup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Set Up Your Exam Profile Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/insights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card px-5 py-3 text-xs font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent"
          >
            <span>View All Exam Topic Analyses</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
