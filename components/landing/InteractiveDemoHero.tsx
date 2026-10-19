"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { examToSlug } from "@/lib/slugs";
import { useUser } from "@/hooks/useUser";
import { signInWithGoogle } from "@/lib/supabase/auth";
import {
  Brain,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Clock,
  Target,
  Calculator,
  HelpCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import taxonomy from "@/lib/taxonomies.json";
import demoQuestionsRaw from "@/lib/demo-questions.json";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomy as unknown as TaxonomyData;
const EXAM_NAMES = Object.keys(taxonomyData).filter((k) => !k.startsWith("_"));

const demoQuestions = demoQuestionsRaw as unknown as {
  _generated_at: string;
  exams: Record<string, DemoEntry>;
};

const EXAMS_WITH_DEMO = new Set(Object.keys(demoQuestions.exams));

// Top featured exam tracks for instant 1-click access
const FEATURED_EXAMS = [
  "JEE Main",
  "NEET",
  "UPSC CSE",
  "CAT",
  "GATE",
  "GMAT Focus",
  "GRE",
  "SAT",
];

// Conceptual / formula hints for users wondering how to approach the problem
const EXAM_HINTS: Record<string, string> = {
  "JEE Main":
    "Lens Maker's Formula: 1/f = (n − 1)(1/R₁ − 1/R₂). Cartesian sign convention: front surface is convex (R₁ = +15 cm), rear surface is curved inward relative to incident ray (R₂ = −10 cm).",
  "NEET":
    "In a monohybrid cross of heterozygotes (Tt × Tt), distinguish between genotypic ratio (1 TT : 2 Tt : 1 tt) and phenotypic ratio (3 tall : 1 dwarf).",
  "UPSC CSE":
    "In formal categorical syllogisms, a middle term ('diligent planners') must be distributed in at least one premise to warrant a valid deductive link between extremes.",
  "CAT":
    "For equal round-trip distances, Average Speed is the Harmonic Mean: 2·v₁·v₂ / (v₁ + v₂), or Total Distance / Total Time. Never take the simple arithmetic mean.",
  "GATE":
    "For any 2×2 matrix: Sum of Eigenvalues = Trace(M), and Product of Eigenvalues = Det(M). Form characteristic equation: λ² − Trace(M)λ + Det(M) = 0.",
  "GMAT Focus":
    "The Zero Trap: |x| = x implies x ≥ 0 (not strictly x > 0), because |0| = 0. Always test 0 as a critical boundary condition.",
  "GRE":
    "(x + y)² = x² + 2xy + y². Comparing (x + y)² with x² + y² reduces to determining whether 2xy is positive, negative, or zero.",
  "SAT":
    "Squaring both sides of √(x + 2) = x produces x + 2 = x². Always substitute candidate solutions back into the original radical to discard extraneous roots.",
  "CLAT":
    "Under the rule of strict liability (Rylands v. Fletcher), an 'Act of God' requires an unprecedented, extraordinary natural disaster that human foresight could not anticipate.",
  "CA Foundation":
    "Under Mohori Bibee v. Dharmodas Ghose, a minor's agreement is void ab initio. The doctrine of estoppel never applies against a minor under the Indian Contract Act.",
};

type Phase = "question" | "reveal";
type OptionKey = string;

interface DemoQuestion {
  question_text: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  distractor_analysis: Record<string, string>;
  skill_domain: string;
  difficulty_tier: string;
  time_estimate_seconds?: number;
  misconception: string;
  topics: string[];
}

interface DemoEntry {
  exam_name: string;
  subject: string;
  domain: string;
  question: DemoQuestion;
}

// ---------------------------------------------------------------------------
// Framer-motion variants
// ---------------------------------------------------------------------------

const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 28 },
  },
};

// ---------------------------------------------------------------------------
// Option Button
// ---------------------------------------------------------------------------

function OptionButton({
  letter,
  text,
  isSelected,
  isRevealed,
  isCorrect,
  isTrap,
  onClick,
}: {
  letter: string;
  text: string;
  isSelected: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  isTrap: boolean;
  onClick: () => void;
}) {
  let borderClass =
    "border-border/80 bg-card hover:border-border hover:bg-accent/40";

  if (isRevealed) {
    if (isSelected && isCorrect) {
      borderClass =
        "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]";
    } else if (isSelected && !isCorrect) {
      borderClass =
        "border-primary/50 bg-primary/10 shadow-[0_0_0_1px_rgba(208,84,51,0.2)]";
    } else if (isCorrect) {
      borderClass =
        "border-emerald-500/40 bg-emerald-500/5";
    }
  }

  return (
    <button
      type="button"
      disabled={isRevealed}
      onClick={onClick}
      className={cn(
        "group flex w-full items-start sm:items-center gap-3.5 rounded-xl border p-3.5 transition-all text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !isRevealed && "cursor-pointer active:scale-[0.99]",
        isRevealed && "cursor-default",
        borderClass,
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold font-mono transition-colors",
          isRevealed && isSelected && isCorrect
            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
            : isRevealed && isSelected && !isCorrect
              ? "bg-primary/20 text-primary"
              : isRevealed && isCorrect
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground",
        )}
      >
        {letter}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground leading-snug">
        {text}
      </span>
      {isRevealed && isTrap && (
        <span className="flex items-center gap-1 shrink-0 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          <TrendingUp className="h-3 w-3" />
          Common Trap
        </span>
      )}
      {isRevealed && isCorrect && (
        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main InteractiveDemoHero
// ---------------------------------------------------------------------------

export default function InteractiveDemoHero() {
  const { user } = useUser();
  const [exam, setExam] = useState<string>("JEE Main");
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const demoEntry = exam ? demoQuestions.exams[exam] : null;
  const question: DemoQuestion | null = demoEntry?.question ?? null;
  const examSlug = examToSlug(exam);

  const isCorrect =
    selectedOption !== null &&
    question !== null &&
    selectedOption === question.correct_option;

  const handleExamChange = useCallback((value: string) => {
    setExam(value);
    setSelectedOption(null);
    setPhase("question");
    setShowHint(false);
  }, []);

  const handleOptionClick = useCallback(
    (key: OptionKey) => {
      if (phase !== "question") return;
      setSelectedOption(key);
      setPhase("reveal");
    },
    [phase],
  );

  const handleReset = useCallback(() => {
    setSelectedOption(null);
    setPhase("question");
    setShowHint(false);
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("landingPrefill", JSON.stringify({ exam }));
    }
    signInWithGoogle();
  }, [exam]);

  const options = question
    ? Object.entries(question.options).map(([key, text]) => ({ key, text }))
    : [];
  const correctOption = question?.correct_option ?? "";
  const isRevealed = phase === "reveal";

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24">
      {/* Subtle warm background illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 rounded-full bg-primary/5 blur-[120px] -z-10"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* ============================================================== */}
          {/* Left column: Calm editorial headline & cognitive value         */}
          {/* ============================================================== */}
          <motion.div
            className="flex-1 space-y-6 text-center lg:text-left lg:pt-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            {/* Pill Badge */}
            <motion.div variants={fadeSlideUp}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Cognitive Retrieval Engine • 10 Exam Tracks
              </span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              className="font-heading text-balance text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-foreground leading-[1.15]"
              variants={fadeSlideUp}
            >
              Stop cramming 12 hours a day.{" "}
              <span className="text-primary italic">
                Eliminate the forgetting curve.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={fadeSlideUp}
            >
              Candidates don&apos;t fail competitive exams from lack of effort.
              They fail because the human brain drops 70% of facts within days, and exam questions are engineered with deceptive distractors. AceThePrep schedules micro-retrieval at the exact hour you are about to forget.
            </motion.p>

            {/* Proof Points */}
            <motion.div
              variants={fadeSlideUp}
              className="pt-2 grid grid-cols-3 gap-4 border-t border-border/70 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <p className="font-heading text-2xl font-semibold text-foreground">
                  100%
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Free & Open
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-semibold text-foreground">
                  Day 3 &middot; 7 &middot; 14
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Spaced Intervals
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-semibold text-foreground">
                  3.8&times;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Retention Lift
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ============================================================== */}
          {/* Right column: Interactive Exam Diagnostic Card                 */}
          {/* ============================================================== */}
          <div className="w-full max-w-xl flex-shrink-0 lg:w-[500px]">
            {/* Exam Selector Pill Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Select Exam Track
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/80">
                  Live Question Preview
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {FEATURED_EXAMS.map((name) => {
                  const isActive = exam === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleExamChange(name)}
                      className={cn(
                        "whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-all shrink-0",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "bg-secondary text-secondary-foreground hover:bg-accent",
                      )}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Card */}
            <motion.div
              layout
              className="rounded-2xl border border-border/80 bg-card/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm"
            >
              {/* Question Meta Header */}
              <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium text-foreground">
                    {demoEntry?.subject || "Subject"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {demoEntry?.domain || "Core Concepts"}
                  </span>
                </div>
                {question?.time_estimate_seconds && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {question.time_estimate_seconds}s
                  </span>
                )}
              </div>

              {/* Question Text */}
              {question ? (
                <div className="mt-4">
                  <p className="text-sm sm:text-base font-normal leading-relaxed text-foreground">
                    {question.question_text}
                  </p>

                  {/* Formula / Concept Hint Accordion */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setShowHint((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>
                        {showHint
                          ? "Hide formula hint"
                          : "How to solve? (Show formula hint)"}
                      </span>
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
                          <div className="mt-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-foreground/90 leading-relaxed">
                            <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                              Governing Equation & Concept:
                            </span>
                            {EXAM_HINTS[exam] || question.misconception}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Options */}
                  <div className="mt-4 space-y-2.5">
                    {options.map(({ key, text }) => (
                      <OptionButton
                        key={key}
                        letter={key}
                        text={text}
                        isSelected={selectedOption === key}
                        isRevealed={isRevealed}
                        isCorrect={key === correctOption}
                        isTrap={selectedOption === key && key !== correctOption}
                        onClick={() => handleOptionClick(key)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </div>
                  <Skeleton className="h-3.5 w-36 rounded" />
                  <div className="space-y-2.5 pt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 rounded-xl border border-border/70 p-3.5"
                      >
                        <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
                        <Skeleton className="h-4 w-3/4 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reveal & Distractor Telemetry */}
              <AnimatePresence>
                {isRevealed && selectedOption && question && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 space-y-4 pt-4 border-t border-border/70"
                  >
                    {/* Verdict Banner */}
                    <div
                      className={cn(
                        "rounded-xl p-3.5 flex items-start gap-3 text-sm",
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20"
                          : "bg-primary/10 text-foreground border border-primary/20",
                      )}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Brain className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold leading-tight">
                          {isCorrect
                            ? "Correct Invariant Identified."
                            : "Distractor Trap Triggered."}
                        </p>
                        <p className="text-xs opacity-90 leading-relaxed">
                          {isCorrect
                            ? question.distractor_analysis?.[correctOption]
                            : question.distractor_analysis?.[selectedOption] ||
                              question.misconception}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Derivation & Solution */}
                    <div className="rounded-xl border border-border/80 bg-muted/40 p-3.5 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <Calculator className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Step-by-Step Derivation:</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                        {question.explanation}
                      </p>
                    </div>

                    {/* Algorithmic Timing Projection */}
                    <div className="rounded-xl border border-border/80 bg-muted/30 p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Target className="h-3.5 w-3.5 text-primary" />
                        <span className="font-medium text-foreground">
                          Next Spaced Retrieval:
                        </span>
                      </div>
                      <span className="font-mono text-muted-foreground">
                        {isCorrect ? "Interval 2 (+7 Days)" : "Interval 1 (+3 Days)"}
                      </span>
                    </div>

                    {/* High-Intent Conversion CTA */}
                    <div className="pt-2 space-y-3">
                      {!user ? (
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <svg
                            className="h-4 w-4 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          <span>Sign In with Google to Start {exam} Track</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </button>
                      ) : (
                        <Link
                          href="/dashboard"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all"
                        >
                          <span>Continue to Your {exam} Dashboard</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </Link>
                      )}

                      {/* Secondary Actions */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Try another question
                        </button>

                        <Link
                          href={`/practice/${examSlug}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                        >
                          Browse full {exam} syllabus
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Initial hint before selection */}
              {!isRevealed && (
                <p className="mt-3 text-center text-xs text-muted-foreground/75">
                  Select an answer above to test your cognitive retrieval and see real candidate distractor telemetry.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
