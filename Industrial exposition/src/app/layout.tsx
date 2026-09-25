import type { Metadata } from "next";
import {
  Bungee,
  Cairo,
  Geist_Mono,
  Montserrat,
  Oswald,
  Russo_One,
  Squada_One,
  Unica_One,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FontPicker from "@/components/FontPicker";
import { site } from "@/lib/content";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

const unicaOne = Unica_One({
  variable: "--font-unica-one",
  subsets: ["latin"],
  weight: "400",
});

const squadaOne = Squada_One({
  variable: "--font-squada-one",
  subsets: ["latin"],
  weight: "400",
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lebanonindustrialexpo.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.dates.display}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Lebanon industrial exhibition",
    "Association of Lebanese Industrialists",
    "trade show Lebanon",
    "manufacturing Lebanon",
    "Beirut exhibition",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.dates.display}`,
    description: site.description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.dates.display}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${oswald.variable} ${cairo.variable} ${unicaOne.variable} ${squadaOne.variable} ${bungee.variable} ${russoOne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === "development" && <FontPicker />}
      </body>
    </html>
  );
}
