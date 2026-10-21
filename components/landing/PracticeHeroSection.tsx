// Path: components/landing/PracticeHeroSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExamCalculator } from "@/components/tutor/ExamCalculator";
import { FormulaSheetModal } from "@/components/landing/FormulaSheetModal";
import { PracticeOptionItem } from "./PracticeOptionItem";
import { LANDING_EXAMS, type ExamKey, type LandingQuestion } from "./landing-data";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface PracticeHeroSectionProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
  selectedQuestionIndex?: number;
  onSelectQuestionIndex?: (idx: number) => void;
}

export function PracticeHeroSection({
  activeExam,
  onExamChange,
  selectedQuestionIndex = 0,
  onSelectQuestionIndex,
}: PracticeHeroSectionProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const questions = examConfig.questions;

  const [questionIndex, setQuestionIndex] = useState<number>(selectedQuestionIndex);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);

  // Sync external question index changes (e.g. from Score Gap tool or Hardest Questions)
  useEffect(() => {
    if (selectedQuestionIndex !== questionIndex) {
      setQuestionIndex(selectedQuestionIndex % questions.length);
      setSelectedOption(null);
      setIsRevealed(false);
    }
  }, [selectedQuestionIndex, questions.length, questionIndex]);

  // Reset when exam changes & prefill for setup bridge
  useEffect(() => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsRevealed(false);
    try {
      localStorage.setItem("landingPrefill", JSON.stringify({ exam: examConfig.name }));
    } catch {
      // LocalStorage access fails gracefully in private/incognito modes
    }
  }, [activeExam, examConfig.name]);

  const currentQuestion: LandingQuestion =
    questions[questionIndex % questions.length] ?? questions[0];

  const isCorrect = selectedOption === currentQuestion.correctOption;
  const isTrap = selectedOption === currentQuestion.trapOption;

  const handleSelectOption = (key: string) => {
    if (isRevealed) return;
    setSelectedOption(key);
    setIsRevealed(true);

    // Save attempt in browser memory & prefill for frictionless setup
    try {
      const storageKey = `acetheprep_arena_${activeExam}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "{}");
      existing[currentQuestion.id] = {
        selected: key,
        isCorrect: key === currentQuestion.correctOption,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(existing));
      localStorage.setItem("landingPrefill", JSON.stringify({ exam: examConfig.name }));
    } catch {
      // LocalStorage access fails gracefully in private/incognito modes
    }
  };

  const handleRevealWithoutAnswering = () => {
    setSelectedOption(currentQuestion.trapOption);
    setIsRevealed(true);
  };

  const handleNextQuestion = () => {
    const nextIdx = (questionIndex + 1) % questions.length;
    setQuestionIndex(nextIdx);
    if (onSelectQuestionIndex) {
      onSelectQuestionIndex(nextIdx);
    }
    setSelectedOption(null);
    setIsRevealed(false);

    // Keep question terminal cleanly in view so user never has to scroll up manually
    if (typeof window !== "undefined") {
      const el = document.getElementById("practice-hero-terminal");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 60) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleResetQuestion = () => {
    setSelectedOption(null);
    setIsRevealed(false);
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6">
      {/* Calculator Modal */}
      <ExamCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        examName={examConfig.name}
      />

      {/* Formula Sheet Modal */}
      <FormulaSheetModal
        isOpen={showFormulaSheet}
        onClose={() => setShowFormulaSheet(false)}
      />

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Sleek, High-Density Utilitarian Command Header */}
        <div className="space-y-3 pt-1">
          {/* Top Headline & Utility Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                <span>Free Live Arena • Zero Sign-Up</span>
                <span className="text-primary/40">•</span>
                <span className="text-[10px] uppercase font-mono tracking-wider">{examConfig.officialBadge}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-normal tracking-tight text-foreground leading-tight">
                Free {examConfig.name} Practice &amp; Trap Autopsies
              </h1>
            </div>

            {!isRevealed && (
              <button
                type="button"
                onClick={handleRevealWithoutAnswering}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-card hover:bg-secondary/70 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5 text-primary" />
                <span>Reveal Trap Instantly</span>
              </button>
            )}
          </div>

          {/* Compact Horizontal Exam Tabs (Crawlable <a> Links) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(
              [
                { key: "gmat", title: "GMAT Focus" },
                { key: "sat", title: "Digital SAT" },
                { key: "gre", title: "GRE General" },
                { key: "cfa", title: "CFA Level 1" },
                { key: "ielts", title: "IELTS Academic" },
                { key: "toefl", title: "TOEFL iBT" },
              ] as const
            ).map((item) => {
              const isSelected = activeExam === item.key;
              const href = item.key === "gmat" ? "/" : `/?exam=${item.key}`;
              return (
                <a
                  key={item.key}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onExamChange(item.key);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-xs font-bold"
                      : "border-border/70 bg-card hover:bg-secondary/80 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />}
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>

          {/* Challenge Hook Banner */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-foreground/90 font-medium leading-snug">
              <Zap className="h-4 w-4 text-primary shrink-0" />
              <span>{examConfig.heroPrompt}</span>
            </div>
            {!isRevealed && (
              <button
                type="button"
                onClick={handleRevealWithoutAnswering}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold shrink-0 cursor-pointer"
              >
                Reveal Trap
              </button>
            )}
          </div>
        </div>

        {/* Live Question Terminal Card */}
        <div
          id="practice-hero-terminal"
          className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden scroll-mt-20"
        >
          {/* Proctor Toolbar with Top Next Question Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border px-4 py-2.5 bg-secondary/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              {/* Question 1/2/3 Direct Selector Pills */}
              <div className="flex items-center gap-1">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuestionIndex(idx);
                      if (onSelectQuestionIndex) onSelectQuestionIndex(idx);
                      setSelectedOption(null);
                      setIsRevealed(false);
                    }}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer",
                      questionIndex === idx
                        ? "bg-foreground text-background shadow-2xs font-bold"
                        : "bg-background/80 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <span className="text-border">|</span>
              <span className="font-mono text-xs truncate max-w-[180px] sm:max-w-none text-foreground/90 font-medium">
                {currentQuestion.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {examConfig.hasCalculator && (
                <button
                  type="button"
                  onClick={() => setShowCalculator(true)}
                  className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] hover:bg-secondary transition-colors cursor-pointer"
                >
                  <Calculator className="h-3 w-3 text-primary" />
                  <span>Calculator</span>
                </button>
              )}

              {examConfig.hasFormulaSheet && (
                <button
                  type="button"
                  onClick={() => setShowFormulaSheet(true)}
                  className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] hover:bg-secondary transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3 w-3 text-primary" />
                  <span>Formulas</span>
                </button>
              )}

              {/* Top Next Question Button (eliminates scrolling) */}
              <button
                type="button"
                onClick={handleNextQuestion}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-all cursor-pointer",
                  isRevealed
                    ? "bg-foreground text-background shadow-xs hover:opacity-90 ring-1 ring-primary/40"
                    : "border border-border/80 bg-background/80 text-foreground/80 hover:bg-secondary hover:text-foreground",
                )}
              >
                <span>
                  Next (
                  {((questionIndex + 1) % questions.length) + 1} of{" "}
                  {questions.length})
                </span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5 sm:p-7 space-y-6">
            <div className="border-l-2 border-primary/40 pl-4 py-0.5">
              <p className="text-sm sm:text-base font-normal text-foreground leading-relaxed whitespace-pre-line">
                {currentQuestion.questionText}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {Object.entries(currentQuestion.options).map(([letter, text]) => (
                <PracticeOptionItem
                  key={letter}
                  letter={letter}
                  text={text}
                  isSelected={selectedOption === letter}
                  isStruck={false}
                  strikethroughMode={false}
                  isRevealed={isRevealed}
                  isCorrect={letter === currentQuestion.correctOption}
                  isTrap={letter === currentQuestion.trapOption}
                  onSelect={() => handleSelectOption(letter)}
                  onToggleStrike={() => {}}
                />
              ))}
            </div>

            {/* In-Place Explanation Card (Reveals instantly on answer click) */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "rounded-xl border p-5 sm:p-6 space-y-4 text-xs sm:text-sm",
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20"
                      : "border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20",
                  )}
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                            Spot-on! You avoided the engineered trap.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                          <span className="font-semibold text-rose-700 dark:text-rose-300">
                            You hit {currentQuestion.trapName}.
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleResetQuestion}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Retry</span>
                    </button>
                  </div>

                  {/* 3-Bullet Plain English Breakdown */}
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    <div>
                      <span className="font-semibold text-foreground block mb-0.5">
                        Why Option {currentQuestion.trapOption} fooled test-takers:
                      </span>
                      <p>{currentQuestion.whyTrapFooled}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-foreground block mb-0.5">
                        Why Option {currentQuestion.correctOption} is correct:
                      </span>
                      <p>{currentQuestion.whyCorrectWorks}</p>
                    </div>

                    <div className="rounded-lg bg-background/80 border border-border/80 p-3 text-foreground flex items-start gap-2.5">
                      <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-xs uppercase tracking-wider block text-primary">
                          The 10-Second Test Rule
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {currentQuestion.tenSecondRule}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => signInWithGoogle(`/setup?exam=${encodeURIComponent(examConfig.name)}`)}
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold cursor-pointer text-left"
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0" />
                      <span>Save attempt &amp; start personalized study plan</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    >
                      <span>
                        Next Question (
                        {((questionIndex + 1) % questions.length) + 1} of{" "}
                        {questions.length})
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward compatibility alias
export const LiveArenaSection = PracticeHeroSection;
export type { PracticeHeroSectionProps as LiveArenaSectionProps };

