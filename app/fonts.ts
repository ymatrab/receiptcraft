// Receipt builder font library. Each family is self-hosted by next/font (so it
// embeds correctly in the html-to-image PNG/PDF export) and exposed as a CSS
// variable consumed by FONT_STACK in components/receipt/ReceiptDocPaper.tsx.
//
// NOTE: next/font/google is parsed by a static SWC transform — every option must
// be an inline literal. No spreads, no shared option objects, no variables.
// Variable fonts are declared WITHOUT a `weight`; static families list weights.
import {
  Geist,
  Geist_Mono,
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

// --- Base UI fonts -------------------------------------------------------
export const geistSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans" });
export const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

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

/** Space-separated `variable` classes for every font, applied once on <html>. */
export const fontVariables = [
  geistSans, geistMono,
  robotoMono, ibmPlexMono, spaceMono, inconsolata, sourceCodePro, notoSansMono,
  anonymousPro, courierPrime, cutiveMono, firaMono, ubuntuMono, dmMono,
  oxygenMono, shareTechMono, vt323,
  inter, roboto, openSans, lato, notoSans, workSans, montserrat, mulish,
  oswald, playfair,
]
  .map((f) => f.variable)
  .join(" ");
