// app/quizzes/page.tsx
"use client";

import { useState, useEffect } from "react";
import { QuizList } from "@/components/QuizList";
import { Input } from "@/components/ui/input";
import { Search, Compass } from "lucide-react";

const SUBJECT_FILTERS = [
  "All",
  "Quantitative Reasoning",
  "Verbal Reasoning",
  "Data Insights",
  "General",
];

export default function QuizzesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const activeQuery = selectedSubject !== "All"
    ? `${selectedSubject} ${debouncedSearchQuery}`.trim()
    : debouncedSearchQuery;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Public Practice Quizzes</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Discover curated tests and drills shared by the test-prep community.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-card shadow-2xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {SUBJECT_FILTERS.map((subject) => {
            const isSelected = selectedSubject === subject;
            return (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search public tests..."
            className="pl-8 h-8 text-xs bg-background border-border/80"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search public quizzes"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="quiz-list-container min-h-[400px]">
        <QuizList
          publicOnly={true}
          searchQuery={activeQuery}
          groupBy="subject"
          emptyMessage={
            activeQuery
              ? `No quizzes found matching "${activeQuery}".`
              : "No public quizzes available currently."
          }
          showViewMore={true}
        />
      </div>
    </div>
  );
}
