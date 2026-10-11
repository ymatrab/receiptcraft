import type { Metadata } from "next";
import Link from "next/link";
import Reviewed from "@/components/Reviewed";
import { GOOGLE_DOCS_TEMPLATES_UPDATED } from "@/lib/content-dates";
import {
  GOOGLE_DOC_TEMPLATES,
  GOOGLE_DOC_GUIDE_ID,
  docCopyUrl,
  docPreviewUrl,
} from "@/lib/google-docs-templates";
import { SITE, absoluteUrl } from "@/lib/site";

const TITLE = "Free Google Docs Receipt & Invoice Templates";
const DESCRIPTION =
  "Free receipt, invoice, rent receipt and bill of sale templates for Google Docs. Make a copy, fill in the brackets, and download a PDF.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/templates/google-docs" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/templates/google-docs"),
    siteName: SITE.name,
    type: "website",
    // Setting openGraph explicitly drops the default opengraph-image.
    images: [absoluteUrl("/opengraph-image")],
  },
};

const FAQS = [
  {
    question: "How do I use a receipt template in Google Docs?",
    answer:
      "Open the template and choose Make a copy. Google saves an editable copy to your own Drive. Replace everything in [brackets] with your details, delete the instruction box at the top, then print it or use File → Download → PDF.",
  },
  {
    question: "Are these Google Docs templates free?",
    answer:
      "Yes. They are free to copy, edit, print and send. Making a copy needs a Google account, because the copy is saved to your Drive. You do not need a Makecepeit account.",
  },
  {
    question: "Can I use these templates in Microsoft Word?",
    answer:
      "Yes. Make a copy in Google Docs, then choose File → Download → Microsoft Word (.docx). The layout and tables carry over and you can keep editing in Word.",
  },
  {
    question: "What is the difference between an invoice and a receipt?",
    answer:
      "An invoice asks for payment and states when it is due. A receipt confirms that payment was made. Send the invoice first and the receipt once you have been paid.",
  },
  {
    question: "Can I make a receipt without editing a document?",
    answer:
      "Yes. The Makecepeit receipt maker fills in the totals for you as you type and exports a PDF or PNG. Building and previewing needs no account; downloading uses a free account, and your first download is watermark-free.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Templates", item: absoluteUrl("/templates") },
      { "@type": "ListItem", position: 3, name: "Google Docs templates", item: absoluteUrl("/templates/google-docs") },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Google Docs receipt and invoice templates",
    itemListElement: GOOGLE_DOC_TEMPLATES.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${t.name} for Google Docs`,
      url: docPreviewUrl(t.id),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    dateModified: GOOGLE_DOCS_TEMPLATES_UPDATED,
  },
];

export default function GoogleDocsTemplatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/templates" className="hover:text-indigo-600">Templates</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700">Google Docs</li>
        </ol>
      </nav>

      <div className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {TITLE}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Four free templates you can copy straight into your own Google Drive:
          an invoice, a receipt, a rent receipt and a bill of sale. Make a copy,
          replace the text in [brackets], and print it or download it as a PDF.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {GOOGLE_DOC_TEMPLATES.map((t) => (
          <li
            key={t.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {t.name} for Google Docs
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {t.blurb}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={docCopyUrl(t.id)}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Make a copy
              </a>
              <a
                href={docPreviewUrl(t.id)}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                Preview
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Rather not edit a document? Use the{" "}
              <Link href={t.builderHref} className="font-medium text-indigo-600 hover:underline">
                {t.builderLabel}
              </Link>
              .
            </p>
          </li>
        ))}
      </ul>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">
          How to fill in a Google Docs template
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-600">
          <li>Click <strong>Make a copy</strong>. Google asks you to sign in, then saves the copy to your Drive.</li>
          <li>Replace each [bracketed] field with your own details.</li>
          <li>Add or remove table rows with right-click → Insert row or Delete row.</li>
          <li>Work out the totals. If you want to check tax or a discount, use the{" "}
            <Link href="/tools/receipt-calculator" className="font-medium text-indigo-600 hover:underline">
              receipt calculator
            </Link>.
          </li>
          <li>Delete the shaded instruction box, then print or use File → Download → PDF.</li>
        </ol>
        <p className="mt-4 text-slate-600">
          The same steps are in our{" "}
          <a
            href={docPreviewUrl(GOOGLE_DOC_GUIDE_ID)}
            target="_blank"
            rel="noopener"
            className="font-medium text-indigo-600 hover:underline"
          >
            step-by-step guide on Google Docs
          </a>
          .
        </p>
      </section>

      <section className="mt-14 rounded-3xl bg-slate-50 p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Google Docs template or receipt maker?
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          A Doc is quickest when you already know your totals. The{" "}
          <Link href="/create" className="font-medium text-indigo-600 hover:underline">
            Makecepeit receipt maker
          </Link>{" "}
          adds up line items, tax and tips as you type, offers thermal,
          clean-white and invoice paper styles, and exports a PDF or PNG.
          Building and previewing needs no account; downloading uses a free
          account, and your first download is watermark-free.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/create"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-colors hover:bg-indigo-700"
          >
            Open the receipt maker
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
          >
            Browse all receipt templates
          </Link>
        </div>
      </section>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">Questions</h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-slate-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Reviewed date={GOOGLE_DOCS_TEMPLATES_UPDATED} />
    </div>
  );
}
