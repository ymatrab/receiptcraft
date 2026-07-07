# Growth Plan — ReceiptCraft / Makecepeit

Living tracker for SEO/AEO content growth. Full article blueprint (120 titles,
slugs, keywords, day-by-day calendar) lives in [blog-content-plan.md](./blog-content-plan.md).

## Blog rollout status

| Batch | Articles | Status |
|---|---|---|
| Day-1 hubs (8 clusters) | 8 | ✅ **Live** (published 2026-07-03) |
| Spokes (Days 2–15) | 92 | ⏳ designed, not written |
| Quick answers (Days 16–30) | 20 | ⏳ designed, not written |
| **Total** | **120** | **8 / 120 done (7%)** |

Nothing is currently scheduled in Sanity — only the 8 hubs exist. The pipeline
is proven and automated: writing a batch + loading it into Sanity with future
`publishedAt` dates makes posts drip out and enter the sitemap automatically.

## ▶ NEXT ACTION — week of 2026-07-13

**Write and schedule the remaining 112 blog articles**, starting the week of
July 13, 2026. Batches, in priority order:

1. **Cluster F — "How to Make X Receipt" (14 spokes)** first — highest
   commercial intent, each deep-links a `/templates/*` page and `/create`.
2. Then the remaining spokes (Clusters A–E, G, H) per the plan calendar.
3. Then the 20 quick-answer posts (Cluster Q).

### How to execute (pipeline is ready)
- Author + 8 categories already seeded in Sanity.
- Write articles as source files in `scripts/posts/` (follow the
  `day1-hubs-*.mjs` shape + the AI-citation formula in blog-content-plan.md:
  answer-first opening, question H2s, numbered how-to steps, 4 FAQs each,
  cross-links).
- `node scripts/publish-posts.mjs --dry` to validate, then without `--dry` to
  publish. Stagger `publishedAt` dates (~7/day) so it looks editorial, not bulk.
- Requires `SANITY_API_WRITE_TOKEN` in `.env.local` (already set locally).

## Other growth backlog (not scheduled)

- Off-site authority (biggest GEO gap): X profile live check, LinkedIn company
  page, ProductHunt launch, one YouTube demo. Then confirm `sameAs` in Org schema.
- Second email-capture surface (exit-intent or post-download) to grow the list.
- Watch GSC "Discovered – not indexed" (561 URLs) drain as blog + internal
  links mature; request indexing on top brand pages.
