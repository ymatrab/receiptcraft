import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}: accounts, subscriptions and billing, permitted purposes, prohibited uses, AI features, and disclaimers.`,
  alternates: { canonical: "/terms" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: July 2, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <H2>1. The service</H2>
        <p>
          {SITE.name} provides an online tool for creating receipt documents, including
          templates, an AI-assisted generator, and PDF/PNG export. By accessing or using
          the site you agree to these Terms of Use. If you do not agree, do not use the service.
        </p>

        <H2>2. Accounts</H2>
        <p>
          The free builder works without an account. Some features — removing the watermark
          with a paid plan, saving receipts, and support chat — require you to create an
          account by signing in with your email or a supported provider. You are responsible
          for activity under your account and for keeping access to your email secure. You must
          be at least 18 years old, or the age of majority in your jurisdiction, to purchase a plan.
        </p>

        <H2>3. Free plan, Pro plans &amp; billing</H2>
        <p>
          The free plan lets you create and download receipts with a small {SITE.name} watermark,
          subject to reasonable usage limits (including limits on AI generations). Paid
          (&ldquo;Pro&rdquo;) plans remove the watermark and unlock additional features and higher limits,
          and are offered on a monthly or yearly basis.
        </p>
        <p>
          Payments are processed by a third-party payment provider. We do not receive or store
          your full card details. Prices are shown at checkout and may be exclusive of taxes,
          which are added where required. Where a plan renews automatically, it continues for
          successive periods until cancelled, and you authorize the recurring charge until you cancel.
        </p>

        <H2>4. Cancellation &amp; refunds</H2>
        <p>
          You can cancel a recurring plan at any time; access continues until the end of the
          current paid period and is not renewed thereafter. Except where required by law,
          payments are non-refundable, and cancelling does not entitle you to a refund for the
          current period. If you believe you were charged in error, contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>{" "}
          and we will review it in good faith.
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

        <H2>11. Changes</H2>
        <p>
          We may update the service or these terms from time to time. Material changes will be
          reflected by the &ldquo;last updated&rdquo; date above; continued use after changes means you accept them.
        </p>

        <H2>12. Contact</H2>
        <p>
          Questions about these terms? Contact{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
