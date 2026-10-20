// Path: app/api/webhooks/dodo/route.ts
import { Webhooks } from "@dodopayments/nextjs";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY || "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPayload: async (payload: any) => {
    try {
      const eventType = payload.type;
      const data = payload.data;
      console.log(`[Dodo Webhook] Event received: ${eventType}`);

      if (eventType === "payment.succeeded" || eventType === "subscription.active") {
        const metadata = data.metadata || {};
        const userId = metadata.user_id;
        const subscriptionId = data.subscription_id || data.payment_id;
        const customerId = data.customer?.customer_id;
        const productId = data.product_cart?.[0]?.product_id || data.product_id;
        const planType = metadata.plan_type || "monthly";

        if (userId && subscriptionId) {
          const { error } = await supabaseAdmin.from("subscriptions").upsert(
            {
              user_id: userId,
              dodo_subscription_id: subscriptionId,
              dodo_customer_id: customerId,
              status: "active",
              plan_type: planType,
              product_id: productId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "dodo_subscription_id" }
          );

          if (error) {
            console.error("[Dodo Webhook] Error upserting subscription:", error);
          } else {
            console.log(`[Dodo Webhook] Successfully activated subscription for user ${userId}`);
          }
        }
      } else if (
        eventType === "subscription.cancelled" ||
        eventType === "subscription.expired"
      ) {
        const subscriptionId = data.subscription_id;
        if (subscriptionId) {
          const newStatus = eventType === "subscription.cancelled" ? "cancelled" : "expired";
          const { error } = await supabaseAdmin
            .from("subscriptions")
            .update({
              status: newStatus,
              updated_at: new Date().toISOString(),
            })
            .eq("dodo_subscription_id", subscriptionId);

          if (error) {
            console.error(`[Dodo Webhook] Error updating status to ${newStatus}:`, error);
          }
        }
      }
    } catch (err) {
      console.error("[Dodo Webhook Handler Exception]:", err);
    }
  },
});
