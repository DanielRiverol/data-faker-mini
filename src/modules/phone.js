export const createPhoneModule = ({ random, locale }) => ({
  /**
   * Genera un número de teléfono basado en el locale.
   * @param {Object} options - { style: 'international' | 'national', format: '###-###' }
   */
  number: ({ style = "international", format } = {}) => {
    const { countryCode, format: localeFormat } = locale.phone;

    // Si el usuario pasa un formato propio, lo usamos. Si no, usamos el del idioma.
    const chosenFormat = format || localeFormat;

    let num = chosenFormat.replace(/#/g, () => random.randInt(0, 9));

    // Si piden estilo nacional, omitimos el +54, +1, etc.
    if (style === "national") {
      return num;
    }

    return `${countryCode} ${num}`;
  },

  /**
   * Genera un código IMEI (International Mobile Equipment Identity) de 15 dígitos.
   * Muy usado para simular bases de datos de aplicaciones móviles o e-commerce.
   */
  imei: () => {
    let imei = "";
    for (let i = 0; i < 15; i++) {
      imei += random.randInt(0, 9);
    }
    // Formato estándar visual del IMEI: AA-BBBBBB-CCCCCC-D
    return `${imei.slice(0, 2)}-${imei.slice(2, 8)}-${imei.slice(8, 14)}-${imei.slice(14)}`;
  },
});
