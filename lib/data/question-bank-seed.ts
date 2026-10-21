// Path: lib/data/question-bank-seed.ts

export interface SeedQuestion {
  exam_name: string;
  subject: string;
  skill_domain: string;
  difficulty_tier: 1 | 2 | 3;
  question_text: string;
  passage?: string;
  passage_id?: string;
  options: { A: string; B: string; C: string; D?: string; E?: string; F?: string };
  correct_option: "A" | "B" | "C" | "D" | "E" | "F";
  explanation: string;
  distractor_analysis: { A: string; B: string; C: string; D?: string; E?: string; F?: string };
  misconception: string;
  time_estimate_seconds: number;
}

export const QUESTION_BANK_SEED: SeedQuestion[] = [
  // ==========================================
  // DIGITAL SAT — Mathematics & Reading/Writing
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 2,
    question_text: "The function $f$ is defined by $f(x) = 2x^2 - 12x + 23$. What is the minimum value of $f(x)$?",
    options: {
      A: "3",
      B: "5",
      C: "11",
      D: "23",
    },
    correct_option: "B",
    explanation: "For a quadratic $f(x) = ax^2 + bx + c$ with $a > 0$, the minimum occurs at the vertex $x = -b / (2a)$. Here $x = -(-12) / (2 \\times 2) = 12 / 4 = 3$. Evaluating $f(3) = 2(3)^2 - 12(3) + 23 = 2(9) - 36 + 23 = 18 - 36 + 23 = 5$.",
    distractor_analysis: {
      A: "Incorrect. Trap: 3 is the x-coordinate where the minimum occurs, not the minimum value of $f(x)$ itself.",
      B: "Correct. The minimum value is the y-coordinate at the vertex, $f(3) = 5$.",
      C: "Incorrect. Arithmetic slip when calculating $18 - 36 + 23$.",
      D: "Incorrect. 23 is the y-intercept $f(0)$, not the minimum of the parabolic trajectory.",
    },
    misconception: "Providing the x-coordinate of the vertex ($x = 3$) when asked for the minimum value of the function ($f(x)$).",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Standard English Conventions",
    difficulty_tier: 2,
    question_text: "The discovery of extremophile bacteria living near deep-sea hydrothermal vents _______ scientists' understanding of the temperature limits for biological life.",
    options: {
      A: "has revolutionized",
      B: "have revolutionized",
      C: "are revolutionizing",
      D: "revolutionize",
    },
    correct_option: "A",
    explanation: "The true subject of the sentence is the singular noun 'discovery' ('The discovery... has revolutionized'). The intervening prepositional phrases ('of extremophile bacteria', 'living near deep-sea hydrothermal vents') contain plural nouns that create an illusion of a plural subject, but the verb must agree with 'discovery'.",
    distractor_analysis: {
      A: "Correct. The singular verb 'has revolutionized' agrees with the singular grammatical subject 'discovery'.",
      B: "Incorrect. Classic distractor trap: student matches the verb with the adjacent plural nouns 'bacteria' or 'vents'.",
      C: "Incorrect. Plural progressive verb fails agreement with singular subject 'discovery'.",
      D: "Incorrect. Plural present tense verb fails agreement with singular subject.",
    },
    misconception: "Proximity agreement error: making the verb agree with the nearest noun inside a modifier rather than the head subject.",
    time_estimate_seconds: 45,
  },

  // ==========================================
  // CFA LEVEL 1 — Financial Analysis & Fixed Income
  // ==========================================
  {
    exam_name: "CFA Level 1",
    subject: "Financial Statement Analysis",
    skill_domain: "Financial Analysis Techniques",
    difficulty_tier: 3,
    question_text: "Under the extended 5-step DuPont framework, how is the Tax Burden ratio defined, and what is the impact of an increase in the corporate statutory tax rate?",
    options: {
      A: "$\\text{EBT} / \\text{Net Income}$; an increasing tax rate increases the ratio.",
      B: "$\\text{Net Income} / \\text{EBT}$; an increasing tax rate decreases the ratio.",
      C: "$\\text{EBIT} / \\text{EBT}$; an increasing tax rate decreases the ratio.",
      D: "$\\text{Net Income} / \\text{EBIT}$; an increasing tax rate has no effect.",
    },
    correct_option: "B",
    explanation: "In the 5-step DuPont decomposition, $\\text{ROE} = \\frac{\\text{Net Income}}{\\text{EBT}} \\times \\frac{\\text{EBT}}{\\text{EBIT}} \\times \\frac{\\text{EBIT}}{\\text{Revenue}} \\times \\frac{\\text{Revenue}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}$. The Tax Burden ratio is defined as $\\frac{\\text{Net Income}}{\\text{EBT}} = 1 - t$, where $t$ is the effective tax rate. As the tax rate $t$ rises, the firm keeps less of each dollar of pretax income, meaning the ratio $\\text{Net Income} / \\text{EBT}$ decreases.",
    distractor_analysis: {
      A: "Incorrect. Common trap: inverting numerator and denominator. $\\text{EBT} / \\text{Net Income}$ is $> 1$ and would expand with higher taxes, which reverses economic reality.",
      B: "Correct. $\\text{Net Income}/\\text{EBT} = (1 - \\text{effective tax rate})$; higher taxes lower the ratio.",
      C: "Incorrect. $\\text{EBIT}/\\text{EBT}$ is the inverse of the Interest Burden, not the Tax Burden.",
      D: "Incorrect. $\\text{Net Income}/\\text{EBIT}$ combines interest burden and tax burden into a single compound ratio.",
    },
    misconception: "Inverting the Tax Burden ratio in DuPont analysis, mistakenly believing a higher 'burden' numerically increases the metric.",
    time_estimate_seconds: 90,
  },
  {
    exam_name: "CFA Level 1",
    subject: "Fixed Income",
    skill_domain: "Yield & Spread Analysis",
    difficulty_tier: 2,
    question_text: "A 5-year annual coupon bond with an 8% coupon rate trades at par ($1,000). If market interest rates instantly decline by 100 basis points, what is the bond's approximate percentage price change using its modified duration?",
    options: {
      A: "+3.99%",
      B: "+4.31%",
      C: "-3.99%",
      D: "+7.98%",
    },
    correct_option: "A",
    explanation: "For a bond trading at par, Macaulay duration is $D_{\\text{mac}} = \\frac{1 + y}{y} [1 - \\frac{1}{(1+y)^n}] + \\frac{n}{1+y} \\dots$ For a 5-year 8% par bond, $D_{\\text{mac}} \\approx 4.312$ years. Modified duration is $D_{\\text{mod}} = \\frac{D_{\\text{mac}}}{1 + y} = \\frac{4.312}{1.08} \\approx 3.993$ years. For $\\Delta y = -1.00\\% = -0.01$: $\\% \\Delta P \\approx -D_{\\text{mod}} \\times \\Delta y = -(3.993) \\times (-0.01) = +3.99\\%$.",
    distractor_analysis: {
      A: "Correct. Properly discounted Macaulay duration by $(1 + y)$ to obtain Modified Duration and applied the negative relationship.",
      B: "Incorrect. Used Macaulay duration directly (4.31%) without dividing by $(1 + y/k)$ to get Modified duration.",
      C: "Incorrect. Sign error: falling yields cause bond prices to RISE, not fall.",
      D: "Incorrect. Confused coupon rate percentage (8%) with interest rate sensitivity.",
    },
    misconception: "Failing to convert Macaulay duration to Modified duration before computing percentage price sensitivity to yield shifts.",
    time_estimate_seconds: 90,
  },

  // ==========================================
  // GMAT FOCUS — Data Insights & Critical Reasoning
  // ==========================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "Is the integer $n$ divisible by 6?\n\nStatement (1): $n$ is divisible by 3.\nStatement (2): $n$ is divisible by 4.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "An integer is divisible by 6 if and only if it is divisible by both 2 and 3.\n- Statement (1): Divisible by 3. If $n = 3$, no; if $n = 6$, yes. Insufficient.\n- Statement (2): Divisible by 4. If $n = 4$, no; if $n = 12$, yes. Insufficient.\n- Combining (1) and (2): $n$ is divisible by both 3 and 4. Since $\\text{gcd}(3, 4) = 1$, $n$ must be divisible by $\\text{lcm}(3, 4) = 12$. Any multiple of 12 is also a multiple of 6 ($12k = 6(2k)$). Thus both statements together are definitively sufficient.",
    distractor_analysis: {
      A: "Incorrect. Divisibility by 3 does not guarantee even parity (e.g. $n = 9$).",
      B: "Incorrect. Divisibility by 4 guarantees even parity but not a factor of 3 (e.g. $n = 8$).",
      C: "Correct. The LCM of 3 and 4 is 12, which is an integer multiple of 6, establishing sufficiency.",
      D: "Incorrect. Trap: mistakenly assuming one needs an explicit factor of 6 rather than understanding that $\\text{LCM}(3,4) = 12$ guarantees divisibility by 6.",
    },
    misconception: "Forgetting that divisibility by two coprime numbers $a$ and $b$ guarantees divisibility by their product $a \\times b$.",
    time_estimate_seconds: 75,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Verbal Reasoning",
    skill_domain: "Critical Reasoning",
    difficulty_tier: 2,
    question_text: "A municipal transit authority plans to reduce bus ticket prices by 20% to increase total fare revenue, arguing that lower prices will attract substantial new ridership.\n\nWhich of the following, if true, most seriously weakens the transit authority's argument?",
    options: {
      A: "Surrounding suburbs recently instituted a congestion charge on private automobiles entering the city center.",
      B: "The city's buses are currently operating at over 95% passenger capacity during all peak morning and evening commuting hours.",
      C: "Surveys indicate that commuters prioritize route frequency over ticket price when selecting transportation.",
      D: "The cost of diesel fuel for the bus fleet is expected to remain stable over the next three years.",
    },
    correct_option: "B",
    explanation: "Fare revenue = (Number of riders) × (Ticket price). If prices drop by 20%, rider volume must increase by more than 25% to raise revenue. However, if buses are already operating at 95% capacity during peak hours, the transit system physically cannot accommodate the necessary surge in peak commuters without purchasing new buses. Thus revenue will decline.",
    distractor_analysis: {
      A: "Incorrect. A congestion tax on cars would strengthen the transit authority's plan by pushing drivers toward buses.",
      B: "Correct. Highlights a physical capacity bottleneck that prevents the volume surge required to offset the 20% price cut.",
      C: "Incorrect. Merely speaks to passenger preference; does not demonstrate that new ridership cannot or will not occur.",
      D: "Incorrect. Operating fuel cost affects net profit, not the revenue projection targeted by the argument.",
    },
    misconception: "Evaluating cost/profit factors when the stimulus conclusion is explicitly restricted to top-line gross fare revenue.",
    time_estimate_seconds: 90,
  },

  // ==========================================
  // GRE GENERAL — Quantitative & Verbal Reasoning
  // ==========================================
  {
    exam_name: "GRE",
    subject: "Quantitative Reasoning",
    skill_domain: "Geometry",
    difficulty_tier: 2,
    question_text: "A circular cylinder and a right circular cone have identical base radii $r$ and identical heights $h$. If the volume of the cylinder is $54\\pi$, what is the volume of the cone?",
    options: {
      A: "$18\\pi$",
      B: "$27\\pi$",
      C: "$36\\pi$",
      D: "$162\\pi$",
    },
    correct_option: "A",
    explanation: "The volume of a cylinder is $V_{\\text{cyl}} = \\pi r^2 h$. The volume of a right circular cone is $V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} V_{\\text{cyl}}$. Given $V_{\\text{cyl}} = 54\\pi$, we have $V_{\\text{cone}} = \\frac{54\\pi}{3} = 18\\pi$.",
    distractor_analysis: {
      A: "Correct. Strict geometric ratio: a cone has exactly $1/3$ the volume of a cylinder with the same base and height.",
      B: "Incorrect. Divided by 2 instead of 3, assuming a triangular cross-sectional half-ratio.",
      C: "Incorrect. Calculated $2/3$ of the volume instead of $1/3$.",
      D: "Incorrect. Multiplied by 3 instead of dividing by 3.",
    },
    misconception: "Confusing the $1/3$ volumetric factor of a 3D cone with the $1/2$ area factor of a 2D triangle.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GRE",
    subject: "Verbal Reasoning",
    skill_domain: "Text Completion",
    difficulty_tier: 2,
    question_text: "Although the archival manuscript appeared remarkably _______ at first glance, forensic spectroscopic analysis revealed that several key paragraphs had been surreptitiously excised.",
    options: {
      A: "comprehensive",
      B: "unremarkable",
      C: "anachronistic",
      D: "laconic",
    },
    correct_option: "A",
    explanation: "The sentence structure features a contrast shift signaled by 'Although'. The second clause states that key paragraphs had been 'surreptitiously excised' (removed or deleted). The contrast requires a word in the first clause indicating that the manuscript appeared complete, whole, or thorough. 'Comprehensive' (meaning complete or including all elements) creates the exact necessary contrast with 'excised'.",
    distractor_analysis: {
      A: "Correct. 'Comprehensive' (complete/exhaustive) perfectly contrasts with the hidden excision of key passages.",
      B: "Incorrect. 'Unremarkable' fails to establish the contrast between apparent wholeness and actual missing content.",
      C: "Incorrect. 'Anachronistic' (chronologically out of place) introduces an unsupported temporal dimension.",
      D: "Incorrect. 'Laconic' (terse/concise) would align with excised text rather than provide the contrast demanded by 'Although'.",
    },
    misconception: "Choosing a word that matches the tone of excision rather than following the contrastive pivot signaled by 'Although'.",
    time_estimate_seconds: 60,
  },
];
