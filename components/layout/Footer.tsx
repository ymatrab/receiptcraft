import Link from "next/link";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import NewsletterSignup from "@/components/NewsletterSignup";
import Wordmark from "./Wordmark";

// Sitewide links to the most-searched brand pages — pushes internal link
// equity into the /brands cluster, which GSC shows queued as "Discovered –
// currently not indexed".
const POPULAR_BRANDS = [
  { slug: "walmart", name: "Walmart Receipt" },
  { slug: "starbucks", name: "Starbucks Receipt" },
  { slug: "mcdonalds", name: "McDonald's Receipt" },
  { slug: "uber", name: "Uber Receipt" },
  { slug: "amazon", name: "Amazon Receipt" },
  { slug: "target", name: "Target Receipt" },
];

export default function Footer() {
  const popularTemplates = TEMPLATES.slice(0, 6);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The fastest free receipt maker online. Create, customize and
              download professional receipts as PDF or PNG — free, no sign-up
              needed.
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

          <nav aria-label="Popular brand receipts">
            <h3 className="text-sm font-semibold text-slate-900">Brand Receipts</h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    {b.name}
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
                <Link href="/examples" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Receipt Examples
                </Link>
              </li>
              <li>
                <Link href="/receipt-help" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Receipt Help
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
              <li>
                <Link href="/cookies" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-slate-900">Stay in the loop</h3>
            <NewsletterSignup source="footer" className="mt-3" />
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
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
