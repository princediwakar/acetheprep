// lib/deepseek-search.ts
// Native DeepSeek Search & Fetch client with zero external dependencies.

export interface DeepSeekSearchResult {
  rerank_score: number;
  title: string;
  url: string;
  snippet: string;
  summary: string;
  content: string;
  site_name: string | null;
  site_icon: string | null;
  date: string | null;
  authority: number;
}

export interface DeepSeekSearchResponse {
  results: DeepSeekSearchResult[];
}

export interface DeepSeekSearchOptions {
  count?: number; // 1 to 50, default 10
  need_content?: boolean;
  ori_question?: string; // 1 to 128 chars
  localization?: string;
}

export interface DeepSeekFetchResponse {
  title: string;
  content: string;
}

const DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/tools";

function getApiKey(): string | null {
  return process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || null;
}

/**
 * DeepSeek query strictly requires 1 to 128 Unicode characters and cannot be pure whitespace.
 * Intelligently truncate or clean user input to stay within limits.
 */
export function sanitizeSearchQuery(raw: string): { query: string; ori_question?: string } {
  const normalized = raw.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return { query: "" };
  }

  if (normalized.length <= 128) {
    return { query: normalized };
  }

  // If input is longer than 128 chars, take first clean sentence or up to 128 characters
  const firstSentence = normalized.split(/[.?!]\s+/)[0]?.trim() || "";
  const query = (firstSentence.length >= 10 && firstSentence.length <= 128)
    ? firstSentence
    : normalized.slice(0, 128).trim();

  const ori_question = normalized.slice(0, 128).trim();
  return { query, ori_question };
}

/**
 * Perform a web search via DeepSeek Search API.
 * Uses native fetch with timeout and graceful fallback.
 */
export async function searchDeepSeek(
  rawQuery: string,
  options: DeepSeekSearchOptions = {},
  signal?: AbortSignal
): Promise<DeepSeekSearchResponse | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[DeepSeek Search] API key not configured, skipping search");
    return null;
  }

  const { query, ori_question: derivedQuestion } = sanitizeSearchQuery(rawQuery);
  if (!query) {
    return null;
  }

  const count = Math.min(Math.max(options.count ?? 5, 1), 50);

  // DeepSeek strictly requires 1 to 128 characters for ori_question
  const ori_question = (options.ori_question || derivedQuestion)?.slice(0, 128).trim() || undefined;

  // Set 8-second internal timeout linked with caller signal
  const timeoutSignal = AbortSignal.timeout(8_000);
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  try {
    const res = await fetch(`${DEEPSEEK_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        count,
        need_content: options.need_content ?? false,
        ori_question,
        localization: options.localization?.slice(0, 45) || undefined,
      }),
      signal: combinedSignal,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.error(`[DeepSeek Search] HTTP ${res.status} (${res.statusText}): ${errorText}`);
      return null;
    }

    const data = (await res.json()) as DeepSeekSearchResponse;
    return data;
  } catch (error) {
    if (signal?.aborted) {
      console.log("[DeepSeek Search] Request aborted by client");
    } else {
      console.error("[DeepSeek Search] Failed:", error instanceof Error ? error.message : error);
    }
    return null;
  }
}

/**
 * Fetch a webpage directly into Markdown via DeepSeek Fetch API.
 */
export async function fetchDeepSeekPage(
  url: string,
  signal?: AbortSignal
): Promise<DeepSeekFetchResponse | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[DeepSeek Fetch] API key not configured");
    return null;
  }

  const trimmedUrl = url?.trim() || "";
  if (!trimmedUrl || trimmedUrl.length > 8192 || (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://"))) {
    console.error("[DeepSeek Fetch] Invalid URL (must start with http:// or https:// and be <= 8192 chars):", trimmedUrl);
    return null;
  }

  const timeoutSignal = AbortSignal.timeout(10_000);
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  try {
    const res = await fetch(`${DEEPSEEK_BASE_URL}/fetch`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: trimmedUrl }),
      signal: combinedSignal,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.error(`[DeepSeek Fetch] HTTP ${res.status} (${res.statusText}): ${errorText}`);
      return null;
    }

    const data = (await res.json()) as DeepSeekFetchResponse;
    return data;
  } catch (error) {
    if (signal?.aborted) {
      console.log("[DeepSeek Fetch] Request aborted by client");
    } else {
      console.error("[DeepSeek Fetch] Failed:", error instanceof Error ? error.message : error);
    }
    return null;
  }
}

/**
 * Format search results into a clean prompt context block for LLM generation.
 * DeepSeek provides a dedicated 600-800 character `summary` specifically designed for models,
 * alongside a `rerank_score` (0-3, >= 1.5 is high quality).
 */
export function formatSearchContext(results: DeepSeekSearchResult[]): string {
  if (!results || results.length === 0) return "";

  // Sort descending by rerank_score (if present)
  const sorted = [...results].sort((a, b) => (b.rerank_score ?? 0) - (a.rerank_score ?? 0));

  // Filter out low quality results (rerank_score < 0.8), but fall back to sorted if all are marginal
  const highQuality = sorted.filter(r => (r.rerank_score ?? 0) >= 0.8);
  const topResults = (highQuality.length > 0 ? highQuality : sorted).slice(0, 3);

  const formatted = topResults
    .map((r, i) => {
      // Prioritize the model-optimized summary, fallback to snippet
      const rawText = r.summary?.trim() || r.snippet?.trim() || "";
      const text = rawText
        .replace(/\r?\n+/g, " ")
        .replace(/\s+/g, " ")
        .slice(0, 600)
        .trim();
      const source = r.site_name ? ` (${r.site_name})` : "";
      const date = r.date ? ` [${r.date.split("T")[0]}]` : "";
      return `${i + 1}. ${r.title}${source}${date}:\n${text}`;
    })
    .join("\n\n");

  return `CURRENT INFORMATION (from DeepSeek live web search):\n${formatted}\n\nUse this information to ensure the quiz contains accurate, up-to-date content.`;
}
