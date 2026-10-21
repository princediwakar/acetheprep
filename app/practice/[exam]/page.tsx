// Path: app/practice/[exam]/page.tsx

import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import taxonomyRaw from "@/lib/taxonomies.json";
import { examToSlug, slugToExam, subjectToSlug, domainToSlug } from "@/lib/slugs";
import StructuredData, {
  breadcrumbSchema,
  examCourseSchema,
  educationalCredentialSchema,
} from "@/components/seo/StructuredData";
import ExamCTABanner from "@/components/practice/ExamCTABanner";
import { siteConfig } from "@/config/site";
import { ArrowLeft, BookOpen, Sparkles, ArrowRight, BarChart3, TrendingUp, Clock, Timer, Target, Layers } from "lucide-react";
import { getExamBlueprint } from "@/lib/constants/exam-blueprints";

interface PageProps {
  params: Promise<{ exam: string }>;
}

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;
const baseUrl = siteConfig.url;

export async function generateStaticParams() {
  return Object.keys(taxonomy)
    .filter((k) => k !== "_schema_version")
    .map((examName) => ({
      exam: examToSlug(examName),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  const decoded = decodeURIComponent(exam).trim();
  const examName = slugToExam(decoded) || decoded;
  const examSlug = examToSlug(examName);
  const canonicalUrl = `${baseUrl}/practice/${examSlug}`;

  const title = `Free ${examName} Practice Questions & Topic Tests`;
  const description = `Prepare for ${examName} with free topic-by-topic practice questions. Includes AI-powered distractor analysis explaining every student misconception.`;


  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/api/og?type=practice&title=${encodeURIComponent(examName)}&topic=Practice%20Catalog`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ExamPracticeHubPage({ params }: PageProps) {
  const { exam } = await params;
  const decoded = decodeURIComponent(exam).trim();

  let examName = slugToExam(decoded);
  const canonicalSlug = examName ? examToSlug(examName) : null;

  // If accessed by non-slug name (e.g. /practice/JEE%20Main), redirect to canonical kebab-case
  if (canonicalSlug && decoded !== canonicalSlug) {
    permanentRedirect(`/practice/${canonicalSlug}`);
  }

  if (!examName) {
    // Check if decoded matches raw exam name
    if (taxonomy[decoded]) {
      examName = decoded;
      permanentRedirect(`/practice/${examToSlug(decoded)}`);
    } else {
      notFound();
    }
  }

  const subjects = taxonomy[examName];
  if (!subjects) {
    notFound();
  }

  const examSlug = examToSlug(examName);
  const blueprint = getExamBlueprint(examName);
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
    { name: examName, url: `${baseUrl}/practice/${examSlug}` },
  ];

  const subjectNames = Object.keys(subjects);
  const courseLd = examCourseSchema({
    examName,
    description: `Comprehensive diagnostic question banks and spaced repetition practice for ${examName}.`,
    url: `${baseUrl}/practice/${examSlug}`,
    subjects: subjectNames,
  });

  const credentialLd = educationalCredentialSchema({
    examName,
    description: `Curriculum-aligned mastery drills and error analytics designed for ${examName} aspirants.`,
    url: `${baseUrl}/practice/${examSlug}`,
  });

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <StructuredData schema={courseLd} />
      <StructuredData schema={credentialLd} />

      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all exams
        </Link>

        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum & Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
            {examName} Practice Questions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Practice authentic {examName} questions organized by section, with step-by-step solutions showing you how to spot and eliminate tricky trap options.
          </p>

          {/* Topological Cross-Links to Analytics & Insights */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/insights/${examSlug}/hardest-topics`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>View {examName} Hardest Topics Data</span>
            </Link>
            <Link
              href={`/insights/${examSlug}/most-failed-concepts`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-all"
            >
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span>Most Failed Concepts Report</span>
            </Link>
          </div>
        </div>

        {/* Official Exam Structure & Timing Blueprint */}
        <div className="mb-12 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-3 mb-6">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider font-mono">
                Official Blueprint Specification
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                {examName} Test Format & Time Allocation
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Clock className="w-3.5 h-3.5" />
              <span>{blueprint.officialTimeMinutes} Min Total Time</span>
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Target className="w-4 h-4 text-primary" />
                <span>Full Official Mock</span>
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {blueprint.officialMockCount} Questions
              </div>
              <p className="text-xs text-muted-foreground">
                {blueprint.officialTimeMinutes} minutes • ~{Math.round((blueprint.officialTimeMinutes * 60) / blueprint.officialMockCount)}s per question
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>{blueprint.sectionName}</span>
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {blueprint.sectionTestCount} Questions
              </div>
              <p className="text-xs text-muted-foreground">
                {blueprint.sectionTimeMinutes} minutes • Standard Sectional Pace
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Timer className="w-4 h-4 text-amber-500" />
                <span>Daily Quick Drill</span>
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {blueprint.quickDrillCount} Questions
              </div>
              <p className="text-xs text-muted-foreground">
                {blueprint.quickDrillMinutes} minutes • Zero-friction topic sprints
              </p>
            </div>
          </div>
        </div>

        {/* Subjects & Topics Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Exam Subjects & Topics
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select any topic below to practice verified questions:
            </p>
          </div>
        </div>
        <div className="space-y-8">
          {Object.entries(subjects).map(([subjectName, domains]) => {
            const subjectSlug = subjectToSlug(subjectName);
            const domainList = Array.isArray(domains) ? domains : [];

            return (
              <div
                key={subjectSlug}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/50 gap-2 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      <Link
                        href={`/practice/${examSlug}/${subjectSlug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {subjectName}
                      </Link>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {domainList.length} specialized topic modules
                    </p>
                  </div>
                  <Link
                    href={`/practice/${examSlug}/${subjectSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View Subject Overview
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {domainList.map((domainName) => {
                    const domainSlug = domainToSlug(domainName);
                    return (
                      <Link
                        key={domainSlug}
                        href={`/practice/${examSlug}/${subjectSlug}/${domainSlug}`}
                        className="group flex flex-col justify-between rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm"
                      >
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {domainName}
                        </span>
                        <span className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1 font-medium group-hover:text-primary">
                          Solve questions →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Exam CTA Banner */}
        <div className="mt-12">
          <ExamCTABanner examName={examName} />
        </div>
      </div>
    </div>
  );
}
