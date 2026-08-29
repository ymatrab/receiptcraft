import type { Metadata } from "next";
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
        {/* No boundary around this form: ResetForm takes no props and
            suspends on nothing, so wrapping it only moved the form into a
            hidden <div> that an inline script has to swap in on an animation
            frame. That is a way for the form to never appear, bought with
            nothing in return. */}
        <ResetForm />
      </div>
    </main>
  );
}
