import crypto from "node:crypto";
import type { PlanId } from "@/lib/plans";

/**
 * Shopify order fulfilment helpers.
 *
 * Shopify is the only live payment rail (Stripe is configured but unused), so
 * this is what actually turns money into access. Everything here is server-only
 * — it reads the webhook secret.
 */

export const shopifyWebhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET ?? "";
export const shopifyConfigured = shopifyWebhookSecret.length > 0;

/**
 * Verify a Shopify webhook against the *raw* request body.
 *
 * Shopify signs the exact bytes it sent, so the body must be read as text and
 * passed through untouched — re-serialising the parsed JSON changes key order
 * and whitespace and the signature will never match.
 *
 * timingSafeEqual is used rather than `===` so a wrong signature costs the same
 * time as a right one, and lengths are compared first because timingSafeEqual
 * throws on a length mismatch.
 */
export function verifyShopifyHmac(rawBody: string, headerHmac: string | null): boolean {
  if (!shopifyConfigured || !headerHmac) return false;

  const digest = crypto
    .createHmac("sha256", shopifyWebhookSecret)
    .update(rawBody, "utf8")
    .digest("base64");

  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(headerHmac, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/* -------------------------------------------------------------------------- */
/*  Order shapes — only the fields we actually read                           */
/* -------------------------------------------------------------------------- */

export interface ShopifyLineItem {
  variant_id?: number | string | null;
  sku?: string | null;
  title?: string | null;
  variant_title?: string | null;
  name?: string | null;
}

export interface ShopifyNoteAttribute {
  name?: string | null;
  value?: string | null;
}

export interface ShopifyOrder {
  id?: number | string | null;
  order_number?: number | string | null;
  email?: string | null;
  contact_email?: string | null;
  customer?: { email?: string | null } | null;
  note_attributes?: ShopifyNoteAttribute[] | null;
  line_items?: ShopifyLineItem[] | null;
}

/** The user id we asked the cart permalink to carry, if the buyer kept it. */
export function userIdFromOrder(order: ShopifyOrder): string | null {
  const attr = (order.note_attributes ?? []).find(
    (a) => (a?.name ?? "").toLowerCase() === "user_id"
  );
  const value = (attr?.value ?? "").trim();
  // Guard against an empty attribute or a buyer-edited junk value reaching a
  // uuid column — a malformed id would throw on insert rather than fall back.
  return /^[0-9a-f-]{36}$/i.test(value) ? value : null;
}

/** Buyer email, checked across the three places Shopify may put it. */
export function emailFromOrder(order: ShopifyOrder): string | null {
  const email = order.email ?? order.contact_email ?? order.customer?.email ?? "";
  return email.trim().toLowerCase() || null;
}

/* -------------------------------------------------------------------------- */
/*  Variant → plan                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Explicit variant/SKU → plan overrides, configured in /admin/settings.
 *
 * The real variant ids live in the Shopify store, not in this repo, so they
 * cannot be hard-coded here. The map is the authoritative path; the keyword
 * fallback below only exists so a store that has not been mapped yet still
 * fulfils orders instead of sending every one to pending_orders.
 */
export type VariantPlanMap = Record<string, PlanId>;

const PLAN_KEYWORDS: [RegExp, PlanId][] = [
  [/\b(week|weekly|7[\s-]?day)\b/i, "pro_weekly"],
  [/\b(year|yearly|annual|annually|12[\s-]?month)\b/i, "pro_yearly"],
  [/\b(month|monthly|30[\s-]?day)\b/i, "pro_monthly"],
];

/**
 * Resolve the plan a line item grants.
 *
 * Yearly is tested before monthly on purpose: "12 months" and "$39/year billed
 * monthly" both contain "month", and mis-reading a yearly purchase as monthly
 * would quietly short-change a customer by eleven months.
 */
export function planFromLineItem(
  item: ShopifyLineItem,
  map: VariantPlanMap = {}
): PlanId | null {
  const keys = [item.variant_id, item.sku]
    .map((k) => (k == null ? "" : String(k).trim()))
    .filter(Boolean);

  for (const key of keys) {
    const mapped = map[key];
    if (mapped) return mapped;
  }

  const haystack = [item.sku, item.variant_title, item.title, item.name]
    .filter(Boolean)
    .join(" ");
  for (const [pattern, plan] of PLAN_KEYWORDS) {
    if (pattern.test(haystack)) return plan;
  }
  return null;
}

/** The best plan in an order — the longest, if someone buys more than one. */
const PLAN_RANK: Record<PlanId, number> = {
  free: 0,
  pro_weekly: 1,
  pro_monthly: 2,
  pro_yearly: 3,
};

export function planFromOrder(order: ShopifyOrder, map: VariantPlanMap = {}): PlanId | null {
  let best: PlanId | null = null;
  for (const item of order.line_items ?? []) {
    const plan = planFromLineItem(item, map);
    if (plan && (!best || PLAN_RANK[plan] > PLAN_RANK[best])) best = plan;
  }
  return best;
}

/**
 * When access bought now should end.
 *
 * Extends from an existing unexpired end date rather than from today, so buying
 * a second pass before the first runs out adds to it instead of truncating it.
 */
export function periodEndFor(plan: PlanId, existingEnd?: string | null): Date {
  const now = Date.now();
  const from = existingEnd ? new Date(existingEnd) : null;
  const base =
    from && !Number.isNaN(from.getTime()) && from.getTime() > now ? new Date(from) : new Date(now);

  if (plan === "pro_weekly") base.setDate(base.getDate() + 7);
  else if (plan === "pro_monthly") base.setMonth(base.getMonth() + 1);
  else if (plan === "pro_yearly") base.setFullYear(base.getFullYear() + 1);
  return base;
}
