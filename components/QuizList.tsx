// components/QuizList.tsx
"use client";

import { useMemo, useEffect, useRef } from "react";
import { Quiz } from "@/types/quiz";
import { Loader2, ArrowRight, BookOpen } from "lucide-react";
import { QuizCard } from "./quiz-card/QuizCard";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from "date-fns";
import Link from "next/link";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface QuizListProps {
  userId?: string;
  publicOnly?: boolean;
  isLoading?: boolean;
  onQuizDeleted?: (quizId: string) => void;
  emptyMessage?: string;
  groupBy?: "subject" | "date";
  showViewMore?: boolean;
  searchQuery?: string;
  quizzes?: Quiz[];
}

export const QuizList = ({
  userId,
  publicOnly = false,
  onQuizDeleted,
  emptyMessage = "No quizzes available",
  groupBy = "subject",
  showViewMore = false,
  searchQuery = "",
  quizzes,
}: QuizListProps) => {
  const {
    quizzes: externalQuizzes,
    isInitialLoading,
    isLoadingMore,
    loadMore,
    hasMore,
  } = useQuizzes({
    userId,
    publicOnly,
    searchQuery,
    limitPerGroup: publicOnly && !searchQuery ? 6 : undefined,
  });

  const quizData = externalQuizzes ?? quizzes;
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoadingMore || isInitialLoading) return;

    const sentinel = observerRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [hasMore, isLoadingMore, isInitialLoading, loadMore]);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "Recently Created";
    const quizDate = new Date(date);
    if (isNaN(quizDate.getTime())) return "Recently Created";

    if (isToday(quizDate)) return "Today";
    if (isYesterday(quizDate)) return "Yesterday";
    if (isThisWeek(quizDate)) return "This Week";
    if (isThisMonth(quizDate)) return "This Month";
    if (isThisYear(quizDate)) return format(quizDate, "LLLL");
    return format(quizDate, "LLLL yyyy");
  };

  const groupedQuizzes = useMemo(() => {
    if (!quizData) return null;
    if (groupBy === "date") {
      return quizData.reduce((acc, quiz) => {
        const dateKey = formatDate(quiz.created_at as string);
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(quiz);
        return acc;
      }, {} as Record<string, Quiz[]>);
    } else {
      return quizData.reduce((acc, quiz) => {
        const subject = quiz.subject || "General";
        if (!acc[subject]) acc[subject] = [];
        acc[subject].push(quiz);
        return acc;
      }, {} as Record<string, Quiz[]>);
    }
  }, [quizData, groupBy]);

  // Zero-CLS Skeleton Loading Grid
  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card p-5 space-y-3 shadow-xs"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-10 rounded" />
              </div>
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-2/3 rounded" />
            </div>
            <div className="pt-2 flex justify-between items-center">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Clean Empty State
  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed border-border/80 bg-card/40">
        <BookOpen className="w-8 h-8 text-muted-foreground/60 mb-2 stroke-[1.5]" />
        <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Tests you create or explore will appear here for practice and review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupedQuizzes && Object.keys(groupedQuizzes).length ? (
        Object.entries(groupedQuizzes).map(([group, groupQuizzes]) => (
          <div key={group} className="space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {group}
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {groupQuizzes.length}
                </span>
              </div>
              {showViewMore && (
                <Link
                  href={`/quizzes/${encodeURIComponent(group)}`}
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium"
                >
                  View All
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {groupQuizzes.map((quiz) => (
                <QuizCard key={quiz.quiz_id} quiz={quiz} onDelete={onQuizDeleted} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-xs text-muted-foreground py-8">{emptyMessage}</div>
      )}

      {/* Subtle Bottom Pagination Indicator */}
      {isLoadingMore && (
        <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span className="text-xs">Loading more practice tests...</span>
        </div>
      )}

      {!isInitialLoading && hasMore && <div ref={observerRef} className="h-6" />}

      {!isInitialLoading && hasMore && !isLoadingMore && (
        <div className="text-center pt-2">
          <Button variant="outline" size="sm" onClick={loadMore} className="text-xs h-8 px-4">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
