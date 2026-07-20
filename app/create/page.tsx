import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import SectionBuilder from "@/components/builder/SectionBuilder";

export const metadata: Metadata = {
  title: "Receipt Builder — Create a Custom Receipt Online",
  description:
    "Build your receipt section by section: add, remove and reorder header, items, payment, barcode and more. Free live preview with no sign-up — create a free account to download as PDF or PNG.",
  alternates: { canonical: "/create" },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${SITE.name} Receipt Builder`,
  url: absoluteUrl("/create"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "Build a receipt section by section — header, items, payment, barcode and more — with a live preview, then download as a PDF or PNG.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
};

// SectionBuilder is fully client-side and reads ?template= on mount.
export default function CreatePage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {/* Real H1 for the flagship tool page. Visually compact so it doesn't
          push the builder below the fold, but present in the SSR DOM. */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Receipt Builder
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Build your receipt section by section with a live preview — free, no
          sign-up to start. Pick a template or start from scratch, edit every
          field, then create a free account to download as a PDF or PNG. Your
          first 3 downloads are watermark-free.
        </p>
      </div>
      <SectionBuilder />
    </div>
  );
}
