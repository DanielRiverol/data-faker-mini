export const createImageModule = ({ random }) => {
  return {
    /**
     * Genera una imagen de marcador de posición (caja de color con texto).
     * @param {Object} options - width, height, text, bgColor, textColor
     */
    placeholder: ({
      width = 640,
      height = 480,
      text = "",
      bgColor = "cccccc",
      textColor = "333333",
    } = {}) => {
      // Limpiamos los '#' por si el usuario los manda (ej: '#ff0000' -> 'ff0000')
      const bg = bgColor.replace("#", "");
      const txtColor = textColor.replace("#", "");

      let url = `https://placehold.co/${width}x${height}/${bg}/${txtColor}`;
      if (text) {
        url += `?text=${encodeURIComponent(text)}`;
      }
      return url;
    },

    /**
     * Genera una foto aleatoria realista usando Picsum.
     * Respeta el "seed" de Faker-Mini para que la imagen sea reproducible.
     */
    photo: ({ width = 640, height = 480 } = {}) => {
      // Generamos un seed aleatorio basado en el motor de nuestra librería
      const imageSeed = random.randInt(1, 99999);
      return `https://picsum.photos/seed/${imageSeed}/${width}/${height}`;
    },
  };
};
