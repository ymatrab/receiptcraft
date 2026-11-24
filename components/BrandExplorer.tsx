"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/Icons";
import Link from "next/link";
import { BRAND_CATEGORIES, type BrandCategory } from "@/lib/brand-categories";
import type { BrandListItem } from "@/lib/brands";

/**
 * Searchable, category-filterable brand grid. Receives a lightweight list from
 * the server page (no heavy template data ships to the client). Filtering is
 * instant and client-side.
 */
export default function BrandExplorer({ brands }: { brands: BrandListItem[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<BrandCategory | "All">("All");

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: brands.length };
    for (const b of brands) m[b.category] = (m[b.category] ?? 0) + 1;
    return m;
  }, [brands]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return brands.filter(
      (b) =>
        (cat === "All" || b.category === cat) &&
        (!needle || b.name.toLowerCase().includes(needle))
    );
  }, [brands, query, cat]);

  return (
    <div>
      {/* Phones: search and categories stay pinned under the 64px header, so
          the list can be searched from anywhere in it (it was ~28,000px of
          cards), and the categories are one row that swipes sideways instead
          of wrapping over ~200px. From sm: in the flow, as before. */}
      <div className="sticky top-16 z-20 -mx-4 mt-6 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur sm:static sm:mx-0 sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      {/* Search */}
      <div className="relative max-w-md">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${brands.length}+ brands…`}
          className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-900 transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm"
          aria-label="Search brands"
        />
      </div>

      {/* Category filter */}
      <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] sm:mt-5 sm:flex-wrap sm:overflow-visible sm:pb-0">
        <Chip active={cat === "All"} onClick={() => setCat("All")}>
          All <span className="opacity-60">{counts.All}</span>
        </Chip>
        {BRAND_CATEGORIES.map((c) =>
          counts[c] ? (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {c} <span className="opacity-60">{counts[c]}</span>
            </Chip>
          ) : null
        )}
      </div>
      </div>

      {/* Grid. Phones: logo + name rows (54px) instead of 142px cards; the
          category label stays in the page and shows from sm. */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">No brands match &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {filtered.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/brands/${b.slug}`}
                className="group flex h-full items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-2.5 text-left transition-all sm:flex-col sm:gap-0 sm:p-5 sm:text-center hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
              >
                <span className="flex h-8 w-12 shrink-0 items-center justify-center sm:h-12 sm:w-auto">
                  {b.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.logo}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-7 w-auto max-w-12 object-contain sm:max-h-10 sm:max-w-[120px]"
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl" aria-hidden="true">{b.icon}</span>
                  )}
                </span>
                <span className="text-sm font-semibold leading-tight text-slate-900 group-hover:text-indigo-600 sm:mt-3 sm:leading-normal">
                  {b.name}
                </span>
                <span className="mt-1 hidden text-xs font-medium text-slate-500 sm:block">{b.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
      }`}
    >
      {children}
    </button>
  );
}
