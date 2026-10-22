// Path: app/tools/digital-sat-score-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { DigitalSatScoreCalculator } from "@/components/tools/DigitalSatScoreCalculator";
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
  title: "Digital SAT Score Calculator (2026) | Raw to Scaled 1600 & Percentile",
  description:
    "Free interactive Digital SAT score calculator. Calculate your exact Reading & Writing (200-800), Math (200-800), and composite score (400-1600) with multistage adaptive module routing simulation.",
  keywords: [
    "Digital SAT score calculator",
    "Digital SAT raw to scaled converter",
    "SAT module 2 penalty calculator",
    "Digital SAT percentile chart",
    "SAT score estimator 1600",
    "College Board adaptive SAT curve",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/digital-sat-score-calculator`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/tools/digital-sat-score-calculator`,
    },
  },
  openGraph: {
    title: "Digital SAT Score Calculator & Module 2 Simulator (2026)",
    description:
      "Interactive 0ms Digital SAT score calculator. Simulate Reading & Writing and Math scores, Module 2 adaptive routing, and college admission percentiles.",
    url: `${siteConfig.url}/tools/digital-sat-score-calculator`,
    type: "website",
  },
};

const FAQS = [
  {
    question: "How does the Digital SAT scoring system work?",
    answer:
      "The Digital SAT is scored on a scale from 400 to 1600, composed of two sections: Reading and Writing (200-800) and Math (200-800). Each section is multistage adaptive, consisting of Module 1 (routing) and Module 2 (targeted difficulty). Scores are calculated using Item Response Theory (IRT).",
  },
  {
    question: "What is the penalty for getting the easier Module 2 in Digital SAT?",
    answer:
      "If you miss too many questions in Module 1 and route to the easier Module 2, your maximum scaled score for that section is typically capped between 580 and 600, regardless of whether you answer every question in Module 2 correctly.",
  },
  {
    question: "Are there experimental questions on the Digital SAT?",
    answer:
      "Yes. In each section, approximately 4 questions (2 per module) are unscored pretest questions used by College Board to calibrate future exams. These do not count toward your final score, but you cannot distinguish them from scored questions.",
  },
  {
    question: "What is a good Digital SAT score for top universities?",
    answer:
      "A score of 1500+ places you in the 98th percentile, making you competitive for Ivy League institutions (Harvard, MIT, Stanford, Yale). A score of 1400+ places you in the 93rd percentile, competitive for Top 25 national universities and competitive honors programs.",
  },
];

export default function DigitalSatScoreCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    {
      name: "Digital SAT Score Calculator",
      url: `${siteConfig.url}/tools/digital-sat-score-calculator`,
    },
  ];

  const appSchema = toolWebApplicationSchema({
    name: "Digital SAT Score Calculator & Adaptive Routing Simulator",
    url: `${siteConfig.url}/tools/digital-sat-score-calculator`,
    description:
      "Free interactive Digital SAT score calculator with multistage adaptive module routing simulation and College Board percentile conversion.",
    featureList: [
      "Composite scale 400–1600 raw to scaled conversion",
      "Reading & Writing and Math section breakdown",
      "Module 2 adaptive routing penalty simulation",
      "College Board national percentile benchmarking",
    ],
  });

  const datasetSchema = concordanceDatasetSchema({
    name: "Digital SAT Score and College Board Percentile Benchmark Table",
    url: `${siteConfig.url}/tools/digital-sat-score-calculator`,
    description: "Official College Board composite percentile benchmarks and competitive university target profiles.",
    variableMeasured: [
      "Composite Score",
      "National Percentile",
      "Competitive Target Colleges",
      "Recommended Study Action",
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
              <li className="font-semibold text-foreground">Digital SAT Score Calculator</li>
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
                Multistage Adaptive 2026 Model
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              Digital SAT Score Calculator & Curve Estimator
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Calculate your Digital SAT scaled composite score (400–1600) and national percentile from raw correct questions. Toggle Module 2 difficulty to simulate College Board’s adaptive routing penalty in 0ms.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="How Digital SAT Scoring & Adaptive Routing Works"
            summary="The Digital SAT composite score ranges from 400 to 1600, composed of Reading & Writing (200–800) and Math (200–800). Each section consists of two modules. Your performance on Module 1 dynamically routes you to an easier or harder Module 2. Getting routed to the easier Module 2 caps your maximum section score at 580–600."
            formulaOrRule="Composite (400–1600) = Scaled Reading & Writing (200–800) + Scaled Math (200–800) via Item Response Theory (IRT)"
            facts={[
              {
                label: "Ivy League / Elite Target (99th+ %ile)",
                value: "1550 - 1600",
                subtext: "MIT, Stanford, Harvard, Princeton",
              },
              {
                label: "Top 25 Universities (93rd - 96th %ile)",
                value: "1400 - 1470",
                subtext: "NYU, Michigan, UVA, UNC Chapel Hill",
              },
              {
                label: "Module 2 Easy Penalty",
                value: "~590 Cap",
                subtext: "Missing >6-7 in Module 1 blocks scores above 600",
              },
            ]}
          />

          {/* Interactive Calculator Client Component */}
          <div className="mb-12">
            <DigitalSatScoreCalculator />
          </div>

          {/* Structured Guidance & Conversion Table */}
          <div className="space-y-8 border-t border-border/80 pt-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
                Digital SAT Score & Percentile Benchmark Table
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Official College Board percentile benchmarks and target university admission profiles.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Composite Score</th>
                    <th className="py-3 px-4">Percentile</th>
                    <th className="py-3 px-4">Competitive Target</th>
                    <th className="py-3 px-4">Recommended Next Step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">1550 - 1600</td>
                    <td className="py-3 px-4 font-semibold text-primary font-mono">99th+ %ile</td>
                    <td className="py-3 px-4">MIT, Stanford, Harvard, Caltech</td>
                    <td className="py-3 px-4">Lock in essays and high-impact extracurriculars</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">1480 - 1540</td>
                    <td className="py-3 px-4 font-semibold text-primary font-mono">97th - 99th %ile</td>
                    <td className="py-3 px-4">Columbia, Penn, Duke, Northwestern</td>
                    <td className="py-3 px-4">Eliminate minor math trap errors to breach 1550+</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">1400 - 1470</td>
                    <td className="py-3 px-4 font-semibold text-primary font-mono">93rd - 96th %ile</td>
                    <td className="py-3 px-4">NYU, Michigan, UVA, UNC Chapel Hill</td>
                    <td className="py-3 px-4">Drill Standard English Conventions boundaries</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">1300 - 1390</td>
                    <td className="py-3 px-4 font-semibold text-primary font-mono">84th - 92nd %ile</td>
                    <td className="py-3 px-4">Major State Flagships, Honors Colleges</td>
                    <td className="py-3 px-4">Target Algebra & Advanced Math quadratic factoring</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">1150 - 1290</td>
                    <td className="py-3 px-4 font-semibold text-primary font-mono">65th - 83rd %ile</td>
                    <td className="py-3 px-4">Selective Public & Private Universities</td>
                    <td className="py-3 px-4">Master pacing in Reading & Writing Module 1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Strategic Practice CTA */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">
                  Ready to stop missing Digital SAT trap questions?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Practice high-frequency math traps, grammar boundaries, and vocabulary-in-context with real-time distractor feedback.
                </p>
              </div>
              <Link
                href="/practice/sat"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
              >
                <span>Start SAT Practice Drill</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
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
