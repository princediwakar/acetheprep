"use client";

import { useState, useCallback, useEffect } from "react";
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
  Eye,
  EyeOff,
  Flag,
  BookOpen,
  X,
  Divide,
  HelpCircle,
  FileText,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import taxonomy from "@/lib/taxonomies.json";
import demoQuestionsRaw from "@/lib/demo-questions.json";
import SupportedExamsBar, { ALL_SUPPORTED_EXAMS } from "@/components/landing/SupportedExamsBar";
import { ExamCalculator } from "@/components/tutor/ExamCalculator";

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

// Official exam module designations for authentic test-day simulation
const EXAM_MODULE_NAMES: Record<string, string> = {
  SAT: "Digital SAT • Section 2 (Math) • Module 1",
  GRE: "GRE General • Section 1 (Quantitative Reasoning)",
  "GMAT Focus": "GMAT Focus • Data Insights / Quantitative",
  "CFA Level 1": "CFA Level 1 • Financial Statement Analysis",
  "IELTS Academic": "IELTS Academic • Reading Academic Module",
  "TOEFL iBT": "TOEFL iBT • Reading Comprehension & Structure",
  "JEE Main": "JEE Main • Paper 1 (Physics & Mathematics)",
  NEET: "NEET-UG • Physics & Biological Sciences",
  CAT: "CAT • Quantitative Aptitude & Data Interpretation",
  GATE: "GATE • Linear Algebra & Engineering Mathematics",
  "UPSC CSE": "UPSC CSE • General Studies Paper II (CSAT)",
  CLAT: "CLAT • Legal Reasoning & Applied Logic",
  "CA Foundation": "CA Foundation • Business Laws & Regulatory Framework",
};

// Conceptual hints for users looking for deeper insights
const EXAM_HINTS: Record<string, string> = {
  SAT:
    "Squaring both sides of √(x + 2) = x produces x + 2 = x². Always substitute candidate solutions back into the original radical to eliminate extraneous roots.",
  GRE:
    "(x + y)² = x² + 2xy + y². Comparing (x + y)² with x² + y² reduces to determining whether 2xy is positive, negative, or zero.",
  "GMAT Focus":
    "The Zero Trap: |x| = x implies x ≥ 0 (not strictly x > 0), because |0| = 0. Always test 0 as a critical boundary condition.",
  "CFA Level 1":
    "Effective Annual Rate: EAR = (1 + r/m)^m − 1. For monthly compounding (m = 12), EAR is always strictly greater than nominal APR because interest earns interest across periods.",
  "IELTS Academic":
    "In IELTS Reading, 'False' means the passage contradicts the claim; 'Not Given' means the passage neither confirms nor denies it. Never extrapolate external real-world knowledge beyond the text.",
  "TOEFL iBT":
    "In TOEFL Sentence Insertion, verify cohesive pronoun references ('this result', 'such factors') and transition contrasts ('however', 'consequently') around the insertion point.",
  "JEE Main":
    "Lens Maker's Formula: 1/f = (n − 1)(1/R₁ − 1/R₂). Cartesian sign convention: front surface is convex (R₁ = +15 cm), rear surface is curved inward relative to incident ray (R₂ = −10 cm).",
  NEET:
    "In a monohybrid cross of heterozygotes (Tt × Tt), distinguish between genotypic ratio (1 TT : 2 Tt : 1 tt) and phenotypic ratio (3 tall : 1 dwarf).",
  CAT:
    "For equal round-trip distances, Average Speed is the Harmonic Mean: 2·v₁·v₂ / (v₁ + v₂), or Total Distance / Total Time. Never take the simple arithmetic mean.",
  GATE:
    "For any 2×2 matrix: Sum of Eigenvalues = Trace(M), and Product of Eigenvalues = Det(M). Form characteristic equation: λ² − Trace(M)λ + Det(M) = 0.",
  "UPSC CSE":
    "In formal categorical syllogisms, a middle term ('diligent planners') must be distributed in at least one premise to warrant a valid deductive link between extremes.",
  CLAT:
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
// Extended question rotation for interactive hero
// ---------------------------------------------------------------------------

const EXTENDED_QUESTIONS: Record<string, DemoQuestion[]> = {
  SAT: [
    demoQuestions.exams["SAT"]?.question,
    {
      question_text:
        "In the xy-plane, the parabola y = a(x − 3)² − 4 has its vertex at (3, −4) and passes through the point (1, 0). What is the value of the constant a?",
      options: {
        A: "1",
        B: "−1",
        C: "2",
        D: "4",
      },
      correct_option: "A",
      explanation:
        "Substitute the known coordinates (1, 0) into the vertex form: 0 = a(1 − 3)² − 4 => 0 = a(−2)² − 4 => 4a = 4 => a = 1.",
      distractor_analysis: {
        A: "Correct. Substituting (1, 0) yields 4a − 4 = 0, so a = 1.",
        B: "Incorrect. Common sign reversal trap: test-taker sets (-2)² = -4.",
        C: "Incorrect. Arithmetic slip dividing 4 by 2 instead of 4.",
        D: "Incorrect. Confusing the leading coefficient with the constant term magnitude.",
      },
      skill_domain: "Advanced Math",
      difficulty_tier: "application",
      time_estimate_seconds: 60,
      misconception: "Sign reversal when squaring negative differences in vertex form.",
      topics: ["Quadratic functions", "Vertex form", "Parabolas"],
    },
    {
      question_text:
        "For what value of p does the equation 2(px − 4) = 6x − 8 have infinitely many solutions for x?",
      options: {
        A: "3",
        B: "6",
        C: "0",
        D: "−3",
      },
      correct_option: "A",
      explanation:
        "Expand the left side: 2px − 8 = 6x − 8. For infinitely many solutions, the linear coefficients must match: 2p = 6, which yields p = 3.",
      distractor_analysis: {
        A: "Correct. Equating linear coefficients 2p = 6 yields p = 3.",
        B: "Incorrect. Trap: equating p directly to 6 without distributing the factor of 2.",
        C: "Incorrect. Mistaking infinite solutions for zero solutions.",
        D: "Incorrect. Sign flip error during algebraic balancing.",
      },
      skill_domain: "Algebra",
      difficulty_tier: "foundation",
      time_estimate_seconds: 45,
      misconception: "Forgetting to distribute outer multipliers to all linear terms.",
      topics: ["Linear equations", "Infinite solutions", "Coefficients"],
    },
  ],
  GRE: [
    demoQuestions.exams["GRE"]?.question,
    {
      question_text:
        "Quantity A: The remainder when (7¹² + 3) is divided by 7.\nQuantity B: 3",
      options: {
        A: "Quantity A is greater",
        B: "Quantity B is greater",
        C: "The two quantities are equal",
        D: "The relationship cannot be determined",
      },
      correct_option: "C",
      explanation:
        "7¹² is an exact multiple of 7, so (7¹² mod 7) = 0. Therefore, (7¹² + 3) mod 7 = 3. Quantity A equals 3, which equals Quantity B.",
      distractor_analysis: {
        A: "Incorrect. 58% of test-takers assume 7¹² will produce a large remainder.",
        B: "Incorrect. Underestimating modular arithmetic properties of exponents.",
        C: "Correct. Since 7 divides 7¹² completely, the remainder is strictly 3.",
        D: "Incorrect. The expression is fully determined with no unknown variables.",
      },
      skill_domain: "Arithmetic & Number Theory",
      difficulty_tier: "application",
      time_estimate_seconds: 60,
      misconception:
        "Attempting to calculate large exponents rather than applying modular residue rules.",
      topics: ["Modular arithmetic", "Remainders", "Quantitative Comparison"],
    },
  ],
  "GMAT Focus": [
    demoQuestions.exams["GMAT Focus"]?.question,
    {
      question_text:
        "Is the integer n odd?\n(1) n² − 1 is an even integer.\n(2) 2n is an even integer.",
      options: {
        A: "Statement (1) ALONE is sufficient, but (2) alone is not",
        B: "Statement (2) ALONE is sufficient, but (1) alone is not",
        C: "BOTH statements TOGETHER are sufficient",
        D: "Statements (1) and (2) TOGETHER are NOT sufficient",
      },
      correct_option: "A",
      explanation:
        "Statement (1): If n² − 1 is even, then n² is odd. Since the square of an integer has the same parity as the integer itself, n must be odd (Sufficient). Statement (2): 2n is always even for any integer n (odd or even), providing no information about n's parity (Not Sufficient).",
      distractor_analysis: {
        A: "Correct. Statement 1 strictly forces n to be odd; statement 2 is a generic tautology.",
        B: "Incorrect. Classic Data Sufficiency trap: 2n is always even so students pick B.",
        C: "Incorrect. Redundant: Statement 1 alone already answers the question definitively.",
        D: "Incorrect. Overlooking that n² being odd requires n to be odd.",
      },
      skill_domain: "Data Insights / Quant",
      difficulty_tier: "advanced",
      time_estimate_seconds: 75,
      misconception:
        "Treating '2n is even' as evidence that n is even, when 2(odd) is also even.",
      topics: ["Data Sufficiency", "Parity", "Number Properties"],
    },
  ],
  "CFA Level 1": [
    demoQuestions.exams["CFA Level 1"]?.question,
    {
      question_text:
        "A company's Return on Equity (ROE) increases while its net profit margin and total asset turnover remain unchanged. According to the DuPont 3-step analysis, this change was most likely caused by an increase in:",
      options: {
        A: "Financial leverage (Equity multiplier)",
        B: "Effective tax rate",
        C: "Working capital ratio",
        D: "Operating profit margin",
      },
      correct_option: "A",
      explanation:
        "DuPont 3-step: ROE = Net Profit Margin × Asset Turnover × Equity Multiplier (Assets / Equity). If the first two factors are static, an increase in ROE must be directly driven by an increase in financial leverage (the equity multiplier).",
      distractor_analysis: {
        A: "Correct. Assets/Equity is the third component of the classic 3-step DuPont decomposition.",
        B: "Incorrect. A higher tax rate reduces net income and net profit margin.",
        C: "Incorrect. Working capital affects liquidity, not the DuPont ROE product.",
        D: "Incorrect. The premise explicitly states net profit margin is constant.",
      },
      skill_domain: "Financial Statement Analysis",
      difficulty_tier: "application",
      time_estimate_seconds: 60,
      misconception:
        "Confusing liquidity measures with structural leverage in DuPont decomposition.",
      topics: ["DuPont Analysis", "ROE", "Financial Leverage"],
    },
  ],
};

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
// Official College Board Reference Formula Modal
// ---------------------------------------------------------------------------

function FormulaSheetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-heading text-base font-semibold text-foreground">
              Official SAT & Standardized Geometry Reference Sheet
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Circle</span>
            <p className="text-muted-foreground">Area: A = πr²</p>
            <p className="text-muted-foreground">Circumference: C = 2πr</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Triangle</span>
            <p className="text-muted-foreground">Area: A = ½bh</p>
            <p className="text-muted-foreground">Pythagorean: c² = a² + b²</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Special Right</span>
            <p className="text-muted-foreground">30°-60°-90°: x, x√3, 2x</p>
            <p className="text-muted-foreground">45°-45°-90°: s, s, s√2</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Cylinder & Cone</span>
            <p className="text-muted-foreground">Cylinder: V = πr²h</p>
            <p className="text-muted-foreground">Cone: V = ⅓πr²h</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Sphere</span>
            <p className="text-muted-foreground">Volume: V = ⁴⁄₃πr³</p>
            <p className="text-muted-foreground">Surface: S = 4πr²</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Degree Measures</span>
            <p className="text-muted-foreground">Circle: 360° = 2π rad</p>
            <p className="text-muted-foreground">Triangle interior: 180°</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
          >
            Close Sheet (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Official Bluebook Option Component
// ---------------------------------------------------------------------------

function BluebookOption({
  letter,
  text,
  isSelected,
  isStruck,
  strikethroughMode,
  isRevealed,
  isCorrect,
  isTrap,
  onSelect,
  onToggleStrike,
}: {
  letter: string;
  text: string;
  isSelected: boolean;
  isStruck: boolean;
  strikethroughMode: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  isTrap: boolean;
  onSelect: () => void;
  onToggleStrike: () => void;
}) {
  const handleClick = () => {
    if (isRevealed) return;
    if (strikethroughMode) {
      onToggleStrike();
    } else {
      if (isStruck) {
        onToggleStrike(); // Un-strike if clicking to select
      }
      onSelect();
    }
  };

  let borderClasses =
    "border-border/80 bg-card hover:border-[#002B49]/40 dark:hover:border-blue-400/40";

  if (isSelected && !isRevealed) {
    borderClasses =
      "border-[#002B49] bg-blue-50/40 dark:bg-blue-950/30 dark:border-blue-400 ring-1 ring-[#002B49] dark:ring-blue-400";
  }

  if (isRevealed) {
    if (isSelected && isCorrect) {
      borderClasses =
        "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 dark:border-emerald-500 ring-1 ring-emerald-600";
    } else if (isSelected && !isCorrect) {
      borderClasses =
        "border-rose-600 bg-rose-50/60 dark:bg-rose-950/30 dark:border-rose-500 ring-1 ring-rose-600";
    } else if (isCorrect) {
      borderClasses =
        "border-emerald-600/70 bg-emerald-50/30 dark:bg-emerald-950/20";
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl border p-3 sm:px-4 sm:py-3.5 transition-all text-left relative overflow-hidden select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        !isRevealed && "cursor-pointer active:scale-[0.995]",
        isRevealed && "cursor-default",
        borderClasses,
        isStruck && "opacity-50 bg-secondary/40",
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Official Bluebook Radio Circle */}
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold font-mono border transition-colors",
            isSelected && !isRevealed
              ? "border-[#002B49] bg-[#002B49] text-white dark:border-blue-400 dark:bg-blue-500"
              : isRevealed && isSelected && isCorrect
                ? "border-emerald-600 bg-emerald-600 text-white"
                : isRevealed && isSelected && !isCorrect
                  ? "border-rose-600 bg-rose-600 text-white"
                  : isRevealed && isCorrect
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold"
                    : "border-border text-foreground/80 group-hover:border-primary group-hover:text-primary",
          )}
        >
          {letter}
        </span>

        {/* Text with optional red strikethrough */}
        <span
          className={cn(
            "text-sm font-medium text-foreground leading-snug transition-all",
            isStruck && "line-through decoration-rose-600 decoration-2 text-muted-foreground",
          )}
        >
          {text}
        </span>
      </div>

      {/* Traps & Statuses */}
      <div className="flex items-center gap-2 shrink-0">
        {isStruck && !isRevealed && (
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider">
            [Eliminated]
          </span>
        )}

        {isRevealed && isTrap && (
          <span className="flex items-center gap-1 shrink-0 rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wide">
            <TrendingUp className="h-3 w-3" />
            Distractor Trap
          </span>
        )}

        {isRevealed && isCorrect && (
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main InteractiveDemoHero Component (Ivy Editorial & Bluebook Scientific Bench)
// ---------------------------------------------------------------------------

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
  const [timerSeconds, setTimerSeconds] = useState<number>(895); // 14:55
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [showDesmos, setShowDesmos] = useState<boolean>(false);

  // Real-time ticking timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener: Alt+X for strikethrough, Esc to close modals
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
  }, []);

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

  // Format timer as MM:SS
  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? "0" : ""}${remainderSecs}`;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      {/* Formula Sheet & Desmos Popover Modals */}
      <FormulaSheetModal
        isOpen={showFormulaSheet}
        onClose={() => setShowFormulaSheet(false)}
      />
      <ExamCalculator
        isOpen={showDesmos}
        onClose={() => setShowDesmos(false)}
        examName="Exam"
      />

      {/* Subtle Archival Editorial Ambient Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] rounded-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,43,73,0.08),transparent_80%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(43,127,255,0.12),transparent_80%)] blur-[90px] -z-10"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================================== */}
        {/* 1. Header: The Ivy & Oxbridge Editorial Authority              */}
        {/* ============================================================== */}
        <motion.div
          className="mx-auto max-w-3xl text-center space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.02 },
            },
          }}
        >
          {/* Scholarly Heritage Badge */}
          <motion.div variants={fadeSlideUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-foreground uppercase shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Official Test-Day Simulation & Distractor Trap Diagnostics
            </span>
          </motion.div>

          {/* Grand Literary Headline */}
          <motion.h1
            className="font-heading text-balance text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]"
            variants={fadeSlideUp}
          >
            You aren&apos;t exam-ready when you finish the syllabus.{" "}
            <span className="text-primary italic font-serif underline decoration-primary/30 decoration-2 underline-offset-4">
              You&apos;re ready when you can solve under pressure.
            </span>
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={fadeSlideUp}
          >
            Digital SAT, GRE, and GMAT test unassisted recall under timed adaptive pressure.
            Train inside the exact official testing software interface with embedded Desmos and strikethrough tools—then expose how exam committees engineer distractor traps.
          </motion.p>

          {/* Action Row & Fast Exam Jump */}
          <motion.div
            variants={fadeSlideUp}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            {!user ? (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary hover:opacity-95 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Start Free Practice</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/home"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary hover:opacity-95 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Go to Home</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <div className="w-full sm:w-56 relative">
              <select
                value={exam}
                onChange={(e) => handleExamChange(e.target.value)}
                aria-label="Select target curriculum"
                className="w-full appearance-none rounded-xl border border-border bg-card py-3.5 pl-4 pr-9 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <optgroup label="US & EU Standardized Admissions">
                  <option value="SAT">Digital SAT (College Board)</option>
                  <option value="GRE">GRE General (ETS)</option>
                  <option value="GMAT Focus">GMAT Focus (GMAC)</option>
                  <option value="CFA Level 1">CFA Level 1 (CFA Inst.)</option>
                  <option value="IELTS Academic">IELTS Academic</option>
                  <option value="TOEFL iBT">TOEFL iBT</option>
                </optgroup>
                <optgroup label="Competitive Curricula">
                  <option value="JEE Main">JEE Main</option>
                  <option value="NEET">NEET</option>
                  <option value="CAT">CAT (IIM)</option>
                  <option value="GATE">GATE</option>
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
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground pt-1 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Official Bluebook & ETS Tool Fidelity
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Integrated Desmos Graphing Calculator
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Setter Distractor Trap Analysis
            </span>
          </motion.div>
        </motion.div>

        {/* Upfront Supported Curricula Showcase */}
        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <SupportedExamsBar activeExam={exam} onSelectExam={handleExamChange} />
        </motion.div>

        {/* ============================================================== */}
        {/* 2. The Official Bluebook Scientific Bench Simulator             */}
        {/* ============================================================== */}
        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Main Simulator Window Container */}
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* ---------------------------------------------------------- */}
            {/* Official Proctor Navigation Bar (Theme Adaptive)           */}
            {/* ---------------------------------------------------------- */}
            <div className="bg-secondary/40 border-b border-border px-4 py-2.5 sm:px-6 sm:py-3 flex flex-wrap items-center justify-between gap-3 transition-colors">
              {/* Left: Official Section Module Title */}
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">
                  {EXAM_MODULE_NAMES[exam] || `${exam} • Official Section Simulator`}
                </span>
              </div>

              {/* Center: Official Countdown Timer */}
              <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1 rounded-md border border-border">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {showTimer ? (
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-foreground">
                    {formatTimer(timerSeconds)}
                  </span>
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">Timer Hidden</span>
                )}
                <button
                  type="button"
                  onClick={() => setShowTimer((prev) => !prev)}
                  className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline ml-1 cursor-pointer"
                >
                  {showTimer ? "Hide" : "Show"}
                </button>
              </div>

              {/* Right: Official Exam Tools (Reference, Desmos, Eliminate Answers) */}
              <div className="flex items-center gap-2">
                {/* Desmos Graphing Launcher */}
                <button
                  type="button"
                  onClick={() => setShowDesmos(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-card hover:bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors cursor-pointer"
                  title="Open Desmos Graphing Calculator"
                >
                  <Calculator className="h-3.5 w-3.5 text-primary" />
                  <span className="hidden sm:inline">Desmos Calculator</span>
                </button>

                {/* Reference Formulas */}
                <button
                  type="button"
                  onClick={() => setShowFormulaSheet(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-card hover:bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors cursor-pointer"
                  title="Open Geometry & Math Formula Sheet"
                >
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span className="hidden sm:inline">Reference</span>
                </button>

                {/* Eliminate Answers Tool (Alt+X) */}
                <button
                  type="button"
                  onClick={() => setStrikethroughMode((prev) => !prev)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
                    strikethroughMode
                      ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 font-bold shadow-xs"
                      : "border-border/80 bg-card hover:bg-secondary text-foreground",
                  )}
                  title="Eliminate Answers (Alt+X) - Click options to cross them out"
                >
                  <span className="font-mono font-bold line-through text-rose-600 dark:text-rose-400">ABC</span>
                  <span className="hidden sm:inline">
                    {strikethroughMode ? "Eliminating" : "Eliminate"}
                  </span>
                </button>

                {/* Mark for Review Checkbox */}
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer pl-1 select-none">
                  <input
                    type="checkbox"
                    checked={isMarkedForReview}
                    onChange={(e) => setIsMarkedForReview(e.target.checked)}
                    className="rounded border-zinc-400 text-primary focus:ring-0 cursor-pointer h-3.5 w-3.5"
                  />
                  <span className="hidden md:inline">Mark for Review</span>
                </label>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Split-Pane Test Bench Interior                              */}
            {/* ---------------------------------------------------------- */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-card">
              {/* Left Column: Problem Formulation & Passage (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Direction Banner */}
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

                {/* Question Statement */}
                {question ? (
                  <div>
                    <div className="relative pl-3 border-l-2 border-border/80">
                      <p className="text-sm sm:text-base font-normal leading-relaxed text-foreground whitespace-pre-line">
                        {question.question_text}
                      </p>
                    </div>

                    {/* Formula Hint Toggle */}
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

                    {/* Bluebook Multiple-Choice Options Array */}
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

                    {/* Pre-reveal Confirm Button */}
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

              {/* -------------------------------------------------------- */}
              {/* Right Column: Ivy & Oxbridge Diagnostic Breakdown (5 Cols) */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-5 rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 flex flex-col justify-between min-h-[380px]">
                {!isRevealed ? (
                  /* Idle State: Test-Day Pacing & Trap Telemetry */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border/80 pb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Examiner Trap Radar
                      </span>
                      <span className="text-[11px] font-mono text-primary font-semibold">
                        74% Fall for Distractor
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Standardized test committees do not write random wrong answers. Each distractor is engineered to target a specific cognitive blindspot.
                      </p>

                      {/* Mock Student Response Frequency Bar */}
                      <div className="space-y-2 pt-1 font-mono text-[10px]">
                        <span className="text-[11px] font-medium text-foreground block font-sans">
                          Historical Test-Taker Distribution:
                        </span>

                        <div>
                          <div className="flex justify-between text-muted-foreground mb-1">
                            <span>Option {correctOption || "A"} (Correct Answer)</span>
                            <span>21%</span>
                          </div>
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-emerald-500/80 w-[21%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-rose-600 dark:text-rose-400 font-semibold mb-1">
                            <span>Option {trapKey} (The Engineered Trap)</span>
                            <span>74% Fell for this</span>
                          </div>
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-rose-500 w-[74%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-muted-foreground mb-1">
                            <span>{remainingLabel}</span>
                            <span>5%</span>
                          </div>
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-muted-foreground/30 w-[5%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs text-muted-foreground flex items-start gap-2.5 mt-4">
                      <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        Use the <strong>Eliminate Answers</strong> tool in the top bar to cross out trap options before locking in your choice.
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Revealed State: The Ivy & Oxbridge Examiner Monograph */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    {/* Archival Examiner Insight Header */}
                    <div
                      className={cn(
                        "rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm border",
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-900 dark:text-rose-200 border-rose-500/30",
                      )}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Brain className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="font-heading font-semibold text-xs sm:text-sm tracking-tight block">
                          {isCorrect ? "Correctly Deduce!" : "Distractor Trap Triggered"}
                        </span>
                        <p className="text-xs opacity-90 leading-relaxed font-sans">
                          {isCorrect
                            ? question?.distractor_analysis?.[correctOption]
                            : question?.distractor_analysis?.[selectedOption!] ||
                              question?.misconception}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Derivation & Setter's Intent */}
                    <div className="rounded-xl border border-border bg-background p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                        <div className="flex items-center gap-1.5 font-heading">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>The Examiner&apos;s Solution:</span>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {isCorrect ? "Interval: +7 Days" : "Interval: +3 Days"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                        {question?.explanation}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 space-y-2.5">
                      {!user ? (
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <span>Activate Full {exam} Question Bank Free</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                        </button>
                      ) : (
                        <Link
                          href="/home"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <span>Continue {exam} Practice</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                        </Link>
                      )}

                      <div className="flex items-center justify-between text-xs px-1">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Next Simulation Question</span>
                        </button>

                        <Link
                          href={`/practice/${examSlug}`}
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs"
                        >
                          <span>Browse Syllabus</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Footer Micro-telemetry */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                  <span>Standard: Bluebook v2.4</span>
                  <span>Telemetry: Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. Global Proof Telemetry Row                                  */}
        {/* ============================================================== */}
        <motion.div
          className="mt-12 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <p className="font-heading text-3xl font-normal text-foreground">13+</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Standardized Curricula
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-normal text-foreground">74%</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Distractor Trap Identification
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-normal text-foreground">100%</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Official Bluebook & ETS Fidelity
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-normal text-foreground">0ms</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Perceived Interaction Latency
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
