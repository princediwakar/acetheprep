// Path: components/tutor/AnalyticsView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Target, TrendingUp, Zap, Clock, CheckCircle2, AlertCircle, BarChart3, ChevronRight, Trash2 } from "lucide-react";
import { discardSessionAction, discardAllActiveSessionsAction } from "@/lib/actions/tutor";
import { toast } from "sonner";
import type { AnalyticsPageData } from "@/app/analytics/page";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AnalyticsViewLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
      {/* Status Strip Skeleton */}
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border/70 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-3 w-48 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1.5">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>

      {/* Quick Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border/70 bg-card p-5 flex items-center gap-4 shadow-sm">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Domain Breakdown Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4 shadow-sm">
        <Skeleton className="h-5 w-44 rounded-md" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 p-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainBar({ domain, score, totalAttempted }: { domain: string; score: number; totalAttempted: number }) {
  const pct = Math.round(score * 100);
  const notStarted = totalAttempted === 0;
  const barColor =
    score < 0.3 && !notStarted ? "bg-red-500" : score >= 0.7 && !notStarted ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="p-4 rounded-xl hover:bg-muted/40 transition-colors border border-transparent hover:border-border/60 group">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold text-foreground">{domain}</span>
        <span className="text-sm font-bold tabular-nums text-muted-foreground">{notStarted ? "0%" : `${pct}%`}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${notStarted ? "bg-transparent" : barColor}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: AnalyticsPageData["recentSessions"][number] }) {
  const date = new Date(session.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const isCompleted = session.status === "completed";
  const isActive = session.status === "active";

  const intentLabel =
    session.session_intent === "custom_mock"
      ? "Mock Exam"
      : session.session_intent === "tracked"
        ? "Exam Simulation"
        : session.session_intent === "diagnostic"
          ? "Diagnostic Test"
          : "Tutor Drill";

  const domainCount = session.target_domains?.length ?? 0;
  const domainText =
    domainCount === 0
      ? "General Practice"
      : domainCount === 1
        ? session.target_domains[0]
        : `${domainCount} domains`;

  const totalQuestions = session.totalQuestions > 0 ? session.totalQuestions : session.answeredCount;

  return (
    <Link
      href={`/session/${session.id}`}
      className="group block p-3.5 rounded-xl border border-border/70 bg-card hover:border-primary/40 hover:bg-muted/30 transition-all duration-200 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center text-muted-foreground">
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : isActive ? (
              <Zap className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-foreground transition-colors">
                {intentLabel}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground">
                {session.status}
              </span>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <span>{date}</span>
              <span>&middot;</span>
              <span className="truncate max-w-[180px]" title={domainText}>
                {domainText}
              </span>
            </div>
          </div>
        </div>

        {/* Right side metric & CTA */}
        <div className="text-right flex flex-col items-end shrink-0">
          {isCompleted ? (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-foreground tabular-nums">
                  {session.correctCount}/{totalQuestions}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  ({session.accuracy}%)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-foreground/80 inline-flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition-transform">
                Review Solutions <ChevronRight className="w-3 h-3" />
              </span>
            </>
          ) : isActive ? (
            <>
              <div className="text-xs font-medium text-muted-foreground">
                {session.answeredCount}/{totalQuestions} answered
              </div>
              <span className="text-[11px] font-semibold text-foreground inline-flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition-transform">
                Resume Test <ChevronRight className="w-3 h-3" />
              </span>
            </>
          ) : (
            <span className="text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-0.5 mt-1">
              View <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

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
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">
      {/* Section 1: Status Strip */}
      <div className="flex items-center justify-between text-sm bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-base">Analytics Overview</div>
            <div className="text-muted-foreground text-xs">
              Your mastery across {data.domainBreakdown.length} domains in {data.examName}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Overall Readiness</div>
          <div className="font-black text-2xl tabular-nums leading-none flex items-baseline justify-end gap-1">
            <span className={
              data.readinessIndex < 40 ? "text-red-500" :
              data.readinessIndex < 70 ? "text-yellow-500" :
              "text-green-500"
            }>{data.readinessIndex}</span>
            <span className="text-muted-foreground text-base font-medium">/100</span>
          </div>
        </div>
      </div>

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
