// Path: lib/actions/billing.ts
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { dodo } from "@/lib/dodo";
import { BILLING_PLANS } from "@/lib/constants/billing";

const CheckoutPlanSchema = z.object({
  planType: z.enum(["monthly", "quarterly"]),
  redirectUrl: z.string().optional(),
});

export async function createCheckoutSession(params: {
  planType: "monthly" | "quarterly";
  redirectUrl?: string;
}) {
  const parsed = CheckoutPlanSchema.safeParse(params);
  if (!parsed.success) {
    return { error: "Invalid billing plan selected." };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Please sign in to proceed with checkout." };
  }

  const plan = BILLING_PLANS[parsed.data.planType];
  if (!plan) {
    return { error: "Plan configuration not found." };
  }

  if (!process.env.DODO_PAYMENTS_API_KEY) {
    return {
      error: "Dodo Payments is not configured yet. Please add DODO_PAYMENTS_API_KEY to your environment variables.",
    };
  }

  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || "https://acetheprep.com";
    const returnUrl = parsed.data.redirectUrl || `${origin}/dashboard?upgrade=success`;

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: plan.productId,
          quantity: 1,
        },
      ],
      customer: {
        email: user.email || "",
      },
      metadata: {
        user_id: user.id,
        plan_type: parsed.data.planType,
      },
      return_url: returnUrl,
    });

    if (!session.checkout_url) {
      return { error: "Failed to generate checkout link from Dodo Payments." };
    }

    return { checkoutUrl: session.checkout_url };
  } catch (err: unknown) {
    console.error("[Dodo Checkout Error]:", err);
    const message = err instanceof Error ? err.message : "Failed to initiate payment session.";
    return { error: message };
  }
}
