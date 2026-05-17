/**
 * Mirrors `services/booking_service/app/services/cancellation_policy.py`.
 *
 * Keep thresholds in sync with the backend — the UI shows the same numbers
 * the backend will apply when /bookings/{id}/cancel is hit, so the user is
 * never surprised by the actual refund.
 */

export const REFUND_FULL_DAYS = 7;
export const REFUND_PARTIAL_DAYS = 2;

export const REFUND_FULL = 1.0;
export const REFUND_PARTIAL = 0.5;
export const REFUND_NONE = 0.0;

function toUtcMidnight(value: string | Date): Date {
  const d = typeof value === 'string' ? new Date(value) : new Date(value.getTime());
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function daysUntilCheckIn(checkIn: string | Date, today: Date = new Date()): number {
  const checkInDay = toUtcMidnight(checkIn);
  const todayDay = toUtcMidnight(today);
  const ms = checkInDay.getTime() - todayDay.getTime();
  return Math.round(ms / 86_400_000);
}

export function calculateRefundPercentage(
  checkIn: string | Date,
  today: Date = new Date()
): number {
  const delta = daysUntilCheckIn(checkIn, today);
  if (delta > REFUND_FULL_DAYS) return REFUND_FULL;
  if (delta >= REFUND_PARTIAL_DAYS) return REFUND_PARTIAL;
  return REFUND_NONE;
}

export function freeCancellationDeadline(checkIn: string | Date): Date {
  const d = toUtcMidnight(checkIn);
  d.setUTCDate(d.getUTCDate() - REFUND_FULL_DAYS);
  return d;
}

export type CancellationKind = 'free' | 'partial' | 'none';

export function cancellationKind(refundPct: number): CancellationKind {
  if (refundPct >= REFUND_FULL) return 'free';
  if (refundPct > 0) return 'partial';
  return 'none';
}

/** True when the booking is in a status the backend will allow to cancel. */
export function isCancellable(status: string | undefined | null): boolean {
  return status === 'pending' || status === 'confirmed';
}
