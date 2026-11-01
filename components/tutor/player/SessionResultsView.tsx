// Path: components/tutor/player/SessionResultsView.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import { renderMathContent } from "@/lib/quiz-utils";
import { RichContentRenderer } from "@/components/ui/rich-content/RichContentRenderer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flag,
  Zap,
  Sparkles,
  LayoutDashboard,
  Gauge,
  ChevronsUpDown,
  MessageCircle,
} from "lucide-react";
import type { SessionQuestion } from "@/types/tutor";
import type { QuestionAttemptRecord } from "../SessionPlayer";
import { trackEvent } from "@/lib/telemetry";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

interface SessionResultsViewProps {
  examName?: string;
  total: number;
  score: number;
  totalTimeElapsed: number;
  questions: SessionQuestion[];
  userAttempts: Record<string, QuestionAttemptRecord>;
  flaggedQuestions: Set<number>;
  nextDomain: string | null;
  startingNext: boolean;
  shareToken?: string;
  onBackToDashboard: () => void;
  onStartNextTopic: () => void;
  formatTime: (sec: number) => string;
}

export function SessionResultsView({
  examName,
  total,
  score,
  totalTimeElapsed,
  questions,
  userAttempts,
  flaggedQuestions,
  nextDomain,
  startingNext,
  shareToken,
  onBackToDashboard,
  onStartNextTopic,
  formatTime,
}: SessionResultsViewProps) {
  const [reviewFilter, setReviewFilter] = useState<"all" | "flagged" | "incorrect" | "traps" | "correct">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const correctCount = Object.values(userAttempts).filter((a) => a.isCorrect).length;
  const incorrectCount = total - correctCount;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const trapsCaughtCount = questions.filter((q) => {
    const attempt = userAttempts[q.question_id];
    return Boolean(attempt?.selected && !attempt.isCorrect && q.distractor_analysis?.[attempt.selected]);
  }).length;

  const flaggedCount = flaggedQuestions.size;

  // Track test completion event in PostHog
  useEffect(() => {
    trackEvent("test_completed", {
      exam: examName,
      total,
      score: correctCount,
      accuracy_pct: pct,
      time_elapsed_sec: totalTimeElapsed,
      traps_caught: trapsCaughtCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pacing telemetry
  const avgSecondsPerQ = total > 0 ? Math.round(totalTimeElapsed / total) : 0;
  const pacingStatus =
    avgSecondsPerQ < 25
      ? { label: "Rushed Pace", color: "text-amber-500" }
      : avgSecondsPerQ > 150
        ? { label: "Overtime", color: "text-rose-500" }
        : { label: "Target Pace", color: "text-emerald-500" };

  const missedDomains = Array.from(
    new Set(
      questions
        .filter((q) => {
          const attempt = userAttempts[q.question_id];
          return attempt && !attempt.isCorrect && q.skill_domain;
        })
        .map((q) => q.skill_domain),
    ),
  );

  const showSeparateTrapsTab = trapsCaughtCount > 0 && trapsCaughtCount !== incorrectCount;

  const filteredQuestions = questions.filter((q, idx) => {
    const attempt = userAttempts[q.question_id];
    if (reviewFilter === "all") return true;
    if (reviewFilter === "flagged") return flaggedQuestions.has(idx);
    if (reviewFilter === "incorrect") return Boolean(!attempt?.isCorrect);
    if (reviewFilter === "traps") {
      return Boolean(attempt?.selected && !attempt.isCorrect && q.distractor_analysis?.[attempt.selected]);
    }
    if (reviewFilter === "correct") return Boolean(attempt?.isCorrect);
    return true;
  });

  const allFilteredExpanded = filteredQuestions.every((q) => expandedQuestions[q.question_id] ?? true);

  const toggleQuestionExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !(prev[qId] ?? true),
    }));
  };

  const handleToggleAllExpand = () => {
    const nextState = !allFilteredExpanded;
    const updated: Record<string, boolean> = {};
    for (const q of questions) {
      updated[q.question_id] = nextState;
    }
    setExpandedQuestions(updated);
  };

  const handleJumpToQuestion = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: true }));
    const el = document.getElementById(`review-item-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

  const shareUrl = shareToken ? `${baseUrl}/s/${shareToken}` : null;

  const hardestMissedQuestion =
    questions.find((q) => {
      const attempt = userAttempts[q.question_id];
      return attempt && !attempt.isCorrect;
    }) || questions[0];

  const handleCopyShareLink = async () => {
    if (!shareUrl) return;
    try {
      const challengeMsg = `Can you beat my ${score}/${total} score on this ${examName || "Standardized Exam"} drill? Take the quiz duel on AceThePrep: ${shareUrl}`;
      await navigator.clipboard.writeText(challengeMsg);
      setCopiedLink(true);
      toast.success("Challenge invite & link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShareWhatsApp = () => {
    if (!shareUrl) return;
    const text = encodeURIComponent(
      `Can you beat my ${score}/${total} score on this ${examName || "Standardized Exam"} drill? Take the quiz duel on AceThePrep: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopyForumDoubt = async () => {
    if (!hardestMissedQuestion) return;
    const optionsFormatted = Object.entries(hardestMissedQuestion.options || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, text]) => `(${letter}) ${text}`)
      .join("\n");

    const markdown = `**[${examName || "Standardized Exam"} - ${hardestMissedQuestion.skill_domain || "Practice"}] Question Doubt**

Can someone explain why the trap option fails and clarify the optimal approach?

**Question:**
${hardestMissedQuestion.question_text}

${optionsFormatted}

>!**Correct Answer:** Option ${hardestMissedQuestion.correct_option}!<
>!**Explanation:** ${hardestMissedQuestion.explanation?.slice(0, 300)}...!<

${shareUrl ? `*Live interactive peer duel & distractor breakdown on AceThePrep: ${shareUrl}*` : ""}`;

    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Forum doubt format copied (Reddit/Discord ready)!");
    } catch {
      toast.error("Failed to copy markdown");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Precision Proctor Header */}
      <header className="h-14 shrink-0 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between z-30 transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
            {examName || "Standardized Exam"} &middot; Results & Diagnostic Review
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
            Review Mode
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Button
            size="sm"
            variant="outline"
            onClick={onBackToDashboard}
            className="h-8 px-3 text-xs font-semibold cursor-pointer border-border hover:bg-muted text-foreground"
          >
            <LayoutDashboard className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
            Dashboard
          </Button>
        </div>
      </header>

      {/* Main Review Body */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-1.5 pt-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Your Test Results
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Review your answers below to see what you got right, what you missed, and how to solve each one.
            </p>
          </div>

          {/* Diagnostic Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Score */}
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
              <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
                {correctCount}/{total}
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Score</div>
            </div>

            {/* Accuracy */}
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
              <div
                className={cn(
                  "text-2xl font-bold font-mono tracking-tight",
                  pct >= 70
                    ? "text-emerald-600 dark:text-emerald-400"
                    : pct >= 50
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400",
                )}
              >
                {pct}%
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Accuracy</div>
            </div>

            {/* Pacing / Time Taken */}
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
              <div className="text-2xl font-bold font-mono text-foreground tracking-tight">
                {formatTime(totalTimeElapsed)}
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-1 font-mono">
                <span>Avg {avgSecondsPerQ}s/Q</span>
                <span className={cn("font-semibold", pacingStatus.color)}>
                  &middot; {pacingStatus.label}
                </span>
              </div>
            </div>

            {/* Traps / Score Leaks Caught */}
            <div
              className={cn(
                "rounded-xl border p-4 text-center shadow-xs transition-colors",
                trapsCaughtCount > 0
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-border bg-card",
              )}
            >
              <div
                className={cn(
                  "text-2xl font-bold font-mono tracking-tight flex items-center justify-center gap-1",
                  trapsCaughtCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {trapsCaughtCount > 0 && <AlertTriangle className="w-5 h-5 shrink-0" />}
                {trapsCaughtCount}
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">
                {trapsCaughtCount > 0 ? "Common Traps Hit" : "No Traps Hit"}
              </div>
            </div>
          </div>

          {/* Interactive Question Jump Matrix Strip */}
          <div className="rounded-xl border border-border bg-card p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Questions
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleAllExpand}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                <ChevronsUpDown className="w-3.5 h-3.5" />
                {allFilteredExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => {
                const attempt = userAttempts[q.question_id];
                const isCorrect = attempt?.isCorrect;
                const isTrap = attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
                const isFlagged = flaggedQuestions.has(idx);

                return (
                  <button
                    key={q.question_id}
                    type="button"
                    onClick={() => handleJumpToQuestion(q.question_id)}
                    className={cn(
                      "relative h-9 w-9 rounded-lg font-mono text-xs font-bold border transition-all flex items-center justify-center cursor-pointer",
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                        : isTrap
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                          : "bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20",
                    )}
                    title={`Question ${idx + 1}: ${isCorrect ? "Correct" : isTrap ? "Trap Hit" : "Incorrect"}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-card" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Score Leak Elimination Alert - Immediate Top Priority */}
          {missedDomains.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl border border-rose-500/25 bg-rose-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <h4 className="font-bold text-sm sm:text-base text-foreground">
                    {incorrectCount} Question{incorrectCount > 1 ? "s" : ""} to Review
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10"
                  >
                    Saved to Review List
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Topics to brush up on:{" "}
                  <strong className="text-foreground font-semibold">
                    {missedDomains.join(", ")}
                  </strong>
                  . Check your answers below to see why the right choices work and where you got tripped up.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold"
                >
                  <Link href="/mistakes">
                    Error Log &rarr;
                  </Link>
                </Button>
                {nextDomain && (
                  <Button
                    size="sm"
                    onClick={onStartNextTopic}
                    disabled={startingNext}
                    className="cursor-pointer font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs text-xs"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1 fill-white" />
                    Practice Weak Topics
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Post-Exam Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border/80">
            <span className="font-semibold text-sm text-foreground">
              Question Breakdown
            </span>
            <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-lg border border-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setReviewFilter("all")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
                )}
              >
                All ({total})
              </button>

              <button
                type="button"
                onClick={() => setReviewFilter("incorrect")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "incorrect"
                    ? "bg-card text-rose-600 dark:text-rose-400 shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Mistakes ({incorrectCount})
              </button>

              {showSeparateTrapsTab && (
                <button
                  type="button"
                  onClick={() => setReviewFilter("traps")}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                    reviewFilter === "traps"
                      ? "bg-card text-amber-600 dark:text-amber-400 shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Traps ({trapsCaughtCount})
                </button>
              )}

              <button
                type="button"
                onClick={() => setReviewFilter("flagged")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer",
                  reviewFilter === "flagged"
                    ? "bg-card text-amber-600 dark:text-amber-400 shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Flag className="h-3 w-3 fill-amber-500 text-amber-500" />
                Flagged ({flaggedCount})
              </button>

              <button
                type="button"
                onClick={() => setReviewFilter("correct")}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer",
                  reviewFilter === "correct"
                    ? "bg-card text-emerald-600 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Correct ({correctCount})
              </button>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const originalIndex = questions.indexOf(q);
              const attempt = userAttempts[q.question_id];
              const isTrap = attempt?.selected && !attempt.isCorrect && Boolean(q.distractor_analysis?.[attempt.selected]);
              const isFlagged = flaggedQuestions.has(originalIndex);
              const isExpanded = expandedQuestions[q.question_id] ?? true;

              return (
                <div
                  id={`review-item-${q.question_id}`}
                  key={q.question_id}
                  className="border border-border rounded-xl bg-card p-4 sm:p-5 space-y-4 shadow-xs transition-all scroll-mt-20"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleQuestionExpand(q.question_id)}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground font-mono">
                        Question {originalIndex + 1}
                      </span>
                      <Badge variant="outline" className="text-xs font-medium">
                        {q.skill_domain}
                      </Badge>
                      {isFlagged && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          <Flag className="h-3 w-3 fill-amber-500 text-amber-500" />
                          Marked for Review
                        </span>
                      )}
                      {attempt?.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : isTrap ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" /> Common Trap
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground cursor-pointer p-1"
                      aria-label={isExpanded ? "Collapse item" : "Expand item"}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t border-border">
                      <div className="text-sm font-medium leading-relaxed text-foreground">
                        <RichContentRenderer content={q.question_text} />
                      </div>

                      {/* Standard Multiple Choice Option Cards */}
                      <div className="space-y-2.5">
                        {OPTION_LETTERS.filter((key) => key in q.options).map((key) => {
                          const isSelected = attempt?.selected === key;
                          const isCorrectOption = key === q.correct_option;

                          let containerStyle = "border-border/70 bg-secondary/20 text-foreground";
                          if (isCorrectOption) {
                            containerStyle = "border-emerald-500/70 bg-emerald-500/10 text-foreground ring-1 ring-emerald-500/30";
                          } else if (isSelected && !isCorrectOption) {
                            containerStyle = "border-rose-500/70 bg-rose-500/10 text-foreground ring-1 ring-rose-500/30";
                          }

                          return (
                            <div
                              key={key}
                              className={cn(
                                "flex items-center justify-between gap-3 p-3.5 rounded-xl border text-sm transition-all",
                                containerStyle,
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Option Letter Badge matching QuestionCard.tsx */}
                                <span
                                  className={cn(
                                    "h-7 w-7 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-semibold border transition-colors",
                                    isCorrectOption
                                      ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                                      : isSelected
                                        ? "bg-rose-600 text-white border-rose-600 font-bold"
                                        : "border-border bg-card text-muted-foreground",
                                  )}
                                >
                                  {key}
                                </span>
                                <span className="text-sm font-medium leading-snug break-words">
                                  {renderMathContent(q.options[key])}
                                </span>
                              </div>

                              {/* Explicit Diagnostic Outcome Badges */}
                              <div className="flex items-center gap-2 shrink-0">
                                {isSelected && !isCorrectOption && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-md">
                                    Your Choice
                                  </span>
                                )}
                                {isCorrectOption && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                                    Correct Answer
                                  </span>
                                )}
                                {isCorrectOption && (
                                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                )}
                                {isSelected && !isCorrectOption && (
                                  <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Why Selected Wrong Option Failed */}
                      {attempt?.selected && attempt.selected !== q.correct_option && q.distractor_analysis?.[attempt.selected] && (
                        <div className="rounded-xl p-3.5 bg-rose-500/10 border border-rose-500/25 text-xs text-foreground leading-relaxed">
                          <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                            Why Option ({attempt.selected}) is wrong:
                          </span>
                          {renderMathContent(q.distractor_analysis[attempt.selected])}
                        </div>
                      )}

                      {/* Step-by-Step Solution */}
                      {q.explanation && (
                        <div className="rounded-xl p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground leading-relaxed">
                          <span className="font-semibold text-foreground block mb-1">
                            Step-by-step solution:
                          </span>
                          <RichContentRenderer content={q.explanation} />
                        </div>
                      )}

                      {/* Key Takeaway */}
                      {q.misconception && (
                        <div className="text-xs text-muted-foreground border-t border-border pt-2.5">
                          <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                            Key Takeaway:
                          </span>
                          {q.misconception}
                        </div>
                      )}

                      {/* Peer Discussion Link */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-xs">
                        <span className="text-[11px] text-muted-foreground">
                          Want to see how other students solved this?
                        </span>
                        <Link
                          href={`/q/${q.question_id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-semibold text-xs text-primary hover:underline transition-colors"
                        >
                          <span>Discuss Question with Peers</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Dock */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {nextDomain && (
              <Button
                className="flex-1 h-11 text-sm font-semibold cursor-pointer"
                onClick={onStartNextTopic}
                disabled={startingNext}
              >
                Practice Next Topic: {nextDomain}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 h-11 text-sm font-semibold cursor-pointer"
              onClick={onBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Secondary Footer Utility: Discuss with Study Partners */}
          {shareUrl && (
            <div className="pt-2 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Want to discuss tricky questions with study partners?</span>
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyForumDoubt}
                  className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Forum Markdown
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleShareWhatsApp}
                  className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyShareLink}
                  className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {copiedLink ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
