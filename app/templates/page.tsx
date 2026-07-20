import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt Templates — 40+ Free Business Styles",
  description:
    "Browse free receipt templates: grocery store, restaurant, gas station, taxi, hotel, pharmacy and more. Each pre-filled with realistic items — customize and download as PDF or PNG.",
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
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Receipt Templates
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
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
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
            >
              <span className="text-4xl" aria-hidden="true">
                {t.icon}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
                {t.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {t.intro.split(".")[0]}.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                Use this template
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-3xl bg-slate-50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Don&apos;t see your business type?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Start from a blank receipt and customize every detail — business
          info, items, tax label, currency and style.
        </p>
        <Link
          href="/create"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
        >
          Start From Scratch
        </Link>
      </div>
    </div>
  );
}
