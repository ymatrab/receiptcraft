import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import SplitPaymentChecker from "@/components/tools/SplitPaymentChecker";

export const metadata: Metadata = {
  title: "Split Payment Checker — Reconcile Multiple Tenders",
  description:
    "Free split-payment checker: enter a receipt total and each payment (cash, card, gift card) to confirm the amounts add up — then put them on one receipt.",
  alternates: { canonical: "/tools/split-payment-checker" },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Split Payment Checker",
  url: absoluteUrl("/tools/split-payment-checker"),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "Reconcile a receipt total against multiple payment methods and confirm the tenders sum to the total.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Split Payment Checker",
      item: absoluteUrl("/tools/split-payment-checker"),
    },
  ],
};

export default function SplitPaymentCheckerPage() {
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

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">Split Payment Checker</li>
        </ol>
      </nav>

      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Split Payment Checker
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          Paying one receipt with more than one method? Enter the total and each
          payment to confirm the amounts add up exactly — no short or over
          balances.
        </p>
      </div>

      <div className="mt-8">
        <SplitPaymentChecker />
      </div>

      {/* Explanatory content — answers "how do split payments appear on a receipt" */}
      <section className="mt-16 max-w-3xl" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl font-bold text-slate-900">
          How split payments appear on a receipt
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          When a customer splits one purchase across several payment methods, a
          well-formed receipt lists <strong>each method and its amount
          separately</strong> below the total, and the sum of those tenders
          equals the final total. A quick checklist:
        </p>
        <ul className="mt-4 space-y-3 text-slate-600">
          <li>
            <strong className="text-slate-900">One total, several tenders.</strong>{" "}
            Show the grand total once, then a line per payment (e.g. Cash $20,
            Card $30).
          </li>
          <li>
            <strong className="text-slate-900">The tenders must reconcile.</strong>{" "}
            The payments should add up to the total; any cash overpayment is
            returned as change.
          </li>
          <li>
            <strong className="text-slate-900">Never print full card data.</strong>{" "}
            Mask card numbers (last 4 digits only) and never show a full PAN,
            CVV or PIN on the receipt.
          </li>
          <li>
            <strong className="text-slate-900">Label each method clearly.</strong>{" "}
            Cash, credit, debit, gift card or store credit — each on its own
            line so the split is auditable.
          </li>
        </ul>

        <p className="mt-8 leading-relaxed text-slate-600">
          Once the split balances, you can{" "}
          <Link href="/create" className="font-semibold text-indigo-600 hover:text-indigo-700">
            build a receipt
          </Link>{" "}
          that lists each payment, or use the{" "}
          <Link
            href="/tools/receipt-calculator"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            receipt total calculator
          </Link>{" "}
          to work out the total first.
        </p>
      </section>
    </main>
  );
}
