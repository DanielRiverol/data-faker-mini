import de_DE from "./locales/de_DE/index.js";
import en_US from "./locales/en_US/index.js";
import es_AR from "./locales/es_AR/index.js";
import es_ES from "./locales/es_ES/index.js";
import es_MX from "./locales/es_MX/index.js";
import fr_FR from "./locales/fr_FR/index.js";
import pt_BR from "./locales/pt_BR/index.js";

import { createRandom } from "./core/random.js";
import { createPersonModule } from "./modules/person.js";
import { createLocationModule } from "./modules/location.js";
import { createInternetModule } from "./modules/internet.js";
import { createPhoneModule } from "./modules/phone.js";
import { createDatasetModule } from "./modules/dataset.js";
import { createHelpersModule } from "./modules/helpers.js";
import { createDateModule } from "./modules/date.js";
import { createIdModule } from "./modules/id.js";

const locales = {
  de_DE,
  en_US,
  es_AR,
  es_ES,
  es_MX,
  fr_FR,
  pt_BR,
};

export const createMock = ({ locale = "en_US", seed } = {}) => {
  const localeData = locales[locale] || locales["es_AR"];
  const random = createRandom(seed);

  const mock = {
    setSeed: (s) => random.setSeed(s),
  };

  mock.person = createPersonModule({ random, locale: localeData });
  mock.location = createLocationModule({ random, locale: localeData });
  mock.internet = createInternetModule({ random, locale: localeData });
  mock.phone = createPhoneModule({ random, locale: localeData });
  mock.date = createDateModule({ random, localeCode: locale });
  mock.id = createIdModule({ random });
  mock.dataset = createDatasetModule();
  mock.helpers = createHelpersModule();

  return mock;
};
