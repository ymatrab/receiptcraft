import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getExample,
  receiptFromExample,
  exampleTotal,
  exampleSummary,
  EXAMPLE_SLUGS,
} from "@/lib/examples";
import { docFromReceiptData } from "@/lib/sections";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

export function generateStaticParams() {
  return EXAMPLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ex = getExample(slug);
  if (!ex) return { title: "Example not found" };
  const data = receiptFromExample(ex);
  const total = formatMoney(exampleTotal(ex), data.currency);
  // Keep the title short enough to avoid SERP truncation (~60 chars incl. the
  // " | Makecepeit" suffix); the verbose item summary stays in the description.
  const title = `${ex.brand} Receipt Example (${total})`;
  const description = `See a realistic ${ex.brand} receipt example: ${exampleSummary(ex)}, totalling ${total}. Make your own editable ${ex.brand} receipt and download it as PDF or PNG.`;
  return { title, description, alternates: { canonical: `/examples/${ex.slug}` } };
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ex = getExample(slug);
  if (!ex) notFound();

  const data = receiptFromExample(ex);
  const total = exampleTotal(ex);
  const totalStr = formatMoney(total, data.currency);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${ex.brand} receipt example items`,
    itemListElement: ex.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/examples" className="hover:text-slate-700">Examples</Link>
        <span className="px-1">/</span>
        <span className="text-slate-700">{ex.brand}</span>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {ex.brand} Receipt Example
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            This is a sample {ex.brand} receipt showing {exampleSummary(ex)}, with a total of{" "}
            <strong>{totalStr}</strong>. Use it as a reference for what a real {ex.brand} receipt
            looks like — then make your own with your items, prices, date and store details.
          </p>

          <div className="mt-6">
            <Link
              href={`/create?template=${encodeURIComponent(ex.base)}`}
              className="inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700"
            >
              Make a {ex.brand} receipt
            </Link>
          </div>

          <h2 className="mt-10 text-xl font-bold text-slate-900">What&apos;s on this receipt</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr><th className="py-2">Item</th><th className="py-2">Qty</th><th className="py-2 text-right">Price</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ex.items.map((it) => (
                <tr key={it.name}>
                  <td className="py-2 text-slate-700">{it.name}</td>
                  <td className="py-2 text-slate-500">{it.quantity}</td>
                  <td className="py-2 text-right text-slate-700">{formatMoney(it.price, data.currency)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2" colSpan={2}>Total (incl. tax)</td>
                <td className="py-2 text-right">{totalStr}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-10 text-xl font-bold text-slate-900">Make your own in under a minute</h2>
          <p className="mt-2 leading-relaxed text-slate-600">
            {SITE.name} lets you customize every field — business name, address, items, quantities,
            prices, tax, payment method and date — with a live preview, then download as a PDF or
            high-resolution PNG. No design skills needed.
          </p>
        </div>

        {/* Rendered example receipt */}
        <div className="lg:sticky lg:top-20">
          <div className="rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-6">
            <div className="flex justify-center">
              <ReceiptDocPaper doc={docFromReceiptData(data)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
