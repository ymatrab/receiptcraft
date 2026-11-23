import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { maskEmail, verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Where the unsubscribe link in every newsletter lands.
 *
 * The link itself changes nothing — mail scanners open links — so this page
 * shows whose address it is and a single button that posts to
 * /api/newsletter/unsubscribe. No sign-in, no reason asked, no second screen.
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; t?: string; status?: string }>;
}) {
  const { s, t, status } = await searchParams;

  let body: React.ReactNode;

  if (status === "done") {
    body = (
      <>
        <h1 className="text-3xl font-bold text-slate-900">You&apos;re unsubscribed</h1>
        <p className="mt-3 text-slate-600">
          You won&apos;t get any more newsletters from {SITE.name}. Emails about your own account,
          such as password resets and purchase receipts, still arrive.
        </p>
      </>
    );
  } else if (status === "error") {
    body = (
      <>
        <h1 className="text-3xl font-bold text-slate-900">That didn&apos;t go through</h1>
        <p className="mt-3 text-slate-600">
          Please go back and press the button again, or email{" "}
          <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 underline">
            {SITE.email}
          </a>{" "}
          and we&apos;ll remove you by hand.
        </p>
      </>
    );
  } else {
    const valid = supabaseConfigured && verifyUnsubscribeToken(s ?? null, t ?? null);
    const row = valid
      ? (
          await createAdminClient()
            .from("newsletter_subscribers")
            .select("email, unsubscribed_at")
            .eq("id", s!)
            .maybeSingle()
        ).data
      : null;

    if (!row) {
      body = (
        <>
          <h1 className="text-3xl font-bold text-slate-900">This link doesn&apos;t work</h1>
          <p className="mt-3 text-slate-600">
            It may have been cut off by your email app. Email{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 underline">
              {SITE.email}
            </a>{" "}
            from the address you want removed and we&apos;ll take it off the list.
          </p>
        </>
      );
    } else if (row.unsubscribed_at) {
      body = (
        <>
          <h1 className="text-3xl font-bold text-slate-900">Already unsubscribed</h1>
          <p className="mt-3 text-slate-600">
            {maskEmail(row.email)} is not on the newsletter list. Nothing else to do.
          </p>
        </>
      );
    } else {
      body = (
        <>
          <h1 className="text-3xl font-bold text-slate-900">Unsubscribe from the newsletter?</h1>
          <p className="mt-3 text-slate-600">
            {maskEmail(row.email)} will stop getting {SITE.name} newsletters.
          </p>
          <form
            action={`/api/newsletter/unsubscribe?s=${encodeURIComponent(s!)}&t=${encodeURIComponent(t!)}`}
            method="post"
            className="mt-6"
          >
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Unsubscribe
            </button>
          </form>
        </>
      );
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      {body}
      <p className="mt-10 text-sm">
        <Link href="/" className="font-medium text-indigo-600 hover:underline">
          Back to {SITE.name}
        </Link>
      </p>
    </div>
  );
}
