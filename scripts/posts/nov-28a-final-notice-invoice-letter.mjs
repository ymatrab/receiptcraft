/**
 * Day 2026-11-28, slot a (09:30Z). Elliot writer G.
 * Keyword gate (coordinator brief): "final notice invoice" / "final notice overdue
 * invoice letter". Demand evidence: Google autocomplete 2026-10-13; no makecepeit page
 * ranks for either. Creation intent: the searcher wants to write and send the letter.
 *   -> owner /templates/invoice; links /blog/invoice-payment-terms (Oct 29)
 *
 * Product check (2026-10-13, coordinator correction verified on main): the builder
 * cannot change the document heading, so the post never tells readers to retitle the
 * invoice. It uses only confirmed features: line items (negative amounts allowed),
 * labels (total label), business details, Invoice ID and notes.
 *
 * Facts checked 2026-10-13:
 *   - FTC, Fair Debt Collection Practices Act text,
 *     https://www.ftc.gov/legal-library/browse/rules/fair-debt-collection-practices-act-text :
 *     sec. 803(6) "debt collector" = a person whose principal business is collecting
 *     debts or who regularly collects debts owed to another; a creditor collecting its
 *     own debts is covered if it uses a name other than its own that suggests a third
 *     party is collecting; sec. 803(5) debts are consumer obligations (personal, family,
 *     household); sec. 807 bans threatening action that cannot legally be taken or is
 *     not intended to be taken, falsely implying arrest or seizure, documents falsely
 *     made to look like legal process, misrepresenting the amount of a debt; sec. 808(1)
 *     bans collecting amounts not authorized by the agreement or by law.
 *   - CFPB, "What laws limit what debt collectors can say or do?",
 *     https://www.consumerfinance.gov/ask-cfpb/what-laws-limit-what-debt-collectors-can-say-or-do-en-329/ :
 *     FDCPA covers third-party collectors (collection agencies, debt buyers, lawyers who
 *     collect), personal/family/household debts; generally does not cover business debts
 *     or the original creditor.
 * Reminder timeline is labelled common practice, not a rule. No state rules, small
 * claims limits or interest caps are stated (none verified). Sample business, client
 * and figures are fictional.
 */

export const NOV_28A_FINAL_NOTICE_INVOICE_LETTER = [
  {
    slug: "final-notice-invoice-letter",
    image: "assets/final-notice-invoice-letter.jpeg",
    category: "small-business",
    publishedAt: "2026-11-28T09:30:00Z",
    title: "Final Notice Invoice Letter: Sample Wording and What to Include",
    seoTitle: "Final Notice Invoice Letter: Sample and What to Include",
    seoDescription:
      "How to write a final notice for an overdue invoice: a sample letter, what to include, what not to threaten, and when debt collection rules apply.",
    excerpt:
      "A final notice is the last written request before you act on an unpaid invoice. Here is what it should say, a sample letter you can adapt, and the threats to leave out.",
    body: `**A final notice invoice letter is the last written request for payment before you take the next step on an overdue invoice. It names the invoice, the amount still owed and a firm pay-by date, says what you will do if that date passes, and comes with a fresh copy of the invoice.** Keep it short and factual, and only name a next step you actually intend to take. To reissue the invoice itself, open the [invoice template](/templates/invoice), keep the original invoice ID, write "FINAL NOTICE" and the new pay-by date in the notes, and change the total label to "Amount past due".

## When to Send a Final Notice

A final notice works best at the end of a short, predictable sequence. For a Net 30 invoice, a common pattern looks like this:

| Stage | Typical timing | Tone |
|---|---|---|
| Friendly reminder | On or just before the due date | A quick heads-up |
| First overdue notice | About a week late | Polite, restates the terms |
| Second notice | Two to three weeks late | Firmer, asks for a payment date |
| Final notice | A month or more late | Formal, sets a deadline and a next step |

These are habits, not rules. Follow the terms printed on the original invoice. If you agreed a late fee up front, the final notice is where it shows up; if you did not, do not invent one now. Our guide to [invoice payment terms](/blog/invoice-payment-terms) covers how to word late fees before the job starts, which is the only time they reliably hold.

## What a Final Notice Should Include

| Element | Why it matters |
|---|---|
| "Final notice" in the subject line and heading | The status is impossible to miss |
| Invoice number, issue date and original due date | The client's bookkeeper can find it in seconds |
| Amount past due, broken out | Original amount, payments received, any late fee the client agreed to |
| A specific pay-by date | "By November 17, 2026", not "as soon as possible" |
| How to pay | Bank details, a payment link, or the address for checks |
| The next step and its date | The one action you will take if the deadline passes |
| A named contact and phone number | A client with a genuine dispute can reach a person |
| A copy of the invoice | Attached or enclosed, with "Final notice" in its notes |

Leave out anything the client never agreed to. A charge that appears for the first time in a final notice invites a dispute and weakens the rest of the letter.

## Sample Final Notice Letter

The business, client and figures below are fictional. Adapt the facts, keep the structure.

> **FINAL NOTICE: Invoice INV-1042, $1,850.00 past due**

> November 3, 2026

> Dana Whitfield, Accounts Payable, Harbor Street Bakery, 410 Harbor Street, Portland, ME 04101

> Dear Ms. Whitfield,

> Invoice INV-1042 for $1,850.00, issued on August 31, 2026 for the storefront sign installed at 410 Harbor Street, was due on September 30, 2026 under our Net 30 terms. We sent reminders on October 7 and October 21 and have not received payment or a reply.

> Please pay the full $1,850.00 by **November 17, 2026**. You can pay by ACH to the account on the enclosed invoice, by card through the payment link on the invoice, or by check to the address below.

> If payment has not arrived by November 17, we will refer the account to a collection agency on November 18. If you believe the amount is wrong or you need a payment plan, call me at (207) 555-0148 before then and we will work it out.

> Sincerely, Marcus Bell, Owner, Brightline Signs LLC, 88 Fore Street, Portland, ME 04101

The letter states facts the client can check, gives one deadline, names one next step and leaves a door open for a real dispute. It does not mention lawyers, credit reports or court, because the writer has not decided to do those things.

## What Not to Threaten

The federal law most people have heard of here is the Fair Debt Collection Practices Act. According to the [FTC's copy of the Act](https://www.ftc.gov/legal-library/browse/rules/fair-debt-collection-practices-act-text) and the Consumer Financial Protection Bureau, it covers third-party debt collectors, such as collection agencies and debt buyers, collecting consumer debts (personal, family or household). The CFPB says it generally does not cover business debts or the original creditor collecting its own invoice.

So a small business chasing its own invoice is usually outside the Act. Two cautions still apply:

- **Do not pose as a third party.** The Act's definition of a debt collector reaches a creditor who collects its own debts under a different name that suggests someone else is collecting. Writing as "Portland Recovery Services" when you are Brightline Signs can pull you in.
- **Its list of banned tactics is a good guide anyway.** The Act forbids threatening action that cannot legally be taken or is not intended to be taken, falsely implying arrest or seizure of property, making a letter look like a court or government document, and misstating the amount owed. A final notice that avoids all of these is also more likely to get paid, because it reads as credible.

State laws can add rules of their own, so check yours before you hand an account to a collector or file a claim.

## How to Reissue the Invoice

A clean copy of the invoice does more than the letter. It shows the original work, the terms and the exact amount in one place.

1. Open the [invoice template](/templates/invoice) and load the original details: your business, the client, the same invoice ID and the line items exactly as first billed.
2. Add any partial payments received as negative lines, and any late fee your terms allowed as its own line, so the client can follow the math.
3. Change the total label to "Amount past due".
4. In the notes, write "FINAL NOTICE", the original due date, the new pay-by date and how to pay.
5. Preview it free with no account. Downloading takes a free account, and your first download is watermark-free.

Send a final notice only for a real invoice that is genuinely unpaid. Reissuing an invoice for work that was not done, or for an amount that was not agreed, is not a collection letter.

## After the Deadline

If the date passes with no payment and no reply, do what the letter said. Your usual options are to refer the account to a collection agency, file a claim in small claims court, or write the amount off. Each has costs and rules that vary by state and by the size of the debt, so look at your state court's small claims page or ask a lawyer before you choose.

Whatever happens, keep the paper trail: the original invoice, each reminder with its date, the final notice and any replies.

This is general information, not legal advice. For a specific unpaid debt, check your state's rules or talk to a lawyer.`,
    faqs: [
      {
        q: "What should a final notice for an overdue invoice say?",
        a: "The invoice number and dates, the amount past due, a specific pay-by date, how to pay, the one step you will take if the date passes, and a contact for disputes. Enclose a copy of the invoice.",
      },
      {
        q: "How long should I wait before sending a final notice?",
        a: "There is no fixed rule. Many businesses send it a month or more after the due date, once a friendly reminder and one or two overdue notices have gone unanswered.",
      },
      {
        q: "Does the Fair Debt Collection Practices Act apply to my business?",
        a: "Usually not when you collect your own invoice. The CFPB says the Act covers third-party collectors of consumer debts and generally not business debts or the original creditor. Using a different name that suggests a third party can bring you under it.",
      },
      {
        q: "Can I add a late fee in a final notice?",
        a: "Only one the client agreed to in your original terms. A fee that appears for the first time in a final notice is likely to be disputed.",
      },
    ],
  },
];
