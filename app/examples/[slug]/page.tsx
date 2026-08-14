import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getExample,
  receiptFromExample,
  exampleTotal,
  exampleSummary,
  EXAMPLE_SLUGS,
  EXAMPLES,
} from "@/lib/examples";
import { docFromReceiptData } from "@/lib/sections";
import { fitSeoDescription } from "@/lib/seo-description";
import { formatMoney, formatDisplayDate } from "@/lib/format";
import { SITE, absoluteUrl } from "@/lib/site";
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
  const full = `See a realistic ${ex.brand} receipt example: ${exampleSummary(ex)}, totalling ${total}. Make your own editable ${ex.brand} receipt and download it as PDF or PNG.`;
  // Long item summaries (or long brand names) can push the rich description past
  // the ~160-char SERP truncation limit — fall back to a concise variant then.
  const description = fitSeoDescription(
    full.length <= 160
      ? full
      : `${ex.brand} receipt example totalling ${total}. Make your own editable version and download it free as PDF or PNG.`,
  );
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
  const location = data.addressLine2 || data.addressLine1;

  // Related examples: prefer the same base category, fall back to any others.
  const sameBase = EXAMPLES.filter((e) => e.slug !== ex.slug && e.base === ex.base);
  const related = (sameBase.length ? sameBase : EXAMPLES.filter((e) => e.slug !== ex.slug)).slice(0, 6);

  // BreadcrumbList only. The former ItemList of receipt line items had no per-item
  // URLs, so it was ineligible for any Google rich result — dropped as noise.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Receipt Examples", item: absoluteUrl("/examples") },
      { "@type": "ListItem", position: 3, name: `${ex.brand} Receipt Example`, item: absoluteUrl(`/examples/${ex.slug}`) },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav className="text-sm text-ink-soft">
        <Link href="/examples" className="hover:text-ink">Examples</Link>
        <span className="px-1">/</span>
        <span className="text-ink">{ex.brand}</span>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {ex.brand} Receipt Example
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            This is a sample {ex.brand} receipt showing {exampleSummary(ex)}, with a total of{" "}
            <strong>{totalStr}</strong>. Use it as a reference for what a real {ex.brand} receipt
            looks like — then make your own with your items, prices, date and store details.
          </p>

          <div className="mt-6">
            <Link
              href={`/create?template=${encodeURIComponent(ex.base)}`}
              className="inline-block rounded-full bg-ledger px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-ledger/25 hover:bg-ledger-deep"
            >
              Make a {ex.brand} receipt
            </Link>
          </div>

          <h2 className="mt-10 text-xl font-bold text-ink">What&apos;s on this receipt</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-ink-soft/70">
              <tr><th className="py-2">Item</th><th className="py-2">Qty</th><th className="py-2 text-right">Price</th></tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {ex.items.map((it) => (
                <tr key={it.name}>
                  <td className="py-2 text-ink">{it.name}</td>
                  <td className="py-2 text-ink-soft">{it.quantity}</td>
                  <td className="py-2 text-right text-ink">{formatMoney(it.price, data.currency)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2" colSpan={2}>Total (incl. tax)</td>
                <td className="py-2 text-right">{totalStr}</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            This {ex.brand} example reflects a {data.paymentMethod.toLowerCase()} purchase
            {location ? ` in ${location}` : ""} on {formatDisplayDate(data.date)},
            with {data.taxLabel.toLowerCase()} at {data.taxRate}%
            {total ? ` and a ${totalStr} total` : ""}. Yours can use any items,
            currency, tax rate, date and payment method you like.
          </p>

          <h2 className="mt-10 text-xl font-bold text-ink">Make your own in under a minute</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            {SITE.name} lets you customize every field — business name, address, items, quantities,
            prices, tax, payment method and date — with a live preview, then download as a PDF or
            high-resolution PNG. No design skills needed.
          </p>
        </div>

        {/* Rendered example receipt */}
        <div className="lg:sticky lg:top-20">
          <div className="rounded-[3px] bg-gradient-to-b from-rule to-rule/60 p-6">
            <div className="flex justify-center">
              <ReceiptDocPaper doc={docFromReceiptData(data)} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-examples-heading">
          <h2 id="related-examples-heading" className="text-xl font-bold text-ink">
            More receipt examples
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {related.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/examples/${e.slug}`}
                  className="block rounded-[3px] border border-rule bg-card px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-ledger/45 hover:text-ledger-deep"
                >
                  {e.brand} receipt
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
