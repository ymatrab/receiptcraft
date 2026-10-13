/**
 * Day 2026-11-26, slot b (14:00Z). Elliot writer H (bill of sale cluster).
 * Keyword: "how to notarize a bill of sale" (+ "does a bill of sale need to be notarized",
 *   state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants for the bill of sale cluster; no makecepeit page ranks.
 * Owner / link targets: /templates/sales-receipt (payment receipt only),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/motorcycle-bill-of-sale (Nov 14),
 *   /blog/boat-bill-of-sale (Nov 18), /blog/trailer-bill-of-sale (Nov 22).
 * Angle: when notarization is required (only states verified on an agency page), how an
 *   in-person and an online notarization work, what the notary does and does not check.
 *
 * Product check 2026-10-13 (coordinator correction): no bill-of-sale template, heading not
 *   editable; /templates/sales-receipt only for the payment receipt. Download needs a free
 *   account; first download only watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - Louisiana OMV, used title & registration,
 *     https://expresslane.la.gov/omv/vehicles/title-and-registration/used-title-registration/ :
 *     title "assigned before a notary by seller to purchaser"; original notarized bill of sale
 *     or invoice stating the actual consideration and fully describing the vehicle; "A
 *     separate bill of sale is not required if the selling price is included on the title
 *     assignment"; an authorized agent of a federally insured financial institution may
 *     witness instead of a notary under listed conditions.
 *   - West Virginia DMV FAQ, https://dmv.wv.gov/faq : "notarized bill of sale (if less than
 *     half of low book value was paid for vehicle)"; statement of sale signed by the seller
 *     identifying buyer and seller, price, date, year, make and VIN; seller's and buyer's
 *     signatures signed in front of a notary who applies seal and signature.
 *   - Georgia DOR, https://dor.georgia.gov/homemade-trailers-and-serial-plates : homemade
 *     trailer affidavit (T-23) must be signed and notarized.
 *   - California DMV REG 135, https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf :
 *     seller certifies under penalty of perjury; the form has no notary block.
 *   - Texas SOS notary FAQ, https://www.sos.state.tx.us/statdoc/faqs2300.shtml : signer must
 *     personally appear; ID = personally known or non-expired state/federal ID or passport,
 *     or a credible witness; notary should not notarize if a party to or interested in the
 *     transaction.
 *   - Texas SOS online notary, https://www.sos.state.tx.us/statdoc/online-np-educational.shtml :
 *     online notarization by two-way video and audio; credential analysis and identity
 *     proofing; notary must be in Texas, signer "may be located anywhere"; up to $25 extra
 *     per online notarization on top of regular fees; recording kept 5 years.
 * Left out (not verified on an agency page): Maryland (mva.maryland.gov blocked; search
 *   snippets suggest its notarized bill of sale rule changed in 2026), Nebraska (no general
 *   requirement found), whether DMVs accept remotely notarized documents.
 * Names and amounts are fictional sample data.
 */

export const NOV_26B_HOW_TO_NOTARIZE_A_BILL_OF_SALE = [
  {
    slug: "how-to-notarize-a-bill-of-sale",
    image: "assets/how-to-notarize-a-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-11-26T14:00:00Z",
    title: "How to Notarize a Bill of Sale (and When You Have To)",
    seoTitle: "How to Notarize a Bill of Sale, and When It's Required",
    seoDescription:
      "When a bill of sale must be notarized (Louisiana, West Virginia and other cases), how to get it notarized in person or online, and what to bring.",
    excerpt:
      "Most private bills of sale do not need a notary, but some states and some situations do. Here is when it is required, what to bring, how the signing works in person and online, and a notary-ready sample.",
    body: `**To notarize a bill of sale, fill it in completely but do not sign it, take it and a current photo ID to a notary, and sign in front of the notary, who checks your identity, watches you sign and adds their seal and signature. If both seller and buyer must sign under notary, both go. Most private bills of sale do not need notarizing, but some states require it, such as Louisiana for vehicle sales and West Virginia when the price is well below book value.** Write the bill of sale from the sample below, then give the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

## When a Bill of Sale Must Be Notarized

Notarization is a state rule, and it often depends on the item and the price. Examples confirmed on agency pages:

| State or case | What the agency says |
|---|---|
| Louisiana, used vehicles | The title must be assigned before a notary, and a separate bill of sale must be an original notarized one stating the price and describing the vehicle. No separate bill of sale is needed if the price is on the title assignment. |
| West Virginia, vehicles sold cheaply | A notarized bill of sale is needed if less than half of low book value was paid, with both signatures made in front of a notary. |
| Georgia, homemade trailers | The homemade trailer affidavit (Form T-23) must be signed and notarized. |
| California, vehicles and vessels | The DMV's Bill of Sale (REG 135) has the seller certify under penalty of perjury and has no notary block. |

Sources: [Louisiana OMV](https://expresslane.la.gov/omv/vehicles/title-and-registration/used-title-registration/), [West Virginia DMV FAQ](https://dmv.wv.gov/faq), [Georgia DOR](https://dor.georgia.gov/homemade-trailers-and-serial-plates) and the [California DMV's REG 135 form](https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf).

Other states have their own rules, and they change. Ask your DMV, tag office or boating agency before the sale. If notarization is optional where you live, some sellers still choose it for a high-value private sale, because it gives independent proof of who signed and when.

## What a Notary Does, and Does Not Do

A notary confirms identity and witnesses the signature. The Texas Secretary of State's [notary FAQ](https://www.sos.state.tx.us/statdoc/faqs2300.shtml) describes the basics most states share:

- The signer must **personally appear** before the notary. Notarizing over the phone is not allowed.
- The signer is **identified** by being personally known to the notary, by a current government photo ID or passport, or by a credible witness.
- A notary **should not notarize** a document they are a party to or have an interest in, so the buyer or seller cannot notarize their own sale.

A notary does not check that the price is fair, that the seller owns the item or that the VIN is right. Those are still your job.

## Step by Step: Notarizing in Person

1. **Get the right form.** Use your state's official bill of sale if it has one, or a complete written bill of sale like the sample below.
2. **Fill in everything except signatures.** Names, addresses, date, item description, identifiers, price and payment. Blank spaces invite questions, and some notaries will not notarize an incomplete document.
3. **Do not sign yet.** You sign in front of the notary.
4. **Bring ID.** A current driver's license, state ID or passport. If both parties must sign under notary, both bring ID.
5. **Find a notary.** Banks, credit unions, shipping stores, law offices and some tag or county offices offer notary services. Call ahead about fees and hours.
6. **Sign and get the seal.** The notary completes the certificate, signs and stamps it. Check the date and names before you leave.
7. **Make copies.** Each party keeps an original or a copy, and the original goes wherever the state needs it.

## Notarizing Online

Some states allow remote online notarization over video. In Texas, for example, the [Secretary of State](https://www.sos.state.tx.us/statdoc/online-np-educational.shtml) describes it as a notarization by two-way video and audio, where a third-party service checks the signer's ID document and asks identity-verification questions. The notary must be in Texas, but the signer may be anywhere. An online notary may charge up to $25 on top of the regular fee, and the session recording is kept for five years.

Before you use an online notary for a vehicle, boat or trailer, ask the agency that will receive the bill of sale whether it accepts an electronically notarized document. Rules for remote notarization vary by state.

## A Notary-Ready Sample

> **BILL OF SALE**
>
> I, Denise Moreau, 14 Bayou Rd, Lafayette, LA ("Seller"), sell and transfer to Corey Landry, 302 Pine St, Lafayette, LA ("Buyer"), the following vehicle: 2017 Ford F-150, white, VIN [17 characters], odometer 96,120 miles, for $17,400.00, paid by cashier's check no. 40871, received in full on November 21, 2026.
>
> The vehicle is sold as is, with all faults, and the seller makes no warranty, express or implied.
>
> Seller signature: ____________ Date: ______
>
> Buyer signature: ____________ Date: ______
>
> [Notary certificate: state, county, date, notary's signature, seal and commission details, completed by the notary]

Leave room at the bottom for the notary's certificate. Many notaries attach their own if the page has no space. For the as-is wording, see our [as-is bill of sale guide](/blog/as-is-bill-of-sale).

## Item-Specific Guides

What goes in the body of the bill of sale depends on what you are selling:

- [Motorcycle bill of sale](/blog/motorcycle-bill-of-sale): VIN, engine number and odometer
- [Boat bill of sale](/blog/boat-bill-of-sale): HIN, motor and trailer listed separately
- [Trailer bill of sale](/blog/trailer-bill-of-sale): VIN, weight class and homemade trailers

## Give the Buyer a Payment Receipt

A notarized bill of sale proves the transfer. A payment receipt is a simple record that the money was received. Open the [sales receipt template](/templates/sales-receipt), enter the item and price, add the payment method and reference, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free.

Only notarize a bill of sale for a real sale, with both parties' true names and the price actually paid. Putting a false price on a notarized document to cut tax is a misstatement to the state.

This is general information, not legal advice. Notary and title rules vary by state; your state DMV and secretary of state are the authorities for your sale.`,
    faqs: [
      {
        q: "Does a bill of sale need to be notarized?",
        a: "Usually not, but some states require it. Louisiana requires the title assignment before a notary and a notarized bill of sale if one is used; West Virginia requires a notarized bill of sale when less than half of low book value was paid. Check your state's DMV.",
      },
      {
        q: "Should I sign the bill of sale before going to the notary?",
        a: "No. Fill it in completely but sign in front of the notary, who has to see you sign and check your ID.",
      },
      {
        q: "Can a bill of sale be notarized online?",
        a: "In states that allow remote online notarization, often yes. Texas, for example, allows it over two-way video with ID checks. Ask the agency receiving the document whether it accepts an online notarization first.",
      },
      {
        q: "What do I bring to get a bill of sale notarized?",
        a: "The completed but unsigned bill of sale, a current government photo ID for each person signing, and the notary fee. If both buyer and seller must sign under notary, both should attend.",
      },
      {
        q: "Does the notary check that the sale is valid?",
        a: "No. The notary confirms who signed and that they signed in person. The price, the description and the seller's ownership are the parties' responsibility.",
      },
    ],
  },
];
