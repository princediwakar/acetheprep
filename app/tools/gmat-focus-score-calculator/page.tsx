// Path: app/tools/gmat-focus-score-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { GmatFocusScoreCalculator } from "@/components/tools/GmatFocusScoreCalculator";
import StructuredData, {
  breadcrumbSchema,
  faqPageSchema,
  toolWebApplicationSchema,
  concordanceDatasetSchema,
} from "@/components/seo/StructuredData";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { siteConfig } from "@/config/site";
import { CheckCircle2, ChevronRight, Calculator, BookOpen, Target, Sparkles } from "lucide-react";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "GMAT Focus Score Calculator (2026) | Section to Percentile Converter",
  description:
    "Free interactive GMAT Focus Edition score calculator. Calculate your exact total score (205-805), official GMAC percentile, and MBA admissions benchmark from Quant, Verbal, and Data Insights sections.",
  keywords: [
    "GMAT Focus score calculator",
    "GMAT Focus percentile chart",
    "GMAT Focus score conversion",
    "GMAT 205-805 calculator",
    "calculate GMAT Focus edition score",
    "GMAT Focus to legacy score",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/gmat-focus-score-calculator`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/tools/gmat-focus-score-calculator`,
    },
  },
  openGraph: {
    title: "GMAT Focus Score Calculator & Percentile Converter (2026)",
    description:
      "Interactive 0ms GMAT Focus Edition score calculator. Convert section scores into total score (205-805), percentiles, and top MBA program benchmarks.",
    url: `${siteConfig.url}/tools/gmat-focus-score-calculator`,
    type: "website",
  },
};

const FAQS = [
  {
    question: "How is the GMAT Focus Edition score calculated?",
    answer:
      "The GMAT Focus Edition composite score ranges from 205 to 805, always ending in a 5. It is computed equally from three sections: Quantitative Reasoning (60-90), Verbal Reasoning (60-90), and Data Insights (60-90). Each section contributes exactly 33.3% to your final score.",
  },
  {
    question: "What is a good GMAT Focus score for Top 10 MBA programs (M7)?",
    answer:
      "For M7 business schools (Stanford GSB, Harvard Business School, Wharton, Chicago Booth, Kellogg, Columbia, MIT Sloan), a competitive score is 655 or higher (91st+ percentile). A score of 695+ (98th percentile) places you in the top tier of applicants.",
  },
  {
    question: "How does the GMAT Focus (205-805) compare to the Legacy GMAT (200-800)?",
    answer:
      "The GMAT Focus scale was recalibrated by GMAC to eliminate score compression at the top end. A 645 on the GMAT Focus corresponds to approximately a 700-710 on the old legacy exam. A 705 on the Focus Edition corresponds to ~760 on the old exam (98.6th percentile).",
  },
  {
    question: "Are all three sections equally weighted in the GMAT Focus Edition?",
    answer:
      "Yes. Unlike the legacy GMAT where Integrated Reasoning did not count towards the 800-point total, Data Insights is fully integrated into the 205-805 score. A drop in Data Insights penalizes your composite score identically to a drop in Quantitative or Verbal.",
  },
];

export default function GmatScoreCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    { name: "GMAT Focus Score Calculator", url: `${siteConfig.url}/tools/gmat-focus-score-calculator` },
  ];

  const appSchema = toolWebApplicationSchema({
    name: "GMAT Focus Score Calculator & Percentile Calibrator",
    url: `${siteConfig.url}/tools/gmat-focus-score-calculator`,
    description:
      "Instant, interactive GMAT Focus score and percentile calculator based on official GMAC scoring concordance tables.",
    featureList: [
      "Total score range 205–805 calculation",
      "Equal 33.3% weighting for Quant, Verbal, and Data Insights",
      "Official GMAC global percentile calibration",
      "Target M7 business school tier breakdown",
    ],
  });

  const datasetSchema = concordanceDatasetSchema({
    name: "Official GMAT Focus Score and Percentile Concordance Table",
    url: `${siteConfig.url}/tools/gmat-focus-score-calculator`,
    description: "Official GMAC scoring distribution mapping composite 205-805 scores to global percentiles and legacy 200-800 equivalents.",
    variableMeasured: [
      "GMAT Focus Score",
      "Global Percentile",
      "Legacy GMAT Equivalent",
      "Target Business School Tier",
    ],
  });

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbs) as WithContext<any>} />
      <StructuredData schema={faqPageSchema(FAQS) as WithContext<any>} />
      <StructuredData schema={appSchema as WithContext<any>} />
      <StructuredData schema={datasetSchema as WithContext<any>} />

      <main className="min-h-screen pt-20 sm:pt-24 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/tools" className="hover:text-foreground transition-colors">
                  Tools
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-foreground">GMAT Focus Score Calculator</li>
            </ol>
          </nav>

          {/* Page Heading - Answer First */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Calculator className="h-3.5 w-3.5" />
                Free Interactive Micro-Tool
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Updated for 2026 GMAC Admissions
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              GMAT Focus Score Calculator & Percentile Converter
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Calculate your composite GMAT Focus score (205–805), official global percentile ranking, and target business school tier based on your Quant, Verbal, and Data Insights sections.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="How GMAT Focus Scoring Works"
            summary="The GMAT Focus Edition composite score ranges from 205 to 805, always ending in a 5. It is computed equally from three sections (Quantitative Reasoning, Verbal Reasoning, and Data Insights, 60–90 each), with each section contributing exactly 33.3% to your final score."
            formulaOrRule="Composite (205–805) = (Quant + Verbal + Data Insights) × (20 / 3) + 5, rounded to nearest 5 ending in 5"
            facts={[
              {
                label: "M7 Ultra-Competitive (98.6th %ile)",
                value: "705 - 805",
                subtext: "Stanford GSB, Harvard, Wharton, Booth",
              },
              {
                label: "Top 15 Competitive Baseline (91.3th %ile)",
                value: "655 - 695",
                subtext: "Kellogg, Columbia, MIT Sloan, INSEAD",
              },
              {
                label: "Legacy 700 Equivalence",
                value: "645 Focus",
                subtext: "GMAC recentered the bell curve to remove compression",
              },
            ]}
          />

          {/* Interactive Calculator - Placed Above the Fold */}
          <div className="mb-12">
            <GmatFocusScoreCalculator />
          </div>

          {/* Authoritative Technical Reference & Concordance Table */}
          <section className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Official GMAT Focus Score & Percentile Concordance
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The GMAT Focus Edition uses a centered bell curve with mean score ~546. Because test-takers previously experienced extreme percentile deflation in Quantitative Reasoning on the legacy exam, GMAC recalibrated the entire scoring distribution.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted text-muted-foreground font-mono text-[11px] uppercase border-b border-border">
                  <tr>
                    <th className="py-3 px-4">GMAT Focus Score</th>
                    <th className="py-3 px-4">Focus Percentile</th>
                    <th className="py-3 px-4">Legacy GMAT Equivalent</th>
                    <th className="py-3 px-4">Target Business Schools</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium">
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary font-mono">705 - 805</td>
                    <td className="py-3 px-4 text-foreground font-bold">98.6th - 100th %ile</td>
                    <td className="py-3 px-4 text-muted-foreground">760 - 800</td>
                    <td className="py-3 px-4 text-foreground">Stanford GSB, Harvard, Wharton, Booth</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary font-mono">655 - 695</td>
                    <td className="py-3 px-4 text-foreground font-bold">91.3th - 97.9th %ile</td>
                    <td className="py-3 px-4 text-muted-foreground">710 - 750</td>
                    <td className="py-3 px-4 text-foreground">Kellogg, Columbia, MIT Sloan, INSEAD, LBS</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary font-mono">605 - 645</td>
                    <td className="py-3 px-4 text-foreground">72.8th - 88.5th %ile</td>
                    <td className="py-3 px-4 text-muted-foreground">660 - 700</td>
                    <td className="py-3 px-4 text-foreground">Top 20–35 Global MBA Programs (Duke, Darden, Stern)</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary font-mono">555 - 595</td>
                    <td className="py-3 px-4 text-foreground">47.9th - 68.1th %ile</td>
                    <td className="py-3 px-4 text-muted-foreground">600 - 650</td>
                    <td className="py-3 px-4 text-foreground">Top 50 Programs & Specialized Masters</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section with Schema Markup Integration */}
          <section className="mb-12 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Frequently Asked Questions About GMAT Focus Scoring
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Interlinked Curriculum Section & Diagnostic Hubs */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Targeting a 655+ or 705+ on your GMAT Focus?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Practice high-yield Data Sufficiency, Critical Reasoning, and Quantitative drills with real cognitive distractor analysis.
                </p>
              </div>
              <Link
                href="/practice/gmat-focus"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
              >
                <span>Explore GMAT Focus Syllabus</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/insights/gmat-focus/hardest-topics"
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider">Benchmark Insights</div>
                  <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    Hardest GMAT Focus Traps &rarr;
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Data Sufficiency traps & C vs E failure analytics
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/predictor?exam=gmat-focus"
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider">Interactive Study Plan</div>
                  <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    GMAT Score Gap Predictor &rarr;
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Calculate study hours from current to 705+ target
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
