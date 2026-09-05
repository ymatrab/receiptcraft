import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { Cite, CitedSentence, SourceList } from "@/components/Sources";
import { SOURCES, citationJsonLd, lastVerified, type SourceId } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Anatomy of a Receipt: Every Field Explained",
  description:
    "A field-by-field dictionary of what's on a receipt — transaction ID, authorization code, subtotal, tax, EMV tags (AID/TVR/TSI), masked card numbers and more.",
  alternates: { canonical: "/guides/receipt-anatomy" },
};

interface Term {
  term: string;
  aka?: string;
  def: string;
  /** A follow-on sentence attributing the rule to a named authority, rendered
   *  as prose inside the definition itself — the in-body form is what makes a
   *  passage citable, a footer list alone is not. Put `{source}` where the link
   *  belongs; JSON-LD gets the same sentence with the document title inlined. */
  cite?: { id: SourceId; sentence: string };
}

/** Every authority this page draws on, including ones referenced by the
 *  section prose rather than by a single term. */
const PAGE_SOURCES: SourceId[] = [
  "irs-pub-463",
  "irs-pub-583",
  "irs-pub-531",
  "irs-rr-2012-18",
  "fcra-1681c-g",
  "pci-dss",
  "emvco-specs",
  "eu-vat-directive-226",
  "hmrc-vat-notice-700",
];

/** Plain-text form of a cited sentence, for the JSON-LD description. */
function citeText(cite: Term["cite"]): string {
  if (!cite) return "";
  return cite.sentence.replace("{source}", SOURCES[cite.id]?.title ?? "");
}

interface Section {
  id: string;
  title: string;
  terms: Term[];
}

const SECTIONS: Section[] = [
  {
    id: "header",
    title: "Header — who issued it",
    terms: [
      {
        term: "Merchant / store name",
        def: "The business that issued the receipt, usually printed at the top with a logo. It identifies who sold the goods or services and is the first thing used to recognize where a purchase was made.",
      },
      {
        term: "Store address & phone",
        def: "The physical location and contact number of the store or branch. For multi-location businesses this pinpoints which outlet handled the sale, which matters for returns, warranty claims and expense records.",
      },
      {
        term: "Store / location number",
        def: "A short code identifying the specific branch within a chain (e.g. 'Store #1042'). It distinguishes one outlet from another and appears on returns and internal reporting.",
      },
    ],
  },
  {
    id: "identifiers",
    title: "Transaction identifiers",
    terms: [
      {
        term: "Receipt number",
        def: "A unique number the point-of-sale system assigns to this receipt. It lets the merchant look up the exact transaction later and is what you quote when requesting a copy or making a return.",
        cite: {
          id: "irs-pub-583",
          sentence:
            "The IRS treats receipts as the supporting documents behind a business's gross receipts, which is why {source} tells businesses to keep them.",
        },
      },
      {
        term: "Transaction ID",
        def: "A unique identifier the payment system assigns to the whole transaction, often longer than the receipt number. It ties the sale to the processor's records and is used to trace or dispute a charge.",
      },
      {
        term: "Order number",
        def: "An identifier for the order itself, common in restaurants, online and pickup. It can differ from the receipt or transaction number and is used to match the order to what was prepared or shipped.",
      },
      {
        term: "Authorization code",
        aka: "auth code / approval code",
        def: "A short code (often 6 digits) the card issuer returns to approve a card payment. It confirms the issuer authorized the charge — it is not the transaction ID — and is quoted when investigating a disputed card payment.",
      },
      {
        term: "Reference number (RRN)",
        def: "The Retrieval Reference Number the acquiring bank assigns to a card transaction. It uniquely identifies the payment within the banking network and is used to retrieve or reconcile it.",
      },
      {
        term: "Batch number",
        def: "Identifies the group ('batch') of card transactions a terminal settles together, usually at end of day. It helps the merchant and processor reconcile a day's card sales.",
      },
      {
        term: "Terminal ID (TID)",
        def: "A number identifying the specific card terminal or register that processed the payment, telling the processor which device took the transaction.",
      },
      {
        term: "Cashier / server ID",
        def: "Identifies the employee who rang up the sale. It supports accountability, tip attribution and shift reconciliation, and is usually a number or a first name.",
      },
      {
        term: "Register / lane number",
        def: "Identifies the checkout station where the sale happened. Combined with the date and time it helps locate a transaction in the store's records.",
      },
      {
        term: "Invoice number",
        def: "A sequential number identifying an invoice that a receipt may reference once it is paid, linking the payment to the bill that was issued.",
      },
    ],
  },
  {
    id: "datetime",
    title: "Date & time",
    terms: [
      {
        term: "Date & time",
        def: "When the transaction took place. It is central to warranties, return windows, expense reports and reconciling a receipt against a bank statement.",
      },
      {
        term: "Time zone",
        def: "The time zone the timestamp is in. It matters when reconciling online or card transactions recorded in a different zone than the store.",
      },
    ],
  },
  {
    id: "totals",
    title: "Items, tax & totals",
    terms: [
      {
        term: "Line item",
        def: "A single product or service on the receipt, typically showing description, quantity and unit price. The line items are what the subtotal is built from.",
      },
      {
        term: "SKU / item number",
        def: "A Stock Keeping Unit — the merchant's internal code for a specific product. It identifies exactly which item was sold, for returns, inventory and reordering.",
      },
      {
        term: "Subtotal",
        def: "The sum of all line items before tax, tip or fees, after any item-level discounts. It is the base amount that tax is usually calculated on.",
      },
      {
        term: "Discount / coupon",
        def: "An amount subtracted from the price, per item or from the subtotal. It should be clearly labeled and reduces the amount that tax is applied to.",
      },
      {
        term: "Sales tax & tax rate",
        def: "Government tax added to taxable items, shown as a rate (%) and a calculated amount. Tax is applied to the taxable subtotal after discounts; some items may be tax-exempt.",
        cite: {
          id: "eu-vat-directive-226",
          sentence:
            "Outside the US the equivalent field is VAT or GST: {source} sets out the tax particulars an EU invoice has to carry, including the rate applied and the supplier's VAT number.",
        },
      },
      {
        term: "Tip / gratuity",
        def: "An optional amount added for service, common in restaurants and personal services. It is added after tax and is not itself taxed.",
        cite: {
          id: "irs-pub-531",
          sentence:
            "A tip belongs to the employee who received it and is reported as tip income under {source}.",
        },
      },
      {
        term: "Service charge",
        def: "A mandatory fee the business adds (e.g. large-party or delivery), distinct from a voluntary tip. Unlike a tip it may be taxable and is set by the business, not the customer.",
        cite: {
          id: "irs-rr-2012-18",
          sentence:
            "The distinction is not cosmetic: in {source} the IRS held that an automatic gratuity is a service charge rather than a tip, which changes how it is taxed and paid out.",
        },
      },
      {
        term: "Total / grand total",
        def: "The final amount due: taxable subtotal + tax + tip and any fees. It is what the customer actually pays.",
      },
      {
        term: "Amount tendered",
        def: "The amount the customer handed over, relevant for cash payments. If it exceeds the total, the difference is returned as change.",
      },
      {
        term: "Change due",
        def: "For cash payments, the amount returned to the customer: amount tendered minus the total.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & card fields",
    terms: [
      {
        term: "Payment method",
        def: "How the purchase was paid — cash, credit, debit, gift card, mobile wallet, or a split of several. A split payment lists each method and its amount, and they must sum to the total.",
      },
      {
        term: "Card type",
        def: "The card network or type used (Visa, Mastercard, Amex, Discover; credit or debit). It appears on card payments alongside the masked number.",
      },
      {
        term: "Card last four / masked number",
        def: "Only the last four digits of the card are printed; the rest are masked (e.g. ************1234). A compliant receipt never shows the full card number, expiry date or security code.",
        cite: {
          id: "fcra-1681c-g",
          sentence:
            "This is a legal requirement in the US, not a convention — {source} bars an electronically printed receipt from showing more than the last five digits of the card number, or the expiry date at all.",
        },
      },
      {
        term: "Entry method",
        def: "How the card was read — chip (EMV), contactless tap, magnetic-stripe swipe, or manually keyed. It affects fraud protection and liability for the transaction.",
      },
      {
        term: "AID (Application Identifier)",
        def: "An EMV chip field identifying the card application the terminal used (e.g. a Visa or Mastercard debit or credit app). It appears on chip-card receipts and confirms which app processed the payment.",
        cite: {
          id: "emvco-specs",
          sentence:
            "AID is defined in the chip-card specifications published by EMVCo ({source}).",
        },
      },
      {
        term: "TVR (Terminal Verification Results)",
        def: "An EMV code (10 hex characters) recording the checks the terminal ran during a chip transaction. It is diagnostic data used mainly for dispute and fraud analysis.",
        cite: {
          id: "emvco-specs",
          sentence:
            "The bit-by-bit meaning of each TVR position is specified in {source}.",
        },
      },
      {
        term: "TSI (Transaction Status Information)",
        def: "An EMV field summarizing which functions were performed in a chip transaction, such as cardholder verification. Like the TVR, it is technical data for reconciliation and disputes.",
      },
      {
        term: "Cardholder verification (CVM)",
        def: "How the cardholder was verified — PIN, signature, or none (common for small contactless taps). It shows the method used to authorize the card payment.",
      },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    terms: [
      {
        term: "Barcode / QR code",
        def: "An encoded version of the receipt or transaction number, scannable for fast returns or loyalty. It should encode a reference only — never full card or personal data.",
        cite: {
          id: "pci-dss",
          sentence:
            "Encoding card data into the barcode would defeat the masking on the face of the receipt, which {source} exists to enforce.",
        },
      },
      {
        term: "Return policy",
        def: "A short statement of the return or exchange window and conditions, often at the bottom. It is part of the receipt's role as proof of purchase.",
      },
      {
        term: "Thank-you / survey message",
        def: "A closing message, sometimes with a survey link or code. It is marketing rather than transactional and carries no financial meaning.",
      },
    ],
  },
];

const ALL_TERMS = SECTIONS.flatMap((s) => s.terms);

const definedTermSetJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Anatomy of a Receipt: Field Dictionary",
  url: absoluteUrl("/guides/receipt-anatomy"),
  hasDefinedTerm: ALL_TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.cite ? `${t.def} ${citeText(t.cite)}` : t.def,
    inDefinedTermSet: absoluteUrl("/guides/receipt-anatomy"),
  })),
  citation: citationJsonLd(PAGE_SOURCES),
  dateModified: lastVerified(PAGE_SOURCES),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides/receipt-anatomy") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Anatomy of a Receipt",
      item: absoluteUrl("/guides/receipt-anatomy"),
    },
  ],
};

export default function ReceiptAnatomyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
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
          <li className="font-medium text-slate-900">Anatomy of a Receipt</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Anatomy of a receipt: every field explained
      </h1>

      {/* Concise, extractable summary answer (AEO) */}
      <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-relaxed text-slate-700">
        A receipt records a single transaction. From top to bottom it typically
        shows the <strong>merchant and location</strong>, a{" "}
        <strong>date and time</strong>, <strong>transaction identifiers</strong>{" "}
        (receipt, order and authorization numbers), the{" "}
        <strong>line items</strong> and their <strong>subtotal</strong>,{" "}
        <strong>discounts and tax</strong>, any <strong>tip or fees</strong>, the{" "}
        <strong>grand total</strong>, and <strong>how it was paid</strong> — with
        only the last four digits of any card. This dictionary defines each field,
        with the rule behind it cited where one exists — the substantiation
        requirements in <Cite id="irs-pub-463" />, the card-truncation rule in{" "}
        <Cite id="fcra-1681c-g">15 U.S.C. § 1681c(g)</Cite>, and the EMV chip
        fields defined by <Cite id="emvco-specs">EMVCo</Cite>.
      </p>

      {/* Table of contents */}
      <nav aria-label="Sections" className="mt-8">
        <ul className="flex flex-wrap gap-2 text-sm">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {SECTIONS.map((s) => (
        <section key={s.id} className="mt-12 scroll-mt-24" aria-labelledby={`${s.id}-heading`} id={s.id}>
          <h2 id={`${s.id}-heading`} className="text-2xl font-bold text-slate-900">
            {s.title}
          </h2>
          <dl className="mt-5 space-y-5">
            {s.terms.map((t) => (
              <div key={t.term} className="border-l-2 border-slate-100 pl-4">
                <dt className="font-semibold text-slate-900">
                  {t.term}
                  {t.aka ? (
                    <span className="ml-2 text-sm font-normal text-slate-500">({t.aka})</span>
                  ) : null}
                </dt>
                <dd className="mt-1 leading-relaxed text-slate-600">
                  {t.def}
                  {t.cite ? (
                    <>
                      {" "}
                      <CitedSentence id={t.cite.id} sentence={t.cite.sentence} />
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <SourceList
        ids={PAGE_SOURCES}
        note="Definitions above are ours; where a field is governed by a published rule we link the issuing authority rather than paraphrasing it."
      />

      {/* Internal links — put the fields to use */}
      <section className="mt-14 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6">
        <h2 className="text-xl font-bold text-slate-900">Put these fields to use</h2>
        <ul className="mt-3 space-y-2 text-slate-600">
          <li>
            <Link href="/create" className="font-semibold text-indigo-600 hover:underline">
              Build a receipt
            </Link>{" "}
            with any of these fields — header, items, tax, payment and barcode.
          </li>
          <li>
            Work out the{" "}
            <Link
              href="/tools/receipt-calculator"
              className="font-semibold text-indigo-600 hover:underline"
            >
              subtotal, tax and total
            </Link>{" "}
            with the receipt calculator.
          </li>
          <li>
            Reconcile a{" "}
            <Link
              href="/tools/split-payment-checker"
              className="font-semibold text-indigo-600 hover:underline"
            >
              split payment
            </Link>{" "}
            across several methods.
          </li>
          <li>
            Lost a receipt or need a copy? See{" "}
            <Link href="/receipt-help" className="font-semibold text-indigo-600 hover:underline">
              receipt help
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
