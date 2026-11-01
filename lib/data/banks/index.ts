// Path: lib/data/banks/index.ts
import { QUESTION_BANK_SEED as BASE_SEED, type SeedQuestion } from "../question-bank-seed";
import { SAT_BANK } from "./sat/index";
import { CFA_BANK } from "./cfa/index";
import { GMAT_BANK } from "./gmat/index";
import { GRE_BANK } from "./gre/index";
import { IELTS_BANK } from "./ielts/index";
import { TOEFL_BANK } from "./toefl/index";

export {
  SAT_BANK,
  CFA_BANK,
  GMAT_BANK,
  GRE_BANK,
  IELTS_BANK,
  TOEFL_BANK,
};

/**
 * Complete master question bank compiling all 6 global tracks across all domains.
 */
export const ALL_BANKS: SeedQuestion[] = [
  ...BASE_SEED,
  ...SAT_BANK,
  ...CFA_BANK,
  ...GMAT_BANK,
  ...GRE_BANK,
  ...IELTS_BANK,
  ...TOEFL_BANK,
];

export interface BankQuestionEntry {
  slug: string;
  index: number;
  question: SeedQuestion;
}

export function generateQuestionSlug(q: SeedQuestion, index: number): string {
  const examSlug = (q.exam_name || "exam")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const domainSlug = (q.skill_domain || "general")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${examSlug}-${domainSlug}-${index + 1}`;
}

export const ALL_BANK_ENTRIES: BankQuestionEntry[] = ALL_BANKS.map((q, i) => ({
  slug: generateQuestionSlug(q, i),
  index: i,
  question: q,
}));

// Pre-indexed Map for O(1) slug lookup in memory
const SLUG_INDEX_MAP = new Map<string, BankQuestionEntry>();
for (const entry of ALL_BANK_ENTRIES) {
  SLUG_INDEX_MAP.set(entry.slug.toLowerCase(), entry);
  SLUG_INDEX_MAP.set(`seed_${entry.index + 1}`.toLowerCase(), entry);
  SLUG_INDEX_MAP.set(String(entry.index + 1), entry);
}

export function getBankQuestionBySlug(idOrSlug: string): BankQuestionEntry | undefined {
  return SLUG_INDEX_MAP.get(idOrSlug.toLowerCase());
}

export function getBankQuestionsForDomain(
  examName: string,
  domainName: string,
  limit: number = 8
): BankQuestionEntry[] {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normExam = norm(examName);
  const normDomain = norm(domainName);

  const results: BankQuestionEntry[] = [];
  for (const entry of ALL_BANK_ENTRIES) {
    const qExam = norm(entry.question.exam_name);
    const qDomain = norm(entry.question.skill_domain);

    const examMatch = qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam);
    const domainMatch = qDomain === normDomain || qDomain.includes(normDomain) || normDomain.includes(qDomain);

    if (examMatch && domainMatch) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }

  // Graceful fallback to any matching exam if domain has fewer than requested
  if (results.length < limit) {
    for (const entry of ALL_BANK_ENTRIES) {
      if (results.some((r) => r.slug === entry.slug)) continue;
      const qExam = norm(entry.question.exam_name);
      if (qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam)) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }
  }

  return results;
}
