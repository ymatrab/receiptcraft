import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[3px] font-medium " +
  "transition-colors duration-150 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-ledger focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-ground disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ledger text-white hover:bg-ledger-deep",
  secondary: "border border-rule bg-card text-ink hover:border-ink/35 hover:bg-greenbar/40",
  ghost: "text-ink-soft hover:text-ink",
};

const SIZES: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

/**
 * Button classes as a string, for the many CTAs that are Next `<Link>`s rather
 * than real buttons. Keeps one source of truth without wrapping every link.
 */
export function btn({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();
}

/** A real `<button>`. For links, use `btn()` on a `<Link>` instead. */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={btn({ variant, size, className })} {...props} />;
}
</content>
