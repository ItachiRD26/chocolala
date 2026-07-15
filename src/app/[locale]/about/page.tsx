import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs ? "Nuestra Historia" : "Our Story";
  const description = isEs
    ? "Conoce a Chocolala — un grupo de mujeres de Las Lajas, Altamira comprometidas con la calidad del cacao dominicano y la tradición del chocolate artesanal."
    : "Meet Chocolala — a group of women from Las Lajas, Altamira dedicated to the quality of Dominican cacao and the tradition of artisan chocolate.";

  return {
    title,
    description,
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
      images: [{ url: "/catalog/chocolate/chocolate70-diferentes-views-3.webp" }],
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
