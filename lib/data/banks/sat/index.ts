// Path: lib/data/banks/sat/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { SAT_MATH_BANK } from "./math";
import { SAT_READING_WRITING_QUESTIONS } from "./reading-writing";

export const SAT_BANK: SeedQuestion[] = [
  ...SAT_MATH_BANK,
  ...SAT_READING_WRITING_QUESTIONS,
];
