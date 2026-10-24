// Path: components/landing/LandingPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { HeroSection } from "./HeroSection";
import { ProductImpactSection } from "./ProductImpactSection";
import { AIWritingShowcase } from "./AIWritingShowcase";
import { ScorePlannerSection } from "./ScorePlannerSection";
import { AITechnologySection } from "./AITechnologySection";
import { GlobalExamsSection } from "./GlobalExamsSection";
import { SimpleCTASection } from "./SimpleCTASection";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

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
