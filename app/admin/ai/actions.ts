"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import {
  deleteAiConnection,
  getAiConnections,
  moveAiConnection,
  upsertAiConnection,
  type AiProvider,
} from "@/lib/settings";
import { generateJson } from "@/lib/ai-providers";
import { AI_RECEIPT_SCHEMA, type AiReceiptResult } from "@/lib/ai-receipt";
import type { TestResult } from "./types";

const TEST_SYSTEM =
  "You generate realistic receipt data from a short description. Return only the structured fields requested.";
const TEST_PROMPT = "Coffee and a croissant at a Paris cafe, about 8 euros";

export async function saveConnectionAction(formData: FormData) {
  await requireAdmin();
  const provider = String(formData.get("provider") ?? "cloudflare") as AiProvider;
  await upsertAiConnection({
    id: String(formData.get("id") || "") || crypto.randomUUID(),
    label: String(formData.get("label") ?? "").trim(),
    provider,
    model: String(formData.get("model") ?? "").trim(),
    apiKey: String(formData.get("apiKey") ?? ""),
    accountId: String(formData.get("accountId") ?? "").trim(),
    enabled: formData.get("enabled") === "on",
  });
  revalidatePath("/admin/ai");
}

export async function deleteConnectionAction(formData: FormData) {
  await requireAdmin();
  await deleteAiConnection(String(formData.get("id") ?? ""));
  revalidatePath("/admin/ai");
}

export async function moveConnectionAction(formData: FormData) {
  await requireAdmin();
  const delta: -1 | 1 = String(formData.get("delta")) === "up" ? -1 : 1;
  await moveAiConnection(String(formData.get("id") ?? ""), delta);
  revalidatePath("/admin/ai");
}

/**
 * Run one real generation against a single connection and report what actually
 * happened, provider error text and all.
 *
 * This exists because the public route deliberately hides provider errors: in
 * August 2026 that left the generator returning a generic 502 for six days with
 * no way to see the cause. Admin-only, so the raw message is safe to show here.
 */
export async function testConnectionAction(
  _prev: TestResult | null,
  formData: FormData
): Promise<TestResult> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const started = Date.now();

  const connection = (await getAiConnections()).find((c) => c.id === id);
  if (!connection) {
    return { id, ok: false, ms: 0, message: "That connection no longer exists." };
  }
  if (!connection.apiKey) {
    return { id, ok: false, ms: 0, message: "No API key saved for this connection." };
  }

  try {
    const receipt = (await generateJson(
      connection,
      TEST_SYSTEM,
      TEST_PROMPT,
      AI_RECEIPT_SCHEMA
    )) as AiReceiptResult;
    const ms = Date.now() - started;
    const items = Array.isArray(receipt?.items) ? receipt.items.length : 0;
    if (!receipt?.businessName) {
      return { id, ok: false, ms, message: "Responded, but without a usable receipt." };
    }
    return {
      id,
      ok: true,
      ms,
      message: `OK — "${receipt.businessName}", ${items} line item${items === 1 ? "" : "s"}.`,
    };
  } catch (err) {
    return {
      id,
      ok: false,
      ms: Date.now() - started,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
