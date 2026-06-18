"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Manually grant Pro to a user — used when payment happens through an external
 * checkout (e.g. a Shopify payment link) that doesn't sync subscriptions
 * automatically. Creates/updates a "manual_<userId>" subscription row that
 * getAccountStatus reads as active Pro until it expires or is revoked.
 */
export async function grantPro(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId"));
  const months = Number(formData.get("months") || 1);
  if (!userId) return;

  const end = new Date();
  end.setMonth(end.getMonth() + months);

  await createAdminClient().from("subscriptions").upsert(
    {
      id: `manual_${userId}`,
      user_id: userId,
      stripe_customer_id: "manual",
      status: "active",
      plan: months >= 12 ? "pro_yearly" : "pro_monthly",
      current_period_end: end.toISOString(),
      cancel_at_period_end: false,
    },
    { onConflict: "id" }
  );
  revalidatePath("/admin/members");
}

/** Revoke a manually-granted Pro membership. */
export async function revokePro(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId"));
  if (!userId) return;
  await createAdminClient()
    .from("subscriptions")
    .update({ status: "canceled", cancel_at_period_end: true })
    .eq("id", `manual_${userId}`);
  revalidatePath("/admin/members");
}
