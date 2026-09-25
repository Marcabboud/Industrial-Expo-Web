import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedStat from "@/components/AnimatedStat";
import CategoryChips from "@/components/CategoryChips";
import TicketWidget from "@/components/TicketWidget";
import ScrollDrift from "@/components/ScrollDrift";
import { ExpoMarkEX, ExpoMarkPO, ExpoWordmark } from "@/components/ExpoMark";
import {
  site,
  schedule,
  sponsors,
  sponsorTierOrder,
  sponsorTierLabels,
  getExhibitorCategories,
  tickets,
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
  const dayOne = schedule[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-plum text-white">
        <div className="relative">
          <ScrollDrift
            y={-0.3}
            rotate={-0.04}
            className="pointer-events-none absolute right-0 top-0 w-32 origin-top-right sm:w-52 lg:w-64 xl:w-80"
          >
            <ExpoMarkEX className="animate-drift block h-auto w-full" />
          </ScrollDrift>
          <ScrollDrift
            x={0.15}
            y={0.12}
            rotate={0.05}
            className="pointer-events-none absolute bottom-0 left-0 w-36 origin-bottom-left sm:w-48 lg:w-60 xl:w-72"
          >
            <ExpoMarkPO
              className="animate-drift block h-auto w-full"
              style={{ animationDelay: "1.5s" }}
            />
          </ScrollDrift>

          <Container className="relative pb-28 pt-20 sm:pb-32 sm:pt-16 lg:grid lg:grid-cols-2 lg:gap-12 lg:py-14">
            <div>
              <h1 className="max-w-md font-title text-5xl leading-[0.9] tracking-tight sm:text-7xl">
                {site.name.replace(/\s*Expo$/i, "")}
                <span className="sr-only"> Expo</span>
                <ExpoWordmark className="mt-[0.12em] block h-[0.72em] w-auto" />
              </h1>
              <p
                lang="ar"
                className="mt-4 font-arabic text-2xl font-bold text-white/90 sm:text-3xl"
              >
                {site.nameArabic}
              </p>
              <span
                className="mt-5 inline-block bg-accent py-1 pl-3 pr-7 font-condensed text-lg font-semibold uppercase tracking-wide text-white"
                style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 0 100%)" }}
              >
                {site.edition}
              </span>
            </div>

            <div className="mt-12 flex flex-col items-start lg:col-start-2 lg:mt-24 lg:items-end lg:text-right xl:mt-28">
              <span className="border-4 border-accent bg-accent px-5 py-2 font-condensed text-3xl font-bold uppercase text-white sm:text-4xl">
                Save the date
              </span>
              <span className="mt-3 bg-green px-5 py-2 font-condensed text-2xl font-bold text-white sm:text-3xl">
                {site.dates.display}
              </span>
              <p className="mt-5 text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
                {site.venue.name}
                {site.dates.hours && (
                  <>
                    <br />
                    {site.dates.hours}
                  </>
                )}
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                {site.tagline}. {site.description}
              </p>
              <div className="mt-8">
                <Button href={site.ctas.visit.href} variant="accent">
                  {site.ctas.visit.label}
                </Button>
              </div>
            </div>
          </Container>
        </div>
        {/* Highlights strip */}
        <div className="relative border-t border-white/10 bg-plum-dark text-white">
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

      {/* Tickets */}
      <section id="tickets" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Tickets"
            title="Get your tickets"
            description={`Secure your place at ${site.shortName}, ${site.dates.display} at ${site.venue.name}.`}
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="flex flex-col border border-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                  {ticket.name}
                </h3>
                <p className="mt-2 font-mono text-2xl font-bold text-accent">
                  {ticket.price}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {ticket.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <TicketWidget eventId={process.env.TICKIT_EVENT_ID ?? "EVENT_ID"} />
          </div>
        </Container>
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

      {/* Final CTA */}
      <section className="bg-primary py-16 text-white sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            Secure your ticket to {site.shortName}
          </h2>
          <p className="max-w-xl text-white/75">
            Four days of Lebanese industry, live demonstrations, and
            conferences. Buying your ticket takes just a few minutes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={site.ctas.visit.href} variant="accent">
              {site.ctas.visit.label}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
