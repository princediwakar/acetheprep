// Path: app/compare/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Scale, ArrowRight } from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Exam & Platform Comparisons (2026)",
  description:
    "Authoritative head-to-head comparisons for competitive examinations. Compare GMAT Focus vs GRE, IELTS vs TOEFL, scoring scales, testing formats, and preparation methodologies.",
  alternates: {
    canonical: `${siteConfig.url}/compare`,
  },
  openGraph: {
    title: "Exam & Platform Comparisons (2026) | AceThePrep",
    description:
      "Strategic test comparisons: GMAT Focus vs GRE, IELTS vs TOEFL, scoring methodologies, and platform architectural teardowns.",
    url: `${siteConfig.url}/compare`,
    type: "website",
  },
};

const COMPARISONS = [
  {
    title: "GMAT Focus vs GRE: Which Test Should You Take in 2026?",
    slug: "/compare/gmat-focus-vs-gre",
    description:
      "Definitive architectural breakdown of GMAT Focus Edition versus ETS GRE General for business school admissions. Side-by-side section analysis, calculator policies, adaptive algorithms, and scoring percentiles.",
    badge: "Most Popular",
    tags: ["GMAT Focus", "GRE", "MBA Admissions", "Calculator Policy"],
  },
  {
    title: "IELTS vs TOEFL: Which English Test Should You Take in 2026?",
    slug: "/compare/ielts-vs-toefl",
    description:
      "Architectural comparison of IELTS Academic and TOEFL iBT. Human 1-on-1 speaking interview vs computer microphone, scoring scales, typing requirements, and university acceptance in the US, UK, and Canada.",
    badge: "Global Study Abroad",
    tags: ["IELTS Academic", "TOEFL iBT", "Speaking Test", "Study Abroad", "Visas"],
  },
];

export default function CompareHubPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Comparisons", url: `${siteConfig.url}/compare` },
  ];

  return (
    <div className="min-h-screen pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <StructuredData schema={breadcrumbSchema(breadcrumbs) as WithContext<any>} />

      <div className="max-w-5xl mx-auto space-y-10">
        <PageHero
          badge={
            <HeroBadge icon={Scale}>
              Head-to-Head Architectural Analyses
            </HeroBadge>
          }
          title="Competitive Exam Comparisons"
          subtitle="Objective, data-driven comparisons of standardized examinations and study strategies. Compare testing mechanics, timing pressure, scoring algorithms, and admissions ROI to pick the ideal test for your profile."
        />

        {/* Comparisons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={comp.slug}
              className="group rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-primary/50 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <Scale className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                    {comp.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {comp.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {comp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary">
                <span>Read Full Comparison</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Tools Cross-Link Callout */}
        <div className="rounded-2xl border border-border bg-secondary/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-foreground">
              Need to convert scores between tests?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Check our interactive GRE to GMAT Focus concordance calculator or TOEFL to IELTS converter for instant score translations.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
          >
            <span>View All Calculators</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
