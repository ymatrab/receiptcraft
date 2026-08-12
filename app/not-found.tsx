import type { Metadata } from "next";
import Link from "next/link";

// This Next build auto-injects `<meta name="robots" content="noindex">` on every
// 404 response (verified on the live 404), and the layout's `index, follow` is
// NOT inherited here. So we must NOT also declare `robots` — doing so renders a
// second, duplicate <meta name="robots"> tag. Keep `alternates` empty so the
// layout's canonical "/" isn't inherited onto the 404.
export const metadata: Metadata = {
  title: "Page not found",
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
