import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Category, Product, SiteSettings, Tour } from "@/types";

const PRODUCTS = "products";
const TOURS = "tours";
const CATEGORIES = "categories";
const SETTINGS_DOC = "settings/site";

// --- Products ---

export async function getProducts(onlyActive = true): Promise<Product[]> {
  const q = onlyActive
    ? query(
        collection(db, PRODUCTS),
        where("active", "==", true),
        orderBy("order", "asc"),
      )
    : query(collection(db, PRODUCTS), orderBy("order", "asc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS),
    where("active", "==", true),
    where("featured", "==", true),
    orderBy("order", "asc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
}

export async function getProduct(id: string): Promise<Product | null> {
  const ref = doc(db, PRODUCTS, id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Product) : null;
}

export async function saveProduct(
  product: Omit<Product, "id"> & { id?: string },
): Promise<string> {
  const id = product.id ?? doc(collection(db, PRODUCTS)).id;
  await setDoc(doc(db, PRODUCTS, id), { ...product, id }, { merge: true });
  return id;
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS, id));
}

// --- Tours ---

export async function getTours(onlyActive = true): Promise<Tour[]> {
  const q = onlyActive
    ? query(
        collection(db, TOURS),
        where("active", "==", true),
        orderBy("order", "asc"),
      )
    : query(collection(db, TOURS), orderBy("order", "asc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Tour);
}

export async function saveTour(
  tour: Omit<Tour, "id"> & { id?: string },
): Promise<string> {
  const id = tour.id ?? doc(collection(db, TOURS)).id;
  await setDoc(doc(db, TOURS, id), { ...tour, id }, { merge: true });
  return id;
}

export async function deleteTour(id: string): Promise<void> {
  await deleteDoc(doc(db, TOURS, id));
}

// --- Categories ---

export async function getCategories(): Promise<Category[]> {
  const q = query(collection(db, CATEGORIES), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Category);
}

// --- Settings ---

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(doc(db, SETTINGS_DOC));
  return snap.exists() ? (snap.data() as SiteSettings) : null;
}

export async function updateSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<void> {
  await updateDoc(doc(db, SETTINGS_DOC), settings);
}
