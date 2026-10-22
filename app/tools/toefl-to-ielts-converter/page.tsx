// Path: app/tools/toefl-to-ielts-converter/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { ToeflToIeltsConverter } from "@/components/tools/ToeflToIeltsConverter";
import StructuredData, {
  breadcrumbSchema,
  faqPageSchema,
  toolWebApplicationSchema,
  concordanceDatasetSchema,
} from "@/components/seo/StructuredData";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { siteConfig } from "@/config/site";
import { ArrowLeftRight, CheckCircle2, ChevronRight, BookOpen, Target, Sparkles } from "lucide-react";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "TOEFL to IELTS Score Converter (2026) | Concordance Chart & Bands",
  description:
    "Free interactive TOEFL iBT to IELTS score converter. Convert TOEFL composite (0-120) and section scores to official IELTS Academic bands (0-9.0) using verified ETS research.",
  keywords: [
    "TOEFL to IELTS converter",
    "TOEFL iBT to IELTS score chart",
    "convert 100 TOEFL to IELTS",
    "ETS IELTS score concordance",
    "TOEFL 90 IELTS equivalent",
    "IELTS vs TOEFL score comparison",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tools/toefl-to-ielts-converter`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/tools/toefl-to-ielts-converter`,
    },
  },
  openGraph: {
    title: "TOEFL to IELTS Score Converter (2026 Concordance)",
    description:
      "Interactive 0ms TOEFL to IELTS conversion tool. Translate TOEFL iBT scores (0-120) to IELTS bands with official admissions concordance tables.",
    url: `${siteConfig.url}/tools/toefl-to-ielts-converter`,
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is 100 on TOEFL equivalent to in IELTS?",
    answer:
      "A score of 100 on the TOEFL iBT corresponds directly to Band 7.0 on the IELTS Academic. Scores between 94 and 101 map to IELTS Band 7.0, which satisfies the requirement for the vast majority of Tier 1 US universities.",
  },
  {
    question: "What TOEFL score corresponds to IELTS Band 7.5?",
    answer:
      "An IELTS Band 7.5 corresponds to a TOEFL iBT score between 102 and 109. This is the typical cutoff for Ivy League graduate programs and elite professional degrees.",
  },
  {
    question: "Is this converter based on official data?",
    answer:
      "Yes. The conversion algorithm is based directly on Educational Testing Service (ETS) official concordance research studying thousands of test-takers who completed both examinations.",
  },
  {
    question: "Do universities prefer TOEFL or IELTS?",
    answer:
      "Virtually all major US, UK, Canadian, and Australian universities accept both exams without penalty. While US institutions historically favored TOEFL and UK/Commonwealth universities favored IELTS, both are treated equally in modern holistic admissions.",
  },
];

export default function ToeflToIeltsConverterPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    {
      name: "TOEFL to IELTS Converter",
      url: `${siteConfig.url}/tools/toefl-to-ielts-converter`,
    },
  ];

  const appSchema = toolWebApplicationSchema({
    name: "TOEFL to IELTS Score Converter",
    url: `${siteConfig.url}/tools/toefl-to-ielts-converter`,
    description:
      "Instant interactive converter between TOEFL iBT composite scores and IELTS Academic band levels based on ETS concordance studies.",
    featureList: [
      "Official ETS research concordance translation",
      "Composite (0–120) to IELTS Band (0–9.0) mapping",
      "CEFR language framework calibration",
      "University admissions minimum cutoffs",
    ],
  });

  const datasetSchema = concordanceDatasetSchema({
    name: "Official TOEFL iBT to IELTS Academic Concordance Table",
    url: `${siteConfig.url}/tools/toefl-to-ielts-converter`,
    description: "Verified concordance dataset developed by Educational Testing Service (ETS) for international student university admissions.",
    variableMeasured: [
      "IELTS Band",
      "TOEFL iBT Total Score",
      "CEFR Level",
      "University Admissions Baseline",
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
              <li className="font-semibold text-foreground">TOEFL to IELTS Converter</li>
            </ol>
          </nav>

          {/* Heading - Fast Answer */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Free Interactive Micro-Tool
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Official ETS Research Model
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              TOEFL to IELTS Score Converter
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Convert your TOEFL iBT score (0–120) into the equivalent IELTS Academic band score (0–9.0). Grounded in empirical ETS concordance tables for graduate and undergraduate admissions.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="How TOEFL iBT and IELTS Scores Compare"
            summary="TOEFL iBT (0–120) and IELTS Academic (0–9.0) concordance is based on official ETS empirical research. A TOEFL score of 100 corresponds to IELTS Band 7.0 (scores 94–101 map to 7.0). Scores of 102–109 correspond to IELTS 7.5, and 110–114 map to IELTS 8.0."
            formulaOrRule="ETS Concordance: TOEFL 100 = IELTS Band 7.0 | TOEFL 105 = IELTS Band 7.5 | TOEFL 110 = IELTS Band 8.0"
            facts={[
              {
                label: "TOEFL 100 Equivalent",
                value: "IELTS Band 7.0",
                subtext: "Universal cutoff for Top 50-100 US & UK colleges",
              },
              {
                label: "TOEFL 105+ Equivalent",
                value: "IELTS Band 7.5",
                subtext: "Required for Ivy League & elite graduate degrees",
              },
              {
                label: "TOEFL 115+ Equivalent",
                value: "IELTS Band 8.5 - 9.0",
                subtext: "CEFR C2 Mastery (Oxford, Cambridge, HBS)",
              },
            ]}
          />

          {/* Interactive Component */}
          <div className="mb-12">
            <ToeflToIeltsConverter />
          </div>

          {/* Concordance Grid */}
          <div className="space-y-8 border-t border-border/80 pt-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
                Official TOEFL iBT to IELTS Concordance Table
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Verified score ranges used by international university admissions offices.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">IELTS Band</th>
                    <th className="py-3 px-4">TOEFL iBT Total</th>
                    <th className="py-3 px-4">CEFR Level</th>
                    <th className="py-3 px-4">University Admissions Baseline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 9.0</td>
                    <td className="py-3 px-4 font-mono font-semibold text-primary">118 - 120</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C2 (Mastery)</td>
                    <td className="py-3 px-4">Oxford, Cambridge, Harvard Law & Medical</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 8.5</td>
                    <td className="py-3 px-4 font-mono">115 - 117</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C2 (Mastery)</td>
                    <td className="py-3 px-4">Exceeds all graduate school requirements</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 8.0</td>
                    <td className="py-3 px-4 font-mono">110 - 114</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C1 (Proficient)</td>
                    <td className="py-3 px-4">Harvard Business School, Stanford, MIT</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 7.5</td>
                    <td className="py-3 px-4 font-mono">102 - 109</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C1 (Proficient)</td>
                    <td className="py-3 px-4">Selective US Top 20 Universities</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 7.0</td>
                    <td className="py-3 px-4 font-mono">94 - 101</td>
                    <td className="py-3 px-4 font-semibold text-foreground">C1 (Proficient)</td>
                    <td className="py-3 px-4">Universal direct entry standard (Top 50-100)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 6.5</td>
                    <td className="py-3 px-4 font-mono">79 - 93</td>
                    <td className="py-3 px-4 font-semibold text-foreground">B2 (Vantage)</td>
                    <td className="py-3 px-4">Standard Undergraduate & STEM entry</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground font-mono">Band 6.0</td>
                    <td className="py-3 px-4 font-mono">60 - 78</td>
                    <td className="py-3 px-4">B2 (Vantage)</td>
                    <td className="py-3 px-4">Conditional entry / Foundation programs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cross-Link Callout */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">
                  Need an in-depth comparison of both tests?
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
