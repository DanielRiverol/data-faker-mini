# Módulo: Location 📍

Generación de datos geográficos. Este módulo es inteligente y adapta los nombres de calles, formatos y ciudades al idioma (`locale`) configurado de forma automática.

## Métodos Básicos

### `city()`
Devuelve una ciudad del país configurado en el `locale`.

```javascript
mock.location.city() // "Mar del Plata" (es_AR)
```

### `country()`
Devuelve el nombre del país del locale actual.

```javascript
mock.location.country() // "Argentina"
```

### `zipCode(format?)`
Genera un código postal. Por defecto usa 5 dígitos, pero puedes pasarle tu propio patrón usando el símbolo `#` para representar números.

```javascript
mock.location.zipCode() // "41902"
mock.location.zipCode('CP-####') // "CP-8312"
```

---

## Direcciones Completas

### `street()`
Genera un nombre de calle aleatorio. Su magia radica en que detecta tu `locale` para que la calle tenga sentido gramatical.

```javascript
// Con locale 'es_AR' o 'es_ES'
mock.location.street() // "Av. Rodríguez" o "Calle García"

// Con locale 'en_US'
mock.location.street() // "Smith Blvd." o "Johnson St."

// Con locale 'de_DE'
mock.location.street() // "Müllerstraße"
```

### `streetAddress()`
Combina un número de puerta aleatorio con el método `street()`, respetando el orden sintáctico de la región (el número primero en inglés, al final en español).

```javascript
mock.location.streetAddress() // "Calle Gómez 1420"
```

---

## Coordenadas (GPS)

### `latitude()`
Devuelve una latitud geográfica válida como `String` (entre -90 y 90), con 4 decimales de precisión.

```javascript
mock.location.latitude() // "-34.6037"
```

### `longitude()`
Devuelve una longitud geográfica válida como `String` (entre -180 y 180), con 4 decimales de precisión.

```javascript
mock.location.longitude() // "-58.3816"
```

### `coordinates()`
Un método de conveniencia que devuelve un objeto con ambas coordenadas. Ideal para poblar bases de datos o pintar mapas.

```javascript
mock.location.coordinates() 
// { lat: "40.4168", lng: "-3.7038" }
```
