"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-chocolala-brown text-chocolala-cream">
      {/* Mobile: static image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/catalog/chocolate/IMG_4131.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover"
        />
      </div>

      {/* Desktop: video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 bg-chocolala-brown-dark/75" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Logo
            variant="white"
            className="h-28 drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] sm:h-40"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-xl text-chocolala-cream/90 sm:text-2xl"
        >
          {t("slogan")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-4 flex flex-col gap-4 font-sans sm:flex-row"
        >
          <Link
            href="/products"
            className="rounded-full bg-chocolala-orange px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {t("ctaProducts")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-chocolala-cream/40 px-8 py-3 text-sm font-semibold text-chocolala-cream transition-colors hover:border-chocolala-cream hover:bg-chocolala-cream/10"
          >
            {t("ctaTours")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
