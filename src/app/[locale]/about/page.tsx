import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { SITE_URL } from "@/lib/constants";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Chocolala",
  legalName: "Fábrica de Chocolate Artesanal Chocolala S.R.L.",
  description:
    "Empresa liderada por mujeres de la comunidad de Las Lajas, Altamira, Puerto Plata. Elaboramos chocolate artesanal y derivados del cacao con un enfoque comunitario y sostenible.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-chocolala-nofondo.webp`,
  image: `${SITE_URL}/catalog/tours/img-7545.webp`,
  telephone: "+18098638887",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Las Lajas, Altamira, carretera principal palmar grande",
    addressLocality: "Altamira",
    addressRegion: "Puerto Plata",
    addressCountry: "DO",
  },
  foundingLocation: {
    "@type": "Place",
    name: "Las Lajas, Altamira, Puerto Plata, República Dominicana",
  },
  sameAs: [
    "https://www.instagram.com/chocolalard",
    "https://www.facebook.com/chocolalard",
  ],
  knowsAbout: ["Chocolate artesanal", "Cacao dominicano", "Turismo comunitario", "Productos naturales de cacao"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Nuestra Historia — Mujeres que hacen Chocolala"
    : "Our Story — The Women Behind Chocolala";
  const description = isEs
    ? "Chocolala es una empresa artesanal liderada por mujeres de Las Lajas, Altamira, Puerto Plata. Nació para generar oportunidades económicas transformando el cacao dominicano en productos de valor agregado y experiencias de turismo comunitario."
    : "Chocolala is a women-led artisan company from Las Lajas, Altamira, Puerto Plata. Born to create economic opportunities by transforming Dominican cacao into value-added products and community tourism experiences.";

  return {
    title,
    description,
    keywords: isEs
      ? ["mujeres productoras de chocolate dominicano", "fábrica artesanal altamira", "empresa social dominicana cacao", "chocolala historia", "turismo comunitario altamira", "cacao artesanal dominicano mujeres"]
      : ["women-led chocolate factory Dominican Republic", "artisan cacao company Altamira", "community tourism Dominican Republic", "Chocolala story"],
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        es: `${SITE_URL}/es/about`,
        en: `${SITE_URL}/en/about`,
        "x-default": `${SITE_URL}/es/about`,
      },
    },
    openGraph: {
      title: `${title} | Chocolala`,
      description,
      url: `${SITE_URL}/${locale}/about`,
      images: [
        {
          url: `${SITE_URL}/catalog/tours/img-7545.webp`,
          width: 1200,
          height: 800,
          alt: isEs ? "Equipo Chocolala — mujeres productoras de Las Lajas, Altamira" : "Chocolala team — women producers from Las Lajas, Altamira",
        },
      ],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <AboutClient />
    </>
  );
}
