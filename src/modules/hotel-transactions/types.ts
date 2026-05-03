import type { PaymentStatus, PaymentMethodType } from '@/api/hooks/useAdminPayments';

/**
 * Filter state for the admin transactions view.
 *
 * Maps directly to the backend query string of GET /payments and
 * GET /payments/summary. All fields are optional — an empty filter set
 * means "give me everything".
 */
export interface TransactionsFilters {
  status?: PaymentStatus;
  method?: PaymentMethodType;
  /** ISO date (YYYY-MM-DD) from the date input — translated to a datetime upstream. */
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
}

export const EMPTY_FILTERS: TransactionsFilters = {};
