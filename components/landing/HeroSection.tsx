// Path: components/landing/HeroSection.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Target, ShieldCheck, Zap, RotateCcw } from "lucide-react";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import { ExamSelectorStrip } from "@/components/shared/ExamSelectorStrip";
import { SignInButton } from "@/components/SignInButton";
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
      "Find your score leaks in 10 minutes. Learn why tempting trap answers look right and retain what you study.",
  },
  sat: {
    org: "College Board Digital SAT",
    headline: "Hit 1500+ on the Digital SAT with adaptive AI.",
    subhead:
      "Target your highest-yield weak spots across Reading, Writing, and Math with instant AI mistake explanations.",
  },
  gre: {
    org: "ETS GRE General",
    headline: "Break your GRE score plateau in half the time.",
    subhead:
      "Stop repeating careless mistakes on Quant Comparison and Text Completion with AI diagnostics.",
  },
  cfa: {
    org: "CFA Institute Level 1",
    headline: "Master high-weight CFA Level 1 topics with AI.",
    subhead:
      "Zero in on Financial Statement Analysis and Quant Methods with formula derivations and spaced repetition.",
  },
  ielts: {
    org: "British Council & IDP",
    headline: "Reach Band 8.0+ with real-time AI feedback.",
    subhead:
      "Demystify True / False / Not Given reading traps and get instant human-grade essay evaluations.",
  },
  toefl: {
    org: "ETS TOEFL iBT",
    headline: "Precision TOEFL iBT practice powered by AI.",
    subhead:
      "Master fast-paced academic reading inferences and listening traps with instant AI feedback.",
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
            <HeroBadge className="border-border bg-muted/60 text-foreground/90 font-medium text-xs sm:text-sm px-3.5 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Adaptive AI Engine • 100% Free Practice</span>
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

        {/* Primary Product CTA: Direct to First Test */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2">
          <SignInButton
            buttonText="Take your first test"
            returnUrl={`/home?autostart=first_test&exam=${encodeURIComponent(examConfig.name)}`}
            size="lg"
            className="w-full sm:w-auto h-13 px-10 text-base sm:text-lg font-bold shadow-lg shadow-foreground/10 bg-foreground text-background hover:bg-foreground/90 rounded-xl cursor-pointer"
          />
          <p className="text-xs text-muted-foreground pt-1">
            5 quick questions to find your score leaks • 100% free • No credit card
          </p>
        </div>

        {/* 4 Clean AI Product Value Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-border/70">
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
              <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Score Leak Detection</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Finds your high-yield weak spots in 10 minutes instead of solving 1,500 random questions.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
              <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>AI Trap Forensics</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Explains why you picked the wrong option and teaches the instinct to avoid test traps.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
              <RotateCcw className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Spaced Retention</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Schedules 2-minute refresher drills right before concepts fade from memory.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1.5 hover:border-foreground/20 transition-colors">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
              <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Free Fundamentals</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Diagnostic drills and full step-by-step solutions are always free with zero paywall.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
