// Path: components/blog/BlogTechnicalDiagram.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface BlogTechnicalDiagramProps {
  examTag?: string;
  category: string;
  className?: string;
}

export function BlogTechnicalDiagram({
  examTag,
  category,
  className,
}: BlogTechnicalDiagramProps) {
  const tag = (examTag || category).toLowerCase();

  // GMAT Focus — Data Sufficiency Partition
  if (tag.includes("gmat")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <circle cx="100" cy="45" r="32" stroke="#3b82f6" strokeWidth="1.5" fill="#3b82f6" fillOpacity="0.08" />
          <circle cx="150" cy="45" r="32" stroke="#10b981" strokeWidth="1.5" fill="#10b981" fillOpacity="0.08" />
          <text x="75" y="48" fill="#3b82f6" fontSize="9" fontWeight="bold" fontFamily="monospace">Stmt (1)</text>
          <text x="120" y="48" fill="#a855f7" fontSize="8" fontWeight="bold" fontFamily="monospace">C</text>
          <text x="145" y="48" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">Stmt (2)</text>
          <rect x="205" y="28" width="55" height="34" rx="4" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" fill="#ef4444" fillOpacity="0.05" />
          <text x="212" y="48" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">Trap: E</text>
          <text x="35" y="18" fill="currentColor" fillOpacity="0.7" fontSize="8" fontFamily="monospace">Data Sufficiency Partition</text>
        </svg>
      </div>
    );
  }

  // CFA Level 1 — Modified Duration & Convexity Curve
  if (tag.includes("cfa") || tag.includes("finance")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <line x1="25" y1="75" x2="255" y2="75" stroke="currentColor" strokeOpacity="0.2" />
          <line x1="35" y1="12" x2="35" y2="80" stroke="currentColor" strokeOpacity="0.2" />
          <path d="M45 18 Q 110 50, 245 70" stroke="#10b981" strokeWidth="2" fill="none" />
          <line x1="70" y1="20" x2="220" y2="78" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="140" cy="48" r="3.5" fill="#3b82f6" />
          <text x="150" y="44" fill="#3b82f6" fontSize="8" fontFamily="monospace">P₀ (y₀)</text>
          <text x="180" y="24" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">Convexity</text>
          <text x="180" y="86" fill="currentColor" fillOpacity="0.6" fontSize="7" fontFamily="monospace">Modified Duration Tangent</text>
        </svg>
      </div>
    );
  }

  // TOEFL / IELTS — Reading Claim vs Lecture Rebuttal / True-False-Not Given
  if (tag.includes("toefl") || tag.includes("ielts") || tag.includes("language")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <rect x="25" y="22" width="95" height="48" rx="6" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.06" />
          <text x="35" y="42" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="monospace">Reading Claim</text>
          <text x="35" y="56" fill="currentColor" fillOpacity="0.6" fontSize="7" fontFamily="monospace">Premise A (20%)</text>
          <path d="M125 46 L 155 46" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="132" y="40" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">≠</text>
          <rect x="160" y="22" width="95" height="48" rx="6" stroke="#10b981" strokeWidth="1.5" fill="#10b981" fillOpacity="0.08" />
          <text x="170" y="42" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">Lecture Rebuttal</text>
          <text x="170" y="56" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">Evidence (80%)</text>
        </svg>
      </div>
    );
  }

  // SAT / GRE — Coordinate Plane Radical Roots
  if (tag.includes("sat") || tag.includes("gre") || tag.includes("math")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <line x1="20" y1="75" x2="260" y2="75" stroke="currentColor" strokeOpacity="0.2" />
          <line x1="40" y1="10" x2="40" y2="85" stroke="currentColor" strokeOpacity="0.2" />
          <path d="M40 75 Q 80 35, 240 25" stroke="#3b82f6" strokeWidth="2" />
          <line x1="40" y1="75" x2="220" y2="15" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx="120" cy="48" r="4" fill="#10b981" />
          <text x="130" y="46" fill="#10b981" fontSize="9" fontFamily="monospace">x = 2 (Valid)</text>
          <circle cx="20" cy="75" r="3" fill="#ef4444" stroke="#ef4444" strokeWidth="1" />
          <text x="10" y="65" fill="#ef4444" fontSize="8" fontFamily="monospace">x = -1 (Trap)</text>
        </svg>
      </div>
    );
  }

  // NEET — Punnett Matrix
  if (tag.includes("neet") || tag.includes("medical") || tag.includes("bio")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <rect x="70" y="15" width="140" height="60" rx="4" stroke="currentColor" strokeOpacity="0.2" />
          <line x1="140" y1="15" x2="140" y2="75" stroke="currentColor" strokeOpacity="0.2" />
          <line x1="70" y1="45" x2="210" y2="45" stroke="currentColor" strokeOpacity="0.2" />
          <text x="95" y="35" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="monospace">TT</text>
          <text x="165" y="35" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">Tt</text>
          <text x="95" y="65" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">Tt</text>
          <text x="165" y="65" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">tt</text>
          <text x="218" y="48" fill="#10b981" fontSize="9" fontFamily="monospace">Ratio: 3:1</text>
        </svg>
      </div>
    );
  }

  // JEE Main — Optics Ray Tracing
  if (tag.includes("jee") || tag.includes("engineering") || tag.includes("physics")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <line x1="20" y1="45" x2="260" y2="45" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 3" />
          <path d="M140 15 Q 155 45, 140 75 Q 125 45, 140 15 Z" fill="currentColor" fillOpacity="0.05" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M30 30 L 140 30 L 220 70" stroke="#10b981" strokeWidth="1.5" />
          <path d="M30 30 L 140 45 L 220 57" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="155" y="25" fill="#3b82f6" fontSize="8" fontFamily="monospace">R₁ &gt; 0, R₂ &lt; 0</text>
          <text x="215" y="80" fill="#10b981" fontSize="8" fontFamily="monospace">Focus F</text>
        </svg>
      </div>
    );
  }

  // UPSC CSAT — Syllogism Euler circles
  if (tag.includes("upsc") || tag.includes("csat") || tag.includes("civil")) {
    return (
      <div
        className={cn(
          "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
          <circle cx="110" cy="45" r="26" stroke="#3b82f6" strokeWidth="1.5" fill="#3b82f6" fillOpacity="0.1" />
          <circle cx="150" cy="45" r="26" stroke="#10b981" strokeWidth="1.5" fill="#10b981" fillOpacity="0.1" />
          <text x="85" y="48" fill="#3b82f6" fontSize="9" fontFamily="monospace">Premise</text>
          <text x="160" y="48" fill="#10b981" fontSize="9" fontFamily="monospace">Conclusion</text>
          <text x="122" y="48" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="monospace">Valid</text>
          <text x="40" y="20" fill="currentColor" fillOpacity="0.7" fontSize="8" fontFamily="monospace">Distributed Middle Term</text>
        </svg>
      </div>
    );
  }

  // Default: Spaced Repetition / Cognitive Science
  return (
    <div
      className={cn(
        "relative h-28 w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden flex items-center justify-center",
        className
      )}
    >
      <svg viewBox="0 0 280 90" fill="none" className="w-full h-full text-foreground/80">
        <line x1="20" y1="75" x2="260" y2="75" stroke="currentColor" strokeOpacity="0.15" />
        <path d="M25 20 Q 60 70, 255 74" stroke="#ef4444" strokeWidth="1.75" strokeDasharray="3 3" />
        <path d="M55 55 Q 58 20, 65 18 Q 100 50, 120 55" stroke="#3b82f6" strokeWidth="1.75" fill="none" />
        <path d="M120 55 Q 122 19, 130 18 Q 180 35, 210 38" stroke="#06b6d4" strokeWidth="1.75" fill="none" />
        <path d="M210 38 Q 212 18, 220 18 Q 240 22, 260 24" stroke="#10b981" strokeWidth="2" fill="none" />
        <text x="205" y="12" fill="#10b981" fontSize="8" fontWeight="600" fontFamily="monospace">Spaced Lock-in</text>
        <text x="140" y="70" fill="#ef4444" fontSize="8" fontFamily="monospace">Ebbinghaus Decay</text>
      </svg>
    </div>
  );
}
