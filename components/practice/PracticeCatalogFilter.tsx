// Path: components/practice/PracticeCatalogFilter.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { SEARCH_CATALOG } from "@/lib/constants/search-catalog";

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K or / shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q && selectedExam === "all") return topics;

    // Cross-reference keywords from 640+ search catalog items
    const matchingDomainKeys = new Set<string>();
    if (q) {
      for (const item of SEARCH_CATALOG) {
        if (
          item.title.toLowerCase().includes(q) ||
          (item.snippet && item.snippet.toLowerCase().includes(q)) ||
          item.keywords.some((k) => k.includes(q))
        ) {
          matchingDomainKeys.add(`${item.examSlug}:${item.domainSlug}`);
        }
      }
    }

    return topics.filter((t) => {
      const matchesExam = selectedExam === "all" || t.examSlug === selectedExam;
      if (!matchesExam) return false;
      if (!q) return true;

      const directMatch =
        t.domain.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.exam.toLowerCase().includes(q);

      const keywordMatch = matchingDomainKeys.has(`${t.examSlug}:${t.domainSlug}`);

      return directMatch || keywordMatch;
    });
  }, [topics, searchQuery, selectedExam]);

  const isFiltering = searchQuery.trim().length > 0 || selectedExam !== "all";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Standard UI Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 100+ syllabus topics (e.g., 'extraneous roots', 'data sufficiency', 'wacc')..."
          className="pl-10 pr-16 h-11 rounded-xl bg-card border-border/80 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground/70"
          aria-label="Search syllabus topics"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Exam Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-0.5">
          <Filter className="h-3 w-3" />
          Exam:
        </span>
        <button
          type="button"
          onClick={() => setSelectedExam("all")}
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer border",
            selectedExam === "all"
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-secondary/60 text-secondary-foreground border-transparent hover:bg-secondary hover:text-foreground"
          )}
        >
          All Exams <span className="opacity-70 text-[11px]">({topics.length})</span>
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
                "px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer border",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-secondary/60 text-secondary-foreground border-transparent hover:bg-secondary hover:text-foreground"
              )}
            >
              {ex.name} <span className="opacity-70 text-[11px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Filtered Topic Results view when user is actively searching */}
      {isFiltering && (
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs space-y-3 animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
              No matching topic modules found for &ldquo;{searchQuery}&rdquo;. Try another keyword or switch exam filter.
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-[420px] overflow-y-auto pr-1">
              {filteredTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group rounded-xl border border-border/70 bg-background/50 hover:bg-background hover:border-primary/50 hover:shadow-xs transition-all p-3 flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                      <span className="text-primary font-semibold">{topic.exam}</span>
                      <span>•</span>
                      <span className="truncate">{topic.subject}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {topic.domain}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-primary">
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
