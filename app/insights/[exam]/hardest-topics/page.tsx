// Path: app/insights/[exam]/hardest-topics/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect, notFound } from "next/navigation";
import { WithContext } from "schema-dts";
import {
  getHardestTopics,
  getTotalPracticeSessions,
  getDomainSubject,
  type HardTopic,
} from "@/lib/insights-queries";
import StructuredData, {
  breadcrumbSchema,
  insightsDatasetSchema,
} from "@/components/seo/StructuredData";
import { AlertTriangle, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import {
  slugToExam,
  examToSlug,
  subjectToSlug,
  domainToSlug,
} from "@/lib/slugs";
import { siteConfig } from "@/config/site";
import taxonomyRaw from "@/lib/taxonomies.json";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const taxonomy = taxonomyRaw as unknown as Record<string, unknown>;
  return Object.keys(taxonomy)
    .filter((k) => k !== "_schema_version")
    .map((examName) => ({
      exam: examToSlug(examName),
    }));
}

const baseUrl = siteConfig.url;

function resolveExam(rawParam: string): {
  canonicalName: string;
  slug: string;
  isCanonical: boolean;
} | null {
  const decoded = decodeURIComponent(rawParam).trim();
  const matchedFromSlug = slugToExam(decoded);

  const taxonomy = taxonomyRaw as unknown as Record<string, unknown>;
  let canonicalName = matchedFromSlug;

  if (!canonicalName) {
    for (const key of Object.keys(taxonomy)) {
      if (key === "_schema_version") continue;
      if (key.toLowerCase() === decoded.toLowerCase()) {
        canonicalName = key;
        break;
      }
    }
  }

  if (!canonicalName) return null;

  const slug = examToSlug(canonicalName);
  return {
    canonicalName,
    slug,
    isCanonical: decoded === slug,
  };
}

async function getData(examName: string): Promise<{
  topics: HardTopic[] | null;
  totalSessions: number;
  fetchError: boolean;
}> {
  try {
    const [topics, totalSessions] = await Promise.all([
      getHardestTopics(examName),
      getTotalPracticeSessions(examName),
    ]);
    return { topics, totalSessions, fetchError: false };
  } catch {
    return { topics: null, totalSessions: 0, fetchError: true };
  }
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { exam } = await params;
  const resolved = resolveExam(exam);

  if (!resolved) {
    return { title: "Exam Insights Not Found" };
  }

  const { canonicalName, slug } = resolved;
  const canonicalUrl = `${baseUrl}/insights/${slug}/hardest-topics`;

  return {
    title: `${canonicalName} Hardest Topics & Failure Rates | AceThePrep Insights`,
    description: `Official difficulty telemetry for ${canonicalName}. Ranked list of topics by student error rates and time spent per question, derived from real practice sessions.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${canonicalName} Hardest Topics — Real Student Telemetry`,
      description: `See the top conceptual traps and hardest topics in ${canonicalName}. Backed by real session analytics.`,
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/api/og?type=insights&title=${encodeURIComponent(canonicalName)}&topic=${encodeURIComponent("Hardest Topics")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function HardestTopicsPage({ params }: PageProps) {
  const { exam } = await params;
  const resolved = resolveExam(exam);

  if (!resolved) {
    notFound();
  }

  if (!resolved.isCanonical) {
    permanentRedirect(`/insights/${resolved.slug}/hardest-topics`);
  }

  const { canonicalName: examName, slug: examSlug } = resolved;
  const { topics, totalSessions, fetchError } = await getData(examName);

  if (fetchError) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Failed to load data
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            Something went wrong while retrieving telemetry data. Please try again later.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const datasetSchema = insightsDatasetSchema({
    url: `${baseUrl}/insights/${examSlug}/hardest-topics`,
    examName,
    reportType: "Hardest Topics Telemetry Dataset",
    description: `Ranked list of concept domains by student error rate and average time spent for ${examName} exam preparation.`,
    datePublished: "2026-10-19",
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12">
      <StructuredData schema={datasetSchema as WithContext<any>} />
      <StructuredData
        schema={
          breadcrumbSchema([
            { name: "Home", url: baseUrl },
            { name: "Insights", url: `${baseUrl}/insights` },
            {
              name: `${examName} Hardest Topics`,
              url: `${baseUrl}/insights/${examSlug}/hardest-topics`,
            },
          ]) as WithContext<any>
        }
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <Link
            href={`/practice/${examSlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Practice {examName} Syllabus
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <span>Verified Telemetry</span>
            <span>•</span>
            <span>{examName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            {examName} — Hardest Topics
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Derived from{" "}
            <span className="font-semibold text-foreground">
              {totalSessions > 0 ? totalSessions.toLocaleString() : "aggregate"}
            </span>{" "}
            practice sessions. Ranked by student error rate and average time-to-solve.
          </p>
        </div>

        {(!topics || topics.length === 0) ? (
          <div className="rounded-2xl border border-border/80 bg-card p-8 sm:p-10 text-center max-w-lg mx-auto shadow-sm">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary uppercase mb-3">
              Calibration Active
            </span>
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Telemetry Calibration in Progress
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Live error-rate telemetry for {examName} is currently aggregating candidate practice sessions. You can start practicing {examName} questions directly from the syllabus catalog.
            </p>
            <Link
              href={`/practice/${examSlug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
            >
              Practice {examName} Topics
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Incorrect Rate
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Avg Time
                    </th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Attempts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {topics.map((topic, index) => {
                    const subject = getDomainSubject(examName, topic.skill_domain);
                    const practiceHref = subject
                      ? `/practice/${examSlug}/${subjectToSlug(subject)}/${domainToSlug(topic.skill_domain)}`
                      : `/practice/${examSlug}`;

                    return (
                      <tr
                        key={topic.skill_domain}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-muted-foreground font-mono text-xs">
                          #{index + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <Link
                            href={practiceHref}
                            className="text-sm font-semibold text-primary hover:underline transition-colors"
                          >
                            {topic.skill_domain}
                          </Link>
                          {subject && (
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {subject}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 max-w-[120px] h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(topic.incorrect_rate, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-amber-500 tabular-nums w-12 text-right">
                              {topic.incorrect_rate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="tabular-nums">
                              {formatTime(topic.avg_time_spent_ms)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right text-sm text-muted-foreground tabular-nums">
                          {topic.total_attempts.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/20 p-4 text-xs text-muted-foreground">
          <span>Data refreshed dynamically from live student practice sessions on AceThePrep.</span>
          <Link
            href={`/insights/${examSlug}/most-failed-concepts`}
            className="font-semibold text-primary hover:underline"
          >
            View Most Failed Concepts &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
