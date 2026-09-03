// The receipt font library — every family a receipt can be rendered in, beyond
// the two base UI families in app/fonts.ts.
//
// WHY THIS IS A SEPARATE FILE FROM app/fonts.ts
//
// These 25 families emit ~200 `@font-face` rules, and next/font puts them in
// the CSS chunk of whichever route imports them. While the whole library was
// declared on <html> in the root layout, those rules sat in the global
// stylesheet: 62 KB of render-blocking CSS on every page of the site,
// including the ~140 blog articles and every legal, guide and auth page, none
// of which render a receipt at all.
//
// So the library is now scoped to the route segments that can actually render
// an arbitrary font — see components/receipt/ReceiptFontScope.tsx and the
// layout.tsx in each of /create, /brands, /examples, /templates and /compare.
//
// / and /pricing deliberately do NOT pull this in: their receipts are fixed
// demo constants (DEMO_RECEIPT, WATERMARK_DEMO_DOC) that resolve to the base
// Geist families. If you ever give those pages a *seeded* doc — one whose font
// comes from VARIANT_FONT_POOL / SERVICE_FONT_POOL in lib/sections.ts — wrap it
// in <ReceiptFontScope> too, or it will fall back to the system stack.
//
// Each family is self-hosted by next/font so it embeds correctly in the
// html-to-image PNG/PDF export, and is exposed as a CSS variable consumed by
// FONT_STACK in components/receipt/ReceiptDocPaper.tsx.
//
// NOTE: next/font/google is parsed by a static SWC transform — every option must
// be an inline literal. No spreads, no shared option objects, no variables.
// Variable fonts are declared WITHOUT a `weight`; static families list weights.
import {
  // Monospace
  Roboto_Mono,
  IBM_Plex_Mono,
  Space_Mono,
  Inconsolata,
  Source_Code_Pro,
  Noto_Sans_Mono,
  Anonymous_Pro,
  Courier_Prime,
  Cutive_Mono,
  Fira_Mono,
  Ubuntu_Mono,
  DM_Mono,
  Oxygen_Mono,
  Share_Tech_Mono,
  VT323,
  // Sans / display
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Noto_Sans,
  Work_Sans,
  Montserrat,
  Mulish,
  Oswald,
  Playfair_Display,
} from "next/font/google";

// --- Monospace receipt fonts --------------------------------------------
export const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-roboto-mono" });
export const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "500", "700"], variable: "--font-ibm-plex-mono" });
export const spaceMono = Space_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-space-mono" });
export const inconsolata = Inconsolata({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-inconsolata" });
export const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-source-code-pro" });
export const notoSansMono = Noto_Sans_Mono({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-noto-sans-mono" });
export const anonymousPro = Anonymous_Pro({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-anonymous-pro" });
export const courierPrime = Courier_Prime({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-courier" });
export const cutiveMono = Cutive_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400"], variable: "--font-cutive-mono" });
export const firaMono = Fira_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "500", "700"], variable: "--font-fira-mono" });
export const ubuntuMono = Ubuntu_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-ubuntu-mono" });
export const dmMono = DM_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["300", "400", "500"], variable: "--font-dm-mono" });
export const oxygenMono = Oxygen_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400"], variable: "--font-oxygen-mono" });
export const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["400"], variable: "--font-share-tech-mono" });
export const vt323 = VT323({ subsets: ["latin"], display: "swap", preload: false, weight: ["400"], variable: "--font-vt323" });

// --- Sans / display fonts -----------------------------------------------
export const inter = Inter({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-inter" });
export const roboto = Roboto({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-roboto" });
export const openSans = Open_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-open-sans" });
export const lato = Lato({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], variable: "--font-lato" });
export const notoSans = Noto_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-noto-sans" });
export const workSans = Work_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-work-sans" });
export const montserrat = Montserrat({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-montserrat" });
export const mulish = Mulish({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-mulish" });
export const oswald = Oswald({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-oswald" });
export const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-playfair" });

/**
 * Space-separated `variable` classes for the whole receipt library. Applied by
 * ReceiptFontScope, never on <html> — see the note at the top of this file.
 */
export const receiptFontVariables = [
  robotoMono, ibmPlexMono, spaceMono, inconsolata, sourceCodePro, notoSansMono,
  anonymousPro, courierPrime, cutiveMono, firaMono, ubuntuMono, dmMono,
  oxygenMono, shareTechMono, vt323,
  inter, roboto, openSans, lato, notoSans, workSans, montserrat, mulish,
  oswald, playfair,
]
  .map((f) => f.variable)
  .join(" ");
