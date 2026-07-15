import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/layout/WhatsAppFloatingButton";
import IntroLoader from "@/components/ui/IntroLoader";

const OG_IMAGE = "/catalog/chocolate/chocolate70-3.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://chocolala.do"),
  title: {
    default: "Chocolala — Chocolate Artesanal Dominicano",
    template: "%s | Chocolala",
  },
  description:
    "Fábrica de chocolate artesanal en Las Lajas, Altamira, Puerto Plata. Tabletas, vinos de cacao, productos naturales y tours guiados del cacao dominicano.",
  keywords: [
    "chocolate artesanal dominicano",
    "cacao dominicano",
    "tours de cacao",
    "chocolala",
    "altamira puerto plata",
    "fábrica de chocolate",
    "chocolate republica dominicana",
    "artisan chocolate dominican republic",
  ],
  authors: [{ name: "Chocolala" }],
  creator: "Chocolala",
  publisher: "Chocolala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Chocolala",
    title: "Chocolala — Chocolate Artesanal Dominicano",
    description:
      "Fábrica de chocolate artesanal en Las Lajas, Altamira, Puerto Plata. Tabletas, vinos de cacao y tours guiados.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tableta de chocolate artesanal 70% cacao — Chocolala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chocolala — Chocolate Artesanal Dominicano",
    description:
      "Fábrica de chocolate artesanal en Las Lajas, Altamira, Puerto Plata. Tabletas, vinos de cacao y tours guiados.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <IntroLoader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </NextIntlClientProvider>
  );
}
