import { useMemo } from "react";
import { categories, products, tours } from "@/lib/catalogData";

// Hooks publicos del catalogo: leen datos estaticos empaquetados con el
// sitio (ver src/lib/catalogData.ts), sin llamar a Firestore. Esto garantiza
// que el catalogo siempre se vea, incluso si el navegador del visitante
// bloquea Firebase (ad-blockers, redes restringidas, etc).
//
// El panel admin sigue usando Firestore (ver hooks/useProducts.ts,
// hooks/useTours.ts, hooks/useCategories.ts) para gestionar contenido.

export function useCatalogCategories() {
  return { categories, loading: false };
}

export function useCatalogProducts(onlyActive = true) {
  const filtered = useMemo(() => {
    const list = onlyActive ? products.filter((p) => p.active) : products;
    return [...list].sort((a, b) => a.order - b.order);
  }, [onlyActive]);

  return { products: filtered, loading: false };
}

export function useCatalogFeaturedProducts() {
  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active && p.featured)
      .sort((a, b) => a.order - b.order);
  }, []);

  return { products: filtered, loading: false };
}

export function useCatalogTours(onlyActive = true) {
  const filtered = useMemo(() => {
    const list = onlyActive ? tours.filter((t) => t.active) : tours;
    return [...list].sort((a, b) => a.order - b.order);
  }, [onlyActive]);

  return { tours: filtered, loading: false };
}
