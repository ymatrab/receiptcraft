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
// 2026-08-29: /tools/receipt-calculator stopped saying an account is needed
// "only to download" — the AI generator needs one too. /tools and the other
// calculator did not change, but they share this constant and the text sits in
// a shared footer note, so one date covers the set honestly.
export const CONTENT_UPDATED = "2026-08-29";
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
// 2026-08-29: /login now leads with the log-in form instead of "Create your
// free account" — the heading, the sub-heading and the form itself all change
// for anyone arriving with a ?next=. Its own constant for the same reason as
// the two above: STATIC_UPDATED also covers /blog, /about, /contact, /authors,
// /privacy and /terms, none of which changed.
// 2026-08-30: "Continue with Google" moved above the email form, so the visible
// order of the page's controls changed.
export const LOGIN_UPDATED = "2026-08-30";
// 2026-08-21: /pricing now shows the watermark it asks people to pay to remove.
// 2026-08-29: the price table moved above that watermark comparison. Measured on
// a 375px phone, the comparison ran 594px to 2,024px and pushed the first price
// to 2,105px — 2.6 screens before anyone saw a number. The page's whole reading
// order changes, which is as visible as a change gets.
// 2026-08-30: four plan cards became two — Free, and one Pro card with the
// billing period as a choice. Every price on the page now also states its
// monthly equivalent, so $3 / $7.99 / $39 stop reading as a rising ladder when
// per month they fall. Different prices, different structure, visible either way.
// 2026-08-30, later the same day: reverted to all four plans on screen at once,
// at the owner's call — comparing them is the point of the page and a selector
// hides two thirds of the options behind a click. The monthly equivalents stay,
// and the entitlements are now stated once beneath the row instead of repeated
// in four columns, which is what keeps the cards uncramped.
export const PRICING_UPDATED = "2026-08-30";
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
