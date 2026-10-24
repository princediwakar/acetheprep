// Path: components/landing/HeroSection.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Target, ShieldCheck, Zap, RotateCcw } from "lucide-react";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import { ExamSelectorStrip } from "@/components/shared/ExamSelectorStrip";
import { InstantTopicSearch } from "./InstantTopicSearch";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

interface HeroSectionProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
}

const EXAM_HERO_COPY: Record<
  ExamKey,
  {
    org: string;
    headline: string;
    subhead: string;
  }
> = {
  gmat: {
    org: "GMAC GMAT Focus",
    headline: "Adaptive AI test prep for the GMAT Focus.",
    subhead:
      "Our AI pinpoints your exact score leaks in 10 minutes, breaks down why tempting trap answers fool you, and schedules quick reviews before you forget.",
  },
  sat: {
    org: "College Board Digital SAT",
    headline: "Hit 1500+ on the Digital SAT with adaptive AI.",
    subhead:
      "Target your highest-yield weak spots across Reading, Writing, and Math. Built with Desmos integration and real-time AI mistake explanations.",
  },
  gre: {
    org: "ETS GRE General",
    headline: "Break your GRE score plateau in half the time.",
    subhead:
      "Stop repeating the same careless mistakes on Quant Comparison and Text Completion. Learn how test-makers design traps using AI diagnostics.",
  },
  cfa: {
    org: "CFA Institute Level 1",
    headline: "Master high-weight CFA Level 1 topics with AI.",
    subhead:
      "Zero in on Financial Statement Analysis and Quant Methods with step-by-step formula derivations and smart spaced repetition.",
  },
  ielts: {
    org: "British Council & IDP",
    headline: "Reach Band 8.0+ with real-time AI feedback.",
    subhead:
      "Demystify True / False / Not Given reading traps, master acoustic distractors, and get instant human-grade essay evaluations.",
  },
  toefl: {
    org: "ETS TOEFL iBT",
    headline: "Precision TOEFL iBT practice powered by AI.",
    subhead:
      "Master fast-paced academic reading inferences and listening traps with instant step-by-step AI feedback and speaking rubrics.",
  },
};

export function HeroSection({
  activeExam,
  onExamChange,
}: HeroSectionProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const heroCopy = EXAM_HERO_COPY[activeExam] || EXAM_HERO_COPY.gmat;

  const practiceUrl =
    examConfig.curriculum?.diagnosticDrillUrl ||
    `/practice/${examConfig.curriculum?.slug || activeExam}`;

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Exam Selector Switcher */}
        <div id="exam-selector">
          <ExamSelectorStrip activeExam={activeExam} onExamChange={onExamChange} />
        </div>

        {/* Dynamic Exam-Specific Hero Messaging */}
        <PageHero
          badge={
            <HeroBadge className="border-border bg-muted/60 text-foreground/80 font-medium flex-wrap">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI-Powered Adaptive Engine</span>
              <span className="text-muted-foreground/40">•</span>
              <span>GMAT, SAT, GRE &amp; CFA</span>
              <span className="text-muted-foreground/40">•</span>
              <span>100% Free Practice</span>
            </HeroBadge>
          }
          title={heroCopy.headline}
          subtitle={heroCopy.subhead}
        >
          {/* Quick Search */}
          <div className="max-w-2xl mx-auto pt-2">
            <InstantTopicSearch activeExam={activeExam} />
          </div>
        </PageHero>

        {/* Primary Product CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={practiceUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Start Free {examConfig.shortName} AI Diagnostic Drill</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Clean AI Product Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-border/70 text-xs">
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <Target className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>AI Score Leak Detection</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Finds your high-yield weak spots in 10 minutes instead of solving 1,500 random questions.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>AI Trap Forensics</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Explains why you picked the wrong option and teaches the instinct to avoid it.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <RotateCcw className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Spaced Retention</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Schedules 2-minute refresher drills right before concepts fade from memory.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              <span>100% Free Fundamentals</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Diagnostic drills and full step-by-step solutions are always free with zero paywall.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
