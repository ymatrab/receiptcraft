# Notion board rewrite — owner outcomes instead of dev steps

**Why:** the first board split one deliverable across several file-level tasks
("build lib/sources.ts", "build components/Sources.tsx"). That is unreadable as a
progress record. One outcome = one task; file paths belong in the task body.

**Status:** ready to apply. Blocked on the Zapier account being out of task
credits (`insufficient tasks on account`).

**Applying it:** rename the 14 tasks below in place and archive the other 14 —
renaming is cheaper than recreating. ~28 Zapier calls total.

---

## The 14 tasks

### Done

**1. Measure where we stand before any changes**
Pull the search-performance baseline so the effect of this work can actually be
read in September rather than guessed at. *(was: "Capture GSC baseline")*

**2. Make the receipt guide cite official rules**
The field-by-field receipt guide now backs its definitions with the actual
regulations — IRS expense rules, the US card-truncation law, EMVCo chip specs,
EU and UK VAT invoice rules — so both readers and AI answer engines can see
where each claim comes from.
*(absorbs: source registry, citation components, link checker, source research,
llms.txt exposure, the pilot page)*

**3. Point 57 lost-receipt guides at the brand's own help page**
Our 19 biggest brands' guides now link the retailer's official receipt and
returns pages and quote what those pages say — Macy's two-year receipt lookup,
CVS's 60-day cap, AutoZone's phone lookup. These pages carry half the site's
search impressions and previously linked out to nothing.
*(absorbs: URL verification, the data fields, anti-templating, the ship)*

**4. Fix and source the competitor pricing we publish**
Two competitors had changed their pricing since the last review and our pages
still stated the old position — one FAQ told readers a rival had no paid plans
when it had three. Every price now links the page it came from and shows when it
was checked. *(absorbs: pricingUrl work, methodology section)*

### To do

**5. Tell Bing about the 240 updated pages** — P0, owner action
New and changed pages stay invisible to Bing, and therefore to Microsoft
Copilot, until the IndexNow endpoint is triggered. Admin-only:
visit `https://www.makecepeit.com/api/indexnow` while signed in as admin.

**6. Get Domino's official support link** — blocked
Domino's is our third-biggest lost-receipt brand but its support URLs redirect
by country, so it could not be verified from here. Needs one check from a US
browser, then it joins the other 19.

### Backlog

**7. Cite the tax rules on rent, donation and restaurant receipts**
Rent receipts, charity donation receipts and restaurant tips all have real
published rules behind them. Citing those makes these pages the most complete
answer for the question, which is what gets quoted by AI search.

**8. Add sources to the rest of the receipt templates**
Extend the same treatment to the remaining templates — selectively, only where a
genuine authority exists rather than forcing one.

**9. Add sources to the 140 blog articles**
The largest batch and the least suitable for automation. Do it in runs of 10-20.

**10. Cover the remaining 60 brands in the lost-receipt guides**
Takes the brand coverage from 19 to all 79, once the first batch has been live
long enough to show the approach works.

**11. Say plainly that we're not giving legal advice**
We now cite tax and legal rules across the site. The editorial policy should
state that citing a regulation is not legal advice, and describe how often we
re-verify sources.

**12. Re-check every source link each month**
A dead government link is worse than no citation — it signals we do not check
what we publish. Automated, one command.

**13. Re-check competitor pricing each quarter**
Two of three competitors moved between reviews. Watch for prices rendered only
in the browser, and pricing pages that quietly redirect to a homepage.

**14. Review the results in mid-September**
This kind of change takes 4-8 weeks to show. Judging it earlier produces a false
negative and tempts undoing work that was fine.

---

## Tasks to archive

All of these are absorbed into the above and should not survive as separate
items: the source registry, citation components, link-rot script, JSON-LD
citation fields, llms-full section, source research, pilot page, brand URL
verification, IntentBrand fields, anti-templating, the brand ship, pricingUrl
fields, methodology section, and the per-file rent/donation/restaurant/template/
Sanity schema splits.
