"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createCheckoutSession } from "@/lib/actions/billing";
import { cn } from "@/lib/utils";
import { CompactPaymentTrust } from "./PaymentTrustBadge";
import { useUser } from "@/hooks/useUser";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface PricingCardsProps {
  userEmail?: string | null;
  isPro?: boolean;
}

export function PricingCards({ userEmail: propEmail, isPro: propIsPro }: PricingCardsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const userEmail = propEmail ?? user?.email ?? null;
  const isPro = propIsPro ?? false;

  const urlPlan = searchParams.get("plan");
  const autoCheckout = searchParams.get("checkout") === "true";

  const [billingCycle, setBillingCycle] = useState<"quarterly" | "monthly">(
    urlPlan === "monthly" ? "monthly" : "quarterly"
  );
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "quarterly" | null>(null);
  const checkoutInitiatedRef = useRef(false);

  const isQuarterly = billingCycle === "quarterly";

  async function handlePlanCheckout(planType: "monthly" | "quarterly") {
    if (!userEmail) {
      toast.info("Please sign in with Google to continue to secure checkout.");
      await signInWithGoogle(`/pricing?plan=${planType}&checkout=true`);
      return;
    }

    if (isPro) {
      router.push("/home");
      return;
    }

    setLoadingPlan(planType);
    try {
      const res = await createCheckoutSession({ planType });
      if (res.error) {
        toast.error(res.error);
        setLoadingPlan(null);
        return;
      }
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to launch checkout.");
      setLoadingPlan(null);
    }
  }

  // Auto-launch checkout if returning from Google Auth with ?checkout=true
  useEffect(() => {
    if (autoCheckout && userEmail && !isPro && !checkoutInitiatedRef.current) {
      checkoutInitiatedRef.current = true;
      const targetPlan = urlPlan === "monthly" ? "monthly" : "quarterly";
      handlePlanCheckout(targetPlan);
    }
  }, [autoCheckout, userEmail, isPro, urlPlan]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 2-Card Comparison: Starter vs Pro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Card 1: Free Starter */}
        <div className="rounded-3xl border border-border/80 bg-card p-7 sm:p-8 flex flex-col justify-between shadow-xs relative">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground mb-3">
                Free Forever
              </div>
              <h3 className="text-2xl font-heading font-medium text-foreground">Starter</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Free forever for daily practice and diagnostic accuracy across all 6 curricula.
              </p>
            </div>

            <div className="py-3 border-y border-border/60">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">$0</span>
                <span className="text-sm text-muted-foreground">/ forever</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Zero credit card required</p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-foreground/90">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>10-Question Daily Practice Sets</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>First-Principles Step-by-Step Solutions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Baseline Exam Readiness Index</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Check className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                <span>Topic-by-topic official taxonomy navigation</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Check className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                <span>Interactive exam score gap predictor</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full font-semibold rounded-xl cursor-pointer"
              onClick={() => router.push(userEmail ? "/home" : "/setup")}
            >
              {userEmail ? "Go to Study Dashboard" : "Start Free (No Credit Card)"}
            </Button>
          </div>
        </div>

        {/* Card 2: AceThePrep Pro (With Integrated Cadence Selector) */}
        <div className="rounded-3xl border-2 border-primary bg-gradient-to-b from-primary/10 via-card to-card p-7 sm:p-8 flex flex-col justify-between shadow-xl relative ring-4 ring-primary/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground text-xs uppercase font-extrabold tracking-wider px-3.5 py-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
              Full Access Pro
            </Badge>
          </div>

          <div className="space-y-5 pt-1">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
                Complete Exam Prep
              </div>
              <h3 className="text-2xl font-heading font-medium text-foreground">AceThePrep Pro</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Full sectional drills, realistic 50Q mock simulations, and spaced retention.
              </p>
            </div>

            {/* Embedded Cadence Selector Tiles (100% visible inside the card) */}
            <div className="p-1 rounded-2xl bg-muted/60 border border-border/80 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setBillingCycle("quarterly")}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative",
                  isQuarterly
                    ? "border-primary bg-background shadow-xs ring-1 ring-primary/20"
                    : "border-transparent hover:bg-background/50 text-muted-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={cn("font-bold text-xs", isQuarterly ? "text-foreground" : "text-muted-foreground")}>
                    90-Day Pass
                  </span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] font-bold shrink-0">
                    -25%
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={cn("text-base font-extrabold tracking-tight", isQuarterly ? "text-foreground" : "text-muted-foreground")}>
                    $23
                  </span>
                  <span className="text-[10px] text-muted-foreground">/mo</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative",
                  !isQuarterly
                    ? "border-primary bg-background shadow-xs ring-1 ring-primary/20"
                    : "border-transparent hover:bg-background/50 text-muted-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={cn("font-bold text-xs", !isQuarterly ? "text-foreground" : "text-muted-foreground")}>
                    Monthly
                  </span>
                  <span className="text-[9px] text-muted-foreground font-medium">Sprint</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={cn("text-base font-extrabold tracking-tight", !isQuarterly ? "text-foreground" : "text-muted-foreground")}>
                    $29
                  </span>
                  <span className="text-[10px] text-muted-foreground">/mo</span>
                </div>
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="py-2.5 border-y border-border/60">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                  {isQuarterly ? "$69" : "$29"}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {isQuarterly ? "for 3 months ($23/mo)" : "/ month (cancel anytime)"}
                </span>
              </div>
              <p className="text-[11px] text-primary font-medium mt-1">
                {isQuarterly
                  ? "✓ Save 25% with complete 90-day exam season coverage"
                  : "✓ Flexible 30-day intensive sprint · Auto-renews monthly"}
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-foreground/90">
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Full 25Q Practice & 50Q Mock Simulations</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Unlimited Daily AI Test Sessions (No 10Q cap)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>SM-2 Spaced Repetition Priority Queue</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Distractor Traps & Misconception Breakdown</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Cross-Subject Weakness Diagnostic Radar</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 space-y-3">
            <Button
              type="button"
              size="lg"
              disabled={loadingPlan === (isQuarterly ? "quarterly" : "monthly")}
              onClick={() => handlePlanCheckout(isQuarterly ? "quarterly" : "monthly")}
              className="w-full font-bold text-base rounded-xl shadow-md cursor-pointer"
            >
              {loadingPlan === (isQuarterly ? "quarterly" : "monthly") ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : isPro ? (
                "Current Plan"
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2 fill-primary-foreground" />
                  {isQuarterly ? "Get 90-Day Season Pass ($69)" : "Get Monthly Pro ($29)"}
                </>
              )}
            </Button>
            <CompactPaymentTrust />
          </div>
        </div>
      </div>
    </div>
  );
}
