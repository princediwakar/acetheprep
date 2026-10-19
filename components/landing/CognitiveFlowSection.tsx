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
    badge: "Memory Physics",
    title: "Forgetting Curve Flattening",
    description:
      "Human memory drops 70% of material within seven days. AceThePrep models your personalized decay curve and schedules micro-retrievals at intervals of 3, 7, and 14 days, transforming volatile short-term recall into permanent conceptual reflex.",
    metric: "91% Long-Term Retention",
  },
  {
    icon: ShieldAlert,
    stepNumber: "02",
    badge: "Cognitive Invariants",
    title: "Distractor Deconstruction",
    description:
      "High-stakes exam questions don't test memory; they test whether you can resist designed traps. We analyze every distractor to reveal the exact misconception 70% of candidates fall for, teaching you to eliminate traps in seconds.",
    metric: "Zero Trap Blindspots",
  },
  {
    icon: Cpu,
    stepNumber: "03",
    badge: "Zero Test Fatigue",
    title: "Calibrated Readiness Index",
    description:
      "Stop taking draining 3-hour mock tests just to discover you have a gap in one domain. A 5-minute adaptive session continuously refines your Readiness Index across all subjects, pinpointing the single formula you actually need to review today.",
    metric: "5-Min Daily Cadence",
  },
];

export default function CognitiveFlowSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/60 bg-muted/20">
      <MaxWidthWrapper>
        <HeaderSection
          label="The Cognitive Science"
          title="Engineered around the physics of human memory."
          subtitle="Traditional coaching promotes passive rereading and marathon 100-question drill sessions. AceThePrep replaces brute force with cognitive retrieval science."
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
