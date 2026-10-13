/**
 * Cadence — Day 2026-11-14, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "how to write a quote for a job" (business price
 *   quote, not a text quotation). Demand evidence: Google autocomplete 2026-10-13;
 *   no makecepeit page ranks for it in Search Console.
 *   -> /templates/invoice (owner: the accepted quote becomes the invoice there),
 *      sister post /blog/estimate-vs-invoice (Oct 31)
 *
 * Product check 2026-10-13 (components/builder/SectionBuilder.tsx, lib/sections.ts):
 *   the header's document title is NOT editable in the builder (no title field in the
 *   header editor), so the post does not tell readers to retitle the invoice as a
 *   QUOTE. It only says the accepted quote's lines carry over to the invoice template.
 *   Item names, quantities and prices are editable; "+ Add item" exists.
 *
 * Facts checked 2026-10-13:
 *   - UCC 2-205 (firm offers): a merchant's signed written offer to buy or sell goods
 *     that gives assurance it will be held open is not revocable for lack of
 *     consideration during the time stated, or a reasonable time if none is stated,
 *     but in no event longer than three months.
 *     https://www.law.cornell.edu/ucc/2/2-205
 * Quote fields, validity periods (30 days used as an example) and deposit percentage
 * are presented as common practice, not rules. Sample business is fictional.
 */

export const NOV_14A_HOW_TO_WRITE_A_QUOTE = [
  {
    slug: "how-to-write-a-quote",
    image: "assets/how-to-write-a-quote.jpeg",
    category: "how-to",
    publishedAt: "2026-11-14T09:30:00Z",
    title: "How to Write a Quote for a Job: Fields, Example and Validity",
    seoTitle: "How to Write a Quote for a Job (With a Worked Example)",
    seoDescription:
      "How to write a price quote for a job: what to include, how long it stays valid, how it differs from an estimate, and how it becomes the invoice.",
    excerpt:
      "A quote is a fixed price you offer before the work starts. Here is what to put on one, how long to keep it open, a finished example for a painting job, and how the accepted quote turns into the invoice.",
    body: `**To write a quote for a job, list each part of the work with its quantity, unit price and line total, add them to a fixed total, and state how long the price is valid, what is not included and what deposit you need. Give it a quote number and date, name the client and the job site, and ask the client to sign or reply to accept.** Once accepted, the quote becomes the basis for your invoice, line for line.

When the job is done, copy the accepted lines into our [invoice template](/templates/invoice), add any approved changes, and send it for payment. If you are unsure whether you should be sending a quote or an estimate in the first place, [estimate vs. invoice](/blog/estimate-vs-invoice) covers the difference in more detail.

## Quote vs. Estimate vs. Invoice

The three documents follow one job from first conversation to payment. The difference is how firm the number is and whether it asks for money.

| | Quote | Estimate | Invoice |
|---|---|---|---|
| When | Before the work | Before the work | After the work or a milestone |
| Price | Fixed for the scope described | Best guess, may change | Final amount owed |
| Expires? | Yes, on a stated date | Usually, less strictly | No, it has a due date |
| Asks for payment? | Only a deposit, if any | Only a deposit, if any | Yes |
| What the client does | Accepts or declines | Approves or declines | Pays |
| Typical number | Q-2026-041 | EST-2026-041 | INV-2026-041 |

Use a quote when you can price the job exactly: a set number of rooms to paint, a product order, a fixed website build. Use an estimate when the job depends on what you find once you start, such as a repair behind a wall.

## What to Put on a Quote

| Field | Example | Why it matters |
|---|---|---|
| Quote number and date | Q-2026-041, Nov 3, 2026 | Lets the client accept a specific version |
| Your business details | Name, address, phone, email | Who is making the offer |
| Client and job site | Name, address, contact | Who the price is for and where the work happens |
| Scope of work | "Paint walls and trim in 3 bedrooms" | Defines exactly what the price covers |
| Line items | Labor, materials, other costs, each with qty and rate | Shows how you reached the total |
| Total | $2,353.00 | The number the client is agreeing to |
| Valid until | Dec 3, 2026 | Protects you if material prices move |
| Exclusions | "Ceilings and furniture moving not included" | Stops scope creep before it starts |
| Deposit and payment terms | 25% to book, balance on completion | Sets up the invoices that follow |
| Acceptance | Signature and date, or a written reply | Turns the offer into an agreement |

## How to Write the Quote, Step by Step

1. **Visit or measure first.** Price from what you saw, not from a phone description.
2. **Break the job into lines.** Labor hours, each material, disposal, travel. Clients trust a quote they can follow.
3. **Multiply every line yourself** and add them. A wrong total on a quote is a price you may have to honor.
4. **Write the scope in plain words**, then list what is not included.
5. **Set a validity period.** Thirty days is common for trade work; shorter if your material costs swing.
6. **State the deposit and when the balance is due.**
7. **Number it and keep a copy.** If the client asks for changes, issue Q-2026-041-R1 rather than editing the original.
8. **Ask for written acceptance** before you buy materials or book the crew.

## How Long Should a Quote Stay Valid?

There is no single rule; pick a period you can live with and print it on the quote. For sales of goods, the Uniform Commercial Code has a specific rule on "firm offers": a merchant's [signed written offer](https://www.law.cornell.edu/ucc/2/2-205) that promises to stay open cannot be withdrawn during the stated time, but that period cannot run longer than three months. Service work follows general contract rules that vary by state, so a clear "valid until" date is the simplest protection either way. This is general information, not legal advice.

## A Worked Example

Sample data: a fictional painting contractor quotes a homeowner.

> **QUOTE Q-2026-041** · Nov 3, 2026 · **Valid until:** Dec 3, 2026
> **From:** Brightline Painting, 410 Oak Ave, Columbus, OH 43215
> **For:** Marcus Webb, 77 Linden Ct, Columbus, OH 43214
> **Scope:** Prep and paint walls and trim in 3 bedrooms, two coats, client's chosen colors

| Item | Qty | Rate | Amount |
|---|---|---|---|
| Labor, painter hours | 32 | $55.00 | $1,760.00 |
| Wall paint, gallons | 9 | $48.00 | $432.00 |
| Primer, gallons | 3 | $32.00 | $96.00 |
| Tape, plastic, rollers | 1 | $65.00 | $65.00 |
| **Quote total** | | | **$2,353.00** |

> **Not included:** ceilings, moving furniture, drywall repair. Prices exclude any sales tax that applies.
> **Terms:** 25% deposit ($588.25) to book the dates; balance due on completion.
> **Accepted by:** ____________ Date: ________

Every line multiplies out: 32 × $55 is $1,760, 9 × $48 is $432, 3 × $32 is $96, and the four lines add to $2,353. The deposit is 25% of that total.

## What Turns a Quote Into an Invoice

A quote asks for nothing except, perhaps, a deposit. The invoice comes later and asks for the money. In between, three things happen:

1. **The client accepts** the quote in writing.
2. **You do the work**, logging any changes the client approves along the way.
3. **You invoice** the accepted lines plus approved changes, minus any deposit already paid, and quote the original quote number so the client can match it.

Suppose Marcus asked Brightline to paint a hall closet as well, agreed at $120. The invoice would show the four quoted lines ($2,353.00), the closet ($120.00), a total of $2,473.00, then the $588.25 deposit taken off, leaving $1,884.75 due. Build it in the [invoice template](/templates/invoice): enter each line, add the deposit as its own line with a minus amount, and rename the total label to "Balance due".

## Mistakes That Cost Money

- **No expiry date.** A client who accepts in March a quote you wrote in October expects October's price.
- **One lump sum.** "Paint three rooms: $2,353" gives you nothing to point to when the client asks for a fourth wall.
- **Vague exclusions.** If ceilings are not included, say so.
- **Changing the quote by text message.** Send a revised quote with a new number.
- **Starting work unaccepted.** Get a signature or a written "yes" first.

Every quote should describe work you will actually do at the price you will actually charge.`,
    faqs: [
      {
        q: "What is the difference between a quote and an estimate?",
        a: "A quote is a fixed price for a defined scope, usually valid until a stated date. An estimate is an informed guess that can change once the work starts. Both come before the work; the invoice comes after.",
      },
      {
        q: "How long should a job quote be valid?",
        a: "Pick a period that matches how fast your costs change and print it on the quote. Thirty days is common for trade work. For a merchant's signed written offer for goods, the UCC caps a promise to hold the offer open at three months.",
      },
      {
        q: "Is a quote legally binding?",
        a: "A quote is usually treated as an offer. Once the client accepts it, the agreed price and scope generally bind both sides, subject to your state's rules. This is general information, not legal advice.",
      },
      {
        q: "Should a quote include a deposit?",
        a: "It can. State the amount or percentage and when it is due. When the client pays, send a deposit invoice or receipt, then take the deposit off the final invoice.",
      },
      {
        q: "Can I make the invoice for a quoted job on makecepeit?",
        a: "Yes. Open the invoice template, enter the accepted lines and any approved changes, and add a paid deposit as a minus line. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
