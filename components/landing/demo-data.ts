// Path: components/landing/demo-data.ts
import taxonomy from "@/lib/taxonomies.json";
import demoQuestionsRaw from "@/lib/demo-questions.json";

export type TaxonomyData = Record<string, Record<string, string[]>>;
export const taxonomyData = taxonomy as unknown as TaxonomyData;
export const ALL_EXAM_NAMES = Object.keys(taxonomyData).filter((k) => !k.startsWith("_"));

export const demoQuestions = demoQuestionsRaw as unknown as {
  _generated_at: string;
  exams: Record<string, DemoEntry>;
};

// Official exam module designations for authentic test-day simulation
export const EXAM_MODULE_NAMES: Record<string, string> = {
  SAT: "Digital SAT • Section 2 (Math) • Module 1",
  GRE: "GRE General • Section 1 (Quantitative Reasoning)",
  "GMAT Focus": "GMAT Focus • Data Insights / Quantitative",
  "CFA Level 1": "CFA Level 1 • Financial Statement Analysis",
  "IELTS Academic": "IELTS Academic • Reading Academic Module",
  "TOEFL iBT": "TOEFL iBT • Reading Comprehension & Structure",
};

// Conceptual hints for users looking for deeper insights
export const EXAM_HINTS: Record<string, string> = {
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
};

export type Phase = "question" | "reveal";
export type OptionKey = string;

export interface DemoQuestion {
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

export interface DemoEntry {
  exam_name: string;
  subject: string;
  domain: string;
  question: DemoQuestion;
}

export const EXTENDED_QUESTIONS: Record<string, DemoQuestion[]> = {
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

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};
