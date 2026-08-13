"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { useAccount } from "@/lib/useAccount";
import { btn } from "@/components/ui/Button";
import Perforation from "@/components/ui/Perforation";
import Wordmark from "./Wordmark";

const NAV_LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/brands", label: "Brands" },
  { href: "/examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { account } = useAccount();
  // Carry the current page as `next` so logging in returns the user right back
  // here — on /create that means their autosaved draft is restored — instead of
  // dropping them on the profile page and losing their in-progress receipt.
  const loginNext =
    pathname && pathname.startsWith("/") && pathname !== "/login" ? pathname : "/create";
  const accountHref = account.isLoggedIn
    ? "/account"
    : `/login?next=${encodeURIComponent(loginNext)}`;
  const accountLabel = account.isLoggedIn ? "Account" : "Log in";

  // A nav link is active on its page and its children (/templates/taxi → Templates).
  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 bg-ground/85 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative text-sm transition-colors hover:text-ink ${
                isActive(link.href)
                  ? "font-medium text-ledger after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-ledger"
                  : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={accountHref}
            // The logged-out link is /login?next=<current-path>, so this link
            // alone spawns a unique crawlable URL on every page. nofollow keeps
            // Googlebot from crawling that endless set of login duplicates.
            rel={account.isLoggedIn ? undefined : "nofollow"}
            className="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {accountLabel}
          </Link>
          <Link href="/create" className={btn()}>
            Create receipt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="-mr-1 flex h-11 w-11 items-center justify-center rounded-[3px] text-ink-soft hover:bg-greenbar hover:text-ink md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-rule bg-card px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`block rounded-[3px] px-3 py-2.5 text-sm hover:bg-greenbar/60 ${
                isActive(link.href) ? "bg-greenbar font-medium text-ledger" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={accountHref}
            onClick={() => setOpen(false)}
            rel={account.isLoggedIn ? undefined : "nofollow"}
            className="block rounded-[3px] px-3 py-2.5 text-sm text-ink hover:bg-greenbar/60"
          >
            {accountLabel}
          </Link>
          <Link
            href="/create"
            onClick={() => setOpen(false)}
            className={btn({ className: "mt-2 w-full" })}
          >
            Create receipt
          </Link>
        </div>
      )}

      <Perforation />
    </header>
  );
}
</content>
