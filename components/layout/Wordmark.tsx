import { SITE } from "@/lib/site";
import Logo from "./Logo";

/** The brand logo + styled wordmark, used in the header and footer. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logo className="h-8 w-8 drop-shadow-[0_2px_6px_rgba(99,102,241,0.45)]" />
      <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
        {SITE.name}
      </span>
    </span>
  );
}
