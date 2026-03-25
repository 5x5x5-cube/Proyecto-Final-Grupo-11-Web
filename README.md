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

| Ruta | Página |
|------|--------|
| `/` | Home — búsqueda y destinos destacados |
| `/login` | Inicio de sesión |
| `/results` | Resultados de búsqueda con filtros |
| `/property/:id` | Detalle de propiedad |
| `/checkout/cart` | Carrito de reserva |
| `/checkout/payment` | Método de pago |
| `/checkout/confirmation` | Confirmación de reserva |
| `/reservations` | Mis reservas |
| `/reservations/:id` | Detalle de reserva (con modales de confirmación y cancelación) |

## Portal de Administración Hotelera

| Ruta | Página |
|------|--------|
| `/hotel/login` | Inicio de sesión del hotel |
| `/hotel/dashboard` | Dashboard con estadísticas y reservas recientes |
| `/hotel/reservations` | Gestión de reservas |
| `/hotel/reservations/:id` | Detalle de reserva del huésped |
| `/hotel/rates` | Gestión de tarifas |
| `/hotel/discounts` | Gestión de descuentos |
| `/hotel/reports` | Reportes de ingresos |

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
