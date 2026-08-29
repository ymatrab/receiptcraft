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
export function receiptSystemPrompt(now = new Date()): string {
  const today = now.toISOString().slice(0, 10);
  return `You generate realistic receipt data from a short description.
Today's date is ${today}. Use it as the receipt date unless the description
says otherwise, and never return a date in the future.
Invent plausible specifics: a fitting business name and address, line items with
realistic prices and quantities, a sensible tax rate for the locale, and a receipt
number. Keep totals coherent. Return only the structured fields requested.`;
}
