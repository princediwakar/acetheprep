// Path: app/compare/gmat-focus-vs-gre/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ExamDecisionQuiz } from "@/components/compare/ExamDecisionQuiz";
import StructuredData, { breadcrumbSchema, faqPageSchema } from "@/components/seo/StructuredData";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { Scale, CheckCircle2, ChevronRight, Check, X, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "GMAT Focus vs GRE (2026): Which Test Should You Take for MBA Admissions?",
  description:
    "Definitive 2026 comparison between GMAT Focus Edition and GRE General for business school admissions. Side-by-side section analysis, calculator policies, adaptive algorithms, and scoring percentiles.",
  keywords: [
    "GMAT Focus vs GRE",
    "GMAT Focus or GRE for MBA",
    "is GRE easier than GMAT Focus",
    "GMAT Focus vs GRE calculator",
    "MBA admissions test comparison 2026",
    "GMAT Focus vs GRE percentiles",
  ],
  alternates: {
    canonical: `${siteConfig.url}/compare/gmat-focus-vs-gre`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/compare/gmat-focus-vs-gre`,
    },
  },
  openGraph: {
    title: "GMAT Focus vs GRE (2026): Definitive Head-to-Head Comparison",
    description:
      "Which test is right for you? Compare GMAT Focus and GRE section formats, calculator policies, adaptive mechanics, and business school acceptance data.",
    url: `${siteConfig.url}/compare/gmat-focus-vs-gre`,
    type: "article",
  },
};

const FAQS = [
  {
    question: "Do top business schools (Harvard, Stanford, Wharton) prefer the GMAT Focus over the GRE?",
    answer:
      "No. All M7 and top European business schools (including INSEAD and London Business School) state unequivocally that they view GMAT Focus and GRE scores without bias. Over 35% of recent Stanford GSB and Harvard MBA admits submitted GRE scores. The key factor is submitting a strong quantitative percentile.",
  },
  {
    question: "Is the GRE Math easier than GMAT Focus Quantitative Reasoning?",
    answer:
      "Conceptually, yes. GRE Quantitative questions test high-school algebra and geometry with less intricate logic traps, and provide an on-screen calculator. GMAT Focus Quant allows NO calculator and emphasizes deep number properties, data sufficiency, and critical problem-solving.",
  },
  {
    question: "Can I use a calculator on the GMAT Focus Edition?",
    answer:
      "Only in the Data Insights section. The Quantitative Reasoning section on GMAT Focus strictly prohibits calculators. In contrast, the GRE allows an on-screen basic calculator for all Quantitative sections.",
  },
  {
    question: "How does the question review policy differ?",
    answer:
      "On the GRE, you can skip questions and jump forward or backward freely within any 20-question section. On the GMAT Focus, questions appear sequentially and must be answered in order; however, GMAT Focus allows you to bookmark questions and review/edit up to 3 answers per section before time expires.",
  },
  {
    question: "What happened to Geometry on the GMAT Focus?",
    answer:
      "GMAC completely removed formal Euclidean Geometry from the GMAT Focus Edition (except coordinate geometry in Data Insights). The GRE still includes standard geometry (triangles, circles, angles, polygons).",
  },
];

export default function GmatVsGreComparisonPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Comparisons", url: `${siteConfig.url}/compare` },
    { name: "GMAT Focus vs GRE", url: `${siteConfig.url}/compare/gmat-focus-vs-gre` },
  ];

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbs) as WithContext<any>} />
      <StructuredData schema={faqPageSchema(FAQS) as WithContext<any>} />

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
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Comparisons
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-foreground">GMAT Focus vs GRE</li>
            </ol>
          </nav>

          {/* Heading - Answer First */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Scale className="h-3.5 w-3.5" />
                2026 Definitive Test Comparison
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                MBA Admissions Analysis
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              GMAT Focus vs GRE: Which Test Should You Take in 2026?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Choosing between the GMAT Focus Edition and ETS GRE General is the most crucial strategic decision for prospective graduate and business school candidates. Here is the physical breakdown of test structure, calculator policies, adaptive mechanics, and admissions ROI.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="Executive Verdict: GMAT Focus vs GRE"
            summary="Both exams are accepted 100% equally at all M7 and global business schools (over 35% of Stanford GSB and Harvard MBA admits submitted GRE scores). Choose GMAT Focus if you excel in mental math, data interpretation, and critical logic without formal geometry. Choose GRE if you need an on-screen calculator for math, prefer skipping questions freely within sections, or are applying to dual-degree programs."
            formulaOrRule="Admissions Standard: 100% equal acceptance across Top 25 MBA programs; finance & consulting tracks expect an 80th+ percentile Quantitative profile regardless of exam."
            facts={[
              {
                label: "Calculator Policy",
                value: "GMAT (DI Only) vs GRE (All Quant)",
                subtext: "GMAT Quant forbids calculators completely",
              },
              {
                label: "Euclidean Geometry",
                value: "GMAT (Removed) vs GRE (Full)",
                subtext: "No triangle or circle proofs on GMAT Focus",
              },
              {
                label: "Navigation Model",
                value: "GMAT (Edit 3) vs GRE (Skip freely)",
                subtext: "GMAT allows bookmarking & editing up to 3 answers",
              },
            ]}
          />

          {/* Interactive Decision Quiz - Above the Fold */}
          <div className="mb-12">
            <ExamDecisionQuiz />
          </div>

          {/* Head-to-Head Comparison Table */}
          <section className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Side-by-Side Architectural Matrix
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-border/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted text-muted-foreground font-mono text-[11px] uppercase border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 font-bold text-primary">GMAT Focus Edition</th>
                    <th className="py-3 px-4 font-bold text-foreground">ETS GRE General</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium">
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Total Testing Time</td>
                    <td className="py-3 px-4 text-foreground font-bold font-mono">2h 15m (3 × 45m sections)</td>
                    <td className="py-3 px-4 text-foreground font-mono">1h 58m (Shorter GRE)</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Score Range</td>
                    <td className="py-3 px-4 text-primary font-bold font-mono">205 to 805 (ends in 5)</td>
                    <td className="py-3 px-4 text-foreground font-mono">260 to 340 (130-170 per section)</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Calculator Policy</td>
                    <td className="py-3 px-4 text-foreground">
                      <span className="text-amber-500 font-semibold">Data Insights ONLY</span> (No calculator in Quant)
                    </td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">
                      Allowed for ALL Quant sections
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Adaptive Mechanics</td>
                    <td className="py-3 px-4 text-foreground">
                      <strong className="text-primary">Question-adaptive</strong> within each section
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      <strong>Section-adaptive</strong> (Section 2 adapts to Section 1)
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Question Navigation</td>
                    <td className="py-3 px-4 text-foreground">
                      Sequential only; edit up to 3 answers at end
                    </td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">
                      Freely skip, mark, and jump within section
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Geometry Included?</td>
                    <td className="py-3 px-4 text-foreground">
                      <span className="text-emerald-500 font-bold">NO</span> (Formal geometry removed)
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      <span className="text-amber-500 font-bold">YES</span> (Triangles, polygons, circles)
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Essay Section?</td>
                    <td className="py-3 px-4 text-emerald-500 font-bold">NO (AWA eliminated)</td>
                    <td className="py-3 px-4 text-muted-foreground font-semibold">YES (One 30-min Issue Essay)</td>
                  </tr>
                  <tr className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-semibold">Business School Bias</td>
                    <td className="py-3 px-4 text-foreground">100% accepted globally</td>
                    <td className="py-3 px-4 text-foreground">100% accepted globally</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Deep Qualitative Breakdown */}
          <section className="mb-12 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Strategic Decision Guide: Which Student Profile Are You?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Take the GMAT Focus if... */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-base text-foreground">Take the GMAT Focus if:</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>You hate memorizing vocabulary:</strong> Sentence Correction is gone; you only need logical reasoning and reading comprehension.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>You excel at data analysis:</strong> The Data Insights section tests real-world business acumen (tables, multi-source reasoning, graphs).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>You struggle with Geometry:</strong> Formal geometric proofs and theorem memorization are completely eliminated.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>You want zero essay writing:</strong> There is no Analytical Writing Assessment on GMAT Focus.</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/practice/gmat-focus"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Browse GMAT Focus syllabus drills</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Take the GRE if... */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-bold text-base text-foreground">Take the GRE if:</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">•</span>
                    <span><strong>You need an on-screen calculator:</strong> You have high anxiety regarding mental arithmetic and manual division.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">•</span>
                    <span><strong>You like skipping around:</strong> Section-adaptive testing allows you to answer easy questions first and return to hard ones later.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">•</span>
                    <span><strong>You have a photographic vocabulary:</strong> Flashcard memorization of 1,000+ GRE words is an easy task for you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground font-bold">•</span>
                    <span><strong>You are applying to dual degrees:</strong> GRE scores can be simultaneously submitted to MBA, MPP, and STEM graduate programs.</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/practice/gre"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Browse GRE trap questions</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs with JSON-LD Schema */}
          <section className="mb-12 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Frequently Asked Questions About GMAT Focus vs GRE
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

          {/* Interlinked Score Calculator CTA */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-foreground">
                Already have a GRE score?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Use our free concordance converter to translate your GRE Quant and Verbal scores into a GMAT Focus composite score.
              </p>
            </div>
            <Link
              href="/tools/gre-to-gmat-converter"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
            >
              <span>Launch Score Converter</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
