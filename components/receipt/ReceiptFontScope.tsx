import type { ReactNode } from "react";
import { receiptFontVariables } from "@/app/receipt-fonts";

/**
 * Makes the full receipt font library available to everything inside it.
 *
 * The library used to be declared on <html> in the root layout, which put ~200
 * `@font-face` rules — 62 KB of render-blocking CSS — on every page of the
 * site, including the blog, the guides and the legal pages, none of which
 * render a receipt. Importing it here instead means next/font emits those rules
 * into the CSS chunk of the routes that mount this, and nowhere else.
 *
 * Mount it from a segment's layout.tsx rather than a page, so a page added to
 * that segment later inherits the fonts instead of silently falling back to the
 * system stack. It is already mounted on /create, /brands, /examples,
 * /templates and /compare — the segments whose receipts pick a font from
 * VARIANT_FONT_POOL / SERVICE_FONT_POOL (lib/sections.ts) or from the builder's
 * font picker.
 *
 * `display: contents` keeps this element out of the box tree, so wrapping a
 * segment cannot change its layout. CSS custom properties still inherit
 * through it, which is all the font variables need.
 */
export default function ReceiptFontScope({ children }: { children: ReactNode }) {
  return (
    <div className={receiptFontVariables} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
