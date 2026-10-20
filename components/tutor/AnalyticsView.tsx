// Path: components/tutor/AnalyticsView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, TrendingUp, Zap, Clock, ChevronRight, Trash2 } from "lucide-react";
import { discardSessionAction, discardAllActiveSessionsAction } from "@/lib/actions/tutor";
import { toast } from "sonner";
import type { AnalyticsPageData } from "@/app/analytics/page";
import Link from "next/link";
import { HeaderPortal } from "@/components/shared/HeaderPortal";
import { DomainBar } from "./DomainBar";
import { SessionRow } from "./SessionRow";
import { AnalyticsViewLoading } from "./AnalyticsViewLoading";

export { AnalyticsViewLoading };

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="border shadow-sm bg-card hover:border-primary/20 transition-colors">
      <CardContent className="p-5 flex items-center gap-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-black leading-none mb-1.5">{value}</div>
          <div className="text-sm text-muted-foreground font-semibold">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsView({ data }: { data: AnalyticsPageData }) {
  const router = useRouter();
  const [activeSessions, setActiveSessions] = useState(data.activeSessions || []);

  const handleDiscard = async (sessionId: string) => {
    const prevSessions = [...activeSessions];
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
    try {
      const res = await discardSessionAction({ session_id: sessionId });
      if (!res.success) throw new Error(res.error || "Failed to discard");
      toast.info("Session discarded.");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to discard");
      setActiveSessions(prevSessions);
    }
  };

  const handleDiscardAll = async () => {
    const toDiscard = [...activeSessions];
    setActiveSessions([]);
    try {
      const res = await discardAllActiveSessionsAction();
      if (!res.success) throw new Error(res.error || "Failed to discard all sessions.");
      toast.info(`Discarded ${res.discardedCount || toDiscard.length} incomplete session${(res.discardedCount || toDiscard.length) !== 1 ? "s" : ""}.`);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to discard all sessions.");
      setActiveSessions(toDiscard);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-4 sm:py-6">
      {/* Header Slot: Collapsed Analytics Status into Top Header */}
      <HeaderPortal>
        <div className="flex items-center gap-2">
          {/* Readiness Index Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/80 shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Readiness
            </span>
            <span className="font-extrabold text-foreground tabular-nums text-xs sm:text-sm">
              <span className={
                data.readinessIndex < 40 ? "text-red-500" :
                data.readinessIndex < 70 ? "text-yellow-500" :
                "text-green-500"
              }>
                {data.readinessIndex}
              </span>
              <span className="text-muted-foreground text-[10px] font-normal">/100</span>
            </span>
          </div>
        </div>
      </HeaderPortal>

      {/* Section 2: Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={Target}
          label="Questions answered"
          value={data.totalQuestions.toLocaleString()}
        />
        <StatCard icon={Zap} label="Day streak" value={`${data.streak}`} />
        <StatCard
          icon={TrendingUp}
          label="Sessions completed"
          value={`${data.sessionsCompleted}`}
        />
      </div>

      {/* Section 3: Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-sm h-fit">
          <CardHeader className="border-b bg-muted/20 py-4 px-5">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Domain Mastery
            </CardTitle>
            <CardDescription className="text-xs">
              Mastery scores across {data.domainBreakdown.length} domains
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            {data.domainBreakdown.length > 0 ? (
              <div className="max-h-[600px] overflow-y-auto p-2 space-y-1">
                {data.domainBreakdown
                  .sort((a, b) => a.score - b.score)
                  .map((d) => (
                    <DomainBar key={d.domain} domain={d.domain} score={d.score} totalAttempted={d.totalAttempted} />
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">
                Complete your first session to see domain mastery scores.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {activeSessions.length > 0 && (
            <Card className="border border-amber-500/30 bg-amber-500/5 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-amber-500/20 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <Zap className="w-4 h-4 text-amber-500" />
                    In Progress ({activeSessions.length})
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Unfinished sessions waiting for you
                  </CardDescription>
                </div>
                {activeSessions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDiscardAll}
                    className="h-7 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Discard All
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-2 space-y-1.5">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg border border-border/70 bg-card flex items-center justify-between gap-3 shadow-sm hover:border-amber-500/30 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold truncate">
                          {session.session_intent === "custom_mock"
                            ? "Mock Exam"
                            : session.session_intent === "tracked"
                              ? "Exam Simulation"
                              : session.session_intent === "diagnostic"
                                ? "Diagnostic Test"
                                : "Tutor Drill"}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Active
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.target_domains?.[0] || "General Practice"} &middot; {session.answeredCount}/{session.totalQuestions} answered
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button asChild size="sm" className="h-8 text-xs font-bold shadow-sm">
                        <Link href={`/session/${session.id}`}>
                          Resume
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDiscard(session.id)}
                        className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Discard session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="border shadow-sm h-fit">
            <CardHeader className="border-b bg-muted/20 py-4 px-5">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Recent Sessions
              </CardTitle>
              <CardDescription className="text-xs">
                {data.recentSessions.length > 0
                  ? `Last ${data.recentSessions.length} completed session${data.recentSessions.length !== 1 ? "s" : ""}`
                  : "No completed sessions yet"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              {data.recentSessions.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto p-2 space-y-1">
                  {data.recentSessions.map((session) => (
                    <SessionRow key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-10">
                  Complete your first session to begin tracking your progress.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;
