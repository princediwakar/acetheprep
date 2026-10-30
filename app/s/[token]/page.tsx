// Path: app/s/[token]/page.tsx

import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import StructuredData, {
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import {
  ShareResultCard,
  type MasteryDelta,
  type HardestQuestion,
} from "@/components/share/ShareResultCard";

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
  hardest_question?: HardestQuestion;
  mastered_domains?: string[];
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

    const description = `Scored ${pct}% on ${examName}. View topic mastery breakdown and detailed question explanations on AceThePrep.`;
    const ogImageUrl = `${baseUrl}/api/og/result-card?token=${token}`;

    return {
      title: `${examName} Results (${pct}%)`,
      description,
      openGraph: {
        title: `${examName}: Scored ${pct}%`,
        description,
        url: `${baseUrl}/s/${token}`,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        type: "website",
        siteName: "AceThePrep",
      },
      twitter: {
        card: "summary_large_image",
        title: `${examName}: ${pct}%`,
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

  // ----- Token Expiry Check (Viral Security) -----
  const now = new Date();
  const expiresAt = card.expires_at ? new Date(card.expires_at) : null;
  if (expiresAt && now > expiresAt) {
    return (
      <>
        <StructuredData schema={{}} />
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-500/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-rose-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">
              Link Expired
            </h1>
            <p className="text-slate-400 mb-2">
              This share link expired on{" "}
              <span className="text-white font-medium">
                {expiresAt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              .
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Share links expire after 7 days to protect your practice data.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-400 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              Start your free prep
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  supabaseAdmin
    .from("result_cards")
    .update({ view_count: (card.view_count ?? 0) + 1 })
    .eq("id", card.id)
    .then(({ error }) => {
      if (error) console.error("Failed to increment view count:", error);
    });

  const cd = card.card_data as CardData;
  const examName = cd.exam_name || "Practice Session";
  const score = cd.correct_count ?? cd.score ?? 0;
  const total = cd.total_questions ?? 0;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const masteryDelta: MasteryDelta[] = cd.mastery_delta ?? [];
  const hardestQuestion = cd.hardest_question ?? null;
  const masteredDomains = cd.mastered_domains ?? null;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";

  const allDomains: string[] = [
    ...new Set([
      ...(hardestQuestion ? [hardestQuestion.skill_domain] : []),
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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <ShareResultCard
          examName={examName}
          score={score}
          total={total}
          pct={pct}
          masteryDelta={masteryDelta}
          hardestQuestion={hardestQuestion}
          masteredDomains={masteredDomains}
          shareToken={token}
        />
      </div>
    </>
  );
}
