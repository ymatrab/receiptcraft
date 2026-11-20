import type { BrandCategory } from "./brand-categories";
import { SITE } from "./site";

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

/**
 * Three guides per brand: lost-receipt, receipt-copy, and a policy guide
 * (return-policy for product brands, refund-policy for the rest).
 *
 * The policy guides were retired on 2026-08-31 and restored on 2026-09-01. The
 * numbers behind the retirement were real — 64 URLs, 5,086 impressions and 4
 * clicks over 1–30 Aug — but the conclusion drawn from them was wrong.
 *
 * The reading was "these queries belong to the retailer, so we can never win
 * the click". The better reading is that page-one rankings on 64 brand policy
 * queries are an asset we are wasting: zara-return-policy holds position 8.4 on
 * 2,117 impressions a month, and answers a question nobody asked. The title
 * ("Zara Returns: Do You Need a Receipt?") is a receipt maker's angle on
 * "zara return policy". Demand is already reaching the page. The content is
 * what fails, and content is fixable — deleting the page throws away the
 * ranking that took months to earn.
 *
 * So these stay, and get rewritten to answer the query they actually rank for:
 * the real return window, what counts as proof of purchase, what to do without
 * a receipt, sourced to the retailer's own policy — with the builder offered
 * afterwards for recreating a receipt for your records, not as the lead.
 *
 * The rule this encodes: fix the page before removing it. A URL earning
 * impressions at position 9 is a rewrite candidate, not dead weight.
 */
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

/**
 * Brand-specific receipt facts. This is what keeps the 219 intent pages from
 * being noun-swapped duplicates: each brand gets its real lookup path (app,
 * loyalty program, online tool) and a genuinely brand-specific receipt/return
 * quirk. Phrased cautiously — programs and policies change, so facts point at
 * the mechanism, not exact numbers, unless the policy is famously stable.
 */
interface BrandFacts {
  /** Where this brand's receipts actually live — the concrete lookup path. */
  lookup: string;
  /** A brand-specific quirk worth knowing, rendered as a "Good to know" note. */
  quirk: string;
}

const BRAND_FACTS: Record<string, BrandFacts> = {
  walmart: {
    lookup: `Use Walmart's online receipt lookup: enter the store location, purchase date and the card you paid with, and it can retrieve a copy of an in-store receipt. Purchases made while signed in to the Walmart app appear under Purchase History automatically.`,
    quirk: `Every Walmart receipt carries a TC# (transaction code) near the barcode — with that number, any Walmart store can pull up the full transaction.`,
  },
  target: {
    lookup: `Open the Target app's Wallet or your Target Circle account — purchases made with a linked card or your Circle ID are stored there. Guest Services can also look up in-store card purchases at the register.`,
    quirk: `Returns are tied to your payment card or Circle account, so Target can often verify a purchase with no paper receipt at all.`,
  },
  amazon: {
    lookup: `Go to Your Orders on amazon.com, open the order and choose "Invoice" — Amazon keeps a printable invoice for every order, indefinitely.`,
    quirk: `Amazon never issues paper receipts; the order invoice is the receipt, and it can be re-downloaded any time for expense reports.`,
  },
  costco: {
    lookup: `Your Costco membership records every warehouse purchase — the membership desk can reprint receipts (typically going back about two years), and Costco.com orders live under Orders & Returns.`,
    quirk: `Because purchases are tied to your membership card, Costco can process most returns without any receipt at all.`,
  },
  "sam-s-club": {
    lookup: `Sam's Club ties every purchase to your membership: check Purchase History in the app or ask the Member Services desk to reprint a receipt.`,
    quirk: `Scan & Go purchases store their receipts directly in the app — nothing paper to lose in the first place.`,
  },
  kroger: {
    lookup: `Purchases made with your Kroger Plus card or alt-ID are recorded — see My Purchases on kroger.com or in the app for digital copies of store receipts.`,
    quirk: `If you typed your phone number at the register, the purchase is on your loyalty account even if you paid cash.`,
  },
  "whole-foods": {
    lookup: `If you scanned your Prime code at checkout, the receipt is in your Amazon account under Whole Foods Market orders; otherwise check the email tied to your Amazon account.`,
    quirk: `Whole Foods receipts flow into Amazon's order system — Amazon customer service can resend them like any other order confirmation.`,
  },
  "trader-joe-s": {
    lookup: `Trader Joe's has no loyalty program or app purchase history — the paper receipt and your card statement are the only records of an in-store purchase.`,
    quirk: `Trader Joe's is famous for its no-questions product guarantee: crew members routinely accept returns of opened products even without a receipt.`,
  },
  publix: {
    lookup: `If you scanned your Club Publix phone number at checkout, digital receipts appear in the Publix app; otherwise the paper receipt and your card statement are the records.`,
    quirk: `Publix's guarantee is unusually strong — stores generally refund or replace any item that doesn't satisfy, receipt or not.`,
  },
  safeway: {
    lookup: `Purchases made with your Safeway for U account (phone number at checkout) are recorded in the app under purchase history.`,
    quirk: `Fuel and grocery rewards tie to the same for U account, so one lookup covers both kinds of receipts.`,
  },
  aldi: {
    lookup: `ALDI has no loyalty program tracking in-store purchases — keep the paper receipt or match the amount on your card statement.`,
    quirk: `ALDI's "Twice as Nice" guarantee replaces the product AND refunds your money on quality issues — one of the most generous policies in grocery.`,
  },
  walgreens: {
    lookup: `Purchases made with your myWalgreens account are in the app under purchase history; the pharmacy can separately reprint prescription records for insurance or FSA claims.`,
    quirk: `Pharmacy purchases and front-of-store purchases are stored in different systems — ask the pharmacy counter for Rx history, not the front register.`,
  },
  "cvs-pharmacy": {
    lookup: `Link your ExtraCare card and CVS stores digital receipts in the app automatically; prescription history is available separately from the pharmacy.`,
    quirk: `CVS lets you opt into digital-only receipts entirely — a fix for their famously long paper receipts, and your history stays searchable in the app.`,
  },
  "home-depot": {
    lookup: `The Service Desk can look up in-store purchases made with a credit or debit card and reprint the receipt; Pro Xtra members get purchase tracking automatically.`,
    quirk: `Home Depot's card-based receipt lookup means keeping the same payment card is as good as keeping the receipt for most returns.`,
  },
  "lowe-s": {
    lookup: `A MyLowe's account tracks every purchase made with your linked cards or phone number — history is retrievable online going back years.`,
    quirk: `MyLowe's purchase history is one of the longest-running in retail, which makes it a favorite for warranty claims on appliances and tools.`,
  },
  "best-buy": {
    lookup: `Sign in to your My Best Buy account — Purchase History covers both online and in-store purchases made with your member ID, and receipts can be reprinted from there.`,
    quirk: `Best Buy emails receipts by default when your account is attached, so search your inbox for the order number before asking the store.`,
  },
  "apple-store": {
    lookup: `Apple emails every receipt automatically. For App Store/services, see Settings → Media & Purchases or reportaproblem.apple.com; for retail purchases, check the email on your Apple ID.`,
    quirk: `Apple Store purchases tie to your Apple ID, so a Genius Bar appointment can verify ownership without any paper receipt.`,
  },
  ikea: {
    lookup: `If you scanned your IKEA Family card at checkout, the store can retrieve the purchase; otherwise bring the payment card to the returns desk for a lookup.`,
    quirk: `IKEA's 365-day return window (with receipt) is among the longest anywhere — even opened items qualify in most cases.`,
  },
  nike: {
    lookup: `Nike Members' purchases — online and in Nike stores when you scan your member pass — live under Orders in the Nike app or nike.com.`,
    quirk: `Nike Member purchases are receipt-free by design: your member profile is the proof of purchase at any Nike store.`,
  },
  sephora: {
    lookup: `Beauty Insider records every purchase — stores can look up transactions by your account, and online orders live under Purchase History.`,
    quirk: `Sephora's purchase history powers no-receipt returns: your Beauty Insider account is usually all the proof needed.`,
  },
  "ulta-beauty": {
    lookup: `Ultamate Rewards tracks in-store and online purchases — check Purchase History in the Ulta app or ask an associate to look up your account.`,
    quirk: `Ulta can process returns against your rewards account history, so a lost paper receipt rarely blocks a return.`,
  },
  "macy-s": {
    lookup: `Macy's can look up purchases made with a Macy's card or a card tied to your Star Rewards account at any register.`,
    quirk: `Star Rewards members' purchases are searchable in-store for months, which Macy's uses for both returns and price adjustments.`,
  },
  nordstrom: {
    lookup: `Purchases tied to your Nordy Club account or payment card can be looked up by any salesperson; online orders live in your account's purchase history.`,
    quirk: `Nordstrom famously has no formal return policy — returns are handled case-by-case, and a card lookup usually substitutes for a receipt.`,
  },
  gamestop: {
    lookup: `PowerUp Rewards (now GameStop Pro) records purchases to your account — stores can look up transactions with your membership.`,
    quirk: `Pre-owned purchases carry their own return window distinct from new products, so the receipt (or account record) matters more at GameStop than most stores.`,
  },
  "dollar-tree": {
    lookup: `Dollar Tree has no loyalty program or receipt lookup — the paper receipt or your card statement is the only record of a purchase.`,
    quirk: `Dollar Tree generally offers exchanges rather than cash refunds, so the receipt matters less there than almost anywhere else.`,
  },
  mcdonalds: {
    lookup: `Orders placed in the McDonald's app are stored under Recent Orders with full receipts; counter purchases exist only on paper and your card statement.`,
    quirk: `Every McDonald's paper receipt carries a survey code redeemable for a food reward — a reason to keep it beyond bookkeeping.`,
  },
  starbucks: {
    lookup: `App and Starbucks Rewards purchases are stored in your order history; card purchases at the register can be matched via your bank statement.`,
    quirk: `Paying through the Starbucks app means every purchase is automatically receipted in your history — baristas can't reprint register receipts later.`,
  },
  "chick-fil-a": {
    lookup: `Chick-fil-A One app orders keep full digital receipts under order history; drive-thru card purchases are matched via your statement.`,
    quirk: `Chick-fil-A One points can be claimed retroactively from a paper receipt in the app — scanning it also archives the purchase digitally.`,
  },
  chipotle: {
    lookup: `Online and app orders are emailed and stored in your Chipotle Rewards account; in-restaurant purchases exist on paper and your card statement.`,
    quirk: `Chipotle Rewards lets you add a missed in-store purchase by entering the receipt within a few days — which also logs it to your account.`,
  },
  dunkin: {
    lookup: `Dunkin' Rewards app orders are stored with receipts in your order history; on-the-go orders are also emailed.`,
    quirk: `Paying with a loaded Dunkin' card in the app creates a double record — the card transaction and the order receipt.`,
  },
  uber: {
    lookup: `Every Uber trip receipt is auto-emailed and stored in the app: Account → Trips → select the trip → view or resend the receipt, including a business-friendly PDF.`,
    quirk: `Uber lets you switch a past trip to a business profile after the fact, regenerating the receipt with the right details for expensing.`,
  },
  lyft: {
    lookup: `Open the Lyft app → Ride History → select the ride — the receipt is there and can be re-sent to your email, or exported via Lyft's business profile.`,
    quirk: `Lyft business profiles auto-forward ride receipts to your work email, eliminating lost-receipt problems for commuters.`,
  },
  doordash: {
    lookup: `DoorDash stores every order under Orders with an emailed receipt; tap the order → "View Receipt" for an itemized breakdown including fees and tip.`,
    quirk: `The itemized DoorDash receipt separates food subtotal from delivery/service fees — which many employers require for meal expensing.`,
  },
  "uber-eats": {
    lookup: `Uber Eats receipts are emailed automatically and stored under Orders in the app — open a past order to view or resend the full receipt.`,
    quirk: `Uber Eats and Uber rides share one account, so business-profile receipt forwarding covers both food and travel.`,
  },
  instacart: {
    lookup: `Instacart emails a final receipt after delivery (including substitutions and weight adjustments) and keeps every order under Your Orders.`,
    quirk: `The final Instacart receipt often differs from the checkout total due to weight-based items — the emailed final version is the accurate one for records.`,
  },
  shell: {
    lookup: `Pay-at-pump receipts can't be reprinted once you drive off, but purchases made through the Shell app (Fuel Rewards) are stored in your transaction history.`,
    quirk: `The station itself keeps an internal transaction journal — same-day, an attendant can often reprint a pump receipt if you know the pump number and time.`,
  },
  chevron: {
    lookup: `Chevron app purchases are stored in the app's transaction history; pump receipts otherwise exist only on paper and your card statement.`,
    quirk: `Chevron stations can reprint a pump transaction from the register journal shortly after purchase — ask inside before leaving.`,
  },
  "7-eleven": {
    lookup: `Scanning your 7Rewards barcode at checkout logs the purchase in the 7-Eleven app; fuel and unscanned purchases live only on paper and your statement.`,
    quirk: `7-Eleven's app wallet purchases carry digital receipts automatically — the paper receipt is optional if you scanned in.`,
  },
  marriott: {
    lookup: `Marriott emails the folio at checkout, and past stays are stored in your Marriott Bonvoy account — you can also request a folio copy from marriott.com without calling the hotel.`,
    quirk: `Hotel folios are retrievable long after checkout — Marriott's online folio request works for stays from months earlier, which most guests don't realize.`,
  },
  hilton: {
    lookup: `Your Hilton Honors account stores past stays; request a copy of a folio through the Hilton website or app, or from the hotel's front desk by email.`,
    quirk: `Hilton folios distinguish room, tax and incidentals line by line — finance teams usually require this folio, not the card statement.`,
  },
  airbnb: {
    lookup: `Go to Trips → select the stay → receipts and VAT invoices are downloadable per reservation, indefinitely.`,
    quirk: `Airbnb issues both a payment receipt and (where applicable) a VAT invoice — business travelers usually need the second, hidden under the reservation details.`,
  },
  "delta-airlines": {
    lookup: `Delta's online receipt lookup retrieves ticket and fee receipts by ticket number, confirmation code or credit card — no SkyMiles login required.`,
    quirk: `Delta keeps ticket receipts searchable by card number alone, which rescues receipts for tickets booked by someone else.`,
  },
  "southwest-airlines": {
    lookup: `Past flight receipts live under My Account → Trips on southwest.com; itinerary emails double as receipts with the full fare breakdown.`,
    quirk: `Southwest's no-change-fee model means reissued tickets generate fresh receipts — expense the newest email, not the original.`,
  },
  "burger-king": {
    lookup: `Royal Perks app orders keep digital receipts in order history; counter purchases exist on paper and your card statement.`,
    quirk: `BK receipts carry a survey code for a discounted return visit — and completing it requires the receipt's store and time details.`,
  },
  subway: {
    lookup: `Orders through the Subway app or site are emailed and stored in your MVP Rewards account history.`,
    quirk: `Scanning your Subway rewards at the register logs the purchase to your account even when you pay cash.`,
  },
  "taco-bell": {
    lookup: `Taco Bell app orders keep receipts under order history; in-store purchases are paper-only plus your card statement.`,
    quirk: `App orders earn rewards automatically and archive every receipt — counter cash purchases are the only untraceable ones.`,
  },
  kfc: {
    lookup: `KFC app and web orders are emailed and stored in your account's order history; counter purchases live on paper.`,
    quirk: `KFC receipts include a guest-survey invitation tied to the specific store and visit time printed on them.`,
  },
  "wendy-s": {
    lookup: `Wendy's app orders are stored with receipts in your account; drive-thru card purchases are matched via your bank statement.`,
    quirk: `Wendy's Rewards can retroactively credit an in-store visit from the receipt barcode — scanning it also saves the purchase digitally.`,
  },
  popeyes: {
    lookup: `Popeyes app orders keep digital receipts in order history; restaurant counter purchases exist on paper and your card statement.`,
    quirk: `Popeyes Rewards ties purchases to your account only for app/web orders — walk-in purchases never enter the system.`,
  },
  "domino-s-pizza": {
    lookup: `Domino's emails an order confirmation that doubles as the receipt, and your dominos.com account keeps every order under Order History.`,
    quirk: `Domino's order history includes the full itemized breakdown years back — one of the few fast-food chains where that's true.`,
  },
  "pizza-hut": {
    lookup: `Pizza Hut emails order confirmations and keeps orders in your Hut Rewards account history.`,
    quirk: `Hut Rewards points post per order, so your points history doubles as a purchase log when an email receipt goes missing.`,
  },
  "panda-express": {
    lookup: `Online and app orders are emailed with full receipts; in-store purchases are paper-only plus your card statement.`,
    quirk: `Panda's guest survey on the receipt rewards a free item — the code expires quickly, so the receipt has short-term value beyond records.`,
  },
  "panera-bread": {
    lookup: `MyPanera tracks every purchase when you give your number at the register — history is visible in the app, including in-café purchases.`,
    quirk: `Because MyPanera logs in-café purchases by phone number, Panera is one of the easiest chains to reconstruct expenses from, even cash ones.`,
  },
  "tim-hortons": {
    lookup: `Tims Rewards app orders keep digital receipts; scanning your card at the register logs in-store purchases to your account.`,
    quirk: `Tims Rewards works on cash purchases too when scanned — the account history becomes a full purchase log.`,
  },
  "peet-s-coffee": {
    lookup: `Peetnik Rewards app orders are stored with receipts; in-store purchases log to your account when you scan.`,
    quirk: `Peet's app stores order-level detail (drink customizations included) — handy when itemized proof is needed.`,
  },
  petco: {
    lookup: `Petco's Vital Care / Pals Rewards account records purchases — stores can look up transactions by your phone number.`,
    quirk: `Petco's phone-number lookup at the register substitutes for receipts on most returns.`,
  },
  autozone: {
    lookup: `AutoZone Rewards ties purchases to your phone number — any store can pull up your purchase history at the counter.`,
    quirk: `AutoZone is known for looking up old purchases by phone number for warranty claims — often years later, no receipt needed.`,
  },
  "barnes-noble": {
    lookup: `B&N Membership and online orders keep receipts in your account; in-store non-member purchases live on paper and your card statement.`,
    quirk: `Members' in-store purchases are tied to the membership card, which the register can look up for returns.`,
  },
  zara: {
    lookup: `Zara's app stores purchases made with a scanned QR ticket, and online orders keep invoices in your account.`,
    quirk: `Zara has largely replaced paper with QR-code receipts in-store — the code in your app is the receipt.`,
  },
  "h-m": {
    lookup: `H&M Member purchases (scanned at checkout) appear in the app's purchase history; online orders keep e-receipts in your account.`,
    quirk: `H&M membership converts every scanned in-store purchase into a digital receipt automatically — and they accept in-app receipts for returns.`,
  },
  gucci: {
    lookup: `Gucci boutiques can reissue receipts for registered clients, and online orders keep invoices in your Gucci account.`,
    quirk: `Luxury houses like Gucci keep client purchase records long-term — a boutique can usually verify authenticity and purchase history from your client profile.`,
  },
  ebay: {
    lookup: `Every eBay order keeps its full record under Purchase History, with printable order details that work as receipts indefinitely.`,
    quirk: `On eBay the order detail page is the receipt — sellers don't issue separate ones, and PayPal/card records supplement it.`,
  },
  exxon: {
    lookup: `Exxon Mobil Rewards+ app purchases are stored in the app's history; pump receipts otherwise exist only on paper and your statement.`,
    quirk: `Paying via the Exxon app skips the pump printer entirely — the receipt lands in the app and your email.`,
  },
  bp: {
    lookup: `BPme app fuel purchases keep receipts in the app automatically; pay-at-pump card purchases live on paper and your statement.`,
    quirk: `BPme receipts include the fuel grade and gallons — the details expense systems ask for that card statements lack.`,
  },
  wawa: {
    lookup: `Wawa Rewards app purchases are logged to your account; register purchases exist on paper and your card statement.`,
    quirk: `Wawa's app ties fuel and food purchases to one account — a single history covers both receipt types.`,
  },
  "united-airlines": {
    lookup: `United's receipts page on united.com retrieves ticket receipts by confirmation number, ticket number or MileagePlus account.`,
    quirk: `United keeps ticket receipts retrievable for about 18 months — including seat and bag fee receipts, which are separate documents.`,
  },
  "american-airlines": {
    lookup: `AA.com's receipts and refunds page looks up ticket receipts by ticket number or card; AAdvantage accounts keep trip history.`,
    quirk: `American issues separate receipts for tickets vs. ancillary fees (bags, seats) — expense reports usually need both lookups.`,
  },
  hyatt: {
    lookup: `World of Hyatt stores past stays in your account, and folio copies can be requested from the hotel or via Hyatt's website.`,
    quirk: `Hyatt folios can be re-sent by the property months after checkout — the front desk email is faster than central support.`,
  },
  hertz: {
    lookup: `Hertz's online receipt lookup retrieves rental receipts by confirmation or rental record number plus your name — no account needed.`,
    quirk: `Rental car receipts finalize after the car is checked in, not at booking — the post-return email is the real receipt with fuel and fees.`,
  },
  expedia: {
    lookup: `Your Expedia account keeps every booking under Trips, with itineraries and payment receipts downloadable per trip.`,
    quirk: `For hotels booked on Expedia, the hotel's own folio may show $0 — the actual payment receipt comes from Expedia, which trips up expense reports.`,
  },
  grubhub: {
    lookup: `Grubhub emails order receipts and stores them under Orders in your account, itemized with fees and tip.`,
    quirk: `Grubhub's corporate accounts auto-forward receipts to work email — and the itemized receipt separates food from fees for expensing.`,
  },
  netflix: {
    lookup: `Sign in → Account → Billing details — Netflix keeps a printable invoice for every charge, going back to the start of your subscription.`,
    quirk: `Netflix billing history is self-serve and complete — no support contact needed, which makes missing-receipt situations rare.`,
  },
  spotify: {
    lookup: `Go to spotify.com → Account → Order history for receipts covering every subscription charge.`,
    quirk: `Spotify's receipts live only on the website (not in the app) — the most common reason people think they can't find them.`,
  },
};

/**
 * Official brand pages cited on these guides.
 *
 * These pages answer "how do I get a copy of my X receipt" and "can I return
 * without a receipt", so the brand's own help page is the primary source — and
 * until now not one of these 237 pages linked out to it. Each entry carries the
 * specific thing that page says, so the citation adds information rather than
 * decorating the copy with a link.
 *
 * `via` records how the URL was confirmed: "fetch" means we retrieved it,
 * "search" means the host rejects automated requests and it was confirmed
 * through the US search index instead. Re-check with the top-of-file cadence;
 * brand help centres move often.
 */
interface BrandOfficial {
  /** Returns, refunds or general customer-support policy. */
  policyUrl: string;
  /** Where the brand explains getting a receipt copy or order history. */
  receiptUrl?: string;
  /** What that page actually says — one sentence, brand-specific. */
  fact?: string;
  verifiedAt: string;
  via: "fetch" | "search";
}

const BRAND_OFFICIAL: Record<string, BrandOfficial> = {
  zara: {
    policyUrl: "https://www.zara.com/us/en/help-center/HowToReturn",
    receiptUrl: "https://www.zara.com/us/en/help-center/RefundWithGiftReceipt",
    fact: "Zara returns are free in any of its stores, and guest purchases are managed through the \u201cManage Your Order\u201d link in the order confirmation email rather than an account.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  chipotle: {
    policyUrl: "https://www.chipotle.com/contact-us",
    fact: "Chipotle handles refunds for app and website orders through its own customer service, but sends you to the delivery partner for anything ordered through a third party.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  sephora: {
    policyUrl: "https://www.sephora.com/beauty/returns-exchanges",
    receiptUrl: "https://www.sephora.com/beauty/orders-returns",
    fact: "Sephora refunds to the original payment method within 30 days with proof of purchase; between 31 and 60 days it becomes an exchange or store credit.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  autozone: {
    policyUrl: "https://www.autozone.com/lp/faqs",
    receiptUrl: "https://www.autozone.com/contactus",
    fact: "AutoZone says that if the receipt is gone, its customer support line (1-800-288-6966) can find the transaction and complete the return.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "chick-fil-a": {
    policyUrl: "https://www.chick-fil-a.com/customer-support",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  kroger: {
    policyUrl: "https://www.kroger.com/i/terms/return-policy",
    receiptUrl: "https://www.kroger.com/hc/help/returns",
    fact: "Kroger publishes its in-store return policy and its online refund policy separately, so which one applies depends on how the order was placed.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "barnes-noble": {
    policyUrl: "https://help.barnesandnoble.com/hc/en-us/articles/5324602017691-Refund-and-Return-Policies",
    fact: "Barnes & Noble gives a full refund on unread merchandise within 30 days with the store sales receipt; with a gift receipt it becomes store credit, within 60 days.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  dunkin: {
    policyUrl: "https://www.dunkindonuts.com/en/about/contact-us",
    fact: "Dunkin' points unsatisfactory items back to the store for a refund, and mobile-order substitutions or refunds are settled by the individual franchisee.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "ulta-beauty": {
    policyUrl: "https://www.ulta.com/guestservices/returns",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  walgreens: {
    policyUrl: "https://www.walgreens.com/topic/help/generalhelp/returnpolicy.jsp",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  "panda-express": {
    policyUrl: "https://www.pandaexpress.com/order/faqs",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  mcdonalds: {
    policyUrl: "https://www.mcdonalds.com/us/en-us/faq/what-if-i-have-an-issue-with-mobile-order-pay-or-want-a-refund.html",
    receiptUrl: "https://www.mcdonalds.com/us/en-us/contact-us.html",
    fact: "McDonald's sends Mobile Order & Pay refunds back to the restaurant that made the order, and routes delivery orders to Uber Eats or DoorDash depending on which one carried it.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  publix: {
    policyUrl: "https://www.publix.com/pages/policies/refund-policy",
    receiptUrl: "https://www.publix.com/faq/e-receipts",
    fact: "Publix can look the receipt up for you if you paid by card or entered your phone number at checkout; without it the refund comes back as a gift card.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  gamestop: {
    policyUrl: "https://www.gamestop.com/fullreturnpolicy/",
    fact: "GameStop requires proof of purchase or a GameStop.com order number on every return, and runs a 15-day window on new items that drops to 7 for special editions, PCs and TVs.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "macy-s": {
    policyUrl: "https://www.macys.com/customer-service/articles/what-is-macys-return-policy/",
    receiptUrl: "https://www.macys.com/customer-service/articles/does-macys-have-ereceipts",
    fact: "Macy's says it can retrieve receipt information for up to two years after the purchase, which is far longer than most stores keep a lookup window open.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "cvs-pharmacy": {
    policyUrl: "https://www.cvs.com/retail/help/return_policy",
    receiptUrl: "https://www.cvs.com/content/digital-receipt",
    fact: "CVS allows 60 days for most unopened items, and caps a no-receipt refund at the lowest advertised price from the 60 days before the return.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "tim-hortons": {
    policyUrl: "https://www.timhortons.com/support",
    fact: "Tim Hortons asks you to raise the problem with the restaurant's manager first, with Guest Services (1-888-601-1616) as the fallback.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
  "pizza-hut": {
    policyUrl: "https://www.pizzahut.com/contact-us",
    fact: "Pizza Hut routes an order still in progress to the restaurant on your confirmation email, and grants refunds case by case with about four weeks to process.",
    verifiedAt: "2026-08-20",
    via: "search",
  },
  "apple-store": {
    policyUrl: "https://www.apple.com/shop/help/returns_refund",
    receiptUrl: "https://www.apple.com/shop/help/viewing_changing_orders",
    fact: "Apple gives 14 days to return with a receipt, and suggests searching your email for \u201creceipt from Apple\u201d or \u201cinvoice from Apple\u201d when the paper copy is gone.",
    verifiedAt: "2026-08-20",
    via: "fetch",
  },
};

/** Whether this brand's guides cite its official help pages. Used by the
 *  sitemap to date only the pages that actually changed — restamping the rest
 *  would put false dates in <lastmod>, which IndexNow treats as spam. */
export function hasOfficialSource(brandSlug: string): boolean {
  return brandSlug in BRAND_OFFICIAL;
}

/** Where this brand's receipts usually live, phrased for the steps. */
function lookupStep(slug: string, name: string, category: BrandCategory): string {
  const fact = BRAND_FACTS[slug];
  if (fact) return fact.lookup;
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

/** Brand-specific "Good to know" section, when we have a real fact to share. */
function quirkSection(slug: string, name: string): IntentSection[] {
  const fact = BRAND_FACTS[slug];
  return fact ? [{ heading: `Good to know about ${name} receipts`, body: fact.quirk }] : [];
}

/** A citation of the brand's own help page, attached to the section where it
 *  answers the question the page is about. */
export interface IntentCite {
  url: string;
  /** What that page says — specific to the brand, so no two pages carry the
   *  same sentence. Absent when we only have a verified link. */
  fact?: string;
  /** Anchor text. Varies by intent so the same phrase is not repeated across
   *  every guide on the site. */
  label: string;
  verifiedAt: string;
}

export interface IntentSection {
  heading: string;
  body?: string;
  steps?: string[];
  cite?: IntentCite;
}

/** Possessive form of a brand name. A naive template of name + apostrophe-s
 *  produces "Macy's's", "Dunkin''s" and "Starbucks's" — 17 of the brands in
 *  this file end in an s or an apostrophe. */
function poss(name: string): string {
  if (name.endsWith("'s")) return name;        // Macy's, McDonald's
  if (name.endsWith("'")) return `${name}s`;   // Dunkin' -> Dunkin's
  if (name.endsWith("s")) return `${name}'`;   // Starbucks -> Starbucks'
  return `${name}'s`;
}

/** Cite the brand's own page for this intent, when we have a verified URL.
 *  Receipt-focused intents get the receipt/order-history page where one
 *  exists; returns and refunds get the policy. */
function officialCite(slug: string, name: string, kind: IntentKind): IntentCite | undefined {
  const o = BRAND_OFFICIAL[slug];
  if (!o) return undefined;

  const wantsReceiptPage = kind === "lost-receipt" || kind === "receipt-copy";
  const url = (wantsReceiptPage && o.receiptUrl) || o.policyUrl;

  const label =
    kind === "lost-receipt"
      ? `${poss(name)} own help pages`
      : kind === "receipt-copy"
        ? `${poss(name)} receipt and order help`
        : kind === "return-policy"
          ? `the official ${name} return policy`
          : `${poss(name)} refund and support policy`;

  return { url, fact: o.fact, label, verifiedAt: o.verifiedAt };
}

export interface IntentContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: IntentSection[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  /** One line under the lead pointing at a sibling guide that answers the
   *  other angle (lost vs. copy), for brands whose two guides split a query. */
  seeAlso?: { text: string; slug: string; anchor: string };
}

/**
 * Where a brand's guides hand the visitor on to a sell page.
 *
 * These guides answer retrieval queries ("zara recover my receipt"), which the
 * searcher cannot satisfy here. Since 2026-11-16 the owner's rule is that every
 * retrieval page grown for its own queries must also hand its visitors to the
 * matching sell page — above the fold and again at the end — instead of to
 * /create, which canonicalises to a page that needs no more links.
 *
 * Keyed by brand, not by guide: all of a brand's guides get the hand-off, so
 * content-dates can date them per brand without restamping untouched siblings.
 * `href` defaults to /brands/{slug}; `anchor` to "{Brand} receipt template".
 */
export interface IntentHandoff {
  href: string;
  anchor: string;
}

const HANDOFF: Record<string, Partial<IntentHandoff>> = {
  zara: {},
  mcdonalds: { anchor: "McDonald's receipt generator" },
  lyft: {},
  bp: {},
  marriott: {},
  expedia: {},
  "best-buy": {},
  sephora: {},
  subway: {},
  gucci: {},
  doordash: {},
  "taco-bell": {},
  kfc: { anchor: "KFC receipt generator" },
  "dollar-tree": { anchor: "Dollar Tree receipt generator" },
  nike: { anchor: "Nike receipt template" },
  shell: { anchor: "Shell receipt generator" },
  target: { anchor: "Target receipt generator" },
  chipotle: { anchor: "Chipotle receipt generator" },
  // "kroger receipt template" is split between this brand's copy guide and the
  // weekly-groceries example, which is the page meant to own it.
  kroger: { href: "/examples/kroger-receipt-weekly-groceries", anchor: "Kroger receipt template" },
};

/** Whether this brand's guides carry the sell-page hand-off (for dating). */
export function hasHandoff(brandSlug: string): boolean {
  return Object.prototype.hasOwnProperty.call(HANDOFF, brandSlug);
}

export function intentHandoff(p: IntentPage): IntentHandoff | undefined {
  if (!hasHandoff(p.brandSlug)) return undefined;
  const h = HANDOFF[p.brandSlug];
  return {
    href: h.href ?? `/brands/${p.brandSlug}`,
    anchor: h.anchor ?? `${p.brandName} receipt template`,
  };
}

/**
 * Build a meta description that lands inside the 150–160 window on its own.
 *
 * The previous one-size templates only fitted for mid-length brand names:
 * measured across all 73 brands × 4 kinds, 41% overflowed and were cut
 * mid-clause with an ellipsis ("…make a new Zara receipt for your…") and 23%
 * fell short and had generic filler appended ("Editable.", "Read on."). Only
 * 36% came out clean.
 *
 * So instead of one fixed sentence, `lead` confirms relevance immediately — the
 * brand and the task inside the first few words, where a searcher scanning the
 * SERP decides — and the longest `tail` that still fits is appended. Every tail
 * says something real and leaves a reason to click, rather than padding to a
 * character count.
 */
// Only an upper bound is enforced. Overflow is the damaging failure — it cuts a
// sentence mid-clause in the SERP — while a short description that reads cleanly
// costs nothing. Measured output lands 139–160, averaging 151.
const DESC_HI = 160;

function composeDescription(lead: string, tails: readonly string[]): string {
  let best = lead;
  for (const tail of tails) {
    const candidate = `${lead} ${tail}`;
    if (candidate.length > DESC_HI) continue;
    if (candidate.length > best.length) best = candidate;
  }
  return best;
}

/**
 * Every guide also answers the creation question, in the FAQ that AI Overviews
 * quote from. These pages hold most of the site's AI citations (42 of 72 in
 * the Oct 4 2026 sample), but every FAQ answered a return or lookup question,
 * so the passages engines lifted never named the product. Added last so the
 * guide still answers what the searcher asked first.
 */
export function intentContent(p: IntentPage): IntentContent {
  const base = baseIntentContent(p);
  const override = CONTENT_OVERRIDES[p.slug];
  const c = override ? override(base, p) : base;
  const n = p.brandName;
  return {
    ...c,
    faqs: [
      ...c.faqs,
      {
        question: `Can I make a ${n} receipt for my records?`,
        answer: `For your own records, yes. ${SITE.name}'s ${n} receipt generator lays out a ${n}-style receipt that you fill in with the items, prices, date and store details of your real purchase, then download as a PDF or PNG. It is not an official ${n} document, so use it only for a purchase that actually happened — never to return goods.`,
      },
    ],
  };
}

function baseIntentContent(p: IntentPage): IntentContent {
  const n = p.brandName;
  const fact = BRAND_FACTS[p.brandSlug];
  const cite = officialCite(p.brandSlug, n, p.kind);
  if (p.kind === "lost-receipt") {
    return {
      // No year in the title: it was a hardcoded "(2026 Guide)", which costs 13
      // characters, pushed the longest brands past the SERP truncation point,
      // and turns into a staleness signal the moment the year turns.
      title: `How to Find a Lost ${n} Receipt`,
      description: composeDescription(
        `Lost your ${n} receipt? Check your email, the ${n} app and your card statement first.`,
        [
          `Here's every place a copy usually hides, what to ask ${n} for, and what to do if none of them turns one up.`,
          `Here's every place a copy hides, and what to do when none of them has it.`,
          `Here's where copies hide and what to do if none of them has it.`,
          `Here's where to look, and what to do if none of them has it.`,
          `Here's where copies hide when none of those has it.`,
          // Shortest rung: long brand names ("American Airlines") appear twice
          // in the lead and eat the budget, and a lead with no loop is a dead
          // snippet.
          `Plus what to do if none of them has it.`,
        ]
      ),
      h1: `How to Find a Lost ${n} Receipt`,
      lead: `Misplaced your ${n} receipt? Before you give up, there are a few quick places to look — and if the original is gone for good, you can still make a ${n} receipt for your own records.`,
      sections: [
        {
          heading: `Where to look first`,
          cite,
          steps: [
            `Check your email — ${n} and many retailers send a digital receipt or order confirmation at checkout.`,
            lookupStep(p.brandSlug, n, p.category),
            `Review your bank or credit-card statement to confirm the date, location and exact amount of the purchase.`,
            `Contact ${n} customer service with your payment card, the store or location, and the approximate date — they can sometimes look up or reprint a receipt.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
        {
          heading: `Make a ${n} receipt for your records`,
          body: `If the original is unrecoverable, you can fill in a ${n}-style receipt with the items, prices, date and store details of your real purchase for your own bookkeeping, then download it as a PDF or PNG. It is your own record, not a copy issued by ${n}, so it won't work as proof of purchase for a return, a refund or an expense claim.`,
        },
        {
          heading: `Use it responsibly`,
          body: `Only make a receipt for a purchase that actually happened, and keep it as your own record. Using a made receipt to get a refund, claim an expense or mislead a person, employer, retailer or tax authority is fraud.`,
        },
      ],
      faqs: [
        {
          question: `Can I get a copy of an old ${n} receipt?`,
          answer: `Often yes. ${fact ? `${fact.lookup} ` : `Check your email, your ${n} app or online account, and your card statement. `}For older purchases, ${n} customer service may be able to look up the transaction with the card you paid with and the approximate date — the more precisely you can pin down the store, day and amount, the better the odds of a successful lookup.`,
        },
        {
          question: `Does ${n} keep receipts on file?`,
          answer: `It varies. Purchases made through a ${n} app, loyalty program or online account are usually stored in your order history.${fact ? ` ${fact.quirk}` : ""} In-store cash purchases with no loyalty scan are the hardest to retrieve, which is when your card statement becomes the main record of the purchase.`,
        },
      ],
      ctaHeading: `Make a ${n} receipt for your records`,
    };
  }
  if (p.kind === "receipt-copy") {
    return {
      title: `How to Get a Copy of Your ${n} Receipt`,
      description: composeDescription(
        `Need a duplicate ${n} receipt? Here's how to reprint or download one.`,
        [
          `Covers the ${n} app, your online account and asking in store — plus what to do when the purchase was made as a guest.`,
          `Covers the ${n} app, your account and asking in store — and what to do if you checked out as a guest.`,
          `Covers the ${n} app, your account and in store — plus the guest-checkout case.`,
          `Covers the app, your account and in store, plus guest checkouts.`,
          `Covers the app, your account and asking in store.`,
        ]
      ),
      h1: `How to Get a Copy of Your ${n} Receipt`,
      lead: `Need another copy of a ${n} receipt? Here are the fastest ways to get one from ${n}.`,
      sections: [
        {
          heading: `Ways to get a duplicate ${n} receipt`,
          cite,
          steps: [
            `In store: take your payment card and the approximate date to the ${n} customer-service desk and ask for a receipt reprint.`,
            lookupStep(p.brandSlug, n, p.category),
            `Resend the email receipt: if you provided an email at checkout, search your inbox for the ${n} order confirmation and re-download it.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
        {
          heading: `Or make a ${n} receipt for your records`,
          body: `If a reprint isn't available, you can fill in a ${n}-style receipt with the items, prices, date and store details for your own records, then download it as a PDF or PNG with no account. It is your own record, not a copy issued by ${n}, so it won't work as proof of purchase for a return, a refund or an expense claim.`,
        },
      ],
      faqs: [
        {
          question: `Can ${n} reprint a receipt?`,
          answer: `In many cases yes — bring the card you paid with and the approximate date to the customer-service desk, and staff can often locate the transaction in the register system. ${fact ? `${fact.lookup} ` : ""}Reprint availability and time limits depend on the store's point-of-sale system, so the sooner you ask after the purchase, the better.`,
        },
        { question: `Is it legal to make a ${n} receipt?`, answer: `Making a receipt of a real purchase to keep for your own records is fine. Using a made receipt as proof of purchase — for a return, a refund or an expense claim — or to deceive anyone is fraud.` },
      ],
      ctaHeading: `Make a copy of your ${n} receipt`,
    };
  }
  if (p.kind === "refund-policy") {
    return {
      title: `${n} Refunds & Lost Receipts: What to Do`,
      description: composeDescription(
        `Getting a refund from ${n} without the receipt? Here's where you stand.`,
        [
          `What ${n} accepts as proof of purchase, where to find your order confirmation, and how refunds work without one.`,
          `What counts as proof of purchase, where to find your order confirmation, and how refunds work without one.`,
          `What counts as proof of purchase, and how refunds work without one.`,
          `What counts as proof of purchase when you no longer have it.`,
          `What counts as proof of purchase without one.`,
        ]
      ),
      h1: `${n} Refunds & Lost Receipts`,
      lead: `Requesting a refund or cancellation from ${n}? Here's how your receipt or order confirmation fits in — and what to do if you can't find it.`,
      sections: [
        {
          heading: `Do you need a receipt for a ${n} refund?`,
          cite,
          body: `For most refunds and cancellations, ${n} ties the request to your order — so a receipt, order confirmation or account record makes it much faster. Refund eligibility and timeframes vary and change over time${cite ? "." : `, so check ${poss(n)} current refund or cancellation policy before requesting one.`}`,
        },
        {
          heading: `Where to find your ${n} order details`,
          steps: [
            lookupStep(p.brandSlug, n, p.category),
            `Search your email for the ${n} order or booking confirmation.`,
            `Check your bank or card statement to confirm the date and amount of the charge.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
        {
          heading: `Lost the ${n} receipt for your records?`,
          body: `If your refund is processed but you no longer have the original receipt, you can make a ${n}-style receipt of the real transaction to keep in your own records. It is your own record, not a copy issued by ${n}, so it won't work as proof of purchase for a return, a refund or an expense claim.`,
        },
      ],
      faqs: [
        {
          question: `How do I get a refund from ${n}?`,
          answer: `Start from your ${n} order or account, find the transaction, and follow the refund or cancellation steps. ${fact ? `${fact.lookup} ` : ""}Having the receipt or confirmation handy speeds the process up considerably. Exact steps and eligibility depend on ${poss(n)} current policy, so check it before submitting the request.`,
        },
        { question: `Can I get a receipt for a ${n} refund?`, answer: `Yes — ${n} typically issues a refund confirmation by email or in your account. Keep it with the original receipt for your records.` },
      ],
      ctaHeading: `Make a ${n} receipt for your records`,
    };
  }

  // return-policy
  //
  // Titled for the query it actually ranks for, not the one it was written for.
  // The 2026-09-01 note above assumed these pages hold their positions on
  // "<brand> return policy"; GSC query data says otherwise —
  // /receipt-help/zara-return-policy took 1,155 impressions in Aug 2026 and its
  // top queries were "zara receipt", "zara recover my receipt" and "zara receipt
  // finder", every one of them receipt retrieval. It ranked page 1 on all of
  // them and earned zero clicks, because the title answered a different
  // question. Naming both jobs is accurate — the page does cover the return
  // window *and* what to do when the receipt is gone.
  return {
    title: `${n} Returns & Lost Receipts: What to Do`,
    description: composeDescription(
      `Returning something to ${n} without the receipt? Here's where you stand.`,
      [
        `What ${n} accepts as proof of purchase, the return window to watch, and your options when the receipt is gone.`,
        `What counts as proof of purchase, the return window to watch, and your options when the receipt is gone.`,
        `What counts as proof of purchase, and your options when the receipt is gone.`,
        `What counts as proof of purchase when the receipt is gone.`,
        `What to bring when the receipt is gone.`,
      ]
    ),
    h1: `${n} Returns & Lost Receipts: What to Do`,
    lead: `Planning a return at ${n}? Here's how receipts and proof of purchase typically factor into returns — and what to do if you've lost yours.`,
    sections: [
      {
        heading: `Do you need a receipt to return to ${n}?`,
        cite,
        body: `Most retailers, including ${n}, ask for a receipt or other proof of purchase to process a return or refund. A receipt confirms what you bought, when, where and for how much. Return windows and conditions vary by item and change over time${cite ? "." : `, so always check the official ${n} return policy for the current rules before heading to the store.`}`,
      },
      {
        heading: `What counts as proof of purchase`,
        steps: [
          `The original printed or emailed ${n} receipt.`,
          `Your ${n} app, account or loyalty purchase history.`,
          `A bank or credit-card statement showing the ${n} transaction (sometimes accepted alongside ID).`,
        ],
      },
      ...quirkSection(p.brandSlug, n),
      {
        heading: `Lost your ${n} receipt before a return?`,
        body: `If you've misplaced the receipt for a genuine purchase, first try your email and ${n} account. If you can't recover it, you can make a ${n}-style receipt of your real purchase to keep in your own records — but not for the return itself: a receipt you made is not a copy issued by ${n} and won't work as proof of purchase for a return, a refund or an expense claim.`,
      },
    ],
    faqs: [
      {
        question: `Can I return to ${n} without a receipt?`,
        answer: `Sometimes — some stores offer store credit or accept alternate proof such as your account history or the original payment card, often with ID and limits. ${fact ? `${fact.quirk} ` : ""}Policies vary by item and change over time, so check ${poss(n)} official return policy before heading to the store.`,
      },
      { question: `How long do I have to return to ${n}?`, answer: `Return windows depend on the item and current policy, so confirm the timeframe on ${poss(n)} official return-policy page or your receipt before returning.` },
    ],
    ctaHeading: `Make a ${n} receipt for your records`,
  };
}

/**
 * Per-guide rewrites, 2026-11-16.
 *
 * The generated copy aims every guide of a kind at the same generic query
 * ("How to Get a Copy of Your X Receipt"), but Search Console shows several
 * guides ranking page 1 for different wording — "zara receipt finder",
 * "bp receipt lookup", "marriott folio request", "how to download lyft receipt
 * as pdf" — under titles that never use it. These overrides retitle those
 * guides around the queries they already hold (GSC, 28 days to 2026-11-14) and
 * answer them in the lead. Some also fix steps the template gets wrong for the
 * brand: there is no "customer-service desk" at Lyft or Expedia.
 *
 * Facts come only from BRAND_FACTS / BRAND_OFFICIAL above; where an app menu
 * name could not be verified the copy says so instead of inventing one. Each
 * override receives the generated content so untouched sections stay in step
 * with the template.
 */
type ContentOverride = (base: IntentContent, p: IntentPage) => IntentContent;

/** The generated section whose heading starts with `prefix`, if any. */
function pick(c: IntentContent, prefix: string): IntentSection[] {
  const s = c.sections.find((x) => x.heading.startsWith(prefix));
  return s ? [s] : [];
}

const CONTENT_OVERRIDES: Record<string, ContentOverride> = {
  // 192 impressions at pos 6.8, 0 clicks (28 days to 2026-11-18): 175 of them
  // are the exact question "do nike members need a receipt to make a return?",
  // plus "nike receipt(s)". The generic return-policy title never asked it.
  "nike-return-policy": (c) => ({
    ...c,
    title: `Do Nike Members Need a Receipt to Make a Return?`,
    description: `Usually not: Nike Member purchases are saved under Orders in the Nike app or on nike.com. Where to find your Nike receipt, and what to bring as a guest.`,
    h1: `Do Nike Members Need a Receipt to Make a Return?`,
    lead: `Usually not. When you shop online or scan your member pass in a Nike store, the purchase is saved to your Nike Member account, and that record is your proof of purchase at a Nike store. Guest checkouts and in-store purchases made without scanning the pass are the exception: for those, bring the receipt or the card you paid with, and check Nike's current return policy before you go.`,
    sections: [
      {
        heading: `Where to find your Nike receipt in the app or on nike.com`,
        steps: [
          `Open the Nike app, or sign in on nike.com, with the member account you shopped with.`,
          `Go to Orders. Online orders and in-store purchases made with your member pass are both listed there.`,
          `Open the purchase to see its details, and save or screenshot them if you need a copy for a return.`,
        ],
      },
      {
        heading: `What if you checked out as a guest or didn't scan your pass?`,
        body: `Then the purchase is not in your member account. A guest online order can be found from its order confirmation email; an in-store purchase without a scan exists only on the paper receipt and your card statement, so bring the card you paid with if the receipt is gone.`,
      },
      ...pick(c, `What counts as proof`),
      ...pick(c, `Good to know`),
      ...pick(c, `Lost your`),
    ],
    faqs: [
      {
        question: `Do Nike members need a receipt to make a return?`,
        answer: `Usually not. Purchases made online or with your member pass scanned in store are saved to your Nike Member account, which serves as proof of purchase. Check Nike's current return policy for the time limit and conditions.`,
      },
      {
        question: `Where do I find my Nike receipts?`,
        answer: `Under Orders in the Nike app or on nike.com, for purchases made with your member account. Guest orders are in the order confirmation email.`,
      },
      ...c.faqs,
    ],
  }),

  // 303 impressions at pos 5.9 for "kfc receipt" and its variants ("kfc e
  // receipt", "kfc order receipt", "kfc app receipt", "kfc receipt download",
  // "how to get kfc bill online") but no AI answer cites it. Headings become
  // the questions those queries ask, each answered in its first sentence.
  "kfc-receipt-copy": (c) => ({
    ...c,
    lead: `To get a copy of a KFC receipt, check your email and the order history in your KFC account first: app and web orders are emailed and saved there. A counter purchase exists only on the paper receipt and your card statement, so for those ask the restaurant, with your card and the date, as soon as you can.`,
    sections: [
      {
        heading: `How do I get a copy of my KFC receipt?`,
        body: `It depends on how you ordered. App and web orders are in your email and your account's order history; counter orders need the restaurant.`,
        cite: c.sections[0]?.cite,
        steps: c.sections[0]?.steps,
      },
      {
        heading: `Can I download a KFC receipt or invoice online?`,
        body: `Yes, for orders placed in the KFC app or on the KFC website: the e-receipt is emailed at checkout and stays in your account's order history, where you can open and save it. Orders placed through a delivery app such as DoorDash or Uber Eats have their receipt in that app instead. Counter and drive-thru purchases are not stored anywhere you can download them.`,
      },
      {
        heading: `What is printed on a KFC receipt?`,
        body: `The items, prices, tax, total, payment method, and the store and visit time. KFC receipts also carry a guest-survey invitation tied to that specific store and visit.`,
      },
      ...pick(c, `Or make a`),
    ],
    faqs: [
      {
        question: `How do I get a KFC e-receipt?`,
        answer: `Order in the KFC app or on the KFC website: the receipt is emailed to you and saved in your account's order history.`,
      },
      ...c.faqs,
    ],
  }),

  // 4,829 impressions, 6 clicks: "zara receipt finder" (696, pos 7.2), "zara
  // recover my receipt" (660, pos 5.4), "zara find my receipt", "zara retrieve
  // my receipt". The page answered "zara return policy" instead.
  "zara-return-policy": (c) => ({
    ...c,
    title: `Zara Receipt Finder: Recover Your Zara Receipt`,
    description: `Lost a Zara receipt? Recover it from your Zara app or account, your order email or your card statement, plus what Zara accepts for a return without one.`,
    h1: `Zara Receipt Finder: How to Recover Your Zara Receipt`,
    lead: `To recover a Zara receipt, look in your Zara app or account first: Zara has largely replaced paper with QR-code receipts in store, and online orders keep their invoices in your account. If you ordered as a guest, use the “Manage Your Order” link in your order confirmation email; if neither has it, your card statement still shows the Zara transaction.`,
    sections: [
      {
        heading: `How to recover your Zara receipt in the app or account`,
        steps: [
          `Open the Zara app, or sign in on zara.com, with the account you shopped with.`,
          `Go to your purchases or orders. In-store purchases made with a scanned QR ticket and online orders are both kept there — the exact menu name can differ by country and app version.`,
          `Open the purchase to see the receipt (in store) or the invoice (online), and save or screenshot it.`,
        ],
      },
      {
        heading: `Recover a Zara receipt after a guest or online order`,
        body: `Guest orders are not attached to an account, so the route back to the receipt is the order confirmation email: search your inbox for the Zara order email and open its “Manage Your Order” link. Check spam and promotions folders too, and search for the order number if you have it.`,
      },
      {
        heading: `Zara store receipt: if you paid in store and have no app`,
        body: `A paper store receipt that is gone cannot be looked up online. Your bank or card statement still shows the date, store and amount, which is useful proof on its own, and the store where you paid may be able to help if you bring the card you used. What a store can do varies, so check Zara's official help pages before relying on it.`,
      },
      ...c.sections,
    ],
    faqs: [
      {
        question: `How do I recover my Zara receipt?`,
        answer: `Check the purchases or orders section of your Zara app or account, or the “Manage Your Order” link in your confirmation email if you ordered as a guest. If neither has it, your card statement shows the transaction.`,
      },
      {
        question: `Where are Zara in-store receipts kept?`,
        answer: `Zara has largely replaced paper with QR-code receipts in store, so a purchase made with your scanned app code is kept in your app's purchase history.`,
      },
      ...c.faqs,
    ],
  }),

  // 3,418 impressions, 30 clicks: "mcdonalds receipt" (945, pos 6.5) plus ~700
  // impressions of "how to find/get receipt in the mcdonalds app" at pos 8–9.
  // "mcdonalds receipt generator" stays out of the title and H1: /brands/mcdonalds
  // owns it, and the hand-off below links there with that anchor.
  "mcdonalds-receipt-copy": (c, p) => ({
    ...c,
    title: `McDonald's Receipt: Find It in the App or Get a Copy`,
    description: `Find your McDonald's receipt: app orders keep a receipt under Recent Orders, email receipts sit in your inbox, and counter orders need a reprint in store.`,
    h1: `McDonald's Receipt: How to Find or Get a Copy`,
    lead: `Orders placed in the McDonald's app keep a full receipt under Recent Orders, so that is the first place to look. Counter orders exist only on the paper receipt and your card statement, so for those ask the restaurant for a reprint, with your card and the date, as soon as you can.`,
    sections: [
      {
        heading: `How to find your receipt in the McDonald's app`,
        steps: [
          `Open the McDonald's app and sign in with the account you ordered with.`,
          `Go to Recent Orders (if your app version labels it differently, look for your order history).`,
          `Open the order to see its receipt, with the items, prices and restaurant.`,
        ],
      },
      {
        heading: `McDonald's receipt lookup: what you can find online`,
        cite: officialCite(p.brandSlug, p.brandName, p.kind),
        body: `Only orders that went through an app can be looked up later: Mobile Order & Pay orders in the McDonald's app, and delivery orders in Uber Eats or DoorDash, whichever carried it. Counter and drive-thru purchases are not stored anywhere you can search — the paper receipt and your card statement are the only records.`,
      },
      {
        heading: `Get a McDonald's receipt reprint in store`,
        body: `For a counter or drive-thru order, go back to the restaurant counter with the card you paid with and the approximate time. Whether a reprint is possible depends on the restaurant's register system, so ask soon after the purchase.`,
      },
      ...pick(c, `Good to know`),
      ...pick(c, `Or make a`),
    ],
    faqs: [
      {
        question: `How do I find my receipt on the McDonald's app?`,
        answer: `Open the app and go to Recent Orders; app orders are stored there with full receipts.`,
      },
      {
        question: `Can I look up a McDonald's receipt online?`,
        answer: `Only for app or delivery orders. Counter purchases exist only on paper and your card statement.`,
      },
      {
        question: `Can McDonald's reprint a receipt?`,
        answer: `Often, if you bring the card you paid with and the approximate date to the restaurant soon after the purchase. It depends on the restaurant's register system.`,
      },
    ],
  }),

  // 564 impressions, 0 clicks, pos ~12: "how to download lyft receipt as pdf"
  // (69, pos 9.6), "lyft receipt" (67, pos 12.4), "how to get lyft receipt pdf".
  "lyft-receipt-copy": (c) => ({
    ...c,
    title: `Lyft Receipt: How to Get a Copy or Download a PDF`,
    description: `Need a Lyft receipt? Every ride's receipt is in the Lyft app's ride history and can be resent by email. Here's how to get a copy and save it as a PDF.`,
    h1: `Lyft Receipt: How to Get a Copy or Save It as a PDF`,
    lead: `Every Lyft ride has a receipt in the app: open Ride History, select the ride, and the receipt is there to view or resend to your email. To keep it as a PDF, save that emailed receipt as a PDF from your phone or browser.`,
    sections: [
      {
        heading: `How to get a copy of a Lyft receipt`,
        steps: [
          BRAND_FACTS.lyft.lookup,
          `Search your email for the Lyft ride receipt — the ride date and "Lyft" are usually enough to find it.`,
          `Can't find the ride? Check your card statement for the date and amount, then match it in Ride History.`,
        ],
      },
      {
        heading: `How to download a Lyft receipt as a PDF`,
        body: `If you don't see a download option on the ride, resend the receipt to your email and save that email as a PDF: on a computer use Print, then Save as PDF; on a phone use Share or Print and save the preview as a PDF. If you ride for work often, a Lyft business profile forwards ride receipts to your work email, where expense tools can pick them up.`,
      },
      ...pick(c, `Good to know`),
      ...pick(c, `Or make a`),
    ],
    faqs: [
      {
        question: `How do I get a receipt from Lyft?`,
        answer: `Open the Lyft app, go to Ride History and select the ride. The receipt is there and can be resent to your email.`,
      },
      {
        question: `Can I download a Lyft receipt as a PDF?`,
        answer: `Yes — resend the receipt to your email and save it as a PDF with your phone's or browser's print option. A Lyft business profile also forwards ride receipts to your work email.`,
      },
      ...c.faqs.filter((f) => !f.question.startsWith(`Can Lyft reprint`)),
    ],
  }),

  // 546 impressions at pos ~7: "bp receipt lookup" (98, pos 3.3, the clicks),
  // "bp gas station receipt", "bp fuel receipt", "bp gas receipt".
  "bp-lost-receipt": (c) => ({
    ...c,
    title: `BP Receipt Lookup: Find a Lost BP Fuel Receipt`,
    description: `Lost a BP fuel receipt? BPme app purchases keep their receipts in the app; pay-at-pump card purchases need your statement or the station. Here's where to look.`,
    h1: `BP Receipt Lookup: How to Find a Lost BP Gas Station Receipt`,
    lead: `Where you can look up a BP receipt depends on how you paid. Fuel bought through the BPme app keeps its receipt in the app, with the grade and gallons; a card used at the pump leaves the transaction on your statement, and the station may be able to reprint it if you ask soon.`,
  }),

  // 1,384 impressions, 3 clicks: "marriott receipt lookup" (243, pos 9.9),
  // "marriott folio request" (156, pos 10.4); "sheraton receipt lookup" too.
  "marriott-receipt-copy": (c) => ({
    ...c,
    title: `Marriott Receipt Lookup: Request Your Folio Online`,
    description: `Need a Marriott receipt? The hotel bill is called a folio. Get a copy from your checkout email, your Bonvoy account or a folio request on marriott.com.`,
    h1: `Marriott Receipt Lookup: How to Get a Copy of Your Folio`,
    lead: `A Marriott hotel receipt is called a folio: the itemised bill for your stay. To get a copy, find the folio Marriott emailed at checkout, open the stay in your Marriott Bonvoy account, or request a folio copy on marriott.com without calling the hotel.`,
    sections: [
      {
        heading: `How to get a copy of your Marriott folio`,
        steps: [
          `Search your email for the folio sent at checkout — the hotel name and your stay dates usually find it.`,
          `Sign in to your Marriott Bonvoy account and open your past stays to find the one you need.`,
          `Request a folio copy on marriott.com for the stay. Have your confirmation number and stay dates to hand.`,
          `Or email the hotel's front desk with your name, confirmation number and dates and ask them to resend the folio.`,
        ],
      },
      {
        heading: `Requesting a Marriott folio after checkout`,
        body: `${BRAND_FACTS.marriott.quirk} If the folio shows a $0 balance, the stay was probably paid through a travel site, and the payment receipt comes from the site you booked with rather than the hotel.`,
      },
      {
        heading: `Sheraton, Westin and other Marriott hotels`,
        body: `Sheraton, Westin, Courtyard, The Ritz-Carlton and the other Marriott Bonvoy hotels belong to Marriott, so a Sheraton receipt lookup works the same way: the stay appears in your Bonvoy account if you added your member number to the booking, and the folio request on marriott.com should cover it. If the stay is not in your account, ask the hotel directly.`,
      },
      ...pick(c, `Or make a`),
    ],
    faqs: [
      {
        question: `What is a Marriott folio?`,
        answer: `It is the itemised hotel bill for your stay — room, taxes and incidentals — and it is the document most expense reports ask for as the Marriott receipt.`,
      },
      {
        question: `How do I request a Marriott folio after checkout?`,
        answer: `Check the checkout email first, then your Marriott Bonvoy account's past stays, or request a folio copy on marriott.com. The hotel's front desk can also resend it by email.`,
      },
      {
        question: `Can I look up a Sheraton receipt the same way?`,
        answer: `Yes. Sheraton is a Marriott Bonvoy hotel, so its folio is found the same way as any Marriott stay.`,
      },
    ],
  }),

  // 779 impressions, 0 clicks: "expedia receipts" (202), "expedia receipt"
  // (165), "how to get a receipt from expedia" and variants at pos 7–8.
  "expedia-receipt-copy": (c) => ({
    ...c,
    title: `Expedia Receipt: How to Get a Receipt From Expedia`,
    description: `Get your Expedia receipt: sign in, open Trips and choose the booking to view or print its itinerary and payment receipt. Plus why a hotel folio may show $0.`,
    h1: `How to Get a Receipt From Expedia`,
    lead: `To get a receipt from Expedia, sign in to your Expedia account, open Trips and choose the booking — its itinerary and payment receipt are kept there to view, print or download. Your booking confirmation email works as a receipt too.`,
    sections: [
      {
        heading: `How to get a receipt from Expedia`,
        steps: [
          `Sign in to the Expedia account you booked with and open Trips.`,
          `Select the booking. The itinerary and the payment receipt are kept with each trip; the exact button name can differ between the app and the website.`,
          `Print it, or save it as a PDF from your browser's print option.`,
          `Booked without signing in? Search your email for the Expedia confirmation — it carries the itinerary number you need to find the trip.`,
        ],
      },
      ...pick(c, `Good to know`),
      ...pick(c, `Or make a`),
    ],
    faqs: [
      {
        question: `How do I get a receipt from Expedia?`,
        answer: `Sign in, open Trips, select the booking and open its receipt. The booking confirmation email also works as a receipt.`,
      },
      {
        question: `Why does my hotel folio show $0 when I booked on Expedia?`,
        answer: `Because Expedia took the payment, not the hotel. For an expense report, use the payment receipt from your Expedia trip.`,
      },
    ],
  }),

  // 1,134 impressions, 3 clicks: "best buy receipt" (315, pos 7.8), "best buy
  // receipt lookup" (190, pos 8.4), "best buy receipt pdf".
  "best-buy-receipt-copy": (c) => ({
    ...c,
    title: `Best Buy Receipt Lookup: Get a Copy or Invoice`,
    description: `Look up a Best Buy receipt in your My Best Buy purchase history, which covers online and in-store purchases. Plus where to find an invoice and reprints.`,
    h1: `Best Buy Receipt Lookup: How to Get a Copy of Your Receipt`,
    lead: `Best Buy receipt lookup runs through your My Best Buy account: Purchase History covers online orders and in-store purchases made with your member ID, and receipts can be reprinted from there. Best Buy also emails receipts when your account is attached, so search your inbox for the order number too.`,
    sections: [
      {
        heading: `Best Buy receipt lookup and invoices`,
        steps: [
          `Sign in to My Best Buy and open Purchase History.`,
          `Find the order or store purchase and open it to view the receipt, then print it or save it as a PDF.`,
          `Paid in store without your member ID? Take the card you paid with to Customer Service — staff can often find the transaction.`,
          `Need an invoice for an expense report? The receipt from Purchase History usually works as one; for an invoice with company details, ask Best Buy customer service whether one can be issued for that purchase.`,
        ],
      },
      ...c.sections,
    ],
    faqs: [
      {
        question: `How do I look up a Best Buy receipt?`,
        answer: `Sign in to My Best Buy and open Purchase History, which covers online orders and in-store purchases made with your member ID. Receipts can be reprinted from there.`,
      },
      ...c.faqs,
    ],
  }),

  // Sephora: both guides rank for "sephora receipt". Each keeps one angle —
  // this one the lost receipt and returning without it.
  "sephora-lost-receipt": (c) => ({
    ...c,
    lead: `Lost your Sephora receipt? Your Beauty Insider account usually stands in for it: Sephora records purchases made with your account, so a store can look the purchase up and online orders stay in your purchase history. That record is normally what you need for a return without the paper receipt.`,
    sections: [
      ...c.sections.slice(0, 1),
      {
        heading: `Returning to Sephora without a receipt`,
        body: `Ask the store to look the purchase up in your Beauty Insider account, and bring the card you paid with in case it was not linked. How you are refunded depends on how long ago you bought, so check Sephora's return policy before you go.`,
      },
      ...c.sections.slice(1),
    ],
  }),
  "sephora-receipt-copy": (c) => ({
    ...c,
    lead: `To get a copy of a Sephora receipt, look in three places: Purchase History in the Sephora app or your sephora.com account, your Beauty Insider account (which logs store purchases made with it), and the order email for an online order.`,
    seeAlso: {
      text: `Lost the receipt and need to return something?`,
      slug: `sephora-lost-receipt`,
      anchor: `What to do about a lost Sephora receipt`,
    },
  }),

  // Subway: the lost-receipt guide keeps "subway receipt" and "store id on
  // receipt" untouched; this one is about getting a copy from the app, rewards
  // or email.
  "subway-receipt-copy": (c) => ({
    ...c,
    lead: `A copy of a Subway receipt comes from the Subway app or website: online and app orders are emailed and stored in your Subway rewards account history. Counter purchases are recorded there too if you scanned your rewards at the register.`,
    seeAlso: {
      text: `Lost a paper receipt from the counter?`,
      slug: `subway-lost-receipt`,
      anchor: `How to find a lost Subway receipt`,
    },
  }),

  // Gucci: "gucci receipt" is split between the two guides (the copy guide
  // ranks better over 28 days). Each gets its own angle and points to the other.
  "gucci-lost-receipt": (c) => ({
    ...c,
    lead: `Lost a Gucci receipt? For a return, proof of purchase or an authentication question, what matters is a record of the purchase: Gucci boutiques keep client purchase records, and online orders keep invoices in your Gucci account. Check with Gucci before relying on either — its own policies decide what it accepts.`,
    seeAlso: {
      text: `Only need another copy of the receipt?`,
      slug: `gucci-receipt-copy`,
      anchor: `How to get a copy of a Gucci receipt`,
    },
    sections: [
      ...c.sections.slice(0, 1),
      {
        heading: `Proof of purchase without a Gucci receipt`,
        body: `Ask the boutique where you bought the item whether your client profile shows the purchase, and bring the card you paid with and the packaging and paperwork that came with the item. For an online order, the order record in your Gucci account is the proof. Whether that is enough for a return or an authentication request is Gucci's decision, so confirm with the boutique or Gucci's client services first.`,
      },
      ...c.sections.slice(1),
    ],
  }),
  "gucci-receipt-copy": (c) => ({
    ...c,
    lead: `To get a copy of a Gucci receipt, start with your Gucci account for an online order, where the invoice is kept. For a boutique purchase, ask the boutique — it can usually reissue a receipt for a registered client — or contact Gucci's client services.`,
    seeAlso: {
      text: `Lost the receipt and need it for a return or authentication?`,
      slug: `gucci-lost-receipt`,
      anchor: `What to do without a Gucci receipt`,
    },
  }),
};
