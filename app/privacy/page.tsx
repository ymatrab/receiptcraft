import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data: receipt contents stay in your browser; account, payment and AI data explained.`,
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: July 2, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <H2>The short version</H2>
        <p>
          The receipt builder runs in your browser — the contents of your receipts stay on your
          device and are not sent to or stored on our servers. We only collect the limited data
          needed to run accounts, payments, AI generation and support, described below.
        </p>

        <H2>Receipt data</H2>
        <p>
          Business names, items, prices, dates and other details you type into the builder are
          processed entirely in your browser, and PDF/PNG files are generated locally. This content
          is not transmitted to us — unless you choose to <strong>save a receipt</strong> to your
          account, in which case that receipt&apos;s data is stored in our database so you can reopen it.
        </p>

        <H2>Account data</H2>
        <p>
          If you create an account, we store your email address and basic profile information to
          authenticate you and manage your plan. Authentication and our database are operated by
          Supabase on our behalf.
        </p>

        <H2>Payment data</H2>
        <p>
          Payments are handled by a third-party payment provider. We receive confirmation of your
          purchase and your plan status, but we never receive or store your full card number or
          security details — those are handled by the payment provider under their own privacy policy.
        </p>

        <H2>AI generator</H2>
        <p>
          When you use the AI generator, the text you enter is sent to a third-party AI provider
          (such as Google, OpenAI or Anthropic) to produce suggested receipt content. Please don&apos;t
          enter sensitive personal information into AI prompts. We keep a minimal count of AI usage
          to enforce fair-use limits.
        </p>

        <H2>Support chat</H2>
        <p>
          If you message us through the in-app chat, those messages are stored so we (the admin team)
          can read and reply. Don&apos;t share passwords or payment details in chat.
        </p>

        <H2>Cookies &amp; local storage</H2>
        <p>
          Essential cookies and storage — keeping you signed in, enforcing free AI-generation
          limits, and autosaving drafts in your own browser — are always on. Analytics cookies
          are set <strong>only if you accept them</strong> in the cookie banner: until then
          Google Analytics runs in cookieless consent mode and Microsoft Clarity does not load.
          We do not use advertising or cross-site tracking cookies. The full
          list is on our{" "}
          <a href="/cookies" className="text-indigo-600 underline">Cookie Policy</a> page.
        </p>

        <H2>Analytics</H2>
        <p>
          With your consent, we use Google Analytics and Microsoft Clarity to understand which
          features are popular and where the interface can improve. We also use Vercel Analytics,
          which is cookieless and only counts page views in aggregate. None of this is linked to
          your receipt contents. If you subscribe to our newsletter, we store your email address
          to send you product updates; every email includes an unsubscribe option.
        </p>

        <H2>Service providers</H2>
        <p>
          We rely on a small set of processors to run {SITE.name}: hosting (Vercel), database &amp;
          authentication (Supabase), payments (our payment provider), the AI provider you generate
          with, and our blog CMS (Sanity). Each processes data only to provide its service to us.
        </p>

        <H2>Your rights &amp; retention</H2>
        <p>
          You can request access to, correction of, or deletion of your account data — including
          saved receipts and chat history — by contacting us. We keep account data while your account
          is active and for a reasonable period afterwards as required for legal and accounting purposes.
        </p>

        <H2>Contact</H2>
        <p>
          Questions, or a data request? Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
