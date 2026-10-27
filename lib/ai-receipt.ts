import type { PaymentMethod, ReceiptData } from "./types";
import { baseReceipt } from "./receipt-base";
import { uid } from "./format";

/** Shape the AI returns — a subset of ReceiptData the builder can hydrate. */
export interface AiReceiptResult {
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  website: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  receiptNumber: string;
  items: { name: string; quantity: number; price: number }[];
  currency: string; // ISO 4217
  taxLabel: string;
  taxRate: number; // percent
  paymentMethod: string;
  footerMessage: string;
  cashier: string;
  cardLastFour: string; // "" for cash
  tip: number;
  /**
   * Values for the brand template's own detail rows ("Transaction ID",
   * "Pickup", "Order #"…), matched back by label. Empty for plain receipts.
   */
  details: { label: string; value: string }[];
}

/** JSON schema for Anthropic structured outputs (output_config.format). */
export const AI_RECEIPT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    businessName: { type: "string" },
    addressLine1: { type: "string" },
    addressLine2: { type: "string" },
    phone: { type: "string" },
    website: { type: "string" },
    date: { type: "string", description: "ISO date yyyy-mm-dd" },
    time: { type: "string", description: "24h time HH:mm" },
    receiptNumber: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          quantity: { type: "number" },
          price: { type: "number", description: "unit price" },
        },
        required: ["name", "quantity", "price"],
      },
    },
    currency: { type: "string", description: "ISO 4217 code, e.g. USD" },
    taxLabel: { type: "string", description: "e.g. Sales Tax, VAT, GST" },
    taxRate: { type: "number", description: "percent, e.g. 8.25" },
    paymentMethod: {
      type: "string",
      enum: ["Cash", "Credit Card", "Debit Card", "Mobile Payment", "Gift Card", "Check"],
    },
    footerMessage: { type: "string" },
    cashier: { type: "string", description: "first name or operator id as printed, e.g. JESSICA or OP# 009051" },
    cardLastFour: { type: "string", description: "4 digits, or empty for cash" },
    tip: { type: "number", description: "flat tip amount, 0 if none" },
    details: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          label: { type: "string" },
          value: { type: "string" },
        },
        required: ["label", "value"],
      },
    },
  },
  required: [
    "businessName",
    "addressLine1",
    "addressLine2",
    "phone",
    "website",
    "date",
    "time",
    "receiptNumber",
    "items",
    "currency",
    "taxLabel",
    "taxRate",
    "paymentMethod",
    "footerMessage",
    "cashier",
    "cardLastFour",
    "tip",
    "details",
  ],
} as const;

/**
 * The system prompt, built per request so the model is told what "today" is.
 *
 * Shared by /api/ai/generate and the /admin/ai Test button on purpose: a test
 * that sends different text from production can pass while production fails,
 * which is exactly the blindness that let a retired model 502 the site for six
 * days. Test what actually ships.
 *
 * A model cannot know the current date. Asking for "today's date" without
 * saying what it is leaves it guessing from training data — live Gemini output
 * dated a fresh receipt 2023-10-24, though Groq's gpt-oss got it right, so the
 * failure is model-dependent and only stating the date removes it everywhere.
 */
export function receiptSystemPrompt(now = new Date(), brand?: string): string {
  const today = now.toISOString().slice(0, 10);
  return `You generate realistic receipt data from a short description.
Today's date is ${today}. Use it as the receipt date unless the description
says otherwise, and never return a date in the future.
Invent plausible specifics: a fitting business name and address, line items with
realistic prices and quantities, a sensible tax rate for the locale, a receipt
number, a cashier and the last four digits of the card (empty when paid in cash).
Keep totals coherent. Return only the structured fields requested; leave
\`details\` empty unless you are told which detail fields to fill.${brand ? `\n\n${brand}` : ""}`;
}

const PAYMENT_METHODS: readonly PaymentMethod[] = AI_RECEIPT_SCHEMA.properties.paymentMethod.enum;

/** "Transaction ID" and "transaction id:" are the same row. */
const rowKey = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Turn an AI result into a full receipt, on top of a brand template when there
 * is one.
 *
 * With a base, the brand's identity is kept and only the transaction is the
 * AI's: logo, wordmark, fonts, layout, footer and small print all come from the
 * template, because that look is the reason someone asked for a Walmart receipt
 * rather than a receipt. Until this existed every AI result landed on a blank
 * thermal roll — and generating from a brand page wiped the brand off it.
 */
export function receiptFromAi(r: AiReceiptResult, base?: ReceiptData): ReceiptData {
  const b = base ?? { ...baseReceipt(), paperStyle: "thermal" as const, showBarcode: true };
  const items = (r.items ?? []).map((it) => ({ id: uid(), name: it.name, quantity: it.quantity, price: it.price }));
  const details = new Map((r.details ?? []).map((d) => [rowKey(d.label), d.value]));
  const paymentMethod = PAYMENT_METHODS.includes(r.paymentMethod as PaymentMethod)
    ? (r.paymentMethod as PaymentMethod)
    : b.paymentMethod;
  return {
    ...b,
    businessName: base ? b.businessName : r.businessName,
    addressLine1: r.addressLine1 || b.addressLine1,
    addressLine2: r.addressLine2 || b.addressLine2,
    phone: r.phone || b.phone,
    website: base ? b.website : r.website,
    receiptNumber: r.receiptNumber || b.receiptNumber,
    date: r.date || b.date,
    time: r.time || b.time,
    cashier: r.cashier || b.cashier,
    // A payment or transfer template has no line items to show; keep its own.
    items: b.hideItems || items.length === 0 ? b.items : items,
    currency: r.currency || b.currency,
    // The brand prints its own tax label ("TAX 1", "HST"); only the rate moves.
    taxLabel: base ? b.taxLabel : r.taxLabel || b.taxLabel,
    taxRate: r.taxRate > 0 ? r.taxRate : b.taxRate,
    tip: r.tip > 0 ? r.tip : 0,
    paymentMethod,
    cardLastFour: paymentMethod === "Cash" ? "" : (r.cardLastFour || b.cardLastFour).replace(/\D/g, "").slice(-4),
    footerMessage: base ? b.footerMessage : r.footerMessage,
    sections: b.sections?.map((s) => ({
      ...s,
      rows: s.rows.map((row) => {
        const v = row.label ? details.get(rowKey(row.label)) : undefined;
        return v ? { ...row, value: v } : row;
      }),
    })),
  };
}
