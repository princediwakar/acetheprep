// Path: app/api/session/start/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SessionStartSchema } from "@/lib/validations/tutor";
import { TUTOR_CONFIG, TUTOR_ERRORS } from "@/lib/constants/tutor";
import { generateAndCreateSession } from "@/lib/services/session/start-orchestrator";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function streamSSE(controller: ReadableStreamDefaultController, data: Record<string, unknown>) {
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`));
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: TUTOR_ERRORS.UNAUTHORIZED }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = SessionStartSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { exam_profile_id, question_count, focus_domains, session_intent } = parsed.data;

  const { data: profile, error: profileError } = await supabase
    .from("exam_profiles")
    .select("*")
    .eq("profile_id", exam_profile_id)
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
    return Response.json({ error: TUTOR_ERRORS.INVALID_EXAM_PROFILE }, { status: 400 });
  }

  // Diagnostic always uses 5 questions
  const effectiveQuestionCount =
    session_intent === "diagnostic"
      ? TUTOR_CONFIG.DIAGNOSTIC_QUESTION_COUNT
      : question_count;

  const shouldStream = req.nextUrl.searchParams.get("stream") !== "false";

  if (!shouldStream) {
    try {
      const genResult = await generateAndCreateSession(
        supabase,
        user.id,
        exam_profile_id,
        effectiveQuestionCount,
        focus_domains,
        session_intent,
        profile,
      );

      if (genResult.error) {
        return Response.json(
          { error: genResult.error, details: genResult.details },
          { status: genResult.status ?? 500 },
        );
      }

      return Response.json({ session_id: genResult.result!.session_id });
    } catch (error: any) {
      console.error("SESSION START ERROR:", error.message || error);
      return Response.json(
        { error: TUTOR_ERRORS.AI_GENERATION_FAILED, details: error.message },
        { status: 500 },
      );
    }
  }

  // Streaming SSE
  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      function safeClose() {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }

      function safeStreamSSE(data: Record<string, unknown>) {
        if (closed) return;
        try {
          streamSSE(controller, data);
        } catch {
          closed = true;
        }
      }

      try {
        safeStreamSSE({ type: "connected" });

        const genResult = await generateAndCreateSession(
          supabase,
          user.id,
          exam_profile_id,
          effectiveQuestionCount,
          focus_domains,
          session_intent,
          profile,
        );

        if (genResult.error || !genResult.result) {
          safeStreamSSE({
            type: "error",
            message: genResult.error || "Internal server error.",
          });
          safeClose();
          return;
        }

        safeStreamSSE({
          type: "progress",
          done: genResult.result.questions.length,
          total: effectiveQuestionCount,
          target_domains: genResult.result.target_domains,
        });

        safeStreamSSE({
          type: "complete",
          session_id: genResult.result.session_id,
          questions: genResult.result.questions,
          target_domains: genResult.result.target_domains,
        });
        safeClose();
      } catch (error) {
        safeStreamSSE({
          type: "error",
          message: (error as Error).message || "Internal server error.",
        });
        safeClose();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
