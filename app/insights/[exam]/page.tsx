// Path: app/insights/[exam]/page.tsx

import { permanentRedirect } from "next/navigation";
import { examToSlug, slugToExam } from "@/lib/slugs";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export default async function ExamInsightsRedirectPage({ params }: PageProps) {
  const { exam } = await params;
  const decoded = decodeURIComponent(exam).trim();
  const canonicalExam = slugToExam(decoded) || decoded;
  const slug = examToSlug(canonicalExam);
  permanentRedirect(`/insights/${slug}/hardest-topics`);
}
