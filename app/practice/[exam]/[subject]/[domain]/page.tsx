// Path: app/practice/[exam]/[subject]/[domain]/page.tsx

import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import PracticeQuestion from "@/components/practice/PracticeQuestion";
import ExamCTABanner from "@/components/practice/ExamCTABanner";
import StructuredData, {
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/seo/StructuredData";
import Link from "next/link";
import type { Question } from "@/lib/schemas/quiz";
import type { WithContext } from "schema-dts";
import {
  resolvePracticeParams,
  getAllTaxonomyEntries,
  examToSlug,
  subjectToSlug,
  domainToSlug,
} from "@/lib/slugs";
import { siteConfig } from "@/config/site";
import taxonomyRaw from "@/lib/taxonomies.json";
import demoQuestionsRaw from "@/lib/demo-questions.json";
import { getDomainKnowledge } from "@/lib/curriculum-knowledge";
import {
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

// ---- Types ----

interface PracticePageProps {
  params: Promise<{ exam: string; subject: string; domain: string }>;
}

interface PracticeRow {
  questions_json: Question[];
}

const baseUrl = siteConfig.url;

// ---- generateStaticParams ----
export async function generateStaticParams() {
  const entries = getAllTaxonomyEntries();
  return entries.map((e) => ({
    exam: e.examSlug,
    subject: e.subjectSlug,
    domain: e.domainSlug,
  }));
}

// ---- generateMetadata ----

export async function generateMetadata({
  params,
}: PracticePageProps): Promise<Metadata> {
  const { exam, subject, domain } = await params;
  const resolution = resolvePracticeParams(exam, subject, domain);

  const examName = resolution.canonicalExam;
  const subjectName = resolution.canonicalSubject;
  const domainName = resolution.canonicalDomain;

  const title = `${domainName} Practice Questions for ${examName} | ${siteConfig.name}`;
  const description = `Free ${domainName} practice questions for ${examName} ${subjectName}. AI-generated diagnostic questions with cognitive-science distractor analysis. Test your retention now.`;
  const canonicalUrl = `${baseUrl}${resolution.canonicalPath}`;
  const markdownUrl = `${baseUrl}/api/knowledge/${examToSlug(examName)}/${subjectToSlug(subjectName)}/${domainToSlug(domainName)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      types: {
        "text/markdown": markdownUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/api/og?type=practice&title=${encodeURIComponent(domainName)}&topic=${encodeURIComponent(examName)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    keywords: [
      domainName,
      subjectName,
      examName,
      "practice questions",
      "free test prep",
      "distractor analysis",
      "AI-generated questions",
      `${examName} preparation`,
      `${domainName} notes`,
      `${domainName} formulas`,
    ],
  };
}

// ---- Page Component ----

export default async function PracticePage({ params }: PracticePageProps) {
  const { exam, subject, domain } = await params;
  const resolution = resolvePracticeParams(exam, subject, domain);

  // If accessed via non-canonical path (e.g. legacy /practice/JEE%20Main/...), 301 redirect to canonical slug
  if (resolution.isValid && !resolution.isCanonicalSlug) {
    permanentRedirect(resolution.canonicalPath);
  }

  const examName = resolution.canonicalExam;
  const subjectName = resolution.canonicalSubject;
  const domainName = resolution.canonicalDomain;

  let row: PracticeRow | null = null;

  try {
    const { data, error } = await supabaseAdmin
      .from("practice_questions")
      .select("questions_json")
      .eq("exam_name", examName)
      .eq("subject", subjectName)
      .eq("domain", domainName)
      .single();

    if (!error && data) {
      row = data as unknown as PracticeRow;
    }
  } catch {
    // Graceful fallback to verified curriculum below
  }

  const taxonomyMap = taxonomyRaw as unknown as Record<
    string,
    Record<string, string[]>
  >;
  const isCurriculumDomain =
    taxonomyMap[examName]?.[subjectName]?.includes(domainName);

  if (!isCurriculumDomain) {
    notFound();
  }

  let questions: Question[] = [];
  if (row && Array.isArray(row.questions_json) && row.questions_json.length > 0) {
    questions = row.questions_json;
  } else {
    // Gracefully seed from verified demo questions so search engines & students never hit a dead-end
    const demoMap = demoQuestionsRaw as unknown as {
      exams: Record<string, { question: Question }>;
    };
    const sampleQuestion = demoMap.exams[examName]?.question;

    if (sampleQuestion) {
      questions = [
        {
          ...sampleQuestion,
          skill_domain: domainName,
          topics: [domainName, subjectName],
        },
      ];
    } else {
      notFound();
    }
  }

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);
  const domainSlug = domainToSlug(domainName);

  // Get rich curriculum domain knowledge & FAQs
  const knowledge = getDomainKnowledge(examName, subjectName, domainName);

  // Get other sibling domains in this subject for topological internal linking
  const siblingDomains = (taxonomyMap[examName]?.[subjectName] || []).filter(
    (d) => d !== domainName,
  );

  // Build breadcrumb items with clean canonical URLs
  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
    { name: examName, url: `${baseUrl}/practice/${examSlug}` },
    {
      name: subjectName,
      url: `${baseUrl}/practice/${examSlug}/${subjectSlug}`,
    },
    {
      name: domainName,
      url: `${baseUrl}/practice/${examSlug}/${subjectSlug}/${domainSlug}`,
    },
  ];

  // Build structured data schemas
  const quizSchema: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${domainName} Practice Questions - ${examName}`,
    description: `Free ${domainName} practice questions for ${examName} ${subjectName}. Cognitive-science distractor analysis explains why specific wrong answers are chosen.`,
    educationalLevel: examName,
    about: { "@type": "Thing", name: domainName },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name:
        q.question_text.length > 110
          ? q.question_text.slice(0, 107) + "..."
          : q.question_text,
      suggestedAnswer: Object.entries(q.options).map(([label, text]) => ({
        "@type": "Answer",
        text: `${label}) ${text}`,
      })),
      acceptedAnswer: {
        "@type": "Answer",
        text: `${q.correct_option}) ${q.options[q.correct_option] ?? ""}`,
      },
    })),
  } as WithContext<any>;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${examName} ${subjectName}: ${domainName}`,
    description: `Curriculum-verified diagnostic module and spaced repetition drills for ${domainName} in ${examName}.`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    educationalLevel: examName,
  };

  return (
    <>
      <StructuredData
        schema={breadcrumbSchema(breadcrumbItems) as WithContext<any>}
      />
      <StructuredData schema={quizSchema} />
      <StructuredData schema={courseSchema as WithContext<any>} />
      <StructuredData
        schema={faqPageSchema(knowledge.faqs) as WithContext<any>}
      />

      <div className="mx-auto max-w-4xl pt-28 pb-16 px-4 sm:px-6">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none text-slate-400">/</li>
            <li>
              <Link
                href="/practice"
                className="hover:text-primary transition-colors"
              >
                Practice
              </Link>
            </li>
            <li className="select-none text-slate-400">/</li>
            <li>
              <Link
                href={`/practice/${examSlug}`}
                className="hover:text-primary transition-colors"
              >
                {examName}
              </Link>
            </li>
            <li className="select-none text-slate-400">/</li>
            <li>
              <Link
                href={`/practice/${examSlug}/${subjectSlug}`}
                className="hover:text-primary transition-colors"
              >
                {subjectName}
              </Link>
            </li>
            <li className="select-none text-slate-400">/</li>
            <li className="font-semibold text-primary truncate max-w-[200px] sm:max-w-none">
              {domainName}
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Syllabus
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-500">
              <TrendingUp className="h-3.5 w-3.5" />
              {knowledge.weightageTier}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {knowledge.typicalQuestionCount}
            </span>
          </div>

          <h1 className="mb-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-heading">
            {domainName} Practice Questions & Solutions
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Authentic {examName} ({subjectName}) practice problems with step-by-step solutions showing you exactly why common wrong choices are traps.
          </p>
        </div>

        {/* Core Principles & Key Formulas */}
        <div className="mb-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 text-foreground font-semibold text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
            <span>Core Principles & Key Formulas</span>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
            {knowledge.corePrinciples.map((principle, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground mt-0.5">
                  {idx + 1}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary Exam Trap Card */}
        <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-400 font-semibold text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <span>Most Common Trap: {knowledge.primaryDistractorTrap.trapName}</span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed mb-3">
            {knowledge.primaryDistractorTrap.description}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-amber-500/20 text-xs">
            <div>
              <span className="font-semibold text-amber-600 dark:text-amber-400">Why Students Fail:</span>
              <p className="mt-0.5 text-muted-foreground leading-normal">
                {knowledge.primaryDistractorTrap.whyStudentsFail}
              </p>
            </div>
            <div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Prevention Rule:</span>
              <p className="mt-0.5 text-muted-foreground leading-normal">
                {knowledge.primaryDistractorTrap.preventionRule}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Questions Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              Practice Questions & Explanations
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              Interactive Practice
            </span>
          </div>
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <PracticeQuestion key={idx} question={q} index={idx} />
            ))}
          </div>
        </div>

        {/* Topological Cross-Links: Related Domains in Subject */}
        {siblingDomains.length > 0 && (
          <div className="mb-10 rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">
                More {subjectName} Topics for {examName}
              </h3>
              <Link
                href={`/practice/${examSlug}/${subjectSlug}`}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                View all {siblingDomains.length + 1} topics
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {siblingDomains.slice(0, 8).map((sibling) => (
                <Link
                  key={sibling}
                  href={`/practice/${examSlug}/${subjectSlug}/${domainToSlug(sibling)}`}
                  className="rounded-lg border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
                >
                  {sibling}
                </Link>
              ))}
            </div>
          </div>
        )}


        {/* FAQ Section for SEO / GEO Rich Snippets */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Frequently Asked Questions about {domainName} ({examName})
          </h3>
          <div className="space-y-4">
            {knowledge.faqs.map((faq, i) => (
              <div
                key={i}
                className="border-t border-border/50 pt-4 first:border-none first:pt-0"
              >
                <h4 className="font-semibold text-sm text-foreground">
                  {faq.question}
                </h4>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10">
          <ExamCTABanner examName={examName} />
        </div>
      </div>
    </>
  );
}
