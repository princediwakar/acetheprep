// Path: lib/constants/practice.ts

export const EXAM_DATES: Record<string, string> = {
  "SAT": "2026-12-31",
  "GRE": "2026-12-31",
  "GMAT Focus": "2026-12-31",
  "CFA Level 1": "2026-11-15",
  "IELTS Academic": "2026-12-31",
  "TOEFL iBT": "2026-12-31",
  "JEE Main": "2026-04-15",
  "NEET": "2026-05-07",
  "CAT": "2026-11-29",
  "GATE": "2026-02-15",
  "UPSC CSE": "2026-05-28",
  "CLAT": "2026-12-15",
  "CA Foundation": "2026-06-15",
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
