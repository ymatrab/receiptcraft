# Growth Plan — ReceiptCraft / Makecepeit

Living tracker for SEO/AEO content growth. Full article blueprint (140 titles,
slugs, keywords, calendar) lives in [blog-content-plan.md](./blog-content-plan.md).

## Blog rollout status — ✅ COMPLETE (2026-07-11)

| Batch | Articles | Status |
|---|---|---|
| Day-1 hubs (8 clusters) | 8 | ✅ Live (published 2026-07-03) |
| Spokes (Clusters A–H) | 82 | ✅ Written + scheduled (Jul 12–23) |
| Reddit-target answers (Cluster R) | 30 | ✅ Written + scheduled (Jul 10–31) |
| Quick answers (Cluster Q) | 20 | ✅ Written + scheduled (Jul 24–31) |
| **Total** | **140** | **140 / 140 done (100%)** |

All 140 posts are live in Sanity as of 2026-07-11; the 132 non-hub posts carry
future `publishedAt` dates (Jul 12–31) so they auto-drip into the site and
sitemap (~6–8/day). Sanity verified: 140 posts, 132 future-dated. Plan expanded
from 120 → 140: added **Cluster R (30 Reddit-target posts** — "reddit" in title,
slug, body to capture "<topic> reddit" searches), and cut 10 low-value spokes
(A10, A12, B11, C12, D14, E11, G8, G9, G11, H9).

## ▶ NEXT ACTION — monitoring (after 2026-07-31)

Writing is done. Now:
1. **Internal-link QA** once all posts are live; resubmit sitemap in GSC.
2. **Watch GSC Coverage** — if "Crawled – not indexed" grows on blog URLs, the
   drip was too fast; otherwise request indexing on the 8 hubs + Cluster F.
3. **Add 8 hub URLs to `llms.txt`** under a "Guides" section.
4. **Refresh hubs every 60–90 days** (stats/facts; `_updatedAt` drives schema).

### Pipeline (for future batches / edits)
- `scripts/publish-posts.mjs` now auto-globs every `scripts/posts/*.mjs`,
  dedupes slugs, validates fields, chunks mutations by 20. Files:
  `spokes-{a..h}{1..5}.mjs`, `reddit-{1..10}.mjs`, `quick-{1..4}.mjs`.
- `node scripts/publish-posts.mjs --dry` validates; without `--dry` publishes
  (createOrReplace, stable `post-<slug>` ids, idempotent).
- Requires `SANITY_API_WRITE_TOKEN` in `.env.local` (set).

## Other growth backlog (not scheduled)

- Off-site authority (biggest GEO gap): X profile live check, LinkedIn company
  page, ProductHunt launch, one YouTube demo. Then confirm `sameAs` in Org schema.
- Second email-capture surface (exit-intent or post-download) to grow the list.
- Watch GSC "Discovered – not indexed" (561 URLs) drain as blog + internal
  links mature; request indexing on top brand pages.
