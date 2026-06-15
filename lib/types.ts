export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type PaperStyle = "thermal" | "modern" | "minimal";

/**
 * Distinct visual templates for paper (non-digital) receipts. Brands are
 * spread across these so two stores in the same category don't look alike.
 */
export type LayoutVariant =
  | "classic" // centered monospace thermal, dashed rules
  | "modern" // clean sans, solid rules, larger logo
  | "pos" // left-aligned till/POS: table, server, check #
  | "euro" // VAT-style, double rules, registered-business header
  | "compact" // narrow till roll with card auth (AID/TID) detail
  | "elegant"; // serif, airy, big logo, minimal rules

export type ReceiptProfile =
  | "retail"
  | "warehouse"
  | "grocery"
  | "pharmacy"
  | "electronics"
  | "beauty"
  | "home"
  | "pet"
  | "auto"
  | "sporting"
  | "restaurant"
  | "coffee"
  | "delivery"
  | "ride"
  | "digital"
  | "travel"
  | "airline"
  | "hotel"
  | "rental"
  | "fuel"
  | "fashion";

export type PaymentMethod =
  | "Cash"
  | "Credit Card"
  | "Debit Card"
  | "Mobile Payment"
  | "Gift Card"
  | "Check";

/** A row inside a receipt section: a key/value pair, or a plain line (no label). */
export interface ReceiptRow {
  label?: string;
  value: string;
}

/** A titled block of rows (e.g. "SHIPPING DETAILS", "Ride Details"). */
export interface ReceiptSection {
  title?: string;
  rows: ReceiptRow[];
}

export interface ReceiptData {
  // Business
  businessName: string;
  logoDataUrl: string; // user-uploaded logo (data URL), empty if none
  addressLine1: string;
  addressLine2: string;
  phone: string;
  website: string;

  // Meta
  receiptNumber: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  cashier: string;
  register: string;

  // Items
  items: LineItem[];

  // Money
  currency: string; // ISO 4217 code
  taxLabel: string;
  taxRate: number; // percent
  discount: number; // flat amount
  tip: number; // flat amount
  paymentMethod: PaymentMethod;
  cardLastFour: string;
  amountTendered: number; // for cash change

  // Footer / extras
  footerMessage: string;
  showBarcode: boolean;
  paperStyle: PaperStyle;
  receiptProfile?: ReceiptProfile;
  brandAccent?: string;
  logoScale?: number; // multiplier on the receipt logo height (1 = default)
  layoutSeed?: number; // deterministic per-brand seed for structural variety
  layoutVariant?: LayoutVariant; // which paper-receipt template to render

  // Optional composable sections used to recreate real-world receipt designs.
  forcePaper?: boolean; // render the paper template even for digital/service brands
  greeting?: string; // friendly line under the logo, e.g. "Congrats on Your Purchase!"
  sections?: ReceiptSection[]; // titled detail blocks (shipping, ride, delivery, …)
  grandTotalLabel?: string; // override the "TOTAL" label (e.g. "Grand Total")
  showCardAuth?: boolean; // full card authorisation block under payment
  policyText?: string; // small print / disclaimer paragraph at the bottom
  topBarcode?: boolean; // barcode directly under the header
  manager?: string; // store manager line near the footer
}

export interface ReceiptTotals {
  subtotal: number;
  discount: number;
  tax: number;
  tip: number;
  total: number;
  change: number;
}

export interface TemplateFaq {
  question: string;
  answer: string;
}

export interface ReceiptTemplate {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string;
  useCases: string[];
  faqs: TemplateFaq[];
  defaults: Partial<ReceiptData> & { items: LineItem[] };
}
