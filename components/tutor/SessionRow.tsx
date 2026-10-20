// Path: components/tutor/SessionRow.tsx
"use client";

import Link from "next/link";
import { CheckCircle2, Zap, AlertCircle, ChevronRight } from "lucide-react";
import type { AnalyticsPageData } from "@/app/analytics/page";

interface SessionRowProps {
  session: AnalyticsPageData["recentSessions"][number];
}

export function SessionRow({ session }: SessionRowProps) {
  const date = new Date(session.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const isCompleted = session.status === "completed";
  const isActive = session.status === "active";

  const intentLabel =
    session.session_intent === "custom_mock"
      ? "Mock Exam"
      : session.session_intent === "tracked"
        ? "Exam Simulation"
        : session.session_intent === "diagnostic"
          ? "Diagnostic Test"
          : "Tutor Drill";

  const domainCount = session.target_domains?.length ?? 0;
  const domainText =
    domainCount === 0
      ? "General Practice"
      : domainCount === 1
        ? session.target_domains[0]
        : `${domainCount} domains`;

  const totalQuestions = session.totalQuestions > 0 ? session.totalQuestions : session.answeredCount;

  return (
    <Link
      href={`/session/${session.id}`}
      className="group block p-3.5 rounded-xl border border-border/70 bg-card hover:border-primary/40 hover:bg-muted/30 transition-all duration-200 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center text-muted-foreground">
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : isActive ? (
              <Zap className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-foreground transition-colors">
                {intentLabel}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground">
                {session.status}
              </span>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <span>{date}</span>
              <span>&middot;</span>
              <span className="truncate max-w-[180px]" title={domainText}>
                {domainText}
              </span>
            </div>
          </div>
        </div>

        {/* Right side metric & CTA */}
        <div className="text-right flex flex-col items-end shrink-0">
          {isCompleted ? (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-foreground tabular-nums">
                  {session.correctCount}/{totalQuestions}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  ({session.accuracy}%)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-foreground/80 inline-flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition-transform">
                Review Solutions <ChevronRight className="w-3 h-3" />
              </span>
            </>
          ) : isActive ? (
            <>
              <div className="text-xs font-medium text-muted-foreground">
                {session.answeredCount}/{totalQuestions} answered
              </div>
              <span className="text-[11px] font-semibold text-foreground inline-flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition-transform">
                Resume Test <ChevronRight className="w-3 h-3" />
              </span>
            </>
          ) : (
            <span className="text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-0.5 mt-1">
              View <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
