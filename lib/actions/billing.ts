// Path: lib/actions/billing.ts
"use server";

import { z } from "zod";
import { headers } from "next/headers";
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
    const headerList = await headers();
    const host = headerList.get("host") || "";
    const proto = headerList.get("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
    const dynamicOrigin = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || "https://acetheprep.com");
    const returnUrl = parsed.data.redirectUrl || `${dynamicOrigin}/home?upgrade=success`;

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

/**
 * Development & Test Mode bypass action:
 * Instantly activates Pro membership for the authenticated user without requiring
 * external gateway processing. Strictly guarded to test_mode or non-production environments.
 */
export async function activateTestPro(planType: "monthly" | "quarterly" = "quarterly") {
  const isTestAllowed =
    process.env.DODO_PAYMENTS_ENVIRONMENT === "test_mode" ||
    process.env.NODE_ENV !== "production";

  if (!isTestAllowed) {
    return { error: "Test activation is only allowed in test mode or development environments." };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Please sign in to activate test Pro." };
  }

  const { supabaseAdmin } = await import("@/lib/supabase/admin");
  const { revalidatePath } = await import("next/cache");

  const expiryDays = planType === "quarterly" ? 90 : 30;
  const currentPeriodEnd = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString();

  const { error: upsertError } = await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: user.id,
      dodo_subscription_id: `sub_simulated_test_${user.id.slice(0, 8)}`,
      status: "active",
      plan_type: planType,
      product_id: BILLING_PLANS[planType].productId,
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "dodo_subscription_id" }
  );

  if (upsertError) {
    console.error("[activateTestPro Error]:", upsertError);
    return { error: "Failed to activate test Pro subscription in database." };
  }

  revalidatePath("/home");
  revalidatePath("/pricing");

  return { success: true };
}

