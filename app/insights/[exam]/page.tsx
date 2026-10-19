// Path: app/insights/[exam]/page.tsx

import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export default async function ExamInsightsRedirectPage({ params }: PageProps) {
  const { exam } = await params;
  redirect(`/insights/${encodeURIComponent(exam)}/hardest-topics`);
}
