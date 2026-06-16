import type { Metadata } from "next";
import SectionBuilder from "@/components/builder/SectionBuilder";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Receipt Builder — Create a Custom Receipt Online",
  description:
    "Build your receipt section by section: add, remove and reorder header, items, payment, barcode and more. Live preview, instant PDF or PNG download. Free, no sign-up.",
  alternates: { canonical: "/create" },
};

// SectionBuilder is fully client-side and reads ?template= on mount.
export default function CreatePage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <SectionBuilder />
    </div>
  );
}
