// app/quizzes/[subject]/page.tsx
"use client";

import { useState } from "react";
import { QuizList } from "@/components/QuizList";
import { useParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SubjectQuizzesPage() {
  const { subject } = useParams();
  const decodedSubject = decodeURIComponent((subject as string) || "General");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Public Quizzes
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{decodedSubject} Quizzes</h1>
        <p className="text-sm text-muted-foreground">
          Browse and practice community-contributed tests for {decodedSubject}.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-card shadow-2xs">
        <span className="text-xs text-muted-foreground">
          Showing quizzes in <strong className="text-foreground">{decodedSubject}</strong>
        </span>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${decodedSubject}...`}
            className="pl-8 h-8 text-xs bg-background border-border/80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={`Search ${decodedSubject} quizzes`}
          />
        </div>
      </div>

      {/* Quizzes List */}
      <div className="quiz-list-container min-h-[400px]">
        <QuizList
          publicOnly={true}
          searchQuery={`${decodedSubject} ${searchQuery}`.trim()}
          groupBy="subject"
          emptyMessage={`No quizzes found in ${decodedSubject}.`}
          showViewMore={false}
        />
      </div>
    </div>
  );
}
