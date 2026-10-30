// components/quiz/QuizCard.tsx
"use client";

import { Quiz } from "@/types/quiz";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { QuizCardInfo } from "./QuizCardInfo";
import { QuizCardActions } from "./QuizCardActions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (quizId: string) => void;
  className?: string;
}

export function QuizCard({ quiz, onDelete, className }: QuizCardProps) {
  const router = useRouter();
  const { user } = useUser();
  const isCreator = user?.id === quiz.creator_id;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNavigate = () => {
    if (!isDeleting) {
      router.push(`/quiz/${quiz.slug || quiz.quiz_id}`);
    }
  };

  if (isDeleted) return null;

  const topic = quiz.topic || quiz.subject;

  return (
    <div
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNavigate();
        }
      }}
      className={cn(
        "group rounded-xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between p-5 text-card-foreground cursor-pointer relative",
        isDeleting && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Top Header: Topic / Question Count on left, Actions Menu on right */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {topic && (
            <span className="text-[11px] font-medium text-foreground/80 bg-muted/80 px-2 py-0.5 rounded-md truncate max-w-[170px]">
              {topic}
            </span>
          )}
          {Boolean(quiz.question_count) && (
            <span className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
              {quiz.question_count} Qs
            </span>
          )}
        </div>

        {/* Action Dropdown Menu */}
        <div onClick={(e) => e.stopPropagation()}>
          <QuizCardActions
            quiz={quiz}
            isCreator={isCreator}
            user={user}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            setIsDeleted={setIsDeleted}
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-2.5">
        <QuizCardInfo
          title={quiz.title}
          creatorName={quiz.creator_name ?? undefined}
          description={quiz.description ?? undefined}
        />
      </div>

      {/* Footer: Difficulty Badge on left, Subtle CTA on right */}
      <div className="flex items-center justify-between pt-2 mt-auto">
        {quiz.difficulty ? (
          <span
            className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wider",
              quiz.difficulty.toLowerCase() === "hard" &&
                "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
              quiz.difficulty.toLowerCase() === "medium" &&
                "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
              quiz.difficulty.toLowerCase() === "easy" &&
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
              !["hard", "medium", "easy"].includes(quiz.difficulty.toLowerCase()) &&
                "bg-muted text-muted-foreground border border-border/40"
            )}
          >
            {quiz.difficulty}
          </span>
        ) : (
          <span />
        )}

        <div className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
          <span>Practice</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
