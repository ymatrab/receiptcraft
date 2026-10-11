/**
 * Day 2026-11-02, slot a (09:30Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "donation acknowledgement letter"   390/mo
 *   "donation receipt letter"            90/mo
 *   "how to write a donation receipt"    50/mo
 *   -> owner /templates/donation-receipt; links /blog/501c3-donation-receipt-template
 * Angle: letter format with sample wording, for the nonprofit writing it.
 *
 * Facts checked 2026-10-11:
 *   - IRS, Charitable contributions: written acknowledgments,
 *     https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments :
 *     contents (org name, cash amount, description of non-cash gift without value, statement
 *     of no goods/services or description and good-faith estimate, intangible religious
 *     benefit statement); page points to Publication 1771 for the full rules.
 *   - IRS, Quid pro quo contributions,
 *     https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-quid-pro-quo-contributions :
 *     disclosure required for payments over $75 partly for goods/services; must state the
 *     deductible limit and a good-faith estimate; penalty $10 per contribution, max $5,000
 *     per fundraising event or mailing.
 *   - IRS Pub 526 (2025), https://www.irs.gov/publications/p526 : $250+ needs a contemporaneous
 *     written acknowledgment received by the earlier of filing date or due date incl.
 *     extensions; separate gifts not combined; one acknowledgment may list each gift with
 *     dates and a total; orgs typically send by Jan 31; if the acknowledgment has no date
 *     the donor also needs a bank record showing it.
 *   Pub 1771 PDF could not be text-extracted here; the two IRS pages above summarize it.
 */

export const NOV_2A_DONATION_ACK_LETTER = [
  {
    slug: "donation-acknowledgement-letter",
    image: "assets/donation-acknowledgement-letter.jpeg",
    category: "small-business",
    publishedAt: "2026-11-02T09:30:00Z",
    title: "Donation Acknowledgement Letter: Format, Sample Wording and IRS Rules",
    seoTitle: "Donation Acknowledgement Letter: Sample + IRS Rules",
    seoDescription:
      "How to write a donation acknowledgement letter: what the IRS requires for gifts of $250 or more, sample wording, quid pro quo over $75, and year-end timing.",
    excerpt:
      "A donation acknowledgement letter is how a nonprofit gives donors the written record the IRS requires. Here is what it must say, sample wording you can adapt, and when to send it.",
    body: `**A donation acknowledgement letter is a written thank-you from a charity that doubles as the donor's tax record. For any single gift of $250 or more, the IRS requires it to state the organization's name, the amount of cash given (or a description of donated property, without a value), and whether the donor received any goods or services in return, with a good-faith estimate of their value if so.** You can produce the same information as a receipt with our [donation receipt template](/templates/donation-receipt), or put it in a letter using the sample below.

The donor, not the charity, loses the deduction if the letter is missing, which is why donors ask for it. The rules come from the IRS page on [written acknowledgments](https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments), which points to Publication 1771 for the full detail, and from [Publication 526](https://www.irs.gov/publications/p526) on the donor's side.

## What the Letter Must Include

| Element | Example |
|---|---|
| Organization's name | Riverbend Food Pantry |
| Donor's name | Alex Romero |
| Date of the gift | Dec 12, 2026 |
| Cash amount | $500.00 |
| Non-cash gift description | "Two boxes of canned goods and a used office desk" (no value) |
| Goods or services statement | "No goods or services were provided in exchange for this contribution." |
| If something was provided | Description and good-faith estimate of its value |

Good practice adds the organization's address and EIN and a line confirming 501(c)(3) status, so the donor can check it. For non-cash gifts, describe the item and leave the valuation to the donor.

## Sample Donation Acknowledgement Letter

> Riverbend Food Pantry · 40 Water St, Hartford, CT · EIN 00-0000000
>
> December 15, 2026
>
> Dear Alex Romero,
>
> Thank you for your gift of **$500.00**, received on **December 12, 2026**. Your support keeps our weekend meal program running through the winter.
>
> No goods or services were provided in exchange for this contribution.
>
> Riverbend Food Pantry is a tax-exempt organization under section 501(c)(3) of the Internal Revenue Code. Please keep this letter for your tax records.
>
> With thanks,
> Sam Okafor, Treasurer

Replace the example details with your own. For the bare minimum layout, see our [501(c)(3) donation receipt template](/blog/501c3-donation-receipt-template).

## When the Donor Got Something Back

If a donor pays more than $75 and receives something in return, such as a gala dinner, the IRS calls it a [quid pro quo contribution](https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-quid-pro-quo-contributions). The charity must give a written statement that:

- tells the donor the deductible amount is limited to what they paid above the value of the goods or services, and
- gives a good-faith estimate of that value.

Sample wording: "Your payment of $150.00 included a dinner with an estimated fair market value of $60.00. The amount of your contribution that may be deductible is $90.00."

The IRS penalty for skipping this is $10 per contribution, up to $5,000 per fundraising event or mailing. Token items and intangible religious benefits have their own exceptions, explained on the same IRS page.

## Timing: Year-End and Multiple Gifts

Pub 526 says the acknowledgment counts as contemporaneous only if the donor receives it by the earlier of the date they file their return or the return's due date, including extensions. It also notes that organizations typically send them by January 31 of the following year.

Separate gifts are not added together to reach $250. A donor who gives $25 a week does not need a letter for each one. A donor who made several gifts of $250 or more can receive one year-end letter listing each gift and its date, plus the total.

## How to Write One, Step by Step

1. Use your letterhead with the organization's legal name and address.
2. Address the donor by full name and date the letter.
3. State the amount and the date the gift was received.
4. Describe any non-cash property, without assigning a value.
5. Add the goods-or-services sentence, or the quid pro quo disclosure.
6. Sign it and keep a copy in your donor records.

Our guide to [donation receipt requirements](/blog/donation-receipt-requirements) covers smaller gifts and non-cash donations in more depth.

## Producing Letters or Receipts in Bulk

Small nonprofits often send a receipt at the time of the gift and a summary letter in January. You can build a donation receipt on [makecepeit](/create) for free; a watermark-free download needs an account. Every acknowledgment must reflect a gift actually received.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What is a donation acknowledgement letter?",
        a: "A written thank-you from a charity that records the gift for the donor's taxes. For gifts of $250 or more it must meet specific IRS content rules.",
      },
      {
        q: "What must a donation acknowledgement letter include?",
        a: "The organization's name, the cash amount or a description of donated property, and a statement of whether any goods or services were provided, with a good-faith estimate of their value if so.",
      },
      {
        q: "Does the letter need to include the value of donated items?",
        a: "No. The charity describes non-cash property but does not value it. Valuing the donation is the donor's responsibility.",
      },
      {
        q: "When is a donation acknowledgement required?",
        a: "For any single contribution of $250 or more that the donor wants to deduct. Separate smaller gifts are not added together.",
      },
      {
        q: "When should a charity send the letter?",
        a: "The donor needs it by the earlier of their filing date or the return's due date. Organizations typically send them by January 31.",
      },
      {
        q: "Can one letter cover several donations?",
        a: "Yes. A single year-end letter can list each gift with its date and show the total.",
      },
      {
        q: "What is a quid pro quo disclosure?",
        a: "A statement required when a donor pays more than $75 and gets something back. It explains that only the amount above the value received may be deductible and estimates that value.",
      },
      {
        q: "What is the penalty for not giving a quid pro quo disclosure?",
        a: "$10 per contribution, up to $5,000 per fundraising event or mailing, unless the failure was due to reasonable cause.",
      },
      {
        q: "Can the acknowledgement be sent by email?",
        a: "The IRS requires it to be written. Many charities send it by email or post; keep a copy either way.",
      },
      {
        q: "Is a donation receipt the same as an acknowledgement letter?",
        a: "They serve the same purpose. A receipt can meet the rules if it contains the required statements; a letter adds a personal thank-you.",
      },
    ],
  },
];
