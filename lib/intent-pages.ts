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
  const fact = BRAND_FACTS[p.brandSlug];
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
            lookupStep(p.brandSlug, n, p.category),
            `Review your bank or credit-card statement to confirm the date, location and exact amount of the purchase.`,
            `Contact ${n} customer service with your payment card, the store or location, and the approximate date — they can sometimes look up or reprint a receipt.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
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
        {
          question: `Can I get a copy of an old ${n} receipt?`,
          answer: `Often yes. ${fact ? `${fact.lookup} ` : `Check your email, your ${n} app or online account, and your card statement. `}For older purchases, ${n} customer service may be able to look up the transaction with the card you paid with and the approximate date — the more precisely you can pin down the store, day and amount, the better the odds of a successful lookup.`,
        },
        {
          question: `Does ${n} keep receipts on file?`,
          answer: `It varies. Purchases made through a ${n} app, loyalty program or online account are usually stored in your order history.${fact ? ` ${fact.quirk}` : ""} In-store cash purchases with no loyalty scan are the hardest to retrieve, which is when recreating a receipt for your records is most useful.`,
        },
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
            lookupStep(p.brandSlug, n, p.category),
            `Resend the email receipt: if you provided an email at checkout, search your inbox for the ${n} order confirmation and re-download it.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
        {
          heading: `Or recreate a ${n} receipt`,
          body: `If a reprint isn't available, you can rebuild a ${n} receipt with the same items, prices, date and store details, then download it as a PDF or PNG. It takes under a minute and needs no account.`,
        },
      ],
      faqs: [
        {
          question: `Can ${n} reprint a receipt?`,
          answer: `In many cases yes — bring the card you paid with and the approximate date to the customer-service desk, and staff can often locate the transaction in the register system. ${fact ? `${fact.lookup} ` : ""}Reprint availability and time limits depend on the store's point-of-sale system, so the sooner you ask after the purchase, the better.`,
        },
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
            lookupStep(p.brandSlug, n, p.category),
            `Search your email for the ${n} order or booking confirmation.`,
            `Check your bank or card statement to confirm the date and amount of the charge.`,
          ],
        },
        ...quirkSection(p.brandSlug, n),
        {
          heading: `Lost the ${n} receipt for your records?`,
          body: `If your refund is processed but you no longer have the original receipt, you can recreate a ${n} receipt that reflects the real transaction to keep with your expense records. Use a recreated receipt only honestly — never to misrepresent a charge.`,
        },
      ],
      faqs: [
        {
          question: `How do I get a refund from ${n}?`,
          answer: `Start from your ${n} order or account, find the transaction, and follow the refund or cancellation steps. ${fact ? `${fact.lookup} ` : ""}Having the receipt or confirmation handy speeds the process up considerably. Exact steps and eligibility depend on ${n}'s current policy, so check it before submitting the request.`,
        },
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
      ...quirkSection(p.brandSlug, n),
      {
        heading: `Lost your ${n} receipt before a return?`,
        body: `If you've misplaced the receipt for a genuine purchase, first try your email and ${n} account. If you can't recover it, you can recreate a ${n} receipt that reflects your real purchase to keep with your records. Only use a recreated receipt honestly — not to misrepresent a purchase.`,
      },
    ],
    faqs: [
      {
        question: `Can I return to ${n} without a receipt?`,
        answer: `Sometimes — some stores offer store credit or accept alternate proof such as your account history or the original payment card, often with ID and limits. ${fact ? `${fact.quirk} ` : ""}Policies vary by item and change over time, so check ${n}'s official return policy before heading to the store.`,
      },
      { question: `How long do I have to return to ${n}?`, answer: `Return windows depend on the item and current policy, so confirm the timeframe on ${n}'s official return-policy page or your receipt before returning.` },
    ],
    ctaHeading: `Recreate a lost ${n} receipt`,
  };
}
