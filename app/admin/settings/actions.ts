"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { saveAiConfig, savePaymentLinks, type AiProvider } from "@/lib/settings";

export async function saveAiAction(formData: FormData) {
  await requireAdmin();
  await saveAiConfig({
    provider: String(formData.get("provider") ?? "google") as AiProvider,
    model: String(formData.get("model") ?? ""),
    apiKey: String(formData.get("apiKey") ?? ""),
  });
  revalidatePath("/admin/settings");
}

export async function saveLinksAction(formData: FormData) {
  await requireAdmin();
  await savePaymentLinks({
    monthly: String(formData.get("monthly") ?? "") || null,
    yearly: String(formData.get("yearly") ?? "") || null,
  });
  revalidatePath("/admin/settings");
}
