"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { savePaymentLinks } from "@/lib/settings";

export async function saveLinksAction(formData: FormData) {
  await requireAdmin();
  await savePaymentLinks({
    weekly: String(formData.get("weekly") ?? "") || null,
    monthly: String(formData.get("monthly") ?? "") || null,
    yearly: String(formData.get("yearly") ?? "") || null,
  });
  revalidatePath("/admin/settings");
}
