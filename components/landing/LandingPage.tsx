// Path: components/landing/LandingPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PracticeHeroSection } from "./PracticeHeroSection";
import { ScoreGapCalculator } from "./ScoreGapCalculator";
import { ExamTrapsSection } from "./ExamTrapsSection";
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
      : "gmat";

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
      if (newExam === "gmat") {
        url.searchParams.delete("exam");
      } else {
        url.searchParams.set("exam", newExam);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Practice Hero: Problem first, zero sign-up gate, instant trap autopsy, crawlable <a> exam tabs */}
      <PracticeHeroSection
        activeExam={activeExam}
        onExamChange={handleExamChange}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestionIndex={setSelectedQuestionIndex}
      />

      {/* 2. Score Gap Calculator: Exact math of score points translated to missed questions */}
      <ScoreGapCalculator activeExam={activeExam} />

      {/* 3. Exam Traps & High-Yield Topics: Real test traps, error rates, and topic bridges */}
      <ExamTrapsSection activeExam={activeExam} />
    </div>
  );
}

// Backward compatibility aliases
export { LandingPage as PublicLanding };
export type { LandingPageProps as PublicLandingProps };
