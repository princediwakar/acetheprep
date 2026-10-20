import taxonomy from "@/lib/taxonomies.json";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomyData = taxonomy as unknown as TaxonomyData;

export function getDomainsForExam(examName: string): string[] {
  const subjects = taxonomyData[examName];
  if (!subjects) return [];
  return Object.values(subjects).flat();
}

export function getSubjectForDomain(examName: string, domain: string): string {
  const subjects = taxonomyData[examName];
  if (!subjects) return "General";
  for (const [subject, domains] of Object.entries(subjects)) {
    if (domains.includes(domain)) return subject;
  }
  return "General";
}

