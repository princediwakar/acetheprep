"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { QuizResult } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime } from "@/lib/quiz-utils";
import { Clock, Calendar, Award, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface QuizHistoryProps {
  activeExamName?: string | null;
}

export const QuizHistory = ({ activeExamName }: QuizHistoryProps) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/quiz/results");
        
        if (!response.ok) {
          throw new Error("Failed to fetch quiz history");
        }
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Error fetching quiz history:", err);
        setError("Failed to load your quiz history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuizResults();
  }, []);
  
  const handleViewResults = (quizId: string, slug?: string) => {
    if (slug) {
      router.push(`/quiz/${slug}/results`);
    } else {
      router.push(`/quiz/${quizId}/results`);
    }
  };

  const subjects = useMemo(() => {
    const subs = new Set<string>();
    for (const r of results) {
      if (r.quizzes?.subject) {
        subs.add(r.quizzes.subject);
      }
    }
    return Array.from(subs).sort();
  }, [results]);

  const defaultTab = useMemo(() => {
    if (!activeExamName) return "all";
    const lowerExam = activeExamName.toLowerCase();
    const match = subjects.find(s => s.toLowerCase().includes(lowerExam) || lowerExam.includes(s.toLowerCase()));
    return match || "all";
  }, [activeExamName, subjects]);

  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (defaultTab !== "all" && activeTab === "all") {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Shimmer for Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-1">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-36 rounded-lg" />
        </div>
        <div className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-xs divide-y divide-border/50">
          <div className="px-5 py-3 bg-muted/30">
            <Skeleton className="h-4 w-48" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/5" />
              </div>
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-card rounded-xl border border-border">
        <p className="text-destructive text-sm font-medium">{error}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-xl border border-border shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Award className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-bold">No Quiz History</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          You haven&apos;t completed any quizzes yet. Take a quiz to test your knowledge and see results here!
        </p>
        <Button onClick={() => router.push("/")} className="font-bold">Find a Quiz</Button>
      </div>
    );
  }

  const filteredResults = activeTab === "all" 
    ? results 
    : results.filter(r => r.quizzes?.subject === activeTab);

  const renderResultRow = (result: QuizResult, index: number) => {
    const completedAt = result.completed_at ? new Date(result.completed_at) : null;
    const percentage = result.total_questions > 0 
      ? Math.round((result.score / result.total_questions) * 100)
      : 0;
    
    const uniqueKey = result.result_id || `result-${index}`;
    const quizSlug = result.quizzes?.slug || `${result.quiz_id}`;

    const scoreColor =
      percentage >= 80
        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
        : percentage >= 50
          ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25"
          : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25";
    
    return (
      <div
        key={uniqueKey}
        className="group transition-colors hover:bg-muted/30"
      >
        {/* Desktop Row */}
        <div className="hidden md:grid grid-cols-12 px-5 py-3.5 items-center gap-4">
          {/* Col 1-5: Quiz & Category */}
          <div className="col-span-5 flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-border/60 bg-muted/60 flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {result.quizzes?.title || "Untitled Quiz"}
              </h4>
              {result.quizzes?.subject && (
                <span className="inline-block text-[11px] font-mono text-muted-foreground">
                  {result.quizzes.subject}
                </span>
              )}
            </div>
          </div>

          {/* Col 6-7: Date */}
          <div className="col-span-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0 opacity-70" />
            <span>
              {completedAt ? formatDistanceToNow(completedAt, { addSuffix: true }) : "Recent"}
            </span>
          </div>

          {/* Col 8-10: Score & Time */}
          <div className="col-span-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-mono text-foreground tabular-nums">
                {result.score}/{result.total_questions}
              </span>
              <span className={cn("text-xs font-mono font-semibold px-1.5 py-0.5 rounded border", scoreColor)}>
                {percentage}%
              </span>
            </div>
            {typeof result.time_taken === "number" && result.time_taken > 0 && (
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3 opacity-60" />
                {formatTime(result.time_taken)}
              </span>
            )}
          </div>

          {/* Col 11-12: Action */}
          <div className="col-span-2 flex items-center justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewResults(result.quiz_id, quizSlug)}
              className="h-8 px-3 text-xs font-semibold rounded-lg border-border/80 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              View Results
            </Button>
          </div>
        </div>

        {/* Mobile Row */}
        <div className="md:hidden p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-foreground truncate">
                {result.quizzes?.title || "Untitled Quiz"}
              </h4>
              {result.quizzes?.subject && (
                <span className="text-xs text-muted-foreground">{result.quizzes.subject}</span>
              )}
            </div>
            <span className={cn("text-xs font-mono font-semibold px-1.5 py-0.5 rounded border shrink-0", scoreColor)}>
              {percentage}%
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 opacity-70" />
              <span>{completedAt ? formatDistanceToNow(completedAt, { addSuffix: true }) : "Recent"}</span>
            </div>
            {typeof result.time_taken === "number" && result.time_taken > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 opacity-60" />
                <span>{formatTime(result.time_taken)}</span>
              </div>
            )}
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              Score: <strong className="text-foreground">{result.score}/{result.total_questions}</strong>
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewResults(result.quiz_id, quizSlug)}
              className="h-7 px-2.5 text-xs font-semibold"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {subjects.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 flex flex-wrap h-auto w-full justify-start gap-1.5 bg-transparent p-0">
            <TabsTrigger 
              value="all"
              className="flex-none rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-muted/40"
            >
              All Quizzes
            </TabsTrigger>
            {subjects.map(sub => {
              const isActiveExam = activeExamName && (sub.toLowerCase().includes(activeExamName.toLowerCase()) || activeExamName.toLowerCase().includes(sub.toLowerCase()));
              return (
                <TabsTrigger 
                  key={sub} 
                  value={sub}
                  className="flex-none rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-muted/40"
                >
                  {sub}
                  {isActiveExam && (
                    <span className="ml-1.5 text-[9px] uppercase font-mono bg-background/20 px-1 py-0.2 rounded">Active</span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      )}

      {filteredResults.length === 0 ? (
        <div className="text-center p-8 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground text-sm">No quizzes found for this category.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 px-5 py-2.5 bg-muted/40 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold border-b border-border/60">
            <div className="col-span-5">Quiz & Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3">Score & Duration</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          <div className="divide-y divide-border/50">
            {filteredResults.map(renderResultRow)}
          </div>
        </div>
      )}
    </div>
  );
};
 