# Interfaz de Línea de Comandos (CLI)

Faker-Mini incluye una potente herramienta de terminal que te permite generar datos de prueba al instante.

## Uso Simple
Puedes obtener un único dato directamente en tu consola:

```bash
npx faker-mini person fullName --locale es_MX
```
## Generación de Datasets (JSON)

Esta es la función más potente para poblar bases de datos. Por defecto, genera un esquema de usuario completo.
```bash
npx faker-mini dataset --count 10 --out usuarios.json --locale es_AR
```
### Opciones de la CLI
| Opción   | Descripción                                      | Valor por defecto     |
|----------|--------------------------------------------------|-----------------------|
| --count  | Cantidad de registros a generar.                 | 10                    |
| --locale | Idioma de los datos y las claves del JSON.       | en_US                 |
| --out    | Nombre del archivo .json de salida.              | null (Consola)        |
| --schema | Estructura personalizada (ver abajo).            | Usuario estándar      |

## Esquemas Personalizados

Si necesitas una estructura específica, usa el flag --schema con el formato clave:modulo.metodo:

```bash
npx faker-mini dataset --count 5 --schema id:uuid.v4,email:internet.email,ciudad:location.city
```

---