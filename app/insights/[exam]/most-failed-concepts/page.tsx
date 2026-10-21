// Path: app/insights/[exam]/most-failed-concepts/page.tsx

import { permanentRedirect } from "next/navigation";
import { examToSlug } from "@/lib/slugs";
import taxonomyRaw from "@/lib/taxonomies.json";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export async function generateStaticParams() {
  const taxonomy = taxonomyRaw as unknown as Record<string, unknown>;
  return Object.keys(taxonomy)
    .filter((k) => k !== "_schema_version")
    .map((examName) => ({
      exam: examToSlug(examName),
    }));
}

export default async function MostFailedConceptsRedirect({ params }: PageProps) {
  const { exam } = await params;
  permanentRedirect(`/insights/${exam}/hardest-topics`);
}
