# Makecepeit Blog — Sanity Studio

This is a **standalone** Sanity Studio for writing and scheduling blog posts.
It is separate from the Next.js app (its own `node_modules`), so it never affects
the website build. The website ([../app/blog](../app/blog)) reads the published
content from the same Sanity project (`3pvc71cl`).

## First-time setup

```bash
cd studio
npm install
npx sanity login      # log in with the account that owns project 3pvc71cl
npm run dev           # opens the studio at http://localhost:3333
```

## Deploy a hosted studio (optional, recommended)

```bash
npm run deploy        # pick a name → publishes to https://<name>.sanity.studio
```

Now you (and any writers you invite) can edit posts from the browser at that URL —
no local setup needed.

## Writing & scheduling posts

1. **Post** → **Create**. Fill in title, slug, excerpt, main image, category, author,
   body, and SEO fields.
2. **Published at** controls scheduling: set a **future date/time** and the post stays
   hidden on the website until that moment (the site only shows posts whose
   `publishedAt` is in the past). Set it to "now" to publish immediately.
3. Click **Publish**.

The website rebuilds the blog hourly (ISR), so a scheduled post appears within an
hour of its publish time without any redeploy.

## Notes

- Keep the **production dataset public** (Project → API → Datasets) so the website
  can read published posts without a token — that's the default for new projects.
- The content model lives in [schemaTypes/](schemaTypes). If you change a schema here,
  the matching TypeScript types in the website's `lib/sanity/queries.ts` may need updating.
