import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { SITE_URL } from "@/lib/constants";

const PRODUCTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catálogo Chocolala — Productos de Cacao Artesanal",
  description: "Catálogo completo de productos artesanales de cacao dominicano elaborados en Las Lajas, Altamira.",
  url: `${SITE_URL}/es/products`,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: { "@type": "Product", name: "Chocolate Artesanal 70% Cacao", brand: { "@type": "Brand", name: "Chocolala" }, description: "Tableta bean to bar, elaborada con cacao dominicano seleccionado. Sin aditivos artificiales.", image: `${SITE_URL}/catalog/chocolate/chocolate70-3.webp`, offers: { "@type": "Offer", priceCurrency: "DOP", availability: "https://schema.org/InStock" } },
    },
    {
      "@type": "ListItem", position: 2,
      item: { "@type": "Product", name: "Manteca de Cacao Natural", brand: { "@type": "Brand", name: "Chocolala" }, description: "Extraída de cacao dominicano. 100% natural, sin aditivos. Ideal para piel, cabello y consumo.", image: `${SITE_URL}/catalog/chocolate/manteca-de-cacao-foto-si.webp`, offers: { "@type": "Offer", priceCurrency: "DOP", availability: "https://schema.org/InStock" } },
    },
    {
      "@type": "ListItem", position: 3,
      item: { "@type": "Product", name: "Vinos Artesanales de Cacao", brand: { "@type": "Brand", name: "Chocolala" }, description: "Vinos artesanales elaborados con frutas de la comunidad. Sin alcohol agregado.", offers: { "@type": "Offer", priceCurrency: "DOP", availability: "https://schema.org/InStock" } },
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
    ? "Catálogo de Chocolate Artesanal y Productos de Cacao"
    : "Artisan Chocolate & Cacao Products Catalog";
  const description = isEs
    ? "Chocolates artesanales bean to bar 70% cacao, manteca de cacao natural, vinos artesanales, snacks y productos de cuidado personal. 100% dominicano, elaborado a mano en Las Lajas, Altamira, Puerto Plata."
    : "Bean to bar artisan 70% chocolate bars, natural cacao butter, artisan wines, snacks and personal care products. 100% Dominican, handcrafted in Las Lajas, Altamira, Puerto Plata.";

  return {
    title,
    description,
    keywords: isEs
      ? ["chocolate artesanal 70% cacao", "manteca de cacao dominicana", "vinos artesanales de cacao", "snacks de cacao", "bean to bar dominicano", "chocolate dominicano comprar", "productos naturales de cacao", "chocolala catálogo"]
      : ["Dominican artisan chocolate", "natural cacao butter", "cacao wine Dominican Republic", "bean to bar chocolate DR", "Dominican cacao products", "chocolala catalog"],
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
      images: [
        {
          url: `${SITE_URL}/catalog/chocolate/chocolate70-3.webp`,
          width: 1200,
          height: 800,
          alt: isEs ? "Chocolates artesanales Chocolala — bean to bar 70% cacao" : "Chocolala artisan chocolates — bean to bar 70% cacao",
        },
      ],
    },
  };
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCTS_SCHEMA) }}
      />
      <ProductsClient />
    </>
  );
}
