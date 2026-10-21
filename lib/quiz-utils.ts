// lib/quiz-utils.ts
import React from "react";
import Katex from "@matejmazur/react-katex";
import { FlattenedQuestion, Quiz, Question, QuestionGroup, StructuredContent } from "@/types/quiz";
import { OptionSchema } from "@/lib/schemas/quiz";

// ======================== Type Definitions ========================
interface KatexProps {
  math: string;
  block?: boolean;
  key?: React.Key;
}

interface Option {
  key: string;
  value: string;
}

export interface GraphDataset {
  type: "bar" | "line" | "pie";
  title: string;
  labels: string[];
  datasets: { label: string; values: number[] }[];
}

interface TableData {
  headers: string[];
  rows: string[][];
}

// ======================== Time Formatting ========================
export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} sec`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
};

// ======================== Option Parsing ========================
export const parseOptions = (options: string | Record<string, string>): Option[] => {
  let obj: unknown;
  if (typeof options === "string") {
    try {
      obj = JSON.parse(options);
    } catch (err) {
      console.error("Failed to parse options JSON:", err);
      obj = {};
    }
  } else {
    obj = options;
  }
  // Validate with Zod
  const parsed = OptionSchema.parse(obj);
  return Object.entries(parsed).map(([key, value]) => ({ key, value }));
};

// ======================== Quiz Flattening ========================
export const flattenQuizQuestions = (quiz: Quiz): FlattenedQuestion[] => {
  const flattened: FlattenedQuestion[] = [];

  // Process standalone questions first
  quiz.questions?.forEach((question, index) => {
    if (isQuestion(question) && isValidQuestion(question)) {
      flattened.push({
        question,
        supportingContent: null,
        source: "standalone",
        originalIndex: index,
      });
    }
  });

  // Process question groups
  quiz.question_groups?.forEach((group, groupIndex) => {
    if (!isValidQuestionGroup(group)) {
      console.warn(`Invalid question group at index ${groupIndex}`);
      return;
    }

    const supporting = group.supporting_content;
    if (!supporting) {
      console.warn(`Group ${group.group_id ?? groupIndex} missing supporting content.`);
      return;
    }

    const { content, type, caption } = supporting;
    
    // Validate content based on type
    if (type === "graph" && !isValidGraphContent(content)) {
      console.error(`Invalid graph content in group ${group.group_id ?? groupIndex}`);
      return;
    }
    if (type === "table" && !isValidTableContent(content)) {
      console.error(`Invalid table content in group ${group.group_id ?? groupIndex}`);
      return;
    }

    // Process questions in the group - all questions should stay with their supporting content
    group.questions.forEach((question, questionIndex) => {
      if (!isValidQuestion(question)) return;

      flattened.push({
        question,
        supportingContent: { content, type, caption: caption ?? "" },
        source: `group-${group.group_id ?? groupIndex}`,
        originalIndex: questionIndex,
      });
    });
  });

  return flattened;
};

// ======================== Graph Parsing ========================
export const parseGraphData = (content: string): GraphDataset | null => {
  try {
    const jsonData = JSON.parse(content) as Record<string, unknown>;
    if (jsonData && jsonData.type && Array.isArray(jsonData.labels) && Array.isArray(jsonData.datasets)) {
      const base = {
        type: jsonData.type as "bar" | "line" | "pie",
        title: (jsonData.title as string) || "Graph Data",
        labels: jsonData.labels.map(String),
      };

      if (jsonData.type === "pie") {
        return {
          ...base,
          datasets: [
            {
              label: (jsonData.datasets[0] as Record<string, unknown>)?.label as string || "Value",
              values: ((jsonData.datasets[0] as Record<string, unknown>)?.values as number[] || []).map(Number),
            },
          ],
        };
      }

      return {
        ...base,
        datasets: (jsonData.datasets as Record<string, unknown>[]).map((d: Record<string, unknown>) => ({
          label: d.label as string || "Series",
          values: (d.values as number[] || []).map(Number),
        })),
      };
    }
  } catch (error) {
    console.error("Graph JSON parse failed:", error);
  }
  return parseGraphDataFromText(content);
};

const parseGraphDataFromText = (content: string): GraphDataset | null => {
  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return null;

  const title = lines[0].includes(":") ? lines.shift()!.trim() : "Graph Data";
  const data: { label: string; value: number }[] = [];

  for (const line of lines) {
    const match = /([^:]+):\s*(\d+)/.exec(line) || /([^-]+)-\s*(\d+)/.exec(line);
    if (match) data.push({ label: match[1].trim(), value: Number(match[2]) });
  }

  if (data.length === 0) return null;
  return {
    type: "bar",
    title,
    labels: data.map((d) => d.label),
    datasets: [{ label: "Values", values: data.map((d) => d.value) }],
  };
};

// ======================== Table Parsing ========================
export const parseTableData = (content: string): TableData | null => {
  try {
    const jsonData = JSON.parse(content) as { headers: string[]; rows: unknown[][] };
    if (Array.isArray(jsonData.headers) && Array.isArray(jsonData.rows)) {
      return {
        headers: jsonData.headers.map(String),
        rows: jsonData.rows.map((r) => r.map(String)),
      };
    }
  } catch (error) {
    console.error("Table JSON parse failed:", error);
  }
  return parseTableDataFromText(content);
};

const parseTableDataFromText = (content: string): TableData | null => {
  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return null;

  const delimiters = ["|", ";", "\t", ","];
  let headers: string[] = [];
  let rows: string[][] = [];

  for (const delim of delimiters) {
    if (lines[0].includes(delim)) {
      headers = lines[0].split(delim).map((c) => c.trim());
      rows = lines.slice(1).map((line) => {
        const parts = line.split(delim).map((c) => c.trim());
        return parts.length < headers.length
          ? [...parts, ...Array(headers.length - parts.length).fill("")]
          : parts.slice(0, headers.length);
      });
      break;
    }
  }

  return headers.length && rows.length ? { headers, rows } : null;
};

// ======================== Validation Helpers ========================
const isValidQuestion = (q: Question): boolean =>
  typeof q.question_text === "string" &&
  typeof q.options === "object" &&
  q.options !== null &&
  typeof q.correct_option === "string";

const isValidQuestionGroup = (g: QuestionGroup): boolean =>
  Array.isArray(g.questions) &&
  g.questions.every(isValidQuestion) &&
  (!g.supporting_content ||
    (typeof g.supporting_content.content === "string" || typeof g.supporting_content.content === "object"));

const isValidGraphContent = (content: string | StructuredContent): boolean => {
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return parsed && typeof parsed.type === 'string' && Array.isArray(parsed.labels) && Array.isArray(parsed.datasets);
    } catch {
      return false;
    }
  }
  return content && 'type' in content && 'labels' in content && 'datasets' in content && 
         typeof content.type === 'string' && Array.isArray(content.labels) && Array.isArray(content.datasets);
};

const isValidTableContent = (content: string | StructuredContent): boolean => {
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return parsed && Array.isArray(parsed.headers) && Array.isArray(parsed.rows);
    } catch {
      return false;
    }
  }
  return content && 'headers' in content && 'rows' in content && 
         Array.isArray(content.headers) && Array.isArray(content.rows);
};

// ======================== Math Rendering ========================
export const renderMathContent = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/g);
  return parts.map((part, idx) => {
    try {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return React.createElement(Katex as React.ComponentType<KatexProps>, {
          key: idx,
          math: part.slice(2, -2),
          block: true,
        });
      }
      if (part.startsWith("$") && part.endsWith("$")) {
        return React.createElement(Katex as React.ComponentType<KatexProps>, {
          key: idx,
          math: part.slice(1, -1),
        });
      }
      return React.createElement("span", { key: idx }, part);
    } catch (error) {
      console.error(`Math render error for part: ${part}`, error);
      return React.createElement("span", { key: idx, className: "text-red-600 dark:text-red-400" }, part);
    }
  });
};

// Type guard for Question
function isQuestion(q: unknown): q is Question {
  if (typeof q !== "object" || q === null) return false;
  const obj = q as { question_text?: unknown; options?: unknown; correct_option?: unknown };
  return (
    typeof obj.question_text === "string" &&
    typeof obj.options === "object" &&
    typeof obj.correct_option === "string"
  );
}

// ======================== Passage Extraction ========================
export interface ExtractedQuestionContent {
  passage: string | null;
  prompt: string;
  isAudioTranscript?: boolean;
}

/**
 * Extracts reading passage and question prompt cleanly.
 * Works for explicit passage fields, audio transcript excerpts, and backward-compatible embedded passages in question_text.
 */
export function extractPassageContent(
  questionText: string,
  explicitPassage?: string | null
): ExtractedQuestionContent {
  if (explicitPassage && explicitPassage.trim().length > 0) {
    const isAudio = /^(?:Audio Transcript|Listening (?:Lecture|Conversation)|Acoustic Track)/i.test(explicitPassage.trim());
    return {
      passage: explicitPassage.trim(),
      prompt: questionText.trim(),
      isAudioTranscript: isAudio,
    };
  }

  if (!questionText) {
    return { passage: null, prompt: "" };
  }

  // Pattern 0: Audio Transcript Excerpt / Listening Excerpt (IELTS / TOEFL)
  const audioPrefixRegex = /^(?:Audio Transcript(?:\s+Excerpt)?|Listening (?:Lecture|Conversation)(?:\s+Excerpt)?|Spoken Lecture Excerpt):\s*["']?([\s\S]+?)["']?\s*\n\n+([\s\S]+)$/i;
  const audioMatch = questionText.match(audioPrefixRegex);
  if (audioMatch && audioMatch[1] && audioMatch[2]) {
    return {
      passage: audioMatch[1].trim(),
      prompt: audioMatch[2].trim(),
      isAudioTranscript: true,
    };
  }

  // Pattern 1: Passage: '...' \n\n (Question prompt) or Passage excerpt: '...'
  const passagePrefixRegex = /^(?:Passage(?:\s+excerpt)?|Read the (?:following )?passage(?: carefully)?(?:\s+and answer the question)?|Read the excerpt below):\s*["']?([\s\S]+?)["']?\s*\n\n+([\s\S]+)$/i;
  const match = questionText.match(passagePrefixRegex);

  if (match && match[1] && match[2]) {
    const candidatePassage = match[1].trim().replace(/^['"]|['"]$/g, "");
    if (candidatePassage.split(/\s+/).length >= 25) {
      return {
        passage: candidatePassage,
        prompt: match[2].trim(),
        isAudioTranscript: false,
      };
    }
  }

  // Pattern 2: Prompt followed by passage (CAT style: "According to the passage, ... is that:\n\nJoseph Schumpeter...")
  const promptFirstRegex = /^([A-Z][\s\S]+?\?|According to the passage[\s\S]+?:\s*|Which of the following[\s\S]+?:\s*|Based on the passage[\s\S]+?:\s*)\n\n+([\s\S]+)$/i;
  const promptFirstMatch = questionText.match(promptFirstRegex);
  if (promptFirstMatch && promptFirstMatch[1] && promptFirstMatch[2]) {
    const candidatePassage = promptFirstMatch[2].trim();
    if (candidatePassage.split(/\s+/).length >= 35) {
      return {
        passage: candidatePassage,
        prompt: promptFirstMatch[1].trim(),
        isAudioTranscript: false,
      };
    }
  }

  // Pattern 3: Generic multi-paragraph where paragraph 1 is a long reading passage (>= 40 words)
  // and the final paragraph is the question stem.
  const paragraphs = questionText.split(/\n\n+/);
  if (paragraphs.length >= 2) {
    const lastParagraph = paragraphs[paragraphs.length - 1].trim();
    const leadingParagraphs = paragraphs.slice(0, -1).join("\n\n").trim();
    const isQuestionEnding =
      lastParagraph.endsWith("?") ||
      lastParagraph.endsWith(":") ||
      /^(what|which|why|how|according|it can be inferred|the author)/i.test(lastParagraph);

    if (leadingParagraphs.split(/\s+/).length >= 35 && isQuestionEnding) {
      const isAudio = /audio transcript/i.test(leadingParagraphs);
      return {
        passage: leadingParagraphs.replace(/^['"]|['"]$/g, ""),
        prompt: lastParagraph,
        isAudioTranscript: isAudio,
      };
    }
  }

  return {
    passage: null,
    prompt: questionText.trim(),
    isAudioTranscript: false,
  };
}

