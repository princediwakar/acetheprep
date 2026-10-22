// Path: app/tools/ielts-band-score-calculator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { IeltsBandScoreCalculator } from "@/components/tools/IeltsBandScoreCalculator";
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
  title: "IELTS Band Score Calculator (2026) | Raw to Overall Band & CEFR",
  description:
    "Free interactive IELTS Academic band score calculator. Calculate your exact Reading, Listening raw scores to band (0-9.0), overall band with official rounding rules, and CEFR level.",
  keywords: [
    "IELTS band calculator",
    "IELTS raw score to band",
    "IELTS overall band rounding",
    "IELTS academic reading score chart",
    "IELTS listening raw score converter",
    "IELTS to CEFR conversion",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/ielts-band-score-calculator`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/tools/ielts-band-score-calculator`,
    },
  },
  openGraph: {
    title: "IELTS Band Score Calculator & Rounding Simulator (2026)",
    description:
      "Interactive 0ms IELTS score calculator. Convert raw Reading & Listening answers into official IELTS bands and calculate overall scores with IDP/British Council rounding algorithms.",
    url: `${siteConfig.url}/tools/ielts-band-score-calculator`,
    type: "website",
  },
};

const FAQS = [
  {
    question: "How is the overall IELTS band score calculated?",
    answer:
      "The overall band score is calculated by taking the average of the four section scores (Listening, Reading, Writing, Speaking). Each section carries equal weight (25%). The average is then rounded to the nearest whole or half band according to official IDP and British Council rounding rules.",
  },
  {
    question: "Does IELTS round up a 6.75 or 6.25?",
    answer:
      "Yes. An average score of 6.25 is rounded UP to 6.5. An average score of 6.75 is rounded UP to 7.0. However, an average of 6.125 rounds down to 6.0.",
  },
  {
    question: "What is the difference in raw scores between Academic and General Reading?",
    answer:
      "Academic Reading requires fewer correct answers for the same band because academic texts are more complex. For example, 30/40 is Band 7.0 in Academic Reading, but requires 34/40 in General Training Reading.",
  },
  {
    question: "What IELTS band is required for top global universities?",
    answer:
      "Most Tier 1 universities (Oxford, Cambridge, Imperial, Harvard, Toronto, Melbourne) require an overall band of 7.0 or 7.5, with no individual sub-score lower than 6.5 or 7.0.",
  },
];

export default function IeltsBandScoreCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    {
      name: "IELTS Band Score Calculator",
      url: `${siteConfig.url}/tools/ielts-band-score-calculator`,
    },
  ];

  const appSchema = toolWebApplicationSchema({
    name: "IELTS Band Score Calculator & CEFR Converter",
    url: `${siteConfig.url}/tools/ielts-band-score-calculator`,
    description:
      "Free interactive IELTS Academic band score calculator with raw-to-band conversion and official upward half-band rounding algorithms.",
    featureList: [
      "Official IDP and British Council upward rounding algorithm",
      "Academic Reading and Listening raw mark converters (out of 40)",
      "CEFR European framework proficiency translation",
      "Section sub-score averaging with 0ms latency",
    ],
  });

  const datasetSchema = concordanceDatasetSchema({
    name: "Official IELTS Academic Reading and Listening Raw-to-Band Concordance Table",
    url: `${siteConfig.url}/tools/ielts-band-score-calculator`,
    description: "Official marks required out of 40 questions to achieve each respective band score (0 to 9.0) and CEFR proficiency classification.",
    variableMeasured: [
      "IELTS Band Score",
      "Listening Raw Score (out of 40)",
      "Academic Reading Raw Score (out of 40)",
      "CEFR Level",
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
              <li className="font-semibold text-foreground">IELTS Band Calculator</li>
            </ol>
          </nav>

          {/* Heading - Fast Answer First */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Calculator className="h-3.5 w-3.5" />
                Free Interactive Micro-Tool
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Official British Council & IDP Algorithm
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              IELTS Band Score Calculator & Rounding Tool
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Calculate your overall IELTS band score (0–9.0) and CEFR proficiency level. Input raw Listening and Reading marks out of 40 to simulate the official upward half-band rounding algorithm in 0ms.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="How IELTS Band Scoring & Official Rounding Works"
            summary="The overall IELTS band score is calculated by taking the average of all four sub-scores (Listening, Reading, Writing, Speaking), weighted at 25% each. The average is rounded to the nearest half or whole band: an average ending in .25 rounds UP to .50, and an average ending in .75 rounds UP to the next whole band."
            formulaOrRule="Overall Band = OfficialRound( (Listening + Reading + Writing + Speaking) / 4 ) where .25 -> .5 and .75 -> 1.0"
            facts={[
              {
                label: "Upward Rounding Rule",
                value: "6.25 → 6.5 / 6.75 → 7.0",
                subtext: "Only averages under .125 or .625 round down",
              },
              {
                label: "Band 7.0 Target Marks",
                value: "30 - 32 / 40",
                subtext: "Required for Tier 1 US/UK universities",
              },
              {
                label: "Band 8.0+ Target Marks",
                value: "35 - 36 / 40",
                subtext: "C1 Proficient / Oxford & Cambridge baseline",
              },
            ]}
          />

          {/* Interactive Calculator Client Component */}
          <div className="mb-12">
            <IeltsBandScoreCalculator />
          </div>

          {/* Raw Score to Band Concordance Table */}
          <div className="space-y-8 border-t border-border/80 pt-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
                Academic Reading & Listening Raw Score Table
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Official marks required out of 40 questions to achieve each respective band score.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Band Score</th>
                    <th className="py-3 px-4">Listening (out of 40)</th>
                    <th className="py-3 px-4">Academic Reading (out of 40)</th>
                    <th className="py-3 px-4">CEFR Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 9.0</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">39 - 40</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">39 - 40</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C2 (Mastery)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 8.5</td>
                    <td className="py-3 px-4 font-mono">37 - 38</td>
                    <td className="py-3 px-4 font-mono">37 - 38</td>
                    <td className="py-3 px-4">C2 (Mastery)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 8.0</td>
                    <td className="py-3 px-4 font-mono">35 - 36</td>
                    <td className="py-3 px-4 font-mono">35 - 36</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C1 (Proficient)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 7.5</td>
                    <td className="py-3 px-4 font-mono">32 - 34</td>
                    <td className="py-3 px-4 font-mono">33 - 34</td>
                    <td className="py-3 px-4">C1 (Proficient)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 7.0</td>
                    <td className="py-3 px-4 font-mono">30 - 31</td>
                    <td className="py-3 px-4 font-mono">30 - 32</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C1 (Proficient)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 6.5</td>
                    <td className="py-3 px-4 font-mono">26 - 29</td>
                    <td className="py-3 px-4 font-mono">27 - 29</td>
                    <td className="py-3 px-4 font-semibold text-foreground">B2 (Vantage)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 6.0</td>
                    <td className="py-3 px-4 font-mono">23 - 25</td>
                    <td className="py-3 px-4 font-mono">23 - 26</td>
                    <td className="py-3 px-4">B2 (Vantage)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cross-Link Callout */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">
                  Deciding between IELTS and TOEFL?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Read our head-to-head structural comparison: human speaking interview vs computer mic, keyboard differences, and scoring conversions.
                </p>
              </div>
              <Link
                href="/compare/ielts-vs-toefl"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
              >
                <span>Read IELTS vs TOEFL Guide</span>
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
