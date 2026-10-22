// Path: lib/data/banks/index.ts
import { QUESTION_BANK_SEED as BASE_SEED, type SeedQuestion } from "../question-bank-seed";
import { SAT_BANK } from "./sat/index";
import { CFA_BANK } from "./cfa/index";
import { GMAT_BANK } from "./gmat/index";
import { GRE_BANK } from "./gre/index";
import { IELTS_BANK } from "./ielts/index";
import { TOEFL_BANK } from "./toefl/index";

export {
  SAT_BANK,
  CFA_BANK,
  GMAT_BANK,
  GRE_BANK,
  IELTS_BANK,
  TOEFL_BANK,
};

/**
 * Complete master question bank compiling all 6 global tracks across all domains.
 */
export const ALL_BANKS: SeedQuestion[] = [
  ...BASE_SEED,
  ...SAT_BANK,
  ...CFA_BANK,
  ...GMAT_BANK,
  ...GRE_BANK,
  ...IELTS_BANK,
  ...TOEFL_BANK,
];
