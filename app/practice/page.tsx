// Path: app/practice/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import taxonomyRaw from "@/lib/taxonomies.json";
import { examToSlug, subjectToSlug, domainToSlug } from "@/lib/slugs";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";
import { EXAM_CATEGORIES } from "@/lib/constants/exam-groups";
import { PracticeDirectory, type ExamDirectoryItem } from "@/components/practice/PracticeDirectory";
import { Sparkles } from "lucide-react";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;
const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: `Free Competitive Exam Practice & Solutions | ${siteConfig.name}`,
  description:
    "Practice authentic exam questions with step-by-step solutions and common mistake breakdowns for Digital SAT, GRE General, GMAT Focus, CFA Level 1, JEE Main, NEET, and CAT.",
  alternates: {
    canonical: `${baseUrl}/practice`,
  },
  openGraph: {
    title: `Competitive Exam Practice & Solutions | ${siteConfig.name}`,
    description:
      "Practice authentic exam questions with step-by-step solutions showing you how to solve each problem and avoid common mistakes.",
    url: `${baseUrl}/practice`,
    type: "website",
  },
};

export default function PracticeHubPage() {
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
  ];

  // 1. Build lookup map from taxonomies.json
  const examMap = new Map<string, Omit<ExamDirectoryItem, "categoryId" | "categoryName">>();
  Object.entries(taxonomy)
    .filter(([key]) => key !== "_schema_version")
    .forEach(([examName, subjects]) => {
      const subjectList = Object.entries(subjects);
      const totalDomains = subjectList.reduce(
        (acc, [, domains]) => acc + (Array.isArray(domains) ? domains.length : 0),
        0
      );
      examMap.set(examName, {
        examName,
        examSlug: examToSlug(examName),
        subjects: subjectList.map(([subjectName, domains]) => ({
          subjectName,
          subjectSlug: subjectToSlug(subjectName),
          domainCount: Array.isArray(domains) ? domains.length : 0,
          domains: Array.isArray(domains)
            ? domains.slice(0, 4).map((d) => ({
                domainName: d,
                domainSlug: domainToSlug(d),
              }))
            : [],
        })),
        totalDomains,
      });
    });

  // 2. Order exams by defined priority category (GMAT, CFA, GRE first)
  const prioritizedExams: ExamDirectoryItem[] = [];

  for (const cat of EXAM_CATEGORIES) {
    for (const examName of cat.exams) {
      const data = examMap.get(examName);
      if (data) {
        prioritizedExams.push({
          ...data,
          categoryId: cat.id,
          categoryName: cat.name,
        });
      }
    }
  }

  // Fallback for any non-categorized exams
  const seenExams = new Set(prioritizedExams.map((e) => e.examName));
  for (const [examName, data] of examMap.entries()) {
    if (!seenExams.has(examName)) {
      prioritizedExams.push({
        ...data,
        categoryId: "national-competitive",
        categoryName: "National Competitive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hub Header with High Aesthetics and Navbar Clearance */}
        <div className="text-center sm:text-left border-b border-border/80 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 Supported Curricula</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Exam Practice Directory
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Select your syllabus to practice authentic questions. Every problem features step-by-step solutions showing you how to solve efficiently and avoid common mistakes.
          </p>
        </div>

        {/* Interactive Directory with Category Tabs, Search, and Balanced Cards */}
        <PracticeDirectory exams={prioritizedExams} />
      </div>
    </div>
  );
}
