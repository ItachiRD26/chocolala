export const SITE_INFO = {
  whatsapp: "18098638887",
  phone: { cel: "809-863-8887", fijo: "809-291-1032" },
  instagram: "https://instagram.com/chocolalard",
  facebook: "https://facebook.com/chocolalard",
  address:
    "Las Lajas Altamira, carretera principal palmar grande, Altamira, Puerto Plata, RD",
  googleMapsUrl: "https://share.google/x6AHoORf2EWjHT90U",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE_INFO.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
