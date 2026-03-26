# Cart + Hold Flow — Findings & Future Implementation

## Source

Based on the project statement (`docs/statement.pdf`), section **"Sistema de Reserva y Carrito de Compra"**.

## Core concept

**Cart = Hold. Booking = result of successful payment.**

During checkout, we talk about **carts**, not bookings. A cart holds a listing (room + dates) for 15 minutes while the user completes payment. A booking is only created after the payment succeeds.

- No booking exists during checkout — only a cart with an active hold
- If the cart expires (15 min), the listing is released back to availability
- If the user re-enters checkout with the same listing, idempotency returns the existing cart/hold
- If the user selects a different listing, the previous hold is released and a new cart/hold is created

## What the statement requires

> El nuevo sistema implementará un **"carrito provisional" con un hold de 15 minutos**, lo que significa que tan pronto alguien selecciona una habitación, esa habitación se reserva temporalmente solo para ese usuario. Esto previene el problema actual de overbooking donde dos usuarios diferentes reservan la misma habitación simultáneamente.

Key points:

- **Hold starts on room selection**, not on payment confirmation
- **Optimistic persistence**: changes saved locally in the browser, synced to server in background
- **On confirm**: system calculates tariff (dynamic discounts), local taxes per country, cancellation policies

## Current implementation (PFG1-47)

```
PropertyDetailPage → "Reservar" → PUT /cart (saves selection, no hold)
→ CartPage (review) → "Continuar al pago" → POST /bookings (creates hold + booking BEFORE payment)
→ PaymentPage → pays against existing booking
```

Problems:

- Booking is created before payment — backwards
- No hold at cart time — another user could take the room while reviewing
- Cart is just data storage, not tied to inventory

## Target flow (per statement)

```
PropertyDetailPage → "Reservar" → PUT /cart (creates hold, 15-min timer starts)
→ CartPage (review, shows countdown) → "Pagar" → POST /payments (processes payment against cart)
→ on payment success → booking created automatically
→ ConfirmationPage (booking exists now)
```

### What changes

| Concern                             | Current                              | Target                                      |
| ----------------------------------- | ------------------------------------ | ------------------------------------------- |
| Hold creation                       | At `POST /bookings` (before payment) | At `PUT /cart` (on room selection)          |
| What exists during checkout         | A booking (status=pending)           | A cart with an active hold (no booking yet) |
| Booking creation                    | Before payment                       | After successful payment                    |
| Cart replacement                    | Just overwrites data                 | Release old hold, create new cart/hold      |
| Cart expiry                         | No expiry                            | 15-min TTL, UI shows countdown              |
| User leaves & returns, same listing | Creates duplicate booking (409)      | Idempotent: returns existing cart/hold      |
| User selects different listing      | Orphaned pending booking             | Old hold released, new cart/hold created    |

### Backend changes needed

1. **`PUT /cart`** — creates a hold in inventory service (room_id, user_id, 15-min TTL). If a previous hold exists for this user, release it first. Returns cart with `holdExpiresAt`.
2. **`GET /cart`** — returns cart data + `holdExpiresAt` so frontend can show countdown. If hold expired, return 410 Gone or empty cart.
3. **`POST /payments`** — processes payment against an active cart (not a booking). On success, creates the booking record and returns it.
4. **Remove `POST /bookings` from checkout flow** — bookings are no longer created directly by the client. They are a side effect of successful payment.
5. **Hold replacement** — if user calls `PUT /cart` with a different room, release old hold and create new one atomically.
6. **Idempotency** — `PUT /cart` with same user + same room + same dates returns existing cart/hold without creating a new one.

### Frontend changes needed

1. **CartPage** — show hold countdown timer (e.g., "Tienes 12:34 para completar tu reserva")
2. **CartPage** — handle hold expiry: show "tu reserva expiró" message + redirect to property detail
3. **CartPage** — "Pagar" button triggers payment directly (no intermediate booking step)
4. **Optimistic persistence** — save cart selection to localStorage immediately, sync to server in background (per statement requirement)
5. **PropertyDetailPage** — "Reservar" button creates hold (loading state while hold is created)
6. **ConfirmationPage** — receives booking data from payment response (booking now exists)

### Edge cases

- **User closes tab, comes back** → `GET /cart` checks if hold is still valid. If expired, show "tu reserva expiró" and clear cart.
- **User picks different room** → `PUT /cart` releases old hold, creates new one. If new hold fails (room taken by someone else), show error, keep old cart.
- **Same user, same room** → idempotent: return existing cart/hold (already implemented in inventory service).
- **Two users, same room** → second `PUT /cart` gets 409 (room held by another user).
- **Hold expires while on CartPage** → frontend countdown reaches 0, show expiry modal, redirect to property detail.
- **Payment fails** → hold is still active (user can retry within the 15 min). Cart is not cleared.
- **Payment succeeds** → booking is created, hold is converted to a confirmed reservation, cart is cleared.
