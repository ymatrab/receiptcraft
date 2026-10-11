/**
 * Day 2026-10-31, slot b (14:00Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "bill of sale for dog"  390/mo
 *   -> owner /templates/sales-receipt; one link to /templates/google-docs (bill of sale
 *      Google Doc, live 2026-10-11 per coordinator)
 * Angle: what to write in a puppy/dog bill of sale, with sample health guarantee wording.
 * State rules vary; one official example only.
 *
 * Facts checked 2026-10-11:
 *   - New York State Assembly consumer committee summary of the Pet Lemon Law,
 *     https://www.assembly.ny.gov/comm/Consumer/20080501o : covers pets bought from dealers
 *     selling more than nine dogs or cats a year; dealer must give a printed consumer rights
 *     notice; a licensed vet certifies unfitness within a set window; remedies are refund,
 *     exchange, or reimbursement of vet costs capped at the purchase price. Day counts not
 *     quoted because the law was amended after that summary.
 */

export const OCT_31B_DOG_BILL_OF_SALE = [
  {
    slug: "dog-bill-of-sale",
    image: "assets/dog-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-10-31T14:00:00Z",
    title: "Dog Bill of Sale: What to Include When Selling a Puppy",
    seoTitle: "Bill of Sale for a Dog: What to Include + Example",
    seoDescription:
      "How to write a bill of sale for a dog or puppy: buyer and seller, breed, date of birth, microchip, registration, price, health records and guarantee terms.",
    excerpt:
      "A dog bill of sale records who sold which dog to whom, for how much, and on what terms. Here is every field, sample health guarantee wording, and a worked puppy sale example.",
    body: `**A dog bill of sale is a signed record that transfers ownership of a dog from seller to buyer. It names both parties, identifies the dog (breed, sex, color, date of birth, microchip and registration numbers), states the price and how it was paid, lists the health records handed over, and sets out any health guarantee or "as is" terms.** Breeders and private sellers can lay one out with our [sales receipt template](/templates/sales-receipt) and add the terms in the notes.

## What to Include

| Field | Example |
|---|---|
| Seller name, address, phone | Hollow Creek Labradors, Rt 9, Hudson, NY |
| Buyer name, address, phone | Priya Shah, 14 Birch Ln, Albany, NY |
| Date of sale | Oct 30, 2026 |
| Breed | Labrador Retriever |
| Sex and color | Female, yellow |
| Date of birth | Aug 21, 2026 |
| Microchip number | 15-digit number from the chip registry |
| Registration details | Litter or individual registration number, if any |
| Sire and dam | Names of the parents |
| Price and payment | $1,500.00, deposit and balance shown separately |
| Health records provided | Vaccinations, deworming, vet exam date |
| Guarantee or "as is" terms | See below |
| Signatures | Seller and buyer, both dated |

Identify the dog so precisely that nobody could confuse it with a littermate. The microchip number does that best.

## A Worked Example

| Description | Amount |
|---|---|
| Labrador Retriever puppy, female, yellow, DOB Aug 21, 2026, chip ending 4471 | $1,500.00 |
| Starter kit (food, collar, blanket) | $40.00 |
| **Total price** | **$1,540.00** |

Payment line: "Deposit of $300.00 paid Sep 25, 2026; balance of $1,240.00 paid in cash on Oct 30, 2026." Notes: "First DHPP vaccine Oct 3, 2026; dewormed at 2, 4, 6 and 8 weeks; vet exam Oct 20, 2026 (records attached). Health guarantee: see terms." Both parties sign and date it.

## Health Guarantee or "As Is"

Spell out which one applies. Sample wording:

> **Health guarantee:** Seller guarantees the puppy is in good health on the date of sale. Buyer will have the puppy examined by a licensed veterinarian within [number] days. If the vet finds an illness that existed at the time of sale, seller will [refund the purchase price / replace the puppy / reimburse vet costs up to the purchase price].

> **As is:** Buyer accepts the dog as is, with no guarantee of health or temperament beyond any rights given by state law.

Keep the guarantee to what you will actually honor, and make sure it does not take away rights the buyer has under state law.

## State Rules Vary

Several states have "pet lemon laws" for dogs bought from dealers or breeders. They differ in who is covered, how long the buyer has to get a vet exam and what the seller must hand over. In New York, for example, the [state Assembly's summary of the Pet Lemon Law](https://www.assembly.ny.gov/comm/Consumer/20080501o) explains that it covers dealers selling more than nine dogs or cats a year, that the dealer must give a printed consumer rights notice, and that a buyer whose vet certifies the animal unfit can choose a refund, an exchange, or reimbursement of vet costs up to the price. Check your own state's agriculture department or attorney general before relying on any deadline.

## Rehoming or Giving a Dog Away

A bill of sale is still worth writing when no money changes hands, or when a family rehomes an adult dog for a small fee. Write the price as $0.00 or the actual fee, list the vet records and any known health or behavior issues, and include a line about what happens if the new owner can no longer keep the dog, for example "Buyer will offer the dog back to the seller before rehoming." The microchip registration should move to the new owner on the same day.

## How to Write It, Step by Step

1. Fill in both parties' full names and contact details.
2. Describe the dog: breed, sex, color, date of birth, microchip and registration numbers.
3. State the price, any deposit already paid, and how the balance was paid.
4. List the health records you are handing over and attach copies.
5. Write the guarantee or "as is" clause, and any return or rehoming terms.
6. Both sign and date two copies; each keeps one.

If you take a deposit weeks before pickup, give a separate receipt for it. Our [partial payment receipt guide](/blog/partial-payment-receipt) shows how. The same logic applies to any private sale of something valuable; our [car sale receipt guide](/blog/car-sale-receipt) covers vehicles.

## Ready-Made Options

Prefer a word-processor document? Our [free Google Docs templates](/templates/google-docs) include a general bill of sale you can copy and edit. To produce a clean receipt for the payment itself, build it on [makecepeit](/create) for free; a watermark-free download needs an account. A bill of sale must describe a real sale of a dog you own.

This is general information, not legal advice.`,
    faqs: [
      {
        q: "Do I need a bill of sale to sell a dog?",
        a: "It is not always legally required, but it is the clearest proof of ownership transfer and of the terms you agreed. Some state laws require dealers to give specific written notices.",
      },
      {
        q: "What should a puppy bill of sale include?",
        a: "Seller and buyer details, date, breed, sex, color, date of birth, microchip and registration numbers, price and payment, health records provided, guarantee or as-is terms, and both signatures.",
      },
      {
        q: "Should I include the microchip number?",
        a: "Yes. It is the most reliable way to identify the specific dog, and the buyer will need it to update the chip registration.",
      },
      {
        q: "What is a health guarantee in a dog sale?",
        a: "A written promise about the dog's health at the time of sale, usually with a deadline for a vet exam and a remedy such as a refund, replacement or vet cost reimbursement.",
      },
      {
        q: "Can I sell a dog as is?",
        a: "You can state that in the bill of sale, but it may not override rights a buyer has under your state's pet purchase laws.",
      },
      {
        q: "What is a pet lemon law?",
        a: "A state law that gives buyers remedies if a dog bought from a covered seller is found sick or unfit by a vet within a set period. Coverage and deadlines vary by state.",
      },
      {
        q: "Should the deposit be on the bill of sale?",
        a: "Yes. Show the full price, the deposit already paid with its date, and the balance paid at pickup.",
      },
      {
        q: "Does a bill of sale transfer AKC or other registration?",
        a: "No. Registration is transferred through the registry's own process. The bill of sale should record the registration number and who will complete the transfer.",
      },
      {
        q: "Does a dog bill of sale need to be notarized?",
        a: "Usually not. Signatures from both parties are normally enough, though either side can ask for notarization.",
      },
      {
        q: "Who keeps the bill of sale?",
        a: "Both. Sign two copies so the buyer and seller each have an original.",
      },
    ],
  },
];
