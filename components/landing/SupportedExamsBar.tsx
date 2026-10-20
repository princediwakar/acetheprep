"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { examToSlug } from "@/lib/slugs";

// ---------------------------------------------------------------------------
// Type definitions & static metadata
// ---------------------------------------------------------------------------

export type ExamCategoryFilter = "all" | "study-abroad" | "global-grad-pro" | "national-competitive";

export interface ExamMeta {
  id: string; // Exact key matching lib/taxonomies.json and lib/demo-questions.json
  shortName: string;
  fullName: string;
  authority: string;
  category: "study-abroad" | "global-grad-pro" | "national-competitive";
  tagline: string;
  badge: string;
}

export const ALL_SUPPORTED_EXAMS: ExamMeta[] = [
  // Global Standardized Admissions & Graduate
  {
    id: "SAT",
    shortName: "Digital SAT",
    fullName: "Digital Scholastic Assessment Test",
    authority: "College Board",
    category: "study-abroad",
    tagline: "Desmos Math & Reading Traps",
    badge: "Admissions",
  },
  {
    id: "GRE",
    shortName: "GRE General",
    fullName: "Graduate Record Examination",
    authority: "ETS",
    category: "global-grad-pro",
    tagline: "Quant Comparisons & Logic",
    badge: "Grad School",
  },
  {
    id: "GMAT Focus",
    shortName: "GMAT Focus",
    fullName: "GMAT Focus Edition",
    authority: "GMAC",
    category: "global-grad-pro",
    tagline: "Data Sufficiency Traps",
    badge: "Global MBA",
  },
  {
    id: "CFA Level 1",
    shortName: "CFA Level 1",
    fullName: "Chartered Financial Analyst Level 1",
    authority: "CFA Institute",
    category: "global-grad-pro",
    tagline: "DuPont & Financial Analysis",
    badge: "Finance",
  },
  {
    id: "IELTS Academic",
    shortName: "IELTS Academic",
    fullName: "International English Language Testing System",
    authority: "British Council • IDP",
    category: "study-abroad",
    tagline: "True/False/Not Given Traps",
    badge: "Language",
  },
  {
    id: "TOEFL iBT",
    shortName: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language",
    authority: "ETS",
    category: "study-abroad",
    tagline: "Sentence Insertion & Rhetoric",
    badge: "Language",
  },

  // National Competitive
  {
    id: "JEE Main",
    shortName: "JEE Main",
    fullName: "Joint Entrance Examination",
    authority: "NTA",
    category: "national-competitive",
    tagline: "Calculus & Optics Traps",
    badge: "Engineering",
  },
  {
    id: "NEET",
    shortName: "NEET",
    fullName: "National Eligibility Entrance Test",
    authority: "NTA",
    category: "national-competitive",
    tagline: "Genetics & NCERT Nuances",
    badge: "Medical",
  },
  {
    id: "CAT",
    shortName: "CAT",
    fullName: "Common Admission Test",
    authority: "IIMs",
    category: "national-competitive",
    tagline: "Speed-Distance & DILR",
    badge: "Management",
  },
  {
    id: "GATE",
    shortName: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    authority: "IISc & IITs",
    category: "national-competitive",
    tagline: "Eigenvectors & Systems",
    badge: "Technical",
  },
  {
    id: "UPSC CSE",
    shortName: "UPSC CSE",
    fullName: "Civil Services Examination",
    authority: "UPSC",
    category: "national-competitive",
    tagline: "CSAT Syllogisms & Logic",
    badge: "Civil Services",
  },
  {
    id: "CLAT",
    shortName: "CLAT",
    fullName: "Common Law Admission Test",
    authority: "Consortium of NLUs",
    category: "national-competitive",
    tagline: "Strict Liability & Torts",
    badge: "Law",
  },
  {
    id: "CA Foundation",
    shortName: "CA Foundation",
    fullName: "Chartered Accountancy Foundation",
    authority: "ICAI",
    category: "national-competitive",
    tagline: "Contract Act & Annuities",
    badge: "Accounting",
  },
];

// ---------------------------------------------------------------------------
// Precision SVG Monograms (Bespoke vector marks for all 13 exams)
// ---------------------------------------------------------------------------

function ExamMark({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "SAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Stylized SAT graduation mortarboard + geometric compass */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "GRE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Diamond quantitative comparison geometric prism */}
          <path d="M12 2L2 12l10 10 10-10L12 2z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7v10M7 12h10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "GMAT Focus":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Precision data insights / target focus rings */}
          <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="4" strokeWidth="1.75" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "CFA Level 1":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Investment analysis shield & financial candle bars */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13v-3M12 15v-6M15 11V8" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "IELTS Academic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Global English speech bubble & 4-band acoustic waves */}
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "TOEFL iBT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Acoustic soundwave / speech signals */}
          <path d="M2 10v4M6 6v12M10 3v18M14 6v12M18 9v6M22 11v2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "JEE Main":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Atomic orbital & calculus integral curve */}
          <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth="1.75" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth="1.75" transform="rotate(-30 12 12)" />
          <circle cx="12" cy="12" r="1.75" fill="currentColor" />
        </svg>
      );
    case "NEET":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Medical cross & DNA double-helix */}
          <path d="M9 3v18M15 3v18M5 7h14M5 12h14M5 17h14" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="9" cy="7" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <circle cx="9" cy="17" r="1.5" fill="currentColor" />
        </svg>
      );
    case "CAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* IIM Management apex column / stepped percentile podium */}
          <path d="M4 20h16M4 20V14h3v6M10.5 20V9h3v11M17 20V4h3v16" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 11l6.5-5 6.5-2" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );
    case "GATE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Precision engineering spur gear & logic gate node */}
          <circle cx="12" cy="12" r="3" strokeWidth="1.75" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="1.75" />
        </svg>
      );
    case "UPSC CSE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Civil Services pillar of governance & laurel */}
          <path d="M4 21h16M6 21V8M18 21V8M12 21V8M3 8h18L12 3 3 8z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13h6M9 17h6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "CLAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Classical balanced scales of justice */}
          <path d="M12 3v18M8 21h8M3 7l4 7h6l4-7M7 7h10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 14c0 2 1.8 3 4 3s4-1 4-3H3zM13 14c0 2 1.8 3 4 3s4-1 4-3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "CA Foundation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          {/* Balance sheet ledger & chartered accounting seal */}
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.75" />
          <path d="M3 9h18M9 21V9M15 13h3M15 17h3" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
          <path d="M12 8v8M8 12h8" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface SupportedExamsBarProps {
  activeExam: string;
  onSelectExam: (examId: string) => void;
}

export default function SupportedExamsBar({
  activeExam,
  onSelectExam,
}: SupportedExamsBarProps) {
  const [filter, setFilter] = useState<ExamCategoryFilter>("all");

  const filteredExams =
    filter === "all"
      ? ALL_SUPPORTED_EXAMS
      : ALL_SUPPORTED_EXAMS.filter((e) => e.category === filter);

  return (
    <div className="w-full">
      {/* Header kicker & authority stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              All 13 Supported Standardized Exam Curricula
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-foreground/80 font-normal">
            Select any curriculum to test live diagnostic questions and distractor breakdowns:
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: "all", label: "All 13 Tracks" },
              { id: "study-abroad", label: "Study Abroad" },
              { id: "global-grad-pro", label: "Grad & Finance" },
              { id: "national-competitive", label: "National" },
            ] as const
          ).map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer",
                  isSelected
                    ? "bg-[#051C2C] text-white dark:bg-blue-600 font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upfront Exam Badges Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {filteredExams.map((exam) => {
          const isActive = activeExam === exam.id;
          const slug = examToSlug(exam.id);

          return (
            <div
              key={exam.id}
              onClick={() => onSelectExam(exam.id)}
              className={cn(
                "group relative flex flex-col justify-between rounded-xl border p-3 transition-all cursor-pointer select-none text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-500 shadow-sm ring-1 ring-blue-600/30"
                  : "border-border/80 bg-card hover:border-blue-500/40 hover:bg-secondary/40 hover:shadow-xs",
              )}
            >
              <div>
                {/* Top Row: SVG Monogram & Active Dot or Syllabus Link */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-secondary text-muted-foreground group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 dark:group-hover:text-blue-300",
                    )}
                  >
                    <ExamMark id={exam.id} className="h-4 w-4" />
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/15 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-blue-700 dark:text-blue-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <Link
                      href={`/practice/${slug}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Open ${exam.shortName} practice syllabus`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                {/* Exam Name */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold tracking-tight transition-colors truncate",
                        isActive
                          ? "text-blue-950 dark:text-blue-100 font-bold"
                          : "text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300",
                      )}
                    >
                      {exam.shortName}
                    </span>
                  </div>

                  {/* Authority / Board */}
                  <span className="block text-[10px] font-mono text-muted-foreground truncate leading-tight mt-0.5">
                    {exam.authority}
                  </span>
                </div>
              </div>

              {/* Bottom Tagline / Micro Focus */}
              <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground/80 truncate">
                  {exam.tagline}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Syllabus Jump & Trust Affirmation */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Click any exam to instantly load its authentic question & distractor breakdown in the simulator below.</span>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span>Explore All 13 Syllabi Portals</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
