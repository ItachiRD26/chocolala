import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StoryPreview from "@/components/home/StoryPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ToursSection from "@/components/home/ToursSection";
import GallerySection from "@/components/home/GallerySection";
import MapCTA from "@/components/home/MapCTA";
import { SITE_URL } from "@/lib/constants";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "FoodEstablishment", "TouristAttraction"],
      "@id": `${SITE_URL}/#organization`,
      name: "Chocolala",
      alternateName: [
        "Chocolala Altamira",
        "Fábrica de Chocolate Artesanal Chocolala",
        "Chocolala - Chocolate Artesanal Dominicano",
      ],
      description:
        "Fábrica de chocolate artesanal dominicano en Las Lajas, Altamira, Puerto Plata. Liderada por mujeres de la comunidad. Chocolates bean to bar 70%, manteca de cacao, vinos artesanales y tours guiados de cacao.",
      url: SITE_URL,
      telephone: "+18098638887",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Las Lajas, Altamira, carretera principal palmar grande",
        addressLocality: "Altamira",
        addressRegion: "Puerto Plata",
        addressCountry: "DO",
        postalCode: "57000",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "19.6597",
        longitude: "-70.8344",
      },
      image: [
        `${SITE_URL}/catalog/chocolate/chocolate70-3.webp`,
        `${SITE_URL}/catalog/tours/img-7545.webp`,
      ],
      logo: `${SITE_URL}/images/logo-chocolala-nofondo.webp`,
      sameAs: [
        "https://www.instagram.com/chocolalard",
        "https://www.facebook.com/chocolalard",
      ],
      priceRange: "RD$500 – RD$2,000",
      currenciesAccepted: "DOP, USD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      servesCuisine: ["Dominican", "Chocolate", "Cacao"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Chocolates, Productos de Cacao y Tours",
        itemListElement: [
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Chocolate Artesanal 70% Cacao" } },
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Manteca de Cacao Natural" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tour Sabor y Tradición" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tour Choco Exploradores" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Chocolala",
      description: "Chocolate artesanal dominicano y tours de cacao en Altamira, Puerto Plata",
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
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
