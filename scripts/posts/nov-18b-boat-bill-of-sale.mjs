/**
 * Day 2026-11-18, slot b (14:00Z). Elliot writer H (bill of sale cluster).
 * Keyword: "boat bill of sale" (+ template / pdf / form / state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants; no makecepeit page ranks for the cluster.
 * Owner / link targets: /templates/sales-receipt (payment receipt only),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/motorcycle-bill-of-sale (Nov 14).
 * Angle: hull identification number, boat / outboard motor / trailer as three separate
 *   items with separate prices, USCG documentation vs state registration.
 *
 * Product check 2026-10-13 (coordinator correction): no bill-of-sale template and the
 *   heading cannot be changed; bill of sale given as a written sample, /templates/sales-receipt
 *   only for the payment receipt. Download needs a free account; first download only is
 *   watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - 33 CFR 181.25, https://www.law.cornell.edu/cfr/text/33/181.25 : HIN is 12 characters,
 *     no slashes/hyphens/spaces; 1-3 manufacturer identification code; 4-8 serial number
 *     (no I, O, Q); 9-10 month (letter A-L) and year of certification or manufacture;
 *     11-12 model year.
 *   - 33 CFR 181.29, https://www.law.cornell.edu/cfr/text/33/181.29 : two identical HINs;
 *     primary on the starboard outboard side of the transom within 2 inches of the top;
 *     duplicate in an unexposed location inside; permanently affixed so alteration is obvious.
 *   - 46 CFR 67.7, https://www.law.cornell.edu/cfr/text/46/67.7 : vessels of at least five
 *     net tons in the fisheries or coastwise trade must be documented.
 *   - 46 CFR 67.9, https://www.law.cornell.edu/cfr/text/46/67.9 : vessels under five net tons
 *     are excluded from documentation; exempt vessels may be documented at the owner's option.
 *   - TPWD Title Requirements, https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/title-requirements :
 *     all motorized vessels titled; non-motorized 14 ft or longer; gas/diesel/propane
 *     outboard motors titled unless 40+ years old and 25 hp or less; USCG documented vessels
 *     exempt from titling but "require State registration and proof of current USCG
 *     documentation".
 *   - TPWD Tax and Bill of Sale, https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/tax-and-bill-of-sale-requirements :
 *     bill of sale must contain date, sales price (not including trailer), description of
 *     vessel and/or motor (make, serial number, model year), purchaser's name, seller's
 *     signature; trailer price must be separated; tax due within 45 working days.
 *   - California DMV Boat & Vessel Owners, https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/boat-vessel-owners/ :
 *     documented vessels receive a USCG certificate and don't need DMV registration.
 *   - California DMV vessel agents' handbook, transfers,
 *     https://www.dmv.ca.gov/portal/handbook/agents-handbook-for-registration-of-undocumented-vessels/transfers/ :
 *     bill of sale shows names and addresses of seller, purchaser and legal owner, location
 *     and date of sale, description of the vessel; HIN compared with the certificate of
 *     ownership; transfer fee and use tax due on purchase; penalty if fee not paid within 30 days.
 * Not stated: Florida rules (flhsmv.gov returned 403), Coast Guard documentation forms.
 * Names, boat and amounts are fictional sample data.
 */

export const NOV_18B_BOAT_BILL_OF_SALE = [
  {
    slug: "boat-bill-of-sale",
    image: "assets/boat-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-11-18T14:00:00Z",
    title: "Boat Bill of Sale: HIN, Motor and Trailer, With a Sample",
    seoTitle: "Boat Bill of Sale: HIN, Motor, Trailer and a Sample",
    seoDescription:
      "How to write a boat bill of sale: the hull identification number, the outboard and trailer priced separately, an as-is clause, and title steps in TX and CA.",
    excerpt:
      "A boat sale is often three sales in one: the hull, the motor and the trailer. Here is how to identify each on a bill of sale, a filled-in sample, and what changes if the boat is Coast Guard documented.",
    body: `**A boat bill of sale names the seller and buyer, identifies the boat by year, make, model, length and its 12-character hull identification number (HIN), and lists the outboard motor and the trailer as separate items with their own serial numbers and prices. It records the date, total price and payment method, says whether the sale is as is, and is signed by both people.** Write it from the sample below, then give the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

## Read the HIN Before You Write Anything

The HIN is the boat's equivalent of a VIN. Federal rules ([33 CFR 181.25](https://www.law.cornell.edu/cfr/text/33/181.25)) set its format: 12 characters with no dashes or spaces.

| Characters | What they mean |
|---|---|
| 1 to 3 | Manufacturer identification code |
| 4 to 8 | Builder's serial number (never I, O or Q) |
| 9 to 10 | Month (A for January through L for December) and last digit of the year of certification or build |
| 11 to 12 | Model year |

Every boat built under these rules carries the HIN twice ([33 CFR 181.29](https://www.law.cornell.edu/cfr/text/33/181.29)): on the starboard (right) side of the transom near the top, and a duplicate in a hidden spot inside the hull. Both must be permanent, so that tampering shows. Compare the transom number with the title or registration before any money changes hands. A HIN that looks ground off or re-stamped is a reason to stop.

## Hull, Motor and Trailer Are Separate Items

A bike or car is one item. A boat usually is not.

**The outboard motor** has its own serial number, and in some states its own title. Texas Parks and Wildlife [titles gas, diesel and propane outboards](https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/title-requirements) unless they are at least 40 years old and 25 hp or less.

**The trailer** is a road vehicle with its own VIN. In Texas it is handled by the county tax office, not the boating agency, and Texas [requires the trailer price to be separated](https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/tax-and-bill-of-sale-requirements) from the boat and motor price.

So list three lines, each with its own identifier and price, even if you agreed one total.

## Fields to Include

| Field | Example (sample data) |
|---|---|
| Seller name and address | Ray Delgado, 18 Bayou Ln, Seabrook, TX |
| Buyer name and address | Tasha Nguyen, 902 Oak Hollow, Pasadena, TX |
| Date and place of sale | Nov 15, 2026, Seabrook, TX |
| Boat | 2016 Carolina Skiff 19, 19 ft, white |
| HIN | 12 characters, read from the transom |
| State title or registration number | From the current certificate |
| Outboard motor | 2016 Yamaha F90, serial number |
| Trailer | 2016 single-axle trailer, VIN |
| Price split | Boat, motor, trailer, each priced |
| Payment | Cashier's check, number noted |
| Equipment included | Life jackets, anchor, cover |
| As-is clause | See below |
| Signatures | Seller and buyer, dated |

## A Filled-In Sample

> **BOAT BILL OF SALE**
>
> On November 15, 2026, at Seabrook, TX, Ray Delgado, 18 Bayou Ln, Seabrook, TX ("Seller"), sold to Tasha Nguyen, 902 Oak Hollow, Pasadena, TX ("Buyer"):
>
> 1. Boat: 2016 Carolina Skiff 19, white, HIN [12 characters], Texas title no. [number]. Price $11,500.00.
> 2. Outboard motor: 2016 Yamaha F90, serial no. [number]. Price $5,200.00.
> 3. Trailer: 2016 single-axle boat trailer, VIN [17 characters]. Price $1,300.00.
>
> Total price: $18,000.00, paid by cashier's check no. 30177, received in full. Included at no charge: four life jackets, anchor, cover.
>
> As is, with all faults (clause below).
>
> Seller signature and date / Buyer signature and date

The as-is clause can follow the wording in our [as-is bill of sale guide](/blog/as-is-bill-of-sale), naming "the boat, motor and trailer described above." If the buyer had a marine survey or a sea trial, say so in the clause.

## State Registration or Coast Guard Documentation?

Most recreational boats are titled or registered by the state. Larger boats can instead be documented with the U.S. Coast Guard, and the rules are set in federal regulations:

- Boats under five net tons [cannot be documented](https://www.law.cornell.edu/cfr/text/46/67.9).
- Boats of at least five net tons used in fishing or coastwise trade [must be documented](https://www.law.cornell.edu/cfr/text/46/67.7).
- Other boats of five net tons or more may be documented if the owner chooses.

What a state does with a documented boat varies. Texas exempts documented vessels from its title but still [requires state registration](https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/title-requirements) with proof of current documentation. California says documented vessels [do not need DMV registration](https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/boat-vessel-owners/). If the boat is documented, the ownership change is also recorded with the Coast Guard, so check its current process before closing.

## What Happens After the Sale

- **Texas.** Texas Parks and Wildlife says the bill of sale must show the date, the price not including the trailer, the make, serial number and model year of the boat and motor, the buyer's name and the seller's signature. Tax is due [within 45 working days](https://tpwd.texas.gov/regulations/outdoor-annual/boating/title-registration-id-requirements/tax-and-bill-of-sale-requirements) of the sale. The trailer goes through the county tax office.
- **California.** For boats registered with the DMV, the [vessel transfer handbook](https://www.dmv.ca.gov/portal/handbook/agents-handbook-for-registration-of-undocumented-vessels/transfers/) says the bill of sale should show the names and addresses of the seller, buyer and any legal owner, the place and date of sale and a description of the vessel. The DMV compares the HIN with the certificate of ownership. Transfer fee and use tax are due on purchase, with a penalty if the fee is not paid within 30 days.

Other states differ, and some split boats and trailers between two agencies. Check both before the sale. If you are selling a bike as well, our [motorcycle bill of sale guide](/blog/motorcycle-bill-of-sale) covers the road-vehicle side.

## Give the Buyer a Payment Receipt

Hand the buyer a receipt that shows the same three lines and prices as the bill of sale. Open the [sales receipt template](/templates/sales-receipt), add the boat, motor and trailer as separate items, enter the payment method and check number, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free. Keeping the receipt and the bill of sale consistent avoids questions when the buyer pays tax on the boat.

Only write a bill of sale for a real sale of a boat you own or are authorized to sell.

This is general information, not legal advice. Boat titling, registration and tax rules vary by state; your state boating agency, DMV and the U.S. Coast Guard are the authorities for your sale.`,
    faqs: [
      {
        q: "What is a HIN on a boat?",
        a: "The hull identification number, a 12-character code set by federal rules: a manufacturer code, a serial number, the month and year of build or certification, and the model year. It appears on the starboard side of the transom and again in a hidden spot inside the hull.",
      },
      {
        q: "Should the motor and trailer be on the boat bill of sale?",
        a: "Yes, as separate lines with their own serial number or VIN and their own price. Some states title outboard motors separately, and trailers are usually registered as road vehicles. Texas requires the trailer price to be separated from the boat and motor.",
      },
      {
        q: "Does a documented boat need state registration?",
        a: "It depends on the state. Texas exempts Coast Guard documented vessels from its title but still requires state registration. California says documented vessels do not need DMV registration.",
      },
      {
        q: "Which boats can be documented with the Coast Guard?",
        a: "Boats of five net tons or more. Those used in fishing or coastwise trade must be documented; others may be documented at the owner's choice. Boats under five net tons cannot be documented.",
      },
    ],
  },
];
