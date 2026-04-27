import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

vi.mock('@/api/hooks/usePayments', () => ({
  useTokenize: () => ({ mutate: vi.fn() }),
  useInitiatePayment: () => ({ mutate: vi.fn() }),
  usePaymentStatus: () => ({ data: undefined }),
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

// Import after mocks
const { usePaymentFlow } = await import('./usePaymentForm');

describe('usePaymentFlow', () => {
  it('starts with isProcessing false', () => {
    const { result } = renderHook(() => usePaymentFlow());
    expect(result.current.isProcessing).toBe(false);
  });

  it('starts with isFormValid false', () => {
    const { result } = renderHook(() => usePaymentFlow());
    expect(result.current.isFormValid).toBe(false);
  });

  it('exposes cart and pricing from useCart', () => {
    const { result } = renderHook(() => usePaymentFlow());
    expect(result.current.cart?.id).toBe('cart-1');
    expect(result.current.pricing.total).toBe(595000);
  });

  it('exposes submitPayment function', () => {
    const { result } = renderHook(() => usePaymentFlow());
    expect(typeof result.current.submitPayment).toBe('function');
  });
});
