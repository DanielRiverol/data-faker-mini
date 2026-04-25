# Módulo: Internet 🌐

Generación de credenciales, dominios y direcciones de red. Este módulo está diseñado para crear datos web seguros y válidos, aplicando limpieza automática de caracteres especiales.

## Métodos

### `email(options?)`
Genera un correo electrónico aleatorio. Lo más destacado de este método es que **limpia automáticamente los textos de entrada**: quita tildes, eñes, convierte a minúsculas y elimina espacios o símbolos raros, garantizando que el email final siempre sea válido (por ejemplo, convierte "María José" en "mariajose").

- **options**: Un objeto de configuración opcional.
  - `firstName` (String): Nombre a utilizar (Defecto: `"user"`).
  - `lastName` (String): Apellido a utilizar (Defecto: `"test"`).
  - `format` (String): El separador entre nombre y apellido. Puede ser `'dot'` (punto, por defecto) o `'underscore'` (guion bajo).

```javascript
// Uso básico
mock.internet.email() 
// "user.test42@gmail.com"

// Pasando nombres personalizados (nota cómo limpia los acentos y espacios)
mock.internet.email({ firstName: 'Facundo', lastName: 'Gómez' }) 
// "facundo.gomez88@yahoo.com"

mock.internet.email({ firstName: 'María de los Ángeles', lastName: 'Pérez' }) 
// "mariadelosangeles.perez15@outlook.com"

// Cambiando el formato del separador
mock.internet.email({ firstName: 'Juan', lastName: 'Pérez', format: 'underscore' }) 
// "juan_perez99@proton.me"
```

### `domain()`
Devuelve un nombre de dominio aleatorio de una lista de proveedores de correo y dominios corporativos populares. Ideal para generar URLs ficticias.

```javascript
mock.internet.domain() // "startup.dev"
```

### `tld()`
Devuelve un Dominio de Nivel Superior (Top-Level Domain) aleatorio (como `.com`, `.org`, `.io`, etc.).

```javascript
mock.internet.tld() // ".io"
```

::: tip Uso Combinado
Puedes juntar `domain()` o palabras aleatorias con `tld()` para construir sitios web completamente inventados:
`const website = "https://mi-empresa" + mock.internet.tld();`
:::

### `ipv4()`
Genera una dirección IP versión 4 aleatoria y válida, con cada bloque numérico (octeto) variando entre 1 y 255.

```javascript
mock.internet.ipv4() // "192.84.23.115"
```
