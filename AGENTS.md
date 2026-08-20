<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Work is tracked in Notion, not in this file

The task board is the shared memory between Claude sessions. Anything worth
doing exists there as a task; this repo holds the code and the detailed plans.

**Where:** the `makecepeit` page holds the boards
(`3c10a70b-4d02-80c7-ad93-e715d9a87be9`). Fetch that page to see which boards
exist rather than assuming — more will be added as the product grows.

Reach Notion with its official MCP. Not Zapier: Zapier spends a task credit on
every read and write and the account runs dry mid-job.

Two boards exist today. Check both before asking what to work on — they hold
different kinds of work and neither supersedes the other.

"GEO Citations — Task Board":

- database `3c10a70b-4d02-81df-8eae-d3d4eed63f2a`
- data source `collection://3c10a70b-4d02-8181-b72f-000bec9d58cc`

"Marketing & Revenue — Task Board" (added 2026-08-20):

- database `9988b72b-fe79-4586-b8b0-fee400984eb3`
- data source `collection://2fcc02d7-f743-4ec2-9c7a-5191f5a431cb`
- seeded from `MARKETING-ACTION-PLAN.md`; the phase order there is deliberate
  (stop the leak → automate fulfilment → trust → growth) and each phase is
  worthless if the one before it is skipped

## Starting work

When the user names a task, **fetch it from Notion before doing anything else**.
The task body is the brief: it says what the outcome is, why it matters, and the
`Files` property points at the code. Don't re-derive the plan from scratch.

Set `Status` to **In progress** when you start. That doubles as a lock — if a
task is already In progress, another session may hold it, so ask before taking
it over.

## Finishing work

Set `Status` to **Done** and add one line to the body saying what actually
shipped and how it was verified. A task marked Done that nobody can verify is
worse than one left open.

**Done means verified, not built.** A green build does not prove the content is
right: a wrong competitor claim shipped to production this way in August 2026 and
was only caught by reading the live page. `main` deploys production; `dev` only
gets a preview, and previews are behind Vercel auth. So verify against
`https://www.makecepeit.com` after a merge, not against the build log.

If you stop mid-task, write where you got to and what the next step is. A cold
session should be able to resume from the task body alone.

## Shipping

`main` deploys production; `dev` is preview only. Merge to `main` when site
content or code should go live — and ask first, since that is a public release.

Docs, plans and tooling stay on `dev`. Don't merge them to `main` just to tidy
up; they change nothing for visitors and each merge spends a production deploy.

**Bump the sitemap date for any page whose visible content you changed.**
`app/sitemap.ts` uses hand-maintained per-section constants, and the IndexNow
cron only submits URLs whose `lastModified` is newer than its last run — so a
rewritten page that keeps its old date is silently never sent to Bing or Yandex.
Move the page onto a fresh constant rather than restamping a shared one:
false dates on untouched pages are what IndexNow treats as spam.

## Syncing

Update the board **at the start and at the end of a job** — not after every
step. Mid-task syncing is noise, and it burned through an integration quota once
already.

## Writing tasks

One outcome = one task, phrased the way the owner would describe it to a
customer.

- Good: "Publish 10 blog posts", "Point the lost-receipt guides at each brand's
  own help page"
- Bad: "create content/blog.tsx", "add a field to ReceiptTemplate"

Never split one deliverable into per-file tasks. File paths belong in the `Files`
property and the task body, never in the title.

`Phase` is Now / Next / Later / Ongoing, plus Archive for tasks absorbed into
another one. The board view hides Archive.

## Timing

`Window` is a date property recording **when a task may happen, not how long it
takes** — effort is already covered by `Effort`. Leave it empty when a task
could start today; that is the normal case. Set it only when there is a real
constraint:

- a gate — "Review the results in mid-September" cannot be pulled forward,
  because the data does not exist yet
- a cadence — a monthly link check, a quarterly pricing review
- a dependency on something being live long enough to judge

To pick up a week's work, select tasks whose `Window` has started or is empty,
then order by `Priority`. A task with a future `Window` is not backlog neglect —
it is deliberately waiting.

**Publishing cadence is a separate thing from scheduling a task.** In SEO,
dropping 60 posts in one day performs worse than two a day for a month, so never
publish a batch all at once. But the way to spread them is *not* to run 30
sessions: set a future `publishedAt` on each post in Sanity in a single session.
`app/sitemap.ts` revalidates hourly, so scheduled posts enter the sitemap as
they go live, and the IndexNow cron picks each one up on the day. That is how the
July 2026 batch of 132 posts was released.

## Where things live

- **Notion** — what needs doing, and its status. The owner's view.
- **`docs/*.md`** — the full plan behind a large piece of work. Link it from the
  task body rather than pasting it in.
- **Claude memory** — how to work with this user. Not a task list.

# Local environment

`node_modules` is intentionally empty: nothing is installed locally and the app
is never run locally, per the user's standing rule. There is no lint, typecheck
or build available here, and the Next.js docs referenced above are not on disk.
Rely on reading the code, and let the Vercel build be the check.
