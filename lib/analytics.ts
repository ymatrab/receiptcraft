"use client";

/**
 * Lightweight analytics dispatcher. Fires a custom event to both GA4 (gtag)
 * and Microsoft Clarity (as a Clarity event + smart tags for segmentation).
 * Safe to call anywhere on the client — it no-ops on the server and when the
 * trackers haven't loaded yet.
 */

type EventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Which AI assistant, if any, sent this visitor.
 *
 * Hostname suffixes rather than exact matches, so regional and app subdomains
 * (`www.perplexity.ai`, `ios.chat.openai.com`) classify correctly. Ordered
 * most-specific first: google.com must be tested for its AI surfaces before any
 * broader google rule would swallow them.
 */
const AI_REFERRERS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$/i, "chatgpt"],
  [/(^|\.)chat\.openai\.com$/i, "chatgpt"],
  [/(^|\.)openai\.com$/i, "chatgpt"],
  [/(^|\.)perplexity\.ai$/i, "perplexity"],
  [/(^|\.)gemini\.google\.com$/i, "gemini"],
  [/(^|\.)bard\.google\.com$/i, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/i, "copilot"],
  [/(^|\.)claude\.ai$/i, "claude"],
  [/(^|\.)you\.com$/i, "you"],
  [/(^|\.)phind\.com$/i, "phind"],
];

/** Classify a referrer URL into an AI surface, or null if it isn't one. */
export function aiSourceFromReferrer(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname;
    for (const [pattern, name] of AI_REFERRERS) {
      if (pattern.test(host)) return name;
    }
  } catch {
    // Malformed referrer — treat as unknown rather than throwing inside track().
  }
  return null;
}

const AI_SOURCE_KEY = "mkc_ai_source";

/**
 * The AI surface that started this session, remembered for its duration.
 *
 * `document.referrer` is only populated on the landing page — after one
 * client-side navigation it is gone. Without persisting it, an AI visitor would
 * be attributed on their first pageview and appear organic for every event that
 * actually matters (download, upgrade), which is precisely the join this task
 * exists to make.
 *
 * "none" is stored explicitly so a non-AI session is not re-classified later,
 * when a same-tab navigation could make an internal page look like the referrer.
 */
function sessionAiSource(): string | null {
  try {
    const stored = sessionStorage.getItem(AI_SOURCE_KEY);
    if (stored) return stored === "none" ? null : stored;
    const detected = aiSourceFromReferrer(document.referrer);
    sessionStorage.setItem(AI_SOURCE_KEY, detected ?? "none");
    return detected;
  } catch {
    // Private mode / storage disabled — fall back to a best-effort read.
    return aiSourceFromReferrer(document.referrer);
  }
}

export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  // Strip null/undefined so we don't send empty values.
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) clean[k] = v;
  }

  // Stamp every event with the AI surface that started the session, so
  // downloads and upgrades can be split by AI source rather than only pageviews.
  const aiSource = sessionAiSource();
  if (aiSource) clean.ai_source = aiSource;

  // GA4 custom event.
  window.gtag?.("event", event, clean);

  // Clarity: record the event and tag the session for filtering/segmentation.
  window.clarity?.("event", event);
  for (const [k, v] of Object.entries(clean)) {
    window.clarity?.("set", k, String(v));
  }
}

/** Named helpers for the key funnel events, so call sites stay consistent. */
export const analytics = {
  receiptGenerated: (method: "manual" | "ai", template?: string) =>
    track("receipt_generated", { method, template }),
  aiGenerate: (status: "start" | "success" | "error", template?: string) =>
    track("ai_generate", { status, template }),
  receiptDownloaded: (format: "pdf" | "png" | "jpg", template?: string, pro?: boolean) =>
    track("download_receipt", { format, template, pro }),
  beginCheckout: (plan: "weekly" | "monthly" | "yearly", location?: string) =>
    track("begin_checkout", { plan, location }),
  // Buyer came back from checkout. Paired with begin_checkout this is the first
  // honest read on how many started checkouts actually complete — client-side,
  // so it survives fulfilment being manual.
  purchaseLanded: () => track("purchase_landed", {}),
  // Entitlement actually appeared. `seconds` is how long the buyer waited on the
  // activation page — with fulfilment done by hand, this is the only measure of
  // how long that actually takes.
  proActivated: (seconds: number) => track("pro_activated", { seconds }),
  // The post-signup welcome sheet was shown. Pairs with sign_up to confirm the
  // flag survives the redirect, and with upgrade_click{welcome_sheet}.
  welcomeShown: () => track("welcome_shown", {}),
  // A new account landed on /pricing instead of the welcome sheet — the
  // ungated signup path. The two are mutually exclusive, so welcome_shown and
  // this one together should account for every sign_up, and comparing the
  // purchase rate after each is the whole point of splitting them.
  newAccountPricingShown: () => track("new_account_pricing_shown", {}),
  // Which worked example a visitor opened. Tells us whether the hero demo is
  // doing any work now that AI itself needs an account.
  aiDemoOpened: (example: string) => track("ai_demo_opened", { example }),
  upgradeClick: (location: string) => track("upgrade_click", { location }),
  // Both fire only on a confirmed session. Google and email-confirmation links
  // resolve server-side, so app/auth/callback/route.ts marks its redirect and
  // components/AuthEventBeacon.tsx fires these from the destination — otherwise
  // a Google account never appeared in the sign-up funnel at all.
  signIn: (method: string) => track("login", { method }),
  signUp: (method: string) => track("sign_up", { method }),
  // Intent, not success. `login` used to be fired at the click for Google and
  // at the session for a password, which made the two impossible to compare and
  // silently counted everyone who abandoned at Google's account chooser.
  loginAttempt: (method: string) => track("login_attempt", { method }),
  // Why an account could not be created or entered. `reason` is a fixed code
  // from classifyAuthError, never the raw server text and never the address:
  // already_registered, invalid_email, rate_limited, weak_password,
  // signups_disabled, empty_response, other.
  //
  // These exist because sign-ups were failing in production with an empty
  // server body — the whole reason classifyAuthError was written — and nothing
  // recorded it. The funnel showed a sign-up that simply never happened.
  signUpError: (reason: string) => track("sign_up_error", { reason }),
  signInError: (reason: string) => track("login_error", { reason }),
  newsletterSignup: (source: string) => track("newsletter_signup", { source }),
  scrollDepth: (percent: number) => track("scroll_depth", { percent }),

  // ---- builder funnel: where users engage vs. drop off ----
  // How the builder was entered (blank, a chosen template, AI handoff, a
  // restored draft, or a saved/shared receipt link).
  builderOpened: (source: "blank" | "template" | "ai" | "draft" | "receipt") =>
    track("builder_opened", { source }),
  // First real edit the user makes — the key "did they actually try?" signal.
  editStarted: (template?: string) => track("edit_started", { template }),
  selectTemplate: (template: string) => track("select_template", { template }),
  saveReceipt: (target: "account" | "template") =>
    track("save_receipt", { target }),
  // A free user hit the watermark wall on download — the upgrade decision point.
  watermarkPrompt: (format: string) => track("watermark_prompt", { format }),
  // Download intent — fired on every download-button click, before the login or
  // watermark gate. `state` (pro/free/anon) lets us split the preview →
  // download-attempt drop by which gate the user then hits.
  downloadClick: (format: string, state: "pro" | "free" | "anon") =>
    track("download_click", { format, state }),
};
