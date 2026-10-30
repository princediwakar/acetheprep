// Path: components/practice/DomainCorePrinciples.tsx
import { BookOpen, AlertTriangle } from "lucide-react";

interface DistractorTrap {
  trapName: string;
  description: string;
  whyStudentsFail: string;
  preventionRule: string;
}

interface DomainCorePrinciplesProps {
  principles: string[];
  primaryDistractorTrap: DistractorTrap;
}

export function DomainCorePrinciples({
  principles,
  primaryDistractorTrap,
}: DomainCorePrinciplesProps) {
  return (
    <>
      {/* Core Principles & Key Formulas */}
      <div className="mb-8 rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4 text-foreground font-semibold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <span>Core Principles & Key Formulas</span>
        </div>
        <ul className="space-y-3 text-base text-foreground/85 leading-relaxed">
          {principles.map((principle, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground mt-0.5">
                {idx + 1}
              </span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Exam Trap Card */}
      <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-7">
        <div className="flex items-center gap-2.5 mb-3 text-amber-500 font-semibold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
            <AlertTriangle className="h-4.5 w-4.5" />
          </div>
          <span>Most Common Trap: {primaryDistractorTrap.trapName}</span>
        </div>
        <p className="text-base text-foreground/90 leading-relaxed mb-4">
          {primaryDistractorTrap.description}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 pt-3 border-t border-amber-500/20">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              Why Students Fail:
            </span>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {primaryDistractorTrap.whyStudentsFail}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Prevention Rule:
            </span>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {primaryDistractorTrap.preventionRule}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
