import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { fulfilReturningBuyer } from "@/lib/stripe-passes";
import ProActivating from "./ProActivating";

export const metadata: Metadata = {
  title: "Activating your Pro access",
  // A post-purchase page has nothing to offer search, and indexing it would put
  // a "thanks for your payment" page in front of people who have not paid.
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ProActivatingPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  // Stripe returns here with the session id. Grant before the page renders, so
  // the first poll below already finds Pro instead of waiting on the webhook.
  const { session_id } = await searchParams;
  if (session_id) {
    const user = await getCurrentUser();
    if (user) await fulfilReturningBuyer(session_id, user.id);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24">
      <ProActivating sessionId={session_id} />
    </div>
  );
}
