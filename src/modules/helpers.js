export const createHelpersModule = () => ({
  array: (count, fn) => Array.from({ length: count }, () => fn()),

  object: (schema) => {
    const obj = {};
    for (const key in schema) {
      obj[key] = schema[key]();
    }
    return obj;
  },
});
