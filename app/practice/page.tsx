// Path: app/practice/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import taxonomyRaw from "@/lib/taxonomies.json";
import { examToSlug, subjectToSlug, domainToSlug } from "@/lib/slugs";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, Trophy } from "lucide-react";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;
const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: `Free Competitive Exam Practice Questions & Distractor Analysis | ${siteConfig.name}`,
  description:
    "Free curated practice questions with real-time distractor analysis and adaptive spaced repetition for JEE Main, NEET, UPSC CSE, GMAT, SAT, GRE, CAT, GATE, CLAT, and CA Foundation.",
  alternates: {
    canonical: `${baseUrl}/practice`,
  },
  openGraph: {
    title: `Free Competitive Exam Practice Questions | ${siteConfig.name}`,
    description:
      "Practice authentic exam questions with AI-powered distractor deconstruction across 10 major competitive exams.",
    url: `${baseUrl}/practice`,
    type: "website",
  },
};

export default function PracticeHubPage() {
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
  ];

  const exams = Object.entries(taxonomy)
    .filter(([key]) => key !== "_schema_version")
    .map(([examName, subjects]) => {
      const subjectList = Object.entries(subjects);
      const totalDomains = subjectList.reduce(
        (acc, [, domains]) => acc + (Array.isArray(domains) ? domains.length : 0),
        0,
      );
      return {
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
      };
    });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-6xl mx-auto">
        {/* Hub Header */}
        <div className="mb-12 text-center sm:text-left border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Exam Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Practice Catalog by Examination
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Select your target exam to access authentic, verified questions. Every problem features our proprietary distractor analysis engine—exposing why wrong options are chosen and diagnosing specific conceptual traps.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {exams.map((exam) => (
            <div
              key={exam.examSlug}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    <Trophy className="w-3.5 h-3.5" />
                    {exam.totalDomains} Topics Covered
                  </span>
                  <Link
                    href={`/practice/${exam.examSlug}`}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View All Topics
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  <Link href={`/practice/${exam.examSlug}`} className="hover:text-primary transition-colors">
                    {exam.examName}
                  </Link>
                </h2>

                {/* Subjects & Popular Topics */}
                <div className="mt-5 space-y-4">
                  {exam.subjects.map((sub) => (
                    <div key={sub.subjectSlug} className="border-t border-border/50 pt-3">
                      <div className="flex items-center justify-between text-sm font-semibold text-foreground mb-2">
                        <Link
                          href={`/practice/${exam.examSlug}/${sub.subjectSlug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {sub.subjectName}
                        </Link>
                        <span className="text-xs text-muted-foreground font-normal">
                          {sub.domainCount} modules
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.domains.map((dom) => (
                          <Link
                            key={dom.domainSlug}
                            href={`/practice/${exam.examSlug}/${sub.subjectSlug}/${dom.domainSlug}`}
                            className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {dom.domainName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/insights/${encodeURIComponent(exam.examName)}/hardest-topics`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Hardest Topics Data →
                </Link>

                <Link
                  href={`/practice/${exam.examSlug}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:opacity-90 transition"
                >
                  Start Practice
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global PLG Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-r from-card via-card to-primary/5 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Don't know where to start? Take a 5-minute diagnostic.
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Our cognitive science engine automatically calculates your memory decay rate and curates questions targeted at your highest-priority weak spots.
            </p>
          </div>
          <Link
            href="/setup"
            className="inline-flex whitespace-nowrap items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
          >
            Start Free Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
