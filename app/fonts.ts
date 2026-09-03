// Base UI fonts. These two are applied on <html> in app/layout.tsx, so their
// `@font-face` rules land in the global stylesheet and are paid for on every
// page — keep this file to the families the site chrome itself needs.
//
// The 25-family receipt library lives in app/receipt-fonts.ts and is scoped to
// the routes that render receipts. Adding a family here instead puts ~8 KB of
// render-blocking CSS on all ~200 pages of the site; see the note in that file.
//
// Both are self-hosted by next/font (so they embed correctly in the
// html-to-image PNG/PDF export) and exposed as CSS variables consumed by
// app/globals.css and by FONT_STACK in components/receipt/ReceiptDocPaper.tsx.
//
// NOTE: next/font/google is parsed by a static SWC transform — every option must
// be an inline literal. No spreads, no shared option objects, no variables.
import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans" });
export const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

/** Space-separated `variable` classes for the base fonts, applied once on <html>. */
export const fontVariables = [geistSans, geistMono].map((f) => f.variable).join(" ");
