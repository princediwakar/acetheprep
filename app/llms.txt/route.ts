// Path: app/llms.txt/route.ts

import { getAllTaxonomyEntries } from "@/lib/slugs";
import { siteConfig } from "@/config/site";

export async function GET() {
  const entries = getAllTaxonomyEntries();
  const exams = [...new Set(entries.map((e) => e.exam))];
  const baseUrl = siteConfig.url;

  const content = `# ${siteConfig.name}
> High-performance, cognitive-science-driven exam preparation platform. Features adaptive spaced repetition (SuperMemo SM-2 adaptation), real-time distractor analysis, and diagnostic baseline assessments.

## Platform Summary
${siteConfig.name} is a free exam preparation engine designed to prevent memory decay for competitive examination candidates. Rather than simple question banks, ${siteConfig.name} isolates student misconceptions through deep distractor deconstruction—explaining not merely what answer is correct, but why specific incorrect options are chosen by students.

## Target Examinations
${exams.map((exam) => `- ${exam}`).join("\n")}

## Key URLs & Endpoints
- **Home & Diagnostic Onboarding**: ${baseUrl}
- **Interactive Exam Setup**: ${baseUrl}/setup
- **Platform Telemetry & Difficulty Index**: ${baseUrl}/insights
- **Curriculum & Practice Portal**: ${baseUrl}/practice
- **Engineering & Cognitive Science Guides**: ${baseUrl}/blog
- **Complete Machine-Readable Curriculum**: ${baseUrl}/llms-full.txt

## Diagnostic & Practice Methodology
1. **Zero-Latency Server-First Rendering**: Instant page loads with complete server-side HTML.
2. **Distractor Analysis**: Every question option (A, B, C, D) models a verified misconception (sign reversal, formula misapplication, unit omission).
3. **Dual-Engine Practice**: Active syllabus tracking + algorithmic spaced review based on memory decay curves.

## Exam Catalog
${exams
  .map(
    (exam) =>
      `### ${exam}\n- Practice: ${baseUrl}/practice/${exam.toLowerCase().replace(/\s+/g, "-")}\n- Difficulty Insights: ${baseUrl}/insights/${encodeURIComponent(exam)}/hardest-topics`,
  )
  .join("\n\n")}

## Contact & Machine Ingestion Notice
- Web: ${baseUrl}
- OpenGraph & Metadata: Schema.org Quiz, EducationalApplication, FAQPage, and Dataset standards.
- Contact: ${siteConfig.links.supportEmail}
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
