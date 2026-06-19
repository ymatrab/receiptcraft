import type { Metadata } from "next";
import Link from "next/link";
import { EXAMPLES, exampleTotal, exampleSummary, receiptFromExample } from "@/lib/examples";
import { docFromReceiptData } from "@/lib/sections";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

export const metadata: Metadata = {
  title: "Receipt Examples — Real Sample Receipts by Brand",
  description:
    "Browse realistic receipt examples by brand — coffee shops, restaurants, grocery, retail, gas, hotels and more. See what each receipt looks like, then make your own.",
  alternates: { canonical: "/examples" },
};

export default function ExamplesIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Receipt examples</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Real sample receipts from popular brands — see exactly what each one looks like, then
          create your own editable version with {SITE.name}.
        </p>
      </header>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {EXAMPLES.map((ex) => {
          const data = receiptFromExample(ex);
          return (
            <li key={ex.slug}>
              <Link
                href={`/examples/${ex.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                {/* Visual receipt preview */}
                <div className="relative flex h-64 items-start justify-center overflow-hidden bg-slate-50/80 pt-6">
                  <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />
                  <div className="origin-top scale-[0.58] transition-transform duration-300 ease-out group-hover:scale-[0.61]">
                    <div className="rounded bg-white shadow-md">
                      <ReceiptDocPaper doc={docFromReceiptData(data)} />
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-20 flex flex-1 flex-col bg-white p-5">
                  <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {ex.brand} Receipt Example
                  </h2>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">{exampleSummary(ex)}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600">
                    {formatMoney(exampleTotal(ex), data.currency)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
