// Path: lib/curriculum-knowledge.ts

export interface DomainKnowledge {
  examName: string;
  subjectName: string;
  domainName: string;
  weightageTier: "High-Yield" | "Core Foundational" | "Advanced Mastery";
  typicalQuestionCount: string;
  avgFailureRatePct: number;
  corePrinciples: string[];
  primaryDistractorTrap: {
    trapName: string;
    description: string;
    whyStudentsFail: string;
    preventionRule: string;
  };
  faqs: Array<{ question: string; answer: string }>;
}

export interface ArchetypeDefinition {
  principles: string[];
  trapName: string;
  trapDesc: string;
  whyStudentsFail: string;
  prevention: string;
  failureRate: number;
  weightageTier?: "High-Yield" | "Core Foundational" | "Advanced Mastery";
  typicalQuestionCount?: string;
}

// Subject-level archetypes for all 6 global exams
const SUBJECT_ARCHETYPES: Record<string, ArchetypeDefinition> = {
  // --- SAT ---
  "Reading and Writing": {
    principles: [
      "Rely strictly on textual evidence provided within the stimulus; never import external historical or scientific background.",
      "Verify grammatical boundaries: check for independent clause comma splices and semicolon requirements before picking transitions.",
      "In rhetorical synthesis and craft questions, match the student goal explicitly declared in the prompt bullet points.",
    ],
    trapName: "External World Assumption & Boundary Comma Splices",
    trapDesc:
      "College Board crafts distractors using real-world plausibility or near-synonyms that contradict the specific text scope or introduce run-on sentences.",
    whyStudentsFail:
      "Test-takers select answers that feel intuitively true rather than confirming word-for-word textual or syntactical equivalence.",
    prevention:
      "Underline the precise question constraint (e.g. 'illustrate contrast', 'emphasize the findings') and eliminate options adding unsupported claims.",
    failureRate: 64,
  },
  Mathematics: {
    principles: [
      "Plot systems of equations directly into Desmos or eliminate variables algebraically before expanding complex polynomials.",
      "In quadratic equations ax² + bx + c = 0, evaluate the discriminant (b² - 4ac) immediately: > 0 gives two real roots, = 0 gives one, < 0 gives zero real roots.",
      "For circles (x - h)² + (y - k)² = r², complete the square on x and y terms to extract center (h, k) and radius r; never mistake r² for r.",
      "Leverage trigonometric cofunction identities: sin(x°) = cos(90° - x°) for complementary acute angles in right triangles.",
    ],
    trapName: "Vertex Form Sign Inversion & Discriminant Miscalculation",
    trapDesc:
      "Distractor choices calculate roots using +b instead of -b in the quadratic formula, or invert signs when converting between vertex form y = a(x - h)² + k and intercepts.",
    whyStudentsFail:
      "Memorizing formula appearances without checking vertex coordinates signs (h, k) or confusing vertex x = -b/(2a) with the minimum/maximum y value.",
    prevention:
      "Always plot quadratic functions or systems in Desmos to confirm vertex coordinates, roots, and intersections before bubbling your answer.",
    failureRate: 66,
  },

  // --- GRE & GMAT FOCUS ---
  "Quantitative Reasoning": {
    principles: [
      "In Quantitative Comparisons, simplify expressions by subtraction or division of positive terms before plugging in values.",
      "For rates and average speeds across equal distances, apply harmonic means (2ab/(a+b)) rather than arithmetic averages.",
      "Factor algebraic polynomials before numerical substitution to reveal common prime factors and cancellation terms.",
    ],
    trapName: "The Positive Number & Integer Assumption Trap",
    trapDesc:
      "Distractors exploit the student reflex to plug in only positive integers (+1, +2, +3), missing sign flips when variables are negative, fractions between 0 and 1, or zero.",
    whyStudentsFail:
      "Assuming 'x and y are numbers' implies x and y are positive whole integers.",
    prevention:
      "Always test the boundary battery {-2, -1/2, 0, 1/2, 2} before concluding Quantity A or B is greater or sufficient.",
    failureRate: 65,
  },
  "Verbal Reasoning": {
    principles: [
      "Analyze sentence structure for pivotal transition markers ('albeit', 'nevertheless', 'paradoxically') that flip tone polarity.",
      "In Critical Reasoning, isolate the conclusion from supporting premises; identify unstated assumptions bridging the premise-conclusion gap.",
      "Eliminate answer choices that shift scope from specific sample observations to absolute universal generalizations.",
    ],
    trapName: "Polarity Flip & Degree of Claim Distractors",
    trapDesc:
      "Distractors supply words that fit the topical vocabulary but reverse the positive/negative connotation dictated by grammatical pivot words.",
    whyStudentsFail:
      "Skimming vocabulary based on semantic association rather than parsing syntactic polarity markers.",
    prevention:
      "Substitute simple sign indicators (+ or -) in blank positions before reading answer options.",
    failureRate: 69,
  },
  "Data Insights": {
    principles: [
      "In Data Sufficiency, evaluate each statement in complete isolation before considering their combination (Statement 1 alone, then Statement 2 alone).",
      "Recognize zero, fractions between 0 and 1, and negative numbers as the standard counterexample test battery.",
      "Never compute final numerical values if the sufficiency of the information can be established through degree-of-freedom counts or algebraic solvability.",
    ],
    trapName: "The Value Calculation Reflex & Statement 1 Leakage",
    trapDesc:
      "Distractors tempt test-takers into spending 3 minutes computing an exact number when only sufficiency is required, or accidentally carrying information from Statement 1 into Statement 2 evaluation.",
    whyStudentsFail:
      "Treating Data Sufficiency as standard problem solving rather than informational boundary verification, and mentally contaminating Statement 2 with Statement 1 premises.",
    prevention:
      "Physically cover Statement 1 on your scratch pad when evaluating Statement 2 alone.",
    failureRate: 72,
  },
  "Analytical Writing": {
    principles: [
      "Deconstruct the prompt into underlying assumptions, causal assertions, and ambiguous definitions before stating a position.",
      "Develop a nuanced thesis that acknowledges counterarguments and boundary conditions rather than taking an extreme, one-sided stance.",
      "Support every claim with concrete, specific evidence (historical, scientific, or policy) rather than hypothetical generalities.",
    ],
    trapName: "The Pure Opinion & Circular Assertion Trap",
    trapDesc:
      "Distractors and low-scoring essays restate the prompt thesis in multiple paragraphs without introducing external empirical evidence or addressing counterexamples.",
    whyStudentsFail:
      "Treating the task as an emotional debate rather than an objective analysis of logical coherence and evidentiary validity.",
    prevention:
      "Spend the first 3 minutes mapping two concrete supporting examples and one explicit counterargument with a reasoned rebuttal.",
    failureRate: 62,
  },

  // --- CFA LEVEL 1 ---
  "Ethical & Professional Standards": {
    principles: [
      "The Code and Standards require adherence to whichever rule is stricter between local law and the CFA Institute Standards.",
      "Differentiate between Material Nonpublic Information and the Mosaic Theory (piecing together non-material nonpublic and public information).",
      "Fair dealing does not require equal execution; it mandates objective dissemination and priority of client transactions over personal accounts.",
    ],
    trapName: "The Stricter Standard & Mosaic Theory Boundaries",
    trapDesc:
      "Distractors argue that following permissive local law satisfies ethics, or that analyst research based on non-material clues violates insider trading.",
    whyStudentsFail:
      "Assuming local legal compliance suffices, forgetting Standard I(A) mandates the higher of local law or CFA Standards.",
    prevention:
      "Always ask: 'Is local law stricter or the CFA Standard?' Follow the strictly superior benchmark.",
    failureRate: 70,
  },
  "Quantitative Methods": {
    principles: [
      "In Time Value of Money calculations, verify whether cash flows occur at the beginning (Annuity Due / BGN mode) or end of the period (Ordinary Annuity / END mode).",
      "Differentiate standard deviation (dispersion of sample observations) from standard error of the sample mean (SE = s / √n).",
      "Formulate null hypothesis (H₀) with the equality condition (=, ≤, ≥); reject H₀ if test statistic exceeds critical value or p-value < α.",
    ],
    trapName: "Annuity Mode Inversion & Type I / Type II Error Conflation",
    trapDesc:
      "Distractors calculate retirement lump sums using Ordinary Annuity when payments are made at the beginning of each year, or swap Type I error (rejecting true null) with Type II error (failing to reject false null).",
    whyStudentsFail:
      "Leaving the financial calculator in END mode for lease/retirement questions and rushing through hypothesis testing definitions.",
    prevention:
      "Circle payment timing ('in advance' vs 'in arrears') immediately; sketch the rejection region before comparing test statistics to critical t/z values.",
    failureRate: 68,
  },
  Economics: {
    principles: [
      "Calculate own-price elasticity of demand using the midpoint formula; total revenue is maximized where elasticity equals -1.0 (unitary elastic).",
      "Distinguish real exchange rates from nominal rates: Real FX = Nominal FX × (CPI_base / CPI_price).",
      "In macroeconomic policy, the fiscal multiplier (1 / [1 - MPC(1 - t)]) exceeds the balanced budget multiplier (= 1.0).",
    ],
    trapName: "Base vs Price Currency Inversion & Cross-Price Elasticity Signs",
    trapDesc:
      "Distractors invert quote conventions (Price/Base) or assign substitute goods a negative cross-price elasticity (substitutes have positive elasticity; complements have negative).",
    whyStudentsFail:
      "Confusing the base currency with the price currency in exchange rate quotes and memorizing elasticity formulas without signing substitute relationships.",
    prevention:
      "Label currency quotes explicitly as Price/Base; remember that if Price/Base rises, Base currency has appreciated and Price currency has depreciated.",
    failureRate: 66,
  },
  "Financial Statement Analysis": {
    principles: [
      "Distinguish between IFRS and US GAAP accounting treatments (e.g., development costs capitalization, LIFO inventory method prohibition under IFRS).",
      "Trace the 3-step and 5-step DuPont decomposition of ROE to isolate operational margin, asset turnover, and financial leverage.",
      "Adjust Cash Flow from Operations (CFO) for capitalized interest, operating leases, and non-recurring accounts receivable securitizations.",
    ],
    trapName: "LIFO/FIFO Reserve Inversion & Lease Capitalization Errors",
    trapDesc:
      "Distractors calculate inventory or COGS without adjusting for LIFO reserve changes during rising price environments (COGS_FIFO = COGS_LIFO - ΔLIFO Reserve).",
    whyStudentsFail:
      "Confusing balance sheet inventory values with income statement cost of goods sold adjustments.",
    prevention:
      "Apply: COGS (FIFO) = COGS (LIFO) − ΔLIFO Reserve; audit the direction of price inflation before selecting metrics.",
    failureRate: 67,
  },
  "Corporate Issuers": {
    principles: [
      "Calculate Weighted Average Cost of Capital (WACC) using target market-value weights, never historical book-value weights.",
      "When evaluating mutually exclusive projects of differing scales, prioritize Net Present Value (NPV) over Internal Rate of Return (IRR) because IRR assumes reinvestment at the IRR rate.",
      "Flotation costs should be treated as an initial cash outflow at t=0, never as an ongoing addition to the cost of equity (r_e).",
    ],
    trapName: "Book Value Weighting & IRR Reinvestment Rate Trap",
    trapDesc:
      "Distractors compute WACC using balance sheet book values or select projects based on higher IRR despite lower total wealth creation (NPV).",
    whyStudentsFail:
      "Treating IRR as a measure of total project value rather than an annualized rate, ignoring the reinvestment rate assumption defect.",
    prevention:
      "Always select the highest positive NPV project when capital or options are mutually exclusive.",
    failureRate: 64,
  },
  "Equity Investments": {
    principles: [
      "In the Gordon Constant Growth Dividend Discount Model (P₀ = D₁ / (r - g)), ensure the numerator uses expected next-period dividend D₁ = D₀(1 + g), not trailing dividend D₀.",
      "The required return (r) must strictly exceed the dividend growth rate (g); if g ≥ r, the constant growth model is mathematically undefined.",
      "Price-weighted indexes (e.g., Dow Jones) are biased by high nominal share prices, while market-cap-weighted indexes are biased toward overvalued mega-cap stocks.",
    ],
    trapName: "Trailing Dividend D₀ vs Expected Dividend D₁ Conflation",
    trapDesc:
      "Test writers build distractors by calculating P₀ = D₀ / (r - g), failing to grow the trailing dividend by (1 + g).",
    whyStudentsFail:
      "Failing to read whether the prompt specifies 'just paid a dividend of $X' (D₀) versus 'expects to pay a dividend of $X next year' (D₁).",
    prevention:
      "Circle the timing of the dividend: if past tense ('just paid', 'recently distributed'), multiply by (1 + g) first.",
    failureRate: 63,
  },
  "Fixed Income": {
    principles: [
      "Bond prices and yields are inversely related: a coupon bond trades at a discount when YTM > coupon rate, and at a premium when YTM < coupon rate.",
      "Modified Duration measures percentage price volatility for a given change in yield; Convexity is always positive for option-free bonds and improves price gains while dampening losses.",
      "Effective Duration must be used for bonds with embedded options (callable/puttable) because cash flows fluctuate when interest rates shift.",
    ],
    trapName: "Macaulay vs Modified Duration & Convexity Sign Errors",
    trapDesc:
      "Distractors use Macaulay duration in price change approximations without dividing by (1 + y/k), or subtract the convexity adjustment instead of adding it.",
    whyStudentsFail:
      "Forgetting that convexity is always a positive adjustment for plain-vanilla bonds regardless of whether yields rise or fall.",
    prevention:
      "Write the full formula: %ΔP ≈ [-AnnModDur × Δy] + [0.5 × AnnConvexity × (Δy)²]; remember the negative sign belongs only to duration.",
    failureRate: 71,
  },
  Derivatives: {
    principles: [
      "The price of a forward contract is fixed at initiation such that the initial value is zero; as the spot price and interest rates fluctuate, the contract value deviates from zero.",
      "Put-Call Parity for European options: S₀ + p₀ = c₀ + PV(X); a synthetic long stock position is created by buying a call, selling a put, and investing PV of the strike.",
      "At expiration, the value of a call option is Max(0, S_T - X), and the value of a put option is Max(0, X - S_T).",
    ],
    trapName: "Price vs Value at Initiation & Put-Call Parity Synthetic Signs",
    trapDesc:
      "Distractors confuse the forward price F₀(T) with the forward value V₀(T)=0 at initiation, or invert signs in synthetic replication portfolios.",
    whyStudentsFail:
      "Thinking a forward contract costs money to enter, forgetting no cash changes hands at t=0 for an uncollateralized forward.",
    prevention:
      "Remember: Value at inception is zero; Forward price is S₀ × (1 + r)^T. Use Fiduciary Call = Protective Put to verify Parity.",
    failureRate: 73,
  },
  "Alternative Investments": {
    principles: [
      "Private Equity fund management fees are typically calculated on committed capital during the investment period, and on invested capital / NAV thereafter.",
      "Hedge fund performance fees with a high-water mark require the fund manager to recoup all previous cumulative losses before earning incentive fees.",
      "Real estate capitalization rate (Cap Rate) = Net Operating Income (NOI) / Property Value; Cap rate increases as risk or financing costs rise, lowering property value.",
    ],
    trapName: "Committed vs Invested Capital Base & Cap Rate Inversion",
    trapDesc:
      "Distractors calculate 2% management fees using NAV when the fund is still in its commitment period, or invert Cap Rate to value properties.",
    whyStudentsFail:
      "Applying fees to current asset values rather than contractual committed amounts stipulated in limited partnership agreements.",
    prevention:
      "Check the fund lifecycle phase: if within the commitment/investment period, multiply the fee percentage by total committed capital.",
    failureRate: 65,
  },
  "Portfolio Management": {
    principles: [
      "The Capital Allocation Line (CAL) plots portfolios of the risk-free asset and a risky portfolio; the Capital Market Line (CML) is the CAL with the optimal market portfolio.",
      "The Security Market Line (SML) plots expected return against systematic risk (Beta) and applies to all individual assets and portfolios; underpriced assets plot above the SML.",
      "Total risk = Systematic risk (market-wide, non-diversifiable) + Unsystematic risk (firm-specific, diversifiable to near zero in a ~30-stock portfolio).",
    ],
    trapName: "CAL vs CML vs SML & Standard Deviation vs Beta Usage",
    trapDesc:
      "Distractors evaluate individual securities using the Capital Market Line (which uses Total Risk / Std Dev and applies ONLY to efficient portfolios), rather than the Security Market Line (which uses Beta).",
    whyStudentsFail:
      "Forgetting that only the SML prices individual securities based on non-diversifiable Beta risk.",
    prevention:
      "Ask: 'Is this an individual asset or an efficient portfolio?' If individual asset, use Beta and the SML (CAPM). If efficient portfolio, use standard deviation and the CML.",
    failureRate: 67,
  },

  // --- IELTS ACADEMIC & TOEFL IBT ---
  Reading: {
    principles: [
      "In IELTS, distinguish between 'FALSE' (direct contradiction) and 'NOT GIVEN' (unsupported premise); in TOEFL, eliminate answer choices that introduce extreme qualifiers or unsubstantiated causal claims.",
      "Scan for contextual paraphrases and lexical antonyms rather than verbatim keywords, which test writers intentionally plant in distractor choices.",
      "In Prose Summary and Heading Matching, eliminate options that represent minor subsidiary details or examples rather than overarching paragraph/passage theses.",
    ],
    trapName: "Not Given vs False Conflation & Keyword Lures",
    trapDesc:
      "Distractors reuse verbatim phrasing from the passage to formulate assertions that are either logically inverted or completely uncorroborated.",
    whyStudentsFail:
      "Assuming that if a statement cannot be proved True, it must be False, ignoring that the text simply never took a stand.",
    prevention:
      "Ask: 'Did the passage actively disprove this fact, or merely omit it?' If no explicit contradiction exists, the answer is NOT GIVEN.",
    failureRate: 66,
  },
  Listening: {
    principles: [
      "Anticipate the speaker's self-correction ('actually, let me change that...', 'or rather', 'we originally planned to...').",
      "In TOEFL conversations and lectures, track pragmatic intent, rhetorical shifts, and speaker attitude beyond literal utterance semantics.",
      "Observe word count constraints and exact spelling in IELTS form completions; track numerical digits and plural endings (-s).",
    ],
    trapName: "Immediate Self-Correction & Premature Transcription",
    trapDesc:
      "The audio script mentions an initial number or option to trigger premature writing, before the speaker corrects themselves in the subsequent clause.",
    whyStudentsFail:
      "Writing down the first numerical or categorical datum heard instead of listening through the discourse boundary.",
    prevention:
      "Keep your pen hovering for 3 seconds after hearing the target datum to confirm no conversational correction occurs.",
    failureRate: 61,
  },
  Writing: {
    principles: [
      "In IELTS Task 1, synthesize key trends, highs, lows, and notable exceptions without offering speculative explanations; in Task 2, maintain a clear, consistent position throughout the essay.",
      "In TOEFL Integrated Writing, systematically pair each reading point with the lecturer's direct counter-evidence; never summarize the reading without explaining how the audio refuted it.",
      "In TOEFL Academic Discussion, contribute a distinct, well-reasoned perspective that adds new arguments rather than merely agreeing with earlier student responses.",
    ],
    trapName: "The Unpaired Lecture Counterpoint & Data Dump Trap",
    trapDesc:
      "Candidates describe every minor statistic in IELTS charts without highlighting overarching macro-trends, or write a generic essay on the TOEFL reading without capturing the lecturer's specific refutations.",
    whyStudentsFail:
      "Focusing on surface sentence count rather than syntactical coherence, cohesive devices, and balanced rhetorical task response.",
    prevention:
      "For TOEFL Integrated Writing, structure each body paragraph with a 1:2 ratio: 1 sentence summarizing the reading claim followed by 2 sentences detailing the professor's explicit refutation.",
    failureRate: 68,
  },
  Speaking: {
    principles: [
      "In IELTS Speaking, maintain continuous speech without long pauses for vocabulary retrieval; discourse markers ('well', 'on the whole', 'to put it another way') buy working memory time.",
      "In TOEFL Speaking (Q1-Q4), structure responses with a clear topic sentence, two distinct developmental points, and specific details delivered at a steady, fluent pace.",
      "For TOEFL Integrated tasks (Q2-Q4), prioritize the campus conversation or academic lecture content over the introductory reading passage.",
    ],
    trapName: "The Memorized Template & Halting Retrieval Trap",
    trapDesc:
      "Examiners and speech scoring engines penalize candidates who recite memorized idioms unnaturally or stall for 5+ seconds searching for complex vocabulary.",
    whyStudentsFail:
      "Prioritizing advanced vocabulary over pronunciation, natural intonation, and topical task completion within the strict 45-60 second digital recording window.",
    prevention:
      "Record your practice sprints against a 45/60 second timer; focus on smooth delivery and connective transitions rather than obscure synonyms.",
    failureRate: 63,
  },
};

// Domain-level specialized overrides for high-traffic student queries
const DOMAIN_OVERRIDES: Record<string, ArchetypeDefinition> = {
  "Data Sufficiency": {
    principles: [
      "Evaluate Statement 1 alone, then Statement 2 alone, in strict isolation.",
      "If evaluating whether x > 0, test numbers across the critical boundary set: {-2, -1/2, 0, 1/2, 2}.",
      "For 'Yes/No' questions, a statement is sufficient if and only if it produces an invariant answer (always YES or always NO). If you can generate both a YES and a NO, it is insufficient.",
    ],
    trapName: "The Value Calculation Reflex & Statement 1 Contamination",
    trapDesc:
      "Students waste time calculating exact values when only informational sufficiency is needed, or accidentally assume Statement 1's condition is active while evaluating Statement 2 alone.",
    whyStudentsFail:
      "Treating Data Sufficiency as standard problem solving rather than informational boundary verification.",
    prevention:
      "Follow the 12-second 5-choice elimination grid: 1 is sufficient -> A or D; 1 is insufficient -> B, C, or E. Re-read Statement 2 in isolation.",
    failureRate: 74,
    weightageTier: "High-Yield",
    typicalQuestionCount: "6-9 Questions per Section",
  },
  "Quantitative Comparison": {
    principles: [
      "Simplify Quantity A and Quantity B symmetrically before substituting numerical test values.",
      "Never compute actual values for complex geometric comparisons if geometric similarity or triangle inequality rules dictate the relationship.",
      "Always test boundary numbers: zero, negatives, and positive non-integers between 0 and 1 (where x² < x).",
    ],
    trapName: "The Positive Integer Bias & Visual Geometry Trap",
    trapDesc:
      "Distractor choices assume diagrams are drawn to scale, or exploit students testing only positive whole numbers (+1, +2).",
    whyStudentsFail:
      "Geometric diagrams in GRE Quantitative Comparisons are NOT necessarily drawn to scale unless explicitly stated.",
    prevention:
      "Redraw geometric figures in extreme configurations (e.g. stretching an acute angle into an obtuse one) to test if the relationship remains invariant.",
    failureRate: 71,
    weightageTier: "High-Yield",
    typicalQuestionCount: "7-8 Questions per Section",
  },
  "True-False-Not Given": {
    principles: [
      "TRUE: The passage explicitly agrees with and confirms the statement.",
      "FALSE: The passage explicitly contradicts and refutes the statement (you can cite the opposing fact).",
      "NOT GIVEN: It is impossible to confirm or refute based strictly on the text.",
    ],
    trapName: "The Logical Inversion vs Unsupported Premise Trap",
    trapDesc:
      "Marking 'False' because a statement sounds unfamiliar or was not discussed, when in reality the author neither confirmed nor denied it.",
    whyStudentsFail:
      "Failing to demand explicit negative evidence before declaring an answer False.",
    prevention:
      "Ask: 'Did the author say this didn't happen, or just didn't mention it?' If no explicit contradiction exists, select NOT GIVEN.",
    failureRate: 69,
    weightageTier: "High-Yield",
    typicalQuestionCount: "4-6 Questions per Paper",
  },
  "Fixed-Income Valuation": {
    principles: [
      "The value of a bond equals the present value of its future coupon payments discounted at spot rates, plus the present value of its par value.",
      "Zero-coupon bond price = Par / (1 + r)^T; price sensitivity to interest rate changes increases with longer maturity and lower coupon rates.",
      "Full (dirty) price = Flat (clean) price + Accrued interest; accrued interest = Coupon × (t / T).",
    ],
    trapName: "Clean vs Dirty Price & Spot vs Par Yield Curve Discrepancies",
    trapDesc:
      "Distractor choices calculate settlement amounts without adding accrued interest, or discount unequal multi-period cash flows using a single par yield rather than spot rates.",
    whyStudentsFail:
      "Confusing the invoice settlement price with the quoted dealer clean price.",
    prevention:
      "Always verify whether the question asks for Flat Price or Full Price; remember Full Price = PV of all remaining cash flows as of settlement date.",
    failureRate: 72,
    weightageTier: "High-Yield",
    typicalQuestionCount: "3-5 Questions per Exam",
  },
  "Time Value of Money": {
    principles: [
      "Effective Annual Rate (EAR) = (1 + r/m)^m - 1; EAR strictly exceeds the stated nominal annual rate when compounding frequency m > 1.",
      "Present value of an ordinary perpetuity = PMT / r; growing perpetuity PV = PMT₁ / (r - g).",
      "Continuous compounding PV = FV × e^(-r × t).",
    ],
    trapName: "Compounding Frequency Inversion & Annuity Due Timing",
    trapDesc:
      "Distractor choices multiply periodic interest rates by m instead of compounding them, or omit the (1 + r) multiplier for Annuity Due cash flows.",
    whyStudentsFail:
      "Failing to reset calculator compounding periods (P/Y = 1, C/Y = 1) before computing TVM registers.",
    prevention:
      "Clear all financial calculator registers (2nd -> CLR TVM) before every problem; verify BGN vs END flag on the display.",
    failureRate: 65,
    weightageTier: "Core Foundational",
    typicalQuestionCount: "4-6 Questions per Exam",
  },
  "Quadratic Equations & Discriminant": {
    principles: [
      "For ax² + bx + c = 0, the discriminant Δ = b² - 4ac: Δ > 0 indicates two distinct real roots, Δ = 0 indicates one repeated real root (tangent to x-axis), Δ < 0 indicates two complex roots.",
      "Sum of roots = -b/a; Product of roots = c/a. Use Vieta's formulas to bypass full factoring.",
      "Vertex of parabola y = ax² + bx + c is at x = -b/(2a); maximum occurs when a < 0, minimum when a > 0.",
    ],
    trapName: "The Extraneous Root & Vertex Sign Flips",
    trapDesc:
      "College Board distractor choices calculate roots using +b/(2a) instead of -b/(2a), or preserve extraneous roots introduced by squaring radical equations.",
    whyStudentsFail:
      "Solving mechanically without plugging roots back into the original un-squared radical equation.",
    prevention:
      "Type the quadratic equation or system directly into Desmos on the right-hand panel of Bluebook to visually verify intersections and vertex coordinates in under 15 seconds.",
    failureRate: 68,
    weightageTier: "High-Yield",
    typicalQuestionCount: "3-5 Questions per Module",
  },
};

const DEFAULT_ARCHETYPE: ArchetypeDefinition = {
  principles: [
    "Identify the foundational definition and scope of the domain before attempting high-speed problem sets.",
    "Isolate the single primary variable being tested from secondary distractor parameters.",
    "Verify the problem's boundary constraints and edge conditions.",
  ],
  trapName: "Boundary Condition & Assumption Trap",
  trapDesc:
    "Distractor choices calculate answers using unstated default assumptions or omitting edge-case limits.",
  whyStudentsFail:
    "Solving mechanically without actively auditing which variables are constants vs parameters.",
  prevention:
    "Highlight all qualifiers and constraints in the problem prompt before initiating calculations.",
  failureRate: 60,
};

/**
 * Returns structured curriculum knowledge, distractor analyses, and FAQs
 * for any exam, subject, and domain.
 */
export function getDomainKnowledge(
  examName: string,
  subjectName: string,
  domainName: string,
): DomainKnowledge {
  const archetype =
    DOMAIN_OVERRIDES[domainName] ||
    SUBJECT_ARCHETYPES[subjectName] ||
    SUBJECT_ARCHETYPES[examName] ||
    DEFAULT_ARCHETYPE;

  const faqs = [
    {
      question: `What makes ${domainName} questions in ${examName} so difficult for students?`,
      answer: `Most students lose points to ${archetype.trapName.toLowerCase()} traps rather than missing core concepts. Official questions are specifically designed to catch test-takers who rely on intuition without checking boundary conditions.`,
    },
    {
      question: `How should I time my review of ${domainName} to prevent forgetting?`,
      answer: `Review this topic with a 5-question retrieval drill at 24 hours and 7 days. Spaced review locks concepts into memory with significantly less total study time than cramming.`,
    },
    {
      question: `Are these ${domainName} practice problems aligned with the latest ${examName} syllabus?`,
      answer: `Yes. Every question mirrors the current official ${examName} (${subjectName}) curriculum and test specifications.`,
    },
    {
      question: `Why does AceThePrep show why wrong options are incorrect?`,
      answer: `Top scores come from recognizing distractor patterns quickly. Deconstructing why common traps look correct prevents you from repeating those same mistakes on test day.`,
    },
  ];

  const weightageTier =
    archetype.weightageTier ||
    (archetype.failureRate >= 66 ? "High-Yield" : "Core Foundational");

  const typicalQuestionCount =
    archetype.typicalQuestionCount ||
    (archetype.failureRate >= 66
      ? "3-5 Questions per Paper"
      : "2-4 Questions per Paper");

  return {
    examName,
    subjectName,
    domainName,
    weightageTier,
    typicalQuestionCount,
    avgFailureRatePct: archetype.failureRate,
    corePrinciples: archetype.principles,
    primaryDistractorTrap: {
      trapName: archetype.trapName,
      description: archetype.trapDesc,
      whyStudentsFail: archetype.whyStudentsFail,
      preventionRule: archetype.prevention,
    },
    faqs,
  };
}
