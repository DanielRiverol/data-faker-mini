# Introducción

**Faker-Mini** es una librería diseñada para desarrolladores que necesitan datos de prueba reales pero no quieren instalar paquetes de 50MB.

## ¿Por qué Faker-Mini?

A diferencia de otras librerías, Faker-Mini aprovecha las APIs nativas del navegador y de Node.js (`Intl` y `Crypto`) para ofrecer:

- 🚀 **Cero dependencias**: El paquete final es minúsculo.
- 🛠️ **Tree-shaking**: Si solo usas `person`, tu bundle solo incluirá el código de `person`.
- 📦 **Nativo de la CLI**: Genera archivos JSON gigantes para tus pruebas locales sin escribir una sola línea de código.

## Instalación

Instálalo usando tu gestor de paquetes favorito:

::: code-group
```bash [npm]
npm install faker-mini
```
```bash[pnpm]
pnpm add faker-mini
```

```bash[yarn]
yarn add faker-mini

:::

## Primeros pasos

Aquí tienes un ejemplo rápido de cómo usarlo en tu código:
```javascript
import { faker } from 'faker-mini';

const nombre = faker.person.fullName();
console.log(`Hola, mi nombre es ${nombre}`);
```

---