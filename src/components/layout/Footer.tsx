import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { SITE_INFO, whatsappLink } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const tHero = useTranslations("hero");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

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
    <footer className="relative overflow-hidden border-t-2 border-chocolala-orange/30 bg-[#1a0a04] text-chocolala-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-chocolala-orange/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-chocolala-orange/8 blur-3xl"
      />

      <AnimatedSection className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-16 pb-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-xs flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <Logo variant="white" className="h-20 w-auto sm:h-24" />
          <p className="font-serif text-base italic text-chocolala-orange/90">
            {tHero("slogan")}
          </p>
          <p className="flex items-start gap-2 font-sans text-sm text-chocolala-cream/70">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0" />
            {t("address")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 sm:gap-x-16">
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
              {t("linksTitle")}
            </h3>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit font-sans text-sm text-chocolala-cream/80 transition-colors hover:text-chocolala-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
              {t("contactTitle")}
            </h3>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 font-sans text-sm text-chocolala-cream/80 transition-colors hover:text-chocolala-orange"
            >
              <PhoneIcon className="h-4 w-4" />
              {SITE_INFO.phone.cel}
            </a>
            <p className="font-sans text-sm text-chocolala-cream/80">
              {SITE_INFO.phone.fijo}
            </p>
          </div>

          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
              {t("followTitle")}
            </h3>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-chocolala-cream/10 text-chocolala-cream transition-colors hover:bg-chocolala-orange hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="relative border-t border-chocolala-cream/10 px-6 py-5 text-center font-sans text-xs text-chocolala-cream/60">
        © {year} Chocolala RD. {t("rights")}
      </div>
    </footer>
  );
}
