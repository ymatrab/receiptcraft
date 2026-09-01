import type { Metadata } from "next";
import ExamplesGrid from "@/components/ExamplesGrid";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt Examples — Real Samples by Brand",
  description:
    "Browse receipt examples by brand — coffee shops, restaurants, grocery, retail, gas and hotels. See what each one looks like, then make your own editable copy.",
  alternates: { canonical: "/examples" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Receipt Examples", item: absoluteUrl("/examples") },
  ],
};

export default function ExamplesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ExamplesGrid page={1} />
    </>
  );
}
