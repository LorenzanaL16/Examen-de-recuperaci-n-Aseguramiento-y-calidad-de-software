# Pruebas automatizadas de SauceDemo

Proyecto de aseguramiento de calidad que automatiza pruebas end-to-end de [SauceDemo](https://www.saucedemo.com/) con Playwright y TypeScript. Valida el inicio de sesión, el catálogo, el carrito y el proceso de compra; además, documenta defectos reproducibles con `problem_user`.

## Tecnologías

- Node.js y npm
- TypeScript
- Playwright Test
- GitHub Actions

## Requisitos

- Node.js LTS
- npm

## Instalación

Clona el repositorio y ejecuta:

```bash
npm ci
npx playwright install chromium firefox
```

## Estructura del proyecto

```text
.github/workflows/  Automatización de smoke tests en GitHub Actions
docs/               Reporte de defectos conocidos
fixtures/           Fixtures compartidos de Playwright
pages/              Page Objects de las páginas de SauceDemo
test-data/          Usuarios, productos y datos esperados
tests/              Pruebas de login, catálogo, carrito, compra y defectos
capturas/           Evidencias del reporte y de GitHub Actions
```

## Usuarios de prueba

Los usuarios y datos de prueba están definidos en [`test-data/data.ts`](test-data/data.ts). Por ejemplo:

- `standard_user`: flujos normales.
- `locked_out_user`: validación de usuario bloqueado.
- `problem_user`: reproducción de los defectos documentados.

La contraseña de demostración es `secret_sauce`.

## Ejecución de pruebas

| Comando | Descripción |
| --- | --- |
| `npm test` | Ejecuta todas las pruebas en Chromium y Firefox. |
| `npm run test:smoke` | Ejecuta las pruebas etiquetadas como `@smoke`. |
| `npx playwright test --grep "@regression"` | Ejecuta las pruebas de regresión. |
| `npx playwright test --grep "@defecto"` | Ejecuta las pruebas de defectos conocidos. |
| `npx playwright test --project=chromium` | Ejecuta las pruebas solo en Chromium. |
| `npx playwright test --project=firefox` | Ejecuta las pruebas solo en Firefox. |
| `npx tsc --noEmit` | Comprueba los tipos de TypeScript sin generar archivos. |
| `npm run report` | Abre el reporte HTML de Playwright de la última ejecución. |

La suite completa contiene 25 pruebas por navegador (50 en total, con la configuración actual).

## Pruebas de defectos conocidos

Las pruebas de `@defecto` comprueban comportamientos defectuosos reproducibles con `problem_user`. Están marcadas con `test.fail()` para que Playwright registre esos fallos previstos como esperados. Si un defecto deja de reproducirse, la prueba puede reportarse como un pase inesperado y requerir revisión.

## Cobertura

- **RF1 — Inicio y cierre de sesión:** acceso válido, usuario bloqueado, credenciales incorrectas o vacías, acceso sin sesión y cierre de sesión.
- **RF2 — Catálogo:** productos, nombres, precios, orden inicial y las cuatro opciones de ordenamiento.
- **RF3 — Carrito:** agregar y quitar productos, insignia, contenido, cantidades, precios y regreso al catálogo.
- **RF4 — Compra:** validación de campos, subtotal, impuesto, total, confirmación y limpieza del carrito.
- **RF5 — Defectos conocidos:** imágenes repetidas, ordenamiento Z–A, producto que no se agrega y alteración del campo First Name.

## Defectos documentados

El detalle de cada defecto —pasos de reproducción, resultado esperado y obtenido, severidad y prioridad— está en [`docs/defectos.md`](docs/defectos.md).

| ID | Resumen |
| --- | --- |
| DEF-001 | Los productos muestran imágenes repetidas con `problem_user`. |
| DEF-002 | El ordenamiento Name (Z to A) no reordena el catálogo. |
| DEF-003 | Sauce Labs Bolt T-Shirt no se agrega al carrito. |
| DEF-004 | El formulario altera el campo First Name durante el checkout. |

Las pruebas automatizadas relacionadas están en [`tests/defectos.spec.ts`](tests/defectos.spec.ts).

## Evidencias

- [Reporte general](capturas/reporte-general.png.jpeg)
- [Detalle DEF-001](capturas/detalle-defecto.png.jpeg)
- [GitHub Actions](capturas/github-actions.png%202.png)

## Integración continua

El workflow [`playwright.yml`](.github/workflows/playwright.yml) ejecuta los smoke tests de Chromium al hacer push. También publica el reporte HTML como artefacto de la ejecución.

La integración continua ejecuta el subconjunto `@smoke`; para ejecutar la suite completa en ambos navegadores, usa `npm test`.
