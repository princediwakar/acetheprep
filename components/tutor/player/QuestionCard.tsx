// Path: components/tutor/player/QuestionCard.tsx
"use client";

import { useState } from "react";
import { renderMathContent, extractPassageContent } from "@/lib/quiz-utils";
import { RichContentRenderer } from "@/components/ui/rich-content/RichContentRenderer";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Eye,
  EyeOff,
  PenTool,
  Sparkles,
  Send,
  Loader2,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

interface WritingEvaluationData {
  exam: "IELTS" | "TOEFL";
  overallBand?: number;
  scaledScore?: number;
  taskAchievementBand?: number;
  coherenceCohesionBand?: number;
  lexicalResourceBand?: number;
  grammaticalAccuracyBand?: number;
  developmentScore?: number;
  organizationScore?: number;
  languageUseScore?: number;
  wordCount: number;
  wordCountPenalty?: boolean;
  strengths: string[];
  criticalShortfalls: string[];
  detailedFeedback: string;
  sentenceCorrections: Array<{
    original: string;
    improved: string;
    rationale: string;
  }>;
}

interface QuestionCardProps {
  current: SessionQuestion;
  mode: "tutor" | "exam";
  selectedOption: SelectedOption | null;
  answerState: "pending" | "answered";
  isCorrect: boolean | null;
  onOptionClick: (option: SelectedOption) => void;
  onTextSubmit?: (text: string, isCorrectText?: boolean) => void;
  examName?: string;
}

export function QuestionCard({
  current,
  mode,
  selectedOption,
  answerState,
  isCorrect,
  onOptionClick,
  onTextSubmit,
  examName,
}: QuestionCardProps) {
  const { passage, prompt, isAudioTranscript } = extractPassageContent(current.question_text, current.passage);
  const isAudio = Boolean(isAudioTranscript || current.subject === "Listening" || current.skill_domain?.toLowerCase().includes("listening"));

  // Check if current question is a subjective Writing task
  const isWritingTask = Boolean(
    current.subject === "Writing" ||
    current.skill_domain?.toLowerCase().includes("writing") ||
    current.skill_domain?.toLowerCase().includes("task 1") ||
    current.skill_domain?.toLowerCase().includes("task 2") ||
    current.skill_domain?.toLowerCase().includes("academic discussion") ||
    current.skill_domain?.toLowerCase().includes("integrated writing")
  );

  // Sync state without useEffect
  const [prevQuestionId, setPrevQuestionId] = useState(current.question_id);
  const [mobileTab, setMobileTab] = useState<"passage" | "question">("passage");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Free-text and AI evaluation state
  const [essayText, setEssayText] = useState("");
  const [shortAnswerText, setShortAnswerText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [writingEvaluation, setWritingEvaluation] = useState<WritingEvaluationData | null>(null);
  const [semanticFeedback, setSemanticFeedback] = useState<string | null>(null);

  if (current.question_id !== prevQuestionId) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPrevQuestionId(current.question_id);
    setMobileTab("passage");
    setIsPlayingAudio(false);
    setShowTranscript(false);
    setEssayText("");
    setShortAnswerText("");
    setIsEvaluating(false);
    setWritingEvaluation(null);
    setSemanticFeedback(null);
  }

  const togglePlayAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !passage) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeech = passage
      .replace(/TUTOR:/gi, "Tutor. ")
      .replace(/PROFESSOR:/gi, "Professor. ")
      .replace(/STUDENT:/gi, "Student. ")
      .replace(/TOUR GUIDE:/gi, "Tour guide. ")
      .replace(/LIBRARIAN:/gi, "Librarian. ")
      .replace(/Audio Transcript Excerpt:\s*/gi, "");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = audioSpeed;

    const voices = window.speechSynthesis.getVoices();
    const isUK = /ielts/i.test(current.skill_domain || "") || (current.explanation && /ielts/i.test(current.explanation));
    const targetLang = isUK ? "en-GB" : "en-US";
    const preferredVoice = voices.find((v) => v.lang.startsWith(targetLang)) || voices.find((v) => v.lang.startsWith("en"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const optionEntries = OPTION_LETTERS.filter((key) => key in current.options).map((key) => ({
    key,
    value: current.options[key],
  }));

  const wordCount = passage ? passage.split(/\s+/).filter(Boolean).length : 0;
  const passageParagraphs = passage ? passage.split(/\n\n+/).filter(Boolean) : [];

  const targetWordCount = current.skill_domain?.toLowerCase().includes("task 2")
    ? 250
    : current.skill_domain?.toLowerCase().includes("discussion")
      ? 100
      : 150;

  const currentEssayWords = essayText.trim().split(/\s+/).filter(Boolean).length;
  const isIeltsExam = Boolean(
    (examName && /ielts/i.test(examName)) || /ielts/i.test(current.skill_domain)
  );

  const handleWritingSubmit = async () => {
    if (!essayText.trim() || isEvaluating) return;
    setIsEvaluating(true);
    try {
      const taskType = isIeltsExam
        ? (current.skill_domain.toLowerCase().includes("task 1") ? "task_1" : "task_2")
        : (current.skill_domain.toLowerCase().includes("integrated") ? "integrated" : "academic_discussion");

      const res = await fetch("/api/tutor/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: isIeltsExam ? "IELTS" : "TOEFL",
          taskType,
          taskPrompt: prompt,
          studentText: essayText,
          supplementalContext: passage,
          questionId: current.question_id,
        }),
      });

      const data = await res.json();
      if (data.evaluation) {
        setWritingEvaluation(data.evaluation);
        const passed = isIeltsExam
          ? (data.evaluation.overallBand >= 6.0)
          : (data.evaluation.scaledScore >= 20);
        if (onTextSubmit) {
          onTextSubmit(essayText, passed);
        } else {
          onOptionClick("A" as SelectedOption);
        }
      }
    } catch (err) {
      console.error("[QuestionCard] Essay evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleShortAnswerSubmit = async () => {
    if (!shortAnswerText.trim() || isEvaluating) return;

    // Fast-path 0ms evaluation for numeric grid-in and exact matches
    const studentClean = shortAnswerText.trim().toLowerCase();
    const canonicalClean = (current.correct_option || "").trim().toLowerCase();

    const parseNumOrFraction = (str: string): number | null => {
      if (/^-?\d+(?:\.\d+)?$/.test(str)) return parseFloat(str);
      const frac = str.match(/^(-?\d+)\/(\d+)$/);
      if (frac) {
        const num = parseFloat(frac[1]);
        const den = parseFloat(frac[2]);
        return den !== 0 ? num / den : null;
      }
      return null;
    };

    const sNum = parseNumOrFraction(studentClean);
    const cNum = parseNumOrFraction(canonicalClean);
    if (studentClean === canonicalClean || (sNum !== null && cNum !== null && Math.abs(sNum - cNum) < 1e-6)) {
      setSemanticFeedback("Exact match: Correct.");
      if (onTextSubmit) {
        onTextSubmit(shortAnswerText, true);
      } else {
        onOptionClick(current.correct_option as SelectedOption);
      }
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await fetch("/api/tutor/evaluate-semantic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionStem: prompt,
          canonicalAnswer: current.correct_option,
          studentAnswer: shortAnswerText,
          passageSnippet: passage,
        }),
      });

      const data = await res.json();
      const isCorrectAnswer = data.evaluation?.isCorrect ?? false;
      setSemanticFeedback(data.evaluation?.feedback || (isCorrectAnswer ? "Correct match." : "Incorrect."));
      if (onTextSubmit) {
        onTextSubmit(shortAnswerText, isCorrectAnswer);
      } else {
        onOptionClick((isCorrectAnswer ? current.correct_option : "B") as SelectedOption);
      }
    } catch (err) {
      console.error("[QuestionCard] Semantic evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Question stem & interactive options block
  const renderQuestionStemAndOptions = () => (
    <div className="space-y-6">
      {/* Header: Domain & Difficulty */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border/80 pb-2.5">
          <span className="font-semibold text-foreground/80 tracking-wide flex items-center gap-1.5">
            {isWritingTask && <PenTool className="h-3.5 w-3.5 text-primary" />}
            {current.skill_domain || "Problem Solving"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/70 border border-border px-2 py-0.5 rounded">
            Tier {current.difficulty_tier || 2}
          </span>
        </div>

        <div className="font-heading text-lg sm:text-xl font-normal leading-relaxed text-foreground tracking-normal">
          <RichContentRenderer content={prompt} />
        </div>
      </div>

      {/* Case 1: Writing Task (Authentic Essay Editor + AI Assessment) */}
      {isWritingTask ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Word Count Telemetry:</span>
            <span
              className={cn(
                "px-2.5 py-1 rounded-md font-semibold text-xs border transition-colors",
                currentEssayWords >= targetWordCount
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
              )}
            >
              {currentEssayWords} / {targetWordCount} min words
              {currentEssayWords < targetWordCount && " (Penalty applies)"}
            </span>
          </div>

          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            disabled={answerState === "answered" || isEvaluating}
            placeholder="Type your academic response here..."
            className="w-full min-h-[220px] p-4 rounded-xl border border-border bg-card font-sans text-sm sm:text-base leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-primary/40 resize-y disabled:opacity-80"
          />

          {answerState !== "answered" && (
            <button
              type="button"
              onClick={handleWritingSubmit}
              disabled={isEvaluating || currentEssayWords < 15}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Examiner Analyzing Rubrics & Syntax...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Submit Essay for AI Examination
                </>
              )}
            </button>
          )}

          {/* AI Writing Evaluation Score Card */}
          {writingEvaluation && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {isIeltsExam ? "Official Cambridge IELTS Band" : "Official ETS TOEFL Scaled Score"}
                  </div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    {isIeltsExam
                      ? `Band ${writingEvaluation.overallBand ?? "6.5"}`
                      : `${writingEvaluation.scaledScore ?? 23} / 30`}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                  {isIeltsExam ? (
                    <>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        TA/TR: {writingEvaluation.taskAchievementBand ?? "6.5"}
                      </span>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        CC: {writingEvaluation.coherenceCohesionBand ?? "6.5"}
                      </span>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        LR: {writingEvaluation.lexicalResourceBand ?? "6.5"}
                      </span>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        GRA: {writingEvaluation.grammaticalAccuracyBand ?? "6.5"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        Dev: {writingEvaluation.developmentScore ?? "3.5"}/5
                      </span>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        Org: {writingEvaluation.organizationScore ?? "3.5"}/5
                      </span>
                      <span className="px-2 py-1 rounded bg-background border border-border">
                        Lang: {writingEvaluation.languageUseScore ?? "3.5"}/5
                      </span>
                    </>
                  )}
                </div>
              </div>

              {writingEvaluation.detailedFeedback && (
                <div className="p-3.5 rounded-lg bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-foreground block mb-1">
                    Senior Examiner Synthesis:
                  </span>
                  {writingEvaluation.detailedFeedback}
                </div>
              )}

              {/* Strengths & Shortfalls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {writingEvaluation.strengths?.length > 0 && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">
                      Demonstrated Strengths:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-foreground/90">
                      {writingEvaluation.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {writingEvaluation.criticalShortfalls?.length > 0 && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                    <span className="font-semibold text-rose-700 dark:text-rose-400 block">
                      Critical Areas for Improvement:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-foreground/90">
                      {writingEvaluation.criticalShortfalls.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sentence Corrections Breakdown */}
              {writingEvaluation.sentenceCorrections?.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-border/70">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Examiner Sentence Corrections & Academic Upgrades
                  </div>
                  <div className="space-y-2.5">
                    {writingEvaluation.sentenceCorrections.map((corr, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-border bg-secondary/20 space-y-1.5 text-xs"
                      >
                        <div className="text-muted-foreground line-through decoration-rose-500/70">
                          &ldquo;{corr.original}&rdquo;
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                          &rarr; &ldquo;{corr.improved}&rdquo;
                        </div>
                        <div className="text-[11px] text-muted-foreground/90 font-mono bg-background/60 p-1.5 rounded border border-border/40">
                          <span className="font-semibold text-foreground/80">Grammar & Lexis:</span>{" "}
                          {corr.rationale}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : optionEntries.length === 0 ? (
        /* Case 2: Open-ended short answer completion (without multiple choice letters) */
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={shortAnswerText}
              onChange={(e) => setShortAnswerText(e.target.value)}
              disabled={answerState === "answered" || isEvaluating}
              placeholder="Enter your exact answer..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              onKeyDown={(e) => {
                if (e.key === "Enter" && shortAnswerText.trim()) {
                  handleShortAnswerSubmit();
                }
              }}
            />
            {answerState !== "answered" && (
              <button
                type="button"
                onClick={handleShortAnswerSubmit}
                disabled={isEvaluating || !shortAnswerText.trim()}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
              >
                {isEvaluating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            )}
          </div>

          {semanticFeedback && (
            <div className="p-3.5 rounded-lg bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed font-mono">
              <span className="font-semibold text-foreground block mb-0.5">Semantic Match Result:</span>
              {semanticFeedback}
            </div>
          )}
        </div>
      ) : (
        /* Case 3: Standard Option Cards (Deterministic A, B, C, D...) */
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
                    : "cursor-default"
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
                            : "border-border text-foreground/80"
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
      )}

      {/* Tutor Mode Examiner Diagnostic Breakdown (Post-Answer) */}
      {mode === "tutor" && answerState === "answered" && (
        <div className="mt-6 rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Correct
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Incorrect (Common Trap)
              </span>
            )}
          </div>

          {selectedOption &&
            selectedOption !== current.correct_option &&
            current.distractor_analysis?.[selectedOption] && (
              <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20 text-xs text-foreground/90 leading-relaxed">
                <span className="font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                  Why Option {selectedOption} is a trap:
                </span>
                {renderMathContent(current.distractor_analysis[selectedOption])}
              </div>
            )}

          {current.explanation && (
            <div className="rounded-lg p-3.5 bg-secondary/40 border border-border/80 text-xs text-foreground/90 leading-relaxed">
              <span className="font-semibold text-foreground block mb-1">
                How to solve this:
              </span>
              <RichContentRenderer content={current.explanation} />
            </div>
          )}

          {current.misconception && (
            <div className="text-xs text-muted-foreground border-t border-border pt-3">
              <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                Common mistake to avoid:
              </span>
              {current.misconception}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Dedicated Reading Passage or Listening Audio Box
  const renderPassageBox = () => {
    if (isAudio) {
      return (
        <div className="flex flex-col rounded-xl border border-border bg-card/80 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/80 text-xs">
            <span className="flex items-center gap-1.5 font-semibold font-mono uppercase tracking-wider text-foreground/80">
              <Headphones className="h-3.5 w-3.5 text-primary animate-pulse" />
              Audio Passage
            </span>
            <span className="font-mono text-[11px] text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">
              {wordCount} words spoken
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Audio Controller Card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                    isPlayingAudio ? "bg-primary text-primary-foreground shadow-md animate-pulse" : "bg-primary/10 text-primary"
                  )}>
                    <Volume2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Listening Section Audio</div>
                    <div className="text-[11px] text-muted-foreground">
                      {isPlayingAudio ? "Playing audio..." : "Click to play audio track"}
                    </div>
                  </div>
                </div>

                {/* Animated soundwave bars when playing */}
                {isPlayingAudio && (
                  <div className="flex items-end gap-1 h-5 px-2">
                    <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_100ms] h-4" />
                    <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_200ms] h-5" />
                    <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_300ms] h-3" />
                    <span className="w-1 bg-primary rounded-full animate-[bounce_0.6s_infinite_150ms] h-4" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs shadow-xs transition-all cursor-pointer",
                    isPlayingAudio
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Pause Audio
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" /> Play Audio Track
                    </>
                  )}
                </button>

                {/* Speed Controls */}
                <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-[11px] font-mono">
                  {[0.9, 1.0, 1.1].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setAudioSpeed(s);
                        if (isPlayingAudio) {
                          togglePlayAudio();
                        }
                      }}
                      className={cn(
                        "px-2 py-1 rounded transition-colors cursor-pointer",
                        audioSpeed === s ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Toggle Transcript */}
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto cursor-pointer"
                >
                  {showTranscript || answerState === "answered" ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" /> Hide Transcript
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" /> Show Transcript
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Transcript Area: Hidden during authentic testing until toggled or answered */}
            {(showTranscript || answerState === "answered") ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono border-b border-border/60 pb-1.5">
                  <span>Spoken Dialogue Transcript</span>
                  {answerState === "answered" && <span className="text-[10px] text-emerald-600 font-semibold">Revealed for Review</span>}
                </div>
                <div className="overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-380px)] space-y-3 text-foreground/90 font-sans leading-relaxed text-sm">
                  {passageParagraphs.map((para, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                      {renderMathContent(para)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-5 border border-dashed border-border/80 text-center space-y-2 bg-secondary/10">
                <Headphones className="h-6 w-6 text-muted-foreground mx-auto" />
                <div className="text-xs font-semibold text-foreground">Acoustic Comprehension Mode Active</div>
                <div className="text-[11px] text-muted-foreground max-w-sm mx-auto">
                  Official listening tests evaluate auditory memory without on-screen text. Listen to the track above, or click &quot;Show Transcript&quot; if audio is unavailable.
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
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
  };

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
          {isAudio ? <Headphones className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
          {isAudio ? "Audio Track" : `Passage (${wordCount}w)`}
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
        {/* Left Column: Passage / Audio Player */}
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
                {isAudio ? <Headphones className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
                {isAudio ? "Listening Track Active" : `Referencing ${wordCount}-word passage`}
              </span>
              <span className="underline">{isAudio ? "Listen" : "View Passage"}</span>
            </button>
            {renderQuestionStemAndOptions()}
          </div>
        )}
      </div>
    </div>
  );
}
