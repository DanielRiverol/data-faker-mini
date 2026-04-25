export const createPhoneModule = ({ random, locale }) => ({
  number: () => {
    const { countryCode, format } = locale.phone;
    let num = format.replace(/#/g, () => random.randInt(0, 9));
    return `${countryCode} ${num}`;
  },
});
