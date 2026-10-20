// Path: components/tutor/DomainBar.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DomainBarProps {
  domain: string;
  score: number;
  totalAttempted: number;
}

export function DomainBar({ domain, score, totalAttempted }: DomainBarProps) {
  const pct = Math.round(score * 100);
  const notStarted = totalAttempted === 0;
  const barColor =
    score < 0.3 && !notStarted ? "bg-red-500" : score >= 0.7 && !notStarted ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="p-4 rounded-xl hover:bg-muted/40 transition-colors border border-transparent hover:border-border/60 group">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-semibold text-sm group-hover:text-primary transition-colors">{domain}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {notStarted ? "Not started" : `${pct}% Mastery`}
          </span>
          <Link
            href={`/session/start?domain=${encodeURIComponent(domain)}`}
            className="text-xs text-primary hover:underline flex items-center font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Practice <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </div>
      <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${notStarted ? 0 : Math.max(pct, 4)}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-[11px] text-muted-foreground">
        <span>{totalAttempted} Questions Logged</span>
        <span>{notStarted ? "Uncalibrated" : pct >= 70 ? "Ready for Exam" : pct >= 40 ? "Needs Review" : "Critical Blindspot"}</span>
      </div>
    </div>
  );
}
