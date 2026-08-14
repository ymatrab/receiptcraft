export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="url(#mc-bg)" />
      {/* top sheen */}
      <rect width="32" height="32" rx="9" fill="url(#mc-shine)" fillOpacity="0.35" />
      {/* receipt with torn bottom edge */}
      <path
        d="M9 7.5h14v15.6l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4V7.5z"
        fill="white"
      />
      <rect x="11.4" y="11" width="9.2" height="1.7" rx="0.85" fill="#4f46e5" />
      <rect x="11.4" y="14.4" width="9.2" height="1.7" rx="0.85" fill="#a5b4fc" />
      <rect x="11.4" y="17.8" width="6" height="1.7" rx="0.85" fill="#c7d2fe" />
      <defs>
        <linearGradient id="mc-bg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="mc-shine" x1="0" y1="0" x2="0" y2="20">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
