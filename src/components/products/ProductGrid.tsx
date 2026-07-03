"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/products/ProductCard";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  loading: boolean;
};

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const t = useTranslations("products");

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-2xl bg-chocolala-cream/5"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="py-16 text-center font-sans text-chocolala-cream/60">
        {t("empty")}
      </p>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={staggerItem}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
