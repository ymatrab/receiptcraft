import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import SectionBuilder from "@/components/builder/SectionBuilder";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Receipt Builder — Create a Custom Receipt Online",
  description:
    "Build a receipt section by section: add, remove and reorder header, items, payment and barcode blocks. Free live preview with no sign-up — sign in to download.",
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
    <div className="min-h-screen bg-greenbar/35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {/* Real H1 for the flagship tool page. Visually compact so it doesn't
          push the builder below the fold, but present in the SSR DOM.
          The free-tier ladder is deliberately NOT restated here — /pricing owns
          that explanation, and the account gate surfaces at the download step
          where it is actually relevant. */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Eyebrow>Builder</Eyebrow>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Receipt Builder
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Build your receipt section by section with a live preview. Pick a
          template or start from scratch, edit every field, then download it as
          a PDF or PNG.
        </p>
      </div>
      <SectionBuilder />
    </div>
  );
}
