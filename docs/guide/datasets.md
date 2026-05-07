# 📊 Generador de Datasets

El módulo `dataset` es el corazón de Faker-Mini para pruebas masivas, poblado de bases de datos (seeding) y creación de fixtures para testing.

## Uso Básico
El método `generate` recibe la cantidad de elementos y un **esquema** (u objeto de funciones).

```javascript
const posts = mock.dataset.generate(3, {
  id: () => mock.id.short(),
  titulo: () => "Post de prueba",
  likes: () => mock.helpers.array(1, () => 10).length
});
```

## 🧠 Relación de Datos (Factory Mode)

Si pasas un objeto estático, las propiedades no pueden depender unas de otras. Para que los datos tengan coherencia interna (ej: que el email coincida con el nombre, o que una fecha de actualización sea posterior a la de creación), debes pasar una **función constructora**.

### Ejemplo 1: Usuarios Coherentes
```javascript
const usuarios = mock.dataset.generate(10, () => {
  const firstName = mock.person.firstName();
  const lastName = mock.person.lastName();

  return {
    id: mock.id.mongodb(),
    nombreCompleto: `${firstName} ${lastName}`,
    correo: mock.internet.email({ firstName, lastName }),
    ciudad: mock.location.city(),
    registrado: mock.date.format(mock.date.past(), "YYYY-MM-DD")
  };
});
```

### Ejemplo 2: Catálogo de Productos
Ideal para mockear un e-commerce utilizando los módulos `commerce` e `image` combinados.
```javascript
const catalogo = mock.dataset.generate(50, () => {
  return {
    sku: mock.commerce.sku(),
    nombre: mock.commerce.productName(),
    categoria: mock.commerce.department(),
    precio: mock.commerce.price({ min: 100, max: 2000, symbol: "$" }),
    imagen: mock.image.photo({ width: 500, height: 500 })
  };
});
```

---

## ⚡ Exportación vía CLI

Si necesitas este JSON crudo y no quieres escribir un script de Node.js, recuerda que nuestra [Herramienta de Terminal (CLI)](/guide/cli) trae *presets* listos para escupir estos mismos datasets directamente a un archivo:

```bash
# Genera el Ejemplo 1 (Usuarios)
npx faker-mini dataset --preset users --count 10 --out usuarios.json

# Genera el Ejemplo 2 (Catálogo de productos)
npx faker-mini dataset --preset products --count 50 --out catalogo.json
```
