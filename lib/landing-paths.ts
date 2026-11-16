/**
 * Which pages sell, shared by the browser tracker (lib/analytics.ts
 * recordSellReached) and the landings metric (lib/landing-metrics.ts).
 *
 * Deliberately framework-free with no imports, like lib/analytics-events.ts:
 * the client and the server must agree on what a sell page is, or the hand-off
 * number measures something the tracker never sent.
 *
 * Kept in step with the "sell" page classes in Command Center's Strategy page:
 * home, the builder, brand / template / example pages and their hubs, pricing,
 * comparisons. Every other page — /receipt-help/*, /blog/*, /guides, /tools,
 * legal — has the job of handing visitors on to one of these.
 */
export const SELL_PATH_PATTERNS: readonly RegExp[] = [
  /^\/$/,
  /^\/create$/,
  /^\/brands(\/[^/]+)?$/,
  /^\/templates(\/[^/]+)?$/,
  // /examples/page/2 is pagination, not an example.
  /^\/examples(\/(?!page$)[^/]+)?$/,
  /^\/pricing$/,
  /^\/compare\/[^/]+$/,
  /^\/alternatives$/,
];

/**
 * A landing path in one canonical form: no origin, query or fragment,
 * lower-case, no trailing slash ("/" stays "/"), at most 120 characters (the
 * cap the visit tracker already applies).
 */
export function normalizeLandingPath(raw: string | null | undefined): string {
  let path = (raw ?? "").trim();
  path = path.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]*/i, "");
  path = path.split(/[?#]/)[0].toLowerCase();
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/+$/, "");
  return (path || "/").slice(0, 120);
}

export function isSellPath(raw: string | null | undefined): boolean {
  const path = normalizeLandingPath(raw);
  return SELL_PATH_PATTERNS.some((p) => p.test(path));
}

/**
 * Events that can only happen on a sell page, so a session that has one has
 * reached a sell page.
 *
 * - `sell_reached` — sent by recordSellReached the first time a session views
 *   a sell page other than its landing page (recorded since this metric
 *   shipped, 2026-11).
 * - the builder events — fired by components/builder/SectionBuilder.tsx, which
 *   only /create renders. `receipt_downloaded` is the server's record of a
 *   builder download.
 * - `ai_generate` — the builder and the home page's AI generator.
 * - `begin_checkout` — the builder, the home AI and /pricing.
 *
 * Before `sell_reached` existed, these were the only trace of a visitor moving
 * on, so for older days the hand-off counts only visitors who opened the
 * builder, used the home AI or started a checkout — a lower bound.
 */
export const SELL_EVENTS = [
  "sell_reached",
  "builder_opened",
  "edit_started",
  "select_template",
  "receipt_completed",
  "download_click",
  "paywall_shown",
  "receipt_downloaded",
  "ai_generate",
  "begin_checkout",
] as const;
