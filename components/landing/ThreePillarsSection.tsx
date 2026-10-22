// Path: components/landing/ThreePillarsSection.tsx
import { Target, Lightbulb, RefreshCw, Check } from "lucide-react";

export function ThreePillarsSection() {
  const pillars = [
    {
      step: "01",
      icon: Target,
      title: "Targeted Practice",
      subtitle: "By specific skill, not random mixed sets",
      description:
        "Focus your preparation on individual cognitive domains before taking full-length adaptive mocks. Diagnose and fix conceptual gaps in topics like Number Properties, Radical Equations, or Critical Reasoning.",
      points: [
        "Curated, authentic test-format problems",
        "Fine-grained skill tree breakdown",
        "Calibrated test timing and difficulty",
      ],
    },
    {
      step: "02",
      icon: Lightbulb,
      title: "First-Principles Solutions",
      subtitle: "Understand the 'why', not memorization",
      description:
        "Every problem is resolved down to its core principle and a clean step-by-step derivation. We explicitly unpack common misconceptions so your brain doesn't fall for tempting distractor choices under time pressure.",
      points: [
        "Core principle identified in 1–2 sentences",
        "Clean, efficient mathematical derivations",
        "Objective breakdown of tempting distractors",
      ],
    },
    {
      step: "03",
      icon: RefreshCw,
      title: "Spaced Repetition",
      subtitle: "Automatically resurfaces weak topics",
      description:
        "Standard prep results in forgetting 70% of reviewed concepts within three weeks. Our spaced repetition queue schedules targeted re-practice right as memory begins to decay, locking mastery in for exam day.",
      points: [
        "Automatic queue for missed questions",
        "Scientifically calibrated recall intervals",
        "Track memory retention across full syllabus",
      ],
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            How It Works
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Built for clarity, rigor, and retention.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Standard prep encourages solving 1,000 random problems without analyzing mistakes.
            AceThePrep isolates skills, explains root causes, and schedules reviews before you forget.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all hover:border-foreground/30 hover:shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon className="h-4 w-4" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                        {pillar.step}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Pillar {pillar.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-medium text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-2 text-xs text-muted-foreground">
                  {pillar.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-foreground/70 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
