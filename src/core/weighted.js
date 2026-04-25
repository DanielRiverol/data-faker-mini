export const weightedPick = (items, random) => {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let threshold = random.randInt(1, total);
  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) return item.value;
  }
};
