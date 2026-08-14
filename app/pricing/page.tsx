import type { Metadata } from "next";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { getPaymentLinks } from "@/lib/settings";
import { absoluteUrl, SITE } from "@/lib/site";
import { btn } from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PricingCta from "./PricingCta";

export const metadata: Metadata = {
  title: `Pricing — Remove the Watermark with ${SITE.name} Pro`,
  description:
    "Create receipts free with a watermark, or go Pro for watermark-free HD downloads, unlimited AI receipt generation and saved history. Monthly or yearly.",
  alternates: { canonical: "/pricing" },
};

const FAQ = [
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you every template and unlimited preview. On a free account your first 3 downloads are watermark-free HD; after that downloads carry a small watermark, and you get 3 AI generations per day. Pro removes the watermark on every download, unlocks unlimited HD exports, unlimited AI generation and saved receipt history.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Manage or cancel your subscription anytime from your account page — you keep Pro until the end of the billing period.",
  },
  {
    q: "Do I need an account to use the free tier?",
    a: "You can build and preview with no sign-up. Downloading uses a free account: your first 3 receipts are watermark-free, then downloads are watermarked until you upgrade to Pro.",
  },
];

/**
 * One plan, set like a printed price card: a banded header for the plan name,
 * the price as the figure that matters, then a perforation before what you get.
 */
function PlanCard({
  name,
  price,
  unit,
  note,
  badge,
  features,
  featured = false,
  children,
}: {
  name: string;
  price: string;
  unit: string;
  note?: string;
  badge?: string;
  features: readonly string[];
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-[3px] border bg-card ${
        featured ? "border-ledger shadow-md" : "border-rule shadow-sm"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-2 px-6 py-3 ${
          featured ? "bg-ledger" : "bg-greenbar/60"
        }`}
      >
        <h2
          className={`font-display text-[11px] font-bold uppercase tracking-[0.2em] ${
            featured ? "text-white" : "text-ink-soft"
          }`}
        >
          {name}
        </h2>
        {badge && (
          <span
            className={`font-data text-[10px] font-medium uppercase tracking-wider ${
              featured ? "text-white/80" : "text-ink-soft"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-3xl font-bold tabular-nums text-ink">
          {price}
          <span className="font-sans text-sm font-medium text-ink-soft">{unit}</span>
        </p>
        {note && <p className="mt-1 font-data text-xs text-ink-soft">{note}</p>}

        <div className="perf-rule my-5" />

        <ul className="flex-1 space-y-2.5 text-sm text-ink-soft">
          {features.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span aria-hidden="true" className="font-data text-ledger">
                ✓
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const weekly = PLANS.pro_weekly;
  const monthly = PLANS.pro_monthly;
  const yearly = PLANS.pro_yearly;
  // Payment links come from the admin panel (DB), falling back to env.
  const links = await getPaymentLinks();

  const isoDuration: Record<string, string> = { week: "P7D", month: "P1M", year: "P1Y" };
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    url: absoluteUrl("/pricing"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Makecepeit Pro removes the watermark and unlocks unlimited HD exports, unlimited AI receipt generation and saved receipt history.",
    offers: [weekly, monthly, yearly].map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      url: absoluteUrl("/pricing"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price.toFixed(2),
        priceCurrency: "USD",
        ...(p.interval ? { billingDuration: isoDuration[p.interval] } : {}),
      },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <div className="text-center">
        <Eyebrow className="justify-center">Pricing</Eyebrow>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Simple, honest pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          Start free. Upgrade when you need watermark-free, professional receipts.
        </p>
      </div>

      {/* The free tier has four states, and stating them plainly here is what
          lets the rest of the site stop explaining them. */}
      <div className="mx-auto mt-10 max-w-xl rounded-[3px] border border-rule bg-card p-5">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft">
          How the free tier works
        </p>
        <ol className="mt-4 space-y-2.5 font-data text-sm text-ink-soft">
          <li className="leader">
            <span>Build and preview</span>
            <span className="text-ledger">No account</span>
          </li>
          <li className="leader">
            <span>First 3 downloads</span>
            <span className="text-ledger">Watermark-free HD</span>
          </li>
          <li className="leader">
            <span>Downloads after that</span>
            <span>Watermarked</span>
          </li>
          <li className="leader">
            <span>Pro</span>
            <span className="text-ledger">Unlimited, watermark-free</span>
          </li>
        </ol>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PlanCard name="Free" price="$0" unit="/forever" features={PLANS.free.features}>
          <Link href="/create" className={btn({ variant: "secondary", className: "w-full" })}>
            Start free
          </Link>
        </PlanCard>

        <PlanCard
          name={weekly.name}
          price={`$${weekly.price}`}
          unit="/wk"
          note="7-day full Pro pass"
          features={weekly.features}
        >
          <PricingCta
            planId="pro_weekly"
            paymentLink={links.weekly}
            className={btn({ variant: "secondary", className: "w-full" })}
            label="Get 7-day Pro"
          />
        </PlanCard>

        <PlanCard
          name={monthly.name}
          price={`$${monthly.price}`}
          unit="/mo"
          features={monthly.features}
        >
          <PricingCta
            planId="pro_monthly"
            paymentLink={links.monthly}
            className={btn({ variant: "secondary", className: "w-full" })}
            label="Go Pro Monthly"
          />
        </PlanCard>

        <PlanCard
          name={yearly.name}
          price={`$${yearly.price}`}
          unit="/yr"
          badge="Save ~60%"
          features={yearly.features}
          featured
        >
          <PricingCta
            planId="pro_yearly"
            paymentLink={links.yearly}
            className={btn({ className: "w-full" })}
            label="Go Pro Yearly"
          />
        </PlanCard>
      </div>

      {/* Operational, not decorative: paying under a different email is the one
          way a checkout silently fails to activate Pro. */}
      <p className="mx-auto mt-8 max-w-xl border-l-2 border-ledger bg-greenbar/50 px-4 py-3 font-data text-sm leading-relaxed text-ink">
        Check out with the <strong className="font-bold">same email you sign in with</strong> — that
        is how we match your payment and activate Pro on your account.
      </p>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Pricing FAQ</h2>
        <dl className="mt-8 divide-y divide-rule border-y border-rule">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-medium text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* FAQ structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
            url: absoluteUrl("/pricing"),
          }),
        }}
      />
    </main>
  );
}
