// Path: components/landing/ExamTrapsSection.tsx
"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface ExamTrapsSectionProps {
  activeExam: ExamKey;
}

const EXAM_SLUGS: Record<ExamKey, string> = {
  gmat: "gmat-focus",
  sat: "sat",
  gre: "gre",
  cfa: "cfa-level-1",
  ielts: "ielts-academic",
  toefl: "toefl-ibt",
};

const HIGH_YIELD_TOPICS: Record<
  ExamKey,
  Array<{ name: string; section: string; href: string; badge: string }>
> = {
  gmat: [
    {
      name: "Data Sufficiency",
      section: "Data Insights",
      href: "/practice/gmat-focus/data-insights/data-sufficiency",
      badge: "Parity & Zero Traps",
    },
    {
      name: "Multi-Source Reasoning",
      section: "Data Insights",
      href: "/practice/gmat-focus/data-insights/multi-source-reasoning",
      badge: "Multi-Tab Synthesis",
    },
    {
      name: "Number Properties",
      section: "Quantitative",
      href: "/practice/gmat-focus/quantitative-reasoning/number-properties",
      badge: "Divisors & Primes",
    },
    {
      name: "Critical Reasoning",
      section: "Verbal",
      href: "/practice/gmat-focus/verbal-reasoning/critical-reasoning",
      badge: "Flaws & Assumptions",
    },
  ],
  sat: [
    {
      name: "Advanced Math",
      section: "Mathematics",
      href: "/practice/sat/mathematics/advanced-math",
      badge: "Extraneous Solutions",
    },
    {
      name: "Linear Systems & Algebra",
      section: "Mathematics",
      href: "/practice/sat/mathematics/algebra",
      badge: "Desmos Shortcuts",
    },
    {
      name: "Rhetorical Synthesis",
      section: "Reading & Writing",
      href: "/practice/sat/reading-and-writing/rhetorical-synthesis",
      badge: "Goal Alignment",
    },
    {
      name: "Craft & Structure",
      section: "Reading & Writing",
      href: "/practice/sat/reading-and-writing/craft-and-structure",
      badge: "Words in Context",
    },
  ],
  gre: [
    {
      name: "Quantitative Comparison",
      section: "Quantitative",
      href: "/practice/gre/quantitative-reasoning/quantitative-comparison",
      badge: "Real Number Bounds",
    },
    {
      name: "Arithmetic & Exponents",
      section: "Quantitative",
      href: "/practice/gre/quantitative-reasoning/arithmetic",
      badge: "Modular Cycles",
    },
    {
      name: "Text Completion",
      section: "Verbal",
      href: "/practice/gre/verbal-reasoning/text-completion",
      badge: "Contrast Signals",
    },
    {
      name: "Sentence Equivalence",
      section: "Verbal",
      href: "/practice/gre/verbal-reasoning/sentence-equivalence",
      badge: "Synonym Traps",
    },
  ],
  cfa: [
    {
      name: "Time Value of Money",
      section: "Quantitative Methods",
      href: "/practice/cfa-level-1/quantitative-methods/time-value-of-money",
      badge: "Compounding & EAR",
    },
    {
      name: "Financial Reporting Standards",
      section: "Financial Analysis",
      href: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards",
      badge: "IFRS vs US GAAP",
    },
    {
      name: "Cost of Capital & WACC",
      section: "Corporate Issuers",
      href: "/practice/cfa-level-1/corporate-issuers/cost-of-capital",
      badge: "Tax Shield Math",
    },
    {
      name: "Fixed Income Valuation",
      section: "Fixed Income",
      href: "/practice/cfa-level-1/fixed-income/fixed-income-instrument-features",
      badge: "Duration & Convexity",
    },
  ],
  ielts: [
    {
      name: "True / False / Not Given",
      section: "Academic Reading",
      href: "/practice/ielts-academic/reading/inferences",
      badge: "Textual Fact Check",
    },
    {
      name: "Central Ideas & Details",
      section: "Academic Reading",
      href: "/practice/ielts-academic/reading/central-ideas-and-details",
      badge: "Paraphrase Traps",
    },
    {
      name: "Craft & Structure",
      section: "Academic Reading",
      href: "/practice/ielts-academic/reading/craft-and-structure",
      badge: "Tone & Qualifiers",
    },
    {
      name: "Information & Ideas",
      section: "Academic Reading",
      href: "/practice/ielts-academic/reading/information-and-ideas",
      badge: "Factual Retrieval",
    },
  ],
  toefl: [
    {
      name: "Sentence Insertion Flow",
      section: "iBT Reading",
      href: "/practice/toefl-ibt/reading/transitions-and-logical-flow",
      badge: "Transition Logic",
    },
    {
      name: "Rhetorical Purpose",
      section: "iBT Reading",
      href: "/practice/toefl-ibt/reading/text-structure-and-purpose",
      badge: "Author Objective",
    },
    {
      name: "Negative Factual ('EXCEPT')",
      section: "iBT Reading",
      href: "/practice/toefl-ibt/reading/information-and-ideas",
      badge: "Inversion Traps",
    },
    {
      name: "Vocabulary in Context",
      section: "iBT Reading",
      href: "/practice/toefl-ibt/reading/craft-and-structure",
      badge: "Secondary Meanings",
    },
  ],
};

export function ExamTrapsSection({
  activeExam,
}: ExamTrapsSectionProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const highYieldTopics = HIGH_YIELD_TOPICS[activeExam] || HIGH_YIELD_TOPICS.gmat;

  return (
    <section className="relative py-12 sm:py-16 border-t border-border/70 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-14">
        {/* PART 1: The 3 Tricks Test Makers Use */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Test-Maker Playbook
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
              3 Common Traps on the {examConfig.shortName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Standardized test committees do not write random wrong choices. Every wrong answer is engineered around a specific oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examConfig.trapsGuide.map((trap) => (
              <div
                key={trap.trapNumber}
                className="rounded-xl border border-border/80 bg-card p-5 space-y-3.5 flex flex-col justify-between shadow-xs hover:border-border transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-primary">
                      TRAP {trap.trapNumber}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground leading-snug">
                    {trap.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {trap.howItWorks}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-border/60 text-xs">
                  <div className="bg-secondary/40 rounded-lg p-2.5 text-foreground/90">
                    <span className="font-semibold block text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      Rule to beat it:
                    </span>
                    <span className="text-xs">{trap.ruleToBeatIt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: Hardest Questions This Week (Community Data with direct catalog practice) */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
              <Layers className="h-3.5 w-3.5 text-primary" />
              Community Difficulty Data
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
              Hardest Question Patterns This Week
            </h2>
            <p className="text-sm text-muted-foreground">
              Real question types that tripped up the highest percentage of test-takers across our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {examConfig.hardestQuestions.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border/80 bg-card p-5 space-y-3.5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">
                      Question #{item.id}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 px-2 py-0.5 text-[11px] font-semibold">
                      {item.missRate}% missed this
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-primary">
                    {item.topic}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <Link
                    href={item.practiceUrl || `/practice/${EXAM_SLUGS[activeExam]}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>Practice questions on this topic</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: Transparent Platform Audit */}
        <div className="rounded-xl border border-border/80 bg-secondary/20 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold text-xs sm:text-sm text-foreground">
              Official Syllabus Verification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground pt-1">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{examConfig.verificationStamp.syllabus}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{examConfig.verificationStamp.reviewNote}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{examConfig.verificationStamp.activePoolStatus}</span>
            </div>
          </div>
        </div>

        {/* High-Yield Topic Drill Index: Direct internal PageRank pass & search query pairing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-normal text-foreground">
                High-Yield {examConfig.shortName} Topic Drills
              </h3>
              <p className="text-xs text-muted-foreground">
                Jump directly into topic-specific adaptive questions and distractor breakdowns.
              </p>
            </div>
            <Link
              href={`/practice/${EXAM_SLUGS[activeExam]}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span>View all modules</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {highYieldTopics.map((topic) => (
              <Link
                key={topic.name}
                href={topic.href}
                className="group rounded-xl border border-border/80 bg-card p-4 space-y-2 hover:border-primary/50 hover:bg-secondary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {topic.section}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {topic.name}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-border/60">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {topic.badge}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PART 4: Real Next Step (Exam Practice Library & Full Diagnostic Sets) */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center space-y-5 shadow-xs">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-foreground">
              Ready to practice all {examConfig.shortName} topics?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              These preview questions are just a taste of how our trap explanations work. Explore the full topic library, practice under timed conditions, and eliminate traps across all subjects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/practice/${EXAM_SLUGS[activeExam]}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background hover:opacity-90 px-6 py-3 text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span>Browse All {examConfig.shortName} Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => signInWithGoogle(`/practice/${EXAM_SLUGS[activeExam]}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 hover:bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all cursor-pointer"
            >
              <span>Sign in with Google</span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-muted-foreground">
            Free practice questions • Official test specifications
          </p>
        </div>
      </div>
    </section>
  );
}

// Backward compatibility alias
export const TrapsAndProofSection = ExamTrapsSection;
export type { ExamTrapsSectionProps as TrapsAndProofSectionProps };

