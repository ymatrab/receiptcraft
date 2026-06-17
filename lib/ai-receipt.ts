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
