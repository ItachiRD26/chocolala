import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function StoryPreview() {
  const t = useTranslations("story");

  return (
    <AnimatedSection className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16">
      <div className="relative h-72 overflow-hidden rounded-2xl md:h-96">
        <Image
          src="/catalog/chocolate/IMG_4128.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <span className="font-sans text-sm font-semibold uppercase tracking-wide text-chocolala-orange">
          {t("eyebrow")}
        </span>
        <h2 className="font-serif text-3xl text-chocolala-cream sm:text-4xl">
          {t("title")}
        </h2>
        <p className="font-sans text-base leading-relaxed text-chocolala-cream/80">
          {t("body")}
        </p>
        <Link
          href="/about"
          className="mt-2 font-sans text-sm font-semibold text-chocolala-orange underline-offset-4 transition-colors hover:text-chocolala-cream hover:underline"
        >
          {t("cta")} →
        </Link>
      </div>
    </AnimatedSection>
  );
}
