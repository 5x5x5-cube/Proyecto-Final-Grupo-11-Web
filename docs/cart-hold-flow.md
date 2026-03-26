# Cart + Hold Flow — Implementation Plan

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

> El nuevo sistema implementará un **"carrito provisional" con un hold de 15 minutos**, lo que significa que tan pronto alguien selecciona una habitación, esa habitación se reserva temporalmente solo para ese usuario.

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

## Target flow

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

---

## Implementation Plan

### Phase 1 — cart_service: Cart + Hold integration

**Service:** `services/cart_service/` (currently scaffold only — health endpoint)

The cart_service owns the cart lifecycle and orchestrates holds via the inventory_service.

| Task                  | Description                                                                                                                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cart model            | Create `Cart` SQLAlchemy model: `id`, `user_id`, `room_id`, `hotel_id`, `check_in`, `check_out`, `guests`, `hold_id` (from inventory), `hold_expires_at`, `created_at`, `updated_at`. Single active cart per user.                                                      |
| `PUT /api/v1/cart`    | Upsert cart for authenticated user. Calls inventory_service `POST /holds` to create a 15-min hold. If user already has a cart with a different room, release old hold first. Stores `hold_id` + `hold_expires_at`. Returns cart with price breakdown + `holdExpiresAt`. |
| `GET /api/v1/cart`    | Return current cart + `holdExpiresAt`. If hold expired, return `410 Gone` (or empty cart). Enrich response with hotel/room details from inventory.                                                                                                                      |
| `DELETE /api/v1/cart` | Release hold in inventory_service, delete cart record.                                                                                                                                                                                                                  |
| Idempotency           | `PUT /cart` with same user + same room + same dates → return existing cart/hold without creating a new one.                                                                                                                                                             |
| Price calculation     | Cart response includes `subtotal`, `vat`, `tourismTax`, `serviceFee`, `total` — calculated server-side based on room price, nights, and country tax rules.                                                                                                              |
| Inventory client      | HTTP client to call inventory_service: `POST /holds`, `DELETE /holds/{id}`, `GET /holds/check/{room_id}`.                                                                                                                                                               |
| Tests                 | Cart creation, hold integration, idempotency, replacement, expiry handling.                                                                                                                                                                                             |

### Phase 2 — inventory_service: Hold adjustments

**Service:** `services/inventory_service/` (already implemented — holds, availability)

| Task                 | Description                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Hold-per-user upsert | If `POST /holds` is called and user already has a hold on a different room, release the old hold automatically before creating the new one. |
| Hold expiry response | `GET /holds/check/{room_id}` should return `hold_expires_at` in the response so cart_service can store and forward it.                      |
| Cleanup task         | Already exists — expires holds + associated bookings. Needs to also notify cart_service (or cart_service polls) when holds expire.          |

### Phase 3 — payment_service: Payment creates booking

**Service:** `services/payment_service/` (currently scaffold only — health endpoint)

| Task                    | Description                                                                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /api/v1/payments` | Accepts `cart_id` + payment details (card token, method). Validates cart has active hold. Processes payment (Stripe/mock). On success: calls booking_service to create booking, clears cart, converts hold to confirmed reservation. Returns booking data. |
| Payment failure         | Hold stays active — user can retry within the 15 min. Return error with `holdExpiresAt` so frontend knows how much time is left.                                                                                                                           |
| Idempotency key         | Prevent double-charge on network retry. Use request idempotency key (header) to deduplicate.                                                                                                                                                               |
| Tests                   | Payment success → booking created, payment failure → hold preserved, idempotency, expired hold rejection.                                                                                                                                                  |

### Phase 4 — booking_service: Remove from checkout flow

**Service:** `services/booking_service/` (currently creates hold + booking in one call)

| Task                                   | Description                                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Internal-only booking creation         | `POST /bookings` is no longer called by clients during checkout. It becomes an internal API called by payment_service after successful payment.    |
| Remove hold creation from booking flow | Booking_service no longer calls inventory_service to create holds — that's cart_service's job now. Booking just records the confirmed reservation. |
| Booking status                         | Bookings are created with `status=confirmed` (not `pending`). No more pending bookings.                                                            |
| Keep existing booking APIs             | `GET /bookings`, `GET /bookings/{id}`, `POST /bookings/{id}/cancel` remain as-is for post-checkout.                                                |

### Phase 5 — gateway_service: Route cart + payment

**Service:** `services/gateway_service/`

| Task               | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| Add cart routes    | `/api/v1/cart` → `cart_service` (PUT, GET, DELETE)                             |
| Add payment routes | `/api/v1/payments` → `payment_service` (POST)                                  |
| Auth middleware    | Cart and payment endpoints require authenticated user (JWT from auth_service). |

### Phase 6 — Web client changes

**Repo:** `Proyecto-Final-Grupo-11-Web`

| Task                   | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useSetCart` hook      | Already exists (`PUT /cart`). Update to handle `holdExpiresAt` in response.                                                                                                                                  |
| `useCart` hook         | Already exists (`GET /cart`). Update Cart type to include `holdExpiresAt`. Handle `410 Gone` (hold expired).                                                                                                 |
| PropertyDetailPage     | "Reservar" already calls `PUT /cart`. No change needed — just benefits from backend now creating the hold.                                                                                                   |
| CartPage               | Add countdown timer component showing time remaining (`holdExpiresAt - now`). On expiry, show modal "Tu reserva expiró" and redirect. Remove `useCreateBooking` call — "Pagar" goes directly to PaymentPage. |
| PaymentPage            | Instead of paying against a booking, call `POST /payments` with `cartId` + card details. On success, receive booking data and navigate to ConfirmationPage.                                                  |
| ConfirmationPage       | Receives booking from payment response (booking now exists). No changes to UI.                                                                                                                               |
| Error handling         | Cart expired (410) → redirect to property detail with toast. Payment failed → stay on PaymentPage, show error, user retries. Room taken (409 on PUT /cart) → show "habitación no disponible" toast.          |
| Optimistic persistence | Save cart selection to localStorage on "Reservar" click. On page load, check localStorage vs server cart. Sync in background.                                                                                |

### Phase 7 — Mobile client changes

**Repo:** `Proyecto-Final-Grupo-11-Mobile`

| Task             | Description                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Same flow as web | Mirror the web changes: `PUT /cart` on room selection, countdown timer, `POST /payments` on pay, booking from response. |
| Offline cart     | Save cart to AsyncStorage. Sync when connection is available.                                                           |

---

## Edge cases

- **User closes tab, comes back** → `GET /cart` checks if hold is still valid. If expired, show "tu reserva expiró" and clear cart.
- **User picks different room** → `PUT /cart` releases old hold, creates new one. If new hold fails (room taken by someone else), show error, keep old cart.
- **Same user, same room** → idempotent: return existing cart/hold.
- **Two users, same room** → second `PUT /cart` gets 409 (room held by another user).
- **Hold expires while on CartPage** → frontend countdown reaches 0, show expiry modal, redirect to property detail.
- **Payment fails** → hold is still active (user can retry within the 15 min). Cart is not cleared.
- **Payment succeeds** → booking is created, hold is converted to confirmed reservation, cart is cleared.
