import type { BrandCategory } from "./brand-categories";

/**
 * High-intent "receipt help" pages: for a curated set of popular brands we
 * generate genuinely useful guides (find a lost receipt, get a copy, returns &
 * receipts) that funnel searchers to the builder to recreate a legitimate
 * receipt. Each (brand × topic) is a distinct real search query.
 */

export type IntentKind = "lost-receipt" | "receipt-copy" | "return-policy" | "refund-policy";

interface IntentBrand {
  slug: string; // must match a brand slug in BRAND_TEMPLATES
  name: string;
  category: BrandCategory;
}

const BRANDS: IntentBrand[] = [
  { slug: "walmart", name: "Walmart", category: "Retail" },
  { slug: "target", name: "Target", category: "Retail" },
  { slug: "amazon", name: "Amazon", category: "Retail" },
  { slug: "costco", name: "Costco", category: "Grocery" },
  { slug: "sam-s-club", name: "Sam's Club", category: "Grocery" },
  { slug: "kroger", name: "Kroger", category: "Grocery" },
  { slug: "whole-foods", name: "Whole Foods", category: "Grocery" },
  { slug: "trader-joe-s", name: "Trader Joe's", category: "Grocery" },
  { slug: "publix", name: "Publix", category: "Grocery" },
  { slug: "safeway", name: "Safeway", category: "Grocery" },
  { slug: "aldi", name: "Aldi", category: "Grocery" },
  { slug: "walgreens", name: "Walgreens", category: "Health & Pharmacy" },
  { slug: "cvs-pharmacy", name: "CVS Pharmacy", category: "Health & Pharmacy" },
  { slug: "home-depot", name: "Home Depot", category: "Retail" },
  { slug: "lowe-s", name: "Lowe's", category: "Retail" },
  { slug: "best-buy", name: "Best Buy", category: "Retail" },
  { slug: "apple-store", name: "Apple Store", category: "Retail" },
  { slug: "ikea", name: "IKEA", category: "Retail" },
  { slug: "nike", name: "Nike", category: "Retail" },
  { slug: "sephora", name: "Sephora", category: "Retail" },
  { slug: "ulta-beauty", name: "Ulta Beauty", category: "Retail" },
  { slug: "macy-s", name: "Macy's", category: "Retail" },
  { slug: "nordstrom", name: "Nordstrom", category: "Retail" },
  { slug: "gamestop", name: "GameStop", category: "Retail" },
  { slug: "dollar-tree", name: "Dollar Tree", category: "Retail" },
  { slug: "mcdonalds", name: "McDonald's", category: "Restaurants" },
  { slug: "starbucks", name: "Starbucks", category: "Coffee & Cafés" },
  { slug: "chick-fil-a", name: "Chick-fil-A", category: "Restaurants" },
  { slug: "chipotle", name: "Chipotle", category: "Restaurants" },
  { slug: "dunkin", name: "Dunkin'", category: "Coffee & Cafés" },
  { slug: "uber", name: "Uber", category: "Rideshare & Delivery" },
  { slug: "lyft", name: "Lyft", category: "Rideshare & Delivery" },
  { slug: "doordash", name: "DoorDash", category: "Rideshare & Delivery" },
  { slug: "uber-eats", name: "Uber Eats", category: "Rideshare & Delivery" },
  { slug: "instacart", name: "Instacart", category: "Rideshare & Delivery" },
  { slug: "shell", name: "Shell", category: "Gas & Convenience" },
  { slug: "chevron", name: "Chevron", category: "Gas & Convenience" },
  { slug: "7-eleven", name: "7-Eleven", category: "Gas & Convenience" },
  { slug: "marriott", name: "Marriott", category: "Travel" },
  { slug: "hilton", name: "Hilton", category: "Travel" },
  { slug: "airbnb", name: "Airbnb", category: "Travel" },
  { slug: "delta-airlines", name: "Delta Airlines", category: "Travel" },
  { slug: "southwest-airlines", name: "Southwest Airlines", category: "Travel" },
  { slug: "burger-king", name: "Burger King", category: "Restaurants" },
  { slug: "subway", name: "Subway", category: "Restaurants" },
  { slug: "taco-bell", name: "Taco Bell", category: "Restaurants" },
  { slug: "kfc", name: "KFC", category: "Restaurants" },
  { slug: "wendy-s", name: "Wendy's", category: "Restaurants" },
  { slug: "popeyes", name: "Popeyes", category: "Restaurants" },
  { slug: "domino-s-pizza", name: "Domino's Pizza", category: "Restaurants" },
  { slug: "pizza-hut", name: "Pizza Hut", category: "Restaurants" },
  { slug: "panda-express", name: "Panda Express", category: "Restaurants" },
  { slug: "panera-bread", name: "Panera Bread", category: "Restaurants" },
  { slug: "tim-hortons", name: "Tim Hortons", category: "Coffee & Cafés" },
  { slug: "peet-s-coffee", name: "Peet's Coffee", category: "Coffee & Cafés" },
  { slug: "petco", name: "Petco", category: "Retail" },
  { slug: "autozone", name: "AutoZone", category: "Retail" },
  { slug: "barnes-noble", name: "Barnes & Noble", category: "Retail" },
  { slug: "zara", name: "Zara", category: "Retail" },
  { slug: "h-m", name: "H&M", category: "Retail" },
  { slug: "gucci", name: "Gucci", category: "Retail" },
  { slug: "ebay", name: "eBay", category: "Retail" },
  { slug: "exxon", name: "Exxon", category: "Gas & Convenience" },
  { slug: "bp", name: "BP", category: "Gas & Convenience" },
  { slug: "wawa", name: "Wawa", category: "Gas & Convenience" },
  { slug: "united-airlines", name: "United Airlines", category: "Travel" },
  { slug: "american-airlines", name: "American Airlines", category: "Travel" },
  { slug: "hyatt", name: "Hyatt", category: "Travel" },
  { slug: "hertz", name: "Hertz", category: "Travel" },
  { slug: "expedia", name: "Expedia", category: "Travel" },
  { slug: "grubhub", name: "Grubhub", category: "Rideshare & Delivery" },
  { slug: "netflix", name: "Netflix", category: "Digital & Subscriptions" },
  { slug: "spotify", name: "Spotify", category: "Digital & Subscriptions" },
];

const SUFFIX: Record<IntentKind, string> = {
  "lost-receipt": "lost-receipt",
  "receipt-copy": "receipt-copy",
  "return-policy": "return-policy",
  "refund-policy": "refund-policy",
};

// Product brands talk about "returns"; service/digital brands about "refunds".
const RETURN_CATEGORIES = new Set<BrandCategory>(["Retail", "Grocery", "Health & Pharmacy"]);
const thirdKind = (category: BrandCategory): IntentKind =>
  RETURN_CATEGORIES.has(category) ? "return-policy" : "refund-policy";

export interface IntentPage {
  slug: string;
  brandSlug: string;
  brandName: string;
  category: BrandCategory;
  kind: IntentKind;
}

export const INTENT_PAGES: IntentPage[] = BRANDS.flatMap((b) => {
  const kinds: IntentKind[] = ["lost-receipt", "receipt-copy", thirdKind(b.category)];
  return kinds.map((kind) => ({
    slug: `${b.slug}-${SUFFIX[kind]}`,
    brandSlug: b.slug,
    brandName: b.name,
    category: b.category,
    kind,
  }));
});

export const INTENT_SLUGS = INTENT_PAGES.map((p) => p.slug);

export function getIntentPage(slug: string): IntentPage | undefined {
  return INTENT_PAGES.find((p) => p.slug === slug);
}

export function siblingIntents(page: IntentPage): IntentPage[] {
  return INTENT_PAGES.filter((p) => p.brandSlug === page.brandSlug && p.slug !== page.slug);
}

/** Where this brand's receipts usually live, phrased for the steps. */
function lookupStep(name: string, category: BrandCategory): string {
  switch (category) {
    case "Rideshare & Delivery":
      return `Open the ${name} app and go to your trip or order history — past receipts are emailed and stored there.`;
    case "Digital & Subscriptions":
      return `Sign in to your ${name} account and open your billing or order history to view and download the receipt.`;
    case "Travel":
      return `Check your ${name} confirmation email, or sign in to your ${name} account to find the booking and its receipt.`;
    default:
      return `Check your email for a digital ${name} receipt, and open the ${name} app or loyalty account to view recent purchases.`;
  }
}

export interface IntentSection {
  heading: string;
  body?: string;
  steps?: string[];
}

export interface IntentContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: IntentSection[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
}

export function intentContent(p: IntentPage): IntentContent {
  const n = p.brandName;
  if (p.kind === "lost-receipt") {
    return {
      title: `How to Find a Lost ${n} Receipt (2026 Guide)`,
      description: `Lost your ${n} receipt? Here's how to find a copy — check your email, the ${n} app and your account — or recreate a ${n} receipt in seconds.`,
      h1: `How to Find a Lost ${n} Receipt`,
      lead: `Misplaced your ${n} receipt? Before you give up, there are a few quick places to look — and if the original is gone for good, you can recreate one for your records.`,
      sections: [
        {
          heading: `Where to look first`,
          steps: [
            `Check your email — ${n} and many retailers send a digital receipt or order confirmation at checkout.`,
            lookupStep(n, p.category),
            `Review your bank or credit-card statement to confirm the date, location and exact amount of the purchase.`,
            `Contact ${n} customer service with your payment card, the store or location, and the approximate date — they can sometimes look up or reprint a receipt.`,
          ],
        },
        {
          heading: `Can't find your ${n} receipt? Recreate it`,
          body: `If the original is unrecoverable, you can recreate a ${n} receipt that matches the items, prices, date and store details of your real purchase — handy for an expense report, reimbursement or your own bookkeeping. Open the free ${n} receipt builder, fill in the details, and download it as a PDF or PNG.`,
        },
        {
          heading: `Use it responsibly`,
          body: `Only recreate a receipt for a purchase that actually happened and for legitimate purposes such as personal records, reimbursement of real expenses, or replacing a lost copy. Creating a receipt to mislead a person, employer, retailer or tax authority is illegal.`,
        },
      ],
      faqs: [
        { question: `Can I get a copy of an old ${n} receipt?`, answer: `Often yes — check your email, your ${n} app or online account, and your card statement. For older purchases, ${n} customer service may be able to look up the transaction with your card and the date.` },
        { question: `Does ${n} keep receipts on file?`, answer: `It varies. Purchases made through a ${n} app, loyalty program or online account are usually stored in your order history. In-store cash purchases are the hardest to retrieve, which is when recreating a receipt for your records is most useful.` },
      ],
      ctaHeading: `Recreate your ${n} receipt now`,
    };
  }
  if (p.kind === "receipt-copy") {
    return {
      title: `How to Get a Copy of Your ${n} Receipt`,
      description: `Need a duplicate ${n} receipt? Learn how to reprint or download a copy from the ${n} app, your account or in store — or make a new ${n} receipt for your records.`,
      h1: `How to Get a Copy of Your ${n} Receipt`,
      lead: `Need another copy of a ${n} receipt for an expense report or your records? Here are the fastest ways to get one.`,
      sections: [
        {
          heading: `Ways to get a duplicate ${n} receipt`,
          steps: [
            `In store: take your payment card and the approximate date to the ${n} customer-service desk and ask for a receipt reprint.`,
            lookupStep(n, p.category),
            `Resend the email receipt: if you provided an email at checkout, search your inbox for the ${n} order confirmation and re-download it.`,
          ],
        },
        {
          heading: `Or recreate a ${n} receipt`,
          body: `If a reprint isn't available, you can rebuild a ${n} receipt with the same items, prices, date and store details, then download it as a PDF or PNG. It takes under a minute and needs no account.`,
        },
      ],
      faqs: [
        { question: `Can ${n} reprint a receipt?`, answer: `In many cases yes — bring the card you paid with and the date to the customer-service desk. Reprint availability and time limits depend on the store's point-of-sale system.` },
        { question: `Is it legal to recreate a ${n} receipt?`, answer: `Recreating a receipt for a real purchase — for your records, an expense report or replacing a lost copy — is legitimate. Using a fabricated receipt to deceive anyone is not.` },
      ],
      ctaHeading: `Make a copy of your ${n} receipt`,
    };
  }
  if (p.kind === "refund-policy") {
    return {
      title: `${n} Refunds: Do You Need a Receipt?`,
      description: `Getting a refund from ${n}? Learn whether you need a receipt or order confirmation, where to find it, and what to do if you've lost your ${n} receipt.`,
      h1: `${n} Refunds & Receipts`,
      lead: `Requesting a refund or cancellation from ${n}? Here's how your receipt or order confirmation fits in — and what to do if you can't find it.`,
      sections: [
        {
          heading: `Do you need a receipt for a ${n} refund?`,
          body: `For most refunds and cancellations, ${n} ties the request to your order — so a receipt, order confirmation or account record makes it much faster. Refund eligibility and timeframes vary and change over time, so check ${n}'s current refund or cancellation policy before requesting one.`,
        },
        {
          heading: `Where to find your ${n} order details`,
          steps: [
            lookupStep(n, p.category),
            `Search your email for the ${n} order or booking confirmation.`,
            `Check your bank or card statement to confirm the date and amount of the charge.`,
          ],
        },
        {
          heading: `Lost the ${n} receipt for your records?`,
          body: `If your refund is processed but you no longer have the original receipt, you can recreate a ${n} receipt that reflects the real transaction to keep with your expense records. Use a recreated receipt only honestly — never to misrepresent a charge.`,
        },
      ],
      faqs: [
        { question: `How do I get a refund from ${n}?`, answer: `Start from your ${n} order or account, find the transaction, and follow the refund or cancellation steps. Having the receipt or confirmation handy speeds it up. Exact steps and eligibility depend on ${n}'s current policy.` },
        { question: `Can I get a receipt for a ${n} refund?`, answer: `Yes — ${n} typically issues a refund confirmation by email or in your account. Keep it with the original receipt for your records.` },
      ],
      ctaHeading: `Recreate your ${n} receipt`,
    };
  }

  // return-policy
  return {
    title: `${n} Returns: Do You Need a Receipt?`,
    description: `Returning something to ${n}? Learn whether you need a receipt, what counts as proof of purchase, and what to do if you've lost your ${n} receipt.`,
    h1: `${n} Returns: Do You Need a Receipt?`,
    lead: `Planning a return at ${n}? Here's how receipts and proof of purchase typically factor into returns — and what to do if you've lost yours.`,
    sections: [
      {
        heading: `Do you need a receipt to return to ${n}?`,
        body: `Most retailers, including ${n}, ask for a receipt or other proof of purchase to process a return or refund. A receipt confirms what you bought, when, where and for how much. Return windows and conditions vary by item and change over time, so always check the official ${n} return policy for the current rules before heading to the store.`,
      },
      {
        heading: `What counts as proof of purchase`,
        steps: [
          `The original printed or emailed ${n} receipt.`,
          `Your ${n} app, account or loyalty purchase history.`,
          `A bank or credit-card statement showing the ${n} transaction (sometimes accepted alongside ID).`,
        ],
      },
      {
        heading: `Lost your ${n} receipt before a return?`,
        body: `If you've misplaced the receipt for a genuine purchase, first try your email and ${n} account. If you can't recover it, you can recreate a ${n} receipt that reflects your real purchase to keep with your records. Only use a recreated receipt honestly — not to misrepresent a purchase.`,
      },
    ],
    faqs: [
      { question: `Can I return to ${n} without a receipt?`, answer: `Sometimes — some stores offer store credit or accept alternate proof such as your account history or the original card, often with ID and limits. Policies vary, so check ${n}'s official return policy.` },
      { question: `How long do I have to return to ${n}?`, answer: `Return windows depend on the item and current policy, so confirm the timeframe on ${n}'s official return-policy page or your receipt before returning.` },
    ],
    ctaHeading: `Recreate a lost ${n} receipt`,
  };
}
