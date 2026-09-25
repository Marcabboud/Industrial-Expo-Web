import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedStat from "@/components/AnimatedStat";
import CategoryChips from "@/components/CategoryChips";
import { ExpoMarkEX, ExpoMarkPO } from "@/components/ExpoMark";
import {
  site,
  schedule,
  sponsors,
  sponsorTierOrder,
  sponsorTierLabels,
  getExhibitorCategories,
  getSortedNews,
} from "@/lib/content";

const statAccents = ["bg-blue", "bg-accent", "bg-yellow", "bg-green"];

const features = [
  {
    title: "Reach Qualified Buyers",
    description:
      "Connect with distributors, retailers, and institutional buyers actively sourcing from Lebanese manufacturers.",
  },
  {
    title: "B2B Matchmaking",
    description:
      "Pre-scheduled meetings pair exhibitors with international buyers based on sector and sourcing needs.",
  },
  {
    title: "Industry Conference",
    description:
      "Four days of panels and workshops on export strategy, sustainability, and industrial technology.",
  },
  {
    title: "National Platform",
    description:
      "Organized by the Association of Lebanese Industrialists, the recognized voice of Lebanon's industrial sector.",
  },
];

export default function HomePage() {
  const categories = getExhibitorCategories();
  const latestNews = getSortedNews().slice(0, 3);
  const dayOne = schedule[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <ExpoMarkEX className="animate-drift pointer-events-none absolute -top-2 right-0 w-40 opacity-90 sm:right-6 sm:w-56 lg:w-72" />
          <ExpoMarkPO
            className="animate-drift pointer-events-none absolute bottom-0 left-0 w-32 opacity-90 sm:left-6 sm:w-44 lg:w-56"
            style={{ animationDelay: "1.5s" }}
          />

          <Container className="relative py-20 sm:py-28 lg:py-32">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-transform duration-200 ease-out hover:-translate-y-0.5">
                {site.edition}
              </span>
              <span className="bg-green px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-transform duration-200 ease-out hover:-translate-y-0.5">
                {site.dates.display}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {site.tagline}. {site.description}
            </p>

            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-white/60">
              {site.venue.name} &middot; {site.venue.city}, {site.venue.country}
              {site.dates.hours && <> &middot; {site.dates.hours}</>}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={site.ctas.exhibit.href} variant="accent">
                {site.ctas.exhibit.label}
              </Button>
              <Button href={site.ctas.visit.href} variant="outline">
                {site.ctas.visit.label}
              </Button>
            </div>
          </Container>
        </div>

        {/* Highlights strip */}
        <div className="relative border-t border-white/10 bg-primary-dark/60">
          <Container>
            <dl className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 sm:gap-8">
              {site.highlights.map((item, i) => (
                <div
                  key={item.label}
                  className="group transition-transform duration-200 ease-out hover:-translate-y-1"
                >
                  <dt className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-mono text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedStat value={item.value} />
                  </dd>
                  <span
                    aria-hidden="true"
                    className={`mt-2 block h-1 w-8 transition-all duration-200 ease-out group-hover:w-full ${
                      statAccents[i % statAccents.length]
                    }`}
                  />
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About the Exhibition"
              title={`A national platform for Lebanese industry`}
            />
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {site.organizer.description}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="ghost">
                Learn more about the exhibition
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories / directory teaser */}
      <section className="bg-surface-alt py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Exhibitor Directory"
              title="Industries represented on the show floor"
              description="From food processing to renewable energy, explore exhibitors by sector."
            />
            <Button href="/exhibitors" variant="ghost" className="shrink-0">
              View full directory
            </Button>
          </div>

          <CategoryChips categories={categories} />
        </Container>
      </section>

      {/* Program teaser */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Program"
              title="Four days of exhibitions, conferences & networking"
              description="Explore the full day-by-day schedule of panels, workshops, and floor hours."
            />
            <div className="mt-8">
              <Button href="/program" variant="ghost">
                View full program
              </Button>
            </div>
          </div>

          <div className="border border-border bg-surface">
            <div className="border-b border-border bg-primary px-6 py-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">
                {dayOne.label} &middot; {dayOne.dayName}
              </p>
              <p className="mt-1 text-lg font-bold">{dayOne.theme}</p>
            </div>
            <ul>
              {dayOne.events.map((event) => (
                <li
                  key={event.title}
                  className="flex flex-col gap-1 border-b border-border px-6 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-sm font-semibold text-accent-dark sm:w-24 sm:shrink-0">
                    {event.time}
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {event.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Sponsors strip */}
      <section className="bg-surface-alt py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sponsors & Partners"
            title="Backed by leading institutions"
            align="center"
          />

          <div className="mt-10 space-y-8">
            {sponsorTierOrder.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier}>
                  <p className="text-center text-xs font-bold uppercase tracking-widest text-ink-faint">
                    {sponsorTierLabels[tier]}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {tierSponsors.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="flex h-16 min-w-[10rem] items-center justify-center border border-border-strong bg-surface px-6 text-center text-sm font-semibold text-ink-muted transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:text-primary hover:shadow-md"
                      >
                        {sponsor.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button href="/sponsors" variant="ghost">
              View all sponsors
            </Button>
          </div>
        </Container>
      </section>

      {/* News teaser */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="News" title="Latest announcements" />
            <Button href="/news" variant="ghost" className="shrink-0">
              View all news
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col border border-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {item.category}
                </span>
                <h3 className="mt-3 text-base font-bold text-primary group-hover:text-accent-dark">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.excerpt}
                </p>
                <time
                  dateTime={item.date}
                  className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-faint"
                >
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 text-white sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            Reserve your place at {site.shortName}
          </h2>
          <p className="max-w-xl text-white/75">
            Whether you&apos;re showcasing your products or sourcing new partners,
            registration takes just a few minutes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={site.ctas.exhibit.href} variant="accent">
              {site.ctas.exhibit.label}
            </Button>
            <Button href={site.ctas.visit.href} variant="outline">
              {site.ctas.visit.label}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
