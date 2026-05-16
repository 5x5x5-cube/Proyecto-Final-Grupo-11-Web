import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import { getHotelSession } from '@/hotels/auth/hotelSession';

function getHotelHeaders() {
  const session = getHotelSession();
  if (!session?.hotelId) {
    throw new Error('Hotel ID not found in session');
  }
  return {
    'X-Hotel-Id': session.hotelId,
  };
}

export interface MonthlyRevenueParams {
  month: number;
  year: number;
}

export function useMonthlyRevenue(params: MonthlyRevenueParams) {
  return useQuery({
    queryKey: ['reports', 'revenue', 'monthly', params],
    queryFn: () =>
      httpClient.get('/reports/revenue/monthly', {
        params,
        headers: getHotelHeaders(),
      }),
    enabled: !!params.month && !!params.year,
  });
}

export function useAvailablePeriods() {
  return useQuery({
    queryKey: ['reports', 'revenue', 'available-periods'],
    queryFn: () =>
      httpClient.get('/reports/revenue/available-periods', {
        headers: getHotelHeaders(),
      }),
  });
}

export function downloadRevenueReport(
  month: number,
  year: number,
  format: 'pdf' | 'excel'
): Promise<Blob> {
  const session = getHotelSession();
  if (!session?.hotelId) {
    throw new Error('Hotel ID not found in session');
  }

  return httpClient
    .get('/reports/revenue/download', {
      params: { month, year, format },
      headers: { 'X-Hotel-Id': session.hotelId },
      responseType: 'blob',
    })
    .then(response => response as unknown as Blob);
}

// Legacy hooks - mantener por compatibilidad con código existente
export function useDashboard() {
  return useQuery({
    queryKey: ['reports', 'dashboard'],
    queryFn: () => httpClient.get('/reports/dashboard'),
  });
}

export function useRevenue(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['reports', 'revenue', params],
    queryFn: () => httpClient.get('/reports/revenue', { params }),
  });
}

export function useReportKpis(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['reports', 'kpis', params],
    queryFn: () => httpClient.get('/reports/kpis', { params }),
  });
}

export function useReportTransactions(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['reports', 'transactions', params],
    queryFn: () => httpClient.get('/reports/transactions', { params }),
  });
}
