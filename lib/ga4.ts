import { SITE } from "@/lib/site";

/**
 * GA4 Measurement Protocol — server-side purchase reporting.
 *
 * The browser cannot report the purchase: payment completes on Shopify's domain,
 * so nothing on this site is running when money changes hands. Without a
 * server-side event, checkout→paid conversion is simply unknowable and no growth
 * decision can be evaluated against revenue.
 *
 * The join is the `client_id` from the buyer's `_ga` cookie, captured at
 * begin_checkout and carried through the cart as an order attribute. Without it
 * GA4 would attribute the purchase to a brand-new session and the traffic source
 * that actually produced the sale would be lost.
 */

const ENDPOINT = "https://www.google-analytics.com/mp/collect";

const apiSecret = process.env.GA4_API_SECRET ?? "";
/** Measurement Protocol needs a secret that only exists in GA4 admin. */
export const ga4Configured = apiSecret.length > 0 && SITE.gaId.length > 0;

export interface PurchaseEvent {
  /** From the buyer's _ga cookie, e.g. "1234567890.1234567890". */
  clientId: string;
  /** Shopify order id — GA4 uses this to de-duplicate replayed events. */
  transactionId: string;
  value: number;
  currency: string;
  plan: string;
}

/**
 * Report a completed purchase. Never throws and never blocks fulfilment: an
 * analytics failure must not cause the webhook to return non-2xx, because
 * Shopify would then retry an order that was already granted.
 */
export async function sendPurchase(event: PurchaseEvent): Promise<void> {
  if (!ga4Configured || !event.clientId) return;

  const url = `${ENDPOINT}?measurement_id=${encodeURIComponent(SITE.gaId)}&api_secret=${encodeURIComponent(apiSecret)}`;

  const body = {
    client_id: event.clientId,
    // Without this GA4 stamps the event with arrival time, which spreads a
    // retried webhook across the wrong day.
    timestamp_micros: Date.now() * 1000,
    non_personalized_ads: true,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: event.transactionId,
          value: event.value,
          currency: event.currency,
          items: [{ item_id: event.plan, item_name: event.plan, price: event.value, quantity: 1 }],
        },
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // The Measurement Protocol answers 204 on success and does NOT validate the
    // payload — a malformed event is accepted and silently dropped. Use the
    // /debug/mp/collect endpoint by hand when a purchase fails to appear.
    if (!res.ok) {
      console.warn(`[ga4] purchase ${event.transactionId} rejected: ${res.status}`);
    }
  } catch (err) {
    console.warn(`[ga4] purchase ${event.transactionId} not reported`, err);
  }
}
