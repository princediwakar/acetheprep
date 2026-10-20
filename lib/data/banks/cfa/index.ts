// Path: lib/data/banks/cfa/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { CFA_ETHICS_QUESTIONS } from "./ethics";
import { CFA_QUANT_QUESTIONS } from "./quant";
import { CFA_ECONOMICS_QUESTIONS } from "./economics";
import { CFA_FSA_QUESTIONS } from "./fsa";
import { CFA_CORPORATE_QUESTIONS } from "./corporate";
import { CFA_EQUITY_QUESTIONS } from "./equity";
import { CFA_FIXED_INCOME_QUESTIONS } from "./fixed-income";
import { CFA_DERIVATIVES_QUESTIONS } from "./derivatives";
import { CFA_ALT_INVESTMENTS_QUESTIONS } from "./alt-investments";
import { CFA_PORTFOLIO_QUESTIONS } from "./portfolio";

export const CFA_BANK: SeedQuestion[] = [
  ...CFA_ETHICS_QUESTIONS,
  ...CFA_QUANT_QUESTIONS,
  ...CFA_ECONOMICS_QUESTIONS,
  ...CFA_FSA_QUESTIONS,
  ...CFA_CORPORATE_QUESTIONS,
  ...CFA_EQUITY_QUESTIONS,
  ...CFA_FIXED_INCOME_QUESTIONS,
  ...CFA_DERIVATIVES_QUESTIONS,
  ...CFA_ALT_INVESTMENTS_QUESTIONS,
  ...CFA_PORTFOLIO_QUESTIONS,
];
