// Path: components/tutor/HistoryTabsView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { QuizHistory } from "@/components/quiz-results/QuizHistory";
import { discardSessionAction } from "@/lib/actions/tutor";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SessionRow } from "@/types/tutor";
import { HeaderPortal } from "@/components/shared/HeaderPortal";
import { SessionHistoryRow } from "./SessionHistoryRow";

interface HistoryTabsViewProps {
  examName: string | null;
  examSessions: SessionRow[];
}

export function HistoryTabsView({ examName, examSessions }: HistoryTabsViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [sessions, setSessions] = useState<SessionRow[]>(examSessions);

  const completedSessions = sessions.filter((s) => s.status === "completed");
  const avgAccuracy =
    completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((acc, s) => acc + s.accuracy, 0) / completedSessions.length
        )
      : 0;

  const handleDiscard = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    e.preventDefault();
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

  return (
    <div className="space-y-4">
      {/* Header Slot: Collapsed History Stats into Top Header */}
      <HeaderPortal>
        <div className="flex items-center gap-2">
          {sessions.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/80 shadow-2xs text-xs font-mono">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">Sessions</span>
              <span className="font-bold text-foreground tabular-nums">{sessions.length}</span>
            </div>
          )}

          {completedSessions.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/80 shadow-2xs text-xs font-mono">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">Accuracy</span>
              <span
                className={cn(
                  "font-bold tabular-nums",
                  avgAccuracy >= 80
                    ? "text-emerald-600 dark:text-emerald-400"
                    : avgAccuracy >= 50
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-amber-600 dark:text-amber-400"
                )}
              >
                {avgAccuracy}%
              </span>
            </div>
          )}
        </div>
      </HeaderPortal>

      {/* Page Title Row */}
      <div className="pb-1 border-b border-border/40">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Test & Practice History
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review your past tests, practice sessions, and mistake breakdowns.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 inline-flex flex-wrap h-auto w-full sm:w-auto justify-start gap-1 bg-muted/50 p-1 rounded-xl border border-border/70">
          <TabsTrigger
            value="sessions"
            className="rounded-lg px-4 py-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm text-muted-foreground transition-all"
          >
            Sessions & Tests ({sessions.length})
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            className="rounded-lg px-4 py-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm text-muted-foreground transition-all"
          >
            Public Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="p-0 mt-0">
          {sessions.length === 0 ? (
            <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">No Practice Sessions Yet</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven&apos;t taken a practice session or test yet. Start one to build your test readiness and review detailed explanations.
              </p>
              <Button asChild className="font-bold">
                <Link href="/home">Start Practicing</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 px-5 py-2.5 bg-muted/40 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold border-b border-border/60">
                <div className="col-span-5">Session & Focus</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Performance</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border/50">
                {sessions.map((session) => (
                  <SessionHistoryRow
                    key={session.id}
                    session={session}
                    examName={examName}
                    onDiscard={handleDiscard}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="quizzes" className="p-0 mt-0">
          <QuizHistory activeExamName={examName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
