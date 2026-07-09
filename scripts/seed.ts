import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { categories, products, tours } from "./seed-data";

config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error(
    "Faltan las variables NEXT_PUBLIC_FIREBASE_* en .env.local. Configura el proyecto de Firebase antes de correr el seed.",
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function clearCollection(name: string) {
  const snapshot = await getDocs(collection(db, name));
  await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
}

async function seed() {
  const email = process.env.SEED_EMAIL;
  const password = process.env.SEED_PASSWORD;
  if (!email || !password) {
    console.error("Agrega SEED_EMAIL y SEED_PASSWORD en .env.local");
    process.exit(1);
  }
  console.log(`Autenticando como ${email}...`);
  await signInWithEmailAndPassword(auth, email, password);

  console.log("Sembrando categorías...");
  for (const category of categories) {
    const ref = doc(collection(db, "categories"), category.slug);
    await setDoc(ref, { ...category, id: ref.id });
  }

  console.log("Limpiando productos y tours existentes...");
  await clearCollection("products");
  await clearCollection("tours");

  console.log("Sembrando productos...");
  for (const product of products) {
    const ref = doc(collection(db, "products"));
    await setDoc(ref, { ...product, id: ref.id, createdAt: Date.now() });
  }

  console.log("Sembrando tours...");
  for (const tour of tours) {
    const ref = doc(collection(db, "tours"));
    await setDoc(ref, { ...tour, id: ref.id });
  }

  console.log(
    `Listo: ${categories.length} categorías, ${products.length} productos, ${tours.length} tours.`,
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error sembrando datos:", err);
  process.exit(1);
});
