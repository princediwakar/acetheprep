// Path: lib/data/banks/gate/index.ts
import type { SeedQuestion } from "../../question-bank-seed";
import { GATE_MATH_QUESTIONS } from "./math";
import { GATE_APTITUDE_QUESTIONS } from "./aptitude";
import { GATE_CORE_QUESTIONS } from "./core";

export const GATE_BANK: SeedQuestion[] = [
  ...GATE_MATH_QUESTIONS,
  ...GATE_APTITUDE_QUESTIONS,
  ...GATE_CORE_QUESTIONS,
];
