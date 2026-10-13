/**
 * Day 2026-12-08, slot b (14:00Z). Elliot writer J.
 * Keyword: "child support payment receipt".
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /templates/cash-receipt (owner), /blog/zelle-cash-app-venmo-receipts, /create.
 * Angle: neutral and careful. Lead with the fact that the state disbursement unit's record is
 * the usual proof; explain when parent-to-parent payments happen and why they are risky; then
 * what a receipt for a direct payment should show. Not legal advice.
 * Product check: cash-receipt template exists; builder has editable store name, two-column
 * rows, message and signature sections (components/builder/SectionBuilder.tsx).
 * Builder claims re-checked against origin/main 2026-10-13 (lib/templates.ts, SectionBuilder.tsx):
 * the document heading cannot be changed, so the post never tells readers to retitle it.
 *
 * Facts checked 2026-10-13:
 *   - 42 U.S.C. 654b, https://www.law.cornell.edu/uscode/text/42/654b : states operate a State
 *     disbursement unit that collects and disburses payments in IV-D cases and in non-IV-D cases
 *     with orders initially issued on or after January 1, 1994 where the noncustodial parent's
 *     income is subject to withholding; on request it must give any parent timely information on
 *     the current status of support payments; distributes within 2 business days of receipt if
 *     the payee is sufficiently identified. (acf.gov pages returned 403 to the fetcher.)
 *   - Illinois HFS Child Support FAQ, https://hfs.illinois.gov/childsupport/parents/faqsnew.html :
 *     paying the other parent instead of through income withholding is not allowed ("paying
 *     through income withholding is the law"); for credit for direct payments, provide
 *     documentation (money orders, copies of both sides of checks, printouts of Venmo or other
 *     online payments) to the regional office.
 *   - Minnesota DCYF, Payment information, https://dcyf.mn.gov/payment-information : a parent
 *     should not send payments directly to the other parent when a child support office is
 *     enforcing the order; the paying parent may not get credit; the receiving parent should tell
 *     the caseworker and may be asked to forward the money to the payment center.
 * Not used: Massachusetts, Rhode Island and Texas pages (blocked to the fetcher; seen only in
 * search summaries).
 * Names and amounts are fictional.
 */

export const DEC_8B_CHILD_SUPPORT_PAYMENT_RECEIPT = [
  {
    slug: "child-support-payment-receipt",
    image: "assets/child-support-payment-receipt.jpeg",
    category: "legal",
    publishedAt: "2026-12-08T14:00:00Z",
    title: "Child Support Payment Receipt: What It Should Show and When You Need One",
    seoTitle: "Child Support Payment Receipt: What to Include",
    seoDescription:
      "Most child support is recorded by the state disbursement unit. When parents pay each other directly, here is what a receipt should show, with a sample.",
    excerpt:
      "When child support goes through the state, the state keeps the record. When one parent pays the other directly, a receipt for each payment is what both of you will rely on later. Here is what it should say.",
    body: `**If your child support order is handled by a state child support agency, the payment record kept by the state disbursement unit is the receipt that counts, and you can ask for a payment history at any time. A parent-to-parent receipt matters when payments are made directly, either because no agency is involved or because of an informal arrangement. It should show both parents' names, the date, the amount, the payment method, the period the payment covers and that it is child support, signed by the parent who received it.**

The [cash receipt template](/templates/cash-receipt) works for this: describe the payment as child support on the item line and fill in the fields below. Before you rely on direct payments at all, read the next section, because in many cases they may not be credited.

## How Child Support Is Usually Recorded

Federal law requires each state to run a State Disbursement Unit. Under [42 U.S.C. 654b](https://www.law.cornell.edu/uscode/text/42/654b), the unit collects and pays out support in cases handled by the state child support program, and in other cases with orders first issued on or after January 1, 1994 where the paying parent's income is subject to withholding. The same law says the unit must give either parent, on request, timely information on the current status of support payments.

In practice, that means:

- Payments taken from a paycheck by income withholding go to the state unit, not to the other parent.
- The state's payment history is the official record of what was paid and when.
- If the state is involved, the receipt you need is usually a printout of that history.

## Why Direct Payments Are Risky

States are clear that paying the other parent directly can leave the paying parent without credit.

- **Illinois.** The state's child support FAQ says paying the other parent instead of through income withholding is not allowed, because paying through withholding is the law. To ask for credit for direct payments, the paying parent must send documentation, such as money orders, copies of both sides of checks or printouts of Venmo and other online payments, to the regional office ([Illinois HFS](https://hfs.illinois.gov/childsupport/parents/faqsnew.html)).
- **Minnesota.** The state says a parent should not send payments directly to the other parent when a child support office is enforcing the order, and the paying parent may not get credit for them. A parent who receives a direct payment should tell the caseworker and may be asked to forward it ([Minnesota DCYF](https://dcyf.mn.gov/payment-information)).

Rules differ by state and by order. If an agency is enforcing your order, pay the way the order and the agency say, and ask the agency before changing anything.

## When a Parent-to-Parent Receipt Makes Sense

Direct payment receipts are useful when:

- The order says payments go directly between the parents, and no agency is involved.
- Parents have an informal agreement with no court order.
- A one-off payment was made outside the normal channel and the paying parent needs documents to ask the agency or court for credit.

In each case, the paying parent wants proof, and the receiving parent wants a clear record of what came in and for which period.

## What the Receipt Should Show

| Field | Why |
|---|---|
| Description: "Child support" and the period | Separates support from gifts, loans or shared costs |
| Receipt number and date received | Puts the payment in order and in time |
| Paying parent's full name | Who paid |
| Receiving parent's full name | Who accepted the money |
| Child or children covered | Names or initials, as the parents prefer |
| Period covered | For example, "support for December 2026" |
| Amount | The amount actually received, not the amount due |
| Payment method and reference | Check number, money order number or app confirmation |
| Case or order number, if any | Links the payment to the order |
| Signature of receiving parent | Confirms the money was received |

Keep the wording factual. A receipt records a payment; it is not the place to note disputes or conditions.

## Sample

**CHILD SUPPORT PAYMENT RECEIPT**
No. CS-2026-12, received December 3, 2026

Received from Daniel Brooks by Elena Brooks the sum of $450.00 by check no. 2214, as child support for M. Brooks for the month of December 2026, under order no. 2024-DR-0381.

Signed: Elena Brooks

All names and numbers in this sample are fictional. If the amount received is less than the amount due, write the amount actually received. Do not record a payment that did not happen, or a different amount, date or purpose; a receipt is only useful if it is accurate.

## Keep the Payment Trail

A signed receipt is strongest alongside an independent record of the money moving:

- **Checks or money orders.** Illinois lists copies of both sides of checks and money orders as documentation.
- **Payment apps.** Use the memo line, for example "Child support Dec 2026", and save the confirmation. Our guide to [Zelle, Cash App and Venmo receipts](/blog/zelle-cash-app-venmo-receipts) covers how to save them.
- **Cash.** Avoid it where you can. If you must pay cash, get a signed receipt at the moment of payment.

Payments made for other things, such as school fees, clothes or medical bills, may or may not count toward support depending on the order and the state. Record them on separate receipts with their own description rather than mixing them into a support receipt.

## How to Make It in the Builder

1. Open the [cash receipt template](/templates/cash-receipt).
2. Put the receiving parent's name in the store name field at the top and the paying parent on the "Received from" line.
3. Add one line: "Child support, December 2026", priced at the amount received.
4. Choose the payment method actually used and add the check or confirmation number.
5. Add a two-column block with the order number and the child or children covered, then a signature section.

You can [build and preview](/create) without an account; downloading needs a free account, and the first download is watermark-free.

This is general information, not legal advice. Child support rules vary by state and by order; for your case, contact your state child support agency or a family law attorney.`,
    faqs: [
      {
        q: "How do I get proof of child support payments?",
        a: "If a state agency handles your case, ask the state disbursement unit for a payment history; federal law requires it to give either parent timely payment status information on request. For direct payments, keep a signed receipt and the check, money order or app record.",
      },
      {
        q: "Do direct child support payments count?",
        a: "Not always. States such as Illinois and Minnesota warn that direct payments may not be credited when the order runs through income withholding or an agency. Ask your state agency before paying directly.",
      },
      {
        q: "What should a child support receipt include?",
        a: "Both parents' names, the date received, the amount, the method and reference, the period covered, the case or order number if any, and the receiving parent's signature.",
      },
      {
        q: "Should I pay child support in cash?",
        a: "It is the hardest method to prove. If you have to, get a signed receipt at the moment of payment that states the amount, date and period covered.",
      },
    ],
  },
];
