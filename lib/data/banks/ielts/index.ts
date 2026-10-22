import type { SeedQuestion } from "../../question-bank-seed";
import { IELTS_READING_QUESTIONS } from "./reading";
import { IELTS_COMPREHENSION_BANK } from "./comprehension";
import { IELTS_LISTENING_QUESTIONS } from "./listening";
import { IELTS_WRITING_QUESTIONS } from "./writing";

export { IELTS_READING_QUESTIONS, IELTS_COMPREHENSION_BANK, IELTS_LISTENING_QUESTIONS, IELTS_WRITING_QUESTIONS };

export const IELTS_BANK: SeedQuestion[] = [
  ...IELTS_READING_QUESTIONS,
  ...IELTS_COMPREHENSION_BANK,
  ...IELTS_LISTENING_QUESTIONS,
  ...IELTS_WRITING_QUESTIONS,
];
