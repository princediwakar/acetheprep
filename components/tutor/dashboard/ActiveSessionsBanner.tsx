// Path: components/tutor/dashboard/ActiveSessionsBanner.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight, Trash2 } from "lucide-react";
import { discardSessionAction, discardAllActiveSessionsAction } from "@/lib/actions/tutor";
import { toast } from "sonner";
import type { SessionRow } from "@/types/tutor";

interface ActiveSessionsBannerProps {
  initialSessions: SessionRow[];
}

export function ActiveSessionsBanner({ initialSessions }: ActiveSessionsBannerProps) {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionRow[]>(initialSessions);

  if (sessions.length === 0) {
    return null;
  }

  const handleDiscard = async (sessionId: string) => {
    const prevSessions = [...sessions];
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    try {
      const res = await discardSessionAction({ session_id: sessionId });
      if (!res.success) throw new Error(res.error || "Failed to discard session");
      toast.info("Session discarded.");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to discard session");
      setSessions(prevSessions);
    }
  };

  const handleDiscardAll = async () => {
    const prevSessions = [...sessions];
    setSessions([]);
    try {
      const res = await discardAllActiveSessionsAction();
      if (!res.success) throw new Error(res.error || "Failed to discard all sessions");
      toast.info(`Discarded ${res.discardedCount || prevSessions.length} session${(res.discardedCount || prevSessions.length) !== 1 ? "s" : ""}.`);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to discard sessions");
      setSessions(prevSessions);
    }
  };

  return (
    <Card className="border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-card to-amber-500/5 shadow-xs overflow-hidden">
      <CardHeader className="py-2.5 px-4 border-b border-amber-500/20 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <CardTitle className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-foreground">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            In-Progress Session{sessions.length > 1 ? `s (${sessions.length})` : ""}
          </CardTitle>
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            — Pick up right where you left off
          </span>
        </div>
        {sessions.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDiscardAll}
            className="h-6 px-2 text-[11px] text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Discard All
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-2 sm:p-2.5 space-y-2">
        {sessions.map((session) => {
          const totalQ = session.totalQuestions > 0 ? session.totalQuestions : session.answeredCount;
          const intentLabel =
            session.session_intent === "custom_mock"
              ? totalQ >= 50
                ? "Full Mock Test"
                : "Practice Set"
              : session.session_intent === "tracked"
                ? "Timed Test"
                : session.session_intent === "diagnostic"
                  ? "Diagnostic Test"
                  : "Study Session";

          const topicLabel = session.target_domains?.[0] || "Mixed Domains";

          return (
            <div
              key={session.id}
              className="p-3 rounded-lg border border-border/80 bg-card flex items-center justify-between gap-3 shadow-2xs hover:border-amber-500/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-foreground truncate">
                    {intentLabel}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    Active
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium text-foreground/80">{topicLabel}</span>
                  <span>&middot;</span>
                  <span>
                    {session.answeredCount} of {totalQ} questions answered
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button asChild size="sm" className="h-8 px-3 text-xs font-bold shadow-2xs cursor-pointer">
                  <Link href={`/session/${session.id}`}>
                    Resume
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDiscard(session.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  title="Discard session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
