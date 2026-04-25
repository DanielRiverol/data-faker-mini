export const createDatasetModule = () => ({
  generate: (count, schemaOrFactory) =>
    Array.from({ length: count }, () => {
      // Si el usuario pasa una función, la ejecutamos.
      // Esto es ideal para datos relacionales (nombre -> email)
      if (typeof schemaOrFactory === "function") {
        return schemaOrFactory();
      }

      // Comportamiento original para esquemas simples
      const item = {};
      for (const key in schemaOrFactory) {
        item[key] = schemaOrFactory[key]();
      }
      return item;
    }),
});
