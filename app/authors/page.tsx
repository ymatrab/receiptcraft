import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Team",
  description: `Who writes and reviews ${SITE.name}'s receipt guides and templates, and the editorial standards we hold them to.`,
  alternates: { canonical: "/authors" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Editorial Team", item: absoluteUrl("/authors") },
  ],
};

export default function AuthorsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ledger">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink">Editorial Team</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">Editorial team</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {SITE.name}&apos;s receipt guides and templates are written and reviewed
        by the {SITE.name} team, drawing on hands-on experience with
        small-business receipts, bookkeeping and expense reporting.
      </p>

      <div className="mt-8 rounded-[3px] border border-rule bg-greenbar/60 p-6">
        <h2 className="text-lg font-semibold text-ink">The {SITE.name} team</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We build the receipt builder, write the guides on our{" "}
          <Link href="/blog" className="font-medium text-ledger hover:underline">
            blog
          </Link>
          , review every template for realistic fields and layout, and answer
          support ourselves. Our guides are grounded in how receipts actually
          work — what each field means, how totals are calculated, and how to
          keep records lawfully.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          How we write, source and update content is described in our{" "}
          <Link href="/editorial-policy" className="font-medium text-ledger hover:underline">
            editorial policy
          </Link>
          . Spot an error?{" "}
          <Link href="/contact" className="font-medium text-ledger hover:underline">
            Tell us
          </Link>{" "}
          and we&apos;ll fix it.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/blog"
          className="rounded-full bg-ledger px-6 py-3 text-sm font-semibold text-white hover:bg-ledger-deep"
        >
          Read our guides
        </Link>
      </div>
    </main>
  );
}
