// Path: components/landing/PublicLanding.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LiveArenaSection } from "./LiveArenaSection";
import { ScoreGapTool } from "./ScoreGapTool";
import { TrapsAndProofSection } from "./TrapsAndProofSection";
import { ARENA_EXAMS, type ExamKey } from "./arena-data";

interface PublicLandingProps {
  initialExam?: string;
}

export default function PublicLanding({ initialExam }: PublicLandingProps) {
  const searchParams = useSearchParams();
  const paramExam = (searchParams.get("exam") || initialExam)?.toLowerCase() as ExamKey | undefined;

  const validExam: ExamKey =
    paramExam && ARENA_EXAMS[paramExam]
      ? paramExam
      : "gmat";

  const [activeExam, setActiveExam] = useState<ExamKey>(validExam);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Keep state in sync if SSR initialExam changes or URL changes externally
  useEffect(() => {
    if (paramExam && ARENA_EXAMS[paramExam] && paramExam !== activeExam) {
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
      {/* 1. Live Arena: Problem first, zero sign-up gate, instant trap autopsy, crawlable <a> exam tabs */}
      <LiveArenaSection
        activeExam={activeExam}
        onExamChange={handleExamChange}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestionIndex={setSelectedQuestionIndex}
      />

      {/* 2. Score Gap Tool: Exact math of score points translated to missed questions */}
      <ScoreGapTool activeExam={activeExam} />

      {/* 3. Traps Guide & Community Difficulty Proof: Real test traps, error rates, and topic bridges */}
      <TrapsAndProofSection activeExam={activeExam} />
    </div>
  );
}
