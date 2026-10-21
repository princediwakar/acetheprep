// Path: components/landing/ExamMark.tsx
import React from "react";

// Precision SVG Monograms (Bespoke vector marks for all 6 exams)
export function ExamMark({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "SAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "GRE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M12 2L2 12l10 10 10-10L12 2z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7v10M7 12h10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "GMAT Focus":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="4" strokeWidth="1.75" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "CFA Level 1":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13v-3M12 15v-6M15 11V8" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "IELTS Academic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "TOEFL iBT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M2 10v4M6 6v12M10 3v18M14 6v12M18 9v6M22 11v2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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
