"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { saveQuestionToErrorLogAction } from "@/lib/actions/debate";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface ErrorLogInboundCTAProps {
  questionId: string;
  examName: string;
  skillDomain: string;
  difficultyTier?: number | string;
  isAuthenticated?: boolean;
}

export function ErrorLogInboundCTA({
  questionId,
  examName,
  skillDomain,
  difficultyTier,
  isAuthenticated = false,
}: ErrorLogInboundCTAProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      const returnUrl = typeof window !== "undefined" ? window.location.pathname : `/q/${questionId}`;
      await signInWithGoogle(returnUrl);
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveQuestionToErrorLogAction({
        questionId,
        examName,
        skillDomain,
        difficultyTier,
      });

      if (result.success) {
        setSaved(true);
        toast.success(result.message || "Added to your automated Error Log!");
      } else if (result.unauthenticated) {
        const returnUrl = typeof window !== "undefined" ? window.location.pathname : `/q/${questionId}`;
        await signInWithGoogle(returnUrl);
      } else {
        toast.error(result.error || "Failed to save trap");
      }
    } catch {
      toast.error("Failed to connect to error log service");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/60 p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Retention Core • Zero-Friction Error Log
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            Never miss this {skillDomain} trap again.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            90% of students abandon manual Notion/Excel error logs. Save this trap now and our Leitner active recall engine will auto-schedule it on your morning drill.
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          {saved ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-3 text-xs font-semibold text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Saved in Error Log</span>
            </div>
          ) : (
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4 fill-white/20" />
              <span>{isSaving ? "Saving..." : isAuthenticated ? "Add to My Error Log" : "Save to My Error Log (Free 1-Click)"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-indigo-500/10 flex items-center gap-4 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Zero manual entry</span>
        </span>
        <span>•</span>
        <span>24h / 72h / 7d spaced calibration</span>
        <span>•</span>
        <span>100% Free</span>
      </div>
    </div>
  );
}

