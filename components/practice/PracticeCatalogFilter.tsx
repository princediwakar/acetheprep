// Path: components/practice/PracticeCatalogFilter.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, BookOpen, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CatalogTopicItem {
  exam: string;
  examSlug: string;
  subject: string;
  subjectSlug: string;
  domain: string;
  domainSlug: string;
  href: string;
}

interface PracticeCatalogFilterProps {
  topics: CatalogTopicItem[];
  examSlugs: { name: string; slug: string }[];
}

export function PracticeCatalogFilter({ topics, examSlugs }: PracticeCatalogFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState<string>("all");

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return topics.filter((t) => {
      const matchesExam = selectedExam === "all" || t.examSlug === selectedExam;
      if (!matchesExam) return false;
      if (!q) return true;
      return (
        t.domain.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.exam.toLowerCase().includes(q)
      );
    });
  }, [topics, searchQuery, selectedExam]);

  const isFiltering = searchQuery.trim().length > 0 || selectedExam !== "all";

  return (
    <div className="space-y-6">
      {/* Search Bar & Filter Controls */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 100+ syllabus topics (e.g., 'extraneous roots', 'data sufficiency', 'wacc', 'parabola')..."
            className="w-full h-13 pl-12 pr-10 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm sm:text-base transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Exam Quick-Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
            <Filter className="h-3.5 w-3.5" />
            Exam:
          </span>
          <button
            type="button"
            onClick={() => setSelectedExam("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer border",
              selectedExam === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 text-muted-foreground border-border/70 hover:bg-muted hover:text-foreground"
            )}
          >
            All Exams ({topics.length})
          </button>
          {examSlugs.map((ex) => {
            const count = topics.filter((t) => t.examSlug === ex.slug).length;
            const isSelected = selectedExam === ex.slug;
            return (
              <button
                key={ex.slug}
                type="button"
                onClick={() => setSelectedExam(ex.slug)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/40 text-muted-foreground border-border/70 hover:bg-muted hover:text-foreground"
                )}
              >
                {ex.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Topic Results view when user is actively searching */}
      {isFiltering && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6 space-y-4 animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Matching Topic Modules ({filteredTopics.length})
              </h3>
            </div>
            {(searchQuery || selectedExam !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedExam("all");
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No matching topic modules found for &ldquo;{searchQuery}&rdquo;. Try another keyword or switch exam filter.
            </div>
          ) : (
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group rounded-xl border border-border/80 bg-card p-3 hover:border-primary/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-muted-foreground">
                      <span className="text-primary font-semibold">{topic.exam}</span>
                      <span>•</span>
                      <span className="truncate">{topic.subject}</span>
                    </div>
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {topic.domain}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-primary">
                    <span>Practice Questions</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
