// Path: components/landing/CognitiveFlowSection.tsx

import Link from "next/link";
import { HeaderSection } from "@/components/shared/HeaderSection";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { GitBranch, ShieldAlert, Cpu, ArrowRight } from "lucide-react";

interface FlowStep {
  icon: typeof GitBranch;
  stepNumber: string;
  badge: string;
  title: string;
  description: string;
  metric: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    icon: ShieldAlert,
    stepNumber: "01",
    badge: "01 • Mistake Analysis",
    title: "Understand Why Wrong Answers Look Right",
    description:
      "Competitive exam questions feature tempting choices that look correct at first glance. AceThePrep explains why common wrong options seem appealing, helping you learn the underlying principles and choose correctly with confidence.",
    metric: "Eliminate Repeat Mistakes",
  },
  {
    icon: Cpu,
    stepNumber: "02",
    badge: "02 • Timed Recall",
    title: "Fast, Unassisted Recall Under Pressure",
    description:
      "Under strict test-day countdowns, you can't afford to hesitate on core concepts. Focused 10-question practice sessions train your memory to recognize question patterns and solve without second-guessing.",
    metric: "Fast Problem Solving",
  },
  {
    icon: GitBranch,
    stepNumber: "03",
    badge: "03 • Spaced Retention",
    title: "Remember Everything on Exam Day",
    description:
      "Cramming fades within 48 hours. AceThePrep schedules reviews at 3, 7, and 14 day intervals, locking formulas and concepts into permanent long-term memory so you don't forget on test day.",
    metric: "Permanent Recall",
  },
];

function MistakeAnalysisVisual() {
  return (
    <div className="mt-5 rounded-xl border border-border/80 bg-background/90 p-3.5 text-xs font-mono space-y-2.5 shadow-xs">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-1.5 border-b border-border/50">
        <span className="font-semibold text-foreground">Diagnostic Mistake Breakdown</span>
        <span className="text-rose-500 font-medium">Algebraic Trap</span>
      </div>
      <div className="text-foreground/90 font-medium">
        <span className="text-muted-foreground mr-1.5">Problem:</span>
        √(x + 2) = x
      </div>
      <div className="rounded-lg bg-rose-500/10 border border-rose-500/25 p-2 text-rose-700 dark:text-rose-300">
        <div className="font-semibold flex items-center justify-between">
          <span>Candidate x = -1</span>
          <span className="text-[10px] uppercase font-bold tracking-wider">Extraneous</span>
        </div>
        <p className="text-[11px] mt-0.5 text-rose-600/90 dark:text-rose-400">
          √1 = 1 ≠ -1. Squaring created a false root.
        </p>
      </div>
      <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/25 p-2 text-emerald-700 dark:text-emerald-300">
        <div className="font-semibold flex items-center justify-between">
          <span>Valid Root: x = 2</span>
          <span className="text-[10px] uppercase font-bold tracking-wider">Verified</span>
        </div>
        <p className="text-[11px] mt-0.5 text-emerald-600/90 dark:text-emerald-400">
          Substitute back to audit boundary conditions.
        </p>
      </div>
    </div>
  );
}

function TimedRecallVisual() {
  return (
    <div className="mt-5 rounded-xl border border-border/80 bg-background/90 p-3.5 text-xs font-mono space-y-2.5 shadow-xs">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-1.5 border-b border-border/50">
        <span className="font-semibold text-foreground">Retrieval Latency Gauge</span>
        <span className="text-blue-500 font-medium">Target Pacing</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Target Solve Window:</span>
        <span className="text-foreground font-semibold">35s – 50s</span>
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex relative">
          <div className="w-1/4 bg-amber-500/40" />
          <div className="w-1/2 bg-blue-500/80 relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
          </div>
          <div className="w-1/4 bg-rose-500/40" />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>10s (Guess)</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">38s (Calibrated)</span>
          <span>90s+ (Hesitation)</span>
        </div>
      </div>
      <div className="rounded-lg bg-blue-500/10 border border-blue-500/25 p-2 text-[11px] text-blue-700 dark:text-blue-300">
        <span className="font-semibold">Unassisted Recall:</span> 94% accuracy with zero formula lookup under test-day countdowns.
      </div>
    </div>
  );
}

function SpacedRetentionVisual() {
  return (
    <div className="mt-5 rounded-xl border border-border/80 bg-background/90 p-3.5 text-xs font-mono space-y-2 shadow-xs">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-1 border-b border-border/50">
        <span className="font-semibold text-foreground">Forgetting Curve vs. SM-2</span>
        <span className="text-emerald-500 font-medium">+78% Retained</span>
      </div>
      <div className="relative pt-1">
        <svg viewBox="0 0 320 120" fill="none" className="w-full h-auto">
          {/* Subtle grid lines */}
          <line x1="20" y1="20" x2="310" y2="20" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
          <line x1="20" y1="60" x2="310" y2="60" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
          <line x1="20" y1="100" x2="310" y2="100" stroke="currentColor" strokeOpacity="0.15" />

          {/* Forgetting curve (dashed red) */}
          <path d="M25 22 Q 60 95, 305 102" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />

          {/* Spaced retrieval spikes (solid blue/emerald) */}
          <path d="M65 75 Q 67 25, 75 22 Q 115 65, 140 70" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M140 70 Q 142 24, 150 22 Q 200 48, 230 52" stroke="#06b6d4" strokeWidth="2" fill="none" />
          <path d="M230 52 Q 232 23, 240 22 Q 275 30, 305 32" stroke="#10b981" strokeWidth="2.5" fill="none" />

          {/* Markers */}
          <circle cx="75" cy="22" r="3" fill="#3b82f6" />
          <circle cx="150" cy="22" r="3" fill="#06b6d4" />
          <circle cx="240" cy="22" r="3" fill="#10b981" />

          {/* Labels */}
          <text x="25" y="114" fill="currentColor" fillOpacity="0.5" fontSize="9" fontFamily="monospace">Day 0</text>
          <text x="70" y="114" fill="#3b82f6" fontSize="9" fontFamily="monospace">D1</text>
          <text x="145" y="114" fill="#06b6d4" fontSize="9" fontFamily="monospace">D3</text>
          <text x="235" y="114" fill="#10b981" fontSize="9" fontFamily="monospace">D7</text>
          <text x="282" y="114" fill="currentColor" fillOpacity="0.5" fontSize="9" fontFamily="monospace">Exam</text>

          <text x="226" y="16" fill="#10b981" fontSize="9" fontWeight="600" fontFamily="monospace">94% Retained</text>
          <text x="170" y="98" fill="#ef4444" fontSize="9" fontFamily="monospace">18% Cramming</text>
        </svg>
      </div>
      <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-border/30 text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Cramming decay
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Spaced consolidation
        </span>
      </div>
    </div>
  );
}

export default function CognitiveFlowSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/60 bg-muted/20">
      <MaxWidthWrapper>
        <HeaderSection
          label="The 3 Core Pillars"
          title="What it actually takes to be exam-ready."
          subtitle="Most students measure preparation by hours logged and chapters highlighted. Real exam performance comes down to three things: catching common mistakes, quick recall under time pressure, and retaining what you study."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const accentColors = [
              {
                iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                metric: "text-rose-600 dark:text-rose-400",
                stepNum: "text-rose-600 dark:text-rose-400",
                hoverBorder: "hover:border-rose-500/40",
              },
              {
                iconBg: "bg-blue-600/10 text-blue-600 dark:text-blue-400",
                metric: "text-blue-600 dark:text-blue-400",
                stepNum: "text-blue-600 dark:text-blue-400",
                hoverBorder: "hover:border-blue-500/40",
              },
              {
                iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                metric: "text-emerald-600 dark:text-emerald-400",
                stepNum: "text-emerald-600 dark:text-emerald-400",
                hoverBorder: "hover:border-emerald-500/40",
              },
            ][idx] ?? {
              iconBg: "bg-blue-600/10 text-blue-600 dark:text-blue-400",
              metric: "text-blue-600 dark:text-blue-400",
              stepNum: "text-blue-600 dark:text-blue-400",
              hoverBorder: "hover:border-blue-500/40",
            };

            return (
              <div
                key={step.title}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-7 sm:p-8 transition-all hover:shadow-md",
                  accentColors.hoverBorder
                )}
              >
                <div>
                  {/* Step Meta Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/60">
                    <span className={cn("font-mono text-xs font-semibold", accentColors.stepNum)}>
                      {step.stepNumber}
                    </span>
                    <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={cn("mt-6 flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105", accentColors.iconBg)}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading mt-5 text-xl font-medium tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Visual Data Artifact */}
                  {idx === 0 && <MistakeAnalysisVisual />}
                  {idx === 1 && <TimedRecallVisual />}
                  {idx === 2 && <SpacedRetentionVisual />}
                </div>

                {/* Bottom Metric Tag */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-foreground/80">
                  <span className="text-muted-foreground">Target Outcome:</span>
                  <span className={cn("font-semibold", accentColors.metric)}>{step.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* In-situ Action Conversion Banner */}
        <div className="mt-12 rounded-2xl border border-blue-600/20 bg-card/90 p-6 sm:p-8 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-lg sm:text-xl font-medium text-foreground">
              Ready to start preparing?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Zero fluff. Zero credit card. Pick your target exam and generate your calibrated practice syllabus in 60 seconds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/setup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-950/20 hover:shadow-blue-900/30 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Set Up Your Exam Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/practice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/80 px-4 py-3 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <span>Explore Curricula</span>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
