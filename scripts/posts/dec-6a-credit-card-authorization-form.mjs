/**
 * Day 2026-12-06, slot a (09:30Z). Elliot writer G.
 * Keyword gate (coordinator brief): "credit card authorization form". Demand evidence:
 * Google autocomplete 2026-10-13; no makecepeit page ranks for it. Creation intent: a
 * business owner wants to write the form and handle it safely.
 *   -> owner /templates/invoice; links /blog/do-receipts-show-card-number (Jul 24)
 *
 * Product check (2026-10-13, coordinator correction verified on main): makecepeit has
 * no authorization-form template, and the post does not claim one. It links the invoice
 * template for the invoice that accompanies or follows the charge, using only confirmed
 * features (line items, labels, business details, Invoice ID, notes). The post tells
 * readers not to type card numbers into any invoice or receipt.
 *
 * Facts checked 2026-10-13:
 *   - PCI Security Standards Council FAQ 1280, "Can card verification codes/values be
 *     stored for card-on-file or recurring transactions?",
 *     https://www.pcisecuritystandards.org/faq/articles/Frequently_Asked_Question/can-card-verification-codes-values-be-stored-for-card-on-file-or-recurring-transactions/ :
 *     no; PCI DSS prohibits storing card verification codes after authorization, even
 *     for card-on-file or recurring transactions, even if encrypted and even with the
 *     customer's consent; the codes are not needed for card-on-file or recurring
 *     transactions; only issuers with a legitimate issuing business need may store
 *     sensitive authentication data; merchants should ask their acquirer or the payment
 *     brands how to process such transactions without the code.
 * Not stated: card-brand chargeback rules, state laws on authorization forms, or any
 * PCI requirement number beyond the FAQ (not verified in this check). Shredding, locked
 * storage and "do not email card numbers" are given as common practice. Sample business,
 * guest and card details are fictional; the card number is shown masked only.
 */

export const DEC_6A_CREDIT_CARD_AUTHORIZATION_FORM = [
  {
    slug: "credit-card-authorization-form",
    image: "assets/credit-card-authorization-form.jpeg",
    category: "small-business",
    publishedAt: "2026-12-06T09:30:00Z",
    title: "Credit Card Authorization Form: Fields, Uses and Storage Rules",
    seoTitle: "Credit Card Authorization Form: Fields and Storage Rules",
    seoDescription:
      "What a credit card authorization form includes, when hotels and service businesses use one, and why PCI rules say not to keep the CVV after authorization.",
    excerpt:
      "A credit card authorization form is a customer's written permission to charge their card. Here are the fields it needs, when businesses use one, a filled-in sample, and the storage rules that matter most.",
    body: `**A credit card authorization form is a customer's signed permission for a business to charge their card, either once or on a schedule, without the card being present. It names the cardholder, the card, the amount or charge limit, what the charge is for and when it happens, and carries the cardholder's signature and date. Under PCI security rules, the card's security code must not be kept after the charge is authorized.** After you charge the card, send the customer an itemized bill from the [invoice template](/templates/invoice) so they can match it to their statement.

## When Businesses Use One

The form fills the gap when a customer wants to pay by card but is not standing at your terminal.

| Situation | What the form authorizes |
|---|---|
| Hotel or vacation rental booking | A deposit, the stay, and incidentals up to a stated limit |
| Recurring service (lawn care, cleaning, IT support) | A fixed charge on a set day each month until cancelled |
| Phone or email order | One charge for a specific order |
| Paying for someone else's stay or event | A charge to a card that belongs to a third party, such as a parent or employer |
| Repair or custom work | A deposit now and the balance when the job is done |

It is also your evidence if the customer later disputes the charge. A clear, signed form that matches the amount charged is much easier to defend than a note that "the customer said it was fine over the phone".

## What the Form Should Include

| Field | Notes |
|---|---|
| Business name, address and phone | So the customer knows exactly who will charge them |
| Cardholder name, as on the card | Plus billing address, used by many processors to verify the card |
| Card type and number | Collect only through a secure method; see storage below |
| Expiration date | Needed to process the charge |
| Amount, or maximum amount | A fixed figure, or "up to $X" for incidentals |
| What the charge is for | "Lawn care, weekly service, Nov to Mar" |
| One-time or recurring | For recurring: frequency, start date, and how to cancel |
| Authorization statement | "I authorize [business] to charge the card above for…" |
| Cardholder signature and date | The core of the form |
| Contact email or phone | For receipts and questions |

Leave the card security code (CVV, CVC) off any form you plan to keep. The section below explains why.

## Storage Rules: What You May Not Keep

The card industry's data security standard, PCI DSS, is maintained by the PCI Security Standards Council. Its [FAQ on card-on-file and recurring transactions](https://www.pcisecuritystandards.org/faq/articles/Frequently_Asked_Question/can-card-verification-codes-values-be-stored-for-card-on-file-or-recurring-transactions/) is direct: card verification codes cannot be stored after authorization, even for card-on-file or recurring charges, even if encrypted and even if the customer agrees. It adds that the codes are not needed for those transactions, and suggests asking your acquirer or the card brands how to process them without one.

In practice, for a small business:

- **Do not ask for the CVV on a form you keep.** If your processor needs it for a first charge, enter it and destroy the record of it straight away.
- **Do not collect card numbers by plain email or text.** Ask your payment processor whether it offers a secure payment link or a card-on-file vault; many do, and then you never handle the number at all.
- **Lock up paper forms** and limit who can see them. Shred them when you no longer need them.
- **Never put the full card number on an invoice or receipt.** Show the card type and last four digits at most. Our guide to [whether receipts show your card number](/blog/do-receipts-show-card-number) explains what a normal receipt prints.

These are the basics, not the whole standard. Your processor can tell you which PCI requirements apply to your business and how to confirm you meet them.

## Sample Filled-In Form

The business, guest and card below are fictional, and the card number is shown masked.

| Field | Entry |
|---|---|
| Business | Lakeview Inn, 22 Shore Road, Bar Harbor, ME 04609, (207) 555-0190 |
| Cardholder | Jordan Ellis, 914 Oak Avenue, Albany, NY 12203 |
| Card | Visa ending 4417, exp. 08/28 |
| Charge type | One-time, plus incidentals |
| Amount | Room, Dec 19–21, 2026: $468.00 including tax; incidentals up to $150.00 |
| Purpose | Stay for guest Riley Ellis (cardholder's daughter) |
| Statement | I authorize Lakeview Inn to charge the card above for the stay described and for incidentals up to $150.00. |
| Signature and date | Jordan Ellis, Dec 1, 2026 |
| Receipts sent to | j.ellis@example.com |

After checkout, Lakeview Inn charges $468.00 plus $36.50 for room-service breakfast, $504.50 in total, within the authorized limit. It sends Jordan an itemized bill showing both lines and "Visa ending 4417".

## Sending the Invoice or Receipt

The charge itself is not a record the customer can file. Send one:

1. Open the [invoice template](/templates/invoice) and enter your business details and the customer.
2. Add one line per charge: the stay or service, then any extras, each with its amount.
3. Use the invoice ID that matches your booking or order number.
4. In the notes, write the card type and last four digits, the authorization date, and "Charged per signed authorization".
5. Preview it free with no account. Downloading takes a free account; your first download is watermark-free.

Use an authorization form only with the cardholder's real, informed consent, and only for the charges it describes. Charging more than the form allows, or using a card the signer does not own, is not something any form can make legitimate.

## Common Mistakes

- **No maximum on incidentals.** "Any additional charges" invites a dispute. State a limit.
- **Recurring charges with no end or cancel method.** Say how often, from when, and how the customer stops it.
- **Keeping the CVV "just in case".** PCI's FAQ says it may not be stored after authorization.
- **Charging before the form is signed.** Get the signed form first, then charge.

This is general information, not legal or compliance advice. Your payment processor and the card brands set the rules for your merchant account.`,
    faqs: [
      {
        q: "What is a credit card authorization form?",
        a: "A form a cardholder signs to let a business charge their card, once or on a schedule, without the card being present. It lists the card, the amount or limit, the purpose and the dates.",
      },
      {
        q: "Can I keep the CVV on a credit card authorization form?",
        a: "No. The PCI Security Standards Council says card verification codes cannot be stored after authorization, even for recurring or card-on-file charges, even if encrypted or if the customer agrees.",
      },
      {
        q: "Do hotels use credit card authorization forms?",
        a: "Yes. They are common when someone pays for another person's stay or books without being present, and usually cover the room plus incidentals up to a stated limit.",
      },
      {
        q: "Is a signed authorization form enough to win a chargeback?",
        a: "It helps, but it is not a guarantee. Your processor and the card brands decide disputes under their own rules, so follow their guidance on what evidence to keep.",
      },
    ],
  },
];
