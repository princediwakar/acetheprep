// Path: app/compare/ielts-vs-toefl/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import StructuredData, { breadcrumbSchema, faqPageSchema } from "@/components/seo/StructuredData";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { Scale, CheckCircle2, ChevronRight, Check, X, ArrowRight, BookOpen, Sparkles, Mic, Volume2 } from "lucide-react";
import type { WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "IELTS vs TOEFL (2026): Which English Test Should You Take?",
  description:
    "Definitive architectural comparison between IELTS Academic and TOEFL iBT. Side-by-side section analysis, human speaking interview vs computer mic, scoring concordance, and university acceptance in the US, UK, and Canada.",
  keywords: [
    "IELTS vs TOEFL",
    "is IELTS easier than TOEFL",
    "IELTS or TOEFL for US universities",
    "IELTS speaking vs TOEFL speaking",
    "TOEFL vs IELTS score conversion",
    "English proficiency test comparison 2026",
  ],
  alternates: {
    canonical: `${siteConfig.url}/compare/ielts-vs-toefl`,
    types: {
      "text/markdown": `${siteConfig.url}/api/knowledge/compare/ielts-vs-toefl`,
    },
  },
  openGraph: {
    title: "IELTS vs TOEFL (2026): Definitive Head-to-Head Comparison",
    description:
      "Which test is right for you? Compare IELTS Academic and TOEFL iBT speaking formats, listening accents, scoring scales, and university admission requirements.",
    url: `${siteConfig.url}/compare/ielts-vs-toefl`,
    type: "article",
  },
};

const FAQS = [
  {
    question: "Do US universities prefer TOEFL over IELTS?",
    answer:
      "No. Virtually 100% of US universities (including all Ivy League institutions, Stanford, and MIT) accept both IELTS and TOEFL equally. Admissions committees do not penalize applicants for submitting one over the other.",
  },
  {
    question: "Is the Speaking section easier on IELTS or TOEFL?",
    answer:
      "It depends on your psychological preference. IELTS features a real 1-on-1 conversation with a human certified examiner, allowing natural conversational body language and clarification requests. TOEFL requires speaking into a microphone with rigid 45-60 second timers in a room where other test-takers are speaking simultaneously.",
  },
  {
    question: "Which test is shorter in 2026?",
    answer:
      "The TOEFL iBT is shorter. Following its major 2023 restructuring, TOEFL takes just under 2 hours (approx 1 hour 56 minutes). IELTS Academic takes approximately 2 hours and 45 minutes across all four sections.",
  },
  {
    question: "Can I take IELTS or TOEFL at home?",
    answer:
      "Yes. Both exams offer remote proctored options: IELTS Online and TOEFL iBT Home Edition. However, confirm with your target university or visa authority, as some immigration agencies (such as UKVI and Australian Home Affairs) mandate in-person test centre scores.",
  },
  {
    question: "What are the hardest question types in each exam?",
    answer:
      "In IELTS Academic, students struggle most with 'True / False / Not Given' reading traps and Task 1 graph synthesis. In TOEFL iBT, students struggle most with Integrated Speaking and Integrated Writing, which require synthesizing a recorded audio lecture with a conflicting reading passage.",
  },
];

export default function IeltsVsToeflComparisonPage() {
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/` },
    { name: "Comparisons", url: `${siteConfig.url}/compare` },
    { name: "IELTS vs TOEFL", url: `${siteConfig.url}/compare/ielts-vs-toefl` },
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
              <li className="font-semibold text-foreground">IELTS vs TOEFL</li>
            </ol>
          </nav>

          {/* Page Heading - Answer First (LLM Chunk Optimization) */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Scale className="h-3.5 w-3.5" />
                Architectural Breakdown
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Updated for 2026 Admissions
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              IELTS vs TOEFL: Which Test Should You Take in 2026?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              An objective, data-driven comparison of IELTS Academic and TOEFL iBT. Both are universally accepted for global university admissions, but their testing interfaces, speaking formats, and cognitive demands cater to entirely different test-taker profiles.
            </p>
          </div>

          {/* AI Overview / Featured Snippet Direct Answer Card */}
          <DirectAnswerCard
            title="Executive Verdict: IELTS Academic vs TOEFL iBT"
            summary="Both IELTS Academic and TOEFL iBT are accepted with zero distinction at 100% of Ivy League and global top 100 universities. Take IELTS if you communicate more comfortably talking face-to-face with a human examiner and prefer diverse question formats. Take TOEFL if you type faster than you write, prefer speaking into a computer microphone with exact countdown timers, and want a shorter 2-hour testing session."
            formulaOrRule="Admissions Policy: Equal global acceptance across US, UK, Canada, Australia; neither test confers an admissions preference."
            facts={[
              {
                label: "Speaking Evaluation",
                value: "IELTS (Human) vs TOEFL (AI + Mic)",
                subtext: "IELTS is a 1-on-1 conversational interview",
              },
              {
                label: "Testing Duration",
                value: "IELTS (~2h 45m) vs TOEFL (<2h)",
                subtext: "TOEFL restructured to under 2 hours in 2023",
              },
              {
                label: "Question Modality",
                value: "IELTS (Mixed formats) vs TOEFL (Multiple Choice)",
                subtext: "IELTS tests fill-in-blanks & True/False/Not Given",
              },
            ]}
          />

          {/* Side-by-Side Architectural Comparison Table */}
          <div className="space-y-4 mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              Side-by-Side Architectural Comparison
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="py-3.5 px-4 w-1/4">Specification</th>
                    <th className="py-3.5 px-4 w-3/8 text-primary font-bold">IELTS Academic</th>
                    <th className="py-3.5 px-4 w-3/8 text-foreground font-bold">TOEFL iBT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Governing Body</td>
                    <td className="py-3.5 px-4">British Council, IDP, Cambridge English</td>
                    <td className="py-3.5 px-4">Educational Testing Service (ETS)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Total Duration</td>
                    <td className="py-3.5 px-4 font-medium text-foreground">2 hours 45 minutes</td>
                    <td className="py-3.5 px-4 font-bold text-primary">1 hour 56 minutes (Shorter)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Scoring Scale</td>
                    <td className="py-3.5 px-4 font-mono">0.0 to 9.0 (0.5 band steps)</td>
                    <td className="py-3.5 px-4 font-mono">0 to 120 (1-point increments)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Speaking Test Format</td>
                    <td className="py-3.5 px-4 text-primary font-medium">
                      1-on-1 human interview (11–14 mins)
                    </td>
                    <td className="py-3.5 px-4">
                      Microphone recordings with rigid timers (16 mins)
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Listening Accents</td>
                    <td className="py-3.5 px-4">British, Australian, New Zealand, American</td>
                    <td className="py-3.5 px-4">Primarily North American (US & Canada)</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Reading Questions</td>
                    <td className="py-3.5 px-4">
                      True/False/Not Given, Heading Matching, Fill-in
                    </td>
                    <td className="py-3.5 px-4">
                      Strictly Multiple-choice & Sentence Insert [■]
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Writing Tasks</td>
                    <td className="py-3.5 px-4">
                      Task 1: Graph/Map description (150 words)<br />
                      Task 2: Discursive Essay (250 words)
                    </td>
                    <td className="py-3.5 px-4">
                      Task 1: Integrated lecture synthesis (150–225 words)<br />
                      Task 2: Academic discussion post (100 words)
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Test Delivery</td>
                    <td className="py-3.5 px-4">Computer-based or Paper-based</td>
                    <td className="py-3.5 px-4">Computer-based only</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="py-3.5 px-4 font-semibold text-foreground">Global Acceptance</td>
                    <td className="py-3.5 px-4">12,500+ institutions worldwide</td>
                    <td className="py-3.5 px-4">13,000+ institutions worldwide</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Dive: The Speaking Section Battleground */}
          <div className="space-y-4 mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              The Critical Differentiator: Human Interview vs Computer Microphone
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-bold text-base">
                  <Mic className="h-5 w-5 text-primary" />
                  IELTS Speaking Mechanics
                </div>
                <p>
                  IELTS Speaking is a real interactive conversation with an examiner. You can pause, ask the examiner to repeat a question if you missed it, and leverage natural body language.
                </p>
                <p>
                  Part 2 gives you a physical paper cue card and exactly 1 minute to outline bullet points on pencil and paper before delivering your 2-minute long turn. Many non-native speakers find this conversational format significantly less anxiety-inducing.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-bold text-base">
                  <Volume2 className="h-5 w-5 text-primary" />
                  TOEFL iBT Speaking Mechanics
                </div>
                <p>
                  TOEFL Speaking is conducted in an open computer room. When the speaking section starts, dozens of candidates in the room are speaking into their headsets at the exact same time, which can be noisy and distracting.
                </p>
                <p>
                  You are given 15 to 30 seconds of prep time before an on-screen timer starts beeping. Responses are cut off sharply at the 45- or 60-second mark. Your audio is analyzed by ETS SpeechRater AI plus human certified raters.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Tools Cross-Link Banner */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-foreground">
                Convert your score between IELTS and TOEFL instantly
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Use our free interactive concordance converter to translate TOEFL iBT composite scores (0–120) to IELTS bands.
              </p>
            </div>
            <Link
              href="/tools/toefl-to-ielts-converter"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
            >
              <span>Score Converter Tool</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
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
      </main>
    </>
  );
}
