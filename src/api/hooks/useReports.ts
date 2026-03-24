import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

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
