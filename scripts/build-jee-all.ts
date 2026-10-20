// Path: scripts/build-jee-all.ts
import * as fs from "fs";
import * as path from "path";
import type { SeedQuestion } from "../lib/data/question-bank-seed";
import taxonomy from "../lib/taxonomies.json";

function makeQ(
  exam: string,
  subject: string,
  domain: string,
  tier: 1 | 2 | 3,
  text: string,
  opts: [string, string, string, string],
  ans: "A" | "B" | "C" | "D",
  exp: string,
  trap: string,
  time: number = 60
): SeedQuestion {
  const letters = ["A", "B", "C", "D"] as const;
  const dist: Record<string, string> = {};
  for (let i = 0; i < 4; i++) {
    const l = letters[i];
    if (l === ans) {
      dist[l] = `Correct. ${exp.slice(0, 80)}`;
    } else {
      dist[l] = `Incorrect. Common distractor based on: ${trap.slice(0, 60)}`;
    }
  }

  return {
    exam_name: exam,
    subject,
    skill_domain: domain,
    difficulty_tier: tier,
    question_text: text,
    options: { A: opts[0], B: opts[1], C: opts[2], D: opts[3] },
    correct_option: ans,
    explanation: exp,
    distractor_analysis: dist as any,
    misconception: trap,
    time_estimate_seconds: time,
  };
}

// Generate questions for all 22 domains of JEE Main
const physicsDomains = (taxonomy as any)["JEE Main"].Physics as string[];
const chemDomains = (taxonomy as any)["JEE Main"].Chemistry as string[];
const mathDomains = (taxonomy as any)["JEE Main"].Mathematics as string[];

console.log("Building JEE Main question banks...");
console.log("Physics domains:", physicsDomains.length);
console.log("Chemistry domains:", chemDomains.length);
console.log("Math domains:", mathDomains.length);
