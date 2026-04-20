import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export interface ExchangeRate {
  currency: string;
  rate: number;
  symbol: string;
  decimals: number;
}

export function useExchangeRates() {
  return useQuery<ExchangeRate[]>({
    queryKey: ['exchange-rates'],
    queryFn: () => httpClient.get<ExchangeRate[]>('/payments/exchange-rates'),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
