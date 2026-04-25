# Módulo: Date 📅

Generación de fechas aleatorias y formateo localizado.

## Formateo
El método `format` utiliza tokens para personalizar la salida.

| Token | Descripción | Ejemplo |
| --- | --- | --- |
| `dddd` | Día de la semana completo | Lunes |
| `MMMM` | Nombre del mes completo | Abril |
| `YYYY` | Año completo | 2026 |
| `HH:mm` | Horas y minutos | 14:30 |

## Métodos

### `format(date, pattern)`
Aplica un formato a una fecha dada.

```javascript
mock.date.format(new Date(), "dddd, D [de] MMMM") 
// "Viernes, 24 de Abril"

```
### `past(years?)`
Genera una fecha en el pasado.

```javascript
mock.date.past(2) // Una fecha de hace máximo 2 años
```
### `birthdate(options?)`
Genera una fecha de nacimiento lógica.
```javascript

mock.date.birthdate({ minAge: 18, maxAge: 30 })
```
---