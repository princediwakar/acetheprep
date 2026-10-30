import { memo } from "react";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  onSubmit?: () => void;
}

export const PromptInput = memo(({ value, onChange, disabled, onSubmit }: PromptInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!disabled && onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <Textarea
      id="prompt"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Enter any topic, paste notes, or describe practice goals (e.g. 'GMAT Sentence Correction - Modifier Traps')..."
      disabled={disabled}
      rows={3}
      className="w-full resize-none text-sm bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-primary shadow-none"
    />
  );
});
PromptInput.displayName = "PromptInput";
