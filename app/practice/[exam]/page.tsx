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

const FEATURED_DRILLS: Record<string, Array<{ name: string; href: string; tag: string }>> = {
  "gmat-focus": [
    { name: "Data Sufficiency", href: "/practice/gmat-focus/data-insights/data-sufficiency", tag: "10 Questions • Parity & Zero Traps" },
    { name: "Multi-Source Reasoning", href: "/practice/gmat-focus/data-insights/multi-source-reasoning", tag: "11 Questions • Multi-Tab Synthesis" },
    { name: "Number Properties", href: "/practice/gmat-focus/quantitative-reasoning/number-properties", tag: "10 Questions • Divisors & Remainders" },
    { name: "Critical Reasoning", href: "/practice/gmat-focus/verbal-reasoning/critical-reasoning", tag: "10 Questions • Assumptions & Flaws" },
  ],
  "sat": [
    { name: "Advanced Math", href: "/practice/sat/mathematics/advanced-math", tag: "10 Questions • Extraneous Solutions" },
    { name: "Algebra", href: "/practice/sat/mathematics/algebra", tag: "10 Questions • Linear Systems" },
    { name: "Rhetorical Synthesis", href: "/practice/sat/reading-and-writing/rhetorical-synthesis", tag: "10 Questions • Prompt Alignment" },
    { name: "Craft & Structure", href: "/practice/sat/reading-and-writing/craft-and-structure", tag: "10 Questions • Words in Context" },
  ],
  "gre": [
    { name: "Quantitative Comparison", href: "/practice/gre/quantitative-reasoning/quantitative-comparison", tag: "10 Questions • Real Number Traps" },
    { name: "Arithmetic & Exponents", href: "/practice/gre/quantitative-reasoning/arithmetic", tag: "10 Questions • Modular Math" },
    { name: "Text Completion", href: "/practice/gre/verbal-reasoning/text-completion", tag: "10 Questions • Contrast Signals" },
    { name: "Sentence Equivalence", href: "/practice/gre/verbal-reasoning/sentence-equivalence", tag: "10 Questions • Synonym Traps" },
  ],
  "cfa-level-1": [
    { name: "Time Value of Money", href: "/practice/cfa-level-1/quantitative-methods/time-value-of-money", tag: "10 Questions • Compounding & EAR" },
    { name: "Financial Reporting Standards", href: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards", tag: "10 Questions • IFRS vs GAAP" },
    { name: "Cost of Capital & WACC", href: "/practice/cfa-level-1/corporate-issuers/cost-of-capital", tag: "10 Questions • Interest Tax Shields" },
  ],
  "ielts-academic": [
    { name: "True / False / Not Given", href: "/practice/ielts-academic/reading/inferences", tag: "10 Questions • Passage Logic" },
    { name: "Central Ideas & Details", href: "/practice/ielts-academic/reading/central-ideas-and-details", tag: "10 Questions • Paraphrase Matching" },
    { name: "Craft & Structure", href: "/practice/ielts-academic/reading/craft-and-structure", tag: "10 Questions • Qualifying Words" },
  ],
  "toefl-ibt": [
    { name: "Sentence Insertion Flow", href: "/practice/toefl-ibt/reading/transitions-and-logical-flow", tag: "10 Questions • Transition Clues" },
    { name: "Rhetorical Purpose", href: "/practice/toefl-ibt/reading/text-structure-and-purpose", tag: "10 Questions • Author Stance" },
    { name: "Negative Factual ('EXCEPT')", href: "/practice/toefl-ibt/reading/information-and-ideas", tag: "10 Questions • Inversion Traps" },
  ],
};

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
  const featuredDrills = FEATURED_DRILLS[examSlug] || [];
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
          href="/#curriculum"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all curricula
        </Link>

        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum & Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
            {examName} Syllabus &amp; Practice Questions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Explore the official blueprint and choose any topic module below to practice authentic questions with step-by-step first-principles solutions.
          </p>

          {/* Topological Cross-Links to Analytics & Insights */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/insights/${examSlug}/hardest-topics`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>View {examName} Hardest Topics &amp; Error Rates</span>
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
                <span>Quick Practice Set</span>
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {blueprint.quickDrillCount} Questions
              </div>
              <p className="text-xs text-muted-foreground">
                {blueprint.quickDrillMinutes} minutes • 10-question topic practice sets
              </p>
            </div>
          </div>
        </div>

        {/* Highest-Yield Practice Sets (1-Click Start) */}
        {featuredDrills && featuredDrills.length > 0 && (
          <div className="mb-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                  Recommended Starting Points
                </span>
                <h2 className="text-xl font-bold text-foreground">
                  High-Yield Practice Sets
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                Instant • No account required
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDrills.map((drill) => (
                <Link
                  key={drill.href}
                  href={drill.href}
                  className="rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 hover:shadow-xs transition-all space-y-2 group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {drill.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {drill.tag}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 pt-1">
                    Practice Questions <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
                        <span className="mt-3 text-xs text-primary inline-flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Practice Questions <ArrowRight className="w-3 h-3" />
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
