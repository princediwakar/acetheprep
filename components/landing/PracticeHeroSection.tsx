// Path: components/landing/PracticeHeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Compass,
  AlertCircle,
  Layers,
  Target,
  Clock,
  Award,
  Check,
  TrendingUp,
  Brain,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExamCalculator } from "@/components/tutor/ExamCalculator";
import { FormulaSheetModal } from "@/components/landing/FormulaSheetModal";
import { PracticeOptionItem } from "./PracticeOptionItem";
import {
  LANDING_EXAMS,
  type ExamKey,
  type LandingQuestion,
  getSolutionBreakdown,
} from "./landing-data";
import { signInWithGoogle } from "@/lib/supabase/auth";
import { InstantTopicSearch } from "./InstantTopicSearch";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import { ExamSelectorStrip, EXAM_TABS } from "@/components/shared/ExamSelectorStrip";

interface PracticeHeroSectionProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
  selectedQuestionIndex?: number;
  onSelectQuestionIndex?: (idx: number) => void;
}

interface QuestionAttempt {
  selected: string;
  isCorrect: boolean;
  revealedWithoutAnswering?: boolean;
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
    headline: "Break your score ceiling. Hit 740+.",
    subhead:
      "Pinpoint your score leaks across Data Insights, Quant, and Verbal. Stop studying passively—fix your trap mistakes in 15 minutes a day.",
  },
  sat: {
    org: "College Board Digital SAT",
    headline: "Stop losing points to test traps. Hit 1500+.",
    subhead:
      "Target your exact weak spots across Reading & Writing and Math. Authentic Desmos-integrated questions that build real exam instinct.",
  },
  gre: {
    org: "ETS GRE General",
    headline: "Eliminate your error patterns. Hit 330+.",
    subhead:
      "Target high-yield Quantitative Comparison traps and Text Completion logic shifts with step-by-step first principles.",
  },
  cfa: {
    org: "CFA Institute Level 1",
    headline: "Master high-weight concepts. Secure the 90th percentile.",
    subhead:
      "Zero in on Financial Statement Analysis, Quant Methods, and Corporate Issuers with formula derivations and active recall.",
  },
  ielts: {
    org: "British Council & IDP",
    headline: "Master test traps. Target Band 8.0+.",
    subhead:
      "Demystify True / False / Not Given passage traps, paraphrase synthesis, and lexical accuracy with timed practice.",
  },
  toefl: {
    org: "ETS TOEFL iBT",
    headline: "Precision practice. Target 110+ on the iBT.",
    subhead:
      "Master high-speed academic reading inferences, acoustic distractors, and structured expression with immediate feedback.",
  },
};

export function PracticeHeroSection({
  activeExam,
  onExamChange,
  selectedQuestionIndex = 0,
  onSelectQuestionIndex,
}: PracticeHeroSectionProps) {
  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const questions = examConfig.questions;
  const heroCopy = EXAM_HERO_COPY[activeExam] || EXAM_HERO_COPY.gmat;

  const [questionIndex, setQuestionIndex] = useState<number>(selectedQuestionIndex);
  const [attempts, setAttempts] = useState<Record<number, QuestionAttempt>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [strikethroughMode, setStrikethroughMode] = useState<boolean>(false);
  const [struckOptions, setStruckOptions] = useState<Record<string, boolean>>({});

  // Reset when exam changes
  useEffect(() => {
    setQuestionIndex(0);
    setAttempts({});
    setShowSummary(false);
    setStruckOptions({});
    try {
      localStorage.setItem("landingPrefill", JSON.stringify({ exam: examConfig.name }));
    } catch {
      // LocalStorage fallback
    }
  }, [activeExam, examConfig.name]);

  const currentQuestion: LandingQuestion =
    questions[questionIndex % questions.length] ?? questions[0];

  const currentAttempt = attempts[questionIndex];
  const selectedOption = currentAttempt?.selected || null;
  const isRevealed = Boolean(currentAttempt);
  const isCorrect = currentAttempt?.isCorrect || false;
  const solution = getSolutionBreakdown(currentQuestion);

  // Statistics across the 3 questions
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(attempts).length;
  const correctCount = Object.values(attempts).filter((a) => a.isCorrect).length;
  const accuracyPercent =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const isAllAnswered = answeredCount >= totalQuestions;

  const handleSelectOption = (key: string) => {
    if (isRevealed) return;
    const isAnswerCorrect = key === currentQuestion.correctOption;

    const newAttempts = {
      ...attempts,
      [questionIndex]: {
        selected: key,
        isCorrect: isAnswerCorrect,
      },
    };

    setAttempts(newAttempts);

    try {
      const storageKey = `acetheprep_arena_${activeExam}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "{}");
      existing[currentQuestion.id] = {
        selected: key,
        isCorrect: isAnswerCorrect,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }
  };

  const handleRevealWithoutAnswering = () => {
    if (isRevealed) return;
    setAttempts((prev) => ({
      ...prev,
      [questionIndex]: {
        selected: currentQuestion.trapOption,
        isCorrect: false,
        revealedWithoutAnswering: true,
      },
    }));
  };

  const handleToggleStrike = (letter: string) => {
    setStruckOptions((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  const handleNavigateQuestion = (idx: number) => {
    setQuestionIndex(idx);
    setShowSummary(false);
    setStruckOptions({});
    if (onSelectQuestionIndex) {
      onSelectQuestionIndex(idx);
    }
  };

  const handleNextOrFinish = () => {
    if (questionIndex < totalQuestions - 1) {
      handleNavigateQuestion(questionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleResetCurrent = () => {
    setAttempts((prev) => {
      const copy = { ...prev };
      delete copy[questionIndex];
      return copy;
    });
    setStruckOptions({});
  };

  const handleResetEntireSet = () => {
    setAttempts({});
    setShowSummary(false);
    setQuestionIndex(0);
    setStruckOptions({});
  };

  const drillUrl =
    examConfig.curriculum?.diagnosticDrillUrl ||
    `/practice/${examConfig.curriculum?.slug || activeExam}`;

  const blueprintUrl =
    examConfig.curriculum?.blueprintUrl ||
    `/practice/${examConfig.curriculum?.slug || activeExam}`;

  // Find first weak topic from attempts
  const weakQuestionIndex = Object.entries(attempts).find(([, a]) => !a.isCorrect)?.[0];
  const weakTopic =
    weakQuestionIndex !== undefined
      ? questions[Number(weakQuestionIndex)]?.topic || currentQuestion.topic
      : currentQuestion.topic;

  return (
    <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 px-4 sm:px-6">
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

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Exam Switcher Strip */}
        <div id="exam-selector">
          <ExamSelectorStrip
            activeExam={activeExam}
            onExamChange={onExamChange}
          />
        </div>

        {/* Dynamic Exam-Specific Hero Messaging */}
        <PageHero
          badge={
            <HeroBadge className="border-border bg-muted/60 text-foreground/80 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Configured for {examConfig.name}</span>
              <span className="text-muted-foreground/40">•</span>
              <span>{heroCopy.org}</span>
            </HeroBadge>
          }
          title={heroCopy.headline}
          subtitle={heroCopy.subhead}
        >
          <InstantTopicSearch activeExam={activeExam} />
        </PageHero>

        {/* High-Precision Practice Workspace Terminal */}
        <div
          id="practice-workspace"
          className="rounded-2xl border border-border/90 bg-card shadow-xs overflow-hidden scroll-mt-20"
        >
          {/* Proctor Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/80 px-4 py-3 bg-secondary/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              {/* Question Index Pills with Answered Indicators */}
              <div className="flex items-center gap-1.5">
                {questions.map((_, idx) => {
                  const att = attempts[idx];
                  const isCurrent = questionIndex === idx && !showSummary;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleNavigateQuestion(idx)}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer relative",
                        isCurrent
                          ? "bg-foreground text-background shadow-xs font-bold ring-2 ring-foreground/20"
                          : att
                            ? att.isCorrect
                              ? "bg-emerald-600 text-white font-bold"
                              : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40 font-bold"
                            : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-secondary",
                      )}
                      title={`Question ${idx + 1}${att ? (att.isCorrect ? " (Correct)" : " (Incorrect)") : ""}`}
                    >
                      {att ? (
                        att.isCorrect ? (
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <span className="text-xs font-bold">✗</span>
                        )
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <span className="text-border">|</span>

              {/* Progress Summary Pill */}
              <div className="flex items-center gap-2 font-mono text-xs text-foreground/90 font-medium">
                <span className="hidden sm:inline text-muted-foreground">Progress:</span>
                <span className="font-semibold">
                  {answeredCount}/{totalQuestions} Answered
                </span>
                {answeredCount > 0 && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {correctCount}/{answeredCount} Correct
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {examConfig.hasCalculator && (
                <button
                  type="button"
                  onClick={() => setShowCalculator(true)}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] hover:bg-secondary transition-colors cursor-pointer text-foreground/80"
                >
                  <Calculator className="h-3 w-3 text-muted-foreground" />
                  <span>Calculator</span>
                </button>
              )}

              {examConfig.hasFormulaSheet && (
                <button
                  type="button"
                  onClick={() => setShowFormulaSheet(true)}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] hover:bg-secondary transition-colors cursor-pointer text-foreground/80"
                >
                  <BookOpen className="h-3 w-3 text-muted-foreground" />
                  <span>Formulas</span>
                </button>
              )}

              {isAllAnswered && !showSummary && (
                <button
                  type="button"
                  onClick={() => setShowSummary(true)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-foreground text-background px-3 py-1 text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>View Diagnostic Score</span>
                </button>
              )}
            </div>
          </div>

          {/* MAIN WORKSPACE CONTENT: Either Question Canvas OR Diagnostic Results Card */}
          {showSummary ? (
            /* DIAGNOSTIC COMPLETION & READINESS CARD */
            <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
              {/* Header Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>3-Question Diagnostic Complete</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-medium text-foreground tracking-tight">
                    {examConfig.name} Readiness Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Based on your speed, accuracy, and error choices across the test track.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetEntireSet}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card hover:bg-secondary px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake 3 Questions</span>
                </button>
              </div>

              {/* 3 Core Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-1">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                    Diagnostic Accuracy
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
                    {correctCount} / {totalQuestions} Correct
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {accuracyPercent}% baseline accuracy
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-1">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                    Pacing & Timing
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
                    On Pace
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    ~{Math.round(examConfig.timeLimitSeconds / 60)} min per problem standard
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-1">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                    Initial Score Band
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
                    {accuracyPercent === 100
                      ? "High Mastery"
                      : accuracyPercent >= 66
                        ? "Competitive"
                        : "Gap Detected"}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Target {examConfig.scoreScale.defaultTarget} {examConfig.scoreScale.unit}
                  </p>
                </div>
              </div>

              {/* Topic-by-Topic Breakdown Table */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                  Question & Concept Breakdown:
                </span>

                <div className="divide-y divide-border/60 rounded-xl border border-border/80 bg-card overflow-hidden text-xs">
                  {questions.map((q, idx) => {
                    const att = attempts[idx];
                    const isQCorrect = att?.isCorrect;
                    return (
                      <div
                        key={q.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/20 transition-colors"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold mt-0.5",
                              isQCorrect
                                ? "bg-emerald-600 text-white"
                                : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40",
                            )}
                          >
                            {isQCorrect ? "✓" : "✗"}
                          </span>
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground text-xs sm:text-sm truncate">
                                Problem {idx + 1}: {q.topic}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground shrink-0">
                                {q.section}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-xs line-clamp-1">
                              {isQCorrect
                                ? "Verified derivation understood."
                                : `Common trap triggered: ${q.trapName}`}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleNavigateQuestion(idx)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline shrink-0 self-end sm:self-auto cursor-pointer"
                        >
                          <span>Review solution</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Profile Setup Next Step Card */}
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      Ready to start your {examConfig.shortName} prep?
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Create your exam profile to set your target score, test date, and get ready to practice with personalized adaptive sets.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      signInWithGoogle(`/setup?exam=${encodeURIComponent(examConfig.name)}`)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
                  >
                    <span>Create Exam Profile &amp; Start Practice</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={blueprintUrl}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card hover:bg-secondary px-4 py-2.5 text-xs font-medium text-foreground transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Explore {examConfig.shortName} Syllabus</span>
                  </Link>

                  <a
                    href="#curriculum"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium px-2 py-1"
                  >
                    <span>Compare All 6 Curricula ↓</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* QUESTION CANVAS */
            <div className="p-5 sm:p-7 space-y-6">
              {/* Question Context & Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-foreground px-2 py-0.5 rounded bg-muted/80">
                    Question {questionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-muted-foreground">&bull;</span>
                  <span className="font-medium text-muted-foreground">{currentQuestion.topic}</span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Est: {currentQuestion.timeEstimateSeconds}s</span>
                  </span>
                  {!isRevealed && (
                    <button
                      type="button"
                      onClick={handleRevealWithoutAnswering}
                      className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground hover:underline transition-colors cursor-pointer"
                    >
                      <HelpCircle className="h-3 w-3" />
                      <span>Show Solution</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="border-l-2 border-foreground/30 pl-4 py-1">
                <p className="text-sm sm:text-base font-normal text-foreground leading-relaxed whitespace-pre-line font-serif sm:font-sans">
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
                    isStruck={Boolean(struckOptions[letter])}
                    strikethroughMode={strikethroughMode}
                    isRevealed={isRevealed}
                    isCorrect={letter === currentQuestion.correctOption}
                    isTrap={letter === currentQuestion.trapOption}
                    onSelect={() => handleSelectOption(letter)}
                    onToggleStrike={() => handleToggleStrike(letter)}
                  />
                ))}
              </div>

              {/* Interactive Helper Footer when Question is NOT yet answered */}
              {!isRevealed && (
                <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
                    <span>
                      Select an option above to test your reasoning and view the step-by-step
                      first-principles derivation.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setStrikethroughMode(!strikethroughMode)}
                      className={cn(
                        "rounded px-2 py-0.5 text-[11px] font-mono border transition-colors cursor-pointer",
                        strikethroughMode
                          ? "bg-foreground text-background font-bold"
                          : "border-border bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {strikethroughMode ? "Exit Elimination" : "Eliminate Options"}
                    </button>

                    <button
                      type="button"
                      onClick={handleRevealWithoutAnswering}
                      className="text-[11px] text-foreground font-medium underline underline-offset-2 cursor-pointer"
                    >
                      Reveal
                    </button>
                  </div>
                </div>
              )}

              {/* In-Place High-Precision Solution Card */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-xl border p-5 sm:p-6 space-y-5 text-xs sm:text-sm",
                      isCorrect
                        ? "border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20"
                        : "border-border bg-card",
                    )}
                  >
                    {/* Status Banner */}
                    <div className="flex items-center justify-between border-b border-border/70 pb-3">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                              Correct. Option {currentQuestion.correctOption} is the verified answer.
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                            <span className="font-semibold text-foreground">
                              {currentAttempt?.revealedWithoutAnswering
                                ? `Solution Revealed. Option ${currentQuestion.correctOption} is correct.`
                                : `Incorrect. Option ${currentQuestion.correctOption} is correct.`}
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleResetCurrent}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Retry</span>
                      </button>
                    </div>

                    {/* 3 Clear Solution Pillars */}
                    <div className="space-y-4 text-foreground/90 leading-relaxed">
                      {/* 1. The Core Principle */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                          <Compass className="h-3.5 w-3.5 text-foreground" />
                          <span>The Core Principle</span>
                        </div>
                        <p className="text-foreground/90 pl-5 text-xs sm:text-sm">
                          {solution.corePrinciple}
                        </p>
                      </div>

                      {/* 2. Step-by-Step Solution */}
                      <div className="space-y-1 pt-2 border-t border-border/60">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                          <Layers className="h-3.5 w-3.5 text-foreground" />
                          <span>Step-by-Step Walkthrough</span>
                        </div>
                        <p className="text-muted-foreground pl-5 text-xs sm:text-sm leading-relaxed">
                          {solution.stepByStepSolution}
                        </p>
                      </div>

                      {/* 3. Common Misconceptions */}
                      <div className="space-y-1 pt-2 border-t border-border/60">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>Common Misconception</span>
                        </div>
                        <p className="text-muted-foreground pl-5 text-xs sm:text-sm leading-relaxed">
                          {solution.commonMisconceptions}
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/70">
                      <button
                        type="button"
                        onClick={() =>
                          signInWithGoogle(`/setup?exam=${encodeURIComponent(examConfig.name)}`)
                        }
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
                      >
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span>Create exam profile to track progress</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleNextOrFinish}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
                        >
                          <span>
                            {questionIndex < totalQuestions - 1
                              ? `Next Question (${questionIndex + 2} of ${totalQuestions})`
                              : isAllAnswered
                                ? "View Diagnostic Score →"
                                : "View Results Summary →"}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Backward compatibility alias
export const LiveArenaSection = PracticeHeroSection;
export type { PracticeHeroSectionProps as LiveArenaSectionProps };
