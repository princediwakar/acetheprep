// Path: app/insights/[exam]/page.tsx

import { permanentRedirect } from "next/navigation";
import { examToSlug, slugToExam } from "@/lib/slugs";

import { SUPPORTED_EXAMS } from "@/lib/constants/exams";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_EXAMS.map((e) => ({ exam: e.slug }));
}

export default async function ExamInsightsRedirectPage({ params }: PageProps) {
  const { exam } = await params;
  const decoded = decodeURIComponent(exam).trim();
  const canonicalExam = slugToExam(decoded) || decoded;
  const slug = examToSlug(canonicalExam);
  permanentRedirect(`/insights/${slug}/hardest-topics`);
}
