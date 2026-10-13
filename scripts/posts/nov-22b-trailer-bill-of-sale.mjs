/**
 * Day 2026-11-22, slot b (14:00Z). Elliot writer H (bill of sale cluster).
 * Keyword: "trailer bill of sale" (+ template / pdf / form / state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants; no makecepeit page ranks for the cluster.
 * Owner / link targets: /templates/sales-receipt (payment receipt only),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/boat-bill-of-sale (Nov 18).
 * Angle: trailer VIN and certification label, weight class (GVWR) decides title vs bill of
 *   sale, no odometer, homemade trailers (only what TX and GA agency pages say).
 *
 * Product check 2026-10-13 (coordinator correction): no bill-of-sale template, heading not
 *   editable; bill of sale given as a written sample, /templates/sales-receipt only for the
 *   payment receipt. Download needs a free account; first download only watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - 49 CFR 565.2, https://www.law.cornell.edu/cfr/text/49/565.2 : VIN standard applies to
 *     trailers (including trailer kits).
 *   - 49 CFR 565.15, https://www.law.cornell.edu/cfr/text/49/565.15 : 17 positions; for
 *     trailers, positions 4-8 encode make, type of trailer, body type, length, axle configuration.
 *   - 49 CFR 567.4, https://www.law.cornell.edu/cfr/text/49/567.4 : certification label shows
 *     GVWR, GAWR for each axle and the VIN; on trailers it sits on the forward half of the
 *     left side, readable from outside.
 *   - 49 CFR 580.17, https://www.law.cornell.edu/cfr/text/49/580.17 : odometer disclosure not
 *     required for "a vehicle that is not self-propelled".
 *   - Texas DMV Trailers, https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/trailers :
 *     registration required for all non-farm trailers on public highways; manufactured
 *     trailers over 4,000 lb gross must be titled; buying used: over 4,000 lb = title;
 *     4,000 lb or less = bill of sale plus registration receipt, or the title if one was
 *     issued; both with Form 130-U and fees at the county tax assessor-collector; newly
 *     assembled trailers: titling optional up to 4,000 lb, Form VTR-141 + 130-U; no VIN ->
 *     inspection (VTR-68A) and assigned number (VTR-68-N); unsure whether homemade -> an auto
 *     theft law enforcement officer inspects it.
 *   - Georgia DOR, https://dor.georgia.gov/title-not-required-or-optional-titles : title not
 *     required for trailers 2,000 lb or less, boat trailers, homemade trailers, pole trailers,
 *     fifth wheels.
 *   - Georgia DOR, https://dor.georgia.gov/homemade-trailers-and-serial-plates : no titles for
 *     homemade trailers; signed notarized Form T-23; county issues T-22C and a serial plate;
 *     plate riveted on and certified by a Georgia law enforcement officer; $12 license plate
 *     fee plus any ad valorem tax; serial plate number then used as the VIN.
 *   - TPWD Tax and Bill of Sale, https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/tax-and-bill-of-sale-requirements :
 *     trailer price must be separated from the boat and motor price.
 * Names, trailer and amounts are fictional sample data.
 */

export const NOV_22B_TRAILER_BILL_OF_SALE = [
  {
    slug: "trailer-bill-of-sale",
    image: "assets/trailer-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-11-22T14:00:00Z",
    title: "Trailer Bill of Sale: VIN, Weight Class and a Filled-In Sample",
    seoTitle: "Trailer Bill of Sale: VIN, Weight and a Sample",
    seoDescription:
      "How to write a trailer bill of sale: the VIN and GVWR from the trailer's label, why weight decides title or bill of sale, homemade trailers, and a sample.",
    excerpt:
      "For many light trailers, the bill of sale is the main ownership document, so the VIN and weight on it have to be right. Here is what to write, a filled-in sample, and how Texas and Georgia treat light and homemade trailers.",
    body: `**A trailer bill of sale names the seller and buyer, identifies the trailer by year, make, type, length, VIN and gross vehicle weight rating (GVWR), records the date, price and payment method, says whether it is sold as is, and is signed by both people. For light trailers that many states do not title, the bill of sale is often the main proof of ownership the buyer will register with.** Write it from the sample below, then give the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

## Start at the Trailer's Label

Factory-built trailers carry a federal certification label on the forward half of the left side ([49 CFR 567.4](https://www.law.cornell.edu/cfr/text/49/567.4)). It shows three things a bill of sale needs:

- **VIN.** Trailers are covered by the federal 17-character VIN standard. For trailers, characters 4 to 8 encode the make, trailer type, body type, length and axle setup ([49 CFR 565.15](https://www.law.cornell.edu/cfr/text/49/565.15)), so the VIN should agree with the trailer in front of you.
- **GVWR.** The gross vehicle weight rating: the most the trailer is rated to weigh fully loaded.
- **GAWR.** The weight rating for each axle.

Copy the VIN from the label or frame, not from an old listing, and check it against the title or last registration receipt.

## Weight Decides the Paperwork

A trailer's weight class often decides whether it has a title at all. Two state examples:

| | Texas (DMV) | Georgia (DOR) |
|---|---|---|
| Title required | Manufactured trailers over 4,000 lb gross | Not required for trailers 2,000 lb or less |
| Light trailer, used sale | Bill of sale plus registration receipt, or the title if one was issued | No title; check your county tag office |
| Boat trailers | Price shown apart from the boat and motor (Parks and Wildlife) | Title not required |
| Homemade trailers | Titling optional up to 4,000 lb gross | No title; serial plate instead |

Sources: [Texas DMV trailers page](https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/trailers) and Georgia's list of [vehicles that need no title](https://dor.georgia.gov/title-not-required-or-optional-titles). Texas also requires registration for every non-farm trailer used on public highways, titled or not.

No odometer disclosure is needed. Federal mileage rules exempt any vehicle that is not self-propelled ([49 CFR 580.17](https://www.law.cornell.edu/cfr/text/49/580.17)).

## Fields to Include

| Field | Example (sample data) |
|---|---|
| Seller name and address | Glen Huffman, 5 Mill Rd, Temple, TX |
| Buyer name and address | Rosa Jimenez, 77 Ridge St, Belton, TX |
| Date of sale | Nov 20, 2026 |
| Year, make, type | 2020 Big Tex 30SA utility trailer |
| Length and axles | 12 ft, single axle |
| VIN | 17 characters, from the label |
| GVWR | 2,990 lb, from the label |
| Registration or title | Current plate and registration receipt number |
| Price and payment | $1,650.00, bank transfer, reference noted |
| Included | Spare tire, ramp gate |
| As-is clause | See below |
| Signatures | Seller and buyer, dated |

## A Filled-In Sample

> **TRAILER BILL OF SALE**
>
> On November 20, 2026, Glen Huffman, 5 Mill Rd, Temple, TX ("Seller"), sold to Rosa Jimenez, 77 Ridge St, Belton, TX ("Buyer"), the following trailer: 2020 Big Tex 30SA utility trailer, 12 ft, single axle, VIN [17 characters], GVWR 2,990 lb, Texas plate [number].
>
> Included: spare tire, ramp gate.
>
> Price: $1,650.00, paid by bank transfer, reference [number], received in full.
>
> Seller states the trailer is not titled and gives Buyer the current registration receipt.
>
> As is, with all faults: the buyer accepts the trailer in its present condition, and the seller makes no warranty, express or implied.
>
> Seller signature and date / Buyer signature and date

The as-is line is short here; our [as-is bill of sale guide](/blog/as-is-bill-of-sale) has fuller wording and explains its limits. Note known problems, such as worn tires or a broken light, above the clause.

## Homemade Trailers

A homemade trailer has no factory VIN or label, so the state assigns an identity before it can be registered. Only follow your state's own steps:

- **Texas.** The [DMV](https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/trailers) asks for a Trailer Verification Statement of Fact (Form VTR-141) and Form 130-U for a newly assembled trailer. If it has no VIN, an inspection (VTR-68A) and an assigned number (VTR-68-N) come first. If you cannot tell whether a trailer is homemade, an auto theft law enforcement officer inspects it.
- **Georgia.** The DOR [does not title homemade trailers](https://dor.georgia.gov/homemade-trailers-and-serial-plates). The owner files a signed, notarized Form T-23, the county issues a serial plate that must be riveted on and certified by a Georgia law enforcement officer, and that serial number is then used as the VIN in later sales.

When you sell a homemade trailer, write the state-assigned number on the bill of sale exactly as it appears on the plate or registration, and describe the trailer in detail: size, axles, deck, color.

## Selling a Trailer With a Boat

A boat trailer sold with a boat is still a separate item with its own VIN and price, and in Texas its price must be shown apart from the boat and motor. Our [boat bill of sale guide](/blog/boat-bill-of-sale) shows how to list all three.

## Give the Buyer a Payment Receipt

For a light, untitled trailer, the buyer may have little else to show the county office, so a clean payment receipt helps. Open the [sales receipt template](/templates/sales-receipt), enter the trailer and its VIN as the line item, add the payment method and reference, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free.

Only write a bill of sale for a real sale of a trailer you own or are authorized to sell.

This is general information, not legal advice. Trailer title, registration and inspection rules vary by state; your state DMV or tag office is the authority for your sale.`,
    faqs: [
      {
        q: "What should a trailer bill of sale include?",
        a: "Seller and buyer names and addresses, the date, year, make, type, length and axles, the VIN, the GVWR, the plate or title details, the price and payment method, any extras included, an as-is clause if it applies, and both signatures.",
      },
      {
        q: "Does a trailer need a title?",
        a: "It depends on the state and weight. Texas titles manufactured trailers over 4,000 lb gross and accepts a bill of sale plus registration receipt for lighter used trailers. Georgia requires no title for trailers of 2,000 lb or less.",
      },
      {
        q: "Do I need an odometer disclosure for a trailer?",
        a: "No. Federal odometer rules exempt vehicles that are not self-propelled, which covers trailers.",
      },
      {
        q: "How do I sell a homemade trailer?",
        a: "Follow your state's process for giving it an identity first. Texas uses Form VTR-141 and, if there is no VIN, an inspection and assigned number. Georgia issues a serial plate after a notarized Form T-23. Write that number on the bill of sale.",
      },
    ],
  },
];
