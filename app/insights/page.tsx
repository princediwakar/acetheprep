// Path: app/insights/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Brain, ArrowRight, Activity, Sparkles } from "lucide-react";
import { getInsightsExams } from "@/lib/insights-queries";
import { examToSlug, GLOBAL_EXAM_PRIORITY } from "@/lib/slugs";
import taxonomyRaw from "@/lib/taxonomies.json";

import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hardest Exam Topics & Common Mistakes — Empirical Insights",
  description:
    "Discover the hardest exam topics and most frequent mistakes across competitive exams like Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and TOEFL.",
  alternates: {
    canonical: `${baseUrl}/insights`,
  },
  openGraph: {
    title: `Hardest Exam Topics & Common Mistakes | ${siteConfig.name}`,
    description:
      "Explore real student error rates, hardest conceptual topics, and distractor traps across Digital SAT, GRE, GMAT Focus, and CFA Level 1.",
    url: `${baseUrl}/insights`,
    images: [
      {
        url: `${baseUrl}/api/og?type=insights&title=Exam%20Topic%20Insights&topic=Hardest%20Mistakes`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Exam Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Hardest Exam Topics & Common Mistakes | ${siteConfig.name}`,
    description:
      "Explore real student error rates and hardest topics across competitive exams.",
    images: [`${baseUrl}/api/og?type=insights&title=Exam%20Topic%20Insights&topic=Hardest%20Mistakes`],
  },
};


import { InsightsClientView } from "@/components/insights/InsightsClientView";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";

export default async function InsightsPage() {
  return (
    <div className="min-h-screen pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto space-y-10">
        <PageHero
          badge={
            <HeroBadge icon={Activity}>
              Exam Topic Insights &amp; Error Benchmarks
            </HeroBadge>
          }
          title="Hardest Exam Topics & Common Mistakes"
          subtitle="Empirical error rates, cognitive blindspots, and first-principles solution rules across all 6 competitive exams. Available immediately for all students without requiring prior question attempts."
        />

        <InsightsClientView initialExam="gmat" />
      </div>
    </div>
  );
}

