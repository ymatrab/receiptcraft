import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy — How We Write & Review",
  description: `How ${SITE.name} creates its receipt guides and templates: who writes and reviews them, how we source facts, keep pages current, handle corrections and disclose our own product.`,
  alternates: { canonical: "/editorial-policy" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Editorial Policy",
      item: absoluteUrl("/editorial-policy"),
    },
  ],
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
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
          <li className="font-medium text-slate-900">Editorial Policy</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">Editorial policy</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
        This page explains how {SITE.name}&apos;s guides and templates are
        written, reviewed and kept current — so you can judge how much to trust
        what you read here.
      </p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <H2>Who writes and reviews</H2>
        <p>
          Our content is led by{" "}
          <Link href="/authors/sara-artheta" className="font-medium text-indigo-600 hover:underline">
            Sara Artheta
          </Link>
          , {SITE.name}&apos;s founder and editor, whose background is in
          small-business bookkeeping and expense reporting. Guides are grounded
          in how receipts actually work in practice, and every template is
          reviewed for realistic fields and layout before it is published.
        </p>

        <H2>Accuracy and sources</H2>
        <p>
          We aim to describe receipts, fields and common practices accurately.
          Where a guide touches on tax, legal or compliance matters, we point to
          primary or official sources and recommend you confirm your specific
          situation with a qualified professional. Our guides are educational
          and are not legal, tax or accounting advice.
        </p>

        <H2>Keeping pages current</H2>
        <p>
          Articles show their published date, and a modified date when they have
          been meaningfully revised. We update pages when the product changes or
          when the underlying facts change — not on a cosmetic schedule to look
          fresh.
        </p>

        <H2>Corrections</H2>
        <p>
          If you spot an error, email{" "}
          <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 hover:underline">
            {SITE.email}
          </a>{" "}
          or use our{" "}
          <Link href="/contact" className="font-medium text-indigo-600 hover:underline">
            contact page
          </Link>
          . We correct confirmed mistakes and update the modified date.
        </p>

        <H2>Independence and disclosure</H2>
        <p>
          {SITE.name} is a receipt-making product, and some pages compare it with
          other tools. On those pages we disclose that {SITE.name} is our own
          product and describe what we compared. We do not publish fabricated
          reviews, ratings or testimonials, and we do not invent credentials.
        </p>

        <H2>Responsible use</H2>
        <p>
          Our guides and templates are for legitimate purposes — record keeping,
          replacing lost or faded receipts for real purchases, expense
          documentation, and design or mockup work. We do not present generated
          receipts as proof of purchase, and we say so on brand-inspired
          templates. Creating receipts to deceive anyone is fraud. See our{" "}
          <Link href="/terms" className="font-medium text-indigo-600 hover:underline">
            Terms of Use
          </Link>{" "}
          for the full policy.
        </p>
      </div>
    </main>
  );
}
