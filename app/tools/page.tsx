import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Receipt Tools — Total Calculator & Split-Payment Checker",
  description:
    "Free browser-based receipt tools: calculate subtotal, tax, discount, tip, total and change, or reconcile a bill split across several payments. No sign-up.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    name: "Receipt Total Calculator",
    href: "/tools/receipt-calculator",
    icon: "🧮",
    tint: "bg-indigo-50 ring-indigo-100",
    tagline: "Work out what a receipt should add up to.",
    description:
      "Enter line items with quantities and prices, then set a tax rate, discount and tip. It returns the subtotal, tax amount, grand total and — for cash — the change owed.",
    answers: [
      "What is the tax on this subtotal?",
      "What should the total be after a discount?",
      "How much change is owed from a cash payment?",
    ],
  },
  {
    name: "Split-Payment Checker",
    href: "/tools/split-payment-checker",
    icon: "🔀",
    tint: "bg-violet-50 ring-violet-100",
    tagline: "Confirm a split bill actually reconciles.",
    description:
      "Enter the receipt total and each payment — cash, card, gift card — and it shows what is still outstanding, or how much was overpaid, down to the cent.",
    answers: [
      "Do these payments add up to the total?",
      "How much is still outstanding?",
      "Was the bill overpaid, and by how much?",
    ],
  },
];

// The order below is the order the calculator actually applies, verified
// against components/tools/ReceiptTotalsCalculator.tsx. It is the part people
// get wrong — discount reduces the taxable amount, and tip is never taxed.
const CALC_STEPS = [
  {
    step: "Subtotal",
    formula: "quantity × unit price, summed across every line",
    note: "The value of the goods before anything is added or taken off.",
  },
  {
    step: "Discount",
    formula: "subtotal − discount = taxable amount",
    note: "The discount comes off first, and it can never exceed the subtotal.",
  },
  {
    step: "Tax",
    formula: "taxable amount × (tax rate ÷ 100)",
    note: "Tax is charged on the discounted figure, not the original subtotal.",
  },
  {
    step: "Tip",
    formula: "added after tax",
    note: "A tip is not taxable, so it never changes the tax amount.",
  },
  {
    step: "Total",
    formula: "taxable amount + tax + tip",
    note: "The grand total the customer owes.",
  },
  {
    step: "Change",
    formula: "cash tendered − total",
    note: "Only applies when paying cash and the amount tendered exceeds the total.",
  },
];

const FAQ = [
  {
    q: "Is sales tax calculated before or after a discount?",
    a: "After. A discount reduces the taxable amount first, and tax is then charged on the reduced figure. On a $14.25 subtotal with a $2.00 discount and 8.5% tax, tax is charged on $12.25 — not on $14.25 — giving $1.04 rather than $1.21.",
  },
  {
    q: "Is a tip taxed on a receipt?",
    a: "No. A tip is added after tax has been calculated, so it never increases the tax amount. Tax applies to the goods and services sold; a voluntary tip is not part of that taxable sale.",
  },
  {
    q: "How do I check that split payments add up to the total?",
    a: "Subtract the sum of every payment from the receipt total. If the result is zero the bill reconciles; a positive number is still outstanding and a negative number means the bill was overpaid, which on a cash tender is the change owed. The Split-Payment Checker treats anything within half a cent as balanced to absorb rounding.",
  },
  {
    q: "How is change calculated on a receipt?",
    a: "Change equals the cash tendered minus the grand total, and it only applies when the amount handed over is greater than the total. Card and gift-card payments do not produce change.",
  },
  {
    q: "Do these tools need an account?",
    a: `No. Both tools run entirely in your browser on ${SITE.name}, nothing is sent to a server, and no sign-up is required to use them.`,
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
  ],
};

// ItemList of the tools themselves, so the hub is machine-readable as a
// collection rather than as a page that merely mentions two names.
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Free receipt tools by ${SITE.name}`,
  url: absoluteUrl("/tools"),
  numberOfItems: TOOLS.length,
  itemListElement: TOOLS.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: tool.name,
      url: absoluteUrl(tool.href),
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      description: tool.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Visible breadcrumb — matches breadcrumbJsonLd (Home / Tools). */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">Tools</li>
        </ol>
      </nav>

      <div className="mt-6 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Free tools</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Receipt tools</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Two free calculators for the arithmetic that comes before the receipt.
          Both run in your browser — nothing is uploaded, and neither needs an
          account.
        </p>
      </div>

      {/* ===== THE TOOLS ===== */}
      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1 ${tool.tint}`}
              >
                <span aria-hidden="true">{tool.icon}</span>
              </span>
              <h2 className="mt-5 text-xl font-bold text-slate-900">{tool.name}</h2>
              <p className="mt-1 font-medium text-indigo-600">{tool.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.description}</p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Answers
              </p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {tool.answers.map((answer) => (
                  <li key={answer} className="flex gap-2 text-sm text-slate-600">
                    <span aria-hidden="true" className="text-indigo-400">
                      ›
                    </span>
                    {answer}
                  </li>
                ))}
              </ul>

              <Link
                href={tool.href}
                className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
              >
                Open {tool.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* ===== HOW THE MATH WORKS ===== */}
      <section className="mt-20" aria-labelledby="math-heading">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            The order of operations
          </p>
          <h2 id="math-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            How a receipt total is calculated
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            A receipt total is built in a fixed order, and the order matters: a
            discount is applied before tax, and a tip is added after it.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-5 py-3 font-semibold text-slate-900">
                  Step
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-slate-900">
                  Formula
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-slate-900">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody>
              {CALC_STEPS.map((row, i) => (
                <tr key={row.step} className={i > 0 ? "border-t border-slate-100" : undefined}>
                  <th scope="row" className="px-5 py-3.5 align-top font-semibold text-slate-900">
                    {i + 1}. {row.step}
                  </th>
                  <td className="px-5 py-3.5 align-top font-mono text-[13px] text-indigo-700">
                    {row.formula}
                  </td>
                  <td className="px-5 py-3.5 align-top leading-relaxed text-slate-600">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* A worked example makes the order concrete and is the part that gets
            quoted — the numbers below are what the calculator returns. */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
            <h3 className="font-semibold text-slate-900">Worked example</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Two lattes at $5.25 and one croissant at $3.75, with a $2.00
              discount, 8.5% sales tax and a $2.00 tip, paid with a $20 note.
              Because the discount is applied first, tax is charged on $12.25
              rather than $14.25 — a difference of 17 cents.
            </p>
          </div>

          <dl className="rounded-2xl border border-slate-200 bg-white p-6 text-sm">
            {[
              ["2 × Latte @ $5.25", "$10.50"],
              ["1 × Croissant @ $3.75", "$3.75"],
              ["Subtotal", "$14.25"],
              ["Discount", "−$2.00"],
              ["Taxable amount", "$12.25"],
              ["Tax (8.5%)", "$1.04"],
              ["Tip", "$2.00"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-1.5">
                <dt className="text-slate-600">{label}</dt>
                <dd className="tabular-nums text-slate-900">{value}</dd>
              </div>
            ))}
            <div className="mt-2 flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-bold">
              <dt className="text-slate-900">Total</dt>
              <dd className="tabular-nums text-indigo-600">$15.29</dd>
            </div>
            <div className="flex justify-between gap-4 py-1.5">
              <dt className="text-slate-600">Change from $20.00</dt>
              <dd className="tabular-nums text-slate-900">$4.71</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mt-20" aria-labelledby="tools-faq-heading">
        <h2
          id="tools-faq-heading"
          className="text-3xl font-bold tracking-tight text-slate-900"
        >
          Receipt maths, answered
        </h2>
        <dl className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-14 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-white">
            Got the numbers? Turn them into a receipt
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-lg text-indigo-100">
            The builder does the same arithmetic automatically — then gives you a
            finished receipt to download as a PDF or PNG.
          </p>
          <Link
            href="/create"
            className="relative mt-7 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-700 shadow-xl transition-transform hover:scale-105"
          >
            Open the Receipt Builder
          </Link>
        </div>
      </section>
    </div>
  );
}
