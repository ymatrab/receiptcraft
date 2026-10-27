import type { ReceiptData } from "./types";
import { randomReceiptNumber, todayISO, nowHHMM, uid } from "./format";

/**
 * The blank receipt every template and AI result starts from.
 *
 * Its own module, free of brand data: lib/receipt imports every brand template
 * to work out layouts, and anything the builder imports ships to the browser.
 */
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
