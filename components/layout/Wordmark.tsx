import { SITE } from "@/lib/site";
import Logo from "./Logo";

/**
 * The brand logo + wordmark, used in the header and footer.
 *
 * Set like the merchant name printed at the top of a receipt: uppercase mono,
 * wide-tracked. The brand introduces itself in the product's own typography.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logo className="h-7 w-7 text-ledger" />
      <span className="font-display text-base font-bold uppercase tracking-[0.14em] text-ink">
        {SITE.name}
      </span>
    </span>
  );
}
</content>
