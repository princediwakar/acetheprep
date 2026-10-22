// Path: lib/constants/search-catalog.ts
import taxonomyRaw from "@/lib/taxonomies.json";
import { slugify } from "@/lib/slugs";

export type SearchCategory = "topic" | "formula" | "trap";

export interface SearchCatalogItem {
  id: string;
  title: string;
  category: SearchCategory;
  exam: string;
  examSlug: string;
  subject: string;
  subjectSlug: string;
  domain: string;
  domainSlug: string;
  href: string;
  snippet?: string;
  summary: string;
  keywords: string[];
}

interface RawConcept {
  title: string;
  category: SearchCategory;
  exam: string;
  subject: string;
  domain: string;
  snippet?: string;
  summary: string;
  keywords: string[];
}

/**
 * Curated high-yield micro-concepts, mathematical/financial formulas,
 * and notorious distractor traps across all 6 exams.
 */
const HIGH_YIELD_CONCEPTS: RawConcept[] = [
  // ==========================================
  // DIGITAL SAT
  // ==========================================
  {
    title: "Parabolas: Vertex Form y = a(x - h)² + k",
    category: "topic",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Quadratic Equations & Discriminant",
    snippet: "Vertex (h, k) • Axis x = h",
    summary: "Convert quadratics to vertex form to instantly read maximum/minimum coordinates without factoring.",
    keywords: ["parabola", "parabolas", "vertex form", "quadratic", "axis of symmetry", "maximum", "minimum", "turning point", "vertex"],
  },
  {
    title: "Parabola Vertex Sign Inversion Trap",
    category: "trap",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Quadratic Equations & Discriminant",
    snippet: "68% Miss Rate • y = a(x - h)² + k",
    summary: "Inverting signs when extracting vertex coordinates: y = 2(x - 3)² + 4 has vertex at (+3, +4), not (-3, +4).",
    keywords: ["parabola", "parabolas", "vertex trap", "sign inversion", "h k trap", "sign flip", "quadratic trap"],
  },
  {
    title: "Parabola Line Tangency & Discriminant Δ = 0",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Quadratic Equations & Discriminant",
    snippet: "Δ = b² - 4ac = 0 (1 solution)",
    summary: "When a line is tangent to a parabola, equating them yields a quadratic with discriminant exactly equal to 0.",
    keywords: ["parabola", "discriminant", "tangent", "b2 - 4ac", "one solution", "intersection", "tangency"],
  },
  {
    title: "Quadratic Formula & Discriminant Analysis",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Quadratic Equations & Discriminant",
    snippet: "x = (-b ± √(b² - 4ac)) / (2a)",
    summary: "Evaluate Δ = b² - 4ac to determine root nature: Δ > 0 (2 real), Δ = 0 (1 real), Δ < 0 (0 real).",
    keywords: ["quadratic formula", "discriminant", "roots", "b2-4ac", "parabola", "zeroes"],
  },
  {
    title: "Vieta's Formulas (Sum & Product of Roots)",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Quadratic Equations & Discriminant",
    snippet: "Sum = -b/a • Product = c/a",
    summary: "Bypass factoring quadratic equations ax² + bx + c = 0 by finding root sum and product directly.",
    keywords: ["vieta", "sum of roots", "product of roots", "quadratic", "roots formula"],
  },
  {
    title: "Extraneous Roots & Radical Equations",
    category: "topic",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Advanced Math",
    snippet: "Squaring introduces false roots",
    summary: "Squaring both sides of a radical equation introduces extraneous solutions that must be validated.",
    keywords: ["extraneous roots", "radical equations", "square roots", "extraneous solutions", "false roots"],
  },
  {
    title: "Extraneous Roots Omission Trap",
    category: "trap",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Advanced Math",
    snippet: "74% Miss Rate • √(x+5) = x - 1",
    summary: "Factoring yields two algebraic candidate roots, but negative substitution violates the non-negative radical principal.",
    keywords: ["extraneous roots", "radical trap", "false roots", "algebraic trap", "extraneous root omission"],
  },
  {
    title: "Circle Standard Form & Radius Trap",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Circles & Theorems",
    snippet: "(x - h)² + (y - k)² = r²",
    summary: "Complete the square to find center (h, k) and radius r; never confuse r² with diameter or radius r.",
    keywords: ["circle", "circle equation", "radius", "center", "complete the square", "r squared"],
  },
  {
    title: "Special Right Triangles (30-60-90 & 45-45-90)",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Right Triangles & Trigonometry",
    snippet: "x, x√3, 2x • s, s, s√2",
    summary: "Use exact side ratios to solve right triangle geometry without trigonometric table approximations.",
    keywords: ["special right triangles", "30 60 90", "45 45 90", "pythagorean", "hypotenuse"],
  },
  {
    title: "Cofunction Identity: Sine & Cosine Complements",
    category: "formula",
    exam: "SAT",
    subject: "Mathematics",
    domain: "Right Triangles & Trigonometry",
    snippet: "sin(x°) = cos(90° - x°)",
    summary: "For acute complementary angles in right triangles, the sine of one angle equals the cosine of the other.",
    keywords: ["cofunction", "trigonometry", "sin cos", "complementary angles", "90 - x"],
  },
  {
    title: "Independent Clause Comma Splice Trap",
    category: "trap",
    exam: "SAT",
    subject: "Reading and Writing",
    domain: "Boundaries (Punctuation & Splices)",
    snippet: "64% Miss Rate • Semicolon vs Comma",
    summary: "Joining two complete independent thoughts with only a comma without a coordinating conjunction (FANBOYS).",
    keywords: ["comma splice", "run on sentence", "boundaries", "semicolon", "independent clause"],
  },
  {
    title: "Rhetorical Synthesis: Goal Alignment Rule",
    category: "topic",
    exam: "SAT",
    subject: "Reading and Writing",
    domain: "Rhetorical Synthesis",
    snippet: "Match the prompt bullet constraint",
    summary: "The correct choice directly achieves the student's declared goal; ignore true facts that address different goals.",
    keywords: ["rhetorical synthesis", "student notes", "goal alignment", "synthesis"],
  },

  // ==========================================
  // GMAT FOCUS
  // ==========================================
  {
    title: "Data Sufficiency: Value vs Yes/No Framework",
    category: "topic",
    exam: "GMAT Focus",
    subject: "Data Insights",
    domain: "Data Sufficiency",
    snippet: "Unique value vs Invariant Yes/No",
    summary: "Value questions require exactly 1 numerical solution; Yes/No questions require invariant true OR invariant false.",
    keywords: ["data sufficiency", "ds", "value questions", "yes no", "sufficiency", "gmat ds"],
  },
  {
    title: "Data Sufficiency: Parity & Integer Constraints",
    category: "topic",
    exam: "GMAT Focus",
    subject: "Data Insights",
    domain: "Data Sufficiency",
    snippet: "Even ± Even = Even • Odd × Odd = Odd",
    summary: "Evaluate parity algebraic properties without substituting unconstrained non-integer fractions.",
    keywords: ["data sufficiency", "parity", "even odd", "integers", "ds parity"],
  },
  {
    title: "Data Sufficiency 'C' Trap: Premature Combination",
    category: "trap",
    exam: "GMAT Focus",
    subject: "Data Insights",
    domain: "Data Sufficiency",
    snippet: "71% Miss Rate • Combining (1) & (2) too early",
    summary: "Candidates combine statements before thoroughly testing whether Statement 1 alone or Statement 2 alone suffices.",
    keywords: ["data sufficiency", "c trap", "premature combination", "statement 1 alone", "statement 2 alone"],
  },
  {
    title: "Boundary Battery {-2, -1/2, 0, 1/2, 2} Testing",
    category: "formula",
    exam: "GMAT Focus",
    subject: "Quantitative Reasoning",
    domain: "Inequalities & Absolute Values",
    snippet: "Negatives, Fractions, Zero, Positives",
    summary: "Eliminate false sufficiency by plugging in negative numbers, proper fractions, zero, and positive integers.",
    keywords: ["boundary battery", "plug in numbers", "fractions", "zero", "counterexamples", "inequalities"],
  },
  {
    title: "Work-Rate Formula (Harmonic Cooperation)",
    category: "formula",
    exam: "GMAT Focus",
    subject: "Quantitative Reasoning",
    domain: "Word Problems (Rates & Work)",
    snippet: "1/A + 1/B = 1/T • T = (A × B) / (A + B)",
    summary: "Rates add directly (Rate_total = Rate_A + Rate_B); time does not add directly.",
    keywords: ["work rate", "rates", "harmonic mean", "combined work", "rate formula"],
  },
  {
    title: "Overlapping Sets: Double Matrix Method",
    category: "formula",
    exam: "GMAT Focus",
    subject: "Quantitative Reasoning",
    domain: "Word Problems (Overlapping Sets)",
    snippet: "Total = A + B - (Both) + Neither",
    summary: "Set up a 2x2 grid for mutually exclusive categories (A vs not A, B vs not B) to solve missing cell partitions.",
    keywords: ["overlapping sets", "venn diagram", "double matrix", "both neither", "set theory"],
  },
  {
    title: "Zero is an Even Integer Trap",
    category: "trap",
    exam: "GMAT Focus",
    subject: "Quantitative Reasoning",
    domain: "Number Properties",
    snippet: "65% Miss Rate • 0 is even, not positive/negative",
    summary: "Assuming zero is not even or forgetting that 0 is divisible by 2 with remainder 0.",
    keywords: ["zero is even", "number properties trap", "parity trap", "divisibility by 2"],
  },

  // ==========================================
  // CFA LEVEL 1
  // ==========================================
  {
    title: "DuPont Analysis: 3-Step ROE Decomposition",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Financial Statement Analysis",
    domain: "Financial Analysis Techniques",
    snippet: "ROE = NPM × Asset Turnover × Leverage",
    summary: "ROE = (Net Income / Sales) × (Sales / Assets) × (Assets / Equity) isolating profitability, efficiency, and leverage.",
    keywords: ["dupont", "dupont analysis", "roe", "roe decomposition", "equity multiplier", "3-step dupont", "fsa"],
  },
  {
    title: "DuPont Analysis: 5-Step Extended Decomposition",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Financial Statement Analysis",
    domain: "Financial Analysis Techniques",
    snippet: "Tax Burden × Interest Burden × EBIT Margin × TAT × Leverage",
    summary: "ROE = (NI/EBT) × (EBT/EBIT) × (EBIT/Revenue) × (Revenue/Assets) × (Assets/Equity).",
    keywords: ["dupont", "5 step dupont", "5-step dupont", "extended dupont", "tax burden", "interest burden", "operating margin"],
  },
  {
    title: "DuPont Tax Burden Ratio Inversion Trap",
    category: "trap",
    exam: "CFA Level 1",
    subject: "Financial Statement Analysis",
    domain: "Financial Analysis Techniques",
    snippet: "69.4% Miss Rate • NI / EBT",
    summary: "Tax Burden is Net Income / EBT (1 - t). Inverting numerator and denominator to EBT / Net Income is the #1 FSA calculation trap.",
    keywords: ["dupont", "dupont trap", "tax burden", "tax burden inversion", "ebt net income", "ratio inversion"],
  },
  {
    title: "Weighted Average Cost of Capital (WACC)",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Corporate Issuers",
    domain: "Capital Structure",
    snippet: "WACC = w_d × r_d(1 - t) + w_e × r_e",
    summary: "Compute hurdle rate weighting after-tax debt cost and equity required return by target capital structure.",
    keywords: ["wacc", "cost of capital", "capital structure", "after tax debt", "hurdle rate"],
  },
  {
    title: "Capital Asset Pricing Model (CAPM)",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Portfolio Management",
    domain: "Portfolio Risk & Return",
    snippet: "E(R_i) = R_f + β_i[E(R_m) - R_f]",
    summary: "Calculate expected equity return given risk-free rate, asset beta, and market risk premium.",
    keywords: ["capm", "beta", "market risk premium", "required return", "cost of equity"],
  },
  {
    title: "Time Value of Money (TVM) Basic Equation",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Quantitative Methods",
    domain: "Time Value of Money",
    snippet: "FV = PV(1 + r/m)^(mt)",
    summary: "Compute future value or present value under periodic compounding frequency m.",
    keywords: ["time value of money", "tvm", "future value", "present value", "compound interest", "fv pv"],
  },
  {
    title: "Bayes' Formula for Updated Conditional Probabilities",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Quantitative Methods",
    domain: "Probability Distributions",
    snippet: "P(A|B) = [P(B|A) × P(A)] / P(B)",
    summary: "Update event probability given new information using conditional probabilities.",
    keywords: ["bayes", "bayes formula", "conditional probability", "prior probability", "quantitative methods"],
  },
  {
    title: "Gordon Growth Model (Constant Dividend Growth)",
    category: "formula",
    exam: "CFA Level 1",
    subject: "Equity Investments",
    domain: "Equity Valuation",
    snippet: "P_0 = D_1 / (r - g) = D_0(1 + g) / (r - g)",
    summary: "Value common stock based on next period dividend D1, required return r, and perpetual growth rate g.",
    keywords: ["gordon growth", "ddm", "dividend discount model", "equity valuation", "intrinsic value"],
  },
  {
    title: "Modified Duration vs Effective Duration on Bonds",
    category: "trap",
    exam: "CFA Level 1",
    subject: "Fixed Income",
    domain: "Yield & Spread Analysis",
    snippet: "63.7% Miss Rate • Callable/Putable bonds require Effective Duration",
    summary: "Modified duration assumes cash flows are fixed; bonds with embedded options (callable) require Effective Duration.",
    keywords: ["duration", "modified duration", "effective duration", "fixed income trap", "callable bonds"],
  },

  // ==========================================
  // GRE GENERAL
  // ==========================================
  {
    title: "Quantitative Comparison: The 'D' Answer Indeterminacy Trap",
    category: "trap",
    exam: "GRE",
    subject: "Quantitative Reasoning",
    domain: "Quantitative Comparison",
    snippet: "65% Miss Rate • Relationship cannot be determined",
    summary: "Assuming figures are drawn to scale or variables are positive whole integers when no constraint is given.",
    keywords: ["quantitative comparison", "qc", "d answer", "gre quant", "relationship cannot be determined"],
  },
  {
    title: "Normal Distribution 68-95-99.7 Empirical Rule",
    category: "formula",
    exam: "GRE",
    subject: "Quantitative Reasoning",
    domain: "Data Analysis",
    snippet: "μ ± 1σ: 68.2% • μ ± 2σ: 95.4% • μ ± 3σ: 99.7%",
    summary: "Standard normal curve percentiles: 34.1% between mean and 1 standard deviation, 13.6% between 1σ and 2σ.",
    keywords: ["normal distribution", "standard deviation", "68 95 99.7", "empirical rule", "bell curve", "z score"],
  },
  {
    title: "Combinations vs Permutations (Order Matters)",
    category: "formula",
    exam: "GRE",
    subject: "Quantitative Reasoning",
    domain: "Counting Methods & Probability",
    snippet: "nCr = n! / (r!(n-r)!) vs nPr = n! / (n-r)!",
    summary: "Use Combinations when order does not matter (committees); use Permutations when order matters (rankings, codes).",
    keywords: ["combinations", "permutations", "ncr", "npr", "combinatorics", "counting"],
  },
  {
    title: "Text Completion: Contrast Pivots & Polarity Clues",
    category: "topic",
    exam: "GRE",
    subject: "Verbal Reasoning",
    domain: "Text Completion",
    snippet: "Albeit, Despite, Paradoxically, Whereas",
    summary: "Detect grammatical pivot words that invert sentence sentiment before choosing blank vocabulary.",
    keywords: ["text completion", "contrast clues", "polarity", "pivot words", "gre verbal", "sentence completion"],
  },

  // ==========================================
  // IELTS ACADEMIC
  // ==========================================
  {
    title: "True / False / Not Given: Rigorous Decision Matrix",
    category: "topic",
    exam: "IELTS Academic",
    subject: "Reading",
    domain: "True-False-Not Given",
    snippet: "True = Equivalent • False = Contradicts • Not Given = Unstated",
    summary: "If a statement cannot be proved or disproved directly from the stimulus without external assumptions, it is NOT GIVEN.",
    keywords: ["true false not given", "tfng", "ielts reading", "not given", "reading traps"],
  },
  {
    title: "TFNG 'Not Given' vs 'False' Distractor Trap",
    category: "trap",
    exam: "IELTS Academic",
    subject: "Reading",
    domain: "True-False-Not Given",
    snippet: "68% Miss Rate • Conflating unstated with contradiction",
    summary: "Students mark False when a fact is plausible in the real world but absent from the passage text.",
    keywords: ["tfng trap", "not given trap", "false vs not given", "ielts trap"],
  },

  // ==========================================
  // TOEFL iBT
  // ==========================================
  {
    title: "Sentence Insertion [■] Flow & Anaphoric Pronouns",
    category: "topic",
    exam: "TOEFL iBT",
    subject: "Reading",
    domain: "Insert Text",
    snippet: "Look for 'this', 'these', 'such' antecedents",
    summary: "The target sentence containing demonstrative pronouns must immediately follow the antecedent noun it references.",
    keywords: ["sentence insertion", "insert text", "toefl reading", "anaphora", "cohesion"],
  },
  {
    title: "Negative Factual Information Trap ('EXCEPT' / 'NOT')",
    category: "trap",
    exam: "TOEFL iBT",
    subject: "Reading",
    domain: "Negative Factual Information",
    snippet: "59% Miss Rate • Selecting a true statement",
    summary: "Selecting an answer that is true according to the passage rather than finding the single false or unmentioned option.",
    keywords: ["negative factual", "except questions", "not mentioned", "toefl trap"],
  },
];

function createItem(raw: RawConcept): SearchCatalogItem {
  const examSlug = slugify(raw.exam);
  const subjectSlug = slugify(raw.subject);
  const domainSlug = slugify(raw.domain);
  const href = `/practice/${examSlug}/${subjectSlug}/${domainSlug}`;
  const id = `${examSlug}-${domainSlug}-${slugify(raw.title)}`.slice(0, 64);

  const kwSet = new Set(raw.keywords.map((k) => k.toLowerCase()));
  raw.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach((w) => kwSet.add(w));
  raw.domain.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach((w) => kwSet.add(w));
  raw.subject.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach((w) => kwSet.add(w));
  raw.exam.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach((w) => kwSet.add(w));

  return {
    id,
    title: raw.title,
    category: raw.category,
    exam: raw.exam,
    examSlug,
    subject: raw.subject,
    subjectSlug,
    domain: raw.domain,
    domainSlug,
    href,
    snippet: raw.snippet,
    summary: raw.summary,
    keywords: Array.from(kwSet),
  };
}

/**
 * Builds the comprehensive catalog in-memory once at module initialization (< 2ms).
 * Combines 183 syllabus domains from taxonomies.json with high-yield formulas and traps.
 */
function buildMasterCatalog(): SearchCatalogItem[] {
  const items: SearchCatalogItem[] = [];

  // 1. Synthesize all 183 curriculum domains from taxonomies.json
  const tax = taxonomyRaw as unknown as Record<string, Record<string, string[]>>;
  for (const [exam, subjects] of Object.entries(tax)) {
    if (exam.startsWith("_")) continue;
    for (const [subject, domains] of Object.entries(subjects)) {
      if (!Array.isArray(domains)) continue;
      for (const domain of domains) {
        items.push(
          createItem({
            title: domain,
            category: "topic",
            exam,
            subject,
            domain,
            summary: `Targeted practice set for ${domain} (${subject}) in ${exam}.`,
            keywords: [domain, subject, exam],
          })
        );
      }
    }
  }

  // 2. Add curated high-yield concepts, formulas, and traps
  for (const concept of HIGH_YIELD_CONCEPTS) {
    items.push(createItem(concept));
  }

  return items;
}

export const SEARCH_CATALOG: SearchCatalogItem[] = buildMasterCatalog();

export interface SearchOptions {
  activeExam?: string;
  category?: SearchCategory | "all";
  limit?: number;
}

/**
 * 0ms in-memory instant search engine matching across curriculum topics, formulas, and traps.
 * Supports tokenized matching, alias normalization, and active-exam prioritization.
 */
export function searchCatalog(
  rawQuery: string,
  options?: SearchOptions
): SearchCatalogItem[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const targetCategory = options?.category && options.category !== "all" ? options.category : null;
  const activeExam = options?.activeExam?.toLowerCase().trim();
  const limit = options?.limit ?? 8;

  const scored: Array<{ item: SearchCatalogItem; score: number }> = [];

  for (const item of SEARCH_CATALOG) {
    if (targetCategory && item.category !== targetCategory) {
      continue;
    }

    const titleLower = item.title.toLowerCase();
    const domainLower = item.domain.toLowerCase();
    const subjectLower = item.subject.toLowerCase();
    const examLower = item.exam.toLowerCase();
    const snippetLower = (item.snippet || "").toLowerCase();

    let score = 0;

    // Direct full-query match
    if (titleLower === q) score += 120;
    else if (titleLower.startsWith(q)) score += 80;
    else if (titleLower.includes(q)) score += 50;

    // Keyword match
    for (const kw of item.keywords) {
      if (kw === q) {
        score += 70;
        break;
      } else if (kw.includes(q)) {
        score += 35;
        break;
      }
    }

    // Snippet/Formula match
    if (snippetLower && snippetLower.includes(q)) {
      score += 40;
    }

    // Domain & Subject match
    if (domainLower.includes(q)) score += 30;
    if (subjectLower.includes(q)) score += 15;
    if (examLower.includes(q)) score += 10;

    // Multi-token matching
    let tokensMatched = 0;
    for (const token of tokens) {
      const matchInTitle = titleLower.includes(token);
      const matchInKw = item.keywords.some((k) => k.includes(token));
      const matchInDomain = domainLower.includes(token);
      const matchInSnippet = snippetLower.includes(token);

      if (matchInTitle || matchInKw || matchInDomain || matchInSnippet) {
        tokensMatched++;
      }
    }

    if (tokensMatched === tokens.length) {
      score += 25 * tokensMatched;
    } else if (tokensMatched > 0) {
      score += 10 * tokensMatched;
    }

    // Exam-affinity boost: rank current student track higher
    if (activeExam) {
      if (
        item.examSlug.toLowerCase() === activeExam ||
        item.exam.toLowerCase().includes(activeExam) ||
        (activeExam === "sat" && item.examSlug === "sat") ||
        (activeExam === "gmat" && item.examSlug === "gmat-focus") ||
        (activeExam === "gre" && item.examSlug === "gre") ||
        (activeExam === "cfa" && item.examSlug === "cfa-level-1") ||
        (activeExam === "ielts" && item.examSlug === "ielts-academic") ||
        (activeExam === "toefl" && item.examSlug === "toefl-ibt")
      ) {
        score += 15;
      }
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}
