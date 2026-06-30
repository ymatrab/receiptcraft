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

export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  // Strip null/undefined so we don't send empty values.
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) clean[k] = v;
  }

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
  upgradeClick: (location: string) => track("upgrade_click", { location }),
  signIn: (method: string) => track("login", { method }),
  signUp: (method: string) => track("sign_up", { method }),
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
};
