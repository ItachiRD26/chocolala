"use client";

import { useLocale, useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/constants";
import { CacaoPodIcon, MugIcon, SnackIcon, WineGlassIcon } from "@/components/ui/icons";
import ImageCarousel from "@/components/ui/ImageCarousel";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

const CATEGORY_ICONS: Record<string, typeof CacaoPodIcon> = {
  cacao: CacaoPodIcon,
  "chocolate-caliente": MugIcon,
  snacks: SnackIcon,
  vinos: WineGlassIcon,
};

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("products");
  const CategoryIcon = CATEGORY_ICONS[product.category] ?? CacaoPodIcon;
  const price = product.price?.[locale];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-chocolala-brown-light shadow-sm transition-shadow hover:shadow-lg">
      <ImageCarousel
        images={product.images}
        alt={product.name[locale]}
        className="aspect-square w-full bg-chocolala-brown-light/60"
        fallback={
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-linear-to-br from-chocolala-brown-light via-chocolala-brown to-chocolala-brown-light text-chocolala-cream/30">
            <CategoryIcon className="h-12 w-12" />
            <span className="font-serif text-xs">Chocolala</span>
          </div>
        }
      />

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-chocolala-cream">
            {product.name[locale]}
          </h3>
          {price && (
            <span className="shrink-0 rounded-full bg-chocolala-cream/10 px-3 py-1 font-sans text-xs font-semibold text-chocolala-cream">
              {price}
            </span>
          )}
        </div>
        <p className="line-clamp-2 flex-1 font-sans text-sm text-chocolala-cream/70">
          {product.description[locale]}
        </p>
        <a
          href={whatsappLink(
            product.whatsappMessage?.[locale] ?? t("inquiryMessage", { product: product.name[locale] }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-chocolala-orange px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-chocolala-orange/90"
        >
          {t("inquireWhatsapp")}
        </a>
      </div>
    </div>
  );
}
