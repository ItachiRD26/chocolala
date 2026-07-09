"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import {
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { SITE_INFO, whatsappLink } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations("footer");
  const tHero = useTranslations("hero");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const isCatalog = pathname.endsWith("/products");

  const links = [
    { href: "/", label: tNav("home") },
    { href: "/products", label: tNav("products") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ] as const;

  const socials = [
    { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
    { href: SITE_INFO.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE_INFO.facebook, label: "Facebook", Icon: FacebookIcon },
  ] as const;

  return (
    <footer
      className={`relative overflow-hidden border-t-2 border-chocolala-orange/40 bg-[#100502] text-chocolala-cream ${
        isCatalog ? "hidden md:block" : ""
      }`}
    >
      {/* Warm glows */}
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-chocolala-orange/7 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-chocolala-orange/5 blur-3xl" />

      {/* ── Slogan banner ──────────────────────────────────────────── */}
      <div className="relative border-b border-chocolala-cream/8 px-6 py-14 text-center">
        <p className="font-serif text-3xl italic leading-snug text-chocolala-orange sm:text-4xl lg:text-5xl">
          &ldquo;{tHero("slogan")}&rdquo;
        </p>
        <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-chocolala-cream/25">
          Cacao Artesanal · Altamira, Puerto Plata · República Dominicana
        </p>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-8 lg:gap-16">

          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-1">
            <Logo variant="white" className="h-14 w-auto" />
            <p className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-chocolala-cream/50">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-chocolala-orange/60" />
              {t("address")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-chocolala-orange">
              {t("linksTitle")}
            </h3>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit font-sans text-sm text-chocolala-cream/60 transition-colors hover:text-chocolala-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-chocolala-orange">
              {t("contactTitle")}
            </h3>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 font-sans text-sm text-chocolala-cream/60 transition-colors hover:text-chocolala-orange"
            >
              <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
              {SITE_INFO.phone.cel}
            </a>
            <p className="flex items-center gap-2 font-sans text-sm text-chocolala-cream/60">
              <PhoneIcon className="h-3.5 w-3.5 shrink-0 opacity-0" />
              {SITE_INFO.phone.fijo}
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-chocolala-orange">
              {t("followTitle")}
            </h3>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-3 font-sans text-sm text-chocolala-cream/60 transition-colors hover:text-chocolala-orange"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chocolala-cream/8 transition-colors group-hover:bg-chocolala-orange/20">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────────────────── */}
      <div className="border-t border-chocolala-cream/8 px-6 py-5 text-center font-sans text-xs text-chocolala-cream/30">
        © {year} Chocolala RD. {t("rights")}
      </div>
    </footer>
  );
}
