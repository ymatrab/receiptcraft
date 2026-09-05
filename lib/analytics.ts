"use client";

import { isMirroredEvent } from "@/lib/analytics-events";

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

/* -------------------------------------------------------------------------
 * Visitor and session identity
 *
 * Two random values, so the events table can answer questions about people
 * instead of only about rows. Until these existed every funnel figure was a
 * raw event count: "139 builder opens" could have been 139 visitors or one
 * visitor and a stuck component, and nothing in the data could tell the
 * difference. `user_id` does not help — building and previewing need no
 * account, so it is null for the whole top of the funnel.
 *
 * Neither identifies a person. They are random, minted in the browser, never
 * derived from anything about the visitor, and never sent anywhere but our own
 * ingest. No email, no receipt contents.
 * ---------------------------------------------------------------------------- */

const VISITOR_KEY = "mkc_aid";
const SESSION_KEY = "mkc_sid";
/**
 * Idle gap that ends a session. 30 minutes, matching GA4, so our own session
 * count and the GA4 one are comparable rather than two different numbers that
 * both claim to be sessions.
 */
const SESSION_IDLE_MS = 30 * 60_000;

/** A random id. `randomUUID` needs a secure context and older Safari lacks it. */
function randomId(): string {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

/**
 * Ids for a browser where storage cannot be written — private mode, or a
 * browser set to block site data.
 *
 * Held for the life of the page instead. That degrades honestly: the events
 * still group together within one page view, they just cannot be joined across
 * navigations, so such a visitor reads as several short sessions rather than
 * being silently dropped or, worse, merged with everyone else under one shared
 * id.
 */
let fallbackVisitor: string | null = null;
let fallbackSession: string | null = null;

/** Stable per browser, for as long as the visitor keeps their local storage. */
function visitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const fresh = randomId();
    localStorage.setItem(VISITOR_KEY, fresh);
    return fresh;
  } catch {
    return (fallbackVisitor ??= randomId());
  }
}

/**
 * The current session, rotated after SESSION_IDLE_MS of inactivity.
 *
 * localStorage rather than sessionStorage, deliberately: sessionStorage is
 * per-tab and dies with it, so someone who opens a receipt in a second tab
 * would count as two sessions, and closing the tab for two minutes would start
 * a third. The stored timestamp is what actually ends a session, which is both
 * the GA4 definition and the one that makes "did they come back?" answerable.
 */
function currentSessionId(): string {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const [id, seenAt] = raw.split(":");
      if (id && now - Number(seenAt) < SESSION_IDLE_MS) {
        localStorage.setItem(SESSION_KEY, `${id}:${now}`);
        return id;
      }
    }
    const fresh = randomId();
    localStorage.setItem(SESSION_KEY, `${fresh}:${now}`);
    return fresh;
  } catch {
    return (fallbackSession ??= randomId());
  }
}

/**
 * The current visitor and session ids, for the server routes that write to
 * `events` themselves rather than through track().
 *
 * app/api/downloads/track records the confirmed download — the one event that
 * has to be right, because it is the only one written after the file actually
 * left. It cannot mint these itself: they live in the browser. Without them
 * that row would be the single most important event in the funnel and the only
 * one that could not be grouped with the session that produced it.
 */
export function eventIdentity(): { anonymous_id: string; session_id: string } {
  return { anonymous_id: visitorId(), session_id: currentSessionId() };
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

  try {
    // The three ids travel as top-level fields, not inside props: they become
    // real columns the dashboard groups by, and props is jsonb that gets
    // truncated to twelve keys. An identifier that can be dropped by a prop cap
    // is not an identifier.
    const body = JSON.stringify({
      name: event,
      props: params,
      anonymous_id: visitorId(),
      session_id: currentSessionId(),
      // Only the events that are about a particular receipt carry one.
      receipt_id: typeof params.receipt_id === "string" ? params.receipt_id : undefined,
    });
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

/**
 * Properties that must not leave for a third party.
 *
 * `receipt_id` is unique per receipt, and sending it to GA4 is wrong twice
 * over.
 *
 * The privacy reason: /privacy says the identifiers we mint stay with us, and a
 * per-document id handed to Google is exactly the kind of thing that sentence
 * exists to rule out.
 *
 * The measurement reason, which bites even if you do not care about the first:
 * GA4 custom dimensions have a cardinality ceiling, and a dimension with a new
 * value on every event blows straight through it. Google's response is to bucket
 * the overflow into a row literally labelled "(other)" — and it does that at the
 * *property* level, degrading unrelated reports. A high-cardinality id is the
 * one thing you should never register as a custom dimension.
 *
 * It stays in the first-party payload, where it is a real column with an index
 * and answers "did they make a second, different receipt".
 */
const FIRST_PARTY_ONLY = new Set(["receipt_id"]);

/** The subset of an event's properties we are willing to send off-site. */
function shareable(params: Record<string, string | number | boolean>) {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (!FIRST_PARTY_ONLY.has(k)) out[k] = v;
  }
  return out;
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
  // and the only one that keeps working when a visitor declines cookies.
  sendFirstParty(event, clean);

  // GA4 and Clarity get everything except the identifiers. See shareable().
  const external = shareable(clean);

  // GA4 custom event.
  window.gtag?.("event", event, external);

  // Clarity: record the event and tag the session for filtering/segmentation.
  window.clarity?.("event", event);
  for (const [k, v] of Object.entries(external)) {
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
  // The post-signup welcome sheet was shown. Currently unreachable: since
  // 2026-09-01 every new account goes to /pricing instead, so nothing sets the
  // `welcome=1` flag this depends on. Kept so the sheet can be put back — see
  // lib/new-account.ts — but expect a flat zero until then.
  welcomeShown: () => track("welcome_shown", {}),
  // A new account landed on /pricing. Since 2026-09-01 this is every sign-up,
  // gated or not, so it should track sign_up one for one — a gap between them
  // means the redirect is losing people.
  newAccountPricingShown: () => track("new_account_pricing_shown", {}),
  // ...and walked past the plans, back to whatever they were doing. Its own
  // event because it used to fire upgrade_click, which counted everyone who
  // declined as someone who showed buying intent.
  newAccountPricingSkip: (dest: string) => track("new_account_pricing_skip", { dest }),
  // Which worked example a visitor opened. Tells us whether the hero demo is
  // doing any work now that AI itself needs an account.
  aiDemoOpened: (example: string) => track("ai_demo_opened", { example }),
  /**
   * Someone clicked something that asks for money.
   *
   * The one number that says whether pricing works, which is why what does
   * *not* belong in it matters as much as what does. Three call sites were
   * firing this for things nobody chose: declining the plans on /pricing, being
   * refused a Pro-only template, and clicking "log in" at the download gate.
   * All three are now their own events below. A gate closing on someone is not
   * them reaching for their card, and counting it that way makes the funnel
   * look healthiest exactly where it is failing.
   */
  upgradeClick: (location: string) => track("upgrade_click", { location }),
  /**
   * The plans were seen. Once per session, so it is a denominator rather than
   * a count of how often people refresh.
   *
   * Nothing recorded a /pricing view in our own table before this, so "reached
   * the plans and chose nothing" — the largest group on the page, and the one
   * worth understanding — could not be counted at all.
   */
  pricingViewed: (source: string) => track("pricing_viewed", { source }),
  /**
   * A free user was refused a Pro-only template.
   *
   * Was upgrade_click{builder_pro_template}. Opening a template is how you find
   * out it is locked; the click that follows *in the modal* is the intent, and
   * that one still fires upgrade_click{pro_template_modal}.
   */
  proTemplateBlocked: (template: string) => track("pro_template_blocked", { template }),
  /**
   * A download was asked for and refused, and why.
   *
   * `login` (no account), `watermark` (out of credits), `brand` (Pro-only
   * template) or `unavailable` (we could not check). download_click already
   * counts the attempt; this counts the wall it hit, which is the difference
   * between "nobody wants to download" and "everybody wants to and can't".
   */
  downloadBlocked: (
    reason: "login" | "watermark" | "brand" | "unavailable",
    format: string,
    receiptId?: string
  ) => track("download_blocked", { reason, format, receipt_id: receiptId }),
  /**
   * Left for the sign-up form, and what sent them.
   *
   * `download_gate`, `ai_gate` or a plain CTA. The pair signup_started →
   * sign_up is what answers the plan's question "does sign-up fail after the
   * download gate?" — previously the download gate's own button counted as
   * upgrade_click, so a person turned away at it looked like a shopper.
   */
  signupStarted: (entry: string) => track("signup_started", { entry }),
  /**
   * The receipt is actually finished: a merchant name, at least one priced
   * item, and a total above zero.
   *
   * builder_opened and edit_started both fire for someone who typed one
   * character and left. This is the first event in the funnel that means a real
   * receipt exists, which makes it the honest denominator for every download
   * ratio. Fires once per receipt — `receipt_id` is what keeps it once.
   */
  receiptCompleted: (receiptId: string, template?: string) =>
    track("receipt_completed", {
      receipt_id: receiptId,
      template,
      template_type: template ? "brand" : "generic",
    }),
  // Took the free plan from /pricing. The counterpart to begin_checkout: with
  // every new account landing on the plans, these two and the people who leave
  // without touching either are the whole outcome of that page.
  selectFreePlan: (dest: string) => track("select_free_plan", { dest }),
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

  // ---- reviews ----
  // The post-download review card. shown/clicked/dismissed together give the
  // click-through rate on the ask. The reviews themselves land on a third-party
  // profile we cannot read back, so this is the only part of that funnel we can
  // measure. See components/builder/ReviewPrompt.tsx.
  reviewPromptShown: () => track("review_prompt_shown", {}),
  reviewPromptClicked: () => track("review_prompt_clicked", {}),
  reviewPromptDismissed: () => track("review_prompt_dismissed", {}),
};
