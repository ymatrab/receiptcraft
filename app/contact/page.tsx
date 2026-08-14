import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Support, Billing & Privacy Requests",
  description: `Get in touch with ${SITE.name}: reach support for help with the receipt builder, billing and Pro plans, privacy and data requests, or press and partnerships.`,
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE.name}`,
  url: absoluteUrl("/contact"),
  description: `How to reach ${SITE.name} for support, billing, privacy requests, and press or partnership enquiries.`,
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    url: absoluteUrl("/contact"),
    availableLanguage: "English",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
  ],
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[3px] border border-rule bg-card p-6">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const mailto = `mailto:${SITE.email}`;
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb — matches breadcrumbJsonLd */}
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ledger">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink">Contact</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">Contact us</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {SITE.name} is an online product — the fastest way to reach us is by
        email. We read every message and aim to reply within a couple of business
        days.
      </p>

      <div className="mt-6 rounded-[3px] border border-greenbar bg-greenbar/50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-ledger-deep">
          Email
        </p>
        <a
          href={mailto}
          className="mt-1 inline-block text-xl font-bold text-ink hover:text-ledger-deep"
        >
          {SITE.email}
        </a>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card title="Support & how-to">
          Trouble building, editing or downloading a receipt? Email{" "}
          <a href={mailto} className="font-medium text-ledger hover:text-ledger-deep">
            {SITE.email}
          </a>{" "}
          and describe what you were doing and the browser you&apos;re on.
        </Card>
        <Card title="Billing & Pro plans">
          Questions about the{" "}
          <Link href="/pricing" className="font-medium text-ledger hover:text-ledger-deep">
            Free, Weekly, Monthly or Annual
          </Link>{" "}
          plans, or a payment? Please email from the{" "}
          <strong>same address you checked out with</strong> so we can find your
          account.
        </Card>
        <Card title="Privacy & data requests">
          To access or delete your data, see the{" "}
          <Link href="/privacy" className="font-medium text-ledger hover:text-ledger-deep">
            Privacy Policy
          </Link>{" "}
          and email us — we handle requests in line with the policies described
          there.
        </Card>
        <Card title="Press & partnerships">
          Writing about receipt tools, or exploring a partnership? Reach out at{" "}
          <a href={mailto} className="font-medium text-ledger hover:text-ledger-deep">
            {SITE.email}
          </a>{" "}
          — learn more{" "}
          <Link href="/about" className="font-medium text-ledger hover:text-ledger-deep">
            about who&apos;s behind {SITE.name}
          </Link>
          .
        </Card>
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        Prefer to keep building?{" "}
        <Link href="/create" className="font-semibold text-ledger hover:text-ledger-deep">
          Go back to the receipt builder
        </Link>
        .
      </p>
    </main>
  );
}
