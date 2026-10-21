// Path: scripts/reseed-cfa-bank.ts
import * as fs from "fs";
import * as path from "path";
import type { SeedQuestion } from "../lib/data/question-bank-seed";

import { CFA_ETHICS_QUESTIONS } from "../lib/data/banks/cfa/ethics";
import { CFA_QUANT_QUESTIONS } from "../lib/data/banks/cfa/quant";
import { CFA_ECONOMICS_QUESTIONS } from "../lib/data/banks/cfa/economics";
import { CFA_FSA_QUESTIONS } from "../lib/data/banks/cfa/fsa";
import { CFA_CORPORATE_QUESTIONS } from "../lib/data/banks/cfa/corporate";
import { CFA_EQUITY_QUESTIONS } from "../lib/data/banks/cfa/equity";
import { CFA_FIXED_INCOME_QUESTIONS } from "../lib/data/banks/cfa/fixed-income";
import { CFA_DERIVATIVES_QUESTIONS } from "../lib/data/banks/cfa/derivatives";
import { CFA_ALT_INVESTMENTS_QUESTIONS } from "../lib/data/banks/cfa/alt-investments";
import { CFA_PORTFOLIO_QUESTIONS } from "../lib/data/banks/cfa/portfolio";

const filesToProcess = [
  { file: "ethics.ts", exportName: "CFA_ETHICS_QUESTIONS", list: CFA_ETHICS_QUESTIONS },
  { file: "quant.ts", exportName: "CFA_QUANT_QUESTIONS", list: CFA_QUANT_QUESTIONS },
  { file: "economics.ts", exportName: "CFA_ECONOMICS_QUESTIONS", list: CFA_ECONOMICS_QUESTIONS },
  { file: "fsa.ts", exportName: "CFA_FSA_QUESTIONS", list: CFA_FSA_QUESTIONS },
  { file: "corporate.ts", exportName: "CFA_CORPORATE_QUESTIONS", list: CFA_CORPORATE_QUESTIONS },
  { file: "equity.ts", exportName: "CFA_EQUITY_QUESTIONS", list: CFA_EQUITY_QUESTIONS },
  { file: "fixed-income.ts", exportName: "CFA_FIXED_INCOME_QUESTIONS", list: CFA_FIXED_INCOME_QUESTIONS },
  { file: "derivatives.ts", exportName: "CFA_DERIVATIVES_QUESTIONS", list: CFA_DERIVATIVES_QUESTIONS },
  { file: "alt-investments.ts", exportName: "CFA_ALT_INVESTMENTS_QUESTIONS", list: CFA_ALT_INVESTMENTS_QUESTIONS },
  { file: "portfolio.ts", exportName: "CFA_PORTFOLIO_QUESTIONS", list: CFA_PORTFOLIO_QUESTIONS },
];

const keys = ["A", "B", "C"] as const;

let globalIndex = 0;
const overallStats = { A: 0, B: 0, C: 0, total: 0 };

for (const item of filesToProcess) {
  const transformedQuestions: SeedQuestion[] = item.list.map((q, localIdx) => {
    // Current correct text is at A
    const origCorrect = q.options.A;
    const origB = q.options.B;
    const origC = q.options.C;

    // Use globalIndex so across the entire bank, answers cycle perfectly A -> B -> C
    const targetKey = keys[globalIndex % 3];
    globalIndex++;

    let newOpts: Record<"A" | "B" | "C", string>;
    if (targetKey === "A") {
      newOpts = localIdx % 2 === 0
        ? { A: origCorrect, B: origB, C: origC }
        : { A: origCorrect, B: origC, C: origB };
    } else if (targetKey === "B") {
      newOpts = localIdx % 2 === 0
        ? { A: origB, B: origCorrect, C: origC }
        : { A: origC, B: origCorrect, C: origB };
    } else {
      newOpts = localIdx % 2 === 0
        ? { A: origB, B: origC, C: origCorrect }
        : { A: origC, B: origB, C: origCorrect };
    }

    const dist: Record<string, string> = {};
    for (const k of keys) {
      if (k === targetKey) {
        dist[k] = `Correct. ${q.explanation.trim()}`;
      } else {
        const trapText = q.misconception ? q.misconception.trim() : `Flawed reasoning in ${q.skill_domain}.`;
        dist[k] = `Incorrect. Common distractor: ${trapText}`;
      }
    }

    overallStats[targetKey]++;
    overallStats.total++;

    return {
      exam_name: "CFA Level 1",
      subject: q.subject,
      skill_domain: q.skill_domain,
      difficulty_tier: q.difficulty_tier || 2,
      question_text: q.question_text,
      options: newOpts,
      correct_option: targetKey,
      explanation: q.explanation.trim(),
      distractor_analysis: dist as any,
      misconception: q.misconception,
      time_estimate_seconds: q.time_estimate_seconds || 60,
    };
  });

  const filePath = path.resolve(process.cwd(), "lib/data/banks/cfa", item.file);
  const fileContent = `// Path: lib/data/banks/cfa/${item.file}\nimport type { SeedQuestion } from "../../question-bank-seed";\n\nexport const ${item.exportName}: SeedQuestion[] = ${JSON.stringify(transformedQuestions, null, 2)};\n`;

  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Updated ${item.file} with ${transformedQuestions.length} questions.`);
}

console.log("Overall CFA Reseed Results:", overallStats);
