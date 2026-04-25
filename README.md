# 🚀 Faker Mini

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)]()
[![Version](https://img.shields.io/badge/version-2.0.0-informational)]()
![npm](https://img.shields.io/npm/v/faker-mini)
![npm downloads](https://img.shields.io/npm/dw/faker-mini)
![bundle size](https://img.shields.io/bundlephobia/minzip/faker-mini)
----
Librería ultra liviana para generar datos falsos realistas.  
Sin dependencias, modular, con soporte de locales nativo y lista para Node.js y browser.

---

## ✨ Por qué usar Faker Mini

- ⚡ **Ligero**: Sin diccionarios de 50MB. Aprovechamos la API nativa de `Intl`.
- 🧩 **Modular**: Solo importa lo que necesitas.
- 🌍 **Multilenguaje**: Adaptación gramatical inteligente según el país.
- 🔁 **Seedable**: Datos 100% reproducibles para testing estable.
- 📦 **Tree-shakeable**: Diseño moderno basado en ES Modules.

---

## 📦 Instalación

```bash
npm install faker-mini
```

*(También disponible vía `pnpm add faker-mini` o `yarn add faker-mini`)*

---

## 🚀 Uso rápido

Utiliza el estándar `mock` para instanciar la librería en el idioma que prefieras:

```javascript
import { createMock } from "faker-mini";

const mock = createMock({ locale: "es_AR", seed: 123 });

mock.person.fullName();   // "Juan Pérez"
mock.internet.email();    // "juan.perez42@gmail.com"
mock.location.city();     // "Buenos Aires"
mock.phone.number();      // "+54 9 1234-5678"
mock.date.past();         // 2023-08-14T18:45:10.000Z
mock.id.uuid();           // "e4f8a3b2-7d1c-4e9f-8a2b-1c3d4e5f6a7b"
```

---

## 🧠 Generación de Datasets (Payloads masivos)

```javascript
const mock = createMock({ locale: "en_US" });

// Puedes pasar una función constructora para mantener relación entre campos
const users = mock.dataset.generate(5, () => {
  const firstName = mock.person.firstName();
  const lastName = mock.person.lastName();

  return {
    id: mock.id.mongodb(),
    name: `${firstName} ${lastName}`,
    email: mock.internet.email({ firstName, lastName }),
    city: mock.location.city(),
    createdAt: mock.date.format(mock.date.recent(30), 'YYYY-MM-DD HH:mm:ss')
  };
});

console.log(users);
```

---

## 🌍 Locales disponibles

* `en_US` (Inglés - Estados Unidos)
* `es_AR` (Español - Argentina)
* `es_MX` (Español - México)
* `es_ES` (Español - España)
* `fr_FR` (Francés - Francia)
* `de_DE` (Alemán - Alemania)
* `pt_BR` (Portugués - Brasil)

```javascript
createMock({ locale: "es_MX" });
```

---

## ⚡ CLI Nativa

Genera datos desde tu terminal sin escribir código:

### Generar datos simples
```bash
npx faker-mini person fullName
npx faker-mini internet email --locale es_MX
npx faker-mini location streetAddress --locale pt_BR
```

### Generar archivos JSON masivos
```bash
npx faker-mini dataset --count 50 --out users.json
```

### Esquema personalizado (CSV style)
```bash
npx faker-mini dataset \
  --count 10 \
  --schema id:id.short,nombre:person.firstName,email:internet.email \
  --out data.json
```

---

## 🧩 API de Módulos

### `mock.person`
* `.gender()`
* `.firstName(gender?)`
* `.lastName()`
* `.fullName()`

### `mock.location`
* `.city()`
* `.country()`
* `.zipCode(format?)`
* `.street()`
* `.streetAddress()`
* `.latitude()` / `.longitude()` / `.coordinates()`

### `mock.internet`
* `.email({ firstName?, lastName?, format? })` // *Limpia acentos y caracteres especiales automáticamente*
* `.domain()`
* `.tld()`
* `.ipv4()`

### `mock.phone`
* `.number({ style: 'international' | 'national', format? })`
* `.imei()`

### `mock.date`
* `.between(from, to)`
* `.past(years?, refDate?)`
* `.future(years?, refDate?)`
* `.recent(days?, refDate?)`
* `.birthdate({ minAge, maxAge })`
* `.format(date, pattern)`
* `.month(options?)` / `.weekday(options?)` / `.year(options?)`

### `mock.id`
* `.uuid()`
* `.mongodb()`
* `.short(length?)`
* `.sequential()` / `.resetSequential(startValue?)`

### `mock.helpers`
* `.array(count, fn)`
* `.object(schema)`

### `mock.dataset`
* `.generate(count, schemaOrFactory)`

*(👉 Visita la [Documentación Completa](https://danielriverol.github.io/data-faker-mini/) para ver opciones avanzadas).*

---

## 🔁 Reproducibilidad (Seed)

Ideal para que tus test unitarios o snapshots de frontend (Jest, Vitest) no se rompan entre ejecuciones.

```javascript
const mock = createMock({ seed: 12345 });
mock.person.fullName(); // "Juan Pérez" hoy, mañana y siempre.
```

---

## 📌 Filosofía

> **Faker-Mini** hace una sola cosa: generar datos falsos de forma simple, rápida y controlada.

Sin características sobredimensionadas. Sin dependencias de terceros. Diseñado para aprovechar la plataforma actual (V8/Node/Navegadores).

---

## 🤝 Contribuciones

¿Quieres agregar un módulo nuevo o un `locale`? ¡Los PRs son siempre bienvenidos!

---

## 📄 Licencia

MIT
