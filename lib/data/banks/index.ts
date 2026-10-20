// Path: lib/data/banks/index.ts
import { QUESTION_BANK_SEED as BASE_SEED, type SeedQuestion } from "../question-bank-seed";
import { JEE_MAIN_BANK } from "./jee-main";
import { NEET_BANK } from "./neet";
import { SAT_BANK } from "./sat";
import { CFA_BANK } from "./cfa";
import { GMAT_BANK } from "./gmat";
import { CAT_BANK } from "./cat";
import { GRE_BANK } from "./gre";
import { IELTS_BANK } from "./ielts";
import { TOEFL_BANK } from "./toefl";
import { GATE_BANK } from "./gate";
import { UPSC_BANK } from "./upsc";
import { CLAT_BANK } from "./clat";
import { CA_FOUNDATION_BANK } from "./ca-foundation";

export {
  JEE_MAIN_BANK,
  NEET_BANK,
  SAT_BANK,
  CFA_BANK,
  GMAT_BANK,
  CAT_BANK,
  GRE_BANK,
  IELTS_BANK,
  TOEFL_BANK,
  GATE_BANK,
  UPSC_BANK,
  CLAT_BANK,
  CA_FOUNDATION_BANK,
};

/**
 * Complete master question bank compiling all 13 priority tracks across all domains.
 */
export const ALL_BANKS: SeedQuestion[] = [
  ...BASE_SEED,
  ...JEE_MAIN_BANK,
  ...NEET_BANK,
  ...SAT_BANK,
  ...CFA_BANK,
  ...GMAT_BANK,
  ...CAT_BANK,
  ...GRE_BANK,
  ...IELTS_BANK,
  ...TOEFL_BANK,
  ...GATE_BANK,
  ...UPSC_BANK,
  ...CLAT_BANK,
  ...CA_FOUNDATION_BANK,
];
