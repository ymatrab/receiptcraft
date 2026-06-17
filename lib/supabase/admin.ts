import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. BYPASSES row-level security — use ONLY in
 * trusted server contexts (Stripe webhooks, admin actions, cron). Never import
 * this into a Client Component. The service-role key must never reach the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
