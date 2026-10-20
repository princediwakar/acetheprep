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
import { createCheckoutSession, activateTestPro } from "@/lib/actions/billing";
import { Copy, Terminal } from "lucide-react";
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
  reason = "Unlock extended practice sets, official full mock tests, and unlimited daily practice.",
  examName,
}: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly">("quarterly");
  const [loading, setLoading] = useState(false);
  const [testActivating, setTestActivating] = useState(false);

  const isTestMode =
    process.env.NEXT_PUBLIC_DODO_PAYMENTS_ENVIRONMENT === "test_mode" ||
    process.env.NODE_ENV !== "production";

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  }

  async function handleTestActivate() {
    setTestActivating(true);
    try {
      const res = await activateTestPro(selectedPlan);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Test Pro activated successfully! Refreshing dashboard...");
        onOpenChange(false);
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to activate test Pro.");
    } finally {
      setTestActivating(false);
    }
  }

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

          {/* Dodo Sandbox Test Mode Banner */}
          {isTestMode && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-amber-500">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Dodo Sandbox Test Mode Active
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  Test Credentials
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                To test live checkout without real charges, use these valid Dodo test cards (do not use real personal cards):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div
                  onClick={() => copyToClipboard("4242424242424242", "Global Test Card")}
                  className="flex items-center justify-between p-2 rounded bg-background/60 border border-border/60 cursor-pointer hover:border-amber-500/50 transition-colors"
                >
                  <div>
                    <span className="font-semibold block text-foreground">Global (US)</span>
                    <span className="font-mono text-muted-foreground">4242 •••• 4242</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </div>
                <div
                  onClick={() => copyToClipboard("4576238912771450", "India Test Card")}
                  className="flex items-center justify-between p-2 rounded bg-background/60 border border-border/60 cursor-pointer hover:border-amber-500/50 transition-colors"
                >
                  <div>
                    <span className="font-semibold block text-foreground">India (IN)</span>
                    <span className="font-mono text-muted-foreground">4576 •••• 1450</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-amber-500/15 text-[11px] text-muted-foreground">
                <span>Exp: <b className="text-foreground font-mono">06/32</b> • CVC: <b className="text-foreground font-mono">123</b></span>
                <button
                  type="button"
                  disabled={testActivating}
                  onClick={handleTestActivate}
                  className="text-amber-500 hover:text-amber-400 font-semibold underline underline-offset-2 transition-colors disabled:opacity-50"
                >
                  {testActivating ? "Activating..." : "⚡ Quick 1-Click Dev Activate"}
                </button>
              </div>
            </div>
          )}
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
