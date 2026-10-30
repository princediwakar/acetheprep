"use client";

import { cn } from "@/lib/utils";

interface CommunityVoteBarProps {
  distribution: Record<string, number>;
  percentages: Record<string, number>;
  totalVotes: number;
  correctOption: string;
  userVotedOption: string | null;
  distractorOption?: string | null;
}

export function CommunityVoteBar({
  distribution,
  percentages,
  totalVotes,
  correctOption,
  userVotedOption,
  distractorOption,
}: CommunityVoteBarProps) {
  const options = Object.keys(distribution).sort();

  return (
    <div className="w-full space-y-3 p-4 rounded-xl bg-slate-900/40 border border-border/60">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold text-foreground tracking-wide uppercase">
          Live Peer Distribution
        </span>
        <span className="font-mono">{totalVotes.toLocaleString()} peer votes</span>
      </div>

      <div className="space-y-2">
        {options.map((opt) => {
          const pct = percentages[opt] || 0;
          const isCorrect = opt === correctOption;
          const isUser = opt === userVotedOption;
          const isTrap = opt === distractorOption || (!isCorrect && pct >= 30);

          let barColor = "bg-slate-700/60";
          let textColor = "text-muted-foreground";

          if (isCorrect) {
            barColor = "bg-emerald-500/80";
            textColor = "text-emerald-400 font-semibold";
          } else if (isTrap) {
            barColor = "bg-amber-500/80";
            textColor = "text-amber-400 font-semibold";
          } else if (isUser) {
            barColor = "bg-rose-500/80";
            textColor = "text-rose-400 font-semibold";
          }

          return (
            <div key={opt} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono font-bold px-1.5 py-0.5 rounded text-[11px]",
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : isUser
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    )}
                  >
                    Option {opt}
                  </span>
                  {isCorrect && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">
                      Correct Key
                    </span>
                  )}
                  {isTrap && !isCorrect && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400">
                      Trap Distractor
                    </span>
                  )}
                  {isUser && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300">
                      Your Choice
                    </span>
                  )}
                </div>
                <span className={cn("font-mono text-xs", textColor)}>{pct}%</span>
              </div>

              {/* Progress Track */}
              <div className="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden relative">
                <div
                  className={cn("h-full transition-all duration-500 rounded-full", barColor)}
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

