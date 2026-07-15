"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CacaoPodIcon, MugIcon, SnackIcon, WineGlassIcon } from "@/components/ui/icons";
import { useCatalogFeaturedProducts } from "@/hooks/useCatalogData";
import { whatsappLink } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";
import type { Product } from "@/types";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

const CATEGORY_ICONS: Record<string, typeof CacaoPodIcon> = {
  cacao: CacaoPodIcon,
  "chocolate-caliente": MugIcon,
  snacks: SnackIcon,
  vinos: WineGlassIcon,
};

export default function FeaturedProducts() {
  const t = useTranslations("featured");
  const locale = useLocale() as "es" | "en";
  const { products, loading } = useCatalogFeaturedProducts();

  if (!loading && products.length === 0) return null;

  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif text-3xl text-chocolala-cream sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl bg-chocolala-cream/5"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <FeaturedProductCard product={product} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-chocolala-cream/40 px-8 py-3 font-sans text-sm font-semibold text-chocolala-cream transition-colors hover:border-chocolala-cream hover:bg-chocolala-cream hover:text-chocolala-brown"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

function FeaturedProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: "es" | "en";
}) {
  const t = useTranslations("products");
  const CategoryIcon = CATEGORY_ICONS[product.category] ?? CacaoPodIcon;
  const price = product.price?.[locale];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light shadow-sm transition-shadow hover:shadow-lg">
      <Link
        href="/products"
        className="group/img relative block aspect-square w-full overflow-hidden bg-chocolala-brown-light/60"
        tabIndex={-1}
      >
        {product.images[0] ? (
          <>
            <Image
              src={product.images[0]}
              alt={product.name[locale]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={BLUR}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-chocolala-brown-dark/55 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
              <span className="rounded-full bg-chocolala-cream px-5 py-2 font-sans text-sm font-semibold text-chocolala-brown">
                {t("viewMore")}
              </span>
            </span>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-linear-to-br from-chocolala-brown-light via-chocolala-brown to-chocolala-brown-light text-chocolala-cream/30">
            <CategoryIcon className="h-12 w-12" />
            <span className="font-serif text-xs">Chocolala</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-chocolala-cream">
            {product.name[locale]}
          </h3>
          {price && (
            <span className="shrink-0 rounded-full bg-chocolala-cream/10 px-3 py-1 font-sans text-xs font-semibold text-chocolala-cream">
              {price}
            </span>
          )}
        </div>
        <p className="line-clamp-2 flex-1 font-sans text-sm text-chocolala-cream/70">
          {product.description[locale]}
        </p>
        <a
          href={whatsappLink(
            product.whatsappMessage?.[locale] ??
              t("inquiryMessage", { product: product.name[locale] }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-chocolala-orange px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-chocolala-orange/90"
        >
          {t("inquireWhatsapp")}
        </a>
      </div>
    </div>
  );
}
