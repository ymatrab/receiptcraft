export interface RelatedPost {
  slug: string;
  title: string;
}

/**
 * Hub pages had zero links back down to their own blog spokes (link equity
 * only flowed spoke -> hub). Sourced from docs/content-ledger.md's Hub column
 * (published posts only) — update this alongside the ledger when a new post
 * ships and its Hub is one of the keys below.
 */
const POSTS_BY_HUB: Record<string, RelatedPost[]> = {
  "/create": [
    { slug: "how-to-make-a-receipt", title: "How to Make a Receipt" },
    { slug: "how-to-make-a-receipt-of-payment", title: "How to Make a Receipt of Payment" },
    { slug: "receipt-generator-free", title: "Receipt Generator Free" },
    { slug: "receipt-maker-free", title: "Receipt Maker Free" },
    { slug: "create-a-receipt", title: "Create a Receipt" },
    { slug: "online-receipt-maker", title: "Online Receipt Maker" },
    { slug: "make-a-receipt", title: "Make a Receipt" },
    { slug: "photography-receipt-generator", title: "Photography Receipt Generator" },
    { slug: "veterinary-receipt-generator", title: "Veterinary Receipt Generator" },
    { slug: "florist-receipt-generator-custom-logo", title: "Florist Receipt Generator" },
    { slug: "food-truck-receipt-generator-tax-tip", title: "Food Truck Receipt Generator" },
    { slug: "gym-membership-receipt-generator", title: "Gym Membership Receipt Generator" },
    { slug: "dry-cleaning-receipt-generator", title: "Dry Cleaning Receipt Generator" },
    { slug: "towing-service-receipt-generator", title: "Towing Service Receipt Generator" },
    { slug: "pet-grooming-receipt-generator", title: "Pet Grooming Receipt Generator" },
    { slug: "electronics-store-receipt-generator-sku", title: "Electronics Store Receipt Generator" },
    { slug: "clothing-store-receipt-generator-discount", title: "Clothing Store Receipt Generator" },
    { slug: "hardware-store-receipt-generator-itemized-materials", title: "Hardware Store Receipt Generator" },
    { slug: "pharmacy-receipt-generator-itemized-products", title: "Pharmacy Receipt Generator" },
  ],
  "/alternatives": [
    { slug: "best-free-receipt-generator", title: "Best Free Receipt Generator" },
    { slug: "receiptmakerly-alternative", title: "Receiptmakerly Alternative" },
    { slug: "expressexpense-alternative", title: "ExpressExpense Alternative" },
  ],
  "/templates/restaurant": [
    { slug: "how-to-write-tip-on-receipt", title: "How to Write a Tip on a Receipt" },
  ],
  "/compare/makereceipt": [{ slug: "makereceipt-alternative", title: "MakeReceipt Alternative" }],
  "/compare/receiptfaker": [{ slug: "receiptfaker-alternative", title: "ReceiptFaker Alternative" }],
  "/compare/receiptbaker": [{ slug: "receiptbaker-alternative", title: "ReceiptBaker Alternative" }],
  "/brands/cvs-pharmacy": [{ slug: "cvs-pharmacy-receipt", title: "CVS Pharmacy Receipt" }],
  "/brands/louis-vuitton": [{ slug: "louis-vuitton-receipt", title: "Louis Vuitton Receipt" }],
  "/brands/doordash": [{ slug: "doordash-receipt", title: "DoorDash Receipt" }],
  "/brands/burger-king": [{ slug: "burger-king-receipt", title: "Burger King Receipt" }],
};

const MAX_RELATED = 4;

/** Most-recently-published first, capped so an overloaded hub (e.g. /create,
 * which 19 posts currently point to) doesn't dump its whole list on the page. */
export function relatedPostsForHub(hub: string): RelatedPost[] {
  const posts = POSTS_BY_HUB[hub];
  if (!posts) return [];
  return posts.slice(-MAX_RELATED).reverse();
}
