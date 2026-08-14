import Link from "next/link";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import NewsletterSignup from "@/components/NewsletterSignup";
import Perforation from "@/components/ui/Perforation";
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
  { slug: "best-buy", name: "Best Buy Receipt" },
  { slug: "cvs-pharmacy", name: "CVS Receipt" },
  { slug: "doordash", name: "DoorDash Receipt" },
  { slug: "burger-king", name: "Burger King Receipt" },
  { slug: "chick-fil-a", name: "Chick-fil-A Receipt" },
  { slug: "sephora", name: "Sephora Receipt" },
];

/** Column headings are set as receipt column labels: mono, uppercase, tracked. */
const COL_HEADING =
  "font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink";
const COL_LINK = "text-sm text-ink-soft transition-colors hover:text-ledger";

const PRODUCT_LINKS = [
  { href: "/create", label: "Receipt Builder" },
  { href: "/templates", label: "All Templates" },
  { href: "/brands", label: "Brand Templates" },
  { href: "/examples", label: "Receipt Examples" },
  { href: "/receipt-help", label: "Receipt Help" },
  { href: "/tools/receipt-calculator", label: "Receipt Calculator" },
  { href: "/tools/split-payment-checker", label: "Split-Payment Checker" },
  { href: "/guides/receipt-anatomy", label: "Anatomy of a Receipt" },
  { href: "/alternatives", label: "Compare Receipt Makers" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/authors", label: "Editorial Team" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function Footer() {
  const popularTemplates = TEMPLATES.slice(0, 6);

  return (
    <footer className="bg-greenbar/45">
      <Perforation />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              The fastest free receipt maker online. Build and customize
              professional receipts with no sign-up, then download as PDF or
              PNG with a free account.
            </p>
            <a
              href="https://launchzone.co/p/makecepeit"
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://launchzone.co/badge.svg"
                alt="Find us on LaunchZone"
                width={154}
                height={54}
                loading="lazy"
              />
            </a>
          </div>

          <nav aria-label="Popular templates">
            <h3 className={COL_HEADING}>Templates</h3>
            <ul className="mt-4 space-y-2.5">
              {popularTemplates.map((t) => (
                <li key={t.slug}>
                  <Link href={`/templates/${t.slug}`} className={COL_LINK}>
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular brand receipts">
            <h3 className={COL_HEADING}>Brands</h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className={COL_LINK}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h3 className={COL_HEADING}>Product</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={COL_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className={COL_HEADING}>Company</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={COL_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-rule pt-10">
          <div className="max-w-md">
            <h3 className={COL_HEADING}>Stay in the loop</h3>
            <NewsletterSignup source="footer" className="mt-3" />
          </div>
        </div>

        {/* The closing note of a receipt: the terms printed under the total. */}
        <div className="mt-10 border-t border-rule pt-8">
          <p className="max-w-3xl font-data text-[11px] leading-relaxed text-ink-soft">
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
