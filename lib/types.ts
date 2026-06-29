export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  // Optional richer item fields (all backward-compatible).
  sku?: string;
  category?: string;
  unit?: string; // e.g. "kg", "hr", "ea"
  modifiers?: string[]; // e.g. ["No onions", "Extra shot"]
  discount?: number; // flat per-item discount amount
  taxCategory?: string; // informational label, e.g. "Standard", "Zero-rated"
}

/** One tax line in a totals block (supports multiple tax rates). */
export interface TaxLine {
  label: string;
  rate: number; // percent
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

/** Divider styles between receipt sections. */
export type RuleStyle =
  | "dashed"
  | "solid"
  | "dotted"
  | "double"
  | "asterisk" // a run of ******
  | "colon" // a run of ::::::
  | "none";

/** How line items are laid out. */
export type ItemStyle =
  | "table" // Item / Qty / Price / Total columns
  | "stacked" // name over "qty @ price"
  | "equals" // "qty name ........ = total"
  | "lined" // header row + "name .......... total"
  | "qtycol"; // small qty column + name + line total

export type FontFamily =
  // Original set
  | "mono"
  | "sans"
  | "serif"
  | "courier"
  | "oswald"
  | "playfair"
  // Monospace receipt fonts
  | "roboto-mono"
  | "ibm-plex-mono"
  | "space-mono"
  | "inconsolata"
  | "source-code-pro"
  | "noto-sans-mono"
  | "anonymous-pro"
  | "cutive-mono"
  | "fira-mono"
  | "ubuntu-mono"
  | "dm-mono"
  | "oxygen-mono"
  | "share-tech-mono"
  | "vt323"
  // Sans / display fonts
  | "inter"
  | "roboto"
  | "open-sans"
  | "lato"
  | "noto-sans"
  | "work-sans"
  | "montserrat"
  | "mulish";

/** Base text size for the rendered receipt. */
export type FontScale = "small" | "normal" | "large";
/** Vertical rhythm of the rendered receipt. */
export type LineSpacing = "compact" | "normal" | "airy";
/** Horizontal letter spacing of the rendered receipt. */
export type LetterSpacingPreset = "tight" | "normal" | "wide";
/** Base text weight of the rendered receipt. */
export type TextWeight = "normal" | "medium" | "bold";
/** Paper presentation of the rendered receipt. */
export type PaperFinish = "thermal" | "clean" | "invoice" | "email";

/** Column header labels for the table item layout. */
export interface ItemColumns {
  item: string;
  qty: string;
  price: string;
  total: string;
}

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

  // Per-brand design overrides (take precedence over the layout variant) so a
  // brand can match a specific reference receipt exactly.
  ruleStyle?: RuleStyle;
  itemStyle?: ItemStyle;
  itemHeader?: { left: string; right: string }; // header row for "lined" items
  fontFamily?: FontFamily;
  headerAlign?: "center" | "left";
  hideItems?: boolean; // pure key/value receipts (payments, transfers)
  hideTotals?: boolean;
  logoText?: string; // render a large text wordmark instead of the image logo
  hideStoreLine?: boolean; // suppress the auto "Store #/Reg" line
  qrCode?: boolean; // show a QR code instead of a barcode
  dividers?: "default" | "minimal"; // minimal = only one rule, above payment
  paymentInline?: boolean; // "Payment Method: X •••• 1234" on one left line
  sectionStyle?: "rows" | "flow"; // flow = inline label/value pairs
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
