export const createPersonModule = ({ random, locale }) => ({
  gender() {
    return random.pick(locale.names.genders);
  },

  firstName(gender) {
    if (!gender) gender = this.gender();
    const isMale = ["Masculino", "Male", "Männlich", "Masculin"].includes(
      gender,
    );
    return isMale
      ? random.pick(locale.names.maleFirstNames)
      : random.pick(locale.names.femaleFirstNames);
  },

  lastName() {
    return random.pick(locale.names.lastNames);
  },

  fullName() {
    return `${this.firstName()} ${this.lastName()}`;
  },
});
