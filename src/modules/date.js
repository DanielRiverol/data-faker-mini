export const createDateModule = ({ random, localeCode = "es_AR" }) => {
  // Convertimos el formato "es_MX" a "es-MX" que es el estándar que entiende JavaScript
  const jsLocale = localeCode.replace("_", "-");

  // Motor de formateo súper vitaminado y optimizado
  const formatDate = (date, formatStr) => {
    const d = new Date(date);

    // Función auxiliar para obtener textos traducidos y capitalizados
    const getIntl = (options) => {
      const str = new Intl.DateTimeFormat(jsLocale, options).format(d);
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Usamos una función para evaluar el valor solo si la etiqueta existe en el formatStr
    const getValue = (token) => {
      switch (token) {
        case "YYYY":
          return d.getFullYear();
        case "YY":
          return String(d.getFullYear()).slice(-2);
        case "MMMM":
          return getIntl({ month: "long" }); // Abril
        case "MMM":
          return getIntl({ month: "short" }); // Abr
        case "MM":
          return String(d.getMonth() + 1).padStart(2, "0"); // 04
        case "M":
          return d.getMonth() + 1; // 4
        case "dddd":
          return getIntl({ weekday: "long" }); // Jueves
        case "ddd":
          return getIntl({ weekday: "short" }); // Jue
        case "DD":
          return String(d.getDate()).padStart(2, "0"); // 05
        case "D":
          return d.getDate(); // 5
        case "HH":
          return String(d.getHours()).padStart(2, "0");
        case "mm":
          return String(d.getMinutes()).padStart(2, "0");
        case "ss":
          return String(d.getSeconds()).padStart(2, "0");
        default:
          return token;
      }
    };

    // NOTA: El orden de la expresión regular es vital.
    // Debemos buscar 'dddd' antes que 'DD' para que no reemplace partes equivocadas.
    return formatStr.replace(
      /YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|D|HH|mm|ss/g,
      (matched) => getValue(matched),
    );
  };

  const module = {
    between: (from, to) => {
      const fromMs = new Date(from).getTime();
      const toMs = new Date(to).getTime();
      return new Date(fromMs + random.random() * (toMs - fromMs));
    },

    past: (years = 1, refDate = new Date()) => {
      const to = new Date(refDate);
      const from = new Date(to.getTime() - years * 365 * 24 * 60 * 60 * 1000);
      return module.between(from, to);
    },

    future: (years = 1, refDate = new Date()) => {
      const from = new Date(refDate);
      const to = new Date(from.getTime() + years * 365 * 24 * 60 * 60 * 1000);
      return module.between(from, to);
    },

    recent: (days = 7, refDate = new Date()) => {
      const to = new Date(refDate);
      const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
      return module.between(from, to);
    },

    birthdate: ({ minAge = 18, maxAge = 80 } = {}) => {
      const today = new Date();
      const to = new Date(
        today.getFullYear() - minAge,
        today.getMonth(),
        today.getDate(),
      );
      const from = new Date(
        today.getFullYear() - maxAge,
        today.getMonth(),
        today.getDate(),
      );
      return module.between(from, to);
    },

    // --- FUNCIONES DE FORMATEO Y LOCALIZACIÓN ---
    format: (date, formatStr = "YYYY-MM-DD") => formatDate(date, formatStr),

    month: ({ format = "long" } = {}) => {
      const m = random.randInt(0, 11);
      const d = new Date(2024, m, 1);
      const monthStr = new Intl.DateTimeFormat(jsLocale, {
        month: format,
      }).format(d);
      return monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
    },

    weekday: ({ format = "long" } = {}) => {
      const dayIndex = random.randInt(1, 7);
      const d = new Date(2024, 0, dayIndex);
      const dayStr = new Intl.DateTimeFormat(jsLocale, {
        weekday: format,
      }).format(d);
      return dayStr.charAt(0).toUpperCase() + dayStr.slice(1);
    },

    year: ({ min = 1970, max = new Date().getFullYear() } = {}) => {
      return random.randInt(min, max);
    },
  };

  return module;
};
