// Path: lib/ai.ts
import OpenAI from "openai";
import {
  parseQuiz,
} from "./parse/quiz";
import {
  getVariabilityInstructions,
  buildSystemMessage,
  buildUserMessage,
  generateSessionFingerprint,
} from "./prompts/quiz";
import type { GeneratedQuiz } from "./schemas/quiz";
import { searchDeepSeek, formatSearchContext } from "./deepseek-search";

type AIProvider = "openai" | "deepseek";

interface ProviderConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

const rawProvider = process.env.AI_PROVIDER;
const PROVIDER: AIProvider = rawProvider === "openai" ? "openai" : "deepseek";

const defaultBaseURL = PROVIDER === "openai" ? "https://api.openai.com" : "https://api.deepseek.com";
const rawBaseURL = process.env.AI_BASE_URL;
const baseURL = rawBaseURL && (rawBaseURL.startsWith("http://") || rawBaseURL.startsWith("https://"))
  ? rawBaseURL
  : defaultBaseURL;

const rawApiKey = PROVIDER === "openai"
  ? process.env.OPENAI_API_KEY
  : (process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY);
const apiKey = rawApiKey && !rawApiKey.startsWith("[") ? rawApiKey : "placeholder-key";

const model = process.env.OPENAI_MODEL || (PROVIDER === "openai" ? "gpt-4o" : "deepseek-flash");

export const MODEL = model;
const IS_OPENAI = PROVIDER === "openai";

export const openai = new OpenAI({
  apiKey,
  baseURL,
});

const CURRENT_AFFAIRS_PATTERNS = [
  /\b(202[4-9]|203\d)\b/i, // Years 2024-2039
  /\b(latest|recently|breaking news|trending)\b/i,
  /\b(today|this week|this month|this year)\b/i,
  /\b(election[s]?|president|prime minister|cabinet minister)\b/i,
  /\b(stock market|inflation rate|recession|union budget)\b/i,
  /\b(olympics|world cup|championship winner|tournament winner)\b/i,
  /\b(nobel prize|oscar[s]?|grammy[s]?|academy award[s]?)\b/i,
  /\b(spacex launch|nasa mission|artemis|chandrayaan)\b/i,
  /\b(product launch|iphone 1[5-9]|ios 1[8-9]|deepseek-v[3-9]|gpt-5)\b/i,
  /what('s| is) new in\b/i,
  /what happened (recently|lately|this year)\b/i,
  /latest (news|developments|trends|syllabus|guidelines|dates|notification)\b/i,
  /current (events|affairs|situation|state of)\b/i,
  /who (won|is the (current|new))\b/i,
];

function needsCurrentAffairsSearch(content: string): boolean {
  return CURRENT_AFFAIRS_PATTERNS.some(pattern => pattern.test(content));
}

async function getSearchContext(content: string, signal?: AbortSignal): Promise<string | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('[DeepSeek Search] API key not configured, skipping search');
    return null;
  }
  if (!needsCurrentAffairsSearch(content)) {
    console.log('[DeepSeek Search] Content does not require current affairs search');
    return null;
  }
  console.log('[DeepSeek Search] Detected current affairs topic, searching...');
  const searchResults = await searchDeepSeek(content, { count: 5 }, signal);
  if (!searchResults || !searchResults.results?.length) {
    console.log('[DeepSeek Search] Search returned no results or failed, continuing without web info');
    return null;
  }
  console.log(`[DeepSeek Search] Found ${searchResults.results.length} results`);
  return formatSearchContext(searchResults.results);
}

const CHUNK_SIZE = 15;

export interface GenerationProgress {
  done: number;
  total: number;
}

export interface ChunkedQuizResult {
  quiz: GeneratedQuiz | null;
  partial: boolean;
  totalGenerated: number;
  totalRequested: number;
}

function buildResponseFormat() {
  if (IS_OPENAI) {
    return {
      type: "json_schema" as const,
      json_schema: {
        name: "quiz",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            topic: { type: "string" },
            subject: { type: "string" },
            language: { type: "string" },
            difficulty: { type: "string" },
            questions: { type: "array", items: { type: "object" } },
            question_groups: { type: "array", items: { type: "object" } },
          },
          required: ["title", "description", "topic", "subject", "language", "difficulty"],
          additionalProperties: false,
        },
      },
    };
  }
  return { type: "json_object" as const };
}

const CHUNK_TIMEOUT_MS = 120_000;
const PROGRESS_PATTERN = /"correct_option"\s*:/g;

async function generateWithProgress(
  content: string,
  questionCount: number,
  difficulty: string,
  language: string,
  sessionFingerprint: string,
  searchContext: string | null,
  onProgress?: (progress: GenerationProgress) => void,
  focusTopics?: string[]
): Promise<GeneratedQuiz> {
  const maxTokens = Math.max(Math.min(questionCount * 1200 + 2000, 16384), 4096);
  const variabilityInstructions = await getVariabilityInstructions(sessionFingerprint, difficulty);
  const systemMessage = buildSystemMessage(
    variabilityInstructions, language, difficulty, questionCount, maxTokens,
    focusTopics?.length ? `Focus topics: ${focusTopics.join(", ")}` : undefined
  );
  const messages = [
    { role: "system" as const, content: systemMessage },
    { role: "user" as const, content: buildUserMessage(content, questionCount, crypto.randomUUID(), searchContext) },
  ];

  const stream = await openai.chat.completions.create(
    {
      model: MODEL,
      messages,
      temperature: 0.95,
      max_tokens: maxTokens,
      response_format: buildResponseFormat(),
      stream: true,
    },
    { signal: AbortSignal.timeout(CHUNK_TIMEOUT_MS) }
  );

  let raw = "";
  let lastReported = 0;
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      raw += delta;
      const matchCount = (raw.match(PROGRESS_PATTERN) || []).length;
      if (matchCount > lastReported) {
        lastReported = matchCount;
        onProgress?.({ done: Math.min(matchCount, questionCount), total: questionCount });
      }
    }
  }

  if (!raw || raw.length < 20) {
    throw new Error("AI returned empty or too-short streamed response");
  }

  const quiz = parseQuiz(raw, questionCount);
  onProgress?.({ done: questionCount, total: questionCount });
  return quiz;
}

async function generateSingleChunk(
  content: string,
  questionCount: number,
  difficulty: string,
  language: string,
  sessionFingerprint: string,
  searchContext: string | null,
  focusTopics?: string[]
): Promise<GeneratedQuiz> {
  const maxTokens = Math.max(Math.min(questionCount * 1200 + 2000, 16384), 4096);
  const variabilityInstructions = await getVariabilityInstructions(sessionFingerprint, difficulty);
  const systemMessage = buildSystemMessage(
    variabilityInstructions, language, difficulty, questionCount, maxTokens,
    focusTopics?.length ? `Focus topics: ${focusTopics.join(", ")}` : undefined
  );
  const messages = [
    { role: "system" as const, content: systemMessage },
    { role: "user" as const, content: buildUserMessage(content, questionCount, crypto.randomUUID(), searchContext) },
  ];

  const response = await openai.chat.completions.create(
    {
      model: MODEL,
      messages,
      temperature: 0.95,
      max_tokens: maxTokens,
      response_format: buildResponseFormat(),
    },
    { signal: AbortSignal.timeout(CHUNK_TIMEOUT_MS) }
  );

  const rawResponse = response.choices[0]?.message?.content || "";

  if (!rawResponse || rawResponse.length < 20) {
    const finishReason = response.choices[0]?.finish_reason;
    throw new Error(
      `AI returned empty or too-short response (finish_reason: ${finishReason}, ` +
      `completion_tokens: ${response.usage?.completion_tokens ?? '?'})`
    );
  }

  return parseQuiz(rawResponse, questionCount);
}

export async function createQuizWithAI(
  content: string,
  questionCount: number,
  difficulty: string = "Medium",
  language: string = "Auto",
  maxAttempts: number = 3,
  userId?: string,
  onProgress?: (progress: GenerationProgress) => void,
  signal?: AbortSignal,
  focusTopics?: string[]
): Promise<GeneratedQuiz> {
  const sessionFingerprint = await generateSessionFingerprint(content, userId);
  console.log(`[AI] Session Fingerprint: ${sessionFingerprint}`);

  const searchContext = await getSearchContext(content, signal);

  if (questionCount <= CHUNK_SIZE) {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await generateWithProgress(
          content, questionCount, difficulty, language,
          sessionFingerprint, searchContext, onProgress, focusTopics
        );
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts - 1) {
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
          console.log(`[AI] Retry ${attempt + 1}/${maxAttempts} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError ?? new Error("Failed to generate quiz");
  }

  const chunkSizes = distributeChunks(questionCount, CHUNK_SIZE);
  let failedChunks = 0;
  let totalDone = 0;

  const chunkPromises = chunkSizes.map(async (chunkSize, i) => {
    let chunkResult: GeneratedQuiz | null = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (signal?.aborted && attempt === 0) {
        console.log(`[AI] Client dropped, continuing chunk generation in background.`);
      }

      try {
        chunkResult = await generateSingleChunk(
          content, chunkSize, difficulty, language,
          sessionFingerprint, searchContext, focusTopics
        );
        break;
      } catch (error) {
        if (attempt === maxAttempts - 1) {
          console.error(`[AI] Chunk ${i + 1} failed completely.`);
          failedChunks++;
        } else {
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
          console.log(`[AI] Retry ${attempt + 1}/${maxAttempts} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (chunkResult) {
      const questionsInChunk = (chunkResult.questions?.length ?? 0) +
        (chunkResult.question_groups?.reduce((s, g) => s + (g.questions?.length ?? 0), 0) ?? 0);
      totalDone += questionsInChunk;
      onProgress?.({ done: Math.min(totalDone, questionCount), total: questionCount });
    }

    return chunkResult;
  });

  const chunkResults = await Promise.all(chunkPromises);
  const chunks = chunkResults.filter((c): c is GeneratedQuiz => c !== null);

  if (chunks.length === 0) {
    throw new Error("All chunks failed to generate");
  }

  const merged = mergeChunks(chunks);
  const total = (merged.questions?.length ?? 0) + (merged.question_groups?.reduce((s, g) => s + (g.questions?.length ?? 0), 0) ?? 0);
  console.log(`[AI] Generated ${total}/${questionCount} questions across ${chunks.length} chunks (${failedChunks} failed)`);

  return merged;
}

export async function createQuizChunked(
  content: string,
  questionCount: number,
  difficulty: string,
  language: string,
  userId?: string,
  onProgress?: (progress: GenerationProgress) => void,
  signal?: AbortSignal,
  focusTopics?: string[]
): Promise<ChunkedQuizResult> {
  try {
    const quiz = await createQuizWithAI(
      content, questionCount, difficulty, language, 3, userId,
      onProgress, signal, focusTopics
    );
    const total = (quiz.questions?.length ?? 0) + (quiz.question_groups?.reduce((s, g) => s + (g.questions?.length ?? 0), 0) ?? 0);
    return { quiz, partial: total < questionCount, totalGenerated: total, totalRequested: questionCount };
  } catch (error) {
    console.error("[AI] Chunked generation failed:", error);
    return { quiz: null, partial: true, totalGenerated: 0, totalRequested: questionCount };
  }
}

function distributeChunks(total: number, chunkSize: number): number[] {
  const chunks: number[] = [];
  let remaining = total;
  while (remaining > 0) {
    const size = Math.min(remaining, chunkSize);
    chunks.push(size);
    remaining -= size;
  }
  return chunks;
}

function mergeChunks(chunks: GeneratedQuiz[]): GeneratedQuiz {
  if (chunks.length === 1) return chunks[0];
  const first = chunks[0];
  const merged: GeneratedQuiz = {
    title: first.title,
    description: first.description,
    topic: first.topic,
    subject: first.subject,
    language: first.language,
    difficulty: first.difficulty,
    questions: [],
    question_groups: [],
  };
  for (const chunk of chunks) {
    if (chunk.questions?.length) merged.questions!.push(...chunk.questions);
    if (chunk.question_groups?.length) merged.question_groups!.push(...chunk.question_groups);
  }
  return merged;
}
