// Path: lib/data/banks/gre/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { GRE_QUANT_QUESTIONS } from "./quant";
import { GRE_VERBAL_QUESTIONS } from "./verbal";

export const GRE_BANK: SeedQuestion[] = [
  ...GRE_QUANT_QUESTIONS,
  ...GRE_VERBAL_QUESTIONS,
];
