// Path: components/landing/OutOfTheBoxLanding.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LiveArenaSection } from "./LiveArenaSection";
import { ScoreGapTool } from "./ScoreGapTool";
import { TrapsAndProofSection } from "./TrapsAndProofSection";
import { ARENA_EXAMS, type ExamKey } from "./arena-data";

export default function OutOfTheBoxLanding() {
  const searchParams = useSearchParams();
  const initialExamParam = searchParams.get("exam")?.toLowerCase() as ExamKey | undefined;

  const validExam =
    initialExamParam && ARENA_EXAMS[initialExamParam]
      ? initialExamParam
      : "gmat";

  const [activeExam, setActiveExam] = useState<ExamKey>(validExam);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Sync URL query string cleanly without full page reloads
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
      {/* 1. Live Arena: Problem first, zero sign-up gate, instant trap autopsy */}
      <LiveArenaSection
        activeExam={activeExam}
        onExamChange={handleExamChange}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestionIndex={setSelectedQuestionIndex}
      />

      {/* 2. Score Gap Tool: Exact math of score points translated to missed questions */}
      <ScoreGapTool activeExam={activeExam} />

      {/* 3. Traps Guide & Community Difficulty Proof: Replaces fake reviews with real data */}
      <TrapsAndProofSection activeExam={activeExam} />
    </div>
  );
}
