export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
      <path
        d="M10 7h12v17l-2-1.5L18 24l-2-1.5L14 24l-2-1.5L10 24V7z"
        fill="white"
      />
      <rect x="12.5" y="10.5" width="7" height="1.6" rx="0.8" fill="#4f46e5" />
      <rect x="12.5" y="14" width="7" height="1.6" rx="0.8" fill="#a5b4fc" />
      <rect x="12.5" y="17.5" width="4.5" height="1.6" rx="0.8" fill="#a5b4fc" />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}
