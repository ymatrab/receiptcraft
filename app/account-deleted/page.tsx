import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account deleted",
  robots: { index: false, follow: false },
};

/** Where "Delete my account" lands. Outside /account, which needs a session. */
export default function AccountDeletedPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Your account is deleted</h1>
      <p className="mt-3 text-slate-600">
        Your account and the data tied to it have been removed from {SITE.name}. You can still
        build receipts without an account at any time.
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Questions? Email{" "}
        <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 underline">
          {SITE.email}
        </a>
        .
      </p>
      <Link
        href="/create"
        className="mt-8 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Make a receipt
      </Link>
    </div>
  );
}
