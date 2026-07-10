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
          src="/catalog/chocolate/chocolate70-3.webp"
          alt="Tableta de chocolate artesanal 70% cacao Chocolala RD"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII="
        />
      </div>

      {/* Desktop: video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/loader-poster.webp"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/hero-15seg.webm" type="video/webm" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 bg-chocolala-brown-dark/60" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
        <motion.div
          initial={{ scale: 0.88 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Logo
            variant="white"
            className="h-28 drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] sm:h-44 md:h-56 lg:h-64"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-xl text-chocolala-cream/90 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          {t("slogan")}
        </motion.h1>

        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-4 flex flex-col gap-4 font-sans sm:flex-row"
        >
          <Link
            href="/products"
            className="rounded-full bg-chocolala-orange px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 md:px-10 md:py-4 md:text-base"
          >
            {t("ctaProducts")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-chocolala-cream/40 px-8 py-3 text-sm font-semibold text-chocolala-cream transition-colors hover:border-chocolala-cream hover:bg-chocolala-cream/10 md:px-10 md:py-4 md:text-base"
          >
            {t("ctaTours")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
