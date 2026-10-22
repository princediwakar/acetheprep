import type { SeedQuestion } from "../../question-bank-seed";
import { TOEFL_READING_QUESTIONS } from "./reading";
import { TOEFL_COMPREHENSION_BANK } from "./comprehension";
import { TOEFL_LISTENING_QUESTIONS } from "./listening";
import { TOEFL_WRITING_QUESTIONS } from "./writing";

export { TOEFL_READING_QUESTIONS, TOEFL_COMPREHENSION_BANK, TOEFL_LISTENING_QUESTIONS, TOEFL_WRITING_QUESTIONS };

export const TOEFL_BANK: SeedQuestion[] = [
  ...TOEFL_READING_QUESTIONS,
  ...TOEFL_COMPREHENSION_BANK,
  ...TOEFL_LISTENING_QUESTIONS,
  ...TOEFL_WRITING_QUESTIONS,
];
