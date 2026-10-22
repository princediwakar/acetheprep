// Path: components/landing/LandingPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PracticeHeroSection } from "./PracticeHeroSection";
import { ThreePillarsSection } from "./ThreePillarsSection";
import { GlobalExamsSection } from "./GlobalExamsSection";
import { ScorePlannerSection } from "./ScorePlannerSection";
import { SimpleCTASection } from "./SimpleCTASection";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";

interface LandingPageProps {
  initialExam?: string;
}

export default function LandingPage({ initialExam }: LandingPageProps) {
  const searchParams = useSearchParams();
  const paramExam = (searchParams.get("exam") || initialExam)?.toLowerCase() as ExamKey | undefined;

  const validExam: ExamKey =
    paramExam && LANDING_EXAMS[paramExam]
      ? paramExam
      : "sat";

  const [activeExam, setActiveExam] = useState<ExamKey>(validExam);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Keep state in sync if SSR initialExam changes or URL changes externally
  useEffect(() => {
    if (paramExam && LANDING_EXAMS[paramExam] && paramExam !== activeExam) {
      setActiveExam(paramExam);
      setSelectedQuestionIndex(0);
    }
  }, [paramExam, activeExam]);

  // Sync URL query string cleanly without full page reloads for instant 0ms transitions
  const handleExamChange = (newExam: ExamKey) => {
    setActiveExam(newExam);
    setSelectedQuestionIndex(0);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (newExam === "sat") {
        url.searchParams.delete("exam");
      } else {
        url.searchParams.set("exam", newExam);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground/10 selection:text-foreground">
      {/* 1 & 2 & 3. Calm Hero & Distraction-Free Practice Workspace */}
      <PracticeHeroSection
        activeExam={activeExam}
        onExamChange={handleExamChange}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestionIndex={setSelectedQuestionIndex}
      />

      {/* 4. The Three Pillars (Targeted Practice, First-Principles Solutions, Spaced Repetition) */}
      <ThreePillarsSection />

      {/* 5. The 6 Global Exams (Curriculum Cards Blueprint) */}
      <GlobalExamsSection onSelectExam={handleExamChange} />

      {/* 6. Score Estimator & Study Planner */}
      <ScorePlannerSection activeExam={activeExam} />

      {/* 7. Simple, Honest Call To Action */}
      <SimpleCTASection />
    </div>
  );
}

// Backward compatibility aliases
export { LandingPage as PublicLanding };
export type { LandingPageProps as PublicLandingProps };
