// Path: app/page.tsx
import { Suspense } from "react";
import LandingPage from "@/components/landing/LandingPage";
import { metadata as defaultMetadata } from "./metadata";
import type { Metadata } from "next";
import { LANDING_EXAMS, type ExamKey } from "@/components/landing/landing-data";
import { siteConfig } from "@/config/site";
import StructuredData, {
  websiteSchema,
  educationalAppSchema,
  educationalOrgSchema,
  practiceQuizSchema,
} from "@/components/seo/StructuredData";
import { EXAM_STUDENT_FAQS } from "@/components/landing/student-faqs";

const defaultExamKey: ExamKey = "gmat";
const defaultExamConfig = LANDING_EXAMS[defaultExamKey];

export const metadata: Metadata = {
  title: `Free ${defaultExamConfig.name} Practice Questions & Step-by-Step Solutions | AceThePrep`,
  description: `Adaptive practice for ${defaultExamConfig.name}, Digital SAT, GRE, CFA, IELTS, and TOEFL. Solve authentic questions, understand core principles with clean step-by-step solutions, and retain concepts with smart spaced review.`,
  keywords: [
    `${defaultExamConfig.name} practice questions`,
    `${defaultExamConfig.name} free prep`,
    `${defaultExamConfig.name} question bank`,
    `${defaultExamConfig.name} curriculum`,
    `${defaultExamConfig.shortName} study planner`,
    ...((defaultMetadata.keywords as string[]) || []),
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `Free ${defaultExamConfig.name} Practice Questions & Step-by-Step Solutions | AceThePrep`,
    description: `Adaptive practice for ${defaultExamConfig.name}, SAT, GRE, CFA, and global competitive exams. Master common mistakes with personalized distractor analysis.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free ${defaultExamConfig.name} Practice Questions & Step-by-Step Solutions | AceThePrep`,
    description: `Adaptive practice for ${defaultExamConfig.name}, SAT, GRE, and CFA. Spaced repetition with instant mistake analysis.`,
  },
};

export default function IndexPage() {
  const activeExamKey: ExamKey = "gmat";
  const activeConfig = LANDING_EXAMS[activeExamKey];

  const quizSchema = practiceQuizSchema({
    url: siteConfig.url,
    examName: activeConfig.name,
    domain: activeConfig.questions[0]?.topic || activeConfig.name,
    subject: activeConfig.questions[0]?.section || "Adaptive Practice",
    description: `Authentic ${activeConfig.name} practice questions with step-by-step solutions and misconception breakdowns.`,
    questions: activeConfig.questions.map((q) => ({
      questionText: q.questionText,
      options: Object.entries(q.options).map(([label, text]) => ({ label, text })),
      correctOption: q.correctOption,
      correctText: q.options[q.correctOption],
      distractorAnalysis: {
        [q.trapOption]: `${q.trapName}: ${q.whyTrapFooled}`,
      },
      explanation: `${q.whyCorrectWorks} Core Principle: ${q.tenSecondRule}`,
    })),
  });

  const activeFaqs = EXAM_STUDENT_FAQS[activeExamKey] || EXAM_STUDENT_FAQS.sat;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData schema={websiteSchema} />
      <StructuredData schema={educationalOrgSchema} />
      <StructuredData schema={educationalAppSchema} />
      <StructuredData schema={quizSchema as any} />
      <StructuredData schema={faqSchema as any} />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <LandingPage />
      </Suspense>
    </>
  );
}
