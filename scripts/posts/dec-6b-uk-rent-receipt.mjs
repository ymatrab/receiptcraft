/**
 * Day 2026-12-06, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "rent receipt uk", "rent receipt template uk", "do landlords have to give rent receipts uk"
 *   -> owner /templates/rent-receipt; links /blog/how-to-write-a-rent-receipt (US/general,
 *      Jul 2026), /blog/security-deposit-receipt, /blog/how-long-to-keep-receipts-uk (Dec 2)
 * Angle: England-focused. The weekly-rent rent book duty (statute), what a UK rent receipt
 * should show, deposit protection paperwork, worked example in £.
 * Product check (origin/main, 2026-10-13): /templates/rent-receipt defaults are US (Seattle
 * address, no currency set), tax 0, "Received by" line, one "Monthly Rent" item. Post tells
 * readers to pick British Pound (£) in Settings > Currency and replace the sample details;
 * line items and detail rows are editable. No heading change is claimed.
 *
 * Facts checked 2026-10-13:
 *   - Landlord and Tenant Act 1985 s.4, https://www.legislation.gov.uk/ukpga/1985/70/section/4
 *     (up to date to 12 Oct 2026 per legislation.gov.uk): where a tenant has a right to occupy
 *     premises as a residence for a rent payable weekly, the landlord shall provide a rent book
 *     or other similar document; not where rent includes board forming a substantial
 *     proportion of the rent; tenant includes statutory tenant and contractual occupier;
 *     s.4(4) does not apply to occupation contracts under the Renting Homes (Wales) Act 2016.
 *   - s.5, https://www.legislation.gov.uk/ukpga/1985/70/section/5 : rent book must contain the
 *     name and address of the landlord, and for restricted contracts, protected/statutory or
 *     assured tenancies, prescribed notices in prescribed form.
 *   - s.7, https://www.legislation.gov.uk/ukpga/1985/70/section/7 : failure is a summary offence,
 *     fine up to level 4 on the standard scale; also an offence for someone demanding or
 *     receiving rent on the landlord's behalf while the requirement is not met.
 *   - GOV.UK, Tenancy deposit protection, https://www.gov.uk/tenancy-deposit-protection :
 *     landlord must use a government-approved TDP scheme if you rent on an assured periodic
 *     tenancy; APTs replaced assured shorthold tenancies on 1 May 2026; England and Wales
 *     schemes: Deposit Protection Service, MyDeposits, Tenancy Deposit Scheme; protect within
 *     30 days; return within 10 days of agreeing the amount; holding deposits need not be
 *     protected until tenancy starts; third-party deposits must be protected; separate schemes
 *     in Scotland and Northern Ireland.
 *   - GOV.UK, Tenancy deposit protection: information landlords must give tenants,
 *     https://www.gov.uk/tenancy-deposit-protection/information-landlords-must-give-tenants :
 *     within 30 days: property address, deposit amount, how protected, scheme name and
 *     contact + dispute service, landlord/agent name and contact, third-party payer, reasons
 *     for keeping deposit, how to apply for it back, what to do if landlord unreachable, what
 *     to do in a dispute.
 *   - GOV.UK, Private renting: your rights and responsibilities,
 *     https://www.gov.uk/private-renting/your-rights-and-responsibilities : tenants must pay
 *     the agreed rent even if repairs are needed or in dispute; right to know who the landlord
 *     is (write to whoever you pay rent to; landlord can be fined if not given within 21 days).
 * Not stated: the £ value of a level 4 fine, deposit caps, Scottish/NI rent book rules (not
 * verified in this session). Monthly-rent receipts presented as good practice, not law.
 * Sample names and amounts are fictional.
 */

export const DEC_6B_UK_RENT_RECEIPT = [
  {
    slug: "uk-rent-receipt",
    image: "assets/uk-rent-receipt.jpeg",
    category: "legal",
    publishedAt: "2026-12-06T14:00:00Z",
    title: "Rent Receipts in the UK: Rent Books, What to Include and Deposits",
    seoTitle: "Rent Receipt UK: Rent Books, Fields and Deposits",
    seoDescription:
      "When UK landlords must give a rent book, what a rent receipt should show, the deposit protection paperwork tenants should get, and a sample in pounds.",
    excerpt:
      "In England a landlord who charges rent weekly must provide a rent book. For monthly rent a receipt is good practice rather than law. Here is what a UK rent receipt should show, the deposit paperwork to expect, and a sample.",
    body: `**In England, if rent is payable weekly the landlord must provide a rent book or similar document, under section 4 of the Landlord and Tenant Act 1985; failing to do so is a criminal offence. For rent paid monthly there is no equivalent duty in that Act, but a written receipt is still the simplest proof of payment. A good UK rent receipt shows the landlord's name and address, the tenant, the property, the period covered, the amount, the payment method and the date received.** You can fill these in on the [rent receipt template](/templates/rent-receipt) and switch the currency to pounds.

For the general version of this guide, written for US readers, see [how to write a rent receipt](/blog/how-to-write-a-rent-receipt).

## When a rent book is required

The [Landlord and Tenant Act 1985, section 4](https://www.legislation.gov.uk/ukpga/1985/70/section/4) says that where a tenant occupies a home in return for rent payable weekly, the landlord must provide a rent book or other similar document. Three details matter:

- **It is about weekly rent.** Monthly or quarterly rent does not trigger the duty.
- **Board is an exception.** If the rent includes meals and they make up a substantial part of the rent, the duty does not apply.
- **Wales is different.** The section does not apply to occupation contracts under the Renting Homes (Wales) Act 2016.

Section 5 says the rent book must give the landlord's name and address, and for most tenancy types it must also carry notices in a form set by regulations. Under section 7, a landlord who fails to comply commits an offence and can be fined. So can anyone who demands or receives rent for the landlord, such as an agent, while the rent book requirement is not met, unless they did not know and had no reason to suspect it.

Scotland and Northern Ireland have their own housing law, which this guide does not cover.

## What a UK rent receipt should show

Whether you use a rent book or one receipt per payment, these fields stop most disputes:

| Field | Why it matters |
|---|---|
| Landlord's name and address | Required in a rent book, and tenants have a right to know who their landlord is |
| Tenant's name | As on the tenancy agreement |
| Property address | Including flat or room number |
| Period covered | "Rent for week commencing 2 November 2026" or "Rent for November 2026" |
| Amount received | In pounds; note any part payment and the balance still due |
| Payment method | Cash, bank transfer, standing order, cheque |
| Date received | The day the money arrived, not the due date |
| Received by | Name, and signature on paper receipts |
| Receipt number | Makes each payment easy to find later |

Cash is where receipts matter most. A bank transfer leaves a record on both sides; cash leaves none. If you pay rent in cash, ask for a receipt every time.

GOV.UK reminds tenants that they must pay the agreed rent even when they are in dispute with the landlord or waiting for repairs. A receipt for every payment is the tenant's evidence that they did.

## Worked example: a weekly room let

Sam Okafor (a sample tenant) rents a room in Leeds for £185 a week, paid in cash every Monday. Because the rent is weekly, the landlord, Helen Price (also a sample), must provide a rent book. She keeps one and also hands Sam a receipt each week:

| Rent receipt RR-2026-046 | |
|---|---|
| Landlord | Helen Price, with her address |
| Tenant | Sam Okafor |
| Property | Room 3, with the house address |
| Period | Week commencing 2 November 2026 |
| Rent received | £185.00 |
| Method | Cash |
| Date received | 2 November 2026 |
| Received by | Helen Price |

If Sam pays four weeks at once, the receipt lists each week as its own line, £740.00 in total, so there is no doubt which weeks are covered.

## Deposit receipts and protection

Paying a deposit should leave you with two kinds of paper: a receipt for the money, and the deposit protection information.

GOV.UK's [tenancy deposit protection guide](https://www.gov.uk/tenancy-deposit-protection) says that if you rent on an assured periodic tenancy, which replaced assured shorthold tenancies on 1 May 2026, your landlord or agent must put the deposit in a government-approved scheme within 30 days. In England and Wales the schemes are the Deposit Protection Service, MyDeposits and the Tenancy Deposit Scheme.

Within the same 30 days the landlord must tell you:

- the property address and how much deposit you paid
- how the deposit is protected, and the scheme's name, contact details and dispute service
- the landlord's or agent's name and contact details
- the name and contact details of anyone else who paid the deposit
- why they might keep some or all of it, and how to apply to get it back
- what to do if you cannot reach the landlord at the end, or if there is a dispute

A holding deposit, paid to reserve a property before the agreement is signed, does not need protecting, but once you become a tenant it becomes a deposit and must be protected. At the end of the tenancy the deposit must be returned within 10 days of you both agreeing how much you get back. Our guide to [security deposit receipts](/blog/security-deposit-receipt) covers the receipt itself.

## How long to keep them

Tenants should keep rent receipts for the whole tenancy and until the deposit is settled. Landlords who declare rental income to HMRC need them as records too; see [how long to keep receipts in the UK](/blog/how-long-to-keep-receipts-uk).

## Make one in the builder

1. Open the [rent receipt template](/templates/rent-receipt) and pick British Pound (£) under Settings, then Currency.
2. Replace the sample landlord name and address with yours.
3. Add rows for the tenant, the property and the receipt number.
4. Edit the line to the period covered, for example "Rent, week commencing 2 November 2026", and the amount.
5. Set the payment method and the "Received by" name.
6. Preview it with no account. Downloading needs a free account, and your first download is watermark-free.

A rent receipt should only ever record rent that was actually paid, on the date it was paid.

This is general information, not legal advice. For your own tenancy, check GOV.UK or speak to a housing adviser.`,
    faqs: [
      {
        q: "Do landlords have to give rent receipts in the UK?",
        a: "In England, if rent is payable weekly the landlord must provide a rent book or similar document under the Landlord and Tenant Act 1985. For monthly rent there is no such duty in that Act, but asking for a receipt is sensible, especially for cash.",
      },
      {
        q: "What should a UK rent receipt include?",
        a: "The landlord's name and address, the tenant's name, the property address, the period covered, the amount in pounds, the payment method, the date received and who received it.",
      },
      {
        q: "Is it a criminal offence not to provide a rent book?",
        a: "Yes, where the duty applies. Section 7 of the Landlord and Tenant Act 1985 makes failing to provide a rent book for a weekly tenancy an offence punishable by a fine.",
      },
      {
        q: "How long does a landlord have to protect my deposit?",
        a: "GOV.UK says 30 days from receiving it, using one of the approved schemes. In England and Wales these are the Deposit Protection Service, MyDeposits and the Tenancy Deposit Scheme.",
      },
      {
        q: "Does a bank transfer count as a rent receipt?",
        a: "A bank record proves money moved, but it rarely shows the property or the period covered. A short written receipt alongside it closes that gap.",
      },
    ],
  },
];
