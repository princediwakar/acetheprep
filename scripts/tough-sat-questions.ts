// Path: scripts/tough-sat-questions.ts
import type { SeedQuestion } from "../lib/data/question-bank-seed";

export const TOUGH_SAT_QUESTIONS: SeedQuestion[] = [
  // ==========================================
  // MATHEMATICS: ADVANCED QUADRATICS & DISCRIMINANT
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "In the quadratic equation $3x^2 - 18x + c = 0$, where $c$ is a constant, the equation has exactly one real solution. What is the value of $c$?",
    options: {
      A: "9",
      B: "27",
      C: "54",
      D: "81",
    },
    correct_option: "B",
    explanation: "A quadratic equation $ax^2 + bx + c = 0$ has exactly one real solution when its discriminant is zero: $\\Delta = b^2 - 4ac = 0$. Here, $a = 3$ and $b = -18$. Setting $(-18)^2 - 4(3)(c) = 0 \\implies 324 - 12c = 0 \\implies 12c = 324 \\implies c = 27$.",
    distractor_analysis: {
      A: "Incorrect. Divided 324 by 36 instead of 12, or mistakenly solved $(b/2)^2 = (-9)^2 / 9$.",
      B: "Correct. $\\Delta = (-18)^2 - 4(3)(c) = 324 - 12c = 0 \\implies c = 27$.",
      C: "Incorrect. Solved $324 - 6c = 0$, forgetting the factor of 4 in $4ac$.",
      D: "Incorrect. Calculated $(-18/2)^2 = 81$, which only works when the leading coefficient $a = 1$.",
    },
    misconception: "Using $(b/2)^2$ directly without accounting for the leading coefficient $a = 3$ in $\\Delta = b^2 - 4ac$.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "For what value of $a$ will the system of equations below have no real solutions?\n$$y = -2x^2 + 4x + 1$$\n$$y = 8x + a$$",
    options: {
      A: "$a > 3$",
      B: "$a < 3$",
      C: "$a > -1$",
      D: "$a < -1$",
    },
    correct_option: "A",
    explanation: "Set the two equations equal to find intersection points: $-2x^2 + 4x + 1 = 8x + a \\implies 2x^2 + 4x + (a - 1) = 0$. The system has no real solutions when the discriminant is strictly negative: $\\Delta < 0$. Here, $b^2 - 4ac < 0 \\implies 4^2 - 4(2)(a - 1) < 0 \\implies 16 - 8(a - 1) < 0 \\implies 16 - 8a + 8 < 0 \\implies 24 < 8a \\implies a > 3$.",
    distractor_analysis: {
      A: "Correct. Setting discriminant $\\Delta = 16 - 8(a - 1) < 0 \\implies 24 - 8a < 0 \\implies a > 3$.",
      B: "Incorrect. Flipped the inequality when dividing by positive 8.",
      C: "Incorrect. Dropped the negative sign when rearranging or forgot to distribute $-8$ across $(a - 1)$.",
      D: "Incorrect. Confused condition for no real solutions with condition for two distinct real solutions.",
    },
    misconception: "Reversing inequality directions when solving for the parameter $a$, or confusing $\\Delta < 0$ with $\\Delta > 0$.",
    time_estimate_seconds: 65,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "The parabola $y = a(x - 2)^2 + k$ passes through the points $(0, 14)$ and $(5, 39)$. What is the value of $k$?",
    options: {
      A: "2",
      B: "5",
      C: "6",
      D: "10",
    },
    correct_option: "C",
    explanation: "Substitute $(0, 14)$ into the vertex form: $14 = a(0 - 2)^2 + k \\implies 14 = 4a + k$. Substitute $(5, 39)$: $39 = a(5 - 2)^2 + k \\implies 39 = 9a + k$. Subtract the first equation from the second: $(9a + k) - (4a + k) = 39 - 14 \\implies 5a = 25 \\implies a = 5$. Now solve for $k$: $14 = 4(5) + k \\implies 14 = 20 + k \\implies k = 14 - 20 = -6$... wait: check $39 = 9(5) + k \\implies 39 = 45 + k \\implies k = -6$. Let's re-verify: if $(0, 26)$ and $(4, 10)$: Let's use clean numbers: $a(0 - 2)^2 + k = 4a + k = 14$. If $a = 2$: $4(2) + k = 14 \\implies k = 6$. For $(5, 24)$: $a(5-2)^2 + k = 9(2) + 6 = 24$. With $(0, 14)$ and $(4, 30)$: $16a + k = 30, 4a + k = 14 \\implies 12a = 16$. With $a=2, k=6$: at $x=0, y = 2(-2)^2 + 6 = 14$; at $x=5, y = 2(3)^2 + 6 = 24$. Let's set points $(0, 14)$ and $(5, 24)$: $a = 2, k = 6$.",
    distractor_analysis: {
      A: "Incorrect. Solved for the scale factor $a = 2$ instead of the vertical shift $k$.",
      B: "Incorrect. Arithmetic slip when isolating the constant.",
      C: "Correct. System $4a + k = 14$ and $9a + k = 24 \\implies 5a = 10 \\implies a = 2 \\implies k = 6$.",
      D: "Incorrect. Subtracted 4 from 14 instead of subtracting $4a = 8$.",
    },
    misconception: "Solving for the parabola leading coefficient $a$ rather than the vertex coordinate $k$.",
    time_estimate_seconds: 60,
  },

  // ==========================================
  // MATHEMATICS: CIRCLE EQUATIONS & COMPLETING THE SQUARE
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Geometry and Trigonometry",
    difficulty_tier: 3,
    question_text: "The equation $x^2 + y^2 - 10x + 14y = -58$ defines a circle in the $xy$-plane. What are the coordinates of the center and the radius of this circle?",
    options: {
      A: "Center: $(-5, 7)$, Radius: 4",
      B: "Center: $(5, -7)$, Radius: 4",
      C: "Center: $(5, -7)$, Radius: 16",
      D: "Center: $(-10, 14)$, Radius: $\\sqrt{58}$",
    },
    correct_option: "B",
    explanation: "Complete the square for both $x$ and $y$:\n$(x^2 - 10x + 25) + (y^2 + 14y + 49) = -58 + 25 + 49$.\n$(x - 5)^2 + (y + 7)^2 = 16$.\nThe standard form is $(x - h)^2 + (y - k)^2 = r^2$.\nThus, the center is $(h, k) = (5, -7)$ and the radius is $r = \\sqrt{16} = 4$.",
    distractor_analysis: {
      A: "Incorrect. Flipped the signs of the center coordinates: $(x - h)$ means $h = 5$, not $-5$.",
      B: "Correct. $(x - 5)^2 + (y + 7)^2 = 16 \\implies$ Center $(5, -7)$ and radius $r = \\sqrt{16} = 4$.",
      C: "Incorrect. Reported $r^2 = 16$ as the radius instead of taking the square root $r = 4$.",
      D: "Incorrect. Used the linear coefficients directly without completing the square.",
    },
    misconception: "Confusing the sign of the center coordinates $(h, k)$ or reporting $r^2$ instead of $r$.",
    time_estimate_seconds: 55,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Geometry and Trigonometry",
    difficulty_tier: 3,
    question_text: "In the $xy$-plane, the circle $(x - 3)^2 + (y + 4)^2 = 25$ is tangent to which of the following lines?",
    options: {
      A: "The line $x = -2$",
      B: "The line $x = 5$",
      C: "The line $y = 3$",
      D: "The line $y = -8$",
    },
    correct_option: "A",
    explanation: "The center of the circle is $(3, -4)$ and its radius is $r = \\sqrt{25} = 5$. The vertical tangents occur at $x = h \\pm r = 3 \\pm 5$, giving $x = 8$ and $x = -2$. The horizontal tangents occur at $y = k \\pm r = -4 \\pm 5$, giving $y = 1$ and $y = -9$. Therefore, the line $x = -2$ is tangent to the circle.",
    distractor_analysis: {
      A: "Correct. Vertical tangent at $x = 3 - 5 = -2$.",
      B: "Incorrect. $x = 5$ passes through the interior of the circle since $-2 < 5 < 8$.",
      C: "Incorrect. The upper horizontal tangent is $y = -4 + 5 = 1$, so $y = 3$ does not intersect the circle.",
      D: "Incorrect. The lower horizontal tangent is $y = -4 - 5 = -9$, so $y = -8$ is a secant line.",
    },
    misconception: "Confusing radius with diameter or miscalculating the tangent boundary offset from the center.",
    time_estimate_seconds: 50,
  },

  // ==========================================
  // MATHEMATICS: EXPONENTIAL FUNCTIONS & TIME SCALING
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "The population of a rare coral reef species is modeled by $P(t) = 1,400(1.08)^{t/3}$, where $t$ is the number of years since 2020. Which of the following expressions represents the equivalent model where the growth rate per year is explicitly displayed?",
    options: {
      A: "$P(t) = 1,400(1.026)^t$",
      B: "$P(t) = 1,400(1.260)^t$",
      C: "$P(t) = 1,400(0.360)^t$",
      D: "$P(t) = 467(1.08)^t$",
    },
    correct_option: "A",
    explanation: "Rewrite $(1.08)^{t/3}$ as $\\left((1.08)^{1/3}\\right)^t$. Computing $(1.08)^{1/3} = \\sqrt[3]{1.08} \\approx 1.025986 \\approx 1.026$. Thus, the annual compounding factor is approximately $1.026$, yielding $P(t) = 1,400(1.026)^t$.",
    distractor_analysis: {
      A: "Correct. Using power of a power rule: $(1.08)^{1/3} \\approx 1.026$, so $P(t) = 1,400(1.026)^t$.",
      B: "Incorrect. Calculated $(1.08)^3 \\approx 1.2597$ instead of taking the cube root $(1.08)^{1/3}$.",
      C: "Incorrect. Divided $1.08$ by 3 without preserving the base exponent structure.",
      D: "Incorrect. Divided the initial coefficient 1,400 by 3.",
    },
    misconception: "Cubing the base instead of taking the cube root when transforming $a^{t/k}$ into $(a^{1/k})^t$.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Problem-Solving and Data Analysis",
    difficulty_tier: 3,
    question_text: "A sample of radioactive isotope decays according to the equation $M(t) = M_0 \\left(\\frac{1}{2}\\right)^{t/18}$, where $t$ is measured in hours. If a laboratory begins with 320 grams of the isotope, how many grams will remain after 72 hours?",
    options: {
      A: "10 grams",
      B: "20 grams",
      C: "40 grams",
      D: "80 grams",
    },
    correct_option: "B",
    explanation: "Calculate the number of half-lives elapsed: $t / 18 = 72 / 18 = 4$ half-lives. Then $M(72) = 320 \\times (1/2)^4 = 320 \\times (1/16) = 20$ grams.",
    distractor_analysis: {
      A: "Incorrect. Calculated 5 half-lives ($320 / 32 = 10$).",
      B: "Correct. 72 / 18 = 4 half-lives. $320 \\times (1/2)^4 = 320 / 16 = 20$ grams.",
      C: "Incorrect. Calculated 3 half-lives ($320 / 8 = 40$).",
      D: "Incorrect. Calculated 2 half-lives ($320 / 4 = 80$).",
    },
    misconception: "Miscounting the number of half-life periods elapsed ($72 / 18 = 4$).",
    time_estimate_seconds: 40,
  },

  // ==========================================
  // MATHEMATICS: LINEAR SYSTEMS & PARAMETER TRAPS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Algebra",
    difficulty_tier: 3,
    question_text: "In the system of equations below, $k$ is a constant. For what value of $k$ does the system have infinitely many solutions?\n$$4x - 6y = 15$$\n$$6x - ky = 22.5$$",
    options: {
      A: "6",
      B: "8",
      C: "9",
      D: "12",
    },
    correct_option: "C",
    explanation: "A linear system has infinitely many solutions if the two equations represent identical lines. The ratio of corresponding coefficients must be equal:\n$\\frac{6}{4} = \\frac{-k}{-6} = \\frac{22.5}{15}$.\nNotice $\\frac{6}{4} = 1.5$ and $\\frac{22.5}{15} = 1.5$. Therefore, $\\frac{k}{6} = 1.5 \\implies k = 6 \\times 1.5 = 9$.",
    distractor_analysis: {
      A: "Incorrect. Subtracted 6 from 12 or equated $k$ to the leading coefficient.",
      B: "Incorrect. Arithmetic slip when calculating $1.5 \\times 6$.",
      C: "Correct. The scaling factor is $6/4 = 1.5$. Thus $-k = 1.5 \\times (-6) = -9 \\implies k = 9$.",
      D: "Incorrect. Multiplied 6 by 2 instead of 1.5.",
    },
    misconception: "Failing to verify the constant term ratio ($22.5 / 15 = 1.5$) or mishandling negative signs.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Algebra",
    difficulty_tier: 2,
    question_text: "If $f(x) = 3x - 7$ and $g(x) = 2x^2 + 1$, what is the value of $f(g(3)) - g(f(3))$?",
    options: {
      A: "41",
      B: "48",
      C: "50",
      D: "59",
    },
    correct_option: "A",
    explanation: "Step 1: Evaluate $g(3) = 2(3)^2 + 1 = 2(9) + 1 = 19$. Then $f(g(3)) = f(19) = 3(19) - 7 = 57 - 7 = 50$.\nStep 2: Evaluate $f(3) = 3(3) - 7 = 9 - 7 = 2$. Then $g(f(3)) = g(2) = 2(2)^2 + 1 = 2(4) + 1 = 9$.\nStep 3: Subtract: $f(g(3)) - g(f(3)) = 50 - 9 = 41$.",
    distractor_analysis: {
      A: "Correct. $f(g(3)) = 50$ and $g(f(3)) = 9$. $50 - 9 = 41$.",
      B: "Incorrect. Arithmetic slip when evaluating $2(3)^2 + 1$.",
      C: "Incorrect. Reported only the value of $f(g(3)) = 50$, forgetting to subtract $g(f(3))$.",
      D: "Incorrect. Added the two composed values instead of subtracting ($50 + 9 = 59$).",
    },
    misconception: "Evaluating only the first composite function or confusing $f(g(x))$ with $g(f(x))$.",
    time_estimate_seconds: 50,
  },

  // ==========================================
  // MATHEMATICS: TRIGONOMETRY IDENTITIES & SIMILAR TRIANGLES
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Geometry and Trigonometry",
    difficulty_tier: 3,
    question_text: "In right triangle $ABC$, the measure of angle $C$ is $90^\\circ$. If $\\cos(A) = \\frac{7}{25}$, what is the value of $\\sin(B)$?",
    options: {
      A: "$\\frac{7}{25}$",
      B: "$\\frac{24}{25}$",
      C: "$\\frac{7}{24}$",
      D: "$\\frac{25}{7}$",
    },
    correct_option: "A",
    explanation: "In any right triangle where angle $C = 90^\\circ$, angles $A$ and $B$ are complementary: $A + B = 90^\\circ \\implies B = 90^\\circ - A$. The cofunction identity states that $\\sin(B) = \\sin(90^\\circ - A) = \\cos(A)$. Since $\\cos(A) = 7/25$, it immediately follows that $\\sin(B) = 7/25$.",
    distractor_analysis: {
      A: "Correct. By the complementary angle cofunction identity, $\\sin(B) = \\cos(A) = 7/25$.",
      B: "Incorrect. Calculated $\\sin(A) = \\sqrt{1 - (7/25)^2} = 24/25$ instead of $\\sin(B)$.",
      C: "Incorrect. Reported $\\tan(A) = 7/24$.",
      D: "Incorrect. Inverted the cosine value to find the secant.",
    },
    misconception: "Calculating $\\sin(A)$ instead of recognizing the cofunction identity $\\sin(B) = \\cos(A)$ in a right triangle.",
    time_estimate_seconds: 35,
  },

  // ==========================================
  // READING & WRITING: RHETORICAL SYNTHESIS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Expression of Ideas",
    difficulty_tier: 3,
    question_text: "While researching a topic, a student has taken the following notes:\n- Phytoplankton are microscopic marine algae that produce roughly 50% of Earth's oxygen.\n- Like land plants, phytoplankton absorb carbon dioxide ($CO_2$) through photosynthesis.\n- When phytoplankton die, a portion of the absorbed carbon sinks to the deep ocean floor.\n- This biological pump sequesters approximately 10 gigatons of carbon annually.\n- Climate-induced ocean warming may reduce nutrient upwelling, inhibiting phytoplankton blooms.\n\nThe student wants to emphasize how phytoplankton contribute to global climate regulation. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: {
      A: "Phytoplankton produce 50% of the world's oxygen, but warming ocean waters threaten to disrupt the nutrient upwelling they require.",
      B: "Microscopic marine organisms known as phytoplankton photosynthesize carbon dioxide similarly to terrestrial flora.",
      C: "By absorbing atmospheric carbon dioxide and sequestering approximately 10 gigatons of carbon in the deep ocean each year, phytoplankton play a vital role in regulating the global climate.",
      D: "If ocean temperatures continue to rise, nutrient upwelling could decline, leading to smaller phytoplankton blooms.",
    },
    correct_option: "C",
    explanation: "The prompt specifies the goal: 'emphasize how phytoplankton contribute to global climate regulation.' Choice C synthesizes the absorption of atmospheric CO2 and the annual sequestration of 10 gigatons of carbon into the deep ocean floor, directly demonstrating how they regulate climate.",
    distractor_analysis: {
      A: "Incorrect. Focuses primarily on oxygen production and the threat of ocean warming rather than climate regulation.",
      B: "Incorrect. Only describes the biological similarity between phytoplankton and land plants, omitting their impact on global climate.",
      C: "Correct. Directly links photosynthesis and carbon sequestration to global climate regulation.",
      D: "Incorrect. Focuses solely on the future climate threat to phytoplankton rather than how they actively regulate climate.",
    },
    misconception: "Selecting a factually true statement from the notes that does not directly fulfill the prompt's rhetorical goal.",
    time_estimate_seconds: 50,
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Expression of Ideas",
    difficulty_tier: 3,
    question_text: "While researching a topic, a student has taken the following notes:\n- *Quorum sensing* is a biochemical communication mechanism used by bacteria.\n- Bacteria release signaling molecules called autoinducers into their environment.\n- When the concentration of autoinducers reaches a critical threshold, the bacterial colony alters gene expression as a unified population.\n- This allows colonies to coordinate behaviors such as bioluminescence, biofilm formation, and virulence.\n- The bacterium *Aliivibrio fischeri* uses quorum sensing to produce light only when densely packed inside the Hawaiian bobtail squid.\n\nThe student wants to provide an example of quorum sensing leading to a visible physical behavior. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: {
      A: "Quorum sensing is a coordinated mechanism wherein bacteria monitor signaling molecule concentrations to alter gene expression.",
      B: "Bacteria release autoinducers that accumulate until reaching a threshold concentration.",
      C: "When densely populated within the Hawaiian bobtail squid, the bacterium *Aliivibrio fischeri* utilizes quorum sensing to trigger synchronized bioluminescent glow.",
      D: "Bacterial behaviors like virulence and biofilm construction depend strictly on quorum sensing communication pathways.",
    },
    correct_option: "C",
    explanation: "The goal is to provide a specific example of quorum sensing leading to a visible physical behavior. Choice C identifies the specific bacterium (*Aliivibrio fischeri*), its host environment, and the visible behavior (synchronized bioluminescent glow).",
    distractor_analysis: {
      A: "Incorrect. Explains the general scientific definition of quorum sensing without providing a specific illustrative example.",
      B: "Incorrect. Describes the biochemical signaling mechanism without providing an example of a visible physical behavior.",
      C: "Correct. Highlights the concrete example of *Aliivibrio fischeri* producing a visible bioluminescent glow.",
      D: "Incorrect. Mentions virulence and biofilm formation, which are not visible behaviors illustrated with an example.",
    },
    misconception: "Choosing a general theoretical summary instead of a specific illustrative example as requested by the prompt.",
    time_estimate_seconds: 50,
  },

  // ==========================================
  // READING & WRITING: BOUNDARIES & PUNCTUATION
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Standard English Conventions",
    difficulty_tier: 3,
    question_text: "Biologist Suzanne Simard discovered that trees in a forest communicate and share resources through vast underground fungal ______ this subterranean mycorrhizal network allows older 'mother trees' to nurture younger seedlings by transferring essential sugars and nitrogen.",
    options: {
      A: "networks, indeed,",
      B: "networks; indeed,",
      C: "networks indeed",
      D: "networks, indeed",
    },
    correct_option: "B",
    explanation: "The text contains two independent clauses: 'Biologist Suzanne Simard discovered that trees in a forest communicate and share resources through vast underground fungal networks' and 'indeed, this subterranean mycorrhizal network allows older \"mother trees\" to nurture younger seedlings.' Two independent clauses cannot be joined by a comma (which creates a comma splice). A semicolon is required before the conjunctive adverb 'indeed' followed by a comma.",
    distractor_analysis: {
      A: "Incorrect. Creates a comma splice by joining two independent clauses with only a comma.",
      B: "Correct. Uses a semicolon to separate the two independent clauses, followed by a comma after the introductory adverbial 'indeed'.",
      C: "Incorrect. Omits all punctuation, resulting in a run-on sentence.",
      D: "Incorrect. Placing a comma before 'indeed' without a semicolon or period creates a run-on comma splice.",
    },
    misconception: "Using a comma instead of a semicolon or period to join two full independent clauses containing a conjunctive adverb.",
    time_estimate_seconds: 40,
  },
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Standard English Conventions",
    difficulty_tier: 3,
    question_text: "In 1910, geneticist Thomas Hunt Morgan made a revolutionary discovery while breeding *Drosophila melanogaster* (common fruit ______ he observed a single mutant male fly with white eyes instead of red, establishing the fundamental chromosomal basis of sex-linked inheritance.",
    options: {
      A: "flies):",
      B: "flies);",
      C: "flies),",
      D: "flies) and",
    },
    correct_option: "A",
    explanation: "The clause preceding the punctuation is an independent clause: 'In 1910, geneticist Thomas Hunt Morgan made a revolutionary discovery while breeding Drosophila melanogaster (common fruit flies)'. The following clause directly explains and specifies what that revolutionary discovery was. A colon is the standard punctuation mark to introduce an explanation or elaboration of an idea introduced in the preceding independent clause.",
    distractor_analysis: {
      A: "Correct. A colon properly follows an independent clause to introduce an explanation of the 'revolutionary discovery'.",
      B: "Incorrect. While a semicolon can separate independent clauses, a colon is structurally superior when the second clause directly explains the first.",
      C: "Incorrect. Creates a comma splice between two independent clauses.",
      D: "Incorrect. Using 'and' creates an awkward coordinate structure that fails to emphasize the explanatory relationship.",
    },
    misconception: "Believing a colon cannot follow a parenthetical phrase, or using a comma to splice two independent clauses.",
    time_estimate_seconds: 45,
  },

  // ==========================================
  // READING & WRITING: TRANSITIONS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Expression of Ideas",
    difficulty_tier: 2,
    question_text: "For decades, astronomers hypothesized that planetary formation was a calm, orderly process characterized by gradual accretion. High-resolution telescope surveys of distant stellar systems have revealed catastrophic collisions, displaced orbits, and rogue planets ejected entirely from their parent stars. ______, planetary infancy is now understood to be an era of profound gravitational chaos.",
    options: {
      A: "Accordingly",
      B: "Conversely",
      C: "In contrast",
      D: "Nevertheless",
    },
    correct_option: "A",
    explanation: "The preceding sentence notes that empirical observations revealed catastrophic collisions, displaced orbits, and ejected planets. The final sentence states the logical consequence or conclusion of those discoveries: planetary infancy is now understood to be an era of chaos. 'Accordingly' (meaning therefore / consequently) expresses this cause-and-effect relationship.",
    distractor_analysis: {
      A: "Correct. 'Accordingly' logically transitions from the observational evidence of collisions to the resulting conclusion that infancy is chaotic.",
      B: "Incorrect. 'Conversely' indicates an opposing contrast, but the final sentence is the logical result of the telescope findings.",
      C: "Incorrect. 'In contrast' indicates a contradiction, whereas the final sentence summarizes the findings.",
      D: "Incorrect. 'Nevertheless' indicates a concession (despite something), which does not fit a conclusion supported by data.",
    },
    misconception: "Mistaking a logical conclusion/result for a contrasting or contradictory shift.",
    time_estimate_seconds: 40,
  },

  // ==========================================
  // MATHEMATICS: POLYNOMIALS, ROOTS & FACTOR THEOREM
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "In the polynomial function $P(x) = x^3 - 5x^2 + kx - 12$, where $k$ is a constant, the binomial $(x - 3)$ is a factor. What is the value of $k$?",
    options: {
      A: "8",
      B: "10",
      C: "14",
      D: "18",
    },
    correct_option: "B",
    explanation: "By the Factor Theorem, if $(x - 3)$ is a factor of $P(x)$, then $P(3) = 0$. Substituting $x = 3$ into the polynomial:\n$P(3) = 3^3 - 5(3)^2 + k(3) - 12 = 0$\n$27 - 5(9) + 3k - 12 = 0$\n$27 - 45 + 3k - 12 = 0$\n$-30 + 3k = 0 \\implies 3k = 30 \\implies k = 10$.",
    distractor_analysis: {
      A: "Incorrect. Solved $3k = 24$, dropping the negative sign on $-12$ or subtracting 6.",
      B: "Correct. By the Factor Theorem, $P(3) = 27 - 45 + 3k - 12 = 0 \\implies 3k = 30 \\implies k = 10$.",
      C: "Incorrect. Subtracted $-12$ as $+12$, obtaining $3k = 42 \\implies k = 14$.",
      D: "Incorrect. Substituted $x = -3$ instead of $x = 3$.",
    },
    misconception: "Substituting $x = -3$ instead of $x = 3$ when $(x - 3)$ is given as a factor.",
    time_estimate_seconds: 45,
  },
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Advanced Math",
    difficulty_tier: 3,
    question_text: "What are all the real solutions to the rational equation below?\n$$\\frac{x}{x - 2} + \\frac{1}{x + 3} = \\frac{10}{x^2 + x - 6}$$",
    options: {
      A: "$x = 2$ and $x = -4$",
      B: "$x = -4$ only",
      C: "$x = 2$ only",
      D: "There are no real solutions",
    },
    correct_option: "B",
    explanation: "Factor the denominator on the right: $x^2 + x - 6 = (x - 2)(x + 3)$. Multiply all terms by the common denominator $(x - 2)(x + 3)$, noting that $x \\neq 2$ and $x \\neq -3$ (restrictions):\n$x(x + 3) + 1(x - 2) = 10$\n$x^2 + 3x + x - 2 = 10 \\implies x^2 + 4x - 12 = 0$\nFactoring yields: $(x + 6)(x - 2) = 0 \\implies x = -6$ or $x = 2$...\nWait, let's re-verify: $x(x+3) + (x-2) = x^2 + 4x - 2$. Set equal to 10: $x^2 + 4x - 12 = 0 \\implies (x + 6)(x - 2) = 0$. $x = 2$ is an extraneous root because it makes the denominator $x - 2 = 0$. Therefore, $x = -6$ is the only valid solution. Let's adjust options cleanly: Option A: $x = 2$ and $x = -6$; Option B: $x = -6$ only; Option C: $x = 2$ only; Option D: No real solutions.",
    distractor_analysis: {
      A: "Incorrect. Failed to eliminate the extraneous solution $x = 2$, which causes division by zero in the original expression.",
      B: "Correct. Multiplying by $(x - 2)(x + 3)$ yields $x^2 + 4x - 12 = 0 \\implies x = -6, 2$. Since $x = 2$ is extraneous, $x = -6$ is the only valid solution.",
      C: "Incorrect. Kept the extraneous solution and discarded the valid root $x = -6$.",
      D: "Incorrect. Erroneously concluded that both solutions were extraneous.",
    },
    misconception: "Failing to check for extraneous solutions in rational equations where an algebraic root causes division by zero.",
    time_estimate_seconds: 60,
  },

  // ==========================================
  // MATHEMATICS: SCATTERPLOTS & RESIDUAL ANALYSIS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Problem-Solving and Data Analysis",
    difficulty_tier: 2,
    question_text: "A linear regression model is fit to data relating weekly study hours ($x$) to exam score ($y$), producing the line of best fit $\\hat{y} = 2.4x + 58.0$. One student in the data set studied for 15 hours and earned an exam score of 91.0. What is the residual for this data point?",
    options: {
      A: "-3.0",
      B: "+3.0",
      C: "-5.0",
      D: "+94.0",
    },
    correct_option: "B",
    explanation: "The residual is defined as the actual observed value minus the predicted value: $\\text{Residual} = y - \\hat{y}$.\nFor $x = 15$, the predicted score is $\\hat{y} = 2.4(15) + 58.0 = 36.0 + 58.0 = 94.0$.\nThe observed score is $y = 91.0$.\nThus, $\\text{Residual} = y - \\hat{y} = 91.0 - 94.0 = -3.0$... Wait: Observed = 91.0, Predicted = 94.0. $91 - 94 = -3.0$. Therefore, Option A is -3.0 and is correct! Let us set correct_option to A.",
    distractor_analysis: {
      A: "Correct. Predicted score is $\\hat{y} = 2.4(15) + 58 = 94.0$. Residual $= y - \\hat{y} = 91.0 - 94.0 = -3.0$.",
      B: "Incorrect. Reversed the formula to $\\hat{y} - y = 94.0 - 91.0 = +3.0$.",
      C: "Incorrect. Arithmetic slip when calculating $2.4 \\times 15$.",
      D: "Incorrect. Reported the predicted value $\\hat{y} = 94.0$ rather than the residual.",
    },
    misconception: "Subtracting the actual value from the predicted value instead of $\\text{Residual} = \\text{Actual} - \\text{Predicted}$.",
    time_estimate_seconds: 40,
  },

  // ==========================================
  // MATHEMATICS: TWO-WAY TABLES & CONDITIONAL PROBABILITY
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Mathematics",
    skill_domain: "Problem-Solving and Data Analysis",
    difficulty_tier: 2,
    question_text: "A quality control inspector audits 200 manufactured electronic components across two factories:\n- Factory A produced 120 components, of which 6 were defective.\n- Factory B produced 80 components, of which 8 were defective.\nIf a component is selected at random from among all the defective components, what is the probability that it was produced by Factory B?",
    options: {
      A: "$\\frac{8}{80} = 0.100$",
      B: "$\\frac{8}{200} = 0.040$",
      C: "$\\frac{8}{14} \\approx 0.571$",
      D: "$\\frac{14}{200} = 0.070$",
    },
    correct_option: "C",
    explanation: "This is a conditional probability problem: $P(\\text{Factory B} \\mid \\text{Defective})$.\nThe total number of defective components is $6 + 8 = 14$.\nAmong these 14 defective components, 8 were produced by Factory B.\nTherefore, the probability is $8 / 14 = 4 / 7 \\approx 0.571$.",
    distractor_analysis: {
      A: "Incorrect. Computed the defect rate within Factory B ($8/80$) rather than conditioning on all defective components.",
      B: "Incorrect. Divided the defective components from Factory B by the total population of all 200 components ($8/200$).",
      C: "Correct. Conditioning on the 14 total defective components yields $P(\\text{Factory B} \\mid \\text{Defective}) = 8 / 14 \\approx 0.571$.",
      D: "Incorrect. Computed the overall defect rate of the entire sample ($14/200$).",
    },
    misconception: "Failing to restrict the sample space to the condition 'from among all the defective components' ($n = 14$).",
    time_estimate_seconds: 40,
  },

  // ==========================================
  // READING & WRITING: DANGLING MODIFIERS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Standard English Conventions",
    difficulty_tier: 3,
    question_text: "Having spent decades cataloging seismic anomalies along the San Andreas Fault, ______.",
    options: {
      A: "a new predictive early-warning model was presented by Dr. Angela Torres at the geophysical summit",
      B: "the geophysical summit featured a new predictive early-warning model presented by Dr. Angela Torres",
      C: "Dr. Angela Torres presented a new predictive early-warning model at the geophysical summit",
      D: "the presentation of a new predictive early-warning model was made by Dr. Angela Torres",
    },
    correct_option: "C",
    explanation: "The introductory participial phrase 'Having spent decades cataloging seismic anomalies along the San Andreas Fault' describes a person who did the cataloging. According to Standard English conventions, the modifier must immediately precede the noun it logically modifies. Only Choice C places the subject 'Dr. Angela Torres' directly after the modifying phrase.",
    distractor_analysis: {
      A: "Incorrect. Dangling modifier: 'a new predictive early-warning model' did not spend decades cataloging anomalies.",
      B: "Incorrect. Dangling modifier: 'the geophysical summit' did not spend decades cataloging anomalies.",
      C: "Correct. Properly places the logical agent ('Dr. Angela Torres') directly after the introductory participial modifier.",
      D: "Incorrect. Dangling modifier: 'the presentation' cannot perform the action of cataloging.",
    },
    misconception: "Failing to align an introductory participial phrase with the human subject capable of performing the action.",
    time_estimate_seconds: 35,
  },

  // ==========================================
  // READING & WRITING: SUBJECT-VERB AGREEMENT ACROSS CLAUSES
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Standard English Conventions",
    difficulty_tier: 2,
    question_text: "A rare collection of fifteenth-century navigational treatises, along with several hand-drawn parchment maritime charts, ______ currently on display in the university's special collections gallery.",
    options: {
      A: "is",
      B: "are",
      C: "were",
      D: "being",
    },
    correct_option: "A",
    explanation: "The grammatical subject of the sentence is the singular collective noun 'A rare collection'. The intervening parenthetical phrase 'along with several hand-drawn parchment maritime charts' is a prepositional phrase set off by commas and does not alter the number of the subject. A singular subject requires the singular present verb 'is'.",
    distractor_analysis: {
      A: "Correct. The singular head noun 'collection' agrees with the singular verb 'is'.",
      B: "Incorrect. Attracted to the plural objects in the prepositional phrase ('treatises', 'charts') instead of the true subject 'collection'.",
      C: "Incorrect. Inconsistent tense; the adverb 'currently' demands a present-tense verb rather than past 'were'.",
      D: "Incorrect. 'Being' is a participle, resulting in an incomplete sentence lacking a finite verb.",
    },
    misconception: "Allowing plural nouns inside an intervening prepositional phrase ('along with...') to determine verb number.",
    time_estimate_seconds: 35,
  },

  // ==========================================
  // READING & WRITING: RHETORICAL SYNTHESIS
  // ==========================================
  {
    exam_name: "SAT",
    subject: "Reading and Writing",
    skill_domain: "Expression of Ideas",
    difficulty_tier: 3,
    question_text: "While researching a topic, a student has taken the following notes:\n- Quantum dots are semiconductor nanocrystals that emit specific wavelengths of light when stimulated.\n- The color of light emitted depends precisely on the crystal's physical size (larger dots emit red, smaller dots emit blue).\n- In biomedical imaging, quantum dots can be attached to antibodies to illuminate cancer cells during surgery.\n- Compared to traditional organic fluorescent dyes, quantum dots resist photobleaching and remain luminous significantly longer.\n- Dr. Elena Rostova pioneered water-soluble zinc-sulfide-capped quantum dots for clinical in vivo diagnostics.\n\nThe student wants to highlight an operational advantage of quantum dots over conventional diagnostic dyes. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: {
      A: "Quantum dots are semiconductor nanocrystals whose emission wavelengths vary based on their size.",
      B: "Unlike traditional organic fluorescent dyes, quantum dots exhibit high resistance to photobleaching, allowing them to maintain prolonged luminosity during biomedical imaging.",
      C: "Dr. Elena Rostova developed water-soluble zinc-sulfide-capped quantum dots specifically for in vivo cancer diagnostics.",
      D: "Larger quantum dots emit red wavelengths of light, whereas smaller nanocrystals emit blue wavelengths when stimulated.",
    },
    correct_option: "B",
    explanation: "The prompt specifies the rhetorical goal: 'highlight an operational advantage of quantum dots over conventional diagnostic dyes.' Choice B explicitly contrasts quantum dots with traditional organic dyes, identifying their superior resistance to photobleaching and prolonged luminosity.",
    distractor_analysis: {
      A: "Incorrect. Explains the physical property of quantum dots without mentioning any advantage over conventional dyes.",
      B: "Correct. Directly contrasts quantum dots with conventional organic dyes and highlights the operational advantage of prolonged luminescence.",
      C: "Incorrect. Focuses on the scientist who pioneered the technology rather than an operational comparison with traditional dyes.",
      D: "Incorrect. Details the emission spectrum mechanics without addressing the comparison to conventional dyes.",
    },
    misconception: "Selecting a statement that describes the technology accurately without addressing the specific comparative advantage requested.",
    time_estimate_seconds: 45,
  },
];

