"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

/**
 * Delete one saved receipt.
 *
 * Until now there was no way to remove a saved receipt at all — the list only
 * offered "Open" — so an account accumulated everything forever.
 *
 * Deliberately runs on the caller's client rather than the service role: the
 * `receipts_all_own` RLS policy is `auth.uid() = user_id`, so the delete simply
 * matches nothing if the id belongs to someone else. That makes the ownership
 * check a property of the database rather than of this function remembering to
 * do it.
 */
export async function deleteReceiptAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id || !supabaseConfigured) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("receipts").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/account");
  revalidatePath("/account/receipts");
}
