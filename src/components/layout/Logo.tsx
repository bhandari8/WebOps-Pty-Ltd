import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-semibold text-lg tracking-tight text-text ${className}`}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-navy text-white text-sm font-bold"
        aria-hidden="true"
      >
        W
      </span>
      WebOps
    </Link>
  );
}
