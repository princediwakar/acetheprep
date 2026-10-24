// Path: components/landing/ProductImpactSection.tsx
import { Target, Zap, Clock, ShieldCheck, CheckCircle2, Sparkles, Brain, HelpCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export function ProductImpactSection() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>How AceThePrep AI Works</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Four AI engines designed to cut your study time in half.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Standard test prep gives you a massive bank of 2,000 random questions and leaves you on your own.
            AceThePrep uses purposeful AI to guide every single minute of your practice.
          </p>
        </div>

        {/* 4 Simple, Visual AI Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: AI Score Leak Detection */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Diagnostic AI
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-foreground">
                  AI Score Leak Detection
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Find weak spots in 10 minutes instead of solving 1,500 random questions.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Most students waste weeks practicing problems they already understand. Our AI evaluates
                your response patterns against 10 years of official exam data to isolate the exact 15% of
                concepts holding your score down.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Random Prep:</span>
                  <span className="line-through text-rose-500/80">1,500 questions (80 hrs wasted)</span>
                </div>
                <div className="flex justify-between items-center text-foreground font-semibold">
                  <span>AceThePrep AI:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">12 high-yield targeted drills</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
              <span>Spend 60% less time studying</span>
            </div>
          </div>

          {/* Card 2: AI Trap Forensics */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Distractor Intelligence
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-foreground">
                  AI Trap Answer Forensics
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Understand why you fell for the trap, not just that you were wrong.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Competitive exams don&apos;t just test facts—test-makers write specific trap answers to exploit
                common cognitive missteps. Our AI analyzes your wrong choice and explains the psychological trick behind it.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs">
                <div className="text-muted-foreground text-[11px]">
                  <span className="font-semibold text-rose-500">Other platforms:</span> &ldquo;Incorrect. Option B is correct.&rdquo;
                </div>
                <div className="text-foreground text-[11px] font-medium border-t border-border/60 pt-1.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">AceThePrep AI:</span> Explains why Trap C was tempting &amp; the 10-second rule to spot it.
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
              <span>Turn your recurring mistakes into test-day instinct</span>
            </div>
          </div>

          {/* Card 3: AI Socratic Hinting */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Interactive Co-Pilot
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-foreground">
                  AI Socratic Guidance
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Guided hints that teach you how to think, not just the final answer.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                When you get stuck, immediately looking at the full solution robs your brain of learning.
                Our AI provides progressive step-by-step hints that guide you to derive the solution yourself.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs">
                <div className="text-muted-foreground text-[11px]">
                  <span className="font-semibold text-rose-500">Traditional:</span> Passive reading of a 20-line math proof.
                </div>
                <div className="text-foreground text-[11px] font-medium border-t border-border/60 pt-1.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">AceThePrep AI:</span> Socratic cues that trigger your own active problem-solving.
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
              <span>Build genuine confidence under exam pressure</span>
            </div>
          </div>

          {/* Card 4: AI Spaced Memory Recall */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Retention Engine
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-foreground">
                  AI Spaced Memory Recall
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Lock concepts permanently right before memory fades.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Cognitive science proves that students forget 70% of reviewed solutions within two weeks.
                Our AI tracks your forgetting curve and schedules 2-minute refresher drills at the exact optimal moment.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Day 1: Solve problem</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Day 5: 2-min AI refresher</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-foreground font-semibold">
                  <span>Test Day: Locked in memory</span>
                  <span className="text-emerald-600 dark:text-emerald-400">95% Recall Rate</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
              <span>Ensure what you study stays locked in for test day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
