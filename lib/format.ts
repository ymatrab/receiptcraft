import type { ReceiptData, ReceiptTotals } from "./types";

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

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function calcTotals(data: ReceiptData): ReceiptTotals {
  const subtotal = data.items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );
  const discount = Math.min(Math.max(data.discount || 0, 0), subtotal);
  const taxable = subtotal - discount;
  const tax = taxable * ((data.taxRate || 0) / 100);
  const tip = Math.max(data.tip || 0, 0);
  const total = taxable + tax + tip;
  const change =
    data.paymentMethod === "Cash" && data.amountTendered > total
      ? data.amountTendered - total
      : 0;
  return { subtotal, discount, tax, tip, total, change };
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
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
