import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

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
const KEY_LINK_WEEKLY = "stripe_link_weekly";
const KEY_LINK_MONTHLY = "stripe_link_monthly";
const KEY_LINK_YEARLY = "stripe_link_yearly";
const KEY_INDEXNOW_LAST_RUN = "indexnow_last_run";

/** Sensible default model per provider. */
export const DEFAULT_MODELS: Record<AiProvider, string> = {
  google: "gemini-2.0-flash",
  openai: "gpt-4o-mini",
  anthropic: "claude-opus-5",
  xai: "grok-4.6",
  cloudflare: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  // Groq's strict json_schema output is only on a few models — gpt-oss-20b is
  // the fast, free-tier one. llama-3.x on Groq does NOT support strict schemas.
  groq: "openai/gpt-oss-20b",
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
  if (Array.isArray(stored)) return stored;

  const legacy = await getSetting<AiConfig>(KEY_AI);
  if (legacy?.apiKey) {
    return [
      {
        id: "legacy",
        label: `${PROVIDER_LABELS[legacy.provider] ?? legacy.provider} (imported)`,
        provider: legacy.provider,
        model: legacy.model || DEFAULT_MODELS[legacy.provider],
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
