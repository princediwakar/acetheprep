// Path: lib/data/banks/cat/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { CAT_QUANT_QUESTIONS } from "./quant";
import { CAT_VERBAL_QUESTIONS } from "./verbal";
import { CAT_DILR_QUESTIONS } from "./dilr";

export const CAT_BANK: SeedQuestion[] = [
  ...CAT_QUANT_QUESTIONS,
  ...CAT_VERBAL_QUESTIONS,
  ...CAT_DILR_QUESTIONS,
];
