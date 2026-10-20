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
      <div className="mb-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4 text-foreground font-semibold text-base">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <span>Core Principles & Key Formulas</span>
        </div>
        <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
          {principles.map((principle, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground mt-0.5">
                {idx + 1}
              </span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Exam Trap Card */}
      <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
        <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-400 font-semibold text-base">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <span>Most Common Trap: {primaryDistractorTrap.trapName}</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">
          {primaryDistractorTrap.description}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-amber-500/20 text-xs">
          <div>
            <span className="font-semibold text-amber-600 dark:text-amber-400">Why Students Fail:</span>
            <p className="mt-0.5 text-muted-foreground leading-normal">
              {primaryDistractorTrap.whyStudentsFail}
            </p>
          </div>
          <div>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Prevention Rule:</span>
            <p className="mt-0.5 text-muted-foreground leading-normal">
              {primaryDistractorTrap.preventionRule}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
