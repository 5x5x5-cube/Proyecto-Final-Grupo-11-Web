import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../httpClient', () => ({
  httpClient: {
    get: vi.fn().mockResolvedValue([
      { currency: 'COP', rate: 1, symbol: 'COP', decimals: 0 },
      { currency: 'USD', rate: 0.00024, symbol: 'USD', decimals: 2 },
      { currency: 'ARS', rate: 0.21, symbol: 'ARS', decimals: 0 },
    ]),
  },
}));

import { useExchangeRates } from './useExchangeRates';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useExchangeRates', () => {
  it('fetches exchange rates from API', async () => {
    const { result } = renderHook(() => useExchangeRates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data![0].currency).toBe('COP');
    expect(result.current.data![1].currency).toBe('USD');
  });

  it('returns rate and symbol for each currency', async () => {
    const { result } = renderHook(() => useExchangeRates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const usd = result.current.data!.find(r => r.currency === 'USD');
    expect(usd?.rate).toBe(0.00024);
    expect(usd?.symbol).toBe('USD');
    expect(usd?.decimals).toBe(2);
  });
});
