/**
 * Oct re-plan, gap fill — Day 2026-10-17 (1 post). Notion Content Pipeline Order 64
 * (moved forward from Nov 15 to fill Oct 10–20; still ahead of the Dec–Jan peak).
 *   64. "rent receipt with revenue stamp"  720/mo India (2,900 in Jan)
 *       + "rent receipt for hra" 170, "hra rent receipt format" 110
 *       -> /templates/rent-receipt-india (live 2026-10-05)
 *
 * The head terms ("rent receipt format" 5,400, "rent receipt generator" 2,400)
 * are template intent and stay with /templates/rent-receipt. This post takes
 * the rules questions.
 *
 * Facts checked 2026-10-05 (consistent across Cleartax, Zoho Payroll and
 * others; no single government page states all of them):
 *   - The Income-tax Act, 2025 applies from 1 April 2026; Form 124 replaced
 *     Form 12BB as the employee's declaration to the employer.
 *   - Landlord PAN needed when annual rent exceeds ₹1,00,000.
 *   - HRA exemption only under the old regime, not the new (default) regime.
 *   - Revenue stamp (₹1) on receipts for CASH payments above ₹5,000 (Indian
 *     Stamp Act, 1899). Some sources say any rent above ₹5,000; Cleartax says
 *     cash only. The post follows cash-only and says employers may ask anyway.
 *   - Exemption = least of HRA received; rent paid minus 10% of salary; 50%
 *     (metro) or 40% of salary.
 * Section numbers in the new Act are deliberately not cited (sources disagree).
 */

export const OCT_17B = [
  {
    slug: "rent-receipt-for-hra",
    category: "taxes",
    publishedAt: "2026-10-17T09:30:00Z",
    title: "Rent Receipt for HRA: Format, Revenue Stamp and Landlord PAN",
    seoTitle: "Rent Receipt for HRA: Format, Revenue Stamp, PAN",
    seoDescription:
      "What a rent receipt needs for an HRA claim in India: the format, when a revenue stamp is needed, when the landlord's PAN is required, and Form 124.",
    excerpt:
      "To claim HRA, salaried employees in India give their employer rent receipts with Form 124. Here's the format, when a ₹1 revenue stamp is needed, and when the landlord's PAN becomes mandatory.",
    body: `**A rent receipt for HRA must show the tenant's name, the landlord's name and address, the rented property's address, the rent amount, the period it covers, the payment date and method, and the landlord's signature.** Add a ₹1 revenue stamp if the rent was paid in cash and the amount is above ₹5,000, and include the landlord's PAN if the rent for the year exceeds ₹1,00,000. Employees submit the receipts to their employer with **Form 124**, which replaced Form 12BB from 1 April 2026. The [rent receipt template](/templates/rent-receipt-india) lays out these fields with the currency set to rupees.

HRA, house rent allowance, is part of many salaries in India, and the exemption on it is only allowed against proof of rent actually paid. The rent receipt is that proof.

## Rent Receipt Format for HRA

| Field | Required? | Notes |
|---|---|---|
| Tenant's name | Yes | As on your salary records |
| Landlord's name | Yes | The person you pay rent to |
| Rented property address | Yes | The address you live at |
| Rent amount | Yes | In rupees, in figures and ideally in words |
| Period covered | Yes | For example, rent for October 2026 |
| Date and mode of payment | Yes | Cash, cheque, UPI or bank transfer |
| Landlord's signature | Yes | On every receipt |
| Revenue stamp | Cash over ₹5,000 | A ₹1 stamp, signed across |
| Landlord's PAN | Annual rent over ₹1,00,000 | Mandatory above the threshold |

Receipts can be monthly, quarterly or one per year, as long as each one states the period it covers. Many employers prefer monthly receipts, so check your payroll team's rules.

## When a Revenue Stamp Is Needed

**For cash payments above ₹5,000.** Under the Indian Stamp Act, 1899, a receipt for a cash payment of more than ₹5,000 needs a ₹1 revenue stamp, signed across by the landlord. Rent paid by cheque, UPI or bank transfer does not need one, because the payment leaves its own record.

Some employers ask for a revenue stamp on every receipt above ₹5,000 regardless of how it was paid. If yours does, it costs ₹1, so it is simpler to comply than to argue.

## When the Landlord's PAN Is Required

**When the rent you pay in the year exceeds ₹1,00,000.** Above that figure, your employer needs the landlord's PAN to allow the exemption, and Form 124 asks for it along with the landlord's name and address.

If the landlord has no PAN, a written declaration from the landlord is the usual substitute. Ask your employer what they accept before the deadline, not after.

### Paying rent to a parent

You can pay rent to a parent and claim HRA, provided the rent is genuinely paid and you live in the property they own. Form 124 asks for the relationship. Keep bank records of the payments, and remember the parent has to show the rent as income on their own return.

## HRA and the New Tax Regime

**The HRA exemption is only available under the old tax regime.** The new regime, now the default, does not allow it, so under the new regime your HRA is fully taxable and rent receipts do not reduce your tax. Collect receipts only if you have opted for the old regime.

## How Much HRA Is Exempt

**The least of three amounts:**

1. The HRA you actually received.
2. The rent you paid, minus 10% of your salary.
3. 50% of your salary if you live in Mumbai, Delhi, Kolkata or Chennai, or 40% anywhere else.

Here "salary" means basic pay plus dearness allowance where it forms part of retirement benefits. The rest of your HRA is taxable.

## How to Make the Receipt

1. Open the [rent receipt template](/templates/rent-receipt-india) and set the currency to Indian rupees (₹).
2. Enter the landlord's name and the property address.
3. Enter your name as the tenant.
4. Add a line for the period, for example "Rent for October 2026", with the amount.
5. Note the payment date and mode.
6. Add the landlord's PAN if your annual rent exceeds ₹1,00,000.
7. Print it, have the landlord sign it, and add the revenue stamp for cash payments over ₹5,000.

## Keep Copies

Your employer uses the receipts to calculate tax deducted from your salary. The Income Tax Department can still ask for proof later, so keep the receipts, the rent agreement and the payment records together.`,
    faqs: [
      {
        q: "What should a rent receipt for HRA include?",
        a: "Tenant's name, landlord's name, the property address, the rent amount, the period covered, the payment date and mode, and the landlord's signature. Add the landlord's PAN above ₹1,00,000 a year.",
      },
      {
        q: "Is a revenue stamp required on rent receipts?",
        a: "For cash payments above ₹5,000, yes: a ₹1 revenue stamp under the Indian Stamp Act, 1899. Payments by cheque, UPI or bank transfer do not need one, though some employers ask anyway.",
      },
      {
        q: "When is the landlord's PAN mandatory for HRA?",
        a: "When the rent you pay in the financial year exceeds ₹1,00,000. Form 124 asks for the landlord's name, address and PAN above that figure.",
      },
      {
        q: "What is Form 124?",
        a: "The declaration employees give their employer to claim exemptions and deductions, including HRA, under the Income-tax Act, 2025. It replaced Form 12BB from 1 April 2026.",
      },
      {
        q: "Can I claim HRA under the new tax regime?",
        a: "No. The HRA exemption is only available under the old tax regime. Under the new regime, HRA is fully taxable.",
      },
      {
        q: "Can I pay rent to my parents and claim HRA?",
        a: "Yes, if the rent is genuinely paid and you live in the property they own. Keep bank records, and your parent must report the rent as income.",
      },
      {
        q: "Are monthly rent receipts necessary?",
        a: "Not by law, but each receipt must state the period it covers, and many employers ask for monthly receipts. Follow your payroll team's rules.",
      },
      {
        q: "How is the HRA exemption calculated?",
        a: "It is the least of the HRA received, rent paid minus 10% of salary, and 50% of salary in Mumbai, Delhi, Kolkata or Chennai or 40% elsewhere.",
      },
      {
        q: "Can I generate rent receipts online?",
        a: "Yes, as long as they record rent you actually paid and the landlord signs them. A receipt for rent that was never paid is a false claim.",
      },
      {
        q: "What if my landlord has no PAN?",
        a: "A written declaration from the landlord is the usual substitute. Ask your employer what they accept before the declaration deadline.",
      },
    ],
  },
];
