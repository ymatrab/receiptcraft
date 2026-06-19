import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIntentPage,
  intentContent,
  siblingIntents,
  INTENT_SLUGS,
} from "@/lib/intent-pages";
import { getTemplate } from "@/lib/templates";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return INTENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentPage(slug);
  if (!page) return { title: "Not found" };
  const c = intentContent(page);
  return { title: c.title, description: c.description, alternates: { canonical: `/receipt-help/${slug}` } };
}

export default async function IntentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIntentPage(slug);
  if (!page) notFound();

  const c = intentContent(page);
  const logo = getTemplate(page.brandSlug)?.defaults.logoDataUrl ?? "";
  const siblings = siblingIntents(page);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    url: absoluteUrl(`/receipt-help/${slug}`),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/receipt-help" className="hover:text-slate-700">Receipt Help</Link>
        <span className="px-1">/</span>
        <Link href={`/brands/${page.brandSlug}`} className="hover:text-slate-700">{page.brandName}</Link>
      </nav>

      <div className="mt-4 flex items-center gap-3">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={`${page.brandName} logo`} className="h-8 w-auto max-w-[120px] object-contain" />
        )}
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.lead}</p>

      {c.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
          {s.body && <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>}
          {s.steps && (
            <ol className="mt-3 space-y-2">
              {s.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-white">{c.ctaHeading}</h2>
        <p className="mt-2 text-indigo-100">Match the items, prices, date and store details — then download as PDF or PNG.</p>
        <Link
          href={`/create?template=${encodeURIComponent(page.brandSlug)}`}
          className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-base font-semibold text-indigo-700 shadow-lg hover:scale-105"
        >
          Open the {page.brandName} receipt builder
        </Link>
      </div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
        <dl className="mt-4 space-y-4">
          {c.faqs.map((f) => (
            <div key={f.question} className="rounded-2xl border border-slate-200 bg-white p-5">
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related */}
      {siblings.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            More {page.brandName} receipt help
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/receipt-help/${s.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                >
                  {intentContent(s).h1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/brands/${page.brandSlug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              >
                {page.brandName} receipt template
              </Link>
            </li>
          </ul>
        </section>
      )}
    </main>
  );
}
