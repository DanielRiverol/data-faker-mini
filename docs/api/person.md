# Módulo: Person 👤

El módulo `person` permite generar nombres y datos biográficos básicos.

## Métodos

### `firstName(gender?)`
Genera un nombre de pila aleatorio.

- **gender**: `'Male' | 'Female'` (Opcional). Si no se provee, se elige uno al azar.

```javascript
faker.person.firstName() // "Facundo"
faker.person.firstName('Female') // "Martina"

```
### `lastName()`
Genera un apellido aleatorio basado en el locale configurado.

```javascript
faker.person.lastName() // "Gómez"

```
### `fullName()`
Combina un nombre y un apellido.
```javascript
faker.person.fullName() // "Lucía Fernández"

```
### `gender()`
Devuelve un género aleatorio según el idioma.
```javascript
faker.person.gender() // "Masculino" o "Femenino"
```

---