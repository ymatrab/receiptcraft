import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ExamplesGrid from "@/components/ExamplesGrid";
import { EXAMPLES_TOTAL_PAGES } from "@/lib/examples";

export function generateStaticParams() {
  // Page 1 lives at /examples; generate /examples/page/2 … /examples/page/N.
  return Array.from({ length: Math.max(0, EXAMPLES_TOTAL_PAGES - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return {
    title: `Receipt Examples — Page ${n}`,
    description: `More realistic receipt examples by brand (page ${n} of ${EXAMPLES_TOTAL_PAGES}). See what each receipt looks like, then make your own.`,
    alternates: { canonical: `/examples/page/${n}` },
  };
}

export default async function ExamplesPaged({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) redirect("/examples");
  if (n > EXAMPLES_TOTAL_PAGES) notFound();
  return <ExamplesGrid page={n} />;
}
