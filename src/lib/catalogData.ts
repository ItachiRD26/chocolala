import {
  categories as seedCategories,
  products as seedProducts,
  tours as seedTours,
} from "../../scripts/seed-data";
import type { Category, Product, Tour } from "@/types";

// Catalogo inicial servido de forma estatica (sin Firebase) para que el sitio
// publico nunca dependa de la disponibilidad de Firestore. Las fotos viven en
// /public/catalog. Esta es la misma informacion con la que se siembra
// Firestore (ver scripts/seed-data.ts) - si el admin algun dia debe poder
// editar el catalogo en vivo, estos hooks pueden apuntar a Firestore de nuevo.

const DIACRITICS = new RegExp(String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f), "");
const DIACRITICS_PATTERN = new RegExp("[" + DIACRITICS.source + "]", "g");

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(DIACRITICS_PATTERN, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "item"
  );
}

export const categories: Category[] = seedCategories.map((category) => ({
  ...category,
  id: category.slug,
}));

export const products: Product[] = seedProducts.map((product, i) => ({
  ...product,
  id: `${slugify(product.name.es)}-${i}`,
  createdAt: 0,
}));

export const tours: Tour[] = seedTours.map((tour, i) => ({
  ...tour,
  id: `${slugify(tour.name.es)}-${i}`,
}));
