// Path: components/quiz-creator/QuizCreator.tsx
"use client";

import { useState, useCallback, memo, useEffect, useRef } from "react";
import { useUser } from "@/hooks/useUser";
import { Quiz } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { LANGUAGES } from "@/lib/constants/languages";
import { QUIZ_CONFIG } from "@/lib/constants/quiz";
import { PromptInput } from "./PromptInput";
import { PDFUploader } from "./PDFUploader";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";

const { DEFAULT_QUESTION_COUNT, DEFAULT_DIFFICULTY } = QUIZ_CONFIG;

const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20];
const QUICK_PRESETS = [
  "Data Sufficiency",
  "Critical Reasoning",
  "Sentence Correction",
  "Arithmetic & Algebra",
  "Reading Comprehension",
];

interface QuizCreatorProps {
  onQuizCreated?: (quiz: Quiz) => void;
}

export const QuizCreator = memo(({ onQuizCreated }: QuizCreatorProps) => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("Auto");
  const [questionCount, setQuestionCount] = useState(DEFAULT_QUESTION_COUNT);
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState<string>("");
  const { user, accessToken, isUserLoading } = useUser();
  const abortRef = useRef<AbortController | null>(null);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    toast.info("Generation cancelled.");
  }, []);

  const handleGenerateQuiz = useCallback(async () => {
    if (!prompt.trim() && !pdfText) {
      return toast.warning("Please enter a topic or attach a PDF");
    }
    if (isUserLoading) return;
    if (!user || !accessToken) {
      return toast.error("Please sign in to generate quizzes");
    }

    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const content = pdfText ? (prompt.trim() ? `${prompt}\n\n${pdfText}` : pdfText) : prompt;
    const toastId = toast.loading("Starting quiz generation...");

    try {
      await fetchEventSource("/api/quiz/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.slice(0, QUIZ_CONFIG.MAX_PROMPT_LENGTH),
          question_count: questionCount,
          difficulty,
          language,
        }),
        signal: controller.signal,
        openWhenHidden: true,
        onmessage(event) {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case "connected":
              toast.loading("Generating test questions...", { id: toastId });
              break;
            case "progress":
              toast.loading(`Drafting question ${data.done} of ${data.total}...`, { id: toastId });
              break;
            case "complete":
              toast.success("Quiz generated successfully!", { id: toastId });
              setIsLoading(false);
              if (onQuizCreated && data.quiz) {
                onQuizCreated(data.quiz);
              }
              router.push(`/quiz/${data.quiz?.slug || data.quiz_id}`);
              break;
            case "partial":
              toast.warning(`Generated ${data.generated} of ${data.requested} questions.`, { id: toastId });
              setIsLoading(false);
              router.push(`/quiz/${data.quiz_id}`);
              break;
            case "error":
              toast.error(data.message, { id: toastId });
              setIsLoading(false);
              break;
          }
        },
        onerror(err) {
          throw err;
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate quiz";
      if (message !== "Aborted") {
        toast.error(message, { id: toastId });
      }
    } finally {
      setIsLoading(false);
      setPdfText("");
      abortRef.current = null;
    }
  }, [prompt, pdfText, user, accessToken, isUserLoading, questionCount, difficulty, language, router, onQuizCreated]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const savedPrompt = localStorage.getItem("quizPrompt");
    const prefillTopic = localStorage.getItem("prefillTopic");

    if (prefillTopic) {
      setPrompt(prefillTopic);
      localStorage.removeItem("prefillTopic");
    } else if (savedPrompt) {
      setPrompt(savedPrompt);
      localStorage.removeItem("quizPrompt");
    }
  }, []);

  return (
    <div className="w-full rounded-xl border border-border/80 bg-card p-5 shadow-2xs space-y-4">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <h2 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Quiz Studio
          </h2>
          <p className="text-xs text-muted-foreground">
            Generate calibrated practice questions from topics or uploaded syllabus notes.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <PDFUploader onUpload={setPdfText} onClear={() => setPdfText("")} disabled={isLoading} />
        </div>
      </div>

      {/* Main Text Prompt */}
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        disabled={isLoading}
        onSubmit={handleGenerateQuiz}
      />

      {/* Quick Topic Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-medium text-muted-foreground/80">Presets:</span>
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setPrompt(preset)}
            disabled={isLoading}
            className="text-[11px] px-2 py-0.5 rounded-md bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/60">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Question Count */}
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-[11px]">Questions:</span>
            <Select
              value={questionCount.toString()}
              onValueChange={(val) => setQuestionCount(Number(val))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-18 text-xs bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_COUNT_OPTIONS.map((count) => (
                  <SelectItem key={count} value={count.toString()} className="text-xs">
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-[11px]">Difficulty:</span>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-24 text-xs bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUIZ_CONFIG.DIFFICULTY_LEVELS.map((level) => (
                  <SelectItem key={level} value={level} className="text-xs">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-[11px]">Language:</span>
            <Select
              value={language}
              onValueChange={setLanguage}
              disabled={isLoading}
            >
              <SelectTrigger className="h-8 w-24 text-xs bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-56">
                {LANGUAGES.map(({ code, name }) => (
                  <SelectItem key={code} value={code} className="text-xs">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isLoading ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="h-9 px-3 text-xs"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={handleGenerateQuiz}
              disabled={isLoading || (!prompt.trim() && !pdfText)}
              className="h-9 px-4 text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Generate Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

QuizCreator.displayName = "QuizCreator";
