/**
 * Day 2026-12-04, slot a (09:30Z). Elliot writer H (bill of sale cluster).
 * Keyword: "horse bill of sale" (+ template / pdf / form / state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants; no makecepeit page ranks for the cluster.
 * Owner / link targets: /templates/sales-receipt (payment receipt only),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/dog-bill-of-sale (Oct 31),
 *   /blog/how-to-notarize-a-bill-of-sale (Nov 26).
 * Angle: identify the horse (registered name, registration number, markings, foaling date,
 *   microchip/brand/tattoo), breed registry papers handled separately, Coggins (EIA) test
 *   at change of ownership, soundness and as-is terms.
 *
 * Product check 2026-10-13 (coordinator correction): no bill-of-sale template, heading not
 *   editable; /templates/sales-receipt only for the payment receipt. Download needs a free
 *   account; first download only watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - USDA APHIS, Equine Infectious Anemia info sheet (Sept 2006),
 *     https://www.aphis.usda.gov/sites/default/files/eia_info_sheet.pdf : EIA is infectious
 *     and potentially fatal; no vaccine or treatment; spread mainly by horseflies and
 *     deerflies; Coggins test (agar-gel immunodiffusion) developed 1970, identifies carriers;
 *     Coggins or newer tests "commonly required when moving horses within and among States";
 *     major regulatory actions carried out by individual states, rules not consistent.
 *   - Texas, 4 Tex. Admin. Code 49.1(l), https://www.law.cornell.edu/regulations/texas/4-Tex-Admin-Code-SS-49-1 :
 *     negative EIA test within the previous 12 months required for equine changing ownership
 *     in Texas; exceptions: sold for slaughter (tested at the facility), nursing foal with a
 *     dam that tested negative in the preceding 12 months.
 *   - New York State Department of Agriculture and Markets (release, July 8, 2016),
 *     https://agriculture.ny.gov/news/new-york-state-reminds-horse-owners-take-preventative-measures-protect-against-equine :
 *     "A horse cannot change ownership in New York State absent a negative result of a test
 *     taken within the past 12 months."
 * Stated as common practice only (not verified on an agency page): breed registries run
 *   their own transfer process; pre-purchase vet exams. No brand-inspection claims made.
 * Names, horse and amounts are fictional sample data.
 */

export const DEC_4A_HORSE_BILL_OF_SALE = [
  {
    slug: "horse-bill-of-sale",
    image: "assets/horse-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-12-04T09:30:00Z",
    title: "Horse Bill of Sale: Papers, Coggins and a Filled-In Example",
    seoTitle: "Horse Bill of Sale: What to Include, Coggins and Sample",
    seoDescription:
      "How to write a horse bill of sale: identifying the horse, registration papers, the Coggins (EIA) test some states require at sale, as-is terms, a sample.",
    excerpt:
      "A horse bill of sale has to identify one animal beyond doubt and say what happens with its papers and health records. Here is every field, the Coggins rule in Texas and New York, and a filled-in sample.",
    body: `**A horse bill of sale names the seller and buyer and identifies the horse by registered and barn name, breed, registration number, sex, color, markings, foaling date and any microchip, brand or tattoo. It records the price, payment and date, says how the registration papers and a current negative Coggins test will be handed over, states whether the horse is sold as is, and is signed by both people.** Write it from the sample below, then give the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

## Identify the Horse So It Cannot Be Confused

Two bay geldings with a star look alike on paper. Use every identifier the horse has:

- **Registered name and barn name.** The registered name matches the papers; the barn name is what everyone calls it.
- **Breed and registration number.** From the breed registry certificate, if registered.
- **Sex, color and markings.** Write the markings out: "star, snip, left hind sock."
- **Foaling date** (date of birth), or the year if that is all you know.
- **Permanent IDs.** Microchip number, freeze brand, hot brand or lip tattoo, where present.
- **Sire and dam**, for a registered horse.

## Fields to Include

| Field | Example (sample data) |
|---|---|
| Seller name and address | Linda Paulsen, Paulsen Farm, 8 County Rd 112, Weatherford, TX |
| Buyer name and address | Jordan Ellis, 440 Saddle Ln, Aledo, TX |
| Date of sale | Nov 30, 2026 |
| Registered and barn name | "Smart Little Shiner" / "Shiner" |
| Breed and registration no. | American Quarter Horse, no. [number] |
| Sex, color, markings | Gelding, bay, star and left hind sock |
| Foaling date | Apr 12, 2017 |
| Microchip / brand / tattoo | Chip ending 2291 |
| Price and payment | $9,500.00, bank transfer, reference noted |
| Papers | Registration certificate and signed transfer form |
| Health records | Negative Coggins dated Oct 28, 2026, vaccine and farrier records |
| Tack included | Saddle and bridle, or "none" |
| As-is or guarantee terms | See below |
| Signatures | Seller and buyer, dated |

## Registration Papers Are a Separate Step

The bill of sale moves ownership between the two of you. A breed registry keeps its own ownership records, and each registry has its own transfer form and fees. In most cases the seller signs the registry's transfer form and hands it over with the certificate. Write on the bill of sale exactly what happens: "Seller will sign and deliver the registration certificate and transfer report at closing," or "Horse is sold without papers." A buyer paying for a registered horse should not leave without one or the other in writing.

## The Coggins Test

A Coggins test checks a blood sample for equine infectious anemia (EIA). The [USDA's Animal and Plant Health Inspection Service](https://www.aphis.usda.gov/sites/default/files/eia_info_sheet.pdf) describes EIA as an infectious and potentially fatal viral disease of horses with no vaccine or treatment, spread mainly by horseflies and deerflies. Horses can carry it without showing signs, which is why testing matters. APHIS says the Coggins test or a newer EIA test is commonly required to move horses, and that states run their own, differing EIA rules.

Two state examples where a sale itself triggers the test:

- **Texas.** A negative EIA test from within the previous 12 months is required for horses changing ownership in Texas ([4 Tex. Admin. Code 49.1](https://www.law.cornell.edu/regulations/texas/4-Tex-Admin-Code-SS-49-1)). Exceptions include horses sold for slaughter and a nursing foal sold with a dam that tested negative in the past 12 months.
- **New York.** The state Department of Agriculture and Markets says [a horse cannot change ownership](https://agriculture.ny.gov/news/new-york-state-reminds-horse-owners-take-preventative-measures-protect-against-equine) in New York without a negative test taken within the past 12 months.

Rules vary by state, and moving the horse across state lines can bring its own requirements. Ask your state veterinarian or department of agriculture before the sale, and write the test date and result on the bill of sale.

## As Is, or With Terms

Horses are usually sold as is, but buyers often ask for a vet check first. If the buyer had a pre-purchase exam, name it in the clause:

> **AS IS.** The buyer accepts the horse in its present condition. The seller makes no warranty of soundness, health, temperament or suitability for any purpose, express or implied, including any implied warranty of merchantability or fitness for a particular purpose. The buyer had the horse examined by a veterinarian of the buyer's choice on [date] before signing.

If you do promise something, such as "no known history of colic surgery," write it down as a separate line. A written promise is binding even next to an as-is clause. Our [as-is bill of sale guide](/blog/as-is-bill-of-sale) explains why, and our [dog bill of sale guide](/blog/dog-bill-of-sale) shows how a health guarantee can be worded if you prefer to give one.

## A Filled-In Sample

> **HORSE BILL OF SALE**
>
> On November 30, 2026, Linda Paulsen, Paulsen Farm, 8 County Rd 112, Weatherford, TX ("Seller"), sold to Jordan Ellis, 440 Saddle Ln, Aledo, TX ("Buyer"), the following horse: "Smart Little Shiner," known as "Shiner," American Quarter Horse, registration no. [number], bay gelding, star and left hind sock, foaled April 12, 2017, microchip ending 2291.
>
> Price: $9,500.00, paid by bank transfer, reference [number], received in full.
>
> Papers: Seller delivers the registration certificate and a signed transfer form at signing.
>
> Health: negative Coggins (EIA) test dated October 28, 2026, copy attached; vaccination and farrier records attached.
>
> Included: none (no tack).
>
> Sold as is (clause above). Risk of loss passes to Buyer when Buyer takes the horse.
>
> Seller signature and date / Buyer signature and date

## Do You Need a Notary?

We did not find a state agency rule that requires a notarized horse bill of sale, but rules change, and some buyers and sellers notarize a high-value sale anyway. Our guide on [how to notarize a bill of sale](/blog/how-to-notarize-a-bill-of-sale) walks through it.

## Give the Buyer a Payment Receipt

If the price was paid in installments, or a deposit was taken before the vet check, a payment receipt for each amount keeps the record clear. Open the [sales receipt template](/templates/sales-receipt), enter the horse as the line item, add the payment method and reference, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free.

Only write a bill of sale for a real sale of a horse you own or are authorized to sell.

This is general information, not legal or veterinary advice. Animal health and sale rules vary by state; your state veterinarian or department of agriculture is the authority for your sale.`,
    faqs: [
      {
        q: "What should a horse bill of sale include?",
        a: "Seller and buyer details, the date, the horse's registered and barn names, breed, registration number, sex, color, markings, foaling date and any microchip, brand or tattoo, the price and payment, how papers and health records are handed over, as-is or guarantee terms, and both signatures.",
      },
      {
        q: "Do I need a Coggins test to sell a horse?",
        a: "In some states, yes. Texas requires a negative EIA test within the previous 12 months for horses changing ownership, and New York does not allow a change of ownership without one. Check your state's department of agriculture.",
      },
      {
        q: "Does a bill of sale transfer a horse's registration papers?",
        a: "No. The breed registry has its own transfer form and process. The bill of sale should say whether the seller will sign and deliver the papers or the horse is sold without them.",
      },
      {
        q: "Can I sell a horse as is?",
        a: "Usually, yes. State that the seller gives no warranty of soundness, health or suitability, and note any vet exam the buyer had. Anything you promise in writing still binds you.",
      },
    ],
  },
];
