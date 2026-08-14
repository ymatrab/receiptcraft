import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { absoluteUrl } from "@/lib/site";
import { btn } from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Receipt Templates — 40+ Free Business Styles",
  description:
    "Browse free receipt templates: grocery, restaurant, gas station, taxi, hotel, pharmacy and more — each pre-filled with realistic items. Customize and download.",
  alternates: { canonical: "/templates" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Receipt Templates", item: absoluteUrl("/templates") },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Receipt templates",
    itemListElement: TEMPLATES.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: absoluteUrl(`/templates/${t.slug}`),
    })),
  },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-2xl">
        <Eyebrow>{TEMPLATES.length} templates</Eyebrow>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Receipt Templates
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Every template is pre-filled with realistic items, prices and tax
          rates for its business type. Pick one, customize what you need, and
          download your receipt in seconds — free to use, no sign-up to start.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/templates/${t.slug}`}
              className="group flex h-full flex-col rounded-[3px] border border-rule bg-card p-6 transition-colors hover:border-ledger/45 hover:bg-greenbar/30"
            >
              <span className="text-2xl" aria-hidden="true">
                {t.icon}
              </span>
              <h2 className="mt-3 font-display text-base font-bold text-ink group-hover:text-ledger-deep">
                {t.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {t.intro.split(".")[0]}.
              </p>
              {/* The card ends on a real fact about the template rather than a
                  decorative "Use this template →" — the whole card is the link. */}
              <div aria-hidden="true" className="perf-rule mt-5" />
              <div className="leader mt-3 font-data text-xs text-ink-soft">
                <span>Sample items</span>
                <span className="tabular-nums">{t.defaults.items.length}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-16 max-w-xl rounded-[3px] border border-rule bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
          Don&apos;t see your business type?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Start from a blank receipt and customize every detail — business
          info, items, tax label, currency and style.
        </p>
        <Link href="/create" className={btn({ size: "lg", className: "mt-7 w-full" })}>
          Start from scratch
        </Link>
      </div>
    </div>
  );
}
