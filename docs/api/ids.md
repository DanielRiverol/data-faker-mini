# Módulo: IDs 🆔

Generador de identificadores únicos. Este módulo ofrece desde estándares globales hasta secuencias numéricas simples, adaptándose a cualquier tipo de base de datos o necesidad arquitectónica.

## Métodos

### `uuid()`
Genera un UUID (Universally Unique Identifier) versión 4 estándar. Ideal para claves primarias distribuidas o nombres de archivos únicos.

```javascript
mock.id.uuid() // "e4f8a3b2-7d1c-4e9f-8a2b-1c3d4e5f6a7b"
```

### `mongodb()`
Genera un `ObjectId` válido de MongoDB (un string hexadecimal de 24 caracteres). Al igual que los IDs reales de Mongo, los primeros caracteres están basados en la marca de tiempo (timestamp) de su creación, por lo que son ordenables cronológicamente.

```javascript
mock.id.mongodb() // "65fd3a8b4c9e12f8a4b3c7d9"
```

### `short(length?)`
Genera una cadena alfanumérica aleatoria (A-Z, a-z, 0-9). Inspirado en herramientas como *NanoID*, es perfecto para generar URLs amigables, códigos de invitación o identificadores visuales cortos.

- **length**: Cantidad de caracteres del ID (Defecto: `10`).

```javascript
mock.id.short() // "Kp8m2Xy9Rz"
mock.id.short(5) // "a4F1X"
```

### `sequential()`
Devuelve un número entero que se autoincrementa en cada llamada. Es la herramienta perfecta para emular claves primarias auto-incrementales de bases de datos relacionales (MySQL, PostgreSQL).

```javascript
mock.id.sequential() // 1
mock.id.sequential() // 2
mock.id.sequential() // 3
```

### `resetSequential(startValue?)`
Reinicia el contador interno del método `sequential()`.

- **startValue**: El número desde el cual quieres que vuelva a empezar a contar (Defecto: `1`).

```javascript
mock.id.resetSequential(100)
mock.id.sequential() // 100
mock.id.sequential() // 101
```
