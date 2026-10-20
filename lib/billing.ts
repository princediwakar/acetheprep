// Path: lib/billing.ts
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { dodo } from "@/lib/dodo";

export interface UserSubscriptionStatus {
  isPro: boolean;
  planType: "monthly" | "quarterly" | null;
  subscriptionId?: string;
  currentPeriodEnd?: string | null;
}

export async function getUserSubscriptionStatus(userId: string): Promise<UserSubscriptionStatus> {
  if (!userId) {
    return { isPro: false, planType: null };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("status, plan_type, dodo_subscription_id, current_period_end")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { isPro: false, planType: null };
    }

    // Verify expiry if present
    if (data.current_period_end) {
      const expiry = new Date(data.current_period_end).getTime();
      if (expiry < Date.now()) {
        return { isPro: false, planType: null };
      }
    }

    return {
      isPro: true,
      planType: (data.plan_type as "monthly" | "quarterly") || "monthly",
      subscriptionId: data.dodo_subscription_id,
      currentPeriodEnd: data.current_period_end,
    };
  } catch (err) {
    console.error("[getUserSubscriptionStatus Error]:", err);
    return { isPro: false, planType: null };
  }
}

/**
 * Synchronizes checkout status directly with Dodo Payments API.
 * Ensures instant Pro activation on redirect even when webhooks are delayed or
 * blocked on localhost development environments.
 */
export async function syncCheckoutSession(
  userId: string,
  hints?: { subscriptionId?: string; paymentId?: string }
): Promise<UserSubscriptionStatus> {
  if (!userId) {
    return { isPro: false, planType: null };
  }

  try {
    // 1. If subscriptionId is provided, verify directly with Dodo
    if (hints?.subscriptionId) {
      try {
        const sub = await dodo.subscriptions.retrieve(hints.subscriptionId);
        if (sub && (sub.status === "active" || sub.status === "pending")) {
          // Verify ownership: metadata user_id matches
          if (!sub.metadata?.user_id || sub.metadata.user_id === userId) {
            const planType = (sub.metadata?.plan_type as "monthly" | "quarterly") || "monthly";
            await supabaseAdmin.from("subscriptions").upsert(
              {
                user_id: userId,
                dodo_subscription_id: sub.subscription_id,
                dodo_customer_id: sub.customer?.customer_id,
                status: "active",
                plan_type: planType,
                product_id: sub.product_id,
                current_period_end: sub.next_billing_date || null,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "dodo_subscription_id" }
            );

            return {
              isPro: true,
              planType,
              subscriptionId: sub.subscription_id,
              currentPeriodEnd: sub.next_billing_date || null,
            };
          }
        }
      } catch (subErr) {
        console.warn("[syncCheckoutSession] Subscription retrieve failed:", subErr);
      }
    }

    // 2. If paymentId is provided, verify payment with Dodo
    if (hints?.paymentId) {
      try {
        const payment = await dodo.payments.retrieve(hints.paymentId);
        if (payment && payment.status === "succeeded") {
          if (!payment.metadata?.user_id || payment.metadata.user_id === userId) {
            const planType = (payment.metadata?.plan_type as "monthly" | "quarterly") || "monthly";
            const subId = payment.subscription_id || payment.payment_id;
            const productId = payment.product_cart?.[0]?.product_id;

            await supabaseAdmin.from("subscriptions").upsert(
              {
                user_id: userId,
                dodo_subscription_id: subId,
                dodo_customer_id: payment.customer?.customer_id,
                status: "active",
                plan_type: planType,
                product_id: productId,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "dodo_subscription_id" }
            );

            return {
              isPro: true,
              planType,
              subscriptionId: subId,
            };
          }
        }
      } catch (payErr) {
        console.warn("[syncCheckoutSession] Payment retrieve failed:", payErr);
      }
    }

    // Fall back to reading the database
    return await getUserSubscriptionStatus(userId);
  } catch (err) {
    console.error("[syncCheckoutSession Exception]:", err);
    return await getUserSubscriptionStatus(userId);
  }
}

