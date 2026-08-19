import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import SectionBuilder from "@/components/builder/SectionBuilder";
import RelatedPosts from "@/components/RelatedPosts";

// Subset of the homepage FAQ most relevant to someone who has already landed
// on the builder — reused rather than duplicated so the two pages can't drift.
const CREATE_FAQ_QUESTIONS = [
  "Do I need to create an account to make a receipt?",
  "What file formats can I download my receipt in?",
  "Is it legal to make your own receipt?",
  "Is my data stored anywhere?",
];
const CREATE_FAQS = HOMEPAGE_FAQS.filter((f) => CREATE_FAQ_QUESTIONS.includes(f.question));

export const metadata: Metadata = {
  title: "Free Receipt Maker & Generator — Build a Custom Receipt Online",
  description:
    "Free receipt maker: build a receipt section by section — header, items, payment, barcode and more — with a live preview and no sign-up to start. Sign in to download as PDF or PNG.",
  alternates: { canonical: "/create" },
  openGraph: {
    title: "Free Receipt Maker & Generator — Build a Custom Receipt Online",
    description:
      "Build a receipt section by section with a live preview — free, no sign-up to start.",
    url: absoluteUrl("/create"),
    siteName: SITE.name,
    type: "website",
    // Setting openGraph explicitly drops the default opengraph-image, so
    // re-add it — otherwise social previews render with no image.
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Receipt Maker & Generator — Build a Custom Receipt Online",
    description:
      "Build a receipt section by section with a live preview — free, no sign-up to start.",
    images: [absoluteUrl("/opengraph-image")],
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${SITE.name} Receipt Maker`,
  url: absoluteUrl("/create"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "Build a receipt section by section — header, items, payment, barcode and more — with a live preview, then download as a PDF or PNG.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CREATE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// SectionBuilder is fully client-side and reads ?template= on mount.
export default function CreatePage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Real H1 for the flagship tool page. Visually compact so it doesn't
          push the builder below the fold, but present in the SSR DOM. */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Free Receipt Maker
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          This is {SITE.name}&apos;s free receipt maker and generator — build your
          receipt section by section with a live preview, free and no sign-up to
          start. Pick a template or start from scratch, edit every field, then
          create a free account to download as a PDF or PNG. Your first 3
          downloads are watermark-free.
        </p>
      </div>
      <SectionBuilder />

      <section className="mx-auto mt-16 max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900">Receipt maker FAQ</h2>
        <dl className="mt-4 space-y-4">
          {CREATE_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
              <dt className="font-semibold text-slate-900">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <RelatedPosts hub="/create" />
      </section>
    </div>
  );
}
