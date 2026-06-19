import type { Metadata } from "next";
import ExamplesGrid from "@/components/ExamplesGrid";

export const metadata: Metadata = {
  title: "Receipt Examples — Real Sample Receipts by Brand",
  description:
    "Browse realistic receipt examples by brand — coffee shops, restaurants, grocery, retail, gas, hotels and more. See what each receipt looks like, then make your own.",
  alternates: { canonical: "/examples" },
};

export default function ExamplesIndex() {
  return <ExamplesGrid page={1} />;
}
