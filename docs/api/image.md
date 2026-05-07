# Módulo: Image 🖼️

Generación de URLs dinámicas para imágenes de prueba (placeholders). 

> **💡 Nota de rendimiento:** Para mantener `faker-mini` ultra liviano, este módulo no descarga ni procesa imágenes reales en tu servidor/navegador. En su lugar, genera URLs hacia servicios públicos y gratuitos de placeholders que se renderizarán perfectamente en tus etiquetas `<img>`.

---

## Métodos

### `placeholder(options?)`
Genera una imagen básica compuesta por un bloque de color y un texto centrado. Ideal para maquetar esqueletos de interfaces (wireframes).

- **options** (Object): Configuración opcional.
  - `width` (Number): Ancho en píxeles. (Defecto: `640`).
  - `height` (Number): Alto en píxeles. (Defecto: `480`).
  - `text` (String): Texto a mostrar en el centro. (Defecto: vacío).
  - `bgColor` (String): Color de fondo en formato HEX (sin el `#`). (Defecto: `"cccccc"`).
  - `textColor` (String): Color del texto en formato HEX. (Defecto: `"333333"`).

```javascript
// Placeholder estándar (640x480 gris)
mock.image.placeholder() 
// "[https://placehold.co/640x480/cccccc/333333](https://placehold.co/640x480/cccccc/333333)"

// Avatar cuadrado con iniciales
mock.image.placeholder({ width: 150, height: 150, text: "DR", bgColor: "007bff", textColor: "ffffff" }) 
// "[https://placehold.co/150x150/007bff/ffffff?text=DR](https://placehold.co/150x150/007bff/ffffff?text=DR)"
```

### `photo(options?)`
Genera una URL hacia una fotografía realista aleatoria (cortesía de *picsum.photos*). 

*✨ Magia de Faker-Mini: Las imágenes generadas respetan la semilla (`seed`) de tu instancia. Si configuras un seed global, la misma "foto aleatoria" aparecerá siempre en la misma posición, evitando que tu interfaz salte o cambie entre recargas durante el desarrollo.*

- **options** (Object): Configuración opcional.
  - `width` (Number): Ancho en píxeles. (Defecto: `640`).
  - `height` (Number): Alto en píxeles. (Defecto: `480`).

```javascript
// Foto genérica
mock.image.photo() 
// "[https://picsum.photos/seed/49214/640/480](https://picsum.photos/seed/49214/640/480)"

// Foto apaisada para banner
mock.image.photo({ width: 1200, height: 400 }) 
// "[https://picsum.photos/seed/18293/1200/400](https://picsum.photos/seed/18293/1200/400)"
```
