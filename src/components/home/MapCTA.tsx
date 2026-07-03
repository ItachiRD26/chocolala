import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE_INFO, whatsappLink } from "@/lib/constants";

export default function MapCTA() {
  const t = useTranslations("mapCta");

  return (
    <AnimatedSection className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 overflow-hidden rounded-2xl bg-chocolala-brown-light text-chocolala-cream md:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-4 p-10">
          <span className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="font-sans text-base text-chocolala-cream/80">
            {t("body")}
          </p>
          <p className="font-sans text-sm text-chocolala-cream/70">
            {SITE_INFO.address}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-chocolala-orange px-6 py-3 text-center font-sans text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t("cta")}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-chocolala-cream/40 px-6 py-3 text-center font-sans text-sm font-semibold text-chocolala-cream transition-colors hover:border-chocolala-cream hover:bg-chocolala-cream/10"
            >
              {t("whatsapp")}
            </a>
          </div>
        </div>

        <iframe
          title="Chocolala — Fábrica de Chocolate"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.2654604998597!2d-70.84150101930314!3d19.701319184715462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb194e010131fd7%3A0x8ba19724ece81944!2sCHOCOLALA%20-%20F%C3%A1brica%20de%20Chocolate!5e0!3m2!1ses-419!2sdo!4v1782791507469!5m2!1ses-419!2sdo"
          className="h-72 w-full border-0 md:h-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </AnimatedSection>
  );
}
