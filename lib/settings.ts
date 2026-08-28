import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import type { PlanId } from "@/lib/plans";

/**
 * Server-only settings store. Reads/writes go through the service-role client and
 * the app_settings table has no RLS policies, so secrets (AI API keys) live only
 * on the server. Never import this into a Client Component.
 */

export type AiProvider =
  | "google"
  | "openai"
  | "anthropic"
  | "xai"
  | "cloudflare"
  | "groq"
  | "huggingface";

export interface AiConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
  /** Cloudflare Workers AI only — the account the model runs under. */
  accountId?: string;
}

/**
 * One configured way of reaching a model. The generator holds a list of these
 * and tries them in order, so a dead key demotes the site to its next provider
 * instead of taking the headline feature offline — which is exactly what
 * happened in August 2026, when a single expired key 502'd /api/ai/generate for
 * six days with no way for an admin to see why.
 */
export interface AiConnection extends AiConfig {
  /** Stable id; survives reordering and renaming. */
  id: string;
  /** Admin-facing name, e.g. "Cloudflare Llama 70B (free tier)". */
  label: string;
  enabled: boolean;
}

/** An AiConnection safe to render in the admin UI — no secret. */
export type AiConnectionPublic = Omit<AiConnection, "apiKey"> & { hasKey: boolean };

export interface PaymentLinks {
  weekly: string | null;
  monthly: string | null;
  yearly: string | null;
}

const KEY_AI = "ai";
const KEY_AI_CONNECTIONS = "ai_connections";
const KEY_AI_COOLDOWNS = "ai_cooldowns";
const KEY_LINK_WEEKLY = "stripe_link_weekly";
const KEY_LINK_MONTHLY = "stripe_link_monthly";
const KEY_LINK_YEARLY = "stripe_link_yearly";
const KEY_INDEXNOW_LAST_RUN = "indexnow_last_run";
const KEY_SHOPIFY_VARIANTS = "shopify_variant_plans";

/** Sensible default model per provider. */
export const DEFAULT_MODELS: Record<AiProvider, string> = {
  google: "gemini-3.6-flash",
  openai: "gpt-4o-mini",
  anthropic: "claude-opus-5",
  xai: "grok-4.6",
  cloudflare: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  // Groq's strict json_schema output is only on a few models, and 120b is the
  // one to use: measured 2026-08-28, gpt-oss-20b failed 2 of 6 receipts with
  // json_validate_failed (both on the same multi-item prompt) while costing
  // the same ~1,900 tokens, so the smaller model buys nothing. llama-3.x on
  // Groq does not support strict schemas at all, and qwen3.8-27b ignored the
  // schema outright (lowercase currencies, unparseable dates, 0/3 clean).
  groq: "openai/gpt-oss-120b",
  // Routed to whichever partner serves this model fastest. gpt-oss is the safe
  // pick because it honours strict json_schema on the providers that serve it.
  huggingface: "openai/gpt-oss-120b",
};

/** Admin-facing labels and setup notes, kept next to the provider list. */
export const PROVIDER_LABELS: Record<AiProvider, string> = {
  cloudflare: "Cloudflare Workers AI",
  google: "Google Gemini",
  groq: "Groq (free tier)",
  huggingface: "Hugging Face (free tier)",
  xai: "xAI (Grok)",
  openai: "OpenAI",
  anthropic: "Anthropic (Claude)",
};

/**
 * Model ids Google has switched off, mapped to their live replacement.
 *
 * A retired model is not a configuration choice — it can only ever 404. The
 * August 2026 outage was exactly this: `gemini-2.0-flash` was shut down, the
 * route turned the 404 into a generic 502, and the feature was dark for six
 * days. Rewriting a dead id on read means a stored connection heals itself
 * instead of needing someone to know the new name.
 */
const RETIRED_MODELS: Record<string, string> = {
  "gemini-2.0-flash": "gemini-3.6-flash",
  "gemini-2.0-flash-lite": "gemini-3.5-flash-lite",
};

function liveModel(model: string): string {
  return RETIRED_MODELS[model] ?? model;
}

async function getSetting<T>(key: string): Promise<T | null> {
  if (!supabaseConfigured) return null;
  try {
    const { data } = await createAdminClient()
      .from("app_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    return (data?.value as T) ?? null;
  } catch {
    return null;
  }
}

async function setSetting(key: string, value: unknown): Promise<void> {
  if (!supabaseConfigured) throw new Error("Backend not configured");
  await createAdminClient()
    .from("app_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

/**
 * Every configured connection, in priority order.
 *
 * Falls back through two older shapes so an existing install keeps working
 * without a migration step: the single `ai` settings row this replaced, and
 * finally ANTHROPIC_API_KEY from the environment.
 */
export async function getAiConnections(): Promise<AiConnection[]> {
  const stored = await getSetting<AiConnection[]>(KEY_AI_CONNECTIONS);
  // An empty saved list still counts as configured: it means the admin deleted
  // everything. Falling through to the legacy row there would resurrect the
  // connection they just removed.
  if (Array.isArray(stored)) return stored.map((c) => ({ ...c, model: liveModel(c.model) }));

  const legacy = await getSetting<AiConfig>(KEY_AI);
  if (legacy?.apiKey) {
    return [
      {
        id: "legacy",
        label: `${PROVIDER_LABELS[legacy.provider] ?? legacy.provider} (imported)`,
        provider: legacy.provider,
        model: liveModel(legacy.model || DEFAULT_MODELS[legacy.provider]),
        apiKey: legacy.apiKey,
        enabled: true,
      },
    ];
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return [
      {
        id: "env",
        label: "Anthropic (from environment)",
        provider: "anthropic",
        model: DEFAULT_MODELS.anthropic,
        apiKey: process.env.ANTHROPIC_API_KEY,
        enabled: true,
      },
    ];
  }

  return [];
}

/** The connections the generator will actually try, in order. */
export async function getEnabledAiConnections(): Promise<AiConnection[]> {
  const all = await getAiConnections();
  return all.filter((c) => c.enabled && c.apiKey);
}

/** The list with secrets stripped — safe to render in the admin UI. */
export async function getAiConnectionsPublic(): Promise<AiConnectionPublic[]> {
  const all = await getAiConnections();
  return all.map(({ apiKey, ...rest }) => ({ ...rest, hasKey: Boolean(apiKey) }));
}

export async function saveAiConnections(list: AiConnection[]): Promise<void> {
  await setSetting(KEY_AI_CONNECTIONS, list);
}

/**
 * Upsert one connection, preserving its stored key when `apiKey` is blank —
 * the admin form never re-renders a saved secret, so a blank field means
 * "leave it alone", not "clear it".
 */
export async function upsertAiConnection(
  input: Omit<AiConnection, "apiKey"> & { apiKey?: string }
): Promise<void> {
  const list = await getAiConnections();
  const at = list.findIndex((c) => c.id === input.id);
  const existingKey = at >= 0 ? list[at].apiKey : "";
  const next: AiConnection = {
    id: input.id,
    label: input.label || PROVIDER_LABELS[input.provider],
    provider: input.provider,
    model: input.model || DEFAULT_MODELS[input.provider],
    apiKey: input.apiKey && input.apiKey.length > 0 ? input.apiKey : existingKey,
    accountId: input.accountId || undefined,
    enabled: input.enabled,
  };
  if (at >= 0) list[at] = next;
  else list.push(next);
  await saveAiConnections(list);
}

export async function deleteAiConnection(id: string): Promise<void> {
  const list = await getAiConnections();
  await saveAiConnections(list.filter((c) => c.id !== id));
}

/** Move a connection one place up (-1) or down (+1) the priority order. */
export async function moveAiConnection(id: string, delta: -1 | 1): Promise<void> {
  const list = await getAiConnections();
  const at = list.findIndex((c) => c.id === id);
  const to = at + delta;
  if (at < 0 || to < 0 || to >= list.length) return;
  [list[at], list[to]] = [list[to], list[at]];
  await saveAiConnections(list);
}

/**
 * Per-connection "don't route here until" timestamps, keyed by connection id.
 *
 * This is what makes stacking free tiers actually pay off. Failover alone finds
 * the next working provider, but it re-tries the exhausted one on every single
 * request first — so once Gemini's daily quota is gone, every generation for
 * the rest of the day carries a wasted round-trip. Remembering the exhaustion
 * turns that into one wasted call per quota window instead of one per request.
 *
 * State, not config, so it lives under its own key: the admin rewrites the
 * connection list, the route rewrites this, and neither clobbers the other.
 */
export async function getAiCooldowns(): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(KEY_AI_COOLDOWNS)) ?? {};
}

/** Park a connection until `until`. Expired entries are pruned as we go. */
export async function setAiCooldown(id: string, until: Date): Promise<void> {
  const now = Date.now();
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(await getAiCooldowns())) {
    if (k !== id && Date.parse(v) > now) next[k] = v;
  }
  next[id] = until.toISOString();
  await setSetting(KEY_AI_COOLDOWNS, next);
}

/** Called after a success, so a recovered provider is used again immediately. */
export async function clearAiCooldown(id: string): Promise<void> {
  const current = await getAiCooldowns();
  if (!current[id]) return;
  const now = Date.now();
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(current)) {
    if (k !== id && Date.parse(v) > now) next[k] = v;
  }
  await setSetting(KEY_AI_COOLDOWNS, next);
}

/**
 * Connections in the order the generator should try them: everything that is
 * ready first, then anything still cooling as a last resort. Cooling providers
 * are demoted rather than dropped — a stale cooldown must never be the reason
 * the feature goes dark when it is the only key configured.
 */
export async function getRoutableAiConnections(): Promise<{
  ordered: AiConnection[];
  cooling: Record<string, string>;
}> {
  const [connections, cooldowns] = await Promise.all([getEnabledAiConnections(), getAiCooldowns()]);
  const now = Date.now();
  const isCooling = (c: AiConnection) => {
    const until = cooldowns[c.id];
    return Boolean(until && Date.parse(until) > now);
  };
  const ready = connections.filter((c) => !isCooling(c));
  const resting = connections.filter(isCooling);
  return { ordered: [...ready, ...resting], cooling: cooldowns };
}

/** Stripe payment links, falling back to env. */
export async function getPaymentLinks(): Promise<PaymentLinks> {
  const [w, m, y] = await Promise.all([
    getSetting<string>(KEY_LINK_WEEKLY),
    getSetting<string>(KEY_LINK_MONTHLY),
    getSetting<string>(KEY_LINK_YEARLY),
  ]);
  return {
    weekly: w ?? process.env.NEXT_PUBLIC_STRIPE_LINK_WEEKLY ?? null,
    monthly: m ?? process.env.NEXT_PUBLIC_STRIPE_LINK_MONTHLY ?? null,
    yearly: y ?? process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY ?? null,
  };
}

export async function savePaymentLinks(links: PaymentLinks): Promise<void> {
  await Promise.all([
    setSetting(KEY_LINK_WEEKLY, links.weekly ?? ""),
    setSetting(KEY_LINK_MONTHLY, links.monthly ?? ""),
    setSetting(KEY_LINK_YEARLY, links.yearly ?? ""),
  ]);
}

/**
 * Shopify variant/SKU → plan overrides, e.g. { "44821": "pro_yearly" }.
 *
 * The real variant ids live in the Shopify store rather than this repo, so they
 * are configured in /admin/settings instead of being hard-coded. Empty is the
 * expected state until the store is mapped: lib/shopify.ts then falls back to
 * reading "weekly"/"monthly"/"yearly" out of the line item title, so orders are
 * still fulfilled rather than all landing in pending_orders.
 */
export async function getShopifyVariantPlans(): Promise<Record<string, PlanId>> {
  const stored = await getSetting<Record<string, PlanId>>(KEY_SHOPIFY_VARIANTS);
  return stored ?? {};
}

export async function saveShopifyVariantPlans(map: Record<string, PlanId>): Promise<void> {
  await setSetting(KEY_SHOPIFY_VARIANTS, map);
}

/**
 * Watermark for the automated IndexNow cron: the ISO timestamp of the last
 * successful run. The cron submits only sitemap URLs modified since this, so
 * unchanged pages are never re-spammed. Null until the first run.
 */
export async function getIndexNowLastRun(): Promise<string | null> {
  return getSetting<string>(KEY_INDEXNOW_LAST_RUN);
}

export async function setIndexNowLastRun(iso: string): Promise<void> {
  await setSetting(KEY_INDEXNOW_LAST_RUN, iso);
}
