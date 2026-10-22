// Path: components/practice/ExamTopicsList.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { subjectToSlug, domainToSlug } from "@/lib/slugs";

interface ExamTopicsListProps {
  examSlug: string;
  subjects: Record<string, string[]>;
}

export function ExamTopicsList({ examSlug, subjects }: ExamTopicsListProps) {
  const [query, setQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return subjects;

    const res: Record<string, string[]> = {};
    for (const [subj, domains] of Object.entries(subjects)) {
      const matchingDomains = (domains || []).filter(
        (d) => d.toLowerCase().includes(q) || subj.toLowerCase().includes(q)
      );
      if (matchingDomains.length > 0) {
        res[subj] = matchingDomains;
      }
    }
    return res;
  }, [subjects, query]);

  const totalMatchingTopics = useMemo(() => {
    return Object.values(filteredSubjects).reduce(
      (acc, list) => acc + (Array.isArray(list) ? list.length : 0),
      0
    );
  }, [filteredSubjects]);

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter topics by name or concept (e.g., 'algebra', 'inferences', 'quadratic')..."
          className="w-full h-11 pl-10 pr-9 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
            aria-label="Clear filter"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {query && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Found {totalMatchingTopics} matching topic module{totalMatchingTopics === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="hover:text-primary transition-colors underline"
          >
            Reset filter
          </button>
        </div>
      )}

      {totalMatchingTopics === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground text-sm space-y-2">
          <p>No topic modules match &ldquo;{query}&rdquo;.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Show all syllabus topics
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(filteredSubjects).map(([subjectName, domains]) => {
            const subjectSlug = subjectToSlug(subjectName);
            const domainList = Array.isArray(domains) ? domains : [];

            return (
              <div
                key={subjectSlug}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/50 gap-2 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      <Link
                        href={`/practice/${examSlug}/${subjectSlug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {subjectName}
                      </Link>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {domainList.length} specialized topic module{domainList.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <Link
                    href={`/practice/${examSlug}/${subjectSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View Subject Overview
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {domainList.map((domainName) => {
                    const domainSlug = domainToSlug(domainName);
                    return (
                      <Link
                        key={domainSlug}
                        href={`/practice/${examSlug}/${subjectSlug}/${domainSlug}`}
                        className="group flex flex-col justify-between rounded-xl border border-border/60 bg-muted/20 p-4 transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-xs"
                      >
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {domainName}
                        </span>
                        <span className="mt-3 text-xs text-primary inline-flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Practice Questions <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
