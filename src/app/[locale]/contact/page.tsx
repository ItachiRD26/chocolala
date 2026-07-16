import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs ? "Contacto — Visítanos en Altamira" : "Contact — Visit Us in Altamira";
  const description = isEs
    ? "Contáctanos por WhatsApp al 809-863-8887, visítanos en Las Lajas, Altamira, Puerto Plata o escríbenos en Instagram y Facebook @chocolalard. Abiertos todos los días 8am–5pm."
    : "Contact us via WhatsApp at 809-863-8887, visit us in Las Lajas, Altamira, Puerto Plata or reach us on Instagram and Facebook @chocolalard. Open daily 8am–5pm.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        es: `${SITE_URL}/es/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/es/contact`,
      },
    },
    openGraph: {
      title: `${title} | Chocolala`,
      description,
      url: `${SITE_URL}/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
