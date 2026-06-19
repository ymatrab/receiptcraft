import type { Metadata } from "next";
import Link from "next/link";
import { INTENT_PAGES, intentContent } from "@/lib/intent-pages";

export const metadata: Metadata = {
  title: "Receipt Help — Find, Copy & Replace Lost Brand Receipts",
  description:
    "Lost a receipt or need a copy? Step-by-step guides for finding, reprinting and replacing receipts from Walmart, Amazon, Uber, McDonald's and more.",
  alternates: { canonical: "/receipt-help" },
};

export default function ReceiptHelpHub() {
  // Group guides by brand for a clean index.
  const byBrand = new Map<string, { name: string; pages: typeof INTENT_PAGES }>();
  for (const p of INTENT_PAGES) {
    const entry = byBrand.get(p.brandSlug) ?? { name: p.brandName, pages: [] };
    entry.pages.push(p);
    byBrand.set(p.brandSlug, entry);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Receipt help</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Lost a receipt, need a duplicate, or returning an item? These guides show how to find,
          reprint and replace receipts from popular brands — and how to recreate one for your records
          when the original is gone.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...byBrand.entries()].map(([slug, { name, pages }]) => (
          <div key={slug} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">{name}</h2>
            <ul className="mt-2 space-y-1.5">
              {pages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/receipt-help/${p.slug}`} className="text-sm text-indigo-600 hover:text-indigo-700">
                    {intentContent(p).h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
