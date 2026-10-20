// Path: components/tutor/dashboard/LaunchSessionDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Sparkles, Timer, GraduationCap, Lock, Play } from "lucide-react";
import { getQuestionCountOptions, type QuestionCountOption } from "@/lib/constants/exam-blueprints";

export interface SessionConfig {
  title: string;
  subtitle: string;
  intent: "spaced_review" | "custom_mock";
  domain?: string;
  subjectName?: string;
}

export const QUESTION_COUNT_OPTIONS = [
  { count: 10, label: "10 Questions", sublabel: "Quick Practice", proOnly: false },
  { count: 25, label: "25 Questions", sublabel: "Standard Set", proOnly: true },
  { count: 50, label: "50 Questions", sublabel: "Full Mock Test", proOnly: true },
] as const;

interface LaunchSessionDialogProps {
  activeConfig: SessionConfig | null;
  examName: string;
  isPro: boolean;
  isLaunching: boolean;
  launchStep: number;
  modalMode: "exam" | "tutor";
  modalQuestionCount: number;
  onSetModalMode: (mode: "exam" | "tutor") => void;
  onSetModalQuestionCount: (count: number) => void;
  onClose: () => void;
  onConfirmLaunch: () => void;
  onPromptUpgrade: (reason: string) => void;
}

export function LaunchSessionDialog({
  activeConfig,
  examName,
  isPro,
  isLaunching,
  launchStep,
  modalMode,
  modalQuestionCount,
  onSetModalMode,
  onSetModalQuestionCount,
  onClose,
  onConfirmLaunch,
  onPromptUpgrade,
}: LaunchSessionDialogProps) {
  const isTopicPractice = Boolean(activeConfig?.domain);
  const options = getQuestionCountOptions(examName, isTopicPractice);
  const selectedPreset =
    options.find((preset) => preset.count === modalQuestionCount) || options[0];
  const effectiveCount = selectedPreset.count;

  return (
    <Dialog open={Boolean(activeConfig)} onOpenChange={(open) => !isLaunching && !open && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0 border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="p-6 pb-4 border-b bg-muted/20 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold text-primary border-primary/30 bg-primary/10">
              {examName}
            </Badge>
            {activeConfig?.subjectName && (
              <Badge variant="secondary" className="text-xs font-medium">
                {activeConfig.subjectName}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {activeConfig?.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {activeConfig?.subtitle}
          </DialogDescription>
        </div>

        {isLaunching ? (
          <div className="p-8 py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in-50 duration-300">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 max-w-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold text-primary border-primary/30 bg-primary/10">
                  {examName}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {modalMode === "exam" ? "Test Mode" : "Study Mode"}
                </Badge>
              </div>
              <h3 className="font-extrabold text-xl text-foreground">
                Preparing {activeConfig?.title}
              </h3>
              <p className="text-sm text-muted-foreground min-h-[44px] flex items-center justify-center transition-all leading-relaxed">
                {launchStep === 0 && "🧠 Checking topics you need to practice most..."}
                {launchStep === 1 && `🎯 Selecting ${effectiveCount} practice questions for ${examName}...`}
                {launchStep === 2 && "💡 Loading step-by-step solutions and explanations..."}
                {launchStep >= 3 && "⚡ Ready! Setting up your test screen..."}
              </p>
            </div>
            <div className="w-full max-w-xs bg-muted/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(96, (launchStep + 1) * 25 + 5)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground/80 font-mono">
              {effectiveCount} Questions · Getting your session ready
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-6">
              {/* Section 1: Number of Questions */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Number of Questions
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    ~{selectedPreset.estimatedMinutes} mins
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {options.map((preset) => {
                    const isSelected = effectiveCount === preset.count;
                    const isLocked = Boolean(preset.proOnly && !isPro);
                    return (
                      <button
                        key={preset.count}
                        type="button"
                        disabled={isLaunching}
                        onClick={() => {
                          if (isLocked) {
                            onPromptUpgrade(`Extended ${preset.label} sessions are exclusive to AceThePrep Pro.`);
                            return;
                          }
                          onSetModalQuestionCount(preset.count);
                        }}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 relative cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground font-semibold shadow-sm"
                            : "border-border hover:border-border/80 bg-background/50 text-muted-foreground",
                          isLocked && "opacity-85 hover:border-primary/50",
                        )}
                      >
                        {isLocked && (
                          <Badge className="absolute -top-2 right-2 text-[9px] uppercase font-bold px-1.5 h-4 bg-primary text-primary-foreground">
                            Pro
                          </Badge>
                        )}
                        <span className="text-sm flex items-center gap-1 font-semibold text-foreground">
                          {isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                          {preset.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-normal">
                          {preset.sublabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Feedback Mode Selection */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Feedback Mode
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isLaunching}
                    onClick={() => onSetModalMode("exam")}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative cursor-pointer",
                      modalMode === "exam"
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground shadow-sm"
                        : "border-border hover:border-border/80 bg-background/50 text-muted-foreground",
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Timer className={cn("w-4 h-4", modalMode === "exam" ? "text-primary" : "text-muted-foreground")} />
                          <span className="font-bold text-sm text-foreground">Test Mode</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/30 bg-primary/10 h-4 px-1.5">
                          Timed
                        </Badge>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Real test conditions. Timed questions with all answers, solutions, and explanations revealed at the end.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={isLaunching}
                    onClick={() => onSetModalMode("tutor")}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative cursor-pointer",
                      modalMode === "tutor"
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 text-foreground shadow-sm"
                        : "border-border hover:border-border/80 bg-background/50 text-muted-foreground",
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className={cn("w-4 h-4", modalMode === "tutor" ? "text-primary" : "text-muted-foreground")} />
                          <span className="font-bold text-sm text-foreground">Study Mode</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-medium text-muted-foreground border-border h-4 px-1.5">
                          Instant Feedback
                        </Badge>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Learn as you go. See step-by-step explanations, answers, and common mistakes immediately after each question.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 pt-3 bg-muted/20 border-t flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                disabled={isLaunching}
                onClick={onClose}
                className="text-muted-foreground cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="lg"
                disabled={isLaunching}
                onClick={() => {
                  if (modalQuestionCount !== effectiveCount) {
                    onSetModalQuestionCount(effectiveCount);
                  }
                  onConfirmLaunch();
                }}
                className="font-semibold px-6 min-w-[210px] cursor-pointer"
              >
                <Play className="w-4 h-4 mr-2" />
                {modalMode === "exam"
                  ? selectedPreset.isFullMock
                    ? `Start Full Mock Test (${effectiveCount}Q)`
                    : `Start Test (${effectiveCount}Q)`
                  : `Start Study Session (${effectiveCount}Q)`}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
