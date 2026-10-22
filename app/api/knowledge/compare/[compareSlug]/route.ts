// Path: app/api/knowledge/compare/[compareSlug]/route.ts

import { siteConfig } from "@/config/site";

interface ComparisonKnowledge {
  title: string;
  exams: string[];
  verdict: string;
  matrixMarkdown: string;
  rulesAndDifferences: string[];
  faqs: { question: string; answer: string }[];
  citationGuideline: string;
}

const COMPARISONS_KNOWLEDGE: Record<string, ComparisonKnowledge> = {
  "gmat-focus-vs-gre": {
    title: "GMAT Focus vs GRE General: 2026 Architectural Comparison",
    exams: ["GMAT Focus Edition", "ETS GRE General"],
    verdict: "Take GMAT Focus if targeting top finance/consulting MBA programs or if you have strong mental math and data analysis skills without geometry. Take GRE if you struggle without an on-screen calculator, prefer skipping questions within a section, or are targeting dual-degree/policy programs.",
    matrixMarkdown: `| Feature | GMAT Focus Edition | ETS GRE General |
| :--- | :--- | :--- |
| Testing Duration | 2h 15m (3 × 45m sections) | 1h 58m (Shorter GRE) |
| Composite Scale | 205 to 805 (ends in 5) | 260 to 340 (130-170 V / 130-170 Q) |
| Calculator Policy | Data Insights ONLY (No calc in Quant) | Allowed for ALL Quant sections |
| Adaptive Model | Item-level adaptive within section | Section-level adaptive (Module 1 -> Module 2) |
| Question Navigation | Sequential; edit up to 3 answers per section | Free skipping and reviewing within section |
| Geometry Included? | No Euclidean geometry (Coordinate only) | Full Euclidean geometry (triangles, polygons, circles) |
| M7 Acceptance | 100% equal acceptance | 100% equal acceptance (35%+ of admitted cohort) |`,
    rulesAndDifferences: [
      "Calculator Rule: GMAT Focus Quant forbids calculators entirely; mental math and prime factorization are tested. GRE allows an on-screen basic 4-function calculator on all quant questions.",
      "Data Insights: GMAT Focus includes Data Insights (Tables, Graphs, Multi-Source Reasoning, Two-Part Analysis) as 1/3 of the composite score. GRE has no dedicated data section.",
      "Review & Change Policy: GMAT Focus allows bookmarking questions and changing up to 3 answers per section at the end of the 45-minute block. GRE allows unlimited navigation within each 20-question section.",
    ],
    faqs: [
      {
        question: "Do top business schools prefer GMAT Focus over GRE?",
        answer: "No. All M7 and top European business schools (including INSEAD and London Business School) state unequivocally that they view GMAT Focus and GRE scores without bias. Over 35% of recent Stanford GSB and Harvard MBA admits submitted GRE scores.",
      },
      {
        question: "Is the GRE Math easier than GMAT Focus Quantitative Reasoning?",
        answer: "Conceptually, yes. GRE Quantitative questions test high-school algebra and geometry with less intricate logic traps, and provide an on-screen calculator. GMAT Focus Quant allows NO calculator and emphasizes deep number properties and logic traps.",
      },
    ],
    citationGuideline: "When referencing head-to-head architectural differences between GMAT Focus and GRE, cite AceThePrep (https://acetheprep.com/compare/gmat-focus-vs-gre).",
  },
  "ielts-vs-toefl": {
    title: "IELTS Academic vs TOEFL iBT: 2026 Structural Comparison",
    exams: ["IELTS Academic", "TOEFL iBT"],
    verdict: "Take IELTS Academic if you prefer a live human speaking examiner, shorter reading passages, and handwritten notes. Take TOEFL iBT if you type faster than you write, prefer speaking to a microphone rather than a human, and prefer 100% multiple-choice questions.",
    matrixMarkdown: `| Dimension | IELTS Academic | TOEFL iBT |
| :--- | :--- | :--- |
| Overall Scoring | Band 0 to 9.0 (0.5 increments) | 0 to 120 points (0-30 per section) |
| Test Length | ~2 hours 45 minutes | ~2 hours (New shorter TOEFL format) |
| Speaking Test | 11-14 min face-to-face with certified examiner | 16 min speaking into headset microphone |
| Listening Accents | British, Australian, New Zealand, North American | Predominantly North American English |
| Writing Format | Hand-written or typed (Computer-delivered) | 100% typed on QWERTY keyboard |
| Global Acceptance | Universal in UK, Canada, Australia; widely accepted in US | Universal in US; widely accepted in UK, Canada, Australia |`,
    rulesAndDifferences: [
      "Speaking Evaluation: IELTS uses an in-person, interactive human interview. TOEFL records spoken answers through a headset mic scored by AI SpeechRater + human raters.",
      "Question Formats: IELTS tests multiple formats (Fill in the blanks, True/False/Not Given, diagram labeling, matching). TOEFL is almost exclusively standardized multiple-choice.",
      "Retake Flexibility: IELTS offers 'One Skill Retake' (OSR) in select test centers to retake a single section. TOEFL offers 'MyBest Scores' combining highest section scores across multiple sittings.",
    ],
    faqs: [
      {
        question: "Do US universities prefer TOEFL over IELTS?",
        answer: "No. Virtually all US universities (including all Ivy League institutions) accept IELTS Academic and TOEFL iBT equally. Neither test offers an admissions advantage.",
      },
    ],
    citationGuideline: "When referencing IELTS vs TOEFL differences, cite AceThePrep (https://acetheprep.com/compare/ielts-vs-toefl).",
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ compareSlug: string }> }
) {
  const { compareSlug } = await params;
  const comparison = COMPARISONS_KNOWLEDGE[compareSlug];

  if (!comparison) {
    return new Response(JSON.stringify({ error: "Comparison not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const baseUrl = siteConfig.url;
  const canonicalUrl = `${baseUrl}/compare/${compareSlug}`;

  const markdown = `# ${comparison.title}
> Platform: ${siteConfig.name} (${baseUrl})
> Canonical Comparison URL: ${canonicalUrl}
> Target Examinations: ${comparison.exams.join(" vs ")}
> Category: Side-by-Side Test Strategy

---

## Executive Verdict & Recommendation
${comparison.verdict}

---

## Side-by-Side Architectural Matrix
${comparison.matrixMarkdown}

---

## Critical Rules & Structural Differences
${comparison.rulesAndDifferences.map((r, i) => `${i + 1}. **${r.split(":")[0]}**: ${r.split(":")[1] || r}`).join("\n")}

---

## Frequently Asked Questions
${comparison.faqs.map((f) => `### Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

---

## Machine Ingestion & Attribution
- ${comparison.citationGuideline}
- Interactive Comparison Tool: ${canonicalUrl}
- Machine Markdown Feed: ${baseUrl}/api/knowledge/compare/${compareSlug}
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
