// Path: app/api/tutor/evaluate-semantic/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { evaluateSemanticAnswer } from "@/lib/services/ai-evaluator";

const EvaluateSemanticRequestSchema = z.object({
  questionStem: z.string().min(5),
  canonicalAnswer: z.string().min(1),
  studentAnswer: z.string().min(1),
  passageSnippet: z.string().optional(),
  acceptableVariants: z.array(z.string()).optional(),
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
        { error: "Sign in to access semantic evaluation." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = EvaluateSemanticRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = await evaluateSemanticAnswer(parsed.data);

    return NextResponse.json({
      success: true,
      evaluation: result,
    });
  } catch (error) {
    console.error("[EvaluateSemanticRoute] Error:", error);
    return NextResponse.json(
      { error: "Semantic evaluation failed." },
      { status: 500 }
    );
  }
}
