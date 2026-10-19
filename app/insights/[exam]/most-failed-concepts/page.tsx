// Path: app/insights/[exam]/most-failed-concepts/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { WithContext } from "schema-dts";
import {
  getMostFailedConcepts,
  getTotalPracticeSessions,
  getDomainSubject,
  type FailedConcept,
} from "@/lib/insights-queries";
import StructuredData, {
  breadcrumbSchema,
  insightsDatasetSchema,
} from "@/components/seo/StructuredData";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
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
  concepts: FailedConcept[] | null;
  totalSessions: number;
  fetchError: boolean;
}> {
  try {
    const [concepts, totalSessions] = await Promise.all([
      getMostFailedConcepts(examName),
      getTotalPracticeSessions(examName),
    ]);
    return { concepts, totalSessions, fetchError: false };
  } catch {
    return { concepts: null, totalSessions: 0, fetchError: true };
  }
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
  const canonicalUrl = `${baseUrl}/insights/${slug}/most-failed-concepts`;

  return {
    title: `${canonicalName} Most Failed Concepts & Error Rates | AceThePrep Insights`,
    description: `Official failure rate analytics for ${canonicalName}. Ranked list of concept domains by student error percentage, derived from real practice sessions.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${canonicalName} Most Failed Concepts — Real Student Telemetry`,
      description: `See the top conceptual traps and error rates in ${canonicalName}. Backed by real session analytics.`,
      url: canonicalUrl,
      images: [
        {
          url: `${baseUrl}/api/og?type=insights&title=${encodeURIComponent(canonicalName)}&topic=${encodeURIComponent("Most Failed Concepts")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function MostFailedConceptsPage({ params }: PageProps) {
  const { exam } = await params;
  const resolved = resolveExam(exam);

  if (!resolved) {
    notFound();
  }

  if (!resolved.isCanonical) {
    permanentRedirect(`/insights/${resolved.slug}/most-failed-concepts`);
  }

  const { canonicalName: examName, slug: examSlug } = resolved;
  const { concepts, totalSessions, fetchError } = await getData(examName);

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
    url: `${baseUrl}/insights/${examSlug}/most-failed-concepts`,
    examName,
    reportType: "Most Failed Concepts Telemetry Dataset",
    description: `Ranked list of concept domains by student failure rate for ${examName} exam preparation.`,
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
              name: `${examName} Most Failed Concepts`,
              url: `${baseUrl}/insights/${examSlug}/most-failed-concepts`,
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
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500 mb-3">
            <span>Verified Telemetry</span>
            <span>•</span>
            <span>{examName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            {examName} — Most Failed Concepts
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Derived from{" "}
            <span className="font-semibold text-foreground">
              {totalSessions > 0 ? totalSessions.toLocaleString() : "aggregate"}
            </span>{" "}
            practice sessions. Ranked by student failure rate.
          </p>
        </div>

        {(!concepts || concepts.length === 0) ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              More telemetry data is currently being calibrated for {examName}. Jump into the diagnostic to establish your personalized baseline.
            </p>
            <Link
              href={`/practice/${examSlug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
            >
              Start Diagnostic Session
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
                      Failure Rate
                    </th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Attempts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {concepts.map((concept, index) => {
                    const subject = getDomainSubject(examName, concept.skill_domain);
                    const practiceHref = subject
                      ? `/practice/${examSlug}/${subjectToSlug(subject)}/${domainToSlug(concept.skill_domain)}`
                      : `/practice/${examSlug}`;

                    return (
                      <tr
                        key={concept.skill_domain}
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
                            {concept.skill_domain}
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
                                className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(concept.failure_rate, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-rose-500 tabular-nums w-12 text-right">
                              {concept.failure_rate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right text-sm text-muted-foreground tabular-nums">
                          {concept.total_attempts.toLocaleString()}
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
            href={`/insights/${examSlug}/hardest-topics`}
            className="font-semibold text-primary hover:underline"
          >
            View Hardest Topics Telemetry &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
