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
    name: "US & European University Admissions",
    description: "Undergraduate entrance & language proficiency credentials (SAT, IELTS, TOEFL)",
    exams: ["SAT", "IELTS Academic", "TOEFL iBT"],
  },
  {
    id: "global-grad-pro",
    name: "Graduate, Business & Finance",
    description: "High-stakes Master's, MBA, and Finance credentials (GRE, GMAT Focus, CFA)",
    exams: ["GRE", "GMAT Focus", "CFA Level 1"],
  },
  {
    id: "national-competitive",
    name: "National Competitive Tracks",
    description: "Engineering, Medical, Civil Services, Management & Law",
    exams: ["JEE Main", "NEET", "UPSC CSE", "CAT", "GATE", "CLAT", "CA Foundation"],
  },
];

export function getCategoryForExam(examName: string): ExamCategory | undefined {
  return EXAM_CATEGORIES.find((cat) => cat.exams.includes(examName));
}
