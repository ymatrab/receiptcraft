/**
 * Cadence — Day 2026-11-04, slot b (14:00Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks.
 *   "cash app receipt"   880/mo
 *   "zelle receipt"      480/mo
 *   "venmo receipt"      390/mo
 *   -> /templates/cash-receipt, /templates/sales-receipt, /blog/proof-of-payment
 *
 * Angle: where each app shows payment details (per its own help centre), and
 * why a seller paid through a P2P app should still issue a proper receipt.
 * The post does NOT call app screens official receipts except where the help
 * centre itself says "receipt" (Cash App and Venmo Tap to Pay seller receipts).
 *
 * Facts checked 2026-10-11:
 *  - Cash App: Activity tab (clock icon), tap a payment for details; web at
 *    cash.app/account; Tap to Pay sellers can "Send customer receipt".
 *    https://cash.app/help/us/en-US/6540-view-cash-app-account-activity
 *    https://cash.app/help/us/en-us/90135-send-receipts-for-tap-to-pay-payments
 *    (the 6540 page returned 403 to our fetcher; content read via search index)
 *  - Venmo: Me tab > Transactions toggle; web feed; Settings > Statements for
 *    monthly CSV; business Tap to Pay receipts sent by the business.
 *    https://help.venmo.com/cs/articles/transaction-history-vhel281
 *    https://help.venmo.com/cs/articles/payments-requests-faq-vhel149
 *  - Zelle: "check the payment status within your payment activity in your
 *    bank's online or mobile service."
 *    https://www.zelle.com/support/i-sent-money-to-someone-and-they-never-received-it-what-should-i-do
 */

export const NOV_4B_ZELLE_CASH_APP_VENMO_RECEIPTS = [
  {
    slug: "zelle-cash-app-venmo-receipts",
    image: "assets/zelle-cash-app-venmo-receipts.jpeg",
    category: "small-business",
    publishedAt: "2026-11-04T14:00:00Z",
    title: "Zelle, Cash App and Venmo Receipts: Where to Find Them and What to Send",
    seoTitle: "Zelle, Cash App and Venmo Receipts: What to Send",
    seoDescription:
      "Where Zelle, Cash App and Venmo show payment details, and how a seller paid by app should write a proper receipt: items, amount, app, transaction ID.",
    excerpt:
      "Each payment app shows a record of the transfer, but none of them knows what the money was for. Here is where Zelle, Cash App and Venmo keep payment details, and what a seller should put on a receipt for an app payment.",
    body: `**Zelle, Cash App and Venmo each keep a record of the transfer: Zelle payments appear in your bank's app or online banking, Cash App payments in the Activity tab, and Venmo payments under Transactions on the Me tab.** Those records show the amount, date and the other person. They do not show what was sold, so a business paid through one of these apps should still give the customer a receipt listing the goods or service, the amount, the app used and its transaction ID. Our [cash receipt template](/templates/cash-receipt) has the fields for it.

## Where Each App Shows Payment Details

| App | Where to look | Official source |
|---|---|---|
| Zelle | Payment activity in your bank's or credit union's app or online banking | [Zelle support](https://www.zelle.com/support/i-sent-money-to-someone-and-they-never-received-it-what-should-i-do) |
| Cash App | Activity tab (clock icon), then tap the payment; or cash.app/account on the web | [Cash App help: account activity](https://cash.app/help/us/en-US/6540-view-cash-app-account-activity) |
| Venmo | Me tab, Transactions toggle, then tap the payment; monthly statements under Settings, Statements | [Venmo help: transaction history](https://help.venmo.com/cs/articles/transaction-history-vhel281) |

**Zelle.** Zelle runs inside banks, so the record lives with your bank. Zelle's own support pages tell you to check the payment status in your bank's online or mobile service, and to take payment questions to your bank. What the payment detail screen shows, and whether there is a confirmation number, depends on the bank.

**Cash App.** Cash App's help centre says to open the Activity tab and tap a payment to see its details, or sign in at cash.app/account on the web. Sellers who take payments with Cash App's Tap to Pay can [send a customer receipt](https://cash.app/help/us/en-us/90135-send-receipts-for-tap-to-pay-payments) from the payment in Activity. For an ordinary person-to-person payment, the help centre describes payment details rather than a receipt.

**Venmo.** Venmo's help centre shows recent payments on the Me tab under Transactions, with more detail when you tap one. For a fuller record, Settings, then Statements lets you download a monthly CSV or have it emailed. Business profiles taking Tap to Pay payments can send the customer an emailed receipt, according to [Venmo's payments FAQ](https://help.venmo.com/cs/articles/payments-requests-faq-vhel149).

Menu names change between app versions. If a step above does not match your screen, the linked help page is the place to check.

## Why a Seller Should Still Write a Receipt

A payment screen proves money moved between two accounts. It leaves out the things a customer or an auditor actually asks about:

- what was sold and in what quantity
- the price of each item, and any tax
- your business name, address and contact details
- whether the amount was paid in full or is a deposit
- the receipt number you will look up if there is a return or dispute

Customers who expense purchases or claim them for tax need that detail. The IRS lists paid bills, invoices and receipts as supporting documents and notes that a combination of records may be needed to support an expense ([IRS: What kind of records should I keep](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep)). For the payer's side of this, see [proof of payment](/blog/proof-of-payment).

## What to Put on a Receipt for an App Payment

| Field | Example |
|---|---|
| Your business name and contact | Bright Paws Grooming, (555) 010-8823 |
| Receipt number | 0412 |
| Date paid | Nov 4, 2026 |
| Customer | Taylor Nguyen |
| Items or services | Full groom, small dog: $65.00; Nail trim: $15.00 |
| Total | $80.00 |
| Paid by | Cash App, to $BrightPaws |
| Transaction ID | Copied from the payment details screen |
| Balance due | $0.00 |

Steps:

1. Wait until the payment shows as completed in your app or bank, not pending.
2. Open the payment details and copy the amount, date and any transaction or reference ID.
3. Fill in the receipt with the items, the app name and that ID.
4. If it was a deposit, show the balance still due; a [partial payment receipt](/blog/partial-payment-receipt) layout fits.
5. Email or text the PDF to the customer and keep a copy with your records.

For a sale with several items or sales tax, the [sales receipt template](/templates/sales-receipt) adds quantity and tax lines.

## A Note on Business Payments

Each app has its own terms for using a personal account to receive business payments, and some offer separate business accounts or profiles. Read the terms for the app you use. Whatever the app, a receipt should only record a payment that actually happened.

## Making the Receipt

Our [cash receipt template](/templates/cash-receipt) has a payment-method field where "Zelle", "Cash App" or "Venmo" and the transaction ID go. Building and previewing are free in the browser; a watermark-free download needs an account.`,
    faqs: [
      {
        q: "Does Zelle give a receipt?",
        a: "Zelle payments are recorded in your bank's app or online banking. Zelle's support pages send you to your bank's payment activity, and what the detail screen shows depends on the bank.",
      },
      {
        q: "Where do I find a Cash App receipt?",
        a: "Open the Activity tab and tap the payment to see its details, or sign in at cash.app/account. Sellers using Cash App Tap to Pay can send customers a receipt from the payment.",
      },
      {
        q: "How do I get a Venmo receipt?",
        a: "Tap the payment under Transactions on the Me tab for its details, or download a monthly statement from Settings, Statements. Businesses using Venmo Tap to Pay can email a receipt.",
      },
      {
        q: "Is a payment app screenshot a receipt?",
        a: "It shows money moved, but not what it was for. A receipt from the seller listing the items, amount and transaction ID is a fuller record.",
      },
      {
        q: "Should a business send a receipt for a Venmo, Zelle or Cash App payment?",
        a: "Yes. The app record does not list the goods or services, your business details or a receipt number, which customers need for expenses, returns and disputes.",
      },
      {
        q: "What should a receipt for an app payment include?",
        a: "Business details, receipt number, date, customer, items and prices, total, the app used, the transaction ID and any balance due.",
      },
      {
        q: "Where is the transaction ID?",
        a: "In the payment details screen of the app or, for Zelle, your bank's app. Its label varies by app and bank.",
      },
      {
        q: "Can I download a statement of my app payments?",
        a: "Venmo offers monthly CSV statements under Settings, Statements. For Zelle, use your bank statement. For Cash App, check its help centre for current statement options.",
      },
      {
        q: "When should I issue the receipt?",
        a: "Once the payment shows as completed, not while it is pending.",
      },
      {
        q: "Can I take business payments on a personal account?",
        a: "Each app sets its own rules. Read the terms of the app you use; some offer business accounts or profiles.",
      },
    ],
  },
];
