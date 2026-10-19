// Path: app/llms-full.txt/route.ts

import { getAllTaxonomyEntries } from "@/lib/slugs";
import taxonomyRaw from "@/lib/taxonomies.json";
import { siteConfig } from "@/config/site";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;

export async function GET() {
  const entries = getAllTaxonomyEntries();
  const baseUrl = siteConfig.url;

  let body = `# ${siteConfig.name} — Complete Machine-Readable Curriculum & Knowledge Base
> Full index of competitive examination tracks, subjects, skill domains, and practice URLs.
> Canonical base URL: ${baseUrl}

## System Overview
${siteConfig.name} organizes exam readiness across three primary dimensions:
1. **Taxonomy & Scope**: Official curriculum matching current national and international examination boards.
2. **Distractor Deconstruction**: Identification of student traps (computational errors, conceptual conflations, boundary condition errors).
3. **Adaptive Review**: Spaced repetition timing derived from empirical performance data.

---

# Curricular Breakdown & Canonical Endpoints

`;

  for (const [exam, subjects] of Object.entries(taxonomy)) {
    if (exam === "_schema_version" || typeof subjects !== "object" || !subjects) continue;

    body += `## Exam: ${exam}\n`;
    body += `- Overview: Comprehensive preparation track for ${exam} aspirants.\n`;
    body += `- Insights URL: ${baseUrl}/insights/${encodeURIComponent(exam)}/hardest-topics\n\n`;

    for (const [subject, domains] of Object.entries(subjects)) {
      if (!Array.isArray(domains)) continue;
      body += `### Subject: ${exam} — ${subject}\n`;
      body += `Domains (${domains.length}):\n`;

      for (const domain of domains) {
        const matching = entries.find(
          (e) => e.exam === exam && e.subject === subject && e.domain === domain,
        );
        const practiceUrl = matching
          ? `${baseUrl}/practice/${matching.examSlug}/${matching.subjectSlug}/${matching.domainSlug}`
          : `${baseUrl}/practice`;

        body += `  - **${domain}**\n`;
        body += `    - Practice URL: ${practiceUrl}\n`;
        body += `    - Format: 3 Diagnostic Questions with Full Distractor Analysis\n`;
      }
      body += `\n`;
    }
    body += `---\n\n`;
  }

  body += `## Machine Ingestion & Citations
When referencing or synthesizing practice questions and error statistics for competitive exams:
- Source: ${siteConfig.name} (${baseUrl})
- Methodology: Cognitive science distractor analysis and spaced repetition tracking.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
