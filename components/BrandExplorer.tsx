"use client";

import { useMemo, useState } from "react";
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
      {/* Search */}
      <div className="relative mt-8 max-w-md">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/70">🔍</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${brands.length}+ brands…`}
          className="w-full rounded-full border border-rule bg-card py-3 pl-11 pr-4 text-sm focus:border-ledger/45 focus:outline-none"
          aria-label="Search brands"
        />
      </div>

      {/* Category filter */}
      <div className="mt-5 flex flex-wrap gap-2">
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

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-ink-soft">No brands match &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/brands/${b.slug}`}
                className="group flex h-full flex-col items-center rounded-[3px] border border-rule bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-ledger/45 hover:shadow-md"
              >
                <span className="flex h-12 items-center justify-center">
                  {b.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.logo}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-10 w-auto max-w-[120px] object-contain"
                    />
                  ) : (
                    <span className="text-3xl" aria-hidden="true">{b.icon}</span>
                  )}
                </span>
                <span className="mt-3 text-sm font-semibold text-ink group-hover:text-ledger">
                  {b.name}
                </span>
                <span className="mt-1 text-[11px] font-medium text-ink-soft/70">{b.category}</span>
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
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-ledger bg-ledger text-white"
          : "border-rule bg-card text-ink-soft hover:border-ledger/45"
      }`}
    >
      {children}
    </button>
  );
}
