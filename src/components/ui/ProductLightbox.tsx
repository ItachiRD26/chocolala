"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { XIcon } from "@/components/ui/icons";
import ImageCarousel from "@/components/ui/ImageCarousel";
import type { Product } from "@/types";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductLightbox({ product, onClose }: Props) {
  const locale = useLocale() as "es" | "en";

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  useEffect(() => {
    const val = product ? "hidden" : "";
    document.documentElement.style.overflow = val;
    document.body.style.overflow = val;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-300 flex items-center justify-center bg-black/92 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-4xl flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-white md:text-2xl">
                {product.name[locale]}
              </h2>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
              <ImageCarousel
                images={product.images}
                alt={product.name[locale]}
                className="h-full w-full"
                priority
                fallback={<div className="h-full bg-chocolala-brown-dark" />}
              />
            </div>

            {product.images.length > 1 && (
              <p className="text-center font-sans text-xs text-white/30">
                {product.images.length} fotos · ← →
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
