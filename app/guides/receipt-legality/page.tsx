import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { CitedSentence, SourceList } from "@/components/Sources";
import { citationJsonLd, type SourceId } from "@/lib/sources";
import Reviewed from "@/components/Reviewed";
import { GUIDES_LEGALITY_UPDATED } from "@/lib/content-dates";

/**
 * The legitimacy guide.
 *
 * A competitor named ReceiptFaker cannot credibly answer "is this legal" — we
 * can, because the sources registry, the editorial policy and a named author
 * already exist. This is the most defensible content position in the market and
 * nobody has claimed it.
 *
 * Deliberate constraint, and it is a commercial one rather than a stylistic
 * preference: the word "fake" appears nowhere in the title, H1, slug or
 * metadata. Every "fake" query the site sees totals 29 impressions and 0 clicks
 * at positions 17-100, while brand queries — instacart, chipotle, amazon, ulta —
 * are the same buyer at roughly ten times the volume without the word. With a
 * single payment processor and 348 named-brand templates, a "fake" posture is
 * the one thing that could cost the payment rail.
 *
 * Every legal statement here is attributed to the body that published it and
 * links out. Where something is genuinely situational it says so rather than
 * resolving it — this page is not advice, and /editorial-policy says that
 * plainly.
 */

const PAGE_SOURCES: SourceId[] = [
  "ca-civ-1499",
  "ny-rpl-235-e",
  "wa-rcw-59-18-063",
  "ma-mgl-186-15b",
  "irs-pub-463",
  "irs-pub-583",
  "irs-pub-1771",
  "fcra-1681c-g",
];

const TITLE = "Is It Legal to Make a Receipt?";
const DESCRIPTION =
  "Making a receipt is an ordinary business act, and several states require one. Here is what the IRS and state statutes actually say, and where the line sits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/receipt-legality" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: absoluteUrl("/guides/receipt-legality"),
    siteName: SITE.name,
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
};

/** Written to be liftable: each answer stands on its own out of context. */
const FAQS = [
  {
    q: "Is it legal to make your own receipt?",
    a: "Yes. Issuing a receipt is an ordinary business act, and in several US states it is a legal duty rather than an option — California entitles anyone who pays money to a receipt, and Washington requires one for rent paid in cash. What matters is not that a receipt was produced but whether it accurately records a transaction that actually happened.",
  },
  {
    q: "Is it legal to recreate a receipt I lost?",
    a: "Recreating a record of a purchase you genuinely made, for your own files or an expense claim, is a bookkeeping exercise rather than a legal problem. The recreated document has to match the real transaction — same merchant, date and amount. If the details do not describe something that happened, it stops being a record of anything.",
  },
  {
    q: "What makes a receipt valid for taxes?",
    a: "For a business expense the IRS looks for four things on the document: the amount, the date, the place, and the nature of the expense. Publication 463 requires documentary evidence for any lodging expense and for any other expense of $75 or more. A total-only slip usually fails, because it does not show what was bought.",
  },
  {
    q: "Can I use a template styled after a real store?",
    a: "Brand-styled templates are design examples. The trademarks belong to their owners, and Makecepeit is not affiliated with any brand shown. Using one to reconstruct your own genuine purchase for your records is different from using it to represent a transaction that never took place.",
  },
  {
    q: "When does making a receipt become illegal?",
    a: "When the document misrepresents a transaction and is used to obtain money, goods or a reimbursement the person is not entitled to. That is fraud, and it turns on the use and the misrepresentation — not on how the document was produced or which tool made it.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl("/guides/receipt-legality"),
  dateModified: GUIDES_LEGALITY_UPDATED,
  author: { "@type": "Organization", name: SITE.name, url: SITE.url },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo-1024.png` },
  },
  citation: citationJsonLd(PAGE_SOURCES),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: GUIDES_LEGALITY_UPDATED,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: TITLE, item: absoluteUrl("/guides/receipt-legality") },
  ],
};

export default function ReceiptLegalityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, faqJsonLd, breadcrumbJsonLd]),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">{TITLE}</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{TITLE}</h1>

      {/* The lead is written to survive being quoted on its own — it is the
          passage an assistant is most likely to lift. */}
      <p className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-lg leading-relaxed text-slate-800">
        Making a receipt is not, in itself, unlawful. A receipt is an ordinary
        business document, and in several US states issuing one is a legal duty
        rather than a courtesy. What determines whether a receipt is legitimate is
        whether it accurately records a transaction that actually happened — and
        what someone then does with it.
      </p>

      <section className="mt-12" aria-labelledby="required-heading">
        <h2 id="required-heading" className="text-2xl font-bold text-slate-900">
          In several states, the law requires a receipt
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          The question is usually asked the wrong way round. Far from being a grey
          area, issuing a receipt is something statute often compels.
        </p>
        <ul className="mt-4 space-y-3 leading-relaxed text-slate-600">
          <li>
            <CitedSentence
              id="ca-civ-1499"
              sentence="California is the broadest: {source} entitles anyone who pays money to demand a receipt from the person who accepts it."
            />
          </li>
          <li>
            <CitedSentence
              id="ny-rpl-235-e"
              sentence="New York requires a landlord to give a written receipt whenever rent is paid by any means other than the tenant's own personal check, and {source} sets out what that receipt has to state."
            />
          </li>
          <li>
            <CitedSentence
              id="wa-rcw-59-18-063"
              sentence="Washington ties the duty to cash: {source} requires a receipt for any rent payment made in cash, and on request for other methods."
            />
          </li>
          <li>
            <CitedSentence
              id="ma-mgl-186-15b"
              sentence="Massachusetts governs the receipt for a security deposit or last month's rent in detail, down to its required contents, under {source}."
            />
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-slate-600">
          Those four are examples rather than the full picture. Rules differ by
          state and sometimes by city, and the one that binds you is the one where
          the transaction happens.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="valid-heading">
        <h2 id="valid-heading" className="text-2xl font-bold text-slate-900">
          What a receipt has to show to do its job
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          <CitedSentence
            id="irs-pub-463"
            sentence="For a business expense, {source} asks the document to show four things — the amount, the date, the place and the nature of the expense — and requires documentary evidence for any lodging expense and any other expense of $75 or more."
          />{" "}
          A slip showing only a total commonly fails that last test, because it
          does not record what was actually bought.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          <CitedSentence
            id="irs-pub-583"
            sentence="On the business's own side, {source} sets out the sales and purchase records a business is expected to keep, with receipts as the supporting documents behind gross receipts."
          />{" "}
          <CitedSentence
            id="irs-pub-1771"
            sentence="Charitable gifts have their own threshold: {source} requires a written acknowledgement for any single contribution of $250 or more, including a statement about whether anything was provided in return."
          />
        </p>
      </section>

      <section className="mt-12" aria-labelledby="lost-heading">
        <h2 id="lost-heading" className="text-2xl font-bold text-slate-900">
          Replacing a receipt you lost
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Receipts fade, wash, and vanish from inboxes. Reconstructing a record of
          a purchase you genuinely made — for your own files, an expense claim or a
          warranty — is a bookkeeping exercise, and it is what most people using a
          receipt maker are doing.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          The requirement is accuracy. The reconstructed document should carry the
          real merchant, the real date and the real amount, because its entire
          value is as a record of something that happened. Before rebuilding one,
          it is worth checking whether the original still exists: card statements,
          order-confirmation emails and retailer apps hold more than people expect,
          and our{" "}
          <Link href="/receipt-help" className="font-medium text-indigo-600 hover:underline">
            lost-receipt guides
          </Link>{" "}
          cover where each major retailer keeps them.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="line-heading">
        <h2 id="line-heading" className="text-2xl font-bold text-slate-900">
          Where the line actually sits
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          A receipt becomes a legal problem when it misrepresents a transaction and
          is used to obtain money, goods or a reimbursement someone is not entitled
          to. That is fraud, and it turns on the misrepresentation and the use —
          not on how the document was produced, or which tool produced it. The same
          act done in a spreadsheet is the same act.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          It is the reason this site is built around records, expense
          documentation, small-business issuing and design work, and says so in its{" "}
          <Link href="/terms" className="font-medium text-indigo-600 hover:underline">
            terms
          </Link>
          . Brand-styled templates are design examples; trademarks belong to their
          owners and {SITE.name} is not affiliated with any brand shown.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          <CitedSentence
            id="fcra-1681c-g"
            sentence="One detail is a legal requirement rather than a convention: {source} bars printing more than the last five digits of a card number, or the expiry date at all, on the copy handed to the cardholder."
          />{" "}
          A well-made receipt follows that rule, which is why a genuine one shows
          only the final digits.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
          Common questions
        </h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-slate-900">{f.q}</dt>
              <dd className="mt-2 leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SourceList
        ids={PAGE_SOURCES}
        note="The statutes and publications cited above, with what each one is cited for. They describe how receipts are treated; they are not advice about your own situation."
      />

      <p className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
        This guide cites published rules and links every one of them. Citing a
        regulation is not legal or tax advice, and nothing here is a substitute for
        a professional who knows your circumstances — our{" "}
        <Link href="/editorial-policy" className="font-medium text-indigo-600 hover:underline">
          editorial policy
        </Link>{" "}
        sets out how these pages are written, sourced and re-checked.
      </p>

      <Reviewed date={GUIDES_LEGALITY_UPDATED} />

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-bold text-slate-900">Rebuilding a receipt you lost?</h2>
        <p className="mt-3 leading-relaxed text-slate-600">
          Start from the real details — merchant, date, items and amount — so the
          document records what actually happened.
        </p>
        <Link
          href="/create"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Open the receipt builder
        </Link>
      </section>
    </div>
  );
}
