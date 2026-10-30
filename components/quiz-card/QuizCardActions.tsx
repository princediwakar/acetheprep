// components/quiz/QuizCardActions.tsx
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Quiz, User } from "@/types/quiz";
import { downloadQuiz } from "@/lib/downloadQuiz";
import {
  Pencil,
  Download,
  Share2,
  Check,
  Loader2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

interface QuizCardActionsProps {
  quiz: Quiz;
  isCreator: boolean;
  user: User | null;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
  setIsDeleted: (value: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  onDelete?: (quizId: string) => void;
}

export const QuizCardActions: FC<QuizCardActionsProps> = ({
  quiz,
  isCreator,
  user,
  isDeleting,
  setIsDeleting,
  setIsDeleted,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleDownload = async (format: "pdf" | "excel") => {
    try {
      await downloadQuiz(quiz, format);
      toast.success(`Downloading ${format.toUpperCase()}...`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to download quiz");
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/quiz/${quiz.slug || quiz.quiz_id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Quiz link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = async () => {
    if (!isCreator || !user) return;

    try {
      setIsDeleting(true);
      const response = await fetch("/api/quiz/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quizId: quiz.quiz_id, userId: user.id }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete quiz");
      }

      setIsDeleted(true);
      toast.success("Quiz deleted");

      if (onDelete) await onDelete(quiz.quiz_id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete quiz");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <MoreVertical className="h-3.5 w-3.5" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 text-xs">
          <DropdownMenuItem onClick={handleCopyLink} className="text-xs">
            {copied ? (
              <Check className="mr-2 h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Share2 className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            )}
            {copied ? "Link Copied" : "Copy Link"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleDownload("pdf")} className="text-xs">
            <Download className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Export PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("excel")} className="text-xs">
            <Download className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Export Excel
          </DropdownMenuItem>

          {isCreator && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/edit/${quiz.slug || quiz.quiz_id}`)}
                className="text-xs"
              >
                <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                Edit Quiz
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isDeleting}
                className="text-xs text-rose-500 focus:text-rose-500"
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Delete Practice Set</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to delete &quot;{quiz.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs"
            >
              {isDeleting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
