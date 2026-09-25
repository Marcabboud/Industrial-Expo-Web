import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark border border-primary",
  accent:
    "bg-accent text-white hover:bg-accent-dark border border-accent hover:shadow-lg hover:shadow-accent/30",
  outline:
    "bg-transparent text-white border border-white/60 hover:bg-white/10",
  ghost:
    "bg-transparent text-primary border border-primary/30 hover:bg-primary/5",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
