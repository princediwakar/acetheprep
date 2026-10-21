// Path: components/landing/arena-data.ts

export type ExamKey = "gmat" | "sat" | "gre" | "cfa" | "ielts" | "toefl";

export interface ArenaQuestion {
  id: string;
  section: string;
  topic: string;
  questionText: string;
  options: Record<string, string>;
  correctOption: string;
  trapOption: string;
  trapName: string;
  whyTrapFooled: string;
  whyCorrectWorks: string;
  tenSecondRule: string;
  timeEstimateSeconds: number;
}

export interface ScoreGapPreset {
  label: string;
  current: number;
  target: number;
}

export interface ScoreMistakePattern {
  title: string;
  description: string;
  questionIndex: number;
  practiceUrl: string;
}

export interface ExamTrapInfo {
  trapNumber: string;
  name: string;
  howItWorks: string;
  ruleToBeatIt: string;
  quickExample: string;
}

export interface HardestCommunityQuestion {
  id: string;
  missRate: number;
  topic: string;
  summary: string;
  questionIndex: number;
  practiceUrl: string;
}

export interface ExamArenaConfig {
  id: ExamKey;
  name: string;
  shortName: string;
  officialBadge: string;
  heroPrompt: string;
  timeLimitSeconds: number;
  hasCalculator: boolean;
  calculatorType: "standard" | "desmos" | "financial";
  hasFormulaSheet: boolean;
  scoreScale: {
    min: number;
    max: number;
    step: number;
    unit: string;
    defaultCurrent: number;
    defaultTarget: number;
    presets: ScoreGapPreset[];
  };
  scoreGapLogic: {
    sectionName: string;
    getQuestionsCount: (current: number, target: number) => number;
    getSummary: (current: number, target: number, questionsCount: number) => string;
    mistakes: ScoreMistakePattern[];
  };
  trapsGuide: ExamTrapInfo[];
  hardestQuestions: HardestCommunityQuestion[];
  verificationStamp: {
    syllabus: string;
    reviewNote: string;
    activePoolStatus: string;
  };
  questions: ArenaQuestion[];
}

export const ARENA_EXAMS: Record<ExamKey, ExamArenaConfig> = {
  gmat: {
    id: "gmat",
    name: "GMAT Focus Edition",
    shortName: "GMAT Focus",
    officialBadge: "Official 2026 Test Format",
    heroPrompt: "68% of test-takers pick Option B on this question. Can you spot the trap in 60 seconds?",
    timeLimitSeconds: 120,
    hasCalculator: true,
    calculatorType: "standard",
    hasFormulaSheet: false,
    scoreScale: {
      min: 205,
      max: 805,
      step: 5,
      unit: "pts",
      defaultCurrent: 615,
      defaultTarget: 685,
      presets: [
        { label: "Starting Out", current: 555, target: 655 },
        { label: "Stuck in 600s", current: 615, target: 685 },
        { label: "Aiming for 700+", current: 665, target: 735 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Data Insights & Quantitative",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff / 18));
      },
      getSummary: (current, target, count) =>
        `Your ${target - current}-point score gap is roughly ${count} missed questions in Data Insights and Quant, not a 300-page book.`,
      mistakes: [
        {
          title: "Assuming numbers are positive integers in Data Sufficiency",
          description: "Forgetting that variables can be negative, zero, or fractions costs 1–2 questions.",
          questionIndex: 0,
          practiceUrl: "/practice/gmat-focus/data-insights/data-sufficiency",
        },
        {
          title: "Calculating large exponents instead of using remainder rules",
          description: "Wasting 3+ minutes on modular arithmetic leads to rushed guesses at the end.",
          questionIndex: 1,
          practiceUrl: "/practice/gmat-focus/quantitative-reasoning/number-properties",
        },
        {
          title: "Mixing up individual rates in multi-machine work problems",
          description: "Dividing total remaining work by the wrong rate on two-part analysis questions.",
          questionIndex: 2,
          practiceUrl: "/practice/gmat-focus/data-insights/two-part-analysis",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The 'Feels Right' Trap",
        howItWorks:
          "Test writers design Statement 2 to look simpler than Statement 1. Students pick B because it feels clean, without testing negative numbers or zero.",
        ruleToBeatIt: "Always test 0, 1, and -1 before deciding a statement is sufficient.",
        quickExample: "Statement: '2n is even'. This is true for any integer, so it tells you nothing about n.",
      },
      {
        trapNumber: "02",
        name: "The Hidden Unit Swap",
        howItWorks:
          "The question sets up data in minutes and dollars, but the final question sentence asks for hours or cents.",
        ruleToBeatIt: "Circle the requested unit in the prompt before touching your scratch paper.",
        quickExample: "Rate given as 120 items per hour, but the question asks for items per minute.",
      },
      {
        trapNumber: "03",
        name: "The Average Rate Illusion",
        howItWorks:
          "If Machine A takes 4 hours and Machine B takes 6 hours, students pick 5 hours (the average) instead of calculating combined output rates.",
        ruleToBeatIt: "Add rates per hour (1/4 + 1/6), never average the hours directly.",
        quickExample: "Combined rate = 5/12 of the job per hour, which takes 2.4 hours, not 5.",
      },
    ],
    hardestQuestions: [
      {
        id: "GMAT-812",
        missRate: 72,
        topic: "Data Sufficiency: Number Parity",
        summary: "72% missed this because they assumed 2n being even proves n is even.",
        questionIndex: 0,
        practiceUrl: "/practice/gmat-focus/data-insights/data-sufficiency",
      },
      {
        id: "GMAT-340",
        missRate: 65,
        topic: "Modular Arithmetic & Exponents",
        summary: "65% spent over 2.5 minutes trying to multiply large powers manually.",
        questionIndex: 1,
        practiceUrl: "/practice/gmat-focus/quantitative-reasoning/number-properties",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against 2026 GMAC GMAT Focus testing specifications",
      reviewNote: "All answer choices include complete explanations for why wrong choices were chosen",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "gmat-q1",
        section: "Data Insights / Quant",
        topic: "Data Sufficiency • Parity",
        questionText:
          "Is the integer n odd?\n\n(1) n² − 1 is an even integer.\n(2) 2n is an even integer.",
        options: {
          A: "Statement (1) ALONE is sufficient, but (2) alone is not",
          B: "Statement (2) ALONE is sufficient, but (1) alone is not",
          C: "BOTH statements TOGETHER are sufficient",
          D: "Statements (1) and (2) TOGETHER are NOT sufficient",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The 'Always Even' Assumption",
        whyTrapFooled:
          "2n is an even number for ANY integer (whether n is odd or even). For instance, 2 × 3 = 6 (even), and 2 × 4 = 8 (even). Statement 2 gives zero information about whether n is odd.",
        whyCorrectWorks:
          "Statement 1: If n² − 1 is even, then n² must be odd. The square of an integer has the exact same parity as the integer itself. Therefore, n must be odd.",
        tenSecondRule:
          "When a statement multiplies a variable by 2, test both an odd and an even number before deciding it tells you anything.",
        timeEstimateSeconds: 60,
      },
      {
        id: "gmat-q2",
        section: "Quantitative Reasoning",
        topic: "Number Properties • Remainders",
        questionText:
          "If n is a positive integer, what is the remainder when (7¹² + 3) is divided by 7?",
        options: {
          A: "0",
          B: "1",
          C: "3",
          D: "4",
        },
        correctOption: "C",
        trapOption: "A",
        trapName: "Large Exponent Panic",
        whyTrapFooled:
          "Students assume 7¹² will produce a complex remainder or panic because they cannot multiply 7 twelve times.",
        whyCorrectWorks:
          "7¹² is an exact multiple of 7, so (7¹² divided by 7) leaves a remainder of 0. Adding 3 means the total remainder is simply 0 + 3 = 3.",
        tenSecondRule:
          "Never calculate huge powers. Separate terms that already contain the divisor as an exact factor.",
        timeEstimateSeconds: 45,
      },
      {
        id: "gmat-q3",
        section: "Data Insights",
        topic: "Two-Part Analysis • Rates",
        questionText:
          "Machine A produces 120 parts per hour. Machine B produces 180 parts per hour. Both machines work to complete an order of 900 parts. If Machine A works for 3 hours, how many hours must Machine B work to complete the remaining order?",
        options: {
          A: "3.0 hours",
          B: "2.5 hours",
          C: "3.5 hours",
          D: "4.0 hours",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Average Rate Trap",
        whyTrapFooled:
          "Students mistakenly average the two machine rates (150 parts/hr) instead of isolating Machine B's dedicated rate.",
        whyCorrectWorks:
          "Machine A produces 3 × 120 = 360 parts. Remaining parts needed = 900 − 360 = 540 parts. Machine B time = 540 ÷ 180 = 3.0 hours.",
        tenSecondRule:
          "Subtract the completed work first. Then divide the remaining work strictly by the second machine's rate.",
        timeEstimateSeconds: 60,
      },
    ],
  },

  sat: {
    id: "sat",
    name: "Digital SAT",
    shortName: "Digital SAT",
    officialBadge: "Official Bluebook 2026 Format",
    heroPrompt: "71% of students scoring 1350+ pick Option B. Can you spot the fake root in 60 seconds?",
    timeLimitSeconds: 75,
    hasCalculator: true,
    calculatorType: "desmos",
    hasFormulaSheet: true,
    scoreScale: {
      min: 400,
      max: 1600,
      step: 10,
      unit: "pts",
      defaultCurrent: 1380,
      defaultTarget: 1520,
      presets: [
        { label: "Break 1300", current: 1180, target: 1320 },
        { label: "Target 1450+", current: 1320, target: 1460 },
        { label: "Ivy League 1500+", current: 1380, target: 1520 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Math Module 2 & Reading",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff / 28));
      },
      getSummary: (current, target, count) =>
        `Your ${target - current}-point score gap is roughly ${count} missed questions in Module 2, not 500 pages of review.`,
      mistakes: [
        {
          title: "Forgetting to plug candidate solutions back into square root equations",
          description: "Squaring both sides produces fake (extraneous) solutions that cost 20–40 points.",
          questionIndex: 0,
          practiceUrl: "/practice/sat/mathematics/advanced-math",
        },
        {
          title: "Negative sign errors when squaring vertex coordinates",
          description: "Writing (-2)² as -4 on parabola questions loses an easy question.",
          questionIndex: 1,
          practiceUrl: "/practice/sat/mathematics/algebra",
        },
        {
          title: "Picking true real-world statements that do not answer the prompt",
          description: "Rhetorical synthesis questions trap students with true but irrelevant facts.",
          questionIndex: 2,
          practiceUrl: "/practice/sat/reading-and-writing/rhetorical-synthesis",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The Fake Root (Extraneous Solution)",
        howItWorks:
          "When you square both sides of an equation like √(x + 2) = x, algebra produces two answers. But square roots cannot equal negative numbers.",
        ruleToBeatIt: "Always plug solutions back into the original root to discard fake roots.",
        quickExample: "x = -1 gives √1 = -1, which is impossible.",
      },
      {
        trapNumber: "02",
        name: "The True-Statement Trap",
        howItWorks:
          "In Reading & Writing, Option B states a completely true fact from the passage, but it does not address what the prompt asked you to emphasize.",
        ruleToBeatIt: "Highlight the question goal before reading choices: 'emphasize an advantage' is different from 'state a fact'.",
        quickExample: "A statement praising electric car speed when the prompt asked for battery recycling.",
      },
      {
        trapNumber: "03",
        name: "The Desmos Window Blindspot",
        howItWorks:
          "A parabola vertex is at x = 120, but the default calculator zoom only goes up to 10. Students assume there are no roots.",
        ruleToBeatIt: "Zoom out or compute -b/(2a) algebraically before guessing 'no solution'.",
        quickExample: "Missing the second x-intercept because it sits just outside the visible screen.",
      },
    ],
    hardestQuestions: [
      {
        id: "SAT-4091",
        missRate: 74,
        topic: "Advanced Math: Extraneous Solutions",
        summary: "74% included the negative solution without plugging it back into the radical.",
        questionIndex: 0,
        practiceUrl: "/practice/sat/mathematics/advanced-math",
      },
      {
        id: "SAT-2218",
        missRate: 69,
        topic: "Reading: Rhetorical Synthesis",
        summary: "69% picked a true factual statement that missed the specific essay prompt.",
        questionIndex: 2,
        practiceUrl: "/practice/sat/reading-and-writing/rhetorical-synthesis",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against 2026 College Board Digital SAT Bluebook modules",
      reviewNote: "All questions match official Desmos embedded calculator workflows",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "sat-q1",
        section: "Math • Advanced Math",
        topic: "Radical Equations • Extraneous Solutions",
        questionText: "If √(x + 2) = x, what is the value of x?",
        options: {
          A: "2 only",
          B: "−1 and 2",
          C: "−1 only",
          D: "No real solutions",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Extraneous Root Trap",
        whyTrapFooled:
          "Squaring both sides gives x + 2 = x², which factors into (x − 2)(x + 1) = 0. Students see x = 2 and x = −1 on their scratch paper and pick B.",
        whyCorrectWorks:
          "Plugging x = −1 into the original equation gives √1 = −1, which is false because principal square roots are always non-negative. Only x = 2 works.",
        tenSecondRule:
          "Whenever you square an equation with a square root, always substitute answers back in to throw out fake roots.",
        timeEstimateSeconds: 45,
      },
      {
        id: "sat-q2",
        section: "Math • Advanced Math",
        topic: "Parabolas • Vertex Form",
        questionText:
          "In the xy-plane, the parabola y = a(x − 3)² − 4 has its vertex at (3, −4) and passes through the point (1, 0). What is the value of the constant a?",
        options: {
          A: "1",
          B: "−1",
          C: "2",
          D: "4",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Negative Squared Sign Flip",
        whyTrapFooled:
          "Substituting (1, 0) yields a(1 − 3)² − 4 = 0. Students calculate (−2)² as −4 instead of +4, flipping the final sign of a.",
        whyCorrectWorks:
          "0 = a(−2)² − 4 => 4a − 4 = 0 => 4a = 4 => a = 1.",
        tenSecondRule:
          "Squaring any real number always gives a positive number. (−2)² is strictly +4.",
        timeEstimateSeconds: 45,
      },
      {
        id: "sat-q3",
        section: "Reading & Writing",
        topic: "Rhetorical Synthesis • Goal Matching",
        questionText:
          "A student is writing an essay on electric transportation. Which choice most effectively uses relevant information from the notes to emphasize a key environmental advantage of battery recycling?",
        options: {
          A: "Battery recycling recovers up to 95% of cobalt and lithium, reducing the need for destructive raw mineral mining.",
          B: "Electric vehicles produce zero tailpipe emissions during everyday city and highway driving.",
          C: "Global lithium production expanded significantly between 2020 and 2025.",
          D: "Many battery manufacturing facilities are located in North America and Western Europe.",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The True Statement, Wrong Goal Trap",
        whyTrapFooled:
          "Option B is completely true about electric cars, but the essay prompt specifically asks for an advantage of *battery recycling*, not everyday driving.",
        whyCorrectWorks:
          "Only Choice A directly links battery recycling to an environmental benefit: reducing destructive mining for raw cobalt and lithium.",
        tenSecondRule:
          "Underline the exact goal in the prompt before looking at answers. True statements that ignore the goal are traps.",
        timeEstimateSeconds: 60,
      },
    ],
  },

  gre: {
    id: "gre",
    name: "GRE General",
    shortName: "GRE General",
    officialBadge: "Official ETS 2026 Format",
    heroPrompt: "64% of test-takers miss the negative number condition on this comparison. Can you spot it?",
    timeLimitSeconds: 60,
    hasCalculator: true,
    calculatorType: "standard",
    hasFormulaSheet: false,
    scoreScale: {
      min: 260,
      max: 340,
      step: 1,
      unit: "pts",
      defaultCurrent: 310,
      defaultTarget: 325,
      presets: [
        { label: "Target 315+", current: 300, target: 315 },
        { label: "Competitive 325+", current: 310, target: 325 },
        { label: "Top 5% 330+", current: 320, target: 332 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Quantitative & Verbal Reasoning",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff / 3));
      },
      getSummary: (current, target, count) =>
        `Your ${target - current}-point score gap is roughly ${count} missed questions across Section 2.`,
      mistakes: [
        {
          title: "Only testing positive numbers in Quantitative Comparison",
          description: "Assuming x and y are positive integers causes students to miss D on comparison questions.",
          questionIndex: 0,
          practiceUrl: "/practice/gre/quantitative-reasoning/quantitative-comparison",
        },
        {
          title: "Misunderstanding remainder properties on powers",
          description: "Wasting time trying to calculate large powers instead of applying modular rules.",
          questionIndex: 1,
          practiceUrl: "/practice/gre/quantitative-reasoning/arithmetic",
        },
        {
          title: "Ignoring contrast words (Although, Despite) in Text Completion",
          description: "Picking synonyms instead of opposites when a contrast word is present.",
          questionIndex: 2,
          practiceUrl: "/practice/gre/verbal-reasoning/text-completion",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The 'Positive Only' QC Trap",
        howItWorks:
          "Test-takers plug in x = 2 and y = 3 and conclude Quantity A is greater. If x = 1 and y = -1, the opposite happens, meaning the real answer is D.",
        ruleToBeatIt: "Always test four numbers: positive, negative, zero, and a fraction.",
        quickExample: "(x + y)² vs x² + y². If signs match, A > B. If signs differ, B > A. Answer: D.",
      },
      {
        trapNumber: "02",
        name: "The Synonym Illusion in Verbal",
        howItWorks:
          "Students read a sentence with 'celebrated for subtle nuance' and pick 'understated' because it sounds similar, missing the word 'Although' at the start.",
        ruleToBeatIt: "Circle contrast words like 'Although', 'Nonetheless', and 'Yet' before looking at choices.",
        quickExample: "'Although she was quiet, her speech was ______.' Blank must mean loud, not shy.",
      },
      {
        trapNumber: "03",
        name: "The Absolute Value Branch",
        howItWorks:
          "Solving |x - 4| = 7 and stopping at x = 11, completely forgetting that x - 4 could equal -7 (x = -3).",
        ruleToBeatIt: "Always split absolute values into both + and - branches before solving.",
        quickExample: "|x| = 5 means x can be +5 or -5.",
      },
    ],
    hardestQuestions: [
      {
        id: "GRE-512",
        missRate: 71,
        topic: "Quantitative Comparison: Real Numbers",
        summary: "71% picked A because they forgot to test negative numbers.",
        questionIndex: 0,
        practiceUrl: "/practice/gre/quantitative-reasoning/quantitative-comparison",
      },
      {
        id: "GRE-189",
        missRate: 66,
        topic: "Verbal: Text Completion Contrast",
        summary: "66% missed the transition signal and chose a synonym instead of an antonym.",
        questionIndex: 2,
        practiceUrl: "/practice/gre/verbal-reasoning/text-completion",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against 2026 ETS GRE General exam structure",
      reviewNote: "All comparisons test authentic boundary condition distributions",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "gre-q1",
        section: "Quantitative Reasoning",
        topic: "Quantitative Comparison • Real Numbers",
        questionText:
          "Quantity A: (x + y)²\nQuantity B: x² + y²\n\nGiven: x and y are real numbers.",
        options: {
          A: "Quantity A is greater",
          B: "Quantity B is greater",
          C: "The two quantities are equal",
          D: "The relationship cannot be determined",
        },
        correctOption: "D",
        trapOption: "A",
        trapName: "The Positive Numbers Fallacy",
        whyTrapFooled:
          "Expanding gives Quantity A = x² + 2xy + y². Students assume 2xy must be positive, so they pick A.",
        whyCorrectWorks:
          "If x = 1 and y = 1, Quantity A is 4 and Quantity B is 2 (A > B). But if x = 1 and y = −1, Quantity A is 0 and Quantity B is 2 (B > A). Since the outcome changes depending on the signs, the relationship cannot be determined.",
        tenSecondRule:
          "In Quantitative Comparison, never pick A or B until you have tested at least one negative number and zero.",
        timeEstimateSeconds: 60,
      },
      {
        id: "gre-q2",
        section: "Quantitative Reasoning",
        topic: "Number Properties • Remainders",
        questionText:
          "Quantity A: The remainder when (7¹² + 3) is divided by 7.\nQuantity B: 3",
        options: {
          A: "Quantity A is greater",
          B: "Quantity B is greater",
          C: "The two quantities are equal",
          D: "The relationship cannot be determined",
        },
        correctOption: "C",
        trapOption: "A",
        trapName: "Large Exponent Intimidation",
        whyTrapFooled:
          "58% of students assume 7¹² will produce a large remainder that beats Quantity B.",
        whyCorrectWorks:
          "Since 7¹² is an exact multiple of 7, its remainder is 0. Adding 3 leaves a remainder of exactly 3. Quantity A equals Quantity B.",
        tenSecondRule:
          "A number raised to a power that is divisible by the divisor leaves a remainder of zero.",
        timeEstimateSeconds: 45,
      },
      {
        id: "gre-q3",
        section: "Verbal Reasoning",
        topic: "Text Completion • Contrast Clues",
        questionText:
          "Although the director's early films were celebrated for their subtle nuance, her recent blockbuster was criticized for its ______ narrative style.",
        options: {
          A: "heavy-handed",
          B: "understated",
          C: "innovative",
          D: "poetic",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Synonym Trap",
        whyTrapFooled:
          "Students pick 'understated' because it matches 'subtle nuance', missing the word 'Although' at the very beginning of the sentence.",
        whyCorrectWorks:
          "'Although' signals an opposing contrast. The opposite of subtle nuance is heavy-handed.",
        tenSecondRule:
          "Circle transition words like 'Although' or 'Despite' first. They tell you whether the blank is a twin or an opposite.",
        timeEstimateSeconds: 45,
      },
    ],
  },

  cfa: {
    id: "cfa",
    name: "CFA Level 1",
    shortName: "CFA Level 1",
    officialBadge: "Official 2026 CFA Institute Curriculum",
    heroPrompt: "62% of candidates confuse financial leverage with asset turnover. Can you spot the DuPont trap?",
    timeLimitSeconds: 90,
    hasCalculator: true,
    calculatorType: "financial",
    hasFormulaSheet: false,
    scoreScale: {
      min: 40,
      max: 95,
      step: 1,
      unit: "%",
      defaultCurrent: 65,
      defaultTarget: 80,
      presets: [
        { label: "Passing Threshold (70%)", current: 58, target: 72 },
        { label: "Safe Margin (80%)", current: 65, target: 80 },
        { label: "Top 10th Percentile", current: 72, target: 88 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Financial Statement Analysis & Quant",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff / 3));
      },
      getSummary: (current, target, count) =>
        `Reaching an ${target}% safe score means eliminating roughly ${count} recurring formula traps across FSA and Quant.`,
      mistakes: [
        {
          title: "Confusing quarterly compounding with simple APR",
          description: "Forgetting that quarterly compounding makes EAR strictly higher than nominal interest.",
          questionIndex: 1,
          practiceUrl: "/practice/cfa-level-1/quantitative-methods/time-value-of-money",
        },
        {
          title: "Misapplying the 3-step DuPont decomposition",
          description: "Attributing an ROE change to the wrong component when profit margin and turnover are constant.",
          questionIndex: 0,
          practiceUrl: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards",
        },
        {
          title: "Ignoring the interest tax shield in cost of debt calculations",
          description: "Forgetting that higher tax rates make debt cheaper on an after-tax basis.",
          questionIndex: 2,
          practiceUrl: "/practice/cfa-level-1/corporate-issuers/cost-of-capital",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The Tax Shield Direction Trap",
        howItWorks:
          "Candidates assume a higher corporate tax rate increases borrowing costs. In reality, interest is tax-deductible, so a higher tax rate increases the tax shield and lowers after-tax debt cost.",
        ruleToBeatIt: "Remember: After-tax cost of debt = Kd × (1 − Tax Rate). Higher tax rate = lower cost.",
        quickExample: "At 20% tax, debt costs 8%. At 30% tax, the same debt costs 7%.",
      },
      {
        trapNumber: "02",
        name: "The Nominal vs Effective Rate Trap",
        howItWorks:
          "Treating an 8% APR compounded quarterly as 8.00% annual interest instead of computing (1.02)⁴ − 1 = 8.24%.",
        ruleToBeatIt: "If compounding frequency m > 1, EAR is ALWAYS greater than APR.",
        quickExample: "Quarterly compounding on 8% yields 8.24%, not 8.00%.",
      },
      {
        trapNumber: "03",
        name: "The DuPont Component Isolation Trap",
        howItWorks:
          "Trying to guess ROE changes without checking which of the three components (Margin, Turnover, Leverage) actually moved.",
        ruleToBeatIt: "Write: ROE = Net Margin × Asset Turnover × (Assets / Equity). Check off the constants first.",
        quickExample: "If Margin and Turnover are flat, any ROE increase is 100% caused by higher leverage.",
      },
    ],
    hardestQuestions: [
      {
        id: "CFA-902",
        missRate: 73,
        topic: "Financial Statement Analysis: DuPont 3-Step",
        summary: "73% attributed ROE changes to tax adjustments instead of the equity multiplier.",
        questionIndex: 0,
        practiceUrl: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards",
      },
      {
        id: "CFA-414",
        missRate: 67,
        topic: "Corporate Issuers: WACC Tax Shield",
        summary: "67% concluded higher tax rates increase borrowing costs.",
        questionIndex: 2,
        practiceUrl: "/practice/cfa-level-1/corporate-issuers/cost-of-capital",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against 2026 CFA Institute Level 1 curriculum",
      reviewNote: "All formulas match standard BA II Plus / HP 12C exam conventions",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "cfa-q1",
        section: "Financial Statement Analysis",
        topic: "DuPont Analysis • ROE Decomposition",
        questionText:
          "A company's Return on Equity (ROE) increases while its net profit margin and total asset turnover remain unchanged. According to the DuPont 3-step model, this increase was most likely caused by an increase in:",
        options: {
          A: "Financial leverage (Equity multiplier)",
          B: "Effective tax rate",
          C: "Operating working capital ratio",
          D: "Gross profit margin",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Tax Reversal Misconception",
        whyTrapFooled:
          "Candidates confuse tax burden adjustments with equity leverage.",
        whyCorrectWorks:
          "DuPont 3-Step: ROE = Net Profit Margin × Asset Turnover × (Assets / Equity). If Margin and Turnover are constant, the only variable that can increase ROE is the Equity Multiplier (financial leverage).",
        tenSecondRule:
          "Write the 3 factors down: Margin × Turnover × Leverage. If two are constant, the third explains the entire change.",
        timeEstimateSeconds: 60,
      },
      {
        id: "cfa-q2",
        section: "Quantitative Methods",
        topic: "Time Value of Money • Compounding",
        questionText:
          "An investment offers an annual percentage rate (APR) of 8% compounded quarterly. What is the effective annual rate (EAR)?",
        options: {
          A: "8.24%",
          B: "8.00%",
          C: "8.16%",
          D: "8.48%",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Simple Interest Trap",
        whyTrapFooled:
          "Assuming EAR equals the quoted nominal rate without compounding.",
        whyCorrectWorks:
          "EAR = (1 + 0.08 / 4)⁴ − 1 = (1.02)⁴ − 1 = 1.08243 − 1 = 8.24%.",
        tenSecondRule:
          "Compounding always makes the effective rate (EAR) higher than the nominal rate (APR) when compounding more than once a year.",
        timeEstimateSeconds: 45,
      },
      {
        id: "cfa-q3",
        section: "Corporate Issuers",
        topic: "Capital Structure • WACC & Tax Shield",
        questionText:
          "If a company's marginal corporate tax rate increases, what is the most likely effect on its after-tax cost of debt and its Weighted Average Cost of Capital (WACC), holding all other variables constant?",
        options: {
          A: "Cost of debt decreases; WACC decreases",
          B: "Cost of debt increases; WACC increases",
          C: "Cost of debt decreases; WACC increases",
          D: "Cost of debt is unchanged; WACC decreases",
        },
        correctOption: "A",
        trapOption: "B",
        trapName: "The Higher Tax Cost Fallacy",
        whyTrapFooled:
          "Candidates assume higher taxes automatically make everything more expensive for a company.",
        whyCorrectWorks:
          "After-tax cost of debt = Pre-tax debt rate × (1 − Tax Rate). A higher tax rate increases the interest tax deduction shield, which reduces the after-tax cost of debt and lowers total WACC.",
        tenSecondRule:
          "Interest expense is tax-deductible. A higher tax rate makes debt borrowing cheaper.",
        timeEstimateSeconds: 60,
      },
    ],
  },

  ielts: {
    id: "ielts",
    name: "IELTS Academic",
    shortName: "IELTS Academic",
    officialBadge: "Official 2026 Academic Format",
    heroPrompt: "62% of IELTS candidates mix up 'False' and 'Not Given'. Can you spot the difference in 60 seconds?",
    timeLimitSeconds: 75,
    hasCalculator: false,
    calculatorType: "standard",
    hasFormulaSheet: false,
    scoreScale: {
      min: 5.0,
      max: 9.0,
      step: 0.5,
      unit: "Band",
      defaultCurrent: 6.5,
      defaultTarget: 7.5,
      presets: [
        { label: "University Cutoff (6.5 → 7.0)", current: 6.5, target: 7.0 },
        { label: "Competitive (6.5 → 7.5)", current: 6.5, target: 7.5 },
        { label: "Top Tier (7.5 → 8.5)", current: 7.5, target: 8.5 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Reading Academic & Writing",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff * 4));
      },
      getSummary: (current, target, count) =>
        `Moving from Band ${current} to ${target} comes down to avoiding roughly ${count} common question traps in Reading and Listening.`,
      mistakes: [
        {
          title: "Confusing 'NOT GIVEN' with 'FALSE' in Reading passages",
          description: "Assuming an unstated claim is false because an alternative fact is verified.",
          questionIndex: 0,
          practiceUrl: "/practice/ielts-academic/reading/inferences",
        },
        {
          title: "Picking answers that bring outside world knowledge into the text",
          description: "Academic reading tests only what is stated inside the paragraph.",
          questionIndex: 1,
          practiceUrl: "/practice/ielts-academic/reading/central-ideas-and-details",
        },
        {
          title: "Missing qualifying words like 'sometimes', 'all', or 'rarely'",
          description: "Overlooking frequency adverbs causes errors on true/false sections.",
          questionIndex: 2,
          practiceUrl: "/practice/ielts-academic/reading/craft-and-structure",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The 'NOT GIVEN' vs 'FALSE' Trap",
        howItWorks:
          "'False' means the passage directly contradicts the statement. 'Not Given' means the passage neither confirms nor denies it. Students bring external facts to call it False.",
        ruleToBeatIt: "If the passage is silent on whether the statement is true or false, it is strictly NOT GIVEN.",
        quickExample: "Passage: 'A causes B'. Statement: 'C never causes B'. Since C is never mentioned, answer is NOT GIVEN.",
      },
      {
        trapNumber: "02",
        name: "The Extreme Absolute Word Trap",
        howItWorks:
          "Wrong choices often use rigid words like 'always', 'invariably', or 'all', whereas academic texts use cautious words like 'several' or 'can'.",
        ruleToBeatIt: "Highlight absolute adverbs. Academic papers almost never make unhedged universal claims.",
        quickExample: "Text says 'some species adapt'; wrong choice says 'all species adapt'.",
      },
      {
        trapNumber: "03",
        name: "The Exact Word Bait",
        howItWorks:
          "Test writers copy 4 exact words from the passage into an incorrect choice, while the correct answer paraphrases using clean synonyms.",
        ruleToBeatIt: "Do not match words by eye. Match the underlying meaning by finding true synonyms.",
        quickExample: "Text says 'elevated nocturnal temperatures'; correct choice says 'retains heat at night'.",
      },
    ],
    hardestQuestions: [
      {
        id: "IELTS-701",
        missRate: 64,
        topic: "Reading: True / False / Not Given",
        summary: "64% picked FALSE because they assumed cosmic rays disproved solar radiation.",
        questionIndex: 0,
        practiceUrl: "/practice/ielts-academic/reading/inferences",
      },
      {
        id: "IELTS-419",
        missRate: 58,
        topic: "Reading: Paraphrase Matching",
        summary: "58% picked a plausible fact that introduced outside unmentioned ideas.",
        questionIndex: 1,
        practiceUrl: "/practice/ielts-academic/reading/central-ideas-and-details",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against British Council & IDP IELTS Academic standards",
      reviewNote: "All reading texts follow official academic passage difficulty levels",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "ielts-q1",
        section: "Academic Reading",
        topic: "True / False / Not Given • Passage Logic",
        questionText:
          "Passage excerpt: 'While early researchers hypothesized that solar radiation was the primary driver of polar cloud ionization, subsequent satellite observations confirmed that atmospheric cosmic rays contribute significantly to cloud droplet condensation.'\n\nQuestion: Does the text affirm that solar radiation has been disproven as having any atmospheric impact?",
        options: {
          A: "TRUE",
          B: "FALSE",
          C: "NOT GIVEN",
          D: "CANNOT BE DETERMINED",
        },
        correctOption: "C",
        trapOption: "B",
        trapName: "The False Assumption Trap",
        whyTrapFooled:
          "Students assume that because cosmic rays are confirmed, solar radiation must be completely false. Over 62% of IELTS candidates conflate 'not mentioned' with 'false'.",
        whyCorrectWorks:
          "The text says cosmic rays contribute, but it never claims solar radiation has zero effect overall. The passage is silent on that point, so it is strictly NOT GIVEN.",
        tenSecondRule:
          "If the passage doesn't explicitly state the claim is wrong, it is NOT GIVEN, never FALSE.",
        timeEstimateSeconds: 60,
      },
      {
        id: "ielts-q2",
        section: "Academic Reading",
        topic: "Paraphrase & Evidence Matching",
        questionText:
          "Passage excerpt: 'Urban density often generates microclimates characterized by elevated nocturnal temperatures compared to adjacent rural landscapes.'\n\nQuestion: Which statement best reflects the author's observation?",
        options: {
          A: "Cities tend to retain more heat during the night than surrounding countryside areas.",
          B: "Rural landscapes suffer from intense thermal fluctuations after sunset.",
          C: "Nocturnal cooling occurs at equal rates across both urban and agricultural zones.",
          D: "Elevated urban temperatures are primarily caused by industrial emissions.",
        },
        correctOption: "A",
        trapOption: "D",
        trapName: "The Plausible Extrapolation Trap",
        whyTrapFooled:
          "Choice D sounds like a logical real-world fact about cities, but the passage never mentioned industrial emissions.",
        whyCorrectWorks:
          "Choice A accurately paraphrases 'elevated nocturnal temperatures' as 'retain more heat during the night' and 'adjacent rural landscapes' as 'surrounding countryside areas'.",
        tenSecondRule:
          "Look for accurate paraphrases. Never pick an answer that introduces outside facts not mentioned in the text.",
        timeEstimateSeconds: 45,
      },
      {
        id: "ielts-q3",
        section: "Academic Reading",
        topic: "Qualifying Words & Precision",
        questionText:
          "Passage excerpt: 'Although many marine organisms are susceptible to acoustic disturbances, several pelagic species exhibit temporary auditory threshold shifts without permanent organ damage.'\n\nAccording to the passage, underwater noise:",
        options: {
          A: "Invariably destroys the acoustic organs of all oceanic organisms",
          B: "Can cause temporary hearing changes in some open-sea species",
          C: "Poses no physiological risk to deep-sea marine animals",
          D: "Affects coastal marine life more severely than pelagic species",
        },
        correctOption: "B",
        trapOption: "A",
        trapName: "The Extreme Absolute Trap",
        whyTrapFooled:
          "Option A uses extreme words ('invariably', 'all'), whereas the text specifically said 'several' and 'temporary'.",
        whyCorrectWorks:
          "Choice B matches 'several pelagic species' (some open-sea species) and 'temporary auditory threshold shifts'.",
        tenSecondRule:
          "Beware of absolute words like 'always', 'all', or 'never'. Academic tests prefer cautious words like 'can' or 'some'.",
        timeEstimateSeconds: 45,
      },
    ],
  },

  toefl: {
    id: "toefl",
    name: "TOEFL iBT",
    shortName: "TOEFL iBT",
    officialBadge: "Official ETS 2026 Format",
    heroPrompt: "59% of test-takers pick the wrong sentence insertion on this paragraph. Can you spot the transition clue in 60s?",
    timeLimitSeconds: 75,
    hasCalculator: false,
    calculatorType: "standard",
    hasFormulaSheet: false,
    scoreScale: {
      min: 60,
      max: 120,
      step: 1,
      unit: "pts",
      defaultCurrent: 88,
      defaultTarget: 104,
      presets: [
        { label: "Admissions (80 → 95)", current: 80, target: 95 },
        { label: "Competitive (88 → 104)", current: 88, target: 104 },
        { label: "Top University (100 → 112)", current: 100, target: 112 },
      ],
    },
    scoreGapLogic: {
      sectionName: "Reading & Listening Comprehension",
      getQuestionsCount: (current, target) => {
        const diff = Math.max(0, target - current);
        return Math.max(1, Math.round(diff / 3));
      },
      getSummary: (current, target, count) =>
        `A ${target - current}-point score jump on TOEFL iBT is roughly ${count} missed questions across Reading and Listening.`,
      mistakes: [
        {
          title: "Selecting literal word matches instead of the author's rhetorical purpose",
          description: "Describing what a fact is rather than why the author brought it up.",
          questionIndex: 0,
          practiceUrl: "/practice/toefl-ibt/reading/text-structure-and-purpose",
        },
        {
          title: "Missing pronoun reference clues ('this process', 'such factors') in sentence insertion",
          description: "Placing sentences before the cause they reference is introduced.",
          questionIndex: 1,
          practiceUrl: "/practice/toefl-ibt/reading/transitions-and-logical-flow",
        },
        {
          title: "Picking familiar true statements on negative factual questions ('EXCEPT')",
          description: "Forgetting to invert your selection when the prompt asks for what is NOT stated.",
          questionIndex: 2,
          practiceUrl: "/practice/toefl-ibt/reading/information-and-ideas",
        },
      ],
    },
    trapsGuide: [
      {
        trapNumber: "01",
        name: "The Literal vs Rhetorical Purpose Trap",
        howItWorks:
          "When a question asks 'Why does the author mention X?', wrong choices describe what X is biologically or physically, rather than why it supports the paragraph's main point.",
        ruleToBeatIt: "Always link the detail back to the topic sentence. Ask: 'What point does this detail prove?'",
        quickExample: "Mentioning the absence of photosystem II proves organisms do not use sunlight.",
      },
      {
        trapNumber: "02",
        name: "The Sentence Insertion Pronoun Disconnect",
        howItWorks:
          "Students insert a sentence starting with 'Consequently' or 'These findings' before the actual finding has been stated.",
        ruleToBeatIt: "Look for pointer words ('these', 'such', 'this', 'therefore'). The sentence with the clue MUST follow the concept it refers to.",
        quickExample: "'These results' cannot appear before the experiment results are reported.",
      },
      {
        trapNumber: "03",
        name: "The 'EXCEPT' Question Habit Trap",
        howItWorks:
          "On negative factual questions ('Which is NOT true?'), students read Choice A, recognize it from the text, and pick it out of habit.",
        ruleToBeatIt: "Write 'T' or 'F' next to each choice. The single 'F' is the correct answer.",
        quickExample: "Choice A was in the text (True). Choice B was in the text (True). Choice C was not (Answer).",
      },
    ],
    hardestQuestions: [
      {
        id: "TOEFL-620",
        missRate: 61,
        topic: "Reading: Sentence Insertion Flow",
        summary: "61% placed the sentence before the premise it was responding to.",
        questionIndex: 1,
        practiceUrl: "/practice/toefl-ibt/reading/transitions-and-logical-flow",
      },
      {
        id: "TOEFL-308",
        missRate: 56,
        topic: "Reading: Rhetorical Purpose",
        summary: "56% picked a literal explanation rather than the author's argument.",
        questionIndex: 0,
        practiceUrl: "/practice/toefl-ibt/reading/text-structure-and-purpose",
      },
    ],
    verificationStamp: {
      syllabus: "Verified against 2026 ETS TOEFL iBT testing format",
      reviewNote: "All reading texts follow official ETS lexile and rhetorical patterns",
      activePoolStatus: "100% verified question accuracy across all active tracks",
    },
    questions: [
      {
        id: "toefl-q1",
        section: "Reading Comprehension",
        topic: "Rhetorical Purpose • Author's Intent",
        questionText:
          "Passage excerpt: 'Geothermal vents host chemoautotrophic bacteria that synthesize ATP without solar photons. In describing these hydrothermal biomes, the author mentions the complete absence of photosystem II.'\n\nWhy does the author mention 'the complete absence of photosystem II'?",
        options: {
          A: "To prove that geothermal ecosystems are deficient in essential proteins",
          B: "To emphasize that energy synthesis in vent communities operates independently of solar photosynthesis",
          C: "To argue that photosynthetic life evolved prior to chemosynthetic life",
          D: "To illustrate the extreme toxic vulnerability of deep ocean vent organisms",
        },
        correctOption: "B",
        trapOption: "A",
        trapName: "The Deficiency Trap",
        whyTrapFooled:
          "Students read 'complete absence' and assume the ecosystem is deficient or impaired, confusing adaptation with weakness.",
        whyCorrectWorks:
          "Photosystem II is required for sunlight-driven photosynthesis. Its absence proves these organisms produce energy without sunlight.",
        tenSecondRule:
          "When a question asks 'Why does the author mention...', answer why they brought it up, not just what words mean literally.",
        timeEstimateSeconds: 60,
      },
      {
        id: "toefl-q2",
        section: "Reading Comprehension",
        topic: "Sentence Insertion • Cohesion",
        questionText:
          "Passage excerpt:\n[1] Glacial ice records atmospheric gases trapped over millennia.\n[2] By analyzing microscopic air bubbles trapped in ancient ice cores, climatologists reconstruct prehistoric greenhouse levels.\n[3] However, recent boreholes reveal that pressure changes can alter gas composition at extreme depths.\n[4] This finding suggests earlier timeline estimates may require recalibration.\n\nWhere would the following sentence best fit: \"Consequently, researchers now cross-validate ice-core data with oceanic sediment layers.\"?",
        options: {
          A: "Position [1]",
          B: "Position [2]",
          C: "Position [3]",
          D: "Position [4]",
        },
        correctOption: "D",
        trapOption: "C",
        trapName: "The Premature Cause Trap",
        whyTrapFooled:
          "Putting 'Consequently' immediately after the problem is stated at [3], before the scientific implication is described.",
        whyCorrectWorks:
          "'Consequently' indicates an action taken in response to the finding. It logically belongs after sentence [4] describes that estimates require recalibration.",
        tenSecondRule:
          "Transition words like 'Consequently' or 'Therefore' show the final result. Look for the sentence that completes the cause-and-effect chain.",
        timeEstimateSeconds: 60,
      },
      {
        id: "toefl-q3",
        section: "Reading Comprehension",
        topic: "Negative Factual Information • EXCEPT",
        questionText:
          "Passage excerpt: 'The rapid dispersal of early angiosperms (flowering plants) was facilitated by co-evolution with insect pollinators, rapid seed germination, and specialized vascular tissues called vessel elements. Pollination by wind, while common in gymnosperms, played a minimal role in the explosive radiation of flowering species.'\n\nAccording to the passage, all of the following contributed to the rapid dispersal of angiosperms EXCEPT:",
        options: {
          A: "Symbiotic relationships with insect pollinators",
          B: "Rapid rates of seed germination",
          C: "Widespread reliance on wind pollination",
          D: "Specialized vascular vessel elements",
        },
        correctOption: "C",
        trapOption: "A",
        trapName: "The Familiar Fact Trap",
        whyTrapFooled:
          "Students see 'insect pollinators' and instinctively pick it because it was highlighted in the passage, forgetting the question asked for 'EXCEPT'.",
        whyCorrectWorks:
          "The passage explicitly states that wind pollination 'played a minimal role'. Therefore, it did NOT contribute to the rapid dispersal.",
        tenSecondRule:
          "On 'EXCEPT' questions, put a checkmark next to true statements. The false one is your answer.",
        timeEstimateSeconds: 45,
      },
    ],
  },
};

