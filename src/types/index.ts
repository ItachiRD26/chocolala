export type LocalizedText = {
  es: string;
  en: string;
};

export type Product = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  category: string;
  images: string[];
  price?: LocalizedText;
  whatsappMessage?: LocalizedText;
  featured: boolean;
  active: boolean;
  order: number;
  createdAt: number;
};

export type Tour = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  duration: string;
  ageRange?: string;
  images: string[];
  price?: LocalizedText;
  active: boolean;
  order: number;
};

export type Category = {
  id: string;
  name: LocalizedText;
  slug: string;
  order: number;
};

export type SiteSettings = {
  whatsapp: string;
  instagram: string;
  facebook: string;
  address: string;
  googleMapsUrl: string;
  phone: {
    cel: string;
    fijo: string;
  };
};
