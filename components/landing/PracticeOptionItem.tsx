// Path: components/landing/PracticeOptionItem.tsx
"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

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
    "border-border/90 bg-card/70 hover:bg-secondary/50 hover:border-foreground/40 dark:bg-card/40 dark:hover:bg-muted/30";

  if (isSelected && !isRevealed) {
    borderClasses =
      "border-foreground bg-secondary/80 ring-1 ring-foreground/20";
  }

  if (isRevealed) {
    if (isSelected && isCorrect) {
      borderClasses =
        "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 dark:border-emerald-500 ring-1 ring-emerald-600";
    } else if (isSelected && !isCorrect) {
      borderClasses =
        "border-rose-500/80 bg-rose-50/50 dark:bg-rose-950/30 dark:border-rose-500/80 ring-1 ring-rose-500/60";
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
        if (e.key === "Enter" || e.key === " " || e.key.toUpperCase() === letter) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 sm:px-4 sm:py-4 transition-all text-left relative overflow-hidden select-none shadow-2xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
        !isRevealed && "cursor-pointer active:scale-[0.995]",
        isRevealed && "cursor-default",
        borderClasses,
        isStruck && "opacity-40 bg-secondary/30",
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold font-mono border transition-colors",
            isSelected && !isRevealed
              ? "border-foreground bg-foreground text-background"
              : isRevealed && isSelected && isCorrect
                ? "border-emerald-600 bg-emerald-600 text-white font-bold"
                : isRevealed && isSelected && !isCorrect
                  ? "border-rose-600 bg-rose-600 text-white font-bold"
                  : isRevealed && isCorrect
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold"
                    : "border-border/80 bg-muted/40 text-foreground/80 group-hover:border-foreground/60 group-hover:text-foreground",
          )}
        >
          {letter}
        </span>

        <span
          className={cn(
            "text-sm font-medium text-foreground leading-snug transition-all",
            isStruck && "line-through decoration-rose-500 decoration-2 text-muted-foreground",
          )}
        >
          {text}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {!isRevealed && (
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-muted-foreground/40 border border-border/60 rounded px-1.5 py-0.5 group-hover:text-muted-foreground transition-colors">
            {letter}
          </kbd>
        )}

        {isStruck && !isRevealed && (
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider">
            [Eliminated]
          </span>
        )}

        {isRevealed && isTrap && (
          <span className="flex items-center gap-1 shrink-0 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
            <AlertCircle className="h-3 w-3" />
            Common Pitfall
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
