import { Fragment } from "react";
import Link from "next/link";
import type { SellLink } from "@/lib/sell-links";

/** Hand-off lines from lib/sell-links.ts, rendered under a sell page's intro. */
export default function SellLinks({ links }: { links?: readonly SellLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <>
      {links.map((parts, i) => (
        <p key={i} className="mt-3 text-base leading-relaxed text-slate-600">
          {parts.map((part, j) =>
            typeof part === "string" ? (
              <Fragment key={j}>{part}</Fragment>
            ) : (
              <Link key={j} href={part.href} className="font-medium text-indigo-600 hover:text-indigo-700">
                {part.anchor}
              </Link>
            ),
          )}
        </p>
      ))}
    </>
  );
}
