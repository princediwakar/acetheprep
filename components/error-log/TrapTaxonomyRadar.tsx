"use client";

import { useMemo } from "react";
import { AlertCircle, Target, ShieldAlert, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrapTaxonomyCount {
  constraintNeglect: number;
  scopeCreep: number;
  extremeLanguage: number;
  formulaReversal: number;
}

interface TrapTaxonomyRadarProps {
  counts?: Partial<TrapTaxonomyCount>;
  rawMisconceptions?: string[];
  className?: string;
}

export function classifyMisconception(text: string): keyof TrapTaxonomyCount {
  const lower = text.toLowerCase();
  if (
    lower.includes("constraint") ||
    lower.includes("integer") ||
    lower.includes("negative") ||
    lower.includes("zero") ||
    lower.includes("fraction") ||
    lower.includes("positive") ||
    lower.includes("boundary")
  ) {
    return "constraintNeglect";
  }
  if (
    lower.includes("scope") ||
    lower.includes("passage") ||
    lower.includes("extrapolat") ||
    lower.includes("unsupported") ||
    lower.includes("real world") ||
    lower.includes("assumption")
  ) {
    return "scopeCreep";
  }
  if (
    lower.includes("extreme") ||
    lower.includes("always") ||
    lower.includes("never") ||
    lower.includes("must") ||
    lower.includes("absolute") ||
    lower.includes("modifier")
  ) {
    return "extremeLanguage";
  }
  return "formulaReversal";
}

const TAXONOMY_METADATA: Record<
  keyof TrapTaxonomyCount,
  {
    name: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: typeof AlertCircle;
  }
> = {
  constraintNeglect: {
    name: "Overlooking Constraints",
    description: "Missing hidden constraints like negative numbers, fractions, or zero.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    icon: ShieldAlert,
  },
  scopeCreep: {
    name: "Unstated Assumptions",
    description: "Choosing options that sound plausible in reality but are unstated by the text.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Target,
  },
  extremeLanguage: {
    name: "Absolute Modifiers",
    description: "Falling for rigid qualifiers like 'always', 'never', 'uniquely', or 'all'.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    icon: AlertCircle,
  },
  formulaReversal: {
    name: "Formula & Calculation Slips",
    description: "Sign flips, inverted fractions, or quick arithmetic oversights.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: Zap,
  },
};

export function TrapTaxonomyRadar({
  counts,
  rawMisconceptions = [],
  className,
}: TrapTaxonomyRadarProps) {
  const resolvedCounts = useMemo<TrapTaxonomyCount>(() => {
    if (counts && Object.keys(counts).length > 0) {
      return {
        constraintNeglect: counts.constraintNeglect || 0,
        scopeCreep: counts.scopeCreep || 0,
        extremeLanguage: counts.extremeLanguage || 0,
        formulaReversal: counts.formulaReversal || 0,
      };
    }

    const aggregated: TrapTaxonomyCount = {
      constraintNeglect: 0,
      scopeCreep: 0,
      extremeLanguage: 0,
      formulaReversal: 0,
    };

    if (rawMisconceptions.length === 0) {
      // Baseline sample representation if fresh session
      return {
        constraintNeglect: 2,
        scopeCreep: 1,
        extremeLanguage: 1,
        formulaReversal: 2,
      };
    }

    for (const m of rawMisconceptions) {
      const category = classifyMisconception(m);
      aggregated[category]++;
    }

    return aggregated;
  }, [counts, rawMisconceptions]);

  const total =
    resolvedCounts.constraintNeglect +
    resolvedCounts.scopeCreep +
    resolvedCounts.extremeLanguage +
    resolvedCounts.formulaReversal;

  const categories = Object.keys(TAXONOMY_METADATA) as (keyof TrapTaxonomyCount)[];

  return (
    <div className={cn("p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-md space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Common Mistake Patterns
          </h4>
          <p className="text-xs text-muted-foreground">
            Patterns identified from your past practice questions
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
          {total} Mistakes Analyzed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {categories.map((key) => {
          const meta = TAXONOMY_METADATA[key];
          const count = resolvedCounts[key];
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const IconComponent = meta.icon;

          return (
            <div
              key={key}
              className={cn(
                "p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all",
                meta.bgColor,
                meta.borderColor
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <IconComponent className={cn("w-4 h-4 shrink-0", meta.color)} />
                  <span className="font-semibold text-xs text-foreground">
                    {meta.name}
                  </span>
                </div>
                <span className={cn("font-mono text-xs font-bold", meta.color)}>
                  {pct}% ({count})
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {meta.description}
              </p>

              <div className="h-1.5 w-full rounded-full bg-slate-900/60 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", meta.color.replace("text-", "bg-"))}
                  style={{ width: `${Math.max(pct, 4)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

