"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { useAccount } from "@/lib/useAccount";
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
  const accountHref = account.isLoggedIn ? "/account" : "/login";
  const accountLabel = account.isLoggedIn ? "Account" : "Log in";

  // A nav link is active on its page and its children (/templates/taxi → Templates).
  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                isActive(link.href) ? "text-indigo-600" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={accountHref}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            {accountLabel}
          </Link>
          <Link
            href="/create"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
          >
            Create Receipt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-50 ${
                isActive(link.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={accountHref}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {accountLabel}
          </Link>
          <Link
            href="/create"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-indigo-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Create Receipt
          </Link>
        </div>
      )}
    </header>
  );
}
