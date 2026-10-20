// Path: components/tutor/HistoryTabsView.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, AlertCircle, Calendar, Award, ChevronRight, Eye } from "lucide-react";
import { QuizHistory } from "@/components/quiz-results/QuizHistory";
import { cn } from "@/lib/utils";
import type { SessionRow } from "@/app/analytics/page";

interface HistoryTabsViewProps {
  examName: string | null;
  examSessions: SessionRow[];
}

export function HistoryTabsView({ examName, examSessions }: HistoryTabsViewProps) {
  const [activeTab, setActiveTab] = useState<string>("sessions");

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Your Practice & Quiz History
        </h1>
        <p className="text-sm text-muted-foreground">
          Review your past exam simulations, mistake autopsies, and step-by-step solution derivations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto w-full sm:w-auto justify-start gap-2 bg-transparent p-0 border-0">
          <TabsTrigger
            value="sessions"
            className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-muted/40 font-semibold text-xs sm:text-sm"
          >
            Exam & Practice Sessions ({examSessions.length})
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-muted/40 font-semibold text-xs sm:text-sm"
          >
            Community Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="p-0 mt-0">
          {examSessions.length === 0 ? (
            <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">No Practice Sessions Yet</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven&apos;t taken an exam simulation or tutor drill yet. Start one to build your test readiness and see detailed mistake autopsies.
              </p>
              <Button asChild className="font-bold">
                <Link href="/dashboard">Start a Practice Test</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {examSessions.map((session) => {
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
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              isCompleted
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : isActive
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "bg-muted text-muted-foreground"
                            )}
                          >
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

                        <span
                          className={cn(
                            "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md shrink-0",
                            isCompleted
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : isActive
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                : "bg-muted text-muted-foreground"
                          )}
                        >
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
                            <span className="text-2xl font-black text-foreground">
                              {session.correctCount}/{totalQuestions}
                            </span>
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              {session.accuracy}% accuracy
                            </span>
                          </div>
                        ) : isActive ? (
                          <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                            {session.answeredCount} of {totalQuestions} answered
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Session Abandoned</div>
                        )}
                      </div>

                      <Button asChild className="w-full font-bold flex items-center justify-center gap-1.5" size="lg">
                        <Link href={`/session/${session.id}`}>
                          {isCompleted ? (
                            <>
                              <Eye className="w-4 h-4 mr-1" />
                              Review Solutions & Autopsy
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-1" />
                              Resume Test
                            </>
                          )}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
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
