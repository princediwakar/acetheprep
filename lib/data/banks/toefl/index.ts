// Path: lib/data/banks/toefl/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { TOEFL_READING_QUESTIONS } from "./reading";
import { TOEFL_LISTENING_QUESTIONS } from "./listening";

export const TOEFL_BANK: SeedQuestion[] = [
  ...TOEFL_READING_QUESTIONS,
  ...TOEFL_LISTENING_QUESTIONS,
];
