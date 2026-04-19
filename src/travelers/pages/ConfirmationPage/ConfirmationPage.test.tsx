import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ConfirmationPage from './ConfirmationPage';

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
    data: { code: 'BK-12345678' },
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
  it('renders without crashing', () => {
    renderWithProviders(<ConfirmationPage />);
  });
});
