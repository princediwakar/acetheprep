// Path: components/landing/CognitiveFlowSection.tsx

import Link from "next/link";
import { HeaderSection } from "@/components/shared/HeaderSection";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
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
          {FLOW_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-7 sm:p-8 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  {/* Step Meta Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/60">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {step.stepNumber}
                    </span>
                    <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
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
                </div>

                {/* Bottom Metric Tag */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-foreground/80">
                  <span className="text-muted-foreground">Target Outcome:</span>
                  <span className="font-semibold text-primary">{step.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* In-situ Action Conversion Banner */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-card/90 p-6 sm:p-8 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
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
