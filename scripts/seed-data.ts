type LocalizedText = { es: string; en: string };

export type SeedCategory = {
  slug: string;
  name: LocalizedText;
  order: number;
};

export type SeedProduct = {
  name: LocalizedText;
  description: LocalizedText;
  category: string;
  images: string[];
  price?: LocalizedText;
  whatsappMessage?: LocalizedText;
  featured: boolean;
  active: boolean;
  order: number;
};

export type SeedTour = {
  name: LocalizedText;
  description: LocalizedText;
  duration: string;
  ageRange?: string;
  images: string[];
  price?: LocalizedText;
  virtualTourVideoUrls?: string[];
  active: boolean;
  order: number;
};

const c = "/catalog/chocolate/";
const v = "/catalog/vinos/";

export const categories: SeedCategory[] = [
  {
    slug: "chocolate",
    name: { es: "Tabletas de Chocolate", en: "Chocolate Bars" },
    order: 0,
  },
  {
    slug: "cacao",
    name: { es: "Derivados del Cacao", en: "Cacao Derivatives" },
    order: 1,
  },
  {
    slug: "snacks",
    name: { es: "Snacks de Cacao", en: "Cacao Snacks" },
    order: 2,
  },
  {
    slug: "cuidado-personal",
    name: { es: "Cuidado Personal", en: "Personal Care" },
    order: 3,
  },
  {
    slug: "apoyo-comunitario",
    name: { es: "Productos Solidarios", en: "Community Products" },
    order: 4,
  },
  {
    slug: "vinos",
    name: { es: "Vinos Artesanales", en: "Artisanal Wines" },
    order: 5,
  },
];

export const products: SeedProduct[] = [
  // ── TABLETAS DE CHOCOLATE ─────────────────────────────────────────────────
  {
    name: { es: "Chocolate 70% Cacao", en: "70% Cacao Dark Chocolate" },
    description: {
      es: "Elaborado con cacao dominicano tipo hispaniola de sabor profundo y auténtico. Balance perfecto entre el amargo natural del cacao y una sutil dulzura. Suave al paladar y con aroma envolvente. Bean to bar, sin gluten. Presentaciones: con trocitos de café, y natural.",
      en: "Made with Dominican hispaniola-type cacao for a deep, authentic flavor. A perfect balance between the natural bitterness of cacao and a subtle sweetness. Smooth on the palate with an enveloping aroma. Bean to bar, gluten-free. Available with coffee pieces or natural.",
    },
    category: "chocolate",
    images: [
      `${c}chocolate70-1.webp`,
      `${c}chocolate70-2.webp`,
      `${c}chocolate70-3.webp`,
      `${c}chocolate70-4.webp`,
      `${c}chocolate70-5.webp`,
      `${c}chocolate70-6.webp`,
      `${c}chocolate70-diferentes-views-1.webp`,
      `${c}chocolate70-diferentes-views-2.webp`,
      `${c}chocolate70-diferentes-views-3.webp`,
      `${c}chocolate70-diferentes-views-4.webp`,
      `${c}chocolate70-muestras-1.webp`,
      `${c}chocolate70-muestras-2.webp`,
      `${c}chocolate70-muestras-3.webp`,
      `${c}granos-de-cacao.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Chocolate 70% Cacao de Chocolala. ¿Cuáles son las presentaciones disponibles y el precio?",
      en: "Hi! I'm interested in Chocolala's 70% Cacao Dark Chocolate. What sizes are available and what's the price?",
    },
    featured: true,
    active: true,
    order: 0,
  },
  {
    name: {
      es: "Chocolate Blanco con Sabor a Naranja",
      en: "White Chocolate with Orange Flavor",
    },
    description: {
      es: "Elaborado con manteca de cacao de alta calidad proveniente de cacao seleccionado. Proceso semiartesanal siguiendo la filosofía bean to bar. Ofrece una experiencia suave, cremosa y delicadamente dulce con sabor a naranja. También disponible en barra natural.",
      en: "Made with high-quality cocoa butter from selected cacao, following a semi-artisanal bean-to-bar approach. Offers a smooth, creamy, and delicately sweet experience with orange flavor. Also available as a natural bar.",
    },
    category: "chocolate",
    images: [
      `${c}chocolate-blanco-con-sabor-a-naranja-1.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-2.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-3.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-4.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-5.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-muestras-1.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-muestras-2.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-muestras-3.webp`,
      `${c}chocolate-blanco-con-sabor-a-naranja-muestras-4.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Chocolate Blanco con Sabor a Naranja de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's White Chocolate with Orange Flavor. Is it available and what's the price?",
    },
    featured: true,
    active: true,
    order: 1,
  },
  {
    name: {
      es: "Chocolate en Barras para Chocolate de Mesa",
      en: "Traditional Hot Chocolate Bars",
    },
    description: {
      es: "Paquete de 10 tabletas de chocolate elaborado con cacao natural. Aporta a la familia todos los beneficios del cacao. Ideal para compartir en familia al momento del desayuno y la cena.",
      en: "Package of 10 chocolate tablets made with natural cacao. Brings the whole family all the benefits of cacao. Perfect for sharing at breakfast or dinner.",
    },
    category: "chocolate",
    images: [
      `${c}chocolate-de-taza-o-mesa-1.webp`,
      `${c}chocolate-de-taza-o-mesa-2.webp`,
      `${c}chocolate-de-taza-o-mesa-3.webp`,
      `${c}chocolate-de-taza-o-mesa-4.webp`,
      `${c}chocolate-de-taza-o-mesa-5.webp`,
      `${c}chocolate-de-taza-o-mesa-6.webp`,
      `${c}chocolate-de-taza-o-mesa-7.webp`,
      `${c}chocolate-de-taza-o-mesa-8.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Chocolate en Barras para Chocolate de Mesa de Chocolala. ¿Cómo se vende el paquete y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Traditional Hot Chocolate Bars. How is the package sold and what's the price?",
    },
    featured: true,
    active: true,
    order: 2,
  },

  // ── DERIVADOS DEL CACAO ───────────────────────────────────────────────────
  {
    name: { es: "Bolas de Cacao Natural", en: "Natural Cacao Balls" },
    description: {
      es: "Elaboradas con cacao 100%. Ideales para hacer chocolate de textura o sabor fuerte. Ideales para diabéticos.",
      en: "Made with 100% cacao. Perfect for preparing strong-flavored or thick-textured chocolate. Ideal for people with diabetes.",
    },
    category: "cacao",
    images: [
      `${c}cacao-amargo.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesan las Bolas de Cacao Natural de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Natural Cacao Balls. Are they available and what's the price?",
    },
    featured: false,
    active: true,
    order: 0,
  },
  {
    name: { es: "Manteca de Cacao", en: "Cacao Butter" },
    description: {
      es: "Extraída de nuestro cacao con mucho cuidado. Completamente natural, sin nada añadido. Ideal para el cuidado de la piel, peinados y consumo humano.",
      en: "Carefully extracted from our own cacao. Completely natural, nothing added. Ideal for skin care, hair styling, and human consumption.",
    },
    category: "cacao",
    images: [
      `${c}manteca-de-cacao-1.webp`,
      `${c}manteca-de-cacao-2.webp`,
      `${c}manteca-de-cacao-3.webp`,
      `${c}manteca-de-cacao-4.webp`,
      `${c}manteca-de-cacao-5.webp`,
      `${c}manteca-de-cacao-6.webp`,
      `${c}manteca-de-cacao-7.webp`,
      `${c}img-4368.webp`,
      `${c}img-4369.webp`,
      `${c}img-4370.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa la Manteca de Cacao de Chocolala. ¿Qué presentaciones manejan y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Cacao Butter. What sizes do you have and what's the price?",
    },
    featured: true,
    active: true,
    order: 1,
  },

  // ── SNACKS DE CACAO ───────────────────────────────────────────────────────
  {
    name: {
      es: "Granos de Cacao Revestidos con Chocolate — Con Jengibre",
      en: "Chocolate-Covered Cacao Beans — With Ginger",
    },
    description: {
      es: "Elaborados con granos de cacao seleccionado de alta calidad. Producto completamente artesanal para conservar la esencia pura del cacao. Con jengibre añadido. Ideales para diabéticos.",
      en: "Made with high-quality selected cacao beans. Completely artisanal to preserve the pure essence of cacao. With added ginger. Ideal for people with diabetes.",
    },
    category: "snacks",
    images: [
      `${c}granos-de-cacao-revestidos-de-chocolate-con-jenjibre.webp`,
      `${c}ambos-granos-de-cacao.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesan los Granos de Cacao con Jengibre de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Chocolate-Covered Cacao Beans with Ginger. Are they available and what's the price?",
    },
    featured: false,
    active: true,
    order: 0,
  },
  {
    name: {
      es: "Granos de Cacao Revestidos con Chocolate — Sin Jengibre",
      en: "Chocolate-Covered Cacao Beans — Without Ginger",
    },
    description: {
      es: "Elaborados con granos de cacao seleccionado de alta calidad. Producto completamente artesanal para conservar la esencia pura del cacao. Sin jengibre. Ideales para diabéticos.",
      en: "Made with high-quality selected cacao beans. Completely artisanal to preserve the pure essence of cacao. Without ginger. Ideal for people with diabetes.",
    },
    category: "snacks",
    images: [
      `${c}granos-de-cacao-revestidos-de-chocolate-sin-jenjibre.webp`,
      `${c}ambos-granos-de-cacao.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesan los Granos de Cacao sin Jengibre de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Chocolate-Covered Cacao Beans without Ginger. Are they available and what's the price?",
    },
    featured: false,
    active: true,
    order: 1,
  },

  // ── CUIDADO PERSONAL ──────────────────────────────────────────────────────
  {
    name: { es: "Bálsamo para los Labios", en: "Lip Balm" },
    description: {
      es: "Elaborado a partir de nuestra manteca de cacao y cera de abeja. Completamente natural. Ideal para hidratar y proteger los labios.",
      en: "Made from our own cacao butter and beeswax. Completely natural. Ideal for hydrating and protecting your lips.",
    },
    category: "cuidado-personal",
    images: [
      `${c}labial-de-cacao-1.webp`,
      `${c}labial-de-cacao-2.webp`,
      `${c}labial-de-cacao-3.webp`,
      `${c}labial-de-cacao-4.webp`,
      `${c}labial-de-cacao-5.webp`,
      `${c}labial-de-cacao-con-modelo-de-chica-1.webp`,
      `${c}labial-de-cacao-con-modelo-de-chica-2.webp`,
      `${c}labial-de-cacao-con-modelo-de-chica-3.webp`,
      `${c}labial-de-cacao-con-modelo-de-chica-4.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Bálsamo para Labios de cacao de Chocolala. ¿Qué presentaciones tienen y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Cacao Lip Balm. What options do you have and what's the price?",
    },
    featured: true,
    active: true,
    order: 0,
  },

  // ── PRODUCTOS SOLIDARIOS ──────────────────────────────────────────────────
  // Productos que Chocolala comercializa para apoyar a otros grupos de mujeres
  {
    name: { es: "Aceite de Coco", en: "Coconut Oil" },
    description: {
      es: "Aceite de coco natural. Comercializado por Chocolala para apoyar a otros grupos de mujeres emprendedoras de la comunidad.",
      en: "Natural coconut oil. Sold by Chocolala to support other women's entrepreneurial groups in the community.",
    },
    category: "apoyo-comunitario",
    images: [
      `${c}aceite-de-coco-1.webp`,
      `${c}aceite-de-coco-2.webp`,
      `${c}aceite-de-coco-3.webp`,
      `${c}aceite-de-coco-4.webp`,
      `${c}aceite-de-coco-5.webp`,
      `${c}aceite-de-coco-6.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Aceite de Coco de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Coconut Oil. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 0,
  },
  {
    name: { es: "Crema de Cacao", en: "Cacao Cream" },
    description: {
      es: "Crema de cacao natural. Comercializada por Chocolala para apoyar a otros grupos de mujeres emprendedoras de la comunidad.",
      en: "Natural cacao cream. Sold by Chocolala to support other women's entrepreneurial groups in the community.",
    },
    category: "apoyo-comunitario",
    images: [
      `${c}crema-de-cacao-1.webp`,
      `${c}crema-de-cacao-2.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa la Crema de Cacao de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Cacao Cream. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 1,
  },
  {
    name: { es: "Extracto de Vainilla", en: "Vanilla Extract" },
    description: {
      es: "Extracto de vainilla natural artesanal. Comercializado por Chocolala para apoyar a otros grupos de mujeres emprendedoras de la comunidad.",
      en: "Natural artisanal vanilla extract. Sold by Chocolala to support other women's entrepreneurial groups in the community.",
    },
    category: "apoyo-comunitario",
    images: [
      `${c}extracto-de-vainilla-1.webp`,
      `${c}extracto-de-vainilla-2.webp`,
      `${c}extracto-de-vainilla-3.webp`,
      `${c}extracto-de-vainilla-4.webp`,
      `${c}extracto-miel-vinagre-1.webp`,
      `${c}extracto-miel-vinagre-2.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Extracto de Vainilla artesanal de Chocolala. ¿Qué presentaciones tienen y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Vanilla Extract. What sizes do you offer and what's the price?",
    },
    featured: false,
    active: true,
    order: 2,
  },
  {
    name: { es: "Miel de Abeja", en: "Honey" },
    description: {
      es: "Miel de abeja natural. Comercializada por Chocolala para apoyar a otros grupos de mujeres emprendedoras de la comunidad.",
      en: "Natural honey. Sold by Chocolala to support other women's entrepreneurial groups in the community.",
    },
    category: "apoyo-comunitario",
    images: [
      `${c}miel-de-abeja.webp`,
      `${c}miel-1.webp`,
      `${c}miel-2.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa la Miel de Abeja natural de Chocolala. ¿Qué tamaños tienen y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's natural Honey. What sizes do you offer and what's the price?",
    },
    featured: false,
    active: true,
    order: 3,
  },
  {
    name: { es: "Vinagre Natural", en: "Natural Vinegar" },
    description: {
      es: "Vinagre natural artesanal. Comercializado por Chocolala para apoyar a otros grupos de mujeres emprendedoras de la comunidad.",
      en: "Natural artisanal vinegar. Sold by Chocolala to support other women's entrepreneurial groups in the community.",
    },
    category: "apoyo-comunitario",
    images: [
      `${c}vinagre-artesanal-1.webp`,
      `${c}vinagre-artesanal-2.webp`,
      `${c}vinagre-artesanal-3.webp`,
      `${c}vinagre-natural-1.webp`,
      `${c}vinagre-natural-2.webp`,
      `${c}vinagre-natural-3.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vinagre Natural artesanal de Chocolala. ¿Qué presentaciones tienen y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Natural Vinegar. What sizes do you offer and what's the price?",
    },
    featured: false,
    active: true,
    order: 4,
  },

  // ── VINOS ARTESANALES ────────────────────────────────────────────────────
  {
    name: { es: "Sangría Artesanal", en: "Artisanal Sangría" },
    description: {
      es: "Sangría artesanal elaborada con naranja y manzana verde. Hecha con frutas naturales de la propia comunidad. Vino joven, sin alcohol agregado. Un sorbo que conecta tradición, sabor y naturaleza.",
      en: "Artisanal sangría made with orange and green apple. Crafted from fresh fruits grown in our own community. A young wine, no added alcohol. A sip that connects tradition, flavor, and nature.",
    },
    category: "vinos",
    images: [
      `${v}sangria-foto-1.webp`,
      `${v}sangria-foto-2.webp`,
      `${v}sangriaaa.webp`,
      `${v}misma-foto-sangria-chinola.webp`,
      `${v}foto-perfecta-para-un-hero-o-algo-asi-es-un-vino-en-un-columpio.webp`,
      `${v}persona-con-vino-1.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa la Sangría Artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's Artisanal Sangría. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 0,
  },
  {
    name: { es: "Vino de Cacao", en: "Cacao Wine" },
    description: {
      es: "Vino artesanal elaborado con cacao de nuestra comunidad. Frutas naturales frescas, sin alcohol agregado.",
      en: "Artisanal wine made with cacao from our community. Fresh natural fruit, no added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}cacao.webp`,
      `${v}cacao1.webp`,
      `${v}cacao3.webp`,
      `${v}cacaooooo.webp`,
      `${v}personas-con-vinos-1.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Cacao artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Cacao Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 1,
  },
  {
    name: { es: "Vino de Jagua", en: "Jagua Wine" },
    description: {
      es: "Vino artesanal elaborado con jagua fresca de la comunidad. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh jagua from the community. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}jagua.webp`,
      `${v}jaguaaaa.webp`,
      `${v}juguaccerezasangria.webp`,
      `${v}personas-con-vinos-2.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Jagua artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Jagua Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 2,
  },
  {
    name: { es: "Vino de Cereza", en: "Cherry Wine" },
    description: {
      es: "Vino artesanal elaborado con cereza fresca de la comunidad. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh cherry from the community. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}mismafoto-cereza-jagua-sangria.webp`,
      `${v}mismafoto-cereza-jagua-sangria-2.webp`,
      `${v}persona-con-vino-4.webp`,
      `${v}personas-con-vinos-3.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Cereza artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Cherry Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 3,
  },
  {
    name: { es: "Vino de Chinola", en: "Passion Fruit Wine" },
    description: {
      es: "Vino artesanal elaborado con chinola fresca de la comunidad. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh passion fruit (chinola) from the community. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}chinola.webp`,
      `${v}chinola2.webp`,
      `${v}chinolaaa.webp`,
      `${v}personas-con-vinos-4.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Chinola artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Passion Fruit Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 4,
  },
  {
    name: { es: "Vino de Cramberry", en: "Cramberry Wine" },
    description: {
      es: "Vino artesanal elaborado con cranberry fresco. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh cranberry. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}camberry.webp`,
      `${v}camberry2.webp`,
      `${v}cramberry.webp`,
      `${v}personas-con-vinos-5.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Cramberry artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Cramberry Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 5,
  },
  {
    name: { es: "Vino de Pitahaya", en: "Dragon Fruit Wine" },
    description: {
      es: "Vino artesanal elaborado con pitahaya fresca de la comunidad. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh dragon fruit (pitahaya) from the community. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}pitaya.webp`,
      `${v}pitaya2.webp`,
      `${v}pitaya3.webp`,
      `${v}personas-con-vinos-6.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Pitahaya artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Dragon Fruit Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 6,
  },
  {
    name: { es: "Vino de Carambola", en: "Starfruit Wine" },
    description: {
      es: "Vino artesanal elaborado con carambola fresca de la comunidad. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh starfruit (carambola) from the community. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}carambola.webp`,
      `${v}carambola4.webp`,
      `${v}carambola5.webp`,
      `${v}carabolapiyayamismafoto.webp`,
      `${v}personas-con-vinos-7.webp`,
    ],
    whatsappMessage: {
      es: "¡Hola! Me interesa el Vino de Carambola artesanal de Chocolala. ¿Tienen disponibilidad y cuál es el precio?",
      en: "Hi! I'm interested in Chocolala's artisanal Starfruit Wine. Is it available and what's the price?",
    },
    featured: false,
    active: true,
    order: 7,
  },
];

export const tours: SeedTour[] = [
  {
    name: { es: "Sabor y Tradición", en: "Flavor & Tradition" },
    description: {
      es: "Nuestra experiencia completa: bienvenida y presentación del guía, breve historia de Chocolala, recorrido eco-sensorial por la finca con presentación de los árboles frutales (cacao, jagua y más), vivencia en el cacaotal y degustación de la fruta fresca, preparación de chocolate de agua, demostración de producción tradicional (tostado, pelado, pilado, elaboración de bola de cacao, jabón o exfoliante), recorrido por el área de fábrica, elaboración de su propio postre de chocolate, almuerzo típico dominicano, degustación de chocolates y vinos artesanales, y compras en tienda.",
      en: "Our complete experience: welcome and guide introduction, a brief history of Chocolala, an eco-sensory walk through the farm with a presentation of the fruit trees (cacao, jagua, and more), time in the cacao grove with fresh fruit tasting, water-chocolate preparation, a traditional production demonstration (roasting, peeling, grinding, cacao ball making, soap or body scrub), a factory walkthrough, crafting your own chocolate dessert, a traditional Dominican lunch, tasting of chocolates and artisanal wines, and shopping in the store.",
    },
    duration: "3 horas",
    images: [
      "/catalog/tours/img-7565.webp",
      "/catalog/tours/img-7566.webp",
      "/catalog/tours/img-7569.webp",
      "/catalog/tours/img-7572.webp",
      "/catalog/tours/img-7577.webp",
      "/catalog/tours/img-7543.webp",
    ],
    price: { es: "RD$2,000 p/p", en: "US$33 p/p" },
    active: true,
    order: 0,
  },
  {
    name: { es: "Del Árbol a tu Corazón", en: "From Tree to Heart" },
    description: {
      es: "Una experiencia diseñada para cruceristas: bienvenida con salve, décima o música dominicana y una bebida (vino o chocolate de agua con ron), historia de Chocolala y el impacto de sus mujeres productoras, caminata por la plantación con explicación de variedades y cultivo del cacao, cosecha de una mazorca y degustación de la fruta fresca, taller de transformación artesanal (secado, fermentación, descascarillado, molienda), elaboración de tu propia barra de chocolate con los ingredientes que elijas, degustación de vinos artesanales y chocolates, souvenir y tiempo para compras.",
      en: "An experience crafted for cruise visitors: welcome with Dominican music (salve or décima) and a drink (wine or water-chocolate with rum), the story of Chocolala and the impact of its women producers, a plantation walk with explanations of cacao varieties and cultivation, harvesting a cacao pod and tasting the fresh fruit, an artisanal transformation workshop (drying, fermentation, husking, grinding), crafting your own chocolate bar with your choice of ingredients, tasting of artisanal wines and chocolates, a souvenir, and time to shop.",
    },
    duration: "2 horas 30 minutos",
    images: [
      "/catalog/tours/del-arbol-a-tu-corazon-1.webp",
      "/catalog/tours/del-arbol-a-tu-corazon-2.webp",
      "/catalog/tours/del-arbol-a-tu-corazon-3.webp",
      "/catalog/tours/del-arbol-a-tu-corazon-4.webp",
      "/catalog/tours/img-7584.webp",
      "/catalog/tours/img-7587.webp",
      "/catalog/tours/img-7590.webp",
      "/catalog/tours/img-7594.webp",
      "/catalog/tours/img-7599.webp",
      "/catalog/tours/img-7603.webp",
      "/catalog/tours/img-7608.webp",
      "/catalog/tours/img-7611.webp",
    ],
    virtualTourVideoUrls: ["/videos/asi-hacemos-chocolate.webm"],
    active: true,
    order: 1,
  },
  {
    name: { es: "Sabor en 45 Minutos", en: "Flavor in 45 Minutes" },
    description: {
      es: "Una experiencia introductoria y rápida: bienvenida, recorrido por el sendero interpretativo, degustación de la fruta del cacao, muestra de las herramientas tradicionales de producción de chocolate, degustación y presentación de los diferentes productos Chocolala, y oportunidad de compra al finalizar.",
      en: "A quick introductory experience: welcome, an interpretive trail walk, cacao fruit tasting, a display of traditional chocolate production tools, tasting and presentation of the different Chocolala products, and the chance to shop at the end.",
    },
    duration: "45 minutos",
    images: [
      "/catalog/tours/img-7620.webp",
      "/catalog/tours/img-7622.webp",
      "/catalog/tours/img-7626.webp",
      "/catalog/tours/img-7629.webp",
      "/catalog/tours/img-7634.webp",
      "/catalog/tours/img-7637.webp",
      "/catalog/tours/img-7643.webp",
      "/catalog/tours/img-7647.webp",
    ],
    price: { es: "RD$500 p/p", en: "US$9 p/p" },
    active: true,
    order: 2,
  },
  {
    name: { es: "Choco Exploradores", en: "Choco Explorers" },
    description: {
      es: "Descubre el mundo del cacao a través de todos los sentidos. Un recorrido diseñado para familias, grupos y todos los amantes de la aventura. Desde la finca hasta el proceso artesanal, con talleres interactivos, degustaciones y la oportunidad de crear tu propio chocolate. Una experiencia única en la que cada participante se convierte en chocolatero por un día.",
      en: "Discover the world of cacao through all your senses. A journey designed for families, groups, and adventure lovers — from the farm to the artisanal process, with interactive workshops, tastings, and the chance to craft your own chocolate. A one-of-a-kind experience where every participant becomes a chocolatier for a day.",
    },
    duration: "2 horas",
    images: [
      "/catalog/tours/choco-exploradoress.webp",
      "/catalog/tours/img-7524.webp",
      "/catalog/tours/img-7528.webp",
      "/catalog/tours/img-7538.webp",
      "/catalog/tours/img-7541.webp",
      "/catalog/tours/img-7547.webp",
      "/catalog/tours/img-7556.webp",
      "/catalog/tours/img-7561.webp",
      "/catalog/tours/img-7568.webp",
    ],
    price: { es: "RD$1,500 p/p", en: "US$25 p/p" },
    virtualTourVideoUrls: ["/videos/choco-exploradores.webm"],
    active: true,
    order: 3,
  },
];
