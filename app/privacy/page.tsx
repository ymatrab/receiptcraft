import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data: receipt contents stay in your browser, and your account, payment and AI generator data are each explained here in plain terms.`,
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: November 25, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <H2>The short version</H2>
        <p>
          The receipt builder runs in your browser — the contents of your receipts stay on your
          device and are not sent to or stored on our servers. We only collect the limited data
          needed to run accounts, payments, AI generation and support, described below.
        </p>

        <H2>Who we are</H2>
        <p>
          {SITE.name} is operated by {SITE.legal.entity}, a {SITE.legal.jurisdiction} limited
          liability company, {SITE.legal.address.join(", ")}. We are responsible for the personal
          data described here. Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>.
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
          If you create an account, we store your email address to authenticate you and manage
          your plan. If you sign in with Google, we also receive the name and profile picture on
          your Google account. Authentication and our database are operated by Supabase on our
          behalf, and account emails (confirmation and password reset) are delivered by Resend.
        </p>

        <H2>Payment data</H2>
        <p>
          Payments are handled by Stripe. We receive confirmation of your purchase, the email
          address you gave at checkout and your plan status, but we never receive or store your
          full card number or security details — Stripe handles those under its own privacy policy.
          If you buy without an account, we create one for the email you gave Stripe so your Pro plan
          has somewhere to live; you can sign in to it later with that email.
        </p>

        <H2>AI generator</H2>
        <p>
          When you use the AI generator, the text you enter is sent to one third-party AI provider
          to produce suggested receipt content. Depending on which is available, that is Groq,
          Google (Gemini), OpenAI, xAI, Hugging Face or Cloudflare Workers AI. Please don&apos;t
          enter sensitive personal information into AI prompts. For each generation we record that
          it happened (to enforce fair-use limits), the text you entered, the business name in the
          result and which of our templates it matched. We use these to learn which receipts people
          need, so we can add the templates that are missing. The text you entered is deleted after
          90 days; it is linked to your account and is never shown to anyone outside our team.
        </p>

        <H2>Support chat</H2>
        <p>
          If you message us through the in-app chat, those messages are stored so we (the admin team)
          can read and reply. Don&apos;t share passwords or payment details in chat.
        </p>

        <H2>Notifications to our team</H2>
        <p>
          So we can respond quickly, our team receives short alerts through a private Telegram bot
          when someone signs up, subscribes to the newsletter, starts or completes a purchase,
          reaches an AI limit, or sends a chat message. An alert can include your email address,
          your plan and the first part of a chat message. Telegram stores these alerts on its
          servers.
        </p>

        <H2>Cookies &amp; local storage</H2>
        <p>
          Essential cookies and storage — keeping you signed in and autosaving drafts in your own
          browser — are always on. In the EEA, the UK
          and Switzerland, analytics cookies are set <strong>only if you accept them</strong> in
          the cookie banner: until then Google Analytics runs in cookieless consent mode. Elsewhere
          Google Analytics sets its cookies by default, and Decline in the banner turns them off.
          Microsoft Clarity loads only after you accept, wherever you are.
          We do not use advertising or cross-site tracking cookies. The full
          list is on our{" "}
          <a href="/cookies" className="text-indigo-600 underline">Cookie Policy</a> page.
        </p>

        <H2>Analytics</H2>
        <p>
          We use Google Analytics (with your consent in the EEA, the UK and Switzerland; until
          you decline elsewhere) and, with your consent, Microsoft Clarity to understand which
          features are popular and where the interface can improve. We also use Vercel Analytics,
          which is cookieless and only counts page views in aggregate. None of this is linked to
          your receipt contents. If you subscribe to our newsletter, we store your email address
          to send you product updates; every newsletter we send includes a one-click unsubscribe
          link, and signed-in members can also turn it off under Emails on their account page.
        </p>
        <p>
          We also keep our own record of product events in our database — a sign-up, a template
          being picked, a download, an AI generation, an upgrade click and similar — together with
          simple details such as which template or file format was involved. No cookie is set for
          this, and it is not shared with a third party. When you are signed in these events are
          linked to your account, so we can see how the product is really used and help you if
          something goes wrong; they never include the contents of your receipts.
        </p>
        <p>
          So that these events can be counted as people rather than as clicks, we store two
          randomly generated identifiers in your browser&apos;s local storage: one for the browser
          and one for the current visit, which expires after 30 minutes of inactivity. They are
          random values with no connection to your name, email or anything else about you, they are
          never sent to a third party, and they are not used to track you across other websites.
          Clearing your site data removes them. Receipt events also carry the random id of the
          receipt they were about — never its contents.
        </p>
        <p>
          To count visits and see where people leave the site, we also note which kind of site sent
          you (a search engine, an AI assistant, social media, or none), the page you landed on, and
          whether you are on a phone or a computer. This is stored with the same random visit
          identifier, in local storage rather than a cookie, and is listed on our{" "}
          <a href="/cookies" className="text-indigo-600 underline">Cookie Policy</a> page.
        </p>

        <H2>Service providers</H2>
        <p>
          We rely on a small set of processors to run {SITE.name}: hosting (Vercel), database &amp;
          authentication (Supabase), payments (Stripe), account email delivery (Resend), the AI
          provider you generate with (listed above), team alerts (Telegram), analytics (Google
          Analytics, Microsoft Clarity and Vercel Analytics) and our blog CMS (Sanity). Each
          processes data only to provide its service to us. Some pages also show badges from the
          directories that list us (Fazier, Turbo0 and LaunchZone); your browser loads those images
          from their servers, which can see your IP address. These services are based in, or
          transfer data to, the United States.
        </p>
        <p>
          We do not sell your personal information, and we do not share it for cross-context
          behavioral advertising.
        </p>

        <H2>Your rights &amp; retention</H2>
        <p>
          You can delete your account yourself at any time with &ldquo;Delete my account&rdquo; at
          the bottom of your account page. That removes your account, saved receipts, chat history,
          usage records, product events and newsletter subscription straight away, and asks Stripe
          to delete your customer record and any saved card. You can also request access to or
          correction of your data by contacting us, and we will not treat you differently for
          doing so. Payment records themselves are kept by Stripe and by us as long as tax law
          requires.
        </p>

        <H2>Children</H2>
        <p>
          {SITE.name} is not directed to children under 13, and we do not knowingly collect personal
          information from them. If you believe a child has given us personal information, contact
          us and we will delete it.
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
