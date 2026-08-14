import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import ReceiptTotalsCalculator from "@/components/tools/ReceiptTotalsCalculator";

export const metadata: Metadata = {
  title: "Free Receipt Total Calculator — Tax, Tip & Change",
  description:
    "Free receipt total calculator: add items, tax, discount and tip to see the subtotal, tax, grand total and cash change instantly — then turn it into a receipt.",
  alternates: { canonical: "/tools/receipt-calculator" },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Receipt Total Calculator",
  url: absoluteUrl("/tools/receipt-calculator"),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "Calculate a receipt's subtotal, tax, discount, tip, grand total and cash change from line items.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Receipt Total Calculator",
      item: absoluteUrl("/tools/receipt-calculator"),
    },
  ],
};

export default function ReceiptCalculatorPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb — matches breadcrumbJsonLd */}
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ledger">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink">Receipt Total Calculator</li>
        </ol>
      </nav>

      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Receipt Total Calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          Add your line items, then a tax rate, discount and tip to see the
          subtotal, tax, grand total and cash change update instantly. When it
          looks right, turn it into a downloadable receipt.
        </p>
      </div>

      <div className="mt-8">
        <ReceiptTotalsCalculator />
      </div>

      {/* Explanatory content — answers "how is a receipt subtotal calculated" */}
      <section className="mt-16 max-w-3xl" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl font-bold text-ink">
          How receipt totals are calculated
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          A receipt total is built up in a fixed order. Each line item is
          multiplied out, summed into a subtotal, reduced by any discount, taxed
          on what remains, and finished with a tip. The calculator above follows
          exactly this order:
        </p>
        <ol className="mt-4 space-y-3 text-ink-soft">
          <li>
            <strong className="text-ink">Subtotal</strong> — the sum of
            every line item&apos;s quantity × unit price, before tax or tip.
          </li>
          <li>
            <strong className="text-ink">Discount</strong> — subtracted
            from the subtotal to give the taxable amount. A discount can never
            take the taxable amount below zero.
          </li>
          <li>
            <strong className="text-ink">Tax</strong> — the tax rate
            applied to the discounted (taxable) amount, not the original
            subtotal.
          </li>
          <li>
            <strong className="text-ink">Tip / gratuity</strong> — added
            after tax. A tip is optional and is not itself taxed.
          </li>
          <li>
            <strong className="text-ink">Total</strong> — taxable amount +
            tax + tip.
          </li>
          <li>
            <strong className="text-ink">Change</strong> — only when paid
            in cash: the amount tendered minus the total.
          </li>
        </ol>
        <div className="mt-6 rounded-[3px] border border-rule bg-greenbar p-5 font-mono text-sm text-ink">
          subtotal = Σ (qty × price)
          <br />
          taxable = subtotal − discount
          <br />
          tax = taxable × (tax rate ÷ 100)
          <br />
          total = taxable + tax + tip
          <br />
          change = tendered − total <span className="text-ink-soft/70">(cash only)</span>
        </div>

        <p className="mt-8 leading-relaxed text-ink-soft">
          Need a document, not just the math?{" "}
          <Link href="/create" className="font-semibold text-ledger hover:text-ledger-deep">
            Make a full receipt
          </Link>{" "}
          with these totals, your business details and a logo — or start from a{" "}
          <Link href="/templates" className="font-semibold text-ledger hover:text-ledger-deep">
            ready-made template
          </Link>
          . Splitting the bill across cash and cards? Use the{" "}
          <Link
            href="/tools/split-payment-checker"
            className="font-semibold text-ledger hover:text-ledger-deep"
          >
            split-payment checker
          </Link>
          . For what every other field on a receipt means, see the{" "}
          <Link
            href="/guides/receipt-anatomy"
            className="font-semibold text-ledger hover:text-ledger-deep"
          >
            anatomy of a receipt
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
