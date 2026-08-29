/**
 * Worked examples for the homepage hero.
 *
 * These are real output from the model that serves /api/ai/generate, captured
 * on 2026-08-29 — not invented copy. A demo that flatters the product past what
 * it actually does is the same false-advertising problem as the claims this
 * board has spent weeks removing.
 *
 * AI generation needs an account, so a signed-out visitor could no longer see
 * the one feature six competitors lack. These restore that without an API call,
 * which is the point: the tokens are for customers, not for demonstrations.
 *
 * Deliberately carries NO date. The hero renders today's date at display time,
 * so the example can never rot into showing a stale one.
 */

export interface DemoItem {
  name: string;
  quantity: number;
  price: number;
}

export interface DemoReceipt {
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  currency: string;
  taxLabel: string;
  taxRate: number;
  paymentMethod: string;
  items: DemoItem[];
}

export interface DemoExample {
  prompt: string;
  receipt: DemoReceipt;
}

export const AI_DEMOS: DemoExample[] = [
  {
    prompt: "Uber ride downtown, $18.40",
    receipt: {
      businessName: "Uber Technologies Inc.",
      addressLine1: "1455 Market Street",
      addressLine2: "San Francisco, CA 94103",
      currency: "USD",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      paymentMethod: "Credit Card",
      items: [
        { name: "Downtown Ride", quantity: 1, price: 18.4 },
      ],
    },
  },
  {
    prompt: "Dinner for two at an Italian restaurant, two pastas, a bottle of wine, $86.50",
    receipt: {
      businessName: "Luigi's Trattoria",
      addressLine1: "123 Via Roma",
      addressLine2: "San Marco, CA 94016",
      currency: "USD",
      taxLabel: "Sales Tax",
      taxRate: 8.5,
      paymentMethod: "Credit Card",
      items: [
        { name: "Spaghetti Carbonara", quantity: 2, price: 18 },
        { name: "House Red Wine (750ml)", quantity: 1, price: 33.73 },
        { name: "Tiramisu", quantity: 1, price: 10 },
      ],
    },
  },
  {
    prompt: "Weekly grocery run at a supermarket in Austin, 6 items, $54.20",
    receipt: {
      businessName: "Greenfield Market",
      addressLine1: "1234 South Lamar Blvd",
      addressLine2: "Austin, TX 78704",
      currency: "USD",
      taxLabel: "Sales Tax",
      taxRate: 8.5,
      paymentMethod: "Credit Card",
      items: [
        { name: "Organic Bananas (1 lb)", quantity: 2, price: 0.79 },
        { name: "Almond Milk, 1qt", quantity: 1, price: 3.49 },
        { name: "Free-range Eggs, dozen", quantity: 1, price: 4.99 },
        { name: "Whole Wheat Bread", quantity: 1, price: 2.99 },
        { name: "Ground Beef, 1 lb", quantity: 2, price: 5.99 },
        { name: "Mixed Nuts, 8 oz", quantity: 1, price: 6.25 },
      ],
    },
  },
];

/** Subtotal, tax and total, derived rather than stored so they always agree. */
export function demoTotals(r: DemoReceipt) {
  const subtotal = r.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * (r.taxRate / 100);
  return { subtotal, tax, total: subtotal + tax };
}
