// Path: components/landing/LiveArenaSection.tsx
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
import { BluebookOption } from "./BluebookOption";
import { ARENA_EXAMS, type ExamKey, type ArenaQuestion } from "./arena-data";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface LiveArenaSectionProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
  selectedQuestionIndex?: number;
  onSelectQuestionIndex?: (idx: number) => void;
}

export function LiveArenaSection({
  activeExam,
  onExamChange,
  selectedQuestionIndex = 0,
  onSelectQuestionIndex,
}: LiveArenaSectionProps) {
  const examConfig = ARENA_EXAMS[activeExam] || ARENA_EXAMS.gmat;
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

  // Reset when exam changes
  useEffect(() => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsRevealed(false);
  }, [activeExam]);

  const currentQuestion: ArenaQuestion =
    questions[questionIndex % questions.length] ?? questions[0];

  const isCorrect = selectedOption === currentQuestion.correctOption;
  const isTrap = selectedOption === currentQuestion.trapOption;

  const handleSelectOption = (key: string) => {
    if (isRevealed) return;
    setSelectedOption(key);
    setIsRevealed(true);

    // Save attempt in browser memory
    try {
      const storageKey = `acetheprep_arena_${activeExam}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "{}");
      existing[currentQuestion.id] = {
        selected: key,
        isCorrect: key === currentQuestion.correctOption,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(existing));
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
      const el = document.getElementById("live-arena-terminal");
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
        {/* CENTER-STAGE EXAM SELECTOR: The First Thing to Choose */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free Adaptive Practice • 2026 Test Specifications</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-normal tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
              Free {examConfig.name} Practice Questions & Trap Autopsies
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Solve authentic {examConfig.name} questions, uncover the exact mental traps designed into wrong choices, and calculate your real score gap with zero sign-up.
            </p>
          </div>

          {/* Prominent 6-Track Center Selector Deck (Semantic Crawlable <a> Links) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 max-w-5xl mx-auto pt-2">
            {(
              [
                {
                  key: "gmat",
                  title: "GMAT Focus",
                  subtitle: "Data Insights & Quant",
                },
                {
                  key: "sat",
                  title: "Digital SAT",
                  subtitle: "Bluebook Math & Reading",
                },
                {
                  key: "gre",
                  title: "GRE General",
                  subtitle: "Quant & Verbal",
                },
                {
                  key: "cfa",
                  title: "CFA Level 1",
                  subtitle: "Financial Analysis",
                },
                {
                  key: "ielts",
                  title: "IELTS Academic",
                  subtitle: "Reading & Language",
                },
                {
                  key: "toefl",
                  title: "TOEFL iBT",
                  subtitle: "Reading & Rhetoric",
                },
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
                    "flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[64px]",
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/40 shadow-xs"
                      : "border-border/80 bg-card hover:bg-secondary/60 hover:border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-semibold tracking-tight truncate",
                        isSelected ? "text-foreground" : "text-foreground/90",
                      )}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono mt-0.5 text-muted-foreground truncate w-full">
                    {item.subtitle}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Official Blueprint Verification Badge */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              {examConfig.officialBadge}
            </span>
          </div>
        </div>

        {/* Challenge Hook Banner */}
        <div className="rounded-xl border border-border/80 bg-secondary/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-medium text-xs">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>Live Problem Arena • Zero Sign-Up Required</span>
            </div>
            <p className="text-sm sm:text-base font-normal text-foreground leading-snug">
              {examConfig.heroPrompt}
            </p>
          </div>

          {!isRevealed && (
            <button
              type="button"
              onClick={handleRevealWithoutAnswering}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shrink-0 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Just show me the trap</span>
            </button>
          )}
        </div>

        {/* Live Question Terminal Card */}
        <div
          id="live-arena-terminal"
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
                <BluebookOption
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
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Free practice sample • Zero sign-up required
                    </span>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
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
