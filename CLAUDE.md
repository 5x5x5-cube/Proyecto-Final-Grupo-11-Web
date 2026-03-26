# TravelHub Prototype

## Design System Rules

- **Use Material 3 (M3) design UI kit components** with our custom color palette defined in `src/design-system/theme/palette.ts`
- **Prefer creating reusable components** in `src/design-system/components/` — avoid duplicating UI patterns across pages
- **Update the Design System showcase page** at `src/design-system/pages/DesignSystemPage.tsx` whenever a new reusable component is added to the design system
- The MUI theme is configured at `src/design-system/theme/theme.ts` using our palette tokens (primary, surface, onSurface, etc.)
- **Never use inline `style={}` props** — always use MUI's `sx` prop for styling. Inline styles bypass the theme and are harder to maintain

## Project Structure

- Web traveler pages: `src/travelers/pages/`
- Mobile pages: `src/mobile/pages/`
- Hotel admin pages: `src/hotels/pages/`
- Design system: `src/design-system/` (components, layouts, theme, pages)
- Routes: `src/router.tsx`

## Loading States (Skeletons)

- Use MUI's `<Skeleton>` component (`@mui/material`) with `animation="wave"` for shimmer effects
- Skeleton files use the `.skeleton.tsx` suffix and live next to their page (e.g., `ResultsPage.skeleton.tsx` next to `ResultsPage.tsx`)
- Skeleton layouts must match the real content layout to avoid layout shifts
- Loading state pattern: `useState(true)` + `useEffect` with `setTimeout` to simulate API delay (1200ms default)
- Always-visible elements (nav, tabs, filter bars) render immediately; only data-dependent content shows skeletons

## Form Validation

- Use MUI `TextField` with `error` and `helperText` props for inline validation
- Track touched state per field — only show errors after blur (not while typing)
- Email validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password: minimum 6 characters
- Confirm password: must match password field
- Disable submit buttons until all required fields are valid
- Use `CircularProgress` (size 20, white) inside buttons for loading states
- Payment card number: auto-format groups of 4 digits with spaces
- Payment expiry: auto-format MM/YY, reject month > 12
- Payment CVV: max 3 digits

## Interactive Search

- Use MUI `Popover` anchored to search card fields (not modals) for desktop UX
- Destination: list selection from `mockDestinations`
- Dates: preset date options matching the RN date picker behavior
- Guests: +/- counter (1-10 range)
- Display selected values in the search card fields

## Internationalization (i18n)

- **NEVER hardcode user-facing strings** — all visible text (labels, errors, toasts, placeholders, button text) must use `t()` from `react-i18next`
- Translation files: `src/i18n/locales/{es,en}/travelers.json`, `hotels.json`
- Add new keys to both `es` and `en` locale files when introducing new strings
- **API error messages must NOT be displayed directly to users** — map error codes/status to i18n keys instead (e.g., `409` → `t('errors.roomUnavailable')`, not the raw backend message)

## Error Handling & Toasts

- Use the `useSnackbar()` hook from `src/contexts/SnackbarContext.tsx` for all toast notifications — never add `<Snackbar>` or `<Alert>` directly in pages
- Available methods: `showError(message)`, `showSuccess(message)`, `showSnackbar({ message, severity, duration })`
- All error messages shown to users must come from i18n translation keys

## Pull Requests

- All PRs must follow the template in `.github/PULL_REQUEST_TEMPLATE.md`
- Every PR must include:
  - **Ticket**: link to the related ticket/issue
  - **Descripción**: brief description of the changes
  - **Cambios realizados**: bullet list of specific changes made
- Write PR descriptions in Spanish
- Use conventional commit format for PR titles in English: `type(scope): description`
