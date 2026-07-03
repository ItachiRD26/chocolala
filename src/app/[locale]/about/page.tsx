"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  HeartIcon,
  HandshakeIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { staggerContainer, staggerItem } from "@/lib/motionVariants";

const VALUE_ICONS = [ShieldIcon, HandshakeIcon, UsersIcon, HeartIcon, ShieldIcon, UsersIcon];

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <HistorySection />
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
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-72 overflow-hidden md:h-full"
      >
        <Image
          src="/catalog/chocolate/CHOCOLATE70-DIFERENTES VIEWS (3).webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-chocolala-brown/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
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

function MissionVisionSection() {
  const tMission = useTranslations("about.mission");
  const tVision = useTranslations("about.vision");

  return (
    <div className="grid min-h-[50vh] md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
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
  const values = t.raw("values") as string[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
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
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {values.map((value, i) => {
          const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
          return (
            <motion.div
              key={value}
              variants={staggerItem}
              className="flex flex-col items-center gap-3 rounded-xl bg-chocolala-brown-light px-5 py-8 text-center transition-transform hover:-translate-y-1"
            >
              <span className="rounded-full bg-chocolala-cream/10 p-3 text-chocolala-orange">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-sans text-sm font-semibold text-chocolala-cream">
                {value}
              </span>
            </motion.div>
          );
        })}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-44 flex-col items-center gap-3"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-full border border-dashed border-chocolala-orange/30"
                />
                <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg ring-2 ring-chocolala-orange/20">
                  <Image
                    src={`/images/${member.image}.webp`}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                    style={{ objectPosition: "50% 20%" }}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-base text-chocolala-cream">
                  {member.name}
                </p>
                <p className="font-sans text-xs text-chocolala-orange/80">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
