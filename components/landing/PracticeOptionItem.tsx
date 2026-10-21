// Path: components/landing/PracticeOptionItem.tsx
"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, TrendingUp } from "lucide-react";

interface PracticeOptionItemProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isStruck: boolean;
  strikethroughMode: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  isTrap: boolean;
  onSelect: () => void;
  onToggleStrike: () => void;
}

export function PracticeOptionItem({
  letter,
  text,
  isSelected,
  isStruck,
  strikethroughMode,
  isRevealed,
  isCorrect,
  isTrap,
  onSelect,
  onToggleStrike,
}: PracticeOptionItemProps) {
  const handleClick = () => {
    if (isRevealed) return;
    if (strikethroughMode) {
      onToggleStrike();
    } else {
      if (isStruck) {
        onToggleStrike();
      }
      onSelect();
    }
  };

  let borderClasses =
    "border-border/80 bg-card hover:border-[#002B49]/40 dark:hover:border-blue-400/40";

  if (isSelected && !isRevealed) {
    borderClasses =
      "border-[#002B49] bg-blue-50/40 dark:bg-blue-950/30 dark:border-blue-400 ring-1 ring-[#002B49] dark:ring-blue-400";
  }

  if (isRevealed) {
    if (isSelected && isCorrect) {
      borderClasses =
        "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 dark:border-emerald-500 ring-1 ring-emerald-600";
    } else if (isSelected && !isCorrect) {
      borderClasses =
        "border-rose-600 bg-rose-50/60 dark:bg-rose-950/30 dark:border-rose-500 ring-1 ring-rose-600";
    } else if (isCorrect) {
      borderClasses =
        "border-emerald-600/70 bg-emerald-50/30 dark:bg-emerald-950/20";
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl border p-3 sm:px-4 sm:py-3.5 transition-all text-left relative overflow-hidden select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        !isRevealed && "cursor-pointer active:scale-[0.995]",
        isRevealed && "cursor-default",
        borderClasses,
        isStruck && "opacity-50 bg-secondary/40",
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold font-mono border transition-colors",
            isSelected && !isRevealed
              ? "border-[#002B49] bg-[#002B49] text-white dark:border-blue-400 dark:bg-blue-500"
              : isRevealed && isSelected && isCorrect
                ? "border-emerald-600 bg-emerald-600 text-white"
                : isRevealed && isSelected && !isCorrect
                  ? "border-rose-600 bg-rose-600 text-white"
                  : isRevealed && isCorrect
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold"
                    : "border-border text-foreground/80 group-hover:border-primary group-hover:text-primary",
          )}
        >
          {letter}
        </span>

        <span
          className={cn(
            "text-sm font-medium text-foreground leading-snug transition-all",
            isStruck && "line-through decoration-rose-600 decoration-2 text-muted-foreground",
          )}
        >
          {text}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isStruck && !isRevealed && (
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider">
            [Eliminated]
          </span>
        )}

        {isRevealed && isTrap && (
          <span className="flex items-center gap-1 shrink-0 rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wide">
            <TrendingUp className="h-3 w-3" />
            Distractor Trap
          </span>
        )}

        {isRevealed && isCorrect && (
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        )}
      </div>
    </div>
  );
}

// Backward compatibility alias
export const BluebookOption = PracticeOptionItem;
