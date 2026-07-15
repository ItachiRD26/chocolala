import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StoryPreview from "@/components/home/StoryPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ToursSection from "@/components/home/ToursSection";
import GallerySection from "@/components/home/GallerySection";
import MapCTA from "@/components/home/MapCTA";
import { SITE_URL } from "@/lib/constants";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Chocolala",
  alternateName: "Chocolala - Fábrica de Chocolate",
  description:
    "Fábrica de chocolate artesanal dominicano en Las Lajas, Altamira, Puerto Plata. Chocolates, vinos de cacao, productos naturales y tours guiados.",
  url: SITE_URL,
  telephone: "+18098638887",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Las Lajas, Altamira, carretera principal palmar grande",
    addressLocality: "Puerto Plata",
    addressRegion: "Puerto Plata",
    addressCountry: "DO",
  },
  image: `${SITE_URL}/catalog/chocolate/chocolate70-3.webp`,
  logo: `${SITE_URL}/images/logo-chocolala-nofondo.webp`,
  sameAs: [
    "https://instagram.com/chocolalard",
    "https://facebook.com/chocolalard",
  ],
  priceRange: "RD$",
  currenciesAccepted: "DOP, USD",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Chocolala — Chocolate Artesanal Dominicano | Altamira, Puerto Plata"
    : "Chocolala — Dominican Artisan Chocolate | Altamira, Puerto Plata";
  const description = isEs
    ? "Fábrica de chocolate artesanal en Las Lajas, Altamira. Tabletas 70%, vinos de cacao, manteca, snacks y tours guiados desde RD$500. Poca espuma, mucho chocolate."
    : "Artisan chocolate factory in Las Lajas, Altamira. 70% chocolate bars, cacao wines, butter, snacks and guided cacao tours from US$9. Pure Dominican cacao.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      locale: isEs ? "es_DO" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_DO",
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <HeroSection />
      <StoryPreview />
      <ToursSection />
      <FeaturedProducts />
      <GallerySection />
      <MapCTA />
    </>
  );
}
