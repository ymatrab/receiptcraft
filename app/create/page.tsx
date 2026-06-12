import type { Metadata } from "next";
import { getTemplate } from "@/lib/templates";
import { baseReceipt, receiptFromTemplate } from "@/lib/receipt";
import BuilderApp from "@/components/builder/BuilderApp";

export const metadata: Metadata = {
  title: "Receipt Builder — Create a Custom Receipt Online",
  description:
    "Build your receipt with a live preview: add items, tax, tip and payment details, pick a style, then download as PDF or PNG. Free, instant, no sign-up.",
  alternates: { canonical: "/create" },
};

interface Props {
  searchParams: Promise<{ template?: string }>;
}

export default async function CreatePage({ searchParams }: Props) {
  const { template: templateSlug } = await searchParams;
  const template = templateSlug ? getTemplate(templateSlug) : undefined;
  const initialData = template ? receiptFromTemplate(template) : baseReceipt();

  return (
    <div className="bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Receipt Builder
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {template
            ? `Editing the ${template.name.toLowerCase()} template — everything below is customizable.`
            : "Pick a template or start from scratch. Your receipt updates live as you type."}
        </p>
      </div>
      <BuilderApp initialData={initialData} initialTemplate={template?.slug} />
    </div>
  );
}
