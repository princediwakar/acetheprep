// Path: components/landing/LandingPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { HeroSection } from "./HeroSection";
import { SampleQuestionArena } from "./SampleQuestionArena";
import { ProductImpactSection } from "./ProductImpactSection";
import { AIWritingShowcase } from "./AIWritingShowcase";
import { ScorePlannerSection } from "./ScorePlannerSection";
import { AITechnologySection } from "./AITechnologySection";
import { GlobalExamsSection } from "./GlobalExamsSection";
import { SimpleCTASection } from "./SimpleCTASection";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface LandingPageProps {
  initialExam?: string;
}

export default function LandingPage({ initialExam }: LandingPageProps) {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const searchParams = useSearchParams();
  const paramExam = (searchParams.get("exam") || initialExam)?.toLowerCase() as ExamKey | undefined;

  const validExam: ExamKey =
    paramExam && LANDING_EXAMS[paramExam]
      ? paramExam
      : "gmat";

  const [activeExam, setActiveExam] = useState<ExamKey>(validExam);

  // Instant client-side redirect for authenticated returning students
  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace("/home");
    }
  }, [user, isUserLoading, router]);

  // Keep state in sync if SSR initialExam changes or URL changes externally
  useEffect(() => {
    if (paramExam && LANDING_EXAMS[paramExam] && paramExam !== activeExam) {
      setActiveExam(paramExam);
    }
  }, [paramExam, activeExam]);

  // Sync URL query string cleanly without full page reloads for instant 0ms transitions
  const handleExamChange = (newExam: ExamKey) => {
    setActiveExam(newExam);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (newExam === "gmat") {
        url.searchParams.delete("exam");
      } else {
        url.searchParams.set("exam", newExam);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground/10 selection:text-foreground">
      {/* 1. Clear, Human Product Hero with 6-Exam Switcher */}
      <HeroSection
        activeExam={activeExam}
        onExamChange={handleExamChange}
      />

      {/* 1b. Zero-Friction Sample Question Arena */}
      <section id="sample-question" className="relative pb-12 sm:pb-16 px-4 sm:px-6 scroll-mt-20">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero-Friction Live Diagnostic</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Try a sample question: Can you beat the test trap?
              </h2>
            </div>
            <Link
              href={LANDING_EXAMS[activeExam]?.curriculum?.diagnosticDrillUrl || `/practice/${activeExam}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
            >
              <span>Full {LANDING_EXAMS[activeExam]?.shortName} question bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <SampleQuestionArena activeExam={activeExam} />
        </div>
      </section>

      {/* 2. The 4 AI Engines (Score Leak Diagnostic, Trap Forensics, Socratic Hinting, Spaced Retention) */}
      <ProductImpactSection />

      {/* 3. Live Proof: Real-Time AI Essay & Writing Evaluation */}
      <AIWritingShowcase />

      {/* 4. Interactive Score Estimator & AI Study Planner */}
      <ScorePlannerSection activeExam={activeExam} />

      {/* 5. System Architecture: How It Works Under The Hood */}
      <AITechnologySection />

      {/* 6. The 6 Global Exam Standards */}
      <GlobalExamsSection onSelectExam={handleExamChange} />

      {/* 7. Minimal, Honest Call To Action */}
      <SimpleCTASection />
    </div>
  );
}

// Backward compatibility aliases
export { LandingPage as PublicLanding };
export type { LandingPageProps as PublicLandingProps };
