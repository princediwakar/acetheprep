// Path: lib/data/banks/upsc/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { UPSC_GS1_QUESTIONS } from "./gs1";
import { UPSC_GS2_QUESTIONS } from "./gs2";
import { UPSC_GS3_QUESTIONS } from "./gs3";
import { UPSC_CSAT_QUESTIONS } from "./csat";

export const UPSC_BANK: SeedQuestion[] = [
  ...UPSC_GS1_QUESTIONS,
  ...UPSC_GS2_QUESTIONS,
  ...UPSC_GS3_QUESTIONS,
  ...UPSC_CSAT_QUESTIONS,
];
