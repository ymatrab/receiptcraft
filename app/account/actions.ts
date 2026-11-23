"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { isProEntitled } from "@/lib/plans";
import { notify } from "@/lib/telegram";
import { SITE } from "@/lib/site";

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

/* ---------------------------------------------------------------- newsletter */

/**
 * The newsletter switch on /account. Keyed by the account's own email — the
 * list is keyed by email, and that is the address the newsletter would go to.
 * Service role because the table has no RLS policy for members.
 */
export async function setNewsletterAction(formData: FormData) {
  if (!supabaseConfigured) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return;

  const email = user.email.trim().toLowerCase();
  const subscribe = formData.get("subscribe") === "1";
  const admin = createAdminClient();

  if (subscribe) {
    await admin
      .from("newsletter_subscribers")
      .upsert({ email, source: "account", user_id: user.id, unsubscribed_at: null }, { onConflict: "email" });
  } else {
    await admin
      .from("newsletter_subscribers")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("email", email)
      .is("unsubscribed_at", null);
  }

  revalidatePath("/account");
}

/* ------------------------------------------------------------ delete account */

export type DeleteAccountState = { error: string } | null;

/** Escape LIKE wildcards: "_" is legal in an email address. */
function likeExact(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

/**
 * Delete the signed-in account and the data that would otherwise outlive it.
 *
 * The auth user goes first: profiles, receipts, subscriptions, conversations,
 * AI usage and download credits all cascade from it, so if Supabase refuses,
 * nothing has been touched and the member is told so. Then the rows that only
 * `set null` on delete — product events, the newsletter row, guest chats under
 * the same email — and the Stripe customer, which holds the email and any
 * saved card. Payments themselves stay in Stripe, as tax law requires.
 *
 * A Stripe deletion that fails (the restricted key may lack the permission) is
 * not shown to the member — their account is gone either way — but the owner
 * gets the customer id on Telegram to remove by hand.
 */
export async function deleteAccountAction(
  _prev: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  if (!supabaseConfigured) return { error: "Accounts aren't available right now." };

  if (String(formData.get("confirm") ?? "").trim().toUpperCase() !== "DELETE") {
    return { error: "Type DELETE in the box to confirm." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const admin = createAdminClient();
  const userId = user.id;
  const email = user.email?.trim().toLowerCase() ?? null;

  const { data: subs } = await admin
    .from("subscriptions")
    .select("stripe_customer_id, status, current_period_end")
    .eq("user_id", userId);
  const customers = [
    ...new Set(
      (subs ?? [])
        .map((s) => s.stripe_customer_id as string | null)
        .filter((id): id is string => Boolean(id?.startsWith("cus_")))
    ),
  ];
  const hadPro = (subs ?? []).some((s) => isProEntitled(s.status, s.current_period_end));

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error("[account] delete user failed", deleteError);
    return { error: `We couldn't delete your account just now. Nothing was removed — please try again, or email ${SITE.email}.` };
  }

  // Each of these can fail on its own (a table a migration never created, a
  // network blip) without undoing the deletion above, so none stops the rest.
  const cleanups: PromiseLike<unknown>[] = [admin.from("events").delete().eq("user_id", userId)];

  const anonymousId = String(formData.get("anonymous_id") ?? "");
  if (/^[\w-]{8,64}$/.test(anonymousId)) {
    // This browser's signed-out events. Only rows with no account attached, so
    // another member who used the same browser keeps theirs.
    cleanups.push(admin.from("events").delete().eq("anonymous_id", anonymousId).is("user_id", null));
  }

  cleanups.push(admin.from("newsletter_subscribers").delete().eq("user_id", userId));
  if (email) {
    cleanups.push(admin.from("newsletter_subscribers").delete().ilike("email", likeExact(email)));
    cleanups.push(admin.from("conversations").delete().ilike("guest_email", likeExact(email)));
  }

  const results = await Promise.allSettled(cleanups);
  for (const r of results) {
    const error = r.status === "rejected" ? r.reason : (r.value as { error?: unknown })?.error;
    if (error) console.error("[account] cleanup step failed", error);
  }

  const stripeLeft: string[] = [];
  if (stripeConfigured) {
    for (const id of customers) {
      try {
        await getStripe().customers.del(id);
      } catch (err) {
        console.error("[account] stripe customer delete failed", id, err);
        stripeLeft.push(id);
      }
    }
  } else {
    stripeLeft.push(...customers);
  }

  after(() =>
    notify("🗑️ Account deleted", {
      "Had Pro": hadPro ? "yes" : "no",
      "Stripe customer to delete by hand": stripeLeft.length ? stripeLeft.join(", ") : null,
    })
  );

  // The session's user no longer exists; clear the cookies locally rather than
  // asking Supabase to revoke a session it has already dropped.
  await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
  redirect("/account-deleted");
}
