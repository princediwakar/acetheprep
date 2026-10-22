// Path: app/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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

interface PageProps {
  searchParams: Promise<{ exam?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const examKey = resolvedParams?.exam?.toLowerCase() as ExamKey | undefined;
  const examConfig = examKey && LANDING_EXAMS[examKey] ? LANDING_EXAMS[examKey] : null;

  if (examConfig) {
    const canonicalPath = examKey === "sat" ? "/" : `/?exam=${examKey}`;
    const pageTitle = `Free ${examConfig.name} Practice Questions & Step-by-Step Solutions | AceThePrep`;
    const pageDesc = `Adaptive practice for the ${examConfig.name}. Solve authentic questions, understand core principles with clean step-by-step solutions, and retain concepts with smart spaced review.`;

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: [
        `${examConfig.name} practice questions`,
        `${examConfig.name} free prep`,
        `${examConfig.name} question bank`,
        `${examConfig.name} curriculum`,
        `${examConfig.shortName} study planner`,
        ...((defaultMetadata.keywords as string[]) || []),
      ],
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: `${siteConfig.url}${canonicalPath}`,
        siteName: siteConfig.name,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDesc,
      },
    };
  }

  return defaultMetadata;
}

export default async function IndexPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const resolvedParams = await searchParams;
  const initialExamParam = resolvedParams?.exam?.toLowerCase();
  const activeExamKey: ExamKey =
    initialExamParam && LANDING_EXAMS[initialExamParam as ExamKey]
      ? (initialExamParam as ExamKey)
      : "sat";
  const activeConfig = LANDING_EXAMS[activeExamKey];

  if (!user) {
    const quizSchema = practiceQuizSchema({
      url: `${siteConfig.url}${activeExamKey === "sat" ? "" : `/?exam=${activeExamKey}`}`,
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

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How does adaptive practice work on AceThePrep for ${activeConfig.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `AceThePrep breaks down authentic ${activeConfig.name} questions into their core principle, step-by-step mathematical or logical derivation, and common misconceptions. You focus on mastering individual skills before taking full adaptive mocks.`,
          },
        },
        {
          "@type": "Question",
          name: `Can I practice ${activeConfig.name} questions for free with zero sign-up?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes. AceThePrep provides un-gated practice questions with authentic test timing, official formula sheets, test calculators, and immediate step-by-step solutions.`,
          },
        },
        {
          "@type": "Question",
          name: `How does spaced review help retain concepts until test day?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Questions and topics you miss or find difficult are algorithmically queued for re-review right before your memory decays, defeating the forgetting curve and ensuring retention on test day.`,
          },
        },
      ],
    };

    return (
      <>
        <StructuredData schema={websiteSchema} />
        <StructuredData schema={educationalOrgSchema} />
        <StructuredData schema={educationalAppSchema} />
        <StructuredData schema={quizSchema as any} />
        <StructuredData schema={faqSchema as any} />
        <LandingPage initialExam={initialExamParam} />
      </>
    );
  }

  const { data: profile } = await supabase
    .from("exam_profiles")
    .select("profile_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (profile) {
    redirect("/home");
  }

  redirect("/setup");
}
