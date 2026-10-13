# Elliot writer brief — makecepeit blog (Nov 14 – Dec 12 batch)

Read this whole file before writing. Project conventions win over factory or
skill defaults where they differ.

## What you produce, per post
1. `scripts/posts/<mon>-<day><a|b>-<slug>.mjs` in the exact format of the
   existing modules. Study first: `scripts/posts/nov-8a-how-to-write-a-purchase-order.mjs`,
   `nov-12a-as-is-bill-of-sale.mjs`, `nov-12b-gross-receipts.mjs`.
   - Header comment: slot (date + 09:30Z for `a`, 14:00Z for `b`), the keyword
     and demand evidence you were given, the owner/link targets, a "product
     check" note if you rely on a builder feature, and **every fact with its
     source URL and the check date (2026-10-13)**.
   - Fields: slug, image (`assets/<slug>.jpeg`), category (one of the existing
     values used in scripts/posts: how-to, basics, small-business, taxes, legal,
     expenses — check spelling in existing files), publishedAt, title,
     seoTitle (≤ 60 chars), seoDescription (≤ 155 chars), excerpt, body, faqs
     (3–5).
2. One banner spec per post in YOUR specs file (named in your task), same schema
   as `scripts/banners/specs-e.json`. Only props that exist in
   `scripts/banners/props/`. The sample document must add up (lines = total) and
   say "(sample)" or "Sample …" in its subtitle. Do not render images.
3. Do NOT edit docs/content-ledger.md (the orchestrator does it).

## Writing rules
- First paragraph: answer the query in 2–3 sentences, in bold, like the existing
  posts (this is what AI Overviews and ChatGPT lift).
- Short H2s, at least one table, a worked example with fictional sample data.
  900–1,400 words.
- Creation intent: show the reader how to make/fill/write the document, and link
  the matching makecepeit builder page within the first two paragraphs.
- Internal links only to pages that exist: check `scripts/posts/*.mjs` (slugs of
  posts dated before yours, or same batch), `lib/templates.ts`, `lib/brands.ts`.
  Posts in this batch may link each other if the target's date is the same or
  earlier.
- Facts: only what you verified on an authoritative page (WebFetch/WebSearch):
  .gov, gov.uk/HMRC, state DMVs, PCI SSC, the UCC on law.cornell.edu, official
  standards bodies. If eCFR blocks fetching, use law.cornell.edu. If you cannot
  verify something, leave it out or state it as common practice — never invent a
  rule, figure, fee or deadline. Link the main source inline once.
- Tax/legal/financial posts: name the authority and end with a one-line
  not-advice note (owner decision 2026-10-13: publish on schedule this way).
- Product claims must be exactly true: building and previewing need no account;
  downloading needs a free account; **only the first download is
  watermark-free**; Pro is $3/week, $7.99/month or $49/year. Never say
  "realistic". /templates/invoice is a real invoice (bill-to, terms, due date,
  amount due). There is no PO, quote, credit-memo or bill-of-sale template —
  say "retitle the invoice/sales receipt template" only after checking in
  `components/builder/SectionBuilder.tsx` that the title and custom lines are
  editable. Check currency support in lib/templates.ts before telling UK readers
  they can use £.
- Legitimacy: every document must describe a real transaction. Include one line
  saying so where a reader could misuse it.
- No AI filler: no "in today's fast-paced world", "it's not X, it's Y",
  "delve", "navigate the complexities", "game-changer", no em-dash pile-ups.
  Plain, specific, human.
- UK posts: British English, £, HMRC/gov.uk sources, UK examples.

## Finish
Run `node scripts/publish-posts.mjs --dry --file=<one of your prefixes>` for
each of your files (dry run only, no network writes), fix any error, commit
locally (do not push, do not publish). Report under 200 words: files, sources,
anything unverified.
