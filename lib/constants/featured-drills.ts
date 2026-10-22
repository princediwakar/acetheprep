// Path: lib/constants/featured-drills.ts

export interface FeaturedDrill {
  name: string;
  href: string;
  tag: string;
}

export const FEATURED_DRILLS: Record<string, FeaturedDrill[]> = {
  "gmat-focus": [
    { name: "Data Sufficiency", href: "/practice/gmat-focus/data-insights/data-sufficiency", tag: "10 Questions • Parity & Zero Traps" },
    { name: "Multi-Source Reasoning", href: "/practice/gmat-focus/data-insights/multi-source-reasoning", tag: "11 Questions • Multi-Tab Synthesis" },
    { name: "Number Properties", href: "/practice/gmat-focus/quantitative-reasoning/number-properties", tag: "10 Questions • Divisors & Remainders" },
    { name: "Critical Reasoning", href: "/practice/gmat-focus/verbal-reasoning/critical-reasoning", tag: "10 Questions • Assumptions & Flaws" },
  ],
  "sat": [
    { name: "Advanced Math", href: "/practice/sat/mathematics/advanced-math", tag: "10 Questions • Extraneous Solutions" },
    { name: "Algebra", href: "/practice/sat/mathematics/algebra", tag: "10 Questions • Linear Systems" },
    { name: "Rhetorical Synthesis", href: "/practice/sat/reading-and-writing/rhetorical-synthesis", tag: "10 Questions • Prompt Alignment" },
    { name: "Craft & Structure", href: "/practice/sat/reading-and-writing/craft-and-structure", tag: "10 Questions • Words in Context" },
  ],
  "gre": [
    { name: "Quantitative Comparison", href: "/practice/gre/quantitative-reasoning/quantitative-comparison", tag: "10 Questions • Real Number Traps" },
    { name: "Arithmetic & Exponents", href: "/practice/gre/quantitative-reasoning/arithmetic", tag: "10 Questions • Modular Math" },
    { name: "Text Completion", href: "/practice/gre/verbal-reasoning/text-completion", tag: "10 Questions • Contrast Signals" },
    { name: "Sentence Equivalence", href: "/practice/gre/verbal-reasoning/sentence-equivalence", tag: "10 Questions • Synonym Traps" },
  ],
  "cfa-level-1": [
    { name: "Time Value of Money", href: "/practice/cfa-level-1/quantitative-methods/time-value-of-money", tag: "10 Questions • Compounding & EAR" },
    { name: "Financial Reporting Standards", href: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards", tag: "10 Questions • IFRS vs GAAP" },
    { name: "Cost of Capital & WACC", href: "/practice/cfa-level-1/corporate-issuers/cost-of-capital", tag: "10 Questions • Interest Tax Shields" },
  ],
  "ielts-academic": [
    { name: "True / False / Not Given", href: "/practice/ielts-academic/reading/inferences", tag: "10 Questions • Passage Logic" },
    { name: "Central Ideas & Details", href: "/practice/ielts-academic/reading/central-ideas-and-details", tag: "10 Questions • Paraphrase Matching" },
    { name: "Craft & Structure", href: "/practice/ielts-academic/reading/craft-and-structure", tag: "10 Questions • Qualifying Words" },
  ],
  "toefl-ibt": [
    { name: "Sentence Insertion Flow", href: "/practice/toefl-ibt/reading/transitions-and-logical-flow", tag: "10 Questions • Transition Clues" },
    { name: "Rhetorical Purpose", href: "/practice/toefl-ibt/reading/text-structure-and-purpose", tag: "10 Questions • Author Stance" },
    { name: "Negative Factual ('EXCEPT')", href: "/practice/toefl-ibt/reading/information-and-ideas", tag: "10 Questions • Inversion Traps" },
  ],
};
