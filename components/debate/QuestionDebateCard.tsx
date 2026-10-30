"use client";

import { useState, useOptimistic, useTransition } from "react";
import { renderMathContent } from "@/lib/quiz-utils";
import { cn } from "@/lib/utils";
import { CommunityVoteBar } from "./CommunityVoteBar";
import { SubredditExportButton } from "./SubredditExportButton";
import { ErrorLogInboundCTA } from "./ErrorLogInboundCTA";
import {
  recordCommunityVoteAction,
  type CommunityVoteStats,
} from "@/lib/actions/debate";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Share2,
  ArrowRight,
  BookOpen,
  Info,
} from "lucide-react";

interface QuestionDebateCardProps {
  questionId: string;
  examName: string;
  subject?: string;
  skillDomain: string;
  difficultyTier: number;
  questionText: string;
  passage?: string;
  options: Record<string, string>;
  correctOption: string;
  explanation: string;
  distractorAnalysis: Record<string, string>;
  misconception?: string | null;
  initialStats: CommunityVoteStats;
  isAuthenticated?: boolean;
}

export function QuestionDebateCard({
  questionId,
  examName,
  subject,
  skillDomain,
  difficultyTier,
  questionText,
  passage,
  options,
  correctOption,
  explanation,
  distractorAnalysis,
  misconception,
  initialStats,
  isAuthenticated = false,
}: QuestionDebateCardProps) {
  const [isPending, startTransition] = useTransition();
  const [stats, setStats] = useState<CommunityVoteStats>(initialStats);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    initialStats.userVotedOption
  );
  const [hasVoted, setHasVoted] = useState<boolean>(
    Boolean(initialStats.userVotedOption)
  );

  // Optimistic UI for 0ms perceived voting latency
  const [optimisticStats, setOptimisticStats] = useOptimistic(
    stats,
    (current, newChoice: string) => {
      const nextDist = { ...current.distribution };
      nextDist[newChoice] = (nextDist[newChoice] || 0) + 1;
      const nextTotal = current.totalVotes + 1;
      const nextPct: Record<string, number> = {};
      for (const [k, v] of Object.entries(nextDist)) {
        nextPct[k] = Math.round((v / nextTotal) * 100);
      }
      return {
        distribution: nextDist,
        percentages: nextPct,
        totalVotes: nextTotal,
        userVotedOption: newChoice,
      };
    }
  );

  const handleVote = (optionKey: string) => {
    if (hasVoted) return;

    setSelectedOption(optionKey);
    setHasVoted(true);

    startTransition(async () => {
      setOptimisticStats(optionKey);
      const res = await recordCommunityVoteAction({
        questionId,
        selectedOption: optionKey,
      });
      if (res.success) {
        setStats(res.stats);
      }
    });
  };

  const isSelectedCorrect = selectedOption === correctOption;
  const chosenDistractorAnalysis = selectedOption
    ? distractorAnalysis[selectedOption]
    : null;

  return (
    <div className="space-y-6">
      {/* Top Question Meta Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground px-2.5 py-1 rounded-md bg-secondary/80 border border-border">
            {examName}
          </span>
          {subject && (
            <span className="text-muted-foreground px-2 py-0.5 rounded bg-muted/40">
              {subject}
            </span>
          )}
          <span className="text-indigo-400 font-medium px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            {skillDomain}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Level {difficultyTier} Practice
          </span>
          <SubredditExportButton
            questionId={questionId}
            examName={examName}
            subject={subject}
            skillDomain={skillDomain}
            questionText={questionText}
            options={options}
            correctOption={correctOption}
            explanation={explanation}
            distractorTrapText={
              chosenDistractorAnalysis ||
              Object.values(distractorAnalysis)[0] ||
              ""
            }
            selectedOption={selectedOption}
          />
        </div>
      </div>

      {/* Reading Passage (if applicable) */}
      {passage && (
        <div className="p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Passage Reference</span>
          </div>
          <div className="text-sm leading-relaxed text-slate-300 max-h-60 overflow-y-auto pr-2">
            {renderMathContent(passage)}
          </div>
        </div>
      )}

      {/* Main Question Stem */}
      <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-md space-y-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {hasVoted ? "Debate & Trap Forensics" : "Anonymous Peer Poll: Which choice is correct?"}
          </span>
          <span className="text-[11px] font-mono">
            {hasVoted ? "Cognitive Analysis Below" : "Select an answer to reveal community stats"}
          </span>
        </div>

        <div className="text-base sm:text-lg font-medium leading-relaxed text-foreground">
          {renderMathContent(questionText)}
        </div>

        {/* Option Selectors */}
        <div className="space-y-3">
          {Object.entries(options)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, text]) => {
              const isOptionSelected = selectedOption === letter;
              const isOptionCorrect = letter === correctOption;

              let style =
                "border-border/80 bg-secondary/30 hover:bg-secondary/70 hover:border-indigo-500/50 text-foreground cursor-pointer";

              if (hasVoted) {
                if (isOptionCorrect) {
                  style =
                    "border-emerald-500/80 bg-emerald-500/10 text-emerald-200 shadow-sm shadow-emerald-500/10";
                } else if (isOptionSelected && !isOptionCorrect) {
                  style =
                    "border-rose-500/80 bg-rose-500/10 text-rose-200 shadow-sm shadow-rose-500/10";
                } else {
                  style =
                    "border-border/40 bg-card/40 text-muted-foreground opacity-60";
                }
              }

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleVote(letter)}
                  disabled={hasVoted}
                  className={cn(
                    "w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 group",
                    style
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "h-6 w-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border transition-all",
                        hasVoted && isOptionCorrect
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : hasVoted && isOptionSelected
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-slate-800 text-slate-300 border-slate-700 group-hover:border-indigo-500/60"
                      )}
                    >
                      {letter}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">
                      {renderMathContent(text)}
                    </span>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {hasVoted && isOptionCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    {hasVoted && isOptionSelected && !isOptionCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* Post-Vote Reveal: Live Distribution & Socratic Distractor Analysis */}
      {hasVoted && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-3 duration-400">
          {/* Peer Distribution Bar */}
          <CommunityVoteBar
            distribution={optimisticStats.distribution}
            percentages={optimisticStats.percentages}
            totalVotes={optimisticStats.totalVotes}
            correctOption={correctOption}
            userVotedOption={selectedOption}
            distractorOption={
              Object.keys(distractorAnalysis).find(
                (k) => k !== correctOption && (distractorAnalysis[k]?.length || 0) > 0
              ) || null
            }
          />

          {/* Socratic Distractor Breakdown Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              {isSelectedCorrect ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-foreground">
                    Conquered! Mastered Core Mechanism
                  </h3>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-base text-foreground">
                    Why Option ({selectedOption}) is Incorrect
                  </h3>
                </>
              )}
            </div>

            {/* If wrong choice was selected: explain the specific trap */}
            {!isSelectedCorrect && chosenDistractorAnalysis && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-foreground leading-relaxed space-y-1">
                <span className="font-bold text-rose-400 block uppercase tracking-wider text-[11px]">
                  Why ({selectedOption}) is attractive but incorrect:
                </span>
                <div>{renderMathContent(chosenDistractorAnalysis)}</div>
              </div>
            )}

            {/* Cognitive Misconception Tag */}
            {misconception && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-foreground flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-amber-300 block">
                    Common Misconception:
                  </span>
                  <p className="text-slate-300">{misconception}</p>
                </div>
              </div>
            )}

            {/* Full Step-by-Step Proof / Explanation */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Step-by-Step Mathematical & Logical Solution:
              </span>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-950/40 p-4 rounded-xl border border-border/40">
                {renderMathContent(explanation)}
              </div>
            </div>
          </div>

          {/* Retention Conversion Engine Hook */}
          <ErrorLogInboundCTA
            questionId={questionId}
            examName={examName}
            skillDomain={skillDomain}
            difficultyTier={difficultyTier}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </div>
  );
}

