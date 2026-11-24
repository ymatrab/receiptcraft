"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { PLANS, isPaidPlan, isProEntitled } from "@/lib/plans";
import { notify } from "@/lib/telegram";
import { SITE } from "@/lib/site";
import { recordServerEvent, errorText } from "@/lib/server-events";
import {
  cancelCustomerSubscriptions,
  memberSubscriptionRow,
  setRenewal,
  switchPlan,
} from "@/lib/stripe-subscriptions";

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
        // Stop the plan explicitly first: deleting the customer does cancel its
        // subscriptions, but if that call is refused (a restricted key without
        // the permission) the plan must still not charge a deleted account.
        await cancelCustomerSubscriptions(id);
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
      "Stripe customer to delete by hand (and check no plan still charges)": stripeLeft.length ? stripeLeft.join(", ") : null,
    })
  );

  // The session's user no longer exists; clear the cookies locally rather than
  // asking Supabase to revoke a session it has already dropped.
  await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
  redirect("/account-deleted");
}

/* ------------------------------------------------------- auto-renewing plan */

/**
 * The signed-in member's auto-renewing plan, or a redirect.
 *
 * Every action below acts only on the caller's own `sub_` row, looked up from
 * their session — never on an id posted by the form.
 */
async function ownPlan() {
  if (!supabaseConfigured || !stripeConfigured) redirect("/account?billing=unavailable");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");
  const row = await memberSubscriptionRow(user.id);
  if (!row) redirect("/account?billing=none");
  return { userId: user.id, email: user.email ?? null, id: row.id as string, plan: row.plan as string | null };
}

/**
 * "Cancel renewal": the plan stops at the end of the period already paid for.
 *
 * Has to be as easy as buying was — that is the law on auto-renewal, and the
 * cheapest dispute protection there is. If Stripe refuses, the member is told
 * they will not be charged and the owner is alerted to cancel it by hand, so a
 * failed button never becomes a charge the member tried to stop.
 */
export async function cancelRenewalAction() {
  const own = await ownPlan();
  let ok = false;
  try {
    ok = Boolean(await setRenewal(own.id, false));
  } catch (err) {
    console.error("[account] cancel renewal failed", err);
    after(() =>
      notify("❌ Member could not cancel renewal — cancel it by hand in Stripe", {
        Subscription: own.id,
        Email: own.email,
        Error: errorText(err),
      })
    );
  }
  // The "🔕 Renewal cancelled" alert comes from the webhook, which also sees
  // cancels made in the Stripe portal.
  if (ok) await recordServerEvent("renewal_cancelled", own.userId, { plan: own.plan, subscription: own.id });
  revalidatePath("/account");
  redirect(`/account?billing=${ok ? "cancelled" : "cancel_failed"}#plan`);
}

/** "Resume renewal": undo a cancel before the period ends. */
export async function resumeRenewalAction() {
  const own = await ownPlan();
  let ok = false;
  try {
    ok = Boolean(await setRenewal(own.id, true));
  } catch (err) {
    console.error("[account] resume renewal failed", err);
  }
  if (ok) await recordServerEvent("renewal_resumed", own.userId, { plan: own.plan, subscription: own.id });
  revalidatePath("/account");
  redirect(`/account?billing=${ok ? "resumed" : "failed"}#plan`);
}

/** Move to another plan from today; see switchPlan for how the money works. */
export async function switchPlanAction(formData: FormData) {
  const target = formData.get("plan");
  if (!isPaidPlan(target)) redirect("/account#plan");
  const own = await ownPlan();
  if (own.plan === target) redirect("/account#plan");

  let outcome: "switched" | "switch_declined" | "failed" = "failed";
  try {
    outcome = (await switchPlan(own.id, target)) ? "switched" : "failed";
  } catch (err) {
    console.error("[account] plan switch failed", err);
    // A declined card leaves the plan exactly as it was.
    outcome = (err as { type?: string }).type === "StripeCardError" ? "switch_declined" : "failed";
  }
  if (outcome === "switched") {
    await recordServerEvent("plan_switched", own.userId, { from: own.plan, to: target, subscription: own.id });
    after(() =>
      notify("🔀 Plan switched", {
        From: PLANS[own.plan as keyof typeof PLANS]?.name ?? own.plan,
        To: PLANS[target].name,
        Email: own.email,
      })
    );
  }
  revalidatePath("/account");
  redirect(`/account?billing=${outcome}#plan`);
}
