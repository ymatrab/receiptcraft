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
export const BRANDS_UPDATED = "2026-08-20";
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
// 2026-08-21: /pricing now shows the watermark it asks people to pay to remove.
export const PRICING_UPDATED = "2026-08-21";
export const HOME_UPDATED = "2026-08-20";
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
