"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/products/ProductCard";
import { useCatalogFeaturedProducts } from "@/hooks/useCatalogData";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

export default function FeaturedProducts() {
  const t = useTranslations("featured");
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
                <ProductCard product={product} />
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
