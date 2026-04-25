import { domains, tlds } from "../data/internet.js";

export const createInternetModule = ({ random }) => {
  /**
   * Limpia un string para que sea seguro usarlo en un email o URL.
   * - Quita tildes, eñes y diéresis.
   * - Convierte a minúsculas.
   * - Elimina los espacios y símbolos raros.
   */
  const cleanString = (str) => {
    return str
      .normalize("NFD") // Separa las letras de sus acentos (ej: é -> e + ´)
      .replace(/[\u0300-\u036f]/g, "") // Elimina las marcas de acento que se separaron
      .toLowerCase() // Convierte todo a minúsculas
      .replace(/\s+/g, "") // Elimina todos los espacios ("de la Cruz" -> "delacruz")
      .replace(/[^a-z0-9]/g, ""); // Limpia cualquier otro carácter que no sea letra o número
  };

  return {
    email: (options = {}) => {
      const rawFirst = options.firstName || "user";
      const rawLast = options.lastName || "test";

      const separator = options.format === "underscore" ? "_" : ".";

      // Limpiamos los nombres antes de concatenarlos
      const first = cleanString(rawFirst);
      const last = cleanString(rawLast);

      return `${first}${separator}${last}${random.randInt(10, 99)}@${random.pick(domains)}`;
    },

    domain: () => random.pick(domains),

    tld: () => random.pick(tlds),

    ipv4: () =>
      `${random.randInt(1, 255)}.${random.randInt(1, 255)}.${random.randInt(1, 255)}.${random.randInt(1, 255)}`,
  };
};
