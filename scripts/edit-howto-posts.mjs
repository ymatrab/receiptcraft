/**
 * One-off, 2026-10-05: give the four generic how-to posts one job each and
 * correct false claims. Edits the LIVE Sanity documents in place, because two
 * of them were changed in Sanity on 2026-09-05 after their seed files
 * (scripts/posts/aug-1, aug-2, day1-hubs-a/b) were written. Republishing those
 * files would undo that.
 *
 *   node scripts/edit-howto-posts.mjs --dry   # print the edited text only
 *   node scripts/edit-howto-posts.mjs         # patch Sanity
 *
 * Ownership after this edit:
 *   how to write a receipt        -> /blog/how-to-write-a-receipt (handwritten + example)
 *   how to make a receipt         -> /blog/how-to-make-a-receipt (the 3-ways hub)
 *   how to make a receipt online  -> /blog/how-to-make-a-receipt-online
 *   receipt of payment            -> /blog/how-to-make-a-receipt-of-payment (untouched)
 */
import { readFileSync } from "node:fs";
import { toPortableText, withKeys } from "./sanity-portable-text.mjs";

const PROJECT = "3pvc71cl";
const API = `https://${PROJECT}.api.sanity.io/v2024-10-01/data`;
const DRY = process.argv.includes("--dry");
const token =
  process.env.SANITY_API_WRITE_TOKEN ??
  readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(/^SANITY_API_WRITE_TOKEN=(.+)$/m)?.[1]?.trim();

const text = (b) => (b.children ?? []).map((c) => c.text ?? "").join("");
const pt = (md) => toPortableText(md);
const h2At = (body, heading) => {
  const i = body.findIndex((b) => b.style === "h2" && text(b) === heading);
  if (i === -1) throw new Error(`H2 not found: ${heading}`);
  return i;
};
const nextH2 = (body, from) => {
  const j = body.findIndex((b, k) => k > from && b.style === "h2");
  return j === -1 ? body.length : j;
};
/** Replace everything before the first H2. */
const replaceIntro = (body, md) => [...pt(md), ...body.slice(body.findIndex((b) => b.style === "h2"))];
/** Replace a section's body (keeps its H2 unless `withHeading`). */
const replaceSection = (body, heading, md, withHeading = false) => {
  const i = h2At(body, heading);
  const j = nextH2(body, i);
  return [...body.slice(0, withHeading ? i : i + 1), ...pt(md), ...body.slice(j)];
};
const insertBefore = (body, heading, md) => {
  const i = h2At(body, heading);
  return [...body.slice(0, i), ...pt(md), ...body.slice(i)];
};
const dropBlock = (body, startsWith) => {
  const i = body.findIndex((b) => text(b).startsWith(startsWith));
  if (i === -1) throw new Error(`Block not found: ${startsWith}`);
  return body.filter((_, k) => k !== i);
};
const appendToSection = (body, heading, md) => {
  const j = nextH2(body, h2At(body, heading));
  return [...body.slice(0, j), ...pt(md), ...body.slice(j)];
};
const setFaq = (faqs, question, answer) => {
  const f = faqs.find((x) => x.question === question);
  if (!f) throw new Error(`FAQ not found: ${question}`);
  f.answer = answer;
  return faqs;
};

const ids = ["post-how-to-write-a-receipt", "post-how-to-make-a-receipt", "post-how-to-make-a-receipt-online"];
const q = encodeURIComponent(`*[_id in ${JSON.stringify(ids)}]`);
const res = await fetch(`${API}/query/production?query=${q}&perspective=raw`, {
  headers: { Authorization: `Bearer ${token}` },
});
const docs = Object.fromEntries((await res.json()).result.map((d) => [d._id, d]));

const edits = {};

// ── how to write a receipt: the owner, with the handwritten how-to and an example
{
  const d = docs["post-how-to-write-a-receipt"];
  let body = d.body;
  body = replaceIntro(
    body,
    `**To write a receipt, put seven things on it:** your business name and contact details, the date, a unique receipt number, an itemized list of what was sold, the tax, the total paid, and how it was paid. Handwritten or typed, a receipt with those seven things is a valid record of the sale. Number it, sign it if it is handwritten, give the customer the original and keep a copy.

Below: each part in detail, how to write one by hand, a worked example, and the special cases (rent, deposits, donations) where the wording matters. If you would rather not write it out, you can [make a receipt online](/blog/how-to-make-a-receipt-online) instead.`
  );
  body = replaceSection(
    body,
    "Are handwritten receipts valid?",
    `## How to write a receipt by hand
1. Use a duplicate or triplicate receipt book, so the copy is made as you write.
2. Write the next number in your sequence and the date at the top.
3. Write your business name and phone number, then the customer's name.
4. List each item or service with its price, then the tax and the total.
5. Write how it was paid, for example "Paid in cash" or "Paid by check #1043", and the amount received.
6. Sign it, give the customer the original and keep the copy in the book.

### Are handwritten receipts valid?
Yes. A handwritten receipt with the seven parts above is as valid a record as a printed one. The weaknesses are practical: illegible figures get disputed, numbering gets skipped and paper copies get lost. If you write a lot of them, a [sales receipt template](/templates/sales-receipt) does the numbering and the arithmetic for you.`,
    true
  );
  body = insertBefore(
    body,
    "Special receipts that need specific wording",
    `## Example: a written receipt
A lawn-care business paid in cash for October's work would write this:

| Field | What it says |
| --- | --- |
| Business | Green Leaf Lawn Care, (512) 555-0148 |
| Receipt number | 2026-0147 |
| Date | October 12, 2026 |
| Customer | Ana Morales |
| Item | Mowing and edging, October: $85.00 |
| Item | Hedge trimming: $40.00 |
| Tax | None charged |
| Total paid | $125.00 |
| Payment | Cash: $130.00 tendered, $5.00 change |
| Signed | J. Patel, owner |

Every line answers a question someone could ask later: who was paid, for what, when, how much, and how.`
  );
  body = appendToSection(
    body,
    "The bottom line",
    `For the other ways to produce one, see [how to make a receipt](/blog/how-to-make-a-receipt): online, from a template or by hand. For money received against a bill or a deposit, see [how to make a receipt of payment](/blog/how-to-make-a-receipt-of-payment).`
  );
  const faqs = [
    ...d.faqs,
    ...withKeys([
      {
        q: "How do I write a simple receipt?",
        a: "Write the date, a receipt number, your name or business, the customer's name, what was sold and its price, the total, and how it was paid. Sign it and keep a copy. That is a complete receipt.",
      },
      {
        q: "How do you write a handwritten receipt?",
        a: "Use a duplicate receipt book. Write the number and date, your business and the customer, each item with its price, the tax and total, and the payment method. Sign it, hand over the original and keep the copy.",
      },
    ]),
  ];
  edits[d._id] = { body, faqs };
}

// ── how to make a receipt: the three-ways hub, no longer a second "how to write"
{
  const d = docs["post-how-to-make-a-receipt"];
  let body = d.body;
  body = replaceIntro(
    body,
    `**You can make a receipt three ways: online with a receipt maker, from a ready-made template, or by hand in a receipt book.** Whichever you choose, it needs the same seven things: the seller's details, the date, a receipt number, the items, the tax, the total and the payment method. Online is fastest because the totals calculate themselves; by hand needs nothing but a pen. Here is each way, and what every receipt has to say.`
  );
  body = replaceSection(
    body,
    "Method 1: Make a receipt online (fastest)",
    `An online receipt maker lays out the fields so you only type the details. In the [receipt builder](/create) you pick a template, type your items into a live preview, and the subtotal, tax and total calculate themselves. Building is free without an account; downloading the PDF or PNG needs a free one. The full walkthrough is in [how to make a receipt online](/blog/how-to-make-a-receipt-online).`
  );
  body = replaceSection(
    body,
    "Method 3: Write a receipt by hand",
    `A handwritten receipt is valid if it has the seven fields. Use a duplicate receipt book so a copy is made as you write, and never reuse a number. The step-by-step, with a worked example, is in [how to write a receipt](/blog/how-to-write-a-receipt). For money received against an invoice or a deposit, see [how to make a receipt of payment](/blog/how-to-make-a-receipt-of-payment).`
  );
  edits[d._id] = {
    body,
    title: "How to Make a Receipt: 3 Ways (Online, Template, by Hand)",
    seoTitle: "How to Make a Receipt: 3 Ways (Online, Template, by Hand)",
    seoDescription:
      "How to make a receipt three ways: online in about a minute, from a template, or by hand. Plus the seven fields every receipt needs and the mistakes to avoid.",
    excerpt:
      "Make a receipt online, from a template or by hand. Whichever you choose, it needs the same seven fields. Here is each way, step by step.",
  };
}

// ── how to make a receipt online: correct what it promised
{
  const d = docs["post-how-to-make-a-receipt-online"];
  let body = d.body;
  body = replaceIntro(
    body,
    `To make a receipt online: choose a template that matches the receipt type, fill in the business details and line items, set the tax rate and payment method, then download the finished receipt as a PDF or PNG. With a purpose-built tool it takes about a minute and no design skills. You can build and preview without an account; downloading needs a free one.

This guide walks through each step using our receipt builder, plus the settings that make a receipt look right for its type. To do it on paper instead, see [how to write a receipt](/blog/how-to-write-a-receipt).`
  );
  // Not something this page can promise: saved history is stored on our servers.
  body = dropBlock(body, "Everything you type stays in your browser");
  let faqs = setFaq(
    d.faqs,
    "Can I make a receipt without any software?",
    "Yes, a browser is enough. Online receipt makers run on the web page: choose a template, type the details, download the file. Nothing to install. With our builder you can build and preview without an account; downloading needs a free one."
  );
  faqs = setFaq(
    faqs,
    "How do I make a receipt look like a real store receipt?",
    "Match four things: the paper width (most store receipts are 58mm or 80mm thermal), a monospace font, the store's layout, and the real details of your purchase: the correct tax rate for the location, the right date and the actual total. Our templates and brand layouts handle the look; the details have to be true."
  );
  faqs = setFaq(
    faqs,
    "Is the receipt maker really free?",
    "Building is. Every template, unlimited items and the live preview are free without an account. Downloading needs a free account, which includes one watermark-free HD download; after that, free downloads carry a small watermark. Pro removes the watermark and adds unlimited AI generation and saved receipt history."
  );
  faqs = setFaq(
    faqs,
    "Can I save a receipt and edit it later?",
    "Saving receipts to your history, to reopen and edit on any device, is part of Pro. On a free account, download the receipt when it is finished."
  );
  edits[d._id] = {
    body,
    faqs,
    title: "How to Make a Receipt Online in 4 Steps (Free to Build)",
    seoTitle: "How to Make a Receipt Online: 4 Steps, Free to Build",
    seoDescription:
      "Make a receipt online in 4 steps: pick a template, fill in your details, check the live preview, download a PDF or PNG. Free to build; sign in free to download.",
  };
}

for (const [id, patch] of Object.entries(edits)) {
  console.log(`\n###### ${id}`);
  for (const k of ["title", "seoTitle", "seoDescription", "excerpt"]) if (patch[k]) console.log(`${k}: ${patch[k]}`);
  for (const b of patch.body ?? []) {
    if (b._type === "table") console.log(`[table ${b.rows.length} rows]`);
    else if (b._type !== "block") console.log(`[${b._type}]`);
    else console.log((b.style === "h2" ? "## " : b.style === "h3" ? "### " : b.listItem ? "- " : "") + text(b));
  }
  if (patch.faqs) console.log("FAQS:", patch.faqs.map((f) => f.question).join(" | "));
}

if (DRY) process.exit(0);

const mutations = Object.entries(edits).map(([id, set]) => ({ patch: { id, set } }));
const out = await fetch(`${API}/mutate/production?returnIds=true`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});
console.log("\nmutate:", out.status, JSON.stringify(await out.json()).slice(0, 200));
