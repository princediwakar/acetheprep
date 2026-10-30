// Path: app/tools/cfa-level-1-score-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { CfaLevel1ScoreCalculator } from "@/components/tools/CfaLevel1ScoreCalculator";
import StructuredData, {
  breadcrumbSchema,
  faqPageSchema,
  toolWebApplicationSchema,
  concordanceDatasetSchema,
} from "@/components/seo/StructuredData";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { siteConfig } from "@/config/site";
import { Calculator, CheckCircle2, ChevronRight, BookOpen, Target, Sparkles } from "lucide-react";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "CFA Level 1 Score Calculator (2026) | Minimum Passing Score (MPS) Estimator",
  description:
    "Free interactive CFA Level 1 score calculator. Calculate your weighted overall exam percentage across the 10 syllabus topics and estimate your pass/fail probability vs the ~69% MPS threshold.",
  keywords: [
    "CFA Level 1 score calculator",
    "CFA MPS estimator",
    "CFA Level 1 passing score",
    "CFA ethics adjustment formula",
    "CFA topic weights calculator",
    "CFA 70 percent rule",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/cfa-level-1-score-calculator`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/tools/cfa-level-1-score-calculator`,
    },
  },
  openGraph: {
    title: "CFA Level 1 Score & MPS Estimator (2026 Model)",
    description:
      "Interactive 0ms CFA Level 1 weighted score calculator. Estimate pass/fail odds against historical Minimum Passing Scores with topic weights and ethics adjustment simulation.",
    url: `${siteConfig.url}/tools/cfa-level-1-score-calculator`,
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is the Minimum Passing Score (MPS) for CFA Level 1?",
    answer:
      "CFA Institute does not publicly announce an exact MPS, but empirical 300Hours and historical candidate data show the MPS consistently falls between 68% and 70%. Achieving 70% or higher across the major topics historically guarantees a pass.",
  },
  {
    question: "What is the CFA Ethics Adjustment rule?",
    answer:
      "For candidates whose overall score falls directly on or adjacent to the Minimum Passing Score border, CFA Institute reviews their performance on the Ethical and Professional Standards topic. A strong score can pull a candidate over to a PASS, while a weak ethics score can lead to a FAIL.",
  },
  {
    question: "Which CFA Level 1 topics have the highest weights?",
    answer:
      "The highest-weighted topics are Ethical and Professional Standards (15-20%), Financial Statement Analysis (11-14%), Equity Investments (11-14%), and Fixed Income (11-14%). Together, these 'Big 4' topics comprise over 50% of the entire examination.",
  },
  {
    question: "How is the CFA Level 1 exam structured?",
    answer:
      "The exam consists of 180 multiple-choice questions split into two 135-minute sessions (90 questions each) with an optional break between sessions. There is no penalty for incorrect answers.",
  },
];

export default function CfaLevel1ScoreCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    {
      name: "CFA Level 1 Score Calculator",
      url: `${siteConfig.url}/tools/cfa-level-1-score-calculator`,
    },
  ];

  const appSchema = toolWebApplicationSchema({
    name: "CFA Level 1 Score & MPS Estimator",
    url: `${siteConfig.url}/tools/cfa-level-1-score-calculator`,
    description:
      "Interactive 0ms weighted score calculator for CFA Level 1 candidates. Models official topic weights and historical Minimum Passing Score boundaries.",
    featureList: [
      "10 CFA curriculum topic weight modeler",
      "Historical 68–70% Minimum Passing Score (MPS) simulator",
      "Ethics Adjustment borderline pass/fail evaluation",
      "Per-topic target scoring recommendations",
    ],
  });

  const datasetSchema = concordanceDatasetSchema({
    name: "CFA Institute Level 1 Topic Weights & MPS Threshold Dataset",
    url: `${siteConfig.url}/tools/cfa-level-1-score-calculator`,
    description: "Official CFA Institute topic weight ranges for Level 1 examination sessions and historical passing thresholds.",
    variableMeasured: [
      "Curriculum Topic",
      "Topic Weight Range",
      "Exam Session",
      "Strategic Exam Priority",
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
              <li className="font-semibold text-foreground">CFA Level 1 Calculator</li>
            </ol>
          </nav>

          {/* Heading - Fast Answer */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Calculator className="h-3.5 w-3.5" />
                Free Interactive Micro-Tool
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                10-Topic Weighted MPS Engine
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              CFA Level 1 Score Calculator & MPS Estimator
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Calculate your weighted aggregate percentage across all 10 CFA Institute curriculum topics. Compare your projected performance against the historical ~69% Minimum Passing Score (MPS) threshold with real-time Ethics adjustment simulation.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="How CFA Level 1 Scoring & MPS Works"
            summary="CFA Level 1 passing decisions are based on a Minimum Passing Score (MPS) determined by the CFA Institute Board of Governors, historically falling between 68% and 70%. Your score is the weighted average across 10 curriculum topics. Candidates scoring right on the MPS threshold are evaluated via the Ethics Adjustment: scoring >70% in Ethics can turn a borderline fail into a pass."
            formulaOrRule="Aggregate % = Sum( Topic Score % × Topic Weight ) | Pass Benchmark: >= 70.0% Aggregate"
            facts={[
              {
                label: "Safe Passing Threshold",
                value: "70.0%+ Weighted",
                subtext: "Historically corresponds to 99.9% pass probability",
              },
              {
                label: "Big 4 Topics (>50% Exam)",
                value: "Ethics, FSA, Equity, Fixed Inc",
                subtext: "Ethics is 15-20%; FSA is 11-14%",
              },
              {
                label: "Exam Architecture",
                value: "180 Questions (2 × 135m)",
                subtext: "No negative marking for incorrect choices",
              },
            ]}
          />

          {/* Interactive Calculator */}
          <div className="mb-12">
            <CfaLevel1ScoreCalculator />
          </div>

          {/* CFA Level 1 Topic Weights Reference Table */}
          <div className="space-y-8 border-t border-border/80 pt-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
                CFA Level 1 Topic Weighting & Allocation Matrix
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Official topic ranges defined by CFA Institute for the 2026 examination windows.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Curriculum Topic</th>
                    <th className="py-3 px-4">Official Weight Range</th>
                    <th className="py-3 px-4">Approximate Questions</th>
                    <th className="py-3 px-4">Strategic Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Ethical & Professional Standards</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">15% - 20%</td>
                    <td className="py-3 px-4 font-mono">27 - 36</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">Critical (Ethics Adjustment)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Financial Statement Analysis</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">11% - 14%</td>
                    <td className="py-3 px-4 font-mono">20 - 25</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">Critical (High Volume)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Equity Investments</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">11% - 14%</td>
                    <td className="py-3 px-4 font-mono">20 - 25</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">High Yield</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Fixed Income</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">11% - 14%</td>
                    <td className="py-3 px-4 font-mono">20 - 25</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">High Yield</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Portfolio Management</td>
                    <td className="py-3 px-4 font-mono">8% - 11%</td>
                    <td className="py-3 px-4 font-mono">14 - 20</td>
                    <td className="py-3 px-4">Core Foundation</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Quantitative Methods</td>
                    <td className="py-3 px-4 font-mono">6% - 9%</td>
                    <td className="py-3 px-4 font-mono">11 - 16</td>
                    <td className="py-3 px-4">Formula Intensive</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Economics</td>
                    <td className="py-3 px-4 font-mono">6% - 9%</td>
                    <td className="py-3 px-4 font-mono">11 - 16</td>
                    <td className="py-3 px-4">Conceptual Precision</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Corporate Issuers</td>
                    <td className="py-3 px-4 font-mono">6% - 9%</td>
                    <td className="py-3 px-4 font-mono">11 - 16</td>
                    <td className="py-3 px-4">Core Corporate Finance</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Derivatives</td>
                    <td className="py-3 px-4 font-mono">5% - 8%</td>
                    <td className="py-3 px-4 font-mono">9 - 14</td>
                    <td className="py-3 px-4">Mechanics & Valuation</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">Alternative Investments</td>
                    <td className="py-3 px-4 font-mono">5% - 8%</td>
                    <td className="py-3 px-4 font-mono">9 - 14</td>
                    <td className="py-3 px-4">High ROI / Short Study Time</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CFA Practice & Insights CTAs */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-foreground">
                    Master the highest-failed CFA Level 1 formulas and traps
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Drill Ethics GIPS standards, FSA revenue recognition traps, and bond duration calculations with instant explanation feedback.
                  </p>
                </div>
                <Link
                  href="/practice/cfa-level-1"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
                >
                  <span>Start CFA Level 1 Drill</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/insights/cfa-level-1/hardest-topics"
                  className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Benchmark Insights</div>
                    <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      Top 10 Hardest CFA Traps &rarr;
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Empirical failure rates & distractor traps
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/predictor?exam=cfa-level-1"
                  className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Interactive Study Plan</div>
                    <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      CFA MPS Gap Predictor &rarr;
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Calculate study hours & Minimum Passing Score
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border p-4 space-y-1.5 bg-card">
                    <h3 className="font-semibold text-sm text-foreground">{faq.question}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
