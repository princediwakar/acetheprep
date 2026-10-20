// Path: components/landing/CognitiveFlowSection.tsx

import { HeaderSection } from "@/components/shared/HeaderSection";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { GitBranch, ShieldAlert, Cpu } from "lucide-react";

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
    icon: GitBranch,
    stepNumber: "01",
    badge: "Smart Review",
    title: "Spaced Retention Intervals",
    description:
      "Never lose what you studied. AceThePrep schedules timely reviews at intervals of 3, 7, and 14 days, transforming fragile short-term recall into lasting exam-day mastery.",
    metric: "91% Long-Term Retention",
  },
  {
    icon: ShieldAlert,
    stepNumber: "02",
    badge: "Trap Analysis",
    title: "Step-by-Step Trap Explanations",
    description:
      "Competitive exam questions are engineered with tempting wrong choices. We explain why wrong options look right and teach you the exact triggers to eliminate traps instantly.",
    metric: "Zero Trap Blindspots",
  },
  {
    icon: Cpu,
    stepNumber: "03",
    badge: "Targeted Practice",
    title: "Focus on Your Weak Spots",
    description:
      "Stop taking draining 3-hour tests just to find a single gap. Focused 10-question practice sprints instantly isolate weak areas so you study only what actually moves your score.",
    metric: "5-Min Daily Sprints",
  },
];

export default function CognitiveFlowSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/60 bg-muted/20">
      <MaxWidthWrapper>
        <HeaderSection
          label="How AceThePrep Works"
          title="Study what actually moves your score."
          subtitle="Traditional test prep pushes passive rereading and mindless marathon drills. AceThePrep focuses on active problem solving and spotting the tricky traps that drop candidate percentiles."
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
                  <span className="text-muted-foreground">Outcome:</span>
                  <span className="font-semibold text-primary">{step.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
