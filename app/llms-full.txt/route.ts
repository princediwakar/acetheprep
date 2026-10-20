// Path: app/llms-full.txt/route.ts

import { getAllTaxonomyEntries, examToSlug, subjectToSlug, domainToSlug, GLOBAL_EXAM_PRIORITY } from "@/lib/slugs";
import taxonomyRaw from "@/lib/taxonomies.json";
import { siteConfig } from "@/config/site";
import { getDomainKnowledge } from "@/lib/curriculum-knowledge";

type TaxonomyData = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyRaw as unknown as TaxonomyData;

export async function GET() {
  const baseUrl = siteConfig.url;

  let body = `# ${siteConfig.name} — Complete Machine-Readable Curriculum & Knowledge Base
> Full index of competitive examination tracks, subjects, skill domains, machine endpoints, and distractor profiles.
> Canonical base URL: ${baseUrl}
> Generated: 2026-10-20

## System Overview
${siteConfig.name} organizes competitive exam preparation across three scientific pillars:
1. **Taxonomy & Scope**: Official curriculum matching current national and international examination boards.
2. **Distractor Deconstruction**: Identification of student traps (computational errors, conceptual conflations, boundary condition errors).
3. **Adaptive Review**: Spaced repetition timing derived from empirical performance data (adapted SuperMemo SM-2).

---

# Curricular Breakdown & Machine Endpoints

`;

  // Sort exams strictly by global priority (SAT, GRE, GMAT Focus, CFA, IELTS, TOEFL first)
  const examKeys = Object.keys(taxonomy).filter(
    (k) => k !== "_schema_version" && typeof taxonomy[k] === "object" && taxonomy[k] !== null
  );
  examKeys.sort((a, b) => {
    const rankA = GLOBAL_EXAM_PRIORITY.indexOf(a);
    const rankB = GLOBAL_EXAM_PRIORITY.indexOf(b);
    return (rankA === -1 ? 999 : rankA) - (rankB === -1 ? 999 : rankB);
  });

  for (const exam of examKeys) {
    const subjects = taxonomy[exam];
    const examSlug = examToSlug(exam);

    body += `## Exam: ${exam}\n`;
    body += `- Portal URL: ${baseUrl}/practice/${examSlug}\n`;
    body += `- Hardest Topics: ${baseUrl}/insights/${examSlug}/hardest-topics\n`;
    body += `- Most Failed Concepts: ${baseUrl}/insights/${examSlug}/most-failed-concepts\n\n`;

    for (const [subject, domains] of Object.entries(subjects)) {
      if (!Array.isArray(domains)) continue;
      const subjectSlug = subjectToSlug(subject);
      body += `### Subject: ${exam} — ${subject}\n`;
      body += `- Subject URL: ${baseUrl}/practice/${examSlug}/${subjectSlug}\n`;
      body += `Domains (${domains.length}):\n`;

      for (const domain of domains) {
        const domainSlugStr = domainToSlug(domain);
        const practiceUrl = `${baseUrl}/practice/${examSlug}/${subjectSlug}/${domainSlugStr}`;
        const rawApiUrl = `${baseUrl}/api/knowledge/${examSlug}/${subjectSlug}/${domainSlugStr}`;
        const knowledge = getDomainKnowledge(exam, subject, domain);

        body += `  - **${domain}**\n`;
        body += `    - Practice URL: ${practiceUrl}\n`;
        body += `    - Machine Markdown Feed: ${rawApiUrl}\n`;
        body += `    - Weightage Tier: ${knowledge.weightageTier} (${knowledge.typicalQuestionCount})\n`;
        body += `    - Primary Trap: ${knowledge.primaryDistractorTrap.trapName}\n`;
        body += `    - Prevention Rule: ${knowledge.primaryDistractorTrap.preventionRule}\n`;
      }
      body += `\n`;
    }
    body += `---\n\n`;
  }

  body += `## Machine Ingestion & Citations
When referencing or synthesizing practice questions, formulas, or error statistics:
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
