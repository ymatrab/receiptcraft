import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy — How We Write & Review",
  description: `How ${SITE.name} writes and reviews its receipt guides: who authors them, how we cite official rules and re-check those sources monthly, and how we fix mistakes.`,
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
          Our guides and templates are written and reviewed by the{" "}
          <Link href="/authors" className="font-medium text-indigo-600 hover:underline">
            {SITE.name} team
          </Link>
          , drawing on hands-on experience with small-business receipts,
          bookkeeping and expense reporting. Guides are grounded in how receipts
          actually work in practice, and every template is reviewed for accurate
          fields and layout before it is published.
        </p>

        <H2>Accuracy and sources</H2>
        <p>
          We aim to describe receipts, fields and common practices accurately.
          Where a guide states what a rule requires, we cite the body that
          issued it — the IRS, a state legislature, or the EU and UK tax
          authorities — and link to the document itself rather than to someone
          else&apos;s summary of it. Every source we cite is kept in a single
          registry that records the publisher, the specific claim the document
          backs, and the date we last confirmed it says that. Pages built on
          those rules list their sources at the end, with the same detail.
        </p>
        <p>
          Rules differ by jurisdiction. What a receipt must show in California
          is not what it must show in New York, and neither matches the EU or
          the UK. Where a rule is specific to a state or a country, the source
          list says so.
        </p>

        <H2>Citing a rule is not advice</H2>
        <p>
          Citing a regulation is not legal, tax or accounting advice, and
          nothing on this site is. We publish what a rule says and where to
          read it in full — we do not tell you how it applies to you. Whether a
          rule covers your situation, and what you should do about it, depends
          on facts we do not have. For that, ask a qualified professional.
        </p>
        <p>
          {SITE.name} is a tool for producing receipts, not a tax, legal or
          accounting service, and reading a page here does not create a
          professional relationship of any kind.
        </p>

        <H2>How often we re-check sources</H2>
        <p>
          Government and standards bodies move documents, and a dead link on a
          cited rule is worse than no citation at all. Every source link is
          re-checked monthly — automatically, for link rot and for redirects
          that quietly land on an error page while still returning success. A
          few legislature and standards sites refuse automated requests while
          serving readers normally; those we open by hand in a browser and
          confirm the text still supports the claim we attached to it.
        </p>
        <p>
          After a clean pass we update the verification date, which is shown
          alongside the sources on every page that cites them, so you can see
          how recently the link was confirmed rather than taking our word for
          it. If a document has moved, we follow it to its new home. If the
          rule itself has changed, we rewrite the page rather than quietly
          re-point the link.
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
