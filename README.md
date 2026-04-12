# TravelHub Prototype

Prototipo de alta fidelidad para la plataforma TravelHub, desarrollado como parte del proyecto final de UX de la Maestría en Ingeniería de Software (Uniandes).

## Stack Tecnológico

- **React 19** + **TypeScript**
- **Material UI (MUI)** con tema personalizado basado en **Material Design 3**
- **Vite** como bundler
- **React Router** para navegación SPA

## Estructura del Proyecto

```
src/
├── design-system/         # Sistema de diseño reutilizable
│   ├── components/        # Componentes atómicos (Brand, StatusChip, RatingBadge, etc.)
│   ├── layouts/           # Layouts compartidos (TravelerLayout, HotelAdminLayout, CheckoutLayout)
│   ├── pages/             # Página showcase del design system
│   └── theme/             # Palette de colores y tema MUI
├── travelers/             # Portal del viajero
│   ├── data/              # Datos mock (hoteles, destinos, reservas)
│   └── pages/             # Páginas del flujo del viajero
└── hotels/                # Portal de administración hotelera
    ├── data/              # Datos mock (dashboard, reservas, tarifas)
    └── pages/             # Páginas del panel de administración
```

## Portal del Viajero

| Ruta                     | Página                                                         |
| ------------------------ | -------------------------------------------------------------- |
| `/`                      | Home — búsqueda y destinos destacados                          |
| `/login`                 | Inicio de sesión                                               |
| `/results`               | Resultados de búsqueda con filtros                             |
| `/property/:id`          | Detalle de propiedad                                           |
| `/checkout/cart`         | Carrito de reserva                                             |
| `/checkout/payment`      | Método de pago                                                 |
| `/checkout/confirmation` | Confirmación de reserva                                        |
| `/reservations`          | Mis reservas                                                   |
| `/reservations/:id`      | Detalle de reserva (con modales de confirmación y cancelación) |

## Portal de Administración Hotelera

| Ruta                      | Página                                          |
| ------------------------- | ----------------------------------------------- |
| `/hotel/login`            | Inicio de sesión del hotel                      |
| `/hotel/dashboard`        | Dashboard con estadísticas y reservas recientes |
| `/hotel/reservations`     | Gestión de reservas                             |
| `/hotel/reservations/:id` | Detalle de reserva del huésped                  |
| `/hotel/rates`            | Gestión de tarifas                              |
| `/hotel/discounts`        | Gestión de descuentos                           |
| `/hotel/reports`          | Reportes de ingresos                            |

## Design System

Disponible en `/design-system`. Incluye:

- Paleta de colores completa (Material Design 3)
- Tipografía (Heading, Subheading, Body, Caption, Label)
- Componentes: Brand, StatusChip, RatingBadge, AmenityTag, SectionCard, InfoGrid, PriceBreakdown, FilterChip, SearchField, Inputs, Buttons, ModalOverlay

## Instalación y Desarrollo

```bash
yarn install
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Build

```bash
yarn build
```

## Testing

### Unit Tests (Vitest)

```bash
yarn test            # ejecución única
yarn test:watch      # modo watch
yarn test:ci         # con cobertura (usado en CI)
```

### E2E Tests (Playwright)

```bash
yarn build && yarn test:e2e      # correr contra build local
yarn test:e2e:ui                 # modo UI interactivo (requiere build previo)
```

**En CI:**

- Los tests e2e **no corren automáticamente** — comenta `/run-e2e` en un PR para ejecutarlos
- El workflow construye la app, corre los tests, y comenta el resultado en el PR

**Tests con backend:**

- Configura la variable de repositorio `E2E_BACKEND_URL` en GitHub (Settings → Variables) con la URL del backend
- Tests que dependen del backend usan `test.skip(!hasBackend)` y se omiten automáticamente si el backend no está disponible
- Para correr localmente con backend: `E2E_BACKEND_URL=https://... yarn test:e2e`

**Escribir nuevos tests:**

- Importar `test` y `expect` desde `e2e/fixtures.ts` (no desde `@playwright/test`)
- Crear page objects en `e2e/pages/*.page.ts`
- Tests que necesitan backend: agregar `test.skip(!hasBackend, 'Requires backend')` como primera línea
