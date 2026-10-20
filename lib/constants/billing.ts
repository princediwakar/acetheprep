// Path: lib/constants/billing.ts

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceUsd: number;
  period: "month" | "quarter";
  billingLabel: string;
  features: string[];
  productId: string; // Dodo Payments Product ID
  highlight?: boolean;
}

export const BILLING_PLANS: Record<"monthly" | "quarterly", PricingPlan> = {
  monthly: {
    id: "monthly",
    name: "Monthly Pro",
    description: "Ideal for final intensive review and rapid score calibration.",
    priceUsd: 29,
    period: "month",
    billingLabel: "$29 / month",
    productId: process.env.NEXT_PUBLIC_DODO_PRODUCT_MONTHLY || "pdt_monthly_pro",
    features: [
      "Unlimited daily test sessions (No 10Q cap)",
      "Full 25Q Practice & 50Q Exam Simulations",
      "Step-by-step solutions & mistake explanations",
      "Smart spaced repetition review schedule",
      "Calibrated exam readiness score forecast",
    ],
  },
  quarterly: {
    id: "quarterly",
    name: "3-Month Exam Season Pass",
    badge: "Most Popular",
    description: "The complete preparation cycle from initial syllabus setup to exam day.",
    priceUsd: 69,
    period: "quarter",
    billingLabel: "$69 / 3 months ($23/mo)",
    productId: process.env.NEXT_PUBLIC_DODO_PRODUCT_QUARTERLY || "pdt_quarterly_pass",
    highlight: true,
    features: [
      "Everything in Monthly Pro",
      "Full 90-day access across your entire exam season",
      "Save 25% compared to monthly billing",
      "Instant AI question generation",
      "Personalized weak-spot diagnosis across all subjects",
    ],
  },
};

export const FREE_TIER_LIMITS = {
  DAILY_MAX_QUESTIONS: 10,
  ALLOWED_SESSION_SIZES: [10],
  ALLOW_CUSTOM_MOCKS: false,
};
