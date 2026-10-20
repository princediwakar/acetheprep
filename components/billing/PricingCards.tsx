// Path: components/billing/PricingCards.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BILLING_PLANS } from "@/lib/constants/billing";
import { createCheckoutSession } from "@/lib/actions/billing";
import { cn } from "@/lib/utils";

interface PricingCardsProps {
  userEmail?: string | null;
  isPro?: boolean;
}

export function PricingCards({ userEmail, isPro }: PricingCardsProps) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "quarterly" | null>(null);

  async function handlePlanCheckout(planType: "monthly" | "quarterly") {
    if (!userEmail) {
      // Guest: redirect to setup with plan prefill
      router.push(`/setup?plan=${planType}`);
      return;
    }

    if (isPro) {
      router.push("/dashboard");
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
      {/* 1. Free Starter */}
      <div className="rounded-3xl border border-border/80 bg-card p-7 flex flex-col justify-between shadow-sm relative">
        <div className="space-y-4">
          <div>
            <Badge variant="outline" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Free Tier
            </Badge>
            <h3 className="text-2xl font-bold text-foreground">Starter</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Perfect for initial diagnostic calibration and daily habit building.
            </p>
          </div>

          <div className="flex items-baseline gap-1 py-2 border-y border-border/60">
            <span className="text-4xl font-extrabold text-foreground">$0</span>
            <span className="text-sm text-muted-foreground">/ forever</span>
          </div>

          <ul className="space-y-3 text-sm text-foreground/90">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>10-Question Sprint Sessions</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Step-by-Step Solutions & Trap Breakdown</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Baseline Exam Readiness Index</span>
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Check className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              <span>Standard accuracy and error tracking</span>
            </li>
          </ul>
        </div>

        <div className="pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full font-semibold rounded-xl"
            onClick={() => router.push(userEmail ? "/dashboard" : "/setup")}
          >
            {userEmail ? "Go to Dashboard" : "Start Free Sprint"}
          </Button>
        </div>
      </div>

      {/* 2. 3-Month Season Pass (Primary Highlight) */}
      <div className="rounded-3xl border-2 border-primary bg-gradient-to-b from-primary/10 via-card to-card p-7 flex flex-col justify-between shadow-xl relative ring-4 ring-primary/10">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground text-xs uppercase font-extrabold tracking-wider px-3 py-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
            Most Popular · 90-Day Pass
          </Badge>
        </div>

        <div className="space-y-4 pt-1">
          <div>
            <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/40 bg-primary/10 uppercase tracking-wider mb-2">
              Best Value
            </Badge>
            <h3 className="text-2xl font-black text-foreground">Exam Season Pass</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The complete preparation cycle from diagnostic to test day.
            </p>
          </div>

          <div className="flex items-baseline gap-1 py-2 border-y border-border/60">
            <span className="text-4xl font-extrabold text-foreground">$69</span>
            <span className="text-sm text-muted-foreground">/ 3 months ($23/mo)</span>
          </div>

          <ul className="space-y-3 text-sm text-foreground/90">
            <li className="flex items-center gap-2.5 font-medium">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Full 25Q Practice & 50Q Mock Simulations</span>
            </li>
            <li className="flex items-center gap-2.5 font-medium">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Unlimited Daily AI Test Sessions</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>SM-2 Spaced Repetition Priority Queue</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Step-by-Step Solutions & Trap Explanations</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Save 25% compared to monthly billing</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 space-y-2">
          <Button
            type="button"
            size="lg"
            disabled={loadingPlan === "quarterly"}
            onClick={() => handlePlanCheckout("quarterly")}
            className="w-full font-bold text-base rounded-xl shadow-md"
          >
            {loadingPlan === "quarterly" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : isPro ? (
              "Current Plan"
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2 fill-primary-foreground" />
                Get 3-Month Pass ($69)
              </>
            )}
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Cards, Apple Pay & UPI via Dodo Payments</span>
          </div>
        </div>
      </div>

      {/* 3. Monthly Pro */}
      <div className="rounded-3xl border border-border/80 bg-card p-7 flex flex-col justify-between shadow-sm relative">
        <div className="space-y-4">
          <div>
            <Badge variant="outline" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Monthly Pro
            </Badge>
            <h3 className="text-2xl font-bold text-foreground">Monthly</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ideal for final 30-day sprint reviews and rapid score boosts.
            </p>
          </div>

          <div className="flex items-baseline gap-1 py-2 border-y border-border/60">
            <span className="text-4xl font-extrabold text-foreground">$29</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>

          <ul className="space-y-3 text-sm text-foreground/90">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full 25Q Practice & 50Q Mock Simulations</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Unlimited Daily AI Test Sessions</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>SM-2 Spaced Repetition Queue</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Step-by-Step Solutions & Trap Explanations</span>
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Check className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              <span>Cancel anytime with 1 click</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 space-y-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={loadingPlan === "monthly"}
            onClick={() => handlePlanCheckout("monthly")}
            className="w-full font-bold rounded-xl border-primary/30 text-primary hover:bg-primary/10"
          >
            {loadingPlan === "monthly" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : isPro ? (
              "Current Plan"
            ) : (
              "Get Monthly Pro ($29)"
            )}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Auto-renews monthly. Cancel in 1 click.
          </p>
        </div>
      </div>
    </div>
  );
}
