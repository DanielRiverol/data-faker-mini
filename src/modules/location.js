export const createLocationModule = ({ random, locale }) => ({
  city: () => random.pick(locale.locations.cities),
  country: () => random.pick(locale.locations.countries),
});
