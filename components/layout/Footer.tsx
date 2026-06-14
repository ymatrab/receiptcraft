import Link from "next/link";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import Logo from "./Logo";

export default function Footer() {
  const popularTemplates = TEMPLATES.slice(0, 6);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Receipt<span className="text-indigo-600">Craft</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The fastest free receipt maker online. Create, customize and
              download professional receipts as PDF or PNG — no sign-up, no
              watermark.
            </p>
          </div>

          <nav aria-label="Popular templates">
            <h3 className="text-sm font-semibold text-slate-900">Popular Templates</h3>
            <ul className="mt-4 space-y-2.5">
              {popularTemplates.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/templates/${t.slug}`}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h3 className="text-sm font-semibold text-slate-900">Product</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/create" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Receipt Builder
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  All Templates
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Brand Templates
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-xs leading-relaxed text-slate-400">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            Receipts created with this tool are intended for legitimate
            purposes such as record keeping, expense documentation and design
            mockups. Creating receipts to defraud is illegal.
          </p>
        </div>
      </div>
    </footer>
  );
}
