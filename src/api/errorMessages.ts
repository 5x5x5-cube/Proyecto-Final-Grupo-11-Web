/**
 * Maps API error status codes to i18n translation keys.
 * Pages should never display raw backend messages to users.
 */

const BOOKING_ERROR_KEYS: Record<number, string> = {
  409: 'propertyDetail.booking.errors.roomUnavailable',
  503: 'propertyDetail.booking.errors.serviceBusy',
};

const DEFAULT_ERROR_KEY = 'propertyDetail.booking.errors.generic';

export function getBookingErrorKey(error: unknown): string {
  const status = (error as { status?: number })?.status;
  if (status && BOOKING_ERROR_KEYS[status]) {
    return BOOKING_ERROR_KEYS[status];
  }
  return DEFAULT_ERROR_KEY;
}
