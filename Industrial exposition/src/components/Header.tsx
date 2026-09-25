"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import { site } from "@/lib/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/exhibitors", label: "Exhibitors" },
  { href: "/program", label: "Program" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact" },
];

// Same blue / red / yellow / green rotation as the category chips.
const accents = [
  { hover: "hover:bg-blue" },
  { hover: "hover:bg-accent" },
  { hover: "hover:bg-yellow" },
  { hover: "hover:bg-green" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 items-center justify-center bg-accent px-2 text-sm font-bold tracking-tight text-white transition-transform duration-200 ease-out group-hover:-rotate-2 group-hover:scale-105 sm:h-10">
            LINDEX
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-ink sm:text-base">
              {site.name}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-ink-muted">
              {site.dates.display}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link, i) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            const accent = accents[i % accents.length];
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white hover:shadow-md ${
                  `text-ink-muted ${accent.hover}`
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/#tickets"
            className="inline-flex items-center justify-center bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
          >
            Buy Tickets
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-border text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-surface lg:hidden"
        >
          <Container className="flex flex-col py-2">
            {navLinks.map((link, i) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const accent = accents[i % accents.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`border-b border-border px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors last:border-b-0 hover:text-white ${
                    `text-ink-muted ${accent.hover}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#tickets"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              Buy Tickets
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
