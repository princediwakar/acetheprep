// Path: lib/constants/exam-groups.ts

export interface ExamCategory {
  id: string;
  name: string;
  description: string;
  exams: string[];
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: "global-grad-pro",
    name: "Global Graduate & Professional",
    description: "High-stakes MBA, Finance, and Master's admissions",
    exams: ["GMAT Focus", "CFA Level 1", "GRE"],
  },
  {
    id: "study-abroad",
    name: "Study Abroad & College Admissions",
    description: "Undergraduate entrance & language proficiency credentials",
    exams: ["SAT", "IELTS Academic", "TOEFL iBT"],
  },
  {
    id: "national-competitive",
    name: "National Competitive & Professional",
    description: "Engineering, Medical, Civil Services, Management & Law",
    exams: ["JEE Main", "NEET", "UPSC CSE", "CAT", "GATE", "CLAT", "CA Foundation"],
  },
];

export function getCategoryForExam(examName: string): ExamCategory | undefined {
  return EXAM_CATEGORIES.find((cat) => cat.exams.includes(examName));
}
