// Path: components/tutor/player/QuestionCard.tsx
"use client";

import { useState } from "react";
import { renderMathContent, extractPassageContent } from "@/lib/quiz-utils";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, BookOpen, HelpCircle, ArrowRight } from "lucide-react";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

interface QuestionCardProps {
  current: SessionQuestion;
  mode: "tutor" | "exam";
  selectedOption: SelectedOption | null;
  answerState: "pending" | "answered";
  isCorrect: boolean | null;
  onOptionClick: (option: SelectedOption) => void;
}

export function QuestionCard({
  current,
  mode,
  selectedOption,
  answerState,
  isCorrect,
  onOptionClick,
}: QuestionCardProps) {
  const { passage, prompt } = extractPassageContent(current.question_text, current.passage);

  // Sync mobile tab without useEffect (per React state-from-props guidance)
  const [prevQuestionId, setPrevQuestionId] = useState(current.question_id);
  const [mobileTab, setMobileTab] = useState<"passage" | "question">("passage");

  if (current.question_id !== prevQuestionId) {
    setPrevQuestionId(current.question_id);
    setMobileTab("passage");
  }

  const optionEntries = OPTION_LETTERS.filter((key) => key in current.options).map((key) => ({
    key,
    value: current.options[key],
  }));

  const wordCount = passage ? passage.split(/\s+/).filter(Boolean).length : 0;
  const passageParagraphs = passage ? passage.split(/\n\n+/).filter(Boolean) : [];

  // Question stem & interactive options block
  const renderQuestionStemAndOptions = () => (
    <div className="space-y-6">
      {/* Header: Domain & Difficulty */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border/80 pb-2.5">
          <span className="font-semibold text-foreground/80 tracking-wide">
            {current.skill_domain || "Problem Solving"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/70 border border-border px-2 py-0.5 rounded">
            Tier {current.difficulty_tier || 2}
          </span>
        </div>

        <div className="font-heading text-lg sm:text-xl font-normal leading-relaxed text-foreground tracking-normal">
          {renderMathContent(prompt)}
        </div>
      </div>

      {/* Option Cards */}
      <div className="space-y-3">
        {optionEntries.map(({ key, value }) => {
          const isSelected = selectedOption === key;
          const isCorrectOption = key === current.correct_option;

          let borderClasses = "border-border/80 bg-card hover:border-primary/50 hover:bg-secondary/20";

          if (mode === "tutor") {
            if (answerState === "answered") {
              if (isCorrectOption) {
                borderClasses = "border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-600";
              } else if (isSelected && !isCorrectOption) {
                borderClasses = "border-rose-600 bg-rose-50/40 dark:bg-rose-950/30 ring-1 ring-rose-600";
              }
            } else if (isSelected) {
              borderClasses = "border-primary bg-primary/5 ring-1 ring-primary";
            }
          } else {
            if (isSelected) {
              borderClasses = "border-primary bg-primary/10 ring-2 ring-primary/30";
            }
          }

          return (
            <div
              key={key}
              onClick={() => onOptionClick(key as SelectedOption)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOptionClick(key as SelectedOption);
                }
              }}
              className={cn(
                "w-full flex items-center justify-between gap-3.5 rounded-xl border p-4 text-left transition-all relative overflow-hidden select-none",
                borderClasses,
                !answerState || answerState === "pending" || mode === "exam"
                  ? "cursor-pointer active:scale-[0.995]"
                  : "cursor-default",
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={cn(
                    "h-7 w-7 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono font-semibold transition-colors",
                    mode === "tutor" && answerState === "answered" && isCorrectOption
                      ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                      : mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption
                        ? "bg-rose-600 text-white border-rose-600 font-bold"
                        : isSelected
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "border-border text-foreground/80",
                  )}
                >
                  {key}
                </span>

                <span className="text-sm font-medium text-foreground leading-snug break-words">
                  {renderMathContent(value)}
                </span>
              </div>

              {mode === "tutor" && answerState === "answered" && isCorrectOption && (
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              )}
              {mode === "tutor" && answerState === "answered" && isSelected && !isCorrectOption && (
                <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Tutor Mode Examiner Diagnostic Breakdown (Post-Answer) */}
      {mode === "tutor" && answerState === "answered" && (
        <div className="mt-6 rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Correct Deduction
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Cognitive Distractor Trap Triggered
              </span>
            )}
          </div>

          {selectedOption &&
            selectedOption !== current.correct_option &&
            current.distractor_analysis?.[selectedOption] && (
              <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground/90 leading-relaxed">
                <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                  Examiner Trap Breakdown (Option {selectedOption}):
                </span>
                {renderMathContent(current.distractor_analysis[selectedOption])}
              </div>
            )}

          {current.explanation && (
            <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed">
              <span className="font-semibold text-foreground block mb-1">
                Solution Derivation:
              </span>
              {renderMathContent(current.explanation)}
            </div>
          )}

          {current.misconception && (
            <div className="text-xs text-muted-foreground border-t border-border pt-3">
              <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                Common Exam-Setter Trap:
              </span>
              {current.misconception}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Dedicated Reading Passage Box
  const renderPassageBox = () => (
    <div className="flex flex-col rounded-xl border border-border bg-card/80 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/80 text-xs">
        <span className="flex items-center gap-1.5 font-semibold font-mono uppercase tracking-wider text-foreground/80">
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          Reading Passage
        </span>
        <span className="font-mono text-[11px] text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">
          {wordCount} words
        </span>
      </div>

      <div className="p-5 sm:p-6 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-240px)] space-y-4 text-foreground/90 font-serif leading-[1.8] text-sm sm:text-base selection:bg-primary/20">
        {passageParagraphs.map((para, idx) => (
          <p key={idx} className="indent-4 sm:indent-6">
            {renderMathContent(para)}
          </p>
        ))}
      </div>
    </div>
  );

  // If no passage exists, render the standard single-column layout
  if (!passage) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {renderQuestionStemAndOptions()}
      </div>
    );
  }

  // Passage-based split layout (Desktop dual-pane, Mobile tabbed)
  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden mb-4 flex rounded-lg border border-border bg-muted/30 p-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setMobileTab("passage")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md transition-all",
            mobileTab === "passage"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Passage ({wordCount}w)
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("question")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md transition-all",
            mobileTab === "question"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Question & Options
        </button>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left Column: Passage */}
        <div className="lg:col-span-7 sticky top-4">
          {renderPassageBox()}
        </div>

        {/* Right Column: Question Stem & Options */}
        <div className="lg:col-span-5">
          {renderQuestionStemAndOptions()}
        </div>
      </div>

      {/* Mobile Stacked / Tabbed View */}
      <div className="lg:hidden">
        {mobileTab === "passage" ? (
          <div className="space-y-4">
            {renderPassageBox()}
            <button
              type="button"
              onClick={() => setMobileTab("question")}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow active:scale-[0.99] transition-all"
            >
              Proceed to Question <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setMobileTab("passage")}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Referencing {wordCount}-word passage
              </span>
              <span className="underline">View Passage</span>
            </button>
            {renderQuestionStemAndOptions()}
          </div>
        )}
      </div>
    </div>
  );
}
