import type { ReactNode } from "react";
import ReceiptFontScope from "@/components/receipt/ReceiptFontScope";

/**
 * Receipts under /compare render in a font picked at runtime — from the builder's
 * font picker or from the seeded pools in lib/sections.ts — so this segment
 * needs the whole font library. It is deliberately scoped here rather than on
 * <html>; see components/receipt/ReceiptFontScope.tsx.
 */
export default function CompareLayout({ children }: { children: ReactNode }) {
  return <ReceiptFontScope>{children}</ReceiptFontScope>;
}
