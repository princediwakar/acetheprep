// Path: app/tools/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Calculator, ArrowLeftRight, Activity, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Free Student Preparation & Score Calculators",
  description:
    "Free interactive exam calculators and concordance tools for GMAT Focus, GRE, SAT, and graduate admissions. Calibrate scores, percentiles, and MBA admission odds in 0ms.",
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
  openGraph: {
    title: "Free Student Preparation & Score Calculators | AceThePrep",
    description:
      "Interactive 0ms calculators for GMAT Focus composite scores, GRE to GMAT concordance, and target admissions percentiles.",
    url: `${siteConfig.url}/tools`,
    type: "website",
  },
};

const TOOLS = [
  {
    title: "GMAT Focus Score Calculator & Percentile Calibrator",
    slug: "/tools/gmat-focus-score-calculator",
    description:
      "Calculate your composite GMAT Focus Edition score (205–805), global percentile rank, and M7 business school target tier from Quant, Verbal, and Data Insights section scores.",
    icon: Calculator,
    badge: "Official GMAC Model",
    tags: ["GMAT Focus", "Score Calculator", "Percentiles", "MBA Admissions"],
  },
  {
    title: "GRE to GMAT Focus Score Converter",
    slug: "/tools/gre-to-gmat-converter",
    description:
      "Convert your GRE Verbal (130–170) and Quantitative (130–170) scores into estimated GMAT Focus composite scores and legacy GMAT equivalents using standard admissions regression models.",
    icon: ArrowLeftRight,
    badge: "Concordance Model",
    tags: ["GRE", "GMAT Focus", "Admissions Converter", "Score Translation"],
  },
  {
    title: "Diagnostic Percentile Predictor",
    slug: "/predictor",
    description:
      "Take a 5-minute psychometric calibration drill across 6 global exam tracks to estimate your baseline test percentile and uncover cognitive trap tendencies.",
    icon: Activity,
    badge: "Adaptive Diagnostic",
    tags: ["All Exams", "Percentile Predictor", "Cognitive Diagnostic"],
  },
];

export default function ToolsHubPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
  ];

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbs) as WithContext<any>} />

      <main className="min-h-screen pt-20 sm:pt-24 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-foreground">Tools</li>
            </ol>
          </nav>

          {/* Heading */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Zero-Latency Micro-Tools
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Free & Open Access
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              Exam Preparation Calculators & Conversion Tools
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              High-precision score calculators, percentile converters, and diagnostic benchmark tools built for test-takers and admissions applicants. 0ms client-side calculation with verified psychometric concordance.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={tool.slug}
                  className="group rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-primary/50 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tool.tags.map((tag) => (
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
                    <span>Open Interactive Tool</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="rounded-2xl border border-border bg-secondary/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-foreground">
                Looking for exam comparisons?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Explore our head-to-head analysis of GMAT Focus vs GRE for MBA admissions, timing, and score conversion.
              </p>
            </div>
            <Link
              href="/compare/gmat-focus-vs-gre"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
            >
              <span>View GMAT vs GRE Comparison</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
