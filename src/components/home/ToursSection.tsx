"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CompassIcon } from "@/components/ui/icons";
import { useCatalogTours } from "@/hooks/useCatalogData";
import { whatsappLink } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

const BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

export default function ToursSection() {
  const t = useTranslations("tours");
  const locale = useLocale() as "es" | "en";
  const { tours, loading } = useCatalogTours();

  if (!loading && tours.length === 0) return null;

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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-chocolala-cream/5"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {tours.map((tour) => {
              const price = tour.price?.[locale];
              return (
                <motion.div
                  key={tour.id}
                  variants={staggerItem}
                  className="group/card flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light text-chocolala-cream"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    {tour.images[0] ? (
                      <Image
                        src={tour.images[0]}
                        alt={tour.name[locale]}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                        placeholder="blur"
                        blurDataURL={BLUR}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-chocolala-brown text-chocolala-cream/20">
                        <CompassIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-chocolala-orange">
                        {tour.duration}
                      </span>
                      {price && (
                        <span className="shrink-0 rounded-full bg-chocolala-cream/10 px-3 py-1 font-sans text-xs font-semibold text-chocolala-cream">
                          {price}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl">{tour.name[locale]}</h3>
                    <p className="line-clamp-3 flex-1 font-sans text-sm text-chocolala-cream/70">
                      {tour.description[locale]}
                    </p>
                    <a
                      href={whatsappLink(
                        t("inquiryMessage", { tour: tour.name[locale] }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-chocolala-orange px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-chocolala-orange/90"
                    >
                      {t("bookWhatsapp")}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-full border border-chocolala-cream/25 px-8 py-3 font-sans text-sm font-semibold text-chocolala-cream transition-colors hover:border-chocolala-orange hover:text-chocolala-orange"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
