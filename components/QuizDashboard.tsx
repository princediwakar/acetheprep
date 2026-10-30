// components/QuizDashboard.tsx
"use client";

import { useCallback, useState, useEffect } from "react";
import { QuizCreator } from "./quiz-creator/QuizCreator";
import { QuizList } from "./QuizList";
import { useUser } from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import { Search, Loader2, BookOpen } from "lucide-react";

export function QuizDashboard() {
  const { user, isUserLoading } = useUser();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const onQuizCreated = useCallback(() => {
    // Refresh handled internally by QuizList
  }, []);

  if (isUserLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[300px] text-muted-foreground gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-xs">Loading studio...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Quiz Studio</h1>
        <p className="text-sm text-muted-foreground">
          Create customized test sets with AI or practice previously generated quizzes.
        </p>
      </div>

      {/* Creation Canvas */}
      <div>
        <QuizCreator onQuizCreated={onQuizCreated} />
      </div>

      {/* Library Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">My Practice Sets</h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter your quizzes..."
              className="pl-8 h-8 text-xs bg-background border-border/80"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="quiz-list-container min-h-[300px]">
          <QuizList
            userId={user.id}
            groupBy={searchInput ? "subject" : "date"}
            searchQuery={debouncedSearchQuery}
            emptyMessage={
              searchInput
                ? "No matching quizzes found in your library."
                : "No personal quizzes created yet. Use the studio above to generate your first test."
            }
          />
        </div>
      </div>
    </div>
  );
}
