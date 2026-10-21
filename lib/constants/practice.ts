// Path: lib/constants/practice.ts

export const EXAM_DATES: Record<string, string> = {
  "SAT": "2026-12-31",
  "GRE": "2026-12-31",
  "GMAT Focus": "2026-12-31",
  "CFA Level 1": "2026-11-15",
  "IELTS Academic": "2026-12-31",
  "TOEFL iBT": "2026-12-31",
};

export function getDaysUntilExam(examName: string): number | null {
  const dateStr = EXAM_DATES[examName];
  if (!dateStr) return null;
  const examDate = new Date(dateStr);
  const now = new Date();
  const diff = examDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getExamDateDisplay(examName: string): string | null {
  const dateStr = EXAM_DATES[examName];
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
