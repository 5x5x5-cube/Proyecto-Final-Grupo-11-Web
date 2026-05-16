import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockNavigate = vi.fn();

const paymentMocks = vi.hoisted(() => ({
  mutateTokenize: vi.fn(),
  mutateInitiate: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

vi.mock('@/api/hooks/usePayments', () => ({
  useTokenize: () => ({ mutate: paymentMocks.mutateTokenize }),
  useInitiatePayment: () => ({ mutate: paymentMocks.mutateInitiate }),
  usePaymentStatus: (paymentId: string) => ({
    data:
      paymentId === 'pay-test'
        ? {
            paymentId: 'pay-test',
            status: 'approved' as const,
            paymentMethod: {
              id: '1',
              methodType: 'card',
              displayLabel: 'Visa',
              cardLast4: '4242',
              cardBrand: 'visa',
            },
            amount: 100,
            currency: 'COP',
            transactionId: null,
            message: null,
            createdAt: '2026-01-01',
            processedAt: '2026-01-01',
          }
        : undefined,
  }),
}));

const mockPricing = {
  pricePerNight: 250000,
  nights: 2,
  subtotal: 500000,
  taxes: 95000,
  total: 595000,
  currency: 'COP',
};

vi.mock('@/api/hooks/useCart', () => ({
  useCart: () => ({
    data: { id: 'cart-1', pricing: mockPricing },
    pricing: mockPricing,
  }),
}));

vi.mock('@/contexts/SnackbarContext', () => ({
  useSnackbar: () => ({ showError: vi.fn() }),
}));

const { usePaymentFlow } = await import('./usePaymentForm');

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  return { wrapper, invalidateSpy };
}

describe('usePaymentFlow', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    paymentMocks.mutateTokenize.mockImplementation((_payload, { onSuccess }) => {
      onSuccess({
        token: 'tok',
        method: 'credit_card',
        displayLabel: 'Visa',
        expiresAt: '',
        cardLast4: '4242',
        cardBrand: 'visa',
        walletProvider: null,
        bankCode: null,
      });
    });
    paymentMocks.mutateInitiate.mockImplementation((_payload, { onSuccess }) => {
      onSuccess({ paymentId: 'pay-test', status: 'processing' });
    });
  });

  it('starts with isProcessing false', () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => usePaymentFlow(), { wrapper });
    expect(result.current.isProcessing).toBe(false);
  });

  it('starts with isFormValid false', () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => usePaymentFlow(), { wrapper });
    expect(result.current.isFormValid).toBe(false);
  });

  it('exposes cart and pricing from useCart', () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => usePaymentFlow(), { wrapper });
    expect(result.current.cart?.id).toBe('cart-1');
    expect(result.current.pricing.total).toBe(595000);
  });

  it('exposes submitPayment function', () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => usePaymentFlow(), { wrapper });
    expect(typeof result.current.submitPayment).toBe('function');
  });

  it('invalidates bookings cache and navigates to confirmation when payment is approved', async () => {
    const { wrapper, invalidateSpy } = createWrapper();
    const { result } = renderHook(() => usePaymentFlow(), { wrapper });

    result.current.submitPayment(
      {
        method: 'credit_card',
        cardNumber: '4111111111111111',
        cardHolder: 'Test User',
        expiry: '12/30',
        cvv: '123',
      },
      'credit_card',
      'COP'
    );

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['bookings'] });
    });
    expect(mockNavigate).toHaveBeenCalledWith('/checkout/confirmation/pay-test');
  });
});
