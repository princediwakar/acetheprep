// Path: lib/constants/exams.ts

export type ExamKey = "gmat" | "sat" | "gre" | "cfa" | "ielts" | "toefl";

export interface ExamDefinition {
  key: ExamKey;
  name: string;
  title: string;
  shortName: string;
  slug: string;
  org: string;
  practiceHref: string;
  insightsHref: string;
}

export const SUPPORTED_EXAMS: readonly ExamDefinition[] = [
  {
    key: "gmat",
    name: "GMAT Focus",
    title: "GMAT Focus",
    shortName: "GMAT Focus",
    slug: "gmat-focus",
    org: "GMAC Focus Edition",
    practiceHref: "/practice/gmat-focus",
    insightsHref: "/insights/gmat-focus/hardest-topics",
  },
  {
    key: "sat",
    name: "SAT",
    title: "Digital SAT",
    shortName: "Digital SAT",
    slug: "sat",
    org: "College Board 2026",
    practiceHref: "/practice/sat",
    insightsHref: "/insights/sat/hardest-topics",
  },
  {
    key: "gre",
    name: "GRE",
    title: "GRE General",
    shortName: "GRE General",
    slug: "gre",
    org: "ETS GRE",
    practiceHref: "/practice/gre",
    insightsHref: "/insights/gre/hardest-topics",
  },
  {
    key: "cfa",
    name: "CFA Level 1",
    title: "CFA Level 1",
    shortName: "CFA Level 1",
    slug: "cfa-level-1",
    org: "CFA Institute",
    practiceHref: "/practice/cfa-level-1",
    insightsHref: "/insights/cfa-level-1/hardest-topics",
  },
  {
    key: "ielts",
    name: "IELTS Academic",
    title: "IELTS Academic",
    shortName: "IELTS Academic",
    slug: "ielts-academic",
    org: "British Council & IDP",
    practiceHref: "/practice/ielts-academic",
    insightsHref: "/insights/ielts-academic/hardest-topics",
  },
  {
    key: "toefl",
    name: "TOEFL iBT",
    title: "TOEFL iBT",
    shortName: "TOEFL iBT",
    slug: "toefl-ibt",
    org: "ETS TOEFL",
    practiceHref: "/practice/toefl-ibt",
    insightsHref: "/insights/toefl-ibt/hardest-topics",
  },
] as const;

export const EXAM_KEYS: readonly ExamKey[] = [
  "gmat",
  "sat",
  "gre",
  "cfa",
  "ielts",
  "toefl",
] as const;

const SLUG_TO_KEY_MAP = new Map<string, ExamKey>([
  ["gmat-focus", "gmat"],
  ["gmat", "gmat"],
  ["sat", "sat"],
  ["digital-sat", "sat"],
  ["gre", "gre"],
  ["gre-general", "gre"],
  ["cfa-level-1", "cfa"],
  ["cfa", "cfa"],
  ["ielts-academic", "ielts"],
  ["ielts", "ielts"],
  ["toefl-ibt", "toefl"],
  ["toefl", "toefl"],
]);

const NAME_TO_KEY_MAP = new Map<string, ExamKey>([
  ["gmat focus", "gmat"],
  ["sat", "sat"],
  ["gre", "gre"],
  ["cfa level 1", "cfa"],
  ["ielts academic", "ielts"],
  ["toefl ibt", "toefl"],
]);

export function slugToExamKey(slug: string): ExamKey | null {
  const norm = slug.toLowerCase().trim();
  return SLUG_TO_KEY_MAP.get(norm) || null;
}

export function examNameToKey(name: string): ExamKey {
  const norm = name.toLowerCase().trim();
  const direct = NAME_TO_KEY_MAP.get(norm);
  if (direct) return direct;
  if (norm.includes("gmat")) return "gmat";
  if (norm.includes("sat")) return "sat";
  if (norm.includes("gre")) return "gre";
  if (norm.includes("cfa")) return "cfa";
  if (norm.includes("ielts")) return "ielts";
  if (norm.includes("toefl")) return "toefl";
  return "gmat";
}

export function examKeyToDefinition(key: ExamKey): ExamDefinition {
  const def = SUPPORTED_EXAMS.find((e) => e.key === key);
  return def || SUPPORTED_EXAMS[0];
}
