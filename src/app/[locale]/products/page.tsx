"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import Image from "next/image";
import {
  useCatalogProducts,
  useCatalogCategories,
  useCatalogTours,
} from "@/hooks/useCatalogData";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ProductLightbox from "@/components/ui/ProductLightbox";
import MobileCatalogSwipe from "@/components/products/MobileCatalogSwipe";
import {
  CacaoPodIcon,
  MugIcon,
  SnackIcon,
  WineGlassIcon,
  HeartIcon,
  HandshakeIcon,
  ExpandIcon,
  CompassIcon,
} from "@/components/ui/icons";
import { whatsappLink } from "@/lib/constants";
import type { Category, Product, Tour } from "@/types";

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
  const { tours } = useCatalogTours();
  const tTours = useTranslations("tours");
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);
  const openLightbox = useCallback((p: Product) => setLightboxProduct(p), []);
  const closeLightbox = useCallback(() => setLightboxProduct(null), []);

  const mainCategories = categories; // all categories including vinos
  const descriptions = t.raw("categoryDescriptions") as Record<string, string>;

  // Pick one image per product (up to 6) for the desktop hero mosaic
  const heroImages = products
    .filter((p) => p.images.length > 0)
    .slice(0, 6)
    .map((p) => p.images[0]);

  const allNavCategories = categories;

  return (
    <div>
      {/* ── Desktop catalog hero ─────────────────────────────────────────── */}
      <div
        className="relative hidden overflow-hidden bg-chocolala-brown-dark md:flex md:items-center"
        style={{ minHeight: "82vh" }}
      >
        {/* Image mosaic — right 58% of the hero */}
        {heroImages.length > 0 && (
          <div
            className="absolute bottom-0 right-0 top-0"
            style={{ left: "38%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: "6px", padding: "6px" }}
          >
            {heroImages.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover transition-transform duration-1200 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Gradient: left opaque → right transparent (so text is readable) */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-chocolala-brown-dark from-30% via-chocolala-brown-dark/95 via-42% to-chocolala-brown-dark/10" />

        {/* Warm glow top-left */}
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-125 w-125 rounded-full bg-chocolala-orange/8 blur-3xl" />

        {/* Editorial content */}
        <div className="relative z-10 flex flex-col px-16 py-20 xl:px-24" style={{ maxWidth: "52%" }}>
          <motion.p
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.35em] text-chocolala-orange"
          >
            Chocolala RD · República Dominicana
          </motion.p>

          <motion.h1
            initial={{ y: 32 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl leading-none text-chocolala-cream xl:text-7xl 2xl:text-8xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xs font-sans text-base leading-relaxed text-chocolala-cream/55"
          >
            {t("subtitle")}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 h-px w-12 origin-left bg-chocolala-orange/40"
          />

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 font-sans text-[10px] uppercase tracking-[0.3em] text-chocolala-cream/25"
          >
            {locale === "es" ? "↓ Desplázate para explorar" : "↓ Scroll to explore"}
          </motion.p>
        </div>
      </div>

      {/* ── MOBILE: full-screen swipe catalog (tours included) ── */}
      <div className="md:hidden">
        <MobileCatalogSwipe
          products={products}
          categories={categories}
          tours={tours}
          locale={locale}
          inquireLabel={t("inquireWhatsapp")}
          inquiryMessage={(name) => t("inquiryMessage", { product: name })}
          tourBookLabel={tTours("bookWhatsapp")}
          tourBookMessage={(name) => tTours("inquiryMessage", { tour: name })}
        />
      </div>

      {/* ── DESKTOP: editorial layout ── */}
      <div className="hidden md:block">
        <ProductLightbox product={lightboxProduct} onClose={closeLightbox} />

        {/* Sticky category nav */}
        <div className="sticky top-28 z-40 border-b border-chocolala-cream/8 bg-chocolala-brown-dark/96 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 overflow-x-auto px-6 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {allNavCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] ?? CacaoPodIcon;
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold text-chocolala-cream/50 transition-all hover:bg-chocolala-orange/15 hover:text-chocolala-cream"
                >
                  <Icon className="h-3.5 w-3.5 text-chocolala-orange" />
                  {cat.name[locale]}
                </a>
              );
            })}
            <a
              href="#tours"
              className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold text-chocolala-cream/50 transition-all hover:bg-chocolala-orange/15 hover:text-chocolala-cream"
            >
              <CompassIcon className="h-3.5 w-3.5 text-chocolala-orange" />
              {locale === "es" ? "Tours" : "Tours"}
            </a>
          </div>
        </div>

        {/* All product categories — editorial layout */}
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
                  onImageClick={() => openLightbox(product)}
                />
              ))}
            </section>
          );
        })}

        {/* Tours — editorial layout */}
        {tours.length > 0 && (
          <section id="tours" className="border-t border-chocolala-cream/10">
            <ChapterHeader
              category={{ id: "tours", slug: "tours", name: { es: "Nuestros Tours", en: "Our Tours" }, order: 99 }}
              locale={locale}
              description={locale === "es" ? "Vive el cacao desde adentro · Altamira, Puerto Plata" : "Experience cacao from within · Altamira, Puerto Plata"}
              Icon={CompassIcon}
            />
            {tours.map((tour, i) => (
              <EditorialTour
                key={tour.id}
                tour={tour}
                locale={locale}
                reverse={i % 2 !== 0}
                tTours={tTours}
              />
            ))}
          </section>
        )}
      </div>
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
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
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

function EditorialTour({
  tour,
  locale,
  reverse,
  tTours,
}: {
  tour: Tour;
  locale: "es" | "en";
  reverse: boolean;
  tTours: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group/editorial flex min-h-[70vh] flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className="relative h-[50vh] w-full overflow-hidden md:h-auto md:w-[55%]">
        <ImageCarousel
          images={tour.images}
          alt={tour.name[locale]}
          className="h-full w-full"
          fallback={
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-chocolala-brown-light text-chocolala-cream/20">
              <CompassIcon className="h-16 w-16" />
            </div>
          }
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-6 px-8 py-12 md:w-[45%] md:px-14">
        <motion.div
          initial={{ x: reverse ? 20 : -20 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-chocolala-brown-light px-3 py-1 font-sans text-xs font-semibold text-chocolala-orange">
              ⏱ {tour.duration}
            </span>
            {tour.ageRange && (
              <span className="rounded-full bg-chocolala-brown-light px-3 py-1 font-sans text-xs text-chocolala-cream/60">
                👥 {tour.ageRange}
              </span>
            )}
            {tour.price?.[locale] && (
              <span className="rounded-full bg-chocolala-orange/15 px-3 py-1 font-sans text-xs font-semibold text-chocolala-orange">
                {tour.price[locale]}
              </span>
            )}
          </div>
          <h2 className="font-serif text-4xl leading-tight text-chocolala-cream sm:text-5xl">
            {tour.name[locale]}
          </h2>
          <p className="max-w-sm font-sans text-base leading-relaxed text-chocolala-cream/70">
            {tour.description[locale]}
          </p>
          <a
            href={whatsappLink(tTours("inquiryMessage", { tour: tour.name[locale] }))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-chocolala-orange px-7 py-3.5 font-sans text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {tTours("bookWhatsapp")}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function EditorialProduct({
  product,
  locale,
  reverse,
  t,
  onImageClick,
}: {
  product: Product;
  locale: "es" | "en";
  reverse: boolean;
  t: ReturnType<typeof useTranslations>;
  onImageClick: () => void;
}) {
  const price = product.price?.[locale];
  const Icon = CATEGORY_ICONS[product.category] ?? CacaoPodIcon;
  const hasImages = product.images.length > 0;

  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group/editorial flex min-h-[70vh] flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className={`relative h-[50vh] w-full overflow-hidden md:h-auto md:w-[55%] ${hasImages ? "cursor-zoom-in" : ""}`}
        onClick={hasImages ? onImageClick : undefined}
      >
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
        {hasImages && (
          <span className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover/editorial:opacity-100">
            <ExpandIcon className="h-4 w-4" />
          </span>
        )}
      </div>

      <div
        className={`flex w-full flex-col justify-center gap-6 px-8 py-12 md:w-[45%] md:px-14 ${
          reverse ? "md:items-start" : "md:items-start"
        }`}
      >
        <motion.div
          initial={{ x: reverse ? 20 : -20 }}
          whileInView={{ x: 0 }}
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
              product.whatsappMessage?.[locale] ?? t("inquiryMessage", { product: product.name[locale] }),
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
