export const createLocationModule = ({ random, locale }) => {
  const module = {
    city: () => random.pick(locale.locations.cities),

    country: () => random.pick(locale.locations.countries),

    /**
     * Genera un código postal.
     * Permite pasar un formato personalizado (ej: "###-###")
     */
    zipCode: (format = "#####") => {
      return format.replace(/#/g, () => random.randInt(0, 9));
    },

    latitude: () => (random.random() * 180 - 90).toFixed(4),

    longitude: () => (random.random() * 360 - 180).toFixed(4),

    coordinates: () => ({
      lat: module.latitude(),
      lng: module.longitude(),
    }),

    /**
     * Crea un nombre de calle realista reutilizando apellidos y adaptando
     * el prefijo/sufijo al idioma del país.
     */
    street: () => {
      const streetName = random.pick(locale.names.lastNames);
      const country = locale.locations.countries[0];

      if (country === "United States") {
        return `${streetName} ${random.pick(["St.", "Ave.", "Blvd.", "Rd.", "Lane"])}`;
      }
      if (country === "Brasil") {
        return `${random.pick(["Rua", "Avenida", "Travessa"])} ${streetName}`;
      }
      if (country === "France") {
        return `${random.pick(["Rue", "Avenue", "Boulevard"])} ${streetName}`;
      }
      if (country === "Deutschland") {
        return `${streetName}${random.pick(["straße", "weg", "platz"])}`;
      }

      // Por defecto (Español)
      return `${random.pick(["Calle", "Av.", "Bulevar", "Pasaje"])} ${streetName}`;
    },

    /**
     * Genera una dirección completa con número de puerta.
     */
    streetAddress: () => {
      const num = random.randInt(10, 9999);
      const country = locale.locations.countries[0];

      // En inglés y alemán el número suele ir antes o tiene un formato distinto
      if (country === "United States") {
        return `${num} ${module.street()}`;
      }
      // Español, Portugués, Francés (la calle va primero)
      return `${module.street()} ${num}`;
    },
  };

  return module;
};
