# Document modes and trust copy — proposal, 4 September 2026

Section 11 of the implementation plan proposes splitting what the builder
produces into three declared document types, and softening five specific claims.
The plan ends that section with a mandatory stop: **present the wireflow, the
exact wording, the export marker, the pages affected and the SEO/conversion
impact before writing any code.**

This is that document. **Nothing in it has been implemented.** It is the one part
of the plan deliberately left unbuilt in this session — it changes how the
product describes itself on the pages that earn all the traffic, and that is the
owner's call, not a session's.

## What is already true

Worth stating first, because the plan's framing implies the site has no
safeguards, and it does:

- Every brand page carries: *"Independent, customizable template. Makecepeit is
  not affiliated with, endorsed by, or issued by {Brand}. Receipts you create are
  for lawful records, personal mockups and authorized use only — **not a proof of
  purchase**."* (`app/brands/[slug]/page.tsx`)
- `/terms` prohibits deceiving any person, business, employer, insurer or
  government, and names claiming reimbursement for purchases that did not occur.
- `/about` and `/editorial-policy` say the same in their own words.
- `/guides/receipt-legality` explains when a document becomes fraud, and is
  correct that it turns on use and misrepresentation rather than on the tool.

So the disclaimers exist. **The gap is not the fine print — it is the
marketing.** The five claims below sit in the headline and the feature cards,
where they are read, while the disclaimer sits under the fold on a different
page type.

## The five claims, with their real locations

| # | Copy | Where | Why it is a problem |
| --- | --- | --- | --- |
| 1 | "**Recreate any store receipt** in 60 seconds" | `app/page.tsx:449` — the H1 | "Recreate" asserts reproducing a specific document that existed. It is the single most prominent sentence on the site. |
| 2 | "348 brand layouts **match the real thing**" | `app/page.tsx:752` | Claims equivalence to the merchant's own output — the claim a disclaimer two pages away cannot retract. |
| 3 | "a layout **finance teams accept**" | `app/page.tsx:225` | States a third party's acceptance decision. We cannot know it, and it is the sentence an expense-fraud case would quote. |
| 4 | "ready for reimbursement" | not currently in the codebase | The plan lists it; a grep finds it only in *prohibitive* contexts (`/terms`, `/about`). Nothing to change. |
| 5 | "proof of purchase" | only in disclaimers denying it, plus one glossary definition | Already correct. Nothing to change. |

**Two of the five are already fine.** That is worth saying plainly rather than
changing copy to satisfy a list.

### Proposed replacements

Each keeps the search intent — these are creation-intent pages and must stay so
— while dropping the assertion about a document that already exists:

| Now | Proposed |
| --- | --- |
| Recreate any store receipt in 60 seconds | **Make a store-style receipt in 60 seconds** |
| 348 brand layouts match the real thing | **348 brand-inspired layouts** — logo placement, item formatting, tax lines and footer text |
| in a layout finance teams accept | **in the itemised layout expense reports ask for** — totals, tax lines and payment method, exported as a clean PDF |

"Make" and "store-style" hold the keyword ("store receipt", "receipt maker") and
lose the claim. The third keeps the use case — someone filing an expense report
is a real customer — while describing the *layout* rather than promising
somebody else's decision.

## The three modes

The plan's structure, unchanged, with the wording it asks for:

**Business Receipt** — a business or freelancer issuing a receipt for a
transaction they actually carried out. Their own name and logo. Clean export,
no marker. This is a real product for real sellers and should not be watermarked.

**Reconstructed Copy** — a record of a real transaction whose original is lost.
Shows *record — not merchant-issued*, and advises requesting an official
duplicate where formal proof is required.

**Mockup / Prop** — design, teaching, film, theatre. Carries SAMPLE or PROP.
Never presented as a financial document.

**The rule that matters:** a brand template starts as *Reconstructed Copy* or
*Mockup*, never as *Business Receipt* — the user is not the brand. Moving a
brand template to Business Receipt requires an authorised-use declaration.

## Wireflow

```
                    ┌─────────────────────────────────┐
   /create  ───────►│  Builder opens. No mode chosen. │
                    │  Default = Reconstructed Copy   │
                    └────────────┬────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
     │ Business       │ │ Reconstructed  │ │ Mockup / Prop  │
     │ Receipt        │ │ Copy (default) │ │                │
     ├────────────────┤ ├────────────────┤ ├────────────────┤
     │ own name+logo  │ │ "record — not  │ │ SAMPLE / PROP  │
     │ clean export   │ │ merchant-      │ │ on the face    │
     │ no marker      │ │ issued" line   │ │                │
     └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
             │                  │                  │
             │  brand template selected?           │
             │  ┌──────────────┴───────────┐       │
             │  │ Business Receipt is      │       │
             │  │ BLOCKED until the user   │       │
             │  │ affirms authorised use   │       │
             │  └──────────────────────────┘       │
             └──────────────────┬──────────────────┘
                                ▼
                    ┌─────────────────────────────┐
                    │ Export. Mode travels in the │
                    │ PDF metadata either way.    │
                    └─────────────────────────────┘
```

**The export marker.** PDF metadata (`Subject` / `Keywords`), not a visible
stamp. A visible mark on a Business Receipt would destroy the legitimate seller's
use case, which the plan explicitly forbids; metadata records what the document
declared itself to be without touching how it looks. Reconstructed Copy and
Mockup carry their marker on the face as well, per the plan.

**Where the control lives.** One select in the builder's settings panel, not a
modal on open. The plan forbids a disclaimer long enough to interrupt the
builder, and a blocking modal before anyone has typed anything is exactly the
thing that would cost the funnel its top stage.

## Pages affected

- `app/page.tsx` — three copy changes above.
- `components/builder/SectionBuilder.tsx` — mode selector, default, the
  authorised-use gate on brand templates.
- `lib/sections.ts` / `lib/types.ts` — `documentMode` on the doc.
- `lib/download.ts` — PDF metadata.
- `app/brands/[slug]/page.tsx` — the existing disclaimer becomes the mode
  explanation rather than a separate block.
- **Not** `/terms`, `/about`, `/editorial-policy`, `/guides/receipt-legality` —
  all four are already accurate.

## SEO and conversion impact — the honest read

**SEO: small and probably positive.** The H1 keeps "store receipt"; "Make" is
closer to creation intent than "Recreate", and creation intent is what converts
(`/brands` earns 3.53% CTR against `/receipt-help`'s 0.63%). No URL, title tag or
canonical changes. No page is removed — the plan forbids killing SEO pages in a
batch and there is no reason to here.

**Conversion: an unknown, and that is the argument for waiting.** A mode selector
adds a decision before the download. It could plausibly cost a few percent at the
top of the funnel. Right now nobody can measure that, because the funnel could
not distinguish a session from an event until this week.

**So the sequencing recommendation is: do the copy changes now, and hold the mode
selector.** They are separable. The three sentences are simply more accurate and
carry no interaction risk. The selector is a product change whose cost is
currently unmeasurable and will be measurable in a fortnight, once
`receipt_completed`, `download_blocked` and the session ids have a baseline. That
is the same discipline the plan applies to pricing, applied to itself.

## What is being asked of the owner

1. Approve or edit the three copy replacements.
2. Confirm the three mode names and the default (Reconstructed Copy).
3. Confirm the export marker is metadata-only for Business Receipt.
4. Decide whether the selector ships now or after two weeks of funnel data.
   Recommendation: after.
