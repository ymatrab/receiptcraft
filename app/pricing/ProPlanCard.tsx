"use client";

import { useState } from "react";
import { PLANS, monthlyEquivalent, type PlanId } from "@/lib/plans";
import PricingCta from "./PricingCta";

type ProPlanId = Extract<PlanId, "pro_weekly" | "pro_monthly" | "pro_yearly">;

const INTERVALS: { id: ProPlanId; tab: string; unit: string; note?: string }[] = [
  { id: "pro_weekly", tab: "7 days", unit: "for 7 days" },
  { id: "pro_monthly", tab: "Monthly", unit: "per month" },
  { id: "pro_yearly", tab: "Yearly", unit: "per year", note: "Save ~60%" },
];

/**
 * The Pro plan, with its billing interval as a choice rather than as three
 * competing cards.
 *
 * Four cards in a max-w-5xl row measured 222px each, leaving 158px of content
 * inside p-8 — "Unlimited AI receipt generation" wrapped to three lines, and the
 * CTAs did not align because the feature lists differed in length. Worse, the
 * three prices read left to right as $3 → $7.99 → $39, a rising ladder, when
 * per month they actually fall: $13 → $7.99 → $3.25. One card with a selector
 * puts them on one scale and gives the content room.
 *
 * The default is monthly on purpose. Yearly earns the most per conversion and
 * weekly may well convert best for a one-off "I lost my receipt" job, but that
 * is a question for the `begin_checkout` data now being collected, not a guess.
 * Monthly is the neutral middle until there is enough of it to read.
 *
 * Radio inputs rather than buttons: this is one-of-three, and radios get that
 * semantics, arrow-key movement and a group label for free. They also work with
 * JavaScript off — the checked default renders server-side, and PricingCta is a
 * plain link to /api/checkout, so the page still sells without hydration.
 */
export default function ProPlanCard() {
  const [selected, setSelected] = useState<ProPlanId>("pro_monthly");
  const plan = PLANS[selected];
  const perMonth = monthlyEquivalent(plan);
  const interval = INTERVALS.find((i) => i.id === selected)!;

  return (
    <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-6 shadow-lg sm:p-8">
      <span className="absolute -top-3 left-8 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
        Most flexible
      </span>

      <h2 className="text-lg font-semibold text-slate-900">Pro</h2>
      <p className="mt-1 text-sm text-slate-600">
        No watermark, unlimited HD exports and unlimited AI.
      </p>

      <fieldset className="mt-5">
        <legend className="sr-only">Billing period</legend>
        <div className="flex gap-1 rounded-full bg-slate-100 p-1">
          {INTERVALS.map((option) => {
            const active = option.id === selected;
            return (
              <label
                key={option.id}
                className={`flex-1 cursor-pointer rounded-full px-3 py-2 text-center text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-indigo-500 ${
                  active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <input
                  type="radio"
                  name="billing-interval"
                  value={option.id}
                  checked={active}
                  onChange={() => setSelected(option.id)}
                  className="sr-only"
                />
                {option.tab}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* aria-live so a screen reader hears the price change when the interval
          changes — the number updating silently is the whole risk of a selector. */}
      <div aria-live="polite" className="mt-6">
        <p className="text-4xl font-bold tabular-nums text-slate-900">
          ${plan.price}
          <span className="ml-1 text-base font-medium text-slate-500">{interval.unit}</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {perMonth !== null && (
            <>
              <span className="font-medium tabular-nums text-slate-900">
                ${perMonth.toFixed(2)}
              </span>{" "}
              a month
            </>
          )}
          {interval.note && (
            <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              {interval.note}
            </span>
          )}
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span aria-hidden className="text-indigo-500">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <PricingCta
        planId={selected}
        className="mt-8 block rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        label={`Go Pro — $${plan.price} ${selected === "pro_weekly" ? "for 7 days" : selected === "pro_monthly" ? "a month" : "a year"}`}
      />
    </div>
  );
}
