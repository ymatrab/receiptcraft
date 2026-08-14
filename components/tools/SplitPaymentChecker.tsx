"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney, CURRENCIES } from "@/lib/format";

interface Tender {
  id: string;
  method: string;
  amount: number;
}

const METHODS = [
  "Cash",
  "Credit card",
  "Debit card",
  "Gift card",
  "Store credit",
  "Mobile wallet",
  "Other",
];

let tid = 0;
const newTender = (method: string, amount: number): Tender => ({
  id: `tender-${tid++}`,
  method,
  amount,
});

// Deterministic seed (no random/date) so server and client render identically.
const INITIAL_TENDERS: Tender[] = [
  newTender("Cash", 20),
  newTender("Credit card", 30),
];

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export default function SplitPaymentChecker() {
  const [currency, setCurrency] = useState("USD");
  const [total, setTotal] = useState(50);
  const [tenders, setTenders] = useState<Tender[]>(INITIAL_TENDERS);

  const paid = tenders.reduce((s, t) => s + (t.amount || 0), 0);
  const remaining = Math.round((total - paid) * 100) / 100;
  const balanced = Math.abs(remaining) < 0.005;
  const over = remaining < 0;

  const m = (n: number) => formatMoney(n, currency);
  const setTender = (id: string, patch: Partial<Tender>) =>
    setTenders((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const addTender = () => setTenders((ts) => [...ts, newTender("Cash", 0)]);
  const removeTender = (id: string) =>
    setTenders((ts) => (ts.length > 1 ? ts.filter((t) => t.id !== id) : ts));

  const inputCls =
    "rounded-[3px] border border-rule px-3 py-2 text-sm text-ink focus:border-ledger focus:outline-none focus:ring-1 focus:ring-ledger";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {/* Inputs */}
      <div className="rounded-[3px] border border-rule bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label className="text-sm font-medium text-ink">
            Receipt total
            <div className="mt-1 flex items-center gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputCls}
                aria-label="Currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                step="0.01"
                value={total}
                onChange={(e) => setTotal(num(e.target.value))}
                className={`${inputCls} w-32`}
                aria-label="Receipt total amount"
              />
            </div>
          </label>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-ink">Payments</h2>
        <div className="mt-3 space-y-2">
          {tenders.map((t) => (
            <div key={t.id} className="flex items-center gap-2">
              <select
                value={t.method}
                onChange={(e) => setTender(t.id, { method: e.target.value })}
                className={`${inputCls} flex-1`}
                aria-label="Payment method"
              >
                {METHODS.map((mth) => (
                  <option key={mth} value={mth}>
                    {mth}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                step="0.01"
                value={t.amount}
                onChange={(e) => setTender(t.id, { amount: num(e.target.value) })}
                className={`${inputCls} w-28`}
                aria-label="Payment amount"
              />
              <button
                type="button"
                onClick={() => removeTender(t.id)}
                aria-label="Remove payment"
                className="shrink-0 rounded-[3px] px-2 py-1 text-ink-soft/70 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTender}
          className="mt-3 rounded-full border border-rule bg-card px-4 py-2 text-sm font-semibold text-ink hover:bg-greenbar"
        >
          + Add payment
        </button>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24 h-fit rounded-[3px] border border-rule bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Balance check</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-ink-soft">
            <dt>Receipt total</dt>
            <dd className="tabular-nums">{m(total)}</dd>
          </div>
          <div className="flex justify-between text-ink-soft">
            <dt>Total paid ({tenders.length})</dt>
            <dd className="tabular-nums">{m(paid)}</dd>
          </div>
        </dl>

        <div
          className={`mt-4 rounded-[3px] p-4 text-sm font-semibold ${
            balanced
              ? "bg-greenbar text-ledger-deep"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          {balanced ? (
            <>✓ Balanced — the payments add up to the total.</>
          ) : over ? (
            <>Overpaid by {m(Math.abs(remaining))} — payments exceed the total (e.g. cash change of {m(Math.abs(remaining))}).</>
          ) : (
            <>Short by {m(remaining)} — the payments don&apos;t cover the total yet.</>
          )}
        </div>

        <Link
          href="/create"
          className="mt-6 block rounded-full bg-ledger px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-ledger-deep"
        >
          Make a split-payment receipt — free
        </Link>
        <p className="mt-2 text-center text-xs text-ink-soft/70">
          Show each method and amount on one receipt.
        </p>
      </div>
    </div>
  );
}
