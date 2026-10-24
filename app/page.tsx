// Path: app/page.tsx
import { Suspense } from "react";
import LandingPage from "@/components/landing/LandingPage";
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
  title: `Adaptive AI Exam Prep for ${defaultExamConfig.name}, SAT & GRE | AceThePrep`,
  description: `Adaptive AI test preparation for ${defaultExamConfig.name}, Digital SAT, GRE, and CFA. Eliminate score leaks with AI trap forensics, instant writing evaluations, and SM-2 spaced retention.`,
  keywords: [
    "Adaptive AI test prep",
    `${defaultExamConfig.name} AI prep`,
    "Digital SAT AI prep",
    "GRE AI prep",
    "CFA Level 1 practice",
    "AI essay scoring",
    "AI trap forensics",
    "SM-2 spaced repetition",
    "GMAT Focus prep",
    "Digital SAT prep",
    "IELTS Academic prep",
    "TOEFL iBT practice",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `Adaptive AI Exam Prep for ${defaultExamConfig.name}, SAT & GRE | AceThePrep`,
    description: `Adaptive AI learning engine for ${defaultExamConfig.name}, SAT, GRE, and CFA. Powered by real-time mistake forensics, AI essay scoring, and SM-2 spaced repetition.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Adaptive AI Exam Prep for ${defaultExamConfig.name}, SAT & GRE | AceThePrep`,
    description: `Adaptive AI practice for ${defaultExamConfig.name}, SAT, GRE, and CFA. Zero paywall on core diagnostic drills.`,
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
