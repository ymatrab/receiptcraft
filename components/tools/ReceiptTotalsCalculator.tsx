"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney, CURRENCIES } from "@/lib/format";

interface Row {
  id: string;
  name: string;
  qty: number;
  price: number;
}

let rid = 0;
const newRow = (name: string, qty: number, price: number): Row => ({
  id: `row-${rid++}`,
  name,
  qty,
  price,
});

// Deterministic seed rows (no random/date) so the server and client render the
// same initial HTML — this page hydrates without a mismatch.
const INITIAL_ROWS: Row[] = [
  newRow("Item 1", 2, 12.5),
  newRow("Item 2", 1, 8),
];

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

export default function ReceiptTotalsCalculator() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState(8.5);
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(0);
  const [isCash, setIsCash] = useState(false);
  const [tendered, setTendered] = useState(0);

  // Mirrors calcTotals() in lib/format.ts — kept inline so this tool stays fully
  // self-contained. Subtotal → less discount → tax on the taxable base → plus
  // tip → total; cash change only when tendered exceeds the total.
  const subtotal = rows.reduce((s, r) => s + (r.qty || 0) * (r.price || 0), 0);
  const disc = Math.min(Math.max(discount || 0, 0), subtotal);
  const taxable = subtotal - disc;
  const tax = taxable * ((taxRate || 0) / 100);
  const tipAmt = Math.max(tip || 0, 0);
  const total = taxable + tax + tipAmt;
  const change = isCash && tendered > total ? tendered - total : 0;

  const m = (n: number) => formatMoney(n, currency);
  const setRow = (id: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => setRows((rs) => [...rs, newRow(`Item ${rs.length + 1}`, 1, 0)]);
  const removeRow = (id: string) =>
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {/* Inputs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Line items</h2>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Currency
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <input
                aria-label="Item name"
                value={r.name}
                onChange={(e) => setRow(r.id, { name: e.target.value })}
                className={`${inputCls} flex-1`}
              />
              <input
                aria-label="Quantity"
                type="number"
                min={0}
                step={1}
                value={r.qty}
                onChange={(e) => setRow(r.id, { qty: num(e.target.value) })}
                className={`${inputCls} w-16`}
              />
              <span className="text-slate-500">×</span>
              <input
                aria-label="Unit price"
                type="number"
                min={0}
                step="0.01"
                value={r.price}
                onChange={(e) => setRow(r.id, { price: num(e.target.value) })}
                className={`${inputCls} w-24`}
              />
              <button
                type="button"
                onClick={() => removeRow(r.id)}
                aria-label="Remove item"
                className="shrink-0 rounded-lg px-2 py-1 text-slate-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          + Add item
        </button>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label className="text-sm text-slate-600">
            Tax rate (%)
            <input
              type="number"
              min={0}
              step="0.01"
              value={taxRate}
              onChange={(e) => setTaxRate(num(e.target.value))}
              className={`${inputCls} mt-1`}
            />
          </label>
          <label className="text-sm text-slate-600">
            Discount ({currency})
            <input
              type="number"
              min={0}
              step="0.01"
              value={discount}
              onChange={(e) => setDiscount(num(e.target.value))}
              className={`${inputCls} mt-1`}
            />
          </label>
          <label className="text-sm text-slate-600">
            Tip ({currency})
            <input
              type="number"
              min={0}
              step="0.01"
              value={tip}
              onChange={(e) => setTip(num(e.target.value))}
              className={`${inputCls} mt-1`}
            />
          </label>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={isCash}
              onChange={(e) => setIsCash(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Paid in cash — calculate change
          </label>
          {isCash && (
            <label className="mt-3 block text-sm text-slate-600">
              Amount tendered ({currency})
              <input
                type="number"
                min={0}
                step="0.01"
                value={tendered}
                onChange={(e) => setTendered(num(e.target.value))}
                className={`${inputCls} mt-1 sm:w-40`}
              />
            </label>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-24 h-fit rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Totals</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Line label="Subtotal" value={m(subtotal)} />
          {disc > 0 && <Line label="Discount" value={`− ${m(disc)}`} />}
          <Line label={`Tax (${taxRate || 0}%)`} value={m(tax)} />
          {tipAmt > 0 && <Line label="Tip" value={m(tipAmt)} />}
          <div className="flex justify-between border-t border-indigo-200 pt-2 text-base font-bold text-slate-900">
            <dt>Total</dt>
            <dd className="tabular-nums">{m(total)}</dd>
          </div>
          {isCash && (
            <>
              <Line label="Tendered" value={m(tendered)} />
              <Line label="Change" value={m(change)} />
            </>
          )}
        </dl>

        <Link
          href="/create"
          className="mt-6 block rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Turn this into a receipt — free
        </Link>
        <p className="mt-2 text-center text-xs text-slate-500">
          Build & preview free — account needed only to download.
        </p>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-600">
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
