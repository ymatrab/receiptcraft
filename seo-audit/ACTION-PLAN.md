# SEO Action Plan — makecepeit.com

Score: **87/100**. Prioritized Critical → Low. Each item notes effort and the file to touch.

---

## Critical
*None.* No indexing blockers or active penalties detected.

> ⚠️ **Business decision (not a code fix):** the 354 `/brands/<real-brand>` pages carry trademark + Google deceptive-content exposure. If a manual action hits this cluster it can sink the whole domain. Decide consciously whether to keep, `noindex` the most sensitive brands, or scale back. See risk section in `FULL-AUDIT-REPORT.md`.

---

## High (this week)

1. **Add security response headers.** Only HSTS is set. Add an async `headers()` block in `next.config.ts`:
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `Content-Security-Policy` with `frame-ancestors 'self'` (allowing GA/Clarity/Vercel domains)
   *Effort: ~1–2h. File: `next.config.ts`.*

2. **Keep the anti-fraud disclaimer visible on every brand/example page** (legal hardening for the risk above). *Effort: low if a shared component already exists; verify it renders, don't just rely on `llms.txt`.*

---

## Medium (this month)

3. **Trim the `/examples` index payload (~1 MB HTML).** Paginate the main index the same way `/examples/page/[page]` already works, or virtualize/lazy-mount the receipt cards. Biggest CWV (INP/CLS) lever on the site. *File: `app/examples/page.tsx`.*

4. **Add `ItemList` + `BreadcrumbList` schema to index pages** (`/examples`, `/brands`) — currently only `Organization` + `WebSite`. Improves rich-result eligibility and crawl understanding. *Files: `app/examples/page.tsx`, `app/brands/page.tsx`.*

5. **Monitor indexation of the 900-URL set.** Once GSC has data, watch the "Discovered – not indexed" / "Crawled – not indexed" buckets for the brand/example clusters. If large swaths stay unindexed, prune or consolidate thin variants. *Tooling: GSC (use the `seo-google` skill once connected).*

6. **Strengthen E-E-A-T.** Add author bylines + a real "who built this / why trust it" block on blog posts and `/about`. Templated pages can't carry experience signals — the blog must. *Files: `app/about/page.tsx`, `app/blog/[slug]/page.tsx`.*

---

## Low (backlog)

7. **Real preview PNG per template/brand** to open a Google Images traffic surface (receipts are currently DOM-only, so they don't appear in image search). *Effort: medium; ties into OG image infra you already have.*

8. **Per-page `lastmod` accuracy** where underlying data changes (blog already overrides via `publishedAt`; consider the same for brand/template edits). *File: `app/sitemap.ts`.*

9. **Replace lab performance estimate with field data** — connect PSI/CrUX + GSC and re-score Performance once organic traffic exists.

---

## Verification checklist (re-run after fixes)
- [ ] `curl -sI https://www.makecepeit.com | grep -iE 'content-type-options|referrer|permissions|content-security'` returns all four
- [ ] `/examples` HTML payload under ~300 KB
- [ ] `/examples` + `/brands` index pages show `ItemList` in JSON-LD
- [ ] GSC Coverage: brand/example clusters trending toward "Indexed"
