"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { SITE_INFO, whatsappLink } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      <ContactHero t={t} />
      <ContactChannels t={t} />
      <ContactMap t={t} />
    </div>
  );
}

function ContactHero({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden text-chocolala-cream">
      <Image
        src="/catalog/chocolate/IMG_4240.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-chocolala-brown-dark/80" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-7 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl leading-none text-chocolala-cream sm:text-7xl lg:text-8xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm font-sans text-base text-chocolala-cream/70"
        >
          {t("subtitle")}
        </motion.p>

        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          className="mt-2 inline-flex items-center gap-3 rounded-full bg-chocolala-orange px-9 py-4 font-sans text-base font-semibold text-white shadow-lg shadow-chocolala-orange/25"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t("whatsappCta")}
        </motion.a>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-chocolala-brown to-transparent"
      />
    </section>
  );
}

function ContactChannels({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-4xl px-6 py-20"
    >
      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-6 border-b border-chocolala-cream/10 pb-14 md:flex-row md:items-start md:gap-20"
      >
        <div className="flex shrink-0 items-center gap-4 md:w-52">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-chocolala-brown-light text-chocolala-orange">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl text-chocolala-cream">{t("phoneLabel")}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-sm text-chocolala-cream/40">{t("phoneBody")}</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-fit font-serif text-2xl text-chocolala-cream transition-colors hover:text-chocolala-orange sm:text-4xl"
          >
            {SITE_INFO.phone.cel}
          </a>
          <span className="font-serif text-xl text-chocolala-cream/30 sm:text-2xl">{SITE_INFO.phone.fijo}</span>
        </div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-6 border-b border-chocolala-cream/10 py-14 md:flex-row md:items-start md:gap-20"
      >
        <div className="flex shrink-0 items-center gap-4 md:w-52">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-chocolala-brown-light text-chocolala-orange">
            <InstagramIcon className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl text-chocolala-cream">{t("socialLabel")}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-sm text-chocolala-cream/40">{t("socialBody")}</p>
          <div className="mt-3 flex flex-col gap-3">
            <a
              href={SITE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 font-serif text-2xl text-chocolala-cream transition-colors hover:text-chocolala-orange sm:text-3xl"
            >
              <InstagramIcon className="h-5 w-5 shrink-0 text-chocolala-orange/70" />
              @chocolalard
            </a>
            <a
              href={SITE_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 font-serif text-2xl text-chocolala-cream transition-colors hover:text-chocolala-orange sm:text-3xl"
            >
              <FacebookIcon className="h-5 w-5 shrink-0 text-chocolala-orange/70" />
              Chocolala rd
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-6 pt-14 md:flex-row md:items-start md:gap-20"
      >
        <div className="flex shrink-0 items-center gap-4 md:w-52">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-chocolala-brown-light text-chocolala-orange">
            <PinIcon className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl text-chocolala-cream">{t("addressLabel")}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-sm text-chocolala-cream/40">{t("addressBody")}</p>
          <a
            href={SITE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-chocolala-orange/40 px-6 py-3 font-sans text-sm font-semibold text-chocolala-orange transition-colors hover:bg-chocolala-orange hover:text-white"
          >
            {t("openMaps")} →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactMap({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section>
      <div className="bg-chocolala-brown-dark px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 font-sans text-sm font-semibold uppercase tracking-widest text-chocolala-orange"
        >
          {t("findUs")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl text-chocolala-cream sm:text-5xl"
        >
          Altamira, Puerto Plata
        </motion.h2>
      </div>

      <iframe
        title="Chocolala — Fábrica de Chocolate"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.2654604998597!2d-70.84150101930314!3d19.701319184715462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb194e010131fd7%3A0x8ba19724ece81944!2sCHOCOLALA%20-%20F%C3%A1brica%20de%20Chocolate!5e0!3m2!1ses-419!2sdo!4v1782791507469!5m2!1ses-419!2sdo"
        className="h-125 w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
}
