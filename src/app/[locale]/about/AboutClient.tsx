"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

const GALLERY_IMAGES = [
  "/catalog/tours/img-7553.webp",
  "/catalog/tours/img-7529.webp",
  "/catalog/tours/img-7580.webp",
  "/catalog/tours/img-7582.webp",
  "/catalog/tours/img-7585.webp",
  "/catalog/tours/img-7586.webp",
  "/catalog/tours/img-7534.webp",
  "/catalog/tours/img-7539.webp",
];

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <HistorySection />
      <AboutGallery />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
}

function AboutHero() {
  const t = useTranslations("about");

  return (
    <div className="relative overflow-hidden bg-chocolala-brown-dark px-6 py-28 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-chocolala-orange/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-chocolala-orange/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange"
        >
          Chocolala
        </motion.p>
        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl leading-tight text-chocolala-cream sm:text-6xl"
        >
          {t("title")}
        </motion.h1>
      </div>
    </div>
  );
}

function HistorySection() {
  const t = useTranslations("about.history");

  return (
    <div className="grid min-h-[60vh] items-center gap-0 md:grid-cols-2">
      <motion.div
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-72 overflow-hidden md:h-full"
      >
        <Image
          src="/catalog/tours/img-7545.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR}
        />
        <div className="absolute inset-0 bg-chocolala-brown/20" />
      </motion.div>

      <motion.div
        initial={{ x: 40 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start gap-5 px-8 py-16 md:px-14"
      >
        <span className="font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange">
          {t("eyebrow")}
        </span>
        <h2 className="font-serif text-4xl leading-tight text-chocolala-cream sm:text-5xl">
          {t("title")}
        </h2>
        <div className="h-px w-12 bg-chocolala-orange" />
        <p className="font-sans text-base leading-relaxed text-chocolala-cream/75">
          {t("body")}
        </p>
      </motion.div>
    </div>
  );
}

function AboutGallery() {
  const t = useTranslations("about.gallery");

  return (
    <section className="bg-chocolala-brown py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-serif text-4xl text-chocolala-cream sm:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Mobile: uniform 2-col grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {GALLERY_IMAGES.slice(0, 6).map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" placeholder="blur" blurDataURL={BLUR} />
            </div>
          ))}
        </div>

        {/* Desktop: mosaic grid */}
        <div
          className="hidden gap-3 md:grid"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 220px)",
          }}
        >
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-xl"
              style={{
                gridColumn: i === 0 ? "span 2" : i === 7 ? "span 2" : undefined,
                gridRow: i === 0 ? "span 2" : undefined,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const tMission = useTranslations("about.mission");
  const tVision = useTranslations("about.vision");

  return (
    <div className="grid min-h-[50vh] md:grid-cols-2">
      <motion.div
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center gap-5 bg-chocolala-brown-light px-10 py-16"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
          {tMission("title")}
        </span>
        <p className="font-serif text-xl leading-relaxed text-chocolala-cream/90 sm:text-2xl">
          {tMission("body")}
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center gap-5 bg-chocolala-orange px-10 py-16"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-white/70">
          {tVision("title")}
        </span>
        <p className="font-serif text-xl leading-relaxed text-white sm:text-2xl">
          {tVision("body")}
        </p>
      </motion.div>
    </div>
  );
}

function ValuesSection() {
  const t = useTranslations("about");
  const values = t.raw("values") as { name: string; phrase: string }[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center"
      >
        <span className="mb-3 block font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange">
          {t("valuesTitle")}
        </span>
        <h2 className="font-serif text-4xl text-chocolala-cream sm:text-5xl">
          {t("valuesHeading")}
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col"
      >
        {values.map((value, i) => (
          <motion.div
            key={value.name}
            variants={staggerItem}
            className="group border-t border-chocolala-cream/12 py-6 last:border-b"
          >
            <div className="flex items-baseline gap-5">
              <span className="w-7 shrink-0 font-sans text-xs font-semibold tabular-nums text-chocolala-orange/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="w-44 shrink-0 font-serif text-xl text-chocolala-cream transition-colors group-hover:text-chocolala-orange sm:text-2xl">
                  {value.name}
                </span>
                <span className="font-sans text-sm leading-relaxed text-chocolala-cream/55 sm:text-base">
                  {value.phrase}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function TeamSection() {
  const t = useTranslations("about.team");
  const members = t.raw("members") as { name: string; role: string; image: string }[];

  return (
    <div className="bg-chocolala-brown-dark py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 block font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif text-4xl text-chocolala-cream sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm text-chocolala-cream/60">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex w-[calc(50%-12px)] flex-col gap-4 sm:w-56"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl ring-1 ring-chocolala-orange/20">
                {member.image ? (
                  <>
                    <Image
                      src={`/images/${member.image}.webp`}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "50% 20%" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-chocolala-brown-dark/75 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full items-end justify-center bg-chocolala-brown pb-6">
                    <svg viewBox="0 0 64 80" fill="none" className="h-3/4 w-auto text-chocolala-cream/15" aria-hidden="true">
                      <ellipse cx="32" cy="24" rx="16" ry="18" fill="currentColor" />
                      <path d="M4 76c0-15.464 12.536-28 28-28s28 12.536 28 28" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                {member.name ? (
                  <>
                    <p className="font-serif text-lg leading-tight text-chocolala-cream">
                      {member.name}
                    </p>
                    <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-chocolala-orange/75">
                      {member.role}
                    </p>
                  </>
                ) : (
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-chocolala-cream/25">
                    {member.role}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
