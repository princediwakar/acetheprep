// Path: app/api/session/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SessionCompleteSchema } from "@/lib/validations/tutor";
import { processSessionCompletion } from "@/lib/services/session/complete-orchestrator";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Sign in to complete your session." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = SessionCompleteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { session_id } = parsed.data;

    const completion = await processSessionCompletion(supabase, user.id, session_id);

    if (completion.error || !completion.result) {
      return NextResponse.json(
        { error: completion.error || "Failed to complete session." },
        { status: completion.status ?? 500 }
      );
    }

    revalidatePath("/home");
    revalidatePath("/dashboard");
    revalidatePath("/analytics");

    return NextResponse.json(completion.result);
  } catch (error) {
    console.error("[SessionComplete] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
