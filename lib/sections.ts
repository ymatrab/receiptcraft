import type {
  FontFamily,
  FontScale,
  ItemColumns,
  ItemStyle,
  LayoutVariant,
  LetterSpacingPreset,
  LineItem,
  LineSpacing,
  PaperFinish,
  ReceiptData,
  ReceiptProfile,
  ReceiptRow,
  RuleStyle,
  TextWeight,
} from "./types";
import { todayISO, nowHHMM, randomReceiptNumber, uid } from "./format";

// ---------------------------------------------------------------------------
// Section-based document model. A receipt is an ordered list of sections the
// user can add / remove / reorder / restyle. The flat ReceiptData model still
// powers the static brand/template previews; `docFromReceiptData` bridges the
// two so every template loads as editable sections.
// ---------------------------------------------------------------------------

export type SectionAlign = "left" | "center" | "right";

export type SectionType =
  | "header"
  | "datetime"
  | "twocol"
  | "items"
  | "payment"
  | "message"
  | "barcode"
  | "qr"
  | "image"
  | "signature"
  | "spacer";

export interface BaseSection {
  id: string;
  type: SectionType;
  align?: SectionAlign;
  divider?: RuleStyle; // "none" = no divider at bottom
}

export interface HeaderSection extends BaseSection {
  type: "header";
  logoDataUrl?: string;
  logoText?: string;
  title?: string; // small label above the name, e.g. "TRIP RECEIPT"
  storeName: string;
  address: string; // newline-separated
  phone?: string;
  website?: string;
}
export interface DateTimeSection extends BaseSection {
  type: "datetime";
  date: string;
  time: string;
  receiptNumber?: string;
}
export interface TwoColSection extends BaseSection {
  type: "twocol";
  title?: string;
  rows: ReceiptRow[];
  flow?: boolean;
}
export interface ItemsSection extends BaseSection {
  type: "items";
  items: LineItem[];
  itemStyle?: ItemStyle;
  itemHeader?: { left: string; right: string };
  columns?: ItemColumns; // custom table column names
  taxLabel: string;
  taxRate: number;
  discount: number;
  discountPercent?: boolean; // treat `discount` as a % of subtotal
  tip: number;
  grandTotalLabel?: string;
  totalsDivider?: RuleStyle;
  showItemsSold?: boolean; // "Items sold: N" line (grocery / warehouse)
}
export interface PaymentSection extends BaseSection {
  type: "payment";
  method: "Cash" | "Card";
  cardType?: string; // Credit / Debit / Mobile …
  cardLastFour?: string;
  authCode?: string;
  amountTendered?: number;
  showCardAuth?: boolean;
  inline?: boolean;
}
export interface MessageSection extends BaseSection {
  type: "message";
  text: string;
}
export interface BarcodeSection extends BaseSection {
  type: "barcode";
  value: string;
  showText?: boolean;
}
export interface QrSection extends BaseSection {
  type: "qr";
  value: string;
}
export interface ImageSection extends BaseSection {
  type: "image";
  src: string; // data URL
  widthPct?: number;
}
export interface SignatureSection extends BaseSection {
  type: "signature";
  label: string;
}
export interface SpacerSection extends BaseSection {
  type: "spacer";
  size?: number; // px
}

export type Section =
  | HeaderSection
  | DateTimeSection
  | TwoColSection
  | ItemsSection
  | PaymentSection
  | MessageSection
  | BarcodeSection
  | QrSection
  | ImageSection
  | SignatureSection
  | SpacerSection;

export interface DocSettings {
  font: FontFamily;
  widthPx: number;
  accent: string;
  currency: string;
  style?: "paper" | "card"; // card = rounded chrome + accent bar (digital brands)
  // Typography & layout controls (all optional → existing docs fall back to the
  // sensible defaults applied in ReceiptDocPaper).
  fontScale?: FontScale; // small / normal / large
  lineSpacing?: LineSpacing; // compact / normal / airy
  letterSpacing?: LetterSpacingPreset; // tight / normal / wide
  weight?: TextWeight; // base text weight
  paper?: PaperFinish; // thermal / clean / invoice / email
}

/** Named paper-width presets surfaced as quick buttons in the builder. */
export const WIDTH_PRESETS: { id: string; label: string; px: number }[] = [
  { id: "58mm", label: "58mm", px: 219 },
  { id: "80mm", label: "80mm", px: 302 },
  { id: "email", label: "Email", px: 420 },
  { id: "a4", label: "A4", px: 794 },
];

export interface ReceiptDoc {
  settings: DocSettings;
  sections: Section[];
}

export const SECTION_LABEL: Record<SectionType, string> = {
  header: "Header",
  datetime: "Date & Time",
  twocol: "Two-column info",
  items: "Items list",
  payment: "Payment & totals",
  message: "Custom message",
  barcode: "Barcode",
  qr: "QR code",
  image: "Image",
  signature: "Signature",
  spacer: "Spacer",
};

// Effective font / divider per layout variant, mirrored from VARIANT_STYLES in
// ReceiptPaper so a converted template keeps its intended look.
const VARIANT_FONT: Record<LayoutVariant, FontFamily> = {
  classic: "mono",
  modern: "sans",
  pos: "mono",
  euro: "mono",
  compact: "mono",
  elegant: "serif",
};
const VARIANT_RULE: Record<LayoutVariant, RuleStyle> = {
  classic: "dashed",
  modern: "solid",
  pos: "solid",
  euro: "double",
  compact: "dotted",
  elegant: "none",
};

const RECEIPT_TITLE: Record<ReceiptProfile, string> = {
  airline: "E-TICKET RECEIPT",
  auto: "AUTO PARTS RECEIPT",
  beauty: "BEAUTY RECEIPT",
  coffee: "CAFE ORDER",
  delivery: "DELIVERY RECEIPT",
  digital: "DIGITAL INVOICE",
  electronics: "SALES RECEIPT",
  fashion: "STORE RECEIPT",
  fuel: "FUEL RECEIPT",
  grocery: "GROCERY RECEIPT",
  home: "HOME & GARDEN RECEIPT",
  hotel: "GUEST FOLIO",
  pet: "PET STORE RECEIPT",
  pharmacy: "PHARMACY RECEIPT",
  rental: "RENTAL AGREEMENT",
  restaurant: "ORDER RECEIPT",
  retail: "SALES RECEIPT",
  ride: "TRIP RECEIPT",
  sporting: "SPORTING GOODS RECEIPT",
  travel: "BOOKING RECEIPT",
  warehouse: "MEMBER RECEIPT",
};

const SERVICE_PROFILES: ReceiptProfile[] = [
  "ride",
  "delivery",
  "digital",
  "travel",
  "airline",
  "hotel",
  "rental",
];

/** Build a fresh, generic receipt document for "start from scratch". */
export function blankDoc(): ReceiptDoc {
  const d: RuleStyle = "dashed";
  return {
    settings: { font: "mono", widthPx: 380, accent: "#4f46e5", currency: "USD" },
    sections: [
      {
        id: uid(),
        type: "header",
        align: "center",
        divider: d,
        storeName: "The Generic Store",
        address: "123 Commerce Blvd\nCityville, ST 12345",
        phone: "(555) 123-4567",
        website: "www.genericstore.com",
      },
      { id: uid(), type: "datetime", align: "left", divider: d, date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
      {
        id: uid(),
        type: "items",
        divider: d,
        items: [
          { id: uid(), name: "Widget A", quantity: 2, price: 19.99 },
          { id: uid(), name: "Gadget B", quantity: 1, price: 49.5 },
          { id: uid(), name: "Service Fee", quantity: 1, price: 5 },
        ],
        itemStyle: "table",
        taxLabel: "Sales Tax",
        taxRate: 8.5,
        discount: 0,
        tip: 0,
        totalsDivider: d,
      },
      { id: uid(), type: "payment", divider: d, method: "Card", cardType: "Credit", cardLastFour: "1234", showCardAuth: true },
      { id: uid(), type: "message", align: "center", text: "Thank you for your business!" },
      { id: uid(), type: "barcode", align: "center", value: randomReceiptNumber(), showText: true },
    ],
  };
}

export const PRESETS = [
  { id: "blank", label: "Blank" },
  { id: "retail", label: "🛍️ Retail" },
  { id: "restaurant", label: "🍽️ Restaurant" },
  { id: "gas", label: "⛽ Gas" },
  { id: "hotel", label: "🏨 Hotel" },
  { id: "taxi", label: "🚕 Taxi / rideshare" },
  { id: "rent", label: "🏠 Rent" },
  { id: "donation", label: "❤️ Donation" },
  { id: "service", label: "🔧 Service" },
  { id: "invoice", label: "🧾 Paid invoice" },
] as const;
export type PresetId = (typeof PRESETS)[number]["id"];

/** Generic, non-brand starting layouts for the builder. */
export function presetDoc(id: PresetId): ReceiptDoc {
  const base: DocSettings = {
    font: "mono",
    widthPx: 380,
    accent: "#4f46e5",
    currency: "USD",
    style: "paper",
  };
  const dash: RuleStyle = "dashed";

  if (id === "blank") return blankDoc();

  if (id === "service") {
    return {
      settings: { ...base, font: "sans" },
      sections: [
        { id: uid(), type: "header", align: "left", divider: "solid", title: "INVOICE", storeName: "Your Business", address: "123 Main St\nCity, ST 00000", phone: "(555) 000-0000", website: "" },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Bill to", value: "Client name" }, { label: "Invoice #", value: randomReceiptNumber() }, { label: "Date", value: todayISO() }] },
        {
          id: uid(),
          type: "items",
          divider: "solid",
          items: [
            { id: uid(), name: "Consulting (hrs)", quantity: 4, price: 75 },
            { id: uid(), name: "Materials", quantity: 1, price: 50 },
          ],
          itemStyle: "table",
          columns: { item: "Description", qty: "Hrs/Qty", price: "Rate", total: "Amount" },
          taxLabel: "Tax",
          taxRate: 0,
          discount: 0,
          discountPercent: true,
          tip: 0,
          totalsDivider: "solid",
        },
        { id: uid(), type: "payment", divider: "solid", method: "Card", cardType: "Credit", cardLastFour: "" },
        { id: uid(), type: "signature", align: "center", divider: "none", label: "Authorized signature" },
        { id: uid(), type: "message", align: "center", text: "Payment due within 30 days. Thank you!" },
      ],
    };
  }

  if (id === "retail") {
    return {
      settings: base,
      sections: [
        { id: uid(), type: "header", align: "center", divider: dash, storeName: "Your Store", address: "123 Market St\nCity, ST 00000", phone: "(555) 123-4567" },
        { id: uid(), type: "datetime", align: "left", divider: dash, date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
        { id: uid(), type: "twocol", divider: "none", flow: true, rows: [{ label: "Store #", value: "1042" }, { label: "Reg", value: "3" }, { label: "Cashier", value: "Alex" }] },
        {
          id: uid(),
          type: "items",
          divider: dash,
          items: [
            { id: uid(), name: "Item A", quantity: 1, price: 12.99 },
            { id: uid(), name: "Item B", quantity: 2, price: 4.5 },
          ],
          itemStyle: "table",
          taxLabel: "Sales Tax",
          taxRate: 8.25,
          discount: 0,
          discountPercent: true,
          tip: 0,
          totalsDivider: dash,
        },
        { id: uid(), type: "payment", divider: dash, method: "Card", cardType: "Credit", cardLastFour: "4821", showCardAuth: true },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Thank you for shopping with us!" },
        { id: uid(), type: "barcode", align: "center", divider: "none", value: randomReceiptNumber(), showText: true },
      ],
    };
  }

  if (id === "restaurant") {
    return {
      settings: base,
      sections: [
        { id: uid(), type: "header", align: "center", divider: dash, storeName: "The Bistro", address: "88 Dining Ave\nCity, ST 00000", phone: "(555) 222-7788" },
        { id: uid(), type: "datetime", align: "left", divider: dash, date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
        { id: uid(), type: "twocol", divider: dash, flow: true, rows: [{ label: "Table", value: "12" }, { label: "Server", value: "Jamie" }, { label: "Guests", value: "2" }] },
        {
          id: uid(),
          type: "items",
          divider: dash,
          items: [
            { id: uid(), name: "Grilled Salmon", quantity: 1, price: 24.0 },
            { id: uid(), name: "Pasta Primavera", quantity: 1, price: 18.5 },
            { id: uid(), name: "Service Fee (18%)", quantity: 1, price: 7.65 },
          ],
          itemStyle: "stacked",
          taxLabel: "Sales Tax",
          taxRate: 7,
          discount: 0,
          tip: 8,
          grandTotalLabel: "TOTAL",
          totalsDivider: dash,
        },
        { id: uid(), type: "payment", divider: dash, method: "Card", cardType: "Credit", cardLastFour: "1199" },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Thanks for dining with us!" },
      ],
    };
  }

  if (id === "gas") {
    return {
      settings: base,
      sections: [
        { id: uid(), type: "header", align: "center", divider: dash, title: "FUEL RECEIPT", storeName: "Fuel Station", address: "500 Highway Rd\nCity, ST 00000", phone: "" },
        { id: uid(), type: "datetime", align: "left", divider: dash, date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
        { id: uid(), type: "twocol", divider: dash, rows: [{ label: "Pump", value: "04" }, { label: "Grade", value: "Unleaded" }, { label: "Price/gal", value: "$3.499" }] },
        {
          id: uid(),
          type: "items",
          divider: dash,
          items: [{ id: uid(), name: "Unleaded (gal)", quantity: 10.2, price: 3.499 }],
          itemStyle: "lined",
          itemHeader: { left: "Fuel", right: "Amount" },
          taxLabel: "Tax",
          taxRate: 0,
          discount: 0,
          tip: 0,
          grandTotalLabel: "TOTAL",
          totalsDivider: dash,
        },
        { id: uid(), type: "payment", divider: dash, method: "Card", cardType: "Credit", cardLastFour: "7745" },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Thank you — drive safely!" },
      ],
    };
  }

  if (id === "hotel") {
    return {
      settings: base,
      sections: [
        { id: uid(), type: "header", align: "left", divider: "solid", title: "GUEST FOLIO", storeName: "Grand Hotel", address: "1 Park Plaza\nCity, ST 00000", phone: "(555) 900-1000" },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Guest", value: "J. Doe" }, { label: "Room", value: "412" }, { label: "Check-in", value: todayISO() }, { label: "Check-out", value: todayISO() }, { label: "Nights", value: "2" }] },
        {
          id: uid(),
          type: "items",
          divider: "solid",
          items: [
            { id: uid(), name: "Room charge (per night)", quantity: 2, price: 149.0 },
            { id: uid(), name: "Resort fee", quantity: 2, price: 25.0 },
          ],
          itemStyle: "table",
          columns: { item: "Description", qty: "Qty", price: "Rate", total: "Amount" },
          taxLabel: "Occupancy Tax",
          taxRate: 12,
          discount: 0,
          tip: 0,
          grandTotalLabel: "Balance due",
          totalsDivider: "solid",
        },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Deposit on file", value: "$100.00" }] },
        { id: uid(), type: "payment", divider: "solid", method: "Card", cardType: "Credit", cardLastFour: "3321" },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Thank you for staying with us." },
      ],
    };
  }

  if (id === "taxi") {
    return {
      settings: { ...base, style: "card", accent: "#111827" },
      sections: [
        { id: uid(), type: "header", align: "center", divider: "solid", title: "TRIP RECEIPT", storeName: "City Rides", address: "", phone: "" },
        { id: uid(), type: "datetime", align: "left", divider: "solid", date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Distance", value: "6.4 mi" }, { label: "Duration", value: "18 min" }, { label: "Driver", value: "Sam" }] },
        {
          id: uid(),
          type: "items",
          divider: "solid",
          items: [
            { id: uid(), name: "Base fare", quantity: 1, price: 2.5 },
            { id: uid(), name: "Distance charge", quantity: 1, price: 8.96 },
            { id: uid(), name: "Time charge", quantity: 1, price: 3.6 },
          ],
          itemStyle: "lined",
          taxLabel: "Tax",
          taxRate: 0,
          discount: 0,
          tip: 3,
          grandTotalLabel: "Total charged",
          totalsDivider: "solid",
        },
        { id: uid(), type: "payment", divider: "solid", method: "Card", cardType: "Credit", cardLastFour: "0042", inline: true },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Thanks for riding with City Rides!" },
      ],
    };
  }

  if (id === "rent") {
    return {
      settings: { ...base, font: "sans" },
      sections: [
        { id: uid(), type: "header", align: "left", divider: "solid", title: "RENT RECEIPT", storeName: "Property Management", address: "", phone: "" },
        { id: uid(), type: "datetime", align: "left", divider: "solid", date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Tenant", value: "Tenant name" }, { label: "Property", value: "123 Rental St, Unit 4" }, { label: "Rental period", value: "Jun 1 – Jun 30" }, { label: "Paid by", value: "Bank transfer" }] },
        {
          id: uid(),
          type: "items",
          divider: "solid",
          items: [{ id: uid(), name: "Monthly rent", quantity: 1, price: 1450.0 }],
          itemStyle: "lined",
          taxLabel: "Tax",
          taxRate: 0,
          discount: 0,
          tip: 0,
          grandTotalLabel: "Amount paid",
          totalsDivider: "solid",
        },
        { id: uid(), type: "signature", align: "left", divider: "none", label: "Received by" },
        { id: uid(), type: "message", align: "left", divider: "none", text: "Rent received with thanks. Keep this receipt for your records." },
      ],
    };
  }

  if (id === "invoice") {
    return {
      settings: { ...base, font: "sans", style: "card" },
      sections: [
        { id: uid(), type: "header", align: "left", divider: "solid", title: "INVOICE · PAID", storeName: "Your Business", address: "123 Main St\nCity, ST 00000", phone: "(555) 000-0000", website: "you@business.com" },
        { id: uid(), type: "twocol", divider: "solid", rows: [{ label: "Bill to", value: "Client name" }, { label: "Invoice #", value: randomReceiptNumber() }, { label: "Date", value: todayISO() }, { label: "Status", value: "PAID" }] },
        {
          id: uid(),
          type: "items",
          divider: "solid",
          items: [
            { id: uid(), name: "Professional services", quantity: 10, price: 85 },
            { id: uid(), name: "Materials", quantity: 1, price: 120 },
          ],
          itemStyle: "table",
          columns: { item: "Description", qty: "Qty", price: "Rate", total: "Amount" },
          taxLabel: "Tax",
          taxRate: 0,
          discount: 0,
          discountPercent: true,
          tip: 0,
          grandTotalLabel: "Amount paid",
          totalsDivider: "solid",
        },
        { id: uid(), type: "payment", divider: "solid", method: "Card", cardType: "Credit", cardLastFour: "" },
        { id: uid(), type: "message", align: "center", divider: "none", text: "Paid in full — thank you for your business!" },
      ],
    };
  }

  // donation (also the fallback for any unhandled id)
  return {
    settings: { ...base, font: "serif" },
    sections: [
      { id: uid(), type: "header", align: "center", divider: dash, title: "DONATION RECEIPT", storeName: "Charity Name", address: "Tax ID: 00-0000000", phone: "" },
      { id: uid(), type: "datetime", align: "left", divider: dash, date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() },
      { id: uid(), type: "twocol", divider: dash, rows: [{ label: "Donor", value: "Donor name" }, { label: "Method", value: "Credit card" }] },
      {
        id: uid(),
        type: "items",
        divider: dash,
        items: [{ id: uid(), name: "Charitable donation", quantity: 1, price: 100 }],
        itemStyle: "lined",
        taxLabel: "Tax",
        taxRate: 0,
        discount: 0,
        tip: 0,
        grandTotalLabel: "Total donated",
        totalsDivider: "none",
      },
      { id: uid(), type: "message", align: "center", text: "No goods or services were provided in exchange for this contribution. This receipt may be used for tax purposes." },
    ],
  };
}

/**
 * Convert a flat (template) ReceiptData into an editable section document.
 * Reuses the override fields already present on brand templates.
 */
export function docFromReceiptData(data: ReceiptData): ReceiptDoc {
  const variant: LayoutVariant = data.layoutVariant ?? "classic";
  const font: FontFamily = data.fontFamily ?? VARIANT_FONT[variant];
  const rule: RuleStyle = data.ruleStyle ?? VARIANT_RULE[variant];
  const profile: ReceiptProfile = data.receiptProfile ?? "retail";
  const isService = SERVICE_PROFILES.includes(profile);
  const isTicket = profile === "restaurant" || profile === "coffee";
  const seed = data.layoutSeed ?? 0;
  const headerAlign: SectionAlign = isService ? "left" : data.headerAlign ?? "center";
  const minimal = data.dividers === "minimal";
  const d = (on: boolean): RuleStyle => (minimal || !on ? "none" : rule);

  const sections: Section[] = [];

  sections.push({
    id: uid(),
    type: "header",
    align: headerAlign,
    divider: d(true),
    logoDataUrl: data.logoText ? undefined : data.logoDataUrl || undefined,
    logoText: data.logoText,
    title: data.greeting ? undefined : RECEIPT_TITLE[profile],
    storeName: data.businessName,
    address: [data.addressLine1, data.addressLine2].filter(Boolean).join("\n"),
    phone: data.phone || undefined,
    website: data.website || undefined,
  });

  if (data.greeting) {
    sections.push({ id: uid(), type: "message", align: headerAlign, divider: "none", text: data.greeting });
  }

  sections.push({
    id: uid(),
    type: "datetime",
    align: "left",
    divider: d(true),
    date: data.date,
    time: data.time,
    receiptNumber: data.receiptNumber,
  });

  // Profile-specific detail blocks (mirrors ReceiptPaper's fuel/pharmacy/etc).
  if (!isService) {
    const storeNumber = 100 + (seed % 8900);
    const reg = 1 + (seed % 12);
    if (profile === "fuel") {
      sections.push({
        id: uid(),
        type: "twocol",
        divider: "none",
        rows: [
          { label: "Pump", value: data.register?.replace(/[^0-9]/g, "") || "04" },
          { label: "Grade", value: "Unleaded" },
          { label: "Auth", value: data.receiptNumber.slice(-4) },
        ],
      });
    } else if (profile === "pharmacy") {
      sections.push({
        id: uid(),
        type: "twocol",
        divider: "none",
        rows: [
          { label: "RX #", value: String(7000000 + ((seed * 137) % 999999)) },
          { label: "Pharmacist", value: data.cashier || "On Duty" },
          { label: "Pickup", value: "Ready" },
        ],
      });
    } else if (profile === "warehouse") {
      sections.push({
        id: uid(),
        type: "twocol",
        divider: "none",
        rows: [{ label: "Member", value: `111${String(100000 + ((seed * 9301) % 899999))}` }],
      });
    } else if (!isTicket && !data.register) {
      sections.push({
        id: uid(),
        type: "twocol",
        divider: "none",
        flow: true,
        rows: [
          { label: "Store #", value: String(storeNumber) },
          { label: "Reg", value: String(reg) },
        ],
      });
    }
  }

  for (const s of data.sections ?? []) {
    sections.push({
      id: uid(),
      type: "twocol",
      divider: "none",
      title: s.title,
      rows: s.rows,
      flow: data.sectionStyle === "flow",
    });
  }

  if (!data.hideItems) {
    sections.push({
      id: uid(),
      type: "items",
      divider: d(true),
      items: data.items.map((i) => ({ ...i, id: uid() })),
      itemStyle: data.itemStyle,
      itemHeader: data.itemHeader,
      taxLabel: data.taxLabel,
      taxRate: data.taxRate,
      discount: data.discount,
      tip: data.tip,
      grandTotalLabel: data.grandTotalLabel,
      totalsDivider: d(true),
      showItemsSold: profile === "grocery" || profile === "warehouse",
    });
  }

  if (!data.hideTotals) {
    sections.push({
      id: uid(),
      type: "payment",
      divider: d(true),
      method: data.paymentMethod === "Cash" ? "Cash" : "Card",
      cardType:
        data.paymentMethod === "Credit Card"
          ? "Credit"
          : data.paymentMethod === "Debit Card"
            ? "Debit"
            : data.paymentMethod,
      cardLastFour: data.cardLastFour,
      amountTendered: data.amountTendered,
      showCardAuth: data.showCardAuth,
      inline: data.paymentInline,
    });
  }

  if (data.footerMessage) {
    sections.push({ id: uid(), type: "message", align: "center", divider: "none", text: data.footerMessage });
  }
  if (data.policyText) {
    sections.push({ id: uid(), type: "message", align: "center", divider: "none", text: data.policyText });
  }
  if (data.manager) {
    sections.push({ id: uid(), type: "message", align: "center", divider: "none", text: data.manager });
  }

  if (data.showBarcode) {
    sections.push(
      data.qrCode
        ? { id: uid(), type: "qr", align: "center", divider: "none", value: data.receiptNumber }
        : {
            id: uid(),
            type: "barcode",
            align: "center",
            divider: "none",
            value: data.receiptNumber,
            showText: true,
          }
    );
  }

  return {
    settings: {
      font: isService ? "sans" : font,
      widthPx: 380,
      accent: data.brandAccent ?? "#4f46e5",
      currency: data.currency,
      style: isService ? "card" : "paper",
    },
    sections,
  };
}

/** Totals for an items section. `discount` is a flat amount, or a percent of
 *  the subtotal when `discountPercent` is set. Returns the computed money values. */
export function itemsTotals(s: ItemsSection) {
  const subtotal = s.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.price || 0), 0);
  const rawDiscount = s.discountPercent
    ? subtotal * (Math.max(s.discount || 0, 0) / 100)
    : Math.max(s.discount || 0, 0);
  const discount = Math.min(rawDiscount, subtotal);
  const taxable = subtotal - discount;
  const tax = taxable * ((s.taxRate || 0) / 100);
  const tip = Math.max(s.tip || 0, 0);
  const total = taxable + tax + tip;
  return { subtotal, discount, tax, tip, total };
}

/** A new section of the given type, with sensible defaults. */
export function newSection(type: SectionType, currency = "USD"): Section {
  void currency;
  const base = { id: uid(), divider: "dashed" as RuleStyle };
  switch (type) {
    case "header":
      return { ...base, type, align: "center", storeName: "Store Name", address: "", phone: "", website: "" };
    case "datetime":
      return { ...base, type, align: "left", date: todayISO(), time: nowHHMM(), receiptNumber: randomReceiptNumber() };
    case "twocol":
      return { ...base, type, divider: "none", rows: [{ label: "Label", value: "Value" }] };
    case "items":
      return {
        ...base,
        type,
        items: [{ id: uid(), name: "Item", quantity: 1, price: 0 }],
        itemStyle: "table",
        taxLabel: "Sales Tax",
        taxRate: 0,
        discount: 0,
        discountPercent: true,
        tip: 0,
        totalsDivider: "dashed",
      };
    case "payment":
      return { ...base, type, method: "Card", cardType: "Credit", cardLastFour: "", showCardAuth: true };
    case "message":
      return { ...base, type, align: "center", divider: "none", text: "Thank you!" };
    case "barcode":
      return { ...base, type, align: "center", divider: "none", value: randomReceiptNumber(), showText: true };
    case "qr":
      return { ...base, type, align: "center", divider: "none", value: randomReceiptNumber() };
    case "image":
      return { ...base, type, align: "center", divider: "none", src: "", widthPct: 50 };
    case "signature":
      return { ...base, type, align: "center", divider: "none", label: "Signature" };
    case "spacer":
      return { ...base, type, divider: "none", size: 24 };
  }
}
