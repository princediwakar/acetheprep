// Path: lib/data/banks/ca-foundation/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { CA_ACCOUNTING_QUESTIONS } from "./accounting";
import { CA_LAW_QUESTIONS } from "./law";
import { CA_MATH_QUESTIONS } from "./math";
import { CA_ECONOMICS_QUESTIONS } from "./economics";

export const CA_FOUNDATION_BANK: SeedQuestion[] = [
  ...CA_ACCOUNTING_QUESTIONS,
  ...CA_LAW_QUESTIONS,
  ...CA_MATH_QUESTIONS,
  ...CA_ECONOMICS_QUESTIONS,
];
