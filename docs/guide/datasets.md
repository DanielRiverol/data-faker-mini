# Generador de Datasets 📊

El módulo `dataset` es el corazón de Faker-Mini para pruebas masivas y poblado de bases de datos.

## Uso Básico
El método `generate` recibe la cantidad de elementos y un **esquema** (u objeto de funciones).

```javascript
const posts = faker.dataset.generate(3, {
  titulo: () => "Post de prueba",
  likes: () => faker.helpers.array(1, () => 10).length
});
```
## Relación de Datos (Factory Mode)

Para que los datos tengan sentido entre sí (ej: que el email coincida con el nombre), debes pasar una función constructora en lugar de un objeto.
```javascript

const usuarios = faker.dataset.generate(10, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.uuid.v4(),
    nombreCompleto: `${firstName} ${lastName}`,
    correo: faker.internet.email({ firstName, lastName }),
    ciudad: faker.location.city()
  };
});
```

### Exportación

Si usas la CLI, puedes exportar estos resultados directamente a un archivo JSON sin escribir código.


---