// Path: config/site.ts

const rawUrl = process.env.NEXT_PUBLIC_BASE_URL;
const safeUrl =
  rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    ? rawUrl
    : "https://www.acetheprep.com";

export const siteConfig = {
  name: "AceThePrep",
  shortName: "AceThePrep",
  domain: "acetheprep.com",
  url: safeUrl,
  description:
    "Free adaptive exam preparation with active recall drills, step-by-step mistake breakdowns, and spaced reviews for Digital SAT, GRE General, GMAT Focus, CFA Level 1, IELTS Academic, and TOEFL iBT.",
  author: "AceThePrep Engineering",
  links: {
    supportEmail: "support@acetheprep.com",
    github: "https://github.com/princediwakar/acetheprep",
  },
};

export type SiteConfig = typeof siteConfig;
