/**
 * Shared SVG icon set.
 *
 * Hand-rolled rather than pulled from a package: the project has no icon
 * dependency and these are the only glyphs the UI needs. Every icon is a
 * 24x24 stroke drawing on `currentColor` at a uniform 1.5 stroke width, so
 * they inherit text colour, scale with font-size, and stay visually
 * consistent — none of which emoji or Unicode glyphs (✕ ⠿ ▾ 🛒) can do,
 * since those render differently per platform and can't be themed.
 *
 * All icons are decorative by default (aria-hidden). The button that wraps
 * them supplies the accessible name.
 */

import type { ReactElement, ReactNode } from "react";

export interface IconProps {
  className?: string;
}

/** Every icon in this file has this shape, so call sites can hold one in a map. */
export type IconComponent = (props: IconProps) => ReactElement;

function Svg({ className = "h-5 w-5", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ---------- Section types ---------- */

export function TagIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 6.5v4.6a2 2 0 0 0 .6 1.4l7.9 7.9a2 2 0 0 0 2.8 0l5.6-5.6a2 2 0 0 0 0-2.8l-7.9-7.9a2 2 0 0 0-1.4-.6H5.5a2 2 0 0 0-2 2Z" />
      <circle cx="7.6" cy="7.6" r="1.2" />
    </Svg>
  );
}

export function CalendarIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Svg>
  );
}

export function InfoIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11.5v5M12 7.8h.01" />
    </Svg>
  );
}

export function CartIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.6l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 7H5.3" />
    </Svg>
  );
}

export function CardIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19M6 15h3" />
    </Svg>
  );
}

export function MessageIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21 14.5a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </Svg>
  );
}

export function DocumentIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Svg>
  );
}

export function BarcodeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 5v14M6.5 5v14M10 5v10M13.5 5v14M17 5v10M20.5 5v14" />
    </Svg>
  );
}

export function QrIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20.5 14v1.5M14 20.5h1.5M20.5 19v2" />
    </Svg>
  );
}

export function ImageIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m3.5 17.5 4-4a2 2 0 0 1 2.8 0l6.2 6.2" />
    </Svg>
  );
}

export function PenIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 19.5h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </Svg>
  );
}

export function SpacerIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 5h18M3 19h18M12 9v6M9.5 11.5 12 9l2.5 2.5M9.5 12.5 12 15l2.5-2.5" />
    </Svg>
  );
}

/* ---------- UI controls ---------- */

export function ArrowUpIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function ArrowDownIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

export function GripIcon(p: IconProps) {
  return (
    <svg
      className={p.className ?? "h-5 w-5"}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="9" cy="18" r="1.4" />
      <circle cx="15" cy="6" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <circle cx="15" cy="18" r="1.4" />
    </svg>
  );
}

export function EyeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function EyeOffIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.7 6.2A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17.4 17.4 0 0 1-2.9 3.6M6.2 7.3A17.2 17.2 0 0 0 2.5 12S6 18 12 18a9.5 9.5 0 0 0 4-.9" />
      <path d="M9.9 10.1a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </Svg>
  );
}

export function SearchIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  );
}

export function SparkleIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9Z" />
      <path d="M18.5 16.5 19 18.3l1.8.5-1.8.5-.5 1.8-.5-1.8-1.8-.5 1.8-.5Z" />
    </Svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="10.5" width="16" height="10.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </Svg>
  );
}

export function WarningIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.3 4.3 2.6 17.5a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4M12 17h.01" />
    </Svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function SpinnerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2.5} opacity={0.25} />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
