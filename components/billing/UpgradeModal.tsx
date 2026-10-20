// Path: components/billing/UpgradeModal.tsx
"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BILLING_PLANS } from "@/lib/constants/billing";
import { createCheckoutSession } from "@/lib/actions/billing";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: string;
  examName?: string;
}

export function UpgradeModal({
  open,
  onOpenChange,
  reason = "Unlock 25Q and 50Q full mock simulations and unlimited daily practice.",
  examName,
}: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly">("quarterly");
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await createCheckoutSession({
        planType: selectedPlan,
      });

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }

      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to launch checkout.");
      setLoading(false);
    }
  }

  const monthlyPlan = BILLING_PLANS.monthly;
  const quarterlyPlan = BILLING_PLANS.quarterly;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0 border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="p-6 pb-5 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-border/60">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/25 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-primary inline" />
              AceThePrep Pro
            </Badge>
            {examName && (
              <Badge variant="outline" className="text-xs">
                {examName} Track
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
            Fast-Track Your Exam Target
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {reason}
          </DialogDescription>
        </div>

        {/* Plan Cards */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Quarterly Plan (Highlight) */}
            <div
              onClick={() => setSelectedPlan("quarterly")}
              className={cn(
                "cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between",
                selectedPlan === "quarterly"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-md"
                  : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
              )}
            >
              <div className="absolute -top-2.5 right-3">
                <Badge className="bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-wider px-2 shadow-sm">
                  Best Value
                </Badge>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Exam Season Pass
                </span>
                <div className="flex items-baseline gap-1 mt-1 mb-1">
                  <span className="text-2xl font-black text-foreground">$69</span>
                  <span className="text-xs text-muted-foreground">/ 3 months</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Full 90-day cycle ($23/mo). Ideal for GMAT, CFA, and SAT candidates.
                </p>
              </div>
            </div>

            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan("monthly")}
              className={cn(
                "cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between",
                selectedPlan === "monthly"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-md"
                  : "border-border hover:border-border/80 bg-background/50 text-muted-foreground"
              )}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Monthly Pro
                </span>
                <div className="flex items-baseline gap-1 mt-1 mb-1">
                  <span className="text-2xl font-black text-foreground">$29</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Flexible month-to-month access. Cancel anytime in 1 click.
                </p>
              </div>
            </div>
          </div>

          {/* Included Features */}
          <div className="rounded-xl bg-muted/40 p-4 border border-border/60 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Included with Pro Membership:
            </span>
            {(selectedPlan === "quarterly" ? quarterlyPlan.features : monthlyPlan.features).map((feat) => (
              <div key={feat} className="flex items-center gap-2.5 text-xs text-foreground/90">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-3 bg-muted/20 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure checkout via Dodo Payments (Cards & UPI)</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              Maybe Later
            </Button>
            <Button
              type="button"
              size="lg"
              disabled={loading}
              onClick={handleCheckout}
              className="font-bold px-6 w-full sm:w-auto shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2 fill-primary-foreground" />
                  Upgrade to Pro ({selectedPlan === "quarterly" ? "$69" : "$29"})
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
