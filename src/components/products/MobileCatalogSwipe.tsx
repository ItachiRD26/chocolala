"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "@/components/ui/ImageCarousel";
import Logo from "@/components/ui/Logo";
import {
  XIcon,
  CacaoPodIcon,
  MugIcon,
  SnackIcon,
  WineGlassIcon,
  HeartIcon,
  HandshakeIcon,
  CompassIcon,
} from "@/components/ui/icons";
import { whatsappLink } from "@/lib/constants";
import type { Category, Product, Tour } from "@/types";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAFElEQVR4nGPUEeFiwAZYsIpSVwIAKJIAXI6FZNIAAAAASUVORK5CYII=";

const ICONS: Record<string, typeof CacaoPodIcon> = {
  chocolate: MugIcon,
  cacao: CacaoPodIcon,
  snacks: SnackIcon,
  "cuidado-personal": HeartIcon,
  "apoyo-comunitario": HandshakeIcon,
  vinos: WineGlassIcon,
};

// dvh = dynamic viewport height (adjusts for iOS address bar, supported iOS 15.4+)
// fallback: 100vh for older browsers
const SLIDE_H = "calc(100dvh - 3.5rem)";

type Sheet =
  | { kind: "product"; data: Product }
  | { kind: "tour";    data: Tour };

type Props = {
  products:          Product[];
  categories:        Category[];
  tours:             Tour[];
  locale:            "es" | "en";
  inquireLabel:      string;
  inquiryMessage:    (name: string) => string;
  tourBookLabel:     string;
  tourBookMessage:   (name: string) => string;
};

export default function MobileCatalogSwipe({
  products,
  categories,
  tours,
  locale,
  inquireLabel,
  inquiryMessage,
  tourBookLabel,
  tourBookMessage,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sheet, setSheet] = useState<Sheet | null>(null);

  /* ── lock / restore scroll ────────────────────────────
     Set on both html AND body for maximum iOS Safari compatibility. */
  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
  }, []);
  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";
    document.body.style.overflow = "";
    document.body.style.overscrollBehavior = "";
  }, []);

  /* lock while catalog is mounted so footer is unreachable.
     Guard: component is md:hidden but still mounted on desktop — skip lock there.
     MediaQueryList listener handles resize crossing the breakpoint. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) return;
    lockScroll();
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) unlockScroll();
      else lockScroll();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  const openSheet = (s: Sheet) => {
    setSheet(s);
    /* overflow already locked by catalog mount effect */
  };
  const closeSheet = useCallback(() => setSheet(null), []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeSheet(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [closeSheet]);

  return (
    /* overflow-x-hidden on wrapper prevents w-screen slides from
       causing a page-level horizontal scrollbar                    */
    <div className="relative overflow-x-hidden">

      {/* ── Swipe track ─────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", height: SLIDE_H }}
      >
        {/* Cover */}
        <CoverSlide locale={locale} count={products.length + tours.length} />

        {/* Products */}
        {products.map((p) => (
          <ProductSlide
            key={p.id}
            product={p}
            categories={categories}
            locale={locale}
            label={locale === "es" ? "Ver producto" : "View product"}
            onTap={() => openSheet({ kind: "product", data: p })}
          />
        ))}

        {/* Tours */}
        {tours.map((t) => (
          <TourSlide
            key={t.id}
            tour={t}
            locale={locale}
            label={locale === "es" ? "Reservar tour" : "Book tour"}
            onTap={() => openSheet({ kind: "tour", data: t })}
          />
        ))}
      </div>

      {/* ── Bottom sheet ──────────────────────────────────── */}
      <AnimatePresence>
        {sheet && (
          <>
            {/* Backdrop — NO initial opacity:0 (that leaves an invisible
                touch blocker on iOS). CSS animation handles the fade-in. */}
            <div
              className="fixed inset-0 z-40 bg-black/80"
              style={{ animation: "backdrop-in 180ms ease" }}
              onClick={closeSheet}
            />

            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-chocolala-brown-dark"
              style={{ maxHeight: "92svh" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drag handle — only this area triggers drag-to-close so the
                  inner scroll doesn't fight with the gesture              */}
              <motion.div
                className="flex shrink-0 cursor-grab touch-none select-none flex-col items-center gap-3 pb-2 pt-4 active:cursor-grabbing"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ bottom: 0.5 }}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.y > 60 || velocity.y > 300) closeSheet();
                }}
              >
                <div className="h-1 w-12 rounded-full bg-chocolala-cream/25" />
              </motion.div>

              {/* Close button — outside overflow-hidden so it's never clipped */}
              <button
                type="button"
                aria-label="Cerrar"
                onClick={closeSheet}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-chocolala-cream/12 text-chocolala-cream backdrop-blur-sm"
              >
                <XIcon className="h-4 w-4" />
              </button>

              {/* Content (scrollable) — stops pointer events from leaking to drag */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain"
                onPointerDownCapture={(e) => e.stopPropagation()}
              >
                {sheet.kind === "product" ? (
                  <ProductSheetContent
                    product={sheet.data}
                    categories={categories}
                    locale={locale}
                  />
                ) : (
                  <TourSheetContent tour={sheet.data} locale={locale} />
                )}
              </div>

              {/* Sticky CTA */}
              <div
                className="shrink-0 border-t border-chocolala-cream/8 p-4"
                onPointerDownCapture={(e) => e.stopPropagation()}
              >
                {sheet.kind === "product" ? (
                  <a
                    href={whatsappLink(
                      sheet.data.whatsappMessage?.[locale] ?? inquiryMessage(sheet.data.name[locale]),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-chocolala-orange py-3.5 font-sans text-sm font-semibold text-white active:scale-95"
                  >
                    <WAIcon /> {inquireLabel}
                  </a>
                ) : (
                  <a
                    href={whatsappLink(tourBookMessage(sheet.data.name[locale]))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-chocolala-orange py-3.5 font-sans text-sm font-semibold text-white active:scale-95"
                  >
                    <WAIcon /> {tourBookLabel}
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes backdrop-in { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}

/* ── Cover slide ──────────────────────────────────────────── */
function CoverSlide({ locale, count }: { locale: "es" | "en"; count: number }) {
  return (
    <div
      className="relative flex min-w-full flex-col items-center justify-center overflow-hidden bg-chocolala-brown-dark"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: SLIDE_H }}
    >
      {/* Warm glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chocolala-orange/10 blur-[90px]" />

      {/* Decorative rule */}
      <div className="absolute left-1/2 top-10 h-px w-10 -translate-x-1/2 bg-chocolala-orange/30" />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-10 text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ filter: "drop-shadow(0 0 36px rgba(242,115,76,0.18))" }}>
          <Logo variant="white" className="h-24 w-auto" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.38em] text-chocolala-orange/80">
            Chocolala
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] text-chocolala-cream">
            {locale === "es" ? <>Nuestro<br />Catálogo</> : <>Our<br />Catalog</>}
          </h1>
          <p className="font-sans text-xs text-chocolala-cream/40">
            {count} {locale === "es" ? "productos y experiencias" : "products & experiences"}
          </p>
        </div>
      </motion.div>

      {/* Swipe hint */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-chocolala-cream/35">
          {locale === "es" ? "Desliza para explorar" : "Swipe to explore"}
        </p>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-4 rounded-full bg-chocolala-cream/30"
              animate={{ opacity: [0.3, 1, 0.3], scaleX: [1, 1.4, 1] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.span
            className="ml-0.5 font-sans text-base text-chocolala-cream/35"
            animate={{ x: [0, 6, 0], opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ── Product slide ────────────────────────────────────────── */
function ProductSlide({
  product,
  categories,
  locale,
  label,
  onTap,
}: {
  product: Product;
  categories: Category[];
  locale: "es" | "en";
  label: string;
  onTap: () => void;
}) {
  const hasImg = product.images.length > 0;
  const Icon = ICONS[product.category] ?? CacaoPodIcon;
  const catName = categories.find((c) => c.slug === product.category)?.name[locale] ?? "";

  return (
    <div
      className="relative flex min-w-full flex-col overflow-hidden bg-chocolala-brown"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: SLIDE_H }}
      onClick={onTap}
    >
      {/* Full-bleed image */}
      {hasImg ? (
        <Image
          src={product.images[0]}
          alt={product.name[locale]}
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-chocolala-cream/8">
          <Icon className="h-40 w-40" />
        </div>
      )}

      {/* Uniform overlay so centered text is always readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── CENTERED content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-chocolala-orange">
          {catName}
        </span>
        <h2 className="mt-2 font-serif text-4xl leading-tight text-white">
          {product.name[locale]}
        </h2>
        <p className="mt-3 line-clamp-2 max-w-xs font-sans text-sm leading-relaxed text-white/65">
          {product.description[locale]}
        </p>
        {product.price?.[locale] && (
          <span className="mt-3 rounded-full bg-white/10 px-3 py-1 font-sans text-xs text-white/80">
            {product.price[locale]}
          </span>
        )}
      </div>

      {/* CTA at bottom */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onTap(); }}
          className="flex items-center gap-2 rounded-full bg-chocolala-orange px-7 py-3 font-sans text-sm font-semibold text-white shadow-lg active:scale-95"
        >
          {label} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Tour slide ───────────────────────────────────────────── */
function TourSlide({
  tour,
  locale,
  label,
  onTap,
}: {
  tour: Tour;
  locale: "es" | "en";
  label: string;
  onTap: () => void;
}) {
  const hasImg = tour.images.length > 0;

  return (
    <div
      className="relative flex min-w-full flex-col overflow-hidden bg-chocolala-brown"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: SLIDE_H }}
      onClick={onTap}
    >
      {hasImg ? (
        <Image
          src={tour.images[0]}
          alt={tour.name[locale]}
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-chocolala-brown-light text-chocolala-cream/8">
          <CompassIcon className="h-40 w-40" />
        </div>
      )}

      <div className="absolute inset-0 bg-black/50" />

      {/* CENTERED content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-chocolala-orange">
          {locale === "es" ? "Tours" : "Tours"} · {tour.duration}
        </span>
        <h2 className="mt-2 font-serif text-4xl leading-tight text-white">
          {tour.name[locale]}
        </h2>
        <p className="mt-3 line-clamp-2 max-w-xs font-sans text-sm leading-relaxed text-white/65">
          {tour.description[locale]}
        </p>
        {tour.ageRange && (
          <span className="mt-3 rounded-full bg-white/10 px-3 py-1 font-sans text-xs text-white/80">
            {tour.ageRange}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onTap(); }}
          className="flex items-center gap-2 rounded-full bg-chocolala-orange px-7 py-3 font-sans text-sm font-semibold text-white shadow-lg active:scale-95"
        >
          {label} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Sheet content: Product ───────────────────────────────── */
function ProductSheetContent({
  product,
  categories,
  locale,
}: {
  product: Product;
  categories: Category[];
  locale: "es" | "en";
}) {
  const Icon = ICONS[product.category] ?? CacaoPodIcon;
  return (
    <>
      <div className="aspect-4/3 w-full overflow-hidden rounded-t-3xl">
        <ImageCarousel
          images={product.images}
          alt={product.name[locale]}
          className="h-full w-full"
          priority
          fallback={
            <div className="flex h-full items-center justify-center bg-chocolala-brown-light text-chocolala-cream/15">
              <Icon className="h-20 w-20" />
            </div>
          }
        />
      </div>
      <div className="px-6 py-5">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-chocolala-orange">
          {categories.find((c) => c.slug === product.category)?.name[locale] ?? product.category}
        </span>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-chocolala-cream">
          {product.name[locale]}
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-chocolala-cream/65">
          {product.description[locale]}
        </p>
        {product.price?.[locale] && (
          <span className="mt-4 inline-block rounded-full bg-chocolala-brown-light px-4 py-1.5 font-sans text-sm font-semibold text-chocolala-orange">
            {product.price[locale]}
          </span>
        )}
        {product.images.length > 1 && (
          <p className="mt-4 font-sans text-xs text-chocolala-cream/30">
            {product.images.length} {locale === "es" ? "fotos · desliza" : "photos · swipe"} ← →
          </p>
        )}
      </div>
    </>
  );
}

/* ── Sheet content: Tour ──────────────────────────────────── */
function TourSheetContent({
  tour,
  locale,
}: {
  tour: Tour;
  locale: "es" | "en";
}) {
  return (
    <>
      <div className="aspect-4/3 w-full overflow-hidden rounded-t-3xl">
        <ImageCarousel
          images={tour.images}
          alt={tour.name[locale]}
          className="h-full w-full"
          priority
          fallback={
            <div className="flex h-full items-center justify-center bg-chocolala-brown-light text-chocolala-cream/15">
              <CompassIcon className="h-20 w-20" />
            </div>
          }
        />
      </div>
      <div className="px-6 py-5">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-chocolala-orange">
          {locale === "es" ? "Tours" : "Tours"}
        </span>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-chocolala-cream">
          {tour.name[locale]}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-chocolala-brown-light px-3 py-1 font-sans text-xs text-chocolala-cream/70">
            ⏱ {tour.duration}
          </span>
          {tour.ageRange && (
            <span className="rounded-full bg-chocolala-brown-light px-3 py-1 font-sans text-xs text-chocolala-cream/70">
              👥 {tour.ageRange}
            </span>
          )}
          {tour.price?.[locale] && (
            <span className="rounded-full bg-chocolala-brown-light px-3 py-1 font-sans text-xs font-semibold text-chocolala-orange">
              {tour.price[locale]}
            </span>
          )}
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed text-chocolala-cream/65">
          {tour.description[locale]}
        </p>
        {tour.images.length > 1 && (
          <p className="mt-4 font-sans text-xs text-chocolala-cream/30">
            {tour.images.length} {locale === "es" ? "fotos · desliza" : "photos · swipe"} ← →
          </p>
        )}
      </div>
    </>
  );
}

/* ── WhatsApp icon ────────────────────────────────────────── */
function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.4-2 1.5-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.2.1.4 0 .6-.1.2-.2.3-.3.5l-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.6-.1l.7-.8c.2-.3.4-.2.7-.1l1.6.8c.2.1.4.2.5.3.1.2.1.9-.1 1.6Z" />
    </svg>
  );
}
