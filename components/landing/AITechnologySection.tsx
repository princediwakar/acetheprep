// Path: components/landing/AITechnologySection.tsx
import { Cpu, Database, RotateCcw, Zap, CheckCircle2, ShieldCheck } from "lucide-react";

export function AITechnologySection() {
  const techPillars = [
    {
      icon: Cpu,
      step: "01",
      title: "Dual-LLM Generation Engine",
      subtitle: "Zero hallucinations, verified exam formats",
      description:
        "We route question generation through DeepSeek and OpenAI with automated JSON schema validation. Every question adheres strictly to official test standards, question stems, and distractor patterns.",
      tag: "DeepSeek + OpenAI",
    },
    {
      icon: Database,
      step: "02",
      title: "10-Year Exam Telemetry",
      subtitle: "Frequency-weighted question distribution",
      description:
        "Instead of treating all topics equally, our engine weights practice sets based on a decade of official exam frequency data. You master the high-probability concepts that actually determine your percentile.",
      tag: "Historical Frequency Modeling",
    },
    {
      icon: RotateCcw,
      step: "03",
      title: "SM-2 Spaced Repetition",
      subtitle: "Mathematically timed retention drills",
      description:
        "Built on the proven SuperMemo SM-2 algorithm, AceThePrep tracks your interval ease factor. Missed questions reappear in 2-minute micro-drills right as your brain begins to forget them.",
      tag: "Cognitive Memory Algorithm",
    },
    {
      icon: Zap,
      step: "04",
      title: "Server-First Architecture",
      subtitle: "Sub-100ms response, 0ms perceived latency",
      description:
        "Engineered with Next.js App Router and Server Components. Data mutations happen through secure Server Actions while client state updates optimistically, giving you an instantaneous, distraction-free flow.",
      tag: "Next.js App Router",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            System Architecture
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            The technology behind AceThePrep.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            How we combine large language models, cognitive memory algorithms, and modern web architecture
            to deliver the fastest prep experience on the internet.
          </p>
        </div>

        {/* 4 Tech Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {techPillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs hover:border-foreground/30 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-border bg-muted/60 text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-medium text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">
                      {p.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 text-xs font-mono text-muted-foreground/80 flex items-center gap-1.5 border-t border-border/50">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Production verified in live application</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
