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
    // Marca
    "chocolala", "chocolala altamira", "chocolala puerto plata", "chocolala rd",
    // Chocolate — ES (términos amplios y específicos)
    "chocolate artesanal", "chocolate artesanal dominicano", "chocolate artesanal altamira",
    "chocolate en puerto plata", "chocolate rd", "chocolate en república dominicana",
    "chocolate bean to bar república dominicana", "tableta chocolate 70% cacao",
    "fábrica de chocolate artesanal", "chocolate artesanal puerto plata",
    "comprar chocolate artesanal", "chocolate dominicano",
    // Cacao & productos — ES
    "cacao dominicano", "cacao orgánico dominicano", "manteca de cacao natural",
    "vinos artesanales de cacao", "bolas de cacao", "snacks de cacao",
    "productos de cacao natural", "derivados del cacao", "licor de cacao",
    // Tours — ES
    "tour de cacao república dominicana", "tour chocolate altamira",
    "tour cacao puerto plata", "tour finca de cacao dominicana",
    "tours para niños puerto plata", "tours familiares puerto plata",
    "tour para niños altamira", "actividades para niños puerto plata",
    "experiencia cacao dominicano", "recorrido cacao artesanal",
    "turismo comunitario altamira", "turismo comunitario dominicano",
    "tour agroturismo cacao", "excursión chocolate puerto plata",
    "excursiones en puerto plata", "cosas que hacer en puerto plata",
    "tour de chocolate república dominicana",
    // Ubicación
    "altamira puerto plata", "las lajas altamira", "las lajas puerto plata",
    // EN — tourists, families & cruises
    "Dominican artisan chocolate", "artisan chocolate Dominican Republic",
    "chocolate tour Puerto Plata", "cacao farm tour Dominican Republic",
    "chocolate experience Dominican Republic", "cacao tour Altamira",
    "cruise excursion chocolate Puerto Plata", "Dominican cacao products",
    "bean to bar Dominican Republic", "cacao wine Dominican Republic",
    "kids cacao tour Dominican Republic", "family tour Puerto Plata",
    "things to do in Puerto Plata", "chocolate rd Dominican Republic",
    "artisan chocolate factory Dominican Republic",
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
