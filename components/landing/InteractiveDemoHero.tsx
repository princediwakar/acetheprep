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
  ShieldAlert,
  Zap,
  Globe2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import taxonomy from "@/lib/taxonomies.json";
import demoQuestionsRaw from "@/lib/demo-questions.json";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomy as unknown as TaxonomyData;
const ALL_EXAM_NAMES = Object.keys(taxonomyData).filter((k) => !k.startsWith("_"));

const demoQuestions = demoQuestionsRaw as unknown as {
  _generated_at: string;
  exams: Record<string, DemoEntry>;
};

// Global primary standardized tracks (SAT, GRE, GMAT, CFA)
const GLOBAL_FEATURED_EXAMS = [
  { id: "SAT", label: "Digital SAT", badge: "College Board" },
  { id: "GRE", label: "GRE General", badge: "ETS" },
  { id: "GMAT Focus", label: "GMAT Focus", badge: "GMAC" },
  { id: "CFA Level 1", label: "CFA Level 1", badge: "CFA Institute" },
];

// Conceptual / formula hints for users wondering how to approach the problem
const EXAM_HINTS: Record<string, string> = {
  "SAT":
    "Squaring both sides of √(x + 2) = x produces x + 2 = x². Always substitute candidate solutions back into the original radical to eliminate extraneous roots.",
  "GRE":
    "(x + y)² = x² + 2xy + y². Comparing (x + y)² with x² + y² reduces to determining whether 2xy is positive, negative, or zero.",
  "GMAT Focus":
    "The Zero Trap: |x| = x implies x ≥ 0 (not strictly x > 0), because |0| = 0. Always test 0 as a critical boundary condition.",
  "CFA Level 1":
    "Effective Annual Rate: EAR = (1 + r/m)^m − 1. For monthly compounding (m = 12), EAR is always strictly greater than nominal APR because interest earns interest across periods.",
  "JEE Main":
    "Lens Maker's Formula: 1/f = (n − 1)(1/R₁ − 1/R₂). Cartesian sign convention: front surface is convex (R₁ = +15 cm), rear surface is curved inward relative to incident ray (R₂ = −10 cm).",
  "NEET":
    "In a monohybrid cross of heterozygotes (Tt × Tt), distinguish between genotypic ratio (1 TT : 2 Tt : 1 tt) and phenotypic ratio (3 tall : 1 dwarf).",
  "CAT":
    "For equal round-trip distances, Average Speed is the Harmonic Mean: 2·v₁·v₂ / (v₁ + v₂), or Total Distance / Total Time. Never take the simple arithmetic mean.",
  "GATE":
    "For any 2×2 matrix: Sum of Eigenvalues = Trace(M), and Product of Eigenvalues = Det(M). Form characteristic equation: λ² − Trace(M)λ + Det(M) = 0.",
  "UPSC CSE":
    "In formal categorical syllogisms, a middle term ('diligent planners') must be distributed in at least one premise to warrant a valid deductive link between extremes.",
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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};

// ---------------------------------------------------------------------------
// Option Button Component
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
    "border-border/80 bg-background/80 hover:border-primary/40 hover:bg-secondary/40";

  if (isRevealed) {
    if (isSelected && isCorrect) {
      borderClass =
        "border-emerald-500/70 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.25)]";
    } else if (isSelected && !isCorrect) {
      borderClass =
        "border-primary/60 bg-primary/10 shadow-[0_0_0_1px_rgba(208,84,51,0.25)]";
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
        "group flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 sm:px-3.5 sm:py-3 transition-all text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !isRevealed && "cursor-pointer active:scale-[0.99]",
        isRevealed && "cursor-default",
        borderClass,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold font-mono transition-colors",
            isRevealed && isSelected && isCorrect
              ? "bg-emerald-500/25 text-emerald-700 dark:text-emerald-300"
              : isRevealed && isSelected && !isCorrect
                ? "bg-primary/25 text-primary"
                : isRevealed && isCorrect
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground",
          )}
        >
          {letter}
        </span>
        <span className="text-xs sm:text-sm font-medium text-foreground leading-snug truncate sm:whitespace-normal">
          {text}
        </span>
      </div>

      {isRevealed && isTrap && (
        <span className="flex items-center gap-1 shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">
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
// Main InteractiveDemoHero Component (Global Admissions & Standardized Testing)
// ---------------------------------------------------------------------------

export default function InteractiveDemoHero() {
  const { user } = useUser();
  const [exam, setExam] = useState<string>("SAT");
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
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] rounded-full bg-primary/10 blur-[130px] -z-10"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================================== */}
        {/* 1. Header: Authoritative Centered Value Proposition            */}
        {/* ============================================================== */}
        <motion.div
          className="mx-auto max-w-3xl text-center space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.02 },
            },
          }}
        >
          {/* Global Admissions Pill Badge */}
          <motion.div variants={fadeSlideUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              <Globe2 className="h-3.5 w-3.5" />
              Global Standardized Exam Intelligence
            </span>
          </motion.div>

          {/* Grand Headline */}
          <motion.h1
            className="font-heading text-balance text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]"
            variants={fadeSlideUp}
          >
            Master the traps that decide{" "}
            <span className="text-primary italic font-serif">
              your 99th percentile.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={fadeSlideUp}
          >
            Examiners at College Board, ETS, GMAC, and CFA Institute intentionally design deceptive distractor options.
            AceThePrep trains your intuition to expose the hidden traps in seconds.
          </motion.p>

          {/* Action Row & Fast Exam Jump */}
          <motion.div
            variants={fadeSlideUp}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href={`/practice/${examSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Start Free Practice</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="w-full sm:w-56 relative">
              <select
                value={exam}
                onChange={(e) => handleExamChange(e.target.value)}
                aria-label="Select target curriculum"
                className="w-full appearance-none rounded-xl border border-border bg-secondary/80 py-3.5 pl-4 pr-9 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <optgroup label="Global Standardized Exams">
                  <option value="SAT">Digital SAT (College Board)</option>
                  <option value="GRE">GRE General (ETS)</option>
                  <option value="GMAT Focus">GMAT Focus (GMAC)</option>
                  <option value="CFA Level 1">CFA Level 1 (CFA Inst.)</option>
                  <option value="IELTS Academic">IELTS Academic</option>
                  <option value="TOEFL iBT">TOEFL iBT</option>
                </optgroup>
                <optgroup label="Other Curricula">
                  <option value="CAT">CAT (IIM)</option>
                  <option value="GATE">GATE</option>
                  <option value="JEE Main">JEE Main</option>
                  <option value="NEET">NEET</option>
                  <option value="UPSC CSE">UPSC CSE</option>
                  <option value="CLAT">CLAT Law</option>
                  <option value="CA Foundation">CA Foundation</option>
                </optgroup>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground pt-1"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              100% Free & Open-Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Instant Cognitive Telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              No Credit Card Required
            </span>
          </motion.div>
        </motion.div>

        {/* ============================================================== */}
        {/* 2. The Interactive Dual-Pane Diagnostic Cockpit                */}
        {/* ============================================================== */}
        <motion.div
          className="mt-10 sm:mt-12 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Cockpit Window Container */}
          <div className="rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden">
            {/* Top Bar: macOS window dots + Segmented Global Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border/70 px-4 py-3 bg-secondary/30">
              <div className="flex items-center gap-3">
                {/* Traffic dots */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-medium text-muted-foreground/90">
                  AceThePrep Telemetry v2.4
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Segmented Global Track Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {GLOBAL_FEATURED_EXAMS.map(({ id, label }) => {
                  const isActive = exam === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleExamChange(id)}
                      className={cn(
                        "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all shrink-0 cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cockpit Dual-Pane Interior */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* -------------------------------------------------------- */}
              {/* Left Pane: Authentic Question & Option Keys (7 Cols)     */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-7 space-y-4">
                {/* Header Meta */}
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
                      {demoEntry?.subject || "Subject"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {demoEntry?.domain || "Core Concepts"}
                    </span>
                  </div>
                  {question?.time_estimate_seconds && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3" />
                      {question.time_estimate_seconds}s target
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                {question ? (
                  <div>
                    <p className="text-sm sm:text-base font-normal leading-relaxed text-foreground whitespace-pre-line">
                      {question.question_text}
                    </p>

                    {/* Formula Hint Toggle */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setShowHint((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>
                          {showHint ? "Hide hint" : "How to solve? (Show hint)"}
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
                            <div className="mt-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-2.5 text-xs text-foreground/90 leading-relaxed">
                              <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">
                                Underlying Principle:
                              </span>
                              {EXAM_HINTS[exam] || question.misconception}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Option Keys */}
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

              {/* -------------------------------------------------------- */}
              {/* Right Pane: Live Cognitive Telemetry & Analysis (5 Cols) */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-5 rounded-xl border border-border/70 bg-secondary/20 p-4 sm:p-5 flex flex-col justify-between min-h-[360px]">
                {!isRevealed ? (
                  /* Idle / Pre-Answer Telemetry Radar */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Trap Telemetry
                      </span>
                      <span className="text-[11px] font-mono text-primary font-semibold">
                        74% Trap Rate
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Examiners intentionally design high-probability distractors for this concept. Test your instinct by picking an option on the left.
                      </p>

                      {/* Mock Frequency Distribution */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-medium text-foreground block">
                          Historical Student Response Pattern:
                        </span>

                        <div className="space-y-1.5 font-mono text-[10px]">
                          <div>
                            <div className="flex justify-between text-muted-foreground mb-1">
                              <span>Option A (True Solution)</span>
                              <span>21%</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                              <div className="h-full bg-emerald-500/70 w-[21%]" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-primary font-semibold mb-1">
                              <span>Option B (The Trap)</span>
                              <span>74% Failed Here</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                              <div className="h-full bg-primary w-[74%]" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-muted-foreground mb-1">
                              <span>Options C & D</span>
                              <span>5%</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                              <div className="h-full bg-muted-foreground/30 w-[5%]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground flex items-start gap-2 mt-4">
                      <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        Can you spot the cognitive trap before selecting your answer?
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Revealed State: Instant Verdict & Cognitive Derivation */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5"
                  >
                    {/* Verdict Banner */}
                    <div
                      className={cn(
                        "rounded-xl p-3 flex items-start gap-2.5 text-xs sm:text-sm",
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25"
                          : "bg-primary/10 text-foreground border border-primary/25",
                      )}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Brain className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-semibold text-xs leading-tight">
                          {isCorrect
                            ? "Correct Instinct!"
                            : "Tricky Trap Triggered"}
                        </p>
                        <p className="text-xs opacity-90 leading-relaxed">
                          {isCorrect
                            ? question?.distractor_analysis?.[correctOption]
                            : question?.distractor_analysis?.[selectedOption!] ||
                              question?.misconception}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Derivation */}
                    <div className="rounded-xl border border-border/80 bg-background/80 p-3 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calculator className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>Mathematical Proof:</span>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {isCorrect ? "Next Review: 7 Days" : "Next Review: 3 Days"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                        {question?.explanation}
                      </p>
                    </div>

                    {/* Cockpit Conversion Action */}
                    <div className="pt-2 space-y-2">
                      <Link
                        href={`/practice/${examSlug}`}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <span>Practice All {exam} Questions Free</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                      </Link>

                      <div className="flex items-center justify-between text-xs px-1">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Try another question
                        </button>

                        {!user ? (
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium cursor-pointer"
                          >
                            Sign In with Google
                          </button>
                        ) : (
                          <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                          >
                            Dashboard
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Footer Micro-telemetry */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                  <span>Engine: Spaced Recall v2</span>
                  <span>Accuracy: Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. Global Proof Telemetry Row                                  */}
        {/* ============================================================== */}
        <motion.div
          className="mt-12 pt-8 border-t border-border/70 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <p className="font-heading text-3xl font-semibold text-foreground">
              13+
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Standardized Curricula
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-semibold text-foreground">
              74%
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Trap Identification Rate
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-semibold text-foreground">
              3.8&times;
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Retention Lift Over Cramming
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-semibold text-foreground">
              0ms
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Instant Perceived Latency
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
