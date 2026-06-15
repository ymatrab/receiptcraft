export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type PaperStyle = "thermal" | "modern" | "minimal";

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
