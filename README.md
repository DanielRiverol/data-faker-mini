# 🚀 Faker Mini
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-informational)]()
![npm](https://img.shields.io/npm/v/faker-mini)
![npm downloads](https://img.shields.io/npm/dw/faker-mini)
![bundle size](https://img.shields.io/bundlephobia/minzip/faker-mini)
----
Librería ultra liviana para generar datos falsos realistas.  
Sin dependencias, modular, con soporte de locales y lista para Node.js y browser.

---

## ✨ Por qué usar Faker Mini

- ⚡ **Ligero** (sin bloat innecesario)
- 🧩 **Modular** (solo usás lo que necesitás)
- 🌍 **Multilenguaje**
- 🔁 **Seedable** (datos reproducibles)
- 📦 **Tree-shakeable (ESM)**

---

## 📦 Instalación

```bash
npm install faker-mini
````

---

## 🚀 Uso rápido

```js
import { createFaker } from "faker-mini";

const faker = createFaker({ locale: "es_AR", seed: 123 });

faker.person.fullName();   // "Juan Pérez"
faker.internet.email();    // "juan.perez42@gmail.com"
faker.location.city();     // "Buenos Aires"
faker.phone.number();      // "+54 11 1234 5678"
```

---

## 🧠 Generación de datasets

```js
const faker = createFaker();

const users = faker.dataset.generate(5, {
  id: () => faker.random.randInt(1, 9999),
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  city: () => faker.location.city(),
});

console.log(users);
```

---

## 🌍 Locales disponibles

* `en_US`
* `es_AR`
* `es_MX`
* `es_ES`
* `fr_FR`
* `de_DE`
* `pt_BR`

```js
createFaker({ locale: "es_MX" });
```

---

## ⚡ CLI

Sin instalar nada:

### Generar datos simples

```bash
npx faker-mini person fullName
npx faker-mini internet email --locale es_MX
npx faker-mini location city --locale pt_BR
```

### Generar JSON

```bash
npx faker-mini dataset --count 50 --out users.json
```

### Esquema custom

```bash
npx faker-mini dataset \
  --count 10 \
  --schema id:random.randInt,nombre:person.firstName \
  --out data.json
```

---

## 🧩 API

```js
faker.person.firstName()
faker.person.lastName()
faker.person.fullName()

faker.internet.email()
faker.internet.ipv4()

faker.location.city()
faker.location.country()

faker.phone.number()

faker.helpers.array()
faker.helpers.object()

faker.dataset.generate()
```

---

## 🔁 Seed (reproducibilidad)

```js
const faker = createFaker({ seed: 123 });

faker.person.fullName(); // siempre igual
```

---

## 📌 Filosofía

> Faker Mini hace una sola cosa: generar datos fake de forma simple, rápida y controlada.

Sin features innecesarias. Sin peso extra.

---

## 🤝 Contribuciones

PRs bienvenidos.

---

## 📄 Licencia

MIT

