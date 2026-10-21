// Path: app/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PublicLanding from "@/components/landing/PublicLanding";
import { metadata as defaultMetadata } from "./metadata";
import type { Metadata } from "next";
import { ARENA_EXAMS, type ExamKey } from "@/components/landing/arena-data";
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
  const examConfig = examKey && ARENA_EXAMS[examKey] ? ARENA_EXAMS[examKey] : null;

  if (examConfig) {
    const canonicalPath = examKey === "gmat" ? "/" : `/?exam=${examKey}`;
    const pageTitle = `Free ${examConfig.name} Practice Questions & Trap Autopsies | AceThePrep`;
    const pageDesc = `Practice authentic ${examConfig.name} questions with zero sign-up. Deconstruct psychometric distractor traps, test timing, and calculate your real score gap.`;

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: [
        `${examConfig.name} practice questions`,
        `${examConfig.name} free prep`,
        `${examConfig.name} question bank`,
        `${examConfig.name} traps`,
        `${examConfig.shortName} score calculator`,
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
    initialExamParam && ARENA_EXAMS[initialExamParam as ExamKey]
      ? (initialExamParam as ExamKey)
      : "gmat";
  const activeConfig = ARENA_EXAMS[activeExamKey];

  if (!user) {
    const quizSchema = practiceQuizSchema({
      url: `${siteConfig.url}${activeExamKey === "gmat" ? "" : `/?exam=${activeExamKey}`}`,
      examName: activeConfig.name,
      domain: activeConfig.questions[0]?.topic || activeConfig.name,
      subject: activeConfig.questions[0]?.section || "Adaptive Practice",
      description: `Authentic ${activeConfig.name} question bank with distractor autopsies and timed simulation.`,
      questions: activeConfig.questions.map((q) => ({
        questionText: q.questionText,
        options: Object.entries(q.options).map(([label, text]) => ({ label, text })),
        correctOption: q.correctOption,
        correctText: q.options[q.correctOption],
        distractorAnalysis: {
          [q.trapOption]: `${q.trapName}: ${q.whyTrapFooled}`,
        },
        explanation: `${q.whyCorrectWorks} 10-Second Rule: ${q.tenSecondRule}`,
      })),
    });

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How do distractor traps work on the ${activeConfig.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Distractor traps on the ${activeConfig.name} are mathematically or syntactically designed choices that anticipate the most common shortcuts and calculation errors made under test pressure. AceThePrep provides distractor autopsies for every question to train active trap recognition.`,
          },
        },
        {
          "@type": "Question",
          name: `Can I practice ${activeConfig.name} questions for free with zero sign-up?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes. AceThePrep provides instant, un-gated practice questions with authentic timing, official formula sheets, test calculators, and immediate trap explanations.`,
          },
        },
        {
          "@type": "Question",
          name: `How is the score penalty calculated on the ${activeConfig.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Because exams like the Digital SAT and GMAT Focus use adaptive multistage routing or item response theory, missing early questions severely caps your maximum possible score. Our Score Gap tool calculates the exact point penalty per missed problem.`,
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
        <PublicLanding initialExam={initialExamParam} />
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
