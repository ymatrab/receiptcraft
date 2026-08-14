import type { Metadata } from "next";
import Link from "next/link";

// This Next build does two conflicting things on a 404, verified against the live
// page: (1) it auto-injects its own `<meta name="robots" content="noindex">`, and
// (2) it STILL inherits the root layout's sitewide `index, follow` unless we
// override it here. So we must declare noindex robots (incl. googleBot) to
// suppress that inherited `index, follow`. The trade-off is two `<meta name=
// "robots">` tags (the framework's + ours) — but BOTH are noindex, so it's
// harmless. Do NOT remove this: without it, `index, follow` leaks onto the 404.
// `alternates: {}` likewise stops the layout's canonical "/" being inherited.
export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {},
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="text-6xl" aria-hidden="true">🧾</span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
        This page got lost like a paper receipt
      </h1>
      <p className="mt-3 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to
        making receipts.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Go Home
        </Link>
        <Link
          href="/create"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Create a Receipt
        </Link>
      </div>
    </div>
  );
}
