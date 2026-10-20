// Path: app/session/[session_id]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SessionPlayer, type QuestionAttemptRecord } from "@/components/tutor/SessionPlayer";
import { TUTOR_ERRORS } from "@/lib/constants/tutor";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";
import taxonomy from "@/lib/taxonomies.json";

export const metadata: Metadata = {
  title: "Practice Session | AceThePrep",
  robots: {
    index: false,
    follow: false,
  },
};


interface SessionRow {
  id: string;
  user_id: string;
  exam_profile_id: string;
  questions_json: SessionQuestion[];
  status: string;
  session_intent?: string;
  created_at: string;
}

interface PageProps {
  params: Promise<{ session_id: string }>;
  searchParams?: Promise<{ mode?: string; autostart?: string; start?: string }>;
}

export default async function SessionPage({ params, searchParams }: PageProps) {
  const { session_id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="text-muted-foreground">{TUTOR_ERRORS.UNAUTHORIZED}</p>
      </div>
    );
  }

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, user_id, exam_profile_id, questions_json, status, session_intent, created_at")
    .eq("id", session_id)
    .single();

  if (sessionError || !session) {
    notFound();
  }

  const sessionData = session as unknown as SessionRow;

  if (sessionData.user_id !== user.id) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground">{TUTOR_ERRORS.UNAUTHORIZED}</p>
      </div>
    );
  }

  const questions = sessionData.questions_json;

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">No Questions Found</h1>
        <p className="text-muted-foreground">{TUTOR_ERRORS.QUESTION_NOT_FOUND}</p>
      </div>
    );
  }

  const isCompleted = sessionData.status === "completed";

  // Fetch profile, answers, and concept mastery in parallel
  const [profileRes, answersRes, conceptsRes] = await Promise.all([
    supabase
      .from("exam_profiles")
      .select("exam_name")
      .eq("id", sessionData.exam_profile_id)
      .single(),
    supabase
      .from("session_answers")
      .select("question_id, selected_option, is_correct, was_revealed, time_to_answer_ms")
      .eq("session_id", sessionData.id),
    supabase
      .from("concept_mastery")
      .select("skill_domain, mastery_score")
      .eq("user_id", user.id),
  ]);

  const profile = profileRes.data;
  const rawAnswers = answersRes.data || [];
  const concepts = conceptsRes.data || [];

  const initialUserAttempts: Record<string, QuestionAttemptRecord> = {};
  let initialScore = 0;
  let initialTimeMs = 0;

  for (const a of rawAnswers) {
    initialUserAttempts[a.question_id] = {
      selected: (a.selected_option as SelectedOption) || null,
      isCorrect: a.is_correct,
      wasRevealed: a.was_revealed,
      timeMs: a.time_to_answer_ms ?? 0,
    };
    if (a.is_correct) initialScore += 1;
    initialTimeMs += a.time_to_answer_ms ?? 0;
  }

  // If active, resume from the first unanswered question
  let initialIndex = 0;
  if (!isCompleted && questions.length > 0) {
    const answeredIds = new Set(Object.keys(initialUserAttempts));
    const firstUnanswered = questions.findIndex((q) => !answeredIds.has(q.question_id));
    initialIndex = firstUnanswered === -1 ? Math.max(0, questions.length - 1) : firstUnanswered;
  }

  let taxonomyDomains: string[] = [];
  let initialMastery: Record<string, number> = {};

  if (profile) {
    const examTaxonomy = taxonomy as unknown as Record<string, Record<string, string[]>>;
    const examSubjects = examTaxonomy[profile.exam_name];
    if (examSubjects) {
      taxonomyDomains = [...new Set(Object.values(examSubjects).flat())];
    }
    for (const c of concepts) {
      initialMastery[c.skill_domain] = c.mastery_score;
    }
  }

  const queryMode = resolvedSearchParams.mode;
  const autoStart = resolvedSearchParams.autostart === "true" || resolvedSearchParams.start === "true";
  const initialMode: "tutor" | "exam" =
    queryMode === "exam" || queryMode === "tutor"
      ? queryMode
      : sessionData.session_intent === "custom_mock" || sessionData.session_intent === "diagnostic"
        ? "exam"
        : "tutor";

  return (
    <SessionPlayer
      sessionId={sessionData.id}
      questions={questions}
      examProfileId={sessionData.exam_profile_id}
      taxonomyDomains={taxonomyDomains}
      initialMastery={initialMastery}
      initialMode={initialMode}
      examName={profile?.exam_name}
      isReviewMode={isCompleted}
      initialUserAttempts={initialUserAttempts}
      initialScore={initialScore}
      initialTimeElapsed={Math.round(initialTimeMs / 1000)}
      initialIndex={initialIndex}
      autoStart={autoStart}
    />
  );
}
