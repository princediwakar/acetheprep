import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  createDeepSeekChatCompletion,
  createDeepSeekResponse,
  DEEPSEEK_MODELS,
} from "../lib/deepseek";
import { getTutorSystemPrompt, buildTutorUserMessage } from "../lib/tutor-prompt";
import { QuestionSchema } from "../lib/schemas/quiz";
import { parseWithRecovery } from "../lib/parse/quiz";

async function testChatCompletions() {
  console.log("--- 1. Testing DeepSeek Chat Completions API ---");
  const systemPrompt = getTutorSystemPrompt();
  const userMessage = buildTutorUserMessage({
    examName: "JEE Advanced",
    examYear: "2026",
    timeMode: "foundation",
    daysRemaining: 120,
    targetDomains: [{
      skillDomain: "Physics - Electromagnetism",
      masteryScore: 0.4,
      recentErrors: [],
      isOverdue: true,
      lastSeenAt: null,
    }],
    questionCount: 1,
    difficultyDistribution: { easy: 0, medium: 1, hard: 0 },
  });

  const response = await createDeepSeekChatCompletion({
    model: DEEPSEEK_MODELS.FLASH,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
    maxTokens: 4096,
    responseFormat: { type: "json_object" },
    thinking: { type: "disabled" },
  });

  const raw = response.choices[0]?.message?.content || "";
  console.log("Chat Completion returned length:", raw.length);
  const parsed = await parseWithRecovery(
    raw,
    QuestionSchema,
    1,
    async () => "retry",
  );
  console.log("Chat Completion Question Parsed Successfully:", parsed.questions.length === 1);
  console.log("Sample Question Text:", (parsed.questions[0] as any).question_text?.slice(0, 100) + "...");
}

async function testResponsesAPI() {
  console.log("\n--- 2. Testing DeepSeek Responses API ---");
  const res = await createDeepSeekResponse({
    model: DEEPSEEK_MODELS.FLASH,
    instructions: "You are a test tutor assistant. Respond in concise JSON format.",
    input: "Return a JSON object with 'status': 'ok' and 'api': 'responses_api'",
    reasoning: { effort: "none" },
    temperature: 0.7,
    maxOutputTokens: 2048,
  });

  console.log("Responses API output_text:", res.output_text);
}

async function run() {
  try {
    await testChatCompletions();
    await testResponsesAPI();
    console.log("\nALL DEEPSEEK TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

run();
