import type { MetadataRoute } from "next";
import { exhibitors } from "@/lib/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lebanonindustrialexpo.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/exhibitors",
    "/program",
    "/venue",
    "/sponsors",
    "/contact",
    "/register",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const exhibitorRoutes = exhibitors.map((exhibitor) => ({
    url: `${siteUrl}/exhibitors/${exhibitor.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...exhibitorRoutes];
}
