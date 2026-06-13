import type { ReceiptData, ReceiptTemplate } from "./types";
import { randomReceiptNumber, todayISO, nowHHMM, uid } from "./format";

export function baseReceipt(): ReceiptData {
  return {
    businessName: "Your Business Name",
    logoDataUrl: "",
    addressLine1: "123 Main Street",
    addressLine2: "City, State 00000",
    phone: "(555) 000-0000",
    website: "",
    receiptNumber: randomReceiptNumber(),
    date: todayISO(),
    time: nowHHMM(),
    cashier: "",
    register: "",
    items: [{ id: uid(), name: "Item name", quantity: 1, price: 9.99 }],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 0,
    discount: 0,
    tip: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    amountTendered: 0,
    footerMessage: "Thank you for your business!",
    showBarcode: true,
    paperStyle: "thermal",
  };
}

export function receiptFromTemplate(template: ReceiptTemplate): ReceiptData {
  const base = baseReceipt();
  return {
    ...base,
    ...template.defaults,
    items: template.defaults.items.map((item) => ({ ...item, id: uid() })),
    receiptNumber: randomReceiptNumber(),
    date: todayISO(),
    time: nowHHMM(),
  };
}

/** Deterministic version for statically rendered template previews. */
export function previewFromTemplate(template: ReceiptTemplate): ReceiptData {
  const base = baseReceipt();
  return {
    ...base,
    ...template.defaults,
    items: template.defaults.items,
    receiptNumber: "284916",
    date: "2026-06-12",
    time: "14:32",
  };
}
