import type { MetadataRoute } from "next";

const BASE = "https://chocolala.do";
const LOCALES = ["es", "en"] as const;
const ROUTES = [
  { path: "",          priority: 1.0, changeFrequency: "weekly"  },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tours",    priority: 0.9, changeFrequency: "monthly" },
  { path: "/about",    priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact",  priority: 0.6, changeFrequency: "yearly"  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) =>
    ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );
}
