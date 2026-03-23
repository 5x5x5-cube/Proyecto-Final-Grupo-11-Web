# TravelHub Prototype

## Design System Rules

- **Use Material 3 (M3) design UI kit components** with our custom color palette defined in `src/design-system/theme/palette.ts`
- **Prefer creating reusable components** in `src/design-system/components/` — avoid duplicating UI patterns across pages
- **Update the Design System showcase page** at `src/design-system/pages/DesignSystemPage.tsx` whenever a new reusable component is added to the design system
- The MUI theme is configured at `src/design-system/theme/theme.ts` using our palette tokens (primary, surface, onSurface, etc.)

## Project Structure

- Web traveler pages: `src/travelers/pages/`
- Mobile pages: `src/mobile/pages/`
- Hotel admin pages: `src/hotels/pages/`
- Design system: `src/design-system/` (components, layouts, theme, pages)
- Routes: `src/router.tsx`
