import Link from "next/link";
import { FREE_FONTS, freeDownloadsPhrase } from "@/lib/plans";

/**
 * The reference copy under the builder on /create.
 *
 * /create is the page meant to rank for "receipt maker" and "receipt
 * generator", but until 2026-10-18 it held a builder, four FAQs and nothing
 * else a crawler could read as being about making receipts — so the head terms
 * rotated between up to eight URLs and none of them owned the query. This is
 * the topical depth that page lacked: what the tool makes, what a receipt must
 * contain, how to make one, the paper options and receipt vs invoice.
 *
 * It sits below the builder on purpose: the tool stays above the fold, and
 * this is for the reader (and crawler) who scrolls past it.
 */

const RECEIPT_TYPES: { slug: string; label: string; note: string }[] = [
  { slug: "restaurant", label: "Restaurant receipt", note: "table, server, tip and split lines" },
  { slug: "grocery-store", label: "Grocery receipt", note: "long item lists, weighed items and savings" },
  { slug: "retail-store", label: "Retail store receipt", note: "SKUs, returns policy and loyalty footer" },
  { slug: "gas-station", label: "Gas station receipt", note: "pump number, gallons and price per gallon" },
  { slug: "taxi", label: "Taxi receipt", note: "pickup, drop-off, distance and fare" },
  { slug: "hotel", label: "Hotel receipt", note: "nights, room rate and folio charges" },
  { slug: "sales-receipt", label: "Sales receipt", note: "a simple record of goods sold" },
  { slug: "itemized-receipt", label: "Itemized receipt", note: "every line with quantity and unit price" },
  { slug: "cash-receipt", label: "Cash receipt", note: "amount tendered and change given" },
  { slug: "rent-receipt", label: "Rent receipt", note: "tenant, property, period and amount paid" },
  { slug: "donation-receipt", label: "Donation receipt", note: "donor, gift and charity details" },
  { slug: "handyman-receipt", label: "Service receipt", note: "labour, parts and job description" },
];

const PAPER_STYLES: { name: string; body: string }[] = [
  {
    name: "Thermal (torn paper)",
    body: "The look of a till roll: monospaced type, dashed dividers and a torn edge. This is the style on a free account.",
  },
  {
    name: "Clean white",
    body: "A flat white sheet with no torn edge, for receipts you send as a file rather than print.",
  },
  {
    name: "Invoice",
    body: "A document layout with a bill-to block and wider columns, for invoices and service bills.",
  },
  {
    name: "Digital / email",
    body: "Styled like the receipt an online store emails you after checkout.",
  },
];

const WIDTHS: { name: string; body: string }[] = [
  { name: "58mm", body: "the narrow roll used by card terminals and small printers" },
  { name: "80mm", body: "the standard width of most shop and restaurant till rolls" },
  { name: "Email", body: "a wider layout that reads well on a screen" },
  { name: "A4", body: "a full page, for invoices and anything you print on an office printer" },
];

const linkClass = "font-medium text-indigo-600 hover:text-indigo-700 hover:underline";

export default function ReceiptMakerGuide() {
  return (
    <div className="space-y-12 text-slate-600">
      <section aria-labelledby="receipt-types-heading">
        <h2 id="receipt-types-heading" className="text-xl font-bold text-slate-900">
          What you can make with this receipt maker
        </h2>
        <p className="mt-3 leading-relaxed">
          The receipt maker above starts blank, but you rarely have to. Each
          template below opens in the same builder with the fields that kind of
          business actually prints already in place, so you are editing a
          receipt rather than designing one. Open a template page to see a
          sample and what it includes.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {RECEIPT_TYPES.map((t) => (
            <li key={t.slug} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <Link href={`/templates/${t.slug}`} className={linkClass}>
                {t.label}
              </Link>
              <span className="text-slate-500"> — {t.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed">
          There are more in the <Link href="/templates" className={linkClass}>full template library</Link>,
          including <Link href="/templates/invoice" className={linkClass}>invoices</Link>,{" "}
          <Link href="/templates/proforma-invoice" className={linkClass}>pro forma invoices</Link> and{" "}
          <Link href="/templates/credit-note" className={linkClass}>credit notes</Link>, and a separate
          set of <Link href="/brands" className={linkClass}>brand receipt templates</Link> laid out like
          the receipts well-known chains print.
        </p>
      </section>

      <section aria-labelledby="receipt-contents-heading">
        <h2 id="receipt-contents-heading" className="text-xl font-bold text-slate-900">
          What every receipt needs
        </h2>
        <p className="mt-3 leading-relaxed">
          A receipt is proof that a payment happened. Whatever the business, the
          person holding it should be able to tell who was paid, for what, how
          much and when. A complete receipt has:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li><strong className="text-slate-900">The seller&apos;s name and address</strong>, plus a phone number, website or tax ID where one applies.</li>
          <li><strong className="text-slate-900">The date and time</strong> of the sale, and a receipt or transaction number that identifies it.</li>
          <li><strong className="text-slate-900">An itemized list</strong> of what was bought, with quantity and price on each line.</li>
          <li><strong className="text-slate-900">Subtotal, tax and total</strong>, with the tax rate or label (sales tax, VAT, GST) shown separately.</li>
          <li><strong className="text-slate-900">How it was paid</strong>: cash with change given, or a card type with the last four digits.</li>
          <li><strong className="text-slate-900">A footer</strong> with the return policy or a thank-you line, and a barcode or QR code if your system uses one.</li>
        </ol>
        <p className="mt-4 text-sm leading-relaxed">
          Each of those is its own section in the builder, so nothing gets
          forgotten. The <Link href="/guides/receipt-anatomy" className={linkClass}>anatomy of a receipt</Link>{" "}
          guide goes through each part in detail, and{" "}
          <Link href="/guides/receipt-legality" className={linkClass}>is it legal to make a receipt?</Link>{" "}
          covers when a receipt you make yourself is a valid record.
        </p>
      </section>

      <section aria-labelledby="how-to-heading">
        <h2 id="how-to-heading" className="text-xl font-bold text-slate-900">
          How to make a receipt in 3 steps
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-semibold text-slate-900">1. Pick a starting point</p>
            <p className="mt-1 text-sm leading-relaxed">
              Choose a template that matches the business, or start from the
              default receipt and change it. Nothing is locked: every template is
              just a set of sections you can edit, reorder or remove.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-semibold text-slate-900">2. Fill in the details</p>
            <p className="mt-1 text-sm leading-relaxed">
              Enter the business name, the items and prices, the tax rate and the
              payment method. Totals are worked out from the line items, so the
              subtotal, tax and total always add up. Add a barcode, QR code,
              signature or logo if the receipt needs one, and watch the live
              preview change as you type.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-semibold text-slate-900">3. Download it</p>
            <p className="mt-1 text-sm leading-relaxed">
              Create a free account and download the receipt as a PDF, PNG or
              JPG, or as a print-ready A4 PDF. A free account includes{" "}
              {freeDownloadsPhrase("watermark-free download")}; after that, free
              downloads carry a watermark and{" "}
              <Link href="/pricing" className={linkClass}>Pro</Link> removes it.
            </p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="paper-heading">
        <h2 id="paper-heading" className="text-xl font-bold text-slate-900">
          Paper styles and sizes
        </h2>
        <p className="mt-3 leading-relaxed">
          The same receipt can look like a till roll, a clean digital copy or a
          printed invoice. Change the paper style and width in the builder&apos;s
          settings and the preview redraws straight away.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {PAPER_STYLES.map((p) => (
            <div key={p.name} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <dt className="text-sm font-semibold text-slate-900">{p.name}</dt>
              <dd className="mt-1 text-sm leading-relaxed">{p.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-relaxed">
          Widths come in four presets:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {WIDTHS.map((w) => (
            <li key={w.name}>
              <strong className="text-slate-900">{w.name}</strong>: {w.body}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed">
          You can also set a custom width, the spacing between lines and the
          font. A free account can switch between {FREE_FONTS.length} fonts and
          uses the thermal style; Pro unlocks all 32 fonts and every paper
          style. A template&apos;s own style always renders as
          designed.
        </p>
      </section>

      <section aria-labelledby="receipt-vs-invoice-heading">
        <h2 id="receipt-vs-invoice-heading" className="text-xl font-bold text-slate-900">
          Receipt vs invoice: which one do you need?
        </h2>
        <p className="mt-3 leading-relaxed">
          An <strong className="text-slate-900">invoice</strong> asks for payment. It is sent before the
          money changes hands and carries a due date, payment terms and the
          buyer&apos;s details. A <strong className="text-slate-900">receipt</strong> confirms payment. It
          is issued after the customer pays and shows what was paid and how.
        </p>
        <p className="mt-3 leading-relaxed">
          A freelancer or contractor usually sends an invoice first, then a
          receipt once it is settled. A shop or restaurant skips the invoice and
          hands over a receipt at the till. If you are billing someone, start
          from the <Link href="/templates/invoice" className={linkClass}>invoice template</Link>;
          if you are recording a payment, use the receipt generator above. Either way, the
          header&apos;s document heading field lets you title the page INVOICE,
          QUOTE, PURCHASE ORDER or CREDIT MEMO instead of RECEIPT.
        </p>
      </section>
    </div>
  );
}
