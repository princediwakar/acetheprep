"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface SubredditExportButtonProps {
  questionId: string;
  examName: string;
  subject?: string;
  skillDomain: string;
  questionText: string;
  options: Record<string, string>;
  correctOption: string;
  explanation: string;
  distractorTrapText?: string;
  selectedOption?: string | null;
}

export function SubredditExportButton({
  questionId,
  examName,
  subject,
  skillDomain,
  questionText,
  options,
  correctOption,
  explanation,
  distractorTrapText,
  selectedOption,
}: SubredditExportButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateRedditMarkdown = (): string => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

    const questionUrl = `${origin}/q/${questionId}`;
    const headerPrefix = subject ? `${examName} - ${subject}` : examName;

    const formattedOptions = Object.entries(options)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, text]) => `(${letter}) ${text}`)
      .join("\n");

    const promptQuestion = selectedOption && selectedOption !== correctOption
      ? `Can someone explain why Option (${selectedOption}) is wrong here? I keep falling for this trap.`
      : `How would you systematically approach this trap question under test pacing?`;

    const cleanExplanation = explanation
      ? explanation.replace(/\n+/g, " ").slice(0, 220) + (explanation.length > 220 ? "..." : "")
      : "See detailed step-by-step breakdown on AceThePrep.";

    const trapSummary = distractorTrapText
      ? `\n>!**Examiner Trap:** ${distractorTrapText.replace(/\n+/g, " ")}!<`
      : "";

    return `**[${headerPrefix}] ${skillDomain} Trap Analysis**

${promptQuestion}

**Question:**
${questionText}

${formattedOptions}

Vote and inspect live community distractor breakdown on AceThePrep:
${questionUrl}

>!**Correct Answer:** Option ${correctOption} — ${cleanExplanation}!<${trapSummary}
`;
  };

  const copyToClipboard = async () => {
    const markdown = generateRedditMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success("Subreddit-formatted markdown copied with spoiler tags!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy markdown. Please allow clipboard permissions.");
    }
  };

  return (
    <Button
      type="button"
      onClick={copyToClipboard}
      variant="outline"
      size="sm"
      className="text-xs font-medium border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/70 transition-all flex items-center gap-1.5 cursor-pointer"
    >
      <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
      <span>{copied ? "Copied Subreddit Format!" : "Share to Reddit / Discord"}</span>
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3.5 h-3.5 text-orange-400 ml-1" />}
    </Button>
  );
}

