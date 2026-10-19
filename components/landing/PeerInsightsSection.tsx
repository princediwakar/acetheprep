// Path: components/landing/PeerInsightsSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { CountUp } from "@/components/shared/CountUp";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

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
    exam: "JEE Main",
    topic: "Rotational Dynamics & Sign Traps",
    detail: "78% fail due to coordinate sign inversion in torque equations.",
    value: 22,
    colorClass: "text-primary",
    strokeColor: "hsl(var(--primary))",
  },
  {
    exam: "NEET",
    topic: "Mendelian Genetics Ratios",
    detail: "46% confuse phenotypic (3:1) with genotypic (1:2:1) distributions.",
    value: 54,
    colorClass: "text-amber-600 dark:text-amber-400",
    strokeColor: "#d97706",
  },
  {
    exam: "UPSC CSE",
    topic: "CSAT Syllogism Fallacies",
    detail: "72% fall for undistributed middle term intuition traps.",
    value: 28,
    colorClass: "text-primary",
    strokeColor: "hsl(var(--primary))",
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
            Telemetry
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
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          {/* Centered percentage */}
          <div className="absolute flex flex-col items-center">
            <span className={`font-mono text-2xl font-bold tracking-tight ${colorClass}`}>
              <CountUp to={value} suffix="%" />
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
              Peer Accuracy
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
          <span>Test your mastery on this topic</span>
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
            <Activity className="h-3.5 w-3.5" />
            Distractor Telemetry
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15] text-balance">
            Predict your blindspots before exam day exposes them.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            Real candidate telemetry across thousands of sessions. Know which traps trip up the majority of candidates so you don&apos;t repeat their mistakes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {gaugeData.map((gauge) => (
            <GaugeCard key={gauge.topic} {...gauge} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-5 py-2.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent"
          >
            <span>Explore all 10 exam track telemetry reports</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
