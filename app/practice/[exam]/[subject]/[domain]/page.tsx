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

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { exam, subject, domain } = await params;
  const resolution = resolvePracticeParams(exam, subject, domain);

  const examName = resolution.canonicalExam;
  const subjectName = resolution.canonicalSubject;
  const domainName = resolution.canonicalDomain;

  const title = `${domainName} Practice Questions for ${examName} | ${siteConfig.name}`;
  const description = `Free ${domainName} practice questions for ${examName} ${subjectName}. AI-generated questions with detailed explanations and distractor analysis. Test your knowledge now.`;
  const canonicalUrl = `${baseUrl}${resolution.canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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
  let fetchError: string | null = null;

  try {
    const { data, error } = await supabaseAdmin
      .from("practice_questions")
      .select("questions_json")
      .eq("exam_name", examName)
      .eq("subject", subjectName)
      .eq("domain", domainName)
      .single();

    if (error) {
      fetchError = error.message;
    } else if (data) {
      row = data as unknown as PracticeRow;
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Failed to load practice questions";
  }

  let questions: Question[] = [];
  if (row && Array.isArray(row.questions_json) && row.questions_json.length > 0) {
    questions = row.questions_json;
  } else {
    // Check if this domain is a valid member of the official curriculum
    const taxonomyMap = taxonomyRaw as unknown as Record<string, Record<string, string[]>>;
    const isCurriculumDomain = taxonomyMap[examName]?.[subjectName]?.includes(domainName);

    if (!isCurriculumDomain) {
      notFound();
    }

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
          topics: [domainName],
        },
      ];
    } else {
      notFound();
    }
  }

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);
  const domainSlug = domainToSlug(domainName);

  // Build breadcrumb items with clean canonical URLs
  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
    { name: examName, url: `${baseUrl}/practice/${examSlug}` },
    { name: subjectName, url: `${baseUrl}/practice/${examSlug}/${subjectSlug}` },
    { name: domainName, url: `${baseUrl}/practice/${examSlug}/${subjectSlug}/${domainSlug}` },
  ];

  // Build structured data schemas
  const quizSchema: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${domainName} Practice Questions - ${examName}`,
    description: `Free ${domainName} practice questions for ${examName} ${subjectName}. AI-generated with detailed explanations and distractor deconstruction.`,
    educationalLevel: examName,
    about: { "@type": "Thing", name: domainName },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.question_text.length > 110 ? q.question_text.slice(0, 107) + "..." : q.question_text,
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

  const faqs = [
    {
      question: `What are the most common mistakes in ${domainName} for ${examName}?`,
      answer: `Students commonly struggle with subtle distractor traps such as algebraic sign inversions, unit mismatches, and boundary condition misinterpretations. ${siteConfig.name}'s distractor analysis engine breaks down each trap option.`,
    },
    {
      question: `Are these ${domainName} practice questions free?`,
      answer: `Yes, all ${domainName} practice questions and detailed distractor explanations on ${siteConfig.name} are 100% free with no sign-up or credit card required.`,
    },
  ];

  return (
    <>
      <StructuredData schema={breadcrumbSchema(breadcrumbItems) as WithContext<any>} />
      <StructuredData schema={quizSchema} />
      <StructuredData schema={faqPageSchema(faqs) as WithContext<any>} />

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="select-none">/</li>
            <li>
              <Link href="/practice" className="hover:text-primary transition-colors">
                Practice
              </Link>
            </li>
            <li className="select-none">/</li>
            <li>
              <Link
                href={`/practice/${examSlug}`}
                className="hover:text-primary transition-colors"
              >
                {examName}
              </Link>
            </li>
            <li className="select-none">/</li>
            <li>
              <Link
                href={`/practice/${examSlug}/${subjectSlug}`}
                className="hover:text-primary transition-colors"
              >
                {subjectName}
              </Link>
            </li>
            <li className="select-none">/</li>
            <li className="font-medium text-primary">
              {domainName}
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <span>Verified Curriculum</span>
            <span>•</span>
            <span>{examName}</span>
          </div>
          <h1 className="mb-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {domainName} Practice Questions
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Authentic {examName} ({subjectName}) practice problems. Each question includes real-time distractor analysis identifying the exact student misconception behind every wrong choice.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <PracticeQuestion key={idx} question={q} index={idx} />
          ))}
        </div>

        {/* FAQ Section for SEO / GEO Rich Snippets */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-border/50 pt-3 first:border-none first:pt-0">
                <h4 className="font-medium text-sm text-foreground">{faq.question}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
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
