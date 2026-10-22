// Path: components/blog/BlogTechnicalDiagram.tsx
import React from "react";
import { cn } from "@/lib/utils";

export interface BlogTechnicalDiagramProps {
  slug?: string;
  diagramType?: string;
  examTag?: string;
  category?: string;
  className?: string;
}

export function BlogTechnicalDiagram({
  slug = "",
  diagramType = "",
  examTag = "",
  category = "",
  className,
}: BlogTechnicalDiagramProps) {
  const identifier = `${diagramType} ${slug} ${examTag} ${category}`.toLowerCase();

  // 1. Digital SAT: 1500+ Multistage Adaptive Routing Tree
  if (
    identifier.includes("sat-routing") ||
    identifier.includes("1500") ||
    (identifier.includes("sat") && identifier.includes("wrong")) ||
    identifier.includes("digital-sat-score-calculator-and-module-2-routing")
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          {/* Subtle grid background */}
          <line x1="20" y1="20" x2="340" y2="20" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="20" y1="55" x2="340" y2="55" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="20" y1="90" x2="340" y2="90" stroke="currentColor" strokeOpacity="0.05" />

          {/* Module 1 Box */}
          <rect x="20" y="32" width="84" height="46" rx="6" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.06" />
          <text x="30" y="49" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="monospace">MODULE 1</text>
          <text x="30" y="61" fill="currentColor" fillOpacity="0.75" fontSize="7" fontFamily="monospace">22 Questions</text>
          <text x="30" y="71" fill="currentColor" fillOpacity="0.5" fontSize="6.5" fontFamily="monospace">Avg Difficulty</text>

          {/* Split arrows */}
          <path d="M104 50 L 140 32" stroke="#10b981" strokeWidth="1.2" markerEnd="url(#arrow-emerald)" />
          <path d="M104 60 L 140 78" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />

          <text x="112" y="36" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">≥15 Correct</text>
          <text x="112" y="74" fill="#ef4444" fontSize="6.5" fontWeight="bold" fontFamily="monospace">&lt;15 Correct</text>

          {/* Upper: Hard Module 2 */}
          <rect x="145" y="16" width="98" height="36" rx="6" stroke="#10b981" strokeWidth="1.2" fill="#10b981" fillOpacity="0.07" />
          <text x="153" y="30" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">HARD MODULE 2</text>
          <text x="153" y="42" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">Ceiling: 800 | 1500+ Route</text>

          {/* Lower: Easy Module 2 */}
          <rect x="145" y="62" width="98" height="36" rx="6" stroke="#ef4444" strokeWidth="1.2" fill="#ef4444" fillOpacity="0.05" />
          <text x="153" y="76" fill="#ef4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">EASY MODULE 2</text>
          <text x="153" y="88" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">Capped Ceiling: 610 Max</text>

          {/* Final Composite Result */}
          <path d="M243 34 L 270 50" stroke="#10b981" strokeWidth="1.2" />
          <path d="M243 80 L 270 60" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />

          <rect x="272" y="36" width="72" height="38" rx="6" stroke="currentColor" strokeOpacity="0.3" fill="currentColor" fillOpacity="0.04" />
          <text x="280" y="51" fill="currentColor" fontSize="7.5" fontWeight="bold" fontFamily="monospace">COMPOSITE</text>
          <text x="280" y="63" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">1500–1600</text>
        </svg>
      </div>
    );
  }

  // 2. GMAT Focus: Question Guessing vs Consecutive Unanswered Penalty Curve
  if (
    identifier.includes("gmat-penalty") ||
    identifier.includes("guess") ||
    identifier.includes("blank") ||
    identifier.includes("penalty")
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          {/* Axis */}
          <line x1="30" y1="90" x2="330" y2="90" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="30" y1="15" x2="30" y2="90" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          <text x="14" y="24" fill="currentColor" fillOpacity="0.5" fontSize="6.5" fontFamily="monospace">Score</text>
          <text x="280" y="102" fill="currentColor" fillOpacity="0.5" fontSize="6.5" fontFamily="monospace">Unanswered Qs</text>

          {/* Flat decay: Educated / Random Guessing */}
          <path d="M30 30 Q 180 38, 320 48" stroke="#3b82f6" strokeWidth="1.8" fill="none" />
          <circle cx="320" cy="48" r="3" fill="#3b82f6" />
          <text x="195" y="42" fill="#3b82f6" fontSize="7" fontWeight="bold" fontFamily="monospace">Blind Guess (-2 to -4 pts)</text>

          {/* Exponential Cliff: Unanswered Blanks */}
          <path d="M30 30 Q 170 38, 250 68 T 320 86" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <circle cx="320" cy="86" r="3.5" fill="#ef4444" />
          <text x="195" y="80" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">Left Blank (-10 to -15 pts)</text>

          {/* 3 Edit Window Badge */}
          <rect x="38" y="18" width="105" height="20" rx="4" stroke="#10b981" strokeWidth="1" fill="#10b981" fillOpacity="0.08" />
          <text x="44" y="31" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">GMAC Rule: Edit Up to 3 Answers</text>
        </svg>
      </div>
    );
  }

  // 3. GRE: Quantitative Comparison 4-Number Plug-in Rule
  if (
    identifier.includes("gre-quant-rule") ||
    identifier.includes("4-number") ||
    identifier.includes("quantitative-comparison")
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          <text x="20" y="16" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">GRE 4-NUMBER BOUNDARY AUDIT</text>

          {/* 4 Quadrants */}
          <g transform="translate(20, 24)">
            {/* Box 1: Positive Integer */}
            <rect x="0" y="0" width="70" height="45" rx="5" stroke="#3b82f6" strokeWidth="1" fill="#3b82f6" fillOpacity="0.06" />
            <text x="8" y="16" fill="#3b82f6" fontSize="7" fontWeight="bold" fontFamily="monospace">1. POS INT</text>
            <text x="8" y="28" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">x = 2, 3</text>
            <text x="8" y="38" fill="currentColor" fillOpacity="0.5" fontSize="6" fontFamily="monospace">Qty A &gt; Qty B</text>

            {/* Box 2: Negative Integer */}
            <rect x="76" y="0" width="70" height="45" rx="5" stroke="#3b82f6" strokeWidth="1" fill="#3b82f6" fillOpacity="0.06" />
            <text x="84" y="16" fill="#3b82f6" fontSize="7" fontWeight="bold" fontFamily="monospace">2. NEG INT</text>
            <text x="84" y="28" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">x = -2, -3</text>
            <text x="84" y="38" fill="currentColor" fillOpacity="0.5" fontSize="6" fontFamily="monospace">Sign Flips</text>

            {/* Box 3: Zero */}
            <rect x="152" y="0" width="70" height="45" rx="5" stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fillOpacity="0.06" />
            <text x="160" y="16" fill="#f59e0b" fontSize="7" fontWeight="bold" fontFamily="monospace">3. ZERO (0)</text>
            <text x="160" y="28" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">x = 0</text>
            <text x="160" y="38" fill="currentColor" fillOpacity="0.5" fontSize="6" fontFamily="monospace">Terms Nullify</text>

            {/* Box 4: Fraction / Root */}
            <rect x="228" y="0" width="70" height="45" rx="5" stroke="#a855f7" strokeWidth="1" fill="#a855f7" fillOpacity="0.06" />
            <text x="236" y="16" fill="#a855f7" fontSize="7" fontWeight="bold" fontFamily="monospace">4. FRACTION</text>
            <text x="236" y="28" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">x = 1/2, 1/4</text>
            <text x="236" y="38" fill="currentColor" fillOpacity="0.5" fontSize="6" fontFamily="monospace">x² &lt; x Inversion</text>
          </g>

          {/* Outcome Result Arrow */}
          <path d="M170 76 L 170 86" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <rect x="80" y="86" width="180" height="20" rx="4" stroke="#ef4444" strokeWidth="1" fill="#ef4444" fillOpacity="0.08" />
          <text x="92" y="99" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">If Outcomes Conflict → Choice (D) Lock</text>
        </svg>
      </div>
    );
  }

  // 4. CFA Level 1: Ethics Adjustment & 70% MPS Line
  if (
    identifier.includes("cfa-mps") ||
    identifier.includes("ethics") ||
    (identifier.includes("cfa") && identifier.includes("pass"))
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          {/* MPS Threshold Line */}
          <line x1="30" y1="58" x2="330" y2="58" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="240" y="53" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">MPS Line: ~68%–70%</text>

          {/* Borderline Candidate Bar A (Ethics Fail) */}
          <rect x="60" y="52" width="60" height="42" rx="4" fill="#64748b" fillOpacity="0.3" stroke="#64748b" strokeWidth="1" />
          <rect x="60" y="75" width="60" height="19" rx="2" fill="#ef4444" fillOpacity="0.4" />
          <text x="65" y="44" fill="currentColor" fontSize="6.5" fontFamily="monospace">Borderline (67%)</text>
          <text x="65" y="88" fill="#ef4444" fontSize="6" fontWeight="bold" fontFamily="monospace">Ethics &lt;50%</text>
          <text x="74" y="104" fill="#ef4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">FAIL</text>

          {/* Borderline Candidate Bar B (Ethics Bump) */}
          <rect x="180" y="52" width="60" height="42" rx="4" fill="#64748b" fillOpacity="0.3" stroke="#64748b" strokeWidth="1" />
          <rect x="180" y="52" width="60" height="20" rx="2" fill="#10b981" fillOpacity="0.5" />
          <text x="185" y="44" fill="currentColor" fontSize="6.5" fontFamily="monospace">Borderline (67%)</text>
          <text x="185" y="65" fill="#10b981" fontSize="6" fontWeight="bold" fontFamily="monospace">Ethics &gt;75%</text>
          <text x="194" y="104" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">PASS ↑</text>

          {/* CFAI Ethics Adjustment Rule Callout */}
          <rect x="250" y="14" width="90" height="30" rx="4" stroke="#10b981" strokeWidth="1" fill="#10b981" fillOpacity="0.08" />
          <text x="255" y="26" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">Official CFAI Rule:</text>
          <text x="255" y="37" fill="currentColor" fillOpacity="0.7" fontSize="6" fontFamily="monospace">Ethics determines pass/fail</text>
        </svg>
      </div>
    );
  }

  // 5. IELTS Reading: False vs Not Given Ternary State Machine
  if (
    identifier.includes("ielts-ternary") ||
    identifier.includes("false") ||
    identifier.includes("not given") ||
    (identifier.includes("ielts") && identifier.includes("reading"))
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          <text x="20" y="16" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">CAMBRIDGE TERNARY LOGIC GATE</text>

          {/* Root Prompt Statement */}
          <rect x="20" y="32" width="90" height="42" rx="5" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.07" />
          <text x="28" y="48" fill="#3b82f6" fontSize="7" fontWeight="bold" fontFamily="monospace">PROMPT CLAIM</text>
          <text x="28" y="60" fill="currentColor" fillOpacity="0.7" fontSize="6.5" fontFamily="monospace">Search Text For:</text>

          {/* Decision Branches */}
          <path d="M110 40 L 150 25" stroke="#10b981" strokeWidth="1.2" />
          <path d="M110 53 L 150 53" stroke="#ef4444" strokeWidth="1.2" />
          <path d="M110 66 L 150 82" stroke="#f59e0b" strokeWidth="1.2" />

          {/* Branch 1: True */}
          <rect x="155" y="14" width="180" height="24" rx="4" stroke="#10b981" strokeWidth="1" fill="#10b981" fillOpacity="0.06" />
          <text x="162" y="29" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">TRUE</text>
          <text x="200" y="29" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">Text agrees &amp; confirms exactly</text>

          {/* Branch 2: False */}
          <rect x="155" y="42" width="180" height="24" rx="4" stroke="#ef4444" strokeWidth="1" fill="#ef4444" fillOpacity="0.06" />
          <text x="162" y="57" fill="#ef4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">FALSE</text>
          <text x="200" y="57" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">Text directly refutes/contradicts</text>

          {/* Branch 3: Not Given */}
          <rect x="155" y="70" width="180" height="24" rx="4" stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fillOpacity="0.06" />
          <text x="162" y="85" fill="#f59e0b" fontSize="7.5" fontWeight="bold" fontFamily="monospace">NOT GIVEN</text>
          <text x="215" y="85" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">Author is silent / unprovable</text>
        </svg>
      </div>
    );
  }

  // 6. TOEFL iBT: Speaking 45-Second Pacing & Acoustic Waveform
  if (
    identifier.includes("toefl-speech") ||
    identifier.includes("speaking") ||
    (identifier.includes("toefl") && identifier.includes("template"))
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          <text x="20" y="16" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">TOEFL 45-SECOND INDEPENDENT TIMELINE</text>

          {/* Timeline Bar */}
          <rect x="20" y="32" width="320" height="24" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" />

          {/* Section 1: Claim (0-8s) */}
          <rect x="20" y="32" width="56" height="24" rx="3" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
          <text x="26" y="47" fill="#3b82f6" fontSize="6.5" fontWeight="bold" fontFamily="monospace">0–8s: Thesis</text>

          {/* Section 2: Reason 1 & Anecdote (8-28s) */}
          <rect x="78" y="32" width="140" height="24" rx="3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
          <text x="96" y="47" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">8–28s: Core Example &amp; Detail</text>

          {/* Section 3: Reason 2 / Synthesis (28-40s) */}
          <rect x="220" y="32" width="85" height="24" rx="3" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="1" />
          <text x="226" y="47" fill="#a855f7" fontSize="6.5" fontWeight="bold" fontFamily="monospace">28–40s: Support 2</text>

          {/* Section 4: Wrap-up (40-45s) */}
          <rect x="307" y="32" width="33" height="24" rx="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
          <text x="310" y="47" fill="#f59e0b" fontSize="5.5" fontWeight="bold" fontFamily="monospace">Wrap</text>

          {/* Acoustic Waveform & SpeechRater Note */}
          <path d="M25 78 Q 40 68, 55 78 T 85 78 T 115 65 T 145 78 T 175 62 T 205 78 T 235 66 T 265 78 T 295 68 T 325 78" stroke="#10b981" strokeWidth="1.2" fill="none" />
          <text x="20" y="98" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">SpeechRater Target: 130–150 words/min | &lt;2 sec pause boundary</text>
        </svg>
      </div>
    );
  }

  // 7. GRE vs GMAT Focus: MBA Admissions Quant Profile Matrix
  if (
    identifier.includes("mba-decision") ||
    identifier.includes("gre-vs-gmat") ||
    (identifier.includes("mba") && identifier.includes("roi"))
  ) {
    return (
      <div
        className={cn(
          "relative h-36 w-full rounded-xl border border-border/70 bg-card/60 p-3 overflow-hidden flex items-center justify-center select-none shadow-sm",
          className
        )}
      >
        <svg viewBox="0 0 360 110" fill="none" className="w-full h-full text-foreground/90">
          <text x="20" y="16" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="bold" fontFamily="monospace">M7 ADMISSIONS QUANT PROFILE MATRIX</text>

          {/* Left: GMAT Focus Box */}
          <rect x="20" y="26" width="150" height="72" rx="6" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.05" />
          <text x="30" y="42" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="monospace">GMAT FOCUS EDITION</text>
          <text x="30" y="55" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Best For: Finance, IB, PE</text>
          <text x="30" y="67" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Quant 85+ = 89th Percentile</text>
          <text x="30" y="79" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Data Insights: Integrated</text>
          <text x="30" y="91" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">Direct Signal to Wall St</text>

          {/* Right: GRE Box */}
          <rect x="190" y="26" width="150" height="72" rx="6" stroke="#a855f7" strokeWidth="1.2" fill="#a855f7" fillOpacity="0.05" />
          <text x="200" y="42" fill="#a855f7" fontSize="8" fontWeight="bold" fontFamily="monospace">GRE GENERAL TEST</text>
          <text x="200" y="55" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Best For: Consulting, Tech, Dual-deg</text>
          <text x="200" y="67" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Quant 167+ = 83rd Percentile</text>
          <text x="200" y="79" fill="currentColor" fillOpacity="0.75" fontSize="6.5" fontFamily="monospace">• Vocabulary Heavy (Verbal)</text>
          <text x="200" y="91" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">100% M7 Acceptance Parity</text>
        </svg>
      </div>
    );
  }

  // Fallback 1: GMAT Focus default
  if (identifier.includes("gmat")) {
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

  // Fallback 2: CFA Level 1 default
  if (identifier.includes("cfa") || identifier.includes("finance")) {
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

  // Fallback 3: TOEFL / IELTS language default
  if (identifier.includes("toefl") || identifier.includes("ielts") || identifier.includes("language")) {
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

  // Fallback 4: SAT / GRE math default
  if (identifier.includes("sat") || identifier.includes("gre") || identifier.includes("math")) {
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
