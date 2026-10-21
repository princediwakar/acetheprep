// Path: app/practice/[exam]/[subject]/page.tsx

import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import taxonomyRaw from "@/lib/taxonomies.json";
import {
  examToSlug,
  slugToExam,
  subjectToSlug,
  slugToSubject,
  domainToSlug,
} from "@/lib/slugs";
import StructuredData, {
  breadcrumbSchema,
  subjectCourseSchema,
} from "@/components/seo/StructuredData";
import ExamCTABanner from "@/components/practice/ExamCTABanner";
import { siteConfig } from "@/config/site";
import { ArrowLeft, BookOpen, Sparkles, ArrowRight, TrendingUp } from "lucide-react";


interface PageProps {
  params: Promise<{ exam: string; subject: string }>;
}

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;
const baseUrl = siteConfig.url;

export async function generateStaticParams() {
  const params: { exam: string; subject: string }[] = [];
  for (const [examName, subjects] of Object.entries(taxonomy)) {
    if (examName === "_schema_version" || typeof subjects !== "object" || !subjects) continue;
    for (const subjectName of Object.keys(subjects)) {
      params.push({
        exam: examToSlug(examName),
        subject: subjectToSlug(subjectName),
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam, subject } = await params;
  const decodedExam = decodeURIComponent(exam).trim();
  const decodedSubject = decodeURIComponent(subject).trim();

  const examName = slugToExam(decodedExam) || decodedExam;
  const subjectName = slugToSubject(decodedSubject) || decodedSubject;

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);
  const canonicalUrl = `${baseUrl}/practice/${examSlug}/${subjectSlug}`;

  const title = `Free ${examName} ${subjectName} Practice Questions`;
  const description = `Prepare for ${examName} ${subjectName} with free topic-by-topic practice tests. Includes AI-powered distractor analysis explaining every student trap.`;


  const ogImage = `${baseUrl}/api/og?type=practice&title=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(examName)}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${examName} ${subjectName} Practice`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SubjectPracticeHubPage({ params }: PageProps) {
  const { exam, subject } = await params;
  const decodedExam = decodeURIComponent(exam).trim();
  const decodedSubject = decodeURIComponent(subject).trim();

  const examName = slugToExam(decodedExam);
  const subjectName = slugToSubject(decodedSubject);

  if (!examName || !subjectName) {
    notFound();
  }

  const examSlug = examToSlug(examName);
  const subjectSlug = subjectToSlug(subjectName);

  // If accessed by non-slug names, permanent 301 redirect to canonical slug
  if (decodedExam !== examSlug || decodedSubject !== subjectSlug) {
    permanentRedirect(`/practice/${examSlug}/${subjectSlug}`);
  }

  const subjects = taxonomy[examName];
  if (!subjects) notFound();

  const domains = subjects[subjectName];
  if (!domains || !Array.isArray(domains)) notFound();

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Practice", url: `${baseUrl}/practice` },
    { name: examName, url: `${baseUrl}/practice/${examSlug}` },
    { name: subjectName, url: `${baseUrl}/practice/${examSlug}/${subjectSlug}` },
  ];

  const courseLd = subjectCourseSchema({
    examName,
    subjectName,
    description: `Targeted diagnostic question bank and trap deconstruction for ${examName} ${subjectName}.`,
    url: `${baseUrl}/practice/${examSlug}/${subjectSlug}`,
    domains,
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <StructuredData schema={courseLd} />

      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link
          href={`/practice/${examSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all {examName} subjects
        </Link>

        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{examName} Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-heading">
            {subjectName} Topics for {examName}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Choose a topic module below to start practicing. Every question deconstructs all wrong options so you understand why distractors are chosen.
          </p>

          <div className="mt-5">
            <Link
              href={`/insights/${examSlug}/hardest-topics`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
              <span>See which {subjectName} topics have the highest student failure rate &rarr;</span>
            </Link>
          </div>
        </div>


        {/* Domain modules grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {domains.map((domainName) => {
            const domainSlug = domainToSlug(domainName);
            return (
              <div
                key={domainSlug}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                    Module
                  </span>
                  <h2 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {domainName}
                  </h2>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Interactive questions with instant distractor analysis and conceptual trap identification.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/practice/${examSlug}/${subjectSlug}/${domainSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Start Topic Test
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exam CTA Banner */}
        <div className="mt-12">
          <ExamCTABanner examName={examName} />
        </div>
      </div>
    </div>
  );
}
