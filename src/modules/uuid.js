export const createUuidModule = ({ random }) => {
  return {
    /**
     * Genera un UUID versión 4 estándar.
     * Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     */
    v4: () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        // Generamos un número aleatorio entre 0 y 15 (hexadecimal)
        const r = random.randInt(0, 15);
        // Si es 'x', usamos el número tal cual.
        // Si es 'y', aplicamos lógica de bits para forzar que sea 8, 9, A o B.
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16); // Convertimos a string hexadecimal
      });
    },
  };
};
