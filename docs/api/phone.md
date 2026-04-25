# Módulo: Phone 📞

Generación de números telefónicos y datos de dispositivos móviles con soporte para marcado local o internacional.

## Métodos

### `number(options?)`
Genera un número telefónico siguiendo el patrón oficial del `locale` configurado, con la posibilidad de personalizar su salida.

- **options**: Un objeto de configuración opcional.
  - `style` (String): Puede ser `'international'` (por defecto, incluye código de país) o `'national'` (solo el número local).
  - `format` (String): Permite forzar un patrón visual usando el símbolo `#` para los números.

```javascript
// Uso por defecto (internacional, basado en el locale es_AR)
mock.phone.number() 
// "+54 9 4432-1109"

// Estilo nacional (sin código de país)
mock.phone.number({ style: 'national' }) 
// "9 1234-5678"

// Forzar un formato visual específico (muy útil para testing de inputs en el frontend)
mock.phone.number({ format: '(###) ###-####', style: 'national' }) 
// "(011) 456-7890"
```

### `imei()`
Genera un número IMEI (International Mobile Equipment Identity) de 15 dígitos con el formato visual estándar (`AA-BBBBBB-CCCCCC-D`). 

Es una herramienta fantástica si estás mockeando una aplicación móvil, un inventario de tecnología o un e-commerce de celulares.

```javascript
mock.phone.imei() // "99-123456-789012-3"
```
