// Path: scripts/patch-threshold-shortfalls.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import type { SeedQuestion } from "../lib/data/question-bank-seed";

dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.local", override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(url, key);

function q(
  exam: string,
  sub: string,
  dom: string,
  text: string,
  A: string,
  B: string,
  C: string,
  D: string,
  ans: "A" | "B" | "C" | "D",
  exp: string,
  trap: string,
  time: number = 60
): SeedQuestion {
  const letters = ["A", "B", "C", "D"] as const;
  const dist: Record<string, string> = {};
  for (const l of letters) {
    if (l === ans) {
      dist[l] = `Correct. ${exp.slice(0, 80)}`;
    } else {
      dist[l] = `Incorrect. Common distractor based on: ${trap.slice(0, 60)}`;
    }
  }
  return {
    exam_name: exam,
    subject: sub,
    skill_domain: dom,
    difficulty_tier: 2,
    question_text: text,
    options: { A, B, C, D },
    correct_option: ans,
    explanation: exp,
    distractor_analysis: dist as any,
    misconception: trap,
    time_estimate_seconds: time,
  };
}

const patchQuestions: SeedQuestion[] = [
  // 1. SAT -> Algebra
  q(
    "SAT",
    "Math",
    "Algebra",
    "If $4(2x - 3) - 3(x + 1) = 2x + 9$, what is the value of $x$?",
    "$8$",
    "$6$",
    "$4$",
    "$10$",
    "A",
    "Expand both sides: $8x - 12 - 3x - 3 = 2x + 9 \\implies 5x - 15 = 2x + 9$. Subtract $2x$ and add $15$: $3x = 24 \\implies x = 8$.",
    "Distributing $-3$ as positive or miscombining like terms.",
    45
  ),

  // 2. SAT -> Problem-Solving and Data Analysis
  q(
    "SAT",
    "Math",
    "Problem-Solving and Data Analysis",
    "A retail store purchases an item for $80 and marks up the price by 40%. During a clearance sale, the store discounts the marked price by 25%. What is the final sale price of the item?",
    "$84.00",
    "$80.00",
    "$92.00",
    "$75.00",
    "A",
    "Marked price = $80 * (1 + 0.40) = $80 * 1.40 = $112. Sale price after 25% discount = $112 * (1 - 0.25) = $112 * 0.75 = $84.00.",
    "Applying net percentage (40% - 25% = +15% on $80 = $92) instead of sequential percentage compounding.",
    50
  ),

  // 3. SAT -> Geometry and Trigonometry
  q(
    "SAT",
    "Math",
    "Geometry and Trigonometry",
    "In a right triangle $ABC$ with right angle at $C$, the length of hypotenuse $AB$ is 13 and leg $BC$ is 5. What is the value of $\\cos(\\angle A)$?",
    "$12/13$",
    "$5/13$",
    "$5/12$",
    "$13/12$",
    "A",
    "By the Pythagorean theorem: $AC = \\sqrt{AB^2 - BC^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$. $\\cos(\\angle A) = \\text{adjacent} / \\text{hypotenuse} = AC / AB = 12/13$.",
    "Confusing cosine (adjacent/hypotenuse = 12/13) with sine (opposite/hypotenuse = 5/13).",
    45
  ),

  // 4. GRE -> Analyze an Issue
  q(
    "GRE",
    "Analytical Writing",
    "Analyze an Issue",
    "In an Analyze an Issue essay prompt addressing technological automation, which argument provides the most effective balanced critique of the claim that 'technological automation inevitably degrades human cognitive capacity'?",
    "Highlighting that while automation eliminates routine manual calculation, it reallocates human cognition toward higher-order synthesis and strategic problem-solving",
    "Rejecting the prompt completely by stating that all machines are inherently benevolent",
    "Listing the serial numbers of historical computing devices without analytical synthesis",
    "Asserting that human cognition has remained completely static since antiquity",
    "A",
    "High-scoring GRE issue essays acknowledge complexity: acknowledging the loss of specific manual rote skills while arguing that automation frees up cognitive capacity for systemic reasoning and creative innovation.",
    "Presenting an absolutist, one-sided essay that ignores counter-arguments.",
    55
  ),

  // 5. GMAT Focus -> Arithmetic
  q(
    "GMAT Focus",
    "Quantitative Reasoning",
    "Arithmetic",
    "If $n$ is an integer such that the remainder when $n$ is divided by 6 is 4, what is the remainder when $n^2 + 3n$ is divided by 6?",
    "$4$",
    "$2$",
    "$0$",
    "$5$",
    "A",
    "Let $n \\equiv 4 \\pmod 6$. Then $n^2 \\equiv 4^2 = 16 \\equiv 4 \\pmod 6$. $3n \\equiv 3(4) = 12 \\equiv 0 \\pmod 6$. Thus $n^2 + 3n \\equiv 4 + 0 = 4 \\pmod 6$. The remainder is 4.",
    "Arithmetic calculation errors when evaluating modular congruence.",
    50
  ),

  // 6. GMAT Focus -> Algebra
  q(
    "GMAT Focus",
    "Quantitative Reasoning",
    "Algebra",
    "If $x + \\frac{1}{x} = 4$, what is the value of $x^3 + \\frac{1}{x^3}$?",
    "$52$",
    "$64$",
    "$48$",
    "$58$",
    "A",
    "$(x + 1/x)^3 = x^3 + 3(x)(1/x)(x + 1/x) + 1/x^3 = x^3 + 1/x^3 + 3(x + 1/x)$. Substituting $x + 1/x = 4$: $4^3 = x^3 + 1/x^3 + 3(4) \\implies 64 = x^3 + 1/x^3 + 12 \\implies x^3 + 1/x^3 = 64 - 12 = 52$.",
    "Cubing 4 without subtracting the cross-product term $3(x + 1/x) = 12$ ($64$).",
    50
  ),

  // 7. GMAT Focus -> Multi-Source Reasoning
  q(
    "GMAT Focus",
    "Data Insights",
    "Multi-Source Reasoning",
    "Based on three corporate tabs (Tab 1: Shipping transit schedules, Tab 2: Port terminal handling fees, Tab 3: Customer delivery SLA penalties), which port terminal minimizes total net landed logistics cost for expedited 48-hour delivery?",
    "Terminal B, where higher direct berth handling fees are more than offset by avoiding customer SLA late penalties",
    "Terminal A, because its berth handling fee is lowest despite incurring SLA penalties",
    "Terminal C, because it has zero storage fees despite a 96-hour transit time",
    "Air freight transfer regardless of tabular cost data",
    "A",
    "Multi-source reasoning synthesizes cross-tabulated constraints: Terminal B avoids the massive $5,000 SLA breach penalty, resulting in lower total combined system cost.",
    "Evaluating only a single tab in isolation without summing joint penalty and transit costs.",
    60
  ),

  // 8. GMAT Focus -> Table Analysis
  q(
    "GMAT Focus",
    "Data Insights",
    "Table Analysis",
    "Given a sortable table of 20 regional sales branches showing Q1 Revenue, Q2 Revenue, and Operating Margin, if the table is sorted in ascending order of Percentage Revenue Growth from Q1 to Q2, which branch is listed at the median (10th) position?",
    "Branch East-04, with revenue growth of +14.2%",
    "Branch West-01, with absolute dollar revenue of $5.2M",
    "Branch South-09, with highest operating margin",
    "Branch North-12, with negative revenue growth",
    "A",
    "Sorting by percentage growth rate $\\frac{Q2 - Q1}{Q1}$ ranks branches from lowest (or most negative) to highest; Branch East-04 sits at the 10th median rank.",
    "Sorting by absolute dollar increase $(Q2 - Q1)$ instead of percentage growth rate.",
    55
  ),

  // 9. GMAT Focus -> Graphics Interpretation
  q(
    "GMAT Focus",
    "Data Insights",
    "Graphics Interpretation",
    "In a scatter plot displaying R&D expenditure as a percentage of revenue on the horizontal axis and Return on Equity (ROE) on the vertical axis across 30 semiconductor firms, the trend line has a slope of +1.8 and intercept of 4.2%. A firm investing 6% of revenue in R&D is predicted to have an ROE of:",
    "$15.0%$",
    "$12.6%$",
    "$10.8%$",
    "$18.2%$",
    "A",
    "$\\text{ROE} = 4.2% + 1.8 \\times 6% = 4.2% + 10.8% = 15.0%$.",
    "Multiplying slope without adding intercept (10.8%).",
    45
  ),

  // 10. GMAT Focus -> Two-Part Analysis
  q(
    "GMAT Focus",
    "Data Insights",
    "Two-Part Analysis",
    "A chemical plant mixes Solution X (30% acid) and Solution Y (70% acid) to create 100 liters of a 54% acid solution. How many liters of Solution X and Solution Y respectively must be blended?",
    "Solution X: 40 liters; Solution Y: 60 liters",
    "Solution X: 50 liters; Solution Y: 50 liters",
    "Solution X: 60 liters; Solution Y: 40 liters",
    "Solution X: 35 liters; Solution Y: 65 liters",
    "A",
    "Let $x$ be liters of X and $y = 100 - x$ be liters of Y. Acid balance: $0.30x + 0.70(100 - x) = 0.54(100) \\implies 0.30x + 70 - 0.70x = 54 \\implies -0.40x = -16 \\implies x = 40$ liters. $y = 100 - 40 = 60$ liters.",
    "Reversing the quantities of Solution X and Solution Y (60L of X, 40L of Y).",
    50
  ),

  // 11. CAT -> Grammar
  q(
    "CAT",
    "Verbal Ability & Reading Comprehension",
    "Grammar",
    "Which of the following sentences is grammatically correct and free of dangling modifiers or parallelism defects?",
    "Having completed the quarterly financial audit, the CFO submitted the finalized report to the board of directors.",
    "Having completed the quarterly financial audit, the report was submitted by the CFO to the board of directors.",
    "The CFO submitted the report, having completed the audit, to the board who were waiting.",
    "Completed by the CFO, the board of directors received the quarterly financial audit.",
    "A",
    "The participial phrase 'Having completed the quarterly financial audit' must be immediately followed by the subject who performed the action ('the CFO'). Option B dangles the modifier onto 'the report'.",
    "Selecting the passive construction containing a dangling modifier.",
    45
  ),
];

async function applyPatch() {
  console.log("=== Ingesting 11 targeted questions to eliminate threshold shortfalls ===");

  const { data: existingRows } = await supabase
    .from("question_bank")
    .select("exam_name, question_text");

  const existingSet = new Set(
    (existingRows || []).map((r) => `${r.exam_name}::${r.question_text.trim()}`)
  );

  const toInsert = patchQuestions.filter(
    (q) => !existingSet.has(`${q.exam_name}::${q.question_text.trim()}`)
  );

  console.log(`Inserting ${toInsert.length} questions...`);
  if (toInsert.length > 0) {
    const { error } = await supabase.from("question_bank").insert(toInsert);
    if (error) {
      console.error("Insert error:", error);
      process.exit(1);
    }
  }
  console.log("Patch successfully inserted into Supabase!");
}

applyPatch().catch(console.error);
