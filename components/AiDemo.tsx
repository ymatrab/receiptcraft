"use client";

import { useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { AI_DEMOS, demoTotals } from "@/lib/ai-demo";

/**
 * Worked examples under the hero generator.
 *
 * AI generation needs an account, which means a first-time visitor can no
 * longer see the one feature six named competitors lack — they type, hit a
 * sign-up wall, and leave never having watched the product work. This shows
 * them, using real captured output and no API call, so the demonstration costs
 * nothing and the tokens stay for customers.
 *
 * It renders nothing on the server-side critical path beyond static text, and
 * needs no auth check: the examples are equally useful to a signed-in user
 * deciding what to type.
 */
export default function AiDemo() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : AI_DEMOS[open];

  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-slate-500">
        Or see what it makes — tap an example:
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {AI_DEMOS.map((d, i) => (
          <button
            key={d.prompt}
            type="button"
            onClick={() => {
              const next = open === i ? null : i;
              setOpen(next);
              if (next !== null) analytics.aiDemoOpened(d.prompt);
            }}
            aria-expanded={open === i}
            aria-controls="ai-demo-output"
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              open === i
                ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                : "border-slate-300 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
            }`}
          >
            {d.prompt}
          </button>
        ))}
      </div>

      {active && (
        <div
          id="ai-demo-output"
          className="mt-3 max-w-xs rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <Receipt example={active} />
          <p className="mt-3 border-t border-dashed border-slate-200 pt-3 text-[11px] text-slate-500">
            A real example from the same generator.{" "}
            <Link
              href="/login?next=/create&signup=1"
              onClick={() => analytics.upgradeClick("home_ai_demo")}
              className="font-semibold text-indigo-600 underline"
            >
              Create a free account
            </Link>{" "}
            to make your own — 3 a month free.
          </p>
        </div>
      )}
    </div>
  );
}

function Receipt({ example }: { example: (typeof AI_DEMOS)[number] }) {
  const r = example.receipt;
  const { subtotal, tax, total } = demoTotals(r);
  // Rendered rather than stored, so a cached example can never show a stale date.
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const money = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: r.currency }).format(n);

  return (
    <div className="font-mono text-[11px] leading-relaxed text-slate-700">
      <p className="text-center text-xs font-bold uppercase tracking-wide text-slate-900">
        {r.businessName}
      </p>
      <p className="text-center text-[10px] text-slate-500">{r.addressLine1}</p>
      <p className="text-center text-[10px] text-slate-500">{r.addressLine2}</p>
      <p className="mt-2 border-t border-dashed border-slate-300 pt-2 text-[10px] text-slate-500">
        {today}
      </p>
      <ul className="mt-1 space-y-0.5">
        {r.items.map((i) => (
          <li key={i.name} className="flex justify-between gap-3">
            <span className="truncate">
              {i.quantity > 1 && `${i.quantity}× `}
              {i.name}
            </span>
            <span className="shrink-0 tabular-nums">{money(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-2 space-y-0.5 border-t border-dashed border-slate-300 pt-2">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>
            {r.taxLabel} {r.taxRate}%
          </dt>
          <dd className="tabular-nums">{money(tax)}</dd>
        </div>
        <div className="flex justify-between font-bold text-slate-900">
          <dt>Total</dt>
          <dd className="tabular-nums">{money(total)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-center text-[10px] text-slate-500">{r.paymentMethod}</p>
    </div>
  );
}
