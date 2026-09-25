import siteData from "@/content/site.json";
import exhibitorsData from "@/content/exhibitors.json";
import sponsorsData from "@/content/sponsors.json";
import scheduleData from "@/content/schedule.json";
import ticketsData from "@/content/tickets.json";

export type SiteContent = typeof siteData;

export type Exhibitor = {
  id: string;
  name: string;
  category: string;
  boothNumber: string;
  hall: string;
  country: string;
  logo: string;
  summary: string;
  description: string;
  products: string[];
  founded: number;
  employees: string;
  website: string;
  email: string;
  phone: string;
  tags: string[];
};

export type SponsorTier = "platinum" | "gold" | "silver";

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  logo: string;
  website: string;
  description: string;
};

export type ScheduleEvent = {
  time: string;
  endTime: string;
  title: string;
  location: string;
  track: string;
  description: string;
};

export type ScheduleDay = {
  date: string;
  label: string;
  dayName: string;
  theme: string;
  events: ScheduleEvent[];
};

export type Ticket = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export const site: SiteContent = siteData;
export const exhibitors: Exhibitor[] = exhibitorsData as Exhibitor[];
export const sponsors: Sponsor[] = sponsorsData as Sponsor[];
export const schedule: ScheduleDay[] = scheduleData as ScheduleDay[];
export const tickets: Ticket[] = ticketsData as Ticket[];

export const sponsorTierOrder: SponsorTier[] = ["platinum", "gold", "silver"];

export const sponsorTierLabels: Record<SponsorTier, string> = {
  platinum: "Platinum Sponsors",
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
};

export function getExhibitorById(id: string): Exhibitor | undefined {
  return exhibitors.find((exhibitor) => exhibitor.id === id);
}

export function getExhibitorCategories(): string[] {
  return Array.from(new Set(exhibitors.map((exhibitor) => exhibitor.category))).sort();
}

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.tier === tier);
}

