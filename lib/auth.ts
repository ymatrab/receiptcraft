import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { isProEntitled } from "@/lib/plans";

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
  email: string | null;
  isLoggedIn: boolean;
  isPro: boolean;
  isAdmin: boolean;
  plan: string | null;
}

/**
 * Resolves the user's entitlements in one call: login state, Pro status (an
 * active subscription that has not yet reached its period end) and admin flag.
 * Everything gating features — watermark, AI limits, admin routes — should read
 * from this, so the expiry check lives in exactly one place.
 */
const ANON: AccountStatus = {
  userId: null,
  email: null,
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
      .select("status, plan, current_period_end")
      .eq("user_id", user.id)
      .order("current_period_end", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle(),
  ]);

  const isPro = isProEntitled(sub?.status, sub?.current_period_end);

  return {
    userId: user.id,
    email: user.email ?? null,
    isLoggedIn: true,
    isPro,
    isAdmin: Boolean(profile?.is_admin),
    // A lapsed grant is not the user's current plan — report free, or the
    // builder would keep showing "Pro" to someone who no longer has it.
    plan: isPro ? sub?.plan ?? "free" : "free",
  };
}
