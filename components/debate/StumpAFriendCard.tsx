// Path: components/debate/StumpAFriendCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Share2, Copy, Check, MessageCircle, Swords } from "lucide-react";

interface StumpAFriendCardProps {
  questionId: string;
  examName: string;
  skillDomain: string;
  difficultyTier: number;
}

export function StumpAFriendCard({
  questionId,
  examName,
  skillDomain,
  difficultyTier,
}: StumpAFriendCardProps) {
  const [copied, setCopied] = useState(false);

  const getChallengeUrl = () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";
    return `${origin}/q/${questionId}?ref=stump`;
  };

  const challengeUrl = getChallengeUrl();

  const shareText = `I just tackled this Level ${difficultyTier} ${examName} question on ${skillDomain}. Can you solve it without falling for the examiner's trap? ${challengeUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setCopied(true);
      toast.success("Challenge link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy challenge link.");
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-card to-background p-5 sm:p-6 shadow-md space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <span>Stump a Study Partner</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Peer Challenge
              </span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Think your friend or study group will fall for this Level {difficultyTier} trap? Send it to them and see.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <Button
          onClick={handleWhatsAppShare}
          className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-10 gap-2 shadow-sm shadow-emerald-900/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Challenge on WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleCopyLink}
          className="w-full sm:w-auto border-border/80 hover:bg-secondary text-xs h-10 gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-muted-foreground" />
              <span>Copy Direct Challenge Link</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

