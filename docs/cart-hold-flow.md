# Cart + Hold Flow — Findings & Future Implementation

## Source

Based on the project statement (`docs/statement.pdf`), section **"Sistema de Reserva y Carrito de Compra"**.

## What the statement requires

> El nuevo sistema implementará un **"carrito provisional" con un hold de 15 minutos**, lo que significa que tan pronto alguien selecciona una habitación, esa habitación se reserva temporalmente solo para ese usuario. Esto previene el problema actual de overbooking donde dos usuarios diferentes reservan la misma habitación simultáneamente.

Key points:

- **Hold starts on room selection**, not on payment confirmation
- **Optimistic persistence**: changes saved locally in the browser, synced to server in background
- **On confirm**: system calculates tariff (dynamic discounts), local taxes per country, cancellation policies

## Current implementation (PFG1-47)

```
PropertyDetailPage → "Reservar" → PUT /cart (saves selection, no hold)
→ CartPage (review) → "Continuar al pago" → POST /bookings (creates hold + booking)
→ PaymentPage
```

- The hold is created at booking time (step 3), not at cart time (step 1)
- If user leaves after adding to cart but before confirming, no hold exists — another user could take the room
- Cart is ephemeral: `PUT /cart` always replaces the previous selection (single-room)

## Target flow (per statement)

```
PropertyDetailPage → "Reservar" → PUT /cart (creates hold, 15-min timer starts)
→ CartPage (review, shows countdown) → "Confirmar" → POST /bookings (creates booking against existing hold)
→ PaymentPage
```

### What changes

| Concern               | Current                     | Target                                     |
| --------------------- | --------------------------- | ------------------------------------------ |
| Hold creation         | At `POST /bookings`         | At `PUT /cart`                             |
| Hold lifetime         | Starts at booking           | Starts at room selection                   |
| Cart replacement      | Just overwrites data        | Must release old hold, create new one      |
| Cart expiry           | No expiry                   | 15-min TTL, UI shows countdown             |
| Booking creation      | Creates hold + booking      | Only creates booking (hold already exists) |
| User leaves & returns | Cart data persists, no hold | Hold may have expired, need to re-check    |

### Backend changes needed

1. **`PUT /cart`** — after saving cart data, call inventory service to create a hold (room_id, user_id, 15-min TTL). If a previous hold exists for this user, release it first.
2. **`GET /cart`** — include `holdExpiresAt` timestamp so the frontend can show a countdown.
3. **`POST /bookings`** — instead of creating a new hold, validate the existing hold from the cart. If hold expired, return error.
4. **Hold replacement** — if user changes room selection (`PUT /cart` with different room), release the old hold and create a new one atomically.

### Frontend changes needed

1. **CartPage** — show hold countdown timer (e.g., "Tienes 12:34 minutos para completar tu reserva")
2. **CartPage** — handle hold expiry: show message + redirect back to property detail
3. **Optimistic persistence** — save cart selection to localStorage immediately, sync to server in background (per statement requirement)
4. **PropertyDetailPage** — "Reservar" button should show loading while hold is being created

### Edge cases

- **User closes tab, comes back** → `GET /cart` checks if hold is still valid. If expired, show "your reservation expired" message.
- **User picks different room** → `PUT /cart` releases old hold, creates new one. If new hold fails (room taken), show error and keep old cart.
- **Same user, same room** → idempotent: return existing hold (already implemented in inventory service).
- **Two users, same room** → second `PUT /cart` gets 409 (room held by another user).
- **Hold expires while on CartPage** → frontend countdown reaches 0, show expiry modal, redirect.
