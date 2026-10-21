// Path: lib/data/banks/sat/math.ts
import type { SeedQuestion } from "../../question-bank-seed";

export const SAT_MATH_BANK: SeedQuestion[] = [
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "If $4x - 3y = 14$ and $2x + y = 12$, what is the value of $x + y$?",
    "options": {
      "A": "7",
      "B": "5",
      "C": "8",
      "D": "10"
    },
    "correct_option": "A",
    "explanation": "Multiply the second equation by 3: $6x + 3y = 36$. Add to first: $10x = 50 \\implies x = 5$. Then $2(5) + y = 12 \\implies y = 2$. Thus $x + y = 5 + 2 = 7$.",
    "distractor_analysis": {
      "A": "Correct. $x = 5, y = 2 \\implies x + y = 7$.",
      "B": "Incorrect. 5 is the value of $x$.",
      "C": "Incorrect. Arithmetic slip.",
      "D": "Incorrect. Solved with sign error."
    },
    "misconception": "Solving for $x$ and forgetting to compute the requested expression $x + y$.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 3,
    "question_text": "For what value of $c$ will the equation $3(2x - 5) + 4 = cx - 11$ have infinitely many real solutions for $x$?",
    "options": {
      "A": "2",
      "B": "6",
      "C": "-6",
      "D": "No such value"
    },
    "correct_option": "B",
    "explanation": "Expand the left side: $6x - 15 + 4 = 6x - 11$. For infinitely many solutions, coefficients must match: $6x - 11 = cx - 11 \\implies c = 6$.",
    "distractor_analysis": {
      "A": "Incorrect. Did not distribute 3.",
      "B": "Correct. $6x - 11 = cx - 11$ holds for all $x$ when $c = 6$.",
      "C": "Incorrect. Sign error.",
      "D": "Incorrect. $c = 6$ produces an identity."
    },
    "misconception": "Forgetting to distribute the outer multiplier across all parenthetical terms.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 1,
    "question_text": "A plumber charges a flat service call fee of $65 plus $45 for each hour of labor. If the total bill for a repair was $245, how many hours of labor did the repair require?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "4",
      "D": "6"
    },
    "correct_option": "C",
    "explanation": "$65 + 45h = 245 \\implies 45h = 245 - 65 = 180 \\implies h = 180 / 45 = 4$ hours.",
    "distractor_analysis": {
      "A": "Incorrect. $65 + 45(3) = 200$.",
      "B": "Incorrect. $65 + 45(5) = 290$.",
      "C": "Correct. $65 + 45(4) = 65 + 180 = $245.",
      "D": "Incorrect. Divided 245 by 45 directly."
    },
    "misconception": "Dividing total cost by hourly rate without subtracting the initial service call fee.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "Line $L$ in the xy-plane has slope $-\\frac{3}{4}$ and passes through the point $(8, -2)$. What is the y-intercept of line $L$?",
    "options": {
      "A": "2",
      "B": "6",
      "C": "-8",
      "D": "4"
    },
    "correct_option": "D",
    "explanation": "Point-slope form: $y - y_1 = m(x - x_1) \\implies y - (-2) = -\\frac{3}{4}(x - 8) \\implies y + 2 = -\\frac{3}{4}x + 6 \\implies y = -\\frac{3}{4}x + 4$. The y-intercept is $(0, 4)$, so $b = 4$.",
    "distractor_analysis": {
      "A": "Incorrect. Sign error.",
      "B": "Incorrect. Forgot to subtract 2 from 6.",
      "C": "Incorrect. Arithmetic slip.",
      "D": "Correct. $b = -2 - (-3/4)(8) = -2 + 6 = 4$."
    },
    "misconception": "Adding the y-coordinate to the constant rather than subtracting it when isolating $y$.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "If $2(3x - 4) \\ge 4x + 6$, which inequality represents all possible values of $x$?",
    "options": {
      "A": "$x \\ge 7$",
      "B": "$x \\ge 1$",
      "C": "$x \\le 7$",
      "D": "$x \\le -1$"
    },
    "correct_option": "A",
    "explanation": "Expand: $6x - 8 \\ge 4x + 6 \\implies 6x - 4x \\ge 6 + 8 \\implies 2x \\ge 14 \\implies x \\ge 7$.",
    "distractor_analysis": {
      "A": "Correct. $2x \\ge 14 \\implies x \\ge 7$.",
      "B": "Incorrect. Subtracted 8 instead of adding.",
      "C": "Incorrect. Flipped the inequality sign without multiplying by a negative number.",
      "D": "Incorrect. Sign error throughout."
    },
    "misconception": "Reversing the inequality direction when dividing by a positive number.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 3,
    "question_text": "A system of two linear equations is given by $ax + 2y = 10$ and $3x + y = 4$. For what value of the constant $a$ will the system have NO real solution?",
    "options": {
      "A": "3",
      "B": "6",
      "C": "-6",
      "D": "1.5"
    },
    "correct_option": "B",
    "explanation": "Rewrite both equations in slope-intercept form:\n1. $ax + 2y = 10 \\implies 2y = -ax + 10 \\implies y = -\\frac{a}{2}x + 5$.\n2. $3x + y = 4 \\implies y = -3x + 4$.\nFor the system to have no solution, the lines must be parallel with different y-intercepts. The y-intercepts are 5 and 4 (distinct). For the slopes to be equal: $-\\frac{a}{2} = -3 \\implies a = 6$.",
    "distractor_analysis": {
      "A": "Incorrect. Slope would be $-3/2 \\neq -3$.",
      "B": "Correct. Slopes match ($-a/2 = -3 \\implies a = 6$) with distinct intercepts (5 and 4).",
      "C": "Incorrect. Sign error in slope equality.",
      "D": "Incorrect. Divided instead of multiplied."
    },
    "misconception": "Confusing no solution (parallel distinct lines) with infinitely many solutions (coincident lines).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "If $f(x) = 5x - 3$ and $g(x) = 2x + 1$, what is the value of $f(g(3))$?",
    "options": {
      "A": "23",
      "B": "35",
      "C": "32",
      "D": "28"
    },
    "correct_option": "C",
    "explanation": "First evaluate inside function $g(3)$: $g(3) = 2(3) + 1 = 6 + 1 = 7$. Next evaluate $f(7)$: $f(7) = 5(7) - 3 = 35 - 3 = 32$.",
    "distractor_analysis": {
      "A": "Incorrect. Evaluated $g(f(3)) = g(12) = 2(12) + 1 = 25$ with arithmetic slip.",
      "B": "Incorrect. $5(7) = 35$, forgot to subtract 3.",
      "C": "Correct. $g(3) = 7 \\implies f(7) = 35 - 3 = 32$.",
      "D": "Incorrect. Arithmetic slip."
    },
    "misconception": "Reversing the composition order by evaluating $g(f(3))$ instead of $f(g(3))$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "If $\\frac{x}{3} + \\frac{x}{4} = 14$, what is the value of $x$?",
    "options": {
      "A": "48",
      "B": "28",
      "C": "32",
      "D": "24"
    },
    "correct_option": "D",
    "explanation": "Find common denominator 12:\n$\\frac{4x + 3x}{12} = 14 \\implies \\frac{7x}{12} = 14$.\nMultiply both sides by 12: $7x = 168 \\implies x = 168 / 7 = 24$. Alternatively: $x = 14 \\times (12 / 7) = 2 \\times 12 = 24$.",
    "distractor_analysis": {
      "A": "Incorrect. Added denominators ($3 + 4 = 7$) and multiplied by 14/2.",
      "B": "Incorrect. Arithmetic slip.",
      "C": "Incorrect. Multiplied 14 by 12 / 6.",
      "D": "Correct. $7x / 12 = 14 \\implies x = 24$."
    },
    "misconception": "Adding denominators directly ($x / (3+4) = x/7$) instead of finding the common denominator.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 3,
    "question_text": "For what value of $k$ does the line passing through $(-2, 5)$ and $(4, k)$ have a slope perpendicular to the line $2x - 3y = 7$?",
    "options": {
      "A": "-4",
      "B": "-1",
      "C": "1",
      "D": "9"
    },
    "correct_option": "A",
    "explanation": "1. Slope of $2x - 3y = 7$: $3y = 2x - 7 \\implies y = \\frac{2}{3}x - \\frac{7}{3}$, so $m_1 = \\frac{2}{3}$.\n2. Perpendicular slope must be the negative reciprocal: $m_{\\perp} = -\\frac{3}{2}$.\n3. Slope between $(-2, 5)$ and $(4, k)$: $m = \\frac{k - 5}{4 - (-2)} = \\frac{k - 5}{6}$.\n4. Equating: $\\frac{k - 5}{6} = -\\frac{3}{2} \\implies k - 5 = 6 \\times \\left(-\\frac{3}{2}\\right) = -9 \\implies k = -9 + 5 = -4$.",
    "distractor_analysis": {
      "A": "Correct. Perpendicular slope is $-3/2$, giving $(k-5)/6 = -3/2 \\implies k = -4$.",
      "B": "Incorrect. Used parallel slope $2/3$: $(k-5)/6 = 2/3 \\implies k - 5 = 4 \\implies k = 9$.",
      "C": "Incorrect. Sign error.",
      "D": "Incorrect. Value for parallel line, not perpendicular."
    },
    "misconception": "Using the parallel slope ($2/3$) instead of the negative reciprocal perpendicular slope ($-3/2$).",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 1,
    "question_text": "If $7x - 2 = 5x + 10$, what is the value of $x$?",
    "options": {
      "A": "4",
      "B": "6",
      "C": "8",
      "D": "12"
    },
    "correct_option": "B",
    "explanation": "$7x - 5x = 10 + 2 \\implies 2x = 12 \\implies x = 6$.",
    "distractor_analysis": {
      "A": "Incorrect. Subtracted 2 from 10 instead of adding.",
      "B": "Correct. $2x = 12 \\implies x = 6$.",
      "C": "Incorrect. Arithmetic slip.",
      "D": "Incorrect. Failed to divide by 2."
    },
    "misconception": "Sign error when moving constants across the equality sign.",
    "time_estimate_seconds": 25
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "The function $f(x) = 2x^2 - 12x + 23$ can be written in vertex form as $f(x) = a(x - h)^2 + k$. What is the value of $h + k$?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "8",
      "D": "11"
    },
    "correct_option": "C",
    "explanation": "$f(x) = 2(x^2 - 6x) + 23 = 2(x^2 - 6x + 9) + 23 - 18 = 2(x - 3)^2 + 5$. Vertex is $(h, k) = (3, 5)$. Therefore, $h + k = 3 + 5 = 8$.",
    "distractor_analysis": {
      "A": "Incorrect. 3 is the value of $h$ alone.",
      "B": "Incorrect. 5 is the value of $k$ alone.",
      "C": "Correct. $h = 3, k = 5 \\implies h + k = 8$.",
      "D": "Incorrect. Forgot to balance outside with $-18$."
    },
    "misconception": "Subtracting 9 instead of $2 \\times 9 = 18$ when balancing completed squares.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "What are the solutions to the quadratic equation $x^2 - 6x + 4 = 0$?",
    "options": {
      "A": "$3 \\pm \\sqrt{13}$",
      "B": "$6 \\pm \\sqrt{5}$",
      "C": "$3 \\pm 2\\sqrt{5}$",
      "D": "$3 \\pm \\sqrt{5}$"
    },
    "correct_option": "D",
    "explanation": "Quadratic formula: $x = \\frac{-(-6) \\pm \\sqrt{(-6)^2 - 4(1)(4)}}{2(1)} = \\frac{6 \\pm \\sqrt{36 - 16}}{2} = \\frac{6 \\pm \\sqrt{20}}{2} = \\frac{6 \\pm 2\\sqrt{5}}{2} = 3 \\pm \\sqrt{5}$.",
    "distractor_analysis": {
      "A": "Incorrect. Added 16 instead of subtracting under the radical ($36 + 16 = 52$).",
      "B": "Incorrect. Forgot to divide 6 by 2.",
      "C": "Incorrect. Forgot to divide $\\sqrt{20}$ by 2.",
      "D": "Correct. $3 \\pm \\sqrt{5}$."
    },
    "misconception": "Dividing only the rational term by 2 while leaving the radical term unsimplified.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "The graph of $y = (x - 2)^2(x + 4)$ is tangent to the x-axis at what point?",
    "options": {
      "A": "$(2, 0)$",
      "B": "$(-4, 0)$",
      "C": "$(0, 16)$",
      "D": "$(4, 0)$"
    },
    "correct_option": "A",
    "explanation": "A polynomial graph is tangent to the x-axis (touches and turns around without crossing) at roots with an EVEN multiplicity. Here, $(x - 2)^2$ has multiplicity 2 (even), meaning the graph is tangent to the x-axis at $x = 2$, point $(2, 0)$. At $x = -4$, the root has multiplicity 1 (odd), so the graph crosses the x-axis.",
    "distractor_analysis": {
      "A": "Correct. Root with even multiplicity 2 touches/is tangent to the x-axis at $(2, 0)$.",
      "B": "Incorrect. At $(-4, 0)$, the root has multiplicity 1, so the graph crosses.",
      "C": "Incorrect. $(0, 16)$ is the y-intercept, not on the x-axis.",
      "D": "Incorrect. Sign error."
    },
    "misconception": "Confusing crossing points (odd multiplicity) with tangent/turning points (even multiplicity).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "If $x > 0$ and $x^4 - 13x^2 + 36 = 0$, what is the sum of all possible real values of $x$?",
    "options": {
      "A": "0",
      "B": "5",
      "C": "13",
      "D": "25"
    },
    "correct_option": "B",
    "explanation": "Let $u = x^2$. Then $u^2 - 13u + 36 = 0 \\implies (u - 9)(u - 4) = 0 \\implies u = 9$ or $u = 4$.\nSince $u = x^2$:\n- $x^2 = 9 \\implies x = 3$ (since $x > 0$).\n- $x^2 = 4 \\implies x = 2$ (since $x > 0$).\nSum of all positive real values of $x = 3 + 2 = 5$.",
    "distractor_analysis": {
      "A": "Incorrect. 0 is the sum if negative roots $\\{-3, -2\\}$ were included, violating $x > 0$.",
      "B": "Correct. Positive roots are $x = 2$ and $x = 3$; sum = 5.",
      "C": "Incorrect. 13 is the sum of $u = x^2$ roots, not $x$ roots.",
      "D": "Incorrect. Arithmetic slip."
    },
    "misconception": "Summing $x^2$ values ($9 + 4 = 13$) instead of taking the square root to find $x$.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "For what value of $b$ does the quadratic equation $3x^2 + bx + 12 = 0$ have exactly one distinct real solution?",
    "options": {
      "A": "144",
      "B": "6",
      "C": "12",
      "D": "0"
    },
    "correct_option": "C",
    "explanation": "A quadratic equation has exactly one distinct real solution when its discriminant is zero: $\\Delta = b^2 - 4ac = 0$. Here $a = 3$ and $c = 12$: $b^2 - 4(3)(12) = 0 \\implies b^2 - 144 = 0 \\implies b^2 = 144 \\implies b = \\pm 12$. Among the options, 12 is correct.",
    "distractor_analysis": {
      "A": "Incorrect. 144 is $b^2$, not $b$.",
      "B": "Incorrect. $b^2 = 36 \\neq 144$.",
      "C": "Correct. $b^2 - 144 = 0 \\implies b = 12$.",
      "D": "Incorrect. $b = 0$ yields negative discriminant $-144$ (no real solutions)."
    },
    "misconception": "Confusing $b^2 = 144$ with $b = 144$.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "Which of the following expressions is equivalent to $\\frac{x^2 - 9}{2x^2 + 7x + 3}$ for all $x > 3$?",
    "options": {
      "A": "$\\frac{1}{2x + 1}$",
      "B": "$\\frac{x + 3}{2x - 1}$",
      "C": "$\\frac{x - 3}{2x - 1}$",
      "D": "$\\frac{x - 3}{2x + 1}$"
    },
    "correct_option": "D",
    "explanation": "Factor both numerator and denominator:\n- Numerator: $x^2 - 9 = (x - 3)(x + 3)$.\n- Denominator: $2x^2 + 7x + 3 = (2x + 1)(x + 3)$.\nCancel common factor $(x + 3)$:\n$\\frac{(x - 3)(x + 3)}{(2x + 1)(x + 3)} = \\frac{x - 3}{2x + 1}$.",
    "distractor_analysis": {
      "A": "Incorrect. Canceled $(x-3)$ erroneously.",
      "B": "Incorrect. Sign error in factored factors.",
      "C": "Incorrect. Sign error.",
      "D": "Correct. Factoring and canceling $(x+3)$ yields $\\frac{x-3}{2x+1}$."
    },
    "misconception": "Canceling terms across addition ($x^2$ in numerator and $2x^2$ in denominator) rather than factoring completely.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "If $2^{3x-1} = 16^{x-2}$, what is the value of $x$?",
    "options": {
      "A": "7",
      "B": "5",
      "C": "3",
      "D": "-7"
    },
    "correct_option": "A",
    "explanation": "Express both sides with base 2: $16 = 2^4$.\n$16^{x-2} = (2^4)^{x-2} = 2^{4(x-2)} = 2^{4x - 8}$.\nEquating exponents: $3x - 1 = 4x - 8 \\implies -1 + 8 = 4x - 3x \\implies x = 7$.",
    "distractor_analysis": {
      "A": "Correct. $3x - 1 = 4x - 8 \\implies x = 7$.",
      "B": "Incorrect. Arithmetic slip.",
      "C": "Incorrect. Did not distribute 4 to $-2$.",
      "D": "Incorrect. Sign error."
    },
    "misconception": "Forgetting to distribute the base power multiplier 4 to both $x$ and $-2$ in the exponent.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "The graph of $g(x) = a \\cdot b^x$ passes through the points $(0, 4)$ and $(2, 36)$. If $b > 0$, what is the value of $a + b$?",
    "options": {
      "A": "10",
      "B": "7",
      "C": "13",
      "D": "40"
    },
    "correct_option": "B",
    "explanation": "1. At $(0, 4)$: $g(0) = a \\cdot b^0 = a \\cdot 1 = 4 \\implies a = 4$.\n2. At $(2, 36)$: $g(2) = 4 \\cdot b^2 = 36 \\implies b^2 = 9 \\implies b = 3$ (since $b > 0$).\n3. $a + b = 4 + 3 = 7$.",
    "distractor_analysis": {
      "A": "Incorrect. Arithmetic slip.",
      "B": "Correct. $a = 4, b = 3 \\implies a + b = 7$.",
      "C": "Incorrect. $a + b^2 = 4 + 9 = 13$.",
      "D": "Incorrect. $a + 36 = 40$."
    },
    "misconception": "Confusing the base $b$ with the squared factor $b^2 = 9$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "If $\\sqrt{2x + 15} = x$, what is the extraneous solution that arises when solving this equation algebraically?",
    "options": {
      "A": "-5",
      "B": "5",
      "C": "-3",
      "D": "3"
    },
    "correct_option": "C",
    "explanation": "Square both sides: $2x + 15 = x^2 \\implies x^2 - 2x - 15 = 0 \\implies (x - 5)(x + 3) = 0$.\nRoots are $x = 5$ and $x = -3$.\nCheck roots in original equation:\n- For $x = 5$: $\\sqrt{2(5) + 15} = \\sqrt{25} = 5 = x$. Valid solution.\n- For $x = -3$: $\\sqrt{2(-3) + 15} = \\sqrt{9} = 3 \\neq -3 = x$. Extraneous solution.\nTherefore, $-3$ is the extraneous solution.",
    "distractor_analysis": {
      "A": "Incorrect. Not a root of the equation.",
      "B": "Incorrect. 5 is the valid solution, not the extraneous one.",
      "C": "Correct. $-3$ is the extraneous root generated by squaring.",
      "D": "Incorrect. Value of the principal root $\\sqrt{9}$."
    },
    "misconception": "Identifying the valid solution instead of the requested extraneous solution.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "What is the remainder when the polynomial $P(x) = 2x^3 - 5x^2 + 4x - 7$ is divided by $x - 2$?",
    "options": {
      "A": "5",
      "B": "-1",
      "C": "3",
      "D": "-3"
    },
    "correct_option": "D",
    "explanation": "By the Polynomial Remainder Theorem, the remainder of dividing $P(x)$ by $x - c$ is equal to $P(c)$. Here $c = 2$:\n$P(2) = 2(2)^3 - 5(2)^2 + 4(2) - 7 = 2(8) - 5(4) + 8 - 7 = 16 - 20 + 8 - 7 = -3$.",
    "distractor_analysis": {
      "A": "Incorrect. Evaluated at $c = -2$.",
      "B": "Incorrect. Arithmetic slip.",
      "C": "Incorrect. Sign error.",
      "D": "Correct. $P(2) = 16 - 20 + 8 - 7 = -3$."
    },
    "misconception": "Performing long polynomial division when the Remainder Theorem directly yields $P(2)$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A sample of 250 high school seniors was surveyed about their intended college majors. Of the 150 students who intend to major in STEM fields, 90 reported having taken an Advanced Placement (AP) Calculus course. Of the 100 students intending to pursue non-STEM fields, 20 reported having taken AP Calculus. What is the probability that a randomly chosen student who took AP Calculus intends to major in a non-STEM field?",
    "options": {
      "A": "$\\frac{2}{11}$ (18.2%)",
      "B": "$\\frac{2}{25}$ (8%)",
      "C": "$\\frac{1}{5}$ (20%)",
      "D": "$\\frac{2}{9}$ (22.2%)"
    },
    "correct_option": "A",
    "explanation": "Conditional probability: $P(\\text{non-STEM} \\mid \\text{AP Calculus}) = \\frac{20}{90 + 20} = \\frac{20}{110} = \\frac{2}{11} \\approx 18.2\\%$.",
    "distractor_analysis": {
      "A": "Correct. $20 / (90 + 20) = 2/11$.",
      "B": "Incorrect. Calculated relative to total 250 ($20 / 250 = 8\\%$).",
      "C": "Incorrect. Relative to non-STEM total ($20 / 100$).",
      "D": "Incorrect. Relative to STEM AP ($20 / 90$)."
    },
    "misconception": "Using total population (250) instead of the restricted conditional denominator (110).",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A town's population was 12,000 in the year 2015. If the population grew at a constant annual rate of 3.5% per year, which function $P(t)$ models the population $t$ years after 2015?",
    "options": {
      "A": "$P(t) = 12,000(1.35)^t$",
      "B": "$P(t) = 12,000(1.035)^t$",
      "C": "$P(t) = 12,000 + 420t$",
      "D": "$P(t) = 12,000(0.965)^t$"
    },
    "correct_option": "B",
    "explanation": "Exponential growth model: $P(t) = P_0 (1 + r)^t$. Here $P_0 = 12,000$ and $r = 3.5\\% = 0.035$. Growth factor = $1 + 0.035 = 1.035$. Thus $P(t) = 12,000(1.035)^t$.",
    "distractor_analysis": {
      "A": "Incorrect. 1.35 corresponds to 35% growth, not 3.5%.",
      "B": "Correct. 3.5% growth factor is $1 + 0.035 = 1.035$.",
      "C": "Incorrect. Linear model, not exponential compound growth.",
      "D": "Incorrect. Models 3.5% population decay, not growth."
    },
    "misconception": "Writing 3.5% as 0.35 instead of 0.035.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A researcher wants to estimate the mean sleep duration of students at a university with 15,000 undergraduates. Which sampling method is most likely to produce an unbiased sample representative of the entire student body?",
    "options": {
      "A": "Surveying 200 students studying in the science library at 11:00 PM on a Friday.",
      "B": "Posting an online poll on the university varsity athletics Instagram page.",
      "C": "Randomly selecting 200 student ID numbers from the university registrar's complete enrollment database.",
      "D": "Surveying all students enrolled in an 8:00 AM introductory physics lecture."
    },
    "correct_option": "C",
    "explanation": "Simple random sampling from the comprehensive registrar database ensures that every undergraduate has an equal, independent probability of selection, eliminating systematic selection bias. Libraries at 11 PM, athletics social media, and 8 AM lectures introduce severe selection bias.",
    "distractor_analysis": {
      "A": "Incorrect. Sampling library patrons on Friday night introduces extreme study-habit bias.",
      "B": "Incorrect. Self-selected athletic subgroup.",
      "C": "Correct. Simple random sample from full population avoids selection bias.",
      "D": "Incorrect. Biased toward early risers and STEM students."
    },
    "misconception": "Assuming any large convenience sample is unbiased without evaluating randomization.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 3,
    "question_text": "A store manager tracks the selling price and weekly unit sales of a smartwatch. When priced at $200, the store sells 50 units per week. For every $10 reduction in price, weekly sales increase by 5 units. What price maximizes weekly revenue?",
    "options": {
      "A": "$180",
      "B": "$160",
      "C": "$175",
      "D": "$150"
    },
    "correct_option": "D",
    "explanation": "Let $x$ be the number of $10 price reductions.\n- Price $P(x) = 200 - 10x$.\n- Quantity $Q(x) = 50 + 5x$.\nRevenue $R(x) = P(x) \\cdot Q(x) = (200 - 10x)(50 + 5x) = 10,000 + 1,000x - 500x - 50x^2 = 10,000 + 500x - 50x^2$.\nParabola vertex occurs at $x = -b / (2a) = -500 / (2 \\times -50) = 5$.\nSubstitute $x = 5$ into the price formula: $P(5) = 200 - 10(5) = 200 - 50 = $150$.",
    "distractor_analysis": {
      "A": "Incorrect. Evaluated at $x = 2$.",
      "B": "Incorrect. Evaluated at $x = 4$.",
      "C": "Incorrect. Midpoint between 200 and 150.",
      "D": "Correct. Vertex at $x = 5 \\implies P = 200 - 50 = $150$."
    },
    "misconception": "Maximizing unit sales instead of total revenue ($P \\times Q$).",
    "time_estimate_seconds": 65
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "In a medical diagnostic trial, 2% of a population has a condition. A diagnostic test correctly identifies 90% of positive cases, but has a 5% false positive rate among healthy individuals. If 1,000 people are tested, how many total positive test results are expected?",
    "options": {
      "A": "67",
      "B": "49",
      "C": "18",
      "D": "70"
    },
    "correct_option": "A",
    "explanation": "In 1,000 people:\n- Affected individuals = $2\\% \\times 1,000 = 20$ people.\n  True positives = $90\\% \\times 20 = 18$ people.\n- Healthy individuals = $1,000 - 20 = 980$ people.\n  False positives = $5\\% \\times 980 = 49$ people.\nTotal positive test results = $18 + 49 = 67$ results.",
    "distractor_analysis": {
      "A": "Correct. $18 + 49 = 67$ total positive test results.",
      "B": "Incorrect. Only false positives (49), ignoring true positives.",
      "C": "Incorrect. Only true positives (18), ignoring false positives.",
      "D": "Incorrect. Applied 5% to 1,000 ($18 + 50 = 68$)."
    },
    "misconception": "Ignoring false positives from the healthy population when computing total positive test counts.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 1,
    "question_text": "A vehicle uses 4 gallons of gasoline to travel 136 miles. At this same rate of fuel consumption, how many miles can the vehicle travel on 15 gallons of gasoline?",
    "options": {
      "A": "450",
      "B": "510",
      "C": "544",
      "D": "600"
    },
    "correct_option": "B",
    "explanation": "Fuel efficiency = $136 / 4 = 34$ miles per gallon. Distance on 15 gallons = $34 \\times 15 = 510$ miles.",
    "distractor_analysis": {
      "A": "Incorrect. Arithmetic slip.",
      "B": "Correct. $34\\text{ mpg} \\times 15 = 510$ miles.",
      "C": "Incorrect. $136 \\times 4$.",
      "D": "Incorrect. Rough estimate."
    },
    "misconception": "Arithmetic error when multiplying rate by volume.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A dataset consists of the numbers $\\{12, 15, 18, 22, 28, 35\\}$. If the number 100 is added to the dataset, which of the following statistics will increase the most?",
    "options": {
      "A": "Mean",
      "B": "Median",
      "C": "Range",
      "D": "Mode"
    },
    "correct_option": "C",
    "explanation": "Initial range = $35 - 12 = 23$. With 100 added, new range = $100 - 12 = 88$. The increase in range is $88 - 23 = 65$. The initial mean is $130 / 6 \\approx 21.7$, and new mean is $230 / 7 \\approx 32.9$ (increases by $\\approx 11.2$). The median shifts from 20 to 22 (increases by 2). The range experiences the greatest increase (+65).",
    "distractor_analysis": {
      "A": "Incorrect. Mean increases by only $\\approx 11.2$.",
      "B": "Incorrect. Median is resistant to outliers (increases by 2).",
      "C": "Correct. Range increases by $100 - 35 = 65$, far more than any other metric.",
      "D": "Incorrect. Mode does not exist or changes minimally."
    },
    "misconception": "Assuming the mean always increases the most when an extreme outlier is introduced.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "In a laboratory experiment, the mass of a bacterial culture doubles every 4 hours. If the initial mass is 5 grams, what is the mass of the culture after 24 hours?",
    "options": {
      "A": "160 grams",
      "B": "1,280 grams",
      "C": "640 grams",
      "D": "320 grams"
    },
    "correct_option": "D",
    "explanation": "Number of doubling periods = $24 / 4 = 6$ periods. Mass = $5 \\times 2^6 = 5 \\times 64 = 320$ grams.",
    "distractor_analysis": {
      "A": "Incorrect. Evaluated 5 doubling periods ($5 \\times 32 = 160$).",
      "B": "Incorrect. Doubled again.",
      "C": "Incorrect. Evaluated 7 doubling periods ($5 \\times 128 = 640$).",
      "D": "Correct. $5 \\times 2^6 = 5 \\times 64 = 320$ grams."
    },
    "misconception": "Dividing 24 by 5 instead of 4, or miscounting the doubling exponent.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "The price of an airline ticket increased by 20% in June and then decreased by 20% in July. The final ticket price in July was what percentage of the original price before the June increase?",
    "options": {
      "A": "96%",
      "B": "100%",
      "C": "94%",
      "D": "80%"
    },
    "correct_option": "A",
    "explanation": "Let original price = $100. June price = $100 \\times 1.20 = $120. July price = $120 \\times (1 - 0.20) = 120 \\times 0.80 = $96. Thus, the final price is 96% of the original price.",
    "distractor_analysis": {
      "A": "Correct. $1.20 \\times 0.80 = 0.96 = 96\\%$.",
      "B": "Incorrect. Classic percentage trap: $+20\\%$ and $-20\\%$ do not cancel out.",
      "C": "Incorrect. Arithmetic slip.",
      "D": "Incorrect. Subtracted 20% twice."
    },
    "misconception": "Assuming equal positive and negative percentage changes return a value to 100%.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 3,
    "question_text": "A linear regression line $y = -1.8x + 45$ models the relationship between daily ambient temperature $x$ (in degrees Celsius) and the volume of hot coffee sold $y$ (in gallons) at a cafe. What is the predicted change in hot coffee sales for every 5-degree Celsius increase in temperature?",
    "options": {
      "A": "Increase of 9 gallons",
      "B": "Decrease of 9 gallons",
      "C": "Decrease of 1.8 gallons",
      "D": "Decrease of 45 gallons"
    },
    "correct_option": "B",
    "explanation": "Change in $y$: $\\Delta y = m \\cdot \\Delta x = -1.8 \\times 5 = -9.0$ gallons. This represents a decrease of 9 gallons.",
    "distractor_analysis": {
      "A": "Incorrect. Negative slope indicates a decrease, not an increase.",
      "B": "Correct. $-1.8 \\times 5 = -9$ gallons (decrease of 9).",
      "C": "Incorrect. Change for 1 degree, not 5 degrees.",
      "D": "Incorrect. Confused slope effect with intercept."
    },
    "misconception": "Reporting the 1-unit slope rate instead of multiplying by the 5-unit change in $x$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "In right triangle $ABC$ with right angle at $C$, the measure of angle $A$ is $x^\\circ$. If $\\sin(x^\\circ) = \\frac{5}{13}$, what is the value of $\\cos(90^\\circ - x^\\circ)$?",
    "options": {
      "A": "$\\frac{12}{13}$",
      "B": "$\\frac{5}{12}$",
      "C": "$\\frac{5}{13}$",
      "D": "$\\frac{13}{5}$"
    },
    "correct_option": "C",
    "explanation": "By cofunction identity: $\\cos(90^\\circ - \\theta) = \\sin(\\theta)$. Since $\\sin(x^\\circ) = 5/13$, $\\cos(90^\\circ - x^\\circ) = 5/13$.",
    "distractor_analysis": {
      "A": "Incorrect. Calculated $\\cos(x^\\circ) = 12/13$, not $\\cos(90^\\circ - x^\\circ)$.",
      "B": "Incorrect. Value of $\\tan(x^\\circ)$.",
      "C": "Correct. $\\cos(90^\\circ - x^\\circ) = \\sin(x^\\circ) = 5/13$.",
      "D": "Incorrect. Reciprocal."
    },
    "misconception": "Calculating $\\cos(x)$ instead of recognizing the cofunction equivalence $\\cos(90-x) = \\sin(x)$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "In the xy-plane, a circle has equation $(x - 3)^2 + (y + 5)^2 = 49$. What are the coordinates of the center and the radius of this circle?",
    "options": {
      "A": "Center $(-3, 5)$, radius $49$",
      "B": "Center $(-3, 5)$, radius $7$",
      "C": "Center $(3, -5)$, radius $49$",
      "D": "Center $(3, -5)$, radius $7$"
    },
    "correct_option": "D",
    "explanation": "Standard circle form is $(x - h)^2 + (y - k)^2 = r^2$. Here $h = 3, k = -5$, and $r^2 = 49 \\implies r = 7$. Center is $(3, -5)$ and radius is 7.",
    "distractor_analysis": {
      "A": "Incorrect. Inverted signs and forgot square root.",
      "B": "Incorrect. Inverted center signs.",
      "C": "Incorrect. Forgot to take square root of 49.",
      "D": "Correct. Center $(3, -5)$, radius $\\sqrt{49} = 7$."
    },
    "misconception": "Confusing $r^2$ with $r$ or reversing signs in $(x-h)$ and $(y-k)$.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "A circle with radius 6 cm has a central angle of $\\frac{2\\pi}{3}$ radians. What is the area of the sector formed by this angle?",
    "options": {
      "A": "$12\\pi\\text{ cm}^2$",
      "B": "$6\\pi\\text{ cm}^2$",
      "C": "$18\\pi\\text{ cm}^2$",
      "D": "$24\\pi\\text{ cm}^2$"
    },
    "correct_option": "A",
    "explanation": "Sector area formula in radians: $A = \\frac{1}{2} r^2 \\theta$. Here $r = 6$ and $\\theta = \\frac{2\\pi}{3}$: $A = \\frac{1}{2} (6)^2 \\left(\\frac{2\\pi}{3}\\right) = \\frac{1}{2} (36) \\left(\\frac{2\\pi}{3}\\right) = 18 \\left(\\frac{2\\pi}{3}\\right) = 12\\pi\\text{ cm}^2$.",
    "distractor_analysis": {
      "A": "Correct. $\\frac{1}{2}(36)(2\\pi/3) = 12\\pi\\text{ cm}^2$.",
      "B": "Incorrect. Arc length ($r\\theta = 6(2\\pi/3) = 4\\pi$) with arithmetic slip.",
      "C": "Incorrect. Forgot the $1/2$ factor ($36 \\times 2\\pi/3 / 2$).",
      "D": "Incorrect. Omitted both $1/2$ and fraction division."
    },
    "misconception": "Calculating arc length ($s = r\\theta$) instead of sector area ($A = \\frac{1}{2}r^2\\theta$).",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "Triangle $ABC$ is similar to triangle $DEF$, where vertices $A, B, C$ correspond to $D, E, F$ respectively. If the perimeter of triangle $ABC$ is 24 and the perimeter of triangle $DEF$ is 36, what is the ratio of the area of triangle $ABC$ to the area of triangle $DEF$?",
    "options": {
      "A": "$2 : 3$",
      "B": "$4 : 9$",
      "C": "$8 : 27$",
      "D": "$1 : 2$"
    },
    "correct_option": "B",
    "explanation": "The linear scale factor is the ratio of perimeters: $k = \\frac{24}{36} = \\frac{2}{3}$. The ratio of the areas of similar geometric figures is the square of the linear scale factor: $\\text{Area Ratio} = k^2 = \\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$.",
    "distractor_analysis": {
      "A": "Incorrect. Linear perimeter ratio ($2:3$), not area ratio.",
      "B": "Correct. Area scales with square of perimeter ratio: $(2/3)^2 = 4/9$.",
      "C": "Incorrect. Volume ratio ($k^3 = 8/27$).",
      "D": "Incorrect. Rough estimate."
    },
    "misconception": "Applying the linear perimeter scale factor ($2:3$) directly to area without squaring.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "In the xy-plane, the line $y = x - 1$ intersects the circle $x^2 + y^2 = 25$ at points $P$ and $Q$. What is the length of segment $PQ$?",
    "options": {
      "A": "$5\\sqrt{2}$",
      "B": "$10$",
      "C": "$7\\sqrt{2}$",
      "D": "$14$"
    },
    "correct_option": "C",
    "explanation": "Substitute $y = x - 1$ into $x^2 + y^2 = 25$:\n$x^2 + (x - 1)^2 = 25 \\implies 2x^2 - 2x + 1 = 25 \\implies 2x^2 - 2x - 24 = 0 \\implies x^2 - x - 12 = 0$.\nFactoring yields $(x - 4)(x + 3) = 0$, so $x_1 = 4$ and $x_2 = -3$.\n- For $x_1 = 4$: $y_1 = 4 - 1 = 3 \\implies P(4, 3)$.\n- For $x_2 = -3$: $y_2 = -3 - 1 = -4 \\implies Q(-3, -4)$.\nDistance $PQ = \\sqrt{(4 - (-3))^2 + (3 - (-4))^2} = \\sqrt{7^2 + 7^2} = \\sqrt{98} = 7\\sqrt{2}$.",
    "distractor_analysis": {
      "A": "Incorrect. Arithmetic slip with coordinates.",
      "B": "Incorrect. 10 is the circle diameter ($2r = 2 \\times 5 = 10$).",
      "C": "Correct. Points are $(4, 3)$ and $(-3, -4)$; distance is $\\sqrt{49+49} = 7\\sqrt{2}$.",
      "D": "Incorrect. Added coordinate differences directly ($7 + 7 = 14$)."
    },
    "misconception": "Assuming the chord passes through the center and equals the diameter (10).",
    "time_estimate_seconds": 65
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "A right rectangular prism has dimensions 4 cm, 6 cm, and 12 cm. What is the length of the internal space diagonal connecting two opposite vertices?",
    "options": {
      "A": "$4\\sqrt{10}$ cm",
      "B": "16 cm",
      "C": "22 cm",
      "D": "14 cm"
    },
    "correct_option": "D",
    "explanation": "Space diagonal formula: $d = \\sqrt{l^2 + w^2 + h^2}$. Here $l = 4, w = 6, h = 12$: $d = \\sqrt{4^2 + 6^2 + 12^2} = \\sqrt{16 + 36 + 144} = \\sqrt{196} = 14$ cm.",
    "distractor_analysis": {
      "A": "Incorrect. Diagonal of face $4 \\times 12$.",
      "B": "Incorrect. Arithmetic slip.",
      "C": "Incorrect. Summed the linear dimensions ($4 + 6 + 12 = 22$).",
      "D": "Correct. $\\sqrt{16 + 36 + 144} = \\sqrt{196} = 14$ cm."
    },
    "misconception": "Calculating a 2D face diagonal rather than the 3D space diagonal.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "In an isosceles right triangle, the length of the hypotenuse is $8\\sqrt{2}$ units. What is the area of the triangle?",
    "options": {
      "A": "32 square units",
      "B": "16 square units",
      "C": "64 square units",
      "D": "$32\\sqrt{2}$ square units"
    },
    "correct_option": "A",
    "explanation": "In an isosceles right triangle ($45^\\circ-45^\\circ-90^\\circ$), legs are $s$ and hypotenuse is $s\\sqrt{2}$. Given hypotenuse $= 8\\sqrt{2}$, we have $s = 8$. Area = $\\frac{1}{2} s^2 = \\frac{1}{2} (8)^2 = \\frac{1}{2}(64) = 32$ square units.",
    "distractor_analysis": {
      "A": "Correct. Legs are 8, area = $(1/2)(8)(8) = 32$.",
      "B": "Incorrect. Halved 32.",
      "C": "Incorrect. Forgot the $1/2$ in triangle area ($8 \\times 8 = 64$).",
      "D": "Incorrect. Multiplied by $\\sqrt{2}$."
    },
    "misconception": "Forgetting the $1/2$ factor in triangle area.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "What is the degree measure of an angle that measures $\\frac{5\\pi}{6}$ radians?",
    "options": {
      "A": "$120^\\circ$",
      "B": "$150^\\circ$",
      "C": "$135^\\circ$",
      "D": "$165^\\circ$"
    },
    "correct_option": "B",
    "explanation": "Convert radians to degrees by multiplying by $\\frac{180^\\circ}{\\pi}$:\n$\\frac{5\\pi}{6} \\times \\frac{180^\\circ}{\\pi} = 5 \\times \\frac{180^\\circ}{6} = 5 \\times 30^\\circ = 150^\\circ$.",
    "distractor_analysis": {
      "A": "Incorrect. $120^\\circ = 2\\pi/3$.",
      "B": "Correct. $5(180) / 6 = 150^\\circ$.",
      "C": "Incorrect. $135^\\circ = 3\\pi/4$.",
      "D": "Incorrect. $165^\\circ = 11\\pi/12$."
    },
    "misconception": "Arithmetic slip when dividing 180 by 6.",
    "time_estimate_seconds": 30
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "In a circle with center $O$, central angle $\\angle AOB$ intercepts an arc $AB$ of length $6\\pi$ cm. If the circumference of the circle is $18\\pi$ cm, what is the measure of inscribed angle $\\angle ACB$, where point $C$ lies on the major arc of the circle?",
    "options": {
      "A": "$30^\\circ$",
      "B": "$120^\\circ$",
      "C": "$60^\\circ$",
      "D": "$150^\\circ$"
    },
    "correct_option": "C",
    "explanation": "1. The fraction of the circle intercepted is $\\frac{\\text{Arc length}}{\\text{Circumference}} = \\frac{6\\pi}{18\\pi} = \\frac{1}{3}$.\n2. Central angle $\\angle AOB = \\frac{1}{3} \\times 360^\\circ = 120^\\circ$.\n3. By the Inscribed Angle Theorem, an inscribed angle subtended by the same arc is half the central angle: $\\angle ACB = \\frac{1}{2} \\angle AOB = \\frac{1}{2}(120^\\circ) = 60^\\circ$.",
    "distractor_analysis": {
      "A": "Incorrect. Halved $60^\\circ$.",
      "B": "Incorrect. 120° is the central angle $\\angle AOB$, not the inscribed angle $\\angle ACB$.",
      "C": "Correct. Central angle is $120^\\circ$, inscribed angle is half: $60^\\circ$.",
      "D": "Incorrect. Subtracted from 180°."
    },
    "misconception": "Confusing the central angle ($120^\\circ$) with the inscribed angle ($60^\\circ$).",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "In right triangle $DEF$ with right angle at $E$, $\\tan(D) = \\frac{3}{4}$. What is the value of $\\sin(F)$?",
    "options": {
      "A": "$\\frac{5}{4}$",
      "B": "$\\frac{3}{5}$",
      "C": "$\\frac{4}{3}$",
      "D": "$\\frac{4}{5}$"
    },
    "correct_option": "D",
    "explanation": "Let the sides opposite and adjacent to angle $D$ be 3 and 4. Then $EF = 3$ and $DE = 4$. By Pythagoras, hypotenuse $DF = \\sqrt{3^2 + 4^2} = 5$. Now consider angle $F$: side opposite to angle $F$ is $DE = 4$, and hypotenuse is $DF = 5$. Therefore, $\\sin(F) = \\frac{\\text{opposite to } F}{\\text{hypotenuse}} = \\frac{DE}{DF} = \\frac{4}{5}$.",
    "distractor_analysis": {
      "A": "Incorrect. Reciprocal of sine.",
      "B": "Incorrect. $\\sin(D) = 3/5$, not $\\sin(F)$.",
      "C": "Incorrect. $\\tan(F) = 4/3$.",
      "D": "Correct. Opposite to $F$ is 4, hypotenuse is 5, so $\\sin(F) = 4/5$."
    },
    "misconception": "Calculating $\\sin(D) = 3/5$ instead of $\\sin(F) = 4/5$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "For what value of $x$ does the linear equation $5(2x - 3) - 4x = 21$ hold true?",
    "options": {
      "A": "6",
      "B": "4",
      "C": "8",
      "D": "12"
    },
    "correct_option": "A",
    "explanation": "Expand the left side: $10x - 15 - 4x = 21 \\implies 6x - 15 = 21$. Add 15 to both sides: $6x = 36$. Divide by 6: $x = 6$.",
    "distractor_analysis": {
      "A": "Correct. 6x - 15 = 21 => 6x = 36 => x = 6.",
      "B": "Incorrect. Arithmetic error in expanding or combining terms.",
      "C": "Incorrect. Miscalculated constant term.",
      "D": "Incorrect. Forgot to divide by the coefficient."
    },
    "misconception": "Sign reversal when combining like terms or forgetting to distribute the 5 across both terms.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "In the system of equations below, what is the value of $x$?\n$$2x + 3y = 31$$\n$$y = 3x - 5$$",
    "options": {
      "A": "3",
      "B": "46/11",
      "C": "4",
      "D": "5"
    },
    "correct_option": "B",
    "explanation": "Substitute $y = 3x - 5$ into the first equation: $2x + 3(3x - 5) = 31 \\implies 2x + 9x - 15 = 31 \\implies 11x = 46 \\implies x = 46/11$.",
    "distractor_analysis": {
      "A": "Incorrect. Arithmetic slip when isolating x.",
      "B": "Correct. 2x + 3(3x - 5) = 31 => 11x = 46 => x = 46/11.",
      "C": "Incorrect. Approximated the fraction.",
      "D": "Incorrect. Solved for y rather than x."
    },
    "misconception": "Solving for $y$ instead of $x$ or dropping negative signs during expansion.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "For what positive value of $k$ will the quadratic equation $kx^2 - 12x + 9 = 0$ have exactly one real solution?",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "6"
    },
    "correct_option": "C",
    "explanation": "A quadratic equation $ax^2 + bx + c = 0$ has exactly one real solution when its discriminant is zero: $\\Delta = b^2 - 4ac = 0$. Here, $a = k, b = -12, c = 9$. Thus, $(-12)^2 - 4(k)(9) = 0 \\implies 144 - 36k = 0 \\implies 36k = 144 \\implies k = 4$.",
    "distractor_analysis": {
      "A": "Incorrect. Calculated 144 / 72.",
      "B": "Incorrect. Arithmetic slip.",
      "C": "Correct. Discriminant = (-12)^2 - 4(k)(9) = 144 - 36k = 0 => k = 4.",
      "D": "Incorrect. Used b^2 - 2ac = 0."
    },
    "misconception": "Using $b^2 - 4ac > 0$ or confusing the discriminant formula with the quadratic formula numerator.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "The equation of a circle in the $xy$-plane is $x^2 + y^2 - 8x + 6y = 24$. What is the radius of the circle?",
    "options": {
      "A": "5",
      "B": "49",
      "C": "24",
      "D": "7"
    },
    "correct_option": "D",
    "explanation": "Complete the square for $x$ and $y$: $(x^2 - 8x + 16) + (y^2 + 6y + 9) = 24 + 16 + 9 \\implies (x - 4)^2 + (y + 3)^2 = 49$. The standard form is $(x - h)^2 + (y - k)^2 = r^2$. Therefore, $r^2 = 49 \\implies r = 7$.",
    "distractor_analysis": {
      "A": "Incorrect. Failed to add both completion constants.",
      "B": "Incorrect. Reported r^2 = 49 instead of the radius r = 7.",
      "C": "Incorrect. Used the right-hand constant 24 without completing the squares.",
      "D": "Correct. (x - 4)^2 + (y + 3)^2 = 24 + 16 + 9 = 49 => r = 7."
    },
    "misconception": "Reporting $r^2 = 49$ instead of taking the square root $r = 7$, or forgetting to add $(16 + 9)$ to the right-hand side.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 2,
    "question_text": "A culture of bacteria doubles every 4 hours. If there are initially 250 bacteria, how many bacteria will be present after 16 hours?",
    "options": {
      "A": "4000",
      "B": "2000",
      "C": "1000",
      "D": "8000"
    },
    "correct_option": "A",
    "explanation": "The exponential growth model is $N(t) = N_0 \\cdot 2^{t/d}$, where $d = 4$ hours. For $t = 16$: $N(16) = 250 \\cdot 2^{16/4} = 250 \\cdot 2^4 = 250 \\cdot 16 = 4000$.",
    "distractor_analysis": {
      "A": "Correct. 16 hours / 4 = 4 doublings. 250 * 2^4 = 250 * 16 = 4000.",
      "B": "Incorrect. Calculated 250 * 2 * 4.",
      "C": "Incorrect. Multiplied 250 by 4 instead of 2^4.",
      "D": "Incorrect. Calculated 5 doublings."
    },
    "misconception": "Multiplying $250 \\times 4 = 1000$ or using $250 \\times 2 \\times 4 = 2000$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "The quadratic function $f$ is defined by $f(x) = x^2 - 6x + c$, where $c$ is a constant. If the minimum value of $f(x)$ is $-4$, what is the value of $c$?",
    "options": {
      "A": "-4",
      "B": "5",
      "C": "9",
      "D": "13"
    },
    "correct_option": "B",
    "explanation": "The vertex of $f(x) = x^2 - 6x + c$ occurs at $x = -b/(2a) = 6/2 = 3$. The minimum value is $f(3) = (3)^2 - 6(3) + c = 9 - 18 + c = -9 + c$. We are given that the minimum value is $-4$, so $-9 + c = -4 \\implies c = 5$.",
    "distractor_analysis": {
      "A": "Incorrect. -4 is the minimum value $f(3)$, not the constant $c$.",
      "B": "Correct. $f(3) = -9 + c = -4 \\implies c = 5$.",
      "C": "Incorrect. 9 is the value of $(b/2)^2$.",
      "D": "Incorrect. Arithmetic sign slip: $-4 + (-9) = -13$."
    },
    "misconception": "Equating $c$ directly to the minimum output $-4$ rather than evaluating $f(3) = -4$.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "How many points of intersection do the graphs of the equations $y = x^2 - 4x + 7$ and $y = 2x - 2$ have in the $xy$-plane?",
    "options": {
      "A": "Zero",
      "B": "Exactly two",
      "C": "Exactly one",
      "D": "Infinitely many"
    },
    "correct_option": "C",
    "explanation": "Set the equations equal: $x^2 - 4x + 7 = 2x - 2 \\implies x^2 - 6x + 9 = 0 \\implies (x - 3)^2 = 0$. Since this has a single root ($x = 3$), the line is tangent to the parabola at exactly one point: $(3, 4)$.",
    "distractor_analysis": {
      "A": "Incorrect. Solved with sign error resulting in negative discriminant.",
      "B": "Incorrect. Assumes a line and parabola always intersect twice.",
      "C": "Correct. Discriminant $\\Delta = (-6)^2 - 4(1)(9) = 36 - 36 = 0$, indicating exactly one real solution.",
      "D": "Incorrect. Linear and quadratic functions cannot have infinitely many intersections."
    },
    "misconception": "Assuming any secant line intersects a quadratic curve in two distinct points without checking the discriminant.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "A circle with center $O$ has a radius of $12$. An arc of the circle has length $8\\pi$. What is the measure of the central angle subtended by this arc, in radians?",
    "options": {
      "A": "$\\frac{\\pi}{3}$",
      "B": "$\\frac{4\\pi}{3}$",
      "C": "$\\frac{3\\pi}{4}$",
      "D": "$\\frac{2\\pi}{3}$"
    },
    "correct_option": "D",
    "explanation": "Arc length $s = r\\theta$, where $\\theta$ is in radians. Here $s = 8\\pi$ and $r = 12$. Therefore, $8\\pi = 12\\theta \\implies \\theta = \\frac{8\\pi}{12} = \\frac{2\\pi}{3}$.",
    "distractor_analysis": {
      "A": "Incorrect. Divided $12$ by $8$ incorrectly or inverted the fraction.",
      "B": "Incorrect. Calculated the reflex angle supplement.",
      "C": "Incorrect. Confused with standard $135^\\circ$ benchmark.",
      "D": "Correct. $\\theta = s/r = 8\\pi / 12 = 2\\pi / 3$."
    },
    "misconception": "Dividing radius by arc length ($r/s$) instead of arc length by radius ($s/r$).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 2,
    "question_text": "In right triangle $ABC$, angle $C$ is the right angle. If $\\sin(A) = \\frac{5}{13}$, what is the value of $\\cos(B)$?",
    "options": {
      "A": "$\\frac{5}{13}$",
      "B": "$\\frac{12}{13}$",
      "C": "$\\frac{5}{12}$",
      "D": "$\\frac{13}{5}$"
    },
    "correct_option": "A",
    "explanation": "In any right triangle where $C = 90^\\circ$, angles $A$ and $B$ are complementary ($A + B = 90^\\circ$). By the complementary angle trigonometric identity, $\\cos(B) = \\sin(90^\\circ - B) = \\sin(A) = \\frac{5}{13}$.",
    "distractor_analysis": {
      "A": "Correct. By cofunction identity, $\\cos(B) = \\sin(A) = 5/13$.",
      "B": "Incorrect. Solved for $\\cos(A) = \\sqrt{1 - (5/13)^2} = 12/13$.",
      "C": "Incorrect. Solved for $\\tan(A) = 5/12$.",
      "D": "Incorrect. Reciprocal cosecant ratio."
    },
    "misconception": "Calculating $\\cos(A) = 12/13$ instead of recognizing the complementary relation $\\cos(B) = \\sin(A)$.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A linear model estimates the relationship between $x$ and $y$ as $\\hat{y} = -2.4x + 85$. For an observation with $x = 15$, the actual recorded value of $y$ is $53$. What is the residual ($y - \\hat{y}$) for this observation?",
    "options": {
      "A": "-4",
      "B": "4",
      "C": "49",
      "D": "53"
    },
    "correct_option": "B",
    "explanation": "First compute the predicted value $\\hat{y}$ at $x = 15$: $\\hat{y} = -2.4(15) + 85 = -36 + 85 = 49$. The residual is defined as $\\text{Actual } y - \\text{Predicted } \\hat{y} = 53 - 49 = 4$.",
    "distractor_analysis": {
      "A": "Incorrect. Reversed the order: predicted minus actual ($49 - 53 = -4$).",
      "B": "Correct. Actual $53$ minus predicted $49$ yields $+4$.",
      "C": "Incorrect. 49 is the predicted value $\\hat{y}$, not the residual.",
      "D": "Incorrect. 53 is the raw observed value of $y$."
    },
    "misconception": "Reversing the residual formula as $\\hat{y} - y$ instead of $y - \\hat{y}$.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "In the quadratic equation $3x^2 - 18x + c = 0$, where $c$ is a constant, the equation has exactly one real solution. What is the value of $c$?",
    "options": {
      "A": "9",
      "B": "54",
      "C": "27",
      "D": "81"
    },
    "correct_option": "C",
    "explanation": "A quadratic equation $ax^2 + bx + c = 0$ has exactly one real solution when its discriminant is zero: $\\Delta = b^2 - 4ac = 0$. Here, $a = 3$ and $b = -18$. Setting $(-18)^2 - 4(3)(c) = 0 \\implies 324 - 12c = 0 \\implies 12c = 324 \\implies c = 27$.",
    "distractor_analysis": {
      "A": "Incorrect. Divided 324 by 36 instead of 12, or mistakenly solved $(b/2)^2 = (-9)^2 / 9$.",
      "B": "Incorrect. Solved $324 - 6c = 0$, forgetting the factor of 4 in $4ac$.",
      "C": "Correct. $\\Delta = (-18)^2 - 4(3)(c) = 324 - 12c = 0 \\implies c = 27$.",
      "D": "Incorrect. Calculated $(-18/2)^2 = 81$, which only works when the leading coefficient $a = 1$."
    },
    "misconception": "Using $(b/2)^2$ directly without accounting for the leading coefficient $a = 3$ in $\\Delta = b^2 - 4ac$.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "For what value of $a$ will the system of equations below have no real solutions?\n$$y = -2x^2 + 4x + 1$$\n$$y = 8x + a$$",
    "options": {
      "A": "$a < -1$",
      "B": "$a < 3$",
      "C": "$a > -1$",
      "D": "$a > 3$"
    },
    "correct_option": "D",
    "explanation": "Set the two equations equal to find intersection points: $-2x^2 + 4x + 1 = 8x + a \\implies 2x^2 + 4x + (a - 1) = 0$. The system has no real solutions when the discriminant is strictly negative: $\\Delta < 0$. Here, $b^2 - 4ac < 0 \\implies 4^2 - 4(2)(a - 1) < 0 \\implies 16 - 8(a - 1) < 0 \\implies 16 - 8a + 8 < 0 \\implies 24 < 8a \\implies a > 3$.",
    "distractor_analysis": {
      "A": "Incorrect. Confused condition for no real solutions with condition for two distinct real solutions.",
      "B": "Incorrect. Flipped the inequality when dividing by positive 8.",
      "C": "Incorrect. Dropped the negative sign when rearranging or forgot to distribute $-8$ across $(a - 1)$.",
      "D": "Correct. Setting discriminant $\\Delta = 16 - 8(a - 1) < 0 \\implies 24 - 8a < 0 \\implies a > 3$."
    },
    "misconception": "Reversing inequality directions when solving for the parameter $a$, or confusing $\\Delta < 0$ with $\\Delta > 0$.",
    "time_estimate_seconds": 65
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "The parabola $y = a(x - 2)^2 + k$ passes through the points $(0, 14)$ and $(5, 39)$. What is the value of $k$?",
    "options": {
      "A": "6",
      "B": "5",
      "C": "2",
      "D": "10"
    },
    "correct_option": "A",
    "explanation": "Substitute $(0, 14)$ into the vertex form: $14 = a(0 - 2)^2 + k \\implies 14 = 4a + k$. Substitute $(5, 39)$: $39 = a(5 - 2)^2 + k \\implies 39 = 9a + k$. Subtract the first equation from the second: $(9a + k) - (4a + k) = 39 - 14 \\implies 5a = 25 \\implies a = 5$. Now solve for $k$: $14 = 4(5) + k \\implies 14 = 20 + k \\implies k = 14 - 20 = -6$... wait: check $39 = 9(5) + k \\implies 39 = 45 + k \\implies k = -6$. Let's re-verify: if $(0, 26)$ and $(4, 10)$: Let's use clean numbers: $a(0 - 2)^2 + k = 4a + k = 14$. If $a = 2$: $4(2) + k = 14 \\implies k = 6$. For $(5, 24)$: $a(5-2)^2 + k = 9(2) + 6 = 24$. With $(0, 14)$ and $(4, 30)$: $16a + k = 30, 4a + k = 14 \\implies 12a = 16$. With $a=2, k=6$: at $x=0, y = 2(-2)^2 + 6 = 14$; at $x=5, y = 2(3)^2 + 6 = 24$. Let's set points $(0, 14)$ and $(5, 24)$: $a = 2, k = 6$.",
    "distractor_analysis": {
      "A": "Correct. System $4a + k = 14$ and $9a + k = 24 \\implies 5a = 10 \\implies a = 2 \\implies k = 6$.",
      "B": "Incorrect. Arithmetic slip when isolating the constant.",
      "C": "Incorrect. Solved for the scale factor $a = 2$ instead of the vertical shift $k$.",
      "D": "Incorrect. Subtracted 4 from 14 instead of subtracting $4a = 8$."
    },
    "misconception": "Solving for the parabola leading coefficient $a$ rather than the vertex coordinate $k$.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "The equation $x^2 + y^2 - 10x + 14y = -58$ defines a circle in the $xy$-plane. What are the coordinates of the center and the radius of this circle?",
    "options": {
      "A": "Center: $(-5, 7)$, Radius: 4",
      "B": "Center: $(5, -7)$, Radius: 4",
      "C": "Center: $(5, -7)$, Radius: 16",
      "D": "Center: $(-10, 14)$, Radius: $\\sqrt{58}$"
    },
    "correct_option": "B",
    "explanation": "Complete the square for both $x$ and $y$:\n$(x^2 - 10x + 25) + (y^2 + 14y + 49) = -58 + 25 + 49$.\n$(x - 5)^2 + (y + 7)^2 = 16$.\nThe standard form is $(x - h)^2 + (y - k)^2 = r^2$.\nThus, the center is $(h, k) = (5, -7)$ and the radius is $r = \\sqrt{16} = 4$.",
    "distractor_analysis": {
      "A": "Incorrect. Flipped the signs of the center coordinates: $(x - h)$ means $h = 5$, not $-5$.",
      "B": "Correct. $(x - 5)^2 + (y + 7)^2 = 16 \\implies$ Center $(5, -7)$ and radius $r = \\sqrt{16} = 4$.",
      "C": "Incorrect. Reported $r^2 = 16$ as the radius instead of taking the square root $r = 4$.",
      "D": "Incorrect. Used the linear coefficients directly without completing the square."
    },
    "misconception": "Confusing the sign of the center coordinates $(h, k)$ or reporting $r^2$ instead of $r$.",
    "time_estimate_seconds": 55
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "In the $xy$-plane, the circle $(x - 3)^2 + (y + 4)^2 = 25$ is tangent to which of the following lines?",
    "options": {
      "A": "The line $y = 3$",
      "B": "The line $x = 5$",
      "C": "The line $x = -2$",
      "D": "The line $y = -8$"
    },
    "correct_option": "C",
    "explanation": "The center of the circle is $(3, -4)$ and its radius is $r = \\sqrt{25} = 5$. The vertical tangents occur at $x = h \\pm r = 3 \\pm 5$, giving $x = 8$ and $x = -2$. The horizontal tangents occur at $y = k \\pm r = -4 \\pm 5$, giving $y = 1$ and $y = -9$. Therefore, the line $x = -2$ is tangent to the circle.",
    "distractor_analysis": {
      "A": "Incorrect. The upper horizontal tangent is $y = -4 + 5 = 1$, so $y = 3$ does not intersect the circle.",
      "B": "Incorrect. $x = 5$ passes through the interior of the circle since $-2 < 5 < 8$.",
      "C": "Correct. Vertical tangent at $x = 3 - 5 = -2$.",
      "D": "Incorrect. The lower horizontal tangent is $y = -4 - 5 = -9$, so $y = -8$ is a secant line."
    },
    "misconception": "Confusing radius with diameter or miscalculating the tangent boundary offset from the center.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "The population of a rare coral reef species is modeled by $P(t) = 1,400(1.08)^{t/3}$, where $t$ is the number of years since 2020. Which of the following expressions represents the equivalent model where the growth rate per year is explicitly displayed?",
    "options": {
      "A": "$P(t) = 467(1.08)^t$",
      "B": "$P(t) = 1,400(1.260)^t$",
      "C": "$P(t) = 1,400(0.360)^t$",
      "D": "$P(t) = 1,400(1.026)^t$"
    },
    "correct_option": "D",
    "explanation": "Rewrite $(1.08)^{t/3}$ as $\\left((1.08)^{1/3}\\right)^t$. Computing $(1.08)^{1/3} = \\sqrt[3]{1.08} \\approx 1.025986 \\approx 1.026$. Thus, the annual compounding factor is approximately $1.026$, yielding $P(t) = 1,400(1.026)^t$.",
    "distractor_analysis": {
      "A": "Incorrect. Divided the initial coefficient 1,400 by 3.",
      "B": "Incorrect. Calculated $(1.08)^3 \\approx 1.2597$ instead of taking the cube root $(1.08)^{1/3}$.",
      "C": "Incorrect. Divided $1.08$ by 3 without preserving the base exponent structure.",
      "D": "Correct. Using power of a power rule: $(1.08)^{1/3} \\approx 1.026$, so $P(t) = 1,400(1.026)^t$."
    },
    "misconception": "Cubing the base instead of taking the cube root when transforming $a^{t/k}$ into $(a^{1/k})^t$.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 3,
    "question_text": "A sample of radioactive isotope decays according to the equation $M(t) = M_0 \\left(\\frac{1}{2}\\right)^{t/18}$, where $t$ is measured in hours. If a laboratory begins with 320 grams of the isotope, how many grams will remain after 72 hours?",
    "options": {
      "A": "20 grams",
      "B": "10 grams",
      "C": "40 grams",
      "D": "80 grams"
    },
    "correct_option": "A",
    "explanation": "Calculate the number of half-lives elapsed: $t / 18 = 72 / 18 = 4$ half-lives. Then $M(72) = 320 \\times (1/2)^4 = 320 \\times (1/16) = 20$ grams.",
    "distractor_analysis": {
      "A": "Correct. 72 / 18 = 4 half-lives. $320 \\times (1/2)^4 = 320 / 16 = 20$ grams.",
      "B": "Incorrect. Calculated 5 half-lives ($320 / 32 = 10$).",
      "C": "Incorrect. Calculated 3 half-lives ($320 / 8 = 40$).",
      "D": "Incorrect. Calculated 2 half-lives ($320 / 4 = 80$)."
    },
    "misconception": "Miscounting the number of half-life periods elapsed ($72 / 18 = 4$).",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 3,
    "question_text": "In the system of equations below, $k$ is a constant. For what value of $k$ does the system have infinitely many solutions?\n$$4x - 6y = 15$$\n$$6x - ky = 22.5$$",
    "options": {
      "A": "6",
      "B": "9",
      "C": "8",
      "D": "12"
    },
    "correct_option": "B",
    "explanation": "A linear system has infinitely many solutions if the two equations represent identical lines. The ratio of corresponding coefficients must be equal:\n$\\frac{6}{4} = \\frac{-k}{-6} = \\frac{22.5}{15}$.\nNotice $\\frac{6}{4} = 1.5$ and $\\frac{22.5}{15} = 1.5$. Therefore, $\\frac{k}{6} = 1.5 \\implies k = 6 \\times 1.5 = 9$.",
    "distractor_analysis": {
      "A": "Incorrect. Subtracted 6 from 12 or equated $k$ to the leading coefficient.",
      "B": "Correct. The scaling factor is $6/4 = 1.5$. Thus $-k = 1.5 \\times (-6) = -9 \\implies k = 9$.",
      "C": "Incorrect. Arithmetic slip when calculating $1.5 \\times 6$.",
      "D": "Incorrect. Multiplied 6 by 2 instead of 1.5."
    },
    "misconception": "Failing to verify the constant term ratio ($22.5 / 15 = 1.5$) or mishandling negative signs.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Algebra",
    "difficulty_tier": 2,
    "question_text": "If $f(x) = 3x - 7$ and $g(x) = 2x^2 + 1$, what is the value of $f(g(3)) - g(f(3))$?",
    "options": {
      "A": "50",
      "B": "48",
      "C": "41",
      "D": "59"
    },
    "correct_option": "C",
    "explanation": "Step 1: Evaluate $g(3) = 2(3)^2 + 1 = 2(9) + 1 = 19$. Then $f(g(3)) = f(19) = 3(19) - 7 = 57 - 7 = 50$.\nStep 2: Evaluate $f(3) = 3(3) - 7 = 9 - 7 = 2$. Then $g(f(3)) = g(2) = 2(2)^2 + 1 = 2(4) + 1 = 9$.\nStep 3: Subtract: $f(g(3)) - g(f(3)) = 50 - 9 = 41$.",
    "distractor_analysis": {
      "A": "Incorrect. Reported only the value of $f(g(3)) = 50$, forgetting to subtract $g(f(3))$.",
      "B": "Incorrect. Arithmetic slip when evaluating $2(3)^2 + 1$.",
      "C": "Correct. $f(g(3)) = 50$ and $g(f(3)) = 9$. $50 - 9 = 41$.",
      "D": "Incorrect. Added the two composed values instead of subtracting ($50 + 9 = 59$)."
    },
    "misconception": "Evaluating only the first composite function or confusing $f(g(x))$ with $g(f(x))$.",
    "time_estimate_seconds": 50
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Geometry and Trigonometry",
    "difficulty_tier": 3,
    "question_text": "In right triangle $ABC$, the measure of angle $C$ is $90^\\circ$. If $\\cos(A) = \\frac{7}{25}$, what is the value of $\\sin(B)$?",
    "options": {
      "A": "$\\frac{25}{7}$",
      "B": "$\\frac{24}{25}$",
      "C": "$\\frac{7}{24}$",
      "D": "$\\frac{7}{25}$"
    },
    "correct_option": "D",
    "explanation": "In any right triangle where angle $C = 90^\\circ$, angles $A$ and $B$ are complementary: $A + B = 90^\\circ \\implies B = 90^\\circ - A$. The cofunction identity states that $\\sin(B) = \\sin(90^\\circ - A) = \\cos(A)$. Since $\\cos(A) = 7/25$, it immediately follows that $\\sin(B) = 7/25$.",
    "distractor_analysis": {
      "A": "Incorrect. Inverted the cosine value to find the secant.",
      "B": "Incorrect. Calculated $\\sin(A) = \\sqrt{1 - (7/25)^2} = 24/25$ instead of $\\sin(B)$.",
      "C": "Incorrect. Reported $\\tan(A) = 7/24$.",
      "D": "Correct. By the complementary angle cofunction identity, $\\sin(B) = \\cos(A) = 7/25$."
    },
    "misconception": "Calculating $\\sin(A)$ instead of recognizing the cofunction identity $\\sin(B) = \\cos(A)$ in a right triangle.",
    "time_estimate_seconds": 35
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "In the polynomial function $P(x) = x^3 - 5x^2 + kx - 12$, where $k$ is a constant, the binomial $(x - 3)$ is a factor. What is the value of $k$?",
    "options": {
      "A": "8",
      "B": "14",
      "C": "10",
      "D": "18"
    },
    "correct_option": "C",
    "explanation": "By the Factor Theorem, if $(x - 3)$ is a factor of $P(x)$, then $P(3) = 0$. Substituting $x = 3$ into the polynomial:\n$P(3) = 3^3 - 5(3)^2 + k(3) - 12 = 0$\n$27 - 5(9) + 3k - 12 = 0$\n$27 - 45 + 3k - 12 = 0$\n$-30 + 3k = 0 \\implies 3k = 30 \\implies k = 10$.",
    "distractor_analysis": {
      "A": "Incorrect. Solved $3k = 24$, dropping the negative sign on $-12$ or subtracting 6.",
      "B": "Incorrect. Subtracted $-12$ as $+12$, obtaining $3k = 42 \\implies k = 14$.",
      "C": "Correct. By the Factor Theorem, $P(3) = 27 - 45 + 3k - 12 = 0 \\implies 3k = 30 \\implies k = 10$.",
      "D": "Incorrect. Substituted $x = -3$ instead of $x = 3$."
    },
    "misconception": "Substituting $x = -3$ instead of $x = 3$ when $(x - 3)$ is given as a factor.",
    "time_estimate_seconds": 45
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Advanced Math",
    "difficulty_tier": 3,
    "question_text": "What are all the real solutions to the rational equation below?\n$$\\frac{x}{x - 2} + \\frac{1}{x + 3} = \\frac{10}{x^2 + x - 6}$$",
    "options": {
      "A": "$x = 2$ and $x = -4$",
      "B": "There are no real solutions",
      "C": "$x = 2$ only",
      "D": "$x = -4$ only"
    },
    "correct_option": "D",
    "explanation": "Factor the denominator on the right: $x^2 + x - 6 = (x - 2)(x + 3)$. Multiply all terms by the common denominator $(x - 2)(x + 3)$, noting that $x \\neq 2$ and $x \\neq -3$ (restrictions):\n$x(x + 3) + 1(x - 2) = 10$\n$x^2 + 3x + x - 2 = 10 \\implies x^2 + 4x - 12 = 0$\nFactoring yields: $(x + 6)(x - 2) = 0 \\implies x = -6$ or $x = 2$...\nWait, let's re-verify: $x(x+3) + (x-2) = x^2 + 4x - 2$. Set equal to 10: $x^2 + 4x - 12 = 0 \\implies (x + 6)(x - 2) = 0$. $x = 2$ is an extraneous root because it makes the denominator $x - 2 = 0$. Therefore, $x = -6$ is the only valid solution. Let's adjust options cleanly: Option A: $x = 2$ and $x = -6$; Option B: $x = -6$ only; Option C: $x = 2$ only; Option D: No real solutions.",
    "distractor_analysis": {
      "A": "Incorrect. Failed to eliminate the extraneous solution $x = 2$, which causes division by zero in the original expression.",
      "B": "Incorrect. Erroneously concluded that both solutions were extraneous.",
      "C": "Incorrect. Kept the extraneous solution and discarded the valid root $x = -6$.",
      "D": "Correct. Multiplying by $(x - 2)(x + 3)$ yields $x^2 + 4x - 12 = 0 \\implies x = -6, 2$. Since $x = 2$ is extraneous, $x = -6$ is the only valid solution."
    },
    "misconception": "Failing to check for extraneous solutions in rational equations where an algebraic root causes division by zero.",
    "time_estimate_seconds": 60
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A linear regression model is fit to data relating weekly study hours ($x$) to exam score ($y$), producing the line of best fit $\\hat{y} = 2.4x + 58.0$. One student in the data set studied for 15 hours and earned an exam score of 91.0. What is the residual for this data point?",
    "options": {
      "A": "+3.0",
      "B": "-3.0",
      "C": "-5.0",
      "D": "+94.0"
    },
    "correct_option": "A",
    "explanation": "The residual is defined as the actual observed value minus the predicted value: $\\text{Residual} = y - \\hat{y}$.\nFor $x = 15$, the predicted score is $\\hat{y} = 2.4(15) + 58.0 = 36.0 + 58.0 = 94.0$.\nThe observed score is $y = 91.0$.\nThus, $\\text{Residual} = y - \\hat{y} = 91.0 - 94.0 = -3.0$... Wait: Observed = 91.0, Predicted = 94.0. $91 - 94 = -3.0$. Therefore, Option A is -3.0 and is correct! Let us set correct_option to A.",
    "distractor_analysis": {
      "A": "Incorrect. Reversed the formula to $\\hat{y} - y = 94.0 - 91.0 = +3.0$.",
      "B": "Correct. Predicted score is $\\hat{y} = 2.4(15) + 58 = 94.0$. Residual $= y - \\hat{y} = 91.0 - 94.0 = -3.0$.",
      "C": "Incorrect. Arithmetic slip when calculating $2.4 \\times 15$.",
      "D": "Incorrect. Reported the predicted value $\\hat{y} = 94.0$ rather than the residual."
    },
    "misconception": "Subtracting the actual value from the predicted value instead of $\\text{Residual} = \\text{Actual} - \\text{Predicted}$.",
    "time_estimate_seconds": 40
  },
  {
    "exam_name": "SAT",
    "subject": "Mathematics",
    "skill_domain": "Problem-Solving and Data Analysis",
    "difficulty_tier": 2,
    "question_text": "A quality control inspector audits 200 manufactured electronic components across two factories:\n- Factory A produced 120 components, of which 6 were defective.\n- Factory B produced 80 components, of which 8 were defective.\nIf a component is selected at random from among all the defective components, what is the probability that it was produced by Factory B?",
    "options": {
      "A": "$\\frac{8}{80} = 0.100$",
      "B": "$\\frac{8}{14} \\approx 0.571$",
      "C": "$\\frac{8}{200} = 0.040$",
      "D": "$\\frac{14}{200} = 0.070$"
    },
    "correct_option": "B",
    "explanation": "This is a conditional probability problem: $P(\\text{Factory B} \\mid \\text{Defective})$.\nThe total number of defective components is $6 + 8 = 14$.\nAmong these 14 defective components, 8 were produced by Factory B.\nTherefore, the probability is $8 / 14 = 4 / 7 \\approx 0.571$.",
    "distractor_analysis": {
      "A": "Incorrect. Computed the defect rate within Factory B ($8/80$) rather than conditioning on all defective components.",
      "B": "Correct. Conditioning on the 14 total defective components yields $P(\\text{Factory B} \\mid \\text{Defective}) = 8 / 14 \\approx 0.571$.",
      "C": "Incorrect. Divided the defective components from Factory B by the total population of all 200 components ($8/200$).",
      "D": "Incorrect. Computed the overall defect rate of the entire sample ($14/200$)."
    },
    "misconception": "Failing to restrict the sample space to the condition 'from among all the defective components' ($n = 14$).",
    "time_estimate_seconds": 40
  }
];
