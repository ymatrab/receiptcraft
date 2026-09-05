import type { Metadata } from "next";
import ProActivating from "./ProActivating";

export const metadata: Metadata = {
  title: "Activating your Pro access",
  // A post-purchase page has nothing to offer search, and indexing it would put
  // a "thanks for your payment" page in front of people who have not paid.
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function ProActivatingPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24">
      <ProActivating />
    </div>
  );
}
