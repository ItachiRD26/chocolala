"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CompassIcon } from "@/components/ui/icons";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useCatalogTours } from "@/hooks/useCatalogData";
import { whatsappLink } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

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
                  className="flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light text-chocolala-cream"
                >
                  <ImageCarousel
                    images={tour.images}
                    alt={tour.name[locale]}
                    className="aspect-[4/3] w-full"
                    fallback={
                      <div className="flex h-full items-center justify-center bg-linear-to-br from-chocolala-brown-light via-chocolala-brown to-chocolala-brown-light text-chocolala-cream/30">
                        <CompassIcon className="h-12 w-12" />
                      </div>
                    }
                  />

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-chocolala-orange">
                        {tour.duration}
                        {tour.ageRange ? ` · ${tour.ageRange}` : ""}
                      </span>
                      {price && (
                        <span className="shrink-0 rounded-full bg-chocolala-cream/10 px-3 py-1 font-sans text-xs font-semibold text-chocolala-cream">
                          {price}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl">{tour.name[locale]}</h3>
                    <p className="flex-1 font-sans text-sm text-chocolala-cream/80">
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

        {/* ── Política de reservas ──────────────────────────────────── */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-14 rounded-2xl border border-chocolala-cream/10 bg-chocolala-brown-light p-8 md:p-10"
        >
          <h3 className="mb-8 font-serif text-2xl text-chocolala-cream">
            {t("policy.title")}
          </h3>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Reservas */}
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.reservations.title")}
              </p>
              <ul className="flex flex-col gap-2">
                {(t.raw("policy.reservations.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-2 font-sans text-sm text-chocolala-cream/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/50" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Modificaciones y cancelaciones */}
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.modifications.title")}
              </p>
              <ul className="flex flex-col gap-2">
                {(t.raw("policy.modifications.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-2 font-sans text-sm text-chocolala-cream/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/50" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formas de pago */}
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.payment.title")}
              </p>
              <ul className="flex flex-col gap-2">
                {(t.raw("policy.payment.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-2 font-sans text-sm text-chocolala-cream/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/50" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-chocolala-cream/10 pt-6">
            <p className="font-serif text-base italic text-chocolala-cream/60">
              {t("policy.deposit")}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
