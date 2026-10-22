// Path: app/practice/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import taxonomyRaw from "@/lib/taxonomies.json";
import { examToSlug, subjectToSlug, domainToSlug, slugify } from "@/lib/slugs";
import { siteConfig } from "@/config/site";
import { getExamBlueprint } from "@/lib/constants/exam-blueprints";
import { FEATURED_DRILLS } from "@/lib/constants/featured-drills";
import {
  PracticeCatalogFilter,
  type CatalogTopicItem,
} from "@/components/practice/PracticeCatalogFilter";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Calculator,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;
const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Free Exam Practice Questions & Topic Tests — All 6 Curricula | AceThePrep",
  description:
    "Free diagnostic question banks and adaptive topic tests for Digital SAT, GMAT Focus, GRE General, CFA Level 1, IELTS Academic, and TOEFL iBT. Authentic timing, Desmos, and step-by-step solutions.",
  alternates: {
    canonical: `${baseUrl}/practice`,
  },
  openGraph: {
    title: `Free Exam Practice Questions & Topic Tests | ${siteConfig.name}`,
    description:
      "Explore official curricula, timing blueprints, and un-gated practice questions across all 6 competitive exams.",
    url: `${baseUrl}/practice`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Exam Practice Questions & Topic Tests | ${siteConfig.name}`,
    description:
      "Topic-by-topic question banks with cognitive error analysis for Digital SAT, GMAT Focus, GRE, and CFA.",
  },
};

const EXAM_DISPLAY_ORDER = [
  { name: "GMAT Focus", title: "GMAT Focus", org: "GMAC Focus Edition", slug: "gmat-focus" },
  { name: "SAT", title: "Digital SAT", org: "College Board 2026", slug: "sat" },
  { name: "GRE", title: "GRE General", org: "ETS GRE", slug: "gre" },
  { name: "CFA Level 1", title: "CFA Level 1", org: "CFA Institute", slug: "cfa-level-1" },
  { name: "IELTS Academic", title: "IELTS Academic", org: "British Council & IDP", slug: "ielts-academic" },
  { name: "TOEFL iBT", title: "TOEFL iBT", org: "ETS TOEFL", slug: "toefl-ibt" },
];

export default function PracticeCatalogPage() {
  // Collect all searchable topic items across all exams
  const allTopicItems: CatalogTopicItem[] = [];

  for (const [examName, subjects] of Object.entries(taxonomy)) {
    if (examName === "_schema_version" || typeof subjects !== "object" || !subjects) continue;
    const examSlug = examToSlug(examName);

    for (const [subjectName, domains] of Object.entries(subjects)) {
      const subjectSlug = subjectToSlug(subjectName);
      if (Array.isArray(domains)) {
        for (const domain of domains) {
          const domainSlug = domainToSlug(domain);
          allTopicItems.push({
            exam: examName === "SAT" ? "Digital SAT" : examName,
            examSlug,
            subject: subjectName,
            subjectSlug,
            domain,
            domainSlug,
            href: `/practice/${examSlug}/${subjectSlug}/${domainSlug}`,
          });
        }
      }
    }
  }

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AceThePrep Global Exam Practice Catalog",
    description: "Curriculum-aligned question banks and diagnostic drills for 6 competitive exams.",
    itemListElement: EXAM_DISPLAY_ORDER.map((ex, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${ex.title} Practice Questions & Syllabus`,
      url: `${baseUrl}/practice/${ex.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the practice questions on AceThePrep completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AceThePrep provides un-gated practice questions with authentic test timing, official formula sheets, test calculators, and immediate step-by-step solutions without requiring a credit card or upfront registration.",
        },
      },
      {
        "@type": "Question",
        name: "Which exams are covered on AceThePrep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AceThePrep supports 6 global benchmarks: Digital SAT, GMAT Focus Edition, GRE General, CFA Level 1, IELTS Academic, and TOEFL iBT, with topic-by-topic taxonomies aligned to official 2026 specifications.",
        },
      },
      {
        "@type": "Question",
        name: "How does cognitive distractor analysis help students improve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rather than simply stating the correct answer, distractor analysis breaks down the exact psychological and logical traps that cause students to pick each wrong option, ensuring the misconception is never repeated.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <StructuredData schema={itemListSchema as any} />
      <StructuredData schema={faqSchema as any} />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Syllabus Practice Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
            Practice Questions by Exam &amp; Topic
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Select any exam below to explore its official blueprint, or search 100+ topic modules to practice authentic questions with first-principles solutions.
          </p>

          {/* Quick Cross-Tool Navigation Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Hardest Topics &amp; Error Rates</span>
            </Link>
            <Link
              href="/predictor"
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-all"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Adaptive Score Calculator &amp; Study Planner</span>
            </Link>
          </div>
        </div>

        {/* Instant Topic Filter Component (Edge Client Component) */}
        <PracticeCatalogFilter
          topics={allTopicItems}
          examSlugs={EXAM_DISPLAY_ORDER.map((e) => ({ name: e.title, slug: e.slug }))}
        />

        {/* 6 Exam Blueprint Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                All 6 Global Exam Benchmarks
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Official specifications, section timing, and recommended high-yield drills
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAM_DISPLAY_ORDER.map((ex) => {
              const subjects = taxonomy[ex.name] || {};
              const subjectCount = Object.keys(subjects).length;
              const topicCount = Object.values(subjects).reduce(
                (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                0
              );
              const blueprint = getExamBlueprint(ex.name);
              const drills = FEATURED_DRILLS[ex.slug] || [];

              return (
                <div
                  key={ex.slug}
                  className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all hover:border-foreground/30 hover:shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <span className="font-mono text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        {ex.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-muted/60 text-muted-foreground">
                        {ex.org}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                        <span className="text-[10px] text-muted-foreground uppercase block">
                          Format & Time
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block truncate">
                          {blueprint.officialTimeMinutes} Min Total
                        </span>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                        <span className="text-[10px] text-muted-foreground uppercase block">
                          Curriculum
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block truncate">
                          {topicCount} Topics • {subjectCount} Subjects
                        </span>
                      </div>
                    </div>

                    {/* Featured Drills */}
                    {drills.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase block">
                          High-Yield Drills:
                        </span>
                        <div className="space-y-1">
                          {drills.slice(0, 3).map((d) => (
                            <Link
                              key={d.href}
                              href={d.href}
                              className="group flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-secondary/60 transition-colors"
                            >
                              <span className="text-foreground group-hover:text-primary transition-colors font-medium truncate pr-2">
                                {d.name}
                              </span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border/60 space-y-2">
                    <Link
                      href={`/practice/${ex.slug}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-foreground text-background hover:opacity-90 px-4 py-2.5 text-xs font-semibold transition-opacity cursor-pointer shadow-xs"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Explore {ex.title} Syllabus &amp; Tests →</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO FAQ Accordion Block */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground">
              Everything you need to know about preparing with AceThePrep practice question banks.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
