/**
 * Oct-sprint — Day 2026-10-01 (2 posts). Notion board Order 11 and 12, big-box cluster.
 *   11. "walmart receipt maker"      480/mo · CPC $3.57 · Low -> /brands/walmart
 *   12. "walmart receipt generator"  390/mo · CPC $3.13 · Low -> /brands/walmart
 *
 * Cannibalization guard: four Walmart spokes run across Oct 1 and Oct 3, so each
 * owns one question. #11 owns the situation — the slip is gone and you need a
 * readable copy of a purchase you made. #12 owns the anatomy — what a supercenter
 * receipt actually prints, line by line, and how to reproduce it accurately.
 * #13 owns the reusable layout and #14 owns printing. They cross-link in that order.
 *
 * Separate from the live retrieval cluster: /blog/walmart-receipt-lookup is how to
 * get the store's own copy. Both posts link there rather than competing with it —
 * that is the honest route and it keeps the retrieval query on the page built for it.
 *
 * Legitimacy: every section frames this as documenting a purchase you actually made.
 * No logos, no store branding, no suggestion a copy substitutes for the original.
 */

export const OCT_1 = [
  {
    slug: "walmart-receipt-maker",
    image: "assets/walmart-receipt-maker.jpeg",
    category: "small-business",
    publishedAt: "2026-10-01T09:30:00Z",
    title: "Walmart Receipt Maker: Rebuild Your Record",
    seoTitle: "Walmart Receipt Maker: Rebuild Your Record",
    seoDescription:
      "Learn how a Walmart receipt maker rebuilds a clean copy of a purchase you already made, what details to gather first, and how to do it with Makecepeit.",
    excerpt:
      "A Walmart receipt maker rebuilds a readable copy of a purchase you already made, using the date, store number, items and payment details you can recover yourself. Here's how.",
    body: `A **Walmart receipt maker** is a tool that rebuilds a readable copy of a store purchase you already made, for shoppers, contractors, freelancers and small business owners whose paper slip faded, tore or went through the wash. It produces one clear document carrying the same facts the original carried: the store, the date, the items, the tax and the method of payment.

Across the United States, thermal receipts fade within months, and the ones that survive a purse or a truck cab rarely survive a year. Makecepeit lets you [create a receipt](/create) from a fixed layout, so a purchase you are documenting reads the same way every time, whether it is one grocery run in Dallas or a month of supply trips in Chicago.

## What Is a Walmart Receipt Maker?

**It is a receipt builder used to reconstruct a record of a purchase whose original slip is lost, faded or damaged.**

The phrase describes the job, not a product sold by the retailer. You supply what you know about the purchase, the tool arranges it into a standard receipt layout, and you keep the result with your own records. Nothing about that process reaches the store's systems, and the output is your document rather than a reissue of theirs.

That distinction matters more than it sounds. A rebuilt copy is a personal record, useful for budgeting, reimbursement and warranty files. It is not a replacement for the retailer's own transaction record, and it should never be presented as one.

### What it is not

It is not a reprint service, and it does not reach into any retailer's database to find what you bought. Nothing you enter is checked against a store record, which is why the accuracy of a rebuilt copy rests entirely on the care you take with it. Treat it as a document you are signing rather than one you are requesting, and the right level of caution follows naturally.

## What Information Do You Need Before You Start?

- **Purchase date**, which your bank or card statement will confirm
- **Store number or location**, such as the city and state you shopped in
- **Item descriptions** for the things you actually bought
- **Quantities and unit prices** where you can recall or verify them
- **Subtotal** before tax
- **Sales tax** charged on the taxable portion
- **Total paid**, which should match the statement line exactly
- **Payment method**, with only the last four digits of a card
- **Time of day**, if you have it, which helps when two trips fall on one date

### Where those details usually survive

The total and the date are the easiest to recover, because they sit on your statement. Item detail is harder, and for a large grocery run it may be partly reconstructed from memory. A photo taken at the register, an order confirmation email or a shared household note often fills the gap.

## Receipt Maker vs. Store Receipt Lookup

**Ask the retailer first when you need the original, and rebuild a copy only when the original cannot be produced.**

| Question | Store receipt lookup | Receipt maker |
|---|---|---|
| Who produces it | The retailer, from their records | You, from what you know |
| Typical wait | Minutes to several days | A few minutes |
| Proof of purchase for a return | Usually accepted | Generally not accepted |
| Works for cash purchases | Often not | Yes |
| Useful for budgets and expense files | Yes | Yes |
| Contains the store's own transaction codes | Yes | No |

Our guide to [looking up a Walmart receipt](/blog/walmart-receipt-lookup) covers the app, the website and the service desk. If a return or a warranty claim is the reason you are searching, start there. A rebuilt copy earns its keep afterwards, once the original is genuinely unavailable.

### When each one wins

A lookup wins whenever somebody else has to accept the document: a service desk, a manufacturer handling a warranty claim, a card issuer reviewing a dispute. A rebuilt copy wins when the reader is you, your bookkeeper or your accountant, and when the original no longer exists to be found. Cash purchases fall almost entirely into the second group, because there is often nothing for the retailer to look up in the first place.

## Why Walmart Receipt Records Matter in the United States

**Because the thermal paper fades long before the reasons you might need the record do.**

Warranty periods on tools, appliances and electronics commonly run a year or longer. Tax records for a small business are generally kept for several years. Household budgets get reviewed monthly. The paper, meanwhile, is printed with heat-sensitive dye that fades with sunlight, heat and time, and a glovebox in Phoenix will finish a receipt in a season.

Businesses in New York, Texas and Florida also answer to state revenue departments whose record-keeping expectations vary. The IRS describes the general principle plainly enough: keep records that support what appears on a return. How long, and in what form, depends on your circumstances, and a tax professional is the right person to ask about your own.

> **Important:** a receipt you rebuild documents a purchase that genuinely happened. Creating a document for a purchase that did not happen, or passing a recreated copy off as the retailer's original, is fraud in any state.

### How long records stay useful

A grocery receipt may stop mattering the moment the card statement clears. An appliance receipt may matter in three years, when a compressor fails inside a warranty period nobody remembers the terms of. Because the paper fades on the same schedule regardless, the practical answer is to rebuild the ones attached to something durable — tools, electronics, appliances, business supplies — and let the rest go.

## How to Make a Walmart Receipt Copy in Five Steps

1. **Pull the statement line.** Find the transaction on your bank or card statement and note the exact date and total.
2. **List what you bought.** Write the items out, with quantities and unit prices where you have them.
3. **Check that the math lands.** Your item total plus tax should equal the amount the statement shows.
4. **Enter the details once.** Open the builder, fill the store, date, items, tax and payment fields, and leave nothing guessed that you can verify.
5. **Save and file it.** Download the finished copy and store it with the statement page it came from, so the two support each other.

![A Walmart receipt maker shown as a clean banner layout, with a placeholder store name and supercenter number at the top, a dated column of item lines with quantities and prices, a subtotal and sales tax row, and a highlighted total matching the shopper's own bank statement.](assets/walmart-receipt-maker-2.jpeg)

### Checking the arithmetic

Add the item lines, apply the tax, and compare the result with the statement. If the two differ by a few cents, a price was probably mis-remembered. If they differ by several dollars, an item is missing. Closing that gap before you save is what separates a copy somebody can rely on from a rough note, and the accuracy costs nothing but a second pass.

## Reading the Purchase Back From Your Bank Statement

**The statement gives you the date and the total; everything else you reconstruct around those two anchors.**

A card statement usually shows a merchant descriptor, a city and an amount. That is enough to fix the purchase in time and to set the figure your rebuilt copy must reach. Work backwards from it: if your item lines and tax do not add up to the statement total, something is missing or mis-remembered, and the gap is worth closing before you save.

Debit purchases in Los Angeles and credit purchases in Miami look much the same on a statement. Cash purchases show nothing at all, which is exactly the case where a rebuilt copy does the most work, and also the case where honesty about what you remember matters most.

## Household Budgets and Shared Expenses

**A readable copy settles the small questions that paper receipts usually lose.**

Roommates splitting a supply run, couples tracking a monthly grocery figure and parents reimbursing an adult child for a shopping trip all need the same thing: a line-by-line record both sides can read. A faded strip of thermal paper cannot do that job by February.

For a small business, the same copy feeds bookkeeping. Supplies bought on a Saturday trip in Houston often never reach the accounts because the slip disappeared, and a rebuilt copy attached to the statement line closes that hole.

### Reimbursement between people

When one person pays and another repays, the receipt is the whole conversation. A rebuilt copy showing items, tax and a total settles it without anybody relying on memory, and it may prevent the slow disagreement that starts when two people recall a figure differently. Keep it plain, send it once, and file the copy you sent.

## What a Receipt Maker Cannot Do

**It cannot create proof that a purchase happened, and it cannot stand in for the retailer's record.**

- It does not connect to any store's transaction system
- It does not generate valid store transaction codes or survey invitations
- It is generally not accepted as proof of purchase for a return
- It does not extend or establish a manufacturer's warranty on its own
- It cannot recover item detail you never had

Used for what it is — a personal record of a real purchase — it is genuinely useful. Used as a substitute for the store's own paperwork, it fails, and the failure is the point at which honest record-keeping turns into something else.

## Why Use makecepeit for Walmart Receipt Copies?

**Because the layout stays fixed, so every copy you build reads the same and the math is done for you.**

- Enter the items once and the totals calculate as you type
- A consistent structure across every receipt you rebuild
- Fields for store, date, tax and payment method in the order a reader expects
- Download as a clean file you can attach to a statement or an expense claim
- Nothing to install, and no account needed to build one

The builder is [free to start](/create), and the same layout serves a grocery run, a tools purchase or a month of small supply trips.

## Tips Before You Rebuild a Receipt

- Check the statement before you type, not afterwards
- Record the store's city and state rather than inventing a street address
- Mask the card number down to the last four digits
- Keep item descriptions plain and recognisable
- Note anywhere you estimated, so a later reader knows
- Save the copy in the same folder as the statement it matches
- Rebuild one receipt per transaction, never a month in one document

## Common Mistakes to Avoid

- **Making the total match by inventing a line.** If the math is short, say so rather than padding it.
- **Copying store branding.** A copy for your own records needs no logo, and reproducing one invites a trademark problem.
- **Fabricating transaction codes.** Invented store codes look real and are not, which is exactly the wrong combination.
- **Writing a full card number.** Last four digits only, on any receipt you keep or send.
- **Using a rebuilt copy for a return.** Ask the retailer for the original instead.
- **Rounding the tax.** Enter the taxable subtotal and let the calculation land where it lands.
- **Backdating a purchase.** The date on the statement is the date on the receipt.

## Final Takeaway

A Walmart receipt maker earns its place in one situation: you made a purchase, the paper is gone, and you still need a readable record of what you spent. Gather the date and total from your statement, reconstruct the items honestly, and keep the result with the paperwork it supports.

When the original matters — a return, a warranty claim, a dispute — ask the retailer first. A rebuilt copy is for your files, and within those limits it does its job well.

Keep the rebuilt copy honest about its own nature. A note in your folder saying where the figures came from, and which parts were reconstructed rather than recovered, costs one line and answers the only question a later reader is likely to raise.

## Create Your Receipt With makecepeit

Enter the store, the date, the items and the way you paid, and the totals calculate as you go. [Build your receipt](/create) and keep it filed beside the statement it matches.`,
    faqs: [
      {
        q: "What is a Walmart receipt maker?",
        a: "It is a receipt builder used to reconstruct a readable copy of a purchase you already made, when the original paper slip is lost, faded or damaged.",
      },
      {
        q: "Is a rebuilt receipt accepted for a return?",
        a: "Generally not. Retailers verify returns against their own transaction records, so ask the store to look up the original purchase instead.",
      },
      {
        q: "What details do I need to rebuild one?",
        a: "The date and total from your statement, the store location, the items you bought, the sales tax charged and the payment method used.",
      },
      {
        q: "Where do I find the purchase date?",
        a: "Your bank or card statement shows the date and the exact amount, which are the two anchors every rebuilt copy should be built around.",
      },
      {
        q: "Can I rebuild a receipt for a cash purchase?",
        a: "Yes, and cash is the case where it helps most, because no statement line exists. Record only what you genuinely remember buying.",
      },
      {
        q: "Should the copy carry the store logo?",
        a: "No. A record for your own files needs no branding, and reproducing a retailer's logo on a document you created raises a trademark problem.",
      },
      {
        q: "How long should I keep receipt records?",
        a: "It depends on why you need them. Warranties often run a year or more, and business records are generally kept longer. Ask a tax professional about your situation.",
      },
      {
        q: "Does the sales tax rate have to be exact?",
        a: "It should reflect what you were actually charged. Rates vary by state and locality, so work from the statement total rather than a rounded guess.",
      },
      {
        q: "How much card information should appear?",
        a: "Only the last four digits. Full card numbers do not belong on any receipt you keep, print or send to somebody else.",
      },
      {
        q: "Is making a receipt copy legal?",
        a: "Documenting a purchase you genuinely made is ordinary record-keeping. Creating a receipt for a purchase that never happened, or passing a copy off as the store's original, is fraud.",
      },
    ],
  },
  {
    slug: "walmart-receipt-generator",
    image: "assets/walmart-receipt-generator.jpeg",
    category: "small-business",
    publishedAt: "2026-10-01T14:00:00Z",
    title: "Walmart Receipt Generator: Every Line Right",
    seoTitle: "Walmart Receipt Generator: Every Line Right",
    seoDescription:
      "Learn what a Walmart receipt generator reproduces, from the store line and item rows to sales tax and tender, and build an accurate copy with Makecepeit.",
    excerpt:
      "A Walmart receipt generator reproduces the structure of a supercenter slip: store details, item lines, subtotal, sales tax and how you paid, so your copy reads like the record it replaces. Here's how.",
    body: `A **Walmart receipt generator** is a tool that lays out a supercenter-style receipt field by field, for shoppers rebuilding a lost record, bookkeepers reconciling a card statement and small business owners filing supply purchases. It produces a document whose structure matches what a big-box register prints: a header, a column of item lines, a subtotal, a tax row and a tender line.

Getting that structure right is what makes a copy readable to somebody else. Makecepeit lets you [generate a receipt](/create) with those fields in the order a reader expects, so a purchase made in Atlanta reads the same way as one made in Seattle.

## What Is a Walmart Receipt Generator?

**It is a builder that arranges the details of a real purchase into the layout a big-box store receipt uses.**

The value is in the arrangement. Anybody can write down what they spent, but a record that separates items from tax from payment is one a bookkeeper, a partner or an expense reviewer can check in seconds. A generator enforces that separation instead of leaving it to memory.

It is a personal record, produced by you from facts you can verify. It carries no connection to the retailer's systems and holds no transaction codes of theirs.

### Why the arrangement matters

Two documents may carry identical facts and still differ in how quickly somebody can check them. A reader scanning for the tax line expects it under the subtotal; a reader matching a card statement looks for the tender row at the foot. Following the conventional order is not decoration, it is what lets a reviewer confirm in seconds that the copy and the statement agree.

## What Does a Supercenter Receipt Actually Show?

- **Store identity**, usually a store number alongside the city and state
- **Date and time** of the sale
- **One line per item**, with a description and a price
- **Quantities** where more than one of something was bought
- **Subtotal** before tax is applied
- **Sales tax**, often split by taxable category
- **Total** paid
- **Tender**, naming the payment method and the last four digits of a card
- **Change given**, on cash transactions

### The fields people leave out

Time of day, quantity columns and the tax line are the three most often dropped when somebody reconstructs a purchase from memory, and they are the three that make the copy checkable. A receipt with items and a total but no tax row leaves a reader unable to tell whether the numbers agree.

## Item Lines: Quantities, Unit Prices and Line Totals

**Each line should say what was bought, how many, at what price, and what that came to.**

Three items at $6.47 is a line total of $19.41, and writing that out lets any reader verify the arithmetic without redoing it. Where a store prints a weight instead of a quantity, as it does for produce, record the weight and the price per pound in the same way.

Descriptions should be recognisable rather than technical. "Printer paper, 500 sheets" tells a reviewer what they need; a register abbreviation does not. Plain descriptions also spare you from inventing product codes, which is a mistake covered further down.

### Weighted items and produce

Loose produce, deli counter items and anything else sold by weight print differently: a weight, a price per pound and the resulting line total. When you rebuild one of those lines, keep the same three parts rather than collapsing them into a single figure, because a reader who cannot see the weight may have no way to tell whether the price was right.

## Sales Tax and Why the Line Varies

**Tax on the same basket differs by state, by city and by what the basket contains.**

Grocery items are treated differently from general merchandise in many states, which is why a single trip can produce two tax figures on one slip. Rates also change, and the combined state and local rate in Chicago is not the rate in Portland. A generated copy should carry the tax you were actually charged, not a national average.

| Field | What to enter | Common error |
|---|---|---|
| Subtotal | Total of the item lines before tax | Entering the amount paid instead |
| Tax rate | The rate applied to your taxable items | Using a rounded national figure |
| Tax amount | What the register charged | Recalculating and getting a different number |
| Total | The figure on your bank statement | A total that does not match the statement |
| Tender | Method plus last four digits | Writing the full card number |

If your own arithmetic disagrees with the statement, the statement wins. The difference usually means a taxable item was missed or a price was mis-remembered.

### Mixed baskets

A single trip that includes milk, a screwdriver and a pack of socks may produce more than one tax figure, because states treat food and general merchandise differently. Rebuilding that basket under one flat rate will usually miss the statement total by a small amount, and the mismatch is the first thing a careful reader notices.

## Why Accurate Receipt Copies Matter in the United States

**Because a copy that does not reconcile with the statement is worse than no copy at all.**

Expense reviewers, bookkeepers and tax preparers work by matching documents to bank lines. A receipt copy whose total sits a dollar away from the statement raises a question in every one of those readers, and answering it costs more time than building the copy did.

Businesses in California, Illinois and Georgia keep records under different state regimes, and the IRS expects records that support what a return claims. Treatment varies with circumstances, so a tax professional is the right person to ask how long to keep what. The general rule holds everywhere: the document and the money trail should agree.

> **Important:** a generated receipt records a purchase that actually happened. Inventing a purchase, or presenting a copy you produced as the store's own document, is fraud.

### The reconciliation habit

Bookkeepers reconcile because memory is unreliable and arithmetic is not. Applying the same habit to a single receipt copy takes a minute: open the statement, open the copy, confirm the date and the total agree. Anything that fails that check is worth fixing immediately, while you still remember the trip well enough to correct it.

## How to Generate an Accurate Copy

1. **Start from the statement line**, which fixes the date and the total.
2. **Enter the store city and state**, plus a store number if you know it.
3. **Add the item lines**, one per product, with quantities and unit prices.
4. **Enter the taxable subtotal** and the tax you were charged.
5. **Check the total** against the statement, to the cent.
6. **Record the tender**, masking all but the last four digits.
7. **Save the file** alongside the statement page it matches.

![A Walmart receipt generator shown as a clean banner layout, with a placeholder store name and store number in the header, a dated column of item lines with quantities and unit prices, a subtotal, a sales tax row and a highlighted total above the tender line.](assets/walmart-receipt-generator-2.jpeg)

## Generator vs. Template: Which Should You Use?

**Use a generator for one purchase you are reconstructing now, and a template when you expect to do it repeatedly.**

A generator walks you through the fields and calculates as you go, which suits a one-off reconstruction where accuracy matters more than speed. A reusable layout suits a contractor filing a supply purchase every week, where the header never changes and only the items do. Our guide to the [Walmart receipt template](/blog/walmart-receipt-template) covers that reusable side.

Either way the fields are the same. The choice is about how often you fill them in.

## Card Data, Privacy and What to Mask

**Keep the last four digits and nothing more.**

Card networks and the Federal Trade Commission have pushed truncation on printed receipts for years, and the reasoning applies just as well to a document you produce yourself. A receipt copy travels: it goes into shared folders, gets emailed to an accountant and is sometimes printed and left on a desk.

Leave out the full card number, any expiry date and anything resembling an authorisation code. Your own records lose nothing by it, and a copy that leaks card data creates a problem nobody wants.

### Where copies travel

A receipt copy rarely stays where it was made. It may be emailed to an accountant in another state, dropped into a shared folder a whole team can open, or printed and left in a tray. Masking the card number is cheap insurance against all three, and no legitimate use of the document needs the other twelve digits.

## When You Should Ask the Retailer Instead

**Whenever the store's own record is what the situation actually calls for.**

Returns, exchanges, warranty claims and payment disputes are all resolved against the retailer's transaction history. A copy you generated has no standing there, and offering one in place of the original wastes a trip to the service desk.

Our [Walmart receipt lookup guide](/blog/walmart-receipt-lookup) sets out how to retrieve the original through the app, the website or the store. Generate a copy for your files, and go to the retailer for anything that needs their record.

## Why Use makecepeit for Receipt Copies?

**Because the structure is already correct, so the only thing left to get right is the data.**

- Item lines, subtotal, tax and tender in the order a reader expects
- Totals that recalculate as you edit, so the math cannot drift
- The same layout every time, which makes a folder of copies easy to scan
- A clean download you can attach to a statement or an expense report
- Free to start, with nothing to install

## Tips for an Accurate Reconstruction

- Work from the statement, never from memory alone
- Enter one line per item rather than grouping them
- Record the tax you were charged, not a rate you looked up
- Use plain item descriptions a stranger could follow
- Note where you estimated something
- Keep the city and state honest
- Check the total twice before you save

## Common Mistakes to Avoid

- **Inventing store transaction codes.** They look authoritative and are fabricated, which is the worst combination on a document.
- **Reproducing the retailer's logo.** Your record does not need it, and copying it creates a trademark problem.
- **Letting the total drift from the statement.** A copy that does not reconcile raises questions instead of answering them.
- **Merging two trips into one receipt.** One transaction, one document.
- **Writing a full card number.** Mask it to four digits, always.
- **Applying one tax rate to a mixed basket.** Groceries and general merchandise are often taxed differently.
- **Treating the copy as proof for a return.** That is the retailer's record, not yours.

### What good looks like

A well-built copy can be checked by somebody who was not there. The date matches the statement, the items are recognisable, the tax sits on its own line and the total lands to the cent. Nothing on it claims to be the retailer's document, and nothing on it was invented to make a number work.

## Final Takeaway

A Walmart receipt generator is useful precisely to the degree it is accurate. Build from the statement line, list the items honestly, carry the tax you were actually charged, and mask the card. A copy that reconciles to the cent is a record anybody can rely on.

For anything requiring the store's own document, ask the store. For your own files, a well-built copy does the job.

One habit makes the whole exercise worth doing: file the copy the same day you build it. A reconstruction sitting in a downloads folder may as well not exist, and the details you relied on to build it fade from memory faster than the paper did. Attach it to the statement page, name the file after the date and the store, and the record becomes something you can find a year later without effort.

That is ultimately what separates a useful receipt copy from a nice-looking one. The layout matters, the arithmetic matters more, and the filing is what makes either of them count when somebody finally asks what you spent.

## Create Your Receipt Copy With makecepeit

Enter the store, the items, the tax and the payment method, and watch the totals land where the statement says they should. [Generate your receipt](/create) and file it with the paperwork it supports.`,
    faqs: [
      {
        q: "What is a Walmart receipt generator?",
        a: "It is a builder that arranges the details of a purchase you made into the layout a big-box receipt uses, with item lines, a tax row and a tender line.",
      },
      {
        q: "What fields does a supercenter receipt print?",
        a: "Store identity, date and time, one line per item, a subtotal, sales tax, the total paid, and the tender showing how the purchase was paid for.",
      },
      {
        q: "Why does the tax line sometimes appear twice?",
        a: "Many states tax groceries differently from general merchandise, so a single basket containing both can produce two separate tax figures.",
      },
      {
        q: "What if my total does not match the statement?",
        a: "The statement wins. A gap usually means an item was forgotten or a price mis-remembered, so revisit the lines before saving the copy.",
      },
      {
        q: "Should I include store transaction codes?",
        a: "No. Those codes come from the retailer's systems, and inventing something that resembles one puts fabricated data on your record.",
      },
      {
        q: "How much of the card number should show?",
        a: "The last four digits only. Full numbers, expiry dates and authorisation codes do not belong on a receipt copy you keep or share.",
      },
      {
        q: "Can a generated receipt be used for a return?",
        a: "Generally not. Returns are verified against the retailer's own transaction record, so request the original through the store instead.",
      },
      {
        q: "Should I list quantities on each line?",
        a: "Yes. A description, a quantity and a unit price let any reader check the line total without recalculating the whole receipt.",
      },
      {
        q: "Generator or template, which is better?",
        a: "A generator suits a one-off reconstruction where accuracy matters most. A reusable template suits someone filing similar purchases week after week.",
      },
      {
        q: "Is generating a receipt copy legal?",
        a: "Recording a purchase you genuinely made is normal record-keeping. Creating a receipt for a purchase that never happened, or passing your copy off as the store's, is fraud.",
      },
    ],
  },
];
