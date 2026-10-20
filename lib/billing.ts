// Path: lib/billing.ts
import { createClient } from "@/lib/supabase/server";

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
  } catch {
    return { isPro: false, planType: null };
  }
}
