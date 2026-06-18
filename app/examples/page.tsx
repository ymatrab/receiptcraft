import type { Metadata } from "next";
import Link from "next/link";
import { EXAMPLES, exampleTotal, exampleSummary, receiptFromExample } from "@/lib/examples";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt Examples — Real Sample Receipts by Brand",
  description:
    "Browse realistic receipt examples by brand — coffee shops, restaurants, grocery, retail, gas, hotels and more. See what each receipt looks like, then make your own.",
  alternates: { canonical: "/examples" },
};

export default function ExamplesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Receipt examples</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Real sample receipts from popular brands — see exactly what each one looks like, then
          create your own editable version with {SITE.name}.
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((ex) => {
          const currency = receiptFromExample(ex).currency;
          return (
            <Link
              key={ex.slug}
              href={`/examples/${ex.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="font-bold text-slate-900 group-hover:text-indigo-700">
                {ex.brand} Receipt Example
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{exampleSummary(ex)}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-600">
                {formatMoney(exampleTotal(ex), currency)}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
