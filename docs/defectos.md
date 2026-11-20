# Reporte de Defectos — Sauce Demo (`problem_user`)

## DEF-001: Todos los productos muestran la misma imagen en el catálogo
* **Identificador:** DEF-001
* **Título:** Imágenes duplicadas en todos los productos del catálogo al iniciar sesión con `problem_user`
* **Ambiente:** Windows 11, Chromium / Firefox (Playwright), https://www.saucedemo.com/inventory.html
* **Pasos para reproducir:**
  1. Navegar a `https://www.saucedemo.com/`.
  2. Iniciar sesión con el usuario `problem_user` y la contraseña `secret_sauce`.
  3. Observar las imágenes mostradas para los 6 productos del catálogo.
* **Resultado esperado:** Cada uno de los 6 productos debe mostrar su imagen correspondiente y distinta.
* **Resultado obtenido:** Todos los productos del catálogo muestran la misma imagen repetida.
* **Evidencia:** Prueba automatizada `DEF-001` en `tests/defectos.spec.ts` (`@defecto`), captura adjunta en el reporte HTML y captura en `capturas/`.
* **Severidad:** Media
* **Prioridad:** Media
* **Frecuencia:** Siempre (100% de las ejecuciones con `problem_user`)

---

## DEF-002: Ordenar por «Name (Z to A)» no invierte la lista de productos
* **Identificador:** DEF-002
* **Título:** El selector de ordenamiento `Name (Z to A)` no reordena los productos con `problem_user`
* **Ambiente:** Windows 11, Chromium / Firefox (Playwright), https://www.saucedemo.com/inventory.html
* **Pasos para reproducir:**
  1. Iniciar sesión con `problem_user` y `secret_sauce`.
  2. Abrir el selector de ordenamiento del catálogo y elegir `Name (Z to A)` (`za`).
  3. Verificar el orden de los nombres de los productos mostrados.
* **Resultado esperado:** Los productos deben ordenarse de la Z a la A, comenzando por `Test.allTheThings() T-Shirt (Red)` y terminando en `Sauce Labs Backpack`.
* **Resultado obtenido:** El catálogo mantiene el orden inicial sin cambiar, comenzando por `Sauce Labs Backpack`.
* **Evidencia:** Prueba automatizada `DEF-002` en `tests/defectos.spec.ts` (`@defecto`), captura adjunta en el reporte HTML y captura en `capturas/`.
* **Severidad:** Media
* **Prioridad:** Media
* **Frecuencia:** Siempre (100% de las ejecuciones con `problem_user`)

---

## DEF-003: El botón «Add to cart» de «Sauce Labs Bolt T-Shirt» no agrega el producto
* **Identificador:** DEF-003
* **Título:** Pulsar `Add to cart` en `Sauce Labs Bolt T-Shirt` no actualiza el botón ni la insignia del carrito con `problem_user`
* **Ambiente:** Windows 11, Chromium / Firefox (Playwright), https://www.saucedemo.com/inventory.html
* **Pasos para reproducir:**
  1. Iniciar sesión con `problem_user` y `secret_sauce`.
  2. Localizar el producto `Sauce Labs Bolt T-Shirt` en el catálogo.
  3. Hacer clic en su botón `Add to cart`.
* **Resultado esperado:** El botón debe cambiar a `Remove` y la insignia del carrito debe mostrar `1`.
* **Resultado obtenido:** El botón no cambia de estado y el carrito no muestra la insignia con el producto agregado.
* **Evidencia:** Prueba automatizada `DEF-003` en `tests/defectos.spec.ts` (`@defecto`), captura adjunta en el reporte HTML y captura en `capturas/`.
* **Severidad:** Alta
* **Prioridad:** Alta
* **Frecuencia:** Siempre (100% de las ejecuciones con `problem_user`)

---

## DEF-004: El campo de nombre se altera al llenar el formulario de compra
* **Identificador:** DEF-004
* **Título:** Al completar el formulario de compra con `problem_user`, el valor del apellido afecta el campo del nombre
* **Ambiente:** Windows 11, Chromium / Firefox (Playwright), https://www.saucedemo.com/checkout-step-one.html
* **Pasos para reproducir:**
  1. Iniciar sesión con `problem_user` y `secret_sauce`, agregar un producto al carrito, ir a `/cart.html` y pulsar `Checkout`.
  2. Escribir `Ana` en `First Name`, `Perez` en `Last Name` y `01001` en `Postal Code`.
  3. Revisar los valores contenidos en los campos `First Name` y `Last Name`.
* **Resultado esperado:** `First Name` debe conservar `Ana` y `Last Name` debe conservar `Perez`.
* **Resultado obtenido:** El campo del nombre queda con `Perez` (o no conserva `Ana` como se espera en el flujo normal).
* **Evidencia:** Prueba automatizada `DEF-004` en `tests/defectos.spec.ts` (`@defecto`), captura adjunta en el reporte HTML y captura en `capturas/`.
* **Severidad:** Alta
* **Prioridad:** Alta
* **Frecuencia:** Siempre (100% de las ejecuciones con `problem_user`)