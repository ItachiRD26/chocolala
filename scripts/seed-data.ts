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
      `${c}CHOCOLATE70 (1).webp`,
      `${c}CHOCOLATE70 (2).webp`,
      `${c}CHOCOLATE70 (3).webp`,
      `${c}CHICAS POSANDO CON CHOCOLATE (1).webp`,
      `${c}CHICAS POSANDO CON CHOCOLATE (2).webp`,
      `${c}CHICAS POSANDO CON CHOCOLATE (3).webp`,
      `${c}CHICAS POSANDO CON CHOCOLATE (4).webp`,
      `${c}CHOCOLATE70-DIFERENTES VIEWS (1).webp`,
      `${c}CHOCOLATE70-DIFERENTES VIEWS (2).webp`,
      `${c}CHOCOLATE70-MUESTRAS (1).webp`,
    ],
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
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA (1).webp`,
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA (2).webp`,
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA (3).webp`,
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA-MUESTRAS (1).webp`,
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA-MUESTRAS (2).webp`,
      `${c}CHOCOLATE BLANCO CON SABOR A NARANJA-MUESTRAS (3).webp`,
    ],
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
      `${c}CHOCOLATE DE TAZA O MESA (1).webp`,
      `${c}CHOCOLATE DE TAZA O MESA (2).webp`,
      `${c}CHOCOLATE DE TAZA O MESA (3).webp`,
      `${c}CHOCOLATE DE TAZA O MESA (4).webp`,
      `${c}CHOCOLATE DE TAZA O MESA (5).webp`,
      `${c}CHOCOLATE DE TAZA O MESA (6).webp`,
    ],
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
    images: [], // Imágenes pendientes — el cliente las tomará
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
      `${c}MANTECA DE CACAO (1).webp`,
      `${c}MANTECA DE CACAO (2).webp`,
      `${c}MANTECA DE CACAO (3).webp`,
      `${c}MANTECA DE CACAO (4).webp`,
      `${c}MANTECA DE CACAO (5).webp`,
      `${c}MANTECA DE CACAO (6).webp`,
    ],
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
    images: [], // Imágenes pendientes — el cliente las tomará
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
    images: [], // Imágenes pendientes — el cliente las tomará
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
      `${c}LABIAL DE CACAO (1).webp`,
      `${c}LABIAL DE CACAO (2).webp`,
      `${c}LABIAL DE CACAO (3).webp`,
      `${c}LABIAL DE CACAO-CON MODELO DE CHICA (1).webp`,
      `${c}LABIAL DE CACAO-CON MODELO DE CHICA (2).webp`,
      `${c}LABIAL DE CACAO-CON MODELO DE CHICA (3).webp`,
    ],
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
      `${c}ACEITE DE COCO (1).webp`,
      `${c}ACEITE DE COCO (2).webp`,
      `${c}ACEITE DE COCO (3).webp`,
      `${c}ACEITE DE COCO (4).webp`,
      `${c}ACEITE DE COCO (5).webp`,
      `${c}ACEITE DE COCO (6).webp`,
    ],
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
      `${c}CREMA DE CACAO (1).webp`,
      `${c}CREMA DE CACAO (2).webp`,
    ],
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
      `${c}EXTRACTO DE VAINILLA (1).webp`,
      `${c}EXTRACTO DE VAINILLA (2).webp`,
      `${c}EXTRACTO DE VAINILLA (3).webp`,
      `${c}EXTRACTO DE VAINILLA (4).webp`,
      `${c}EXTRACTO +MIEL+VINAGRE (1).webp`,
      `${c}EXTRACTO +MIEL+VINAGRE (2).webp`,
    ],
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
      `${c}MIEL DE ABEJA.webp`,
      `${c}MIEL  (1).webp`,
      `${c}MIEL  (2).webp`,
    ],
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
      `${c}VINAGRE ARTESANAL (1).webp`,
      `${c}VINAGRE ARTESANAL (2).webp`,
      `${c}VINAGRE ARTESANAL (3).webp`,
      `${c}VINAGRE NATURAL (1).webp`,
      `${c}VINAGRE NATURAL (2).webp`,
      `${c}VINAGRE NATURAL (3).webp`,
    ],
    featured: false,
    active: true,
    order: 4,
  },

  // ── VINOS ARTESANALES ────────────────────────────────────────────────────
  {
    name: { es: "Sangría de Naranja y Manzana Verde", en: "Orange & Green Apple Sangría" },
    description: {
      es: "Sangría artesanal elaborada con naranja y manzana verde. Hecha con frutas naturales de la propia comunidad. Vino joven, sin alcohol agregado. Un sorbo que conecta tradición, sabor y naturaleza.",
      en: "Artisanal sangría made with orange and green apple. Crafted from fresh fruits grown in our own community. A young wine, no added alcohol. A sip that connects tradition, flavor, and nature.",
    },
    category: "vinos",
    images: [
      `${v}SANGRIA FOTO (1).webp`,
      `${v}SANGRIA FOTO (2).webp`,
      `${v}sangriaaa.webp`,
      `${v}MISMA FOTO SANGRIA CHINOLA.webp`,
      `${v}MISMA SANGRIA Y CHINOLA.webp`,
      `${v}sangria y chinola.webp`,
      `${v}FOTO PERFECTA PARA UN HERO O ALGO ASI ES UN VINO EN UN COLUMPIO.webp`,
      `${v}PERSONA CON VINO 1.webp`,
    ],
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
      `${v}CACAO.webp`,
      `${v}CACAO1.webp`,
      `${v}CACAO3.webp`,
      `${v}cacaooooo.webp`,
      `${v}PERSONAS CON VINOS (1).webp`,
      `${v}PERSONAS VINO.webp`,
      `${v}PERSONAS CON VINO.webp`,
    ],
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
      `${v}JAGUA.webp`,
      `${v}jaguaaaa.webp`,
      `${v}juguaccerezasangria.webp`,
      `${v}MISMA FOTO JUGUA CEREZA SANGRIA.webp`,
      `${v}PERSONAS CON VINOS (2).webp`,
      `${v}PERSONAS VINO2.webp`,
    ],
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
      `${v}MISMAFOTO CEREZA JAGUA SANGRIA.webp`,
      `${v}MISMAFOTO CEREZA JAGUA SANGRIA 2.webp`,
      `${v}PERSONA CON VINO 4.webp`,
      `${v}PERSONA VINO.webp`,
      `${v}PERSONAS CON VINOS (3).webp`,
      `${v}PERSONAS VINO (1).webp`,
      `${v}PERSONAS VINO3.webp`,
    ],
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
      `${v}CHINOLA.webp`,
      `${v}CHINOLA2.webp`,
      `${v}chinolaaa.webp`,
      `${v}PERSONAS CON VINOS (4).webp`,
      `${v}PERSONAS VINO (2).webp`,
      `${v}PERSONAS VINO4.webp`,
    ],
    featured: false,
    active: true,
    order: 4,
  },
  {
    name: { es: "Vino de Cranberry", en: "Cranberry Wine" },
    description: {
      es: "Vino artesanal elaborado con cranberry fresco. Sin alcohol agregado.",
      en: "Artisanal wine made with fresh cranberry. No added alcohol.",
    },
    category: "vinos",
    images: [
      `${v}CAMBERRY.webp`,
      `${v}CAMBERRY2.webp`,
      `${v}CRAMBERRY.webp`,
      `${v}PERSONAS CON VINOS (5).webp`,
      `${v}PERSONAS VINO (3).webp`,
      `${v}parejavinos.webp`,
    ],
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
      `${v}PITAYA.webp`,
      `${v}PITAYA2.webp`,
      `${v}PITAYA3.webp`,
      `${v}PERSONAS CON VINOS (6).webp`,
      `${v}PERSONAS VINO (4).webp`,
      `${v}parejavinoss.webp`,
    ],
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
      `${v}CARAMBOLA.webp`,
      `${v}CARAMBOLA4.webp`,
      `${v}CARAMBOLA5.webp`,
      `${v}CARABOLAPIYAYAMISMAFOTO.webp`,
      `${v}CARAMBOLAPITAYAMISMAFOTO2.webp`,
      `${v}PERSONAS CON VINOS (7).webp`,
      `${v}PERSONAS VINO (5).webp`,
      `${v}PERSONAS VINO (6).webp`,
    ],
    featured: false,
    active: true,
    order: 7,
  },
];

export const tours: SeedTour[] = [
  {
    name: { es: "Sabor y Tradición", en: "Flavor & Tradition" },
    description: {
      es: "Nuestro tour completo: la historia de Chocolala, conexión eco-sensorial con la naturaleza, degustación de la fruta del cacao y su proceso de siembra, vivencia y recuerdo en el cacaotal, degustación de chocolate de agua, demostración de producción de chocolate tradicional (tostado, pelado, majado, elaboración de bolas de cacao y jabón artesanal), presentación del proceso de producción en la fábrica, explicación de los beneficios de los productos, almuerzo típico dominicano, degustación de vinos artesanales y compra de productos. Incluye transporte. Mínimo 5 personas, máximo 30 o más.",
      en: "Our complete tour: the story of Chocolala, an eco-sensory connection with nature, tasting the cacao fruit and learning about planting, an experience in the cacao grove, a water-chocolate tasting, a traditional chocolate production demonstration (roasting, peeling, grinding, making cacao balls and artisanal soap), a factory production walkthrough, an explanation of product benefits, a traditional Dominican lunch, an artisanal wine tasting, and the chance to shop. Transportation included. Minimum 5 people, maximum 30 or more.",
    },
    duration: "4 horas",
    images: [
      "/catalog/tours/IMG_7524.webp",
      "/catalog/tours/IMG_7528.webp",
      "/catalog/tours/IMG_7538.webp",
      "/catalog/tours/IMG_7541.webp",
      "/catalog/tours/IMG_7547.webp",
      "/catalog/tours/IMG_7556.webp",
      "/catalog/tours/IMG_7561.webp",
      "/catalog/tours/IMG_7568.webp",
    ],
    price: { es: "RD$1,500 p/p + ITBIS", en: "$15 USD p/p + tax" },
    active: true,
    order: 0,
  },
  {
    name: { es: "Choco Exploradores", en: "Choco Explorers" },
    description: {
      es: "Un taller pensado para los más pequeños: bienvenida con chocolate caliente o frío, entrega de instrumento para el taller, experiencia del cacao a la barra, creación de figuras y decoración (frutos secos, chispas, frutas y cupcakes), recorrido por el sendero con explicación, y conocerán el tostado y la elaboración del chocolate tradicional. Se llevan su cajita feliz. Para niños de 3 a 10 años; incluye un adulto acompañante (acompañante extra: RD$300 / $3 USD).",
      en: "A workshop designed for the little ones: a hot or cold chocolate welcome, workshop tools provided, a bean-to-bar experience, creating and decorating chocolate figures (nuts, sprinkles, fruit, and cupcakes), a guided trail walk, and learning how traditional chocolate is roasted and made. They take home their own happy box. For kids ages 3 to 10; includes one accompanying adult (extra companion: RD$300 / $3 USD).",
    },
    duration: "2 horas",
    ageRange: "3-10 años",
    images: [
      "/catalog/tours/IMG_7584.webp",
      "/catalog/tours/IMG_7587.webp",
      "/catalog/tours/IMG_7590.webp",
      "/catalog/tours/IMG_7594.webp",
      "/catalog/tours/IMG_7599.webp",
      "/catalog/tours/IMG_7603.webp",
      "/catalog/tours/IMG_7608.webp",
      "/catalog/tours/IMG_7611.webp",
    ],
    price: { es: "RD$1,000 p/p", en: "$10 USD p/p" },
    active: true,
    order: 1,
  },
  {
    name: { es: "ChocoHistory", en: "ChocoHistory" },
    description: {
      es: "Una experiencia introductoria por nuestro proceso artesanal: bienvenida con chocolate caliente, recorrido interpretativo por el sendero, conexión eco-sensorial con la naturaleza, degustación de la fruta de cacao y su proceso de siembra, vivencia en el cacaotal, demostración de herramientas tradicionales de producción y degustación de nuestros productos, con oportunidad de compra al final.",
      en: "An introductory experience through our artisanal process: a hot chocolate welcome, an interpretive trail walk, an eco-sensory connection with nature, tasting the cacao fruit and learning about planting, time in the cacao grove, a traditional production tools demonstration, and a product tasting — with the chance to shop at the end.",
    },
    duration: "45 minutos",
    images: [
      "/catalog/tours/IMG_7622.webp",
      "/catalog/tours/IMG_7629.webp",
      "/catalog/tours/IMG_7637.webp",
      "/catalog/tours/IMG_7643.webp",
      "/catalog/tours/IMG_7647.webp",
      "/catalog/tours/IMG_7653.webp",
      "/catalog/tours/IMG_7657.webp",
      "/catalog/tours/IMG_7662.webp",
    ],
    price: { es: "RD$500 p/p", en: "$5 USD p/p" },
    active: true,
    order: 2,
  },
];
