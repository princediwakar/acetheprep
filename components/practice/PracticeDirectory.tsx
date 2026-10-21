// Path: components/practice/PracticeDirectory.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, Sparkles, Trophy, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ExamDirectoryItem {
  examName: string;
  examSlug: string;
  categoryId: string;
  categoryName: string;
  totalDomains: number;
  subjects: {
    subjectName: string;
    subjectSlug: string;
    domainCount: number;
    domains: { domainName: string; domainSlug: string }[];
  }[];
}

interface PracticeDirectoryProps {
  exams: ExamDirectoryItem[];
}

const TABS = [
  { id: "all", label: "All Curricula" },
  { id: "study-abroad", label: "US & EU Admissions (SAT / TOEFL / IELTS)" },
  { id: "global-grad-pro", label: "Graduate & Finance (GRE / GMAT / CFA)" },
  { id: "national-competitive", label: "National Tracks" },
] as const;

const DIAGNOSTIC_DRILLS: Record<string, { title: string; href: string }> = {
  "gmat-focus": {
    title: "Data Sufficiency",
    href: "/practice/gmat-focus/data-insights/data-sufficiency",
  },
  "sat": {
    title: "Advanced Math",
    href: "/practice/sat/mathematics/advanced-math",
  },
  "gre": {
    title: "Quant Comparison",
    href: "/practice/gre/quantitative-reasoning/quantitative-comparison",
  },
  "cfa-level-1": {
    title: "Time Value of Money",
    href: "/practice/cfa-level-1/quantitative-methods/time-value-of-money",
  },
  "ielts-academic": {
    title: "Reading Logic",
    href: "/practice/ielts-academic/reading/inferences",
  },
  "toefl-ibt": {
    title: "Sentence Insertion",
    href: "/practice/toefl-ibt/reading/transitions-and-logical-flow",
  },
};

export function PracticeDirectory({ exams }: PracticeDirectoryProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesTab = activeTab === "all" || exam.categoryId === activeTab;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTab;

      const matchesName = exam.examName.toLowerCase().includes(q);
      const matchesSubject = exam.subjects.some((s) =>
        s.subjectName.toLowerCase().includes(q)
      );
      return matchesTab && (matchesName || matchesSubject);
    });
  }, [exams, activeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card/60 p-2 sm:p-2.5 rounded-2xl border border-border/80 shadow-sm backdrop-blur-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative sm:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search exam or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl bg-background/80 border-border/70 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Uniform Grid */}
      {filteredExams.length === 0 ? (
        <div className="text-center py-16 bg-card/40 rounded-2xl border border-dashed border-border/80 space-y-3">
          <p className="text-base font-semibold text-foreground">No examinations match your search.</p>
          <p className="text-xs text-muted-foreground">Try clearing the search query or selecting "All Exams".</p>
          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-primary underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredExams.map((exam) => {
            const visibleSubjects = exam.subjects.slice(0, 3);
            const remainingCount = exam.subjects.length - visibleSubjects.length;

            return (
              <div
                key={exam.examSlug}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/40 border-border/70">
                      {exam.categoryName}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Trophy className="w-3 h-3 text-primary" />
                      {exam.totalDomains} Topics
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/practice/${exam.examSlug}`} className="after:absolute after:inset-0 after:z-0">
                      {exam.examName}
                    </Link>
                  </h3>

                  {/* Core Subjects Preview (Capped to prevent jagged heights) */}
                  <div className="mt-4 space-y-2.5 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Core Subjects
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {visibleSubjects.map((sub) => (
                        <span
                          key={sub.subjectSlug}
                          className="inline-flex items-center rounded-lg bg-muted/70 px-2.5 py-1 text-xs text-foreground/80 font-medium"
                        >
                          {sub.subjectName}
                        </span>
                      ))}
                      {remainingCount > 0 && (
                        <span className="inline-flex items-center rounded-lg bg-primary/10 text-primary border border-primary/20 px-2 py-1 text-xs font-semibold">
                          +{remainingCount} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer: Honest Dual Actions */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-2 relative z-10">
                  <Link
                    href={`/practice/${exam.examSlug}`}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-1.5"
                  >
                    View Syllabus
                  </Link>

                  {DIAGNOSTIC_DRILLS[exam.examSlug] ? (
                    <Link
                      href={DIAGNOSTIC_DRILLS[exam.examSlug].href}
                      className="inline-flex items-center gap-1.5 font-bold text-xs bg-primary text-primary-foreground px-3.5 py-2 rounded-xl shadow-xs hover:opacity-90 transition-opacity"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Start 10Q Drill</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href={`/practice/${exam.examSlug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-xs bg-primary text-primary-foreground px-3.5 py-2 rounded-xl shadow-xs hover:opacity-90 transition-opacity"
                    >
                      <span>Explore Topics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
