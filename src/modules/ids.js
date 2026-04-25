// src/modules/id.js

export const createIdModule = ({ random }) => {
  // Variable interna para mantener el estado del contador secuencial
  let counter = 1;

  return {
    /**
     * Genera un UUID versión 4 estándar.
     * Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     */
    uuid: () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = random.randInt(0, 15);
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    /**
     * Genera un ObjectId válido de MongoDB (24 caracteres hexadecimales).
     * Los primeros 8 caracteres representan el timestamp actual,
     * el resto es aleatorio simulando la máquina y el proceso.
     */
    mongodb: () => {
      const timestamp = Math.floor(Date.now() / 1000).toString(16);
      const randomHex = "xxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        random.randInt(0, 15).toString(16),
      );
      return timestamp + randomHex;
    },

    /**
     * Genera un ID corto alfanumérico (estilo NanoID o YouTube).
     * Ideal para URLs amigables o claves cortas.
     * @param {number} length - Longitud del ID (por defecto: 10)
     */
    short: (length = 10) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(random.randInt(0, chars.length - 1));
      }
      return result;
    },

    /**
     * Genera un ID numérico autoincremental.
     * Cada vez que se llama, devuelve el número siguiente.
     * Muy útil para bases de datos relacionales (SQL).
     */
    sequential: () => {
      return counter++;
    },

    /**
     * Reinicia el contador del ID secuencial al valor deseado.
     */
    resetSequential: (startValue = 1) => {
      counter = startValue;
    },
  };
};
