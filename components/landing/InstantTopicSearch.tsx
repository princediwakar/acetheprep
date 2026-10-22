// Path: components/landing/InstantTopicSearch.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, X, Target, BookOpen } from "lucide-react";
import { getAllTaxonomyEntries, type TaxonomyEntry } from "@/lib/slugs";
import { cn } from "@/lib/utils";
import type { ExamKey } from "./landing-data";

interface InstantTopicSearchProps {
  activeExam?: ExamKey;
  onSelectTopic?: () => void;
  className?: string;
}

const HIGH_YIELD_QUERIES = [
  { label: "Data Sufficiency: Parity", exam: "GMAT Focus", href: "/practice/gmat-focus/data-insights/data-sufficiency" },
  { label: "Extraneous Roots", exam: "SAT", href: "/practice/sat/mathematics/advanced-math" },
  { label: "Quantitative Comparison", exam: "GRE", href: "/practice/gre/quantitative-reasoning/quantitative-comparison" },
  { label: "DuPont Analysis", exam: "CFA Level 1", href: "/practice/cfa-level-1/financial-statement-analysis/financial-analysis-techniques" },
  { label: "True / False / Not Given", exam: "IELTS", href: "/practice/ielts-academic/reading/identifying-information-true-false-not-given" },
];

export function InstantTopicSearch({
  activeExam,
  onSelectTopic,
  className,
}: InstantTopicSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allEntries = useMemo(() => getAllTaxonomyEntries(), []);

  // Filter topics based on query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return allEntries
      .filter((entry) => {
        const matchDomain = entry.domain.toLowerCase().includes(q);
        const matchSubject = entry.subject.toLowerCase().includes(q);
        const matchExam = entry.exam.toLowerCase().includes(q);
        return matchDomain || matchSubject || matchExam;
      })
      .slice(0, 8);
  }, [allEntries, query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter") {
      if (filtered[selectedIndex]) {
        e.preventDefault();
        const entry = filtered[selectedIndex];
        window.location.href = `/practice/${entry.examSlug}/${entry.subjectSlug}/${entry.domainSlug}`;
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-2xl mx-auto", className)}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search 400+ topics, formulas & traps (e.g. 'Parabolas', 'Data Sufficiency', 'Extraneous Roots', 'DuPont')..."
          className="w-full rounded-xl border border-border bg-card/90 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all shadow-xs"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <span className="absolute right-3 hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </span>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100">
          {query.trim() === "" ? (
            /* High-Yield Fast Picks */
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase px-2">
                <span>Frequently Searched Concept Drills</span>
                <span className="flex items-center gap-1 text-[10px]">
                  <Sparkles className="h-3 w-3 text-emerald-500" />
                  Instant Diagnostic
                </span>
              </div>
              <div className="divide-y divide-border/40 text-xs">
                {HIGH_YIELD_QUERIES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      onSelectTopic?.();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {item.exam}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            /* Filtered Search Results */
            <div className="p-2 space-y-1">
              <div className="text-[11px] font-mono text-muted-foreground uppercase px-2.5 py-1">
                Matching Topic Drills ({filtered.length})
              </div>
              <div className="space-y-0.5">
                {filtered.map((entry, idx) => {
                  const isSelected = idx === selectedIndex;
                  const href = `/practice/${entry.examSlug}/${entry.subjectSlug}/${entry.domainSlug}`;
                  return (
                    <Link
                      key={`${entry.examSlug}-${entry.subjectSlug}-${entry.domainSlug}`}
                      href={href}
                      onClick={() => {
                        setIsOpen(false);
                        onSelectTopic?.();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer",
                        isSelected
                          ? "bg-foreground text-background font-medium"
                          : "text-foreground hover:bg-secondary/60",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Target
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
                            isSelected ? "text-background" : "text-muted-foreground",
                          )}
                        />
                        <div className="min-w-0 truncate">
                          <span className="font-semibold">{entry.domain}</span>
                          <span
                            className={cn(
                              "ml-2 text-[11px] truncate hidden sm:inline",
                              isSelected ? "text-background/80" : "text-muted-foreground",
                            )}
                          >
                            • {entry.subject}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.5 rounded",
                            isSelected
                              ? "bg-background/20 text-background"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {entry.exam}
                        </span>
                        <ArrowRight
                          className={cn(
                            "h-3 w-3",
                            isSelected ? "text-background" : "text-muted-foreground",
                          )}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            /* No Results Fallback */
            <div className="p-6 text-center space-y-2 text-xs text-muted-foreground">
              <p>No exact topic found matching &ldquo;{query}&rdquo;.</p>
              <Link
                href="/practice"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4"
              >
                <span>Browse full 6-exam practice catalog</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
