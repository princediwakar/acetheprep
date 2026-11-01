// Path: app/s/[token]/page.tsx

import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StructuredData, {
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import {
  ShareResultCard,
  type MasteryDelta,
} from "@/components/share/ShareResultCard";
import type { QuizDuelQuestion } from "@/components/share/QuizDuelPlayer";

interface PageProps {
  params: Promise<{ token: string }>;
}

interface CardData {
  exam_name?: string;
  score?: number;
  total_questions?: number;
  correct_count?: number;
  mastery_delta?: MasteryDelta[];
  topics?: string[];
  time_taken?: number;
  mastered_domains?: string[];
  questions: QuizDuelQuestion[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";

  try {
    const { data: card, error } = await supabaseAdmin
      .from("result_cards")
      .select("*")
      .eq("share_token", token)
      .single();

    if (error || !card) {
      return {
        title: "Session Results",
        description: "View practice session performance and mastery progress.",
      };
    }

    const cardData = card.card_data as CardData;
    const examName = cardData.exam_name || "Practice Session";
    const score = cardData.correct_count ?? cardData.score ?? 0;
    const total = cardData.total_questions ?? 0;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    const description = `A peer scored ${pct}% (${score}/${total}) on ${examName}. Can you beat their score? Take the quiz duel on AceThePrep.`;
    const ogImageUrl = `${baseUrl}/api/og/result-card?token=${token}`;

    return {
      title: `${examName} Quiz Duel — Beat ${pct}% (${score}/${total})`,
      description,
      openGraph: {
        title: `${examName} Quiz Duel: Beat ${pct}%`,
        description,
        url: `${baseUrl}/s/${token}`,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        type: "website",
        siteName: "AceThePrep",
      },
      twitter: {
        card: "summary_large_image",
        title: `${examName} Quiz Duel: Beat ${pct}%`,
        description,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {
      title: "Share Card",
      description: "View practice session results on AceThePrep.",
    };
  }
}

export default async function ShareCardPage({ params }: PageProps) {
  const { token } = await params;

  let card;
  try {
    const result = await supabaseAdmin
      .from("result_cards")
      .select("*")
      .eq("share_token", token)
      .single();
    card = result.data;
    if (result.error || !card) notFound();
  } catch {
    notFound();
  }

  // Increment view count for viral engagement analytics
  supabaseAdmin
    .from("result_cards")
    .update({ view_count: (card.view_count ?? 0) + 1 })
    .eq("id", card.id)
    .then(({ error }) => {
      if (error) console.error("Failed to increment view count:", error);
    });

  const cd = card.card_data as CardData;
  if (!cd || !Array.isArray(cd.questions) || cd.questions.length === 0) {
    notFound();
  }

  const examName = cd.exam_name || "Practice Session";
  const score = cd.correct_count ?? cd.score ?? 0;
  const total = cd.total_questions ?? 0;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const masteryDelta: MasteryDelta[] = cd.mastery_delta ?? [];
  const masteredDomains = cd.mastered_domains ?? null;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";

  const allDomains: string[] = [
    ...new Set([
      ...cd.questions.map((q) => q.skill_domain),
      ...(masteredDomains || []),
      ...masteryDelta.map((d) => d.domain),
    ]),
  ];

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    educationalLevel: examName,
    teaches: allDomains.length > 0 ? allDomains : undefined,
    educationalUse: "Practice Session Results",
  };

  return (
    <>
      <StructuredData schema={learningResourceSchema} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: baseUrl },
          {
            name: `${examName} Session Results`,
            url: `${baseUrl}/s/${token}`,
          },
        ])}
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start px-4 py-8 sm:py-12">
        <ShareResultCard
          examName={examName}
          score={score}
          total={total}
          pct={pct}
          masteryDelta={masteryDelta}
          masteredDomains={masteredDomains}
          shareToken={token}
          questions={cd.questions}
        />
      </div>
    </>
  );
}
