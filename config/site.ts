// Path: config/site.ts

const rawUrl = process.env.NEXT_PUBLIC_BASE_URL;
const safeUrl =
  rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    ? rawUrl
    : "https://acetheprep.com";

export const siteConfig = {
  name: "AceThePrep",
  shortName: "AceThePrep",
  domain: "acetheprep.com",
  url: safeUrl,
  description:
    "Free AI-powered exam preparation with adaptive spaced repetition, distractor analysis, and diagnostic baseline assessments for JEE Main, NEET, UPSC CSE, GMAT, and more.",
  author: "AceThePrep Engineering",
  links: {
    supportEmail: "support@acetheprep.com",
    github: "https://github.com/princediwakar/acetheprep",
  },
};

export type SiteConfig = typeof siteConfig;
