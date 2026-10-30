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
  Share2,
  Copy,
  Check,
  MessageCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { renderMathContent } from "@/lib/quiz-utils";
import { RichContentRenderer } from "@/components/ui/rich-content/RichContentRenderer";
import { cn } from "@/lib/utils";

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
  const [copiedLink, setCopiedLink] = useState(false);

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
      toast.success("Correct! Trap successfully avoided.", {
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      });
    } else {
      toast.error("Examiner Trap Triggered! Review the breakdown below.", {
        icon: <HelpCircle className="w-4 h-4 text-rose-400" />,
      });
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

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      toast.success("Duel challenge link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Can you beat my ${challengerScore}/${totalQuestions} score on this ${examName} quiz? Challenge yourself on AceThePrep: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // ----- Duel Completed Screen -----
  if (isCompleted) {
    const userPct = Math.round((userScore / questions.length) * 100);
    const challengerPct = Math.round((challengerScore / totalQuestions) * 100);
    const hasWon = userScore > challengerScore;
    const isTie = userScore === challengerScore;

    return (
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-400">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            {hasWon ? (
              <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
            ) : isTie ? (
              <Sparkles className="w-7 h-7 text-indigo-400" />
            ) : (
              <Swords className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {hasWon
              ? "🏆 You Beat the Challenger!"
              : isTie
              ? "🤝 It's a Tie!"
              : "❌ Challenger Won This Duel"}
          </h2>
          <p className="text-sm text-slate-400">
            {hasWon
              ? `You outscored your friend by ${userScore - challengerScore} question${
                  userScore - challengerScore === 1 ? "" : "s"
                } on ${examName}.`
              : isTie
              ? `Both of you scored exactly ${userScore}/${questions.length} on this drill.`
              : `The challenger's score of ${challengerScore}/${totalQuestions} remains the high benchmark.`}
          </p>
        </div>

        {/* Head-to-Head Comparison Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Challenger
            </span>
            <span className="text-3xl font-extrabold text-slate-300">
              {challengerPct}%
            </span>
            <p className="text-xs text-slate-400">
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
            <span className="text-xs uppercase tracking-wider font-semibold block text-slate-300">
              Your Score
            </span>
            <span
              className={`text-3xl font-extrabold ${
                hasWon
                  ? "text-emerald-400"
                  : isTie
                  ? "text-indigo-400"
                  : "text-rose-400"
              }`}
            >
              {userPct}%
            </span>
            <p className="text-xs text-slate-400">
              {userScore} / {questions.length} correct
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/setup"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-400 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
          >
            <span>Start Your Free Prep & Mistake Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={shareToWhatsApp}
              className="border-slate-700 hover:bg-slate-800 text-slate-200 text-xs h-10 gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Share on WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleRestart}
              className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs h-10 gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz Duel</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 shadow-xl overflow-hidden space-y-4 mb-8">
      {/* Top Duel Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            Interactive Quiz Duel
          </span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
            Q {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="text-slate-400 text-[11px] font-medium">
          Challenger Benchmark:{" "}
          <strong className="text-white">
            {challengerScore}/{totalQuestions}
          </strong>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Topic Tag */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-indigo-300 border border-slate-700 font-medium">
            {currentQ.skill_domain}
          </span>
          <span className="text-slate-400 text-[11px]">
            {hasSubmitted ? "Answer Revealed" : "Select an option below"}
          </span>
        </div>

        {/* Reading Passage (if present) */}
        {currentQ.passage && (
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-52 overflow-y-auto pr-2">
            <RichContentRenderer content={currentQ.passage} />
          </div>
        )}

        {/* Question Text */}
        <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          <RichContentRenderer content={currentQ.question_text} />
        </div>

        {/* Option Selectors */}
        <div className="space-y-2.5">
          {Object.entries(currentQ.options)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, text]) => {
              const isOptionSelected = selectedOption === letter;
              const isOptionCorrect = letter === currentQ.correct_option;

              let optionStyle =
                "bg-slate-800/40 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-indigo-500/50 cursor-pointer";

              if (hasSubmitted) {
                if (isOptionCorrect) {
                  optionStyle =
                    "bg-emerald-500/15 border-emerald-500/60 text-emerald-200 shadow-sm shadow-emerald-500/10";
                } else if (isOptionSelected && !isOptionCorrect) {
                  optionStyle =
                    "bg-rose-500/15 border-rose-500/60 text-rose-200 shadow-sm shadow-rose-500/10";
                } else {
                  optionStyle =
                    "bg-slate-900/30 border-slate-800 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleSelectOption(letter)}
                  disabled={hasSubmitted}
                  className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border text-sm transition-all ${optionStyle}`}
                >
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${
                      hasSubmitted && isOptionCorrect
                        ? "bg-emerald-500/30 text-emerald-300"
                        : hasSubmitted && isOptionSelected
                        ? "bg-rose-500/30 text-rose-300"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 text-xs sm:text-sm leading-relaxed">
                    {renderMathContent(text)}
                  </span>
                  {hasSubmitted && isOptionCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isOptionSelected && !isOptionCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
        </div>

        {/* Post-Answer Socratic Distractor Feedback */}
        {hasSubmitted && (
          <div className="pt-3 border-t border-slate-700/60 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct! You navigated the examiner trap.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Examiner Trap Triggered</span>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {selectedOption &&
                currentQ.distractor_analysis?.[selectedOption] ? (
                  <p>
                    <strong className="text-rose-300 block uppercase tracking-wider text-[10px] mb-1">
                      Trap Analysis for ({selectedOption}):
                    </strong>
                    {currentQ.distractor_analysis[selectedOption]}
                  </p>
                ) : (
                  <RichContentRenderer content={currentQ.explanation} />
                )}
              </div>
            </div>

            {/* Next Question / Finish Duel Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">
                Score: <strong className="text-white">{userScore}</strong> /{" "}
                {currentIndex + 1}
              </span>

              <Button
                onClick={handleNextQuestion}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs h-10 px-5 gap-2 shadow-md shadow-indigo-950/40"
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

