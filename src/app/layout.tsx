import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteSettings } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteSettings.companyName} | ${siteSettings.tagline}`,
    template: `%s | ${siteSettings.companyName}`,
  },
  description: siteSettings.description,
  openGraph: {
    type: "website",
    siteName: siteSettings.companyName,
    title: `${siteSettings.companyName} | ${siteSettings.tagline}`,
    description: siteSettings.description,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.companyName} | ${siteSettings.tagline}`,
    description: siteSettings.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
