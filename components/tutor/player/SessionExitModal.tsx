// Path: components/tutor/player/SessionExitModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SessionExitModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  answeredCount: number;
  total: number;
  isDiscarding: boolean;
  onFinishEarly: () => void;
  onDiscard: () => void;
}

export function SessionExitModal({
  isOpen,
  onOpenChange,
  answeredCount,
  total,
  isDiscarding,
  onFinishEarly,
  onDiscard,
}: SessionExitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave Practice Session?</DialogTitle>
          <DialogDescription>
            {answeredCount > 0
              ? `You've answered ${answeredCount} of ${total} questions. You can submit now to record your mastery, or discard this session.`
              : "You haven't answered any questions yet. Exiting will discard this session."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 pt-2">
          {answeredCount > 0 && (
            <Button type="button" className="w-full" onClick={onFinishEarly}>
              Submit & Review ({answeredCount} answered)
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            disabled={isDiscarding}
            className="w-full text-destructive hover:bg-destructive/10"
            onClick={onDiscard}
          >
            {isDiscarding ? "Discarding..." : "Discard & Exit"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Keep Practicing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
