// Path: config/site.ts

export const siteConfig = {
  name: "AceThePrep",
  shortName: "AceThePrep",
  domain: "acetheprep.com",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com",
  description:
    "Free AI-powered exam preparation with adaptive spaced repetition, distractor analysis, and diagnostic baseline assessments for JEE Main, NEET, UPSC CSE, GMAT, and more.",
  author: "AceThePrep Engineering",
  links: {
    supportEmail: "support@acetheprep.com",
    github: "https://github.com/princediwakar/acetheprep",
  },
};

export type SiteConfig = typeof siteConfig;
