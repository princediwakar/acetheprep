// Path: components/billing/PaymentTrustBadge.tsx
import { ShieldCheck, Lock, RefreshCw, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * High-fidelity, lightweight SVG payment method icons.
 * Styled with subtle monochrome/tint that works seamlessly in light & dark themes.
 */

export function VisaIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 12" fill="currentColor" aria-label="Visa">
      <path d="M14.53 11.23l2.25-10.45h2.64l-2.25 10.45h-2.64zm9.46-10.23c-.53-.2-1.35-.42-2.38-.42-2.62 0-4.47 1.34-4.48 3.27-.02 1.42 1.32 2.21 2.32 2.68 1.03.48 1.37.79 1.37 1.22 0 .66-.82.96-1.58.96-1.05 0-1.62-.15-2.48-.52l-.35-.16-.38 2.26c.63.28 1.8.52 3.01.53 2.78 0 4.59-1.32 4.61-3.36.01-1.12-.7-1.98-2.23-2.68-.93-.46-1.5-.77-1.5-1.24 0-.42.49-.86 1.54-.86.88-.02 1.51.18 2 .4l.24.11.45-2.15zm8.56 6.94l1.24-5.83.71 3.32c.12.57.16.78.16.78l-2.11 1.73zm3.11-7.16h-2.04c-.63 0-1.11.18-1.39.81l-3.95 9.17h2.78l.55-1.48h3.39l.32 1.48h2.45l-2.11-9.98zm-15.01 0l-2.58 6.78-.28-1.34c-.48-1.58-1.98-3.3-3.66-4.16l2.38 8.7h2.79l4.15-9.98h-2.8z" />
    </svg>
  );
}

export function MastercardIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 20" fill="none" aria-label="Mastercard">
      <circle cx="11" cy="10" r="8" fill="#EB001B" />
      <circle cx="21" cy="10" r="8" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

export function AmexIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center justify-center font-black tracking-tighter text-[10px] px-1 py-0.5 rounded bg-sky-600 text-white leading-none font-mono", className)}>
      AMEX
    </span>
  );
}

export function ApplePayIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 16" fill="currentColor" aria-label="Apple Pay">
      <path d="M4.65 4.58c.36-.45.61-1.07.54-1.69-.53.02-1.16.35-1.53.79-.34.39-.62 1.01-.54 1.62.58.05 1.18-.28 1.53-.72zm.54 1.73c-.86-.05-1.59.48-1.99.48-.41 0-1.04-.45-1.72-.44-.89.01-1.71.52-2.16 1.32-.93 1.61-.24 3.99.66 5.29.44.64.97 1.34 1.66 1.32.66-.03.92-.43 1.72-.43.8 0 1.03.43 1.72.41.71-.01 1.16-.64 1.59-1.28.51-.73.71-1.45.73-1.49-.02-.01-1.39-.54-1.4-2.14-.02-1.33 1.09-1.97 1.14-2-.62-.91-1.58-1.02-1.92-1.04h-.03zm5.66-4.52h3.29c1.97 0 3.23 1.34 3.23 3.32 0 2-1.29 3.35-3.27 3.35h-1.53v3.74h-1.72V1.79zm1.72 5.17h1.41c1.07 0 1.73-.67 1.73-1.84 0-1.16-.66-1.82-1.73-1.82h-1.41v3.66zm6.39 5.56c-.02-.63.45-1.19 1.19-1.23.75-.04 1.25.47 1.28 1.09.02.64-.46 1.2-1.2 1.23-.74.03-1.25-.47-1.27-1.09zm.41-3.32c0-.52.41-.95.95-.95.54 0 .94.43.94.95v.02c0 .52-.41.95-.95.95-.53 0-.94-.43-.94-.95v-.02zm3.32-3.07h1.66l2.12 5.56 2.12-5.56h1.66l-3.04 7.22h-1.48l-3.04-7.22z" />
    </svg>
  );
}

export function GooglePayIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[11px] font-bold font-sans tracking-tight text-foreground", className)}>
      <span className="text-blue-500">G</span>
      <span className="text-muted-foreground">Pay</span>
    </span>
  );
}

export function UpiIcon({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center justify-center font-black tracking-wider text-[9px] px-1.5 py-0.5 rounded bg-emerald-700/80 text-white font-mono leading-none", className)}>
      UPI
    </span>
  );
}

/**
 * Compact Payment Trust Bar:
 * Displays recognizable payment method rails and MoR compliance.
 * Placed directly below checkout buttons in PricingCards & UpgradeModal.
 */
export function CompactPaymentTrust({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2 pt-1", className)}>
      <div className="flex items-center justify-center gap-2.5 opacity-80 transition-opacity hover:opacity-100 flex-wrap">
        <span className="text-[10px] uppercase font-semibold text-muted-foreground mr-0.5">
          Accepted:
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <VisaIcon className="h-3.5 w-auto" />
          <MastercardIcon className="h-3.5 w-auto" />
          <AmexIcon />
          <ApplePayIcon className="h-3 w-auto" />
          <GooglePayIcon />
          <UpiIcon />
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>
          256-bit SSL • Processed by <b>Dodo Payments</b> (Merchant of Record)
        </span>
      </div>
    </div>
  );
}

/**
 * Full Institutional Trust & Security Banner:
 * Placed on the main Pricing page to reassure students and parents.
 */
export function FullPaymentTrustBanner({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 space-y-6 shadow-xs", className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Security & Buyer Protection
          </span>
          <h3 className="text-lg font-bold text-foreground mt-0.5">
            Transparent, Zero-Friction Billing
          </h3>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <VisaIcon className="h-4 w-auto text-muted-foreground" />
          <MastercardIcon className="h-4 w-auto" />
          <AmexIcon />
          <ApplePayIcon className="h-3.5 w-auto text-foreground" />
          <GooglePayIcon />
          <UpiIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1.5 p-3.5 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>PCI-DSS Level 1</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            All transactions are 256-bit encrypted. We never store or handle raw credit card numbers.
          </p>
        </div>

        <div className="space-y-1.5 p-3.5 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Global MoR Compliance</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Dodo Payments acts as our licensed Merchant of Record, handling global VAT, sales tax, and regional compliance.
          </p>
        </div>

        <div className="space-y-1.5 p-3.5 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <RefreshCw className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>1-Click Cancellation</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Zero customer-service hoops. Cancel your subscription anytime with 1 click directly from your billing portal.
          </p>
        </div>

        <div className="space-y-1.5 p-3.5 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Academic Data Privacy</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Your diagnostic mistakes and mock scores are strictly confidential. We never sell data to test makers or recruiters.
          </p>
        </div>
      </div>
    </div>
  );
}
