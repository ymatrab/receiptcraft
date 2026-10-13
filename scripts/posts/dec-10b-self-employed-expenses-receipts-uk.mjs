/**
 * Day 2026-12-10, slot b (14:00Z). Elliot writer J. UK post: British English, GBP.
 * Keyword: "self employed allowable expenses hmrc".
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /blog/self-employed-receipt-tracking, /blog/how-long-to-keep-receipts-uk
 *   (same batch, 2026-12-02), /templates/invoice, /create.
 * Angle: category-by-category table of what HMRC allows and which receipt or record proves it,
 * plus simplified expenses flat rates and what to log for them. self-employed-receipt-tracking
 * is the US-flavoured system post; this is the UK "what counts and what to keep" reference.
 * Product check: GBP is a builder currency (lib/format.ts: "British Pound (£)").
 *
 * Facts checked 2026-10-13:
 *   - GOV.UK, Expenses if you're self-employed, https://www.gov.uk/expenses-if-youre-self-employed
 *     (print view /print): categories and examples quoted in the table (office/property: phone,
 *     internet, business rates; not non-business use. Travel: vehicle insurance, fares, hotel
 *     rooms; not travel between home and work, fines. Clothing: uniforms, protective clothing;
 *     not everyday clothing. Staff: salaries, employer's NI; not nannies/domestic help. Reselling:
 *     stock, raw materials; not goods for private use. Legal/financial: professional indemnity,
 *     bank and card charges; not fines, not cost of preparing your SA return. Marketing: ads,
 *     website costs, promotional items up to £50 per recipient per year; not entertainment
 *     tickets, usually not client food/drink. Subscriptions: trade journals, related
 *     professional bodies; not gym, political parties. Training: keeps skills up to date; not
 *     starting a new business); claim only the business part of mixed costs (£70 of a £200
 *     phone bill); cannot claim expenses if you use the £1,000 trading allowance.
 *   - GOV.UK, Simplified expenses, https://www.gov.uk/simpler-income-tax-simplified-expenses/print :
 *     sole traders and partnerships with no company partners; vehicles 2026 to 2027 tax year
 *     55p first 10,000 miles (45p before 6 April 2026), 25p after, motorcycles 24p; once used
 *     for a vehicle, keep using it for that vehicle; working from home at least 25 hours a month:
 *     25-50 £10, 51-100 £18, 101+ £26 a month, phone and internet claimed separately; living at
 *     premises 1 person £350, 2 £500, 3+ £650 a month; keep records of miles, hours, occupants.
 *   - GOV.UK, Business records if you're self-employed, https://www.gov.uk/self-employed-records/print :
 *     keep records of sales/income, expenses, VAT, PAYE, personal income; proof such as "all
 *     receipts for goods and stock", bank statements, chequebook stubs, sales invoices, till
 *     rolls; keep at least 5 years after the 31 January submission deadline; records are not
 *     sent with the return.
 * Business and figures in the example are fictional.
 */

export const DEC_10B_SELF_EMPLOYED_EXPENSES_RECEIPTS_UK = [
  {
    slug: "self-employed-expenses-receipts-uk",
    image: "assets/self-employed-expenses-receipts-uk.jpeg",
    category: "taxes",
    publishedAt: "2026-12-10T14:00:00Z",
    title: "Self-Employed Allowable Expenses (HMRC): Which Receipts to Keep",
    seoTitle: "Self-Employed Allowable Expenses HMRC: Receipts to Keep",
    seoDescription:
      "HMRC's allowable expense categories for sole traders, the receipt or record that proves each one, and the simplified expenses flat rates for 2026 to 2027.",
    excerpt:
      "HMRC lets sole traders deduct allowable expenses, but only the business part and only with records. Here is each category, the receipt that backs it up, and the flat rates you can use instead of receipts for mileage and working from home.",
    body: `**HMRC's allowable expenses for the self-employed fall into nine groups: office and equipment, travel, clothing, staff, goods for resale, legal and financial costs, marketing, subscriptions and training. You can claim only the business part of a cost, and you need a record for each one: usually a receipt or invoice, backed by a bank statement. For vehicles, working from home and living at your premises, simplified expenses let you use flat rates instead, as long as you log the miles, hours or occupants.**

The other half of your records is your income, and HMRC lists sales invoices among the proof it expects. If you bill clients, an [invoice](/templates/invoice) in pounds with a number, date and description covers that side; you can [build one](/create) in the browser. The rest of this guide is about the expense side.

## The Nine Categories and What to Keep

HMRC's guide to [expenses if you're self-employed](https://www.gov.uk/expenses-if-youre-self-employed) gives examples of what you can and cannot claim in each group. The last column is the record that proves it.

| Category | Allowable (examples) | Not allowable (examples) | Receipt or record to keep |
|---|---|---|---|
| Office, property and equipment | Phone and internet bills, business rates, property insurance | Non-business use of premises or phones | Bills, with the business share marked |
| Car, van and travel | Vehicle insurance, train, bus and air fares, hotel rooms | Travel between home and work, fines | Tickets, booking confirmations, fuel receipts, mileage log |
| Clothing | Uniforms, protective clothing such as safety boots | Everyday clothing, even if worn for work | Itemised receipt naming the item |
| Staff | Salaries, employer's National Insurance | Nannies and other domestic help | Payroll records, subcontractor invoices |
| Reselling goods | Stock and raw materials | Goods bought for private use | Supplier invoices and receipts |
| Legal and financial | Professional indemnity insurance, bank and card charges | Fines, the cost of preparing your Self Assessment return | Policy schedules, bank statements |
| Marketing and entertainment | Advertising, website costs, branded gifts up to £50 per person a year | Event tickets, usually food and drink for clients | Invoices, a list of who received gifts |
| Subscriptions | Trade journals, professional body membership related to your work | Gym membership, political donations | Renewal invoices or receipts |
| Training | Courses that keep your existing skills up to date | Courses to start a new business | Course invoice and description |

Two rules apply across the table. First, mixed-use costs are split: HMRC's example is claiming £70 of a £200 phone bill spent on business calls. Second, if you use the £1,000 trading allowance, you cannot claim expenses at all.

## Simplified Expenses: Flat Rates Instead of Receipts

Sole traders and partnerships without company partners can use [simplified expenses](https://www.gov.uk/simpler-income-tax-simplified-expenses) for three kinds of cost. The record you keep changes from receipts to a log.

**Vehicles (per business mile)**

| Vehicle | 2026 to 2027 tax year | Before 6 April 2026 |
|---|---|---|
| Cars and goods vehicles, first 10,000 miles | 55p | 45p |
| Cars and goods vehicles, over 10,000 miles | 25p | 25p |
| Motorcycles | 24p | 24p |

Once you use the flat rate for a vehicle, you have to keep using it for as long as you use that vehicle for the business. Keep a mileage log with the date, journey, purpose and miles.

**Working from home (per month)**

| Business hours at home per month | Flat rate |
|---|---|
| 25 to 50 | £10 |
| 51 to 100 | £18 |
| 101 or more | £26 |

Phone and internet are not included, so claim the business share of those from the bills. Keep a record of hours worked at home each month.

**Living at your business premises (per month)**

| People living there | Flat rate |
|---|---|
| 1 | £350 |
| 2 | £500 |
| 3 or more | £650 |

## Worked Example

A sole trader running a mobile bike repair business in Leeds (fictional figures) for the 2026 to 2027 tax year:

| Expense | How it is claimed | Record kept | Amount |
|---|---|---|---|
| 6,000 business miles in own van | Flat rate, 55p a mile | Mileage log | £3,300.00 |
| Working from home, 60 hours a month | Flat rate, £18 × 12 | Hours log | £216.00 |
| Mobile phone, £30 a month, 40% business | Actual cost, business share | 12 monthly bills | £144.00 |
| Parts and tyres for resale | Actual cost | Supplier invoices | £4,850.00 |
| Public liability insurance | Actual cost | Policy schedule and receipt | £180.00 |
| Website hosting | Actual cost | Annual invoice | £96.00 |
| **Total expenses** | | | **£8,786.00** |

The van costs are covered by the 55p rate, so fuel receipts for the van are not claimed separately. Parts, insurance and hosting still need their invoices.

## Equipment, Cars and Bad Debts

Bigger purchases follow slightly different rules depending on how you keep your accounts. GOV.UK explains it like this:

- **Cash basis.** Equipment you keep for the business, such as a laptop or tools, is generally claimed as an ordinary allowable expense. A car bought for the business is the exception: you claim capital allowances on it instead.
- **Traditional accounting.** Equipment, machinery and business vehicles are claimed through capital allowances when you buy them.
- **Bad debts.** Under cash basis you only record income you have actually received, so an unpaid invoice is never counted as income and there is no bad debt to claim.

Whichever applies, keep the purchase invoice for anything you will use for several years. It shows the date, the price and exactly what you bought, which is what you need when you work out the allowance or the expense. If you later sell the item, keep the sale record with it.

## Mixed-Use Costs in Practice

Most disputes over expenses are about the business share, not the receipt. For anything you also use privately, such as a phone, broadband, a vehicle or a room at home, write down how you worked out the business percentage: a sample month of call logs, a mileage log, or the hours a room is used for work. Keep that note with the year's bills. HMRC's £70 of £200 example only holds up if you can show where the £70 came from.

## What HMRC Counts as Proof

HMRC's page on [business records](https://www.gov.uk/self-employed-records) lists the proof it expects: all receipts for goods and stock, bank statements and chequebook stubs, and sales invoices, till rolls and bank slips. You do not send these with your tax return, but you must be able to show them if HMRC asks.

Practical habits that keep each receipt usable:

- **Itemised, not just a card slip.** A card slip shows the total; the itemised receipt shows what you bought, which is what proves it was a business cost.
- **Photograph or scan on the day.** Thermal paper fades.
- **Mark the business share** on mixed bills.
- **Log flat-rate items monthly**, not at year end.

Our guide to [tracking receipts when self-employed](/blog/self-employed-receipt-tracking) sets out a weekly routine. For how long to hold on to all of this, HMRC says at least 5 years after the 31 January submission deadline for the tax year; our post on [how long to keep receipts in the UK](/blog/how-long-to-keep-receipts-uk) covers the detail.

Every receipt you keep should come from a real purchase. If a supplier did not give you one, ask them for a copy rather than recreating it yourself.

This is general information, not tax advice. Check the current GOV.UK guidance for your tax year or speak to an accountant.`,
    faqs: [
      {
        q: "What expenses can I claim as self-employed in the UK?",
        a: "HMRC groups them as office and equipment, travel, clothing such as uniforms, staff, goods for resale, legal and financial costs, marketing, subscriptions and training. You can claim only the business part of each cost.",
      },
      {
        q: "Do I need receipts for every expense?",
        a: "You need records that prove each expense. HMRC lists receipts for goods and stock, bank statements and invoices as proof. With simplified expenses, a mileage or hours log replaces receipts for those costs.",
      },
      {
        q: "What is the HMRC mileage rate for the self-employed?",
        a: "Under simplified expenses, GOV.UK lists 55p a mile for the first 10,000 business miles in a car or goods vehicle for the 2026 to 2027 tax year (45p before 6 April 2026), then 25p, and 24p for motorcycles.",
      },
      {
        q: "Can I claim expenses and the £1,000 trading allowance?",
        a: "No. GOV.UK says you cannot claim expenses if you use the £1,000 tax-free trading allowance.",
      },
      {
        q: "How long do I keep self-employed records?",
        a: "At least 5 years after the 31 January submission deadline for the relevant tax year, according to GOV.UK.",
      },
    ],
  },
];
