# Módulo: Date 📅

Generación de fechas aleatorias y formateo localizado. Este módulo tiene en cuenta el idioma (`locale`) configurado para traducir automáticamente los meses y los días.

## Formateo
El método `format` utiliza un motor optimizado con expresiones regulares para reemplazar los siguientes tokens:

| Token | Descripción | Ejemplo |
| --- | --- | --- |
| `YYYY` | Año de 4 dígitos | 2026 |
| `YY` | Año de 2 dígitos | 26 |
| `MMMM` | Nombre del mes completo | Abril |
| `MMM` | Nombre del mes abreviado | Abr |
| `MM` | Mes numérico con ceros iniciales | 04 |
| `M` | Mes numérico simple | 4 |
| `dddd` | Día de la semana completo | Jueves |
| `ddd` | Día de la semana abreviado | Jue |
| `DD` | Día del mes con ceros iniciales | 05 |
| `D` | Día del mes simple | 5 |
| `HH` | Horas (formato 24h) | 14 |
| `mm` | Minutos | 30 |
| `ss` | Segundos | 45 |

---

## Métodos Generales

### `format(date, pattern)`
Aplica un formato de texto a un objeto `Date` o a un string de fecha válido. Los caracteres que no son tokens (como espacios, comas o la palabra "de") se mantienen intactos.

```javascript
mock.date.format(new Date(), "dddd, D de MMMM de YYYY - HH:mm") 
// "Sábado, 25 de Abril de 2026 - 11:25"
```
### `month(options?)`

Devuelve el nombre de un mes al azar, traducido según el locale.

* options: { format: 'long' | 'short' }

```javascript
mock.date.month() // "Septiembre"
    
mock.date.month({ format: 'short' }) // "Sep"
```
### `weekday(options?)`

Devuelve un día de la semana al azar, traducido según el locale.

* options: { format: 'long' | 'short' }

```javascript
mock.date.weekday() // "Miércoles"
    
mock.date.weekday({ format: 'short' }) // "Mié"
```
### `year(options?)`

Devuelve un año aleatorio en formato numérico.

* options: { min, max } (Por defecto, de 1970 al año actual).

```javascript
mock.date.year() // 1998

mock.date.year({ min: 2020, max: 2026 }) // 2024
```
## Métodos de Tiempo Aleatorio

Todas estas funciones devuelven un objeto Date nativo de JavaScript.
### `between(from, to)`

Genera una fecha y hora exacta que se encuentra entre dos fechas especificadas.
```javascript
mock.date.between('2020-01-01', '2026-12-31')
    // 2023-08-14T18:45:10.000Z
```
### `past(years?, refDate?)`

Genera una fecha en el pasado. Útil para simular fechas de creación o registros antiguos.

* years: Cuántos años hacia atrás como máximo (defecto: 1).

* refDate: Fecha de referencia (defecto: ahora).

```javascript
mock.date.past() // Fecha aleatoria del último año

mock.date.past(5) // Fecha aleatoria de los últimos 5 años
```
### `future(years?, refDate?)`

Genera una fecha en el futuro. Ideal para fechas de vencimiento o reservas.

* years: Cuántos años hacia adelante como máximo (defecto: 1).

* refDate: Fecha de referencia (defecto: ahora).

```javascript
mock.date.future() // Fecha aleatoria dentro del próximo año

mock.date.future(2) // Fecha aleatoria de acá a 2 años
```
### `recent(days?, refDate?)`

Genera una fecha reciente en el pasado. Pensado para simular últimos accesos o notificaciones.

* days: Cuántos días hacia atrás como máximo (defecto: 7).

* refDate: Fecha de referencia (defecto: ahora).

```javascript
mock.date.recent() // Algún momento de los últimos 7 días
    
mock.date.recent(2) // Algún momento de las últimas 48 horas
```
### `birthdate(options?)`

Genera una fecha de nacimiento lógica para una persona, calculada restando años a la fecha actual.

* options: { minAge, maxAge } (Por defecto, entre 18 y 80 años).

```javascript
mock.date.birthdate({ minAge: 25, maxAge: 35 }) // Fecha de un millennial

mock.date.birthdate() // Fecha de alguien que tiene entre 18 y 80 años
```
