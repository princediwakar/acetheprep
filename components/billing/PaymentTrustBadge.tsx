// Path: components/billing/PaymentTrustBadge.tsx
import { ShieldCheck, Lock, RefreshCw, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standardized Payment Method Card Badges:
 * Built according to official brand guidelines with calibrated vector geometry.
 * Sized uniformly as crisp card tiles with subtle borders and shadows.
 */

export function VisaBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-white border border-zinc-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1",
        className
      )}
      title="Visa"
      aria-label="Visa"
    >
      <svg viewBox="0 0 48 16" className="h-3 sm:h-3.5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.5 15.2L22.3 1.1H25.8L23 15.2H19.5ZM35.3 1.4C34.6 1.1 33.5 0.8 32.1 0.8C28.6 0.8 26.1 2.6 26.1 5.3C26.1 7.2 27.8 8.3 29.1 9C30.4 9.6 30.9 10 30.9 10.6C30.9 11.5 29.8 11.9 28.8 11.9C27.4 11.9 26.6 11.7 25.4 11.2L24.9 11L24.4 14.1C25.3 14.5 26.9 14.8 28.5 14.8C32.3 14.8 34.7 12.9 34.7 10C34.7 8.4 33.7 7.2 31.7 6.2C30.5 5.6 29.7 5.2 29.7 4.6C29.7 4 30.4 3.4 31.8 3.4C33 3.4 33.9 3.6 34.6 3.9L35 4.1L35.3 1.4ZM45.2 1.1H42.5C41.7 1.1 41 1.3 40.7 2.2L34.8 15.2H38.5L39.2 13.2H43.7L44.1 15.2H47.4L45.2 1.1ZM40.3 10.4C40.6 9.6 42.1 5.4 42.1 5.4C42.1 5.4 42.5 4.3 42.7 3.7L43 5.3C43 5.3 43.9 9.6 44 10.4H40.3ZM15.9 1.1L12.5 10.7L12.1 8.8C11.5 6.6 9.5 4.3 7.2 3.1L10.4 15.2H14.1L19.6 1.1H15.9ZM8.2 1.1H2.4L2.3 1.4C6.8 2.5 9.8 5.4 11 8.9L9.9 2.4C9.7 1.4 9 1.1 8.2 1.1Z"
          fill="#1434CB"
        />
      </svg>
    </div>
  );
}

export function MastercardBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-white border border-zinc-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1",
        className
      )}
      title="Mastercard"
      aria-label="Mastercard"
    >
      <svg viewBox="0 0 32 20" className="h-3.5 sm:h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="#EB001B" />
        <circle cx="22" cy="10" r="8" fill="#F79E1B" />
        <path d="M16 4.71a8 8 0 0 1 0 10.58 8 8 0 0 1 0-10.58z" fill="#FF5F00" />
      </svg>
    </div>
  );
}

export function AmexBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-[#006FCF] border border-[#006FCF] shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1 text-white",
        className
      )}
      title="American Express"
      aria-label="American Express"
    >
      <span className="font-black tracking-tight text-[9px] sm:text-[10px] font-sans leading-none">
        AMEX
      </span>
    </div>
  );
}

export function ApplePayBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-black border border-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1 text-white",
        className
      )}
      title="Apple Pay"
      aria-label="Apple Pay"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 sm:h-4 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <title>Apple Pay</title>
        <path d="M2.15 4.318a42.16 42.16 0 0 0-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 0 0-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 0 0 0 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 0 0 .63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 0 0 .631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 0 0-.04-.452 1.446 1.446 0 0 0-1.2-1.201 3.022 3.022 0 0 0-.452-.04 10.448 10.448 0 0 0-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 0 1 .407.407.997.997 0 0 1 .094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 0 1-.5.693 1.002 1.002 0 0 1-.286.094 2.598 2.598 0 0 1-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 0 1-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 0 1-.406-.407 1.006 1.006 0 0 1-.094-.288 2.531 2.531 0 0 1-.032-.373 9.588 9.588 0 0 1-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 0 1 .407-.406 1.03 1.03 0 0 1 .287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 0 0-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 0 0-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z" />
      </svg>
    </div>
  );
}

export function GooglePayBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-white border border-zinc-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1",
        className
      )}
      title="Google Pay"
      aria-label="Google Pay"
    >
      <svg viewBox="0 0 24 24" className="h-3 sm:h-3.5 w-auto" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#4285F4"
          d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033z"
        />
        <path
          fill="#34A853"
          d="M10.464 7.785v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0z"
        />
        <path
          fill="#FBBC05"
          d="M17.015 9.81c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39z"
        />
        <path
          fill="#EA4335"
          d="M19.132 12.332c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26z"
        />
      </svg>
    </div>
  );
}

export function UpiBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 w-10 sm:h-7 sm:w-11 rounded bg-white border border-zinc-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] shrink-0 px-1",
        className
      )}
      title="UPI (Unified Payments Interface)"
      aria-label="UPI"
    >
      <svg viewBox="0 0 120 60" className="h-3 sm:h-3.5 w-auto" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
        <path d="M95.678 42.9L110 29.835l-6.784-13.516z" fill="#097939" />
        <path d="M90.854 42.9l14.322-13.065-6.784-13.516z" fill="#ed752e" />
        <path
          d="M22.41 16.47l-6.03 21.475 21.407.15 5.88-21.625h5.427l-7.05 25.14c-.27.96-1.298 1.74-2.295 1.74H12.31c-1.664 0-2.65-1.3-2.2-2.9l6.724-23.98zm66.182-.15h5.427l-7.538 27.03h-5.58zM49.698 27.582l27.136-.15 1.81-5.707H51.054l1.658-5.256 29.4-.27c1.83-.017 2.92 1.4 2.438 3.167L81.78 29.49c-.483 1.766-2.36 3.197-4.19 3.197H53.316L50.454 43.8h-5.28z"
          fill="#1E293B"
        />
      </svg>
    </div>
  );
}

/**
 * Compact Payment Trust Bar:
 * Displays recognized payment method card tiles and MoR compliance.
 * Placed directly below checkout buttons in PricingCards & UpgradeModal.
 */
export function CompactPaymentTrust({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2 pt-2", className)}>
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <VisaBadge />
        <MastercardBadge />
        <AmexBadge />
        <ApplePayBadge />
        <GooglePayBadge />
        <UpiBadge />
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
        <div className="flex items-center gap-1.5 flex-wrap">
          <VisaBadge />
          <MastercardBadge />
          <AmexBadge />
          <ApplePayBadge />
          <GooglePayBadge />
          <UpiBadge />
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
