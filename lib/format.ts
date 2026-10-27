import type { LineItem, ReceiptData, ReceiptTotals, TaxLine } from "./types";

export const CURRENCIES = [
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
  { code: "CAD", label: "Canadian Dollar (C$)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
  { code: "INR", label: "Indian Rupee (₹)" },
  { code: "JPY", label: "Japanese Yen (¥)" },
  { code: "AED", label: "UAE Dirham (د.إ)" },
  { code: "SAR", label: "Saudi Riyal (﷼)" },
  { code: "MAD", label: "Moroccan Dirham (MAD)" },
] as const;

export function formatMoney(amount: number, currency: string, decimals?: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      ...(decimals !== undefined && { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(decimals ?? 2)}`;
  }
}

/**
 * One line's gross amount: quantity × (price + priced add-ons). The single
 * definition every total uses — the renderer's line, itemsTotals and this file.
 */
export function itemGross(item: LineItem): number {
  if (item.heading) return 0;
  const addons = (item.addons ?? []).reduce((sum, a) => sum + (a.price || 0), 0);
  return (item.quantity || 0) * ((item.price || 0) + addons);
}

/** A line's net amount: gross less its own discount, never below zero. */
export function itemNet(item: LineItem): number {
  const gross = itemGross(item);
  return gross - Math.min(Math.max(item.discount || 0, 0), Math.max(gross, 0));
}

/**
 * Each tax line's amount. Untaxed items are never in a base; a line with
 * `appliesTo` taxes only items flagged that way, and a line without one takes
 * every taxed item no flagged line claims. `share` scales each base by the
 * order discount (1 − discount / net), so the discount lowers every base
 * pro rata. The single definition both itemsTotals and calcTotals use.
 */
export function taxLineAmounts(items: LineItem[], lines: TaxLine[], share: number) {
  const claimed = new Set(lines.map((l) => l.appliesTo).filter(Boolean));
  return lines.map((l) => {
    const base = items.reduce((sum, i) => {
      if (i.notTaxed || i.heading) return sum;
      const hit = l.appliesTo ? i.taxFlag === l.appliesTo : !claimed.has(i.taxFlag);
      return hit ? sum + itemNet(i) : sum;
    }, 0);
    return { label: l.label || "Tax", rate: l.rate, amount: base * share * ((l.rate || 0) / 100) };
  });
}

export function calcTotals(data: ReceiptData): ReceiptTotals {
  const subtotal = data.items.reduce((sum, item) => sum + itemGross(item), 0);
  const discount = Math.min(Math.max(data.discount || 0, 0), subtotal);
  const taxable = subtotal - discount;
  // Same rule as itemsTotals in lib/sections.ts (taxLineAmounts).
  const lines = data.taxLines?.length ? data.taxLines : [{ label: data.taxLabel, rate: data.taxRate || 0 }];
  const share = subtotal > 0 ? 1 - discount / subtotal : 0;
  const tax = taxLineAmounts(data.items, lines, share).reduce((sum, l) => sum + l.amount, 0);
  const tip = Math.max(data.tip || 0, 0);
  const total = taxable + tax + tip;
  const change =
    data.paymentMethod === "Cash" && data.amountTendered > total
      ? data.amountTendered - total
      : 0;
  return { subtotal, discount, tax, tip, total, change };
}

export function formatDisplayDate(isoDate: string, order?: "dmy"): string {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  // en-GB is day-first (17/10/2026); en-US stays the default everywhere else.
  return new Date(y, m - 1, d).toLocaleDateString(order === "dmy" ? "en-GB" : "en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function addDaysISO(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  // UTC so a DST change between the two dates cannot shift the result a day.
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowHHMM(): string {
  return new Date().toTimeString().slice(0, 5);
}

export function randomReceiptNumber(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

let idCounter = 0;
export function uid(): string {
  idCounter += 1;
  return `${Date.now().toString(36)}-${idCounter}`;
}
