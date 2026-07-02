import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Makecepeit is a free, privacy-first online receipt maker. Learn why we built it, how it works, and what it can be used for.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">About {SITE.name}</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-slate-600">
        <p>
          {SITE.name} is a free online receipt maker built around three ideas:
          it should be <strong className="text-slate-900">fast</strong> (a finished receipt in under a
          minute), <strong className="text-slate-900">honest</strong> (free to use with no sign-up; an
          optional Pro plan removes the watermark — no trial walls or surprise paywalls), and{" "}
          <strong className="text-slate-900">private</strong> (the builder runs in your browser, so
          your receipt data stays on your device).
        </p>
        <p>
          Receipts go missing. Thermal paper fades in months. Pump printers run
          out of paper. Small businesses without point-of-sale systems still
          need to hand customers something professional. {SITE.name} exists for
          exactly these moments: recreating a record of a real transaction or
          issuing one for a real sale, without installing software or creating
          an account.
        </p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">How it works</h2>
        <p>
          The receipt builder runs in your browser. When you type a business
          name, add items or set a tax rate, nothing is transmitted to a
          server — the live preview and the PDF/PNG export are generated
          locally on your device. The only exceptions are features you opt
          into: the AI generator sends your short description to produce a
          receipt, and saving a receipt to your account stores it so you can
          reopen it later.
        </p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">Responsible use</h2>
        <p>
          {SITE.name} is intended for legitimate purposes: replacing lost or
          faded receipts for real purchases, expense documentation, small
          business record keeping, and design or film props. Creating receipts
          to claim reimbursements for purchases that never happened, to evade
          taxes, or to deceive anyone is fraud and is illegal. You are
          responsible for how you use the documents you create.
        </p>
        <h2 className="pt-4 text-2xl font-bold text-slate-900">Who&apos;s behind {SITE.name}</h2>
        <p>
          {SITE.name} is built and maintained by a small independent team that
          got tired of receipt tools hiding basic features behind sign-up walls.
          We ship improvements weekly, answer support ourselves via the in-app
          chat, and you can always reach us at{" "}
          <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 hover:underline">
            {SITE.email}
          </a>
          . If something looks wrong or a template is missing, tell us — most
          template requests ship within days.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/create"
          className="inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
        >
          Try the Receipt Builder
        </Link>
      </div>
    </div>
  );
}
