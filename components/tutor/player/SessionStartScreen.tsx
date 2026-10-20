// Path: components/tutor/player/SessionStartScreen.tsx
"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, Play } from "lucide-react";

interface SessionStartScreenProps {
  examName?: string;
  questionCount: number;
  estimatedMinutes: number;
  skillDomain?: string;
  mode: "tutor" | "exam";
  onStart: () => void;
  onDiscard: () => void;
  isDiscarding: boolean;
}

export function SessionStartScreen({
  examName,
  questionCount,
  estimatedMinutes,
  skillDomain = "General",
  mode,
  onStart,
  onDiscard,
  isDiscarding,
}: SessionStartScreenProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background p-4 select-none">
      <div className="max-w-md w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl text-center space-y-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCap className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {examName || "Standardized"} Practice Session
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {questionCount} Questions &middot; ~{estimatedMinutes} mins target
          </p>
        </div>

        <div className="rounded-xl border border-border bg-secondary/40 p-4 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Topic:</span>
            <span className="font-semibold text-foreground">{skillDomain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format:</span>
            <span className="font-semibold text-foreground">
              {mode === "exam" ? "Test Mode (Timed)" : "Study Mode (Instant Feedback)"}
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <Button
            size="lg"
            onClick={onStart}
            className="w-full h-12 text-sm font-semibold shadow-md active:scale-[0.99] cursor-pointer"
          >
            <Play className="mr-2 h-4 w-4 fill-current" />
            Begin {mode === "exam" ? "Test" : "Study Session"}
          </Button>

          <button
            type="button"
            onClick={onDiscard}
            disabled={isDiscarding}
            className="text-xs text-muted-foreground hover:text-destructive underline cursor-pointer"
          >
            {isDiscarding ? "Discarding..." : "Exit to Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
