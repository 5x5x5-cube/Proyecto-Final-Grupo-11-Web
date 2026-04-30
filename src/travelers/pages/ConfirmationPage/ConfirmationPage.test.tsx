import { describe, it, vi, expect, beforeEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ConfirmationPage from './ConfirmationPage';

const invalidateQueries = vi.fn();

vi.mock('@tanstack/react-query', async importOriginal => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries,
    }),
  };
});

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 'u1',
      name: 'Carlos Martinez',
      email: 'carlos@test.com',
      phone: '',
      initials: 'CM',
    },
    guestInfo: { name: 'Carlos Martinez', email: 'carlos@test.com', phone: '', initials: 'CM' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({ paymentId: 'pay-123' }),
}));

vi.mock('@/api/hooks/usePayments', () => ({
  usePaymentStatus: () => ({
    data: {
      paymentId: 'pay-123',
      status: 'approved',
      paymentMethod: { displayLabel: 'Visa •••• 4242' },
      amount: 595000,
      currency: 'COP',
    },
    isLoading: false,
  }),
}));

vi.mock('@/api/hooks/useBookings', () => ({
  useBookingByPaymentId: () => ({
    data: { id: 'bk-1', code: 'BK-12345678' },
    isLoading: false,
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
    data: {
      id: 'cart-1',
      hotelName: 'Hotel Test',
      roomName: 'Standard',
      location: 'Bogota, Colombia',
      checkIn: '2026-05-01',
      checkOut: '2026-05-03',
      guests: 2,
      pricing: mockPricing,
    },
    pricing: mockPricing,
    isLoading: false,
  }),
}));

describe('ConfirmationPage', () => {
  beforeEach(() => {
    invalidateQueries.mockClear();
  });

  it('renders without crashing', () => {
    renderWithProviders(<ConfirmationPage />);
  });

  it('invalidates bookings queries when booking is loaded', async () => {
    renderWithProviders(<ConfirmationPage />);
    await waitFor(() => {
      expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['bookings'] });
    });
  });
});
