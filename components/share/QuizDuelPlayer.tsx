// Path: components/share/QuizDuelPlayer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Swords,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  MessageCircle,
  RotateCcw,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { renderMathContent } from "@/lib/quiz-utils";
import { RichContentRenderer } from "@/components/ui/rich-content/RichContentRenderer";

export interface QuizDuelQuestion {
  question_id?: string;
  question_text: string;
  passage?: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  distractor_analysis?: Record<string, string>;
  skill_domain: string;
  difficulty_tier?: number | string;
  misconception?: string | null;
}

interface QuizDuelPlayerProps {
  questions: QuizDuelQuestion[];
  challengerScore: number;
  totalQuestions: number;
  examName: string;
  shareToken?: string;
}

export function QuizDuelPlayer({
  questions,
  challengerScore,
  totalQuestions,
  examName,
  shareToken,
}: QuizDuelPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ?.correct_option;

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

  const shareUrl = shareToken
    ? `${baseUrl}/s/${shareToken}`
    : typeof window !== "undefined"
    ? window.location.href
    : "https://acetheprep.com";

  const handleSelectOption = (letter: string) => {
    if (hasSubmitted) return;
    setSelectedOption(letter);
    setHasSubmitted(true);

    if (letter === currentQ.correct_option) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setUserScore(0);
    setIsCompleted(false);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Can you beat my ${challengerScore}/${totalQuestions} score on this ${examName} quiz? Challenge yourself on AceThePrep: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopyChallenge = async () => {
    try {
      const challengeMsg = `Can you beat my ${challengerScore}/${totalQuestions} score on this ${examName} quiz? Challenge yourself on AceThePrep: ${shareUrl}`;
      await navigator.clipboard.writeText(challengeMsg);
      toast.success("Challenge invite & link copied to clipboard!");
    } catch {
      toast.error("Failed to copy challenge link.");
    }
  };

  // ----- Duel Completed Screen -----
  if (isCompleted) {
    const userPct = Math.round((userScore / questions.length) * 100);
    const challengerPct = Math.round((challengerScore / totalQuestions) * 100);
    const hasWon = userScore > challengerScore;
    const isTie = userScore === challengerScore;

    const getExamSlug = (name?: string): string => {
      const n = (name || "").toLowerCase();
      if (n.includes("sat")) return "sat";
      if (n.includes("gmat")) return "gmat-focus";
      if (n.includes("gre")) return "gre";
      if (n.includes("cfa")) return "cfa-level-1";
      if (n.includes("ielts")) return "ielts-academic";
      if (n.includes("toefl")) return "toefl-ibt";
      return "sat";
    };

    const examSlug = getExamSlug(examName);

    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            {hasWon ? (
              <Trophy className="w-7 h-7 text-amber-400" />
            ) : isTie ? (
              <Sparkles className="w-7 h-7 text-indigo-400" />
            ) : (
              <Swords className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {hasWon
              ? "🏆 You Beat the Challenger!"
              : isTie
              ? "🤝 It's a Tie!"
              : "❌ Challenger Held the Lead"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {hasWon
              ? `You outscored your peer by ${userScore - challengerScore} question${
                  userScore - challengerScore === 1 ? "" : "s"
                } on ${examName}.`
              : isTie
              ? `Both of you scored exactly ${userScore}/${questions.length} on this drill.`
              : `The challenger's score of ${challengerScore}/${totalQuestions} remains the high benchmark.`}
          </p>
        </div>

        {/* Head-to-Head Comparison Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Challenger
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-300">
              {challengerPct}%
            </span>
            <p className="text-xs text-slate-500">
              {challengerScore} / {totalQuestions} correct
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border text-center space-y-1 ${
              hasWon
                ? "bg-emerald-500/10 border-emerald-500/30"
                : isTie
                ? "bg-indigo-500/10 border-indigo-500/30"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
          >
            <span className="text-[11px] uppercase tracking-wider font-semibold block text-slate-400">
              Your Score
            </span>
            <span
              className={`text-2xl sm:text-3xl font-extrabold ${
                hasWon
                  ? "text-emerald-400"
                  : isTie
                  ? "text-indigo-400"
                  : "text-rose-400"
              }`}
            >
              {userPct}%
            </span>
            <p className="text-xs text-slate-500">
              {userScore} / {questions.length} correct
            </p>
          </div>
        </div>

        {/* Action Buttons & Growth CTAs */}
        <div className="space-y-2.5 pt-2">
          <Link
            href={`/setup?exam=${examSlug}`}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-950/40 active:scale-[0.98]"
          >
            <span>Start Free {examName} Prep & Mistake Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={`/practice/${examSlug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-medium text-xs transition-all active:scale-[0.98]"
          >
            <span>Practice Full {examName} Question Bank (No Signup Required) &rarr;</span>
          </Link>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <Button
              variant="outline"
              onClick={shareToWhatsApp}
              className="border-slate-800 hover:bg-slate-800/80 text-slate-300 text-xs h-9 gap-1.5 px-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyChallenge}
              className="border-slate-800 hover:bg-slate-800/80 text-slate-300 text-xs h-9 gap-1.5 px-2"
            >
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate">Copy Invite</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleRestart}
              className="border-slate-800 hover:bg-slate-800/80 text-slate-300 text-xs h-9 gap-1.5 px-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="truncate">Retry Duel</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Top Question Progress Bar */}
      <div className="w-full bg-slate-800/60 h-1">
        <div
          className="bg-indigo-500 h-1 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Clean Duel Header */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Quiz Duel
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span>Target:</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold text-[11px]">
            Beat {challengerScore}/{totalQuestions}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Topic Tag & Selection State */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/80 font-medium text-xs">
            {currentQ.skill_domain}
          </span>
          <span className="text-slate-400 text-xs">
            {hasSubmitted ? "Answer Revealed" : "Select an option below"}
          </span>
        </div>

        {/* Reading Passage (if present) */}
        {currentQ.passage && (
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-56 overflow-y-auto pr-2">
            <RichContentRenderer content={currentQ.passage} />
          </div>
        )}

        {/* Question Text */}
        <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          <RichContentRenderer content={currentQ.question_text} />
        </div>

        {/* Option Selectors */}
        <div className="space-y-3">
          {Object.entries(currentQ.options)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, text]) => {
              const isOptionSelected = selectedOption === letter;
              const isOptionCorrect = letter === currentQ.correct_option;

              let optionStyle =
                "bg-slate-850/50 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white cursor-pointer";

              if (hasSubmitted) {
                if (isOptionCorrect) {
                  optionStyle =
                    "bg-emerald-500/10 border-emerald-500/50 text-emerald-200 ring-1 ring-emerald-500/30";
                } else if (isOptionSelected && !isOptionCorrect) {
                  optionStyle =
                    "bg-rose-500/10 border-rose-500/50 text-rose-200 ring-1 ring-rose-500/30";
                } else {
                  optionStyle =
                    "bg-slate-950/30 border-slate-800/50 text-slate-500 opacity-40 cursor-default";
                }
              }

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleSelectOption(letter)}
                  disabled={hasSubmitted}
                  className={`w-full text-left flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border text-sm transition-all ${optionStyle}`}
                >
                  <span
                    className={`font-mono font-bold text-xs w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      hasSubmitted && isOptionCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : hasSubmitted && isOptionSelected
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 text-xs sm:text-sm leading-relaxed self-center">
                    {renderMathContent(text)}
                  </span>
                  {hasSubmitted && isOptionCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  )}
                  {hasSubmitted && isOptionSelected && !isOptionCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
        </div>

        {/* Post-Answer Socratic Distractor Feedback */}
        {hasSubmitted && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                  : "bg-slate-950/60 border-rose-500/30 text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">
                      Correct! You avoided the trap.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-rose-300">
                      Examiner Trap Triggered
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedOption &&
                currentQ.distractor_analysis?.[selectedOption] ? (
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Trap Breakdown ({selectedOption}):
                    </p>
                    <p>{currentQ.distractor_analysis[selectedOption]}</p>
                  </div>
                ) : (
                  <RichContentRenderer content={currentQ.explanation} />
                )}
              </div>
            </div>

            {/* Next Question / Finish Duel Button - Sole Action in this Question Card */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400 font-medium">
                Score: <strong className="text-white">{userScore}</strong> /{" "}
                {currentIndex + 1}
              </span>

              <Button
                onClick={handleNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm h-10 px-5 gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>
                  {currentIndex + 1 < questions.length
                    ? "Next Question"
                    : "Finish Duel & See Results"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
