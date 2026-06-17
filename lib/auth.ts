import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { isProStatus } from "@/lib/plans";

/** The currently authenticated user, or null. Safe to call in any server context. */
export async function getCurrentUser() {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export interface AccountStatus {
  userId: string | null;
  isLoggedIn: boolean;
  isPro: boolean;
  isAdmin: boolean;
  plan: string | null;
}

/**
 * Resolves the user's entitlements in one call: login state, Pro status (from an
 * active Stripe-synced subscription) and admin flag. Everything gating features
 * — watermark, AI limits, admin routes — should read from this.
 */
const ANON: AccountStatus = {
  userId: null,
  isLoggedIn: false,
  isPro: false,
  isAdmin: false,
  plan: null,
};

export async function getAccountStatus(): Promise<AccountStatus> {
  if (!supabaseConfigured) return ANON;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return ANON;

  const [{ data: sub }, { data: profile }] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("status, plan")
      .eq("user_id", user.id)
      .order("current_period_end", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle(),
  ]);

  return {
    userId: user.id,
    isLoggedIn: true,
    isPro: isProStatus(sub?.status),
    isAdmin: Boolean(profile?.is_admin),
    plan: sub?.plan ?? "free",
  };
}
