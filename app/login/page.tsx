import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Log in",
  description: `Log in to ${SITE.name} to manage your Pro subscription, saved receipts and support.`,
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Welcome to {SITE.name}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Log in to go Pro, manage billing, and save your receipts. The free
          builder works without an account.
        </p>
        <Suspense fallback={<div className="mt-8 h-12 animate-pulse rounded-full bg-slate-100" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
