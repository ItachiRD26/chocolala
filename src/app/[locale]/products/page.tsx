import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs ? "Catálogo" : "Catalog";
  const description = isEs
    ? "Chocolates artesanales 70%, vinos de cacao, manteca de cacao, snacks y productos de cuidado personal. 100% dominicano, elaborado en Las Lajas, Altamira, Puerto Plata."
    : "Artisan 70% chocolates, cacao wines, cacao butter, snacks and personal care products. 100% Dominican, made in Las Lajas, Altamira, Puerto Plata.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/products`,
      languages: {
        es: `${SITE_URL}/es/products`,
        en: `${SITE_URL}/en/products`,
        "x-default": `${SITE_URL}/es/products`,
      },
    },
    openGraph: {
      title: `${title} | Chocolala`,
      description,
      url: `${SITE_URL}/${locale}/products`,
      images: [{ url: "/catalog/chocolate/chocolate70-3.webp" }],
    },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
