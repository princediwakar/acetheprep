// Path: components/landing/CTA.tsx

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { SignInButton } from "../SignInButton";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-border/70 overflow-hidden">
      {/* McKinsey Ambient Cobalt Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 rounded-full bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,102,255,0.16),rgba(5,28,44,0.04)_60%,transparent_80%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,102,255,0.25),transparent_80%)] blur-[90px] -z-10"
      />

      <MaxWidthWrapper className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-foreground uppercase shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Zero Guesswork • 100% Free Adaptive System
        </span>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12] text-balance">
          Start your personalized exam prep today.
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Set up your target exam, track your daily progress, and build permanent recall under authentic testing conditions. 100% free with zero paywalls.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignInButton
            buttonText="Get Started Free with Google"
            returnUrl="/setup"
            size="lg"
            className="px-8 py-6 text-base bg-primary hover:opacity-95 text-primary-foreground shadow-xl cursor-pointer rounded-xl"
          />
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Official Testing Standards
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Instant Google Sign-In
          </span>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
