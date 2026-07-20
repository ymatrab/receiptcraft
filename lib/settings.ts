import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

/**
 * Server-only settings store. Reads/writes go through the service-role client and
 * the app_settings table has no RLS policies, so secrets (AI API keys) live only
 * on the server. Never import this into a Client Component.
 */

export type AiProvider = "google" | "openai" | "anthropic";

export interface AiConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
}

export interface PaymentLinks {
  weekly: string | null;
  monthly: string | null;
  yearly: string | null;
}

const KEY_AI = "ai";
const KEY_LINK_WEEKLY = "stripe_link_weekly";
const KEY_LINK_MONTHLY = "stripe_link_monthly";
const KEY_LINK_YEARLY = "stripe_link_yearly";
const KEY_INDEXNOW_LAST_RUN = "indexnow_last_run";

/** Sensible default model per provider. */
export const DEFAULT_MODELS: Record<AiProvider, string> = {
  google: "gemini-2.0-flash",
  openai: "gpt-4o-mini",
  anthropic: "claude-opus-4-8",
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

/** AI config, falling back to env (Anthropic) so the feature works pre-setup. */
export async function getAiConfig(): Promise<AiConfig | null> {
  const stored = await getSetting<AiConfig>(KEY_AI);
  if (stored?.apiKey) return stored;
  if (process.env.ANTHROPIC_API_KEY) {
    return { provider: "anthropic", apiKey: process.env.ANTHROPIC_API_KEY, model: "claude-opus-4-8" };
  }
  return null;
}

/** Provider + model only (safe to show in the admin form — no key). */
export async function getAiConfigPublic(): Promise<{ provider: AiProvider; model: string; hasKey: boolean }> {
  const stored = await getSetting<AiConfig>(KEY_AI);
  return {
    provider: stored?.provider ?? "google",
    model: stored?.model ?? DEFAULT_MODELS[stored?.provider ?? "google"],
    hasKey: Boolean(stored?.apiKey) || Boolean(process.env.ANTHROPIC_API_KEY),
  };
}

export async function saveAiConfig(input: {
  provider: AiProvider;
  model: string;
  apiKey?: string;
}): Promise<void> {
  const existing = await getSetting<AiConfig>(KEY_AI);
  await setSetting(KEY_AI, {
    provider: input.provider,
    model: input.model || DEFAULT_MODELS[input.provider],
    // Keep the existing key when the form leaves the field blank.
    apiKey: input.apiKey && input.apiKey.length > 0 ? input.apiKey : existing?.apiKey ?? "",
  } satisfies AiConfig);
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
