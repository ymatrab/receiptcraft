// Receipt builder font library. Each family is self-hosted by next/font (so it
// embeds correctly in the html-to-image PNG/PDF export) and exposed as a CSS
// variable consumed by FONT_STACK in components/receipt/ReceiptDocPaper.tsx.
//
// Variable fonts are declared WITHOUT a `weight` (next/font errors otherwise);
// static families list the weights we actually use.
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

const opts = { subsets: ["latin"] as const, display: "swap" as const };

// --- Base UI fonts -------------------------------------------------------
export const geistSans = Geist({ ...opts, variable: "--font-geist-sans" });
export const geistMono = Geist_Mono({ ...opts, variable: "--font-geist-mono" });

// --- Monospace receipt fonts --------------------------------------------
export const robotoMono = Roboto_Mono({ ...opts, variable: "--font-roboto-mono" });
export const ibmPlexMono = IBM_Plex_Mono({ ...opts, weight: ["400", "500", "700"], variable: "--font-ibm-plex-mono" });
export const spaceMono = Space_Mono({ ...opts, weight: ["400", "700"], variable: "--font-space-mono" });
export const inconsolata = Inconsolata({ ...opts, variable: "--font-inconsolata" });
export const sourceCodePro = Source_Code_Pro({ ...opts, variable: "--font-source-code-pro" });
export const notoSansMono = Noto_Sans_Mono({ ...opts, variable: "--font-noto-sans-mono" });
export const anonymousPro = Anonymous_Pro({ ...opts, weight: ["400", "700"], variable: "--font-anonymous-pro" });
export const courierPrime = Courier_Prime({ ...opts, weight: ["400", "700"], variable: "--font-courier" });
export const cutiveMono = Cutive_Mono({ ...opts, weight: ["400"], variable: "--font-cutive-mono" });
export const firaMono = Fira_Mono({ ...opts, weight: ["400", "500", "700"], variable: "--font-fira-mono" });
export const ubuntuMono = Ubuntu_Mono({ ...opts, weight: ["400", "700"], variable: "--font-ubuntu-mono" });
export const dmMono = DM_Mono({ ...opts, weight: ["300", "400", "500"], variable: "--font-dm-mono" });
export const oxygenMono = Oxygen_Mono({ ...opts, weight: ["400"], variable: "--font-oxygen-mono" });
export const shareTechMono = Share_Tech_Mono({ ...opts, weight: ["400"], variable: "--font-share-tech-mono" });
export const vt323 = VT323({ ...opts, weight: ["400"], variable: "--font-vt323" });

// --- Sans / display fonts -----------------------------------------------
export const inter = Inter({ ...opts, variable: "--font-inter" });
export const roboto = Roboto({ ...opts, variable: "--font-roboto" });
export const openSans = Open_Sans({ ...opts, variable: "--font-open-sans" });
export const lato = Lato({ ...opts, weight: ["400", "700"], variable: "--font-lato" });
export const notoSans = Noto_Sans({ ...opts, variable: "--font-noto-sans" });
export const workSans = Work_Sans({ ...opts, variable: "--font-work-sans" });
export const montserrat = Montserrat({ ...opts, variable: "--font-montserrat" });
export const mulish = Mulish({ ...opts, variable: "--font-mulish" });
export const oswald = Oswald({ ...opts, variable: "--font-oswald" });
export const playfair = Playfair_Display({ ...opts, variable: "--font-playfair" });

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
