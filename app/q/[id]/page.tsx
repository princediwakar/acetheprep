import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ALL_BANKS } from "@/lib/data/banks";
import { QuestionCard } from "@/components/debate/QuestionCard";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ answer?: string; ref?: string }>;
}

interface QuestionRecord {
  id: string;
  exam_name: string;
  subject: string;
  skill_domain: string;
  difficulty_tier: number;
  question_text: string;
  passage?: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  distractor_analysis: Record<string, string>;
  misconception: string | null;
}

async function findQuestion(id: string): Promise<QuestionRecord | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  // 1. If UUID, attempt high-speed DB lookup
  if (isUuid) {
    const { data, error } = await supabaseAdmin
      .from("question_bank")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        exam_name: data.exam_name,
        subject: data.subject,
        skill_domain: data.skill_domain,
        difficulty_tier: data.difficulty_tier,
        question_text: data.question_text,
        passage: (data.metadata_json as any)?.passage || undefined,
        options: data.options as Record<string, string>,
        correct_option: data.correct_option,
        explanation: data.explanation,
        distractor_analysis: (data.distractor_analysis as Record<string, string>) || {},
        misconception: data.misconception,
      };
    }
  }

  // 2. Lookup in compiled master question bank by index, slug, or matching seed
  const lowerId = id.toLowerCase();
  for (let i = 0; i < ALL_BANKS.length; i++) {
    const q = ALL_BANKS[i];
    const examSlug = q.exam_name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const domainSlug = q.skill_domain.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const candidateSlug = `${examSlug}-${domainSlug}-${i + 1}`;

    if (id === candidateSlug || id === `seed_${i + 1}` || id === String(i + 1)) {
      return {
        id,
        exam_name: q.exam_name,
        subject: q.subject,
        skill_domain: q.skill_domain,
        difficulty_tier: q.difficulty_tier,
        question_text: q.question_text,
        passage: q.passage,
        options: q.options as Record<string, string>,
        correct_option: q.correct_option,
        explanation: q.explanation,
        distractor_analysis: q.distractor_analysis as Record<string, string>,
        misconception: q.misconception,
      };
    }
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const question = await findQuestion(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

  if (!question) {
    return {
      title: "Question Trap Debate | AceThePrep",
      description: "Dissect standardized exam distractor traps and view community cognitive analysis.",
    };
  }

  const title = `[${question.exam_name}] ${question.skill_domain} Trap Dissection | AceThePrep`;
  const description = `Live peer poll and Socratic distractor analysis for ${question.exam_name} (${question.skill_domain}). Unpack the examiner's trap and master your cognitive blind spot.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/q/${id}`,
      type: "article",
      images: [
        {
          url: `${baseUrl}/og/result-card?exam=${encodeURIComponent(question.exam_name)}&domain=${encodeURIComponent(question.skill_domain)}`,
          width: 1200,
          height: 630,
          alt: `${question.exam_name} ${question.skill_domain} Trap`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function QuestionPage({ params, searchParams }: PageProps) {
  const [{ id }, queryParams] = await Promise.all([
    params,
    searchParams ? searchParams : Promise.resolve({} as { answer?: string; ref?: string }),
  ]);
  const question = await findQuestion(id);

  if (!question) {
    notFound();
  }

  const rawAnswer = queryParams?.answer?.toUpperCase();
  const initialSelectedOption = rawAnswer && question.options[rawAnswer] ? rawAnswer : null;
  const isPeerChallenge = queryParams?.ref === "stump";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

  const questionSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${question.exam_name} ${question.skill_domain} Practice Question`,
    educationalLevel: question.exam_name,
    about: {
      "@type": "Thing",
      name: question.skill_domain,
    },
    hasPart: [
      {
        "@type": "Question",
        name: question.question_text.slice(0, 150),
        text: question.question_text,
        suggestedAnswer: Object.entries(question.options).map(([key, val]) => ({
          "@type": "Answer",
          position: key,
          text: val,
        })),
        acceptedAnswer: {
          "@type": "Answer",
          text: question.options[question.correct_option] || question.correct_option,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData schema={questionSchema} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: baseUrl },
          { name: question.exam_name, url: `${baseUrl}/practice` },
          { name: question.skill_domain, url: `${baseUrl}/q/${id}` },
        ])}
      />

      {/* Navigation Header */}
      <header className="border-b border-border/80 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/home"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <Link href="/" className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
            <span className="text-indigo-500 font-mono">Ace</span>
            <span>ThePrep</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Trap Forensics
            </span>
          </Link>

          <Link
            href="/practice"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Practice Drills &rarr;
          </Link>
        </div>
      </header>

      {/* Main Question Stage */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <QuestionCard
          questionId={question.id}
          examName={question.exam_name}
          subject={question.subject}
          skillDomain={question.skill_domain}
          difficultyTier={question.difficulty_tier}
          questionText={question.question_text}
          passage={question.passage}
          options={question.options}
          correctOption={question.correct_option}
          explanation={question.explanation}
          distractorAnalysis={question.distractor_analysis}
          misconception={question.misconception}
          isAuthenticated={isAuthenticated}
          isPeerChallenge={isPeerChallenge}
          initialSelectedOption={initialSelectedOption}
        />
      </main>
    </div>
  );
}

