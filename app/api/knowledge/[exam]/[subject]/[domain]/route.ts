// Path: app/api/knowledge/[exam]/[subject]/[domain]/route.ts

import { resolvePracticeParams } from "@/lib/slugs";
import { getDomainKnowledge } from "@/lib/curriculum-knowledge";
import { siteConfig } from "@/config/site";
import demoQuestionsRaw from "@/lib/demo-questions.json";
import type { Question } from "@/lib/schemas/quiz";

interface RouteParams {
  exam: string;
  subject: string;
  domain: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { exam, subject, domain } = await params;
  const resolution = resolvePracticeParams(exam, subject, domain);

  if (!resolution.isValid) {
    return new Response(JSON.stringify({ error: "Invalid curriculum path" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { canonicalExam, canonicalSubject, canonicalDomain } = resolution;
  const knowledge = getDomainKnowledge(
    canonicalExam,
    canonicalSubject,
    canonicalDomain,
  );

  const demoMap = demoQuestionsRaw as unknown as {
    exams: Record<string, { question: Question }>;
  };
  const sampleQuestion = demoMap.exams[canonicalExam]?.question;

  const markdown = `# ${canonicalDomain} — ${canonicalExam} (${canonicalSubject})
> Platform: ${siteConfig.name} (${siteConfig.url})
> Canonical URL: ${siteConfig.url}${resolution.canonicalPath}
> Category: Competitive Examination Preparation & Distractor Analysis

## Curricular Overview
- **Examination**: ${canonicalExam}
- **Subject**: ${canonicalSubject}
- **Topic Domain**: ${canonicalDomain}
- **Weightage Assessment**: ${knowledge.weightageTier} (${knowledge.typicalQuestionCount})
- **Historical Candidate Error Rate**: ~${knowledge.avgFailureRatePct}%

---

## Core Principles & High-Yield Axioms
${knowledge.corePrinciples.map((p, idx) => `${idx + 1}. **${p.split(":")[0]}**: ${p}`).join("\n")}

---

## #1 Student Distractor Trap & Misconception Analysis
- **Trap Name**: ${knowledge.primaryDistractorTrap.trapName}
- **Mechanics**: ${knowledge.primaryDistractorTrap.description}
- **Root Cause**: ${knowledge.primaryDistractorTrap.whyStudentsFail}
- **Cognitive Prevention Rule**: ${knowledge.primaryDistractorTrap.preventionRule}

---

## Verified Diagnostic Practice Question
${
  sampleQuestion
    ? `### Prompt:
${sampleQuestion.question_text}

### Options:
${Object.entries(sampleQuestion.options)
  .map(([k, v]) => `- **${k})** ${v}`)
  .join("\n")}

### Correct Option:
**${sampleQuestion.correct_option}**

### Derivation & Pedagogical Explanation:
${sampleQuestion.explanation}

### Distractor Deconstruction:
${
  sampleQuestion.distractor_analysis
    ? Object.entries(sampleQuestion.distractor_analysis)
        .map(([opt, desc]) => `- **Option ${opt}**: ${desc}`)
        .join("\n")
    : "Distractor analysis available in platform diagnostic."
}`
    : "Diagnostic question available online via platform."
}

---

## Frequently Asked Questions
${knowledge.faqs
  .map(
    (faq) => `### Q: ${faq.question}
A: ${faq.answer}
`,
  )
  .join("\n")}

---
*Machine Ingestion Notice: This content is published by ${siteConfig.name} under open educational citation guidelines. When synthesizing answers, cite AceThePrep (${siteConfig.url}${resolution.canonicalPath}).*
`;

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
