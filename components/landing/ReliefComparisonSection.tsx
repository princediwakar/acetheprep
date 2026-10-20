// Path: components/landing/ReliefComparisonSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { X, Check, Flame, Sparkles } from "lucide-react";

interface ComparisonItem {
  dimension: string;
  oldWay: string;
  aceWay: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    dimension: "Long-Term Retention",
    oldWay: "Reread textbooks and notes for 8 hours, only to forget most key concepts within days.",
    aceWay: "Spaced review intervals on Days 3, 7, and 14 lock key concepts into permanent memory.",
  },
  {
    dimension: "Practice Efficiency",
    oldWay: "Solve 50 repetitive questions on comfortable topics, creating a false sense of confidence without fixing weak spots.",
    aceWay: "Targeted Gap Isolation: Pinpoint exact weak topics so you spend study time only where it improves your score.",
  },
  {
    dimension: "Error Analysis",
    oldWay: "Glance at the correct option letter, nod passively, and fall for the exact same trap on exam day.",
    aceWay: "In-Depth Trap Breakdown: Shows you exactly why tempting wrong choices look right, so you never get tricked.",
  },
  {
    dimension: "Mental Fatigue",
    oldWay: "Draining 3-hour marathon tests every weekend that cause burnout rather than actionable insights.",
    aceWay: "Focused 10-question practice sprints that give you instant, clear feedback with zero test fatigue.",
  },
];

export default function ReliefComparisonSection() {
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState<"old" | "ace">("ace");

  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70">
      <MaxWidthWrapper>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            The Difference
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15] text-balance">
            Passive Cramming vs. Smart Targeted Practice
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            Most students don&apos;t fail because they lacked commitment. They fail because passive rereading doesn&apos;t prepare you for tricky exam traps.
          </p>
        </div>

        {isMobile ? (
          <MobileComparison activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <DesktopComparison />
        )}
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
                The Passive Cramming Treadmill
              </h3>
              <p className="text-xs text-muted-foreground">Traditional coaching rote practice</p>
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
          <span>Result: High anxiety, volatile exam-day recall</span>
        </div>
      </div>

      {/* The AceThePrep Way */}
      <div className="rounded-2xl border border-primary/30 bg-card p-7 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
        {/* Subtle accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        />

        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-border/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">
                The Calibrated Retrieval Engine
              </h3>
              <p className="text-xs text-primary font-medium">AceThePrep Cognitive Architecture</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {COMPARISONS.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary/80">
                  {item.dimension}
                </span>
                <p className="text-sm leading-relaxed text-foreground flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item.aceWay}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/50 text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Result: 90%+ long-term retention with 50% less study time</span>
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
          Passive Cramming
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
          Calibrated Retrieval
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
                The Passive Cramming Treadmill
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
                The Calibrated Retrieval Engine
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
