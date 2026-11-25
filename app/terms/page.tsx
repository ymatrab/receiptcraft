import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}: your account, subscriptions and billing, permitted purposes, prohibited uses, AI features, warranties and liability disclaimers.`,
  alternates: { canonical: "/terms" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: November 24, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <H2>1. The service</H2>
        <p>
          {SITE.name} provides an online tool for creating receipt documents, including
          templates, an AI-assisted generator, and PDF/PNG export. {SITE.name} is operated by{" "}
          {SITE.legal.entity}, a {SITE.legal.jurisdiction} limited liability company
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;). These terms are an agreement between you and{" "}
          {SITE.legal.entity}. By accessing or using the site you agree to these Terms of Use.
          If you do not agree, do not use the service.
        </p>

        <H2>2. Accounts</H2>
        <p>
          The free builder, including watermarked downloads, works without an account, and a
          Pro pass can be bought at checkout without one. Some features — the AI generator,
          saving receipts, and support chat — require you to create an account by signing in
          with your email or a supported provider. You are responsible
          for activity under your account and for keeping access to your email secure. The service
          is not directed to children: you must be at least 13 years old to create an account, and
          at least 18 years old, or the age of majority in your jurisdiction, to purchase a plan.
        </p>

        <H2>3. Free plan, Pro plans &amp; billing</H2>
        <p>
          The free plan lets you create and download receipts with a small {SITE.name} watermark,
          subject to reasonable usage limits (including limits on AI generations). Paid
          (&ldquo;Pro&rdquo;) plans remove the watermark and unlock additional features and higher limits,
          and are offered on a weekly, monthly or yearly basis.
        </p>
        <p>
          Payments are processed by a third-party payment provider. We do not receive or store
          your full card details. The price shown on our pricing page and at checkout is the full
          price you pay; we do not add taxes or fees on top of it.
        </p>
        <p>
          <strong>Automatic renewal.</strong> A Pro plan bought on or after November 24, 2026 is a
          subscription that renews automatically. It is charged at the start and then again at
          the start of every period — every week, month or year, depending on the plan — at
          the price shown when you bought it, until you cancel. The renewal terms are shown next
          to the buy button and on the checkout page, and you agree to them at checkout before
          you pay. We will tell you before any price change takes effect, and you can cancel
          before it does. For yearly plans we email a reminder before each renewal.
        </p>
        <p>
          <strong>Passes bought before November 24, 2026.</strong> A Pro pass bought before that
          date — and any further pass bought by an account that already held one — is a one-time
          purchase for the period bought. It ends on its own on the date shown on your account
          page and never renews.
        </p>
        <p>
          <strong>Starting straight away.</strong> Pro starts as soon as your payment goes
          through. If you live in a country that gives a 14-day right of withdrawal for online
          purchases (such as the EU or the UK), you ask at checkout for Pro to start
          immediately and acknowledge that you lose that right once it has started.
        </p>

        <H2>4. Cancellation, plan changes &amp; refunds</H2>
        <p>
          You can cancel a renewing plan at any time with <strong>Cancel renewal</strong> on your
          account page, without contacting us. You keep Pro until the end of the period you have
          already paid for and are not charged again. You can resume the plan before that date.
          You can also switch plan there: the new plan starts immediately, the unused part of
          your current plan is credited, and you pay only the difference.
        </p>
        <p>
          <strong>Renewal refunds.</strong> If you are charged for a renewal you did not mean to
          keep, email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>{" "}
          within 48 hours of the charge. If you have not downloaded a receipt since that charge,
          we will refund it in full and cancel the plan. Otherwise, and except where the law
          requires, payments are non-refundable and cancelling does not refund the current
          period. If you believe you were charged in error, contact us and we will review it in
          good faith.
        </p>

        <H2>5. AI generator</H2>
        <p>
          The AI generator sends the text you enter to a third-party AI provider to produce
          suggested receipt content. Generated output may be inaccurate or generic and is provided
          for you to review and edit — you are responsible for the final document. Do not enter
          confidential or sensitive personal information into AI prompts. AI features are subject
          to usage limits and may change or be unavailable at times.
        </p>

        <H2>6. Permitted use</H2>
        <p>
          You may use {SITE.name} for legitimate purposes, including: recreating a lost, damaged
          or faded receipt that documents a real transaction; issuing receipts to customers of a
          genuine business; personal bookkeeping; and producing props, samples or design mockups
          clearly not presented as records of real transactions.
        </p>

        <H2>7. Prohibited use</H2>
        <p>
          You may not use {SITE.name} to create documents intended to deceive or defraud any
          person, business, employer, insurer or government — including claiming reimbursement
          for purchases that did not occur, falsifying tax records, fabricating proof of purchase
          for returns or warranty claims, or misrepresenting income or expenses. You also may not
          abuse, automate, scrape, or attempt to circumvent usage limits or the watermark. Such
          conduct may be illegal, and you bear sole responsibility for it. We may suspend or
          terminate accounts that violate these terms.
        </p>

        <H2>8. Brand templates &amp; trademarks</H2>
        <p>
          Some templates and example pages reproduce the general visual style of receipts from
          well-known brands. These are <strong>design templates and illustrative examples
          only</strong>. Brand names and logos shown are trademarks of their respective owners;{" "}
          {SITE.name} is not affiliated with, sponsored by, or endorsed by any of those brands.
          A document you create from a brand-styled template is not a genuine receipt issued by
          that brand and must never be presented as one.
        </p>
        <p>
          If you own a trademark and believe a template or page uses it improperly, email{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>{" "}
          with the subject &ldquo;Trademark notice&rdquo;, naming the mark and the page. We review
          every notice promptly and change or remove material where appropriate.
        </p>
        <p>
          {SITE.name} is a document-design tool. You alone decide what you create with it and how
          you use the result. To the maximum extent permitted by law, we are not responsible for
          documents users create — including fake or fraudulent receipts, misuse of brand-styled
          templates, or any harm caused by presenting a generated document as a record of a
          transaction that did not occur. Such use is prohibited under section 7, and we cooperate
          with lawful requests from authorities investigating fraud.
        </p>

        <H2>9. No warranty</H2>
        <p>
          The service is provided &ldquo;as is&rdquo;, without warranties of any kind. We do not guarantee
          uninterrupted availability, the accuracy of AI output, or that generated documents
          satisfy the requirements of any particular institution.
        </p>

        <H2>10. Limitation of liability</H2>
        <p>
          To the maximum extent permitted by law, {SITE.name} and its operators are not liable for
          any indirect, incidental or consequential damages, and our total liability for any claim
          relating to the service will not exceed the amount you paid us in the 12 months before the claim.
        </p>

        <H2>11. Indemnity</H2>
        <p>
          You agree to indemnify and hold harmless {SITE.legal.entity} and its members from any
          claim, loss or expense, including reasonable legal fees, arising from documents you
          create with {SITE.name}, from how you use them, or from your breach of these terms.
        </p>

        <H2>12. Governing law</H2>
        <p>
          These terms are governed by the laws of the State of {SITE.legal.jurisdiction}, USA,
          without regard to its conflict-of-law rules. The state and federal courts located in{" "}
          {SITE.legal.jurisdiction} have exclusive jurisdiction over any dispute about the service,
          except where the law of the place you live gives you the right to bring a claim there.
        </p>

        <H2>13. Changes</H2>
        <p>
          We may update the service or these terms from time to time. Material changes will be
          reflected by the &ldquo;last updated&rdquo; date above; continued use after changes means you accept them.
        </p>

        <H2>14. Contact</H2>
        <p>
          Questions about these terms? Contact{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>{" "}
          or write to {SITE.legal.entity}, {SITE.legal.address.join(", ")}.
        </p>
      </div>
    </div>
  );
}
