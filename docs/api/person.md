# Módulo: Person 👤

El módulo `person` permite generar nombres y datos biográficos básicos.

## Métodos

### `firstName(gender?)`
Genera un nombre de pila aleatorio.

- **gender**: `'Male' | 'Female'` (Opcional). Si no se provee, se elige uno al azar.

```javascript
mock.person.firstName() // "Facundo"
mock.person.firstName('Female') // "Martina"

```
### `lastName()`
Genera un apellido aleatorio basado en el locale configurado.

```javascript
mock.person.lastName() // "Gómez"

```
### `fullName()`
Combina un nombre y un apellido.
```javascript
mock.person.fullName() // "Lucía Fernández"

```
### `gender()`
Devuelve un género aleatorio según el idioma.
```javascript
mock.person.gender() // "Masculino" o "Femenino"
```

---