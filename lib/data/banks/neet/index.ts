// Path: lib/data/banks/neet/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { NEET_PHYSICS_QUESTIONS } from "./physics";
import { NEET_CHEMISTRY_QUESTIONS } from "./chemistry";
import { NEET_BIOLOGY_QUESTIONS } from "./biology";

export const NEET_BANK: SeedQuestion[] = [
  ...NEET_PHYSICS_QUESTIONS,
  ...NEET_CHEMISTRY_QUESTIONS,
  ...NEET_BIOLOGY_QUESTIONS,
];
