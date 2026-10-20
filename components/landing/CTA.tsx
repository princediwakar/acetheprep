// Path: components/landing/CTA.tsx

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { SignInButton } from "../SignInButton";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-border/70 overflow-hidden">
      {/* Warm ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-80 rounded-full bg-primary/10 blur-[110px] -z-10"
      />

      <MaxWidthWrapper className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          Zero Guesswork • 100% Free
        </span>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12] text-balance">
          Start your personalized exam prep today.
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Set up your target exam, track your daily progress, and build permanent recall with adaptive practice. 100% free with zero paywalls.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignInButton
            buttonText="Get Started Free with Google"
            returnUrl="/setup"
            size="lg"
            className="px-8 py-6 text-base shadow-lg cursor-pointer"
          />
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            100% Free Educational Engine
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
