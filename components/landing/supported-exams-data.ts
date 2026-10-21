// Path: components/landing/supported-exams-data.ts

export type ExamCategoryFilter = "all" | "study-abroad" | "global-grad-pro";

export interface ExamMeta {
  id: string; // Exact key matching lib/taxonomies.json and lib/demo-questions.json
  shortName: string;
  fullName: string;
  authority: string;
  category: "study-abroad" | "global-grad-pro";
  tagline: string;
  badge: string;
}

export const ALL_SUPPORTED_EXAMS: ExamMeta[] = [
  // Global Standardized Admissions & Graduate
  {
    id: "SAT",
    shortName: "Digital SAT",
    fullName: "Digital Scholastic Assessment Test",
    authority: "College Board",
    category: "study-abroad",
    tagline: "Desmos Math & Reading Traps",
    badge: "Admissions",
  },
  {
    id: "GRE",
    shortName: "GRE General",
    fullName: "Graduate Record Examination",
    authority: "ETS",
    category: "global-grad-pro",
    tagline: "Quant Comparisons & Logic",
    badge: "Grad School",
  },
  {
    id: "GMAT Focus",
    shortName: "GMAT Focus",
    fullName: "GMAT Focus Edition",
    authority: "GMAC",
    category: "global-grad-pro",
    tagline: "Data Sufficiency Traps",
    badge: "Global MBA",
  },
  {
    id: "CFA Level 1",
    shortName: "CFA Level 1",
    fullName: "Chartered Financial Analyst Level 1",
    authority: "CFA Institute",
    category: "global-grad-pro",
    tagline: "DuPont & Financial Analysis",
    badge: "Finance",
  },
  {
    id: "IELTS Academic",
    shortName: "IELTS Academic",
    fullName: "International English Language Testing System",
    authority: "British Council • IDP",
    category: "study-abroad",
    tagline: "True/False/Not Given Traps",
    badge: "Language",
  },
  {
    id: "TOEFL iBT",
    shortName: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language",
    authority: "ETS",
    category: "study-abroad",
    tagline: "Sentence Insertion & Rhetoric",
    badge: "Language",
  },
];
