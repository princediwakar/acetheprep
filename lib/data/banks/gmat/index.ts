import { GMAT_QUANT_BANK } from "./quant";
import { GMAT_VERBAL_BANK } from "./verbal";
import { GMAT_COMPREHENSION_BANK } from "./comprehension";
import { GMAT_DATA_INSIGHTS_BANK } from "./data-insights";
import { GMAT_MICRO_SKILLS_BANK } from "./micro-skills";
import type { SeedQuestion } from "../../question-bank-seed";

export { GMAT_QUANT_BANK, GMAT_VERBAL_BANK, GMAT_COMPREHENSION_BANK, GMAT_DATA_INSIGHTS_BANK, GMAT_MICRO_SKILLS_BANK };

/**
 * Complete GMAT Focus question bank with questions across macro and micro skills:
 * - Quantitative Reasoning: Arithmetic, Algebra, Number Properties, Inequalities & Absolute Values, Word Problems, Probability
 * - Verbal Reasoning: Critical Reasoning, Reading Comprehension, CR Assumption/Flaw, CR Strengthen/Weaken
 * - Data Insights: Data Sufficiency, Two-Part Analysis, Table Analysis, Graphics Interpretation, Multi-Source Reasoning
 */
export const GMAT_BANK: SeedQuestion[] = [
  ...GMAT_QUANT_BANK,
  ...GMAT_VERBAL_BANK,
  ...GMAT_COMPREHENSION_BANK,
  ...GMAT_DATA_INSIGHTS_BANK,
  ...GMAT_MICRO_SKILLS_BANK,
];
