// Path: components/seo/DirectAnswerCard.tsx

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

interface KeyFact {
  label: string;
  value: string;
  subtext?: string;
}

interface DirectAnswerCardProps {
  title: string;
  badge?: string;
  summary: string;
  facts: KeyFact[];
  formulaOrRule?: string;
}

export function DirectAnswerCard({
  title,
  badge = "Direct Answer & Key Takeaways",
  summary,
  facts,
  formulaOrRule,
}: DirectAnswerCardProps) {
  return (
    <aside
      aria-label="Key Takeaways and Direct Answer"
      className="mb-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-background to-primary/[0.02] p-5 sm:p-6 shadow-xs"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {badge}
        </span>
        <span className="text-[11px] text-muted-foreground font-mono">
          Verified for 2026 Admissions
        </span>
      </div>

      <h2 className="text-base sm:text-lg font-bold text-foreground mb-2">
        {title}
      </h2>

      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed mb-4">
        {summary}
      </p>

      {formulaOrRule && (
        <div className="mb-4 rounded-xl border border-border/80 bg-muted/60 p-3 font-mono text-xs text-foreground flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
              Official Scoring Rule / Formula:
            </span>
            <span className="font-semibold text-primary">{formulaOrRule}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/60">
        {facts.map((fact, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground block">
              {fact.label}
            </span>
            <div className="text-sm font-bold text-foreground font-mono">
              {fact.value}
            </div>
            {fact.subtext && (
              <span className="text-[10px] text-muted-foreground/80 block">
                {fact.subtext}
              </span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
