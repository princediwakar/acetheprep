// lib/deepseek.ts
// Official implementation of DeepSeek API specs based on https://api-docs.deepseek.com/
// Supports:
// 1. Chat Completions API (POST /chat/completions) with thinking mode control & JSON object output
// 2. Responses API (POST /responses via client.responses) with reasoning effort control & streaming

import OpenAI from "openai";

export const DEEPSEEK_BASE_URL = "https://api.deepseek.com";

export const DEEPSEEK_MODELS = {
  FLASH: "deepseek-flash",
  V4_PRO: "deepseek-v4-pro",
  CHAT: "deepseek-chat",
  REASONER: "deepseek-reasoner",
} as const;

export type DeepSeekModel = (typeof DEEPSEEK_MODELS)[keyof typeof DEEPSEEK_MODELS] | string;

export interface DeepSeekChatOptions {
  model?: DeepSeekModel;
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "json_object" | "text" };
  thinking?: {
    type: "enabled" | "disabled";
  };
  stream?: boolean;
  signal?: AbortSignal;
}

export interface DeepSeekResponseOptions {
  model?: DeepSeekModel;
  instructions?: string;
  input: string | Array<Record<string, unknown>>;
  reasoning?: {
    effort: "none" | "low" | "high" | "max";
  };
  temperature?: number;
  maxOutputTokens?: number;
  stream?: boolean;
  signal?: AbortSignal;
}

let deepseekClientInstance: OpenAI | null = null;

export function getDeepSeekClient(): OpenAI {
  if (deepseekClientInstance) return deepseekClientInstance;

  const apiKey =
    process.env.DEEPSEEK_API_KEY ||
    process.env.OPENAI_API_KEY ||
    "placeholder-key";

  const baseURL =
    process.env.AI_BASE_URL && (process.env.AI_BASE_URL.startsWith("http://") || process.env.AI_BASE_URL.startsWith("https://"))
      ? process.env.AI_BASE_URL
      : DEEPSEEK_BASE_URL;

  deepseekClientInstance = new OpenAI({
    apiKey,
    baseURL,
  });

  return deepseekClientInstance;
}

/**
 * Chat Completions API (/chat/completions)
 * Ref: https://api-docs.deepseek.com/api/create-chat-completion
 *
 * NOTE: For structured JSON output (like questions / quizzes), thinking mode
 * should be set to { type: "disabled" } to prevent reasoning tokens from
 * consuming max_tokens and to achieve low latency.
 */
export async function createDeepSeekChatCompletion(options: DeepSeekChatOptions) {
  const client = getDeepSeekClient();
  const model = options.model || process.env.OPENAI_MODEL || DEEPSEEK_MODELS.FLASH;

  const requestBody: Record<string, unknown> = {
    model,
    messages: options.messages,
    temperature: options.temperature ?? 1.0,
  };

  if (options.maxTokens) {
    requestBody.max_tokens = options.maxTokens;
  }

  if (options.responseFormat) {
    requestBody.response_format = options.responseFormat;
  }

  // DeepSeek Thinking Mode parameter: { type: "enabled" | "disabled" }
  // When not specified, default to disabled for structured JSON to avoid token starvation,
  // or use explicit setting if passed.
  if (options.thinking) {
    requestBody.thinking = options.thinking;
  } else if (options.responseFormat?.type === "json_object") {
    requestBody.thinking = { type: "disabled" };
  }

  if (options.stream) {
    requestBody.stream = true;
  }

  const response = await client.chat.completions.create(
    requestBody as unknown as OpenAI.Chat.ChatCompletionCreateParamsNonStreaming,
    options.signal ? { signal: options.signal } : undefined
  );

  return response;
}

/**
 * Responses API (/responses)
 * Ref: https://api-docs.deepseek.com/api/create-response
 *
 * Uses OpenAI SDK Responses API compatible endpoint.
 * Controls reasoning via reasoning: { effort: "none" | "low" | "high" | "max" }.
 */
export async function createDeepSeekResponse(options: DeepSeekResponseOptions) {
  const client = getDeepSeekClient();
  const model = options.model || process.env.OPENAI_MODEL || DEEPSEEK_MODELS.FLASH;

  const requestBody: Record<string, unknown> = {
    model,
    input: options.input,
  };

  if (options.instructions) {
    requestBody.instructions = options.instructions;
  }

  if (options.reasoning) {
    requestBody.reasoning = options.reasoning;
  }

  if (options.temperature !== undefined) {
    requestBody.temperature = options.temperature;
  }

  if (options.maxOutputTokens) {
    requestBody.max_output_tokens = options.maxOutputTokens;
  }

  if (options.stream) {
    requestBody.stream = true;
  }

  const response = await client.responses.create(
    requestBody as any,
    options.signal ? { signal: options.signal } : undefined
  );

  return response;
}
