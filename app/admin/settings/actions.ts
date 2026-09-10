"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { savePaymentLinks } from "@/lib/settings";
import { buildMessage, sendTelegram, telegramConfigured } from "@/lib/telegram";
import type { TelegramTestResult } from "./types";

export async function saveLinksAction(formData: FormData) {
  await requireAdmin();
  await savePaymentLinks({
    weekly: String(formData.get("weekly") ?? "") || null,
    monthly: String(formData.get("monthly") ?? "") || null,
    yearly: String(formData.get("yearly") ?? "") || null,
  });
  revalidatePath("/admin/settings");
}

/** Send one real alert through the bot, and report Telegram's own verdict. */
export async function testTelegramAction(
  _prev: TelegramTestResult | null,
  _formData: FormData
): Promise<TelegramTestResult> {
  await requireAdmin();

  if (!telegramConfigured) {
    return {
      ok: false,
      message:
        "TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are not both set. Add them in Vercel → Settings → Environment Variables, then redeploy.",
    };
  }

  try {
    const result = await sendTelegram(
      buildMessage("✅ Test alert", {
        From: "makecepeit admin settings",
        Meaning: "Alerts are wired up correctly.",
      })
    );
    return result.ok
      ? { ok: true, message: "Check your Telegram — the test message is on its way." }
      : { ok: false, message: result.error ?? "Telegram refused the message." };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Could not reach Telegram." };
  }
}
