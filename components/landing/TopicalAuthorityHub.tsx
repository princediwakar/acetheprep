// Path: components/landing/TopicalAuthorityHub.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExamKey } from "./landing-data";

interface HighYieldTopic {
  title: string;
  subject: string;
  url: string;
  trapNote: string;
}

const HIGH_YIELD_TOPICS_BY_EXAM: Record<ExamKey, HighYieldTopic[]> = {
  gmat: [
    {
      title: "Data Sufficiency",
      subject: "Data Insights",
      url: "/practice/gmat-focus/data-insights/data-sufficiency",
      trapNote: "Boundary condition & statement-independence traps",
    },
    {
      title: "Critical Reasoning",
      subject: "Verbal Reasoning",
      url: "/practice/gmat-focus/verbal-reasoning/critical-reasoning",
      trapNote: "Out-of-scope & correlation-vs-causation lures",
    },
    {
      title: "Arithmetic & Proportions",
      subject: "Quantitative Reasoning",
      url: "/practice/gmat-focus/quantitative-reasoning/arithmetic",
      trapNote: "Weighted average & inverted ratio pitfalls",
    },
    {
      title: "Algebra & Inequalities",
      subject: "Quantitative Reasoning",
      url: "/practice/gmat-focus/quantitative-reasoning/algebra",
      trapNote: "Negative exponent and sign-flip errors",
    },
  ],
  sat: [
    {
      title: "Algebra & Linear Equations",
      subject: "Mathematics",
      url: "/practice/sat/mathematics/algebra",
      trapNote: "Desmos resolution zoom & extraneous root traps",
    },
    {
      title: "Advanced Math & Quadratics",
      subject: "Mathematics",
      url: "/practice/sat/mathematics/advanced-math",
      trapNote: "Vertex vs. y-intercept parameter confusion",
    },
    {
      title: "Information and Ideas",
      subject: "Reading and Writing",
      url: "/practice/sat/reading-and-writing/information-and-ideas",
      trapNote: "Overly extreme scope qualifiers in passage claims",
    },
    {
      title: "Craft and Structure",
      subject: "Reading and Writing",
      url: "/practice/sat/reading-and-writing/craft-and-structure",
      trapNote: "Secondary dictionary definition lures in context",
    },
  ],
  gre: [
    {
      title: "Quantitative Reasoning Algebra",
      subject: "Quantitative Reasoning",
      url: "/practice/gre/quantitative-reasoning/algebra",
      trapNote: "QC testing rule: check 0, 1, negatives & fractions",
    },
    {
      title: "Text Completion",
      subject: "Verbal Reasoning",
      url: "/practice/gre/verbal-reasoning/text-completion",
      trapNote: "Double-negative connotation inversion traps",
    },
    {
      title: "Sentence Equivalence",
      subject: "Verbal Reasoning",
      url: "/practice/gre/verbal-reasoning/sentence-equivalence",
      trapNote: "Synonym pairs that fail the sentence logic",
    },
    {
      title: "Arithmetic & Data Analysis",
      subject: "Quantitative Reasoning",
      url: "/practice/gre/quantitative-reasoning/arithmetic",
      trapNote: "Percent change vs percentage points confusion",
    },
  ],
  cfa: [
    {
      title: "Time Value of Money",
      subject: "Quantitative Methods",
      url: "/practice/cfa-level-1/quantitative-methods/time-value-of-money",
      trapNote: "Annuity due (BGN) vs ordinary annuity (END) mode",
    },
    {
      title: "Financial Reporting Standards",
      subject: "Financial Statement Analysis",
      url: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards",
      trapNote: "IFRS vs US GAAP revenue recognition distinctions",
    },
    {
      title: "Standards of Professional Conduct",
      subject: "Ethical & Professional Standards",
      url: "/practice/cfa-level-1/ethical-professional-standards/standards-of-professional-conduct",
      trapNote: "Material non-public information & mosaic theory",
    },
    {
      title: "Fixed-Income Valuation",
      subject: "Fixed Income",
      url: "/practice/cfa-level-1/fixed-income/fixed-income-valuation",
      trapNote: "Macaulay vs modified duration interest sensitivity",
    },
  ],
  ielts: [
    {
      title: "True / False / Not Given",
      subject: "Reading",
      url: "/practice/ielts-academic/reading/true-false-not-given",
      trapNote: "Unsubstantiated claims marked False instead of Not Given",
    },
    {
      title: "Headings and Main Idea Matching",
      subject: "Reading",
      url: "/practice/ielts-academic/reading/headings-and-main-idea-matching",
      trapNote: "Verbatim keyword lures matching irrelevant details",
    },
    {
      title: "Task 2 Academic Essay",
      subject: "Writing",
      url: "/practice/ielts-academic/writing/task-2-task-response-tr",
      trapNote: "Partial task response & unbalanced perspective penalties",
    },
    {
      title: "Multiple Choice Traps",
      subject: "Listening",
      url: "/practice/ielts-academic/listening/multiple-choice-traps",
      trapNote: "Audio distractor correction: speaker changes answer mid-sentence",
    },
  ],
  toefl: [
    {
      title: "Factual Information",
      subject: "Reading",
      url: "/practice/toefl-ibt/reading/factual-information",
      trapNote: "Accurate statements from wrong paragraph distractor",
    },
    {
      title: "Inference & Rhetorical Purpose",
      subject: "Reading",
      url: "/practice/toefl-ibt/reading/inference-and-rhetorical-purpose",
      trapNote: "Plausible external facts not supported by text",
    },
    {
      title: "Integrated Writing Synthesis",
      subject: "Writing",
      url: "/practice/toefl-ibt/writing/integrated-writing-lecture-refutation",
      trapNote: "Omitting the professor's explicit counter-example details",
    },
    {
      title: "Independent Speaking Rubric",
      subject: "Speaking",
      url: "/practice/toefl-ibt/speaking/independent-speaking-q1",
      trapNote: "Filler repetition and topic drift under 45-second timer",
    },
  ],
};

const FEATURED_GUIDES = [
  {
    title: "Is It Better to Guess or Leave Questions Blank on GMAT Focus?",
    examTag: "GMAT Focus",
    category: "Scoring Mechanics",
    readTime: "9 min read",
    url: "/blog/gmat-focus-penalty-guessing-vs-leaving-blank",
    snippet: "Item-response theory deconstruction: why blanks trigger severe percentile collapse.",
  },
  {
    title: "The 5 Desmos Optimization & Extraneous Root Traps in Digital SAT Math",
    examTag: "Digital SAT",
    category: "Hard Math Traps",
    readTime: "7 min read",
    url: "/blog/digital-sat-math-desmos-and-algebra-traps",
    snippet: "Bluebook Module 2 hard math analysis: radical root squaring and slider resolution blind spots.",
  },
  {
    title: "The 4-Number Plug-in Rule for GRE Quantitative Comparison",
    examTag: "GRE General",
    category: "Quant Strategy",
    readTime: "8 min read",
    url: "/blog/gre-quantitative-comparison-4-number-rule",
    snippet: "The systematic audit (0, 1, negatives, fractions) to eliminate QC trap choices in 45 seconds.",
  },
  {
    title: "The 4 Critical Traps in IELTS Academic Reading: True-False-Not Given",
    examTag: "IELTS Academic",
    category: "Reading Logic",
    readTime: "8 min read",
    url: "/blog/ielts-academic-reading-true-false-not-given-traps",
    snippet: "The direct contradiction litmus test separating unstated facts from actual refutations.",
  },
  {
    title: "CFA Level 1 Ethics Adjustment & 70% Minimum Passing Score",
    examTag: "CFA Level 1",
    category: "Candidate Strategy",
    readTime: "8 min read",
    url: "/blog/cfa-level-1-ethics-adjustment-and-mps-breakdown",
    snippet: "How the CFA Institute Board of Governors weights the ethics topic to decide marginal passes.",
  },
  {
    title: "TOEFL iBT Speaking 26+ Score Rubric & Integrated Synthesis Templates",
    examTag: "TOEFL iBT",
    category: "Speaking Rubrics",
    readTime: "8 min read",
    url: "/blog/toefl-ibt-speaking-26-templates-and-scoring-rubric",
    snippet: "SpeechRater acoustic telemetry: pacing rhythms and transitions required for high band scores.",
  },
];

const EXAM_TABS: Array<{ key: ExamKey; title: string }> = [
  { key: "gmat", title: "GMAT Focus" },
  { key: "sat", title: "Digital SAT" },
  { key: "gre", title: "GRE" },
  { key: "cfa", title: "CFA Level 1" },
  { key: "ielts", title: "IELTS" },
  { key: "toefl", title: "TOEFL" },
];

export function TopicalAuthorityHub() {
  const [activeTab, setActiveTab] = useState<ExamKey>("gmat");
  const topics = HIGH_YIELD_TOPICS_BY_EXAM[activeTab] || HIGH_YIELD_TOPICS_BY_EXAM.gmat;

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5 text-foreground" />
            <span>Topical Authority Hub</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Targeted drills. Psychometric trap deconstructions.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Direct access to high-yield topic drill modules and peer-reviewed cognitive science guides
            for competitive examination candidates.
          </p>
        </div>

        {/* 1. High-Yield Practice Modules Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                High-Yield Interactive Practice Drills
              </h3>
              <p className="text-xs text-muted-foreground">
                Authentic diagnostic problems with step-by-step misconception breakdowns.
              </p>
            </div>

            {/* Exam Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {EXAM_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border",
                    activeTab === tab.key
                      ? "bg-foreground text-background border-foreground shadow-2xs"
                      : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.url}
                href={topic.url}
                className="group rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/50 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                    {topic.subject}
                  </span>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {topic.trapNote}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Start Topic Drill</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Featured Cognitive & Strategy Guides Grid */}
        <div className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Authoritative Trap Teardowns &amp; Research
              </h3>
              <p className="text-xs text-muted-foreground">
                In-depth mathematical proofs, psychometric models, and candidate error data.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore all guides</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_GUIDES.map((guide) => (
              <Link
                key={guide.url}
                href={guide.url}
                className="group rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                      {guide.examTag}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {guide.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {guide.snippet}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Read Deconstruction</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
