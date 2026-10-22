// Path: app/practice/[exam]/[subject]/[domain]/page.tsx

import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { TopicPracticeDrill } from "@/components/practice/TopicPracticeDrill";
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
import { ALL_BANKS } from "@/lib/data/banks";
import { getDomainKnowledge } from "@/lib/curriculum-knowledge";
import {
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { DomainCorePrinciples } from "@/components/practice/DomainCorePrinciples";
import { DomainFaqSection } from "@/components/practice/DomainFaqSection";

function getDomainQuestions(
  examName: string,
  subjectName: string,
  domainName: string,
): Question[] {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normExam = norm(examName);
  const normSubject = norm(subjectName);
  const normDomain = norm(domainName);

  // 1. Direct match on exam + subject + domain
  let matches = ALL_BANKS.filter((q) => {
    const qExam = norm(q.exam_name);
    const qSubject = norm(q.subject);
    const qDomain = norm(q.skill_domain);
    const examMatch = qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam);
    const subjectMatch = !qSubject || qSubject === normSubject || qSubject.includes(normSubject) || normSubject.includes(qSubject);
    const domainMatch = qDomain === normDomain || qDomain.includes(normDomain) || normDomain.includes(qDomain);
    return examMatch && subjectMatch && domainMatch;
  });

  // 2. Domain match across exam
  if (matches.length === 0) {
    matches = ALL_BANKS.filter((q) => {
      const qExam = norm(q.exam_name);
      const qDomain = norm(q.skill_domain);
      const examMatch = qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam);
      const domainMatch = qDomain === normDomain || qDomain.includes(normDomain) || normDomain.includes(qDomain);
      return examMatch && domainMatch;
    });
  }

  // 3. Subject-level match within the exam
  if (matches.length === 0) {
    matches = ALL_BANKS.filter((q) => {
      const qExam = norm(q.exam_name);
      const qSubject = norm(q.subject);
      const examMatch = qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam);
      const subjectMatch = qSubject === normSubject;
      return examMatch && subjectMatch;
    });
  }

  // 4. Any question in the exam bank
  if (matches.length === 0) {
    matches = ALL_BANKS.filter((q) => {
      const qExam = norm(q.exam_name);
      return qExam === normExam || qExam.includes(normExam) || normExam.includes(qExam);
    });
  }

  return matches.map((q) => ({
    question_text: q.question_text,
    passage: q.passage,
    passage_id: q.passage_id,
    options: q.options,
    correct_option: q.correct_option,
    explanation: q.explanation || "",
    distractor_analysis: q.distractor_analysis,
    skill_domain: q.skill_domain || domainName,
    misconception: q.misconception,
    time_estimate_seconds: q.time_estimate_seconds,
    difficulty_tier: (q.difficulty_tier === 1
      ? "foundation"
      : q.difficulty_tier === 2
      ? "application"
      : "advanced") as "foundation" | "application" | "advanced",
    topics: [q.skill_domain || domainName, subjectName],
  }));
}


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

  const title = `${domainName} Practice Questions (${examName})`;
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
    // Primary retrieval: authentic verified master question bank for this domain
    questions = getDomainQuestions(examName, subjectName, domainName);

    // Graceful fallback to verified demo questions if domain is not yet in the bank
    if (questions.length === 0) {
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
  }

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);
  const domainSlug = domainToSlug(domainName);

  // Get rich curriculum domain knowledge & FAQs
  const knowledge = getDomainKnowledge(examName, subjectName, domainName);

  // Get all domains in this subject and compute sequential progression
  const domainsInSubject = taxonomyMap[examName]?.[subjectName] || [];
  const currentIndex = domainsInSubject.indexOf(domainName);
  const prevDomain = currentIndex > 0 ? domainsInSubject[currentIndex - 1] : null;
  const nextDomain =
    currentIndex >= 0 && currentIndex < domainsInSubject.length - 1
      ? domainsInSubject[currentIndex + 1]
      : null;

  // Get other sibling domains in this subject for topological internal linking
  const siblingDomains = domainsInSubject.filter((d) => d !== domainName);

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
      eduQuestionType: "Multiple choice",
      learningResourceType: "Practice problem",
      name:
        q.question_text.length > 110
          ? q.question_text.slice(0, 107) + "..."
          : q.question_text,
      text: q.question_text,
      suggestedAnswer: Object.entries(q.options).map(([label, text]) => ({
        "@type": "Answer",
        text: `${label}) ${text}`,
        comment: q.distractor_analysis?.[label as "A" | "B" | "C" | "D"]
          ? `Common misconception: ${q.distractor_analysis[label as "A" | "B" | "C" | "D"]}`
          : undefined,
      })),
      acceptedAnswer: {
        "@type": "Answer",
        text: `${q.correct_option}) ${q.options[q.correct_option] ?? ""}`,
        comment: q.explanation || "Correct step-by-step mathematical or logical solution.",
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

        {/* Center-Stage Interactive Topic Practice Drill */}
        <div className="mb-8">
          <TopicPracticeDrill
            questions={questions}
            examName={examName}
            subjectName={subjectName}
            domainName={domainName}
          />
        </div>

        {/* Sequential Syllabus Traversal (Prev / Next Topic) */}
        {(prevDomain || nextDomain) && (
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevDomain ? (
              <Link
                href={`/practice/${examSlug}/${subjectSlug}/${domainToSlug(prevDomain)}`}
                className="group rounded-2xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                    Previous: {subjectName}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {prevDomain}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextDomain && (
              <Link
                href={`/practice/${examSlug}/${subjectSlug}/${domainToSlug(nextDomain)}`}
                className="group rounded-2xl border border-primary/30 bg-primary/5 p-4 hover:border-primary/60 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 overflow-hidden text-left sm:text-right flex-1">
                  <span className="text-[10px] font-mono text-primary font-semibold uppercase block">
                    Next Topic in {subjectName} →
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {nextDomain}
                  </p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Core Principles & Key Formulas & Primary Exam Trap */}
        <div className="mb-10">
          <DomainCorePrinciples
            principles={knowledge.corePrinciples}
            primaryDistractorTrap={knowledge.primaryDistractorTrap}
          />
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
        <DomainFaqSection
          domainName={domainName}
          examName={examName}
          faqs={knowledge.faqs}
        />

        {/* CTA Banner */}
        <div className="mt-10">
          <ExamCTABanner examName={examName} />
        </div>
      </div>
    </>
  );
}
