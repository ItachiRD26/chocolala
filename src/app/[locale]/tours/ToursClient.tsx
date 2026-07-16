"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PlayIcon } from "@/components/ui/icons";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useCatalogTours } from "@/hooks/useCatalogData";
import { whatsappLink } from "@/lib/constants";
import type { Tour } from "@/types";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

export default function ToursPage() {
  const t = useTranslations("tours");
  const locale = useLocale() as "es" | "en";
  const { tours, loading } = useCatalogTours();

  return (
    <div className="bg-chocolala-brown text-chocolala-cream">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-[60vh] items-end overflow-hidden bg-chocolala-brown-dark pb-16 pt-32">
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
        <div className="absolute inset-0 bg-linear-to-t from-chocolala-brown-dark via-chocolala-brown-dark/65 to-chocolala-brown-dark/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.35em] text-chocolala-orange"
          >
            Chocolala · Altamira, Puerto Plata
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
            className="mt-4 max-w-xl font-sans text-base leading-relaxed text-chocolala-cream/65"
          >
            {t("heroSubtitle")}
          </motion.p>
        </div>
      </div>

      {/* ── Editorial tour sections ───────────────────────────────────── */}
      {loading ? (
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-chocolala-cream/5" />
          ))}
        </div>
      ) : (
        <div>
          {tours.map((tour, index) => (
            <TourSection
              key={tour.id}
              tour={tour}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      )}

      {/* ── Política de reservas ─────────────────────────────────────── */}
      <PolicySection />
    </div>
  );
}

function TourSection({
  tour,
  index,
  locale,
}: {
  tour: Tour;
  index: number;
  locale: "es" | "en";
}) {
  const t = useTranslations("tours");
  const price = tour.price?.[locale];
  const isEven = index % 2 === 0;
  const hasVirtualTour = tour.virtualTourVideoUrls !== undefined;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        className={`border-t border-chocolala-cream/8 ${index === 0 ? "border-t-0" : ""}`}
      >
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
          {/* Image side — 55% */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-72 w-full shrink-0 overflow-hidden md:h-auto md:w-[55%]"
          >
            <ImageCarousel
              images={tour.images}
              alt={tour.name[locale]}
              className="h-full w-full min-h-100"
              fallback={
                <div className="flex h-full items-center justify-center bg-chocolala-brown-dark text-chocolala-cream/20">
                  <span className="font-serif text-2xl">{tour.name[locale]}</span>
                </div>
              }
            />
          </motion.div>

          {/* Content side — 45% */}
          <motion.div
            initial={{ x: isEven ? 40 : -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col justify-center gap-6 bg-chocolala-brown-light px-8 py-14 md:w-[45%] md:px-14 md:py-20"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-chocolala-orange">
                {tour.duration}
              </span>
              {price && (
                <span className="rounded-full border border-chocolala-cream/20 px-3 py-1 font-sans text-xs font-semibold text-chocolala-cream/75">
                  {price}
                </span>
              )}
              {tour.ageRange && (
                <span className="rounded-full bg-chocolala-orange/15 px-3 py-1 font-sans text-xs font-semibold text-chocolala-orange">
                  {tour.ageRange}
                </span>
              )}
            </div>

            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-cream/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-chocolala-cream sm:text-4xl lg:text-5xl">
                {tour.name[locale]}
              </h2>
            </div>

            <div className="h-px w-10 bg-chocolala-orange/50" />

            <p className="font-sans text-sm leading-relaxed text-chocolala-cream/65 sm:text-base">
              {tour.description[locale]}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={whatsappLink(t("inquiryMessage", { tour: tour.name[locale] }))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-chocolala-orange px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-chocolala-orange/85"
              >
                {t("bookWhatsapp")}
              </a>

              {hasVirtualTour && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-chocolala-cream/25 px-6 py-3 font-sans text-sm font-semibold text-chocolala-cream/80 transition-colors hover:border-chocolala-cream/50 hover:text-chocolala-cream"
                >
                  <PlayIcon className="h-4 w-4" />
                  {t("virtualTour.buttonLabel")}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {hasVirtualTour && (
        <VideoModal
          videos={tour.virtualTourVideoUrls ?? []}
          tourName={tour.name[locale]}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

function VideoModal({
  videos,
  tourName,
  isOpen,
  onClose,
}: {
  videos: string[];
  tourName: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("tours.virtualTour");
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (isOpen) setCurrent(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((i) => Math.min(i + 1, videos.length - 1));
      if (e.key === "ArrowLeft") setCurrent((i) => Math.max(i - 1, 0));
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, videos.length]);

  const prev = () => setCurrent((i) => Math.max(i - 1, 0));
  const next = () => setCurrent((i) => Math.min(i + 1, videos.length - 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-chocolala-brown-dark p-6"
          >
            {/* Header — siempre visible */}
            <div className="mb-5 flex shrink-0 items-start justify-between gap-4">
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-chocolala-orange">
                  {tourName}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-chocolala-cream">
                  {t("title")}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-chocolala-cream/20 text-chocolala-cream/50 transition-colors hover:border-chocolala-cream/50 hover:text-chocolala-cream"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content — ocupa el espacio restante sin desbordarse */}
            {videos.length > 0 ? (
              <div
                className="flex min-h-0 flex-1 flex-col"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {/* Video centrado, se adapta a cualquier orientación */}
                <div className="relative flex min-h-0 flex-1 items-center justify-center">
                  <video
                    key={current}
                    src={videos[current]}
                    controls
                    playsInline
                    preload="metadata"
                    className="block max-w-full rounded-xl bg-black"
                    style={{ width: "auto", height: "auto", maxHeight: "calc(92vh - 160px)" }}
                  />

                  {/* Arrows — solo si hay más de un video */}
                  {videos.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        disabled={current === 0}
                        aria-label="Video anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-opacity disabled:opacity-20 hover:bg-black/80"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        onClick={next}
                        disabled={current === videos.length - 1}
                        aria-label="Video siguiente"
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-opacity disabled:opacity-20 hover:bg-black/80"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Dots — siempre visibles debajo del video */}
                {videos.length > 1 && (
                  <div className="mt-4 flex shrink-0 justify-center gap-2">
                    {videos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Video ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === current
                            ? "w-6 bg-chocolala-orange"
                            : "w-1.5 bg-chocolala-cream/25 hover:bg-chocolala-cream/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-chocolala-cream/20 bg-chocolala-brown">
                  <PlayIcon className="h-7 w-7 translate-x-0.5 text-chocolala-cream/30" />
                </div>
                <p className="font-sans text-sm text-chocolala-cream/45">
                  {t("comingSoon")}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PolicySection() {
  const t = useTranslations("tours");

  return (
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
                <li
                  key={line}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65"
                >
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
                <li
                  key={line}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65"
                >
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
                <li
                  key={line}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed text-chocolala-cream/65"
                >
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
  );
}
