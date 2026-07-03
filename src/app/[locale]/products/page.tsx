"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCatalogProducts,
  useCatalogCategories,
} from "@/hooks/useCatalogData";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ToursSection from "@/components/home/ToursSection";
import {
  CacaoPodIcon,
  MugIcon,
  SnackIcon,
  WineGlassIcon,
  HeartIcon,
  HandshakeIcon,
} from "@/components/ui/icons";
import { whatsappLink } from "@/lib/constants";
import type { Category, Product } from "@/types";

const CATEGORY_ICONS: Record<string, typeof CacaoPodIcon> = {
  chocolate: MugIcon,
  cacao: CacaoPodIcon,
  snacks: SnackIcon,
  "cuidado-personal": HeartIcon,
  "apoyo-comunitario": HandshakeIcon,
  vinos: WineGlassIcon,
};

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale() as "es" | "en";
  const { products } = useCatalogProducts();
  const { categories } = useCatalogCategories();

  const mainCategories = categories.filter((c) => c.slug !== "vinos");
  const vinosCategory = categories.find((c) => c.slug === "vinos");
  const descriptions = t.raw("categoryDescriptions") as Record<string, string>;

  return (
    <div>
      <div className="relative overflow-hidden bg-chocolala-brown-dark px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-chocolala-orange/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-chocolala-orange/8 blur-3xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange"
        >
          Chocolala RD
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl text-chocolala-cream sm:text-7xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-md font-sans text-base text-chocolala-cream/60"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      {mainCategories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category.slug,
        );
        if (categoryProducts.length === 0) return null;
        const Icon = CATEGORY_ICONS[category.slug] ?? CacaoPodIcon;

        return (
          <section key={category.id} id={category.slug}>
            <ChapterHeader
              category={category}
              locale={locale}
              description={descriptions[category.slug] ?? ""}
              Icon={Icon}
            />
            {categoryProducts.map((product, i) => (
              <EditorialProduct
                key={product.id}
                product={product}
                locale={locale}
                reverse={i % 2 !== 0}
                t={t}
              />
            ))}
          </section>
        );
      })}

      <div id="tours" className="border-t border-chocolala-cream/10">
        <ToursSection />
      </div>

      {vinosCategory && (() => {
        const vinosProducts = products.filter(
          (p) => p.category === vinosCategory.slug,
        );
        if (vinosProducts.length === 0) return null;
        return (
          <section id="vinos" className="border-t border-chocolala-cream/10 py-20">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-10 flex flex-col gap-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-cream/40">
                  {t("secondaryLabel")}
                </span>
                <h2 className="font-serif text-3xl text-chocolala-cream">
                  {vinosCategory.name[locale]}
                </h2>
                <p className="font-serif text-base italic text-chocolala-cream/50">
                  {t("vinosSlogan")}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {vinosProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light"
                  >
                    <ImageCarousel
                      images={product.images}
                      alt={product.name[locale]}
                      className="aspect-4/3 w-full"
                      fallback={
                        <div className="flex h-full items-center justify-center bg-chocolala-brown text-chocolala-cream/20">
                          <WineGlassIcon className="h-12 w-12" />
                        </div>
                      }
                    />
                    <div className="flex flex-col gap-3 p-5">
                      <h3 className="font-serif text-xl text-chocolala-cream">
                        {product.name[locale]}
                      </h3>
                      <p className="font-sans text-sm text-chocolala-cream/70">
                        {product.description[locale]}
                      </p>
                      <a
                        href={whatsappLink(
                          t("inquiryMessage", { product: product.name[locale] }),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex w-fit items-center rounded-full bg-chocolala-orange px-4 py-2 font-sans text-sm font-semibold text-white hover:bg-chocolala-orange/90"
                      >
                        {t("inquireWhatsapp")}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}

function ChapterHeader({
  category,
  locale,
  description,
  Icon,
}: {
  category: Category;
  locale: "es" | "en";
  description: string;
  Icon: typeof CacaoPodIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-chocolala-brown-dark py-20 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chocolala-orange/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-chocolala-cream/5 text-chocolala-orange">
          <Icon className="h-7 w-7" />
        </span>
        <h2 className="font-serif text-4xl text-chocolala-cream sm:text-5xl">
          {category.name[locale]}
        </h2>
        <p className="font-serif text-base italic text-chocolala-cream/60">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function EditorialProduct({
  product,
  locale,
  reverse,
  t,
}: {
  product: Product;
  locale: "es" | "en";
  reverse: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const price = product.price?.[locale];
  const Icon = CATEGORY_ICONS[product.category] ?? CacaoPodIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex min-h-[70vh] flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="relative h-[50vh] w-full overflow-hidden md:h-auto md:w-[55%]">
        <ImageCarousel
          images={product.images}
          alt={product.name[locale]}
          className="h-full w-full"
          fallback={
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-chocolala-brown-light text-chocolala-cream/20">
              <Icon className="h-16 w-16" />
            </div>
          }
        />
      </div>

      <div
        className={`flex w-full flex-col justify-center gap-6 px-8 py-12 md:w-[45%] md:px-14 ${
          reverse ? "md:items-start" : "md:items-start"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <h2 className="font-serif text-4xl leading-tight text-chocolala-cream sm:text-5xl">
            {product.name[locale]}
          </h2>
          <p className="max-w-sm font-sans text-base leading-relaxed text-chocolala-cream/70">
            {product.description[locale]}
          </p>
          {price && (
            <span className="w-fit rounded-full bg-chocolala-brown-light px-4 py-2 font-sans text-sm font-semibold text-chocolala-orange">
              {price}
            </span>
          )}
          <a
            href={whatsappLink(
              t("inquiryMessage", { product: product.name[locale] }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-chocolala-orange px-7 py-3.5 font-sans text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {t("inquireWhatsapp")}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
