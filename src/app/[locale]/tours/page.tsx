import type { Metadata } from "next";
import ToursClient from "./ToursClient";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs ? "Tours de Cacao" : "Cacao Tours";
  const description = isEs
    ? "Vive el cacao dominicano desde adentro. 3 tours guiados en Las Lajas, Altamira: Sabor y Tradición (3h, RD$2,000), Del Árbol a tu Corazón (2h30m) y Sabor en 45 Minutos (RD$500 p/p)."
    : "Experience Dominican cacao from within. 3 guided tours in Las Lajas, Altamira: Flavor & Tradition (3h, US$33), Tree to Heart (2h30m) and Flavor in 45 Minutes (US$9 p/p).";

  return {
    title,
    description,
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
      images: [{ url: "/catalog/tours/img-7524.webp" }],
    },
  };
}

export default function ToursPage() {
  return <ToursClient />;
}
