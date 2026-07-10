"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CompassIcon } from "@/components/ui/icons";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useCatalogTours } from "@/hooks/useCatalogData";
import { whatsappLink } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

export default function ToursPage() {
  const t = useTranslations("tours");
  const locale = useLocale() as "es" | "en";
  const { tours, loading } = useCatalogTours();

  return (
    <div className="bg-chocolala-brown text-chocolala-cream">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-[55vh] items-end overflow-hidden bg-chocolala-brown-dark pb-16 pt-32">
        <Image
          src="/catalog/tours/img-7524.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL={BLUR}
        />
        <div className="absolute inset-0 bg-linear-to-t from-chocolala-brown-dark via-chocolala-brown-dark/70 to-chocolala-brown-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.35em] text-chocolala-orange"
          >
            Chocolala RD · Altamira, Puerto Plata
          </motion.p>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl leading-tight text-chocolala-cream sm:text-6xl lg:text-7xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-lg font-sans text-base leading-relaxed text-chocolala-cream/65"
          >
            {t("heroSubtitle")}
          </motion.p>
        </div>
      </div>

      {/* ── Tour cards ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-chocolala-cream/5" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {tours.map((tour) => {
              const price = tour.price?.[locale];
              return (
                <motion.div
                  key={tour.id}
                  variants={staggerItem}
                  className="flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light"
                >
                  <ImageCarousel
                    images={tour.images}
                    alt={tour.name[locale]}
                    className="aspect-[4/3] w-full"
                    fallback={
                      <div className="flex h-full items-center justify-center bg-chocolala-brown text-chocolala-cream/20">
                        <CompassIcon className="h-14 w-14" />
                      </div>
                    }
                  />

                  <div className="flex flex-1 flex-col gap-4 p-6">
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
                    <h2 className="font-serif text-2xl text-chocolala-cream">{tour.name[locale]}</h2>
                    <p className="flex-1 font-sans text-sm leading-relaxed text-chocolala-cream/70">
                      {tour.description[locale]}
                    </p>
                    <a
                      href={whatsappLink(t("inquiryMessage", { tour: tour.name[locale] }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-chocolala-orange px-5 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-chocolala-orange/90"
                    >
                      {t("bookWhatsapp")}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* ── Política de reservas ─────────────────────────────────────── */}
      <section className="border-t border-chocolala-cream/8 bg-chocolala-brown-dark">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl px-6 py-20"
        >
          <h2 className="mb-10 font-serif text-3xl text-chocolala-cream sm:text-4xl">
            {t("policy.title")}
          </h2>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.reservations.title")}
              </p>
              <ul className="flex flex-col gap-3">
                {(t.raw("policy.reservations.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/60" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.modifications.title")}
              </p>
              <ul className="flex flex-col gap-3">
                {(t.raw("policy.modifications.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/60" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
                {t("policy.payment.title")}
              </p>
              <ul className="flex flex-col gap-3">
                {(t.raw("policy.payment.lines") as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-chocolala-orange/60" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-chocolala-cream/10 pt-8">
            <p className="font-serif text-lg italic text-chocolala-cream/55">
              {t("policy.deposit")}
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
