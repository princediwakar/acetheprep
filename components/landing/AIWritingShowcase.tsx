// Path: components/landing/AIWritingShowcase.tsx
import { Sparkles, CheckCircle2, FileText, ArrowRight, Gauge, PenTool } from "lucide-react";
import Link from "next/link";

export function AIWritingShowcase() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6 bg-secondary/15">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>AI Writing &amp; Essay Evaluator</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Instant, human-grade essay scoring in 3 seconds.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Private test prep tutors charge $100/hr and take 48 hours to grade an essay.
            Our AI grades your writing immediately against official GRE, GMAT, and IELTS scoring rubrics.
          </p>
        </div>

        {/* Interactive Visual Preview Box */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Sample Essay Prompt */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                <FileText className="h-4 w-4 text-primary" />
                <span>GRE / GMAT Argument Analysis</span>
              </span>
              <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 text-[10px] border border-emerald-500/20">
                2.8s Real-Time AI Eval
              </span>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-2 text-xs sm:text-sm text-foreground/90 font-serif leading-relaxed">
              <p className="italic text-muted-foreground text-xs font-mono uppercase tracking-wider block mb-1">
                Student Submission Snippet:
              </p>
              <p className="leading-relaxed">
                &ldquo;The author assumes that higher online orders during Q4 prove customers permanently prefer digital shopping over physical stores, without considering seasonal holiday surges...&rdquo;
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Detects unstated assumptions, false causal links, and weak evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Provides line-by-line vocabulary enhancements to elevate academic tone</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Feedback Telemetry */}
          <div className="lg:col-span-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  Official Rubric Prediction
                </span>
                <div className="text-2xl font-bold font-mono text-foreground flex items-baseline gap-1.5">
                  <span>5.5</span>
                  <span className="text-xs text-muted-foreground font-normal">/ 6.0 (92nd Percentile)</span>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold">
                ETS High Mastery
              </span>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-border/40">
                <span className="text-muted-foreground">Logical Reasoning &amp; Flaw Detection</span>
                <span className="font-mono font-semibold text-foreground">5.5 / 6.0</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border/40">
                <span className="text-muted-foreground">Structural Coherence &amp; Paragraph Flow</span>
                <span className="font-mono font-semibold text-foreground">5.0 / 6.0</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-muted-foreground">Lexical Precision &amp; Sentence Variety</span>
                <span className="font-mono font-semibold text-foreground">6.0 / 6.0</span>
              </div>
            </div>

            {/* Line-by-line AI Suggestion */}
            <div className="rounded-lg bg-card border border-border/80 p-3.5 text-xs space-y-1.5 shadow-2xs">
              <span className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold block">
                Instant AI Recommendation:
              </span>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Replace <span className="line-through text-rose-500">&ldquo;makes things worse&rdquo;</span> with <span className="font-semibold text-foreground">&ldquo;exacerbates structural variance&rdquo;</span> to meet 95th-percentile academic phrasing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
