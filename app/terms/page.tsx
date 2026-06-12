import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}: permitted purposes, prohibited uses, and disclaimers for the free receipt maker.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: June 12, 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-slate-600">
        <h2 className="text-2xl font-bold text-slate-900">1. The service</h2>
        <p>
          {SITE.name} provides a free, browser-based tool for creating receipt
          documents. By using the site you agree to these terms.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">2. Permitted use</h2>
        <p>
          You may use {SITE.name} to create receipts for legitimate purposes,
          including: recreating a lost, damaged or faded receipt that documents
          a real transaction; issuing receipts to customers of a genuine
          business; personal bookkeeping and record keeping; and producing
          props, samples or design mockups clearly not presented as records of
          real transactions.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">3. Prohibited use</h2>
        <p>
          You may not use {SITE.name} to create documents intended to deceive
          or defraud any person, business, employer, insurer or government —
          including claiming reimbursement for purchases that did not occur,
          falsifying tax records, fabricating proof of purchase for returns or
          warranty claims, or misrepresenting income or expenses. Such conduct
          is illegal in virtually every jurisdiction, and you bear sole
          responsibility for it.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">4. No warranty</h2>
        <p>
          The service is provided “as is”, without warranties of any kind. We
          do not guarantee uninterrupted availability or that generated
          documents satisfy the requirements of any particular institution.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.name} and its operators
          are not liable for any damages arising from the use or misuse of the
          service or the documents it generates.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">6. Contact</h2>
        <p>
          Questions about these terms? Contact{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
