import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import QuickViewModal from "@/components/QuickViewModal";
import SearchBar from "@/components/SearchBar";
import Providers from "@/components/providers/Providers";
import { siteConfig, siteImages } from "@/data/site";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

// Font self-hosted (file di app/fonts) — dioptimalkan otomatis oleh next/font, tanpa request ke Google.
const playfair = localFont({
  src: [
    { path: "./fonts/PlayfairDisplay-Variable.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/PlayfairDisplay-Italic-Variable.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: [{ path: "./fonts/Inter-Variable.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [{ url: siteImages.og, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [siteImages.og],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F6F2",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-[3px] bg-ink px-4 py-3 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Lewati ke konten utama
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="min-h-[60svh]">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchBar />
          <QuickViewModal />
        </Providers>
      </body>
    </html>
  );
}
