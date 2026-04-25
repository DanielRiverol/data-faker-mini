# Módulo: Internet 🌐

Generación de credenciales, dominios y direcciones de red.

## Métodos

### `email(options?)`
Genera un correo electrónico válido y limpio (sin acentos ni caracteres especiales).

- **options**: `{ firstName, lastName, format }`
- **format**: `'dot'` (defecto) o `'underscore'`.

```javascript
mock.internet.email() // "user.test42@gmail.com"

// Personalizado
mock.internet.email({ firstName: 'Facundo', lastName: 'Gómez' }) 
// "facundo.gomez88@yahoo.com"
```
### `ipv4()`

Genera una dirección IP aleatoria.
```javascript
mock.internet.ipv4() // "192.168.0.1"

```
### `domain()`
Devuelve un dominio aleatorio de la lista global.
```javascript
mock.internet.domain() // "startup.dev"
```

---