// Path: components/practice/TopicPracticeDrill.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Question } from "@/lib/schemas/quiz";
import { renderMathContent, extractPassageContent } from "@/lib/quiz-utils";
import { signInWithGoogle } from "@/lib/supabase/auth";
import { useUser } from "@/hooks/useUser";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  AlertTriangle,
  Brain,
  Target,
  TrendingUp,
  Lock,
  Zap,
} from "lucide-react";

interface TopicPracticeDrillProps {
  questions: Question[];
  examName: string;
  subjectName: string;
  domainName: string;
}

interface AttemptRecord {
  selectedOption: string;
  isCorrect: boolean;
}

export function TopicPracticeDrill({
  questions,
  examName,
  subjectName,
  domainName,
}: TopicPracticeDrillProps) {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<Record<number, AttemptRecord>>({});
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  const isRevealed = Boolean(currentAttempt);

  const score = useMemo(() => {
    return Object.values(attempts).filter((a) => a.isCorrect).length;
  }, [attempts]);

  const attemptedCount = Object.keys(attempts).length;
  const isDrillComplete = attemptedCount === totalQuestions && totalQuestions > 0;

  // Floating bar appears after the user answers their first question
  useEffect(() => {
    if (attemptedCount >= 1 && !isDrillComplete) {
      const t = setTimeout(() => setShowFloatingBar(true), 600);
      return () => clearTimeout(t);
    }
    if (isDrillComplete) {
      setShowFloatingBar(false);
    }
  }, [attemptedCount, isDrillComplete]);

  const incorrectDomains = useMemo(() => {
    return Object.entries(attempts)
      .filter(([, a]) => !a.isCorrect)
      .map(([idx]) => questions[Number(idx)]?.skill_domain || domainName)
      .filter(Boolean);
  }, [attempts, questions, domainName]);

  const accuracyPct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleSelectOption = (optionKey: string) => {
    if (isRevealed || !currentQuestion) return;

    const isCorrect = optionKey === currentQuestion.correct_option;
    setAttempts((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedOption: optionKey,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAttempts({});
    setCurrentIndex(0);
    setShowFloatingBar(false);
  };

  const handleSignIn = useCallback(() => {
    // Route to practice page with onboarded flag so callback can auto-provision for new users
    const returnUrl =
      typeof window !== "undefined"
        ? `${window.location.pathname}?onboarded=1&exam=${encodeURIComponent(examName)}`
        : "/home";
    signInWithGoogle(returnUrl);
  }, [examName]);

  if (!currentQuestion) {
    return null;
  }

  const { passage, prompt } = extractPassageContent(
    currentQuestion.question_text,
    currentQuestion.passage,
  );
  const wordCount = passage ? passage.split(/\s+/).filter(Boolean).length : 0;

  const optionEntries = Object.entries(currentQuestion.options).filter(
    ([, text]) => Boolean(text),
  );

  // ── Completion state copy ─────────────────────────────────────────────────
  const completionHeadline =
    accuracyPct >= 80
      ? "Strong instincts on this topic preview."
      : accuracyPct >= 50
        ? "Good baseline — but exam traps can drain points."
        : "Score leaks detected in this topic preview.";

  const completionSubtext = user
    ? `You completed the ${domainName} preview (${score} of ${totalQuestions} correct). Continue to your study dashboard to take adaptive drills, review mistakes, and calibrate your score prediction.`
    : `You completed the ${domainName} preview (${score} of ${totalQuestions} correct). Start your free ${examName} study plan to take the full AI diagnostic, track score predictions, and lock in adaptive review reminders.`;

  // ── DRILL COMPLETE SCREEN ─────────────────────────────────────────────────
  if (isDrillComplete) {
    return (
      <div className="rounded-2xl border border-border/80 bg-card shadow-xs overflow-hidden">
        {/* Score header strip */}
        <div
          className={`px-6 py-5 flex items-center gap-4 ${
            accuracyPct >= 80
              ? "bg-emerald-500/10 border-b border-emerald-500/20"
              : accuracyPct >= 50
                ? "bg-amber-500/10 border-b border-amber-500/20"
                : "bg-rose-500/10 border-b border-rose-500/20"
          }`}
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black font-mono ${
              accuracyPct >= 80
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                : accuracyPct >= 50
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
                  : "bg-rose-500/20 text-rose-700 dark:text-rose-400"
            }`}
          >
            {accuracyPct}%
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                {examName} • {domainName}
              </span>
            </div>
            <p className="text-base font-bold text-foreground">{completionHeadline}</p>
            <p className="text-xs text-muted-foreground">
              {score} correct out of {totalQuestions} questions
            </p>
          </div>
        </div>

        {/* Score breakdown pills */}
        <div className="px-6 py-4 flex flex-wrap gap-3 border-b border-border/60">
          {Object.entries(attempts).map(([idxStr, att]) => {
            const q = questions[Number(idxStr)];
            return (
              <div
                key={idxStr}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  att.isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                }`}
              >
                {att.isCorrect ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>Q{Number(idxStr) + 1}</span>
                <span className="text-[10px] opacity-70">
                  {att.isCorrect ? "Correct" : `Picked ${att.selectedOption} → ${q?.correct_option}`}
                </span>
              </div>
            );
          })}
        </div>

        {/* Primary conversion block */}
        <div className="px-6 py-6 space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Brain className="h-4 w-4 text-primary shrink-0" />
              {completionSubtext}
            </div>
          </div>

          {/* What you unlock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Target className="h-3.5 w-3.5 text-primary" />
                SM-2 Spaced Review
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Scheduled reminders right before this topic fades from memory.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                Score Predictor
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                AI calculates your current predicted {examName} score from this session.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" />
                Adaptive Drills
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                AI generates targeted questions on your exact weak sub-skills.
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          {user ? (
            <Link
              href="/home"
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold text-background hover:opacity-90 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
            >
              <span>Continue on Study Dashboard</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold text-background hover:opacity-90 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span>Start Free {examName} AI Diagnostic</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          )}

          {!user && (
            <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                100% Free
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                No credit card
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                30-second setup
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Unlock timed full mocks with Pro →</span>
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry these questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── NORMAL DRILL SCREEN ───────────────────────────────────────────────────
  return (
    <>
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        {/* Top Header & Navigation Stepper */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/70 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                {examName} • {subjectName}
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-xs font-semibold text-muted-foreground">
                {totalQuestions} Verified Questions
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {domainName} Practice Questions
            </h2>
          </div>

          {/* Score & Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/80 border border-border/80 text-xs font-mono font-semibold text-foreground">
              <Award className="h-3.5 w-3.5 text-primary" />
              <span>
                Score: {score} / {attemptedCount}
              </span>
            </div>

            {attemptedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted cursor-pointer"
                title="Reset Questions"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Stepper Buttons */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto p-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {questions.map((_, idx) => {
              const att = attempts[idx];
              const isCurrent = idx === currentIndex;

              let pillStyle =
                "border-border/80 bg-secondary/40 text-muted-foreground hover:bg-secondary";
              if (att) {
                pillStyle = att.isCorrect
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold"
                  : "border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-400 font-bold";
              }
              if (isCurrent) {
                pillStyle +=
                  " ring-2 ring-primary ring-offset-1 ring-offset-background font-bold text-foreground relative z-10";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-8 w-8 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center justify-center shrink-0 ${pillStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === totalQuestions - 1}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
            >
              <span>Next ({currentIndex + 1} of {totalQuestions})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Reading Passage (if question contains one, e.g. MSR or RC) */}
        {passage && (
          <div className="rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 text-sm font-serif leading-[1.8] text-foreground/90 space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs font-mono text-muted-foreground uppercase">
              <span className="flex items-center gap-1.5 font-semibold text-foreground/80">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Reference Passage & Exhibits
              </span>
              <span>{wordCount} words</span>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {passage.split(/\n\n+/).filter(Boolean).map((p, pIdx) => (
                <p key={pIdx} className="indent-2">
                  {renderMathContent(p)}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Question Prompt */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-mono font-bold text-primary">
              Question #{currentIndex + 1}
            </span>
            {currentQuestion.difficulty_tier && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground uppercase">
                {currentQuestion.difficulty_tier}
              </span>
            )}
          </div>
          <p className="text-base text-foreground leading-relaxed font-normal pt-1 whitespace-pre-line">
            {renderMathContent(prompt)}
          </p>
        </div>

        {/* Answer Choices */}
        <div className="space-y-2.5 pt-1">
          {optionEntries.map(([label, text]) => {
            let btnStyle = "border-border/80 bg-card hover:bg-secondary/40 text-foreground";
            let badgeStyle = "bg-muted text-muted-foreground";

            if (isRevealed) {
              if (label === currentQuestion.correct_option) {
                btnStyle =
                  "border-emerald-500/80 bg-emerald-500/10 text-foreground ring-1 ring-emerald-500/30";
                badgeStyle = "bg-emerald-600 text-white font-bold";
              } else if (label === currentAttempt?.selectedOption && !currentAttempt.isCorrect) {
                btnStyle =
                  "border-rose-500/80 bg-rose-500/10 text-foreground ring-1 ring-rose-500/30";
                badgeStyle = "bg-rose-600 text-white font-bold";
              } else {
                btnStyle = "border-border/50 bg-muted/20 opacity-60 text-muted-foreground";
              }
            }

            return (
              <button
                key={label}
                type="button"
                disabled={isRevealed}
                onClick={() => handleSelectOption(label)}
                className={`w-full rounded-xl border p-3.5 sm:p-4 text-left transition-all flex items-start gap-3.5 ${btnStyle} ${
                  !isRevealed ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold transition-colors ${badgeStyle}`}
                >
                  {label}
                </span>
                <span className="text-sm font-medium leading-relaxed pt-0.5">
                  {renderMathContent(text)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Revealed Answer & Step-by-Step Explanation */}
        {isRevealed && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Result Banner */}
            <div
              className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                currentAttempt.isCorrect
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                  : "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {currentAttempt.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                )}
                <span className="text-sm font-bold">
                  {currentAttempt.isCorrect
                    ? "Correct! You spotted the pattern."
                    : `Incorrect. The correct answer is Option ${currentQuestion.correct_option}.`}
                </span>
              </div>

              {currentIndex < totalQuestions - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}

              {/* On the last question, nudge toward finishing the drill */}
              {currentIndex === totalQuestions - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    // Scroll to completion card (it will render on next tick)
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>See Results & Save Score</span>
                </button>
              )}
            </div>

            {/* Common Pitfall / Trap Misconception */}
            {currentQuestion.misconception && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Common Trap Pitfall</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {currentQuestion.misconception}
                </p>
              </div>
            )}

            {/* Step-by-Step Verified Solution */}
            {currentQuestion.explanation && (
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-4 sm:p-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono block">
                  Step-by-Step Solution
                </span>
                <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-2">
                  {currentQuestion.explanation.split(/\n\n+/).map((para, pIdx) => (
                    <p key={pIdx}>{renderMathContent(para)}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Distractor Breakdown for other options */}
            {currentQuestion.distractor_analysis && (
              <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono block">
                  Distractor Breakdown
                </span>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(currentQuestion.distractor_analysis).map(([opt, desc]) => {
                    const isCorrectOpt = opt === currentQuestion.correct_option;
                    return (
                      <div
                        key={opt}
                        className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                          isCorrectOpt
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300"
                            : "border-border/60 bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        <span className="font-mono font-bold shrink-0">Option {opt}:</span>
                        <span>{desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mid-drill lock hook: fires on wrong answers from Q2 onwards */}
            {!currentAttempt.isCorrect && attemptedCount >= 2 && (
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="flex items-start gap-2.5">
                  <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground">
                      AI Weak-Spot Remediation
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {user
                        ? `Targeted adaptive questions on ${domainName} are available in your personalized study queue.`
                        : `Start your free ${examName} plan to add ${domainName} to your personalized AI remediation queue and practice targeted questions.`}
                    </p>
                  </div>
                </div>
                {user ? (
                  <Link
                    href="/home"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Open Study Queue
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Fix This Weakness
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Floating Progress Bar ─────────────────────────────────────────── */}
      {showFloatingBar && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-in slide-in-from-bottom-3 fade-in duration-300">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md px-4 py-3 shadow-xl">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Award className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {examName} • {domainName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {attemptedCount}/{totalQuestions} preview questions · {score} correct
                </p>
              </div>
            </div>
            {user ? (
              <Link
                href="/home"
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-[11px] font-bold text-background hover:opacity-90 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-[11px] font-bold text-background hover:opacity-90 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Start Free Diagnostic
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
