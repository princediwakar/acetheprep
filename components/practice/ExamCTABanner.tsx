// Path: components/practice/ExamCTABanner.tsx
"use client";

import { SignInButton } from "@/components/SignInButton";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface ExamCTABannerProps {
  examName: string;
}

export default function ExamCTABanner({ examName }: ExamCTABannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-sm text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5-Minute Baseline Test • 100% Free</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            See where you stand in {examName}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Take a quick 5-question test to find your score leaks and get your baseline score.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
          <SignInButton
            buttonText="Take your first test"
            returnUrl={`/home?autostart=first_test&exam=${encodeURIComponent(examName)}`}
            size="lg"
            className="h-12 px-8 text-sm sm:text-base font-bold shadow-md bg-foreground text-background hover:bg-foreground/90 rounded-xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
