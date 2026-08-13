import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sara Artheta — Founder & Editor",
  description:
    "Sara Artheta founded Makecepeit and writes its receipt guides. Background in small-business bookkeeping and expense reporting; she reviews every template for realism.",
  alternates: { canonical: "/authors/sara-artheta" },
};

// TODO(owner): paste Sara's real public profile URLs (LinkedIn, X, etc.) here to
// populate sameAs. Left empty on purpose — no placeholder/fabricated links.
const SAME_AS: string[] = [];

const KNOWS_ABOUT = [
  "Receipts",
  "Bookkeeping",
  "Expense reporting",
  "Small-business record keeping",
];

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl("/authors/sara-artheta"),
  mainEntity: {
    "@type": "Person",
    name: "Sara Artheta",
    jobTitle: "Founder & Editor",
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: absoluteUrl("/authors/sara-artheta"),
    description:
      "Founder of Makecepeit. Background in small-business bookkeeping and expense reporting; writes the receipt guides and reviews every template for realism.",
    knowsAbout: KNOWS_ABOUT,
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Authors", item: absoluteUrl("/authors") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Sara Artheta",
      item: absoluteUrl("/authors/sara-artheta"),
    },
  ],
};

export default function SaraArthetaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
          <li>
            <Link href="/authors" className="hover:text-indigo-600">
              Authors
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">Sara Artheta</li>
        </ol>
      </nav>

      <div className="mt-8 flex items-center gap-5">
        <span
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white"
        >
          SA
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sara Artheta</h1>
          <p className="mt-1 text-slate-500">Founder &amp; Editor, {SITE.name}</p>
        </div>
      </div>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <p>
          Sara spent years doing bookkeeping and expense reporting for small
          businesses before building {SITE.name} — born out of one too many
          faded thermal receipts at tax time. She writes the receipt guides on
          the{" "}
          <Link href="/blog" className="font-medium text-indigo-600 hover:underline">
            blog
          </Link>
          , reviews every template for realism, and answers support herself
          through the in-app chat.
        </p>

        <h2 className="pt-2 text-xl font-bold text-slate-900">What she covers</h2>
        <ul className="flex flex-wrap gap-2">
          {KNOWS_ABOUT.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600"
            >
              {topic}
            </li>
          ))}
        </ul>

        <h2 className="pt-2 text-xl font-bold text-slate-900">How we work</h2>
        <p>
          Sara sets the{" "}
          <Link href="/editorial-policy" className="font-medium text-indigo-600 hover:underline">
            editorial standards
          </Link>{" "}
          for {SITE.name}: guides are grounded in how receipts actually work,
          templates are checked for realistic fields before they ship, and pages
          are revised when the product or the facts change. Spot an error?{" "}
          <Link href="/contact" className="font-medium text-indigo-600 hover:underline">
            Tell us
          </Link>{" "}
          and we&apos;ll fix it.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Read Sara&apos;s guides
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          About {SITE.name}
        </Link>
      </div>
    </main>
  );
}
