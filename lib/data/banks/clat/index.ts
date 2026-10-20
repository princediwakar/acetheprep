// Path: lib/data/banks/clat/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { CLAT_LEGAL_QUESTIONS } from "./legal";
import { CLAT_ENGLISH_QUESTIONS } from "./english";
import { CLAT_LOGICAL_QUESTIONS } from "./logical";
import { CLAT_GK_QUESTIONS } from "./gk";
import { CLAT_QUANT_QUESTIONS } from "./quant";

export const CLAT_BANK: SeedQuestion[] = [
  ...CLAT_LEGAL_QUESTIONS,
  ...CLAT_ENGLISH_QUESTIONS,
  ...CLAT_LOGICAL_QUESTIONS,
  ...CLAT_GK_QUESTIONS,
  ...CLAT_QUANT_QUESTIONS,
];
