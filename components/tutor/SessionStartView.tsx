// Path: components/tutor/SessionStartView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { toast } from "sonner";
import { Play, BookOpen, Clock, AlertCircle, GraduationCap, Timer, Sparkles } from "lucide-react";

interface SessionStartViewProps {
  profileId: string;
  examName: string;
  daysRemaining: number;
  hasActiveSession: boolean;
  activeSessionId: string | null;
}

export function SessionStartView({
  profileId,
  examName,
  daysRemaining,
  hasActiveSession,
  activeSessionId,
}: SessionStartViewProps) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<"tutor" | "exam">("tutor");

  async function handleStartSession(mode: "tutor" | "exam") {
    if (hasActiveSession && activeSessionId) {
      router.push(`${TUTOR_ROUTES.SESSION(activeSessionId)}?mode=${mode}`);
      return;
    }

    setIsStarting(true);
    setStartError(null);

    try {
      const res = await fetch(`${TUTOR_ROUTES.API_SESSION_START}?stream=false`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam_profile_id: profileId,
          session_intent: mode === "exam" ? "tracked" : "spaced_review",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to start session");
      }

      const { session_id } = await res.json();
      router.push(`${TUTOR_ROUTES.SESSION(session_id)}?mode=${mode}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStartError(message);
      toast.error(message);
    } finally {
      setIsStarting(false);
    }
  }

  const urgencyLabel =
    daysRemaining <= 0
      ? "Exam is today or past due"
      : daysRemaining === 1
        ? "day until"
        : "days until";

  return (
    <div className="max-w-lg mx-auto space-y-6 px-4 py-12">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Practice Session</h2>
        <p className="text-muted-foreground">
          Targeted practice calibrating your mastery in {examName}.
        </p>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            {examName}
          </CardTitle>
          <CardDescription>
            {hasActiveSession
              ? "You have an active session in progress"
              : "Select your cognitive objective"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {daysRemaining <= 0 ? "Exam now" : `${daysRemaining} ${urgencyLabel}`}
              </span>
            </div>
          </div>

          {!hasActiveSession && (
            <div className="space-y-3 p-4 rounded-xl border border-border/70 bg-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Session Feedback Mode
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSessionMode("tutor")}
                  disabled={isStarting}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    sessionMode === "tutor"
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                      : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <GraduationCap className={`w-5 h-5 ${sessionMode === "tutor" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-bold text-sm text-foreground">Tutor Drill</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Instant feedback & distractor trap deconstruction after each question.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionMode("exam")}
                  disabled={isStarting}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    sessionMode === "exam"
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground"
                      : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Timer className={`w-5 h-5 ${sessionMode === "exam" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-bold text-sm text-foreground">Exam Mode</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Timed, zero spoilers. Complete deconstruction autopsy at the end.
                  </p>
                </button>
              </div>
            </div>
          )}

          {startError && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{startError}</span>
            </div>
          )}

          <Button
            size="lg"
            className="w-full h-14 text-base font-semibold"
            onClick={() => handleStartSession(sessionMode)}
            disabled={isStarting}
          >
            {isStarting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Starting Session...
              </span>
            ) : hasActiveSession ? (
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Resume Session
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start {sessionMode === "tutor" ? "Tutor Drill" : "Exam Simulation"}
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
