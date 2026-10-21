// Path: components/landing/InteractiveDemoHero.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { examToSlug } from "@/lib/slugs";
import { useUser } from "@/hooks/useUser";
import { signInWithGoogle } from "@/lib/supabase/auth";
import { Lightbulb, ChevronDown, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import SupportedExamsBar from "@/components/landing/SupportedExamsBar";
import { ExamCalculator } from "@/components/tutor/ExamCalculator";
import { FormulaSheetModal } from "@/components/landing/FormulaSheetModal";
import { BluebookOption } from "@/components/landing/BluebookOption";
import { DemoDiagnosticSidebar } from "@/components/landing/DemoDiagnosticSidebar";
import { DemoProctorNav } from "@/components/landing/DemoProctorNav";
import { DemoHeroHeader } from "@/components/landing/DemoHeroHeader";
import {
  demoQuestions,
  EXAM_HINTS,
  EXTENDED_QUESTIONS,
  EXAM_MODULE_DURATIONS,
  type Phase,
  type OptionKey,
  type DemoQuestion,
} from "@/components/landing/demo-data";

export default function InteractiveDemoHero() {
  const { user } = useUser();
  const [exam, setExam] = useState<string>("SAT");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Bluebook-specific state
  const [strikethroughMode, setStrikethroughMode] = useState<boolean>(false);
  const [struckOptions, setStruckOptions] = useState<Set<string>>(new Set());
  const [isMarkedForReview, setIsMarkedForReview] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [timerSeconds, setTimerSeconds] = useState<number>(
    () => EXAM_MODULE_DURATIONS["SAT"] ?? 35 * 60,
  );
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [showDesmos, setShowDesmos] = useState<boolean>(false);

  useEffect(() => {
    // Only tick timer while actively solving (pause during answer reveal & review)
    if (phase !== "question") return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "x" || e.key === "X")) {
        e.preventDefault();
        setStrikethroughMode((prev) => !prev);
      }
      if (e.key === "Escape") {
        setShowFormulaSheet(false);
        setShowDesmos(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const demoEntry = exam ? demoQuestions.exams[exam] : null;
  const examPool = EXTENDED_QUESTIONS[exam];
  const question: DemoQuestion | null =
    examPool && examPool.length > 0
      ? (examPool[questionIndex % examPool.length] ?? demoEntry?.question ?? null)
      : (demoEntry?.question ?? null);
  const examSlug = examToSlug(exam);

  const isCorrect =
    selectedOption !== null &&
    question !== null &&
    selectedOption === question.correct_option;

  const handleExamChange = useCallback((value: string) => {
    setExam(value);
    setQuestionIndex(0);
    setSelectedOption(null);
    setStruckOptions(new Set());
    setStrikethroughMode(false);
    setIsMarkedForReview(false);
    setPhase("question");
    setShowHint(false);
    setTimerSeconds(EXAM_MODULE_DURATIONS[value] ?? 35 * 60);
  }, []);

  const handleToggleStrike = useCallback((key: OptionKey) => {
    setStruckOptions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleOptionSelect = useCallback((key: OptionKey) => {
    setSelectedOption(key);
  }, []);

  const handleConfirmAnswer = useCallback(() => {
    if (!selectedOption) return;
    setPhase("reveal");
  }, [selectedOption]);

  const handleReset = useCallback(() => {
    setSelectedOption(null);
    setStruckOptions(new Set());
    setStrikethroughMode(false);
    setIsMarkedForReview(false);
    setPhase("question");
    setShowHint(false);
    setQuestionIndex((prev) => prev + 1);
    setTimerSeconds(EXAM_MODULE_DURATIONS[exam] ?? 35 * 60);
  }, [exam]);

  const handleGoogleSignIn = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("landingPrefill", JSON.stringify({ exam }));
    }
    signInWithGoogle(`/setup?exam=${encodeURIComponent(exam)}`);
  }, [exam]);

  const options = question
    ? Object.entries(question.options).map(([key, text]) => ({ key, text }))
    : [];
  const correctOption = question?.correct_option ?? "";
  const optionKeys = question ? Object.keys(question.options) : [];
  const trapKey = optionKeys.find((k) => k !== correctOption) ?? "B";
  const remainingKeys = optionKeys.filter((k) => k !== correctOption && k !== trapKey);
  const remainingLabel =
    remainingKeys.length > 0
      ? `Option${remainingKeys.length > 1 ? "s" : ""} ${remainingKeys.join(" & ")}`
      : "Other Options";
  const isRevealed = phase === "reveal";

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? "0" : ""}${remainderSecs}`;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      <FormulaSheetModal
        isOpen={showFormulaSheet}
        onClose={() => setShowFormulaSheet(false)}
      />
      <ExamCalculator
        isOpen={showDesmos}
        onClose={() => setShowDesmos(false)}
        examName="Exam"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] rounded-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,43,73,0.08),transparent_80%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(43,127,255,0.12),transparent_80%)] blur-[90px] -z-10"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DemoHeroHeader
          user={user}
          onGoogleSignIn={handleGoogleSignIn}
        />

        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <SupportedExamsBar activeExam={exam} onSelectExam={handleExamChange} />
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <DemoProctorNav
              exam={exam}
              showTimer={showTimer}
              timerSeconds={timerSeconds}
              isPaused={phase === "reveal"}
              strikethroughMode={strikethroughMode}
              isMarkedForReview={isMarkedForReview}
              onToggleTimer={() => setShowTimer((prev) => !prev)}
              onOpenDesmos={() => setShowDesmos(true)}
              onOpenFormulaSheet={() => setShowFormulaSheet(true)}
              onToggleStrikethrough={() => setStrikethroughMode((prev) => !prev)}
              onToggleMarkForReview={(checked) => setIsMarkedForReview(checked)}
              formatTimer={formatTimer}
            />

            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-card">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-2.5 text-xs">
                  <span className="font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    Item 1 of 27 • {demoEntry?.subject || "Subject Domain"}
                  </span>
                  {question?.time_estimate_seconds && (
                    <span className="flex items-center gap-1 font-mono text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Target Pacing: {question.time_estimate_seconds}s
                    </span>
                  )}
                </div>

                {question ? (
                  <div>
                    <div className="relative pl-3 border-l-2 border-border/80">
                      <p className="text-sm sm:text-base font-normal leading-relaxed text-foreground whitespace-pre-line">
                        {question.question_text}
                      </p>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setShowHint((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{showHint ? "Hide hint" : "Examiner Guidance / Formula"}</span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            showHint && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-2.5 text-xs text-foreground/90 leading-relaxed font-sans">
                              <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">
                                Underlying Rule / Invariant:
                              </span>
                              {EXAM_HINTS[exam] || question.misconception}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {strikethroughMode && (
                        <div className="rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-2 text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between">
                          <span>
                            Eliminate Mode Active: Click any option to cross it out.
                          </span>
                          <button
                            type="button"
                            onClick={() => setStrikethroughMode(false)}
                            className="font-semibold underline ml-2 cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      )}

                      {options.map(({ key, text }) => (
                        <BluebookOption
                          key={key}
                          letter={key}
                          text={text}
                          isSelected={selectedOption === key}
                          isStruck={struckOptions.has(key)}
                          strikethroughMode={strikethroughMode}
                          isRevealed={isRevealed}
                          isCorrect={key === correctOption}
                          isTrap={selectedOption === key && key !== correctOption}
                          onSelect={() => handleOptionSelect(key)}
                          onToggleStrike={() => handleToggleStrike(key)}
                        />
                      ))}
                    </div>

                    {!isRevealed && (
                      <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">
                          {selectedOption
                            ? `Selected: Option (${selectedOption})`
                            : "Click an option to select"}
                        </span>
                        <button
                          type="button"
                          disabled={!selectedOption}
                          onClick={handleConfirmAnswer}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-sm",
                            selectedOption
                              ? "bg-primary hover:opacity-95 cursor-pointer active:scale-[0.99]"
                              : "bg-muted-foreground/30 text-muted-foreground cursor-not-allowed",
                          )}
                        >
                          <span>Confirm & Submit</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <div className="space-y-2 pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-11 w-full rounded-xl" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DemoDiagnosticSidebar
                isRevealed={isRevealed}
                isCorrect={isCorrect}
                question={question}
                correctOption={correctOption}
                selectedOption={selectedOption}
                trapKey={trapKey}
                remainingLabel={remainingLabel}
                exam={exam}
                examSlug={examSlug}
                user={user}
                onGoogleSignIn={handleGoogleSignIn}
                onReset={handleReset}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
