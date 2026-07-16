/** Cluster F (How-To) spokes 4/5: F11–F12. */

export const SPOKES_F4 = [
  {
    slug: "how-to-make-a-salon-receipt",
    category: "how-to",
    publishedAt: "2026-07-21T14:00:00Z",
    title: "How to Make a Salon or Barber Receipt",
    seoTitle: "How to Make a Salon or Barber Receipt (With Template)",
    seoDescription:
      "Salon receipts list services by stylist, retail products separately, and handle tips and booth-renter setups. The format for salons, barbers and independent stylists.",
    excerpt:
      "Services by stylist, retail on its own lines, tip handled right, booth renters issuing their own paper — the salon and barbershop receipt format, start to finish.",
    body: `A salon or barber receipt lists each service with its stylist and price (cut, color, treatment — separately, since different staff may perform and be paid on each), retail products on their own taxed lines, then subtotal, tax per your state's service/product split, tip, and payment. Booth-rental shops add a twist: each independent stylist is their own business and issues their own receipts. The [salon template](/templates/salon) and [barber template](/templates/barber-receipt) carry both formats.

Who makes these: salons and barbershops at the register, independent stylists and booth renters (a largely cash-and-Venmo trade where the receipt series is the income record), and clients documenting real services for FSA-adjacent cases (rare) or small-claims disputes.

## The format, step by step

1. **Shop header:** salon name, address, phone; independent stylists use their own name and chair/suite location.
2. **Visit metadata:** date and time, client first name (optional), and the stylist per service — "CUT — JAMIE 45.00 / FULL COLOR — JAMIE 120.00." The stylist attribution matters for commission splits and rebooking.
3. **Services, each priced** — with length/complexity modifiers as their own lines ("LONG HAIR ADD-ON 15.00").
4. **Retail products, separately:** shampoo and product sales are goods — taxed in every sales-tax state, unlike services which are exempt in most (a number of states do tax personal-care services; know yours). The service/product tax split is the receipt's one technical requirement.
5. **Subtotal, tax, tip, total:** tips on cards print as lines; cash tips typically don't appear. Tip-on-total-before-tax is the convention, as with [restaurant checks](/blog/how-to-make-a-restaurant-receipt).
6. **Payment block and receipt number** ([numbering practice](/blog/how-to-number-receipts)).

## The booth-renter reality

In rental shops, the "salon" is a landlord: each stylist is self-employed, collects their own payments, and owes their own receipts — the shop's register doesn't see the money. For renters, receipts do triple duty: client paper, income ledger, and the documentation lenders and tax preparers ask self-employed stylists for ([the self-employed system](/blog/self-employed-receipt-tracking)). Square and similar app receipts work; a numbered PDF from a [template](/create) works identically without the processor.

## Why bother in a walk-in trade

Most haircuts need no paper — until they do: package and series sales (six blowouts prepaid) need [balance-tracking receipts](/blog/partial-payment-receipt); disputes over color-correction jobs turn on what was agreed and charged; and every cash week undocumented is income the stylist can't prove at mortgage time. The receipt is optional for the client and essential for the business.

## Make one now

The [salon template](/templates/salon) at [/create](/create) formats stylist-attributed services, separate retail lines and the tax split; the [barber variant](/templates/barber-receipt) is the same skeleton in a barbershop layout. A minute per client, or batch the day's cash at close.

## The bottom line

Services by stylist, products taxed separately, tips after tax, numbered series. In a trade this cash-heavy, the receipt isn't customer service — it's the difference between income and folklore.`,
    faqs: [
      {
        q: "What goes on a salon receipt?",
        a: "Each service with its stylist and price, retail products as separate taxed lines, subtotal, tax (per your state's service/product rules), tip, total and payment method — plus the shop's details and a receipt number.",
      },
      {
        q: "Are salon services taxed?",
        a: "Products always are in sales-tax states; services are exempt in most states but taxable in a meaningful minority. The receipt should apply tax per class — one reason services and retail never share a line.",
      },
      {
        q: "How do booth renters handle receipts?",
        a: "As independent businesses: each renter collects payments and issues their own numbered receipts, which double as their income records for taxes and lending. The shop's register only covers shop-collected sales.",
      },
      {
        q: "Do cash tips appear on salon receipts?",
        a: "Usually not — the receipt shows the service total and card tips. Cash tips go straight to the stylist and are reportable income regardless of appearing on paper.",
      },
    ],
  },

  {
    slug: "how-to-make-an-auto-repair-receipt",
    category: "how-to",
    publishedAt: "2026-07-22T14:00:00Z",
    title: "How to Make an Auto Repair Receipt (Parts + Labor)",
    seoTitle: "How to Make an Auto Repair Receipt (Parts + Labor)",
    seoDescription:
      "Auto repair receipts need vehicle identification (year/make/model, VIN, mileage), labor by book hours, parts itemized, and shop supplies. The full format.",
    excerpt:
      "VIN and mileage in the header, labor by book hours, every part itemized with its number — the auto repair invoice format, and why the odometer line matters years later.",
    body: `An auto repair receipt (usually styled an invoice, paid on completion) needs: the shop's details and any state repair-shop registration, the **vehicle block** — year, make, model, VIN, license plate, and **odometer reading** — the customer's concern and work performed, labor lines billed in book hours × shop rate, **parts itemized** with part numbers and unit prices, shop supplies and disposal fees as lines, tax per state rules, and the payment block with warranty terms. The [auto repair template](/templates/auto-repair) is built to this format.

Who makes these: shops and mobile mechanics (several states require written invoices for auto repair — it's among the most-regulated receipt categories), and owners keeping service-history records where a shop's paper was lost ([the recovery attempt](/blog/how-to-replace-a-lost-receipt) first — shops keep records and reprint willingly, since service history brings cars back).

## The format, step by step

1. **Shop block:** name, address, phone — plus state registration/license numbers where required (California BAR number, for example) and the RO (repair order) number.
2. **Vehicle block:** year/make/model, VIN, plate, color, and odometer in and out. The mileage line is the sleeper field — it anchors warranty claims, maintenance schedules and resale value documentation years later.
3. **Concern / cause / correction:** what the customer reported, what diagnosis found, what was done — the trade's standard narrative ("C/S: grinding on braking. Found front pads at 2mm, rotors scored. Replaced pads and rotors, resurfaced...").
4. **Labor:** per operation, in book hours × the shop's hourly rate — "Brake job, front: 1.8 hrs @ $140 = $252." Diagnostic time as its own line.
5. **Parts:** each with part number, description, quantity, unit price — "BP-1042 Ceramic pad set ×1 $89.99." OEM vs. aftermarket noted where it matters.
6. **The small lines:** shop supplies (often a capped percentage), hazardous waste/tire/battery disposal fees (state-mandated in many places), and sublet work (machine shop, glass) at cost or marked up.
7. **Totals and tax:** parts are taxable everywhere with sales tax; labor taxability varies by state — the receipt must split them, which the parts/labor structure already does.
8. **Warranty and payment:** parts and labor warranty terms ("12 months/12,000 miles"), then method and paid status.

## Why this receipt outlives most

The service invoice chain IS the vehicle's medical record: it substantiates warranty claims (that oil changes happened on schedule), supports resale ("full service history"), documents business-vehicle expenses under the actual-cost method ([the vehicle deduction split](/blog/mileage-log-receipts)), and feeds insurance claims after incidents. Owners should keep every repair receipt for the ownership period; the [retention logic](/blog/how-long-to-keep-receipts) treats them like the asset documents they are.

## Make one now

The [auto repair template](/templates/auto-repair) at [/create](/create) carries the vehicle block, concern/correction narrative, labor and parts sections, fee lines and warranty footer — a complete RO-style document in a couple of minutes.

## The bottom line

Vehicle identified to the VIN, mileage recorded, labor in book hours, parts by number, fees visible, warranty stated. It's the most structured receipt in retail — because the car, the state and the next owner all read it later.`,
    faqs: [
      {
        q: "What must an auto repair receipt include?",
        a: "Shop details (with state registration where required), the vehicle's year/make/model, VIN and odometer, the work performed, labor by hours and rate, parts itemized with numbers and prices, fees, tax, warranty terms and payment.",
      },
      {
        q: "Why is the odometer reading on repair receipts?",
        a: "It timestamps the vehicle's service history — anchoring warranty eligibility, maintenance intervals and resale documentation. A receipt chain with mileage readings is what 'full service history' means.",
      },
      {
        q: "Is auto repair labor taxed?",
        a: "Parts are taxable in sales-tax states; labor varies — taxable in some states, exempt in others. Repair invoices split parts and labor partly for exactly this reason.",
      },
      {
        q: "What are 'shop supplies' and disposal fees on my receipt?",
        a: "Shop supplies is a small charge (often a capped percentage) covering consumables — rags, fasteners, fluids in trace amounts. Disposal fees for oil, tires and batteries are state-mandated environmental charges, listed as their own lines.",
      },
    ],
  },
];
