"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Share2,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { HardestQuestion } from "./ShareResultCard";

interface InteractiveChallengeProps {
  hardestQuestion: HardestQuestion;
  examName: string;
  shareToken?: string;
  peerScore?: number;
  totalQuestions?: number;
}

export function InteractiveChallenge({
  hardestQuestion,
  examName,
  shareToken,
  peerScore,
  totalQuestions,
}: InteractiveChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://www.acetheprep.com";

  const shareUrl = shareToken
    ? `${baseUrl}/s/${shareToken}`
    : typeof window !== "undefined"
      ? window.location.href
      : "https://www.acetheprep.com";

  const isCorrect = selectedOption === hardestQuestion.correct_option;

  const handleSelect = (letter: string) => {
    if (hasSubmitted) return;
    setSelectedOption(letter);
    setHasSubmitted(true);

    if (letter === hardestQuestion.correct_option) {
      toast.success("Brilliant! You conquered the hardest question!", {
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      });
    } else {
      toast.error("Examiner Trap Triggered! Review the breakdown below.", {
        icon: <HelpCircle className="w-4 h-4 text-rose-400" />,
      });
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      toast.success("Challenge link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Can you beat this Tier ${hardestQuestion.difficulty_tier} ${examName} question? I tackled it on AceThePrep: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const copyRedditMarkdown = async () => {
    const formattedOptions = Object.entries(hardestQuestion.options)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, text]) => `(${letter}) ${text}`)
      .join("\n");

    const markdown = `**[${examName} - ${hardestQuestion.skill_domain}] Tier ${hardestQuestion.difficulty_tier} Trap**

Can someone explain why this question triggers such a high error rate?

**Question:**
${hardestQuestion.question_text}

${formattedOptions}

Vote and inspect live community distractor breakdown on AceThePrep:
${shareUrl}

>!**Correct Answer:** Option ${hardestQuestion.correct_option}!<
>!**Examiner Explanation:** ${hardestQuestion.explanation.replace(/\n+/g, " ").slice(0, 200)}...!<`;

    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Reddit markdown copied with spoiler tags!");
    } catch {
      toast.error("Failed to copy markdown");
    }
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Peer Challenge: Can You Solve This?
          </h2>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          Tier {hardestQuestion.difficulty_tier}
        </span>
      </div>

      {/* Question Container */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-slate-700/50 text-indigo-300 border border-slate-600/50">
            {hardestQuestion.skill_domain}
          </span>
          <span>•</span>
          <span>{hasSubmitted ? "Answer Revealed" : "Select an answer below"}</span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-5">
          {hardestQuestion.question_text}
        </p>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {Object.entries(hardestQuestion.options).map(([letter, text]) => {
            const isOptionSelected = selectedOption === letter;
            const isOptionCorrect = letter === hardestQuestion.correct_option;

            let optionStyle =
              "bg-slate-900/60 border-slate-700/70 text-slate-300 hover:bg-slate-700/40 hover:border-indigo-500/50 cursor-pointer";

            if (hasSubmitted) {
              if (isOptionCorrect) {
                optionStyle =
                  "bg-emerald-500/15 border-emerald-500/60 text-emerald-200 shadow-sm shadow-emerald-500/10";
              } else if (isOptionSelected && !isOptionCorrect) {
                optionStyle =
                  "bg-rose-500/15 border-rose-500/60 text-rose-200 shadow-sm shadow-rose-500/10";
              } else {
                optionStyle = "bg-slate-900/30 border-slate-800 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={letter}
                type="button"
                onClick={() => handleSelect(letter)}
                disabled={hasSubmitted}
                className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border text-sm transition-all ${optionStyle}`}
              >
                <span
                  className={`font-bold text-xs px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${hasSubmitted && isOptionCorrect
                      ? "bg-emerald-500/30 text-emerald-300"
                      : hasSubmitted && isOptionSelected
                        ? "bg-rose-500/30 text-rose-300"
                        : "bg-slate-800 text-slate-400"
                    }`}
                >
                  {letter}
                </span>
                <span className="flex-1 text-xs sm:text-sm">{text}</span>
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

        {/* Post-Answer Feedback & Distractor Breakdown */}
        {hasSubmitted && (
          <div className="pt-4 border-t border-slate-700/60 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className={`p-3.5 rounded-xl border ${isCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Mastered! You avoided the examiner's trap.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Distractor Trap Identified</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedOption && hardestQuestion.distractor_analysis?.[selectedOption]
                  ? hardestQuestion.distractor_analysis[selectedOption]
                  : hardestQuestion.explanation}
              </p>
            </div>

            {/* Social Share & Challenge Viral Hook */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Challenge your study group with this question:</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={shareToWhatsApp}
                  className="px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={copyRedditMarkdown}
                  className="px-3 py-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Reddit</span>
                </button>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="px-3 py-2 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 text-slate-300 border border-slate-600/40 text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Immediate CTA to Practice */}
        <div className="mt-5 pt-4 border-t border-slate-700/60">
          <Link
            href="/setup"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20"
          >
            <span>Practice 10 Free Questions for {examName}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

