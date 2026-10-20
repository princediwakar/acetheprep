// Path: components/tutor/SessionHistoryRow.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Zap,
  AlertCircle,
  Calendar,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionRow } from "@/types/tutor";
import { getExamBlueprint } from "@/lib/constants/exam-blueprints";

interface SessionHistoryRowProps {
  session: SessionRow;
  examName: string | null;
  onDiscard: (e: React.MouseEvent, sessionId: string) => void;
}

export function SessionHistoryRow({ session, examName, onDiscard }: SessionHistoryRowProps) {
  const date = new Date(session.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isCompleted = session.status === "completed";
  const isActive = session.status === "active";

  const totalQuestions =
    session.totalQuestions > 0 ? session.totalQuestions : session.answeredCount;

  const bp = examName ? getExamBlueprint(examName) : null;
  const isFullMock = bp ? totalQuestions >= bp.officialMockCount : totalQuestions >= 40;

  const intentLabel =
    session.session_intent === "custom_mock"
      ? isFullMock
        ? "Full Mock Test"
        : "Practice Set"
      : session.session_intent === "tracked"
        ? "Timed Test"
        : session.session_intent === "diagnostic"
          ? "Diagnostic Test"
          : "Study Session";

  const domainCount = session.target_domains?.length ?? 0;
  const domainText =
    domainCount === 0
      ? "General Practice"
      : domainCount === 1
        ? session.target_domains[0]
        : `${domainCount} domains`;

  const accuracyColor =
    session.accuracy >= 80
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
      : session.accuracy >= 50
        ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25"
        : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25";

  const barBg =
    session.accuracy >= 80
      ? "bg-emerald-500"
      : session.accuracy >= 50
        ? "bg-blue-500"
        : "bg-amber-500";

  return (
    <div className="group transition-colors hover:bg-muted/30">
      {/* Desktop Row */}
      <div className="hidden md:grid grid-cols-12 px-5 py-3.5 items-center gap-4">
        {/* Col 1-5: Session & Focus */}
        <div className="col-span-5 flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
              isCompleted
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : isActive
                  ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                  : "bg-muted border-border/60 text-muted-foreground"
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : isActive ? (
              <Zap className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {intentLabel}
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase font-mono font-medium px-1.5 py-0.2 rounded border",
                  isCompleted
                    ? "bg-muted/50 text-muted-foreground border-border/60"
                    : isActive
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      : "bg-muted/30 text-muted-foreground/80 border-border/40"
                )}
              >
                {session.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
              {examName && <span className="font-medium text-foreground/80">{examName}</span>}
              {examName && <span>•</span>}
              <span className="truncate">{domainText}</span>
            </div>
          </div>
        </div>

        {/* Col 6-7: Date */}
        <div className="col-span-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span>{date}</span>
        </div>

        {/* Col 8-10: Performance */}
        <div className="col-span-3">
          {isCompleted ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold font-mono text-foreground tabular-nums">
                {session.correctCount}/{totalQuestions}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", barBg)}
                    style={{ width: `${Math.min(100, session.accuracy)}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-mono font-semibold px-1.5 py-0.5 rounded border",
                    accuracyColor
                  )}
                >
                  {session.accuracy}%
                </span>
              </div>
            </div>
          ) : isActive ? (
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>{session.answeredCount} of {totalQuestions} answered</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground italic">Incomplete</span>
          )}
        </div>

        {/* Col 11-12: Action */}
        <div className="col-span-2 flex items-center justify-end gap-1.5">
          {isCompleted ? (
            <Link
              href={`/session/${session.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-background/80 hover:bg-primary hover:text-primary-foreground hover:border-primary px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all active:scale-[0.98]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href={`/session/${session.id}`}
                className="inline-flex items-center gap-1 rounded-lg bg-primary hover:opacity-95 px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Resume</span>
              </Link>
              <button
                onClick={(e) => onDiscard(e, session.id)}
                title="Discard session"
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-transparent hover:border-destructive/30 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Row */}
      <div className="md:hidden p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={cn(
                "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0",
                isCompleted
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : isActive
                    ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "bg-muted border-border/60 text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : isActive ? (
                <Zap className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-foreground truncate">
                {intentLabel}
              </h4>
              {examName && (
                <p className="text-[11px] text-muted-foreground truncate">{examName}</p>
              )}
            </div>
          </div>

          <span className="text-[10px] uppercase font-mono font-medium px-2 py-0.5 rounded border border-border/60 bg-muted/40 text-muted-foreground shrink-0">
            {session.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 opacity-70" />
            <span>{date}</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-normal truncate max-w-[160px]">
            {domainText}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-1">
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-mono text-foreground tabular-nums">
                {session.correctCount}/{totalQuestions}
              </span>
              <span
                className={cn(
                  "text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded border",
                  accuracyColor
                )}
              >
                {session.accuracy}%
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              {session.answeredCount} of {totalQuestions} answered
            </span>
          )}

          {isCompleted ? (
            <Link
              href={`/session/${session.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
            >
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href={`/session/${session.id}`}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Resume</span>
              </Link>
              <button
                onClick={(e) => onDiscard(e, session.id)}
                className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
