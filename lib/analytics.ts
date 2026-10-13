"use client";

import { BOT_UA, isMirroredEvent } from "@/lib/analytics-events";

/**
 * Lightweight analytics dispatcher. Fires a custom event to GA4 (gtag),
 * Microsoft Clarity (as a Clarity event + smart tags for segmentation), and
 * our own `events` table via /api/events. Safe to call anywhere on the client
 * — it no-ops on the server and when the trackers haven't loaded yet.
 *
 * The first-party copy is what the admin dashboard reads. GA4 and Clarity
 * answer "how many"; only our own table can answer "which member", because it
 * is the one store where an event sits next to the account that produced it.
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

/**
 * Where a visitor came from, as one short label: a search engine, an AI
 * assistant, a social network, "referral" for any other site, or "direct".
 *
 * An explicit `utm_source` wins, so a tagged Pinterest pin or newsletter link
 * is credited to the campaign rather than to whatever app opened it.
 */
const SEARCH_AND_SOCIAL: [RegExp, string][] = [
  [/(^|\.)bing\.com$/i, "bing"],
  [/(^|\.)duckduckgo\.com$/i, "duckduckgo"],
  [/(^|\.)search\.yahoo\.com$|(^|\.)yahoo\.com$/i, "yahoo"],
  [/(^|\.)yandex\./i, "yandex"],
  [/(^|\.)ecosia\.org$/i, "ecosia"],
  [/(^|\.)search\.brave\.com$/i, "brave"],
  // After the AI rules: gemini.google.com is an assistant, not a search.
  [/(^|\.)google\.[a-z.]+$/i, "google"],
  [/(^|\.)pinterest\.[a-z.]+$|(^|\.)pin\.it$/i, "pinterest"],
  [/(^|\.)facebook\.com$|(^|\.)fb\.com$|(^|\.)instagram\.com$/i, "meta"],
  [/(^|\.)reddit\.com$/i, "reddit"],
  [/(^|\.)t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/i, "x"],
  [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/i, "youtube"],
  [/(^|\.)tiktok\.com$/i, "tiktok"],
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/i, "linkedin"],
];

export function trafficSource(referrer: string | null | undefined, utmSource?: string | null): string {
  const utm = utmSource?.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "").slice(0, 30);
  if (utm) return utm;
  const ai = aiSourceFromReferrer(referrer);
  if (ai) return ai;
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname;
    // Our own pages (www, apex, the shop) are a navigation, not a source.
    if (/(^|\.)makecepeit\.com$/i.test(host) || host === window.location.hostname) return "direct";
    for (const [pattern, name] of SEARCH_AND_SOCIAL) {
      if (pattern.test(host)) return name;
    }
    return "referral";
  } catch {
    return "direct";
  }
}

const SESSION_KEY = "mkc_session";
const LAST_SOURCE_KEY = "mkc_last_src";
/** How long a non-direct source keeps the credit for a later direct return. */
const LAST_SOURCE_TTL = 7 * 864e5;

interface VisitSession {
  sid: string;
  src: string;
  /** True once the `visit` row for this session has been sent. */
  counted?: boolean;
}

/**
 * This tab's session: a random id and the source that started it.
 *
 * The id is what lets the dashboard count a funnel in people rather than in
 * raw event totals — "sessions that opened the builder", not "builder_opened
 * fired 3,000 times". sessionStorage, not a cookie: it dies with the tab, holds
 * no identity, and survives the Google sign-in round trip in the same tab.
 *
 * A session that arrives direct inherits the last real source seen in the past
 * week (last non-direct click, the same model GA4 uses), so a visitor who found
 * us on Google and came back by typing the address is still Google's — as is a
 * sign-up confirmed from an email link, which opens in a fresh tab.
 */
function visitSession(): VisitSession | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored) as VisitSession;

    const utm = new URLSearchParams(window.location.search).get("utm_source");
    let src = trafficSource(document.referrer, utm);
    if (src === "direct") {
      const last = JSON.parse(localStorage.getItem(LAST_SOURCE_KEY) ?? "null") as
        | { src: string; at: number }
        | null;
      if (last && Date.now() - last.at < LAST_SOURCE_TTL) src = last.src;
    } else {
      localStorage.setItem(LAST_SOURCE_KEY, JSON.stringify({ src, at: Date.now() }));
    }

    const session: VisitSession = {
      sid: crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`,
      src,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch {
    // Storage disabled: no session id, so these events stay out of the
    // session funnel but still count in the totals.
    return null;
  }
}

function isBot(): boolean {
  return navigator.webdriver === true || BOT_UA.test(navigator.userAgent);
}

/**
 * Record the start of a browser session — the dashboard's "visits".
 *
 * First-party only. GA4 already counts sessions itself and reserves the name
 * `session_start`; sending ours too would only add a duplicate custom event.
 * Fires once per tab session, after the page has hydrated, so the gap between
 * a search engine's clicks and these visits is the people who left before the
 * page finished loading (plus blockers).
 */
export function recordVisit(landing: string): void {
  if (typeof window === "undefined" || isBot()) return;
  const session = visitSession();
  if (!session || session.counted) return;
  session.counted = true;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* counted once per load instead of once per session — acceptable */
  }

  let refHost = "";
  try {
    refHost = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    /* malformed referrer */
  }
  sendFirstParty("visit", {
    sid: session.sid,
    src: session.src,
    landing: landing.slice(0, 120),
    device: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
    ...(refHost ? { ref: refHost } : {}),
  });
}

/**
 * Copy one event into our own `events` table.
 *
 * sendBeacon rather than fetch: it is queued by the browser and survives the
 * page being unloaded, which matters for the events that fire on a click that
 * navigates away (upgrade_click, begin_checkout, download_click). A plain
 * fetch from a page that is already tearing down is routinely cancelled, and
 * the events lost would be precisely the ones at the decision points.
 *
 * Entirely best-effort. Analytics must never break a page, so every failure
 * path here is a silent no-op.
 */
function sendFirstParty(event: string, params: Record<string, string | number | boolean>): void {
  // Events a server route already records are skipped here to avoid storing
  // the same action twice — see lib/analytics-events.ts.
  if (!isMirroredEvent(event)) return;
  if (isBot()) return;

  try {
    const body = JSON.stringify({ name: event, props: params });
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/events", blob)) return;

    // sendBeacon refuses when its queue is full (and doesn't exist on older
    // Safari). keepalive gives the fetch the same survive-unload behaviour.
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never let a measurement failure surface to the user */
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

  // Our own table first — it is the only sink that can be joined to a member,
  // and the only one that keeps working when a visitor declines cookies. It
  // alone gets the session id and source: that is what the funnel is counted
  // by, and a per-session id is noise in GA4 and Clarity.
  const session = visitSession();
  sendFirstParty(event, session ? { ...clean, sid: session.sid, src: session.src } : clean);

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
