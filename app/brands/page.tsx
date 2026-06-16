export const runtime = "edge";
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

const BRAND_FAQS = [
  {
    question: "What are brand receipt templates?",
    answer:
      "Brand receipt templates are editable starting points inspired by common receipt formats from popular stores, restaurants, delivery apps, hotels, airlines, fuel stations and digital services. You can change the business details, items, tax, payment method and footer before downloading.",
  },
  {
    question: "Can I customize every receipt template?",
    answer:
      "Yes. Each brand template opens in the receipt builder with editable store details, receipt number, date, time, line items, quantities, prices, tax, discount, tip, payment method, barcode and footer message.",
  },
  {
    question: "Do the brand templates include realistic items?",
    answer:
      "Yes. Templates include brand-appropriate sample items, prices, addresses, tax labels and receipt styles so the first preview looks realistic before you make changes.",
  },
  {
    question: "Can I upload or remove a logo?",
    answer:
      "Yes. The builder lets you upload your own logo, replace the default logo URL, or remove the logo completely before exporting the receipt.",
  },
  {
    question: "Are brand receipts downloaded with a watermark?",
    answer:
      "No. PDF and PNG downloads are clean and do not include Makecepeit branding or watermarks on the receipt.",
  },
  {
    question: "Is my receipt data stored?",
    answer:
      "No. Receipt editing and export happen in your browser. Makecepeit does not require sign-up and does not store the receipt information you type into the builder.",
  },
  {
    question: "Can I use these templates for reimbursements?",
    answer:
      "Use receipt templates only for legitimate records, replacements, mockups, internal documentation, or design work. Do not create receipts to misrepresent purchases or defraud a person, employer, business, or tax authority.",
  },
  {
    question: "What file formats can I download?",
    answer:
      "You can download each customized brand receipt as a print-ready PDF or a high-resolution PNG image.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BRAND_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const metadata: Metadata = {
  title: "Brand Receipt Templates — Free Inspiration & Mockups",
  description:
    "Browse free brand receipt templates including Walmart, Uber, Starbucks and more. Get inspired and download customized PDF or PNG receipts.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Brand Receipt Templates
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Explore our collection of receipt templates inspired by popular brands. Use these as a starting point to create highly realistic receipts for your specific needs — customize the items, dates, and prices, then download for free.
        </p>
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BRAND_TEMPLATES.map((t) => {
          const preview = previewFromTemplate(t);
          return (
            <li key={t.slug}>
              <Link
                href={`/brands/${t.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                {/* Visual Preview */}
                <div className="relative flex h-72 items-start justify-center overflow-hidden bg-slate-50/80 pt-6">
                  {/* Subtle fade out at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />
                  
                  <div className="origin-top scale-[0.6] transition-transform duration-300 ease-out group-hover:scale-[0.63]">
                    <div className="receipt-shadow rounded bg-white">
                      <ReceiptDocPaper doc={docFromReceiptData(preview)} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-1 flex-col bg-white p-6 pt-5">
                  <div>
                    {t.defaults.logoDataUrl ? (
                      <span className="flex h-9 items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.defaults.logoDataUrl}
                          alt={`${t.shortName} logo`}
                          loading="lazy"
                          className="h-full w-auto max-w-[150px] object-contain"
                        />
                      </span>
                    ) : (
                      <span className="text-2xl" aria-hidden="true">
                        {t.icon}
                      </span>
                    )}
                    <h2 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                      {t.name}
                    </h2>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {t.intro.split(".")[0]}.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                    Use this template
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section id="faq" className="mt-20" aria-labelledby="brand-faq-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="brand-faq-heading" className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Brand receipt template FAQ
          </h2>
          <p className="mt-3 text-center text-lg text-slate-600">
            Details about editing, logos, downloads, privacy and proper use.
          </p>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {BRAND_FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16 rounded-3xl bg-slate-50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Need a general template?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Check out our category templates for generic retail, grocery, hotel, and restaurant receipts.
        </p>
        <Link
          href="/templates"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
        >
          Browse All Templates
        </Link>
      </div>
    </div>
  );
}
