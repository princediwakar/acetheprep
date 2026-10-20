// Path: components/landing/ReliefComparisonSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { X, Check, Flame, Sparkles, ArrowRight } from "lucide-react";

interface ComparisonItem {
  dimension: string;
  oldWay: string;
  aceWay: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    dimension: "Measuring Progress",
    oldWay: "Rereading textbooks and summaries until they feel familiar, confusing recognition with real recall under stress.",
    aceWay: "Active problem solving without notes, proving you can retrieve concepts and formulas from memory under the clock.",
  },
  {
    dimension: "Learning From Mistakes",
    oldWay: "Glancing at the answer key, nodding passively, and making the exact same error again under test-day pressure.",
    aceWay: "Step-by-step breakdown of why wrong options seem appealing, helping you build genuine understanding.",
  },
  {
    dimension: "Study Efficiency",
    oldWay: "Solving dozens of easy questions on topics you already know to feel productive without fixing weaknesses.",
    aceWay: "Targeted practice focused on the specific 15% of high-yield concepts where you actually drop marks.",
  },
  {
    dimension: "Exam-Day Retention",
    oldWay: "Draining 3-hour marathon mock tests that cause burnout while earlier chapters quietly fade from memory.",
    aceWay: "Bite-sized 10-question practice sessions with smart review intervals that lock concepts permanently into memory.",
  },
];

export default function ReliefComparisonSection() {
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState<"old" | "ace">("ace");

  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70">
      <MaxWidthWrapper>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-blue-600/25 bg-blue-50/80 dark:bg-blue-950/40 dark:border-blue-500/30 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 uppercase shadow-xs">
            The Difference
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15] text-balance">
            Passive Studying vs. Real Exam Readiness
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            Why students can study 10+ hours a day, feel confident, and still struggle on exam day. Here is the difference between feeling prepared and actually being ready.
          </p>
        </div>

        {isMobile ? (
          <MobileComparison activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <DesktopComparison />
        )}

        <ComparisonFlowDiagram />

        {/* Conversion Action Footer */}
        <div className="mt-14 text-center space-y-3">
          <Link
            href="/setup"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-950/20 hover:shadow-blue-900/30 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Start Free Prep</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-muted-foreground font-mono">
            Takes 60 seconds to set up • No credit card required
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

function DesktopComparison() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* The Passive Way */}
      <div className="rounded-2xl border border-border/80 bg-card/60 p-7 sm:p-8 backdrop-blur-sm shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <X className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">
                Passive Studying
              </h3>
              <p className="text-xs text-muted-foreground">Reading textbooks & highlighting notes</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {COMPARISONS.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {item.dimension}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 mt-2 shrink-0" />
                  <span>{item.oldWay}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/50 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span>Result: High test anxiety, second-guessing under time pressure, repeat mistakes</span>
        </div>
      </div>

      {/* The AceThePrep Way */}
      <div className="rounded-2xl border border-blue-600/30 bg-card p-7 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
        {/* Subtle accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl"
        />

        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-600 dark:text-blue-400">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">
                Active Preparation (AceThePrep)
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Active recall & targeted practice</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {COMPARISONS.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80">
                  {item.dimension}
                </span>
                <p className="text-sm leading-relaxed text-foreground flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-500 mt-2 shrink-0" />
                  <span>{item.aceWay}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/50 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Result: Confident problem solving, fast recall under pressure, permanent memory</span>
        </div>
      </div>
    </div>
  );
}

function MobileComparison({
  activeTab,
  setActiveTab,
}: {
  activeTab: "old" | "ace";
  setActiveTab: (tab: "old" | "ace") => void;
}) {
  return (
    <div>
      <div className="flex rounded-xl border border-border bg-muted/40 p-1">
        <button
          onClick={() => setActiveTab("old")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-colors",
            activeTab === "old"
              ? "bg-background text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Passive Studying
        </button>
        <button
          onClick={() => setActiveTab("ace")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-colors",
            activeTab === "ace"
              ? "bg-primary text-primary-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Active Preparation
        </button>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === "old" ? (
            <motion.div
              key="old"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-5"
            >
              <h3 className="font-heading text-lg font-medium text-foreground">
                Passive Studying
              </h3>
              {COMPARISONS.map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                    {item.dimension}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.oldWay}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-primary/40 bg-card p-6 shadow-sm space-y-5"
            >
              <h3 className="font-heading text-lg font-medium text-foreground">
                Active Preparation (AceThePrep)
              </h3>
              {COMPARISONS.map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-primary font-semibold">
                    {item.dimension}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.aceWay}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ComparisonFlowDiagram() {
  return (
    <div className="mt-12 rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xs shadow-xs">
      <div className="text-center mb-6 max-w-xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
          Cognitive Architecture Comparison
        </span>
        <h4 className="text-base sm:text-lg font-medium text-foreground mt-1">
          The Two Learning Loops Under Memory Physics
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passive Loop */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold">
            <X className="h-4 w-4" />
            <span>The Illusion of Competence (Passive Loop)</span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-2.5 border border-border/40">
              <span className="text-rose-500 font-bold shrink-0">01</span>
              <span>Reread 50 pages of textbook notes</span>
            </div>
            <div className="flex items-center justify-center text-muted-foreground/60 text-[10px]">
              ▼ (Creates false familiarity bias)
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-2.5 border border-border/40">
              <span className="text-rose-500 font-bold shrink-0">02</span>
              <span>Mistake visual recognition for true unassisted recall</span>
            </div>
            <div className="flex items-center justify-center text-muted-foreground/60 text-[10px]">
              ▼ (Zero retrieval practice under timed stress)
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-rose-500/10 p-2.5 border border-rose-500/25 text-rose-700 dark:text-rose-300 font-medium">
              <span className="font-bold shrink-0">03</span>
              <span>Exam day: Blanking on formulas & falling into sign traps</span>
            </div>
          </div>
        </div>

        {/* AceThePrep Closed Loop */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold">
            <Check className="h-4 w-4" />
            <span>The Calibrated Diagnostic (AceThePrep Loop)</span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-2.5 border border-border/40">
              <span className="text-blue-500 font-bold shrink-0">01</span>
              <span>10Q Timed Retrieval Drill (Unassisted)</span>
            </div>
            <div className="flex items-center justify-center text-blue-500/60 text-[10px]">
              ▼ (Instant mistake autopsy isolation)
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-background/80 p-2.5 border border-border/40">
              <span className="text-blue-500 font-bold shrink-0">02</span>
              <span>Deconstruct exact distractor traps & algebraic errors</span>
            </div>
            <div className="flex items-center justify-center text-blue-500/60 text-[10px]">
              ▼ (SM-2 Spaced review at Day 3 & Day 7)
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-emerald-500/10 p-2.5 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-medium">
              <span className="font-bold shrink-0">03</span>
              <span>Permanent synaptic lock-in for test day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
