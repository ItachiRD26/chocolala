"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

const GALLERY_IMAGES = [
  "/catalog/chocolate/CHOCOLATE70 (1).webp",
  "/catalog/chocolate/CHOCOLATE70-DIFERENTES VIEWS (1).webp",
  "/catalog/chocolate/CHOCOLATE BLANCO CON SABOR A NARANJA (1).webp",
  "/catalog/chocolate/CHOCOLATE DE TAZA O MESA (1).webp",
  "/catalog/chocolate/MANTECA DE CACAO (1).webp",
  "/catalog/chocolate/LABIAL DE CACAO (1).webp",
];

export default function GallerySection() {
  const t = useTranslations("gallery");

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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              variants={staggerItem}
              className={`relative aspect-square overflow-hidden rounded-xl ${
                i === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
