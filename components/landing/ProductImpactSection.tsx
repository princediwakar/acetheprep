// Path: components/landing/ProductImpactSection.tsx
import { Target, Zap, Clock, ShieldCheck, CheckCircle2, Sparkles, Brain, HelpCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export function ProductImpactSection() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>How AceThePrep AI Works</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Four AI engines designed to cut your study time in half.
          </h2>

          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            Standard test prep leaves you solving thousands of random questions.
            AceThePrep focuses every study minute on the exact concepts holding your score back.
          </p>
        </div>

        {/* 4 Clean, Visual AI Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: AI Score Leak Detection */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <span className="text-xs font-mono uppercase text-foreground/70 bg-muted px-2.5 py-1 rounded-md">
                  Diagnostic AI
                </span>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground">
                  Score Leak Detection
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  Find weak spots in 10 minutes instead of solving 1,500 random problems.
                </p>
              </div>

              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                Most students waste weeks repeating questions they already know. Our AI analyzes your responses to isolate the exact 15% of high-yield concepts capping your score.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs sm:text-sm font-mono">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Random Question Banks:</span>
                  <span className="line-through text-rose-500/80">1,500 problems (80 hrs)</span>
                </div>
                <div className="flex justify-between items-center text-foreground font-semibold">
                  <span>AceThePrep AI:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">12 targeted diagnostic drills</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-foreground/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Cut unnecessary study hours by 60%</span>
            </div>
          </div>

          {/* Card 2: AI Trap Forensics */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <span className="text-xs font-mono uppercase text-foreground/70 bg-muted px-2.5 py-1 rounded-md">
                  Distractor Intelligence
                </span>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground">
                  Trap Answer Forensics
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  Understand why you fell for the trap, not just that you were wrong.
                </p>
              </div>

              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                Standard exams are designed with deliberate trap options targeting common cognitive reflexes. Our AI breaks down the test-maker&apos;s trick so you spot it instantly on test day.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs sm:text-sm">
                <div className="text-muted-foreground">
                  <span className="font-semibold text-rose-500">Other tools:</span> &ldquo;Incorrect. Option B is the right answer.&rdquo;
                </div>
                <div className="text-foreground font-medium border-t border-border/60 pt-1.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">AceThePrep:</span> Explains why Trap C looked tempting and how to rule it out in 10s.
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-foreground/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Turn repeated mistakes into automatic test instincts</span>
            </div>
          </div>

          {/* Card 3: AI Socratic Guidance */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <span className="text-xs font-mono uppercase text-foreground/70 bg-muted px-2.5 py-1 rounded-md">
                  Interactive Co-Pilot
                </span>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground">
                  Socratic Guidance
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  Hints that teach you how to think, not just the final answer.
                </p>
              </div>

              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                Immediately reading the answer robs your brain of retention. Our AI gives progressive clues that prompt you to derive the solution step by step.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs sm:text-sm">
                <div className="text-muted-foreground">
                  <span className="font-semibold text-rose-500">Traditional:</span> Passively reading a static 20-line derivation.
                </div>
                <div className="text-foreground font-medium border-t border-border/60 pt-1.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">AceThePrep:</span> Step-by-step cues that activate your own reasoning.
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-foreground/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Build genuine exam-day confidence under time pressure</span>
            </div>
          </div>

          {/* Card 4: Spaced Retention */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-foreground/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <span className="text-xs font-mono uppercase text-foreground/70 bg-muted px-2.5 py-1 rounded-md">
                  Retention Engine
                </span>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground">
                  Spaced Retention
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  Lock concepts permanently before memory decays.
                </p>
              </div>

              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                Students naturally forget 70% of reviewed problems within two weeks. Our SM-2 engine schedules 2-minute refreshers at the exact optimal moment to lock concepts into long-term memory.
              </p>

              {/* Simple Visual Comparison */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-1.5 text-xs sm:text-sm font-mono">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Day 1: Initial Drill</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Day 5: 2-Min Refresher</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Reinforced</span>
                </div>
                <div className="flex items-center justify-between text-foreground font-semibold">
                  <span>Test Day: Long-term Recall</span>
                  <span className="text-emerald-600 dark:text-emerald-400">95% Retention</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-foreground/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Ensure what you study stays locked in for test day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
