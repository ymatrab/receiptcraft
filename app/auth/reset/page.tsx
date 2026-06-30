import type { Metadata } from "next";
import { Suspense } from "react";
import ResetForm from "./ResetForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reset password",
  description: `Choose a new password for your ${SITE.name} account.`,
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Choose a new password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter a new password below. Once saved you&apos;ll be logged in.
        </p>
        <Suspense fallback={<div className="mt-8 h-12 animate-pulse rounded-full bg-slate-100" />}>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}
