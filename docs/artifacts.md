# Claude Artifacts — Makecepeit

Tracking pages published as **Claude Artifacts** (rendered, shareable web pages with
on-device checkbox state). **Reuse these exact URLs** in future sessions: to update
one, pass its URL to the Artifact tool — a fresh session otherwise mints a *new*
artifact instead of updating the existing one.

## 1. Site Improvement Ledger — the TODO
<https://claude.ai/code/artifact/534da215-5f86-45e2-9dad-e6717fea5a98>

Eisenhower-matrix to-do of SEO / site improvements (Do now · Schedule · Delegate ·
Backlog) with tickable checkboxes saved per-device (localStorage key
`makecepeit-ledger-v1`). **This is the one to update as work ships.**
Last updated **2026-08-13** (hydration #418 fix, GEO/AEO tools, receipt-anatomy
dictionary, `/contact` + Editorial-Team pages, author persona → team byline).

## 2. Content Ledger — blog inventory
<https://claude.ai/code/artifact/7ec734aa-1496-4531-812c-6654b1c973d1>

Searchable inventory of every receipt-blog post already live or committed (Live in
Sanity + the August pipeline), so new keyword plans target open ground.

---

**How to update an artifact from a future session**
1. `WebFetch` the URL to read its current HTML (the full source is saved to a local
   tool-results file you can then extract).
2. Strip the injected `claude.ai` frame-runtime; keep `<title>` + `<style>` +
   the body markup + the app `<script>`.
3. Edit the content (don't change the localStorage key, or checkbox progress resets).
4. Re-publish to the **same URL** via the Artifact tool (`url` param).

Related in-repo tracking: `docs/seo-code-todos.md` (code-fix checklist + content-depth
plan), `docs/content-ledger.md` (blog publish log).
