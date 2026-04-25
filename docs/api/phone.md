
# Módulo: Phone 📞

Generación de números telefónicos con formato y código de país real.

## Métodos

### `number()`
Genera un número telefónico siguiendo el patrón oficial del locale.

```javascript
// es_AR (+54 9 ####-####)
mock.phone.number() // "+54 9 4432-1109"

// en_US (+1 ###-###-####)
mock.phone.number() // "+1 555-123-4567"
```
::: info Nota
Los formatos son precisos y respetan la estructura de marcado de cada región configurada.
:::


---