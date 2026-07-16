import type { Metadata } from "next";
import ToursClient from "./ToursClient";
import { SITE_URL } from "@/lib/constants";

const TOURS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "@id": `${SITE_URL}/es/tours#tours`,
  name: "Tours de Cacao Chocolala — Altamira, Puerto Plata",
  description:
    "Experiencias auténticas de turismo comunitario en la finca y fábrica artesanal de Chocolala. Recorrido por el cacaotal, taller de elaboración de chocolate y degustación de productos artesanales en Las Lajas, Altamira.",
  url: `${SITE_URL}/es/tours`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Las Lajas, Altamira, carretera principal palmar grande",
    addressLocality: "Altamira",
    addressRegion: "Puerto Plata",
    addressCountry: "DO",
  },
  touristType: ["Gastronomy tourism", "Agritourism", "Cultural tourism", "Family tourism"],
  availableLanguage: ["Spanish", "English"],
  offers: [
    {
      "@type": "Offer",
      name: "Sabor y Tradición",
      description: "Tour completo de 3 horas: recorrido eco-sensorial, taller artesanal, almuerzo típico dominicano y degustación.",
      price: "2000",
      priceCurrency: "DOP",
      eligibleQuantity: { "@type": "QuantitativeValue", minValue: 1 },
    },
    {
      "@type": "Offer",
      name: "Del Árbol a tu Corazón",
      description: "Experiencia para cruceristas con bienvenida cultural, recorrido por la plantación, taller de chocolate y degustación de vinos artesanales.",
      priceCurrency: "DOP",
    },
    {
      "@type": "Offer",
      name: "Choco Exploradores",
      description: "Tour rápido de 45 minutos ideal para niños y familias. Vivencia en el cacaotal, cosecha y degustación.",
      price: "500",
      priceCurrency: "DOP",
    },
  ],
  image: `${SITE_URL}/catalog/tours/img-7524.webp`,
  sameAs: [`${SITE_URL}/es/tours`, `${SITE_URL}/en/tours`],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Tours de Cacao en Altamira — Finca y Fábrica Chocolala"
    : "Cacao Tours in Altamira — Chocolala Farm & Factory";
  const description = isEs
    ? "3 tours guiados de cacao en Las Lajas, Altamira, Puerto Plata: Sabor y Tradición (3h, RD$2,000), Del Árbol a tu Corazón (cruceristas) y Choco Exploradores (45 min, RD$500). Recorrido por la finca, taller de chocolate artesanal y degustación."
    : "3 guided cacao tours in Las Lajas, Altamira, Puerto Plata: Flavor & Tradition (3h, US$33), Tree to Heart (cruise visitors) and Choco Explorers (45 min, US$9). Farm tour, artisan chocolate workshop and tasting.";

  return {
    title,
    description,
    keywords: isEs
      ? ["tour de cacao altamira", "tour chocolate puerto plata", "turismo comunitario dominicano", "finca de cacao república dominicana", "taller chocolate artesanal", "excursión cacao puerto plata", "tour agroturismo altamira", "chocolala tours"]
      : ["cacao tour Puerto Plata", "chocolate tour Dominican Republic", "cacao farm tour Altamira", "cruise excursion chocolate Dominican Republic", "artisan chocolate workshop DR", "agritourism Dominican Republic"],
    alternates: {
      canonical: `${SITE_URL}/${locale}/tours`,
      languages: {
        es: `${SITE_URL}/es/tours`,
        en: `${SITE_URL}/en/tours`,
        "x-default": `${SITE_URL}/es/tours`,
      },
    },
    openGraph: {
      title: `${title} | Chocolala`,
      description,
      url: `${SITE_URL}/${locale}/tours`,
      images: [
        {
          url: `${SITE_URL}/catalog/tours/img-7524.webp`,
          width: 1200,
          height: 800,
          alt: isEs ? "Tour de cacao en la finca Chocolala, Altamira" : "Cacao tour at Chocolala farm, Altamira",
        },
      ],
    },
  };
}

export default function ToursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOURS_SCHEMA) }}
      />
      <ToursClient />
    </>
  );
}
