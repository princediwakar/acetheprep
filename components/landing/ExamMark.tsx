// Path: components/landing/ExamMark.tsx
import React from "react";

// Precision SVG Monograms (Bespoke vector marks for all 13 exams)
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
    case "JEE Main":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth="1.75" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth="1.75" transform="rotate(-30 12 12)" />
          <circle cx="12" cy="12" r="1.75" fill="currentColor" />
        </svg>
      );
    case "NEET":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M9 3v18M15 3v18M5 7h14M5 12h14M5 17h14" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="9" cy="7" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <circle cx="9" cy="17" r="1.5" fill="currentColor" />
        </svg>
      );
    case "CAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M4 20h16M4 20V14h3v6M10.5 20V9h3v11M17 20V4h3v16" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 11l6.5-5 6.5-2" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );
    case "GATE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <circle cx="12" cy="12" r="3" strokeWidth="1.75" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="1.75" />
        </svg>
      );
    case "UPSC CSE":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M4 21h16M6 21V8M18 21V8M12 21V8M3 8h18L12 3 3 8z" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13h6M9 17h6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "CLAT":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
          <path d="M12 3v18M8 21h8M3 7l4 7h6l4-7M7 7h10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 14c0 2 1.8 3 4 3s4-1 4-3H3zM13 14c0 2 1.8 3 4 3s4-1 4-3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "CA Foundation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
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
