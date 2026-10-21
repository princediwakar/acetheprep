// Path: lib/constants/exam-groups.ts

export interface ExamCategory {
  id: string;
  name: string;
  description: string;
  exams: string[];
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: "study-abroad",
    name: "Admissions & Language Credentials",
    description: "Undergraduate entrance & language proficiency credentials (SAT, IELTS, TOEFL)",
    exams: ["SAT", "IELTS Academic", "TOEFL iBT"],
  },
  {
    id: "global-grad-pro",
    name: "Graduate, MBA & Professional",
    description: "High-stakes Master's, MBA, and Finance credentials (GRE, GMAT Focus, CFA)",
    exams: ["GRE", "GMAT Focus", "CFA Level 1"],
  },
];

export function getCategoryForExam(examName: string): ExamCategory | undefined {
  return EXAM_CATEGORIES.find((cat) => cat.exams.includes(examName));
}
