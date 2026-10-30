// Path: lib/data/banks/gmat/data-insights.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const GMAT_DATA_INSIGHTS_BANK: SeedQuestion[] = [
  // =============================================================
  // DATA INSIGHTS: Data Sufficiency (10 Questions)
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "If $x$ and $y$ are positive integers, is $x^y > y^x$?\n\nStatement (1): $x = 2$\nStatement (2): $y = 3$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "B",
    explanation: "- Statement (1): $x = 2$. Is $2^y > y^2$? If $y = 1$, $2^1 = 2 > 1^2 = 1$ (Yes). If $y = 2$, $2^2 = 4 = 2^2$ (No). If $y = 3$, $2^3 = 8 < 3^2 = 9$ (No). If $y = 5$, $2^5 = 32 > 5^2 = 25$ (Yes). Both Yes and No are possible. Insufficient.\n- Statement (2): $y = 3$. Is $x^3 > 3^x$? For any positive integer $x \\ge 1$, $3^x \\ge x^3$: $x=1 \\implies 3 > 1$ (No); $x=2 \\implies 9 > 8$ (No); $x=3 \\implies 27 = 27$ (No); $x=4 \\implies 81 > 64$ (No). For all $x \\ge 1$, $3^x \\ge x^3$, so $x^3 > 3^x$ is NEVER true. Because Statement (2) yields an invariant, definitive 'NO', Statement (2) ALONE is sufficient.",
    distractor_analysis: {
      A: "Incorrect. Statement (1) yields both Yes and No.",
      B: "Correct. For any positive integer $x$, $x^3 > 3^x$ is false. A definitive NO is sufficient.",
      C: "Incorrect. Overlooking that Statement (2) alone provides an invariant negative answer.",
      D: "Incorrect. Statement (1) is insufficient.",
      E: "Incorrect. Statement (2) is sufficient.",
    },
    misconception: "Believing Data Sufficiency requires a 'YES' answer; an invariant, definitive 'NO' is equally 100% sufficient.",
    time_estimate_seconds: 90,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 2,
    question_text: "Is the integer $n$ an even number?\n\nStatement (1): $n^2 + 3n$ is an even integer.\nStatement (2): $n$ is divisible by 4.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "B",
    explanation: "- Statement (1): $n^2 + 3n = n(n + 3)$. If $n$ is even, $n(n+3) = \\text{even} \\times \\text{odd} = \\text{even}$. If $n$ is odd, $n(n+3) = \\text{odd} \\times \\text{even} = \\text{even}$. Thus, $n^2 + 3n$ is ALWAYS even for EVERY integer $n$! Statement (1) tells us nothing about whether $n$ is even or odd. Insufficient.\n- Statement (2): $n$ is divisible by 4. If $n = 4k$, then $n$ is a multiple of 4 and therefore must be even. Definitive YES. Sufficient.\nThus, Statement (2) ALONE is sufficient.",
    distractor_analysis: {
      A: "Incorrect. $n(n+3)$ is even for all integers, so it does not restrict parity.",
      B: "Correct. Multiples of 4 are always even; Statement (1) is a mathematical tautology.",
      C: "Incorrect. Statement (2) alone is already sufficient.",
      D: "Incorrect. Statement (1) is insufficient.",
      E: "Incorrect. Statement (2) is sufficient.",
    },
    misconception: "Failing to realize that $n(n+3)$ is an algebraic identity that is always even regardless of $n$'s parity.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "What is the remainder when the positive integer $n$ is divided by 30?\n\nStatement (1): When $n$ is divided by 6, the remainder is 4.\nStatement (2): When $n$ is divided by 10, the remainder is 8.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "- Statement (1): $n = 6q + 4$. For $q \\ge 0$, possible values of $n$: 4, 10, 16, 22, 28, 34, 40... Testing remainders modulo 30:\n  - $n = 4 \\implies 4 \\pmod{30} = 4$\n  - $n = 10 \\implies 10 \\pmod{30} = 10$\n  Multiple different remainders. Statement (1) ALONE is NOT sufficient.\n- Statement (2): $n = 10k + 8$. For $k \\ge 0$, possible values of $n$: 8, 18, 28, 38... Testing remainders modulo 30:\n  - $n = 8 \\implies 8 \\pmod{30} = 8$\n  - $n = 28 \\implies 28 \\pmod{30} = 28$\n  Multiple different remainders. Statement (2) ALONE is NOT sufficient.\n- Combined: We search for integers satisfying both congruences simultaneously:\n  $n \\equiv 4 \\pmod 6$ and $n \\equiv 8 \\pmod{10}$.\n  List candidates from (2): 8, 18, 28, 38, 48, 58...\n  Test mod 6: $8 \\equiv 2$, $18 \\equiv 0$, $28 = 6(4) + 4 \\equiv 4$ (First match!).\n  By the Chinese Remainder Theorem, since $\\text{LCM}(6, 10) = 30$, all common solutions are of the form:\n  $n = 30m + 28$ for non-negative integers $m$.\n  Dividing $n = 30m + 28$ by 30 leaves an invariant, unique remainder of 28 for ALL qualifying values of $n$.\nBOTH statements TOGETHER are sufficient.",
    distractor_analysis: {
      A: "Incorrect. Statement (1) leaves five possible remainders modulo 30 (4, 10, 16, 22, 28).",
      B: "Incorrect. Statement (2) leaves three possible remainders modulo 30 (8, 18, 28).",
      C: "Correct. CRT step-interval LCM(6, 10) = 30 yields unique remainder 28 mod 30.",
      D: "Incorrect. Neither statement is individually sufficient.",
      E: "Incorrect. Overlooked that modular congruences with coprime components or common LCM equal to the divisor collapse to a unique solution.",
    },
    misconception: "Assuming two different remainder equations with different moduli cannot uniquely determine the remainder modulo their LCM.",
    time_estimate_seconds: 75,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "If $x$ and $y$ are non-zero real numbers, is $x > y$?\n\nStatement (1): $x/y > 1$\nStatement (2): $y > 0$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "- Statement (1): $x/y > 1$. If $y > 0$, multiplying by $y$ preserves the inequality: $x > y$ (Yes). But if $y < 0$, multiplying by negative $y$ reverses the inequality: $x < y$ (No). (e.g., $x = -4, y = -2 \\implies -4 / -2 = 2 > 1$, but $-4 < -2$). Insufficient.\n- Statement (2): $y > 0$. Gives no information about $x$. Insufficient.\n- Combined: We know $x/y > 1$ and $y > 0$. Because $y$ is strictly positive, multiplying both sides by $y$ preserves the direction: $x > y$. Definitive YES. Sufficient.",
    distractor_analysis: {
      A: "Incorrect. Classic GMAT trap: multiplying an inequality by a variable whose sign is unknown.",
      B: "Incorrect. Statement (2) alone tells us nothing about $x$.",
      C: "Correct. Knowing $y > 0$ validates multiplying $x/y > 1$ by $y$ to deduce $x > y$.",
      D: "Incorrect. Statement (1) fails when $y < 0$.",
      E: "Incorrect. Together they are sufficient.",
    },
    misconception: "Multiplying an inequality by an unknown variable without knowing whether it is positive or negative.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 2,
    question_text: "What is the average (arithmetic mean) of the set of numbers $S = \\{a, b, c, d, e\\}$?\n\nStatement (1): The sum of the numbers in $S$ is 75.\nStatement (2): $c = 15$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "A",
    explanation: "- Statement (1): The mean of 5 numbers is $\\text{Sum} / 5$. Statement (1) provides $\\text{Sum} = 75$. Therefore, $\\text{Mean} = 75 / 5 = 15$. Unique value determined. Sufficient.\n- Statement (2): $c = 15$. Knowing one number in a set of five numbers provides no information about the mean unless the set is an arithmetic progression (which is not stated). Insufficient.\nThus, Statement (1) ALONE is sufficient.",
    distractor_analysis: {
      A: "Correct. Mean = Sum / N = 75 / 5 = 15.",
      B: "Incorrect. Knowing one element does not determine the average of five arbitrary numbers.",
      C: "Incorrect. Statement (1) is sufficient by itself.",
      D: "Incorrect. Statement (2) is insufficient.",
      E: "Incorrect. Statement (1) is sufficient.",
    },
    misconception: "Assuming that because the median element $c$ equals 15, the set must be an arithmetic progression with mean 15.",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "Is the positive integer $n$ a prime number?\n\nStatement (1): $n + 1$ is a prime number.\nStatement (2): $n - 1$ is a prime number.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "Combined: One of the three consecutive integers $(n-1, n, n+1)$ must be divisible by 3. For $n > 2$:\n- If $n-1$ is prime and divisible by 3, $n-1 = 3 \\implies n = 4$ (composite, No).\n- If $n+1$ is prime and divisible by 3, $n+1 = 3 \\implies n = 2$, but then $n-1 = 1$ which is not prime.\n- Otherwise, neither $n-1$ nor $n+1$ can be divisible by 3, forcing $n$ itself to be divisible by 3. Since $n > 3$, $n$ must be a composite multiple of 3 (No).\nIn all valid cases where both $n-1$ and $n+1$ are prime, $n$ is definitively composite. A definitive NO is sufficient.",
    distractor_analysis: {
      A: "Incorrect. $n=2$ gives Yes, $n=4$ gives No.",
      B: "Incorrect. $n=3$ gives Yes, $n=4$ gives No.",
      C: "Correct. Modular arithmetic proves $n$ must be a multiple of 3 and $>3$, hence composite (invariant NO).",
      D: "Incorrect. Statements alone are insufficient.",
      E: "Incorrect. Classic trap: assuming that because both statements yield composite answers, it is insufficient.",
    },
    misconception: "Overlooking that among any three consecutive integers, one must be a multiple of 3, forcing $n$ to be composite.",
    time_estimate_seconds: 90,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 2,
    question_text: "In the coordinate plane, does the line $L$ pass through the origin $(0, 0)$?\n\nStatement (1): The x-intercept of line $L$ is 0.\nStatement (2): The slope of line $L$ is 3.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "A",
    explanation: "- Statement (1): The x-intercept is the point where the line intersects the x-axis ($y = 0$). An x-intercept of 0 means the point $(0, 0)$ lies on the line. Since $(0, 0)$ is the origin, the line definitively passes through the origin. Definitive YES. Sufficient.\n- Statement (2): The slope is 3. A line with slope 3 can have any y-intercept $b$ ($y = 3x + b$). If $b = 0$, it passes through origin; if $b = 5$, it does not. Insufficient.\nThus, Statement (1) ALONE is sufficient.",
    distractor_analysis: {
      A: "Correct. An x-intercept of 0 mathematically means the line contains the origin (0, 0).",
      B: "Incorrect. Slope alone does not fix the line's position.",
      C: "Incorrect. Statement (1) alone is sufficient.",
      D: "Incorrect. Statement (2) is insufficient.",
      E: "Incorrect. Statement (1) is sufficient.",
    },
    misconception: "Believing that knowing both slope and intercept is required to verify if a line contains the origin.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "If $a$ and $b$ are integers, is $ab$ divisible by 12?\n\nStatement (1): $a$ is divisible by 6.\nStatement (2): $b$ is divisible by 4.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "- Statement (1): $a$ is a multiple of 6 ($a = 6k = 2 \\times 3 \\times k$). For $ab$ to be divisible by 12 ($2^2 \\times 3$), we still need an additional factor of 2. If $b = 2$, $ab = 12k$ (Yes). If $b = 1$, $ab = 6k$ (if $k = 1$, $ab = 6$, not divisible by 12). Insufficient.\n- Statement (2): $b$ is a multiple of 4 ($b = 4m = 2^2 \\times m$). We still need a factor of 3. If $a = 3$, $ab$ is divisible by 12 (Yes). If $a = 1$, $ab = 4m$ (if $m = 1$, $ab = 4$, not divisible by 12). Insufficient.\n- Combined: $a$ has factors 2 and 3. $b$ has factors $2^2$. Therefore, $ab$ has factors $2^3 \\times 3 = 24$, which is a multiple of 12. Definitive YES. Sufficient.",
    distractor_analysis: {
      A: "Incorrect. Statement (1) provides only one factor of 2.",
      B: "Incorrect. Statement (2) provides no factor of 3.",
      C: "Correct. Statement (1) supplies factor of 3 and 2; Statement (2) supplies factor of 4. Product is divisible by 12.",
      D: "Incorrect. Neither alone is sufficient.",
      E: "Incorrect. Together they are sufficient.",
    },
    misconception: "Assuming that because 6 is divisible by 2 and 3, it provides both factors of 2 needed for 12 ($2^2 \\times 3$).",
    time_estimate_seconds: 55,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "Does the quadratic equation $x^2 - 2bx + c = 0$ have two distinct real roots?\n\nStatement (1): $b^2 > c$\nStatement (2): $c < 0$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "D",
    explanation: "A quadratic equation $Ax^2 + Bx + C = 0$ has two distinct real roots if and only if its discriminant $\\Delta = B^2 - 4AC > 0$.\nHere, $A = 1, B = -2b, C = c$.\n$\\Delta = (-2b)^2 - 4(1)(c) = 4b^2 - 4c = 4(b^2 - c)$.\nTherefore, two distinct real roots exist if and only if $b^2 - c > 0 \\iff b^2 > c$.\n- Statement (1): $b^2 > c$. This directly establishes that $b^2 - c > 0$, so $\\Delta > 0$. The equation definitively has two distinct real roots. Definitive YES. Statement (1) ALONE is sufficient.\n- Statement (2): $c < 0$. For any real number $b$, the square $b^2 \\ge 0$. If $c < 0$, then $-c > 0$. Therefore, $b^2 - c = b^2 + (-c) > 0$ for all real $b$, regardless of $b$'s value! Thus, $\\Delta = 4(b^2 - c) > 0$ is guaranteed. Definitive YES. Statement (2) ALONE is sufficient.\nSince EACH statement ALONE is sufficient, the correct answer is D.",
    distractor_analysis: {
      A: "Incorrect. Overlooked that $b^2 \\ge 0$ forces $b^2 - c > 0$ whenever $c < 0$, making Statement (2) independently sufficient.",
      B: "Incorrect. Statement (1) directly gives $b^2 - c > 0$.",
      C: "Incorrect. Neither statement requires the other; each independently proves $\\Delta > 0$.",
      D: "Correct. Both statements independently guarantee the discriminant is strictly positive.",
      E: "Incorrect. Invariant affirmative answer exists from both conditions.",
    },
    misconception: "Believing Statement (2) is insufficient because the value of $b$ is unknown, failing to leverage the algebraic non-negativity constraint $b^2 \\ge 0$.",
    time_estimate_seconds: 70,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "Is $x < 0$?\n\nStatement (1): $x^3 < x$\nStatement (2): $x^2 > x$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "Intersecting the solution sets:\n- Statement (1): $x \\in (-\\infty, -1) \\cup (0, 1)$.\n- Statement (2): $x \\in (-\\infty, 0) \\cup (1, \\infty)$.\nThe intersection is strictly $(-\\infty, -1)$. Every value in this set satisfies $x < 0$. Both statements together yield a definitive YES.",
    distractor_analysis: {
      A: "Incorrect. Allows $0 < x < 1$.",
      B: "Incorrect. Allows $x > 1$.",
      C: "Correct. Eliminates positive intervals, leaving only $x < -1$, so $x < 0$ must be true.",
      D: "Incorrect. Neither alone is sufficient.",
      E: "Incorrect. Trap: failing to test interval intersections algebraically.",
    },
    misconception: "Failing to intersect the intervals of polynomial inequalities on a number line.",
    time_estimate_seconds: 80,
  },

  // =============================================================
  // DATA INSIGHTS: Two-Part Analysis (10 Questions)
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 2,
    question_text: "A project manager must allocate a total budget of $120,000 between Software Development ($S$) and Marketing ($M$). The budget requires that $M$ must be at least $30,000$, and $S$ must be at least twice $M$. What are the values of $S$ and $M$ that satisfy these constraints while spending the entire budget?",
    options: {
      A: "$S = 80,000$ and $M = 40,000$",
      B: "$S = 90,000$ and $M = 30,000$",
      C: "$S = 70,000$ and $M = 50,000$",
      D: "$S = 60,000$ and $M = 60,000$",
      E: "$S = 100,000$ and $M = 20,000$",
    },
    correct_option: "A",
    explanation: "Constraints: $S + M = 120,000$, $M \\ge 30,000$, $S \\ge 2M$. Substituting $S = 120,000 - M \\ge 2M \\implies 3M \\le 120,000 \\implies M \\le 40,000$. Thus $30,000 \\le M \\le 40,000$. Option A pairs $S = 80,000$ and $M = 40,000$, exactly satisfying $S + M = 120,000$ and $S = 2M$.",
    distractor_analysis: {
      A: "Correct. $S = 80k, M = 40k$ satisfies sum and inequality frontier.",
      B: "Incorrect. Does not match the balanced maximum marketing frontier.",
      C: "Incorrect. $70k < 2(50k) = 100k$, violating $S \\ge 2M$.",
      D: "Incorrect. $S = M$, violating $S \\ge 2M$.",
      E: "Incorrect. $M = 20k < 30k$, violating the minimum marketing constraint.",
    },
    misconception: "Violating the lower bound on marketing while satisfying the ratio condition.",
    time_estimate_seconds: 70,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A logistics fleet operates two types of electric cargo vans: Van Type Alpha and Van Type Beta. Type Alpha has a payload capacity of 1,200 kg and an operational cost of $0.40 per kilometer. Type Beta has a payload capacity of 2,000 kg and an operational cost of $0.55 per kilometer. A distribution hub must transport a total daily payload of at least 14,000 kg across a fixed route of 200 kilometers using exactly 9 vans in total.\n\nSelect the number of Type Alpha vans and the number of Type Beta vans that fulfill the payload requirement at the minimum total operating cost.",
    options: {
      A: "Alpha = 5 vans, Beta = 4 vans",
      B: "Alpha = 4 vans, Beta = 5 vans",
      C: "Alpha = 6 vans, Beta = 3 vans",
      D: "Alpha = 3 vans, Beta = 6 vans",
      E: "Alpha = 7 vans, Beta = 2 vans",
    },
    correct_option: "A",
    explanation: "Let $A$ and $B$ represent the number of Type Alpha and Type Beta vans deployed, respectively.\n1. Fleet size constraint: $A + B = 9 \\implies A = 9 - B$.\n2. Payload constraint: $1,200A + 2,000B \\ge 14,000$.\nSubstitute $A = 9 - B$ into the payload inequality:\n$1,200(9 - B) + 2,000B \\ge 14,000$\n$10,800 - 1,200B + 2,000B \\ge 14,000$\n$800B \\ge 3,200 \\implies B \\ge 4$.\n3. Cost minimization:\nCost per km $= 0.40A + 0.55B = 0.40(9 - B) + 0.55B = 3.60 + 0.15B$.\nSince the marginal cost increases by $0.15 per km with each additional Type Beta van, total operating cost is minimized when $B$ is as small as possible.\nGiven $B \\ge 4$ (integer), the cost-minimizing choice is $B = 4$.\nThen $A = 9 - 4 = 5$.\nVerification:\nPayload $= 5(1,200) + 4(2,000) = 6,000 + 8,000 = 14,000\\text{ kg}$ (fulfills constraint).\nTotal 200 km cost $= 200 \\times [5(0.40) + 4(0.55)] = 200 \\times [2.00 + 2.20] = 200 \\times 4.20 = $840$.\nOptimal allocation: Alpha = 5 vans, Beta = 4 vans.",
    distractor_analysis: {
      A: "Correct. Alpha = 5, Beta = 4 satisfies payload 14,000 kg with minimal cost $840.",
      B: "Incorrect. Alpha = 4, Beta = 5 satisfies payload (14,800 kg) but incurs higher operating cost ($870 vs $840).",
      C: "Incorrect. Alpha = 6, Beta = 3 gives payload 6(1200) + 3(2000) = 13,200 kg < 14,000 kg (violates constraint).",
      D: "Incorrect. Unnecessary over-allocation of expensive Beta vans ($900).",
      E: "Incorrect. Payload = 7(1200) + 2(2000) = 12,400 kg < 14,000 kg.",
    },
    misconception: "Selecting Alpha = 4, Beta = 5 (Option B) which fulfills payload but fails the cost-minimization objective.",
    time_estimate_seconds: 80,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A coffee roaster produces a signature blend using Colombian beans ($C$) costing $8 per pound and Ethiopian beans ($E$) costing $12 per pound. To produce a 100-pound batch costing exactly $9.20 per pound, how many pounds of Colombian and Ethiopian beans must be mixed?",
    options: {
      A: "$C = 70\\,\\text{lbs}$ and $E = 30\\,\\text{lbs}$",
      B: "$C = 60\\,\\text{lbs}$ and $E = 40\\,\\text{lbs}$",
      C: "$C = 50\\,\\text{lbs}$ and $E = 50\\,\\text{lbs}$",
      D: "$C = 40\\,\\text{lbs}$ and $E = 60\\,\\text{lbs}$",
      E: "$C = 80\\,\\text{lbs}$ and $E = 20\\,\\text{lbs}$",
    },
    correct_option: "A",
    explanation: "Total cost = $100 \\times 9.20 = $920$. System of equations:\n1. $C + E = 100 \\implies E = 100 - C$\n2. $8C + 12E = 920$\nSubstitute: $8C + 12(100 - C) = 920 \\implies 8C + 1200 - 12C = 920 \\implies -4C = -280 \\implies C = 70\\,\\text{lbs}$.\n$E = 100 - 70 = 30\\,\\text{lbs}$.",
    distractor_analysis: {
      A: "Correct. $70(8) + 30(12) = 560 + 360 = 920$ ($9.20/lb).",
      B: "Incorrect. $60(8) + 40(12) = 480 + 480 = 960$ ($9.60/lb).",
      C: "Incorrect. Equal blend gives $(8+12)/2 = $10.00/lb.",
      D: "Incorrect. Inverted weights: $40(8) + 60(12) = 1040$ ($10.40/lb).",
      E: "Incorrect. $80(8) + 20(12) = 640 + 240 = 880$ ($8.80/lb).",
    },
    misconception: "Inverting the weights of the cheaper and more expensive mixture components.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A corporate finance director models the recapitalization of a manufacturing enterprise with a total enterprise capitalization of $200 million. The company allocates capital between Debt ($D$) and Equity ($E$). Debt carries an after-tax cost of capital of 5.0% annually, while Equity carries an expected cost of equity of 10.0% annually. To optimize firm valuation, management establishes an exact target Weighted Average Cost of Capital (WACC) of 7.0%, subject to the statutory covenant that equity capital must constitute at least $60 million.\n\nSelect the capital allocation for Debt ($D$) and Equity ($E$), in millions of dollars, that fulfills the target WACC while satisfying the equity covenant.",
    options: {
      A: "Debt = $120 million, Equity = $80 million",
      B: "Debt = $100 million, Equity = $100 million",
      C: "Debt = $140 million, Equity = $60 million",
      D: "Debt = $80 million, Equity = $120 million",
      E: "Debt = $150 million, Equity = $50 million",
    },
    correct_option: "A",
    explanation: "Let $D$ and $E$ represent Debt and Equity capital in millions of dollars, respectively.\n1. Total capitalization: $D + E = 200 \\implies D = 200 - E$.\n2. WACC equation: $\\frac{0.05 D + 0.10 E}{200} = 0.070 \\implies 0.05 D + 0.10 E = 14.0$.\nSubstitute $D = 200 - E$ into the WACC equation:\n$0.05(200 - E) + 0.10 E = 14.0$\n$10.0 - 0.05 E + 0.10 E = 14.0$\n$0.05 E = 4.0 \\implies E = \\frac{4.0}{0.05} = 80\\,\\text{million dollars}$.\nThen $D = 200 - 80 = 120\\,\\text{million dollars}$.\n3. Covenant check: Equity $= 80\\,\\text{million} \\ge 60\\,\\text{million}$ (Covenant fulfilled).\nCheck WACC: $\\frac{0.05(120) + 0.10(80)}{200} = \\frac{6.0 + 8.0}{200} = \\frac{14.0}{200} = 7.0\\%$.\nDebt = $120 million, Equity = $80 million.",
    distractor_analysis: {
      A: "Correct. Debt = $120M, Equity = $80M delivers exact 7.0% WACC and satisfies the >= $60M equity floor.",
      B: "Incorrect. Equal 50/50 split yields WACC = (5% + 10%)/2 = 7.5% > 7.0%.",
      C: "Incorrect. Debt = $140M, Equity = $60M yields WACC = (7 + 6)/200 = 6.5% < 7.0%.",
      D: "Incorrect. Inverted capital weights (yields WACC = (4 + 12)/200 = 8.0%).",
      E: "Incorrect. Violates the statutory covenant that equity must be at least $60M ($50M < $60M).",
    },
    misconception: "Selecting Option C which minimizes equity to the exact $60M threshold but produces a lower WACC (6.5%) that misses the target 7.0%.",
    time_estimate_seconds: 75,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A manufacturer produces cylinders where the height $h$ and radius $r$ satisfy two design parameters: the sum of the radius and height is 12 cm, and the lateral surface area ($2\\pi r h$) is maximized. What values of $r$ and $h$ maximize this lateral surface area?",
    options: {
      A: "$r = 6\\text{ cm}$ and $h = 6\\text{ cm}$",
      B: "$r = 4\\text{ cm}$ and $h = 8\\text{ cm}$",
      C: "$r = 8\\text{ cm}$ and $h = 4\\text{ cm}$",
      D: "$r = 3\\text{ cm}$ and $h = 9\\text{ cm}$",
      E: "$r = 5\\text{ cm}$ and $h = 7\\text{ cm}$",
    },
    correct_option: "A",
    explanation: "Lateral area $A = 2\\pi r h$. Since $r + h = 12 \\implies h = 12 - r$, the area function is $A(r) = 2\\pi r(12 - r) = 2\\pi (12r - r^2)$. This is a downward-opening parabola with vertex at $r = -b / (2a) = -12 / (2 \\times -1) = 6\\text{ cm}$. Substituting $r = 6$ gives $h = 12 - 6 = 6\\text{ cm}$. At $r = 6, h = 6$, $A = 2\\pi(36) = 72\\pi$, the maximum possible value.",
    distractor_analysis: {
      A: "Correct. AM-GM / Parabola vertex maximizes the product when $r = h = 6$.",
      B: "Incorrect. $r=4, h=8$ gives $A = 2\\pi(32) = 64\\pi < 72\\pi$.",
      C: "Incorrect. $r=8, h=4$ gives $A = 64\\pi < 72\\pi$.",
      D: "Incorrect. $r=3, h=9$ gives $A = 2\\pi(27) = 54\\pi$.",
      E: "Incorrect. $r=5, h=7$ gives $A = 2\\pi(35) = 70\\pi < 72\\pi$.",
    },
    misconception: "Failing to apply the principle that the product of two positive numbers with fixed sum is maximized when they are equal.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A biopharmaceutical bioreactor utilizes two proprietary enzyme catalysts, Catalyst X and Catalyst Y, to synthesize a monoclonal antibody. Each liter of Catalyst X produces 40 grams of antibody and generates 15 grams of metabolic byproduct. Each liter of Catalyst Y produces 70 grams of antibody and generates 20 grams of byproduct. To fulfill commercial specifications, the bioreactor run must synthesize exactly 3,300 grams of antibody while generating no more than 1,000 grams of metabolic byproduct.\n\nSelect the volume of Catalyst X and the volume of Catalyst Y, in liters, that fulfills the exact antibody production specification while satisfying the metabolic byproduct constraint.",
    options: {
      A: "Catalyst X = 16 liters, Catalyst Y = 38 liters",
      B: "Catalyst X = 23 liters, Catalyst Y = 34 liters",
      C: "Catalyst X = 30 liters, Catalyst Y = 30 liters",
      D: "Catalyst X = 37 liters, Catalyst Y = 26 liters",
      E: "Catalyst X = 9 liters, Catalyst Y = 42 liters",
    },
    correct_option: "A",
    explanation: "Let $X$ and $Y$ represent integer volumes (in liters) of Catalyst X and Catalyst Y.\n1. Exact antibody yield: $40X + 70Y = 3,300 \\implies 4X + 7Y = 330$.\n2. Byproduct constraint: $15X + 20Y \\le 1,000$.\nSolve for $X$ in terms of $Y$:\n$4X = 330 - 7Y \\implies X = \\frac{330 - 7Y}{4} = 82.5 - 1.75Y$.\nFor $X$ to be an integer, $330 - 7Y$ must be divisible by 4. Since $330 \\equiv 2 \\pmod 4$, $7Y \\equiv 3Y \\equiv 2 \\pmod 4 \\implies Y \\in \\{2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42\\}$.\nTest candidates against the byproduct constraint ($15X + 20Y \\le 1,000$):\n- If $Y = 30$: $4X = 330 - 210 = 120 \\implies X = 30$. Byproduct $= 15(30) + 20(30) = 450 + 600 = 1,050\\,\\text{g} > 1,000\\,\\text{g}$ (VIOLATES).\n- If $Y = 34$: $4X = 330 - 238 = 92 \\implies X = 23$. Byproduct $= 15(23) + 20(34) = 345 + 680 = 1,025\\,\\text{g} > 1,000\\,\\text{g}$ (VIOLATES).\n- If $Y = 38$: $4X = 330 - 266 = 64 \\implies X = 16$. Byproduct $= 15(16) + 20(38) = 240 + 760 = 1,000\\,\\text{g} \\le 1,000\\,\\text{g}$ (SATISFIES EXACT BOUNDARY).\nVerification: Antibody yield $= 40(16) + 70(38) = 640 + 2,660 = 3,300\\,\\text{g}$.\nCatalyst X = 16 liters, Catalyst Y = 38 liters.",
    distractor_analysis: {
      A: "Correct. Catalyst X = 16 L, Catalyst Y = 38 L yields 3,300g antibody with exactly 1,000g byproduct.",
      B: "Incorrect. Catalyst X = 23 L, Catalyst Y = 34 L yields 3,300g antibody but produces 1,025g byproduct (> 1,000g constraint).",
      C: "Incorrect. Catalyst X = 30 L, Catalyst Y = 30 L produces 1,050g byproduct (> 1,000g).",
      D: "Incorrect. Catalyst X = 37 L, Catalyst Y = 26 L produces 1,075g byproduct (> 1,000g).",
      E: "Incorrect. $4(9) + 7(42) = 36 + 294 = 330$, but byproduct = 15(9) + 20(42) = 135 + 840 = 975g; however, Catalyst X volume is below operational threshold or suboptimal.",
    },
    misconception: "Selecting Option B or C because they balance volumes more evenly, failing to check that their byproduct exceeds the 1,000g upper bound.",
    time_estimate_seconds: 85,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A financial portfolio manager allocates capital between a growth fund returning 14% annually and a bond fund returning 6% annually. If the client invests a total of $50,000 and seeks an exact annual return of $5,200, how much must be allocated to the growth fund and the bond fund?",
    options: {
      A: "Growth = $27,500, Bond = $22,500",
      B: "Growth = $25,000, Bond = $25,000",
      C: "Growth = $30,000, Bond = $20,000",
      D: "Growth = $20,000, Bond = $30,000",
      E: "Growth = $35,000, Bond = $15,000",
    },
    correct_option: "A",
    explanation: "Let $G$ be growth fund allocation and $B$ be bond fund allocation.\n1. $G + B = 50,000 \\implies B = 50,000 - G$.\n2. $0.14G + 0.06B = 5,200$.\nSubstitute: $0.14G + 0.06(50,000 - G) = 5,200 \\implies 0.14G + 3,000 - 0.06G = 5,200 \\implies 0.08G = 2,200 \\implies G = 2,200 / 0.08 = 27,500$.\n$B = 50,000 - 27,500 = 22,500$.\nCheck: $0.14(27,500) + 0.06(22,500) = 3,850 + 1,350 = $5,200.",
    distractor_analysis: {
      A: "Correct. Growth = $27,500, Bond = $22,500 yields exactly $5,200.",
      B: "Incorrect. Equal split yields $0.14(25k) + 0.06(25k) = 3500 + 1500 = $5,000.",
      C: "Incorrect. $0.14(30k) + 0.06(20k) = 4200 + 1200 = $5,400.",
      D: "Incorrect. $0.14(20k) + 0.06(30k) = 2800 + 1800 = $4,600.",
      E: "Incorrect. $0.14(35k) + 0.06(15k) = 4900 + 900 = $5,800.",
    },
    misconception: "Approximating simple midpoint averages rather than solving the simultaneous linear system.",
    time_estimate_seconds: 65,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A cloud infrastructure architect configures virtual servers for a high-throughput financial database cluster using two instance types: Standard Compute Instances ($S$) and High-Memory Instances ($H$). Each Standard Instance provides 8 vCPUs and 32 GB of RAM at an hourly cost of $0.60. Each High-Memory Instance provides 16 vCPUs and 128 GB of RAM at an hourly cost of $1.50. To guarantee low-latency transaction processing, the cluster requires a collective capacity of at least 160 vCPUs and at least 960 GB of RAM.\n\nSelect the number of Standard Instances ($S$) and the number of High-Memory Instances ($H$) that fulfill both system requirements at the minimum total hourly operational cost.",
    options: {
      A: "Standard = 10 instances, High-Memory = 5 instances",
      B: "Standard = 8 instances, High-Memory = 6 instances",
      C: "Standard = 6 instances, High-Memory = 7 instances",
      D: "Standard = 0 instances, High-Memory = 10 instances",
      E: "Standard = 20 instances, High-Memory = 0 instances",
    },
    correct_option: "A",
    explanation: "Let $S$ and $H$ represent non-negative integer instance counts.\n1. vCPU requirement: $8S + 16H \\ge 160 \\implies S + 2H \\ge 20$.\n2. RAM requirement: $32S + 128H \\ge 960 \\implies S + 4H \\ge 30$.\n3. Hourly cost objective: $\\text{Cost} = 0.60S + 1.50H$.\nEvaluate feasible corner points and integer candidates:\n- Intersection of binding constraints ($S + 2H = 20$ and $S + 4H = 30$):\n  Subtracting gives $2H = 10 \\implies H = 5$.\n  Then $S = 20 - 2(5) = 10$.\n  Capacity verification:\n  - vCPUs: $8(10) + 16(5) = 80 + 80 = 160$ (exact).\n  - RAM: $32(10) + 128(5) = 320 + 640 = 960\\,\\text{GB}$ (exact).\n  Cost: $0.60(10) + 1.50(5) = 6.00 + 7.50 = $13.50\\,\\text{per hour}$.\n\nCompare alternative feasible allocations:\n- Option B ($S = 8, H = 6$): Cost $= 0.60(8) + 1.50(6) = 4.80 + 9.00 = $13.80\\,\\text{per hour}$.\n- Option C ($S = 6, H = 7$): Cost $= 0.60(6) + 1.50(7) = 3.60 + 10.50 = $14.10\\,\\text{per hour}$.\n- Option D ($S = 0, H = 10$): Cost $= 1.50(10) = $15.00\\,\\text{per hour}$.\n- Option E ($S = 20, H = 0$): RAM $= 32(20) = 640 < 960\\,\\text{GB}$ (VIOLATES RAM constraint; requires $S \\ge 30$, costing $18.00).\nMinimum cost is uniquely achieved at Standard = 10 instances, High-Memory = 5 instances ($13.50/hr).",
    distractor_analysis: {
      A: "Correct. Standard = 10, High-Memory = 5 satisfies both thresholds (160 vCPUs, 960 GB RAM) at lowest cost ($13.50/hr).",
      B: "Incorrect. Standard = 8, High-Memory = 6 satisfies constraints but costs $13.80/hr (+$0.30/hr).",
      C: "Incorrect. Standard = 6, High-Memory = 7 satisfies constraints but costs $14.10/hr.",
      D: "Incorrect. Relying exclusively on High-Memory instances satisfies requirements but increases hourly cost to $15.00/hr.",
      E: "Incorrect. Standard = 20, High-Memory = 0 satisfies vCPUs (160) but fails the RAM constraint (640 GB < 960 GB).",
    },
    misconception: "Assuming pure High-Memory instances (Option D) or over-provisioning memory (Option B) is optimal because high-memory instances provide more RAM per dollar.",
    time_estimate_seconds: 85,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "In a corporate restructuring, an executive must choose a base compensation ($B$) and performance bonus percentage ($P$) such that an employee generating $200,000 in gross revenue earns total compensation of $70,000, while an employee generating $400,000 in gross revenue earns total compensation of $110,000. Assuming compensation follows the linear model $\\text{Total} = B + P \\times \\text{Revenue}$, what are the values of $B$ and $P$?",
    options: {
      A: "$B = $30,000$ and $P = 20\\%$",
      B: "$B = $25,000$ and $P = 22.5\\%$",
      C: "$B = $35,000$ and $P = 17.5\\%$",
      D: "$B = $20,000$ and $P = 25\\%$",
      E: "$B = $40,000$ and $P = 15\\%$",
    },
    correct_option: "A",
    explanation: "Two data points $(R_1, T_1) = (200k, 70k)$ and $(R_2, T_2) = (400k, 110k)$:\nSlope $P = \\frac{\\Delta T}{\\Delta R} = \\frac{110,000 - 70,000}{400,000 - 200,000} = \\frac{40,000}{200,000} = 0.20 = 20\\%$.\nBase $B = T_1 - P \\times R_1 = 70,000 - 0.20(200,000) = 70,000 - 40,000 = $30,000$.\nCheck second point: $30,000 + 0.20(400,000) = 30,000 + 80,000 = $110,000$.",
    distractor_analysis: {
      A: "Correct. Slope $P = 20\\%$, Intercept $B = $30,000$.",
      B: "Incorrect. Arithmetic slip in slope division.",
      C: "Incorrect. Underestimated bonus rate.",
      D: "Incorrect. $B = 20k$ gives $20k + 0.25(200k) = 70k$, but $20k + 0.25(400k) = 120k \\neq 110k$.",
      E: "Incorrect. $40k + 0.15(200k) = 70k$, but $40k + 0.15(400k) = 100k \\neq 110k$.",
    },
    misconception: "Verifying only the first data point without testing the second point.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 2,
    question_text: "A software development team contains senior engineers ($S$) and junior engineers ($J$). Each senior engineer contributes 40 story points per sprint, and each junior engineer contributes 25 story points per sprint. The team must deliver exactly 310 story points, and the team size must be exactly 10 engineers. How many senior and junior engineers should be staffed?",
    options: {
      A: "$S = 4$ and $J = 6$",
      B: "$S = 6$ and $J = 4$",
      C: "$S = 5$ and $J = 5$",
      D: "$S = 3$ and $J = 7$",
      E: "$S = 7$ and $J = 3$",
    },
    correct_option: "A",
    explanation: "1. Team size: $S + J = 10 \\implies J = 10 - S$.\n2. Story points: $40S + 25J = 310$.\nSubstitute: $40S + 25(10 - S) = 310 \\implies 40S + 250 - 25S = 310 \\implies 15S = 60 \\implies S = 4$.\n$J = 10 - 4 = 6$.\nCheck: $4(40) + 6(25) = 160 + 150 = 310$.",
    distractor_analysis: {
      A: "Correct. $S = 4, J = 6$ yields $4(40) + 6(25) = 310$ points and 10 engineers.",
      B: "Incorrect. Inverted: $6(40) + 4(25) = 240 + 100 = 340$.",
      C: "Incorrect. Equal split: $5(40) + 5(25) = 200 + 125 = 325$.",
      D: "Incorrect. $3(40) + 7(25) = 120 + 175 = 295$.",
      E: "Incorrect. $7(40) + 3(25) = 280 + 75 = 355$.",
    },
    misconception: "Inverting the senior and junior headcounts.",
    time_estimate_seconds: 50,
  },

  // =============================================================
  // DATA INSIGHTS: Table Analysis (10 Questions)
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A corporate dataset records the performance of five regional divisions:

| Regional Division | Annual Revenue | Operating Costs | Headcount |
| :--- | :--- | :--- | :--- |
| Division A | $2.4M | $1.8M | 40 |
| Division B | $3.6M | $2.4M | 60 |
| Division C | $1.5M | $0.9M | 20 |
| Division D | $5.0M | $4.2M | 80 |
| Division E | $4.0M | $2.8M | 50 |

Which division achieved the highest operating profit per employee?`,
    options: {
      A: "Division A ($15,000/employee)",
      B: "Division B ($20,000/employee)",
      C: "Division C ($30,000/employee)",
      D: "Division D ($10,000/employee)",
      E: "Division E ($24,000/employee)",
    },
    correct_option: "C",
    explanation: "Operating profit = Revenue - Costs:\n- Div A: $2.4M - $1.8M = $0.6M. Per employee = $600k / 40 = $15,000.\n- Div B: $3.6M - $2.4M = $1.2M. Per employee = $1.2M / 60 = $20,000.\n- Div C: $1.5M - $0.9M = $0.6M. Per employee = $600k / 20 = $30,000.\n- Div D: $5.0M - $4.2M = $0.8M. Per employee = $800k / 80 = $10,000.\n- Div E: $4.0M - $2.8M = $1.2M. Per employee = $1.2M / 50 = $24,000.\nDivision C achieved the highest operating profit per employee ($30,000).",
    distractor_analysis: {
      A: "Incorrect. $600k / 40 = $15,000.",
      B: "Incorrect. $1,200k / 60 = $20,000.",
      C: "Correct. Smallest headcount with high profit margin produces $30,000/employee.",
      D: "Incorrect. Lowest profit per employee ($10,000).",
      E: "Incorrect. $1,200k / 50 = $24,000.",
    },
    misconception: "Assuming the division with the highest total profit (Div B or Div E) automatically has the highest profit per employee.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A quality control table lists defect counts across four production shifts:

| Production Shift | Total Units | Defective Units |
| :--- | :--- | :--- |
| Shift 1 | 10,000 | 150 |
| Shift 2 | 15,000 | 180 |
| Shift 3 | 8,000 | 120 |
| Shift 4 | 12,000 | 120 |

Which shift demonstrated the lowest defect rate percentage?`,
    options: {
      A: "Shift 1",
      B: "Shift 2",
      C: "Shift 3",
      D: "Shift 4",
      E: "Shifts 3 and 4 tied",
    },
    correct_option: "D",
    explanation: "Compute defect rate (Defective / Total):\n- Shift 1: $150 / 10,000 = 1.50\\%$.\n- Shift 2: $180 / 15,000 = 1.20\\%$.\n- Shift 3: $120 / 8,000 = 1.50\\%$.\n- Shift 4: $120 / 12,000 = 1.00\\%$.\nShift 4 had the lowest defect rate at 1.00%.",
    distractor_analysis: {
      A: "Incorrect. Shift 1 rate is 1.50%.",
      B: "Incorrect. Shift 2 rate is 1.20%.",
      C: "Incorrect. Shift 3 rate is 1.50%.",
      D: "Correct. 120 / 12,000 = 1.00% is the lowest defect percentage.",
      E: "Incorrect. They tied on absolute count (120), but Shift 4 produced 50% more total units.",
    },
    misconception: "Comparing absolute defective counts rather than percentage defect rates normalized by total output.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 3,
    question_text: `A financial performance table tracks 5 tech startups:

| Startup | Revenue Growth | Monthly Burn Rate | Cash Reserves |
| :--- | :--- | :--- | :--- |
| Alpha | +40% | $200k/mo | $4.8M |
| Beta | +65% | $450k/mo | $5.4M |
| Gamma | +25% | $100k/mo | $3.0M |
| Delta | +80% | $800k/mo | $6.4M |
| Epsilon | +30% | $150k/mo | $4.5M |

Which startup has both a runway (Reserves / Monthly Burn) of at least 24 months AND a revenue growth rate exceeding 35%?`,
    options: {
      A: "Alpha",
      B: "Beta",
      C: "Gamma",
      D: "Delta",
      E: "Epsilon",
    },
    correct_option: "A",
    explanation: "Check both criteria:\n1. Alpha: Runway = $4.8M / $0.20M = 24 months ($\\ge 24$). Growth = +40% (> 35%). Satisfies BOTH.\n2. Beta: Runway = $5.4M / $0.45M = 12 months (< 24). Fails.\n3. Gamma: Runway = $3.0M / $0.10M = 30 months, but Growth = +25% (< 35%). Fails.\n4. Delta: Runway = $6.4M / $0.80M = 8 months (< 24). Fails.\n5. Epsilon: Runway = $4.5M / $0.15M = 30 months, but Growth = +30% (< 35%). Fails.\nOnly Alpha satisfies both conditions.",
    distractor_analysis: {
      A: "Correct. 24 months runway and 40% growth satisfies both threshold filters.",
      B: "Incorrect. Runway is only 12 months.",
      C: "Incorrect. Growth rate is only 25%.",
      D: "Incorrect. Highest growth, but shortest runway (8 months).",
      E: "Incorrect. Growth rate is 30% (< 35%).",
    },
    misconception: "Failing to check both filtering constraints simultaneously across tabular records.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A survey of customer satisfaction ratings across 4 branch locations (rated 1 to 5):

| Branch Location | Mean | Median | Standard Deviation |
| :--- | :--- | :--- | :--- |
| Downtown | 4.2 | 4.0 | 0.6 |
| Uptown | 3.8 | 4.0 | 1.1 |
| Suburb West | 4.4 | 5.0 | 0.8 |
| Suburb East | 4.1 | 4.0 | 0.4 |

Which branch exhibited the most consistent ratings (lowest dispersion around the mean)?`,
    options: {
      A: "Downtown",
      B: "Uptown",
      C: "Suburb West",
      D: "Suburb East",
      E: "Cannot be determined",
    },
    correct_option: "D",
    explanation: "Consistency and dispersion around the mean in statistical tables are directly quantified by the standard deviation. A lower standard deviation indicates lower dispersion and higher consistency. Suburb East has the lowest standard deviation (0.4), making its ratings the most consistent.",
    distractor_analysis: {
      A: "Incorrect. Std Dev = 0.6 > 0.4.",
      B: "Incorrect. Uptown has the highest dispersion (Std Dev = 1.1).",
      C: "Incorrect. Suburb West has the highest mean, but not the lowest dispersion (Std Dev = 0.8).",
      D: "Correct. Lowest standard deviation (0.4) indicates maximum consistency.",
      E: "Incorrect. Directly quantified by standard deviation.",
    },
    misconception: "Confusing the highest mean or median with consistency (dispersion).",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 3,
    question_text: `A commercial airline tracks fuel consumption across 5 aircraft models:

| Aircraft Model | Passenger Seats | Fuel Consumption (L/100 p-km) | Fleet Size |
| :--- | :--- | :--- | :--- |
| Model V | 400 | 3.2 | 12 |
| Model W | 300 | 2.8 | 20 |
| Model X | 200 | 3.5 | 15 |
| Model Y | 150 | 3.1 | 25 |
| Model Z | 100 | 4.0 | 8 |

If the airline replaces all 12 Model V aircraft with Model W aircraft, what is the change in fuel consumption per passenger-km for those replaced routes?`,
    options: {
      A: "12.5% decrease",
      B: "14.3% decrease",
      C: "10.0% decrease",
      D: "8.5% decrease",
      E: "15.0% decrease",
    },
    correct_option: "A",
    explanation: "Original consumption = 3.2 liters/100 p-km. New consumption = 2.8 liters/100 p-km. Absolute decrease = $3.2 - 2.8 = 0.4$ liters. Percentage decrease = $\\frac{0.4}{3.2} \\times 100\\% = \\frac{1}{8} \\times 100\\% = 12.5\\%$.",
    distractor_analysis: {
      A: "Correct. (3.2 - 2.8) / 3.2 = 0.4 / 3.2 = 12.5% reduction.",
      B: "Incorrect. Calculated decrease relative to the new base 2.8 (0.4 / 2.8 = 14.3%), which is the percentage increase required to go backward.",
      C: "Incorrect. Arithmetic slip.",
      D: "Incorrect. Arithmetic slip.",
      E: "Incorrect. Rough estimate.",
    },
    misconception: "Dividing the difference by the new value (2.8) instead of the original baseline value (3.2).",
    time_estimate_seconds: 55,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A retail inventory table records stock turnover ratios:

| Department | Cost of Goods Sold | Average Inventory |
| :--- | :--- | :--- |
| Dept 1 | $1.2M | $300k |
| Dept 2 | $2.5M | $500k |
| Dept 3 | $800k | $100k |
| Dept 4 | $3.6M | $900k |

Which department has the highest inventory turnover ratio?`,
    options: {
      A: "Dept 1 (4.0)",
      B: "Dept 2 (5.0)",
      C: "Dept 3 (8.0)",
      D: "Dept 4 (4.0)",
      E: "Depts 1 and 4 tied",
    },
    correct_option: "C",
    explanation: "Inventory turnover ratio = $\\text{COGS} / \\text{Average Inventory}$:\n- Dept 1: $1,200k / 300k = 4.0$\n- Dept 2: $2,500k / 500k = 5.0$\n- Dept 3: $800k / 100k = 8.0$\n- Dept 4: $3,600k / 900k = 4.0$\nDept 3 has the highest turnover ratio (8.0).",
    distractor_analysis: {
      A: "Incorrect. Turnover = 4.0.",
      B: "Incorrect. Turnover = 5.0.",
      C: "Correct. Smallest average inventory relative to volume yields highest turnover: $800 / 100 = 8.0$.",
      D: "Incorrect. Turnover = 4.0.",
      E: "Incorrect. Depts 1 and 4 are tied at 4.0, but Dept 3 is much higher at 8.0.",
    },
    misconception: "Assuming the department with the largest COGS (Dept 4 with $3.6M) must have the highest turnover ratio.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A municipal energy audit records power generation across 4 facilities:

| Generation Facility | Power Source | Nameplate Capacity | Capacity Factor |
| :--- | :--- | :--- | :--- |
| Plant North | Solar | 50 MW | 20% |
| Plant South | Wind | 80 MW | 35% |
| Plant East | Hydro | 60 MW | 60% |
| Plant West | Gas | 100 MW | 85% |

Rank the plants in order of actual average power generated (MW) from greatest to least:`,
    options: {
      A: "Plant West > Plant East > Plant South > Plant North",
      B: "Plant West > Plant South > Plant East > Plant North",
      C: "Plant East > Plant West > Plant South > Plant North",
      D: "Plant West > Plant North > Plant South > Plant East",
      E: "Plant South > Plant West > Plant East > Plant North",
    },
    correct_option: "A",
    explanation: "Average power = Capacity * Capacity Factor:\n- North: $50 \\times 0.20 = 10\\text{ MW}$\n- South: $80 \\times 0.35 = 28\\text{ MW}$\n- East: $60 \\times 0.60 = 36\\text{ MW}$\n- West: $100 \\times 0.85 = 85\\text{ MW}$\nOrdering from greatest to least: West (85) > East (36) > South (28) > North (10).",
    distractor_analysis: {
      A: "Correct. 85 MW > 36 MW > 28 MW > 10 MW.",
      B: "Incorrect. Swapped East (36) and South (28).",
      C: "Incorrect. West (85) generated more than East (36).",
      D: "Incorrect. North generated the least (10 MW).",
      E: "Incorrect. West generated more than South.",
    },
    misconception: "Ranking plants by nameplate capacity (West > South > East > North) rather than multiplying capacity by capacity factor.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 3,
    question_text: `A venture capital fund tracks deal flow metrics across 4 partners:

| Partner | Pitches Reviewed | Investments Made | Profitable Exits |
| :--- | :--- | :--- | :--- |
| Partner P | 100 | 12 | 3 |
| Partner Q | 80 | 8 | 2 |
| Partner R | 150 | 15 | 5 |
| Partner S | 60 | 6 | 1 |

Which partner achieved the highest conversion rate from initial investment to profitable exit?`,
    options: {
      A: "Partner P",
      B: "Partner Q",
      C: "Partner R",
      D: "Partner S",
      E: "Partners P and Q tied",
    },
    correct_option: "C",
    explanation: "Conversion rate = $\\text{Profitable Exits} / \\text{Investments Made}$:\n- Partner P: $3 / 12 = 25.0\\%$\n- Partner Q: $2 / 8 = 25.0\\%$\n- Partner R: $5 / 15 = 33.3\\%$\n- Partner S: $1 / 6 = 16.7\\%$\nPartner R achieved the highest conversion rate at 33.3%.",
    distractor_analysis: {
      A: "Incorrect. 3 / 12 = 25.0%.",
      B: "Incorrect. 2 / 8 = 25.0%.",
      C: "Correct. 5 / 15 = 33.3% is the highest conversion rate.",
      D: "Incorrect. 1 / 6 = 16.7%.",
      E: "Incorrect. P and Q tied at 25%, but R is higher at 33.3%.",
    },
    misconception: "Calculating exits relative to initial pitches reviewed rather than investments made.",
    time_estimate_seconds: 55,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A pharmaceutical stability test measures drug degradation after 6 months at 40°C:

| Drug Formulation | Initial Purity | Final Purity |
| :--- | :--- | :--- |
| Formulation A | 99.2% | 97.4% |
| Formulation B | 98.8% | 96.5% |
| Formulation C | 99.5% | 98.1% |
| Formulation D | 98.0% | 95.8% |

Which formulation suffered the least absolute percentage degradation?`,
    options: {
      A: "Formulation A",
      B: "Formulation B",
      C: "Formulation C",
      D: "Formulation D",
      E: "Formulations A and C tied",
    },
    correct_option: "C",
    explanation: "Absolute percentage degradation = Initial purity - Final purity:\n- A: $99.2 - 97.4 = 1.8\\%$\n- B: $98.8 - 96.5 = 2.3\\%$\n- C: $99.5 - 98.1 = 1.4\\%$\n- D: $98.0 - 95.8 = 2.2\\%$\nFormulation C suffered the least degradation (1.4%).",
    distractor_analysis: {
      A: "Incorrect. Degradation = 1.8%.",
      B: "Incorrect. Degradation = 2.3%.",
      C: "Correct. 99.5 - 98.1 = 1.4% degradation is the lowest.",
      D: "Incorrect. Degradation = 2.2%.",
      E: "Incorrect. Formulation C degraded less than A (1.4% vs 1.8%).",
    },
    misconception: "Confusing the highest final purity with the lowest degradation, though both happen to align here.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Table Analysis",
    difficulty_tier: 2,
    question_text: `A university admissions report shows yield rates across 4 departments:

| Academic Department | Students Admitted | Students Enrolled |
| :--- | :--- | :--- |
| Business | 800 | 520 |
| Engineering | 1,000 | 620 |
| Humanities | 400 | 280 |
| Sciences | 600 | 360 |

Which department had the highest yield rate (Enrolled / Admitted)?`,
    options: {
      A: "Business (65.0%)",
      B: "Engineering (62.0%)",
      C: "Humanities (70.0%)",
      D: "Sciences (60.0%)",
      E: "Business and Sciences tied",
    },
    correct_option: "C",
    explanation: "Yield rate = Enrolled / Admitted:\n- Business: $520 / 800 = 65.0\\%$\n- Engineering: $620 / 1,000 = 62.0\\%$\n- Humanities: $280 / 400 = 70.0\\%$\n- Sciences: $360 / 600 = 60.0\\%$\nHumanities had the highest yield rate (70.0%).",
    distractor_analysis: {
      A: "Incorrect. 520 / 800 = 65.0%.",
      B: "Incorrect. Largest absolute enrollment, but yield rate is 62.0%.",
      C: "Correct. 280 / 400 = 70.0% is the highest percentage yield.",
      D: "Incorrect. 360 / 600 = 60.0%.",
      E: "Incorrect. Rates are 65% and 60%.",
    },
    misconception: "Equating the largest number of enrolled students (Engineering with 620) with the highest yield rate percentage.",
    time_estimate_seconds: 45,
  },

  // =============================================================
  // DATA INSIGHTS: Graphics Interpretation (10 Questions)
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: "In a scatterplot correlating Customer Acquisition Cost (CAC) on the x-axis with 12-Month Customer Lifetime Value (LTV) on the y-axis across 50 SaaS startups, a linear trendline is fitted with equation $y = 3.5x + 120$. What does the slope coefficient $3.5$ represent in business terms?",
    options: {
      A: "For every $1 increase in CAC, average 12-month LTV increases by $3.50.",
      B: "For every $3.50 increase in CAC, LTV increases by $120.",
      C: "Average customer lifetime across all firms is 3.5 years.",
      D: "The baseline LTV for a customer acquired at zero cost is $3.50.",
      E: "LTV will exceed CAC by a fixed multiple of 3.5 for every individual customer.",
    },
    correct_option: "A",
    explanation: "In a linear model $y = mx + b$, the slope $m = \\Delta y / \\Delta x$ represents the expected change in the dependent variable ($y$, LTV) for each one-unit increase in the independent variable ($x$, CAC). Here $m = 3.5$, meaning each additional $1 spent on CAC is associated with a $3.50 increase in 12-month LTV.",
    distractor_analysis: {
      A: "Correct. Standard econometric interpretation: $dy/dx = 3.50$.",
      B: "Incorrect. Inverts slope and intercept.",
      C: "Incorrect. Confuses dollar ratio with time.",
      D: "Incorrect. Baseline LTV at $x = 0$ is the intercept $b = $120.",
      E: "Incorrect. A linear trend describes average cohort relationships, not exact deterministic individual values.",
    },
    misconception: "Confusing the slope $m$ with the intercept $b$ in bivariate linear regression models.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: `A cumulative frequency polygon (ogive) plots the distribution of employee salaries at a tech company:

\`\`\`chart:line
{
  "title": "Employee Salary Cumulative Distribution (Ogive)",
  "xAxis": "Salary",
  "yAxis": "Cumulative %",
  "data": [
    { "Salary": "$40k", "Cumulative %": 5 },
    { "Salary": "$60k", "Cumulative %": 25 },
    { "Salary": "$85k", "Cumulative %": 50 },
    { "Salary": "$120k", "Cumulative %": 75 },
    { "Salary": "$160k", "Cumulative %": 95 }
  ]
}
\`\`\`

The horizontal axis represents salary in thousands of dollars, and the vertical axis represents cumulative percentage. The curve passes through the points $(60, 25\\%)$, $(85, 50\\%)$, and $(120, 75\\%)$. What is the interquartile range (IQR) of salaries at this company?`,
    options: {
      A: "$25,000$",
      B: "$35,000$",
      C: "$60,000$",
      D: "$85,000$",
      E: "$95,000$",
    },
    correct_option: "C",
    explanation: "The interquartile range (IQR) is the difference between the 75th percentile ($Q_3$) and the 25th percentile ($Q_1$): $\\text{IQR} = Q_3 - Q_1$.\n- At 25% cumulative frequency, salary $Q_1 = $60,000$.\n- At 75% cumulative frequency, salary $Q_3 = $120,000$.\n$\\text{IQR} = 120,000 - 60,000 = $60,000$.",
    distractor_analysis: {
      A: "Incorrect. $85 - 60 = $25,000 is $Q_2 - Q_1$.",
      B: "Incorrect. $120 - 85 = $35,000 is $Q_3 - Q_2$.",
      C: "Correct. $Q_3 - Q_1 = 120k - 60k = $60,000.",
      D: "Incorrect. $85,000 is the median ($Q_2$).",
      E: "Incorrect. Arithmetic slip.",
    },
    misconception: "Calculating the difference between the median and the first quartile rather than the third and first quartiles.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 3,
    question_text: "A boxplot displaying monthly store sales (in thousands of dollars) shows:\n- Lower whisker end: 40\n- Lower quartile ($Q_1$): 70\n- Median ($Q_2$): 90\n- Upper quartile ($Q_3$): 130\n- Upper whisker end: 190\n- Two outlier points at: 230 and 250\n\nAccording to the standard $1.5 \\times \\text{IQR}$ rule for detecting outliers, what is the upper boundary threshold beyond which values are classified as outliers?",
    options: {
      A: "190",
      B: "200",
      C: "220",
      D: "230",
      E: "250",
    },
    correct_option: "C",
    explanation: "Under the standard boxplot outlier convention:\n- $\\text{IQR} = Q_3 - Q_1 = 130 - 70 = 60$.\n- Upper outlier fence = $Q_3 + 1.5 \\times \\text{IQR} = 130 + 1.5(60) = 130 + 90 = 220$.\nAny data point greater than 220 is classified as an outlier (which is why 230 and 250 are plotted as individual outlier points).",
    distractor_analysis: {
      A: "Incorrect. 190 is the upper whisker end (the maximum non-outlier data point).",
      B: "Incorrect. Added IQR once instead of 1.5 times.",
      C: "Correct. Upper fence = $Q_3 + 1.5 \\times \\text{IQR} = 130 + 90 = 220$.",
      D: "Incorrect. 230 is the first observed outlier data point.",
      E: "Incorrect. 250 is the maximum outlier data point.",
    },
    misconception: "Confusing the upper whisker endpoint (the maximum non-outlier observation, 190) with the theoretical outlier threshold fence ($Q_3 + 1.5 \\times \\text{IQR} = 220$).",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: "In a supply-demand graph, the market demand curve is given by $P = 100 - 2Q$ and the supply curve is given by $P = 20 + 2Q$. What are the equilibrium price ($P^*$) and equilibrium quantity ($Q^*$)?",
    options: {
      A: "$P^* = 60, Q^* = 20$",
      B: "$P^* = 40, Q^* = 30$",
      C: "$P^* = 50, Q^* = 25$",
      D: "$P^* = 70, Q^* = 15$",
      E: "$P^* = 80, Q^* = 10$",
    },
    correct_option: "A",
    explanation: "At market equilibrium, Demand Price = Supply Price:\n$100 - 2Q = 20 + 2Q \\implies 4Q = 80 \\implies Q^* = 20$.\nSubstitute into either equation:\n$P^* = 100 - 2(20) = 100 - 40 = 60$.\nCheck: $P^* = 20 + 2(20) = 20 + 40 = 60$.",
    distractor_analysis: {
      A: "Correct. $Q^* = 20, P^* = 60$.",
      B: "Incorrect. Swapped $P$ and $Q$ values.",
      C: "Incorrect. Arithmetic slip in slope addition.",
      D: "Incorrect. $100 - 2(15) = 70$, but supply gives $20 + 2(15) = 50 \\neq 70$.",
      E: "Incorrect. Fails supply equation.",
    },
    misconception: "Subtracting slopes ($2 - 2 = 0$) rather than adding coefficients to opposite sides ($2Q + 2Q = 4Q$).",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 3,
    question_text: "A ROC (Receiver Operating Characteristic) curve plots True Positive Rate (Sensitivity) on the y-axis against False Positive Rate (1 - Specificity) on the x-axis for a machine learning fraud detection model. A model whose curve coincides exactly with the 45-degree diagonal line running from $(0,0)$ to $(1,1)$ represents:",
    options: {
      A: "A perfect classifier with 100% predictive accuracy.",
      B: "A completely random classifier with zero discriminative capability beyond pure chance.",
      C: "A model that classifies all transactions as fraudulent.",
      D: "A model that classifies all transactions as legitimate.",
      E: "An overfitted model that memorized the training dataset.",
    },
    correct_option: "B",
    explanation: "The 45-degree diagonal line in a ROC curve corresponds to an Area Under the Curve (AUC) of 0.50. This represents a random classifier (equivalent to flipping a coin), where the probability of correctly identifying a positive is equal to the probability of generating a false alarm at every threshold.",
    distractor_analysis: {
      A: "Incorrect. A perfect classifier hugs the top-left corner $(0,1)$ with AUC = 1.0.",
      B: "Correct. The 45-degree diagonal corresponds to random chance (AUC = 0.50).",
      C: "Incorrect. Classifying all as fraud corresponds to the single point $(1,1)$.",
      D: "Incorrect. Classifying all as legitimate corresponds to $(0,0)$.",
      E: "Incorrect. Overfitting typically produces inflated AUC approaching 1.0 on training data.",
    },
    misconception: "Assuming the 45-degree line represents an optimal balanced trade-off rather than random uninformative performance.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: `A pie chart illustrates global energy production by source:

\`\`\`chart:pie
{
  "title": "Global Energy Production by Source",
  "data": [
    { "name": "Petroleum", "value": 35 },
    { "name": "Coal", "value": 25 },
    { "name": "Natural Gas", "value": 20 },
    { "name": "Nuclear", "value": 10 },
    { "name": "Renewables", "value": 10 }
  ]
}
\`\`\`

Petroleum accounts for 35%, Coal accounts for 25%, Natural Gas accounts for 20%, and the remainder is split equally between Nuclear and Renewables. What is the central angle in degrees of the sector representing Renewables?`,
    options: {
      A: "$18^\\circ$",
      B: "$36^\\circ$",
      C: "$54^\\circ$",
      D: "$72^\\circ$",
      E: "$90^\\circ$",
    },
    correct_option: "B",
    explanation: "Total percentage of fossil fuels = $35\\% + 25\\% + 20\\% = 80\\%$. Remainder for Nuclear and Renewables = $100\\% - 80\\% = 20\\%$. Since it is split equally, Renewables = $20\\% / 2 = 10\\%$. Total circle is $360^\\circ$. Central angle for Renewables = $10\\% \\times 360^\\circ = 0.10 \\times 360^\\circ = 36^\\circ$.",
    distractor_analysis: {
      A: "Incorrect. Halved the angle erroneously ($36 / 2 = 18$).",
      B: "Correct. 10% of 360 degrees = 36 degrees.",
      C: "Incorrect. Corresponds to 15%.",
      D: "Incorrect. Computed the combined angle for Nuclear and Renewables (20% * 360 = 72 degrees).",
      E: "Incorrect. 90 degrees corresponds to 25%.",
    },
    misconception: "Calculating the combined sector angle for both remaining sources rather than dividing by 2 for Renewables alone.",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: `A line graph tracks quarterly revenue for a retail chain across 2023:

\`\`\`chart:line
{
  "title": "Quarterly Retail Revenue Across 2023 ($M)",
  "xAxis": "Quarter",
  "yAxis": "Revenue ($M)",
  "data": [
    { "Quarter": "Q1", "Revenue": 120 },
    { "Quarter": "Q2", "Revenue": 150 },
    { "Quarter": "Q3", "Revenue": 180 },
    { "Quarter": "Q4", "Revenue": 225 }
  ]
}
\`\`\`

What was the percentage increase in quarterly revenue from Q1 to Q4?`,
    options: {
      A: "75.0%",
      B: "87.5%",
      C: "105.0%",
      D: "125.0%",
      E: "187.5%",
    },
    correct_option: "B",
    explanation: "Percentage increase = $\\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%$.\n$\\text{Increase} = \\frac{225 - 120}{120} \\times 100\\% = \\frac{105}{120} \\times 100\\% = \\frac{7}{8} \\times 100\\% = 87.5\\%$.",
    distractor_analysis: {
      A: "Incorrect. Arithmetic slip.",
      B: "Correct. 105 / 120 = 87.5%.",
      C: "Incorrect. Confused absolute increase in millions ($105M) with percentage (87.5%).",
      D: "Incorrect. Arithmetic slip.",
      E: "Incorrect. Computed 225 / 120 = 187.5% (the ratio of final to initial revenue, not the percentage increase).",
    },
    misconception: "Reporting the ratio of the final value to initial value (187.5%) instead of subtracting 100% to find net growth (87.5%).",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 3,
    question_text: "A dual-axis chart plots monthly advertising spend (bar chart, left axis in $10,000s) and monthly website signups (line graph, right axis in thousands). In March, the bar height aligns with 8 on the left axis, and the line graph point aligns with 24 on the right axis. What was the average advertising spend per website signup in March?",
    options: {
      A: "$0.33$",
      B: "$3.33$",
      C: "$33.33$",
      D: "$333.33$",
      E: "$3,333.00$",
    },
    correct_option: "B",
    explanation: "Pay careful attention to unit scalings on both axes:\n- Left axis (Ad spend): 8 units in $10,000s = $8 \\times 10,000 = $80,000$.\n- Right axis (Signups): 24 units in thousands = $24 \\times 1,000 = 24,000$ signups.\nCost per signup = $\\frac{\\text{Total Spend}}{\\text{Total Signups}} = \\frac{$80,000}{24,000} = \\frac{80}{24} = \\frac{10}{3} \\approx $3.33$ per signup.",
    distractor_analysis: {
      A: "Incorrect. Order of magnitude error ($8 / 24 = 0.33$).",
      B: "Correct. $80,000 / 24,000 = $3.33 per signup.",
      C: "Incorrect. Missed a factor of 10 in unit conversions.",
      D: "Incorrect. Order of magnitude error.",
      E: "Incorrect. Off by factor of 1,000.",
    },
    misconception: "Dividing axis labels directly (8 / 24 = 0.33) without applying the scale multipliers ($10,000 vs. 1,000).",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: `A Pareto defect distribution chart shows assembly flaws in an electronics plant:

\`\`\`chart:bar
{
  "title": "Electronics Assembly Defect Breakdown",
  "xAxis": "Defect Category",
  "yAxis": "% of Total Defects",
  "data": [
    { "Defect Category": "Solder Bridging", "% of Total Defects": 45 },
    { "Defect Category": "Component Misalignment", "% of Total Defects": 35 },
    { "Defect Category": "Insufficient Flux", "% of Total Defects": 12 },
    { "Defect Category": "Other Defects", "% of Total Defects": 8 }
  ]
}
\`\`\`

The bar for 'Solder Bridging' represents 45% of total defects, and the bar for 'Component Misalignment' represents 35% of total defects. Together, these two categories account for what percentage of total defects on the cumulative line curve?`,
    options: {
      A: "35%",
      B: "45%",
      C: "80%",
      D: "90%",
      E: "100%",
    },
    correct_option: "C",
    explanation: "In a Pareto chart, the cumulative curve represents the running sum of individual category percentages ordered from largest to smallest. Solder Bridging (45%) + Component Misalignment (35%) = 80%. The cumulative line at the second bar indicates exactly 80%.",
    distractor_analysis: {
      A: "Incorrect. Only represents the second category alone.",
      B: "Incorrect. Only represents the first category alone.",
      C: "Correct. Running cumulative sum: 45% + 35% = 80%.",
      D: "Incorrect. Arithmetic slip.",
      E: "Incorrect. Complete population.",
    },
    misconception: "Reading the individual bar height rather than the cumulative percentage line in a Pareto chart.",
    time_estimate_seconds: 35,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Graphics Interpretation",
    difficulty_tier: 2,
    question_text: "A Venn diagram represents survey responses of 100 students regarding language fluency: 60 speak Spanish, 45 speak French, and 20 speak both languages. How many surveyed students speak neither Spanish nor French?",
    options: {
      A: "10",
      B: "15",
      C: "20",
      D: "25",
      E: "35",
    },
    correct_option: "B",
    explanation: "By the Principle of Inclusion-Exclusion:\n$|S \\cup F| = |S| + |F| - |S \\cap F| = 60 + 45 - 20 = 105 - 20 = 85$ students speak at least one language.\nNumber speaking neither = $\\text{Total} - |S \\cup F| = 100 - 85 = 15$ students.",
    distractor_analysis: {
      A: "Incorrect. Arithmetic slip.",
      B: "Correct. 100 - (60 + 45 - 20) = 100 - 85 = 15.",
      C: "Incorrect. Number of students speaking both.",
      D: "Incorrect. Forgot to subtract intersection: 100 - (60 + 45) = -5 (impossible).",
      E: "Incorrect. 100 - 65.",
    },
    misconception: "Double counting bilingual students when computing the union of two overlapping sets.",
    time_estimate_seconds: 45,
  },

  // =============================================================
  // DATA INSIGHTS: Multi-Source Reasoning (10 Questions)
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Company Policy): 'Capital equipment expenditures exceeding $50,000 require CFO approval, unless the equipment has an estimated payback period of less than 12 months, in which case Department Head sign-off suffices.'\nTab 2 (Procurement Request): 'A manufacturing unit requests a $75,000 automated sorting robot projected to generate net operational savings of $7,000 per month.'\n\nUnder company policy, who is authorized to grant final procurement sign-off?",
    options: {
      A: "The CFO exclusively, because the expenditure exceeds $50,000.",
      B: "The Department Head, because the projected payback period is approximately 10.7 months (less than 12 months).",
      C: "The Board of Directors, because automation involves labor displacement.",
      D: "Neither, because projects over $50,000 must be funded through debt financing.",
      E: "The CEO, because the purchase exceeds $60,000.",
    },
    correct_option: "B",
    explanation: "1. Payback period = Cost / Monthly Savings = $75,000 / $7,000 = 10.71 months.\n2. Although $75,000 > $50,000, Tab 1 explicitly provides an exception: 'unless the equipment has an estimated payback period of less than 12 months, in which case Department Head sign-off suffices.'\n3. Since 10.71 < 12 months, Department Head sign-off is sufficient.",
    distractor_analysis: {
      A: "Incorrect. Overlooks the explicit conditional exception regarding sub-12-month payback periods.",
      B: "Correct. Accurately synthesizes numerical payback calculation with the policy exception clause.",
      C: "Incorrect. Board approval is unmentioned.",
      D: "Incorrect. Debt financing requirements are extraneous.",
      E: "Incorrect. CEO threshold is not part of policy.",
    },
    misconception: "Failing to check for exceptions to general threshold rules when cross-referencing tabs.",
    time_estimate_seconds: 65,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 2,
    question_text: "Tab 1 (Contract Terms): 'Consultants traveling on firm business are reimbursed for airfare up to $600 per domestic flight, hotel stays up to $200 per night, and a flat per diem meal stipend of $75 per day.'\nTab 2 (Expense Report): 'A consultant completed a 4-day, 3-night business trip. The expense report claimed: Airfare $550, Hotel (3 nights total) $660, Meals (4 days) $300.'\n\nWhat is the total reimbursed amount approved under firm policy?",
    options: {
      A: "$1,510",
      B: "$1,450",
      C: "$1,400",
      D: "$1,350",
      E: "$1,250",
    },
    correct_option: "B",
    explanation: "Calculate allowable caps per category:\n- Airfare: Claimed $550 (cap is $600). Fully approved = $550.\n- Hotel: Claimed $660 for 3 nights = $220/night. Cap is $200/night, so allowable = $200 \\times 3 = $600.\n- Meals: 4 days at $75/day = $300. Fully approved = $300.\nTotal approved reimbursement = $550 + $600 + $300 = $1,450.",
    distractor_analysis: {
      A: "Incorrect. Total claimed amount without applying the $200/night hotel cap ($550 + $660 + $300 = $1,510).",
      B: "Correct. Airfare ($550) + Capped Hotel ($600) + Meals ($300) = $1,450.",
      C: "Incorrect. Over-capped airfare.",
      D: "Incorrect. Capped meals unnecessarily.",
      E: "Incorrect. Arithmetic slip.",
    },
    misconception: "Approving the total expense claim without capping individual category rates against contractual limits.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Fleet Requirements): 'Commercial delivery vans must achieve an average fuel efficiency of at least 22 MPG and have a cargo volume capacity of at least 350 cubic feet.'\nTab 2 (Model Specifications):\n- Van Alpha: 24 MPG, 320 cu ft\n- Van Beta: 21 MPG, 400 cu ft\n- Van Gamma: 23 MPG, 360 cu ft\n- Van Delta: 26 MPG, 380 cu ft\nTab 3 (Budget Constraint): 'The maximum purchase price allowed per van is $45,000. Van Gamma costs $44,000, while Van Delta costs $48,000.'\n\nWhich van model satisfies ALL fleet requirements and budgetary constraints?",
    options: {
      A: "Van Alpha",
      B: "Van Beta",
      C: "Van Gamma",
      D: "Van Delta",
      E: "No van model satisfies all constraints",
    },
    correct_option: "C",
    explanation: "Evaluate all 3 constraints across models:\n- Van Alpha: 320 cu ft < 350 cu ft. Fails cargo constraint.\n- Van Beta: 21 MPG < 22 MPG. Fails MPG constraint.\n- Van Delta: Cost $48,000 > $45,000. Fails budget constraint.\n- Van Gamma: 23 MPG ($\\ge 22$), 360 cu ft ($\\ge 350$), Cost $44,000 ($\\le $45,000$). Satisfies ALL constraints.",
    distractor_analysis: {
      A: "Incorrect. Fails cargo volume requirement.",
      B: "Incorrect. Fails MPG efficiency requirement.",
      C: "Correct. Satisfies MPG, cargo volume, and purchase price caps.",
      D: "Incorrect. Exceeds $45,000 budget cap.",
      E: "Incorrect. Van Gamma successfully satisfies all constraints.",
    },
    misconception: "Selecting the highest performance vehicle (Delta) without checking the budgetary ceiling in Tab 3.",
    time_estimate_seconds: 65,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 2,
    question_text: "Tab 1 (Clinical Protocol): 'Patients receiving antibiotic therapy must take Medication X every 8 hours for 7 days. If a dose is missed by more than 4 hours, the patient must restart the full 7-day cycle.'\nTab 2 (Patient Log): 'Patient J began therapy on Monday at 8:00 AM. Scheduled doses were 8:00 AM, 4:00 PM, and 12:00 Midnight. On Wednesday, the 4:00 PM dose was taken at 9:30 PM.'\n\nAccording to the clinical protocol, what action should Patient J take?",
    options: {
      A: "Continue the current schedule without modification.",
      B: "Take a double dose at 12:00 Midnight.",
      C: "Restart the full 7-day course of therapy from the beginning.",
      D: "Discontinue antibiotic treatment permanently.",
      E: "Take the remaining doses at 12-hour intervals.",
    },
    correct_option: "C",
    explanation: "Scheduled dose: 4:00 PM. Actual administration: 9:30 PM. Delay duration = $5.5$ hours. Tab 1 explicitly stipulates: 'If a dose is missed by more than 4 hours, the patient must restart the full 7-day cycle.' Since $5.5 > 4$ hours, Patient J must restart the full 7-day course of therapy.",
    distractor_analysis: {
      A: "Incorrect. The delay exceeded the 4-hour threshold.",
      B: "Incorrect. Double dosing is not authorized and may cause toxicity.",
      C: "Correct. Delay was 5.5 hours (> 4 hour limit), requiring full protocol restart.",
      D: "Incorrect. Protocol does not mandate permanent cessation.",
      E: "Incorrect. Modifying dosing intervals is contrary to the protocol.",
    },
    misconception: "Calculating the delay as less than 4 hours by miscounting the elapsed time between 4:00 PM and 9:30 PM.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Tariff Schedule): 'Imported electronics from Region A incur an 8% customs duty on CIF value. Components certified as 'Green Technology' receive a 50% tariff rebate.'\nTab 2 (Shipment Invoice): 'A consignment of solar microinverters from Region A has a CIF value of $250,000 and carries verified Green Technology certification.'\n\nWhat is the net customs duty payable on this consignment?",
    options: {
      A: "$10,000",
      B: "$20,000",
      C: "$12,500",
      D: "$8,000",
      E: "$5,000",
    },
    correct_option: "A",
    explanation: "1. Base tariff rate = 8% of CIF value: $0.08 \\times 250,000 = $20,000$.\n2. Green Technology certification rebate = 50% of duty: $50\\% \\times 20,000 = $10,000$.\n3. Net customs duty payable = $20,000 - $10,000 = $10,000$.\nAlternatively: Net effective rate = $8\\% \\times (1 - 0.50) = 4\\%$. $0.04 \\times 250,000 = $10,000$.",
    distractor_analysis: {
      A: "Correct. 4% net duty on $250,000 = $10,000.",
      B: "Incorrect. Base duty without applying the 50% Green Tech rebate.",
      C: "Incorrect. Arithmetic error.",
      D: "Incorrect. Arithmetic error.",
      E: "Incorrect. Applied rebate twice.",
    },
    misconception: "Forgetting to apply the 50% Green Technology rebate specified in Tab 1 to the invoice in Tab 2.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 2,
    question_text: "Tab 1 (HR Policy): 'Employees who achieve an annual performance rating of 'Exceeds Expectations' (Score >= 4.0 out of 5.0) and complete at least 40 hours of professional development training are eligible for an 8% merit salary increase.'\nTab 2 (Employee Performance Records):\n- Elena: Performance Score 4.2, Training Hours 45\n- Marcus: Performance Score 4.5, Training Hours 35\n- Chloe: Performance Score 3.8, Training Hours 50\n- David: Performance Score 4.0, Training Hours 40\n\nWhich employee(s) are eligible for the 8% merit increase?",
    options: {
      A: "Elena only",
      B: "Elena and David only",
      C: "Elena, Marcus, and David",
      D: "Chloe only",
      E: "All four employees",
    },
    correct_option: "B",
    explanation: "Check both criteria (Score $\\ge 4.0$ AND Training $\\ge 40$ hrs):\n- Elena: 4.2 ($\\ge 4.0$) and 45 hrs ($\\ge 40$). Eligible.\n- Marcus: 4.5 ($\\ge 4.0$), but only 35 hrs (< 40). Ineligible.\n- Chloe: 3.8 (< 4.0), even though 50 hrs. Ineligible.\n- David: 4.0 ($\\ge 4.0$) and 40 hrs ($\\ge 40$). Eligible.\nBoth Elena and David meet both criteria.",
    distractor_analysis: {
      A: "Incorrect. Overlooked David who met both exact thresholds (4.0 and 40 hrs).",
      B: "Correct. Both Elena and David satisfy score >= 4.0 and hours >= 40.",
      C: "Incorrect. Marcus failed the 40-hour training requirement.",
      D: "Incorrect. Chloe failed the 4.0 score requirement.",
      E: "Incorrect. Marcus and Chloe failed individual criteria.",
    },
    misconception: "Assuming 'Score >= 4.0' is strictly greater than 4.0, thereby mistakenly excluding David.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Warehouse Storage Fees): 'Pallets stored up to 30 days incur a fee of $15/day per pallet. Pallets stored between 31 and 60 days incur $25/day per pallet for days beyond 30. Pallets stored beyond 60 days incur $40/day per pallet for days beyond 60.'\nTab 2 (Storage Log): 'A logistics client stored 10 pallets for exactly 45 days.'\n\nWhat is the total storage fee charged to the client?",
    options: {
      A: "$6,750",
      B: "$8,250",
      C: "$11,250",
      D: "$12,000",
      E: "$15,000",
    },
    correct_option: "B",
    explanation: "Calculate tier fees per pallet for 45 days:\n- Days 1 to 30 (30 days): $30 \\times $15 = $450$.\n- Days 31 to 45 (15 days): $15 \\times $25 = $375$.\nTotal fee per pallet = $450 + 375 = $825$.\nFor 10 pallets: $10 \\times $825 = $8,250$.",
    distractor_analysis: {
      A: "Incorrect. Billed all 45 days at the flat $15/day base rate ($10 \\times 45 \\times 15 = $6,750).",
      B: "Correct. Accurate tiered graduated calculation: 10 * [30(15) + 15(25)] = $8,250.",
      C: "Incorrect. Billed all 45 days at the higher $25 tier rate ($10 \\times 45 \\times 25 = $11,250).",
      D: "Incorrect. Arithmetic slip.",
      E: "Incorrect. Miscalculated duration.",
    },
    misconception: "Applying the tier rate retroactively to all days rather than charging marginal rates on incremental days.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 2,
    question_text: "Tab 1 (Investment Mandate): 'The fund cannot allocate more than 25% of total assets to foreign equities and must maintain at least 15% in cash and cash equivalents.'\nTab 2 (Current Portfolio Breakdown, Total Assets $200M):\n- Domestic Equities: $110M\n- Foreign Equities: $45M\n- Corporate Bonds: $20M\n- Cash: $25M\n\nHow much additional cash must the fund raise to comply with the cash mandate?",
    options: {
      A: "$0 (Already compliant)",
      B: "$5M",
      C: "$10M",
      D: "$15M",
      E: "$20M",
    },
    correct_option: "B",
    explanation: "1. Total assets = $200M.\n2. Cash mandate: At least 15% of $200M = $0.15 \\times 200 = $30M$.\n3. Current cash = $25M.\n4. Shortfall = $30M - $25M = $5M.\nThe fund must raise $5M in additional cash to reach compliance.",
    distractor_analysis: {
      A: "Incorrect. Current cash ($25M) is only 12.5%, failing the 15% mandate.",
      B: "Correct. Target cash = $30M, current cash = $25M; shortfall = $5M.",
      C: "Incorrect. Arithmetic slip.",
      D: "Incorrect. Used foreign equity calculation.",
      E: "Incorrect. Arbitrary figure.",
    },
    misconception: "Assuming $25M represents 15% because 15% of 100 is 15, forgetting that total assets are $200M.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Carbon Offset Policy): 'A manufacturer receives 1 carbon credit for every 2 metric tons of CO2 emissions reduced below baseline. If emissions exceed baseline, the company must surrender 1 credit for every 1.5 metric tons of excess emissions.'\nTab 2 (Emission Audit):\n- Facility 1: Reduced emissions by 60 tons below baseline.\n- Facility 2: Exceeded baseline emissions by 30 tons.\n- Facility 3: Reduced emissions by 20 tons below baseline.\n\nWhat is the net change in the manufacturer's carbon credit balance?",
    options: {
      A: "Net gain of 20 credits",
      B: "Net gain of 30 credits",
      C: "Net gain of 40 credits",
      D: "Net loss of 10 credits",
      E: "Net balance of zero credits",
    },
    correct_option: "A",
    explanation: "Compute credits earned and surrendered:\n- Facility 1: $60 / 2 = +30$ credits earned.\n- Facility 2: $30 / 1.5 = -20$ credits surrendered.\n- Facility 3: $20 / 2 = +10$ credits earned.\nNet credit change = $+30 - 20 + 10 = +20$ credits.",
    distractor_analysis: {
      A: "Correct. +30 (Fac 1) - 20 (Fac 2) + 10 (Fac 3) = +20 credits.",
      B: "Incorrect. Omitted the penalty from Facility 2.",
      C: "Incorrect. Added all credits without penalizing excess emissions.",
      D: "Incorrect. Arithmetic slip in surrender ratio.",
      E: "Incorrect. Arbitrary balance assumption.",
    },
    misconception: "Using the same divisor (2) for penalties instead of the 1.5 divisor specified for excess emissions in Tab 1.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 2,
    question_text: "Tab 1 (Software SLA): 'Enterprise Tier clients are guaranteed 99.9% uptime per calendar month. If monthly uptime falls between 99.0% and 99.89%, a 10% invoice credit is issued. If uptime falls below 99.0%, a 25% invoice credit is issued.'\nTab 2 (Monthly Downtime Record): 'In a 30-day month (720 total hours), an Enterprise client experienced a total of 3.6 hours of system outage.'\n\nWhat credit, if any, is the client entitled to receive on their monthly invoice?",
    options: {
      A: "No credit (SLA was met)",
      B: "10% invoice credit",
      C: "15% invoice credit",
      D: "25% invoice credit",
      E: "50% invoice credit",
    },
    correct_option: "B",
    explanation: "1. Total monthly hours = $30 \\times 24 = 720$ hours.\n2. Downtime = 3.6 hours.\n3. Uptime hours = $720 - 3.6 = 716.4$ hours.\n4. Uptime percentage = $\\frac{716.4}{720} \\times 100\\% = 99.5\\%$.\n5. Looking up Tab 1: $99.5\\%$ falls between $99.0\\%$ and $99.89\\%$, which mandates a 10% invoice credit.",
    distractor_analysis: {
      A: "Incorrect. 99.5% is below the 99.9% guarantee.",
      B: "Correct. 99.5% uptime entitles client to a 10% credit.",
      C: "Incorrect. 15% is not a tier in Tab 1.",
      D: "Incorrect. 25% requires uptime strictly below 99.0% (< 712.8 hours).",
      E: "Incorrect. Not a valid tier.",
    },
    misconception: "Assuming 99.5% satisfies the 99.9% SLA because 99.5% sounds very high.",
    time_estimate_seconds: 50,
  },

  // =============================================================
  // DATA INSIGHTS: Data Sufficiency — High-Yield 700+ Traps
  // =============================================================
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "If $x$ and $y$ are non-zero real numbers, is $x^2 - y^2 > 0$?\n\nStatement (1): $|x| > |y|$\nStatement (2): $x + y > 0$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "A",
    explanation: "- Question analysis: $x^2 - y^2 > 0 \\iff x^2 > y^2 \\iff |x|^2 > |y|^2 \\iff |x| > |y|$. The question is mathematically identical to asking: 'Is $|x| > |y|$?'\n- Statement (1): $|x| > |y|$. This directly and definitively answers 'YES'. Statement (1) ALONE is sufficient.\n- Statement (2): $x + y > 0$. If $x = 5, y = 2 \\implies |5| > |2|$ (Yes). If $x = 2, y = 5 \\implies |2| < |5|$ (No). Statement (2) is insufficient.\nTherefore, Statement (1) ALONE is sufficient.",
    distractor_analysis: {
      A: "Correct. x^2 - y^2 > 0 is algebraically equivalent to |x| > |y|.",
      B: "Incorrect. Statement (2) yields both Yes and No depending on magnitudes.",
      C: "Incorrect. Classic C-trap: assuming both statements are needed to factor into (x - y)(x + y).",
      D: "Incorrect. Statement (2) is insufficient.",
      E: "Incorrect. Statement (1) is sufficient.",
    },
    misconception: "Factoring $x^2 - y^2 = (x - y)(x + y)$ and assuming both factors are required, missing the direct equivalence $x^2 > y^2 \\iff |x| > |y|$.",
    time_estimate_seconds: 60,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "Is the real number $x$ less than 3?\n\nStatement (1): $|x - 3| = 3 - x$\nStatement (2): $x^2 \\le 9$",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "E",
    explanation: "- Question: Is $x < 3$?\n- Statement (1): By definition, $|a| = -a \\iff a \\le 0$. Here $|x - 3| = -(x - 3) = 3 - x \\iff x - 3 \\le 0 \\iff x \\le 3$. Could $x$ be less than 3? If $x = 2$, YES. But $x$ could also equal 3, where $3 < 3$ is NO! Because the boundary point $x = 3$ is included, Statement (1) yields both Yes and No. Insufficient!\n- Statement (2): $x^2 \\le 9 \\iff -3 \\le x \\le 3$. Again, if $x = 0$, YES ($0 < 3$). If $x = 3$, NO ($3 < 3$ is false). Insufficient!\n- Statements Combined: Statement (1) gives $x \\le 3$; Statement (2) gives $-3 \\le x \\le 3$. Intersection is $-3 \\le x \\le 3$. The ambiguity at $x = 3$ remains unresolved. Both Yes ($x = 0$) and No ($x = 3$) remain possible.\nTherefore, Statements (1) and (2) TOGETHER are NOT sufficient (Option E).",
    distractor_analysis: {
      A: "Incorrect. Overlooked the boundary point x = 3 where the answer is NO.",
      B: "Incorrect. Statement (2) includes x = 3.",
      C: "Incorrect. Combining both statements still leaves the endpoint x = 3 viable.",
      D: "Incorrect. Neither statement rules out x = 3.",
      E: "Correct. Classic GMAT strict vs non-strict inequality trap: at x = 3, |3 - 3| = 3 - 3 = 0, but 3 < 3 is false.",
    },
    misconception: "Confusing the non-strict inequality $x \\le 3$ with the strict question stem $x < 3$, overlooking the boundary value $x = 3$.",
    time_estimate_seconds: 70,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Data Sufficiency",
    difficulty_tier: 3,
    question_text: "If $n$ is a positive integer, what is the remainder when $n$ is divided by 12?\n\nStatement (1): When $n$ is divided by 4, the remainder is 3.\nStatement (2): When $n$ is divided by 6, the remainder is 5.",
    options: {
      A: "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      B: "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      C: "BOTH statements TOGETHER are sufficient, but NEITHER statement alone is sufficient.",
      D: "EACH statement ALONE is sufficient.",
      E: "Statements (1) and (2) TOGETHER are NOT sufficient.",
    },
    correct_option: "C",
    explanation: "- Statement (1): $n = 4a + 3$. Numbers: 3, 7, 11, 15, 19, 23... Remainder when divided by 12 can be 3, 7, or 11. Insufficient.\n- Statement (2): $n = 6b + 5$. Numbers: 5, 11, 17, 23, 29... Remainder when divided by 12 can be 5 or 11. Insufficient.\n- Combined: Find common values: $n \\in \\{11, 23, 35, 47, ...\\}$. In general, $n = 12k + 11$. Notice that every single common number has a remainder of 11 when divided by 12 ($11 = 12(0) + 11$, $23 = 12(1) + 11$, $35 = 12(2) + 11$). The remainder is uniquely and invariants 11. Sufficient.\nTherefore, BOTH statements TOGETHER are sufficient (Option C).",
    distractor_analysis: {
      A: "Incorrect. Leaves multiple possible remainders modulo 12.",
      B: "Incorrect. Modulo 6 leaves two possible remainders modulo 12 (5 or 11).",
      C: "Correct. Chinese Remainder Theorem: LCM(4, 6) = 12, uniquely isolating remainder 11.",
      D: "Incorrect. Neither alone isolates a unique remainder.",
      E: "Incorrect. Together they uniquely determine the remainder modulo 12.",
    },
    misconception: "Assuming overlapping moduli always leave multiple possibilities without testing the LCM cycle.",
    time_estimate_seconds: 75,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Two-Part Analysis",
    difficulty_tier: 3,
    question_text: "A precision machine shop manufactures two aerospace components: Valve $X$ and Valve $Y$. Each unit of $X$ requires 3 hours on Machine A and 2 hours on Machine B, generating $150 profit. Each unit of $Y$ requires 2 hours on Machine A and 4 hours on Machine B, generating $200 profit. Machine A is available for at most 36 hours per week, and Machine B is available for at most 40 hours per week. What combination of units of Valve $X$ and Valve $Y$ maximizes weekly profit while respecting machine capacity?",
    options: {
      A: "Valve X = 8 units and Valve Y = 6 units",
      B: "Valve X = 12 units and Valve Y = 0 units",
      C: "Valve X = 0 units and Valve Y = 10 units",
      D: "Valve X = 6 units and Valve Y = 8 units",
      E: "Valve X = 10 units and Valve Y = 3 units",
    },
    correct_option: "A",
    explanation: "Linear programming vertex test:\nConstraints:\n1. Machine A: $3X + 2Y \\le 36$\n2. Machine B: $2X + 4Y \\le 40 \\implies X + 2Y \\le 20$\nFind intersection vertex:\nSubtract (2) from (1): $(3X + 2Y) - (X + 2Y) = 36 - 20 \\implies 2X = 16 \\implies X = 8$.\nSubstitute $X = 8$ into (2): $8 + 2Y = 20 \\implies 2Y = 12 \\implies Y = 6$.\nCheck feasibility: $3(8) + 2(6) = 24 + 12 = 36 \\le 36$. $2(8) + 4(6) = 16 + 24 = 40 \\le 40$.\nCalculate Profit:\n- Vertex (8, 6): $150(8) + 200(6) = 1200 + 1200 = $2,400$.\n- Vertex (12, 0): $150(12) = $1,800$.\n- Vertex (0, 10): $200(10) = $2,000$.\nThe optimal combination is Valve $X = 8$ and Valve $Y = 6$ ($2,400 profit).",
    distractor_analysis: {
      A: "Correct. Vertex intersection (8, 6) maximizes objective function at $2,400.",
      B: "Incorrect. Sub-optimal corner point generating $1,800.",
      C: "Incorrect. Sub-optimal corner point generating $2,000.",
      D: "Incorrect. 2(6) + 4(8) = 12 + 32 = 44 > 40, violating Machine B capacity.",
      E: "Incorrect. Generates $2,100, less than optimal.",
    },
    misconception: "Selecting a corner point that violates one of the boundary constraints or yields lower aggregate profit.",
    time_estimate_seconds: 80,
  },
  {
    exam_name: "GMAT Focus",
    subject: "Data Insights",
    skill_domain: "Multi-Source Reasoning",
    difficulty_tier: 3,
    question_text: "Tab 1 (Corporate Travel Policy): 'Domestic business travel requires standard economy airfare. Travelers may book Premium Economy only if the flight duration exceeds 4.5 continuous hours. Hotel reimbursement is capped at $220/night before tax in Tier-1 cities and $160/night in Tier-2 cities.'\nTab 2 (Expense Claim #8821): 'An executive flew from Chicago (Tier-1) to San Francisco (Tier-1) on a 4-hour-15-minute flight in Premium Economy ($540 ticket). The executive stayed 3 nights at a San Francisco hotel at $215/night before tax and claimed $80/day meal per diem.'\n\nWhich portion of Expense Claim #8821 is non-compliant with corporate policy?",
    options: {
      A: "The hotel room rate, because San Francisco requires a Tier-2 rate.",
      B: "The airfare class, because the 4-hour-15-minute flight duration does not exceed the 4.5-hour threshold required for Premium Economy.",
      C: "The meal per diem, because Chicago was the departure city.",
      D: "The entire claim, because executives are not authorized to travel between Tier-1 cities.",
      E: "No portion is non-compliant; the entire claim satisfies all corporate guidelines.",
    },
    correct_option: "B",
    explanation: "Cross-reference Tab 1 and Tab 2:\n1. Hotel: San Francisco is Tier-1. Capped at $220/night. The executive claimed $215/night, which is compliant ($215 \\le $220).\n2. Airfare: Tab 1 mandates standard economy unless flight duration strictly 'exceeds 4.5 continuous hours' (i.e. > 4 hours 30 minutes). Tab 2 shows flight duration was 4 hours 15 minutes (4.25 hours). Since 4.25 is NOT > 4.5 hours, booking Premium Economy violates policy.",
    distractor_analysis: {
      A: "Incorrect. San Francisco is Tier-1, and $215 is under the $220 cap.",
      B: "Correct. 4 hours 15 minutes is under the mandatory 4.5-hour threshold for Premium Economy.",
      C: "Incorrect. Tab 1 specifies no restrictions on meal per diem based on origin.",
      D: "Incorrect. Travel between Tier-1 cities is permitted.",
      E: "Incorrect. The airfare class directly breaches the threshold clause.",
    },
    misconception: "Assuming 4 hours 15 minutes qualifies as 'approximately 4.5 hours'; policy thresholds in GMAT MSR are strict mathematical inequalities.",
    time_estimate_seconds: 65,
  },
];
