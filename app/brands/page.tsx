import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_TEMPLATES } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Brand Receipt Templates — Free Inspiration & Mockups",
  description:
    "Browse free brand receipt templates including Walmart, Uber, Starbucks and more. Get inspired and download customized PDF or PNG receipts.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Brand Receipt Templates
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Explore our collection of receipt templates inspired by popular brands. Use these as a starting point to create highly realistic receipts for your specific needs — customize the items, dates, and prices, then download for free.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BRAND_TEMPLATES.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/brands/${t.slug}`}
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
          Need a general template?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Check out our category templates for generic retail, grocery, hotel, and restaurant receipts.
        </p>
        <Link
          href="/templates"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
        >
          Browse All Templates
        </Link>
      </div>
    </div>
  );
}
