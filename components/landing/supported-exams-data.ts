// Path: components/landing/supported-exams-data.ts

export type ExamCategoryFilter = "all" | "study-abroad" | "global-grad-pro" | "national-competitive";

export interface ExamMeta {
  id: string; // Exact key matching lib/taxonomies.json and lib/demo-questions.json
  shortName: string;
  fullName: string;
  authority: string;
  category: "study-abroad" | "global-grad-pro" | "national-competitive";
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

  // National Competitive
  {
    id: "JEE Main",
    shortName: "JEE Main",
    fullName: "Joint Entrance Examination",
    authority: "NTA",
    category: "national-competitive",
    tagline: "Calculus & Optics Traps",
    badge: "Engineering",
  },
  {
    id: "NEET",
    shortName: "NEET",
    fullName: "National Eligibility Entrance Test",
    authority: "NTA",
    category: "national-competitive",
    tagline: "Genetics & NCERT Nuances",
    badge: "Medical",
  },
  {
    id: "CAT",
    shortName: "CAT",
    fullName: "Common Admission Test",
    authority: "IIMs",
    category: "national-competitive",
    tagline: "Speed-Distance & DILR",
    badge: "Management",
  },
  {
    id: "GATE",
    shortName: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    authority: "IISc & IITs",
    category: "national-competitive",
    tagline: "Eigenvectors & Systems",
    badge: "Technical",
  },
  {
    id: "UPSC CSE",
    shortName: "UPSC CSE",
    fullName: "Civil Services Examination",
    authority: "UPSC",
    category: "national-competitive",
    tagline: "CSAT Syllogisms & Logic",
    badge: "Civil Services",
  },
  {
    id: "CLAT",
    shortName: "CLAT",
    fullName: "Common Law Admission Test",
    authority: "Consortium of NLUs",
    category: "national-competitive",
    tagline: "Strict Liability & Torts",
    badge: "Law",
  },
  {
    id: "CA Foundation",
    shortName: "CA Foundation",
    fullName: "Chartered Accountancy Foundation",
    authority: "ICAI",
    category: "national-competitive",
    tagline: "Contract Act & Annuities",
    badge: "Accounting",
  },
];
