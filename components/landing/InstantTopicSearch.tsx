// Path: components/landing/InstantTopicSearch.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Sparkles,
  X,
  Target,
  BookOpen,
  Calculator,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from "lucide-react";
import {
  searchCatalog,
  SEARCH_CATALOG,
  type SearchCatalogItem,
  type SearchCategory,
} from "@/lib/constants/search-catalog";
import { cn } from "@/lib/utils";
import type { ExamKey } from "./landing-data";

interface InstantTopicSearchProps {
  activeExam?: ExamKey;
  onSelectTopic?: () => void;
  className?: string;
}

const HIGH_YIELD_QUERIES = [
  {
    label: "Parabolas & Vertex Form",
    exam: "SAT",
    type: "topic" as const,
    href: "/practice/sat/mathematics/quadratic-equations-discriminant",
    snippet: "y = a(x - h)² + k",
  },
  {
    label: "Data Sufficiency: Parity",
    exam: "GMAT Focus",
    type: "topic" as const,
    href: "/practice/gmat-focus/data-insights/data-sufficiency",
    snippet: "Est: 60s",
  },
  {
    label: "Extraneous Roots & Radicals",
    exam: "SAT",
    type: "trap" as const,
    href: "/practice/sat/mathematics/advanced-math",
    snippet: "74% Miss Rate",
  },
  {
    label: "DuPont Analysis (3- & 5-Step)",
    exam: "CFA Level 1",
    type: "formula" as const,
    href: "/practice/cfa-level-1/financial-statement-analysis/financial-analysis-techniques",
    snippet: "ROE = NPM × TAT × Leverage",
  },
  {
    label: "Quantitative Comparison (D Trap)",
    exam: "GRE",
    type: "trap" as const,
    href: "/practice/gre/quantitative-reasoning/quantitative-comparison",
    snippet: "65% Miss Rate",
  },
  {
    label: "True / False / Not Given Matrix",
    exam: "IELTS",
    type: "topic" as const,
    href: "/practice/ielts-academic/reading/true-false-not-given",
    snippet: "Passage Logic",
  },
];

const POPULAR_SUGGESTIONS = [
  "Parabolas",
  "Data Sufficiency",
  "Extraneous Roots",
  "DuPont",
  "Discriminant",
  "WACC",
  "Bayes",
  "Comma Splice",
];

export function InstantTopicSearch({
  activeExam,
  onSelectTopic,
  className,
}: InstantTopicSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<SearchCategory | "all">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fast 0ms in-memory client-side catalog search
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    return searchCatalog(query, {
      activeExam,
      category: categoryFilter,
      limit: 10,
    });
  }, [query, activeExam, categoryFilter]);

  // Global ⌘K or / shortcut to focus
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

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
        window.location.href = entry.href;
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const getCategoryBadge = (category: SearchCategory) => {
    switch (category) {
      case "formula":
        return {
          label: "Formula",
          badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          icon: Calculator,
        };
      case "trap":
        return {
          label: "Exam Trap",
          badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
          icon: AlertTriangle,
        };
      case "topic":
      default:
        return {
          label: "Topic",
          badgeClass: "bg-primary/10 text-primary border-primary/20",
          icon: Target,
        };
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
          placeholder="Search topics, formulas, or traps (e.g. 'Data Sufficiency', 'Parabolas')..."
          className="w-full rounded-xl border border-border bg-card/90 pl-10 pr-10 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all shadow-xs"
          aria-label="Search topics, formulas, and traps"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded transition-colors"
            aria-label="Clear search query"
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
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-card/98 backdrop-blur-md shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100">
          {query.trim() === "" ? (
            /* High-Yield Fast Picks */
            <div className="p-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase px-2">
                <span>Frequently Searched Concept Drills</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <Sparkles className="h-3 w-3" />
                  640+ Concepts Indexed
                </span>
              </div>
              <div className="divide-y divide-border/40 text-xs">
                {HIGH_YIELD_QUERIES.map((item) => {
                  const badge = getCategoryBadge(item.type);
                  const Icon = badge.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        onSelectTopic?.();
                      }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/70 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        <span className="font-medium text-foreground truncate">{item.label}</span>
                        {item.snippet && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground hidden sm:inline truncate">
                            {item.snippet}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border bg-muted/40 text-muted-foreground">
                          {item.exam}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            /* Filtered Search Results */
            <div className="p-2 space-y-2">
              {/* Filter Tabs Header */}
              <div className="flex items-center justify-between px-2 pt-1 pb-1.5 border-b border-border/50 text-[11px]">
                <span className="font-mono text-muted-foreground uppercase">
                  Matching Drills ({filtered.length})
                </span>
                <div className="flex items-center gap-1">
                  {(["all", "topic", "formula", "trap"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-colors cursor-pointer",
                        categoryFilter === cat
                          ? "bg-foreground text-background font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {cat === "all" ? "All" : cat + "s"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Items */}
              <div className="space-y-1 max-h-[380px] overflow-y-auto pr-0.5">
                {filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const badge = getCategoryBadge(item.category);
                  const Icon = badge.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        onSelectTopic?.();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer group",
                        isSelected
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-secondary/60",
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isSelected ? "text-background" : "text-muted-foreground",
                          )}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-xs truncate">
                              {item.title}
                            </span>
                            <span
                              className={cn(
                                "text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase font-semibold",
                                isSelected
                                  ? "border-background/40 bg-background/20 text-background"
                                  : badge.badgeClass,
                              )}
                            >
                              {badge.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] mt-0.5 truncate">
                            {item.snippet && (
                              <span
                                className={cn(
                                  "font-mono text-[10px] px-1 rounded truncate",
                                  isSelected
                                    ? "bg-background/20 text-background/90"
                                    : "bg-muted text-muted-foreground font-medium",
                                )}
                              >
                                {item.snippet}
                              </span>
                            )}
                            <span
                              className={cn(
                                "truncate",
                                isSelected ? "text-background/80" : "text-muted-foreground",
                              )}
                            >
                              {item.subject} • {item.domain}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors",
                            isSelected
                              ? "border-background/30 bg-background/15 text-background"
                              : "border-border bg-muted text-muted-foreground",
                          )}
                        >
                          {item.exam}
                        </span>
                        <ArrowRight
                          className={cn(
                            "h-3 w-3 transition-transform group-hover:translate-x-0.5",
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
            /* No Results Fallback with Helpful Smart Prompts */
            <div className="p-5 text-center space-y-3 text-xs">
              <div className="text-muted-foreground">
                <p>No exact match found for &ldquo;{query}&rdquo;.</p>
                <p className="text-[11px] mt-1 text-muted-foreground/80">
                  Try searching high-yield topics or formulas:
                </p>
              </div>

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {POPULAR_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => {
                      setQuery(sug);
                      inputRef.current?.focus();
                    }}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-foreground hover:bg-secondary cursor-pointer transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-border/50">
                <Link
                  href="/practice"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline underline-offset-4"
                >
                  <span>Browse full 6-exam syllabus catalog</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
