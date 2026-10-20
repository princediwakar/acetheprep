// Path: lib/data/banks/jee-main/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { JEE_MAIN_PHYSICS_QUESTIONS } from "./physics";
import { JEE_MAIN_CHEMISTRY_QUESTIONS } from "./chemistry";
import { JEE_MAIN_MATH_QUESTIONS } from "./math";

export const JEE_MAIN_BANK: SeedQuestion[] = [
  ...JEE_MAIN_PHYSICS_QUESTIONS,
  ...JEE_MAIN_CHEMISTRY_QUESTIONS,
  ...JEE_MAIN_MATH_QUESTIONS,
];
