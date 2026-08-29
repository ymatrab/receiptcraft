import type { ReceiptTemplate } from "./types";
import { sourcedFigure } from "./templates";
import { hasOfficialSource } from "./intent-pages";
import { LAST_UPDATED } from "./comparisons";

/**
 * When each section of the site was last genuinely reviewed.
 *
 * These used to live only in `app/sitemap.ts`. They moved here so the date a
 * reader sees on the page and the date the sitemap reports to crawlers come
 * from one constant — if they were maintained separately they would drift, and
 * a page claiming to be fresher than its own <lastmod> is worse than showing no
 * date at all.
 *
 * The rule from the sitemap carries over unchanged: bump a constant only when
 * the page's visible content actually changed, and move a page onto a new
 * constant rather than restamping one that also covers untouched pages. A
 * cosmetic restamp is what crawlers learn to ignore.
 */

export const STATIC_UPDATED = "2026-07-20";
export const CONTENT_UPDATED = "2026-08-14";
export const TEMPLATES_UPDATED = "2026-07-20";
export const TEMPLATES_CITED_UPDATED = "2026-08-20";
export const TEMPLATES_FIGURE_UPDATED = "2026-08-21";
// 2026-08-23: all 348 brand pages got a new meta description — the five
// SEO_DESC_VARIANTS that promised "no sign-up to start" one clause after
// promising a download now say an account is needed.
export const BRANDS_UPDATED = "2026-08-23";
export const BRANDS_INDEX_UPDATED = "2026-08-20";
export const INTENT_UPDATED = "2026-08-20";
export const INTENT_CITED_UPDATED = "2026-08-20";
export const EXAMPLES_UPDATED = "2026-07-03";
export const GUIDES_UPDATED = "2026-08-20";
// /guides/receipt-legality — new on 2026-08-21. Its own constant so the new URL
// carries a date newer than the IndexNow cron's last run and is actually
// submitted, without restamping /guides/receipt-anatomy, which did not change.
export const GUIDES_LEGALITY_UPDATED = "2026-08-21";
export const POLICY_UPDATED = "2026-08-20";
// /create and /cookies both sat on STATIC_UPDATED, which also stamps /login,
// /blog, /about, /contact, /authors, /privacy and /terms. Both changed on
// 2026-08-29 — /create renders the homepage FAQ, and /cookies listed the
// ai_free_usage cookie that no longer exists — so they get their own constants
// rather than dragging seven untouched pages into an IndexNow submission.
export const CREATE_UPDATED = "2026-08-29";
export const COOKIES_UPDATED = "2026-08-29";
// 2026-08-21: /pricing now shows the watermark it asks people to pay to remove.
export const PRICING_UPDATED = "2026-08-21";
// 2026-08-23: the hero grid no longer stretches to the 380px receipt, so the
// primary CTA is reachable again on phones under 412px — a visible change to
// the page's most important element.
// 2026-08-28: the "Is Makecepeit free?" FAQ — rendered on the page and in its
// FAQPage JSON-LD — no longer says the AI generator gives 3 generations a day
// with no account. Signed-out visitors now get one; three needs a free account.
// 2026-08-29: superseded the same day — AI now requires an account outright, so
// that FAQ answer changed again. Both the visible copy and the JSON-LD move.
// Also 2026-08-29: the hero carries worked AI examples, so a signed-out visitor
// can still see what the generator does now that using it needs an account.
export const HOME_UPDATED = "2026-08-29";
export const TEMPLATES_INDEX_UPDATED = "2026-08-20";
export const COMPARISONS_UPDATED = LAST_UPDATED;

/**
 * When a template page was last reviewed.
 *
 * Mirrors the sitemap's precedence exactly: a template citing its own rules is
 * the most recently worked, then one carrying a sourced figure, then the rest.
 */
export function templateReviewedAt(t: ReceiptTemplate): string {
  if (t.sources?.length) return TEMPLATES_CITED_UPDATED;
  if (sourcedFigure(t)) return TEMPLATES_FIGURE_UPDATED;
  return TEMPLATES_UPDATED;
}

/** When a receipt-help guide was last reviewed. */
export function intentReviewedAt(brandSlug: string): string {
  return hasOfficialSource(brandSlug) ? INTENT_CITED_UPDATED : INTENT_UPDATED;
}

/** Human-readable form for the visible line. */
export function formatReviewed(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
