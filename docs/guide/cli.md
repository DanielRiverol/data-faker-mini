# 💻 Interfaz de Línea de Comandos (CLI)

Faker-Mini incluye una potente herramienta de terminal que te permite generar datos de prueba al instante, ideal para poblar bases de datos o crear *fixtures* para tus tests.

## 🪄 Modo Interactivo (Recomendado)

La forma más fácil y amigable de usar la CLI es a través de su asistente interactivo. Simplemente ejecuta el comando sin argumentos y Faker-Mini te guiará paso a paso:

```bash
npx faker-mini
```

El asistente te permitirá elegir el idioma, si deseas generar un dato único o un dataset completo, y te ofrecerá plantillas predefinidas listas para usar (como **Usuarios** o **Productos** con imágenes y precios).

---

## ⚡ Modo Scripting (Rápido)

Si prefieres automatizar la generación de datos en tus scripts de CI/CD o en tu `package.json`, puedes pasar los argumentos directamente.

### Dato Único
Puedes obtener un único dato directamente en tu consola:

```bash
npx faker-mini person fullName --locale es_MX
```

### Generación de Datasets (JSON)
Esta es la función más potente para mockear bases de datos. Por defecto, genera un esquema de usuario completo, pero puedes cambiarlo a productos usando el flag `--preset`.

```bash
# Genera 10 usuarios por defecto
npx faker-mini dataset --count 10 --out usuarios.json

# Genera un catálogo de 50 productos con fotos y precios
npx faker-mini dataset --preset products --count 50 --out catalogo.json
```

### Esquemas Personalizados

Si necesitas una estructura específica y los presets no son suficientes, usa el flag `--schema` con el formato `clave:modulo.metodo` separado por comas:

```bash
npx faker-mini dataset \
  --count 5 \
  --schema id:id.short,email:internet.email,pass:internet.password,ciudad:location.city \
  --out mi_data.json
```

---

## ⚙️ Opciones Globales de la CLI

| Opción      | Descripción                                      | Valor por defecto     |
|-------------|--------------------------------------------------|-----------------------|
| `--preset`  | Plantilla rápida a utilizar (`users` o `products`). | `users`            |
| `--count`   | Cantidad de registros a generar en el dataset.   | `10`                  |
| `--locale`  | Idioma de los datos generados.                   | `en_US`               |
| `--out`     | Ruta y nombre del archivo `.json` de salida.     | `null` *(Consola)* |
| `--schema`  | Estructura personalizada (`clave:mod.metodo`).   | Usuario estándar      |
| `-v, --version` | Muestra la versión actual de la CLI instalada. | -                     |
| `-h, --help`    | Muestra el menú de ayuda en la terminal.       | -                     |
