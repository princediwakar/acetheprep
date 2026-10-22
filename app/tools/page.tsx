// Path: app/tools/page.tsx

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { ToolsClientView, type ToolItem } from "@/components/tools/ToolsClientView";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Free Student Preparation & Score Calculators",
  description:
    "Free interactive exam calculators and concordance tools for GMAT Focus, GRE, SAT, IELTS, TOEFL, and CFA Level 1. Calibrate scores, percentiles, and admission odds in 0ms.",
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
  openGraph: {
    title: "Free Student Preparation & Score Calculators | AceThePrep",
    description:
      "Interactive 0ms calculators for GMAT Focus composite scores, Digital SAT routing, IELTS bands, TOEFL concordance, and CFA Level 1 MPS.",
    url: `${siteConfig.url}/tools`,
    type: "website",
  },
};

const TOOLS: ToolItem[] = [
  {
    title: "GMAT Focus Score Calculator & Percentile Calibrator",
    slug: "/tools/gmat-focus-score-calculator",
    description:
      "Calculate your composite GMAT Focus Edition score (205–805), global percentile rank, and M7 business school target tier from Quant, Verbal, and Data Insights section scores.",
    iconName: "calculator",
    badge: "Official GMAC Model",
    tags: ["GMAT Focus", "Score Calculator", "Percentiles", "MBA Admissions"],
    examCategory: "gmat-focus",
  },
  {
    title: "Digital SAT Score Calculator & Adaptive Curve Simulator",
    slug: "/tools/digital-sat-score-calculator",
    description:
      "Calculate your composite Digital SAT score (400–1600), Reading & Writing (200-800), Math (200-800), and simulate Module 2 adaptive routing penalties in 0ms.",
    iconName: "calculator",
    badge: "Multistage Adaptive",
    tags: ["Digital SAT", "Score Estimator", "Adaptive Routing", "College Admissions"],
    examCategory: "sat",
  },
  {
    title: "IELTS Band Score Calculator & Rounding Simulator",
    slug: "/tools/ielts-band-score-calculator",
    description:
      "Convert raw Reading and Listening marks out of 40 to official IELTS bands (0–9.0) and calculate overall scores with British Council & IDP half-band rounding algorithms.",
    iconName: "calculator",
    badge: "Official Rounding Model",
    tags: ["IELTS Academic", "Band Calculator", "CEFR Converter", "Study Abroad"],
    examCategory: "ielts",
  },
  {
    title: "TOEFL to IELTS Score Converter",
    slug: "/tools/toefl-to-ielts-converter",
    description:
      "Translate TOEFL iBT composite scores (0–120) to IELTS Academic band levels (0–9.0) using official ETS research concordance tables for university admissions.",
    iconName: "converter",
    badge: "ETS Concordance",
    tags: ["TOEFL iBT", "IELTS", "Score Translation", "University Cutoffs"],
    examCategory: "toefl",
  },
  {
    title: "CFA Level 1 Score Calculator & MPS Estimator",
    slug: "/tools/cfa-level-1-score-calculator",
    description:
      "Estimate your weighted exam percentage across the 10 CFA Institute curriculum topics and model pass/fail odds against historical ~69% Minimum Passing Scores.",
    iconName: "calculator",
    badge: "10-Topic Weighted MPS",
    tags: ["CFA Level 1", "MPS Estimator", "Ethics Adjustment", "Chartered Financial Analyst"],
    examCategory: "cfa",
  },
  {
    title: "GRE to GMAT Focus Score Converter",
    slug: "/tools/gre-to-gmat-converter",
    description:
      "Convert your GRE Verbal (130–170) and Quantitative (130–170) scores into estimated GMAT Focus composite scores and legacy GMAT equivalents using standard admissions regression models.",
    iconName: "converter",
    badge: "Concordance Model",
    tags: ["GRE", "GMAT Focus", "Admissions Converter", "Score Translation"],
    examCategory: "gre",
  },
  {
    title: "Diagnostic Percentile Predictor",
    slug: "/predictor",
    description:
      "Take a 5-minute psychometric calibration drill across 6 global exam tracks to estimate your baseline test percentile and uncover cognitive trap tendencies.",
    iconName: "diagnostic",
    badge: "Adaptive Diagnostic",
    tags: ["All Exams", "Percentile Predictor", "Cognitive Diagnostic"],
    examCategory: "all",
  },
];

export default function ToolsHubPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
  ];

  return (
    <div className="min-h-screen pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <StructuredData schema={breadcrumbSchema(breadcrumbs) as WithContext<any>} />
      <div className="max-w-5xl mx-auto">
        <ToolsClientView tools={TOOLS} />
      </div>
    </div>
  );
}
