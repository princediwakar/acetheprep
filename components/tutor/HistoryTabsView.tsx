// Path: components/tutor/HistoryTabsView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, AlertCircle, Calendar, Award, ChevronRight, Eye, Trash2 } from "lucide-react";
import { QuizHistory } from "@/components/quiz-results/QuizHistory";
import { discardSessionAction } from "@/lib/actions/tutor";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SessionRow } from "@/app/analytics/page";

interface HistoryTabsViewProps {
  examName: string | null;
  examSessions: SessionRow[];
}

export function HistoryTabsView({ examName, examSessions }: HistoryTabsViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [sessions, setSessions] = useState<SessionRow[]>(examSessions);

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

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Your Practice & Quiz History
        </h1>
        <p className="text-sm text-muted-foreground">
          Review your past exam simulations, mistake breakdowns, and step-by-step explanations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 inline-flex flex-wrap h-auto w-full sm:w-auto justify-start gap-1 bg-muted/60 p-1 rounded-xl border border-border">
          <TabsTrigger
            value="sessions"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm text-muted-foreground transition-all"
          >
            Exam & Practice Sessions ({sessions.length})
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-semibold text-xs sm:text-sm text-muted-foreground transition-all"
          >
            Community Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="p-0 mt-0">
          {sessions.length === 0 ? (
            <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">No Practice Sessions Yet</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven&apos;t taken an exam simulation or tutor drill yet. Start one to build your test readiness and review detailed explanations.
              </p>
              <Button asChild className="font-bold">
                <Link href="/home">Start a Practice Test</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessions.map((session) => {
                const date = new Date(session.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
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

                const totalQuestions =
                  session.totalQuestions > 0 ? session.totalQuestions : session.answeredCount;

                return (
                  <Card
                    key={session.id}
                    className="overflow-hidden border border-border/80 bg-card hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center shrink-0 text-muted-foreground">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : isActive ? (
                              <Zap className="w-4 h-4" />
                            ) : (
                              <AlertCircle className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-base font-bold text-foreground">
                              {intentLabel}
                            </CardTitle>
                            {examName && (
                              <div className="text-xs text-muted-foreground font-medium">
                                {examName}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground shrink-0">
                          {session.status}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-5 pt-0 space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-y py-2.5 border-border/50">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{date}</span>
                        </div>
                        <Badge variant="outline" className="text-[11px] font-normal truncate max-w-[200px]">
                          {domainText}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        {isCompleted ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-foreground tabular-nums">
                              {session.correctCount}/{totalQuestions}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {session.accuracy}% accuracy
                            </span>
                          </div>
                        ) : isActive ? (
                          <div className="text-sm font-medium text-muted-foreground">
                            {session.answeredCount} of {totalQuestions} answered
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Session Abandoned</div>
                        )}
                      </div>

                      {isCompleted ? (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full font-semibold flex items-center justify-center gap-1.5 border-border hover:bg-accent hover:text-foreground"
                          size="lg"
                        >
                          <Link href={`/session/${session.id}`}>
                            <Eye className="w-4 h-4 mr-1 text-muted-foreground" />
                            Review Solutions
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </Link>
                        </Button>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            asChild
                            className="w-full font-bold flex items-center justify-center gap-1.5 shadow-sm"
                            size="default"
                          >
                            <Link href={`/session/${session.id}`}>
                              <Zap className="w-4 h-4 mr-1 fill-current" />
                              Resume
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => handleDiscard(session.id)}
                            className="w-full font-medium text-destructive hover:bg-destructive/10 border-destructive/30"
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            Discard
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
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
