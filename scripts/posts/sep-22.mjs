/**
 * Oct-sprint — Day 2026-09-22 (2 posts). Notion board Order 3 and 4, donation cluster.
 *   3. "501c3 donation receipt template"   210/mo · CPC $5.92 · High   -> /templates/donation-receipt
 *   4. "charity donation receipt template" 110/mo · CPC $4.85 · Medium -> /templates/donation-receipt
 *
 * Cannibalization guard: #3 overlaps the live /blog/donation-receipt-requirements
 * ("What Must a 501(c)(3) Donation Receipt Include?"). That post owns the IRS wording
 * and thresholds; this one owns the template — exempt status, EIN, what a registered
 * charity's receipt carries that a generic one does not — and links there for the rules.
 * #4 is angled at events, campaigns and quid pro quo so it does not restate #3.
 *
 * Facts from lib/templates.ts -> donation-receipt guidance (IRS Pub 1771, $250 written
 * acknowledgement, goods-or-services statement). Authorities named in prose, never linked.
 * Images: house-style Nano Banana banners — see the prompts issued with this batch.
 */

export const SEP_22 = [
  {
    slug: "501c3-donation-receipt-template",
    image: "assets/501c3-donation-receipt-template.jpeg",
    category: "small-business",
    publishedAt: "2026-09-22T09:30:00Z",
    title: "501(c)(3) Donation Receipt Template Guide",
    seoTitle: "501(c)(3) Donation Receipt Template Guide",
    seoDescription:
      "Learn what a 501(c)(3) donation receipt template should carry, from the EIN and exempt status to the goods-or-services line, with makecepeit.",
    excerpt:
      "A 501(c)(3) donation receipt template carries what a generic one does not: the organization's EIN, its recognized exempt status, and the statement a donor needs at $250 and above.",
    body: `A **501(c)(3) donation receipt template** is the acknowledgment format used by an organization that holds recognized tax-exempt status, and it carries two things a generic donation receipt often leaves out: the organization's employer identification number and a clear statement of what, if anything, the donor received in return. Everything else on it is ordinary receipt structure.

Across the United States, that difference matters because the donor's paperwork depends on it. Makecepeit lets you [create a donation receipt](/create) from a fixed layout, so the exempt-status details are entered once and repeat on every acknowledgment your organization sends.

## What Is a 501(c)(3) Donation Receipt Template?

**It is a reusable acknowledgment format for a registered tax-exempt organization, holding the EIN, legal name and required statements constant while the gift details change.**

The 501(c)(3) designation refers to a section of the tax code covering organizations recognized as exempt, including charitable, religious and educational bodies. A nonprofit in Chicago that has received a determination letter is describing something specific when it puts that on a receipt, and it should only appear where the status genuinely applies.

### Why the template differs from a generic one

A generic donation receipt records a gift. A 501(c)(3) template also identifies the recipient in a way a donor can verify — legal name as registered, EIN, and address. Those fields rarely change, which is exactly why they belong in a template rather than being retyped each time.

### Who can put the label on a receipt

Only an organization that actually holds the recognition should describe itself that way. A group that has applied but not yet received a determination may be operating in good faith and still have no business printing the status on an acknowledgment. Where an application is pending, the honest course is to say so, issue a plain receipt recording the gift, and reissue later if the status is granted.

## What Should a 501(c)(3) Donation Receipt Include?

- **Legal organization name** as it appears on the determination letter
- **Employer identification number**, commonly labelled EIN
- **Organization address** and, optionally, a contact line
- **Donor name**, and address where records are kept
- **Date the contribution was received**
- **Amount** for cash, or a **description** of donated property
- **A goods-or-services statement** covering what the donor got back
- **Receipt or acknowledgment number** for internal tracking
- **An authorized name or signature line**

> Most receipts that cause a donor trouble are not missing the amount — they are missing the sentence about whether anything was provided in exchange for the gift.

### Fields that are optional but useful

A fund or campaign designation helps both sides later, and may matter a great deal for organizations running several appeals at once. A short note on the method of payment is similarly cheap to include and saves reconciliation work in the new year.

## Why 501(c)(3) Receipts Matter in the United States

**For a single contribution of $250 or more, the donor generally needs a written acknowledgment from the organization, and it needs to address goods or services.**

IRS Publication 1771 sets out that threshold and the content of the acknowledgment. The statement about whether the organization provided anything in return is the part that is most often skipped and most often needed. A receipt that records $400 but says nothing on that point is incomplete for a donor who intends to claim it.

Below $250 a written acknowledgment is generally not required, though most organizations send one anyway. Nonprofits in New York, Texas and Florida also answer to state charity regulators whose registration and reporting rules vary, so confirm what your own state expects rather than assuming the federal picture covers everything.

A receipt documents what the organization received. It does not establish that any particular donor can deduct the gift, which depends on their circumstances and is properly a question for their tax professional.

## EIN, Exempt Status and What You Can Safely State

**State your status and your EIN; avoid stating the donor's tax outcome.**

The safe construction names the organization, its EIN, and the facts of the gift. The unsafe one tells the donor the contribution is deductible, because deductibility turns on facts the organization does not hold. Accuracy here is what keeps an acknowledgment credible.

| Safe to state | Better left off |
|---|---|
| Legal name and EIN | "This gift is tax deductible" |
| Date the gift was received | A value you assigned to donated goods |
| Cash amount received | A promise about the donor's return |
| Description of donated property | Status the organization has not been granted |
| Whether goods or services were given | Language implying an audit will pass |

## How to Build the Template

1. **Confirm your legal name** against the determination letter, not the website.
2. **Enter the EIN** once, and check it digit by digit.
3. **Add the organization address** and contact details.
4. **Create labelled fields** for donor, date and amount.
5. **Add a description field** for non-cash gifts, with no value box.
6. **Print the goods-or-services statement** in the footer by default.
7. **Add a numbering scheme** you can follow for a full year.
8. **Test it on a real past gift** before sending anything new.

![A 501(c)(3) donation receipt template shown as a clean banner layout, with the organization legal name and EIN in the header, labelled donor and gift date rows, a highlighted total received line, and a footer statement confirming that no goods or services were provided in exchange for the contribution.](assets/501c3-donation-receipt-template-2.jpeg)

Building it from a [donation receipt generator](/templates/donation-receipt) removes the retyping, which is where the EIN and the legal name most often drift.

## Cash Gifts vs Donated Property

A cash gift is straightforward: the receipt states the amount. Donated property is where organizations overstep, usually with good intentions.

- **Describe the item** — quantity, type and condition
- **Do not assign a dollar value** on the organization's behalf
- **Record the date received**, which fixes the tax year
- **Note any conditions** attached to the gift

A food bank in Houston receiving a pallet of canned goods can accurately say what arrived and when. What it is generally not positioned to say is what that pallet was worth, and the donor is the one who determines that.

## Recurring, Designated and Restricted Gifts

**A template that handles only one-off gifts will struggle the first time a donor gives monthly or restricts a gift to a particular program.**

Recurring giving raises a design question worth settling early: does each charge produce its own acknowledgment, or does the donor receive a periodic summary? Many organizations do both, sending an automated receipt per charge and a consolidated statement in January.

Designated gifts add a second field. Where a donor specifies that a contribution supports a particular program, the acknowledgment should record that designation, because it is part of what the organization agreed to.

- **Name the fund or program** the gift was directed to
- **Record any conditions** the donor attached in writing
- **Keep the designation** consistent with your internal accounting
- **Flag restricted gifts** so they are not spent generally

### When a donor asks for a replacement

Requests for duplicates arrive constantly, usually in filing season. A template with sequential numbering makes this a lookup rather than a reconstruction. Reissue the original details rather than writing a fresh acknowledgment with today's date, and mark the copy as a duplicate so two versions of one gift do not circulate.

## Quid Pro Quo Gifts and the $75 Line

A quid pro quo contribution is part gift and part purchase — a benefit dinner being the standard example. Where such a payment exceeds $75, the organization generally provides a written disclosure with a good-faith estimate of the value of the benefit.

### Estimating the benefit honestly

The estimate is based on what the benefit would cost in the open market, not what the organization paid. A dinner donated by a restaurant in Miami is still valued at roughly what that dinner sells for. Template a benefits line once and these events stop being a scramble.

## Year-End Statements for 501(c)(3) Organizations

**A year-end statement summarizes a donor's giving; it does not replace acknowledgments for individual large gifts.**

List each gift by date and amount rather than presenting one annual figure, because the $250 threshold applies per contribution. A donor who gave $100 monthly and $300 once in October needs to see that October gift identified separately.

## Keeping Records the Template Depends On

**An acknowledgment is only as good as the record behind it.**

The receipt is the document the donor sees; the organization's own log is what makes it defensible later. Those two should agree on every gift, and the quickest way to guarantee they do not is to let them be maintained by different people in different places.

- **Log every acknowledgment** with its number, donor, date and amount
- **Reconcile the log** against bank deposits at least monthly
- **Store copies** in a format still readable in several years
- **Record who issued** each acknowledgment where several people can
- **Keep good-faith estimates** for benefit events alongside the event file

Retention periods vary by organization and by state, and a professional can advise on what applies. As a practical floor, an organization that cannot produce a copy of an acknowledgment a donor received two years ago has a records problem rather than a template problem.

## Why Use makecepeit for 501(c)(3) Receipts?

- **Reusable organization details**, so the EIN and legal name are typed once
- **Donation-specific fields** instead of a retail sales form
- **A footer statement** for the goods-or-services line by default
- **Consistent layout** across every acknowledgment you issue
- **PDF and PNG output** for emailing or printing
- **In-browser editing** with nothing to install

The tool documents contributions your organization actually received. It is a record-keeping aid, not a way to produce an acknowledgment for a gift that did not happen, and the accuracy of the name, date and amount is what gives the document any value.

### Numbering that survives a year

Sequential numbering sounds trivial until two people issue acknowledgments in the same week. Pick a scheme that encodes the year, run it from a single source, and never reuse a number even after a correction. An organization issuing a few hundred acknowledgments annually will thank itself the first time a donor calls about a gift from eighteen months ago.

## Tips Before Sending

- **Verify the EIN** on the template once a year against your records
- **Match the legal name** to the determination letter exactly
- **Send within a few weeks** of receiving the gift
- **Use the date received**, not the date you processed it
- **Keep a retrievable copy** of everything sent
- **Mask payment details** — no full card numbers on an acknowledgment
- **Review wording annually** against current guidance

## Common Mistakes to Avoid

- **Omitting the goods-or-services statement** on gifts of $250 or more
- **Printing "tax deductible"** as though the organization could certify it
- **Valuing donated property** for the donor
- **Using a trading name** where the legal name belongs
- **Transposing EIN digits**, which is easy and quietly damaging
- **Skipping the $75 disclosure** on benefit events
- **Letting volunteers keep private copies** of the template
- **Dating the receipt** to the deposit rather than the gift

## Final Takeaway

A 501(c)(3) donation receipt template earns its place by making the unchanging parts unchanging: legal name, EIN, and the sentence about goods and services. Get those fixed, record the date the gift actually arrived, describe property rather than pricing it, and leave the donor's tax conclusion to the donor. Requirements vary by state and by organization, so confirm specifics with a tax professional. For the exact wording and thresholds, the companion piece on [501(c)(3) receipt requirements](/blog/donation-receipt-requirements) goes deeper on the rules themselves.

## Create 501(c)(3) Receipts With makecepeit

Set your legal name, EIN and address once, then enter each gift as it arrives. Open the [donation receipt generator](/create) and keep every acknowledgment consistent from the first gift of the year to the last.`,
    faqs: [
      { q: "What is a 501(c)(3) donation receipt template?", a: "It is a reusable acknowledgment format for a recognized tax-exempt organization, holding the legal name, EIN and required statements constant while donor and gift details change." },
      { q: "Does a donation receipt need an EIN?", a: "Including the EIN is common practice and helps a donor identify the organization. Requirements vary, so confirm what applies to your organization and state." },
      { q: "What is the $250 acknowledgment rule?", a: "For a single contribution of $250 or more, a donor generally needs a written acknowledgment stating whether the organization provided goods or services in return." },
      { q: "Can a receipt say a gift is tax deductible?", a: "Better not to. Deductibility depends on the donor's circumstances and the organization's status, neither of which a receipt establishes on its own." },
      { q: "Should the receipt value donated goods?", a: "Generally no. The organization describes the property and the donor determines its value, usually with their own tax adviser." },
      { q: "What is the $75 quid pro quo rule?", a: "Where a payment is part gift and part purchase and exceeds $75, the organization generally provides a written disclosure estimating the value of the benefit received." },
      { q: "Do small gifts need acknowledgments?", a: "A written acknowledgment is generally not required below $250, though many organizations send one so donors have a clear record." },
      { q: "Is a year-end statement enough on its own?", a: "It helps, but it should itemize each gift by date and amount, because the $250 threshold applies per contribution rather than to the annual total." },
      { q: "Which name goes on the receipt?", a: "The legal name as it appears on the determination letter, rather than a trading name, informal shorthand or campaign branding." },
      { q: "Can makecepeit produce 501(c)(3) receipts?", a: "Yes. It stores your organization details, uses donation-specific fields and prints the goods-or-services footer, for documenting gifts your organization genuinely received." },
    ],
  },
  {
    slug: "charity-donation-receipt-template",
    image: "assets/charity-donation-receipt-template.jpeg",
    category: "small-business",
    publishedAt: "2026-09-22T14:00:00Z",
    title: "Charity Donation Receipt Template Essentials",
    seoTitle: "Charity Donation Receipt Template Essentials",
    seoDescription:
      "Learn what a charity donation receipt template needs for events, appeals and in-kind gifts, including benefit disclosures, with makecepeit tools.",
    excerpt:
      "A charity donation receipt template has to survive more than simple cash gifts: benefit dinners, sponsorships, auctions and donated goods each change what the acknowledgment must say.",
    body: `A **charity donation receipt template** is the acknowledgment format a charitable organization reuses across everything it receives, and the reason it needs designing carefully is that charities rarely receive only straightforward cash. Appeals, benefit events, sponsorships, auctions and donated goods each change what the receipt has to say.

Across the United States, a template that handles only the simple case quietly fails at the moments that matter most — the gala, the auction, the truckload of donated stock. Makecepeit lets you [build a donation receipt](/create) from a consistent layout so those cases are handled the same way every time.

## What Is a Charity Donation Receipt Template?

**It is a reusable acknowledgment layout that records who gave, what was given, when, and what the donor received in return, if anything.**

The last clause is what separates a charity template from a generic receipt. Charities routinely give something back — a meal, a ticket, a tote bag — and the acknowledgment has to reflect that honestly rather than treating every payment as a pure gift.

### One template, several gift types

Rather than maintaining separate documents, most organizations build one template with optional sections: a description field that stays blank for cash, a benefits line that stays blank for pure gifts. A charity in Seattle running both a mail appeal and an annual dinner can then use a single format across both.

## What Should a Charity Donation Receipt Include?

- **Charity name and address** as registered
- **Tax identification number** where applicable
- **Donor name** and contact details on file
- **Date the gift was received**
- **Amount** for cash gifts, in figures
- **Description of donated property**, with no value assigned
- **Benefit received**, where the donor got something back
- **Fund or appeal designation**, where several are running
- **Receipt number** for internal reconciliation

> A receipt that describes a $200 gala ticket as a $200 donation overstates the gift, and the fix is a single extra line naming what the donor received.

## Cash, In-Kind and Benefit Gifts Compared

| Gift type | What the receipt states | What it must avoid |
|---|---|---|
| Cash appeal gift | Exact amount and date | Nothing unusual |
| In-kind goods | Description and condition | Assigning a dollar value |
| Benefit event | Payment and benefit estimate | Treating the whole sum as a gift |
| Sponsorship | Amount and what was provided | Ignoring advertising value |
| Auction purchase | Amount paid for the item | Calling the full price a donation |

### Where charities most often slip

Auctions and sponsorships. A winning bid is largely a purchase, and a sponsorship that buys logo placement is partly advertising. Both are legitimate and both need describing accurately rather than being recorded as clean gifts.

## Why Charity Receipts Matter in the United States

**In the U.S., the acknowledgment is what connects the charity's record to whatever the donor does next.**

IRS Publication 1771 describes a written acknowledgment for single contributions of $250 or more, carrying a statement about goods or services provided in return. Separately, where a payment is part gift and part purchase and exceeds $75, a written disclosure with a good-faith estimate of the benefit generally applies. Those two thresholds cover most of what a charity issues.

State oversight adds another layer. Charities operating in California, New York and Florida register and report under rules that vary, and a template does not satisfy those obligations by itself. Treatment differs by organization and by state, and a professional is better placed than any template to confirm the specifics.

## How to Handle a Benefit Event on the Receipt

1. **Set the ticket price** and record it as the amount paid.
2. **Estimate the benefit** at open-market value, not cost to you.
3. **State both figures** clearly on the acknowledgment.
4. **Name the benefit** — dinner, entertainment, merchandise.
5. **Issue the disclosure** where the payment exceeds $75.
6. **Keep the estimate** on file with the event records.
7. **Use the same method** for every ticket sold that year.

![A charity donation receipt template displayed as a clean banner layout, showing the charity name and address in the header, donor and gift date rows, an amount received line highlighted in green, and a separate line naming the benefit the donor received at the event.](assets/charity-donation-receipt-template-2.jpeg)

A [donation receipt generator](/templates/donation-receipt) keeps the charity details constant so only the gift and benefit lines change between attendees.

### Handling partially refunded events

Cancelled events complicate acknowledgments more than most organizations expect. Where a ticket is refunded, the acknowledgment for that payment should be corrected rather than left standing, since nothing was ultimately given or received. Where a ticket holder declines the refund and lets the charity keep the payment, the picture changes again: the benefit was never delivered, so more of the payment may now be a gift. Both cases are ordinary, and both are easier when the template numbers its receipts.

## Sponsorships and Corporate Gifts

A corporate sponsorship sits awkwardly between a gift and a purchase. Where the sponsor receives meaningful advertising, part of the payment may be something other than a contribution.

- **Describe what the sponsor received** — signage, listing, placement
- **Avoid characterizing the whole payment** as a donation
- **Keep the agreement** alongside the acknowledgment
- **Be consistent** across sponsors at the same level

A community charity in Austin listing sponsors in a program is providing something of value, and saying so costs nothing while making the record defensible.

## Pledges, Matching Gifts and Payroll Giving

**A pledge is a promise; the receipt belongs to the payment, not the promise.**

Charities routinely record pledges in their fundraising systems and then acknowledge each payment as it arrives. Issuing an acknowledgment when the pledge is made, rather than when money changes hands, misstates what the organization has actually received.

Matching gifts introduce a second donor. Where an employer matches an employee's contribution, there are two separate gifts from two separate givers, and generally two separate acknowledgments.

| Arrangement | Who gets the receipt | What it records |
|---|---|---|
| Direct gift | The individual donor | Amount and date received |
| Pledge payment | The donor, per payment | Each payment as it arrives |
| Employer match | The employer | The employer's own contribution |
| Payroll deduction | Usually the employee | Amounts actually deducted |
| Donor-advised fund | The sponsoring organization | The grant as received |

### Payroll giving in practice

Workplace giving programs deliver one aggregated payment covering many employees, and the charity often cannot see the split. Where the employer supplies a schedule, individual acknowledgments become possible. Where it does not, acknowledging the employer for the payment received is generally the accurate option, and the employees rely on their own payroll records.

## In-Kind Gifts: Describe, Don't Price

**The charity describes the property; the donor determines what it was worth.**

This holds whether the gift is a box of coats or a used vehicle. The acknowledgment records quantity, type, condition and date received. Anything beyond that is a valuation the organization is generally not positioned to make and does not need to.

### Recording condition honestly

"Twelve winter coats, new and unused" is a better record than "clothing donation". It is also more useful to the donor, because it describes what actually changed hands.

## Donations Through Platforms and Third Parties

**When money arrives through a platform, the question is who actually received the gift and who should acknowledge it.**

Charities now receive contributions through payment processors, crowdfunding pages, workplace portals and donor-advised funds, and each routes the money differently. The acknowledgment should follow the money rather than the marketing.

- **Direct processor payments** are generally gifts from the named donor
- **Crowdfunding campaigns** may pass through an intermediary before reaching you
- **Donor-advised fund grants** come from the sponsoring organization, not the individual
- **Anonymous platform gifts** may arrive without donor details at all
- **Processing fees** reduce what you receive but not necessarily what was given

### Fees and the amount you acknowledge

A donor who gives $100 through a processor that deducts a fee has still given $100, even though roughly $97 lands in the account. The acknowledgment generally records what the donor contributed rather than the net deposit, while the organization's books track the fee separately. Getting this backwards is a common and quietly annoying error, because donors compare the acknowledgment against their own card statement.

### Gifts that arrive without a donor name

Anonymous and platform-obscured gifts still need recording, they simply cannot be acknowledged to anybody. Log them, note the source, and keep them out of the donor file rather than guessing at an attribution. A charity in Denver receiving an unattributed transfer is better served by an honest internal record than by an acknowledgment addressed to someone who may not have given it.

## Correcting a Receipt After It Is Sent

Mistakes reach donors. The recovery is straightforward if the template supports it: reissue the acknowledgment with the original gift details corrected, mark it clearly as a replacement, and reference the original number so two documents for one gift cannot be mistaken for two gifts.

1. **Identify the original** by its receipt number.
2. **Confirm what was actually received** against the bank record.
3. **Reissue with corrected details** and today's issue date.
4. **Mark it a replacement** and cite the original number.
5. **Note the correction** in your internal log.
6. **Tell the donor** briefly what changed and why.

## Why Use makecepeit for Charity Receipts?

- **One layout** covering cash, in-kind and benefit gifts
- **Stored charity details**, so the header is typed once
- **A footer statement** for the goods-or-services line
- **Room for a benefit line** on event acknowledgments
- **PDF and PNG output** for post or email
- **No software to install** — it runs in the browser

Makecepeit is for documenting gifts a charity genuinely received. An accurate donor name, a real date and a true amount are what make the acknowledgment worth issuing, and fabricating any of them defeats the purpose.

### Training whoever issues them

The template carries the rules, but a volunteer who does not know why the goods-or-services line exists will delete it to make room. A short written note kept with the template, explaining which lines are required and why, prevents most of the damage. It also survives staff turnover better than an explanation given once in a meeting.

Charities that run seasonal campaigns with temporary help should assume the template will be edited by someone unfamiliar with it, and design accordingly: lock what matters, label what is optional, and keep the master copy somewhere edits cannot overwrite it.

## Tips Before Your Next Appeal

- **Decide the benefit language** before tickets go on sale
- **Agree who signs off** on good-faith estimates
- **Number receipts** sequentially from the start of the year
- **Describe property** rather than valuing it
- **Send promptly** while the gift is fresh for the donor
- **Store copies** somewhere retrievable a year later
- **Review the template** at the start of each campaign

## Common Mistakes to Avoid

- **Recording a full ticket price** as a charitable gift
- **Skipping the benefit disclosure** above $75
- **Assigning values** to donated goods
- **Treating auction wins** as straightforward donations
- **Ignoring sponsorship benefits** in the acknowledgment
- **Using inconsistent estimates** across the same event
- **Dating to the deposit** rather than the gift
- **Implying deductibility** the charity cannot certify

## Final Takeaway

A charity donation receipt template is worth building around the hard cases rather than the easy ones. Cash gifts look after themselves; dinners, auctions, sponsorships and donated goods are where the acknowledgment either holds up or does not. Name the benefit, describe property without pricing it, use the date the gift arrived, and let the donor's adviser handle the tax conclusion. Rules differ by state and organization, so confirm the specifics professionally. If your organization holds recognized exempt status, the companion guide to the [501(c)(3) donation receipt template](/blog/501c3-donation-receipt-template) covers the EIN and status fields in detail.

## Create Charity Receipts With makecepeit

Set your charity details once and handle every gift type from one layout. Open the [donation receipt generator](/create) and send acknowledgments your donors can actually file.`,
    faqs: [
      { q: "What is a charity donation receipt template?", a: "A reusable acknowledgment layout a charity uses for every gift it receives, recording the donor, the date, what was given, and any benefit provided in return." },
      { q: "How do I receipt a benefit dinner ticket?", a: "Record the amount paid, then state a good-faith estimate of the benefit received. Above seventy-five dollars, a written disclosure generally applies." },
      { q: "Is an auction purchase a donation?", a: "Largely not. A winning bid is mostly a purchase, so the acknowledgment should describe what was bought rather than treating the full price as a gift." },
      { q: "How should sponsorships be acknowledged?", a: "Describe what the sponsor received, such as signage or a program listing, instead of characterizing the whole payment as a charitable contribution." },
      { q: "Can a charity value donated goods?", a: "Generally not. The charity describes the property, its quantity and condition, and the donor determines its value with their own adviser." },
      { q: "What does the goods-or-services line do?", a: "It states whether the donor received anything in return. It is the part donors most need on single gifts of two hundred fifty dollars or more." },
      { q: "Do charities need to register with states?", a: "Many do. Registration and reporting requirements vary by state, so confirm what applies where your charity solicits rather than assuming." },
      { q: "When should acknowledgments be sent?", a: "Generally within a few weeks of receiving the gift. Prompt acknowledgment also spares donors from reconstructing gifts from bank records later." },
      { q: "Should each appeal have its own template?", a: "Usually not. One template with optional description and benefit lines handles appeals, events and in-kind gifts more consistently than separate documents." },
      { q: "Can makecepeit handle event receipts?", a: "Yes. The donation layout has room for the amount received and a separate benefit line, for documenting gifts and events your charity genuinely ran." },
    ],
  },
];
