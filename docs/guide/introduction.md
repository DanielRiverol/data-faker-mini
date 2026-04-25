<script setup>
import { ref, onMounted } from 'vue'
import { createMock } from '../../src/index.js'

const faker = createMock({ locale: 'en_US' })

// Estado inicial con TODAS las propiedades
const mockData = ref({
  id: '...',
  nombre: 'Cargando...',
  genero: '...',
  nacimiento: '...',
  email: '...',
  telefono: '...',
  ubicacion: '...',
  ip: '...',
  website: '...'
})

const regenerar = () => {
  // Generamos variables previas para asegurar consistencia (ej: el email coincide con el nombre)
  const primerNombre = faker.person.firstName();
  const apellido = faker.person.lastName();
  
  mockData.value = {
    id: faker.id.uuid(),
    nombre: `${primerNombre} ${apellido}`,
    genero: faker.person.gender(),
    nacimiento: faker.date.format(faker.date.birthdate({ minAge: 18, maxAge: 65 }), 'YYYY-MM-DD'),
    email: faker.internet.email({ firstName: primerNombre, lastName: apellido }),
    telefono: faker.phone.number(),
    ubicacion: `${faker.location.city()}, ${faker.location.country()}`,
    ip: faker.internet.ipv4(),
    website: `https://www.${faker.internet.domain()}`
  }
}

onMounted(() => {
  regenerar()
})
</script>

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
```bash[npm]
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
import { createMock } from 'faker-mini';

const mock = createMock({ locale: 'es_AR' });
const payload = mock.dataset.generate(1, () => ({
  id: mock.uuid.v4(),
  user: mock.person.fullName()
}));

console.log(payload);
```
---
## 🎮 Pruébalo en vivo

<div class="faker-demo">
  <div class="faker-output">
    <div class="grid">
      <p><strong>ID:</strong> <span class="mono">{{ mockData.id }}</span></p>
      <p><strong>Nombre:</strong> {{ mockData.nombre }}</p>
      <p><strong>Género:</strong> {{ mockData.genero }}</p>
      <p><strong>Nacimiento:</strong> {{ mockData.nacimiento }}</p>
      <p><strong>Email:</strong> <span class="email">{{ mockData.email }}</span></p>
      <p><strong>Teléfono:</strong> {{ mockData.telefono }}</p>
      <p><strong>Ubicación:</strong> {{ mockData.ubicacion }}</p>
      <p><strong>IP:</strong> <span class="mono">{{ mockData.ip }}</span></p>
      <p><strong>Website:</strong> 
        <a :href="mockData.website" target="_blank">
          {{ mockData.website }}
        </a>
      </p>
    </div>

  </div>

  <button class="btn-generar" @click="regenerar">
    ↻ Generar Nuevo Usuario
  </button>
</div>

<style>
.faker-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
}

.faker-output {
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

/* GRID PRO */
.grid {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  gap: 0.4rem 1rem;
}

.grid p {
  margin: 0;
}

.email {
  color: var(--vp-c-brand);
}

.mono {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* BOTÓN */
.btn-generar {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-generar:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn-generar:active {
  transform: translateY(0);
  opacity: 0.7;
}
</style>

