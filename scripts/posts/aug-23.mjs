/**
 * August sprint — Day 23 (2 posts). Published 2026-09-07 with hero + inline.
 * Google Docs, hand-authored HTML pasted as text (headings, comparison tables,
 * blockquotes, Article + FAQPage JSON-LD). Transcribed verbatim into markdown-lite;
 * tables -> pipe tables, blockquotes -> "> ", pasted JSON-LD dropped (blog regenerates
 * Article + FAQ schema from the fields). Heading-wrapped homepage links unwrapped;
 * homepage mentions re-pointed to /create; Instapaper "see also." link dropped (e34 block 77).
 * The redundant title-echo h2 before the lede is dropped; table cells are plain strings.
 * e33's multi-line receipt-example blockquotes (which the single-line "> " converter would
 * split into separate boxes) are joined into one blockquote line with " · " so each stays
 * in a single callout with every value preserved.
 * Both are basics/definition posts.
 *   55. "how discounts and coupons should appear on receipts" -> /create (hero 55-2 cover, inline 55-1 example — reversed)
 *   56. "service charge vs gratuity on a receipt" -> /create           (hero 56-2 cover, inline 56-1 comparison — reversed)
 */

export const AUG_23 = [
  {
    slug: "how-discounts-coupons-appear-on-receipts",
    image: "assets/how-discounts-coupons-appear-on-receipts.jpeg",
    category: "basics",
    publishedAt: "2026-09-07T01:25:00Z",
    title: "How Discounts and Coupons Should Appear on Receipts",
    seoTitle: "How Discounts and Coupons Should Appear on Receipts",
    seoDescription:
      "Learn how discounts, coupons, subtotal, tax, and final totals should appear on an itemized receipt in the U.S., with clear examples and best practices.",
    excerpt:
      "Discounts and coupons should show on a receipt as clearly labeled, separate reductions — item discounts by the item, order coupons under the subtotal — so the total is easy to trace. Here's how.",
    body: `Discounts and coupons should appear clearly on an itemized receipt as separate reductions from the original price or subtotal, rather than being hidden inside the final amount. A well-structured receipt should allow the customer to see what each item originally cost, which discount or coupon was applied, how much was deducted, the taxable amount when relevant, the sales tax, and the final amount paid.

For businesses and consumers in the United States, this clarity is especially important because the sales-tax treatment of coupons can vary by state and by the type of promotion. Using a [receipt-building tool](/create) such as **makecepeit** can help organize line items, discounts, tax, and payment information into a readable transaction record.

## What Is the Correct Way to Show a Discount on an Itemized Receipt?

**The clearest method is to show the original charge first and the discount immediately below the affected item or in a separate discount section beneath the subtotal.** The discount should normally be displayed as a negative dollar amount or as a clearly labeled reduction.

For example, if a product normally costs $30 and a customer receives a $5 store discount, a readable receipt could display:

> Product A — $30.00 · Store Promotion — -$5.00 · Net Item Price — $25.00

This format gives the customer an immediate explanation of why the amount charged is different from the listed price. It also makes the transaction easier to review later for returns, reimbursement requests, bookkeeping, or expense documentation.

If a promotion applies to the entire purchase rather than one particular item, it generally makes more sense to show the discount after the merchandise subtotal.

## Should Coupons Appear as Separate Lines on a Receipt?

**Yes. Whenever practical, a coupon should appear as a separately labeled line showing its value and, when useful, the promotion or coupon name.**

A clear coupon line might look like:

- Store Coupon SAVE10: -$10.00
- Loyalty Discount: -$4.50
- Promotional Code WELCOME20: -$8.00
- Manufacturer Coupon: -$2.00

Showing the coupon separately is usually more transparent than silently changing the product price. Customers can confirm that the promotion was actually applied, while merchants retain a more useful transaction record.

The distinction between a retailer-funded discount and a manufacturer-funded coupon can also matter for sales-tax purposes in some states, making clear labeling useful for more than customer experience.

## Where Should Discounts Appear: Before or After the Subtotal?

The correct location depends on what the promotion applies to.

### Item-Level Discounts

An item-specific discount should normally appear directly beneath or beside the product it reduces. This connects the reduction to the correct merchandise and avoids confusion when multiple products are purchased.

### Order-Level Discounts

A coupon or promotion applying to the entire transaction should usually appear after the merchandise subtotal and before the final total.

A useful order is:

1. Individual products or services
2. Quantity and unit price
3. Item-level discounts
4. Subtotal
5. Order-level coupon or promotional discount
6. Applicable taxable amount
7. Sales tax
8. Other legitimate charges, when applicable
9. Grand total
10. Payment method

This hierarchy lets the reader understand how the receipt moved from individual prices to the amount ultimately paid.

## Example of an Itemized Receipt With Discounts and Coupons

Consider a simple retail transaction in which one discount applies to an individual product and another promotion applies to the order.

![Example of an itemized receipt with discounts and coupons: original item prices, an item discount and a SAVE10 coupon each shown as a separate negative line, then subtotal, sales tax, and the final total](assets/how-discounts-coupons-appear-on-receipts-2.jpeg)

| Receipt Entry | Amount | Recommended Presentation |
| --- | --- | --- |
| Product A | $29.99 | Original item price |
| Item Promotion | -$5.00 | Directly below Product A |
| Product B | $14.00 | Original item price |
| Subtotal After Item Discount | $38.99 | Separate subtotal line |
| Order Coupon | -$3.90 | Clearly labeled reduction |
| Adjusted Amount | $35.09 | Amount before applicable tax |
| Sales Tax | Calculated under applicable rules | Separate tax line |
| Total | Final amount due | Visually prominent |

The important principle is traceability. Someone reading the receipt should be able to reconstruct the transaction without guessing how the merchant reached the total.

## How Do Discounts and Coupons Affect Sales Tax in the United States?

**There is no single coupon-tax rule that should be assumed for every U.S. transaction.** The tax treatment can depend on the state, the nature of the discount, and whether a retailer receives reimbursement from a manufacturer or another third party.

New York guidance, for example, explains that discounts that genuinely reduce the selling price can reduce the taxable receipt. It also notes that store-issued coupons generally reduce the taxable receipt while manufacturer coupons can receive different treatment because the merchant may be reimbursed.

California similarly distinguishes retailer-funded discounts from certain manufacturer coupons and third-party reimbursements. The California Department of Tax and Fee Administration explains that manufacturer reimbursement can be included in taxable sales under applicable circumstances.

Texas guidance for grocery and convenience stores states that cash discounts reduce the item's price and treats coupons as cash discounts in that context, with tax collected on the resulting price.

These differences are why a business operating in New York City, Los Angeles, Austin, Chicago, or another U.S. market should configure its POS or receipt workflow according to the rules that apply to the actual transaction rather than relying on a generic national assumption.

A clear receipt should document what happened commercially. The tax calculation behind that receipt should then follow the applicable state and local requirements.

## What Types of Discounts Should Be Identified on a Receipt?

Different promotions should be labeled in a way that makes their purpose understandable. Common categories include:

- **Item discount:** A reduction attached to one specific product or service.
- **Store coupon:** A merchant-funded coupon that lowers the customer's charge.
- **Manufacturer coupon:** A coupon associated with a product manufacturer and potentially reimbursed to the retailer.
- **Order discount:** A percentage or dollar reduction applied to the overall qualifying purchase.
- **Loyalty discount:** A reduction connected to a rewards or membership program.
- **BOGO promotion:** A buy-one-get-one or similar multi-item promotion.
- **Promotional code:** An online or in-store code such as SAVE10 or WELCOME20.

Specific labels are preferable to vague wording such as simply "Adjustment." The receipt should tell the customer what changed and why.

## Why Clear Discount Itemization Matters in the United States

Receipt clarity has practical value for both customers and businesses. American consumers commonly use receipts for returns, warranties, reimbursements, budgeting, and expense reports. Businesses rely on transaction records for accounting, reconciliation, customer service, and tax documentation.

The IRS explains that supporting documents for business purchases and expenses should help establish information such as the payee, amount paid, payment evidence, date, and a description of what was purchased. Cash-register receipts, credit-card receipts, and invoices can form part of those records.

While that does not create a universal federal format for displaying every coupon, it illustrates why detailed transaction documentation is more useful than a receipt showing only a final total.

Good itemization also reduces customer-service friction. A buyer can immediately determine whether a $10 coupon was accepted instead of contacting the merchant because the expected discount cannot be identified.

## What Information Should Accompany a Discount on a Receipt?

A receipt does not need excessive detail, but the discount entry should contain enough information to explain the reduction.

Depending on the transaction, useful fields include:

- Original item price
- Product or service description
- Quantity
- Discount or coupon name
- Dollar value of the discount
- Percentage discount, when helpful
- Promotion code, if relevant
- Subtotal before an order-wide reduction
- Adjusted or taxable subtotal where appropriate
- Sales-tax amount
- Final transaction total

There is usually no benefit in cluttering a customer-facing receipt with internal campaign IDs or accounting codes unless they have a genuine operational purpose.

## How Should Percentage Discounts Be Displayed?

**A percentage discount should ideally show both the percentage and the dollar amount deducted.**

For example:

> Seasonal Discount (20%) — -$12.00

Displaying only "20% OFF" forces the customer to calculate the savings independently. Showing the actual dollar reduction makes the receipt easier to verify.

When the percentage applies only to selected items, placing the discount near those items is clearer than placing it at the bottom of the receipt without explanation.

## How Should Buy-One-Get-One Promotions Appear?

BOGO transactions should preserve the connection between the qualifying products and the promotion.

One readable approach is:

> Item A — $12.00 · Item A — $12.00 · BOGO Promotion — -$12.00

Another valid layout may show the second qualifying item at $0.00 with a label such as "BOGO Promotional Price." What matters is that the receipt clearly explains why one item's effective price was reduced.

Businesses should still verify how the promotion affects the taxable amount in their jurisdiction rather than assuming the visual receipt format determines tax treatment.

## Common Mistakes When Showing Discounts on Receipts

### Hiding the Discount Inside the Final Price

Changing a $50 product to $40 without showing the $10 promotion can make it difficult for customers to verify whether the intended offer was applied.

### Using Unclear Labels

Entries such as "MOD," "ADJ," or unexplained internal codes can confuse customers. Use recognizable descriptions whenever possible.

### Applying a Transaction Coupon to the Wrong Item

If an order-level discount is displayed next to one unrelated product, the receipt can imply that only that product received the reduction.

### Mixing Tax and Discount Lines

Sales tax should remain identifiable as its own amount rather than being combined with discounts or other adjustments.

### Assuming Every Coupon Has the Same Tax Treatment

Store discounts, manufacturer coupons, rebates, loyalty offers, and third-party promotions can be treated differently depending on state law and the structure of the program.

### Creating a Receipt That Does Not Match the Real Transaction

A receipt should accurately document a legitimate transaction. Never alter or generate receipt information for the purpose of misleading an employer, merchant, insurer, tax authority, financial institution, or other party.

## Best Practices Before Finalizing an Itemized Receipt

Before issuing or saving a receipt containing promotions, review it from the perspective of someone who did not witness the transaction.

1. Confirm every product or service appears with the correct quantity and price.
2. Check that item-specific discounts are attached to the correct products.
3. Display transaction-wide coupons after the appropriate subtotal.
4. Use recognizable discount and coupon labels.
5. Show the dollar amount deducted even when a percentage is displayed.
6. Keep sales tax on a separate line.
7. Verify that the tax calculation follows the applicable state and local rules.
8. Confirm the final total matches the amount actually paid.
9. Include the appropriate transaction date and merchant details.
10. Keep the layout simple enough to read on paper and digital screens.

## Why Use makecepeit for Clear Itemized Receipts?

For users who need to build a clear receipt from legitimate transaction information, **makecepeit** provides [a receipt-building workflow](/create) where business details, line items, prices, tax, tips, and payment information can be customized while viewing the receipt as it is created. The platform also supports downloadable receipt formats such as PDF and image files.

This type of visual workflow is useful when discounts need to remain understandable alongside the original merchandise, subtotal, tax, and final amount. Instead of treating the total as a single number, the receipt can be structured as a sequence that explains how the transaction was calculated.

For businesses, freelancers, and consumers, the goal should always be accurate documentation. A professional-looking receipt is valuable only when the underlying transaction information is truthful and consistent with applicable accounting and tax requirements.

## A Simple Formula for Organizing Receipt Totals

For many straightforward retailer-funded promotions, the visual structure can be understood as:

> Line Items → Item Discounts → Subtotal → Order Discounts → Applicable Taxable Amount → Sales Tax → Other Applicable Charges → Final Total

This is a presentation framework, not a universal sales-tax formula. The actual taxable base may depend on the jurisdiction and the source or structure of the promotion.

## Final Takeaway

Discounts and coupons on an itemized receipt should be visible, clearly labeled, and easy to connect to the products or subtotal they reduce. Item-level discounts belong near the affected item, while order-wide coupons are generally easier to understand when shown beneath the subtotal. The receipt should then identify the relevant taxable amount, sales tax, and final total without forcing the customer to reverse-engineer the transaction.

For U.S. transactions, businesses should pay particular attention to the distinction between retailer discounts, manufacturer coupons, rebates, and third-party promotions because their sales-tax treatment can vary by jurisdiction.

When you need to create a clear record of a legitimate transaction, **makecepeit** offers a practical way to organize itemized charges, discounts, taxes, and payment details into a readable receipt. Review every figure against the real transaction and applicable local tax rules before using the finished document.

## Create a Clearer Receipt With makecepeit

If you need to organize a legitimate transaction into a professional itemized receipt, use **makecepeit** to [structure the items, discounts, tax, and payment details](/create) clearly. Enter the real transaction information, review the totals carefully, and create a receipt that is straightforward for customers, bookkeeping, and recordkeeping.`,
    faqs: [
      { q: "How should discounts appear on an itemized receipt?", a: "Show the original price and display the discount as a clearly labeled negative amount. Item-specific discounts should appear near the relevant product." },
      { q: "Should coupons be listed separately on a receipt?", a: "Yes. A separate coupon line makes it easier to verify the promotion and understand how the final total was calculated." },
      { q: "Should a coupon appear before or after the subtotal?", a: "Item-level coupons usually belong beside the affected item. An order-wide coupon is generally clearest when shown after the merchandise subtotal." },
      { q: "Is sales tax calculated before or after a coupon?", a: "It depends on the jurisdiction and coupon type. Retailer discounts and manufacturer-funded coupons can receive different tax treatment under state rules." },
      { q: "How should a percentage discount appear?", a: "Show both the percentage and the dollar reduction when possible, such as \"20% Promotion — -$10.00.\"" },
      { q: "How should a manufacturer coupon appear on a receipt?", a: "Label it clearly as a manufacturer coupon rather than a generic discount, especially where reimbursement may affect the taxable amount." },
      { q: "Should the receipt show the original price before the discount?", a: "Yes, when practical. Showing the original price makes the customer's savings transparent and helps explain the transaction." },
      { q: "How should a BOGO discount appear?", a: "Show both qualifying items and either list the promotional reduction separately or clearly identify the free item's promotional price." },
      { q: "What should an itemized receipt include?", a: "A useful receipt typically includes merchant information, transaction date, individual items, quantities, prices, discounts, subtotal, tax, total, and payment information." },
      { q: "Are coupon rules the same in every U.S. state?", a: "No. Sales-tax treatment can vary by state, locality, coupon type, and whether a third party reimburses the retailer." },
    ],
  },

  {
    slug: "service-charge-vs-gratuity-on-receipt",
    image: "assets/service-charge-vs-gratuity-on-receipt.jpeg",
    category: "basics",
    publishedAt: "2026-09-07T01:26:00Z",
    title: "Service Charge vs Gratuity on a Receipt: U.S. Guide",
    seoTitle: "Service Charge vs Gratuity on a Receipt: U.S. Guide",
    seoDescription:
      "Understand service charge vs gratuity on a U.S. receipt, including tips, payroll, taxes, customer expectations, and clear receipt labeling.",
    excerpt:
      "A service charge is a mandatory fee the business sets; a gratuity is a voluntary tip the customer chooses. They're taxed and paid out differently — here's how to tell them apart on a receipt.",
    body: `**A service charge and a gratuity are not automatically the same thing on a U.S. receipt.** A gratuity, or tip, is generally an optional amount that the customer chooses. A service charge is generally a mandatory amount set by the business and added to the bill. That distinction matters for customers, employees, payroll, taxes, and receipt records.

The wording can be confusing because restaurants sometimes use terms such as "automatic gratuity," "service fee," or "service charge." Under federal tax rules, however, what matters is how the payment works—not simply what the receipt calls it. Makecepeit helps businesses and customers [create clearer transaction records](/create) by keeping items such as tax, tips, fees, and totals visibly separated.

> **Quick answer:** If the customer can freely choose whether to pay an amount and decide how much to leave, it is generally a tip. If the business requires the amount and determines its value, it is generally a service charge for federal purposes.

## What Is a Service Charge on a Receipt?

A **service charge on a receipt** is an additional amount that a business requires the customer to pay for a transaction or service. The business normally determines the charge in advance, either as a percentage of the bill or as a fixed amount.

Common examples include an 18% charge automatically added for a large restaurant party, a mandatory banquet charge, a hotel service fee, or a required charge included in a catering contract.

The IRS specifically distinguishes mandatory service charges from voluntary tips. Amounts automatically added to a customer's bill—including mandatory "auto-gratuities"—are generally treated as service charges rather than tips for federal tax purposes.

The important word is **mandatory**. If the customer cannot remove the charge or choose its amount, calling it a "gratuity" on the receipt does not necessarily make it a tip under federal rules.

## What Is Gratuity on a Receipt?

A **gratuity on a receipt** normally means a voluntary tip that a customer chooses to give to a worker for service. The customer decides whether to leave a tip and, in most situations, controls the amount.

A receipt might therefore contain a blank tip line or suggested percentages such as 15%, 18%, or 20%. Suggested amounts do not automatically turn the payment into a service charge when the customer remains free to select another amount—including zero.

The IRS looks at several factors when determining whether a payment is truly a tip: it should be made voluntarily, the customer should have an unrestricted right to determine the amount, the payment should not be dictated by employer policy, and the customer generally should have the right to determine who receives it.

## Service Charge vs Gratuity on a Receipt: Key Differences

![Service charge vs gratuity on a receipt: a service charge is a mandatory fee set by the business and often treated as wages, while gratuity is a voluntary tip chosen by the customer and typically intended for the service staff](assets/service-charge-vs-gratuity-on-receipt-2.jpeg)

| Feature | Service Charge | Gratuity / Tip |
| --- | --- | --- |
| Required? | Usually mandatory | Usually voluntary |
| Who sets the amount? | The business | The customer |
| Can the customer choose zero? | Usually no | Generally yes |
| Federal tax classification | Generally a service charge | Generally a tip |
| When paid to employees | Generally treated as wages | Handled as tip income |
| Does it automatically go to the server? | Not necessarily | Generally intended for the tipped worker or eligible tip pool |
| Typical receipt label | Service Charge / Service Fee | Tip / Gratuity |

The biggest practical difference is control. A customer controls a genuine tip. A business controls a mandatory service charge.

## Is an Automatic Gratuity a Tip or a Service Charge?

**An automatic gratuity is generally treated as a service charge under federal tax rules when the customer is required to pay it.**

For example, imagine a restaurant automatically adds an 18% "gratuity" to every table of six or more guests. Because the restaurant determines the amount and the customer does not have an unrestricted choice about paying it, the IRS treats that mandatory amount as a service charge rather than a voluntary tip.

If the same customer decides to add another $20 voluntarily after paying the automatic charge, that additional $20 may qualify as a tip because the customer chose both whether to pay it and how much to leave. IRS guidance uses the same basic distinction between mandatory automatic charges and voluntary additional tips.

This is one reason businesses should avoid combining an automatic charge and an optional tip into a single unexplained line on the receipt.

## Does a Service Charge Go to the Server?

**Not necessarily.** Customers should not automatically assume that a service charge is passed directly to their waiter, bartender, stylist, driver, or other service worker.

At the federal level, compulsory service charges are not treated as tips under the Fair Labor Standards Act. If an employer distributes money from a service charge to employees, those payments are compensation rather than tips and can affect wage and overtime calculations.

Distribution rules can also depend on state law, local law, employment agreements, and the business's disclosed policy. A receipt therefore becomes much clearer when it identifies the charge accurately instead of suggesting that every mandatory fee is automatically a tip for an employee.

If you are a customer and want to know whether staff receive the service charge, check the menu or receipt disclosure or ask the business before adding another tip.

## Do You Still Tip If a Service Charge Is Included?

**An additional tip is generally optional unless the business clearly states otherwise.** Whether you want to leave one depends on what the existing service charge represents and how it is distributed.

Before adding another gratuity, look for wording such as "gratuity included," "service charge," "service fee," "service charge distributed to staff," or "service charge is not a gratuity."

If the receipt is unclear, asking the establishment is often better than assuming. A customer may otherwise unintentionally tip twice, while another customer may incorrectly assume a service charge went directly to the employee.

## Why the Difference Matters for U.S. Businesses

The distinction between a service charge and gratuity affects much more than the wording printed near the bottom of a receipt. It can influence payroll treatment, employee records, tax reporting, customer expectations, point-of-sale configuration, and accounting records.

### Payroll and Employee Compensation

When a mandatory service charge is distributed to employees, the IRS generally treats the distributed amount as wages. Employers therefore need to account for the payment through the appropriate payroll process rather than simply recording it as employee tip income.

### Federal Tip Tax Treatment

Current IRS guidance also distinguishes voluntary tips from mandatory service charges when determining qualified tip treatment. Mandatory service charges and automatic gratuities do not become qualified tips merely because the receipt uses the word "gratuity."

### Customer Transparency

A clearly itemized receipt reduces uncertainty. Customers should be able to tell what they purchased, what taxes were charged, which fees were mandatory, whether gratuity was already included, and what amount they voluntarily tipped.

### Accounting and POS Records

Businesses should configure their point-of-sale and accounting systems so that service charges and voluntary tips are recorded separately. The IRS notes that POS records and individual receipts may be reviewed when determining how service-charge transactions were handled.

## Service Charge Rules Can Vary by State and City

**Federal definitions are only part of the picture.** State wage laws, sales-tax rules, consumer-protection requirements, and local disclosure laws can create additional obligations.

California illustrates why businesses should avoid relying on federal terminology alone. California's Labor Commissioner notes that mandatory service charges can, in some circumstances, be treated as gratuities under state law. California also has specific price-transparency rules affecting mandatory fees, with special disclosure provisions for restaurants and certain food businesses.

New York provides another example. State hospitality rules create protections involving charges that are presented as gratuities, while New York City requires qualifying restaurant service charges to be disclosed to customers before ordering.

A restaurant in Los Angeles, a hotel in Miami, a salon in Chicago, and a catering company in New York may therefore face different state or local requirements even when their receipts contain similar language.

Businesses should verify current rules with the relevant state labor department, tax authority, or qualified professional rather than assuming a receipt practice that works in one state is automatically correct nationwide.

## Is a Service Charge Taxable?

The answer depends on what type of tax you mean.

### Payroll and Income Tax Treatment

When an employer distributes a mandatory service charge to an employee, the IRS generally treats that payment as wages and requires the appropriate federal income-tax, Social Security, and Medicare tax treatment.

### Sales Tax Treatment

Whether a service charge is included in the taxable sales amount can depend on the state, locality, type of business, and nature of the fee. There is no safe nationwide rule stating that every service charge is taxable—or that every service charge is exempt.

Businesses should therefore configure sales tax using the rules applicable to the transaction's jurisdiction rather than applying one national setting to every receipt.

## How Should a Service Charge and Gratuity Appear on a Receipt?

The best receipt is one that lets a customer understand the transaction without having to guess what each amount represents.

1. **List the purchased goods or services.** Keep actual products or services separate from fees.
2. **Show the subtotal.** Give the customer a clear pre-tax and pre-fee reference point where appropriate.
3. **Identify mandatory charges separately.** Use an accurate label such as "Service Charge" when the fee is required.
4. **Show applicable tax clearly.** Follow the correct state and local tax treatment.
5. **Keep voluntary gratuity separate.** A customer-selected tip should not be combined with a mandatory charge.
6. **Show the final total.** Make it easy to reconcile the receipt with the payment.
7. **Record the payment method appropriately.** Include useful payment information without exposing sensitive card data.

For example, a restaurant receipt might show a $100 subtotal, a separately labeled mandatory service charge, applicable tax, a voluntary additional-tip line, and then the final amount paid. That structure is much clearer than one unexplained "fees and gratuity" line.

## Why Use Makecepeit for Clear Receipt Documentation?

Clear receipts are useful whether you operate a restaurant, spa, salon, hotel, freelance service, transportation business, or another customer-facing company. Makecepeit provides [an editable receipt builder](/create) designed to separate transaction details such as items, prices, taxes, tips, payment information, and totals.

Users can edit receipt information while viewing a live preview and export completed receipts in formats including PDF and PNG. Makecepeit also supports customizable tax information and gratuity-related fields, making it easier to document a transaction in a way that customers and internal teams can understand.

The important principle is accuracy. A generated receipt should reflect a legitimate transaction and the business's actual charges. A receipt tool is useful for documentation, record reconstruction of real purchases, business-issued receipts, expense records, and legitimate mockups—not for misrepresenting transactions that never occurred. Makecepeit's own terms prohibit fraudulent use of generated documents.

## Common Mistakes to Avoid With Service Charges and Gratuities

- **Assuming "automatic gratuity" always means a tip.** Mandatory gratuities generally qualify as service charges for federal tax purposes.
- **Assuming every service charge goes to the worker.** Distribution depends on the business arrangement and applicable law.
- **Combining mandatory and voluntary amounts.** Keep service charges and optional tips on separate receipt lines.
- **Using vague labels.** Terms such as "fee" or "charge" without explanation can confuse customers.
- **Applying one sales-tax rule nationwide.** Service-charge tax treatment can vary by jurisdiction.
- **Ignoring state and city requirements.** Federal tax classification does not override more specific local labor or consumer-protection rules.
- **Failing to reconcile receipts with payroll.** Service charges distributed as employee compensation should be recorded correctly.
- **Making customers tip twice unintentionally.** Clearly disclose whether gratuity is already included.

## Tips for Businesses Before Adding a Service Charge

Before implementing a mandatory service charge, decide exactly what the charge represents, how it will be disclosed, how the proceeds will be handled, and how your POS and payroll systems will record it.

Review the rules in every state or locality where you operate. Make sure menu language, online checkout pages, invoices, contracts, customer receipts, payroll records, and accounting systems use consistent terminology.

If customers may also leave an optional tip, provide a clearly separate tip field. Employees should also understand how mandatory charges are distributed so that they can answer customer questions accurately.

For tax, payroll, or labor-law decisions, consult the appropriate government guidance or a qualified tax or employment professional. Receipt formatting can improve documentation, but it does not replace jurisdiction-specific compliance advice.

## Service Charge vs Gratuity: The Bottom Line

**The simplest way to understand service charge vs gratuity on a receipt is to ask who controls the payment.** If the business requires the charge and determines the amount, it is generally a service charge for federal purposes. If the customer voluntarily decides whether to pay and chooses the amount, it is generally a gratuity or tip.

This distinction matters because mandatory service charges and voluntary tips can receive different payroll and tax treatment. State and local rules can add another layer, so businesses should never rely on the receipt label alone.

For customers, the safest approach is to read the receipt before adding a tip. For businesses, the safest approach is transparency: identify mandatory fees clearly, keep voluntary gratuity separate, and maintain accurate transaction records.

## Create Clearer Receipts With Makecepeit

When a transaction includes taxes, mandatory fees, and optional tips, clear documentation matters. With **Makecepeit**, you can [organize legitimate transaction details](/create), review the receipt before finalizing it, and create a clean digital record for your business or records.

Use clear labels for every charge, keep service charges separate from voluntary gratuities, verify the numbers against the actual transaction, and create a receipt that customers can understand at a glance.`,
    faqs: [
      { q: "Is a service charge the same as gratuity?", a: "No. A mandatory service charge is generally different from a voluntary gratuity or tip. The customer's ability to choose whether to pay and determine the amount is a key distinction." },
      { q: "Is an automatic gratuity considered a tip?", a: "Generally not for federal tax purposes when payment is mandatory. An automatic gratuity imposed by the business is typically treated as a service charge." },
      { q: "Do I need to tip if a service charge is already included?", a: "An additional tip is generally optional. Check the receipt or ask the business whether the service charge represents gratuity or is distributed to staff." },
      { q: "Does a service charge go directly to the server?", a: "Not necessarily. How service charges are distributed depends on employer policy, employment arrangements, and applicable state or local law." },
      { q: "Can a restaurant charge both a service charge and a tip?", a: "A restaurant may have a mandatory service charge while also allowing customers to leave an additional voluntary tip, subject to applicable state and local rules." },
      { q: "Is a service charge taxable?", a: "Service charges distributed to employees are generally treated as wages for federal payroll purposes. Sales-tax treatment varies by state and transaction type." },
      { q: "What does \"gratuity included\" mean on a receipt?", a: "It usually means an additional amount has already been added to the bill. If the amount was mandatory, it may be classified as a service charge for federal tax purposes even if it is called gratuity." },
      { q: "What is the difference between a service charge and a service fee?", a: "The terms may be used differently by businesses. The important issue is whether the amount is mandatory, who sets it, what it covers, and how applicable law treats it." },
      { q: "Should service charges and tips appear separately on a receipt?", a: "Yes. Separate lines make the transaction clearer for customers and help businesses maintain better accounting, payroll, and payment records." },
      { q: "How can I create a receipt showing a service charge and gratuity clearly?", a: "Use separate receipt fields for purchased items, applicable tax, mandatory charges, voluntary gratuity, and the final total. Makecepeit can help create and export an organized receipt using accurate transaction details." },
    ],
  },
];
