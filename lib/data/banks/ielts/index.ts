import type { SeedQuestion } from "../../question-bank-seed";
import { IELTS_READING_QUESTIONS } from "./reading";
import { IELTS_LISTENING_QUESTIONS } from "./listening";
import { IELTS_WRITING_QUESTIONS } from "./writing";

export const IELTS_BANK: SeedQuestion[] = [
  ...IELTS_READING_QUESTIONS,
  ...IELTS_LISTENING_QUESTIONS,
  ...IELTS_WRITING_QUESTIONS,
];
