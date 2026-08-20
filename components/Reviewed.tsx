import { formatReviewed } from "@/lib/content-dates";

/**
 * "Last reviewed <date>" — the freshness signal, made visible.
 *
 * Generative engines skew toward recent sources, and the site has always
 * tracked review dates carefully in the sitemap where no reader and no model
 * reading the page could see them. This renders the same date the sitemap
 * reports, so the two can never disagree.
 *
 * `dateTime` carries the ISO form for machines while the visible text stays
 * readable. Renders nothing on an unparseable date rather than printing
 * "Invalid Date" onto a page whose whole purpose is looking trustworthy.
 */
export default function Reviewed({
  date,
  className,
  label = "Last reviewed",
}: {
  /** ISO date, from lib/content-dates. */
  date: string;
  className?: string;
  label?: string;
}) {
  const formatted = formatReviewed(date);
  if (!formatted) return null;

  return (
    <p className={className ?? "mt-8 text-sm text-slate-500"}>
      {label}{" "}
      <time dateTime={date} className="font-medium text-slate-600">
        {formatted}
      </time>
    </p>
  );
}
