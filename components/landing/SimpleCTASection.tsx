// Path: components/landing/SimpleCTASection.tsx
import Link from "next/link";
import { ArrowRight, Check, BookOpen } from "lucide-react";
import { SignInButton } from "@/components/SignInButton";

export function SimpleCTASection() {
  const commitments = [
    {
      title: "100% Free Fundamentals",
      description: "Diagnostic drills and complete step-by-step solutions are always un-gated.",
    },
    {
      title: "Verified 2026 Standards",
      description: "Format, timing, and question types matched to current official exam blueprints.",
    },
    {
      title: "Calm & Distraction-Free",
      description: "No advertisements, no marketing spam, and zero friction to practice.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
            Start practicing today. <br className="hidden sm:inline" />
            No credit card, no paywall on fundamentals.
          </h2>

          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            Solve authentic problems, understand the underlying concept, and retain it until test day with smart spaced review.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <SignInButton
            buttonText="Take your first test"
            returnUrl="/home?autostart=first_test"
            size="lg"
            className="h-13 px-10 text-base sm:text-lg font-bold shadow-lg shadow-foreground/10 bg-foreground text-background hover:bg-foreground/90 rounded-xl cursor-pointer"
          />

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
          >
            <span>Explore Pro Mock Exams</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 Trust Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left border-t border-border/60">
          {commitments.map((c) => (
            <div key={c.title} className="space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{c.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed pl-6">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
