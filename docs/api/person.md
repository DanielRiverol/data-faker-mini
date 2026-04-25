# Módulo: Person 👤

Generación de nombres, apellidos y datos biográficos básicos. Este módulo es totalmente sensible al idioma (`locale`) configurado, por lo que devolverá nombres y géneros acordes a la región (ej: nombres alemanes para `de_DE` o mexicanos para `es_MX`).

## Métodos

### `gender()`
Devuelve un género aleatorio traducido al idioma del `locale` actual.

```javascript
// Con locale en 'es_AR' o 'es_MX'
mock.person.gender() // "Masculino" o "Femenino"

// Con locale en 'en_US'
mock.person.gender() // "Male" o "Female"
```

### `firstName(gender?)`
Genera un nombre de pila aleatorio. Si necesitas que el nombre coincida con un género específico, puedes pasarle ese género por parámetro. Si no le pasas nada, elegirá un género al azar internamente.

- **gender** (String, opcional): El género deseado (ej: `'Masculino'`, `'Female'`, etc., dependiendo de tu locale).

```javascript
// Nombre de género aleatorio
mock.person.firstName() // "Facundo" o "Valentina"

// Forzando un nombre masculino
mock.person.firstName("Masculino") // "Martín"

// Forzando un nombre femenino
mock.person.firstName("Femenino") // "Sofía"
```

### `lastName()`
Genera un apellido aleatorio representativo de la región configurada.

```javascript
mock.person.lastName() // "Rodríguez"
```

### `fullName()`
Genera un nombre completo combinando un nombre de pila aleatorio y un apellido aleatorio. 

```javascript
mock.person.fullName() // "Lucía Fernández"
```

::: tip Consistencia de Datos
Si estás construyendo un perfil completo de usuario, te recomendamos generar primero el nombre de pila y guardarlo en una variable, para luego poder usarlo en el módulo de `internet` al crear su correo electrónico:

```javascript
const primerNombre = mock.person.firstName('Femenino'); // "Camila"
const apellido = mock.person.lastName(); // "Gómez"

const email = mock.internet.email({ 
  firstName: primerNombre, 
  lastName: apellido 
}); // "camila.gomez42@gmail.com"
```
:::
