import { redirect } from "next/navigation";
import { getAccountStatus } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/config";

/**
 * Gate for admin-only pages/routes. Redirects anonymous users to login and
 * non-admins to the home page. Returns the admin's account status on success.
 */
export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/");
  const status = await getAccountStatus();
  if (!status.isLoggedIn) redirect("/login?next=/admin");
  if (!status.isAdmin) redirect("/");
  return status;
}
