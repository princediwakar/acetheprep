// Path: components/landing/GlobalExamsSection.tsx
import Link from "next/link";
import { Clock, HelpCircle, Layers, ArrowRight, BookOpen, Compass, CheckCircle2 } from "lucide-react";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

interface GlobalExamsSectionProps {
  onSelectExam?: (exam: ExamKey) => void;
}

const EXAMS_ORDER: ExamKey[] = ["gmat", "sat", "gre", "cfa", "ielts", "toefl"];

export function GlobalExamsSection({ onSelectExam }: GlobalExamsSectionProps) {
  return (
    <section id="curriculum" className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6 scroll-mt-14">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Curriculum Blueprints
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Six global benchmarks. One rigorous standard.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every curriculum blueprint is aligned with official 2026 test specifications,
            timing rules, and adaptive scoring algorithms.
          </p>
        </div>

        {/* 6 Curriculum Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMS_ORDER.map((key) => {
            const config = LANDING_EXAMS[key];
            const curr = config.curriculum;
            const drillUrl = curr.diagnosticDrillUrl;
            const blueprintUrl = curr.blueprintUrl;

            return (
              <div
                key={key}
                className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between space-y-6 transition-all hover:border-foreground/30 hover:shadow-sm"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="font-mono text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                      {config.shortName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-muted/60 text-muted-foreground">
                      {config.officialBadge}
                    </span>
                  </div>

                  {/* Title & Format */}
                  <div>
                    <h3 className="font-heading text-xl font-medium tracking-tight text-foreground">
                      {config.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {curr.format}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                    <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                      <span className="text-[10px] text-muted-foreground uppercase block">
                        Duration
                      </span>
                      <span className="font-semibold text-foreground mt-0.5 block truncate">
                        {curr.duration}
                      </span>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                      <span className="text-[10px] text-muted-foreground uppercase block">
                        Scoring
                      </span>
                      <span className="font-semibold text-foreground mt-0.5 block truncate">
                        {curr.scoring.split(" ")[0]} {curr.scoring.split(" ")[1] || ""}
                      </span>
                    </div>
                  </div>

                  {/* Sections Breakdown */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase block">
                      Test Sections:
                    </span>
                    <div className="space-y-1 text-xs text-foreground/80">
                      {curr.sections.map((sec) => (
                        <div
                          key={sec.name}
                          className="flex items-center justify-between text-xs py-0.5"
                        >
                          <span className="truncate pr-2">{sec.name}</span>
                          <span className="font-mono text-muted-foreground shrink-0 text-[11px]">
                            {sec.questionCount} Qs • {sec.durationMinutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-border/60 space-y-2">
                  {onSelectExam && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectExam(key);
                        const el = document.getElementById("practice-workspace");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-foreground text-background hover:opacity-90 px-4 py-2.5 text-xs font-semibold transition-opacity cursor-pointer shadow-xs"
                    >
                      <span>Practice {config.shortName} in Workspace ↑</span>
                    </button>
                  )}

                  <Link
                    href={blueprintUrl}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>View Curriculum Blueprint &amp; Topics</span>
                    <ArrowRight className="h-3 w-3 ml-1 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
