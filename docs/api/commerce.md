# Módulo: Commerce 🛒

Generación de datos para e-commerce. Ideal para mockear catálogos de productos, carritos de compras o listados de precios. Adapta la gramática automáticamente según el idioma (inglés o español).

## Nombres y Categorías

### `productName()`
Genera el nombre de un producto combinando el tipo de artículo, el material y un adjetivo. 

```javascript
mock.commerce.productName() // "Silla de Madera Ergonómica"
```

### `department()`
Devuelve una categoría de tienda aleatoria.

```javascript
mock.commerce.department() // "Electrónica"
```

### `productMaterial()` & `productAdjective()`
Devuelven las partes sueltas de un producto por si necesitas armar filtros o etiquetas (tags) en tu interfaz.

```javascript
mock.commerce.productMaterial() // "Acero"
mock.commerce.productAdjective() // "Portátil"
```

---

## Precios y Stock

### `price(options?)`
Genera un precio aleatorio con formato de moneda.
- **options**: Un objeto de configuración opcional.
  - `min`: Precio mínimo (Defecto: `10`).
  - `max`: Precio máximo (Defecto: `5000`).
  - `decimals`: Cantidad de decimales (Defecto: `2`).
  - `symbol`: Símbolo de la moneda (Defecto: `"$"`).

```javascript
// Uso por defecto
mock.commerce.price() 
// "$1450.50"

// Precio en Euros sin decimales
mock.commerce.price({ min: 100, max: 200, decimals: 0, symbol: "€" }) 
// "€154"
```

### `sku()`
Genera un código SKU (Stock Keeping Unit), muy útil para simular identificadores visuales en paneles de administración. Combina la categoría del producto con un número aleatorio.

```javascript
mock.commerce.sku() // "ELE-49102" (De Electrónica)
mock.commerce.sku() // "JUG-99214" (De Juguetes)
```
