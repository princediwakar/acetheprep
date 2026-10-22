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

export default async function InsightsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 bg-background">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <Activity className="h-3.5 w-3.5" />
            Exam Topic Insights &amp; Error Benchmarks
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
            Hardest Exam Topics &amp; Common Mistakes
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Empirical error rates, cognitive blindspots, and first-principles solution rules across all 6 competitive exams. Available immediately for all students without requiring prior question attempts.
          </p>
        </div>

        <InsightsClientView initialExam="sat" />
      </div>
    </div>
  );
}

