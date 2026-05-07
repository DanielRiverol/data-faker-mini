export const createCommerceModule = ({ random, localeCode = "es_AR" }) => {
  // Detectamos si el locale empieza con "en" (Inglés)
  const isEn = localeCode.startsWith("en");

  // Diccionarios minimalistas pero efectivos
  const depts = isEn
    ? [
        "Electronics",
        "Home",
        "Toys",
        "Sports",
        "Automotive",
        "Health",
        "Beauty",
        "Garden",
        "Pets",
        "Books",
      ]
    : [
        "Electrónica",
        "Hogar",
        "Juguetes",
        "Deportes",
        "Automotor",
        "Salud",
        "Belleza",
        "Jardín",
        "Mascotas",
        "Librería",
      ];

  const adjectives = isEn
    ? [
        "Ergonomic",
        "Elegant",
        "Incredible",
        "Fantastic",
        "Practical",
        "Modern",
        "Recycled",
        "Premium",
        "Smart",
        "Portable",
      ]
    : [
        "Ergonómico",
        "Elegante",
        "Increíble",
        "Fantástico",
        "Práctico",
        "Moderno",
        "Reciclado",
        "Premium",
        "Inteligente",
        "Portátil",
      ];

  const materials = isEn
    ? [
        "Steel",
        "Wooden",
        "Plastic",
        "Cotton",
        "Leather",
        "Metal",
        "Rubber",
        "Glass",
        "Aluminum",
        "Ceramic",
      ]
    : [
        "Acero",
        "Madera",
        "Plástico",
        "Algodón",
        "Cuero",
        "Metal",
        "Goma",
        "Vidrio",
        "Aluminio",
        "Cerámica",
      ];

  const products = isEn
    ? [
        "Chair",
        "Table",
        "Keyboard",
        "Headphones",
        "Monitor",
        "Backpack",
        "Shirt",
        "Shoes",
        "Watch",
        "Bag",
      ]
    : [
        "Silla",
        "Mesa",
        "Teclado",
        "Auriculares",
        "Monitor",
        "Mochila",
        "Camisa",
        "Zapatos",
        "Reloj",
        "Bolso",
      ];

  return {
    department: () => random.pick(depts),

    productAdjective: () => random.pick(adjectives),

    productMaterial: () => random.pick(materials),

    /**
     * Genera el nombre de un producto armando una frase lógica.
     */
    productName: () => {
      if (isEn) {
        // Inglés: Adjetivo + Material + Producto
        return `${random.pick(adjectives)} ${random.pick(materials)} ${random.pick(products)}`;
      }
      // Español: Producto + de + Material + Adjetivo
      return `${random.pick(products)} de ${random.pick(materials)} ${random.pick(adjectives)}`;
    },

    /**
     * Genera un precio aleatorio.
     */
    price: ({ min = 10, max = 5000, decimals = 2, symbol = "$" } = {}) => {
      const value = min + random.random() * (max - min);
      return `${symbol}${value.toFixed(decimals)}`;
    },

    /**
     * Genera un código de stock universal (ej: ELE-84921)
     */
    sku: () => {
      // Tomamos las primeras 3 letras del departamento, quitamos acentos y pasamos a mayúsculas
      const dept = random
        .pick(depts)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .slice(0, 3)
        .toUpperCase();
      const num = random.randInt(10000, 99999);
      return `${dept}-${num}`;
    },
  };
};
