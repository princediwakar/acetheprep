import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HistoryTabsView } from "@/components/tutor/HistoryTabsView";
import type { SessionRow } from "@/types/tutor";

export const metadata = {
  title: "History | AceThePrep",
  description: "Review your past practice sessions, mock tests, and quiz results",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("exam_profiles")
    .select("exam_name, profile_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  const profileId = profile?.profile_id;

  const recentSessionsRes = profileId
    ? await supabase
        .from("sessions")
        .select("id, status, created_at, completed_at, target_domains, session_intent, questions_json")
        .eq("user_id", user.id)
        .eq("exam_profile_id", profileId)
        .order("created_at", { ascending: false })
        .limit(40)
    : { data: [] };

  const recentSessionsRaw = (recentSessionsRes.data || []) as {
    id: string;
    status: string;
    created_at: string;
    completed_at: string | null;
    target_domains: string[] | null;
    session_intent?: string;
    questions_json?: unknown;
  }[];

  const sessionIds = recentSessionsRaw.map((s) => s.id);
  const sessionStatsMap: Record<string, { answered: number; correct: number }> = {};

  if (sessionIds.length > 0) {
    const { data: answersData } = await supabase
      .from("session_answers")
      .select("session_id, is_correct")
      .in("session_id", sessionIds);

    for (const a of answersData || []) {
      if (!sessionStatsMap[a.session_id]) {
        sessionStatsMap[a.session_id] = { answered: 0, correct: 0 };
      }
      sessionStatsMap[a.session_id].answered += 1;
      if (a.is_correct) {
        sessionStatsMap[a.session_id].correct += 1;
      }
    }
  }

  const examSessions: SessionRow[] = recentSessionsRaw.map((s) => {
    const totalQ = Array.isArray(s.questions_json) ? s.questions_json.length : 0;
    const stats = sessionStatsMap[s.id] || { answered: 0, correct: 0 };
    const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
    return {
      id: s.id,
      status: s.status,
      created_at: s.created_at,
      completed_at: s.completed_at,
      target_domains: s.target_domains || [],
      session_intent: s.session_intent,
      totalQuestions: totalQ,
      answeredCount: stats.answered,
      correctCount: stats.correct,
      accuracy,
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      <HistoryTabsView
        examName={profile?.exam_name || null}
        examSessions={examSessions}
      />
    </div>
  );
} 