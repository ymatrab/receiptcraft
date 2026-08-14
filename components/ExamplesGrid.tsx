import Link from "next/link";
import {
  examplesForPage,
  exampleTotal,
  exampleSummary,
  receiptFromExample,
  EXAMPLES_TOTAL_PAGES,
} from "@/lib/examples";
import { docFromReceiptData } from "@/lib/sections";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

export function examplesPageHref(page: number): string {
  return page <= 1 ? "/examples" : `/examples/page/${page}`;
}

/** Renders one page (EXAMPLES_PER_PAGE) of the example grid with receipt previews. */
export default function ExamplesGrid({ page }: { page: number }) {
  const items = examplesForPage(page);
  const total = EXAMPLES_TOTAL_PAGES;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink">Receipt examples</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          Real sample receipts from popular brands — see exactly what each one looks like, then
          create your own editable version with {SITE.name}.
        </p>
        {total > 1 && (
          <p className="mt-2 text-sm text-ink-soft/70">Page {page} of {total}</p>
        )}
      </header>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((ex) => {
          const data = receiptFromExample(ex);
          return (
            <li key={ex.slug}>
              <Link
                href={`/examples/${ex.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-rule bg-card transition-all hover:-translate-y-1 hover:border-ledger/45 hover:shadow-xl hover:shadow-greenbar/50"
              >
                <div className="relative flex h-64 items-start justify-center overflow-hidden bg-greenbar/80 pt-6">
                  <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-card to-transparent" />
                  <div className="origin-top scale-[0.58] transition-transform duration-300 ease-out group-hover:scale-[0.61]">
                    <div className="rounded bg-card shadow-md">
                      <ReceiptDocPaper doc={docFromReceiptData(data)} />
                    </div>
                  </div>
                </div>
                <div className="relative z-20 flex flex-1 flex-col bg-card p-5">
                  <h2 className="text-base font-bold text-ink transition-colors group-hover:text-ledger">
                    {ex.brand} Receipt Example
                  </h2>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{exampleSummary(ex)}</p>
                  <p className="mt-2 text-sm font-semibold text-ledger">
                    {formatMoney(exampleTotal(ex), data.currency)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {total > 1 && <Pagination current={page} total={total} />}
    </main>
  );
}

function Pagination({ current, total }: { current: number; total: number }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Examples pages">
      {current > 1 && (
        <Link
          href={examplesPageHref(current - 1)}
          className="rounded-[3px] border border-rule bg-card px-3 py-2 text-sm font-medium text-ink-soft hover:bg-greenbar"
          rel="prev"
        >
          ← Prev
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={examplesPageHref(p)}
          aria-current={p === current ? "page" : undefined}
          className={`rounded-[3px] px-3.5 py-2 text-sm font-medium ${
            p === current
              ? "bg-ledger text-white"
              : "border border-rule bg-card text-ink-soft hover:border-ledger/45"
          }`}
        >
          {p}
        </Link>
      ))}
      {current < total && (
        <Link
          href={examplesPageHref(current + 1)}
          className="rounded-[3px] border border-rule bg-card px-3 py-2 text-sm font-medium text-ink-soft hover:bg-greenbar"
          rel="next"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
