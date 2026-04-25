export const createRandom = (seedValue = Date.now()) => {
  let seed = seedValue;

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  return {
    setSeed: (s) => (seed = s),
    randInt: (min, max) => Math.floor(random() * (max - min + 1)) + min,
    pick: (arr) => arr[Math.floor(random() * arr.length)],
    random,
  };
};
