import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

/**
 * Admin-only payment hooks (HU4.4).
 *
 * Kept in their own file to separate them from the user-facing payment hooks
 * (`usePayments.ts`) which deal with tokenization and the buyer's payment
 * lifecycle.
 */

export interface PaymentsSummaryParams {
  /** ISO datetime string, e.g. "2026-01-01T00:00:00". */
  dateFrom?: string;
  dateTo?: string;
}

export interface PaymentsSummary {
  totalProcessed: number;
  totalDeclined: number;
  totalRefunded: number;
  /** approved / (approved + declined), in 0..1. */
  approvalRate: number;
  transactionCount: number;
  approvedCount: number;
  declinedCount: number;
  refundedCount: number;
  processingCount: number;
  currency: string;
}

export function usePaymentsSummary(params: PaymentsSummaryParams = {}) {
  // Build a stable params object — undefined keys would otherwise mismatch
  // react-query's cache key between renders.
  const queryParams: Record<string, string> = {};
  if (params.dateFrom) queryParams.dateFrom = params.dateFrom;
  if (params.dateTo) queryParams.dateTo = params.dateTo;

  return useQuery<PaymentsSummary>({
    queryKey: ['payments', 'admin', 'summary', queryParams],
    queryFn: () =>
      httpClient.get<PaymentsSummary>('/payments/summary', {
        params: queryParams,
      }),
  });
}
