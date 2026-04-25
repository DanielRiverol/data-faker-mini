# Módulo: Location 📍

Datos geográficos basados en el locale seleccionado.

## Métodos

### `city()`
Devuelve una ciudad importante del país configurado en el `locale`.

```javascript
// Con locale: "es_AR"
mock.location.city() // "Mar del Plata"

// Con locale: "fr_FR"
mock.location.city() // "Marseille"
```
### `country()`

Devuelve el nombre del país del locale actual.
```javascript

mock.location.country() // "Argentina"
```

---


