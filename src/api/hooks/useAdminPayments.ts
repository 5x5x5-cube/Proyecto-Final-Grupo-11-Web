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

// ── Listing ──

export type PaymentStatus = 'approved' | 'declined' | 'processing' | 'refunded';
export type PaymentMethodType = 'credit_card' | 'debit_card' | 'digital_wallet' | 'transfer';

export interface PaymentsListParams {
  status?: PaymentStatus;
  method?: PaymentMethodType;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  page?: number;
  pageSize?: number;
}

export interface PaymentListItem {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: string;
  methodLabel: string;
  status: string;
  transactionId: string | null;
  errorCode: string | null;
  createdAt: string;
  processedAt: string | null;
}

export interface PaymentsListResponse {
  items: PaymentListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function usePaymentsList(params: PaymentsListParams = {}) {
  const queryParams: Record<string, string | number> = {};
  if (params.status) queryParams.status = params.status;
  if (params.method) queryParams.method = params.method;
  if (params.dateFrom) queryParams.dateFrom = params.dateFrom;
  if (params.dateTo) queryParams.dateTo = params.dateTo;
  if (params.amountMin !== undefined) queryParams.amountMin = params.amountMin;
  if (params.amountMax !== undefined) queryParams.amountMax = params.amountMax;
  queryParams.page = params.page ?? 1;
  queryParams.pageSize = params.pageSize ?? 20;

  return useQuery<PaymentsListResponse>({
    queryKey: ['payments', 'admin', 'list', queryParams],
    queryFn: () => httpClient.get<PaymentsListResponse>('/payments', { params: queryParams }),
  });
}
