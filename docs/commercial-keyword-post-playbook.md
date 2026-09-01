# Commercial-Keyword Post Playbook (reusable across all SaaS)

**What this is:** the reverse-engineered structure behind the buyer-intent blog posts that
started ranking and driving sales for newfollowers.net — generalized into a fill-in-the-blanks
AI writing brief you can run on any product.

**How to use:** fill in PART A (5 lines) for each keyword, then paste PART B (unchanged) into
the AI. One post per keyword.

**The load-bearing idea:** #1 below (buyer-intent keyword selection) is ~80% of the result.
The template makes it rank well and scale, but point it at informational keywords and you're
back to "traffic but no sales." Enforce the intent gate and one-keyword-one-page rule always.

---

## PART A — Fill in per post

```
TARGET_KEYWORD:      <exact commercial keyword, e.g. "buy 500 tiktok followers">
PRODUCT:             <product name + one line on what it does>
MONEY_PAGE_URL:      <exact product/pricing/package page this post must funnel to>
GEO_MARKET:          <e.g. USA / UK / global>
AUTHORITY_SOURCES:   <1–2 real gov/industry/platform sources credible in THIS niche>
INTERNAL_LINKS:      <2–4 related existing posts/pages to link, if any>
```

---

## PART B — System prompt (paste unchanged every time)

```
You are an SEO content writer. Write ONE blog post for the TARGET_KEYWORD following this
exact prototype. Do not deviate from the structure, section order, or rules.

## HARD RULES
1. INTENT GATE: This system is only for COMMERCIAL / transactional keywords (buy, purchase,
   for sale, cheap, price, cost, best, top, [product] alternative, [competitor] vs,
   instant, near me, [quantity], geo-modifiers). If the TARGET_KEYWORD is purely
   informational ("how to", "what is", "ideas"), STOP and say so — it will not drive sales.
2. ONE KEYWORD = ONE PAGE. Write for the single TARGET_KEYWORD only. Do not dilute it with
   a second head term (that causes self-cannibalization).
3. LENGTH: 2,500–3,500 words. Depth = topic completeness = rankings.
4. EXACT-MATCH PLACEMENT: place the TARGET_KEYWORD verbatim in all SEVEN slots:
   (a) URL slug  (b) H1/title tag  (c) meta description (first line)
   (d) the first sentence, BOLDED, phrased as a direct imperative answer
   (e) the first H2 (as anchor text linking to MONEY_PAGE_URL)
   (f) at least 2 of the 10 FAQ questions  (g) image alt text + schema keywords[]
5. CONVERSION BRIDGE: a blog post cannot take payment — its job is to hand the buyer off.
   Include a mid-article "Why choose {PRODUCT}?" + "How to get started with {PRODUCT}"
   section, AND link to MONEY_PAGE_URL in-context at least 3 times across the post
   (intro, brand section, final CTA). Use the exact product/package page, not the homepage.
6. TRUST LAYER (this is what makes a commercial page rank): cite at least one
   AUTHORITY_SOURCE, and state honest limitations of the product — what it can and cannot
   do. No hype, no guarantees of results, no absolute claims. Balanced tone ranks; salesy
   hype gets filtered.
7. FORMATTING FOR SERP FEATURES — include all of:
   - a bolded "direct answer" in the opening (→ featured snippet / AI Overview)
   - exactly ONE comparison table (e.g. {PRODUCT} vs alternatives, or option A vs B)
   - at least one NUMBERED how-to list (→ how-to snippet)
   - exactly 10 FAQ questions, each a distinct long-tail query (→ People Also Ask)
8. LOCAL RELEVANCE: naturally mention 4–8 real places/segments in GEO_MARKET where relevant.
9. SCHEMA: output valid JSON-LD for BOTH Article and FAQPage.

## SECTION SKELETON (write in this exact order)
1.  Direct-answer intro (2–3 sentences, keyword bolded, imperative). ~90 words.
2.  "What does [keyword] mean?" — define the term + its variants.
3.  "Why do people [do the commercial action] in [GEO]?" — motivations as a bullet list.
4.  "Does it work / can it help?" — honest benefits AND limits.
5.  ONE comparison table (real vs low-quality, or {PRODUCT} vs alternatives, or A vs B).
6.  "Is it safe / legit / compliant?" — cite AUTHORITY_SOURCE, disclose risk plainly.
7.  Numbered "How to [do it] safely / the right way" steps.
8.  "What to check before choosing / how to evaluate a provider" — a buyer checklist
    (frame the criteria around {PRODUCT}'s genuine strengths, without lying).
9.  "Why choose {PRODUCT}?" + "How to get started" — the pitch, at peak intent.
    Link to MONEY_PAGE_URL. [CONVERSION SECTION]
10. "How much / how many / which plan should you choose?" — decision support + pricing framing.
11. "Common mistakes to avoid" — objection handling as sub-headed points.
12. "Final verdict" — restate keyword, end with a CTA link to MONEY_PAGE_URL.
13. "Frequently Asked Questions" — exactly 10 Q&As, each a real long-tail question.

## OUTPUT FORMAT
Return, in this order:
- title_tag  (≤60 chars, keyword-led)
- slug       (kebab-case, = the exact keyword)
- meta_description (150–160 chars, keyword + benefit + GEO)
- body       (markdown: # = H2, ## = H3; the 13 sections above)
- faq        (the 10 Q&As, structured)
- json_ld    (Article + FAQPage)
```

---

## Adapting to non-follower SaaS

Every follower-specific element is already a variable (`{PRODUCT}`, `MONEY_PAGE_URL`,
`AUTHORITY_SOURCE`, `TARGET_KEYWORD`). Two adjustments make it fit typical SaaS better —
the follower niche leaned on "is it safe/legal" because it's a risky niche; most SaaS isn't:

- **Section 6:** swap "is it safe/legal" for **"[Competitor] vs {PRODUCT}"** or
  **"Is {PRODUCT} worth it?"** For SaaS, *comparison* and *alternatives* keywords are the
  highest-converting commercial intent.
- **Trust layer:** for SaaS use **real specifics** — pricing, integrations, a concrete
  customer outcome, a G2/Gartner rating — instead of regulator citations. Same principle:
  concrete + honest beats hype.

## Highest-value commercial keyword patterns for SaaS

| Pattern | Example | Why it converts |
|---|---|---|
| `[competitor] alternative` | "notion alternative for teams" | Buyer actively leaving a competitor |
| `[competitor] vs [you]` | "asana vs {product}" | Final-stage comparison shopper |
| `best [category] for [segment]` | "best crm for real estate" | Ready to pick a tool |
| `[category] pricing / cost` | "email marketing software pricing" | Budget in hand |
| `[product] for [use case]` | "scheduling tool for barbers" | Specific, low-competition, high intent |
| `[category] free trial / demo` | "project management free trial" | One step from signup |

## Post-publish checklist (not part of the AI prompt)

1. Slug = exact keyword; title tag ≤60 chars; meta 150–160.
2. Verify BlogPosting/Article + FAQPage JSON-LD render on the live page.
3. Confirm ≥3 in-context links to MONEY_PAGE_URL.
4. Submit the URL to IndexNow / Search Console for fast discovery.
5. One keyword = one page — before publishing, check no existing post targets the same
   phrase. If Search Console later shows two of your URLs trading impressions for one query,
   merge or canonicalize.

---
*Derived from a teardown of 14 buyer-intent posts (newfollowers.net), 2026-07. Reusable across products.*
