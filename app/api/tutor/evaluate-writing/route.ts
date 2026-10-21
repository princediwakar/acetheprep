// Path: app/api/tutor/evaluate-writing/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { evaluateIeltsWriting, evaluateToeflWriting } from "@/lib/services/ai-evaluator";

const EvaluateWritingRequestSchema = z.object({
  exam: z.enum(["IELTS", "TOEFL", "IELTS Academic", "TOEFL iBT"]),
  taskType: z.enum(["task_1", "task_2", "integrated", "academic_discussion"]),
  taskPrompt: z.string().min(10, "Task prompt must be at least 10 characters"),
  studentText: z.string().min(20, "Student essay must be at least 20 characters"),
  supplementalContext: z.string().optional(),
  sessionId: z.string().uuid().optional(),
  questionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Sign in to access AI evaluation." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = EvaluateWritingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { exam, taskType, taskPrompt, studentText, supplementalContext } = parsed.data;

    const isIelts = exam.toUpperCase().includes("IELTS");

    if (isIelts) {
      const ieltsTaskType = taskType === "task_1" ? "task_1" : "task_2";
      const result = await evaluateIeltsWriting({
        taskType: ieltsTaskType,
        taskPrompt,
        studentText,
        chartOrPassageDescription: supplementalContext,
      });

      return NextResponse.json({
        success: true,
        exam: "IELTS",
        evaluation: result,
      });
    } else {
      const toeflTaskType = taskType === "integrated" ? "integrated" : "academic_discussion";
      const result = await evaluateToeflWriting({
        taskType: toeflTaskType,
        taskPrompt,
        studentText,
        readingPassage: supplementalContext,
      });

      return NextResponse.json({
        success: true,
        exam: "TOEFL",
        evaluation: result,
      });
    }
  } catch (error) {
    console.error("[EvaluateWritingRoute] Fatal error:", error);
    return NextResponse.json(
      { error: "Evaluation engine encountered an error. Please retry." },
      { status: 500 }
    );
  }
}
