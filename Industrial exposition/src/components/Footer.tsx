import Link from "next/link";
import Container from "@/components/Container";
import SocialIcons from "@/components/SocialIcons";
import { site } from "@/lib/content";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Exhibition",
    links: [
      { href: "/about", label: "About the Exhibition" },
      { href: "/exhibitors", label: "Exhibitor Directory" },
      { href: "/program", label: "Program & Schedule" },
      { href: "/sponsors", label: "Sponsors & Partners" },
    ],
  },
  {
    title: "Participate",
    links: [
      { href: "/register?type=exhibitor", label: "Become an Exhibitor" },
      { href: "/register?type=visitor", label: "Register to Visit" },
      { href: "/venue", label: "Venue & Location" },
      { href: "/news", label: "News & Announcements" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <span className="text-lg font-bold tracking-tight">{site.name}</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/50">
            Organized by {site.organizer.name}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>{site.contact.address}</li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-accent">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phone}`} className="hover:text-accent">
                {site.contact.phone}
              </a>
            </li>
          </ul>
          <SocialIcons className="mt-5" />
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.organizer.name}. All rights reserved.
          </p>
          <p>{site.name} &mdash; {site.dates.display}</p>
        </Container>
      </div>
    </footer>
  );
}
