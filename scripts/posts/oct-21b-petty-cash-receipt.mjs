/**
 * Cadence — Day 2026-10-21, slot b (14:00Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks.
 *   "petty cash receipt"   210/mo · creation intent (voucher/slip to fill out)
 *   -> /templates/cash-receipt
 *
 * Describes the standard imprest petty cash method (fixed float, vouchers,
 * replenish to the float). No regulated claims beyond the IRS records list.
 * Facts checked 2026-10-11:
 *  - IRS "What kind of records should I keep": supporting documents include
 *    sales slips, paid bills, invoices, receipts; cash register tape receipts
 *    count as proof of payment.
 *    https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 */

export const OCT_21B_PETTY_CASH_RECEIPT = [
  {
    slug: "petty-cash-receipt",
    image: "assets/petty-cash-receipt.jpeg",
    category: "expenses",
    publishedAt: "2026-10-21T14:00:00Z",
    title: "Petty Cash Receipt: How to Fill One Out and Balance the Box",
    seoTitle: "Petty Cash Receipt: How to Fill Out and Reconcile",
    seoDescription:
      "How to fill out a petty cash receipt or voucher: date, amount, purpose, who took the cash, approval, and how to reconcile and top up the petty cash fund.",
    excerpt:
      "Every dollar that leaves a petty cash box needs a slip saying who took it, how much and why. Here is what to write on a petty cash receipt, a worked example, and how to balance and top up the fund.",
    body: `**A petty cash receipt (or petty cash voucher) is the slip you fill out each time money leaves the petty cash box: the date, the amount, what it was for, who took it and who approved it.** The store receipt for the purchase gets stapled to it. At any moment, the cash in the box plus the vouchers should add up to the fund's fixed amount. Our [cash receipt template](/templates/cash-receipt) has the same fields if you want printed slips instead of a pad.

Petty cash covers small purchases where a card or check is impractical: postage, a parking meter, office milk, a taxi for a courier run.

## What to Write on a Petty Cash Receipt

| Field | Example |
|---|---|
| Voucher number | PC-0057 |
| Date | Oct 21, 2026 |
| Amount | $18.40 |
| Paid to | USPS (or the shop's name) |
| Purpose | Postage for client contracts |
| Expense category | Postage |
| Received by | Sam Ortiz, signature |
| Approved by | Office manager's initials |
| Store receipt attached | Yes / No |

Write the amount in figures, and in words if your office uses that to prevent changes. Number vouchers in sequence so a missing slip is obvious.

## How to Fill It Out, Step by Step

1. **Take a blank voucher** from the pad or print the next numbered slip.
2. **Write the date and the exact amount** handed out. If the person brings change back, write the amount actually spent and record the change returned.
3. **Say what it was for**, in words someone else will understand in six months. "Supplies" is too vague; "printer paper, 2 reams" is not.
4. **Pick the expense category** your bookkeeper uses, so the totals can be posted without guessing.
5. **Have the person who took the cash sign**, and the fund custodian or manager initial the approval.
6. **Staple the store receipt** to the voucher. If there is no store receipt, write "no receipt" and the reason, and keep those cases rare.
7. **Put the voucher in the box** in place of the cash it replaced.

The IRS treats receipts, paid bills and cash register tapes as supporting documents for a business expense ([IRS: What kind of records should I keep](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep)). The store receipt is the proof of the purchase; the voucher is your internal record of who took the cash and why. Keep both.

## Reconciling the Petty Cash Fund

Most offices run petty cash on a fixed float, say $200. The rule is simple: **cash in the box + vouchers = $200**, always.

A worked example at month end:

| Voucher | Date | Purpose | Amount |
|---|---|---|---|
| PC-0055 | Oct 3 | Parking, client visit | $12.00 |
| PC-0056 | Oct 9 | Coffee and milk | $23.60 |
| PC-0057 | Oct 21 | Postage | $18.40 |
| PC-0058 | Oct 28 | Courier taxi | $31.00 |
| | | **Vouchers total** | **$85.00** |

Cash counted in the box: $115.00. Vouchers $85.00 + cash $115.00 = $200.00. The fund balances.

To top it up, write one check or withdrawal for $85.00 (the vouchers total), put the cash in the box and file the vouchers with their store receipts. The box is back to $200 in cash.

## If It Does Not Balance

- **Short:** recount, look for a voucher filed in the wrong place, then check for change that was never returned. Record any unexplained difference as "cash over/short" so it is visible, not hidden.
- **Over:** usually a voucher written for more than was spent. Find it and correct it.
- **Repeated shortfalls:** limit who can open the box, count it more often, and make one person responsible for it.

## Petty Cash Rules Worth Writing Down

- The fund amount and who holds the key.
- A maximum per voucher, for example $50, above which the purchase goes through normal payment.
- That no one approves their own voucher.
- How often the box is counted and replenished.
- That petty cash is never used for personal loans or cashing personal checks.

## Printing Your Own Vouchers

A pre-printed petty cash pad works fine. If you prefer numbered slips with your business name on them, our [cash receipt template](/templates/cash-receipt) has the date, amount, purpose and signature fields; put the voucher number and approver line in the header. For tips on numbering, see [how to number receipts](/blog/how-to-number-receipts). You can build them free in the browser; a watermark-free download needs an account.`,
    faqs: [
      {
        q: "What is a petty cash receipt?",
        a: "A slip filled out each time cash is taken from the petty cash fund, showing the date, amount, purpose, who took it and who approved it.",
      },
      {
        q: "Is a petty cash voucher the same as a petty cash receipt?",
        a: "Yes, the two names are used for the same slip. Some offices call the internal slip a voucher and the store's slip a receipt.",
      },
      {
        q: "What do I write on a petty cash voucher?",
        a: "Voucher number, date, amount, who was paid, the purpose, an expense category, the signature of the person who took the cash and the approver's initials.",
      },
      {
        q: "Do I still need the store receipt?",
        a: "Yes. Staple it to the voucher. The store receipt proves the purchase; the voucher records who took the cash and why.",
      },
      {
        q: "How do you reconcile petty cash?",
        a: "Count the cash, total the vouchers and check that the two add up to the fixed fund amount. Then top the fund up by the vouchers total.",
      },
      {
        q: "What if petty cash is short?",
        a: "Recount, look for misfiled vouchers and unreturned change, then record any unexplained difference as cash over/short.",
      },
      {
        q: "How much should a petty cash fund hold?",
        a: "Enough to cover small expenses between top-ups, often a few hundred dollars for a small office. Set it from your actual monthly spending.",
      },
      {
        q: "Who should approve petty cash vouchers?",
        a: "The fund custodian or a manager, and never the person who took the cash.",
      },
      {
        q: "What if there is no store receipt?",
        a: "Write 'no receipt' and the reason on the voucher, describe the purchase in detail, and keep such cases rare.",
      },
      {
        q: "How often should petty cash be counted?",
        a: "At least at every top-up and at month end. Busy funds are often counted weekly.",
      },
    ],
  },
];
