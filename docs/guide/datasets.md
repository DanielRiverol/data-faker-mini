# Generador de Datasets 📊

El módulo `dataset` es el corazón de Faker-Mini para pruebas masivas y poblado de bases de datos.

## Uso Básico
El método `generate` recibe la cantidad de elementos y un **esquema** (u objeto de funciones).

```javascript
const posts = mock.dataset.generate(3, {
  titulo: () => "Post de prueba",
  likes: () => mock.helpers.array(1, () => 10).length
});
```
## Relación de Datos (Factory Mode)

Para que los datos tengan sentido entre sí (ej: que el email coincida con el nombre), debes pasar una función constructora en lugar de un objeto.
```javascript

const usuarios = mock.dataset.generate(10, () => {
  const firstName = mock.person.firstName();
  const lastName = mock.person.lastName();

  return {
    id: mock.uuid.v4(),
    nombreCompleto: `${firstName} ${lastName}`,
    correo: mock.internet.email({ firstName, lastName }),
    ciudad: mock.location.city()
  };
});
```

### Exportación

Si usas la CLI, puedes exportar estos resultados directamente a un archivo JSON sin escribir código.


---