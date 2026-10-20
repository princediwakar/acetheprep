// Path: lib/data/banks/gmat/index.ts
import { GMAT_QUANT_BANK } from "./quant";
import { GMAT_VERBAL_BANK } from "./verbal";
import { GMAT_DATA_INSIGHTS_BANK } from "./data-insights";
import type { SeedQuestion } from "../../question-bank-seed";

export { GMAT_QUANT_BANK, GMAT_VERBAL_BANK, GMAT_DATA_INSIGHTS_BANK };

/**
 * Complete GMAT Focus question bank with 10 questions for every single topic:
 * - Quantitative Reasoning: Arithmetic (10), Algebra (10)
 * - Verbal Reasoning: Critical Reasoning (10), Reading Comprehension (10)
 * - Data Insights: Data Sufficiency (10), Two-Part Analysis (10), Table Analysis (10), Graphics Interpretation (10), Multi-Source Reasoning (10)
 * Total: 90 authentic, institutional-grade questions.
 */
export const GMAT_BANK: SeedQuestion[] = [
  ...GMAT_QUANT_BANK,
  ...GMAT_VERBAL_BANK,
  ...GMAT_DATA_INSIGHTS_BANK,
];
